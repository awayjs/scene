var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DirectionalShadowMapper = require("awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper");
var NearDirectionalShadowMapper = (function (_super) {
    __extends(NearDirectionalShadowMapper, _super);
    function NearDirectionalShadowMapper(coverageRatio) {
        if (coverageRatio === void 0) { coverageRatio = .5; }
        _super.call(this);
        this.coverageRatio = coverageRatio;
    }
    Object.defineProperty(NearDirectionalShadowMapper.prototype, "coverageRatio", {
        /**
         * A value between 0 and 1 to indicate the ratio of the view frustum that needs to be covered by the shadow map.
         */
        get: function () {
            return this._coverageRatio;
        },
        set: function (value) {
            if (value > 1)
                value = 1;
            else if (value < 0)
                value = 0;
            this._coverageRatio = value;
        },
        enumerable: true,
        configurable: true
    });
    NearDirectionalShadowMapper.prototype.pUpdateDepthProjection = function (viewCamera) {
        var corners = viewCamera.projection.frustumCorners;
        for (var i = 0; i < 12; ++i) {
            var v = corners[i];
            this._pLocalFrustum[i] = v;
            this._pLocalFrustum[i + 12] = v + (corners[i + 12] - v) * this._coverageRatio;
        }
        this.pUpdateProjectionFromFrustumCorners(viewCamera, this._pLocalFrustum, this._pMatrix);
        this._pOverallDepthProjection.matrix = this._pMatrix;
    };
    return NearDirectionalShadowMapper;
})(DirectionalShadowMapper);
module.exports = NearDirectionalShadowMapper;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvc2hhZG93bWFwcGVycy9OZWFyRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXIudHMiXSwibmFtZXMiOlsiTmVhckRpcmVjdGlvbmFsU2hhZG93TWFwcGVyIiwiTmVhckRpcmVjdGlvbmFsU2hhZG93TWFwcGVyLmNvbnN0cnVjdG9yIiwiTmVhckRpcmVjdGlvbmFsU2hhZG93TWFwcGVyLmNvdmVyYWdlUmF0aW8iLCJOZWFyRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXIucFVwZGF0ZURlcHRoUHJvamVjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyx1QkFBdUIsV0FBWSxvRUFBb0UsQ0FBQyxDQUFDO0FBRWhILElBQU0sMkJBQTJCO0lBQVNBLFVBQXBDQSwyQkFBMkJBLFVBQWdDQTtJQUloRUEsU0FKS0EsMkJBQTJCQSxDQUlwQkEsYUFBeUJBO1FBQXpCQyw2QkFBeUJBLEdBQXpCQSxrQkFBeUJBO1FBRXBDQSxpQkFBT0EsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsYUFBYUEsQ0FBQ0E7SUFDcENBLENBQUNBO0lBS0RELHNCQUFXQSxzREFBYUE7UUFIeEJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7YUFFREYsVUFBeUJBLEtBQVlBO1lBRXBDRSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDYkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUVYQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUM3QkEsQ0FBQ0E7OztPQVRBRjtJQVdNQSw0REFBc0JBLEdBQTdCQSxVQUE4QkEsVUFBaUJBO1FBRTlDRyxJQUFJQSxPQUFPQSxHQUFpQkEsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7UUFFakVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQWtCQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUM1Q0EsSUFBSUEsQ0FBQ0EsR0FBVUEsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzNCQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtRQUM3RUEsQ0FBQ0E7UUFFREEsSUFBSUEsQ0FBQ0EsbUNBQW1DQSxDQUFDQSxVQUFVQSxFQUFFQSxJQUFJQSxDQUFDQSxjQUFjQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUN6RkEsSUFBSUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtJQUN0REEsQ0FBQ0E7SUFDRkgsa0NBQUNBO0FBQURBLENBekNBLEFBeUNDQSxFQXpDeUMsdUJBQXVCLEVBeUNoRTtBQUVELEFBQXFDLGlCQUE1QiwyQkFBMkIsQ0FBQyIsImZpbGUiOiJtYXRlcmlhbHMvc2hhZG93bWFwcGVycy9OZWFyRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXIuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XHJcbmltcG9ydCBEaXJlY3Rpb25hbFNoYWRvd01hcHBlclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL3NoYWRvd21hcHBlcnMvRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXJcIik7XHJcblxyXG5jbGFzcyBOZWFyRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXIgZXh0ZW5kcyBEaXJlY3Rpb25hbFNoYWRvd01hcHBlclxyXG57XHJcblx0cHJpdmF0ZSBfY292ZXJhZ2VSYXRpbzpudW1iZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGNvdmVyYWdlUmF0aW86bnVtYmVyID0gLjUpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLmNvdmVyYWdlUmF0aW8gPSBjb3ZlcmFnZVJhdGlvO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEgdG8gaW5kaWNhdGUgdGhlIHJhdGlvIG9mIHRoZSB2aWV3IGZydXN0dW0gdGhhdCBuZWVkcyB0byBiZSBjb3ZlcmVkIGJ5IHRoZSBzaGFkb3cgbWFwLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgY292ZXJhZ2VSYXRpbygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9jb3ZlcmFnZVJhdGlvO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBjb3ZlcmFnZVJhdGlvKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodmFsdWUgPiAxKVxyXG5cdFx0XHR2YWx1ZSA9IDE7IGVsc2UgaWYgKHZhbHVlIDwgMClcclxuXHRcdFx0dmFsdWUgPSAwO1xyXG5cclxuXHRcdHRoaXMuX2NvdmVyYWdlUmF0aW8gPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBwVXBkYXRlRGVwdGhQcm9qZWN0aW9uKHZpZXdDYW1lcmE6Q2FtZXJhKVxyXG5cdHtcclxuXHRcdHZhciBjb3JuZXJzOkFycmF5PG51bWJlcj4gPSB2aWV3Q2FtZXJhLnByb2plY3Rpb24uZnJ1c3R1bUNvcm5lcnM7XHJcblxyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgLyppbnQqLyA9IDA7IGkgPCAxMjsgKytpKSB7XHJcblx0XHRcdHZhciB2Om51bWJlciA9IGNvcm5lcnNbaV07XHJcblx0XHRcdHRoaXMuX3BMb2NhbEZydXN0dW1baV0gPSB2O1xyXG5cdFx0XHR0aGlzLl9wTG9jYWxGcnVzdHVtW2kgKyAxMl0gPSB2ICsgKGNvcm5lcnNbaSArIDEyXSAtIHYpKnRoaXMuX2NvdmVyYWdlUmF0aW87XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wVXBkYXRlUHJvamVjdGlvbkZyb21GcnVzdHVtQ29ybmVycyh2aWV3Q2FtZXJhLCB0aGlzLl9wTG9jYWxGcnVzdHVtLCB0aGlzLl9wTWF0cml4KTtcclxuXHRcdHRoaXMuX3BPdmVyYWxsRGVwdGhQcm9qZWN0aW9uLm1hdHJpeCA9IHRoaXMuX3BNYXRyaXg7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBOZWFyRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXI7Il19