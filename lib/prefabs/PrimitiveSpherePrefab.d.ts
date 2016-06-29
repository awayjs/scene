import { ElementsBase } from "../graphics/ElementsBase";
import { MaterialBase } from "../materials/MaterialBase";
import { PrimitivePrefabBase } from "../prefabs/PrimitivePrefabBase";
/**
 * A UV Sphere primitive sprite.
 */
export declare class PrimitiveSpherePrefab extends PrimitivePrefabBase {
    private _radius;
    private _segmentsW;
    private _segmentsH;
    private _yUp;
    /**
     * The radius of the sphere.
     */
    radius: number;
    /**
     * Defines the number of horizontal segments that make up the sphere. Defaults to 16.
     */
    segmentsW: number;
    /**
     * Defines the number of vertical segments that make up the sphere. Defaults to 12.
     */
    segmentsH: number;
    /**
     * Defines whether the sphere poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    yUp: boolean;
    /**
     * Creates a new Sphere object.
     *
     * @param radius The radius of the sphere.
     * @param segmentsW Defines the number of horizontal segments that make up the sphere.
     * @param segmentsH Defines the number of vertical segments that make up the sphere.
     * @param yUp Defines whether the sphere poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    constructor(material?: MaterialBase, elementsType?: string, radius?: number, segmentsW?: number, segmentsH?: number, yUp?: boolean);
    /**
     * @inheritDoc
     */
    _pBuildGraphics(target: ElementsBase, elementsType: string): void;
    /**
     * @inheritDoc
     */
    _pBuildUVs(target: ElementsBase, elementsType: string): void;
}
