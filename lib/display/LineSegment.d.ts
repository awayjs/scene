import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { ITraverser } from "../ITraverser";
import { IAnimator } from "../animators/IAnimator";
import { DisplayObject } from "../display/DisplayObject";
import { IRenderable } from "../base/IRenderable";
import { IEntity } from "../display/IEntity";
import { MaterialBase } from "../materials/MaterialBase";
import { Style } from "../base/Style";
import { IPickingCollider } from "../pick/IPickingCollider";
import { PickingCollision } from "../pick/PickingCollision";
/**
 * A Line Segment primitive.
 */
export declare class LineSegment extends DisplayObject implements IEntity, IRenderable {
    private _style;
    private _onInvalidatePropertiesDelegate;
    static assetType: string;
    private _animator;
    private _material;
    _startPosition: Vector3D;
    _endPosition: Vector3D;
    _halfThickness: number;
    /**
     * Defines the animator of the line segment. Act on the line segment's geometry. Defaults to null
     */
    readonly animator: IAnimator;
    /**
     *
     */
    readonly assetType: string;
    /**
     *
     */
    readonly startPostion: Vector3D;
    startPosition: Vector3D;
    /**
     *
     */
    endPosition: Vector3D;
    /**
     *
     */
    material: MaterialBase;
    /**
     *
     */
    thickness: number;
    /**
     * Create a line segment
     *
     * @param startPosition Start position of the line segment
     * @param endPosition Ending position of the line segment
     * @param thickness Thickness of the line
     */
    constructor(material: MaterialBase, startPosition: Vector3D, endPosition: Vector3D, thickness?: number);
    /**
     * The style used to render the current LineSegment. If set to null, the default style of the material will be used instead.
     */
    style: Style;
    /**
     * @protected
     */
    _pUpdateBoxBounds(): void;
    _pUpdateSphereBounds(): void;
    /**
     * @private
     */
    invalidateElements(): void;
    invalidateSurface(): void;
    private _onInvalidateProperties(event);
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
    _acceptTraverser(traverser: ITraverser): void;
}
