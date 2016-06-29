import { ElementsBase } from "../graphics/ElementsBase";
import { MaterialBase } from "../materials/MaterialBase";
import { PrimitivePrefabBase } from "../prefabs/PrimitivePrefabBase";
/**
 * A UV Cylinder primitive sprite.
 */
export declare class PrimitiveTorusPrefab extends PrimitivePrefabBase {
    private _radius;
    private _tubeRadius;
    private _segmentsR;
    private _segmentsT;
    private _yUp;
    private _numVertices;
    /**
     * The radius of the torus.
     */
    radius: number;
    /**
     * The radius of the inner tube of the torus.
     */
    tubeRadius: number;
    /**
     * Defines the number of horizontal segments that make up the torus. Defaults to 16.
     */
    segmentsR: number;
    /**
     * Defines the number of vertical segments that make up the torus. Defaults to 8.
     */
    segmentsT: number;
    /**
     * Defines whether the torus poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    yUp: boolean;
    /**
     * Creates a new <code>Torus</code> object.
     * @param radius The radius of the torus.
     * @param tuebRadius The radius of the inner tube of the torus.
     * @param segmentsR Defines the number of horizontal segments that make up the torus.
     * @param segmentsT Defines the number of vertical segments that make up the torus.
     * @param yUp Defines whether the torus poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    constructor(material?: MaterialBase, elementsType?: string, radius?: number, tubeRadius?: number, segmentsR?: number, segmentsT?: number, yUp?: boolean);
    /**
     * @inheritDoc
     */
    _pBuildGraphics(target: ElementsBase, elementsType: string): void;
    /**
     * @inheritDoc
     */
    _pBuildUVs(target: ElementsBase, elementsType: string): void;
}
