var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetBase = require("awayjs-core/lib/library/AssetBase");
var FontTable = require("awayjs-display/lib/text/TesselatedFontTable");
/**
 * SubMeshBase wraps a TriangleSubGeometry as a scene graph instantiation. A SubMeshBase is owned by a Mesh object.
 *
 *
 * @see away.base.TriangleSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.SubMeshBase
 */
var Font = (function (_super) {
    __extends(Font, _super);
    //TODO test shader picking
    //		public get shaderPickingDetails():boolean
    //		{
    //
    //			return this.sourceEntity.shaderPickingDetails;
    //		}
    /**
     * Creates a new TesselatedFont object
     */
    function Font() {
        _super.call(this);
        this._font_styles = new Array();
    }
    Object.defineProperty(Font.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return Font.assetType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    Font.prototype.dispose = function () {
    };
    /**
     *Get a font-table for a specific name, or create one if it does not exists.
     */
    Font.prototype.get_font_table = function (style_name) {
        var len = this._font_styles.length;
        for (var i = 0; i < len; ++i) {
            if (this._font_styles[i].name == style_name)
                return this._font_styles[i];
        }
        var font_style = new FontTable();
        font_style.name = style_name;
        this._font_styles.push(font_style);
        return font_style;
    };
    Font.assetType = "[asset Font]";
    return Font;
})(AssetBase);
module.exports = Font;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L0ZvbnQudHMiXSwibmFtZXMiOlsiRm9udCIsIkZvbnQuY29uc3RydWN0b3IiLCJGb250LmFzc2V0VHlwZSIsIkZvbnQuZGlzcG9zZSIsIkZvbnQuZ2V0X2ZvbnRfdGFibGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFHcEUsSUFBTyxTQUFTLFdBQWUsNkNBQTZDLENBQUMsQ0FBQztBQUU5RSxBQVNBOzs7Ozs7OztHQURHO0lBQ0csSUFBSTtJQUFTQSxVQUFiQSxJQUFJQSxVQUFrQkE7SUFNM0JBLDBCQUEwQkE7SUFDM0JBLDZDQUE2Q0E7SUFDN0NBLEtBQUtBO0lBQ0xBLEVBQUVBO0lBQ0ZBLG1EQUFtREE7SUFDbkRBLEtBQUtBO0lBRUpBOztPQUVHQTtJQUNIQSxTQWhCS0EsSUFBSUE7UUFrQlJDLGlCQUFPQSxDQUFDQTtRQWREQSxpQkFBWUEsR0FBb0JBLElBQUlBLEtBQUtBLEVBQWFBLENBQUNBO0lBZS9EQSxDQUFDQTtJQUtERCxzQkFBV0EsMkJBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDdkJBLENBQUNBOzs7T0FBQUY7SUFDREE7O09BRUdBO0lBQ0lBLHNCQUFPQSxHQUFkQTtJQUdBRyxDQUFDQTtJQUNESDs7T0FFR0E7SUFDSUEsNkJBQWNBLEdBQXJCQSxVQUFzQkEsVUFBaUJBO1FBRXRDSSxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUUxQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDckNBLEVBQUVBLENBQUFBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLElBQUVBLFVBQVVBLENBQUNBO2dCQUN4Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLENBQUNBO1FBQ0RBLElBQUlBLFVBQVVBLEdBQWFBLElBQUlBLFNBQVNBLEVBQUVBLENBQUNBO1FBQzNDQSxVQUFVQSxDQUFDQSxJQUFJQSxHQUFDQSxVQUFVQSxDQUFDQTtRQUMzQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUFDbkNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBO0lBQ25CQSxDQUFDQTtJQWhEYUosY0FBU0EsR0FBVUEsY0FBY0EsQ0FBQ0E7SUFrRGpEQSxXQUFDQTtBQUFEQSxDQXBEQSxBQW9EQ0EsRUFwRGtCLFNBQVMsRUFvRDNCO0FBRUQsQUFBYyxpQkFBTCxJQUFJLENBQUMiLCJmaWxlIjoidGV4dC9Gb250LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBc3NldEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRCYXNlXCIpO1xyXG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xyXG5cclxuaW1wb3J0IEZvbnRUYWJsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9UZXNzZWxhdGVkRm9udFRhYmxlXCIpO1xyXG5cclxuLyoqXHJcbiAqIFN1Yk1lc2hCYXNlIHdyYXBzIGEgVHJpYW5nbGVTdWJHZW9tZXRyeSBhcyBhIHNjZW5lIGdyYXBoIGluc3RhbnRpYXRpb24uIEEgU3ViTWVzaEJhc2UgaXMgb3duZWQgYnkgYSBNZXNoIG9iamVjdC5cclxuICpcclxuICpcclxuICogQHNlZSBhd2F5LmJhc2UuVHJpYW5nbGVTdWJHZW9tZXRyeVxyXG4gKiBAc2VlIGF3YXkuZW50aXRpZXMuTWVzaFxyXG4gKlxyXG4gKiBAY2xhc3MgYXdheS5iYXNlLlN1Yk1lc2hCYXNlXHJcbiAqL1xyXG5jbGFzcyBGb250IGV4dGVuZHMgQXNzZXRCYXNlIGltcGxlbWVudHMgSUFzc2V0XHJcbntcclxuXHRwdWJsaWMgc3RhdGljIGFzc2V0VHlwZTpzdHJpbmcgPSBcIlthc3NldCBGb250XVwiO1xyXG5cclxuXHRwcml2YXRlIF9mb250X3N0eWxlczpBcnJheTxGb250VGFibGU+ID0gbmV3IEFycmF5PEZvbnRUYWJsZT4oKTtcclxuXHJcblx0Ly9UT0RPIHRlc3Qgc2hhZGVyIHBpY2tpbmdcclxuLy9cdFx0cHVibGljIGdldCBzaGFkZXJQaWNraW5nRGV0YWlscygpOmJvb2xlYW5cclxuLy9cdFx0e1xyXG4vL1xyXG4vL1x0XHRcdHJldHVybiB0aGlzLnNvdXJjZUVudGl0eS5zaGFkZXJQaWNraW5nRGV0YWlscztcclxuLy9cdFx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IFRlc3NlbGF0ZWRGb250IG9iamVjdFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBGb250LmFzc2V0VHlwZTtcclxuXHR9XHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cclxuXHR9XHJcblx0LyoqXHJcblx0ICpHZXQgYSBmb250LXRhYmxlIGZvciBhIHNwZWNpZmljIG5hbWUsIG9yIGNyZWF0ZSBvbmUgaWYgaXQgZG9lcyBub3QgZXhpc3RzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRfZm9udF90YWJsZShzdHlsZV9uYW1lOnN0cmluZyk6Rm9udFRhYmxlXHJcblx0e1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9mb250X3N0eWxlcy5sZW5ndGg7XHJcblxyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuXHRcdFx0aWYodGhpcy5fZm9udF9zdHlsZXNbaV0ubmFtZT09c3R5bGVfbmFtZSlcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZm9udF9zdHlsZXNbaV07XHJcblx0XHR9XHJcblx0XHR2YXIgZm9udF9zdHlsZTpGb250VGFibGUgPSBuZXcgRm9udFRhYmxlKCk7XHJcblx0XHRmb250X3N0eWxlLm5hbWU9c3R5bGVfbmFtZTtcclxuXHRcdHRoaXMuX2ZvbnRfc3R5bGVzLnB1c2goZm9udF9zdHlsZSk7XHJcblx0XHRyZXR1cm4gZm9udF9zdHlsZTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5leHBvcnQgPSBGb250OyJdfQ==