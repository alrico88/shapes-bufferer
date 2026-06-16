[**shapes-bufferer**](../README.md)

---

[shapes-bufferer](../globals.md) / bufferGeoJSON

# Function: bufferGeoJSON()

> **bufferGeoJSON**(`geoJSON`, `distances`): `FeatureCollection`\<`Polygon` \| `MultiPolygon` \| `null`, [`BufferGeoJSONProperties`](../interfaces/BufferGeoJSONProperties.md)\>

Defined in: [geojson-bufferer.ts:158](https://github.com/alrico88/shapes-bufferer/blob/master/src/geojson-bufferer.ts#L158)

Buffers any GeoJSON input into one Feature per distance.

## Parameters

### geoJSON

[`BufferGeoJSONInput`](../type-aliases/BufferGeoJSONInput.md)

A Geometry, Feature, or FeatureCollection

### distances

`number`[]

Distances in kilometers

## Returns

`FeatureCollection`\<`Polygon` \| `MultiPolygon` \| `null`, [`BufferGeoJSONProperties`](../interfaces/BufferGeoJSONProperties.md)\>
