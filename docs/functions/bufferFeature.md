[**shapes-bufferer**](../README.md)

---

[shapes-bufferer](../globals.md) / bufferFeature

# Function: bufferFeature()

> **bufferFeature**(`feature`, `kilometers`): `Feature`\<`Polygon` \| `MultiPolygon` \| `null`, `GeoJsonProperties`\>

Defined in: [index.ts:19](https://github.com/alrico88/shapes-bufferer/blob/master/src/index.ts#L19)

Buffers a GeoJSON Feature

## Parameters

### feature

`Feature`\<`any`\>

The GeoJSON feature to buffer

### kilometers

`number`

Distance in kilometers to buffer the shape

## Returns

`Feature`\<`Polygon` \| `MultiPolygon` \| `null`, `GeoJsonProperties`\>

The buffered shape
