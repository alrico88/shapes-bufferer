declare module "@turf/buffer" {
  import type { Feature, GeoJsonProperties, MultiPolygon, Polygon } from "geojson";
  function buffer(
    geojson: any,
    radius?: number,
    options?: { units?: string },
  ): Feature<Polygon | MultiPolygon | null, GeoJsonProperties>;
  export default buffer;
}

declare module "@turf/difference" {
  function difference(polygon1: any, polygon2: any): any;
  export default difference;
}

declare module "@turf/union" {
  function union(...features: any[]): any;
  export default union;
}

declare module "@turf/boolean-contains" {
  function booleanContains(feature1: any, feature2: any): boolean;
  export default booleanContains;
}
