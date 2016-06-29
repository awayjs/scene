"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MathConsts_1 = require("@awayjs/core/lib/geom/MathConsts");
var Vector3D_1 = require("@awayjs/core/lib/geom/Vector3D");
var LookAtController_1 = require("../controllers/LookAtController");
/**
 * Extended camera used to hover round a specified target object.
 *
 * @see    away.containers.View
 */
var HoverController = (function (_super) {
    __extends(HoverController, _super);
    /**
     * Creates a new <code>HoverController</code> object.
     */
    function HoverController(targetObject, lookAtObject, panAngle, tiltAngle, distance, minTiltAngle, maxTiltAngle, minPanAngle, maxPanAngle, steps, yFactor, wrapPanAngle) {
        if (targetObject === void 0) { targetObject = null; }
        if (lookAtObject === void 0) { lookAtObject = null; }
        if (panAngle === void 0) { panAngle = 0; }
        if (tiltAngle === void 0) { tiltAngle = 90; }
        if (distance === void 0) { distance = 1000; }
        if (minTiltAngle === void 0) { minTiltAngle = -90; }
        if (maxTiltAngle === void 0) { maxTiltAngle = 90; }
        if (minPanAngle === void 0) { minPanAngle = null; }
        if (maxPanAngle === void 0) { maxPanAngle = null; }
        if (steps === void 0) { steps = 8; }
        if (yFactor === void 0) { yFactor = 2; }
        if (wrapPanAngle === void 0) { wrapPanAngle = false; }
        _super.call(this, targetObject, lookAtObject);
        this._iCurrentPanAngle = 0;
        this._iCurrentTiltAngle = 90;
        this._panAngle = 0;
        this._tiltAngle = 90;
        this._distance = 1000;
        this._minPanAngle = -Infinity;
        this._maxPanAngle = Infinity;
        this._minTiltAngle = -90;
        this._maxTiltAngle = 90;
        this._steps = 8;
        this._yFactor = 2;
        this._wrapPanAngle = false;
        this._upAxis = new Vector3D_1.Vector3D();
        this.distance = distance;
        this.panAngle = panAngle;
        this.tiltAngle = tiltAngle;
        this.minPanAngle = (minPanAngle != null) ? minPanAngle : -Infinity;
        this.maxPanAngle = (maxPanAngle != null) ? maxPanAngle : Infinity;
        this.minTiltAngle = minTiltAngle;
        this.maxTiltAngle = maxTiltAngle;
        this.steps = steps;
        this.yFactor = yFactor;
        this.wrapPanAngle = wrapPanAngle;
        //values passed in contrustor are applied immediately
        this._iCurrentPanAngle = this._panAngle;
        this._iCurrentTiltAngle = this._tiltAngle;
    }
    Object.defineProperty(HoverController.prototype, "steps", {
        /**
         * Fractional step taken each time the <code>hover()</code> method is called. Defaults to 8.
         *
         * Affects the speed at which the <code>tiltAngle</code> and <code>panAngle</code> resolve to their targets.
         *
         * @see    #tiltAngle
         * @see    #panAngle
         */
        get: function () {
            return this._steps;
        },
        set: function (val) {
            val = (val < 1) ? 1 : val;
            if (this._steps == val)
                return;
            this._steps = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "panAngle", {
        /**
         * Rotation of the camera in degrees around the y axis. Defaults to 0.
         */
        get: function () {
            return this._panAngle;
        },
        set: function (val) {
            val = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, val));
            if (this._panAngle == val)
                return;
            this._panAngle = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "tiltAngle", {
        /**
         * Elevation angle of the camera in degrees. Defaults to 90.
         */
        get: function () {
            return this._tiltAngle;
        },
        set: function (val) {
            val = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, val));
            if (this._tiltAngle == val)
                return;
            this._tiltAngle = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "distance", {
        /**
         * Distance between the camera and the specified target. Defaults to 1000.
         */
        get: function () {
            return this._distance;
        },
        set: function (val) {
            if (this._distance == val)
                return;
            this._distance = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "minPanAngle", {
        /**
         * Minimum bounds for the <code>panAngle</code>. Defaults to -Infinity.
         *
         * @see    #panAngle
         */
        get: function () {
            return this._minPanAngle;
        },
        set: function (val) {
            if (this._minPanAngle == val)
                return;
            this._minPanAngle = val;
            this.panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "maxPanAngle", {
        /**
         * Maximum bounds for the <code>panAngle</code>. Defaults to Infinity.
         *
         * @see    #panAngle
         */
        get: function () {
            return this._maxPanAngle;
        },
        set: function (val) {
            if (this._maxPanAngle == val)
                return;
            this._maxPanAngle = val;
            this.panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "minTiltAngle", {
        /**
         * Minimum bounds for the <code>tiltAngle</code>. Defaults to -90.
         *
         * @see    #tiltAngle
         */
        get: function () {
            return this._minTiltAngle;
        },
        set: function (val) {
            if (this._minTiltAngle == val)
                return;
            this._minTiltAngle = val;
            this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "maxTiltAngle", {
        /**
         * Maximum bounds for the <code>tiltAngle</code>. Defaults to 90.
         *
         * @see    #tiltAngle
         */
        get: function () {
            return this._maxTiltAngle;
        },
        set: function (val) {
            if (this._maxTiltAngle == val)
                return;
            this._maxTiltAngle = val;
            this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "yFactor", {
        /**
         * Fractional difference in distance between the horizontal camera orientation and vertical camera orientation. Defaults to 2.
         *
         * @see    #distance
         */
        get: function () {
            return this._yFactor;
        },
        set: function (val) {
            if (this._yFactor == val)
                return;
            this._yFactor = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "wrapPanAngle", {
        /**
         * Defines whether the value of the pan angle wraps when over 360 degrees or under 0 degrees. Defaults to false.
         */
        get: function () {
            return this._wrapPanAngle;
        },
        set: function (val) {
            if (this._wrapPanAngle == val)
                return;
            this._wrapPanAngle = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the current tilt angle and pan angle values.
     *
     * Values are calculated using the defined <code>tiltAngle</code>, <code>panAngle</code> and <code>steps</code> variables.
     *
     * @param interpolate   If the update to a target pan- or tiltAngle is interpolated. Default is true.
     *
     * @see    #tiltAngle
     * @see    #panAngle
     * @see    #steps
     */
    HoverController.prototype.update = function (interpolate) {
        if (interpolate === void 0) { interpolate = true; }
        if (this._tiltAngle != this._iCurrentTiltAngle || this._panAngle != this._iCurrentPanAngle) {
            this._pControllerDirty = true;
            if (this._wrapPanAngle) {
                if (this._panAngle < 0) {
                    this._iCurrentPanAngle += this._panAngle % 360 + 360 - this._panAngle;
                    this._panAngle = this._panAngle % 360 + 360;
                }
                else {
                    this._iCurrentPanAngle += this._panAngle % 360 - this._panAngle;
                    this._panAngle = this._panAngle % 360;
                }
                while (this._panAngle - this._iCurrentPanAngle < -180)
                    this._iCurrentPanAngle -= 360;
                while (this._panAngle - this._iCurrentPanAngle > 180)
                    this._iCurrentPanAngle += 360;
            }
            if (interpolate) {
                this._iCurrentTiltAngle += (this._tiltAngle - this._iCurrentTiltAngle) / (this.steps + 1);
                this._iCurrentPanAngle += (this._panAngle - this._iCurrentPanAngle) / (this.steps + 1);
            }
            else {
                this._iCurrentPanAngle = this._panAngle;
                this._iCurrentTiltAngle = this._tiltAngle;
            }
            //snap coords if angle differences are close
            if ((Math.abs(this.tiltAngle - this._iCurrentTiltAngle) < 0.01) && (Math.abs(this._panAngle - this._iCurrentPanAngle) < 0.01)) {
                this._iCurrentTiltAngle = this._tiltAngle;
                this._iCurrentPanAngle = this._panAngle;
            }
        }
        var pos = (this.lookAtObject) ? this.lookAtObject.transform.position : (this.lookAtPosition) ? this.lookAtPosition : this._pOrigin;
        this.targetObject.x = pos.x + this.distance * Math.sin(this._iCurrentPanAngle * MathConsts_1.MathConsts.DEGREES_TO_RADIANS) * Math.cos(this._iCurrentTiltAngle * MathConsts_1.MathConsts.DEGREES_TO_RADIANS);
        this.targetObject.y = pos.y + this.distance * Math.sin(this._iCurrentTiltAngle * MathConsts_1.MathConsts.DEGREES_TO_RADIANS) * this.yFactor;
        this.targetObject.z = pos.z + this.distance * Math.cos(this._iCurrentPanAngle * MathConsts_1.MathConsts.DEGREES_TO_RADIANS) * Math.cos(this._iCurrentTiltAngle * MathConsts_1.MathConsts.DEGREES_TO_RADIANS);
        this._upAxis.x = -Math.sin(this._iCurrentPanAngle * MathConsts_1.MathConsts.DEGREES_TO_RADIANS) * Math.sin(this._iCurrentTiltAngle * MathConsts_1.MathConsts.DEGREES_TO_RADIANS);
        this._upAxis.y = Math.cos(this._iCurrentTiltAngle * MathConsts_1.MathConsts.DEGREES_TO_RADIANS);
        this._upAxis.z = -Math.cos(this._iCurrentPanAngle * MathConsts_1.MathConsts.DEGREES_TO_RADIANS) * Math.sin(this._iCurrentTiltAngle * MathConsts_1.MathConsts.DEGREES_TO_RADIANS);
        if (this._pTargetObject) {
            if (this._pLookAtPosition)
                this._pTargetObject.lookAt(this._pLookAtPosition, this._upAxis);
            else if (this._pLookAtObject)
                this._pTargetObject.lookAt(this._pLookAtObject.scene ? this._pLookAtObject.scenePosition : this._pLookAtObject.transform.position, this._upAxis);
        }
    };
    return HoverController;
}(LookAtController_1.LookAtController));
exports.HoverController = HoverController;
