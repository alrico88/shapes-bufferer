[shapes-bufferer](README.md) / Exports

# shapes-bufferer

## Table of contents

### Interfaces

- [BufferMapItem](interfaces/BufferMapItem.md)

### Functions

- [bufferBBox](modules.md#bufferbbox)
- [bufferFeature](modules.md#bufferfeature)
- [bufferGeohash](modules.md#buffergeohash)

## Functions

### bufferBBox

▸ **bufferBBox**(`bbox`, `kilometers`): `BBox`

Buffers a BBox

**`export`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bbox` | `BBox` |  |
| `kilometers` | `number` | Distance in kilometers to buffer the shape |

#### Returns

`BBox`

The resulting BBox of the buffered shape

#### Defined in

index.ts:45

___

### bufferFeature

▸ **bufferFeature**(`feature`, `kilometers`): `Feature`<`Polygon` \| `MultiPolygon` \| ``null``, `GeoJsonProperties`\>

Buffers a GeoJSON Feature

**`export`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `feature` | `Feature`<`any`, `GeoJsonProperties`\> | The GeoJSON feature to buffer |
| `kilometers` | `number` | Distance in kilometers to buffer the shape |

#### Returns

`Feature`<`Polygon` \| `MultiPolygon` \| ``null``, `GeoJsonProperties`\>

The buffered shape

#### Defined in

index.ts:28

___

### bufferGeohash

▸ **bufferGeohash**(`geohash`, `distanceMapping`): `BBox`

Buffers a geohash according to a precision-distance mapping

**`export`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geohash` | `string` | The geohash |
| `distanceMapping` | [`BufferMapItem`](interfaces/BufferMapItem.md)[] | Array with the distance values for each precision (KM) |

#### Returns

`BBox`

The BBox of the buffered shape

#### Defined in

index.ts:61
