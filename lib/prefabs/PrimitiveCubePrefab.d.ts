import { ElementsBase } from "../graphics/ElementsBase";
import { MaterialBase } from "../materials/MaterialBase";
import { PrimitivePrefabBase } from "../prefabs/PrimitivePrefabBase";
/**
 * A Cube primitive prefab.
 */
export declare class PrimitiveCubePrefab extends PrimitivePrefabBase {
    private _width;
    private _height;
    private _depth;
    private _tile6;
    private _segmentsW;
    private _segmentsH;
    private _segmentsD;
    /**
     * Creates a new Cube object.
     * @param width The size of the cube along its X-axis.
     * @param height The size of the cube along its Y-axis.
     * @param depth The size of the cube along its Z-axis.
     * @param segmentsW The number of segments that make up the cube along the X-axis.
     * @param segmentsH The number of segments that make up the cube along the Y-axis.
     * @param segmentsD The number of segments that make up the cube along the Z-axis.
     * @param tile6 The type of uv mapping to use. When true, a texture will be subdivided in a 2x3 grid, each used for a single face. When false, the entire image is mapped on each face.
     */
    constructor(material?: MaterialBase, elementsType?: string, width?: number, height?: number, depth?: number, segmentsW?: number, segmentsH?: number, segmentsD?: number, tile6?: boolean);
    /**
     * The size of the cube along its X-axis.
     */
    width: number;
    /**
     * The size of the cube along its Y-axis.
     */
    height: number;
    /**
     * The size of the cube along its Z-axis.
     */
    depth: number;
    /**
     * The type of uv mapping to use. When false, the entire image is mapped on each face.
     * When true, a texture will be subdivided in a 3x2 grid, each used for a single face.
     * Reading the tiles from left to right, top to bottom they represent the faces of the
     * cube in the following order: bottom, top, back, left, front, right. This creates
     * several shared edges (between the top, front, left and right faces) which simplifies
     * texture painting.
     */
    tile6: boolean;
    /**
     * The number of segments that make up the cube along the X-axis. Defaults to 1.
     */
    segmentsW: number;
    /**
     * The number of segments that make up the cube along the Y-axis. Defaults to 1.
     */
    segmentsH: number;
    /**
     * The number of segments that make up the cube along the Z-axis. Defaults to 1.
     */
    segmentsD: number;
    /**
     * @inheritDoc
     */
    _pBuildGraphics(target: ElementsBase, elementsType: string): void;
    /**
     * @inheritDoc
     */
    _pBuildUVs(target: ElementsBase, elementsType: string): void;
}
