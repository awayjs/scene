var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NullBounds = require("awayjs-core/lib/bounds/NullBounds");
var Error = require("awayjs-core/lib/errors/Error");
var LightBase = require("awayjs-display/lib/base/LightBase");
var LightProbeNode = require("awayjs-display/lib/partition/LightProbeNode");
var LightProbe = (function (_super) {
    __extends(LightProbe, _super);
    function LightProbe(diffuseMap, specularMap) {
        if (specularMap === void 0) { specularMap = null; }
        _super.call(this);
        this._pIsEntity = true;
        this._diffuseMap = diffuseMap;
        this._specularMap = specularMap;
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
    /**
     * @protected
     */
    LightProbe.prototype.pCreateEntityPartitionNode = function () {
        return new LightProbeNode(this);
    };
    //@override
    LightProbe.prototype.pUpdateBounds = function () {
        this._pBoundsInvalid = false;
    };
    //@override
    LightProbe.prototype.pCreateDefaultBoundingVolume = function () {
        return new NullBounds();
    };
    //@override
    LightProbe.prototype.iGetObjectProjectionMatrix = function (entity, camera, target) {
        if (target === void 0) { target = null; }
        throw new Error("Object projection matrices are not supported for LightProbe objects!");
    };
    LightProbe.prototype._iCollectRenderables = function (rendererPool) {
        //nothing to do here
    };
    return LightProbe;
})(LightBase);
module.exports = LightProbe;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9MaWdodFByb2JlLnRzIl0sIm5hbWVzIjpbIkxpZ2h0UHJvYmUiLCJMaWdodFByb2JlLmNvbnN0cnVjdG9yIiwiTGlnaHRQcm9iZS5kaWZmdXNlTWFwIiwiTGlnaHRQcm9iZS5zcGVjdWxhck1hcCIsIkxpZ2h0UHJvYmUucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJMaWdodFByb2JlLnBVcGRhdGVCb3VuZHMiLCJMaWdodFByb2JlLnBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUiLCJMaWdodFByb2JlLmlHZXRPYmplY3RQcm9qZWN0aW9uTWF0cml4IiwiTGlnaHRQcm9iZS5faUNvbGxlY3RSZW5kZXJhYmxlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxVQUFVLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUdyRSxJQUFPLEtBQUssV0FBZ0IsOEJBQThCLENBQUMsQ0FBQztBQUU1RCxJQUFPLFNBQVMsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBRXBFLElBQU8sY0FBYyxXQUFjLDZDQUE2QyxDQUFDLENBQUM7QUFNbEYsSUFBTSxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFrQkE7SUFLakNBLFNBTEtBLFVBQVVBLENBS0hBLFVBQTBCQSxFQUFFQSxXQUFrQ0E7UUFBbENDLDJCQUFrQ0EsR0FBbENBLGtCQUFrQ0E7UUFFekVBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUV2QkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsVUFBVUEsQ0FBQ0E7UUFDOUJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFdBQVdBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUVERCxzQkFBV0Esa0NBQVVBO2FBQXJCQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7YUFFREYsVUFBc0JBLEtBQXFCQTtZQUUxQ0UsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDMUJBLENBQUNBOzs7T0FMQUY7SUFPREEsc0JBQVdBLG1DQUFXQTthQUF0QkE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFDMUJBLENBQUNBO2FBRURILFVBQXVCQSxLQUFxQkE7WUFFM0NHLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLEtBQUtBLENBQUNBO1FBQzNCQSxDQUFDQTs7O09BTEFIO0lBT0RBOztPQUVHQTtJQUNJQSwrQ0FBMEJBLEdBQWpDQTtRQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFFREosV0FBV0E7SUFDSkEsa0NBQWFBLEdBQXBCQTtRQUVDSyxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxLQUFLQSxDQUFDQTtJQUM5QkEsQ0FBQ0E7SUFFREwsV0FBV0E7SUFDSkEsaURBQTRCQSxHQUFuQ0E7UUFFQ00sTUFBTUEsQ0FBQ0EsSUFBSUEsVUFBVUEsRUFBRUEsQ0FBQ0E7SUFDekJBLENBQUNBO0lBRUROLFdBQVdBO0lBQ0pBLCtDQUEwQkEsR0FBakNBLFVBQWtDQSxNQUFjQSxFQUFFQSxNQUFhQSxFQUFFQSxNQUFzQkE7UUFBdEJPLHNCQUFzQkEsR0FBdEJBLGFBQXNCQTtRQUV0RkEsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0Esc0VBQXNFQSxDQUFDQSxDQUFDQTtJQUN6RkEsQ0FBQ0E7SUFFTVAseUNBQW9CQSxHQUEzQkEsVUFBNEJBLFlBQTBCQTtRQUVyRFEsb0JBQW9CQTtJQUNyQkEsQ0FBQ0E7SUFDRlIsaUJBQUNBO0FBQURBLENBakVBLEFBaUVDQSxFQWpFd0IsU0FBUyxFQWlFakM7QUFFRCxBQUFvQixpQkFBWCxVQUFVLENBQUMiLCJmaWxlIjoiZW50aXRpZXMvTGlnaHRQcm9iZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm91bmRpbmdWb2x1bWVCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2JvdW5kcy9Cb3VuZGluZ1ZvbHVtZUJhc2VcIik7XHJcbmltcG9ydCBOdWxsQm91bmRzXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ib3VuZHMvTnVsbEJvdW5kc1wiKTtcclxuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XHJcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xyXG5pbXBvcnQgRXJyb3JcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Vycm9yXCIpO1xyXG5cclxuaW1wb3J0IExpZ2h0QmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9MaWdodEJhc2VcIik7XHJcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcclxuaW1wb3J0IExpZ2h0UHJvYmVOb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0xpZ2h0UHJvYmVOb2RlXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmVyUG9vbFwiKTtcclxuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcbmltcG9ydCBDdWJlVGV4dHVyZUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9DdWJlVGV4dHVyZUJhc2VcIik7XHJcblxyXG5jbGFzcyBMaWdodFByb2JlIGV4dGVuZHMgTGlnaHRCYXNlIGltcGxlbWVudHMgSUVudGl0eVxyXG57XHJcblx0cHJpdmF0ZSBfZGlmZnVzZU1hcDpDdWJlVGV4dHVyZUJhc2U7XHJcblx0cHJpdmF0ZSBfc3BlY3VsYXJNYXA6Q3ViZVRleHR1cmVCYXNlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihkaWZmdXNlTWFwOkN1YmVUZXh0dXJlQmFzZSwgc3BlY3VsYXJNYXA6Q3ViZVRleHR1cmVCYXNlID0gbnVsbClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX3BJc0VudGl0eSA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5fZGlmZnVzZU1hcCA9IGRpZmZ1c2VNYXA7XHJcblx0XHR0aGlzLl9zcGVjdWxhck1hcCA9IHNwZWN1bGFyTWFwO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBkaWZmdXNlTWFwKCk6Q3ViZVRleHR1cmVCYXNlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2RpZmZ1c2VNYXA7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGRpZmZ1c2VNYXAodmFsdWU6Q3ViZVRleHR1cmVCYXNlKVxyXG5cdHtcclxuXHRcdHRoaXMuX2RpZmZ1c2VNYXAgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc3BlY3VsYXJNYXAoKTpDdWJlVGV4dHVyZUJhc2VcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3BlY3VsYXJNYXA7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNwZWN1bGFyTWFwKHZhbHVlOkN1YmVUZXh0dXJlQmFzZSlcclxuXHR7XHJcblx0XHR0aGlzLl9zcGVjdWxhck1hcCA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwQ3JlYXRlRW50aXR5UGFydGl0aW9uTm9kZSgpOkVudGl0eU5vZGVcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IExpZ2h0UHJvYmVOb2RlKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0Ly9Ab3ZlcnJpZGVcclxuXHRwdWJsaWMgcFVwZGF0ZUJvdW5kcygpXHJcblx0e1xyXG5cdFx0dGhpcy5fcEJvdW5kc0ludmFsaWQgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8vQG92ZXJyaWRlXHJcblx0cHVibGljIHBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUoKTpCb3VuZGluZ1ZvbHVtZUJhc2VcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IE51bGxCb3VuZHMoKTtcclxuXHR9XHJcblxyXG5cdC8vQG92ZXJyaWRlXHJcblx0cHVibGljIGlHZXRPYmplY3RQcm9qZWN0aW9uTWF0cml4KGVudGl0eTpJRW50aXR5LCBjYW1lcmE6Q2FtZXJhLCB0YXJnZXQ6TWF0cml4M0QgPSBudWxsKTpNYXRyaXgzRFxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIk9iamVjdCBwcm9qZWN0aW9uIG1hdHJpY2VzIGFyZSBub3Qgc3VwcG9ydGVkIGZvciBMaWdodFByb2JlIG9iamVjdHMhXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGVzKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxyXG5cdHtcclxuXHRcdC8vbm90aGluZyB0byBkbyBoZXJlXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBMaWdodFByb2JlOyJdfQ==