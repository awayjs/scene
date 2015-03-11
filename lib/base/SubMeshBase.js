var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var AssetBase = require("awayjs-core/lib/library/AssetBase");
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
    SubMeshBase.prototype._iCollectRenderable = function (rendererPool) {
        throw new AbstractMethodError();
    };
    SubMeshBase.prototype._iGetExplicitMaterial = function () {
        return this._material;
    };
    return SubMeshBase;
})(AssetBase);
module.exports = SubMeshBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Yk1lc2hCYXNlLnRzIl0sIm5hbWVzIjpbIlN1Yk1lc2hCYXNlIiwiU3ViTWVzaEJhc2UuY29uc3RydWN0b3IiLCJTdWJNZXNoQmFzZS5hbmltYXRvciIsIlN1Yk1lc2hCYXNlLm1hdGVyaWFsIiwiU3ViTWVzaEJhc2Uuc2NlbmVUcmFuc2Zvcm0iLCJTdWJNZXNoQmFzZS5wYXJlbnRNZXNoIiwiU3ViTWVzaEJhc2UudXZUcmFuc2Zvcm0iLCJTdWJNZXNoQmFzZS5kaXNwb3NlIiwiU3ViTWVzaEJhc2UuZ2V0UmVuZGVyU2NlbmVUcmFuc2Zvcm0iLCJTdWJNZXNoQmFzZS5faUFkZFJlbmRlcmFibGUiLCJTdWJNZXNoQmFzZS5faVJlbW92ZVJlbmRlcmFibGUiLCJTdWJNZXNoQmFzZS5faUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cnkiLCJTdWJNZXNoQmFzZS5faUNvbGxlY3RSZW5kZXJhYmxlIiwiU3ViTWVzaEJhc2UuX2lHZXRFeHBsaWNpdE1hdGVyaWFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLG1CQUFtQixXQUFhLDRDQUE0QyxDQUFDLENBQUM7QUFHckYsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQVNwRSxBQVNBOzs7Ozs7OztHQURHO0lBQ0csV0FBVztJQUFTQSxVQUFwQkEsV0FBV0EsVUFBa0JBO0lBeUVsQ0E7O09BRUdBO0lBQ0hBLFNBNUVLQSxXQUFXQTtRQThFZkMsaUJBQU9BLENBQUNBO1FBekVGQSxZQUFPQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUdsQkEsaUJBQVlBLEdBQXNCQSxJQUFJQSxLQUFLQSxFQUFlQSxDQUFDQTtJQXVFbkVBLENBQUNBO0lBM0RERCxzQkFBV0EsaUNBQVFBO1FBVm5CQSwwQkFBMEJBO1FBQzNCQSw2Q0FBNkNBO1FBQzdDQSxLQUFLQTtRQUNMQSxFQUFFQTtRQUNGQSxtREFBbURBO1FBQ25EQSxLQUFLQTtRQUVKQTs7V0FFR0E7YUFDSEE7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LENBQUNBO0lBQ25CQSxDQUFDQTtJQUVNVixvREFBOEJBLEdBQXJDQTtRQUVDVyxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUMxQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUE7WUFDbENBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7SUFDNUNBLENBQUNBO0lBRU1YLHlDQUFtQkEsR0FBMUJBLFVBQTJCQSxZQUEwQkE7UUFFcERZLE1BQU1BLElBQUlBLG1CQUFtQkEsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBRU1aLDJDQUFxQkEsR0FBNUJBO1FBRUNhLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO0lBQ3ZCQSxDQUFDQTtJQUNGYixrQkFBQ0E7QUFBREEsQ0ExSUEsQUEwSUNBLEVBMUl5QixTQUFTLEVBMElsQztBQUVELEFBQXFCLGlCQUFaLFdBQVcsQ0FBQyIsImZpbGUiOiJiYXNlL1N1Yk1lc2hCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xyXG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcclxuaW1wb3J0IFVWVHJhbnNmb3JtXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1VWVHJhbnNmb3JtXCIpO1xyXG5pbXBvcnQgQXNzZXRCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0QmFzZVwiKTtcclxuXHJcbmltcG9ydCBJQW5pbWF0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XHJcbmltcG9ydCBJUmVuZGVyYWJsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVwiKTtcclxuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XHJcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xyXG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL01lc2hcIik7XHJcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XHJcblxyXG4vKipcclxuICogU3ViTWVzaEJhc2Ugd3JhcHMgYSBUcmlhbmdsZVN1Ykdlb21ldHJ5IGFzIGEgc2NlbmUgZ3JhcGggaW5zdGFudGlhdGlvbi4gQSBTdWJNZXNoQmFzZSBpcyBvd25lZCBieSBhIE1lc2ggb2JqZWN0LlxyXG4gKlxyXG4gKlxyXG4gKiBAc2VlIGF3YXkuYmFzZS5UcmlhbmdsZVN1Ykdlb21ldHJ5XHJcbiAqIEBzZWUgYXdheS5lbnRpdGllcy5NZXNoXHJcbiAqXHJcbiAqIEBjbGFzcyBhd2F5LmJhc2UuU3ViTWVzaEJhc2VcclxuICovXHJcbmNsYXNzIFN1Yk1lc2hCYXNlIGV4dGVuZHMgQXNzZXRCYXNlXHJcbntcclxuXHRwdWJsaWMgX3BQYXJlbnRNZXNoOk1lc2g7XHJcblx0cHVibGljIF91dlRyYW5zZm9ybTpVVlRyYW5zZm9ybTtcclxuXHJcblx0cHVibGljIF9pSW5kZXg6bnVtYmVyID0gMDtcclxuXHJcblx0cHVibGljIF9tYXRlcmlhbDpNYXRlcmlhbEJhc2U7XHJcblx0cHJpdmF0ZSBfcmVuZGVyYWJsZXM6QXJyYXk8SVJlbmRlcmFibGU+ID0gbmV3IEFycmF5PElSZW5kZXJhYmxlPigpO1xyXG5cclxuXHQvL1RPRE8gdGVzdCBzaGFkZXIgcGlja2luZ1xyXG4vL1x0XHRwdWJsaWMgZ2V0IHNoYWRlclBpY2tpbmdEZXRhaWxzKCk6Ym9vbGVhblxyXG4vL1x0XHR7XHJcbi8vXHJcbi8vXHRcdFx0cmV0dXJuIHRoaXMuc291cmNlRW50aXR5LnNoYWRlclBpY2tpbmdEZXRhaWxzO1xyXG4vL1x0XHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBhbmltYXRvciBvYmplY3QgdGhhdCBwcm92aWRlcyB0aGUgc3RhdGUgZm9yIHRoZSBUcmlhbmdsZVN1Yk1lc2gncyBhbmltYXRpb24uXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhbmltYXRvcigpOklBbmltYXRvclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wUGFyZW50TWVzaC5hbmltYXRvcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtYXRlcmlhbCB1c2VkIHRvIHJlbmRlciB0aGUgY3VycmVudCBUcmlhbmdsZVN1Yk1lc2guIElmIHNldCB0byBudWxsLCBpdHMgcGFyZW50IE1lc2gncyBtYXRlcmlhbCB3aWxsIGJlIHVzZWQgaW5zdGVhZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1hdGVyaWFsKCk6TWF0ZXJpYWxCYXNlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsIHx8IHRoaXMuX3BQYXJlbnRNZXNoLm1hdGVyaWFsO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBtYXRlcmlhbCh2YWx1ZTpNYXRlcmlhbEJhc2UpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMubWF0ZXJpYWwpXHJcblx0XHRcdHRoaXMubWF0ZXJpYWwuaVJlbW92ZU93bmVyKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMubWF0ZXJpYWwpXHJcblx0XHRcdHRoaXMubWF0ZXJpYWwuaUFkZE93bmVyKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHNjZW5lIHRyYW5zZm9ybSBvYmplY3QgdGhhdCB0cmFuc2Zvcm1zIGZyb20gbW9kZWwgdG8gd29ybGQgc3BhY2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2VuZVRyYW5zZm9ybSgpOk1hdHJpeDNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BQYXJlbnRNZXNoLnNjZW5lVHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGVudGl0eSB0aGF0IHRoYXQgaW5pdGlhbGx5IHByb3ZpZGVkIHRoZSBJUmVuZGVyYWJsZSB0byB0aGUgcmVuZGVyIHBpcGVsaW5lIChpZTogdGhlIG93bmluZyBNZXNoIG9iamVjdCkuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBwYXJlbnRNZXNoKCk6TWVzaFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wUGFyZW50TWVzaDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCB1dlRyYW5zZm9ybSgpOlVWVHJhbnNmb3JtXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3V2VHJhbnNmb3JtIHx8IHRoaXMuX3BQYXJlbnRNZXNoLnV2VHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB1dlRyYW5zZm9ybSh2YWx1ZTpVVlRyYW5zZm9ybSlcclxuXHR7XHJcblx0XHR0aGlzLl91dlRyYW5zZm9ybSA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBTdWJNZXNoQmFzZSBvYmplY3RcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBudWxsO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcmVuZGVyYWJsZXMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdHRoaXMuX3JlbmRlcmFibGVzW2ldLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR0aGlzLl9yZW5kZXJhYmxlcyA9IG5ldyBBcnJheTxJUmVuZGVyYWJsZT4oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNhbWVyYVxyXG5cdCAqIEByZXR1cm5zIHthd2F5Lmdlb20uTWF0cml4M0R9XHJcblx0ICovXHJcblx0cHVibGljIGdldFJlbmRlclNjZW5lVHJhbnNmb3JtKGNhbWVyYTpDYW1lcmEpOk1hdHJpeDNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BQYXJlbnRNZXNoLmdldFJlbmRlclNjZW5lVHJhbnNmb3JtKGNhbWVyYSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lBZGRSZW5kZXJhYmxlKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpOklSZW5kZXJhYmxlXHJcblx0e1xyXG5cdFx0dGhpcy5fcmVuZGVyYWJsZXMucHVzaChyZW5kZXJhYmxlKTtcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcclxuXHR9XHJcblxyXG5cclxuXHRwdWJsaWMgX2lSZW1vdmVSZW5kZXJhYmxlKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpOklSZW5kZXJhYmxlXHJcblx0e1xyXG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuX3JlbmRlcmFibGVzLmluZGV4T2YocmVuZGVyYWJsZSk7XHJcblxyXG5cdFx0dGhpcy5fcmVuZGVyYWJsZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cnkoKVxyXG5cdHtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcmVuZGVyYWJsZXMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdHRoaXMuX3JlbmRlcmFibGVzW2ldLmludmFsaWRhdGVHZW9tZXRyeSgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUdldEV4cGxpY2l0TWF0ZXJpYWwoKTpNYXRlcmlhbEJhc2VcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBTdWJNZXNoQmFzZTsiXX0=