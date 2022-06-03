import type {
  Feature,
  GeoJsonProperties,
  MultiPolygon,
  Polygon,
} from 'geojson';
import buffer from '@turf/buffer';
import {
  BBox,
  BBoxToGeoJSONFeature,
  getGeohashBBox,
  getGeoJSONBBox,
} from 'bbox-helper-functions';

export interface BufferMapItem {
  precision: number;
  bufferInKm: number;
}

/**
 * Buffers a GeoJSON Feature
 *
 * @export
 * @param {Feature} feature The GeoJSON feature to buffer
 * @param {number} kilometers Distance in kilometers to buffer the shape
 * @return {(Feature<Polygon | MultiPolygon | null, GeoJsonProperties>)} The buffered shape
 */
export function bufferFeature(
  feature: Feature<any>,
  kilometers: number,
): Feature<Polygon | MultiPolygon | null, GeoJsonProperties> {
  return buffer(feature, kilometers, {
    units: 'kilometers',
  });
}

/**
 * Buffers a BBox
 *
 * @export
 * @param {BBox} bbox [minLon, minLat, maxLon, maxLat]
 * @param {number} kilometers Distance in kilometers to buffer the shape
 * @return {BBox} The resulting BBox of the buffered shape
 */
export function bufferBBox(bbox: BBox, kilometers: number): BBox {
  const asGeoJSON = BBoxToGeoJSONFeature(bbox);

  const withBuffer = bufferFeature(asGeoJSON, kilometers) as Feature<Polygon>;

  return getGeoJSONBBox(withBuffer);
}

/**
 * Buffers a geohash according to a precision-distance mapping
 *
 * @export
 * @param {string} geohash The geohash
 * @param {BufferMapItem[]} distanceMapping Array with the distance values for each precision (KM)
 * @return {BBox} The BBox of the buffered shape
 */
export function bufferGeohash(
  geohash: string,
  distanceMapping: BufferMapItem[],
): BBox {
  const asBBox = getGeohashBBox(geohash);

  const precision = geohash.length;

  const size = distanceMapping.find((d) => d.precision === precision);

  if (size) {
    return bufferBBox(asBBox, size.bufferInKm);
  }

  throw new Error(`Buffer distance not found for precision ${precision}`);
}
