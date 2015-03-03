var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NamedAssetBase = require("awayjs-core/lib/library/NamedAssetBase");
/**
 * SubMeshBase wraps a TriangleSubGeometry as a scene graph instantiation. A SubMeshBase is owned by a Mesh object.
 *
 *
 * @see away.base.TriangleSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.SubMeshBase
 */
var TesselatedFontTable = (function (_super) {
    __extends(TesselatedFontTable, _super);
    //TODO test shader picking
    //		public get shaderPickingDetails():boolean
    //		{
    //
    //			return this.sourceEntity.shaderPickingDetails;
    //		}
    /**
     * Creates a new TesselatedFont object
     */
    function TesselatedFontTable() {
        _super.call(this);
        this._font_chars = new Array();
        this._font_chars_dic = new Object();
    }
    /**
     *
     */
    TesselatedFontTable.prototype.dispose = function () {
    };
    TesselatedFontTable.prototype.get_font_chars = function () {
        return this._font_chars;
    };
    TesselatedFontTable.prototype.get_font_em_size = function () {
        return this._font_em_size;
    };
    TesselatedFontTable.prototype.set_font_em_size = function (font_em_size) {
        this._font_em_size = font_em_size;
    };
    /**
     *
     */
    TesselatedFontTable.prototype.get_subgeo_for_char = function (char) {
        return this._font_chars_dic[char];
    };
    /**
     *
     */
    TesselatedFontTable.prototype.set_subgeo_for_char = function (char, subgeo) {
        subgeo.name = char;
        this._font_chars.push(subgeo);
        this._font_chars_dic[char] = subgeo;
    };
    return TesselatedFontTable;
})(NamedAssetBase);
module.exports = TesselatedFontTable;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1Rlc3NlbGF0ZWRGb250VGFibGUudHMiXSwibmFtZXMiOlsiVGVzc2VsYXRlZEZvbnRUYWJsZSIsIlRlc3NlbGF0ZWRGb250VGFibGUuY29uc3RydWN0b3IiLCJUZXNzZWxhdGVkRm9udFRhYmxlLmRpc3Bvc2UiLCJUZXNzZWxhdGVkRm9udFRhYmxlLmdldF9mb250X2NoYXJzIiwiVGVzc2VsYXRlZEZvbnRUYWJsZS5nZXRfZm9udF9lbV9zaXplIiwiVGVzc2VsYXRlZEZvbnRUYWJsZS5zZXRfZm9udF9lbV9zaXplIiwiVGVzc2VsYXRlZEZvbnRUYWJsZS5nZXRfc3ViZ2VvX2Zvcl9jaGFyIiwiVGVzc2VsYXRlZEZvbnRUYWJsZS5zZXRfc3ViZ2VvX2Zvcl9jaGFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFPLGNBQWMsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBTTdFLEFBU0E7Ozs7Ozs7O0dBREc7SUFDRyxtQkFBbUI7SUFBU0EsVUFBNUJBLG1CQUFtQkEsVUFBdUJBO0lBTS9DQSwwQkFBMEJBO0lBQzNCQSw2Q0FBNkNBO0lBQzdDQSxLQUFLQTtJQUNMQSxFQUFFQTtJQUNGQSxtREFBbURBO0lBQ25EQSxLQUFLQTtJQUVKQTs7T0FFR0E7SUFDSEEsU0FoQktBLG1CQUFtQkE7UUFrQnZCQyxpQkFBT0EsQ0FBQ0E7UUFDUkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsS0FBS0EsRUFBbUJBLENBQUNBO1FBQ2hEQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxJQUFJQSxNQUFNQSxFQUFFQSxDQUFDQTtJQUNyQ0EsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLHFDQUFPQSxHQUFkQTtJQUdBRSxDQUFDQTtJQUVNRiw0Q0FBY0EsR0FBckJBO1FBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUFBO0lBQ3hCQSxDQUFDQTtJQUNNSCw4Q0FBZ0JBLEdBQXZCQTtRQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFBQTtJQUMxQkEsQ0FBQ0E7SUFDTUosOENBQWdCQSxHQUF2QkEsVUFBd0JBLFlBQW1CQTtRQUUxQ0ssSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBQ0EsWUFBWUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBQ0RMOztPQUVHQTtJQUNJQSxpREFBbUJBLEdBQTFCQSxVQUEyQkEsSUFBV0E7UUFFckNNLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ25DQSxDQUFDQTtJQUNETjs7T0FFR0E7SUFDSUEsaURBQW1CQSxHQUExQkEsVUFBMkJBLElBQVdBLEVBQUVBLE1BQXNCQTtRQUU3RE8sTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDakJBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQzlCQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQTtJQUNuQ0EsQ0FBQ0E7SUFFRlAsMEJBQUNBO0FBQURBLENBNURBLEFBNERDQSxFQTVEaUMsY0FBYyxFQTREL0M7QUFFRCxBQUE2QixpQkFBcEIsbUJBQW1CLENBQUMiLCJmaWxlIjoidGV4dC9UZXNzZWxhdGVkRm9udFRhYmxlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgTmFtZWRBc3NldEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xyXG5cclxuXHJcbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XHJcbmltcG9ydCBTdWJHZW9tZXRyeUJhc2VcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9TdWJHZW9tZXRyeUJhc2VcIik7XHJcblxyXG4vKipcclxuICogU3ViTWVzaEJhc2Ugd3JhcHMgYSBUcmlhbmdsZVN1Ykdlb21ldHJ5IGFzIGEgc2NlbmUgZ3JhcGggaW5zdGFudGlhdGlvbi4gQSBTdWJNZXNoQmFzZSBpcyBvd25lZCBieSBhIE1lc2ggb2JqZWN0LlxyXG4gKlxyXG4gKlxyXG4gKiBAc2VlIGF3YXkuYmFzZS5UcmlhbmdsZVN1Ykdlb21ldHJ5XHJcbiAqIEBzZWUgYXdheS5lbnRpdGllcy5NZXNoXHJcbiAqXHJcbiAqIEBjbGFzcyBhd2F5LmJhc2UuU3ViTWVzaEJhc2VcclxuICovXHJcbmNsYXNzIFRlc3NlbGF0ZWRGb250VGFibGUgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZVxyXG57XHJcblx0cHJpdmF0ZSBfZm9udF9jaGFyczpBcnJheTxTdWJHZW9tZXRyeUJhc2U+O1xyXG5cdHByaXZhdGUgX2ZvbnRfY2hhcnNfZGljOk9iamVjdDtcclxuXHRwcml2YXRlIF9mb250X2VtX3NpemU6bnVtYmVyO1xyXG5cdHByaXZhdGUgX2NoYXJEaWN0RGlydHk6Qm9vbGVhbjtcclxuXHQvL1RPRE8gdGVzdCBzaGFkZXIgcGlja2luZ1xyXG4vL1x0XHRwdWJsaWMgZ2V0IHNoYWRlclBpY2tpbmdEZXRhaWxzKCk6Ym9vbGVhblxyXG4vL1x0XHR7XHJcbi8vXHJcbi8vXHRcdFx0cmV0dXJuIHRoaXMuc291cmNlRW50aXR5LnNoYWRlclBpY2tpbmdEZXRhaWxzO1xyXG4vL1x0XHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgVGVzc2VsYXRlZEZvbnQgb2JqZWN0XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLl9mb250X2NoYXJzID0gbmV3IEFycmF5PFN1Ykdlb21ldHJ5QmFzZT4oKTtcclxuXHRcdHRoaXMuX2ZvbnRfY2hhcnNfZGljID0gbmV3IE9iamVjdCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRfZm9udF9jaGFycygpOkFycmF5PFN1Ykdlb21ldHJ5QmFzZT5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZm9udF9jaGFyc1xyXG5cdH1cclxuXHRwdWJsaWMgZ2V0X2ZvbnRfZW1fc2l6ZSgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9mb250X2VtX3NpemVcclxuXHR9XHJcblx0cHVibGljIHNldF9mb250X2VtX3NpemUoZm9udF9lbV9zaXplOm51bWJlcik6dm9pZFxyXG5cdHtcclxuXHRcdHRoaXMuX2ZvbnRfZW1fc2l6ZT1mb250X2VtX3NpemU7XHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldF9zdWJnZW9fZm9yX2NoYXIoY2hhcjpzdHJpbmcpOlN1Ykdlb21ldHJ5QmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9mb250X2NoYXJzX2RpY1tjaGFyXTtcclxuXHR9XHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0X3N1Ymdlb19mb3JfY2hhcihjaGFyOnN0cmluZywgc3ViZ2VvOlN1Ykdlb21ldHJ5QmFzZSk6dm9pZFxyXG5cdHtcclxuXHRcdHN1Ymdlby5uYW1lPWNoYXI7XHJcblx0XHR0aGlzLl9mb250X2NoYXJzLnB1c2goc3ViZ2VvKTtcclxuXHRcdHRoaXMuX2ZvbnRfY2hhcnNfZGljW2NoYXJdPXN1YmdlbztcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgPSBUZXNzZWxhdGVkRm9udFRhYmxlOyJdfQ==