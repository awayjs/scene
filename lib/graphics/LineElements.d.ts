import { AttributesBuffer } from "@awayjs/core/lib/attributes/AttributesBuffer";
import { AttributesView } from "@awayjs/core/lib/attributes/AttributesView";
import { Byte4Attributes } from "@awayjs/core/lib/attributes/Byte4Attributes";
import { Float1Attributes } from "@awayjs/core/lib/attributes/Float1Attributes";
import { Box } from "@awayjs/core/lib/geom/Box";
import { Sphere } from "@awayjs/core/lib/geom/Sphere";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { ElementsBase } from "../graphics/ElementsBase";
import { MaterialBase } from "../materials/MaterialBase";
import { IPickingCollider } from "../pick/IPickingCollider";
import { PickingCollision } from "../pick/PickingCollision";
/**
 * @class LineElements
 */
export declare class LineElements extends ElementsBase {
    static assetType: string;
    private _positions;
    private _thickness;
    private _colors;
    /**
     *
     * @returns {string}
     */
    readonly assetType: string;
    /**
     *
     */
    readonly positions: AttributesView;
    /**
     *
     */
    readonly thickness: Float1Attributes;
    /**
     *
     */
    readonly colors: Byte4Attributes;
    /**
     *
     */
    constructor(concatenatedBuffer?: AttributesBuffer);
    getBoxBounds(target?: Box): Box;
    getSphereBounds(center: Vector3D, target?: Sphere): Sphere;
    /**
     *
     */
    setPositions(array: Array<number>, offset?: number): any;
    setPositions(arrayBufferView: ArrayBufferView, offset?: number): any;
    setPositions(attributesView: AttributesView, offset?: number): any;
    /**
     * Updates the thickness.
     */
    setThickness(array: Array<number>, offset?: number): any;
    setThickness(float32Array: Float32Array, offset?: number): any;
    setThickness(float1Attributes: Float1Attributes, offset?: number): any;
    /**
     *
     */
    setColors(array: Array<number>, offset?: number): any;
    setColors(float32Array: Float32Array, offset?: number): any;
    setColors(uint8Array: Uint8Array, offset?: number): any;
    setColors(byte4Attributes: Byte4Attributes, offset?: number): any;
    /**
     *
     */
    dispose(): void;
    /**
     * Clones the current object
     * @return An exact duplicate of the current object.
     */
    clone(): LineElements;
    _iTestCollision(pickingCollider: IPickingCollider, material: MaterialBase, pickingCollision: PickingCollision, count?: number, offset?: number): boolean;
}
