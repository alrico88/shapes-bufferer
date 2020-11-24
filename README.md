## Classes

<dl>
<dt><a href="#BufferMapItem">BufferMapItem</a></dt>
<dd></dd>
<dt><a href="#FeatureBufferer">FeatureBufferer</a></dt>
<dd><p>FeatureBufferer class</p>
</dd>
<dt><a href="#BBoxBufferer">BBoxBufferer</a> ⇐ <code><a href="#FeatureBufferer">FeatureBufferer</a></code></dt>
<dd></dd>
<dt><a href="#GeohashBBoxBufferer">GeohashBBoxBufferer</a> ⇐ <code><a href="#BBoxBufferer">BBoxBufferer</a></code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#BBox">BBox</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>[minLon, minLat, maxLon, maxLat]</p>
</dd>
</dl>

<a name="BufferMapItem"></a>

## BufferMapItem

**Kind**: global class

- [BufferMapItem](#BufferMapItem)
  - [new BufferMapItem()](#new_BufferMapItem_new)
  - [.BufferMapItem](#BufferMapItem.BufferMapItem)
    - [new BufferMapItem(precision, kilometers)](#new_BufferMapItem.BufferMapItem_new)

<a name="new_BufferMapItem_new"></a>

### new BufferMapItem()

BufferMapItem class

<a name="BufferMapItem.BufferMapItem"></a>

### BufferMapItem.BufferMapItem

**Kind**: static class of [<code>BufferMapItem</code>](#BufferMapItem)  
<a name="new_BufferMapItem.BufferMapItem_new"></a>

#### new BufferMapItem(precision, kilometers)

Creates an instance of BufferMapItem.

| Param      | Type                | Description                          |
| ---------- | ------------------- | ------------------------------------ |
| precision  | <code>number</code> | Geohash precision                    |
| kilometers | <code>number</code> | Buffer km. to use for this precision |

<a name="BBoxBufferer"></a>

## BBoxBufferer ⇐ [<code>FeatureBufferer</code>](#FeatureBufferer)

**Kind**: global class  
**Extends**: [<code>FeatureBufferer</code>](#FeatureBufferer)

- [BBoxBufferer](#BBoxBufferer) ⇐ [<code>FeatureBufferer</code>](#FeatureBufferer)
  - [new BBoxBufferer()](#new_BBoxBufferer_new)
  - _instance_
    - [.applyBuffer(kilometers)](#BBoxBufferer+applyBuffer) ⇒ [<code>BBox</code>](#BBox)
  - _static_
    - [.BBoxBufferer](#BBoxBufferer.BBoxBufferer)
      - [new BBoxBufferer(bbox)](#new_BBoxBufferer.BBoxBufferer_new)

<a name="new_BBoxBufferer_new"></a>

### new BBoxBufferer()

BBoxBufferer class

<a name="BBoxBufferer+applyBuffer"></a>

### bBoxBufferer.applyBuffer(kilometers) ⇒ [<code>BBox</code>](#BBox)

Apply buffer to a BBox

**Kind**: instance method of [<code>BBoxBufferer</code>](#BBoxBufferer)  
**Overrides**: [<code>applyBuffer</code>](#FeatureBufferer+applyBuffer)  
**Returns**: [<code>BBox</code>](#BBox) - BBox after applying buffer

| Param      | Type                | Description              |
| ---------- | ------------------- | ------------------------ |
| kilometers | <code>number</code> | Kilometers of the buffer |

<a name="BBoxBufferer.BBoxBufferer"></a>

### BBoxBufferer.BBoxBufferer

**Kind**: static class of [<code>BBoxBufferer</code>](#BBoxBufferer)  
<a name="new_BBoxBufferer.BBoxBufferer_new"></a>

#### new BBoxBufferer(bbox)

Creates an instance of BBoxBufferer.

| Param | Type                       | Description             |
| ----- | -------------------------- | ----------------------- |
| bbox  | [<code>BBox</code>](#BBox) | BBox to apply buffer to |

<a name="GeohashBBoxBufferer"></a>

## GeohashBBoxBufferer ⇐ [<code>BBoxBufferer</code>](#BBoxBufferer)

**Kind**: global class  
**Extends**: [<code>BBoxBufferer</code>](#BBoxBufferer)

- [GeohashBBoxBufferer](#GeohashBBoxBufferer) ⇐ [<code>BBoxBufferer</code>](#BBoxBufferer)
  - [new GeohashBBoxBufferer()](#new_GeohashBBoxBufferer_new)
  - _instance_
    - [.applyBuffer(precision)](#GeohashBBoxBufferer+applyBuffer) ⇒ [<code>BBox</code>](#BBox)
  - _static_
    - [.GeohashBBoxBufferer](#GeohashBBoxBufferer.GeohashBBoxBufferer)
      - [new GeohashBBoxBufferer(bbox, [bufferMapping])](#new_GeohashBBoxBufferer.GeohashBBoxBufferer_new)

<a name="new_GeohashBBoxBufferer_new"></a>

### new GeohashBBoxBufferer()

GeohashBBoxBufferer class

<a name="GeohashBBoxBufferer+applyBuffer"></a>

### geohashBBoxBufferer.applyBuffer(precision) ⇒ [<code>BBox</code>](#BBox)

Applies buffer to a geohash-based BBox

**Kind**: instance method of [<code>GeohashBBoxBufferer</code>](#GeohashBBoxBufferer)  
**Overrides**: [<code>applyBuffer</code>](#BBoxBufferer+applyBuffer)  
**Returns**: [<code>BBox</code>](#BBox) - BBox with applied buffer

| Param     | Type                | Description                                |
| --------- | ------------------- | ------------------------------------------ |
| precision | <code>number</code> | Precision of the geohashes inside the BBox |

<a name="GeohashBBoxBufferer.GeohashBBoxBufferer"></a>

### GeohashBBoxBufferer.GeohashBBoxBufferer

**Kind**: static class of [<code>GeohashBBoxBufferer</code>](#GeohashBBoxBufferer)  
<a name="new_GeohashBBoxBufferer.GeohashBBoxBufferer_new"></a>

#### new GeohashBBoxBufferer(bbox, [bufferMapping])

Creates an instance of GeohashBBoxBufferer.

| Param           | Type                                                       | Default         | Description                          |
| --------------- | ---------------------------------------------------------- | --------------- | ------------------------------------ |
| bbox            | [<code>BBox</code>](#BBox)                                 |                 | BBox of the map to apply buffer to   |
| [bufferMapping] | [<code>Array.&lt;BufferMapItem&gt;</code>](#BufferMapItem) | <code>[]</code> | Mapping of precision-distance to use |

<a name="BBox"></a>

## BBox : <code>Array.&lt;number&gt;</code>

[minLon, minLat, maxLon, maxLat]

**Kind**: global typedef
