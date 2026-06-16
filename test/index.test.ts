import type { FeatureCollection, Geometry, GeometryCollection } from "geojson";
import { BBox, BBoxToGeoJSONFeature, getGeohashBBox } from "bbox-helper-functions";
import { describe, expect, test } from "vite-plus/test";
import booleanContains from "@turf/boolean-contains";
import {
  bufferBBox,
  bufferFeature,
  bufferGeoJSON,
  bufferGeoJSONRings,
  bufferGeohash,
  BufferMapItem,
} from "../src";

const originalBBox = [-3.707651, 40.423234, -3.679004, 40.437593] as BBox;
const originalBBoxAsFeature = BBoxToGeoJSONFeature(originalBBox);

describe("Feature Bufferer test", () => {
  test("Buffered Feature should contain the original shape", () => {
    const buffered = bufferFeature(originalBBoxAsFeature, 1);

    expect(booleanContains(buffered, originalBBoxAsFeature)).toBe(true);
  });
});

describe("BBox Bufferer test", () => {
  test("Buffered BBox should contain the original BBox", () => {
    const buffered = bufferBBox(originalBBox, 1);
    const bufferedAsFeature = BBoxToGeoJSONFeature(buffered);

    expect(booleanContains(bufferedAsFeature, originalBBoxAsFeature)).toBe(true);
  });
});

describe("Geohash Bufferer test", () => {
  const geohash = "ezjmu5";
  const geohashAsFeature = BBoxToGeoJSONFeature(getGeohashBBox(geohash));

  test("Buffered BBox should contain the original geohash BBox", () => {
    const mapping: BufferMapItem[] = [
      {
        precision: geohash.length,
        bufferInKm: 1,
      },
    ];

    const buffered = bufferGeohash(geohash, mapping);
    const bufferedAsFeature = BBoxToGeoJSONFeature(buffered);

    expect(booleanContains(bufferedAsFeature, geohashAsFeature)).toBe(true);
  });

  test("An error should be thrown if no mapping is found for the precision", () => {
    const mapping: BufferMapItem[] = [];

    const func = () => bufferGeohash(geohash, mapping);

    expect(func).toThrowError();
  });
});

describe("GeoJSON Bufferer test", () => {
  const secondaryBBox = [-3.607651, 40.423234, -3.579004, 40.437593] as BBox;
  const secondaryBBoxAsFeature = BBoxToGeoJSONFeature(secondaryBBox);

  test("Buffered GeoJSON should return one feature per distance in input order", () => {
    const buffered = bufferGeoJSON(originalBBoxAsFeature.geometry, [2, 1]);

    expect(buffered.type).toBe("FeatureCollection");
    expect(buffered.features).toHaveLength(2);
    expect(buffered.features[0].properties).toEqual({
      distance: 2,
      units: "kilometers",
      type: "buffer",
      empty: false,
    });
    expect(buffered.features[1].properties).toEqual({
      distance: 1,
      units: "kilometers",
      type: "buffer",
      empty: false,
    });
    expect(buffered.features[0].geometry?.type).toMatch(/Polygon/);
    expect(buffered.features[1].geometry?.type).toMatch(/Polygon/);
  });

  test("Buffered GeoJSON should union the whole input into a single feature per distance", () => {
    const featureCollection: FeatureCollection = {
      type: "FeatureCollection",
      features: [originalBBoxAsFeature, secondaryBBoxAsFeature],
    };

    const buffered = bufferGeoJSON(featureCollection, [1]);

    expect(buffered.features).toHaveLength(1);
    expect(buffered.features[0].geometry?.type).toBe("MultiPolygon");
  });

  test("Buffered GeoJSON should flatten GeometryCollections and ignore null geometries", () => {
    const geometryCollection: GeometryCollection = {
      type: "GeometryCollection",
      geometries: [
        originalBBoxAsFeature.geometry,
        {
          type: "GeometryCollection",
          geometries: [secondaryBBoxAsFeature.geometry],
        },
      ],
    };
    const featureCollection: FeatureCollection = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: null as unknown as Geometry,
          properties: {
            shouldNotBeCopied: true,
          },
        },
        {
          type: "Feature",
          geometry: geometryCollection,
          properties: {
            shouldNotBeCopied: true,
          },
        },
      ],
    };

    const buffered = bufferGeoJSON(featureCollection, [1]);

    expect(buffered.features).toHaveLength(1);
    expect(buffered.features[0].geometry?.type).toBe("MultiPolygon");
    expect(buffered.features[0].properties).toEqual({
      distance: 1,
      units: "kilometers",
      type: "buffer",
      empty: false,
    });
  });

  test("Buffered GeoJSON should validate distances", () => {
    expect(() => bufferGeoJSON(originalBBoxAsFeature, [0])).toThrowError();
    expect(() => bufferGeoJSON(originalBBoxAsFeature, [-1])).toThrowError();
  });
});

describe("GeoJSON Ring Bufferer test", () => {
  test("Buffered GeoJSON rings should return one feature per range in input order", () => {
    const rings = bufferGeoJSONRings(originalBBoxAsFeature, [
      { from: 1, to: 2 },
      { from: 0, to: 1 },
    ]);

    expect(rings.type).toBe("FeatureCollection");
    expect(rings.features).toHaveLength(2);
    expect(rings.features[0].properties).toEqual({
      from: 1,
      to: 2,
      units: "kilometers",
      type: "ring",
      empty: false,
    });
    expect(rings.features[1].properties).toEqual({
      from: 0,
      to: 1,
      units: "kilometers",
      type: "ring",
      empty: false,
    });
    expect(rings.features[0].geometry?.type).toMatch(/Polygon/);
    expect(rings.features[1].geometry?.type).toMatch(/Polygon/);
  });

  test("Buffered GeoJSON rings should validate ranges", () => {
    expect(() => bufferGeoJSONRings(originalBBoxAsFeature, [{ from: -1, to: 1 }])).toThrowError();
    expect(() => bufferGeoJSONRings(originalBBoxAsFeature, [{ from: 1, to: 1 }])).toThrowError();
    expect(() => bufferGeoJSONRings(originalBBoxAsFeature, [{ from: 2, to: 1 }])).toThrowError();
  });
});
