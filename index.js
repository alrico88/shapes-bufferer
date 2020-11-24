const {
  BBoxToGeoJSONFeature,
  getGeoJSONBBox,
} = require('bbox-helper-functions');
const {default: buffer} = require('@turf/buffer');

/**
 * @typedef {number[]} BBox [minLon, minLat, maxLon, maxLat]
 */

/**
 * BufferMapItem class
 *
 * @class BufferMapItem
 */
class BufferMapItem {

  /**
   * Creates an instance of BufferMapItem.
   *
   * @param {number} precision Geohash precision
   * @param {number} kilometers Buffer km. to use for this precision
   * @memberof BufferMapItem
   */
  constructor(precision, kilometers) {
    this.precision = precision;
    this.bufferDistance = kilometers;
  }
}

/**
 * FeatureBufferer class
 */
class FeatureBufferer {

  /**
   * Creates an instance of FeatureBufferer.
   *
   * @param {*} feature Feature to apply buffer to
   * @memberof FeatureBufferer
   */
  constructor(feature) {
    this.feature = feature;
  }

  /**
   * Applies buffer to geometry
   *
   * @param {number} kilometers Kilometers of buffer to apply
   * @return {*} The feature with the applied buffer
   * @memberof FeatureBufferer
   */
  applyBuffer(kilometers) {
    return buffer(this.feature, kilometers, {
      units: 'kilometers',
    });
  }
}

/**
 * BBoxBufferer class
 *
 * @class BBoxBufferer
 * @extends {FeatureBufferer}
 */
class BBoxBufferer extends FeatureBufferer {

  /**
   * Creates an instance of BBoxBufferer.
   * @param {BBox} bbox BBox to apply buffer to
   * @memberof BBoxBufferer
   */
  constructor(bbox) {
    super(BBoxToGeoJSONFeature(bbox));
    this.bbox = bbox;
  }

  /**
   * Gets BBox of a feature after applying buffer
   *
   * @private
   * @param {*} bufferFeature Buffered feature to obtain BBox of
   * @return {BBox} BBox of the buffered featyre
   * @memberof BBoxBufferer
   */
  getBufferBBox(bufferFeature) {
    return getGeoJSONBBox(bufferFeature);
  }

  /**
   * Apply buffer to a BBox
   *
   * @param {number} kilometers Kilometers of the buffer
   * @return {BBox} BBox after applying buffer
   * @memberof BBoxBufferer
   */
  applyBuffer(kilometers) {
    return this.getBufferBBox(super.applyBuffer(kilometers));
  }
}

/**
 * GeohashBBoxBufferer class
 *
 * @class GeohashBBoxBufferer
 * @extends {BBoxBufferer}
 */
class GeohashBBoxBufferer extends BBoxBufferer {

  /**
   * Creates an instance of GeohashBBoxBufferer.
   * @param {BBox} bbox BBox of the map to apply buffer to
   * @param {BufferMapItem[]} [bufferMapping=[]] Mapping of precision-distance to use
   * @memberof GeohashBBoxBufferer
   */
  constructor(bbox, bufferMapping = []) {
    super(bbox);
    this.bufferMapping = bufferMapping;
  }

  /**
   * Gets buffer size from precision according to mapping
   *
   * @private
   * @param {number} precision Precision of the geohash to use
   * @return {number} Distance in kilometers of the buffer
   * @memberof GeohashBBoxBufferer
   */
  getBufferSize(precision) {
    const size = this.bufferMapping.find(({precision: mappingPrecision}) => mappingPrecision === precision);

    if (size) {
      return size.bufferDistance;
    } else {
      throw new Error(`No mapping for precision ${precision}`);
    }
  }

  /**
   * Applies buffer to a geohash-based BBox
   *
   * @param {number} precision Precision of the geohashes inside the BBox
   * @return {BBox} BBox with applied buffer
   * @memberof GeohashBBoxBufferer
   */
  applyBuffer(precision) {
    return super.applyBuffer(this.getBufferSize(precision));
  }
}

module.exports = {
  FeatureBufferer,
  BBoxBufferer,
  GeohashBBoxBufferer,
  BufferMapItem,
};
