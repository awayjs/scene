import { DisplayObject } from "../display/DisplayObject";
import { ElementsBase } from "../graphics/ElementsBase";
import { MaterialBase } from "../materials/MaterialBase";
import { PrefabBase } from "../prefabs/PrefabBase";
/**
 * PrimitivePrefabBase is an abstract base class for polytope prefabs, which are simple pre-built geometric shapes
 */
export declare class PrimitivePrefabBase extends PrefabBase {
    static assetType: string;
    _primitiveDirty: boolean;
    _uvDirty: boolean;
    _scaleU: number;
    _scaleV: number;
    private _material;
    private _elements;
    private _elementsType;
    /**
     *
     */
    readonly assetType: string;
    /**
     *
     */
    readonly elementsType: string;
    /**
     * The material with which to render the primitive.
     */
    material: MaterialBase;
    scaleU: number;
    scaleV: number;
    /**
     * Creates a new PrimitivePrefabBase object.
     *
     * @param material The material with which to render the object
     */
    constructor(material?: MaterialBase, elementsType?: string);
    /**
     * Builds the primitive's geometry when invalid. This method should not be called directly. The calling should
     * be triggered by the invalidateGraphics method (and in turn by updateGraphics).
     */
    _pBuildGraphics(target: ElementsBase, elementsType: string): void;
    /**
     * Builds the primitive's uv coordinates when invalid. This method should not be called directly. The calling
     * should be triggered by the invalidateUVs method (and in turn by updateUVs).
     */
    _pBuildUVs(target: ElementsBase, elementsType: string): void;
    /**
     * Invalidates the primitive, causing it to be updated when requested.
     */
    _pInvalidatePrimitive(): void;
    /**
     * Invalidates the primitive's uv coordinates, causing them to be updated when requested.
     */
    _pInvalidateUVs(): void;
    /**
     * Updates the geometry when invalid.
     */
    private updateGraphics();
    /**
     * Updates the uv coordinates when invalid.
     */
    private updateUVs();
    _iValidate(): void;
    _pCreateObject(): DisplayObject;
}
