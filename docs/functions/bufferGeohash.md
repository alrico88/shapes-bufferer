[**shapes-bufferer**](../README.md)

---

[shapes-bufferer](../globals.md) / bufferGeohash

# Function: bufferGeohash()

> **bufferGeohash**(`geohash`, `distanceMapping`): `BBox`

Defined in: [index.ts:50](https://github.com/alrico88/shapes-bufferer/blob/master/src/index.ts#L50)

Buffers a geohash according to a precision-distance mapping

## Parameters

### geohash

`string`

The geohash

### distanceMapping

[`BufferMapItem`](../interfaces/BufferMapItem.md)[]

Array with the distance values for each precision (KM)

## Returns

`BBox`

The BBox of the buffered shape
