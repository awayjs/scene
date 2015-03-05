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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1Rlc3NlbGF0ZWRGb250VGFibGUudHMiXSwibmFtZXMiOlsiVGVzc2VsYXRlZEZvbnRUYWJsZSIsIlRlc3NlbGF0ZWRGb250VGFibGUuY29uc3RydWN0b3IiLCJUZXNzZWxhdGVkRm9udFRhYmxlLmRpc3Bvc2UiLCJUZXNzZWxhdGVkRm9udFRhYmxlLmdldF9mb250X2NoYXJzIiwiVGVzc2VsYXRlZEZvbnRUYWJsZS5nZXRfZm9udF9lbV9zaXplIiwiVGVzc2VsYXRlZEZvbnRUYWJsZS5zZXRfZm9udF9lbV9zaXplIiwiVGVzc2VsYXRlZEZvbnRUYWJsZS5nZXRfc3ViZ2VvX2Zvcl9jaGFyIiwiVGVzc2VsYXRlZEZvbnRUYWJsZS5zZXRfc3ViZ2VvX2Zvcl9jaGFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFPLGNBQWMsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBTTdFLEFBU0E7Ozs7Ozs7O0dBREc7SUFDRyxtQkFBbUI7SUFBU0EsVUFBNUJBLG1CQUFtQkEsVUFBdUJBO0lBTS9DQSwwQkFBMEJBO0lBQzNCQSw2Q0FBNkNBO0lBQzdDQSxLQUFLQTtJQUNMQSxFQUFFQTtJQUNGQSxtREFBbURBO0lBQ25EQSxLQUFLQTtJQUVKQTs7T0FFR0E7SUFDSEEsU0FoQktBLG1CQUFtQkE7UUFrQnZCQyxpQkFBT0EsQ0FBQ0E7UUFDUkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsS0FBS0EsRUFBbUJBLENBQUNBO1FBQ2hEQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxJQUFJQSxNQUFNQSxFQUFFQSxDQUFDQTtJQUNyQ0EsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLHFDQUFPQSxHQUFkQTtJQUdBRSxDQUFDQTtJQUVNRiw0Q0FBY0EsR0FBckJBO1FBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUFBO0lBQ3hCQSxDQUFDQTtJQUNNSCw4Q0FBZ0JBLEdBQXZCQTtRQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFBQTtJQUMxQkEsQ0FBQ0E7SUFDTUosOENBQWdCQSxHQUF2QkEsVUFBd0JBLFlBQW1CQTtRQUUxQ0ssSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBQ0EsWUFBWUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBQ0RMOztPQUVHQTtJQUNJQSxpREFBbUJBLEdBQTFCQSxVQUEyQkEsSUFBV0E7UUFFckNNLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ25DQSxDQUFDQTtJQUNETjs7T0FFR0E7SUFDSUEsaURBQW1CQSxHQUExQkEsVUFBMkJBLElBQVdBLEVBQUVBLE1BQXNCQTtRQUU3RE8sTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDakJBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQzlCQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQTtJQUNuQ0EsQ0FBQ0E7SUFFRlAsMEJBQUNBO0FBQURBLENBNURBLEFBNERDQSxFQTVEaUMsY0FBYyxFQTREL0M7QUFFRCxBQUE2QixpQkFBcEIsbUJBQW1CLENBQUMiLCJmaWxlIjoidGV4dC9UZXNzZWxhdGVkRm9udFRhYmxlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcblxuXG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IFN1Ykdlb21ldHJ5QmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Ykdlb21ldHJ5QmFzZVwiKTtcblxuLyoqXG4gKiBTdWJNZXNoQmFzZSB3cmFwcyBhIFRyaWFuZ2xlU3ViR2VvbWV0cnkgYXMgYSBzY2VuZSBncmFwaCBpbnN0YW50aWF0aW9uLiBBIFN1Yk1lc2hCYXNlIGlzIG93bmVkIGJ5IGEgTWVzaCBvYmplY3QuXG4gKlxuICpcbiAqIEBzZWUgYXdheS5iYXNlLlRyaWFuZ2xlU3ViR2VvbWV0cnlcbiAqIEBzZWUgYXdheS5lbnRpdGllcy5NZXNoXG4gKlxuICogQGNsYXNzIGF3YXkuYmFzZS5TdWJNZXNoQmFzZVxuICovXG5jbGFzcyBUZXNzZWxhdGVkRm9udFRhYmxlIGV4dGVuZHMgTmFtZWRBc3NldEJhc2Vcbntcblx0cHJpdmF0ZSBfZm9udF9jaGFyczpBcnJheTxTdWJHZW9tZXRyeUJhc2U+O1xuXHRwcml2YXRlIF9mb250X2NoYXJzX2RpYzpPYmplY3Q7XG5cdHByaXZhdGUgX2ZvbnRfZW1fc2l6ZTpudW1iZXI7XG5cdHByaXZhdGUgX2NoYXJEaWN0RGlydHk6Qm9vbGVhbjtcblx0Ly9UT0RPIHRlc3Qgc2hhZGVyIHBpY2tpbmdcbi8vXHRcdHB1YmxpYyBnZXQgc2hhZGVyUGlja2luZ0RldGFpbHMoKTpib29sZWFuXG4vL1x0XHR7XG4vL1xuLy9cdFx0XHRyZXR1cm4gdGhpcy5zb3VyY2VFbnRpdHkuc2hhZGVyUGlja2luZ0RldGFpbHM7XG4vL1x0XHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgVGVzc2VsYXRlZEZvbnQgb2JqZWN0XG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX2ZvbnRfY2hhcnMgPSBuZXcgQXJyYXk8U3ViR2VvbWV0cnlCYXNlPigpO1xuXHRcdHRoaXMuX2ZvbnRfY2hhcnNfZGljID0gbmV3IE9iamVjdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblxuXHR9XG5cblx0cHVibGljIGdldF9mb250X2NoYXJzKCk6QXJyYXk8U3ViR2VvbWV0cnlCYXNlPlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2ZvbnRfY2hhcnNcblx0fVxuXHRwdWJsaWMgZ2V0X2ZvbnRfZW1fc2l6ZSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2ZvbnRfZW1fc2l6ZVxuXHR9XG5cdHB1YmxpYyBzZXRfZm9udF9lbV9zaXplKGZvbnRfZW1fc2l6ZTpudW1iZXIpOnZvaWRcblx0e1xuXHRcdHRoaXMuX2ZvbnRfZW1fc2l6ZT1mb250X2VtX3NpemU7XG5cdH1cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0X3N1Ymdlb19mb3JfY2hhcihjaGFyOnN0cmluZyk6U3ViR2VvbWV0cnlCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZm9udF9jaGFyc19kaWNbY2hhcl07XG5cdH1cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgc2V0X3N1Ymdlb19mb3JfY2hhcihjaGFyOnN0cmluZywgc3ViZ2VvOlN1Ykdlb21ldHJ5QmFzZSk6dm9pZFxuXHR7XG5cdFx0c3ViZ2VvLm5hbWU9Y2hhcjtcblx0XHR0aGlzLl9mb250X2NoYXJzLnB1c2goc3ViZ2VvKTtcblx0XHR0aGlzLl9mb250X2NoYXJzX2RpY1tjaGFyXT1zdWJnZW87XG5cdH1cblxufVxuXG5leHBvcnQgPSBUZXNzZWxhdGVkRm9udFRhYmxlOyJdfQ==