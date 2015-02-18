var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MathConsts = require("awayjs-core/lib/geom/MathConsts");
var ControllerBase = require("awayjs-display/lib/controllers/ControllerBase");
/**
 * Extended camera used to hover round a specified target object.
 *
 * @see    away3d.containers.View3D
 */
var FirstPersonController = (function (_super) {
    __extends(FirstPersonController, _super);
    /**
     * Creates a new <code>HoverController</code> object.
     */
    function FirstPersonController(targetObject, panAngle, tiltAngle, minTiltAngle, maxTiltAngle, steps, wrapPanAngle) {
        if (targetObject === void 0) { targetObject = null; }
        if (panAngle === void 0) { panAngle = 0; }
        if (tiltAngle === void 0) { tiltAngle = 90; }
        if (minTiltAngle === void 0) { minTiltAngle = -90; }
        if (maxTiltAngle === void 0) { maxTiltAngle = 90; }
        if (steps === void 0) { steps = 8; }
        if (wrapPanAngle === void 0) { wrapPanAngle = false; }
        _super.call(this, targetObject);
        this._iCurrentPanAngle = 0;
        this._iCurrentTiltAngle = 90;
        this._panAngle = 0;
        this._tiltAngle = 90;
        this._minTiltAngle = -90;
        this._maxTiltAngle = 90;
        this._steps = 8;
        this._walkIncrement = 0;
        this._strafeIncrement = 0;
        this._wrapPanAngle = false;
        this.fly = false;
        this.panAngle = panAngle;
        this.tiltAngle = tiltAngle;
        this.minTiltAngle = minTiltAngle;
        this.maxTiltAngle = maxTiltAngle;
        this.steps = steps;
        this.wrapPanAngle = wrapPanAngle;
        //values passed in contrustor are applied immediately
        this._iCurrentPanAngle = this._panAngle;
        this._iCurrentTiltAngle = this._tiltAngle;
    }
    Object.defineProperty(FirstPersonController.prototype, "steps", {
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
    Object.defineProperty(FirstPersonController.prototype, "panAngle", {
        /**
         * Rotation of the camera in degrees around the y axis. Defaults to 0.
         */
        get: function () {
            return this._panAngle;
        },
        set: function (val) {
            if (this._panAngle == val)
                return;
            this._panAngle = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirstPersonController.prototype, "tiltAngle", {
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
    Object.defineProperty(FirstPersonController.prototype, "minTiltAngle", {
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
    Object.defineProperty(FirstPersonController.prototype, "maxTiltAngle", {
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
    Object.defineProperty(FirstPersonController.prototype, "wrapPanAngle", {
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
    FirstPersonController.prototype.update = function (interpolate) {
        if (interpolate === void 0) { interpolate = true; }
        if (this._tiltAngle != this._iCurrentTiltAngle || this._panAngle != this._iCurrentPanAngle) {
            this.pNotifyUpdate();
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
                this._iCurrentTiltAngle = this._tiltAngle;
                this._iCurrentPanAngle = this._panAngle;
            }
            //snap coords if angle differences are close
            if ((Math.abs(this.tiltAngle - this._iCurrentTiltAngle) < 0.01) && (Math.abs(this._panAngle - this._iCurrentPanAngle) < 0.01)) {
                this._iCurrentTiltAngle = this._tiltAngle;
                this._iCurrentPanAngle = this._panAngle;
            }
        }
        this.targetObject.rotationX = this._iCurrentTiltAngle;
        this.targetObject.rotationY = this._iCurrentPanAngle;
        if (this._walkIncrement) {
            if (this.fly) {
                this.targetObject.transform.moveForward(this._walkIncrement);
            }
            else {
                this.targetObject.x += this._walkIncrement * Math.sin(this._panAngle * MathConsts.DEGREES_TO_RADIANS);
                this.targetObject.z += this._walkIncrement * Math.cos(this._panAngle * MathConsts.DEGREES_TO_RADIANS);
            }
            this._walkIncrement = 0;
        }
        if (this._strafeIncrement) {
            this.targetObject.transform.moveRight(this._strafeIncrement);
            this._strafeIncrement = 0;
        }
    };
    FirstPersonController.prototype.incrementWalk = function (val) {
        if (val == 0)
            return;
        this._walkIncrement += val;
        this.pNotifyUpdate();
    };
    FirstPersonController.prototype.incrementStrafe = function (val) {
        if (val == 0)
            return;
        this._strafeIncrement += val;
        this.pNotifyUpdate();
    };
    return FirstPersonController;
})(ControllerBase);
module.exports = FirstPersonController;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9jb250cm9sbGVycy9GaXJzdFBlcnNvbkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOlsiRmlyc3RQZXJzb25Db250cm9sbGVyIiwiRmlyc3RQZXJzb25Db250cm9sbGVyLmNvbnN0cnVjdG9yIiwiRmlyc3RQZXJzb25Db250cm9sbGVyLnN0ZXBzIiwiRmlyc3RQZXJzb25Db250cm9sbGVyLnBhbkFuZ2xlIiwiRmlyc3RQZXJzb25Db250cm9sbGVyLnRpbHRBbmdsZSIsIkZpcnN0UGVyc29uQ29udHJvbGxlci5taW5UaWx0QW5nbGUiLCJGaXJzdFBlcnNvbkNvbnRyb2xsZXIubWF4VGlsdEFuZ2xlIiwiRmlyc3RQZXJzb25Db250cm9sbGVyLndyYXBQYW5BbmdsZSIsIkZpcnN0UGVyc29uQ29udHJvbGxlci51cGRhdGUiLCJGaXJzdFBlcnNvbkNvbnRyb2xsZXIuaW5jcmVtZW50V2FsayIsIkZpcnN0UGVyc29uQ29udHJvbGxlci5pbmNyZW1lbnRTdHJhZmUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sVUFBVSxXQUFjLGlDQUFpQyxDQUFDLENBQUM7QUFFbEUsSUFBTyxjQUFjLFdBQWEsK0NBQStDLENBQUMsQ0FBQztBQUduRixBQUtBOzs7O0dBREc7SUFDRyxxQkFBcUI7SUFBU0EsVUFBOUJBLHFCQUFxQkEsVUFBdUJBO0lBMElqREE7O09BRUdBO0lBQ0hBLFNBN0lLQSxxQkFBcUJBLENBNklkQSxZQUFpQ0EsRUFBRUEsUUFBbUJBLEVBQUVBLFNBQXFCQSxFQUFFQSxZQUF5QkEsRUFBRUEsWUFBd0JBLEVBQUVBLEtBQWdCQSxFQUFFQSxZQUE0QkE7UUFBbExDLDRCQUFpQ0EsR0FBakNBLG1CQUFpQ0E7UUFBRUEsd0JBQW1CQSxHQUFuQkEsWUFBbUJBO1FBQUVBLHlCQUFxQkEsR0FBckJBLGNBQXFCQTtRQUFFQSw0QkFBeUJBLEdBQXpCQSxnQkFBdUJBLEVBQUVBO1FBQUVBLDRCQUF3QkEsR0FBeEJBLGlCQUF3QkE7UUFBRUEscUJBQWdCQSxHQUFoQkEsU0FBZ0JBO1FBQUVBLDRCQUE0QkEsR0FBNUJBLG9CQUE0QkE7UUFFN0xBLGtCQUFNQSxZQUFZQSxDQUFDQSxDQUFDQTtRQTdJZEEsc0JBQWlCQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUM1QkEsdUJBQWtCQSxHQUFVQSxFQUFFQSxDQUFDQTtRQUUvQkEsY0FBU0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDckJBLGVBQVVBLEdBQVVBLEVBQUVBLENBQUNBO1FBQ3ZCQSxrQkFBYUEsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFDM0JBLGtCQUFhQSxHQUFVQSxFQUFFQSxDQUFDQTtRQUMxQkEsV0FBTUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDbEJBLG1CQUFjQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUMxQkEscUJBQWdCQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUM1QkEsa0JBQWFBLEdBQVdBLEtBQUtBLENBQUNBO1FBRS9CQSxRQUFHQSxHQUFXQSxLQUFLQSxDQUFDQTtRQW1JMUJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBO1FBQ3pCQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxTQUFTQSxDQUFDQTtRQUMzQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsWUFBWUEsQ0FBQ0E7UUFDakNBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFlBQVlBLENBQUNBO1FBQ2pDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUNuQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsWUFBWUEsQ0FBQ0E7UUFFakNBLEFBQ0FBLHFEQURxREE7UUFDckRBLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDeENBLElBQUlBLENBQUNBLGtCQUFrQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7SUFDM0NBLENBQUNBO0lBbklERCxzQkFBV0Esd0NBQUtBO1FBUmhCQTs7Ozs7OztXQU9HQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7YUFFREYsVUFBaUJBLEdBQVVBO1lBRTFCRSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUV6QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsR0FBR0EsQ0FBQ0E7Z0JBQ3RCQSxNQUFNQSxDQUFDQTtZQUVSQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUVsQkEsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0E7UUFDdEJBLENBQUNBOzs7T0FaQUY7SUFpQkRBLHNCQUFXQSwyQ0FBUUE7UUFIbkJBOztXQUVHQTthQUNIQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUN2QkEsQ0FBQ0E7YUFFREgsVUFBb0JBLEdBQVVBO1lBRTdCRyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxJQUFJQSxHQUFHQSxDQUFDQTtnQkFDekJBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLENBQUNBO1lBRXJCQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7OztPQVZBSDtJQWVEQSxzQkFBV0EsNENBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFDeEJBLENBQUNBO2FBRURKLFVBQXFCQSxHQUFVQTtZQUU5QkksR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFdEVBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLElBQUlBLEdBQUdBLENBQUNBO2dCQUMxQkEsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFFdEJBLElBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBO1FBQ3RCQSxDQUFDQTs7O09BWkFKO0lBbUJEQSxzQkFBV0EsK0NBQVlBO1FBTHZCQTs7OztXQUlHQTthQUNIQTtZQUVDSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7YUFFREwsVUFBd0JBLEdBQVVBO1lBRWpDSyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxJQUFJQSxHQUFHQSxDQUFDQTtnQkFDN0JBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLEdBQUdBLENBQUNBO1lBRXpCQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM5RkEsQ0FBQ0E7OztPQVZBTDtJQWlCREEsc0JBQVdBLCtDQUFZQTtRQUx2QkE7Ozs7V0FJR0E7YUFDSEE7WUFFQ00sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7UUFDM0JBLENBQUNBO2FBRUROLFVBQXdCQSxHQUFVQTtZQUVqQ00sRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsR0FBR0EsQ0FBQ0E7Z0JBQzdCQSxNQUFNQSxDQUFDQTtZQUVSQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUV6QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDOUZBLENBQUNBOzs7T0FWQU47SUFnQkRBLHNCQUFXQSwrQ0FBWUE7UUFIdkJBOztXQUVHQTthQUNIQTtZQUVDTyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7YUFFRFAsVUFBd0JBLEdBQVdBO1lBRWxDTyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxJQUFJQSxHQUFHQSxDQUFDQTtnQkFDN0JBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLEdBQUdBLENBQUNBO1lBRXpCQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7OztPQVZBUDtJQStCREE7Ozs7Ozs7Ozs7T0FVR0E7SUFDSUEsc0NBQU1BLEdBQWJBLFVBQWNBLFdBQTBCQTtRQUExQlEsMkJBQTBCQSxHQUExQkEsa0JBQTBCQTtRQUV2Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsSUFBSUEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxJQUFJQSxJQUFJQSxDQUFDQSxTQUFTQSxJQUFJQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBLENBQUNBO1lBRTVGQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtZQUVyQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDeEJBLElBQUlBLENBQUNBLGlCQUFpQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7b0JBQ3BFQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDM0NBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDUEEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxJQUFJQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtvQkFDOURBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLEdBQUNBLEdBQUdBLENBQUNBO2dCQUNyQ0EsQ0FBQ0E7Z0JBRURBLE9BQU9BLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBR0EsQ0FBQ0EsR0FBR0E7b0JBQ3BEQSxJQUFJQSxDQUFDQSxpQkFBaUJBLElBQUlBLEdBQUdBLENBQUNBO2dCQUUvQkEsT0FBT0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxHQUFHQTtvQkFDbkRBLElBQUlBLENBQUNBLGlCQUFpQkEsSUFBSUEsR0FBR0EsQ0FBQ0E7WUFDaENBLENBQUNBO1lBRURBLEVBQUVBLENBQUNBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO2dCQUNqQkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUN4RkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RGQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDUEEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDMUNBLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7WUFDekNBLENBQUNBO1lBRURBLEFBQ0FBLDRDQUQ0Q0E7WUFDNUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDL0hBLElBQUlBLENBQUNBLGtCQUFrQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQzFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO1lBQ3pDQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVEQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBO1FBQ3REQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBO1FBRXJEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN6QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2RBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLFNBQVNBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBO1lBQzlEQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDUEEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBQ0EsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQTtnQkFDbEdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLGNBQWNBLEdBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLEdBQUNBLFVBQVVBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7WUFDbkdBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ3pCQSxDQUFDQTtRQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBLENBQUNBO1lBQzNCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBO1lBQzdEQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLENBQUNBLENBQUNBO1FBQzNCQSxDQUFDQTtJQUVGQSxDQUFDQTtJQUVNUiw2Q0FBYUEsR0FBcEJBLFVBQXFCQSxHQUFVQTtRQUU5QlMsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDWkEsTUFBTUEsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsY0FBY0EsSUFBSUEsR0FBR0EsQ0FBQ0E7UUFFM0JBLElBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBO0lBQ3RCQSxDQUFDQTtJQUVNVCwrQ0FBZUEsR0FBdEJBLFVBQXVCQSxHQUFVQTtRQUVoQ1UsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDWkEsTUFBTUEsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxJQUFJQSxHQUFHQSxDQUFDQTtRQUU3QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0E7SUFDdEJBLENBQUNBO0lBRUZWLDRCQUFDQTtBQUFEQSxDQXJQQSxBQXFQQ0EsRUFyUG1DLGNBQWMsRUFxUGpEO0FBRUQsQUFBK0IsaUJBQXRCLHFCQUFxQixDQUFDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL0ZpcnN0UGVyc29uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0aENvbnN0c1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0aENvbnN0c1wiKTtcclxuXHJcbmltcG9ydCBDb250cm9sbGVyQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250cm9sbGVycy9Db250cm9sbGVyQmFzZVwiKTtcclxuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xyXG5cclxuLyoqXHJcbiAqIEV4dGVuZGVkIGNhbWVyYSB1c2VkIHRvIGhvdmVyIHJvdW5kIGEgc3BlY2lmaWVkIHRhcmdldCBvYmplY3QuXHJcbiAqXHJcbiAqIEBzZWUgICAgYXdheTNkLmNvbnRhaW5lcnMuVmlldzNEXHJcbiAqL1xyXG5jbGFzcyBGaXJzdFBlcnNvbkNvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVyQmFzZVxyXG57XHJcblx0cHVibGljIF9pQ3VycmVudFBhbkFuZ2xlOm51bWJlciA9IDA7XHJcblx0cHVibGljICBfaUN1cnJlbnRUaWx0QW5nbGU6bnVtYmVyID0gOTA7XHJcblxyXG5cdHByaXZhdGUgX3BhbkFuZ2xlOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfdGlsdEFuZ2xlOm51bWJlciA9IDkwO1xyXG5cdHByaXZhdGUgX21pblRpbHRBbmdsZTpudW1iZXIgPSAtOTA7XHJcblx0cHJpdmF0ZSBfbWF4VGlsdEFuZ2xlOm51bWJlciA9IDkwO1xyXG5cdHByaXZhdGUgX3N0ZXBzOm51bWJlciA9IDg7XHJcblx0cHJpdmF0ZSBfd2Fsa0luY3JlbWVudDpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX3N0cmFmZUluY3JlbWVudDpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX3dyYXBQYW5BbmdsZTpib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHB1YmxpYyBmbHk6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHQvKipcclxuXHQgKiBGcmFjdGlvbmFsIHN0ZXAgdGFrZW4gZWFjaCB0aW1lIHRoZSA8Y29kZT5ob3ZlcigpPC9jb2RlPiBtZXRob2QgaXMgY2FsbGVkLiBEZWZhdWx0cyB0byA4LlxyXG5cdCAqXHJcblx0ICogQWZmZWN0cyB0aGUgc3BlZWQgYXQgd2hpY2ggdGhlIDxjb2RlPnRpbHRBbmdsZTwvY29kZT4gYW5kIDxjb2RlPnBhbkFuZ2xlPC9jb2RlPiByZXNvbHZlIHRvIHRoZWlyIHRhcmdldHMuXHJcblx0ICpcclxuXHQgKiBAc2VlICAgICN0aWx0QW5nbGVcclxuXHQgKiBAc2VlICAgICNwYW5BbmdsZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc3RlcHMoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3RlcHM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHN0ZXBzKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFsID0gKHZhbCA8IDEpPyAxIDogdmFsO1xyXG5cclxuXHRcdGlmICh0aGlzLl9zdGVwcyA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9zdGVwcyA9IHZhbDtcclxuXHJcblx0XHR0aGlzLnBOb3RpZnlVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJvdGF0aW9uIG9mIHRoZSBjYW1lcmEgaW4gZGVncmVlcyBhcm91bmQgdGhlIHkgYXhpcy4gRGVmYXVsdHMgdG8gMC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHBhbkFuZ2xlKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BhbkFuZ2xlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBwYW5BbmdsZSh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wYW5BbmdsZSA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wYW5BbmdsZSA9IHZhbDtcclxuXHJcblx0XHR0aGlzLnBOb3RpZnlVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVsZXZhdGlvbiBhbmdsZSBvZiB0aGUgY2FtZXJhIGluIGRlZ3JlZXMuIERlZmF1bHRzIHRvIDkwLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdGlsdEFuZ2xlKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RpbHRBbmdsZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdGlsdEFuZ2xlKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFsID0gTWF0aC5tYXgodGhpcy5fbWluVGlsdEFuZ2xlLCBNYXRoLm1pbih0aGlzLl9tYXhUaWx0QW5nbGUsIHZhbCkpO1xyXG5cclxuXHRcdGlmICh0aGlzLl90aWx0QW5nbGUgPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fdGlsdEFuZ2xlID0gdmFsO1xyXG5cclxuXHRcdHRoaXMucE5vdGlmeVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWluaW11bSBib3VuZHMgZm9yIHRoZSA8Y29kZT50aWx0QW5nbGU8L2NvZGU+LiBEZWZhdWx0cyB0byAtOTAuXHJcblx0ICpcclxuXHQgKiBAc2VlICAgICN0aWx0QW5nbGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1pblRpbHRBbmdsZSgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9taW5UaWx0QW5nbGU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG1pblRpbHRBbmdsZSh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9taW5UaWx0QW5nbGUgPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fbWluVGlsdEFuZ2xlID0gdmFsO1xyXG5cclxuXHRcdHRoaXMudGlsdEFuZ2xlID0gTWF0aC5tYXgodGhpcy5fbWluVGlsdEFuZ2xlLCBNYXRoLm1pbih0aGlzLl9tYXhUaWx0QW5nbGUsIHRoaXMuX3RpbHRBbmdsZSkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWF4aW11bSBib3VuZHMgZm9yIHRoZSA8Y29kZT50aWx0QW5nbGU8L2NvZGU+LiBEZWZhdWx0cyB0byA5MC5cclxuXHQgKlxyXG5cdCAqIEBzZWUgICAgI3RpbHRBbmdsZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbWF4VGlsdEFuZ2xlKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21heFRpbHRBbmdsZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgbWF4VGlsdEFuZ2xlKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX21heFRpbHRBbmdsZSA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9tYXhUaWx0QW5nbGUgPSB2YWw7XHJcblxyXG5cdFx0dGhpcy50aWx0QW5nbGUgPSBNYXRoLm1heCh0aGlzLl9taW5UaWx0QW5nbGUsIE1hdGgubWluKHRoaXMuX21heFRpbHRBbmdsZSwgdGhpcy5fdGlsdEFuZ2xlKSk7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogRGVmaW5lcyB3aGV0aGVyIHRoZSB2YWx1ZSBvZiB0aGUgcGFuIGFuZ2xlIHdyYXBzIHdoZW4gb3ZlciAzNjAgZGVncmVlcyBvciB1bmRlciAwIGRlZ3JlZXMuIERlZmF1bHRzIHRvIGZhbHNlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgd3JhcFBhbkFuZ2xlKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl93cmFwUGFuQW5nbGU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHdyYXBQYW5BbmdsZSh2YWw6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fd3JhcFBhbkFuZ2xlID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3dyYXBQYW5BbmdsZSA9IHZhbDtcclxuXHJcblx0XHR0aGlzLnBOb3RpZnlVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgPGNvZGU+SG92ZXJDb250cm9sbGVyPC9jb2RlPiBvYmplY3QuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IodGFyZ2V0T2JqZWN0OkRpc3BsYXlPYmplY3QgPSBudWxsLCBwYW5BbmdsZTpudW1iZXIgPSAwLCB0aWx0QW5nbGU6bnVtYmVyID0gOTAsIG1pblRpbHRBbmdsZTpudW1iZXIgPSAtOTAsIG1heFRpbHRBbmdsZTpudW1iZXIgPSA5MCwgc3RlcHM6bnVtYmVyID0gOCwgd3JhcFBhbkFuZ2xlOmJvb2xlYW4gPSBmYWxzZSlcclxuXHR7XHJcblx0XHRzdXBlcih0YXJnZXRPYmplY3QpO1xyXG5cclxuXHRcdHRoaXMucGFuQW5nbGUgPSBwYW5BbmdsZTtcclxuXHRcdHRoaXMudGlsdEFuZ2xlID0gdGlsdEFuZ2xlO1xyXG5cdFx0dGhpcy5taW5UaWx0QW5nbGUgPSBtaW5UaWx0QW5nbGU7XHJcblx0XHR0aGlzLm1heFRpbHRBbmdsZSA9IG1heFRpbHRBbmdsZTtcclxuXHRcdHRoaXMuc3RlcHMgPSBzdGVwcztcclxuXHRcdHRoaXMud3JhcFBhbkFuZ2xlID0gd3JhcFBhbkFuZ2xlO1xyXG5cclxuXHRcdC8vdmFsdWVzIHBhc3NlZCBpbiBjb250cnVzdG9yIGFyZSBhcHBsaWVkIGltbWVkaWF0ZWx5XHJcblx0XHR0aGlzLl9pQ3VycmVudFBhbkFuZ2xlID0gdGhpcy5fcGFuQW5nbGU7XHJcblx0XHR0aGlzLl9pQ3VycmVudFRpbHRBbmdsZSA9IHRoaXMuX3RpbHRBbmdsZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhlIGN1cnJlbnQgdGlsdCBhbmdsZSBhbmQgcGFuIGFuZ2xlIHZhbHVlcy5cclxuXHQgKlxyXG5cdCAqIFZhbHVlcyBhcmUgY2FsY3VsYXRlZCB1c2luZyB0aGUgZGVmaW5lZCA8Y29kZT50aWx0QW5nbGU8L2NvZGU+LCA8Y29kZT5wYW5BbmdsZTwvY29kZT4gYW5kIDxjb2RlPnN0ZXBzPC9jb2RlPiB2YXJpYWJsZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gaW50ZXJwb2xhdGUgICBJZiB0aGUgdXBkYXRlIHRvIGEgdGFyZ2V0IHBhbi0gb3IgdGlsdEFuZ2xlIGlzIGludGVycG9sYXRlZC4gRGVmYXVsdCBpcyB0cnVlLlxyXG5cdCAqXHJcblx0ICogQHNlZSAgICAjdGlsdEFuZ2xlXHJcblx0ICogQHNlZSAgICAjcGFuQW5nbGVcclxuXHQgKiBAc2VlICAgICNzdGVwc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyB1cGRhdGUoaW50ZXJwb2xhdGU6Ym9vbGVhbiA9IHRydWUpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3RpbHRBbmdsZSAhPSB0aGlzLl9pQ3VycmVudFRpbHRBbmdsZSB8fCB0aGlzLl9wYW5BbmdsZSAhPSB0aGlzLl9pQ3VycmVudFBhbkFuZ2xlKSB7XHJcblxyXG5cdFx0XHR0aGlzLnBOb3RpZnlVcGRhdGUoKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLl93cmFwUGFuQW5nbGUpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5fcGFuQW5nbGUgPCAwKSB7XHJcblx0XHRcdFx0XHR0aGlzLl9pQ3VycmVudFBhbkFuZ2xlICs9IHRoaXMuX3BhbkFuZ2xlJTM2MCArIDM2MCAtIHRoaXMuX3BhbkFuZ2xlO1xyXG5cdFx0XHRcdFx0dGhpcy5fcGFuQW5nbGUgPSB0aGlzLl9wYW5BbmdsZSUzNjAgKyAzNjA7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuX2lDdXJyZW50UGFuQW5nbGUgKz0gdGhpcy5fcGFuQW5nbGUlMzYwIC0gdGhpcy5fcGFuQW5nbGU7XHJcblx0XHRcdFx0XHR0aGlzLl9wYW5BbmdsZSA9IHRoaXMuX3BhbkFuZ2xlJTM2MDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHdoaWxlICh0aGlzLl9wYW5BbmdsZSAtIHRoaXMuX2lDdXJyZW50UGFuQW5nbGUgPCAtMTgwKVxyXG5cdFx0XHRcdFx0dGhpcy5faUN1cnJlbnRQYW5BbmdsZSAtPSAzNjA7XHJcblxyXG5cdFx0XHRcdHdoaWxlICh0aGlzLl9wYW5BbmdsZSAtIHRoaXMuX2lDdXJyZW50UGFuQW5nbGUgPiAxODApXHJcblx0XHRcdFx0XHR0aGlzLl9pQ3VycmVudFBhbkFuZ2xlICs9IDM2MDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGludGVycG9sYXRlKSB7XHJcblx0XHRcdFx0dGhpcy5faUN1cnJlbnRUaWx0QW5nbGUgKz0gKHRoaXMuX3RpbHRBbmdsZSAtIHRoaXMuX2lDdXJyZW50VGlsdEFuZ2xlKS8odGhpcy5zdGVwcyArIDEpO1xyXG5cdFx0XHRcdHRoaXMuX2lDdXJyZW50UGFuQW5nbGUgKz0gKHRoaXMuX3BhbkFuZ2xlIC0gdGhpcy5faUN1cnJlbnRQYW5BbmdsZSkvKHRoaXMuc3RlcHMgKyAxKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLl9pQ3VycmVudFRpbHRBbmdsZSA9IHRoaXMuX3RpbHRBbmdsZTtcclxuXHRcdFx0XHR0aGlzLl9pQ3VycmVudFBhbkFuZ2xlID0gdGhpcy5fcGFuQW5nbGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vc25hcCBjb29yZHMgaWYgYW5nbGUgZGlmZmVyZW5jZXMgYXJlIGNsb3NlXHJcblx0XHRcdGlmICgoTWF0aC5hYnModGhpcy50aWx0QW5nbGUgLSB0aGlzLl9pQ3VycmVudFRpbHRBbmdsZSkgPCAwLjAxKSAmJiAoTWF0aC5hYnModGhpcy5fcGFuQW5nbGUgLSB0aGlzLl9pQ3VycmVudFBhbkFuZ2xlKSA8IDAuMDEpKSB7XHJcblx0XHRcdFx0dGhpcy5faUN1cnJlbnRUaWx0QW5nbGUgPSB0aGlzLl90aWx0QW5nbGU7XHJcblx0XHRcdFx0dGhpcy5faUN1cnJlbnRQYW5BbmdsZSA9IHRoaXMuX3BhbkFuZ2xlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy50YXJnZXRPYmplY3Qucm90YXRpb25YID0gdGhpcy5faUN1cnJlbnRUaWx0QW5nbGU7XHJcblx0XHR0aGlzLnRhcmdldE9iamVjdC5yb3RhdGlvblkgPSB0aGlzLl9pQ3VycmVudFBhbkFuZ2xlO1xyXG5cclxuXHRcdGlmICh0aGlzLl93YWxrSW5jcmVtZW50KSB7XHJcblx0XHRcdGlmICh0aGlzLmZseSkge1xyXG5cdFx0XHRcdHRoaXMudGFyZ2V0T2JqZWN0LnRyYW5zZm9ybS5tb3ZlRm9yd2FyZCh0aGlzLl93YWxrSW5jcmVtZW50KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnRhcmdldE9iamVjdC54ICs9IHRoaXMuX3dhbGtJbmNyZW1lbnQqTWF0aC5zaW4odGhpcy5fcGFuQW5nbGUqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlMpO1xyXG5cdFx0XHRcdHRoaXMudGFyZ2V0T2JqZWN0LnogKz0gdGhpcy5fd2Fsa0luY3JlbWVudCpNYXRoLmNvcyh0aGlzLl9wYW5BbmdsZSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUyk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5fd2Fsa0luY3JlbWVudCA9IDA7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX3N0cmFmZUluY3JlbWVudCkge1xyXG5cdFx0XHR0aGlzLnRhcmdldE9iamVjdC50cmFuc2Zvcm0ubW92ZVJpZ2h0KHRoaXMuX3N0cmFmZUluY3JlbWVudCk7XHJcblx0XHRcdHRoaXMuX3N0cmFmZUluY3JlbWVudCA9IDA7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGluY3JlbWVudFdhbGsodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodmFsID09IDApXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl93YWxrSW5jcmVtZW50ICs9IHZhbDtcclxuXHJcblx0XHR0aGlzLnBOb3RpZnlVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBpbmNyZW1lbnRTdHJhZmUodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodmFsID09IDApXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9zdHJhZmVJbmNyZW1lbnQgKz0gdmFsO1xyXG5cclxuXHRcdHRoaXMucE5vdGlmeVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCA9IEZpcnN0UGVyc29uQ29udHJvbGxlcjsiXX0=