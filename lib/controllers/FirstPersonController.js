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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9jb250cm9sbGVycy9GaXJzdFBlcnNvbkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOlsiRmlyc3RQZXJzb25Db250cm9sbGVyIiwiRmlyc3RQZXJzb25Db250cm9sbGVyLmNvbnN0cnVjdG9yIiwiRmlyc3RQZXJzb25Db250cm9sbGVyLnN0ZXBzIiwiRmlyc3RQZXJzb25Db250cm9sbGVyLnBhbkFuZ2xlIiwiRmlyc3RQZXJzb25Db250cm9sbGVyLnRpbHRBbmdsZSIsIkZpcnN0UGVyc29uQ29udHJvbGxlci5taW5UaWx0QW5nbGUiLCJGaXJzdFBlcnNvbkNvbnRyb2xsZXIubWF4VGlsdEFuZ2xlIiwiRmlyc3RQZXJzb25Db250cm9sbGVyLndyYXBQYW5BbmdsZSIsIkZpcnN0UGVyc29uQ29udHJvbGxlci51cGRhdGUiLCJGaXJzdFBlcnNvbkNvbnRyb2xsZXIuaW5jcmVtZW50V2FsayIsIkZpcnN0UGVyc29uQ29udHJvbGxlci5pbmNyZW1lbnRTdHJhZmUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sVUFBVSxXQUFjLGlDQUFpQyxDQUFDLENBQUM7QUFFbEUsSUFBTyxjQUFjLFdBQWEsK0NBQStDLENBQUMsQ0FBQztBQUduRixBQUtBOzs7O0dBREc7SUFDRyxxQkFBcUI7SUFBU0EsVUFBOUJBLHFCQUFxQkEsVUFBdUJBO0lBMElqREE7O09BRUdBO0lBQ0hBLFNBN0lLQSxxQkFBcUJBLENBNklkQSxZQUFpQ0EsRUFBRUEsUUFBbUJBLEVBQUVBLFNBQXFCQSxFQUFFQSxZQUF5QkEsRUFBRUEsWUFBd0JBLEVBQUVBLEtBQWdCQSxFQUFFQSxZQUE0QkE7UUFBbExDLDRCQUFpQ0EsR0FBakNBLG1CQUFpQ0E7UUFBRUEsd0JBQW1CQSxHQUFuQkEsWUFBbUJBO1FBQUVBLHlCQUFxQkEsR0FBckJBLGNBQXFCQTtRQUFFQSw0QkFBeUJBLEdBQXpCQSxnQkFBdUJBLEVBQUVBO1FBQUVBLDRCQUF3QkEsR0FBeEJBLGlCQUF3QkE7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TUFBTUEsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxJQUFJQSxHQUFHQSxDQUFDQTtRQUU3QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0E7SUFDdEJBLENBQUNBO0lBRUZWLDRCQUFDQTtBQUFEQSxDQXJQQSxBQXFQQ0EsRUFyUG1DLGNBQWMsRUFxUGpEO0FBRUQsQUFBK0IsaUJBQXRCLHFCQUFxQixDQUFDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL0ZpcnN0UGVyc29uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0aENvbnN0c1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0aENvbnN0c1wiKTtcblxuaW1wb3J0IENvbnRyb2xsZXJCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRyb2xsZXJzL0NvbnRyb2xsZXJCYXNlXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuXG4vKipcbiAqIEV4dGVuZGVkIGNhbWVyYSB1c2VkIHRvIGhvdmVyIHJvdW5kIGEgc3BlY2lmaWVkIHRhcmdldCBvYmplY3QuXG4gKlxuICogQHNlZSAgICBhd2F5M2QuY29udGFpbmVycy5WaWV3M0RcbiAqL1xuY2xhc3MgRmlyc3RQZXJzb25Db250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlckJhc2Vcbntcblx0cHVibGljIF9pQ3VycmVudFBhbkFuZ2xlOm51bWJlciA9IDA7XG5cdHB1YmxpYyAgX2lDdXJyZW50VGlsdEFuZ2xlOm51bWJlciA9IDkwO1xuXG5cdHByaXZhdGUgX3BhbkFuZ2xlOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX3RpbHRBbmdsZTpudW1iZXIgPSA5MDtcblx0cHJpdmF0ZSBfbWluVGlsdEFuZ2xlOm51bWJlciA9IC05MDtcblx0cHJpdmF0ZSBfbWF4VGlsdEFuZ2xlOm51bWJlciA9IDkwO1xuXHRwcml2YXRlIF9zdGVwczpudW1iZXIgPSA4O1xuXHRwcml2YXRlIF93YWxrSW5jcmVtZW50Om51bWJlciA9IDA7XG5cdHByaXZhdGUgX3N0cmFmZUluY3JlbWVudDpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF93cmFwUGFuQW5nbGU6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdHB1YmxpYyBmbHk6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdC8qKlxuXHQgKiBGcmFjdGlvbmFsIHN0ZXAgdGFrZW4gZWFjaCB0aW1lIHRoZSA8Y29kZT5ob3ZlcigpPC9jb2RlPiBtZXRob2QgaXMgY2FsbGVkLiBEZWZhdWx0cyB0byA4LlxuXHQgKlxuXHQgKiBBZmZlY3RzIHRoZSBzcGVlZCBhdCB3aGljaCB0aGUgPGNvZGU+dGlsdEFuZ2xlPC9jb2RlPiBhbmQgPGNvZGU+cGFuQW5nbGU8L2NvZGU+IHJlc29sdmUgdG8gdGhlaXIgdGFyZ2V0cy5cblx0ICpcblx0ICogQHNlZSAgICAjdGlsdEFuZ2xlXG5cdCAqIEBzZWUgICAgI3BhbkFuZ2xlXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHN0ZXBzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc3RlcHM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHN0ZXBzKHZhbDpudW1iZXIpXG5cdHtcblx0XHR2YWwgPSAodmFsIDwgMSk/IDEgOiB2YWw7XG5cblx0XHRpZiAodGhpcy5fc3RlcHMgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fc3RlcHMgPSB2YWw7XG5cblx0XHR0aGlzLnBOb3RpZnlVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGlvbiBvZiB0aGUgY2FtZXJhIGluIGRlZ3JlZXMgYXJvdW5kIHRoZSB5IGF4aXMuIERlZmF1bHRzIHRvIDAuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBhbkFuZ2xlKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGFuQW5nbGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHBhbkFuZ2xlKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fcGFuQW5nbGUgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcGFuQW5nbGUgPSB2YWw7XG5cblx0XHR0aGlzLnBOb3RpZnlVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFbGV2YXRpb24gYW5nbGUgb2YgdGhlIGNhbWVyYSBpbiBkZWdyZWVzLiBEZWZhdWx0cyB0byA5MC5cblx0ICovXG5cdHB1YmxpYyBnZXQgdGlsdEFuZ2xlKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdGlsdEFuZ2xlO1xuXHR9XG5cblx0cHVibGljIHNldCB0aWx0QW5nbGUodmFsOm51bWJlcilcblx0e1xuXHRcdHZhbCA9IE1hdGgubWF4KHRoaXMuX21pblRpbHRBbmdsZSwgTWF0aC5taW4odGhpcy5fbWF4VGlsdEFuZ2xlLCB2YWwpKTtcblxuXHRcdGlmICh0aGlzLl90aWx0QW5nbGUgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fdGlsdEFuZ2xlID0gdmFsO1xuXG5cdFx0dGhpcy5wTm90aWZ5VXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogTWluaW11bSBib3VuZHMgZm9yIHRoZSA8Y29kZT50aWx0QW5nbGU8L2NvZGU+LiBEZWZhdWx0cyB0byAtOTAuXG5cdCAqXG5cdCAqIEBzZWUgICAgI3RpbHRBbmdsZVxuXHQgKi9cblx0cHVibGljIGdldCBtaW5UaWx0QW5nbGUoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9taW5UaWx0QW5nbGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1pblRpbHRBbmdsZSh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX21pblRpbHRBbmdsZSA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9taW5UaWx0QW5nbGUgPSB2YWw7XG5cblx0XHR0aGlzLnRpbHRBbmdsZSA9IE1hdGgubWF4KHRoaXMuX21pblRpbHRBbmdsZSwgTWF0aC5taW4odGhpcy5fbWF4VGlsdEFuZ2xlLCB0aGlzLl90aWx0QW5nbGUpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYXhpbXVtIGJvdW5kcyBmb3IgdGhlIDxjb2RlPnRpbHRBbmdsZTwvY29kZT4uIERlZmF1bHRzIHRvIDkwLlxuXHQgKlxuXHQgKiBAc2VlICAgICN0aWx0QW5nbGVcblx0ICovXG5cdHB1YmxpYyBnZXQgbWF4VGlsdEFuZ2xlKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWF4VGlsdEFuZ2xlO1xuXHR9XG5cblx0cHVibGljIHNldCBtYXhUaWx0QW5nbGUodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9tYXhUaWx0QW5nbGUgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fbWF4VGlsdEFuZ2xlID0gdmFsO1xuXG5cdFx0dGhpcy50aWx0QW5nbGUgPSBNYXRoLm1heCh0aGlzLl9taW5UaWx0QW5nbGUsIE1hdGgubWluKHRoaXMuX21heFRpbHRBbmdsZSwgdGhpcy5fdGlsdEFuZ2xlKSk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgdGhlIHZhbHVlIG9mIHRoZSBwYW4gYW5nbGUgd3JhcHMgd2hlbiBvdmVyIDM2MCBkZWdyZWVzIG9yIHVuZGVyIDAgZGVncmVlcy4gRGVmYXVsdHMgdG8gZmFsc2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHdyYXBQYW5BbmdsZSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl93cmFwUGFuQW5nbGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHdyYXBQYW5BbmdsZSh2YWw6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl93cmFwUGFuQW5nbGUgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fd3JhcFBhbkFuZ2xlID0gdmFsO1xuXG5cdFx0dGhpcy5wTm90aWZ5VXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyA8Y29kZT5Ib3ZlckNvbnRyb2xsZXI8L2NvZGU+IG9iamVjdC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHRhcmdldE9iamVjdDpEaXNwbGF5T2JqZWN0ID0gbnVsbCwgcGFuQW5nbGU6bnVtYmVyID0gMCwgdGlsdEFuZ2xlOm51bWJlciA9IDkwLCBtaW5UaWx0QW5nbGU6bnVtYmVyID0gLTkwLCBtYXhUaWx0QW5nbGU6bnVtYmVyID0gOTAsIHN0ZXBzOm51bWJlciA9IDgsIHdyYXBQYW5BbmdsZTpib29sZWFuID0gZmFsc2UpXG5cdHtcblx0XHRzdXBlcih0YXJnZXRPYmplY3QpO1xuXG5cdFx0dGhpcy5wYW5BbmdsZSA9IHBhbkFuZ2xlO1xuXHRcdHRoaXMudGlsdEFuZ2xlID0gdGlsdEFuZ2xlO1xuXHRcdHRoaXMubWluVGlsdEFuZ2xlID0gbWluVGlsdEFuZ2xlO1xuXHRcdHRoaXMubWF4VGlsdEFuZ2xlID0gbWF4VGlsdEFuZ2xlO1xuXHRcdHRoaXMuc3RlcHMgPSBzdGVwcztcblx0XHR0aGlzLndyYXBQYW5BbmdsZSA9IHdyYXBQYW5BbmdsZTtcblxuXHRcdC8vdmFsdWVzIHBhc3NlZCBpbiBjb250cnVzdG9yIGFyZSBhcHBsaWVkIGltbWVkaWF0ZWx5XG5cdFx0dGhpcy5faUN1cnJlbnRQYW5BbmdsZSA9IHRoaXMuX3BhbkFuZ2xlO1xuXHRcdHRoaXMuX2lDdXJyZW50VGlsdEFuZ2xlID0gdGhpcy5fdGlsdEFuZ2xlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIGN1cnJlbnQgdGlsdCBhbmdsZSBhbmQgcGFuIGFuZ2xlIHZhbHVlcy5cblx0ICpcblx0ICogVmFsdWVzIGFyZSBjYWxjdWxhdGVkIHVzaW5nIHRoZSBkZWZpbmVkIDxjb2RlPnRpbHRBbmdsZTwvY29kZT4sIDxjb2RlPnBhbkFuZ2xlPC9jb2RlPiBhbmQgPGNvZGU+c3RlcHM8L2NvZGU+IHZhcmlhYmxlcy5cblx0ICpcblx0ICogQHBhcmFtIGludGVycG9sYXRlICAgSWYgdGhlIHVwZGF0ZSB0byBhIHRhcmdldCBwYW4tIG9yIHRpbHRBbmdsZSBpcyBpbnRlcnBvbGF0ZWQuIERlZmF1bHQgaXMgdHJ1ZS5cblx0ICpcblx0ICogQHNlZSAgICAjdGlsdEFuZ2xlXG5cdCAqIEBzZWUgICAgI3BhbkFuZ2xlXG5cdCAqIEBzZWUgICAgI3N0ZXBzXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlKGludGVycG9sYXRlOmJvb2xlYW4gPSB0cnVlKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3RpbHRBbmdsZSAhPSB0aGlzLl9pQ3VycmVudFRpbHRBbmdsZSB8fCB0aGlzLl9wYW5BbmdsZSAhPSB0aGlzLl9pQ3VycmVudFBhbkFuZ2xlKSB7XG5cblx0XHRcdHRoaXMucE5vdGlmeVVwZGF0ZSgpO1xuXG5cdFx0XHRpZiAodGhpcy5fd3JhcFBhbkFuZ2xlKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9wYW5BbmdsZSA8IDApIHtcblx0XHRcdFx0XHR0aGlzLl9pQ3VycmVudFBhbkFuZ2xlICs9IHRoaXMuX3BhbkFuZ2xlJTM2MCArIDM2MCAtIHRoaXMuX3BhbkFuZ2xlO1xuXHRcdFx0XHRcdHRoaXMuX3BhbkFuZ2xlID0gdGhpcy5fcGFuQW5nbGUlMzYwICsgMzYwO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2lDdXJyZW50UGFuQW5nbGUgKz0gdGhpcy5fcGFuQW5nbGUlMzYwIC0gdGhpcy5fcGFuQW5nbGU7XG5cdFx0XHRcdFx0dGhpcy5fcGFuQW5nbGUgPSB0aGlzLl9wYW5BbmdsZSUzNjA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3aGlsZSAodGhpcy5fcGFuQW5nbGUgLSB0aGlzLl9pQ3VycmVudFBhbkFuZ2xlIDwgLTE4MClcblx0XHRcdFx0XHR0aGlzLl9pQ3VycmVudFBhbkFuZ2xlIC09IDM2MDtcblxuXHRcdFx0XHR3aGlsZSAodGhpcy5fcGFuQW5nbGUgLSB0aGlzLl9pQ3VycmVudFBhbkFuZ2xlID4gMTgwKVxuXHRcdFx0XHRcdHRoaXMuX2lDdXJyZW50UGFuQW5nbGUgKz0gMzYwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaW50ZXJwb2xhdGUpIHtcblx0XHRcdFx0dGhpcy5faUN1cnJlbnRUaWx0QW5nbGUgKz0gKHRoaXMuX3RpbHRBbmdsZSAtIHRoaXMuX2lDdXJyZW50VGlsdEFuZ2xlKS8odGhpcy5zdGVwcyArIDEpO1xuXHRcdFx0XHR0aGlzLl9pQ3VycmVudFBhbkFuZ2xlICs9ICh0aGlzLl9wYW5BbmdsZSAtIHRoaXMuX2lDdXJyZW50UGFuQW5nbGUpLyh0aGlzLnN0ZXBzICsgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9pQ3VycmVudFRpbHRBbmdsZSA9IHRoaXMuX3RpbHRBbmdsZTtcblx0XHRcdFx0dGhpcy5faUN1cnJlbnRQYW5BbmdsZSA9IHRoaXMuX3BhbkFuZ2xlO1xuXHRcdFx0fVxuXG5cdFx0XHQvL3NuYXAgY29vcmRzIGlmIGFuZ2xlIGRpZmZlcmVuY2VzIGFyZSBjbG9zZVxuXHRcdFx0aWYgKChNYXRoLmFicyh0aGlzLnRpbHRBbmdsZSAtIHRoaXMuX2lDdXJyZW50VGlsdEFuZ2xlKSA8IDAuMDEpICYmIChNYXRoLmFicyh0aGlzLl9wYW5BbmdsZSAtIHRoaXMuX2lDdXJyZW50UGFuQW5nbGUpIDwgMC4wMSkpIHtcblx0XHRcdFx0dGhpcy5faUN1cnJlbnRUaWx0QW5nbGUgPSB0aGlzLl90aWx0QW5nbGU7XG5cdFx0XHRcdHRoaXMuX2lDdXJyZW50UGFuQW5nbGUgPSB0aGlzLl9wYW5BbmdsZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLnRhcmdldE9iamVjdC5yb3RhdGlvblggPSB0aGlzLl9pQ3VycmVudFRpbHRBbmdsZTtcblx0XHR0aGlzLnRhcmdldE9iamVjdC5yb3RhdGlvblkgPSB0aGlzLl9pQ3VycmVudFBhbkFuZ2xlO1xuXG5cdFx0aWYgKHRoaXMuX3dhbGtJbmNyZW1lbnQpIHtcblx0XHRcdGlmICh0aGlzLmZseSkge1xuXHRcdFx0XHR0aGlzLnRhcmdldE9iamVjdC50cmFuc2Zvcm0ubW92ZUZvcndhcmQodGhpcy5fd2Fsa0luY3JlbWVudCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnRhcmdldE9iamVjdC54ICs9IHRoaXMuX3dhbGtJbmNyZW1lbnQqTWF0aC5zaW4odGhpcy5fcGFuQW5nbGUqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlMpO1xuXHRcdFx0XHR0aGlzLnRhcmdldE9iamVjdC56ICs9IHRoaXMuX3dhbGtJbmNyZW1lbnQqTWF0aC5jb3ModGhpcy5fcGFuQW5nbGUqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlMpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fd2Fsa0luY3JlbWVudCA9IDA7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3N0cmFmZUluY3JlbWVudCkge1xuXHRcdFx0dGhpcy50YXJnZXRPYmplY3QudHJhbnNmb3JtLm1vdmVSaWdodCh0aGlzLl9zdHJhZmVJbmNyZW1lbnQpO1xuXHRcdFx0dGhpcy5fc3RyYWZlSW5jcmVtZW50ID0gMDtcblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBpbmNyZW1lbnRXYWxrKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodmFsID09IDApXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl93YWxrSW5jcmVtZW50ICs9IHZhbDtcblxuXHRcdHRoaXMucE5vdGlmeVVwZGF0ZSgpO1xuXHR9XG5cblx0cHVibGljIGluY3JlbWVudFN0cmFmZSh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHZhbCA9PSAwKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fc3RyYWZlSW5jcmVtZW50ICs9IHZhbDtcblxuXHRcdHRoaXMucE5vdGlmeVVwZGF0ZSgpO1xuXHR9XG5cbn1cblxuZXhwb3J0ID0gRmlyc3RQZXJzb25Db250cm9sbGVyOyJdfQ==