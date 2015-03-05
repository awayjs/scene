var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NamedAssetBase = require("awayjs-core/lib/library/NamedAssetBase");
var AssetType = require("awayjs-core/lib/library/AssetType");
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
            return AssetType.FONT;
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
    return Font;
})(NamedAssetBase);
module.exports = Font;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L0ZvbnQudHMiXSwibmFtZXMiOlsiRm9udCIsIkZvbnQuY29uc3RydWN0b3IiLCJGb250LmFzc2V0VHlwZSIsIkZvbnQuZGlzcG9zZSIsIkZvbnQuZ2V0X2ZvbnRfdGFibGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sY0FBYyxXQUFjLHdDQUF3QyxDQUFDLENBQUM7QUFJN0UsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUNwRSxJQUFPLFNBQVMsV0FBZ0IsNkNBQTZDLENBQUMsQ0FBQztBQUUvRSxBQVNBOzs7Ozs7OztHQURHO0lBQ0csSUFBSTtJQUFTQSxVQUFiQSxJQUFJQSxVQUF1QkE7SUFJaENBLDBCQUEwQkE7SUFDM0JBLDZDQUE2Q0E7SUFDN0NBLEtBQUtBO0lBQ0xBLEVBQUVBO0lBQ0ZBLG1EQUFtREE7SUFDbkRBLEtBQUtBO0lBRUpBOztPQUVHQTtJQUNIQSxTQWRLQSxJQUFJQTtRQWdCUkMsaUJBQU9BLENBQUNBO1FBZERBLGlCQUFZQSxHQUFvQkEsSUFBSUEsS0FBS0EsRUFBYUEsQ0FBQ0E7SUFlL0RBLENBQUNBO0lBS0RELHNCQUFXQSwyQkFBU0E7UUFIcEJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUN2QkEsQ0FBQ0E7OztPQUFBRjtJQUNEQTs7T0FFR0E7SUFDSUEsc0JBQU9BLEdBQWRBO0lBR0FHLENBQUNBO0lBQ0RIOztPQUVHQTtJQUNJQSw2QkFBY0EsR0FBckJBLFVBQXNCQSxVQUFpQkE7UUFFdENJLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBO1FBRTFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNyQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBRUEsVUFBVUEsQ0FBQ0E7Z0JBQ3hDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM5QkEsQ0FBQ0E7UUFDREEsSUFBSUEsVUFBVUEsR0FBYUEsSUFBSUEsU0FBU0EsRUFBRUEsQ0FBQ0E7UUFDM0NBLFVBQVVBLENBQUNBLElBQUlBLEdBQUNBLFVBQVVBLENBQUNBO1FBQzNCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUNuQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7SUFDbkJBLENBQUNBO0lBRUZKLFdBQUNBO0FBQURBLENBbERBLEFBa0RDQSxFQWxEa0IsY0FBYyxFQWtEaEM7QUFFRCxBQUFjLGlCQUFMLElBQUksQ0FBQyIsImZpbGUiOiJ0ZXh0L0ZvbnQuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgTmFtZWRBc3NldEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xuXG5cbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcbmltcG9ydCBGb250VGFibGVcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdGV4dC9UZXNzZWxhdGVkRm9udFRhYmxlXCIpO1xuXG4vKipcbiAqIFN1Yk1lc2hCYXNlIHdyYXBzIGEgVHJpYW5nbGVTdWJHZW9tZXRyeSBhcyBhIHNjZW5lIGdyYXBoIGluc3RhbnRpYXRpb24uIEEgU3ViTWVzaEJhc2UgaXMgb3duZWQgYnkgYSBNZXNoIG9iamVjdC5cbiAqXG4gKlxuICogQHNlZSBhd2F5LmJhc2UuVHJpYW5nbGVTdWJHZW9tZXRyeVxuICogQHNlZSBhd2F5LmVudGl0aWVzLk1lc2hcbiAqXG4gKiBAY2xhc3MgYXdheS5iYXNlLlN1Yk1lc2hCYXNlXG4gKi9cbmNsYXNzIEZvbnQgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZSBpbXBsZW1lbnRzIElBc3NldFxue1xuXHRwcml2YXRlIF9mb250X3N0eWxlczpBcnJheTxGb250VGFibGU+ID0gbmV3IEFycmF5PEZvbnRUYWJsZT4oKTtcblxuXHQvL1RPRE8gdGVzdCBzaGFkZXIgcGlja2luZ1xuLy9cdFx0cHVibGljIGdldCBzaGFkZXJQaWNraW5nRGV0YWlscygpOmJvb2xlYW5cbi8vXHRcdHtcbi8vXG4vL1x0XHRcdHJldHVybiB0aGlzLnNvdXJjZUVudGl0eS5zaGFkZXJQaWNraW5nRGV0YWlscztcbi8vXHRcdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBUZXNzZWxhdGVkRm9udCBvYmplY3Rcblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLkZPTlQ7XG5cdH1cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblxuXHR9XG5cdC8qKlxuXHQgKkdldCBhIGZvbnQtdGFibGUgZm9yIGEgc3BlY2lmaWMgbmFtZSwgb3IgY3JlYXRlIG9uZSBpZiBpdCBkb2VzIG5vdCBleGlzdHMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0X2ZvbnRfdGFibGUoc3R5bGVfbmFtZTpzdHJpbmcpOkZvbnRUYWJsZVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9mb250X3N0eWxlcy5sZW5ndGg7XG5cblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSkge1xuXHRcdFx0aWYodGhpcy5fZm9udF9zdHlsZXNbaV0ubmFtZT09c3R5bGVfbmFtZSlcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2ZvbnRfc3R5bGVzW2ldO1xuXHRcdH1cblx0XHR2YXIgZm9udF9zdHlsZTpGb250VGFibGUgPSBuZXcgRm9udFRhYmxlKCk7XG5cdFx0Zm9udF9zdHlsZS5uYW1lPXN0eWxlX25hbWU7XG5cdFx0dGhpcy5fZm9udF9zdHlsZXMucHVzaChmb250X3N0eWxlKTtcblx0XHRyZXR1cm4gZm9udF9zdHlsZTtcblx0fVxuXG59XG5cbmV4cG9ydCA9IEZvbnQ7Il19