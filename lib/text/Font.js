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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L0ZvbnQudHMiXSwibmFtZXMiOlsiRm9udCIsIkZvbnQuY29uc3RydWN0b3IiLCJGb250LmFzc2V0VHlwZSIsIkZvbnQuZGlzcG9zZSIsIkZvbnQuZ2V0X2ZvbnRfdGFibGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFHcEUsSUFBTyxTQUFTLFdBQWUsNkNBQTZDLENBQUMsQ0FBQztBQUU5RSxBQVNBOzs7Ozs7OztHQURHO0lBQ0csSUFBSTtJQUFTQSxVQUFiQSxJQUFJQSxVQUFrQkE7SUFNM0JBLDBCQUEwQkE7SUFDM0JBLDZDQUE2Q0E7SUFDN0NBLEtBQUtBO0lBQ0xBLEVBQUVBO0lBQ0ZBLG1EQUFtREE7SUFDbkRBLEtBQUtBO0lBRUpBOztPQUVHQTtJQUNIQSxTQWhCS0EsSUFBSUE7UUFrQlJDLGlCQUFPQSxDQUFDQTtRQWREQSxpQkFBWUEsR0FBb0JBLElBQUlBLEtBQUtBLEVBQWFBLENBQUNBO0lBZS9EQSxDQUFDQTtJQUtERCxzQkFBV0EsMkJBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDdkJBLENBQUNBOzs7T0FBQUY7SUFDREE7O09BRUdBO0lBQ0lBLHNCQUFPQSxHQUFkQTtJQUdBRyxDQUFDQTtJQUNESDs7T0FFR0E7SUFDSUEsNkJBQWNBLEdBQXJCQSxVQUFzQkEsVUFBaUJBO1FBRXRDSSxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUUxQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDckNBLEVBQUVBLENBQUFBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLElBQUVBLFVBQVVBLENBQUNBO2dCQUN4Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLENBQUNBO1FBQ0RBLElBQUlBLFVBQVVBLEdBQWFBLElBQUlBLFNBQVNBLEVBQUVBLENBQUNBO1FBQzNDQSxVQUFVQSxDQUFDQSxJQUFJQSxHQUFDQSxVQUFVQSxDQUFDQTtRQUMzQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUFDbkNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBO0lBQ25CQSxDQUFDQTtJQWhEYUosY0FBU0EsR0FBVUEsY0FBY0EsQ0FBQ0E7SUFrRGpEQSxXQUFDQTtBQUFEQSxDQXBEQSxBQW9EQ0EsRUFwRGtCLFNBQVMsRUFvRDNCO0FBRUQsQUFBYyxpQkFBTCxJQUFJLENBQUMiLCJmaWxlIjoidGV4dC9Gb250LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBc3NldEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRCYXNlXCIpO1xuaW1wb3J0IElBc3NldFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcblxuaW1wb3J0IEZvbnRUYWJsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9UZXNzZWxhdGVkRm9udFRhYmxlXCIpO1xuXG4vKipcbiAqIFN1Yk1lc2hCYXNlIHdyYXBzIGEgVHJpYW5nbGVTdWJHZW9tZXRyeSBhcyBhIHNjZW5lIGdyYXBoIGluc3RhbnRpYXRpb24uIEEgU3ViTWVzaEJhc2UgaXMgb3duZWQgYnkgYSBNZXNoIG9iamVjdC5cbiAqXG4gKlxuICogQHNlZSBhd2F5LmJhc2UuVHJpYW5nbGVTdWJHZW9tZXRyeVxuICogQHNlZSBhd2F5LmVudGl0aWVzLk1lc2hcbiAqXG4gKiBAY2xhc3MgYXdheS5iYXNlLlN1Yk1lc2hCYXNlXG4gKi9cbmNsYXNzIEZvbnQgZXh0ZW5kcyBBc3NldEJhc2UgaW1wbGVtZW50cyBJQXNzZXRcbntcblx0cHVibGljIHN0YXRpYyBhc3NldFR5cGU6c3RyaW5nID0gXCJbYXNzZXQgRm9udF1cIjtcblxuXHRwcml2YXRlIF9mb250X3N0eWxlczpBcnJheTxGb250VGFibGU+ID0gbmV3IEFycmF5PEZvbnRUYWJsZT4oKTtcblxuXHQvL1RPRE8gdGVzdCBzaGFkZXIgcGlja2luZ1xuLy9cdFx0cHVibGljIGdldCBzaGFkZXJQaWNraW5nRGV0YWlscygpOmJvb2xlYW5cbi8vXHRcdHtcbi8vXG4vL1x0XHRcdHJldHVybiB0aGlzLnNvdXJjZUVudGl0eS5zaGFkZXJQaWNraW5nRGV0YWlscztcbi8vXHRcdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBUZXNzZWxhdGVkRm9udCBvYmplY3Rcblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gRm9udC5hc3NldFR5cGU7XG5cdH1cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblxuXHR9XG5cdC8qKlxuXHQgKkdldCBhIGZvbnQtdGFibGUgZm9yIGEgc3BlY2lmaWMgbmFtZSwgb3IgY3JlYXRlIG9uZSBpZiBpdCBkb2VzIG5vdCBleGlzdHMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0X2ZvbnRfdGFibGUoc3R5bGVfbmFtZTpzdHJpbmcpOkZvbnRUYWJsZVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9mb250X3N0eWxlcy5sZW5ndGg7XG5cblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSkge1xuXHRcdFx0aWYodGhpcy5fZm9udF9zdHlsZXNbaV0ubmFtZT09c3R5bGVfbmFtZSlcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2ZvbnRfc3R5bGVzW2ldO1xuXHRcdH1cblx0XHR2YXIgZm9udF9zdHlsZTpGb250VGFibGUgPSBuZXcgRm9udFRhYmxlKCk7XG5cdFx0Zm9udF9zdHlsZS5uYW1lPXN0eWxlX25hbWU7XG5cdFx0dGhpcy5fZm9udF9zdHlsZXMucHVzaChmb250X3N0eWxlKTtcblx0XHRyZXR1cm4gZm9udF9zdHlsZTtcblx0fVxuXG59XG5cbmV4cG9ydCA9IEZvbnQ7Il19