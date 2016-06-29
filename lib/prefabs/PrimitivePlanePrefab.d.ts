import { ElementsBase } from "../graphics/ElementsBase";
import { MaterialBase } from "../materials/MaterialBase";
import { PrimitivePrefabBase } from "../prefabs/PrimitivePrefabBase";
/**
 * A Plane primitive sprite.
 */
export declare class PrimitivePlanePrefab extends PrimitivePrefabBase {
    private _segmentsW;
    private _segmentsH;
    private _yUp;
    private _width;
    private _height;
    private _doubleSided;
    /**
     * Creates a new Plane object.
     * @param width The width of the plane.
     * @param height The height of the plane.
     * @param segmentsW The number of segments that make up the plane along the X-axis.
     * @param segmentsH The number of segments that make up the plane along the Y or Z-axis.
     * @param yUp Defines whether the normal vector of the plane should point along the Y-axis (true) or Z-axis (false).
     * @param doubleSided Defines whether the plane will be visible from both sides, with correct vertex normals.
     */
    constructor(material?: MaterialBase, elementsType?: string, width?: number, height?: number, segmentsW?: number, segmentsH?: number, yUp?: boolean, doubleSided?: boolean);
    /**
     * The number of segments that make up the plane along the X-axis. Defaults to 1.
     */
    segmentsW: number;
    /**
     * The number of segments that make up the plane along the Y or Z-axis, depending on whether yUp is true or
     * false, respectively. Defaults to 1.
     */
    segmentsH: number;
    /**
     *  Defines whether the normal vector of the plane should point along the Y-axis (true) or Z-axis (false). Defaults to true.
     */
    yUp: boolean;
    /**
     * Defines whether the plane will be visible from both sides, with correct vertex normals (as opposed to bothSides on Material). Defaults to false.
     */
    doubleSided: boolean;
    /**
     * The width of the plane.
     */
    width: number;
    /**
     * The height of the plane.
     */
    height: number;
    /**
     * @inheritDoc
     */
    _pBuildGraphics(target: ElementsBase, elementsType: string): void;
    /**
     * @inheritDoc
     */
    _pBuildUVs(target: ElementsBase, elementsType: string): void;
}
