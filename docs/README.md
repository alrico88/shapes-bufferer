shapes-bufferer / [Exports](modules.md)

# shapes-bufferer

Apply a distance buffer to a GeoJSON, BBox, or geohash

## Installation

Using npm `npm i shapes-bufferer`

Using yarn `yarn add shapes-bufferer`

## Usage

In CommonJS env

```javascript
const { bufferFeature } = require('shapes-bufferer');

const geojson = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-3.687352, 40.440563],
        [-3.674112, 40.445444],
        [-3.66824, 40.434788],
        [-3.686987, 40.429722],
        [-3.687352, 40.440563],
      ],
    ],
  },
};

// Apply a 1km buffer around the GeoJSON
const buffered = bufferFeature(geojson, 1);
```

Using imports

```javascript
import { bufferBBox } from 'shapes-bufferer';

bufferBBox([-3.707651, 40.423234, -3.679004, 40.437593], 1);
```

## Documentation

See [DOCS](./docs/modules.md)
