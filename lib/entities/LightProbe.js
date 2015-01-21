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
    LightProbe.prototype._iCollectRenderables = function (renderer) {
        //nothing to do here
    };
    return LightProbe;
})(LightBase);
module.exports = LightProbe;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9MaWdodFByb2JlLnRzIl0sIm5hbWVzIjpbIkxpZ2h0UHJvYmUiLCJMaWdodFByb2JlLmNvbnN0cnVjdG9yIiwiTGlnaHRQcm9iZS5kaWZmdXNlTWFwIiwiTGlnaHRQcm9iZS5zcGVjdWxhck1hcCIsIkxpZ2h0UHJvYmUucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJMaWdodFByb2JlLnBVcGRhdGVCb3VuZHMiLCJMaWdodFByb2JlLnBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUiLCJMaWdodFByb2JlLmlHZXRPYmplY3RQcm9qZWN0aW9uTWF0cml4IiwiTGlnaHRQcm9iZS5faUNvbGxlY3RSZW5kZXJhYmxlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxVQUFVLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUdyRSxJQUFPLEtBQUssV0FBZ0IsOEJBQThCLENBQUMsQ0FBQztBQUU1RCxJQUFPLFNBQVMsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBRXBFLElBQU8sY0FBYyxXQUFjLDZDQUE2QyxDQUFDLENBQUM7QUFNbEYsSUFBTSxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFrQkE7SUFLakNBLFNBTEtBLFVBQVVBLENBS0hBLFVBQTBCQSxFQUFFQSxXQUFrQ0E7UUFBbENDLDJCQUFrQ0EsR0FBbENBLGtCQUFrQ0E7UUFFekVBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUV2QkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsVUFBVUEsQ0FBQ0E7UUFDOUJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFdBQVdBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUVERCxzQkFBV0Esa0NBQVVBO2FBQXJCQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7YUFFREYsVUFBc0JBLEtBQXFCQTtZQUUxQ0UsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDMUJBLENBQUNBOzs7T0FMQUY7SUFPREEsc0JBQVdBLG1DQUFXQTthQUF0QkE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFDMUJBLENBQUNBO2FBRURILFVBQXVCQSxLQUFxQkE7WUFFM0NHLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLEtBQUtBLENBQUNBO1FBQzNCQSxDQUFDQTs7O09BTEFIO0lBT0RBOztPQUVHQTtJQUNJQSwrQ0FBMEJBLEdBQWpDQTtRQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFFREosV0FBV0E7SUFDSkEsa0NBQWFBLEdBQXBCQTtRQUVDSyxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxLQUFLQSxDQUFDQTtJQUM5QkEsQ0FBQ0E7SUFFREwsV0FBV0E7SUFDSkEsaURBQTRCQSxHQUFuQ0E7UUFFQ00sTUFBTUEsQ0FBQ0EsSUFBSUEsVUFBVUEsRUFBRUEsQ0FBQ0E7SUFDekJBLENBQUNBO0lBRUROLFdBQVdBO0lBQ0pBLCtDQUEwQkEsR0FBakNBLFVBQWtDQSxNQUFjQSxFQUFFQSxNQUFhQSxFQUFFQSxNQUFzQkE7UUFBdEJPLHNCQUFzQkEsR0FBdEJBLGFBQXNCQTtRQUV0RkEsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0Esc0VBQXNFQSxDQUFDQSxDQUFDQTtJQUN6RkEsQ0FBQ0E7SUFFTVAseUNBQW9CQSxHQUEzQkEsVUFBNEJBLFFBQWtCQTtRQUU3Q1Esb0JBQW9CQTtJQUNyQkEsQ0FBQ0E7SUFDRlIsaUJBQUNBO0FBQURBLENBakVBLEFBaUVDQSxFQWpFd0IsU0FBUyxFQWlFakM7QUFFRCxBQUFvQixpQkFBWCxVQUFVLENBQUMiLCJmaWxlIjoiZW50aXRpZXMvTGlnaHRQcm9iZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm91bmRpbmdWb2x1bWVCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2JvdW5kcy9Cb3VuZGluZ1ZvbHVtZUJhc2VcIik7XG5pbXBvcnQgTnVsbEJvdW5kc1x0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvYm91bmRzL051bGxCb3VuZHNcIik7XG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IEVycm9yXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcblxuaW1wb3J0IExpZ2h0QmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9MaWdodEJhc2VcIik7XG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XG5pbXBvcnQgTGlnaHRQcm9iZU5vZGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTGlnaHRQcm9iZU5vZGVcIik7XG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvSVJlbmRlcmVyXCIpO1xuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuaW1wb3J0IEN1YmVUZXh0dXJlQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL0N1YmVUZXh0dXJlQmFzZVwiKTtcblxuY2xhc3MgTGlnaHRQcm9iZSBleHRlbmRzIExpZ2h0QmFzZSBpbXBsZW1lbnRzIElFbnRpdHlcbntcblx0cHJpdmF0ZSBfZGlmZnVzZU1hcDpDdWJlVGV4dHVyZUJhc2U7XG5cdHByaXZhdGUgX3NwZWN1bGFyTWFwOkN1YmVUZXh0dXJlQmFzZTtcblxuXHRjb25zdHJ1Y3RvcihkaWZmdXNlTWFwOkN1YmVUZXh0dXJlQmFzZSwgc3BlY3VsYXJNYXA6Q3ViZVRleHR1cmVCYXNlID0gbnVsbClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9wSXNFbnRpdHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5fZGlmZnVzZU1hcCA9IGRpZmZ1c2VNYXA7XG5cdFx0dGhpcy5fc3BlY3VsYXJNYXAgPSBzcGVjdWxhck1hcDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgZGlmZnVzZU1hcCgpOkN1YmVUZXh0dXJlQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RpZmZ1c2VNYXA7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGRpZmZ1c2VNYXAodmFsdWU6Q3ViZVRleHR1cmVCYXNlKVxuXHR7XG5cdFx0dGhpcy5fZGlmZnVzZU1hcCA9IHZhbHVlO1xuXHR9XG5cblx0cHVibGljIGdldCBzcGVjdWxhck1hcCgpOkN1YmVUZXh0dXJlQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NwZWN1bGFyTWFwO1xuXHR9XG5cblx0cHVibGljIHNldCBzcGVjdWxhck1hcCh2YWx1ZTpDdWJlVGV4dHVyZUJhc2UpXG5cdHtcblx0XHR0aGlzLl9zcGVjdWxhck1hcCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwQ3JlYXRlRW50aXR5UGFydGl0aW9uTm9kZSgpOkVudGl0eU5vZGVcblx0e1xuXHRcdHJldHVybiBuZXcgTGlnaHRQcm9iZU5vZGUodGhpcyk7XG5cdH1cblxuXHQvL0BvdmVycmlkZVxuXHRwdWJsaWMgcFVwZGF0ZUJvdW5kcygpXG5cdHtcblx0XHR0aGlzLl9wQm91bmRzSW52YWxpZCA9IGZhbHNlO1xuXHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIHBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUoKTpCb3VuZGluZ1ZvbHVtZUJhc2Vcblx0e1xuXHRcdHJldHVybiBuZXcgTnVsbEJvdW5kcygpO1xuXHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIGlHZXRPYmplY3RQcm9qZWN0aW9uTWF0cml4KGVudGl0eTpJRW50aXR5LCBjYW1lcmE6Q2FtZXJhLCB0YXJnZXQ6TWF0cml4M0QgPSBudWxsKTpNYXRyaXgzRFxuXHR7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0IHByb2plY3Rpb24gbWF0cmljZXMgYXJlIG5vdCBzdXBwb3J0ZWQgZm9yIExpZ2h0UHJvYmUgb2JqZWN0cyFcIik7XG5cdH1cblxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZXMocmVuZGVyZXI6SVJlbmRlcmVyKVxuXHR7XG5cdFx0Ly9ub3RoaW5nIHRvIGRvIGhlcmVcblx0fVxufVxuXG5leHBvcnQgPSBMaWdodFByb2JlOyJdfQ==