import { AttributesView } from "@awayjs/core/lib/attributes/AttributesView";
import { Float4Attributes } from "@awayjs/core/lib/attributes/Float4Attributes";
import { Float3Attributes } from "@awayjs/core/lib/attributes/Float3Attributes";
import { Short3Attributes } from "@awayjs/core/lib/attributes/Short3Attributes";
import { Box } from "@awayjs/core/lib/geom/Box";
import { Sphere } from "@awayjs/core/lib/geom/Sphere";
import { Matrix3D } from "@awayjs/core/lib/geom/Matrix3D";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { ElementsBase } from "../graphics/ElementsBase";
import { MaterialBase } from "../materials/MaterialBase";
import { IPickingCollider } from "../pick/IPickingCollider";
import { PickingCollision } from "../pick/PickingCollision";
/**
 * @class away.base.TriangleElements
 */
export declare class TriangleElements extends ElementsBase {
    static assetType: string;
    private _faceNormalsDirty;
    private _faceTangentsDirty;
    private _positions;
    private _normals;
    private _tangents;
    private _uvs;
    private _jointIndices;
    private _jointWeights;
    private _useCondensedIndices;
    private _condensedIndexLookUp;
    private _jointsPerVertex;
    private _autoDeriveNormals;
    private _autoDeriveTangents;
    private _faceNormals;
    private _faceTangents;
    hitTestCache: Object;
    readonly assetType: string;
    /**
     * Offers the option of enabling GPU accelerated animation on skeletons larger than 32 joints
     * by condensing the number of joint index values required per sprite. Only applicable to
     * skeleton animations that utilise more than one sprite object. Defaults to false.
     */
    useCondensedIndices: boolean;
    /**
     *
     */
    jointsPerVertex: number;
    /**
     * True if the vertex normals should be derived from the geometry, false if the vertex normals are set
     * explicitly.
     */
    autoDeriveNormals: boolean;
    /**
     * True if the vertex tangents should be derived from the geometry, false if the vertex normals are set
     * explicitly.
     */
    autoDeriveTangents: boolean;
    /**
     *
     */
    readonly positions: AttributesView;
    /**
     *
     */
    readonly normals: Float3Attributes;
    /**
     *
     */
    readonly tangents: Float3Attributes;
    /**
     * The raw data of the face normals, in the same order as the faces are listed in the index list.
     */
    readonly faceNormals: Float4Attributes;
    /**
     * The raw data of the face tangets, in the same order as the faces are listed in the index list.
     */
    readonly faceTangents: Float3Attributes;
    /**
     *
     */
    readonly uvs: AttributesView;
    /**
     *
     */
    readonly jointIndices: AttributesView;
    /**
     *
     */
    readonly jointWeights: AttributesView;
    readonly condensedIndexLookUp: Array<number>;
    getBoxBounds(target?: Box, count?: number, offset?: number): Box;
    getSphereBounds(center: Vector3D, target?: Sphere, count?: number, offset?: number): Sphere;
    hitTestPoint(x: number, y: number, z: number, box: Box, count?: number, offset?: number): boolean;
    /**
     *
     */
    setPositions(array: Array<number>, offset?: number): any;
    setPositions(arrayBufferView: ArrayBufferView, offset?: number): any;
    setPositions(attributesView: AttributesView, offset?: number): any;
    /**
     * Updates the vertex normals based on the geometry.
     */
    setNormals(array: Array<number>, offset?: number): any;
    setNormals(float32Array: Float32Array, offset?: number): any;
    setNormals(float3Attributes: Float3Attributes, offset?: number): any;
    /**
     * Updates the vertex tangents based on the geometry.
     */
    setTangents(array: Array<number>, offset?: number): any;
    setTangents(float32Array: Float32Array, offset?: number): any;
    setTangents(float3Attributes: Float3Attributes, offset?: number): any;
    /**
     * Updates the uvs based on the geometry.
     */
    setUVs(array: Array<number>, offset?: number): any;
    setUVs(arrayBufferView: ArrayBufferView, offset?: number): any;
    setUVs(attributesView: AttributesView, offset?: number): any;
    /**
     * Updates the joint indices
     */
    setJointIndices(array: Array<number>, offset?: number): any;
    setJointIndices(float32Array: Float32Array, offset?: number): any;
    setJointIndices(attributesView: AttributesView, offset?: number): any;
    /**
     * Updates the joint weights.
     */
    setJointWeights(array: Array<number>, offset?: number): any;
    setJointWeights(float32Array: Float32Array, offset?: number): any;
    setJointWeights(attributesView: AttributesView, offset?: number): any;
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
    copyTo(elements: TriangleElements): void;
    /**
     * Clones the current object
     * @return An exact duplicate of the current object.
     */
    clone(): TriangleElements;
    scaleUV(scaleU?: number, scaleV?: number, count?: number, offset?: number): void;
    /**
     * Scales the geometry.
     * @param scale The amount by which to scale.
     */
    scale(scale: number, count?: number, offset?: number): void;
    applyTransformation(transform: Matrix3D, count?: number, offset?: number): void;
    /**
     * Updates the tangents for each face.
     */
    private updateFaceTangents();
    /**
     * Updates the normals for each face.
     */
    private updateFaceNormals();
    _iTestCollision(pickingCollider: IPickingCollider, material: MaterialBase, pickingCollision: PickingCollision, count?: number, offset?: number): boolean;
}
