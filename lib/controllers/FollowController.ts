import DisplayObject			from "awayjs-display/lib/display/DisplayObject";
import HoverController			from "awayjs-display/lib/controllers/HoverController";

/**
 * Controller used to follow behind an object on the XZ plane, with an optional
 * elevation (tiltAngle).
 *
 * @see    away3d.containers.View3D
 */
class FollowController extends HoverController
{
	constructor(targetObject:DisplayObject = null, lookAtObject:DisplayObject = null, tiltAngle:number = 45, distance:number = 700)
	{
		super(targetObject, lookAtObject, 0, tiltAngle, distance);
	}

	public update(interpolate:boolean = true)
	{
		if (!this.lookAtObject)
			return;

		this.panAngle = this._pLookAtObject.rotationY - 180;
		super.update();
	}
}

export default FollowController;