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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9saWdodHByb2JlLnRzIl0sIm5hbWVzIjpbIkxpZ2h0UHJvYmUiLCJMaWdodFByb2JlLmNvbnN0cnVjdG9yIiwiTGlnaHRQcm9iZS5kaWZmdXNlTWFwIiwiTGlnaHRQcm9iZS5zcGVjdWxhck1hcCIsIkxpZ2h0UHJvYmUucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJMaWdodFByb2JlLnBVcGRhdGVCb3VuZHMiLCJMaWdodFByb2JlLnBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUiLCJMaWdodFByb2JlLmlHZXRPYmplY3RQcm9qZWN0aW9uTWF0cml4IiwiTGlnaHRQcm9iZS5faUNvbGxlY3RSZW5kZXJhYmxlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxVQUFVLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUdyRSxJQUFPLEtBQUssV0FBZ0IsOEJBQThCLENBQUMsQ0FBQztBQUU1RCxJQUFPLFNBQVMsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBRXBFLElBQU8sY0FBYyxXQUFjLDZDQUE2QyxDQUFDLENBQUM7QUFNbEYsSUFBTSxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFrQkE7SUFLakNBLFNBTEtBLFVBQVVBLENBS0hBLFVBQTBCQSxFQUFFQSxXQUFrQ0E7UUFBbENDLDJCQUFrQ0EsR0FBbENBLGtCQUFrQ0E7UUFFekVBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUV2QkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsVUFBVUEsQ0FBQ0E7UUFDOUJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFdBQVdBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUVERCxzQkFBV0Esa0NBQVVBO2FBQXJCQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7YUFFREYsVUFBc0JBLEtBQXFCQTtZQUUxQ0UsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDMUJBLENBQUNBOzs7T0FMQUY7SUFPREEsc0JBQVdBLG1DQUFXQTthQUF0QkE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFDMUJBLENBQUNBO2FBRURILFVBQXVCQSxLQUFxQkE7WUFFM0NHLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLEtBQUtBLENBQUNBO1FBQzNCQSxDQUFDQTs7O09BTEFIO0lBT0RBOztPQUVHQTtJQUNJQSwrQ0FBMEJBLEdBQWpDQTtRQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFFREosV0FBV0E7SUFDSkEsa0NBQWFBLEdBQXBCQTtRQUVDSyxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxLQUFLQSxDQUFDQTtJQUM5QkEsQ0FBQ0E7SUFFREwsV0FBV0E7SUFDSkEsaURBQTRCQSxHQUFuQ0E7UUFFQ00sTUFBTUEsQ0FBQ0EsSUFBSUEsVUFBVUEsRUFBRUEsQ0FBQ0E7SUFDekJBLENBQUNBO0lBRUROLFdBQVdBO0lBQ0pBLCtDQUEwQkEsR0FBakNBLFVBQWtDQSxNQUFjQSxFQUFFQSxNQUFhQSxFQUFFQSxNQUFzQkE7UUFBdEJPLHNCQUFzQkEsR0FBdEJBLGFBQXNCQTtRQUV0RkEsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0Esc0VBQXNFQSxDQUFDQSxDQUFDQTtJQUN6RkEsQ0FBQ0E7SUFFTVAseUNBQW9CQSxHQUEzQkEsVUFBNEJBLFlBQTBCQTtRQUVyRFEsb0JBQW9CQTtJQUNyQkEsQ0FBQ0E7SUFDRlIsaUJBQUNBO0FBQURBLENBakVBLEFBaUVDQSxFQWpFd0IsU0FBUyxFQWlFakM7QUFFRCxBQUFvQixpQkFBWCxVQUFVLENBQUMiLCJmaWxlIjoiZW50aXRpZXMvTGlnaHRQcm9iZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm91bmRpbmdWb2x1bWVCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2JvdW5kcy9Cb3VuZGluZ1ZvbHVtZUJhc2VcIik7XG5pbXBvcnQgTnVsbEJvdW5kc1x0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvYm91bmRzL051bGxCb3VuZHNcIik7XG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IEVycm9yXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcblxuaW1wb3J0IExpZ2h0QmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9MaWdodEJhc2VcIik7XG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XG5pbXBvcnQgTGlnaHRQcm9iZU5vZGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTGlnaHRQcm9iZU5vZGVcIik7XG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmVyUG9vbFwiKTtcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcbmltcG9ydCBDdWJlVGV4dHVyZUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9DdWJlVGV4dHVyZUJhc2VcIik7XG5cbmNsYXNzIExpZ2h0UHJvYmUgZXh0ZW5kcyBMaWdodEJhc2UgaW1wbGVtZW50cyBJRW50aXR5XG57XG5cdHByaXZhdGUgX2RpZmZ1c2VNYXA6Q3ViZVRleHR1cmVCYXNlO1xuXHRwcml2YXRlIF9zcGVjdWxhck1hcDpDdWJlVGV4dHVyZUJhc2U7XG5cblx0Y29uc3RydWN0b3IoZGlmZnVzZU1hcDpDdWJlVGV4dHVyZUJhc2UsIHNwZWN1bGFyTWFwOkN1YmVUZXh0dXJlQmFzZSA9IG51bGwpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fcElzRW50aXR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMuX2RpZmZ1c2VNYXAgPSBkaWZmdXNlTWFwO1xuXHRcdHRoaXMuX3NwZWN1bGFyTWFwID0gc3BlY3VsYXJNYXA7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGRpZmZ1c2VNYXAoKTpDdWJlVGV4dHVyZUJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kaWZmdXNlTWFwO1xuXHR9XG5cblx0cHVibGljIHNldCBkaWZmdXNlTWFwKHZhbHVlOkN1YmVUZXh0dXJlQmFzZSlcblx0e1xuXHRcdHRoaXMuX2RpZmZ1c2VNYXAgPSB2YWx1ZTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgc3BlY3VsYXJNYXAoKTpDdWJlVGV4dHVyZUJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zcGVjdWxhck1hcDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc3BlY3VsYXJNYXAodmFsdWU6Q3ViZVRleHR1cmVCYXNlKVxuXHR7XG5cdFx0dGhpcy5fc3BlY3VsYXJNYXAgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUoKTpFbnRpdHlOb2RlXG5cdHtcblx0XHRyZXR1cm4gbmV3IExpZ2h0UHJvYmVOb2RlKHRoaXMpO1xuXHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIHBVcGRhdGVCb3VuZHMoKVxuXHR7XG5cdFx0dGhpcy5fcEJvdW5kc0ludmFsaWQgPSBmYWxzZTtcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBwQ3JlYXRlRGVmYXVsdEJvdW5kaW5nVm9sdW1lKCk6Qm91bmRpbmdWb2x1bWVCYXNlXG5cdHtcblx0XHRyZXR1cm4gbmV3IE51bGxCb3VuZHMoKTtcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBpR2V0T2JqZWN0UHJvamVjdGlvbk1hdHJpeChlbnRpdHk6SUVudGl0eSwgY2FtZXJhOkNhbWVyYSwgdGFyZ2V0Ok1hdHJpeDNEID0gbnVsbCk6TWF0cml4M0Rcblx0e1xuXHRcdHRocm93IG5ldyBFcnJvcihcIk9iamVjdCBwcm9qZWN0aW9uIG1hdHJpY2VzIGFyZSBub3Qgc3VwcG9ydGVkIGZvciBMaWdodFByb2JlIG9iamVjdHMhXCIpO1xuXHR9XG5cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGVzKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxuXHR7XG5cdFx0Ly9ub3RoaW5nIHRvIGRvIGhlcmVcblx0fVxufVxuXG5leHBvcnQgPSBMaWdodFByb2JlOyJdfQ==