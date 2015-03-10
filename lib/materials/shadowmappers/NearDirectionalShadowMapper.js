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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvc2hhZG93bWFwcGVycy9OZWFyRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXIudHMiXSwibmFtZXMiOlsiTmVhckRpcmVjdGlvbmFsU2hhZG93TWFwcGVyIiwiTmVhckRpcmVjdGlvbmFsU2hhZG93TWFwcGVyLmNvbnN0cnVjdG9yIiwiTmVhckRpcmVjdGlvbmFsU2hhZG93TWFwcGVyLmNvdmVyYWdlUmF0aW8iLCJOZWFyRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXIucFVwZGF0ZURlcHRoUHJvamVjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyx1QkFBdUIsV0FBWSxvRUFBb0UsQ0FBQyxDQUFDO0FBRWhILElBQU0sMkJBQTJCO0lBQVNBLFVBQXBDQSwyQkFBMkJBLFVBQWdDQTtJQUloRUEsU0FKS0EsMkJBQTJCQSxDQUlwQkEsYUFBeUJBO1FBQXpCQyw2QkFBeUJBLEdBQXpCQSxrQkFBeUJBO1FBRXBDQSxpQkFBT0EsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsYUFBYUEsQ0FBQ0E7SUFDcENBLENBQUNBO0lBS0RELHNCQUFXQSxzREFBYUE7UUFIeEJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7YUFFREYsVUFBeUJBLEtBQVlBO1lBRXBDRSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDYkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUVYQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUM3QkEsQ0FBQ0E7OztPQVRBRjtJQVdNQSw0REFBc0JBLEdBQTdCQSxVQUE4QkEsVUFBaUJBO1FBRTlDRyxJQUFJQSxPQUFPQSxHQUFpQkEsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7UUFFakVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQWtCQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUM1Q0EsSUFBSUEsQ0FBQ0EsR0FBVUEsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzNCQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtRQUM3RUEsQ0FBQ0E7UUFFREEsSUFBSUEsQ0FBQ0EsbUNBQW1DQSxDQUFDQSxVQUFVQSxFQUFFQSxJQUFJQSxDQUFDQSxjQUFjQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUN6RkEsSUFBSUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtJQUN0REEsQ0FBQ0E7SUFDRkgsa0NBQUNBO0FBQURBLENBekNBLEFBeUNDQSxFQXpDeUMsdUJBQXVCLEVBeUNoRTtBQUVELEFBQXFDLGlCQUE1QiwyQkFBMkIsQ0FBQyIsImZpbGUiOiJtYXRlcmlhbHMvc2hhZG93bWFwcGVycy9OZWFyRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXIuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XG5pbXBvcnQgRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXJcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9zaGFkb3dtYXBwZXJzL0RpcmVjdGlvbmFsU2hhZG93TWFwcGVyXCIpO1xuXG5jbGFzcyBOZWFyRGlyZWN0aW9uYWxTaGFkb3dNYXBwZXIgZXh0ZW5kcyBEaXJlY3Rpb25hbFNoYWRvd01hcHBlclxue1xuXHRwcml2YXRlIF9jb3ZlcmFnZVJhdGlvOm51bWJlcjtcblxuXHRjb25zdHJ1Y3Rvcihjb3ZlcmFnZVJhdGlvOm51bWJlciA9IC41KVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuY292ZXJhZ2VSYXRpbyA9IGNvdmVyYWdlUmF0aW87XG5cdH1cblxuXHQvKipcblx0ICogQSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEgdG8gaW5kaWNhdGUgdGhlIHJhdGlvIG9mIHRoZSB2aWV3IGZydXN0dW0gdGhhdCBuZWVkcyB0byBiZSBjb3ZlcmVkIGJ5IHRoZSBzaGFkb3cgbWFwLlxuXHQgKi9cblx0cHVibGljIGdldCBjb3ZlcmFnZVJhdGlvKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY292ZXJhZ2VSYXRpbztcblx0fVxuXG5cdHB1YmxpYyBzZXQgY292ZXJhZ2VSYXRpbyh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodmFsdWUgPiAxKVxuXHRcdFx0dmFsdWUgPSAxOyBlbHNlIGlmICh2YWx1ZSA8IDApXG5cdFx0XHR2YWx1ZSA9IDA7XG5cblx0XHR0aGlzLl9jb3ZlcmFnZVJhdGlvID0gdmFsdWU7XG5cdH1cblxuXHRwdWJsaWMgcFVwZGF0ZURlcHRoUHJvamVjdGlvbih2aWV3Q2FtZXJhOkNhbWVyYSlcblx0e1xuXHRcdHZhciBjb3JuZXJzOkFycmF5PG51bWJlcj4gPSB2aWV3Q2FtZXJhLnByb2plY3Rpb24uZnJ1c3R1bUNvcm5lcnM7XG5cblx0XHRmb3IgKHZhciBpOm51bWJlciAvKmludCovID0gMDsgaSA8IDEyOyArK2kpIHtcblx0XHRcdHZhciB2Om51bWJlciA9IGNvcm5lcnNbaV07XG5cdFx0XHR0aGlzLl9wTG9jYWxGcnVzdHVtW2ldID0gdjtcblx0XHRcdHRoaXMuX3BMb2NhbEZydXN0dW1baSArIDEyXSA9IHYgKyAoY29ybmVyc1tpICsgMTJdIC0gdikqdGhpcy5fY292ZXJhZ2VSYXRpbztcblx0XHR9XG5cblx0XHR0aGlzLnBVcGRhdGVQcm9qZWN0aW9uRnJvbUZydXN0dW1Db3JuZXJzKHZpZXdDYW1lcmEsIHRoaXMuX3BMb2NhbEZydXN0dW0sIHRoaXMuX3BNYXRyaXgpO1xuXHRcdHRoaXMuX3BPdmVyYWxsRGVwdGhQcm9qZWN0aW9uLm1hdHJpeCA9IHRoaXMuX3BNYXRyaXg7XG5cdH1cbn1cblxuZXhwb3J0ID0gTmVhckRpcmVjdGlvbmFsU2hhZG93TWFwcGVyOyJdfQ==