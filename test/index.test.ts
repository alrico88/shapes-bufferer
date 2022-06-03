import { BBox, BBoxToGeoJSONFeature, getGeohashBBox } from 'bbox-helper-functions';
import { describe, expect, test } from 'vitest';
import booleanContains from '@turf/boolean-contains';
import {
  bufferBBox, bufferFeature, bufferGeohash, BufferMapItem,
} from '../src';

const originalBBox = [-3.707651, 40.423234, -3.679004, 40.437593] as BBox;
const originalBBoxAsFeature = BBoxToGeoJSONFeature(originalBBox);

describe('Feature Bufferer test', () => {
  test('Buffered Feature should contain the original shape', () => {
    const buffered = bufferFeature(originalBBoxAsFeature, 1);

    expect(booleanContains(buffered, originalBBoxAsFeature)).toBe(true);
  });
});

describe('BBox Bufferer test', () => {
  test('Buffered BBox should contain the original BBox', () => {
    const buffered = bufferBBox(originalBBox, 1);
    const bufferedAsFeature = BBoxToGeoJSONFeature(buffered);

    expect(booleanContains(bufferedAsFeature, originalBBoxAsFeature)).toBe(true);
  });
});

describe('Geohash Bufferer test', () => {
  const geohash = 'ezjmu5';
  const geohashAsFeature = BBoxToGeoJSONFeature(getGeohashBBox(geohash));

  test('Buffered BBox should contain the original geohash BBox', () => {
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

  test('An error should be thrown if no mapping is found for the precision', () => {
    const mapping: BufferMapItem[] = [];

    const func = () => bufferGeohash(geohash, mapping);

    expect(func).toThrowError();
  });
});
