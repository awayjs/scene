var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Error = require("awayjs-core/lib/errors/Error");
var LightBase = require("awayjs-display/lib/base/LightBase");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
var LightProbe = (function (_super) {
    __extends(LightProbe, _super);
    function LightProbe(diffuseMap, specularMap) {
        if (specularMap === void 0) { specularMap = null; }
        _super.call(this);
        this._pIsEntity = true;
        this._diffuseMap = diffuseMap;
        this._specularMap = specularMap;
        //default bounds type
        this._boundsType = BoundsType.NULL;
    }
    Object.defineProperty(LightProbe.prototype, "diffuseMap", {
        get: function () {
            return this._diffuseMap;
        },
        set: function (value) {
            this._diffuseMap = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightProbe.prototype, "specularMap", {
        get: function () {
            return this._specularMap;
        },
        set: function (value) {
            this._specularMap = value;
        },
        enumerable: true,
        configurable: true
    });
    //@override
    LightProbe.prototype.iGetObjectProjectionMatrix = function (entity, camera, target) {
        if (target === void 0) { target = null; }
        throw new Error("Object projection matrices are not supported for LightProbe objects!");
    };
    LightProbe.prototype._iCollectRenderables = function (rendererPool) {
        //nothing to do here
    };
    LightProbe.prototype._pRegisterEntity = function (partition) {
        partition._iRegisterLightProbe(this);
    };
    LightProbe.prototype._pUnregisterEntity = function (partition) {
        partition._iUnregisterLightProbe(this);
    };
    return LightProbe;
})(LightBase);
module.exports = LightProbe;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9MaWdodFByb2JlLnRzIl0sIm5hbWVzIjpbIkxpZ2h0UHJvYmUiLCJMaWdodFByb2JlLmNvbnN0cnVjdG9yIiwiTGlnaHRQcm9iZS5kaWZmdXNlTWFwIiwiTGlnaHRQcm9iZS5zcGVjdWxhck1hcCIsIkxpZ2h0UHJvYmUuaUdldE9iamVjdFByb2plY3Rpb25NYXRyaXgiLCJMaWdodFByb2JlLl9pQ29sbGVjdFJlbmRlcmFibGVzIiwiTGlnaHRQcm9iZS5fcFJlZ2lzdGVyRW50aXR5IiwiTGlnaHRQcm9iZS5fcFVucmVnaXN0ZXJFbnRpdHkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLElBQU8sS0FBSyxXQUFnQiw4QkFBOEIsQ0FBQyxDQUFDO0FBRTVELElBQU8sU0FBUyxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFDcEUsSUFBTyxVQUFVLFdBQWUsc0NBQXNDLENBQUMsQ0FBQztBQVN4RSxJQUFNLFVBQVU7SUFBU0EsVUFBbkJBLFVBQVVBLFVBQWtCQTtJQUtqQ0EsU0FMS0EsVUFBVUEsQ0FLSEEsVUFBMEJBLEVBQUVBLFdBQWtDQTtRQUFsQ0MsMkJBQWtDQSxHQUFsQ0Esa0JBQWtDQTtRQUV6RUEsaUJBQU9BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1FBRXZCQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxVQUFVQSxDQUFDQTtRQUM5QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7UUFFaENBLEFBQ0FBLHFCQURxQkE7UUFDckJBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBO0lBQ3BDQSxDQUFDQTtJQUVERCxzQkFBV0Esa0NBQVVBO2FBQXJCQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7YUFFREYsVUFBc0JBLEtBQXFCQTtZQUUxQ0UsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDMUJBLENBQUNBOzs7T0FMQUY7SUFPREEsc0JBQVdBLG1DQUFXQTthQUF0QkE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFDMUJBLENBQUNBO2FBRURILFVBQXVCQSxLQUFxQkE7WUFFM0NHLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLEtBQUtBLENBQUNBO1FBQzNCQSxDQUFDQTs7O09BTEFIO0lBT0RBLFdBQVdBO0lBQ0pBLCtDQUEwQkEsR0FBakNBLFVBQWtDQSxNQUFjQSxFQUFFQSxNQUFhQSxFQUFFQSxNQUFzQkE7UUFBdEJJLHNCQUFzQkEsR0FBdEJBLGFBQXNCQTtRQUV0RkEsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0Esc0VBQXNFQSxDQUFDQSxDQUFDQTtJQUN6RkEsQ0FBQ0E7SUFFTUoseUNBQW9CQSxHQUEzQkEsVUFBNEJBLFlBQTBCQTtRQUVyREssb0JBQW9CQTtJQUNyQkEsQ0FBQ0E7SUFFTUwscUNBQWdCQSxHQUF2QkEsVUFBd0JBLFNBQW1CQTtRQUUxQ00sU0FBU0EsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUN0Q0EsQ0FBQ0E7SUFFTU4sdUNBQWtCQSxHQUF6QkEsVUFBMEJBLFNBQW1CQTtRQUU1Q08sU0FBU0EsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUN4Q0EsQ0FBQ0E7SUFDRlAsaUJBQUNBO0FBQURBLENBMURBLEFBMERDQSxFQTFEd0IsU0FBUyxFQTBEakM7QUFFRCxBQUFvQixpQkFBWCxVQUFVLENBQUMiLCJmaWxlIjoiZW50aXRpZXMvTGlnaHRQcm9iZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcclxuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XHJcbmltcG9ydCBFcnJvclx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XHJcblxyXG5pbXBvcnQgTGlnaHRCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xpZ2h0QmFzZVwiKTtcclxuaW1wb3J0IEJvdW5kc1R5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2JvdW5kcy9Cb3VuZHNUeXBlXCIpO1xyXG5pbXBvcnQgUGFydGl0aW9uXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUGFydGl0aW9uXCIpO1xyXG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XHJcbmltcG9ydCBMaWdodFByb2JlTm9kZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9MaWdodFByb2JlTm9kZVwiKTtcclxuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XHJcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xyXG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xyXG5pbXBvcnQgQ3ViZVRleHR1cmVCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvQ3ViZVRleHR1cmVCYXNlXCIpO1xyXG5cclxuY2xhc3MgTGlnaHRQcm9iZSBleHRlbmRzIExpZ2h0QmFzZSBpbXBsZW1lbnRzIElFbnRpdHlcclxue1xyXG5cdHByaXZhdGUgX2RpZmZ1c2VNYXA6Q3ViZVRleHR1cmVCYXNlO1xyXG5cdHByaXZhdGUgX3NwZWN1bGFyTWFwOkN1YmVUZXh0dXJlQmFzZTtcclxuXHJcblx0Y29uc3RydWN0b3IoZGlmZnVzZU1hcDpDdWJlVGV4dHVyZUJhc2UsIHNwZWN1bGFyTWFwOkN1YmVUZXh0dXJlQmFzZSA9IG51bGwpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLl9wSXNFbnRpdHkgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuX2RpZmZ1c2VNYXAgPSBkaWZmdXNlTWFwO1xyXG5cdFx0dGhpcy5fc3BlY3VsYXJNYXAgPSBzcGVjdWxhck1hcDtcclxuXHJcblx0XHQvL2RlZmF1bHQgYm91bmRzIHR5cGVcclxuXHRcdHRoaXMuX2JvdW5kc1R5cGUgPSBCb3VuZHNUeXBlLk5VTEw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IGRpZmZ1c2VNYXAoKTpDdWJlVGV4dHVyZUJhc2VcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZGlmZnVzZU1hcDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgZGlmZnVzZU1hcCh2YWx1ZTpDdWJlVGV4dHVyZUJhc2UpXHJcblx0e1xyXG5cdFx0dGhpcy5fZGlmZnVzZU1hcCA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzcGVjdWxhck1hcCgpOkN1YmVUZXh0dXJlQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zcGVjdWxhck1hcDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgc3BlY3VsYXJNYXAodmFsdWU6Q3ViZVRleHR1cmVCYXNlKVxyXG5cdHtcclxuXHRcdHRoaXMuX3NwZWN1bGFyTWFwID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvL0BvdmVycmlkZVxyXG5cdHB1YmxpYyBpR2V0T2JqZWN0UHJvamVjdGlvbk1hdHJpeChlbnRpdHk6SUVudGl0eSwgY2FtZXJhOkNhbWVyYSwgdGFyZ2V0Ok1hdHJpeDNEID0gbnVsbCk6TWF0cml4M0RcclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3QgcHJvamVjdGlvbiBtYXRyaWNlcyBhcmUgbm90IHN1cHBvcnRlZCBmb3IgTGlnaHRQcm9iZSBvYmplY3RzIVwiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlcyhyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcclxuXHR7XHJcblx0XHQvL25vdGhpbmcgdG8gZG8gaGVyZVxyXG5cdH1cclxuXHJcblx0cHVibGljIF9wUmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcclxuXHR7XHJcblx0XHRwYXJ0aXRpb24uX2lSZWdpc3RlckxpZ2h0UHJvYmUodGhpcyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX3BVbnJlZ2lzdGVyRW50aXR5KHBhcnRpdGlvbjpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0cGFydGl0aW9uLl9pVW5yZWdpc3RlckxpZ2h0UHJvYmUodGhpcyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBMaWdodFByb2JlOyJdfQ==