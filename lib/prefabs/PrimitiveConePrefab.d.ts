import { MaterialBase } from "../materials/MaterialBase";
import { PrimitiveCylinderPrefab } from "../prefabs/PrimitiveCylinderPrefab";
/**
 * A UV Cone primitive sprite.
 */
export declare class PrimitiveConePrefab extends PrimitiveCylinderPrefab {
    /**
     * The radius of the bottom end of the cone.
     */
    radius: number;
    /**
     * Creates a new Cone object.
     * @param radius The radius of the bottom end of the cone
     * @param height The height of the cone
     * @param segmentsW Defines the number of horizontal segments that make up the cone. Defaults to 16.
     * @param segmentsH Defines the number of vertical segments that make up the cone. Defaults to 1.
     * @param yUp Defines whether the cone poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    constructor(material?: MaterialBase, elementsType?: string, radius?: number, height?: number, segmentsW?: number, segmentsH?: number, closed?: boolean, yUp?: boolean);
}
