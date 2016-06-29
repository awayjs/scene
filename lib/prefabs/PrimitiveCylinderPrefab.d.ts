import { ElementsBase } from "../graphics/ElementsBase";
import { MaterialBase } from "../materials/MaterialBase";
import { PrimitivePrefabBase } from "../prefabs/PrimitivePrefabBase";
/**
 * A Cylinder primitive sprite.
 */
export declare class PrimitiveCylinderPrefab extends PrimitivePrefabBase {
    _pBottomRadius: number;
    _pSegmentsW: number;
    _pSegmentsH: number;
    private _topRadius;
    private _height;
    private _topClosed;
    private _bottomClosed;
    private _surfaceClosed;
    private _yUp;
    private _numVertices;
    /**
     * The radius of the top end of the cylinder.
     */
    topRadius: number;
    /**
     * The radius of the bottom end of the cylinder.
     */
    bottomRadius: number;
    /**
     * The radius of the top end of the cylinder.
     */
    height: number;
    /**
     * Defines the number of horizontal segments that make up the cylinder. Defaults to 16.
     */
    segmentsW: number;
    setSegmentsW(value: number): void;
    /**
     * Defines the number of vertical segments that make up the cylinder. Defaults to 1.
     */
    segmentsH: number;
    setSegmentsH(value: number): void;
    /**
     * Defines whether the top end of the cylinder is closed (true) or open.
     */
    topClosed: boolean;
    /**
     * Defines whether the bottom end of the cylinder is closed (true) or open.
     */
    bottomClosed: boolean;
    /**
     * Defines whether the cylinder poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    yUp: boolean;
    /**
     * Creates a new Cylinder object.
     * @param topRadius The radius of the top end of the cylinder.
     * @param bottomRadius The radius of the bottom end of the cylinder
     * @param height The radius of the bottom end of the cylinder
     * @param segmentsW Defines the number of horizontal segments that make up the cylinder. Defaults to 16.
     * @param segmentsH Defines the number of vertical segments that make up the cylinder. Defaults to 1.
     * @param topClosed Defines whether the top end of the cylinder is closed (true) or open.
     * @param bottomClosed Defines whether the bottom end of the cylinder is closed (true) or open.
     * @param yUp Defines whether the cone poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    constructor(material?: MaterialBase, elementsType?: string, topRadius?: number, bottomRadius?: number, height?: number, segmentsW?: number, segmentsH?: number, topClosed?: boolean, bottomClosed?: boolean, surfaceClosed?: boolean, yUp?: boolean);
    /**
     * @inheritDoc
     */
    _pBuildGraphics(target: ElementsBase, elementsType: string): void;
    /**
     * @inheritDoc
     */
    _pBuildUVs(target: ElementsBase, elementsType: string): void;
}
