[**shapes-bufferer**](../README.md)

---

[shapes-bufferer](../globals.md) / bufferGeoJSONRings

# Function: bufferGeoJSONRings()

> **bufferGeoJSONRings**(`geoJSON`, `ranges`): `FeatureCollection`\<`Polygon` \| `MultiPolygon` \| `null`, [`BufferGeoJSONRingProperties`](../interfaces/BufferGeoJSONRingProperties.md)\>

Defined in: [geojson-bufferer.ts:192](https://github.com/alrico88/shapes-bufferer/blob/master/src/geojson-bufferer.ts#L192)

Buffers any GeoJSON input into one ring Feature per range.

## Parameters

### geoJSON

[`BufferGeoJSONInput`](../type-aliases/BufferGeoJSONInput.md)

A Geometry, Feature, or FeatureCollection

### ranges

[`BufferRingRange`](../interfaces/BufferRingRange.md)[]

Distances in kilometers

## Returns

`FeatureCollection`\<`Polygon` \| `MultiPolygon` \| `null`, [`BufferGeoJSONRingProperties`](../interfaces/BufferGeoJSONRingProperties.md)\>
