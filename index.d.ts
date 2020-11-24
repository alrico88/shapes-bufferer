/**
 * [minLon, minLat, maxLon, maxLat]
 */
export type BBox = number[];
/**
 * FeatureBufferer class
 */
export class FeatureBufferer {
    /**
     * Creates an instance of FeatureBufferer.
     *
     * @param {*} feature Feature to apply buffer to
     * @memberof FeatureBufferer
     */
    constructor(feature: any);
    feature: any;
    /**
     * Applies buffer to geometry
     *
     * @param {number} kilometers Kilometers of buffer to apply
     * @return {*} The feature with the applied buffer
     * @memberof FeatureBufferer
     */
    applyBuffer(kilometers: number): any;
}
/**
 * BBoxBufferer class
 *
 * @class BBoxBufferer
 * @extends {FeatureBufferer}
 */
export class BBoxBufferer extends FeatureBufferer {
    /**
     * Creates an instance of BBoxBufferer.
     * @param {BBox} bbox BBox to apply buffer to
     * @memberof BBoxBufferer
     */
    constructor(bbox: BBox);
    bbox: BBox;
    /**
     * Gets BBox of a feature after applying buffer
     *
     * @private
     * @param {*} bufferFeature Buffered feature to obtain BBox of
     * @return {BBox} BBox of the buffered featyre
     * @memberof BBoxBufferer
     */
    private getBufferBBox;
}
/**
 * GeohashBBoxBufferer class
 *
 * @class GeohashBBoxBufferer
 * @extends {BBoxBufferer}
 */
export class GeohashBBoxBufferer extends BBoxBufferer {
    /**
     * Creates an instance of GeohashBBoxBufferer.
     * @param {BBox} bbox BBox of the map to apply buffer to
     * @param {BufferMapItem[]} [bufferMapping=[]] Mapping of precision-distance to use
     * @memberof GeohashBBoxBufferer
     */
    constructor(bbox: BBox, bufferMapping?: BufferMapItem[]);
    bufferMapping: BufferMapItem[];
    /**
     * Gets buffer size from precision according to mapping
     *
     * @private
     * @param {number} precision Precision of the geohash to use
     * @return {number} Distance in kilometers of the buffer
     * @memberof GeohashBBoxBufferer
     */
    private getBufferSize;
}
/**
 * @typedef {number[]} BBox [minLon, minLat, maxLon, maxLat]
 */
/**
 * BufferMapItem class
 *
 * @class BufferMapItem
 */
export class BufferMapItem {
    /**
     * Creates an instance of BufferMapItem.
     *
     * @param {number} precision Geohash precision
     * @param {number} kilometers Buffer km. to use for this precision
     * @memberof BufferMapItem
     */
    constructor(precision: number, kilometers: number);
    precision: number;
    bufferDistance: number;
}
