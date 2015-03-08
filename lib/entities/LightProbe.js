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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9MaWdodFByb2JlLnRzIl0sIm5hbWVzIjpbIkxpZ2h0UHJvYmUiLCJMaWdodFByb2JlLmNvbnN0cnVjdG9yIiwiTGlnaHRQcm9iZS5kaWZmdXNlTWFwIiwiTGlnaHRQcm9iZS5zcGVjdWxhck1hcCIsIkxpZ2h0UHJvYmUuaUdldE9iamVjdFByb2plY3Rpb25NYXRyaXgiLCJMaWdodFByb2JlLl9pQ29sbGVjdFJlbmRlcmFibGVzIiwiTGlnaHRQcm9iZS5fcFJlZ2lzdGVyRW50aXR5IiwiTGlnaHRQcm9iZS5fcFVucmVnaXN0ZXJFbnRpdHkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLElBQU8sS0FBSyxXQUFnQiw4QkFBOEIsQ0FBQyxDQUFDO0FBRTVELElBQU8sU0FBUyxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFDcEUsSUFBTyxVQUFVLFdBQWUsc0NBQXNDLENBQUMsQ0FBQztBQVN4RSxJQUFNLFVBQVU7SUFBU0EsVUFBbkJBLFVBQVVBLFVBQWtCQTtJQUtqQ0EsU0FMS0EsVUFBVUEsQ0FLSEEsVUFBMEJBLEVBQUVBLFdBQWtDQTtRQUFsQ0MsMkJBQWtDQSxHQUFsQ0Esa0JBQWtDQTtRQUV6RUEsaUJBQU9BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1FBRXZCQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxVQUFVQSxDQUFDQTtRQUM5QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7UUFFaENBLEFBQ0FBLHFCQURxQkE7UUFDckJBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBO0lBQ3BDQSxDQUFDQTtJQUVERCxzQkFBV0Esa0NBQVVBO2FBQXJCQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7YUFFREYsVUFBc0JBLEtBQXFCQTtZQUUxQ0UsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDMUJBLENBQUNBOzs7T0FMQUY7SUFPREEsc0JBQVdBLG1DQUFXQTthQUF0QkE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFDMUJBLENBQUNBO2FBRURILFVBQXVCQSxLQUFxQkE7WUFFM0NHLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLEtBQUtBLENBQUNBO1FBQzNCQSxDQUFDQTs7O09BTEFIO0lBT0RBLFdBQVdBO0lBQ0pBLCtDQUEwQkEsR0FBakNBLFVBQWtDQSxNQUFjQSxFQUFFQSxNQUFhQSxFQUFFQSxNQUFzQkE7UUFBdEJJLHNCQUFzQkEsR0FBdEJBLGFBQXNCQTtRQUV0RkEsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0Esc0VBQXNFQSxDQUFDQSxDQUFDQTtJQUN6RkEsQ0FBQ0E7SUFFTUoseUNBQW9CQSxHQUEzQkEsVUFBNEJBLFlBQTBCQTtRQUVyREssb0JBQW9CQTtJQUNyQkEsQ0FBQ0E7SUFFTUwscUNBQWdCQSxHQUF2QkEsVUFBd0JBLFNBQW1CQTtRQUUxQ00sU0FBU0EsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUN0Q0EsQ0FBQ0E7SUFFTU4sdUNBQWtCQSxHQUF6QkEsVUFBMEJBLFNBQW1CQTtRQUU1Q08sU0FBU0EsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUN4Q0EsQ0FBQ0E7SUFDRlAsaUJBQUNBO0FBQURBLENBMURBLEFBMERDQSxFQTFEd0IsU0FBUyxFQTBEakM7QUFFRCxBQUFvQixpQkFBWCxVQUFVLENBQUMiLCJmaWxlIjoiZW50aXRpZXMvTGlnaHRQcm9iZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IEVycm9yXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcblxuaW1wb3J0IExpZ2h0QmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9MaWdodEJhc2VcIik7XG5pbXBvcnQgQm91bmRzVHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYm91bmRzL0JvdW5kc1R5cGVcIik7XG5pbXBvcnQgUGFydGl0aW9uXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUGFydGl0aW9uXCIpO1xuaW1wb3J0IEVudGl0eU5vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xuaW1wb3J0IExpZ2h0UHJvYmVOb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0xpZ2h0UHJvYmVOb2RlXCIpO1xuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0NhbWVyYVwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5pbXBvcnQgQ3ViZVRleHR1cmVCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvQ3ViZVRleHR1cmVCYXNlXCIpO1xuXG5jbGFzcyBMaWdodFByb2JlIGV4dGVuZHMgTGlnaHRCYXNlIGltcGxlbWVudHMgSUVudGl0eVxue1xuXHRwcml2YXRlIF9kaWZmdXNlTWFwOkN1YmVUZXh0dXJlQmFzZTtcblx0cHJpdmF0ZSBfc3BlY3VsYXJNYXA6Q3ViZVRleHR1cmVCYXNlO1xuXG5cdGNvbnN0cnVjdG9yKGRpZmZ1c2VNYXA6Q3ViZVRleHR1cmVCYXNlLCBzcGVjdWxhck1hcDpDdWJlVGV4dHVyZUJhc2UgPSBudWxsKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3BJc0VudGl0eSA9IHRydWU7XG5cblx0XHR0aGlzLl9kaWZmdXNlTWFwID0gZGlmZnVzZU1hcDtcblx0XHR0aGlzLl9zcGVjdWxhck1hcCA9IHNwZWN1bGFyTWFwO1xuXG5cdFx0Ly9kZWZhdWx0IGJvdW5kcyB0eXBlXG5cdFx0dGhpcy5fYm91bmRzVHlwZSA9IEJvdW5kc1R5cGUuTlVMTDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgZGlmZnVzZU1hcCgpOkN1YmVUZXh0dXJlQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RpZmZ1c2VNYXA7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGRpZmZ1c2VNYXAodmFsdWU6Q3ViZVRleHR1cmVCYXNlKVxuXHR7XG5cdFx0dGhpcy5fZGlmZnVzZU1hcCA9IHZhbHVlO1xuXHR9XG5cblx0cHVibGljIGdldCBzcGVjdWxhck1hcCgpOkN1YmVUZXh0dXJlQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NwZWN1bGFyTWFwO1xuXHR9XG5cblx0cHVibGljIHNldCBzcGVjdWxhck1hcCh2YWx1ZTpDdWJlVGV4dHVyZUJhc2UpXG5cdHtcblx0XHR0aGlzLl9zcGVjdWxhck1hcCA9IHZhbHVlO1xuXHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIGlHZXRPYmplY3RQcm9qZWN0aW9uTWF0cml4KGVudGl0eTpJRW50aXR5LCBjYW1lcmE6Q2FtZXJhLCB0YXJnZXQ6TWF0cml4M0QgPSBudWxsKTpNYXRyaXgzRFxuXHR7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0IHByb2plY3Rpb24gbWF0cmljZXMgYXJlIG5vdCBzdXBwb3J0ZWQgZm9yIExpZ2h0UHJvYmUgb2JqZWN0cyFcIik7XG5cdH1cblxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZXMocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXG5cdHtcblx0XHQvL25vdGhpbmcgdG8gZG8gaGVyZVxuXHR9XG5cblx0cHVibGljIF9wUmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcblx0e1xuXHRcdHBhcnRpdGlvbi5faVJlZ2lzdGVyTGlnaHRQcm9iZSh0aGlzKTtcblx0fVxuXG5cdHB1YmxpYyBfcFVucmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcblx0e1xuXHRcdHBhcnRpdGlvbi5faVVucmVnaXN0ZXJMaWdodFByb2JlKHRoaXMpO1xuXHR9XG59XG5cbmV4cG9ydCA9IExpZ2h0UHJvYmU7Il19