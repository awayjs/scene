import { AttributesBuffer } from "@awayjs/core/lib/attributes/AttributesBuffer";
import { AttributesView } from "@awayjs/core/lib/attributes/AttributesView";
import { Short3Attributes } from "@awayjs/core/lib/attributes/Short3Attributes";
import { Box } from "@awayjs/core/lib/geom/Box";
import { Sphere } from "@awayjs/core/lib/geom/Sphere";
import { Matrix3D } from "@awayjs/core/lib/geom/Matrix3D";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { AssetBase } from "@awayjs/core/lib/library/AssetBase";
import { IPickingCollider } from "../pick/IPickingCollider";
import { PickingCollision } from "../pick/PickingCollision";
import { MaterialBase } from "../materials/MaterialBase";
/**
 * @class away.base.TriangleElements
 */
export declare class ElementsBase extends AssetBase {
    private _indices;
    private _customAttributesNames;
    private _customAttributes;
    private _numElements;
    _numVertices: number;
    _concatenatedBuffer: AttributesBuffer;
    private _invalidateIndices;
    _verticesDirty: Object;
    _invalidateVertices: Object;
    readonly concatenatedBuffer: AttributesBuffer;
    /**
     * The raw index data that define the faces.
     */
    readonly indices: Short3Attributes;
    /**
     *
     */
    getCustomAtributesNames(): Array<string>;
    /**
     *
     */
    getCustomAtributes(name: string): AttributesView;
    /**
     * The total amount of triangles in the TriangleElements.
     */
    readonly numElements: number;
    readonly numVertices: number;
    /**
     *
     */
    constructor(concatenatedBuffer?: AttributesBuffer);
    copyTo(elements: ElementsBase): void;
    /**
     *
     */
    dispose(): void;
    /**
     * Updates the face indices of the TriangleElements.
     *
     * @param indices The face indices to upload.
     */
    setIndices(array: Array<number>, offset?: number): any;
    setIndices(uint16Array: Uint16Array, offset?: number): any;
    setIndices(short3Attributes: Short3Attributes, offset?: number): any;
    /**
     * Updates custom attributes.
     */
    setCustomAttributes(name: string, array: Array<number>, offset?: number): any;
    setCustomAttributes(name: string, arrayBufferView: ArrayBufferView, offset?: number): any;
    setCustomAttributes(name: string, attributesView: AttributesView, offset?: number): any;
    /**
     * Clones the current object
     * @return An exact duplicate of the current object.
     */
    clone(): ElementsBase;
    applyTransformation(transform: Matrix3D, count?: number, offset?: number): void;
    /**
     * Scales the geometry.
     * @param scale The amount by which to scale.
     */
    scale(scale: number, count?: number, offset?: number): void;
    scaleUV(scaleU?: number, scaleV?: number, count?: number, offset?: number): void;
    getBoxBounds(target?: Box, count?: number, offset?: number): Box;
    getSphereBounds(center: Vector3D, target?: Sphere, count?: number, offset?: number): Sphere;
    hitTestPoint(x: number, y: number, z: number, box: Box, count?: number, offset?: number): boolean;
    invalidateIndices(): void;
    private clearIndices();
    invalidateVertices(attributesView: AttributesView): void;
    clearVertices(attributesView: AttributesView): void;
    _iTestCollision(pickingCollider: IPickingCollider, material: MaterialBase, pickingCollision: PickingCollision, count?: number, offset?: number): boolean;
}
