var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetBase = require("awayjs-core/lib/library/AssetBase");
var TesselatedFontChar = require("awayjs-display/lib/text/TesselatedFontChar");
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
        var tesselated_font_char = new TesselatedFontChar(subgeo);
        subgeo.name = char;
        this._font_chars.push(tesselated_font_char);
        this._font_chars_dic[char] = tesselated_font_char;
    };
    return TesselatedFontTable;
})(AssetBase);
module.exports = TesselatedFontTable;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1Rlc3NlbGF0ZWRGb250VGFibGUudHMiXSwibmFtZXMiOlsiVGVzc2VsYXRlZEZvbnRUYWJsZSIsIlRlc3NlbGF0ZWRGb250VGFibGUuY29uc3RydWN0b3IiLCJUZXNzZWxhdGVkRm9udFRhYmxlLmRpc3Bvc2UiLCJUZXNzZWxhdGVkRm9udFRhYmxlLmdldF9mb250X2NoYXJzIiwiVGVzc2VsYXRlZEZvbnRUYWJsZS5nZXRfZm9udF9lbV9zaXplIiwiVGVzc2VsYXRlZEZvbnRUYWJsZS5zZXRfZm9udF9lbV9zaXplIiwiVGVzc2VsYXRlZEZvbnRUYWJsZS5nZXRfc3ViZ2VvX2Zvcl9jaGFyIiwiVGVzc2VsYXRlZEZvbnRUYWJsZS5zZXRfc3ViZ2VvX2Zvcl9jaGFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFPLFNBQVMsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBTXBFLElBQU8sa0JBQWtCLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUVwRixBQVNBOzs7Ozs7OztHQURHO0lBQ0csbUJBQW1CO0lBQVNBLFVBQTVCQSxtQkFBbUJBLFVBQWtCQTtJQU0xQ0EsMEJBQTBCQTtJQUMzQkEsNkNBQTZDQTtJQUM3Q0EsS0FBS0E7SUFDTEEsRUFBRUE7SUFDRkEsbURBQW1EQTtJQUNuREEsS0FBS0E7SUFFSkE7O09BRUdBO0lBQ0hBLFNBaEJLQSxtQkFBbUJBO1FBa0J2QkMsaUJBQU9BLENBQUNBO1FBQ1JBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLElBQUlBLEtBQUtBLEVBQXNCQSxDQUFDQTtRQUNuREEsSUFBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsSUFBSUEsTUFBTUEsRUFBRUEsQ0FBQ0E7SUFDckNBLENBQUNBO0lBRUREOztPQUVHQTtJQUNJQSxxQ0FBT0EsR0FBZEE7SUFHQUUsQ0FBQ0E7SUFFTUYsNENBQWNBLEdBQXJCQTtRQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFBQTtJQUN4QkEsQ0FBQ0E7SUFDTUgsOENBQWdCQSxHQUF2QkE7UUFFQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQUE7SUFDMUJBLENBQUNBO0lBQ01KLDhDQUFnQkEsR0FBdkJBLFVBQXdCQSxZQUFtQkE7UUFFMUNLLElBQUlBLENBQUNBLGFBQWFBLEdBQUNBLFlBQVlBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUNETDs7T0FFR0E7SUFDSUEsaURBQW1CQSxHQUExQkEsVUFBMkJBLElBQVdBO1FBRXJDTSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUNuQ0EsQ0FBQ0E7SUFDRE47O09BRUdBO0lBQ0lBLGlEQUFtQkEsR0FBMUJBLFVBQTJCQSxJQUFXQSxFQUFFQSxNQUFzQkE7UUFFN0RPLElBQUlBLG9CQUFvQkEsR0FBc0JBLElBQUlBLGtCQUFrQkEsQ0FBbUJBLE1BQU1BLENBQUNBLENBQUNBO1FBQy9GQSxNQUFNQSxDQUFDQSxJQUFJQSxHQUFDQSxJQUFJQSxDQUFDQTtRQUNqQkEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxDQUFDQTtRQUM1Q0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBQ0Esb0JBQW9CQSxDQUFDQTtJQUNqREEsQ0FBQ0E7SUFFRlAsMEJBQUNBO0FBQURBLENBN0RBLEFBNkRDQSxFQTdEaUMsU0FBUyxFQTZEMUM7QUFFRCxBQUE2QixpQkFBcEIsbUJBQW1CLENBQUMiLCJmaWxlIjoidGV4dC9UZXNzZWxhdGVkRm9udFRhYmxlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IEFzc2V0QmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldEJhc2VcIik7XG5cblxuaW1wb3J0IElBc3NldFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBTdWJHZW9tZXRyeUJhc2VcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9TdWJHZW9tZXRyeUJhc2VcIik7XG5pbXBvcnQgQ3VydmVTdWJHZW9tZXRyeVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0N1cnZlU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgVGVzc2VsYXRlZEZvbnRDaGFyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RleHQvVGVzc2VsYXRlZEZvbnRDaGFyXCIpO1xuXG4vKipcbiAqIFN1Yk1lc2hCYXNlIHdyYXBzIGEgVHJpYW5nbGVTdWJHZW9tZXRyeSBhcyBhIHNjZW5lIGdyYXBoIGluc3RhbnRpYXRpb24uIEEgU3ViTWVzaEJhc2UgaXMgb3duZWQgYnkgYSBNZXNoIG9iamVjdC5cbiAqXG4gKlxuICogQHNlZSBhd2F5LmJhc2UuVHJpYW5nbGVTdWJHZW9tZXRyeVxuICogQHNlZSBhd2F5LmVudGl0aWVzLk1lc2hcbiAqXG4gKiBAY2xhc3MgYXdheS5iYXNlLlN1Yk1lc2hCYXNlXG4gKi9cbmNsYXNzIFRlc3NlbGF0ZWRGb250VGFibGUgZXh0ZW5kcyBBc3NldEJhc2Vcbntcblx0cHJpdmF0ZSBfZm9udF9jaGFyczpBcnJheTxUZXNzZWxhdGVkRm9udENoYXI+O1xuXHRwcml2YXRlIF9mb250X2NoYXJzX2RpYzpPYmplY3Q7XG5cdHByaXZhdGUgX2ZvbnRfZW1fc2l6ZTpudW1iZXI7XG5cdHByaXZhdGUgX2NoYXJEaWN0RGlydHk6Qm9vbGVhbjtcblx0Ly9UT0RPIHRlc3Qgc2hhZGVyIHBpY2tpbmdcbi8vXHRcdHB1YmxpYyBnZXQgc2hhZGVyUGlja2luZ0RldGFpbHMoKTpib29sZWFuXG4vL1x0XHR7XG4vL1xuLy9cdFx0XHRyZXR1cm4gdGhpcy5zb3VyY2VFbnRpdHkuc2hhZGVyUGlja2luZ0RldGFpbHM7XG4vL1x0XHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgVGVzc2VsYXRlZEZvbnQgb2JqZWN0XG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX2ZvbnRfY2hhcnMgPSBuZXcgQXJyYXk8VGVzc2VsYXRlZEZvbnRDaGFyPigpO1xuXHRcdHRoaXMuX2ZvbnRfY2hhcnNfZGljID0gbmV3IE9iamVjdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblxuXHR9XG5cblx0cHVibGljIGdldF9mb250X2NoYXJzKCk6QXJyYXk8VGVzc2VsYXRlZEZvbnRDaGFyPlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2ZvbnRfY2hhcnNcblx0fVxuXHRwdWJsaWMgZ2V0X2ZvbnRfZW1fc2l6ZSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2ZvbnRfZW1fc2l6ZVxuXHR9XG5cdHB1YmxpYyBzZXRfZm9udF9lbV9zaXplKGZvbnRfZW1fc2l6ZTpudW1iZXIpOnZvaWRcblx0e1xuXHRcdHRoaXMuX2ZvbnRfZW1fc2l6ZT1mb250X2VtX3NpemU7XG5cdH1cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0X3N1Ymdlb19mb3JfY2hhcihjaGFyOnN0cmluZyk6VGVzc2VsYXRlZEZvbnRDaGFyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZm9udF9jaGFyc19kaWNbY2hhcl07XG5cdH1cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgc2V0X3N1Ymdlb19mb3JfY2hhcihjaGFyOnN0cmluZywgc3ViZ2VvOlN1Ykdlb21ldHJ5QmFzZSk6dm9pZFxuXHR7XG5cdFx0dmFyIHRlc3NlbGF0ZWRfZm9udF9jaGFyOlRlc3NlbGF0ZWRGb250Q2hhciA9IG5ldyBUZXNzZWxhdGVkRm9udENoYXIoPEN1cnZlU3ViR2VvbWV0cnk+c3ViZ2VvKTtcblx0XHRzdWJnZW8ubmFtZT1jaGFyO1xuXHRcdHRoaXMuX2ZvbnRfY2hhcnMucHVzaCh0ZXNzZWxhdGVkX2ZvbnRfY2hhcik7XG5cdFx0dGhpcy5fZm9udF9jaGFyc19kaWNbY2hhcl09dGVzc2VsYXRlZF9mb250X2NoYXI7XG5cdH1cblxufVxuXG5leHBvcnQgPSBUZXNzZWxhdGVkRm9udFRhYmxlOyJdfQ==