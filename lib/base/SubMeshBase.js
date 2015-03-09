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
    SubMeshBase.prototype._iCollectRenderable = function (rendererPool) {
        throw new AbstractMethodError();
    };
    SubMeshBase.prototype._iGetExplicitMaterial = function () {
        return this._material;
    };
    return SubMeshBase;
})(NamedAssetBase);
module.exports = SubMeshBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Yk1lc2hCYXNlLnRzIl0sIm5hbWVzIjpbIlN1Yk1lc2hCYXNlIiwiU3ViTWVzaEJhc2UuY29uc3RydWN0b3IiLCJTdWJNZXNoQmFzZS5hbmltYXRvciIsIlN1Yk1lc2hCYXNlLm1hdGVyaWFsIiwiU3ViTWVzaEJhc2Uuc2NlbmVUcmFuc2Zvcm0iLCJTdWJNZXNoQmFzZS5wYXJlbnRNZXNoIiwiU3ViTWVzaEJhc2UudXZUcmFuc2Zvcm0iLCJTdWJNZXNoQmFzZS5kaXNwb3NlIiwiU3ViTWVzaEJhc2UuZ2V0UmVuZGVyU2NlbmVUcmFuc2Zvcm0iLCJTdWJNZXNoQmFzZS5faUFkZFJlbmRlcmFibGUiLCJTdWJNZXNoQmFzZS5faVJlbW92ZVJlbmRlcmFibGUiLCJTdWJNZXNoQmFzZS5faUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cnkiLCJTdWJNZXNoQmFzZS5faUNvbGxlY3RSZW5kZXJhYmxlIiwiU3ViTWVzaEJhc2UuX2lHZXRFeHBsaWNpdE1hdGVyaWFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLG1CQUFtQixXQUFhLDRDQUE0QyxDQUFDLENBQUM7QUFHckYsSUFBTyxjQUFjLFdBQWMsd0NBQXdDLENBQUMsQ0FBQztBQVM3RSxBQVNBOzs7Ozs7OztHQURHO0lBQ0csV0FBVztJQUFTQSxVQUFwQkEsV0FBV0EsVUFBdUJBO0lBeUV2Q0E7O09BRUdBO0lBQ0hBLFNBNUVLQSxXQUFXQTtRQThFZkMsaUJBQU9BLENBQUNBO1FBekVGQSxZQUFPQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUdsQkEsaUJBQVlBLEdBQXNCQSxJQUFJQSxLQUFLQSxFQUFlQSxDQUFDQTtJQXVFbkVBLENBQUNBO0lBM0RERCxzQkFBV0EsaUNBQVFBO1FBVm5CQSwwQkFBMEJBO1FBQzNCQSw2Q0FBNkNBO1FBQzdDQSxLQUFLQTtRQUNMQSxFQUFFQTtRQUNGQSxtREFBbURBO1FBQ25EQSxLQUFLQTtRQUVKQTs7V0FFR0E7YUFDSEE7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LENBQUNBO0lBQ25CQSxDQUFDQTtJQUVNVixvREFBOEJBLEdBQXJDQTtRQUVDVyxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUMxQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUE7WUFDbENBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7SUFDNUNBLENBQUNBO0lBRU1YLHlDQUFtQkEsR0FBMUJBLFVBQTJCQSxZQUEwQkE7UUFFcERZLE1BQU1BLElBQUlBLG1CQUFtQkEsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBRU1aLDJDQUFxQkEsR0FBNUJBO1FBRUNhLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO0lBQ3ZCQSxDQUFDQTtJQUNGYixrQkFBQ0E7QUFBREEsQ0ExSUEsQUEwSUNBLEVBMUl5QixjQUFjLEVBMEl2QztBQUVELEFBQXFCLGlCQUFaLFdBQVcsQ0FBQyIsImZpbGUiOiJiYXNlL1N1Yk1lc2hCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xyXG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcclxuaW1wb3J0IFVWVHJhbnNmb3JtXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1VWVHJhbnNmb3JtXCIpO1xyXG5pbXBvcnQgTmFtZWRBc3NldEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xyXG5cclxuaW1wb3J0IElBbmltYXRvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRvclwiKTtcclxuaW1wb3J0IElSZW5kZXJhYmxlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJhYmxlXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmVyUG9vbFwiKTtcclxuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XHJcbmltcG9ydCBNZXNoXHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvTWVzaFwiKTtcclxuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcclxuXHJcbi8qKlxyXG4gKiBTdWJNZXNoQmFzZSB3cmFwcyBhIFRyaWFuZ2xlU3ViR2VvbWV0cnkgYXMgYSBzY2VuZSBncmFwaCBpbnN0YW50aWF0aW9uLiBBIFN1Yk1lc2hCYXNlIGlzIG93bmVkIGJ5IGEgTWVzaCBvYmplY3QuXHJcbiAqXHJcbiAqXHJcbiAqIEBzZWUgYXdheS5iYXNlLlRyaWFuZ2xlU3ViR2VvbWV0cnlcclxuICogQHNlZSBhd2F5LmVudGl0aWVzLk1lc2hcclxuICpcclxuICogQGNsYXNzIGF3YXkuYmFzZS5TdWJNZXNoQmFzZVxyXG4gKi9cclxuY2xhc3MgU3ViTWVzaEJhc2UgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZVxyXG57XHJcblx0cHVibGljIF9wUGFyZW50TWVzaDpNZXNoO1xyXG5cdHB1YmxpYyBfdXZUcmFuc2Zvcm06VVZUcmFuc2Zvcm07XHJcblxyXG5cdHB1YmxpYyBfaUluZGV4Om51bWJlciA9IDA7XHJcblxyXG5cdHB1YmxpYyBfbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlO1xyXG5cdHByaXZhdGUgX3JlbmRlcmFibGVzOkFycmF5PElSZW5kZXJhYmxlPiA9IG5ldyBBcnJheTxJUmVuZGVyYWJsZT4oKTtcclxuXHJcblx0Ly9UT0RPIHRlc3Qgc2hhZGVyIHBpY2tpbmdcclxuLy9cdFx0cHVibGljIGdldCBzaGFkZXJQaWNraW5nRGV0YWlscygpOmJvb2xlYW5cclxuLy9cdFx0e1xyXG4vL1xyXG4vL1x0XHRcdHJldHVybiB0aGlzLnNvdXJjZUVudGl0eS5zaGFkZXJQaWNraW5nRGV0YWlscztcclxuLy9cdFx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYW5pbWF0b3Igb2JqZWN0IHRoYXQgcHJvdmlkZXMgdGhlIHN0YXRlIGZvciB0aGUgVHJpYW5nbGVTdWJNZXNoJ3MgYW5pbWF0aW9uLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYW5pbWF0b3IoKTpJQW5pbWF0b3JcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFBhcmVudE1lc2guYW5pbWF0b3I7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWF0ZXJpYWwgdXNlZCB0byByZW5kZXIgdGhlIGN1cnJlbnQgVHJpYW5nbGVTdWJNZXNoLiBJZiBzZXQgdG8gbnVsbCwgaXRzIHBhcmVudCBNZXNoJ3MgbWF0ZXJpYWwgd2lsbCBiZSB1c2VkIGluc3RlYWQuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBtYXRlcmlhbCgpOk1hdGVyaWFsQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9tYXRlcmlhbCB8fCB0aGlzLl9wUGFyZW50TWVzaC5tYXRlcmlhbDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgbWF0ZXJpYWwodmFsdWU6TWF0ZXJpYWxCYXNlKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLm1hdGVyaWFsKVxyXG5cdFx0XHR0aGlzLm1hdGVyaWFsLmlSZW1vdmVPd25lcih0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9tYXRlcmlhbCA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh0aGlzLm1hdGVyaWFsKVxyXG5cdFx0XHR0aGlzLm1hdGVyaWFsLmlBZGRPd25lcih0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBzY2VuZSB0cmFuc2Zvcm0gb2JqZWN0IHRoYXQgdHJhbnNmb3JtcyBmcm9tIG1vZGVsIHRvIHdvcmxkIHNwYWNlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2NlbmVUcmFuc2Zvcm0oKTpNYXRyaXgzRFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wUGFyZW50TWVzaC5zY2VuZVRyYW5zZm9ybTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlbnRpdHkgdGhhdCB0aGF0IGluaXRpYWxseSBwcm92aWRlZCB0aGUgSVJlbmRlcmFibGUgdG8gdGhlIHJlbmRlciBwaXBlbGluZSAoaWU6IHRoZSBvd25pbmcgTWVzaCBvYmplY3QpLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcGFyZW50TWVzaCgpOk1lc2hcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFBhcmVudE1lc2g7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdXZUcmFuc2Zvcm0oKTpVVlRyYW5zZm9ybVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl91dlRyYW5zZm9ybSB8fCB0aGlzLl9wUGFyZW50TWVzaC51dlRyYW5zZm9ybTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdXZUcmFuc2Zvcm0odmFsdWU6VVZUcmFuc2Zvcm0pXHJcblx0e1xyXG5cdFx0dGhpcy5fdXZUcmFuc2Zvcm0gPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgU3ViTWVzaEJhc2Ugb2JqZWN0XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlKClcclxuXHR7XHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbnVsbDtcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlcmFibGVzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHR0aGlzLl9yZW5kZXJhYmxlc1tpXS5kaXNwb3NlKCk7XHJcblxyXG5cdFx0dGhpcy5fcmVuZGVyYWJsZXMgPSBuZXcgQXJyYXk8SVJlbmRlcmFibGU+KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBjYW1lcmFcclxuXHQgKiBAcmV0dXJucyB7YXdheS5nZW9tLk1hdHJpeDNEfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRSZW5kZXJTY2VuZVRyYW5zZm9ybShjYW1lcmE6Q2FtZXJhKTpNYXRyaXgzRFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wUGFyZW50TWVzaC5nZXRSZW5kZXJTY2VuZVRyYW5zZm9ybShjYW1lcmEpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQWRkUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxyXG5cdHtcclxuXHRcdHRoaXMuX3JlbmRlcmFibGVzLnB1c2gocmVuZGVyYWJsZSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlcmFibGU7XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIF9pUmVtb3ZlUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxyXG5cdHtcclxuXHRcdHZhciBpbmRleDpudW1iZXIgPSB0aGlzLl9yZW5kZXJhYmxlcy5pbmRleE9mKHJlbmRlcmFibGUpO1xyXG5cclxuXHRcdHRoaXMuX3JlbmRlcmFibGVzLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlcmFibGU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lJbnZhbGlkYXRlUmVuZGVyYWJsZUdlb21ldHJ5KClcclxuXHR7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlcmFibGVzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHR0aGlzLl9yZW5kZXJhYmxlc1tpXS5pbnZhbGlkYXRlR2VvbWV0cnkoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lHZXRFeHBsaWNpdE1hdGVyaWFsKCk6TWF0ZXJpYWxCYXNlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gU3ViTWVzaEJhc2U7Il19