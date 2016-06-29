import { MaterialBase } from "../materials/MaterialBase";
import { PrimitiveCylinderPrefab } from "../prefabs/PrimitiveCylinderPrefab";
/**
 * A UV RegularPolygon primitive sprite.
 */
export declare class PrimitivePolygonPrefab extends PrimitiveCylinderPrefab {
    /**
     * The radius of the regular polygon.
     */
    radius: number;
    /**
     * The number of sides of the regular polygon.
     */
    sides: number;
    /**
     * The number of subdivisions from the edge to the center of the regular polygon.
     */
    subdivisions: number;
    /**
     * Creates a new RegularPolygon disc object.
     * @param radius The radius of the regular polygon
     * @param sides Defines the number of sides of the regular polygon.
     * @param yUp Defines whether the regular polygon should lay on the Y-axis (true) or on the Z-axis (false).
     */
    constructor(material?: MaterialBase, elementsType?: string, radius?: number, sides?: number, yUp?: boolean);
}
