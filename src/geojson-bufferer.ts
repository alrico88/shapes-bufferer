import type {
  Feature,
  FeatureCollection,
  Geometry,
  GeometryCollection,
  GeoJsonProperties,
  MultiPolygon,
  Polygon,
} from 'geojson';
import buffer from '@turf/buffer';
import difference from '@turf/difference';
import union from '@turf/union';

export interface BufferRingRange {
  from: number;
  to: number;
}

export interface BufferGeoJSONProperties {
  distance: number;
  units: 'kilometers';
  type: 'buffer';
  empty: boolean;
}

export interface BufferGeoJSONRingProperties extends BufferRingRange {
  units: 'kilometers';
  type: 'ring';
  empty: boolean;
}

export type BufferGeoJSONInput =
  | Geometry
  | Feature<Geometry | null, GeoJsonProperties>
  | FeatureCollection<Geometry | null, GeoJsonProperties>;

export type BufferGeoJSONFeature = Feature<
  Polygon | MultiPolygon | null,
  BufferGeoJSONProperties
>;

export type BufferGeoJSONRingFeature = Feature<
  Polygon | MultiPolygon | null,
  BufferGeoJSONRingProperties
>;

function isFeature(
  geoJSON: BufferGeoJSONInput,
): geoJSON is Feature<Geometry | null, GeoJsonProperties> {
  return geoJSON.type === 'Feature';
}

function isFeatureCollection(
  geoJSON: BufferGeoJSONInput,
): geoJSON is FeatureCollection<Geometry | null, GeoJsonProperties> {
  return geoJSON.type === 'FeatureCollection';
}

function geometryToFeatures(
  geometry: Geometry | null,
): Feature<Geometry, GeoJsonProperties>[] {
  if (!geometry) {
    return [];
  }

  if (geometry.type === 'GeometryCollection') {
    return (geometry as GeometryCollection).geometries.flatMap(
      geometryToFeatures,
    );
  }

  return [
    {
      type: 'Feature',
      geometry,
      properties: {},
    },
  ];
}

function normalizeGeoJSON(
  geoJSON: BufferGeoJSONInput,
): FeatureCollection<Geometry, GeoJsonProperties> {
  let features: Feature<Geometry, GeoJsonProperties>[];

  if (isFeatureCollection(geoJSON)) {
    features = geoJSON.features.flatMap((feature) => (
      geometryToFeatures(feature.geometry)
    ));
  } else if (isFeature(geoJSON)) {
    features = geometryToFeatures(geoJSON.geometry);
  } else {
    features = geometryToFeatures(geoJSON);
  }

  if (features.length === 0) {
    throw new Error('GeoJSON must contain at least one geometry');
  }

  return {
    type: 'FeatureCollection',
    features,
  };
}

function validateDistance(distance: number): void {
  if (distance <= 0) {
    throw new Error(`Distance must be greater than 0. Received ${distance}`);
  }
}

function validateRingRange(range: BufferRingRange): void {
  if (range.from < 0) {
    throw new Error(
      `Range "from" must be greater than or equal to 0. Received ${range.from}`,
    );
  }

  if (range.to <= range.from) {
    throw new Error(
      `Range "to" must be greater than "from". Received ${range.to}`,
    );
  }
}

function bufferGeometryFeature(
  feature: Feature<Geometry, GeoJsonProperties>,
  kilometers: number,
): Feature<Polygon | MultiPolygon | null, GeoJsonProperties> {
  return buffer(feature, kilometers, {
    units: 'kilometers',
  });
}

function mergePolygons(
  polygons: Feature<Polygon | MultiPolygon, GeoJsonProperties>[],
): Feature<Polygon | MultiPolygon, GeoJsonProperties> | null {
  return polygons.reduce<Feature<
    Polygon | MultiPolygon,
    GeoJsonProperties
  > | null>((merged, polygon) => {
    if (!merged) {
      return polygon;
    }

    return union(merged, polygon);
  }, null);
}

function bufferFeatureCollection(
  featureCollection: FeatureCollection<Geometry, GeoJsonProperties>,
  distance: number,
): Feature<Polygon | MultiPolygon, GeoJsonProperties> | null {
  const bufferedFeatures = featureCollection.features
    .map((feature) => bufferGeometryFeature(feature, distance))
    .filter(
      (
        feature,
      ): feature is Feature<
        Polygon | MultiPolygon,
        GeoJsonProperties
      > => feature.geometry !== null,
    );

  return mergePolygons(bufferedFeatures);
}

/**
 * Buffers any GeoJSON input into one Feature per distance.
 *
 * @export
 * @param {BufferGeoJSONInput} geoJSON A Geometry, Feature, or FeatureCollection
 * @param {number[]} distances Distances in kilometers
 * @return {FeatureCollection<Polygon | MultiPolygon | null, BufferGeoJSONProperties>}
 */
export function bufferGeoJSON(
  geoJSON: BufferGeoJSONInput,
  distances: number[],
): FeatureCollection<Polygon | MultiPolygon | null, BufferGeoJSONProperties> {
  const featureCollection = normalizeGeoJSON(geoJSON);

  return {
    type: 'FeatureCollection',
    features: distances.map((distance) => {
      validateDistance(distance);

      const geometry = bufferFeatureCollection(
        featureCollection,
        distance,
      )?.geometry ?? null;

      return {
        type: 'Feature',
        geometry,
        properties: {
          distance,
          units: 'kilometers',
          type: 'buffer',
          empty: geometry === null,
        },
      };
    }),
  };
}

/**
 * Buffers any GeoJSON input into one ring Feature per range.
 *
 * @export
 * @param {BufferGeoJSONInput} geoJSON A Geometry, Feature, or FeatureCollection
 * @param {BufferRingRange[]} ranges Distances in kilometers
 * @return {FeatureCollection<Polygon | MultiPolygon | null, BufferGeoJSONRingProperties>}
 */
export function bufferGeoJSONRings(
  geoJSON: BufferGeoJSONInput,
  ranges: BufferRingRange[],
): FeatureCollection<
  Polygon | MultiPolygon | null,
  BufferGeoJSONRingProperties
> {
  const featureCollection = normalizeGeoJSON(geoJSON);

  return {
    type: 'FeatureCollection',
    features: ranges.map((range) => {
      validateRingRange(range);

      const outerBuffer = bufferFeatureCollection(featureCollection, range.to);
      const innerBuffer = range.from === 0
        ? null
        : bufferFeatureCollection(featureCollection, range.from);
      const ring = outerBuffer && innerBuffer
        ? difference(outerBuffer, innerBuffer)
        : outerBuffer;
      const geometry = ring?.geometry ?? null;

      return {
        type: 'Feature',
        geometry,
        properties: {
          ...range,
          units: 'kilometers',
          type: 'ring',
          empty: geometry === null,
        },
      };
    }),
  };
}
