var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
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
var SubMeshBase = (function (_super) {
    __extends(SubMeshBase, _super);
    /**
     * Creates a new SubMeshBase object
     */
    function SubMeshBase() {
        _super.call(this);
        this._iIndex = 0;
        this._renderables = new Array();
    }
    Object.defineProperty(SubMeshBase.prototype, "animator", {
        //TODO test shader picking
        //		public get shaderPickingDetails():boolean
        //		{
        //
        //			return this.sourceEntity.shaderPickingDetails;
        //		}
        /**
         * The animator object that provides the state for the TriangleSubMesh's animation.
         */
        get: function () {
            return this._pParentMesh.animator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubMeshBase.prototype, "material", {
        /**
         * The material used to render the current TriangleSubMesh. If set to null, its parent Mesh's material will be used instead.
         */
        get: function () {
            return this._material || this._pParentMesh.material;
        },
        set: function (value) {
            if (this.material)
                this.material.iRemoveOwner(this);
            this._material = value;
            if (this.material)
                this.material.iAddOwner(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubMeshBase.prototype, "sceneTransform", {
        /**
         * The scene transform object that transforms from model to world space.
         */
        get: function () {
            return this._pParentMesh.sceneTransform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubMeshBase.prototype, "parentMesh", {
        /**
         * The entity that that initially provided the IRenderable to the render pipeline (ie: the owning Mesh object).
         */
        get: function () {
            return this._pParentMesh;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubMeshBase.prototype, "uvTransform", {
        /**
         *
         */
        get: function () {
            return this._uvTransform || this._pParentMesh.uvTransform;
        },
        set: function (value) {
            this._uvTransform = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    SubMeshBase.prototype.dispose = function () {
        this.material = null;
        var len = this._renderables.length;
        for (var i = 0; i < len; i++)
            this._renderables[i].dispose();
        this._renderables = new Array();
    };
    /**
     *
     * @param camera
     * @returns {away.geom.Matrix3D}
     */
    SubMeshBase.prototype.getRenderSceneTransform = function (camera) {
        return this._pParentMesh.getRenderSceneTransform(camera);
    };
    SubMeshBase.prototype._iAddRenderable = function (renderable) {
        this._renderables.push(renderable);
        return renderable;
    };
    SubMeshBase.prototype._iRemoveRenderable = function (renderable) {
        var index = this._renderables.indexOf(renderable);
        this._renderables.splice(index, 1);
        return renderable;
    };
    SubMeshBase.prototype._iInvalidateRenderableGeometry = function () {
        var len = this._renderables.length;
        for (var i = 0; i < len; i++)
            this._renderables[i].invalidateGeometry();
    };
    SubMeshBase.prototype._iCollectRenderable = function (renderer) {
        throw new AbstractMethodError();
    };
    SubMeshBase.prototype._iGetExplicitMaterial = function () {
        return this._material;
    };
    return SubMeshBase;
})(NamedAssetBase);
module.exports = SubMeshBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL3N1Ym1lc2hiYXNlLnRzIl0sIm5hbWVzIjpbIlN1Yk1lc2hCYXNlIiwiU3ViTWVzaEJhc2UuY29uc3RydWN0b3IiLCJTdWJNZXNoQmFzZS5hbmltYXRvciIsIlN1Yk1lc2hCYXNlLm1hdGVyaWFsIiwiU3ViTWVzaEJhc2Uuc2NlbmVUcmFuc2Zvcm0iLCJTdWJNZXNoQmFzZS5wYXJlbnRNZXNoIiwiU3ViTWVzaEJhc2UudXZUcmFuc2Zvcm0iLCJTdWJNZXNoQmFzZS5kaXNwb3NlIiwiU3ViTWVzaEJhc2UuZ2V0UmVuZGVyU2NlbmVUcmFuc2Zvcm0iLCJTdWJNZXNoQmFzZS5faUFkZFJlbmRlcmFibGUiLCJTdWJNZXNoQmFzZS5faVJlbW92ZVJlbmRlcmFibGUiLCJTdWJNZXNoQmFzZS5faUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cnkiLCJTdWJNZXNoQmFzZS5faUNvbGxlY3RSZW5kZXJhYmxlIiwiU3ViTWVzaEJhc2UuX2lHZXRFeHBsaWNpdE1hdGVyaWFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLG1CQUFtQixXQUFZLDRDQUE0QyxDQUFDLENBQUM7QUFHcEYsSUFBTyxjQUFjLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQVM1RSxBQVNBOzs7Ozs7OztHQURHO0lBQ0csV0FBVztJQUFTQSxVQUFwQkEsV0FBV0EsVUFBdUJBO0lBeUV2Q0E7O09BRUdBO0lBQ0hBLFNBNUVLQSxXQUFXQTtRQThFZkMsaUJBQU9BLENBQUNBO1FBekVGQSxZQUFPQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUdsQkEsaUJBQVlBLEdBQXNCQSxJQUFJQSxLQUFLQSxFQUFlQSxDQUFDQTtJQXVFbkVBLENBQUNBO0lBM0RERCxzQkFBV0EsaUNBQVFBO1FBVm5CQSwwQkFBMEJBO1FBQzNCQSw2Q0FBNkNBO1FBQzdDQSxLQUFLQTtRQUNMQSxFQUFFQTtRQUNGQSxtREFBbURBO1FBQ25EQSxLQUFLQTtRQUVKQTs7V0FFR0E7YUFDSEE7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LENBQUNBO0lBQ25CQSxDQUFDQTtJQUVNVixvREFBOEJBLEdBQXJDQTtRQUVDVyxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUMxQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUE7WUFDbENBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7SUFDNUNBLENBQUNBO0lBRU1YLHlDQUFtQkEsR0FBMUJBLFVBQTJCQSxRQUFrQkE7UUFFNUNZLE1BQU1BLElBQUlBLG1CQUFtQkEsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBRU1aLDJDQUFxQkEsR0FBNUJBO1FBRUNhLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO0lBQ3ZCQSxDQUFDQTtJQUNGYixrQkFBQ0E7QUFBREEsQ0ExSUEsQUEwSUNBLEVBMUl5QixjQUFjLEVBMEl2QztBQUVELEFBQXFCLGlCQUFaLFdBQVcsQ0FBQyIsImZpbGUiOiJiYXNlL1N1Yk1lc2hCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcbmltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBVVlRyYW5zZm9ybVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVVZUcmFuc2Zvcm1cIik7XG5pbXBvcnQgTmFtZWRBc3NldEJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcblxuaW1wb3J0IElBbmltYXRvclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XG5pbXBvcnQgSVJlbmRlcmFibGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJhYmxlXCIpO1xuaW1wb3J0IElSZW5kZXJlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3JlbmRlci9JUmVuZGVyZXJcIik7XG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XG5cbi8qKlxuICogU3ViTWVzaEJhc2Ugd3JhcHMgYSBUcmlhbmdsZVN1Ykdlb21ldHJ5IGFzIGEgc2NlbmUgZ3JhcGggaW5zdGFudGlhdGlvbi4gQSBTdWJNZXNoQmFzZSBpcyBvd25lZCBieSBhIE1lc2ggb2JqZWN0LlxuICpcbiAqXG4gKiBAc2VlIGF3YXkuYmFzZS5UcmlhbmdsZVN1Ykdlb21ldHJ5XG4gKiBAc2VlIGF3YXkuZW50aXRpZXMuTWVzaFxuICpcbiAqIEBjbGFzcyBhd2F5LmJhc2UuU3ViTWVzaEJhc2VcbiAqL1xuY2xhc3MgU3ViTWVzaEJhc2UgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZVxue1xuXHRwdWJsaWMgX3BQYXJlbnRNZXNoOk1lc2g7XG5cdHB1YmxpYyBfdXZUcmFuc2Zvcm06VVZUcmFuc2Zvcm07XG5cblx0cHVibGljIF9pSW5kZXg6bnVtYmVyID0gMDtcblxuXHRwdWJsaWMgX21hdGVyaWFsOk1hdGVyaWFsQmFzZTtcblx0cHJpdmF0ZSBfcmVuZGVyYWJsZXM6QXJyYXk8SVJlbmRlcmFibGU+ID0gbmV3IEFycmF5PElSZW5kZXJhYmxlPigpO1xuXG5cdC8vVE9ETyB0ZXN0IHNoYWRlciBwaWNraW5nXG4vL1x0XHRwdWJsaWMgZ2V0IHNoYWRlclBpY2tpbmdEZXRhaWxzKCk6Ym9vbGVhblxuLy9cdFx0e1xuLy9cbi8vXHRcdFx0cmV0dXJuIHRoaXMuc291cmNlRW50aXR5LnNoYWRlclBpY2tpbmdEZXRhaWxzO1xuLy9cdFx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgYW5pbWF0b3Igb2JqZWN0IHRoYXQgcHJvdmlkZXMgdGhlIHN0YXRlIGZvciB0aGUgVHJpYW5nbGVTdWJNZXNoJ3MgYW5pbWF0aW9uLlxuXHQgKi9cblx0cHVibGljIGdldCBhbmltYXRvcigpOklBbmltYXRvclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BQYXJlbnRNZXNoLmFuaW1hdG9yO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBtYXRlcmlhbCB1c2VkIHRvIHJlbmRlciB0aGUgY3VycmVudCBUcmlhbmdsZVN1Yk1lc2guIElmIHNldCB0byBudWxsLCBpdHMgcGFyZW50IE1lc2gncyBtYXRlcmlhbCB3aWxsIGJlIHVzZWQgaW5zdGVhZC5cblx0ICovXG5cdHB1YmxpYyBnZXQgbWF0ZXJpYWwoKTpNYXRlcmlhbEJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9tYXRlcmlhbCB8fCB0aGlzLl9wUGFyZW50TWVzaC5tYXRlcmlhbDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbWF0ZXJpYWwodmFsdWU6TWF0ZXJpYWxCYXNlKVxuXHR7XG5cdFx0aWYgKHRoaXMubWF0ZXJpYWwpXG5cdFx0XHR0aGlzLm1hdGVyaWFsLmlSZW1vdmVPd25lcih0aGlzKTtcblxuXHRcdHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5tYXRlcmlhbClcblx0XHRcdHRoaXMubWF0ZXJpYWwuaUFkZE93bmVyKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBzY2VuZSB0cmFuc2Zvcm0gb2JqZWN0IHRoYXQgdHJhbnNmb3JtcyBmcm9tIG1vZGVsIHRvIHdvcmxkIHNwYWNlLlxuXHQgKi9cblx0cHVibGljIGdldCBzY2VuZVRyYW5zZm9ybSgpOk1hdHJpeDNEXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFBhcmVudE1lc2guc2NlbmVUcmFuc2Zvcm07XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGVudGl0eSB0aGF0IHRoYXQgaW5pdGlhbGx5IHByb3ZpZGVkIHRoZSBJUmVuZGVyYWJsZSB0byB0aGUgcmVuZGVyIHBpcGVsaW5lIChpZTogdGhlIG93bmluZyBNZXNoIG9iamVjdCkuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBhcmVudE1lc2goKTpNZXNoXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFBhcmVudE1lc2g7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgdXZUcmFuc2Zvcm0oKTpVVlRyYW5zZm9ybVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3V2VHJhbnNmb3JtIHx8IHRoaXMuX3BQYXJlbnRNZXNoLnV2VHJhbnNmb3JtO1xuXHR9XG5cblx0cHVibGljIHNldCB1dlRyYW5zZm9ybSh2YWx1ZTpVVlRyYW5zZm9ybSlcblx0e1xuXHRcdHRoaXMuX3V2VHJhbnNmb3JtID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBTdWJNZXNoQmFzZSBvYmplY3Rcblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHRoaXMubWF0ZXJpYWwgPSBudWxsO1xuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9yZW5kZXJhYmxlcy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9yZW5kZXJhYmxlc1tpXS5kaXNwb3NlKCk7XG5cblx0XHR0aGlzLl9yZW5kZXJhYmxlcyA9IG5ldyBBcnJheTxJUmVuZGVyYWJsZT4oKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gY2FtZXJhXG5cdCAqIEByZXR1cm5zIHthd2F5Lmdlb20uTWF0cml4M0R9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0UmVuZGVyU2NlbmVUcmFuc2Zvcm0oY2FtZXJhOkNhbWVyYSk6TWF0cml4M0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUGFyZW50TWVzaC5nZXRSZW5kZXJTY2VuZVRyYW5zZm9ybShjYW1lcmEpO1xuXHR9XG5cblx0cHVibGljIF9pQWRkUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxuXHR7XG5cdFx0dGhpcy5fcmVuZGVyYWJsZXMucHVzaChyZW5kZXJhYmxlKTtcblxuXHRcdHJldHVybiByZW5kZXJhYmxlO1xuXHR9XG5cblxuXHRwdWJsaWMgX2lSZW1vdmVSZW5kZXJhYmxlKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpOklSZW5kZXJhYmxlXG5cdHtcblx0XHR2YXIgaW5kZXg6bnVtYmVyID0gdGhpcy5fcmVuZGVyYWJsZXMuaW5kZXhPZihyZW5kZXJhYmxlKTtcblxuXHRcdHRoaXMuX3JlbmRlcmFibGVzLnNwbGljZShpbmRleCwgMSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcblx0fVxuXG5cdHB1YmxpYyBfaUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cnkoKVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9yZW5kZXJhYmxlcy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9yZW5kZXJhYmxlc1tpXS5pbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0fVxuXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyOklSZW5kZXJlcilcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgX2lHZXRFeHBsaWNpdE1hdGVyaWFsKCk6TWF0ZXJpYWxCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XG5cdH1cbn1cblxuZXhwb3J0ID0gU3ViTWVzaEJhc2U7Il19