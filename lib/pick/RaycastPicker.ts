import Vector3D						= require("awayjs-core/lib/geom/Vector3D");


import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import Scene						= require("awayjs-display/lib/containers/Scene");
import View							= require("awayjs-display/lib/containers/View");
import IPicker						= require("awayjs-display/lib/pick/IPicker");
import PickingCollisionVO			= require("awayjs-display/lib/pick/PickingCollisionVO");
import RenderableListItem			= require("awayjs-display/lib/pool/RenderableListItem");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import RaycastCollector				= require("awayjs-display/lib/traverse/RaycastCollector");
import IEntity						= require("awayjs-display/lib/entities/IEntity");
import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");

/**
 * Picks a 3d object from a view or scene by 3D raycast calculations.
 * Performs an initial coarse boundary calculation to return a subset of entities whose bounding volumes intersect with the specified ray,
 * then triggers an optional picking collider on individual renderable objects to further determine the precise values of the picking ray collision.
 *
 * @class away.pick.RaycastPicker
 */
class RaycastPicker implements IPicker
{
	private _x:number;
	private _y:number;
	private _view:View;
	private _findClosestCollision:boolean;
	private _raycastCollector:RaycastCollector;
	private _ignoredRenderables = [];
	private _onlyMouseEnabled:boolean = true;

	private _renderables:Array<IRenderableOwner>;
	private _numRenderables:number = 0;
	private _hasCollisions:boolean;

	/**
	 * @inheritDoc
	 */
	public get onlyMouseEnabled():boolean
	{
		return this._onlyMouseEnabled;
	}

	public set onlyMouseEnabled(value:boolean)
	{
		this._onlyMouseEnabled = value;
	}

	/**
	 * Creates a new <code>RaycastPicker</code> object.
	 *
	 * @param findClosestCollision Determines whether the picker searches for the closest bounds collision along the ray,
	 * or simply returns the first collision encountered. Defaults to false.
	 */
	constructor(findClosestCollision:boolean = false)
	{
		this._raycastCollector = new RaycastCollector();

		this._findClosestCollision = findClosestCollision;
		this._renderables = new Array<IRenderableOwner>();
	}

	/**
	 * @inheritDoc
	 */
	public getViewCollision(x:number, y:number, view:View):PickingCollisionVO
	{
		this._x = x;
		this._y = y;
		this._view = view;

		//update ray
		var rayPosition:Vector3D = view.unproject(x, y, 0);
		var rayDirection:Vector3D = view.unproject(x, y, 1).subtract(rayPosition);

		return this.getSceneCollision(rayPosition, rayDirection, view.scene);
	}

	/**
	 * @inheritDoc
	 */
	public getSceneCollision(rayPosition:Vector3D, rayDirection:Vector3D, scene:Scene):PickingCollisionVO
	{
		//clear collector
		this._raycastCollector.clear();

		//setup ray vectors
		this._raycastCollector.rayPosition = rayPosition;
		this._raycastCollector.rayDirection = rayDirection;

		// collect entities to test
		scene.traversePartitions(this._raycastCollector);

		this._numRenderables = 0;
		var node:RenderableListItem = this._raycastCollector.renderableHead;
		var renderable:IRenderableOwner;

		while (node) {
			if (!this.isIgnored(renderable = node.renderable))
				this._renderables[this._numRenderables++] = renderable;

			node = node.next;
		}

		//early out if no collisions detected
		if (!this._numRenderables)
			return null;

		return this.getPickingCollisionVO(this._raycastCollector);
	}

//		public getEntityCollision(position:Vector3D, direction:Vector3D, entities:Array<IEntity>):PickingCollisionVO
//		{
//			this._numRenderables = 0;
//
//			var renderable:IEntity;
//			var l:number = entities.length;
//
//			for (var c:number = 0; c < l; c++) {
//				renderable = entities[c];
//
//				if (renderable.isIntersectingRay(position, direction))
//					this._renderables[this._numRenderables++] = renderable;
//			}
//
//			return this.getPickingCollisionVO(this._raycastCollector);
//		}

	public setIgnoreList(renderables)
	{
		this._ignoredRenderables = renderables;
	}

	private isIgnored(renderable:IRenderableOwner):boolean
	{
		if (this._onlyMouseEnabled && !renderable._iIsMouseEnabled())
			return true;

		var len:number = this._ignoredRenderables.length;
		for (var i:number = 0; i < len; i++)
			if (this._ignoredRenderables[i] == renderable)
				return true;

		return false;
	}

	private sortOnNearT(renderable1:IRenderableOwner, renderable2:IRenderableOwner):number
	{
		return renderable1._iPickingCollisionVO.rayEntryDistance > renderable2._iPickingCollisionVO.rayEntryDistance? 1 : -1;
	}

	private getPickingCollisionVO(collector:CollectorBase):PickingCollisionVO
	{
		// trim before sorting
		this._renderables.length = this._numRenderables;

		// Sort entities from closest to furthest.
		this._renderables = this._renderables.sort(this.sortOnNearT); // TODO - test sort filter in JS

		// ---------------------------------------------------------------------
		// Evaluate triangle collisions when needed.
		// Replaces collision data provided by bounds collider with more precise data.
		// ---------------------------------------------------------------------

		var shortestCollisionDistance:number = Number.MAX_VALUE;
		var bestCollisionVO:PickingCollisionVO;
		var pickingCollisionVO:PickingCollisionVO;
		var renderable:IRenderableOwner;
		var i:number;

		for (i = 0; i < this._numRenderables; ++i) {
			renderable = this._renderables[i];
			pickingCollisionVO = renderable._iPickingCollisionVO;
			if (renderable.pickingCollider) {
				// If a collision exists, update the collision data and stop all checks.
				if ((bestCollisionVO == null || pickingCollisionVO.rayEntryDistance < bestCollisionVO.rayEntryDistance) && renderable._iTestCollision(shortestCollisionDistance)) {
					shortestCollisionDistance = pickingCollisionVO.rayEntryDistance;
					bestCollisionVO = pickingCollisionVO;
					if (!this._findClosestCollision) {
						this.updateLocalPosition(pickingCollisionVO);
						return pickingCollisionVO;
					}
				}
			} else if (bestCollisionVO == null || pickingCollisionVO.rayEntryDistance < bestCollisionVO.rayEntryDistance) { // A bounds collision with no triangle collider stops all checks.
				// Note: a bounds collision with a ray origin inside its bounds is ONLY ever used
				// to enable the detection of a corresponsding triangle collision.
				// Therefore, bounds collisions with a ray origin inside its bounds can be ignored
				// if it has been established that there is NO triangle collider to test
				if (!pickingCollisionVO.rayOriginIsInsideBounds && this.getMasksCollision(renderable._iAssignedMasks()) ) {
					this.updateLocalPosition(pickingCollisionVO);
					return pickingCollisionVO;
				}
			}
		}

		//discard entities
		this._renderables.length = 0;

		return bestCollisionVO;
	}

	private getMasksCollision(masks:Array<Array<DisplayObject>>)
	{
		//horrible hack for 2d masks
		if (masks != null) {
			var position:Vector3D = this._view.unproject(this._x, this._y, 1000);
			var numLayers:number = masks.length;
			var children:Array<DisplayObject>;
			var numChildren:number;
			var layerHit:boolean;
			for (var i:number = 0; i < numLayers; i++) {
				children = masks[i];
				numChildren = children.length;
				layerHit = false;
				for (var j:number = 0; j < numChildren; j++) {
					if (children[j].hitTestPoint(position.x, position.y, true, true)) {
						layerHit = true;
						break;
					}
				}

				if (!layerHit)
					return false;
			}
		}

		return true;
	}


	private updateLocalPosition(pickingCollisionVO:PickingCollisionVO)
	{
		var collisionPos:Vector3D = ( pickingCollisionVO.localPosition == null )? (pickingCollisionVO.localPosition = new Vector3D()) : pickingCollisionVO.localPosition;

		var rayDir:Vector3D = pickingCollisionVO.localRayDirection;
		var rayPos:Vector3D = pickingCollisionVO.localRayPosition;
		var t:number = pickingCollisionVO.rayEntryDistance;
		collisionPos.x = rayPos.x + t*rayDir.x;
		collisionPos.y = rayPos.y + t*rayDir.y;
		collisionPos.z = rayPos.z + t*rayDir.z;
	}

	public dispose()
	{
		//TODO
	}
}

export = RaycastPicker;