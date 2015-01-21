var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NullBounds = require("awayjs-core/lib/bounds/NullBounds");
var AssetType = require("awayjs-core/lib/library/AssetType");
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
var SkyboxNode = require("awayjs-display/lib/partition/SkyboxNode");
/**
 * A Skybox class is used to render a sky in the scene. It's always considered static and 'at infinity', and as
 * such it's always centered at the camera's position and sized to exactly fit within the camera's frustum, ensuring
 * the sky box is always as large as possible without being clipped.
 */
var Skybox = (function (_super) {
    __extends(Skybox, _super);
    /**
     * Create a new Skybox object.
     *
     * @param material	The material with which to render the Skybox.
     */
    function Skybox(material) {
        _super.call(this);
        this._pIsEntity = true;
        this.material = material;
    }
    Object.defineProperty(Skybox.prototype, "animator", {
        get: function () {
            return this._animator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "uvTransform", {
        /**
         *
         */
        get: function () {
            return this._uvTransform;
        },
        set: function (value) {
            this._uvTransform = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "material", {
        /**
         * The material with which to render the Skybox.
         */
        get: function () {
            return this._material;
        },
        set: function (value) {
            if (value == this._material)
                return;
            if (this._material)
                this._material.iRemoveOwner(this);
            this._material = value;
            if (this._material)
                this._material.iAddOwner(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "assetType", {
        get: function () {
            return AssetType.SKYBOX;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     */
    Skybox.prototype.pInvalidateBounds = function () {
        // dead end
    };
    /**
     * @protected
     */
    Skybox.prototype.pCreateEntityPartitionNode = function () {
        return new SkyboxNode(this);
    };
    /**
     * @protected
     */
    Skybox.prototype.pCreateDefaultBoundingVolume = function () {
        return new NullBounds();
    };
    /**
     * @protected
     */
    Skybox.prototype.pUpdateBounds = function () {
        this._pBoundsInvalid = false;
    };
    Object.defineProperty(Skybox.prototype, "castsShadows", {
        get: function () {
            return false; //TODO
        },
        enumerable: true,
        configurable: true
    });
    Skybox.prototype._iCollectRenderables = function (renderer) {
        //skybox do not get collected in the standard entity list
    };
    Skybox.prototype._iCollectRenderable = function (renderer) {
    };
    return Skybox;
})(DisplayObject);
module.exports = Skybox;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9Ta3lib3gudHMiXSwibmFtZXMiOlsiU2t5Ym94IiwiU2t5Ym94LmNvbnN0cnVjdG9yIiwiU2t5Ym94LmFuaW1hdG9yIiwiU2t5Ym94LnV2VHJhbnNmb3JtIiwiU2t5Ym94Lm1hdGVyaWFsIiwiU2t5Ym94LmFzc2V0VHlwZSIsIlNreWJveC5wSW52YWxpZGF0ZUJvdW5kcyIsIlNreWJveC5wQ3JlYXRlRW50aXR5UGFydGl0aW9uTm9kZSIsIlNreWJveC5wQ3JlYXRlRGVmYXVsdEJvdW5kaW5nVm9sdW1lIiwiU2t5Ym94LnBVcGRhdGVCb3VuZHMiLCJTa3lib3guY2FzdHNTaGFkb3dzIiwiU2t5Ym94Ll9pQ29sbGVjdFJlbmRlcmFibGVzIiwiU2t5Ym94Ll9pQ29sbGVjdFJlbmRlcmFibGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sVUFBVSxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFFckUsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUdwRSxJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRTNFLElBQU8sVUFBVSxXQUFlLHlDQUF5QyxDQUFDLENBQUM7QUFLM0UsQUFLQTs7OztHQURHO0lBQ0csTUFBTTtJQUFTQSxVQUFmQSxNQUFNQSxVQUFzQkE7SUF5QmpDQTs7OztPQUlHQTtJQUNIQSxTQTlCS0EsTUFBTUEsQ0E4QkNBLFFBQXFCQTtRQUVoQ0MsaUJBQU9BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1FBRXZCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxRQUFRQSxDQUFDQTtJQUMxQkEsQ0FBQ0E7SUE5QkRELHNCQUFXQSw0QkFBUUE7YUFBbkJBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO1FBQ3ZCQSxDQUFDQTs7O09BQUFGO0lBS0RBLHNCQUFXQSwrQkFBV0E7UUFIdEJBOztXQUVHQTthQUNIQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7YUFFREgsVUFBdUJBLEtBQWlCQTtZQUV2Q0csSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDM0JBLENBQUNBOzs7T0FMQUg7SUF3QkRBLHNCQUFXQSw0QkFBUUE7UUFIcEJBOztXQUVHQTthQUNGQTtZQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUN2QkEsQ0FBQ0E7YUFFREosVUFBb0JBLEtBQWtCQTtZQUVyQ0ksRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7Z0JBQzNCQSxNQUFNQSxDQUFDQTtZQUVSQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtnQkFDbEJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFlBQVlBLENBQWtCQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUVwREEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFdkJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO2dCQUNsQkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBa0JBLElBQUlBLENBQUNBLENBQUNBO1FBQ2xEQSxDQUFDQTs7O09BZEFKO0lBZ0JEQSxzQkFBV0EsNkJBQVNBO2FBQXBCQTtZQUVDSyxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7OztPQUFBTDtJQUVEQTs7T0FFR0E7SUFDSUEsa0NBQWlCQSxHQUF4QkE7UUFFQ00sV0FBV0E7SUFDWkEsQ0FBQ0E7SUFFRE47O09BRUdBO0lBQ0lBLDJDQUEwQkEsR0FBakNBO1FBRUNPLE1BQU1BLENBQUNBLElBQUlBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQzdCQSxDQUFDQTtJQUVEUDs7T0FFR0E7SUFDSUEsNkNBQTRCQSxHQUFuQ0E7UUFFQ1EsTUFBTUEsQ0FBc0JBLElBQUlBLFVBQVVBLEVBQUVBLENBQUNBO0lBQzlDQSxDQUFDQTtJQUVEUjs7T0FFR0E7SUFDSUEsOEJBQWFBLEdBQXBCQTtRQUVDUyxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxLQUFLQSxDQUFDQTtJQUM5QkEsQ0FBQ0E7SUFFRFQsc0JBQVdBLGdDQUFZQTthQUF2QkE7WUFFQ1UsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsTUFBTUE7UUFDckJBLENBQUNBLEdBRGFBOzs7T0FDYlY7SUFFTUEscUNBQW9CQSxHQUEzQkEsVUFBNEJBLFFBQWtCQTtRQUU3Q1cseURBQXlEQTtJQUMxREEsQ0FBQ0E7SUFFTVgsb0NBQW1CQSxHQUExQkEsVUFBMkJBLFFBQWtCQTtJQUc3Q1ksQ0FBQ0E7SUFDRlosYUFBQ0E7QUFBREEsQ0FoSEEsQUFnSENBLEVBaEhvQixhQUFhLEVBZ0hqQztBQUVELEFBQWdCLGlCQUFQLE1BQU0sQ0FBQyIsImZpbGUiOiJlbnRpdGllcy9Ta3lib3guanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJvdW5kaW5nVm9sdW1lQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ib3VuZHMvQm91bmRpbmdWb2x1bWVCYXNlXCIpO1xuaW1wb3J0IE51bGxCb3VuZHNcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2JvdW5kcy9OdWxsQm91bmRzXCIpO1xuaW1wb3J0IFVWVHJhbnNmb3JtXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1VWVHJhbnNmb3JtXCIpO1xuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5cbmltcG9ydCBJQW5pbWF0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcbmltcG9ydCBJTWF0ZXJpYWxPd25lclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSU1hdGVyaWFsT3duZXJcIik7XG5pbXBvcnQgU2t5Ym94Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL1NreWJveE5vZGVcIik7XG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvSVJlbmRlcmVyXCIpO1xuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XG5cbi8qKlxuICogQSBTa3lib3ggY2xhc3MgaXMgdXNlZCB0byByZW5kZXIgYSBza3kgaW4gdGhlIHNjZW5lLiBJdCdzIGFsd2F5cyBjb25zaWRlcmVkIHN0YXRpYyBhbmQgJ2F0IGluZmluaXR5JywgYW5kIGFzXG4gKiBzdWNoIGl0J3MgYWx3YXlzIGNlbnRlcmVkIGF0IHRoZSBjYW1lcmEncyBwb3NpdGlvbiBhbmQgc2l6ZWQgdG8gZXhhY3RseSBmaXQgd2l0aGluIHRoZSBjYW1lcmEncyBmcnVzdHVtLCBlbnN1cmluZ1xuICogdGhlIHNreSBib3ggaXMgYWx3YXlzIGFzIGxhcmdlIGFzIHBvc3NpYmxlIHdpdGhvdXQgYmVpbmcgY2xpcHBlZC5cbiAqL1xuY2xhc3MgU2t5Ym94IGV4dGVuZHMgRGlzcGxheU9iamVjdCBpbXBsZW1lbnRzIElFbnRpdHksIElNYXRlcmlhbE93bmVyXG57XG5cdHByaXZhdGUgX3V2VHJhbnNmb3JtOlVWVHJhbnNmb3JtO1xuXG5cdHByaXZhdGUgX21hdGVyaWFsOk1hdGVyaWFsQmFzZTtcblx0cHJpdmF0ZSBfYW5pbWF0b3I6SUFuaW1hdG9yO1xuXG5cdHB1YmxpYyBnZXQgYW5pbWF0b3IoKTpJQW5pbWF0b3Jcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hbmltYXRvcjtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB1dlRyYW5zZm9ybSgpOlVWVHJhbnNmb3JtXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXZUcmFuc2Zvcm07XG5cdH1cblxuXHRwdWJsaWMgc2V0IHV2VHJhbnNmb3JtKHZhbHVlOlVWVHJhbnNmb3JtKVxuXHR7XG5cdFx0dGhpcy5fdXZUcmFuc2Zvcm0gPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgU2t5Ym94IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIG1hdGVyaWFsXHRUaGUgbWF0ZXJpYWwgd2l0aCB3aGljaCB0byByZW5kZXIgdGhlIFNreWJveC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKG1hdGVyaWFsOk1hdGVyaWFsQmFzZSlcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9wSXNFbnRpdHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXHR9XG5cbi8qKlxuICogVGhlIG1hdGVyaWFsIHdpdGggd2hpY2ggdG8gcmVuZGVyIHRoZSBTa3lib3guXG4gKi9cblx0cHVibGljIGdldCBtYXRlcmlhbCgpOk1hdGVyaWFsQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsO1xuXHR9XG5cblx0cHVibGljIHNldCBtYXRlcmlhbCh2YWx1ZTpNYXRlcmlhbEJhc2UpXG5cdHtcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fbWF0ZXJpYWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAodGhpcy5fbWF0ZXJpYWwpXG5cdFx0XHR0aGlzLl9tYXRlcmlhbC5pUmVtb3ZlT3duZXIoPElNYXRlcmlhbE93bmVyPiB0aGlzKTtcblxuXHRcdHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fbWF0ZXJpYWwpXG5cdFx0XHR0aGlzLl9tYXRlcmlhbC5pQWRkT3duZXIoPElNYXRlcmlhbE93bmVyPiB0aGlzKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLlNLWUJPWDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcEludmFsaWRhdGVCb3VuZHMoKVxuXHR7XG5cdFx0Ly8gZGVhZCBlbmRcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUoKTpTa3lib3hOb2RlXG5cdHtcblx0XHRyZXR1cm4gbmV3IFNreWJveE5vZGUodGhpcyk7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUoKTpCb3VuZGluZ1ZvbHVtZUJhc2Vcblx0e1xuXHRcdHJldHVybiA8Qm91bmRpbmdWb2x1bWVCYXNlPiBuZXcgTnVsbEJvdW5kcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwVXBkYXRlQm91bmRzKClcblx0e1xuXHRcdHRoaXMuX3BCb3VuZHNJbnZhbGlkID0gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGNhc3RzU2hhZG93cygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiBmYWxzZTsgLy9UT0RPXG5cdH1cblxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZXMocmVuZGVyZXI6SVJlbmRlcmVyKVxuXHR7XG5cdFx0Ly9za3lib3ggZG8gbm90IGdldCBjb2xsZWN0ZWQgaW4gdGhlIHN0YW5kYXJkIGVudGl0eSBsaXN0XG5cdH1cblxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlcjpJUmVuZGVyZXIpXG5cdHtcblxuXHR9XG59XG5cbmV4cG9ydCA9IFNreWJveDsiXX0=