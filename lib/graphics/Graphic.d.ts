import { Box } from "@awayjs/core/lib/geom/Box";
import { Matrix3D } from "@awayjs/core/lib/geom/Matrix3D";
import { Sphere } from "@awayjs/core/lib/geom/Sphere";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { AssetBase } from "@awayjs/core/lib/library/AssetBase";
import { IAnimator } from "../animators/IAnimator";
import { MaterialBase } from "../materials/MaterialBase";
import { Style } from "../base/Style";
import { IRenderable } from "../base/IRenderable";
import { Graphics } from "../graphics/Graphics";
import { ElementsBase } from "../graphics/ElementsBase";
import { IPickingCollider } from "../pick/IPickingCollider";
import { PickingCollision } from "../pick/PickingCollision";
/**
 * Graphic wraps a Elements as a scene graph instantiation. A Graphic is owned by a Sprite object.
 *
 *
 * @see away.base.ElementsBase
 * @see away.entities.Sprite
 *
 * @class away.base.Graphic
 */
export declare class Graphic extends AssetBase implements IRenderable {
    static _available: Array<Graphic>;
    static assetType: string;
    _iIndex: number;
    private _boxBounds;
    private _boxBoundsInvalid;
    private _sphereBounds;
    private _sphereBoundsInvalid;
    private _style;
    private _material;
    private _elements;
    private _onInvalidatePropertiesDelegate;
    private _onInvalidateVerticesDelegate;
    count: number;
    offset: number;
    parent: Graphics;
    /**
     * The Elements object which provides the geometry data for this Graphic.
     */
    elements: ElementsBase;
    /**
     *
     */
    readonly assetType: string;
    /**
     *
     */
    readonly animator: IAnimator;
    /**
     * The material used to render the current TriangleGraphic. If set to null, its parent Sprite's material will be used instead.
     */
    material: MaterialBase;
    /**
     * The style used to render the current TriangleGraphic. If set to null, its parent Sprite's style will be used instead.
     */
    style: Style;
    /**
     * Creates a new Graphic object
     */
    constructor(index: number, parent: Graphics, elements: ElementsBase, material?: MaterialBase, style?: Style, count?: number, offset?: number);
    /**
     *
     */
    dispose(): void;
    invalidate(): void;
    invalidateElements(): void;
    invalidateSurface(): void;
    _iGetExplicitMaterial(): MaterialBase;
    _iGetExplicitStyle(): Style;
    private _onInvalidateProperties(event);
    private _onInvalidateVertices(event);
    /**
     * //TODO
     *
     * @param shortestCollisionDistance
     * @param findClosest
     * @returns {boolean}
     *
     * @internal
     */
    _iTestCollision(pickingCollision: PickingCollision, pickingCollider: IPickingCollider): boolean;
    applyTransformation(transform: Matrix3D): void;
    hitTestPoint(x: number, y: number, z: number): boolean;
    scale(scale: number): void;
    scaleUV(scaleU?: number, scaleV?: number): void;
    getBoxBounds(): Box;
    getSphereBounds(center: Vector3D, target?: Sphere): Sphere;
}
