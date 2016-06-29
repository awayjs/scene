"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Vector3D_1 = require("@awayjs/core/lib/geom/Vector3D");
var LookAtController_1 = require("../controllers/LookAtController");
/**
 * Uses spring physics to animate the target object towards a position that is
 * defined as the lookAtTarget object's position plus the vector defined by the
 * positionOffset property.
 */
var SpringController = (function (_super) {
    __extends(SpringController, _super);
    function SpringController(targetObject, lookAtObject, stiffness, mass, damping) {
        if (targetObject === void 0) { targetObject = null; }
        if (lookAtObject === void 0) { lookAtObject = null; }
        if (stiffness === void 0) { stiffness = 1; }
        if (mass === void 0) { mass = 40; }
        if (damping === void 0) { damping = 4; }
        _super.call(this, targetObject, lookAtObject);
        /**
         * Offset of spring center from target in target object space, ie: Where the camera should ideally be in the target object space.
         */
        this.positionOffset = new Vector3D_1.Vector3D(0, 500, -1000);
        this.stiffness = stiffness;
        this.damping = damping;
        this.mass = mass;
        this._velocity = new Vector3D_1.Vector3D();
        this._dv = new Vector3D_1.Vector3D();
        this._stretch = new Vector3D_1.Vector3D();
        this._force = new Vector3D_1.Vector3D();
        this._acceleration = new Vector3D_1.Vector3D();
        this._desiredPosition = new Vector3D_1.Vector3D();
    }
    SpringController.prototype.update = function (interpolate) {
        if (interpolate === void 0) { interpolate = true; }
        var offs;
        if (!this._pLookAtObject || !this._pTargetObject)
            return;
        this._pControllerDirty = true;
        offs = this._pLookAtObject.transform.matrix3D.deltaTransformVector(this.positionOffset);
        this._desiredPosition.x = this._pLookAtObject.x + offs.x;
        this._desiredPosition.y = this._pLookAtObject.y + offs.y;
        this._desiredPosition.z = this._pLookAtObject.z + offs.z;
        this._stretch = this._pTargetObject.transform.position.add(this._desiredPosition);
        this._stretch.scaleBy(-this.stiffness);
        this._dv.copyFrom(this._velocity);
        this._dv.scaleBy(this.damping);
        this._force.x = this._stretch.x - this._dv.x;
        this._force.y = this._stretch.y - this._dv.y;
        this._force.z = this._stretch.z - this._dv.z;
        this._acceleration.copyFrom(this._force);
        this._acceleration.scaleBy(1 / this.mass);
        this._velocity.incrementBy(this._acceleration);
        var position = this._pTargetObject.transform.position.add(this._velocity);
        this._pTargetObject.transform.moveTo(position.x, position.y, position.z);
        _super.prototype.update.call(this);
    };
    return SpringController;
}(LookAtController_1.LookAtController));
exports.SpringController = SpringController;
