import { ElementsBase } from "../graphics/ElementsBase";
import { MaterialBase } from "../materials/MaterialBase";
import { PrimitivePrefabBase } from "../prefabs/PrimitivePrefabBase";
/**
 * A Capsule primitive sprite.
 */
export declare class PrimitiveCapsulePrefab extends PrimitivePrefabBase {
    private _radius;
    private _height;
    private _segmentsW;
    private _segmentsH;
    private _yUp;
    private _numVertices;
    /**
     * The radius of the capsule.
     */
    radius: number;
    /**
     * The height of the capsule.
     */
    height: number;
    /**
     * Defines the number of horizontal segments that make up the capsule. Defaults to 16.
     */
    segmentsW: number;
    /**
     * Defines the number of vertical segments that make up the capsule. Defaults to 15. Must be uneven.
     */
    segmentsH: number;
    /**
     * Defines whether the capsule poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    yUp: boolean;
    /**
     * Creates a new Capsule object.
     * @param radius The radius of the capsule.
     * @param height The height of the capsule.
     * @param segmentsW Defines the number of horizontal segments that make up the capsule. Defaults to 16.
     * @param segmentsH Defines the number of vertical segments that make up the capsule. Defaults to 15. Must be uneven value.
     * @param yUp Defines whether the capsule poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    constructor(material?: MaterialBase, elementsType?: string, radius?: number, height?: number, segmentsW?: number, segmentsH?: number, yUp?: boolean);
    /**
     * @inheritDoc
     */
    _pBuildGraphics(target: ElementsBase, elementsType: string): void;
    /**
     * @inheritDoc
     */
    _pBuildUVs(target: ElementsBase, elementsType: string): void;
}
