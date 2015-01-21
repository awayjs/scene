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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Yk1lc2hCYXNlLnRzIl0sIm5hbWVzIjpbIlN1Yk1lc2hCYXNlIiwiU3ViTWVzaEJhc2UuY29uc3RydWN0b3IiLCJTdWJNZXNoQmFzZS5hbmltYXRvciIsIlN1Yk1lc2hCYXNlLm1hdGVyaWFsIiwiU3ViTWVzaEJhc2Uuc2NlbmVUcmFuc2Zvcm0iLCJTdWJNZXNoQmFzZS5wYXJlbnRNZXNoIiwiU3ViTWVzaEJhc2UudXZUcmFuc2Zvcm0iLCJTdWJNZXNoQmFzZS5kaXNwb3NlIiwiU3ViTWVzaEJhc2UuZ2V0UmVuZGVyU2NlbmVUcmFuc2Zvcm0iLCJTdWJNZXNoQmFzZS5faUFkZFJlbmRlcmFibGUiLCJTdWJNZXNoQmFzZS5faVJlbW92ZVJlbmRlcmFibGUiLCJTdWJNZXNoQmFzZS5faUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cnkiLCJTdWJNZXNoQmFzZS5faUNvbGxlY3RSZW5kZXJhYmxlIiwiU3ViTWVzaEJhc2UuX2lHZXRFeHBsaWNpdE1hdGVyaWFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLG1CQUFtQixXQUFZLDRDQUE0QyxDQUFDLENBQUM7QUFHcEYsSUFBTyxjQUFjLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQVM1RSxBQVNBOzs7Ozs7OztHQURHO0lBQ0csV0FBVztJQUFTQSxVQUFwQkEsV0FBV0EsVUFBdUJBO0lBeUV2Q0E7O09BRUdBO0lBQ0hBLFNBNUVLQSxXQUFXQTtRQThFZkMsaUJBQU9BLENBQUNBO1FBekVGQSxZQUFPQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUdsQkEsaUJBQVlBLEdBQXNCQSxJQUFJQSxLQUFLQSxFQUFlQSxDQUFDQTtJQXVFbkVBLENBQUNBO0lBM0RERCxzQkFBV0EsaUNBQVFBO1FBVm5CQSwwQkFBMEJBO1FBQzNCQSw2Q0FBNkNBO1FBQzdDQSxLQUFLQTtRQUNMQSxFQUFFQTtRQUNGQSxtREFBbURBO1FBQ25EQSxLQUFLQTtRQUVKQTs7V0FFR0E7YUFDSEE7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QUdBLEdBQVVBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBO1FBQzFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQTtZQUNsQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxDQUFDQTtJQUM1Q0EsQ0FBQ0E7SUFFTVgseUNBQW1CQSxHQUExQkEsVUFBMkJBLFFBQWtCQTtRQUU1Q1ksTUFBTUEsSUFBSUEsbUJBQW1CQSxFQUFFQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFFTVosMkNBQXFCQSxHQUE1QkE7UUFFQ2EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7SUFDdkJBLENBQUNBO0lBQ0ZiLGtCQUFDQTtBQUFEQSxDQXhJQSxBQXdJQ0EsRUF4SXlCLGNBQWMsRUF3SXZDO0FBRUQsQUFBcUIsaUJBQVosV0FBVyxDQUFDIiwiZmlsZSI6ImJhc2UvU3ViTWVzaEJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IFVWVHJhbnNmb3JtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9VVlRyYW5zZm9ybVwiKTtcbmltcG9ydCBOYW1lZEFzc2V0QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xuXG5pbXBvcnQgSUFuaW1hdG9yXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRvclwiKTtcbmltcG9ydCBJUmVuZGVyYWJsZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmFibGVcIik7XG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcmVuZGVyL0lSZW5kZXJlclwiKTtcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0NhbWVyYVwiKTtcbmltcG9ydCBNZXNoXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL01lc2hcIik7XG5pbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcblxuLyoqXG4gKiBTdWJNZXNoQmFzZSB3cmFwcyBhIFRyaWFuZ2xlU3ViR2VvbWV0cnkgYXMgYSBzY2VuZSBncmFwaCBpbnN0YW50aWF0aW9uLiBBIFN1Yk1lc2hCYXNlIGlzIG93bmVkIGJ5IGEgTWVzaCBvYmplY3QuXG4gKlxuICpcbiAqIEBzZWUgYXdheS5iYXNlLlRyaWFuZ2xlU3ViR2VvbWV0cnlcbiAqIEBzZWUgYXdheS5lbnRpdGllcy5NZXNoXG4gKlxuICogQGNsYXNzIGF3YXkuYmFzZS5TdWJNZXNoQmFzZVxuICovXG5jbGFzcyBTdWJNZXNoQmFzZSBleHRlbmRzIE5hbWVkQXNzZXRCYXNlXG57XG5cdHB1YmxpYyBfcFBhcmVudE1lc2g6TWVzaDtcblx0cHVibGljIF91dlRyYW5zZm9ybTpVVlRyYW5zZm9ybTtcblxuXHRwdWJsaWMgX2lJbmRleDpudW1iZXIgPSAwO1xuXG5cdHB1YmxpYyBfbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlO1xuXHRwcml2YXRlIF9yZW5kZXJhYmxlczpBcnJheTxJUmVuZGVyYWJsZT4gPSBuZXcgQXJyYXk8SVJlbmRlcmFibGU+KCk7XG5cblx0Ly9UT0RPIHRlc3Qgc2hhZGVyIHBpY2tpbmdcbi8vXHRcdHB1YmxpYyBnZXQgc2hhZGVyUGlja2luZ0RldGFpbHMoKTpib29sZWFuXG4vL1x0XHR7XG4vL1xuLy9cdFx0XHRyZXR1cm4gdGhpcy5zb3VyY2VFbnRpdHkuc2hhZGVyUGlja2luZ0RldGFpbHM7XG4vL1x0XHR9XG5cblx0LyoqXG5cdCAqIFRoZSBhbmltYXRvciBvYmplY3QgdGhhdCBwcm92aWRlcyB0aGUgc3RhdGUgZm9yIHRoZSBUcmlhbmdsZVN1Yk1lc2gncyBhbmltYXRpb24uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFuaW1hdG9yKCk6SUFuaW1hdG9yXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFBhcmVudE1lc2guYW5pbWF0b3I7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG1hdGVyaWFsIHVzZWQgdG8gcmVuZGVyIHRoZSBjdXJyZW50IFRyaWFuZ2xlU3ViTWVzaC4gSWYgc2V0IHRvIG51bGwsIGl0cyBwYXJlbnQgTWVzaCdzIG1hdGVyaWFsIHdpbGwgYmUgdXNlZCBpbnN0ZWFkLlxuXHQgKi9cblx0cHVibGljIGdldCBtYXRlcmlhbCgpOk1hdGVyaWFsQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsIHx8IHRoaXMuX3BQYXJlbnRNZXNoLm1hdGVyaWFsO1xuXHR9XG5cblx0cHVibGljIHNldCBtYXRlcmlhbCh2YWx1ZTpNYXRlcmlhbEJhc2UpXG5cdHtcblx0XHRpZiAodGhpcy5tYXRlcmlhbClcblx0XHRcdHRoaXMubWF0ZXJpYWwuaVJlbW92ZU93bmVyKHRoaXMpO1xuXG5cdFx0dGhpcy5fbWF0ZXJpYWwgPSB2YWx1ZTtcblxuXHRcdGlmICh0aGlzLm1hdGVyaWFsKVxuXHRcdFx0dGhpcy5tYXRlcmlhbC5pQWRkT3duZXIodGhpcyk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHNjZW5lIHRyYW5zZm9ybSBvYmplY3QgdGhhdCB0cmFuc2Zvcm1zIGZyb20gbW9kZWwgdG8gd29ybGQgc3BhY2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjZW5lVHJhbnNmb3JtKCk6TWF0cml4M0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUGFyZW50TWVzaC5zY2VuZVRyYW5zZm9ybTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgZW50aXR5IHRoYXQgdGhhdCBpbml0aWFsbHkgcHJvdmlkZWQgdGhlIElSZW5kZXJhYmxlIHRvIHRoZSByZW5kZXIgcGlwZWxpbmUgKGllOiB0aGUgb3duaW5nIE1lc2ggb2JqZWN0KS5cblx0ICovXG5cdHB1YmxpYyBnZXQgcGFyZW50TWVzaCgpOk1lc2hcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUGFyZW50TWVzaDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB1dlRyYW5zZm9ybSgpOlVWVHJhbnNmb3JtXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXZUcmFuc2Zvcm0gfHwgdGhpcy5fcFBhcmVudE1lc2gudXZUcmFuc2Zvcm07XG5cdH1cblxuXHRwdWJsaWMgc2V0IHV2VHJhbnNmb3JtKHZhbHVlOlVWVHJhbnNmb3JtKVxuXHR7XG5cdFx0dGhpcy5fdXZUcmFuc2Zvcm0gPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IFN1Yk1lc2hCYXNlIG9iamVjdFxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0dGhpcy5tYXRlcmlhbCA9IG51bGw7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlcmFibGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX3JlbmRlcmFibGVzW2ldLmRpc3Bvc2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gY2FtZXJhXG5cdCAqIEByZXR1cm5zIHthd2F5Lmdlb20uTWF0cml4M0R9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0UmVuZGVyU2NlbmVUcmFuc2Zvcm0oY2FtZXJhOkNhbWVyYSk6TWF0cml4M0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUGFyZW50TWVzaC5nZXRSZW5kZXJTY2VuZVRyYW5zZm9ybShjYW1lcmEpO1xuXHR9XG5cblx0cHVibGljIF9pQWRkUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxuXHR7XG5cdFx0dGhpcy5fcmVuZGVyYWJsZXMucHVzaChyZW5kZXJhYmxlKTtcblxuXHRcdHJldHVybiByZW5kZXJhYmxlO1xuXHR9XG5cblxuXHRwdWJsaWMgX2lSZW1vdmVSZW5kZXJhYmxlKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpOklSZW5kZXJhYmxlXG5cdHtcblx0XHR2YXIgaW5kZXg6bnVtYmVyID0gdGhpcy5fcmVuZGVyYWJsZXMuaW5kZXhPZihyZW5kZXJhYmxlKTtcblxuXHRcdHRoaXMuX3JlbmRlcmFibGVzLnNwbGljZShpbmRleCwgMSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcblx0fVxuXG5cdHB1YmxpYyBfaUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cnkoKVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9yZW5kZXJhYmxlcy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9yZW5kZXJhYmxlc1tpXS5pbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0fVxuXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyOklSZW5kZXJlcilcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgX2lHZXRFeHBsaWNpdE1hdGVyaWFsKCk6TWF0ZXJpYWxCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XG5cdH1cbn1cblxuZXhwb3J0ID0gU3ViTWVzaEJhc2U7Il19