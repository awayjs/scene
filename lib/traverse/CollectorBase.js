var EntityListItemPool = require("awayjs-display/lib/pool/EntityListItemPool");
/**
 * @class away.traverse.CollectorBase
 */
var CollectorBase = (function () {
    function CollectorBase() {
        this._numCullPlanes = 0;
        this._pNumEntities = 0;
        this._pNumInteractiveEntities = 0;
        this._pEntityListItemPool = new EntityListItemPool();
    }
    Object.defineProperty(CollectorBase.prototype, "camera", {
        /**
         *
         */
        get: function () {
            return this._pCamera;
        },
        set: function (value) {
            this._pCamera = value;
            this._cullPlanes = this._pCamera.frustumPlanes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectorBase.prototype, "cullPlanes", {
        /**
         *
         */
        get: function () {
            return this._customCullPlanes;
        },
        set: function (value) {
            this._customCullPlanes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectorBase.prototype, "entityHead", {
        /**
         *
         */
        get: function () {
            return this._pEntityHead;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectorBase.prototype, "numEntities", {
        /**
         *
         */
        get: function () {
            return this._pNumEntities;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectorBase.prototype, "numInteractiveEntities", {
        /**
         *
         */
        get: function () {
            return this._pNumInteractiveEntities;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    CollectorBase.prototype.clear = function () {
        this._pNumEntities = this._pNumInteractiveEntities = 0;
        this._cullPlanes = this._customCullPlanes ? this._customCullPlanes : (this._pCamera ? this._pCamera.frustumPlanes : null);
        this._numCullPlanes = this._cullPlanes ? this._cullPlanes.length : 0;
        this._pEntityHead = null;
        this._pEntityListItemPool.freeAll();
    };
    /**
     *
     * @param node
     * @returns {boolean}
     */
    CollectorBase.prototype.enterNode = function (node) {
        var enter = this.scene._iCollectionMark != node._iCollectionMark && node.isInFrustum(this._cullPlanes, this._numCullPlanes);
        node._iCollectionMark = this.scene._iCollectionMark;
        return enter;
    };
    /**
     *
     * @param entity
     */
    CollectorBase.prototype.applyDirectionalLight = function (entity) {
        //don't do anything here
    };
    /**
     *
     * @param entity
     */
    CollectorBase.prototype.applyEntity = function (entity) {
        this._pNumEntities++;
        if (entity._iIsMouseEnabled())
            this._pNumInteractiveEntities++;
        var item = this._pEntityListItemPool.getItem();
        item.entity = entity;
        item.next = this._pEntityHead;
        this._pEntityHead = item;
    };
    /**
     *
     * @param entity
     */
    CollectorBase.prototype.applyLightProbe = function (entity) {
        //don't do anything here
    };
    /**
     *
     * @param entity
     */
    CollectorBase.prototype.applyPointLight = function (entity) {
        //don't do anything here
    };
    /**
     *
     * @param entity
     */
    CollectorBase.prototype.applySkybox = function (entity) {
        //don't do anything here
    };
    return CollectorBase;
})();
module.exports = CollectorBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9Db2xsZWN0b3JCYXNlLnRzIl0sIm5hbWVzIjpbIkNvbGxlY3RvckJhc2UiLCJDb2xsZWN0b3JCYXNlLmNvbnN0cnVjdG9yIiwiQ29sbGVjdG9yQmFzZS5jYW1lcmEiLCJDb2xsZWN0b3JCYXNlLmN1bGxQbGFuZXMiLCJDb2xsZWN0b3JCYXNlLmVudGl0eUhlYWQiLCJDb2xsZWN0b3JCYXNlLm51bUVudGl0aWVzIiwiQ29sbGVjdG9yQmFzZS5udW1JbnRlcmFjdGl2ZUVudGl0aWVzIiwiQ29sbGVjdG9yQmFzZS5jbGVhciIsIkNvbGxlY3RvckJhc2UuZW50ZXJOb2RlIiwiQ29sbGVjdG9yQmFzZS5hcHBseURpcmVjdGlvbmFsTGlnaHQiLCJDb2xsZWN0b3JCYXNlLmFwcGx5RW50aXR5IiwiQ29sbGVjdG9yQmFzZS5hcHBseUxpZ2h0UHJvYmUiLCJDb2xsZWN0b3JCYXNlLmFwcGx5UG9pbnRMaWdodCIsIkNvbGxlY3RvckJhc2UuYXBwbHlTa3lib3giXSwibWFwcGluZ3MiOiJBQUlBLElBQU8sa0JBQWtCLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQU1wRixBQUdBOztHQURHO0lBQ0csYUFBYTtJQWVsQkEsU0FmS0EsYUFBYUE7UUFTVkMsbUJBQWNBLEdBQVVBLENBQUNBLENBQUNBO1FBQzNCQSxrQkFBYUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDekJBLDZCQUF3QkEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFNMUNBLElBQUlBLENBQUNBLG9CQUFvQkEsR0FBR0EsSUFBSUEsa0JBQWtCQSxFQUFFQSxDQUFDQTtJQUN0REEsQ0FBQ0E7SUFLREQsc0JBQVdBLGlDQUFNQTtRQUhqQkE7O1dBRUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBQ3RCQSxDQUFDQTthQUVERixVQUFrQkEsS0FBWUE7WUFFN0JFLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO1lB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QUFZQSxDQUFDQTtRQUM5QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDMUJBLENBQUNBO0lBRURWOzs7T0FHR0E7SUFDSUEsdUNBQWVBLEdBQXRCQSxVQUF1QkEsTUFBY0E7UUFFcENXLHdCQUF3QkE7SUFDekJBLENBQUNBO0lBRURYOzs7T0FHR0E7SUFDSUEsdUNBQWVBLEdBQXRCQSxVQUF1QkEsTUFBY0E7UUFFcENZLHdCQUF3QkE7SUFDekJBLENBQUNBO0lBRURaOzs7T0FHR0E7SUFDSUEsbUNBQVdBLEdBQWxCQSxVQUFtQkEsTUFBY0E7UUFFaENhLHdCQUF3QkE7SUFDekJBLENBQUNBO0lBQ0ZiLG9CQUFDQTtBQUFEQSxDQXRKQSxBQXNKQ0EsSUFBQTtBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJ0cmF2ZXJzZS9Db2xsZWN0b3JCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGFuZTNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUGxhbmUzRFwiKTtcclxuXHJcbmltcG9ydCBTY2VuZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1NjZW5lXCIpO1xyXG5pbXBvcnQgRW50aXR5TGlzdEl0ZW1cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0VudGl0eUxpc3RJdGVtXCIpO1xyXG5pbXBvcnQgRW50aXR5TGlzdEl0ZW1Qb29sXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvRW50aXR5TGlzdEl0ZW1Qb29sXCIpO1xyXG5pbXBvcnQgTm9kZUJhc2VcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL05vZGVCYXNlXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvSVJlbmRlcmVyXCIpO1xyXG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0NhbWVyYVwiKTtcclxuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgYXdheS50cmF2ZXJzZS5Db2xsZWN0b3JCYXNlXHJcbiAqL1xyXG5jbGFzcyBDb2xsZWN0b3JCYXNlXHJcbntcclxuXHRwdWJsaWMgc2NlbmU6U2NlbmU7XHJcblxyXG5cdHB1YmxpYyBfcEVudGl0eUhlYWQ6RW50aXR5TGlzdEl0ZW07XHJcblx0cHVibGljIF9wRW50aXR5TGlzdEl0ZW1Qb29sOkVudGl0eUxpc3RJdGVtUG9vbDtcclxuXHRwdWJsaWMgX3BDYW1lcmE6Q2FtZXJhO1xyXG5cdHByaXZhdGUgX2N1c3RvbUN1bGxQbGFuZXM6QXJyYXk8UGxhbmUzRD47XHJcblx0cHJpdmF0ZSBfY3VsbFBsYW5lczpBcnJheTxQbGFuZTNEPjtcclxuXHRwcml2YXRlIF9udW1DdWxsUGxhbmVzOm51bWJlciA9IDA7XHJcblx0cHVibGljIF9wTnVtRW50aXRpZXM6bnVtYmVyID0gMDtcclxuXHRwdWJsaWMgX3BOdW1JbnRlcmFjdGl2ZUVudGl0aWVzOm51bWJlciA9IDA7XHJcblxyXG5cdHB1YmxpYyBpc0VudGl0eUNvbGxlY3Rvcjpib29sZWFuO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0dGhpcy5fcEVudGl0eUxpc3RJdGVtUG9vbCA9IG5ldyBFbnRpdHlMaXN0SXRlbVBvb2woKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBjYW1lcmEoKTpDYW1lcmFcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcENhbWVyYTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgY2FtZXJhKHZhbHVlOkNhbWVyYSlcclxuXHR7XHJcblx0XHR0aGlzLl9wQ2FtZXJhID0gdmFsdWU7XHJcblx0XHR0aGlzLl9jdWxsUGxhbmVzID0gdGhpcy5fcENhbWVyYS5mcnVzdHVtUGxhbmVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGN1bGxQbGFuZXMoKTpBcnJheTxQbGFuZTNEPlxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9jdXN0b21DdWxsUGxhbmVzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBjdWxsUGxhbmVzKHZhbHVlOkFycmF5PFBsYW5lM0Q+KVxyXG5cdHtcclxuXHRcdHRoaXMuX2N1c3RvbUN1bGxQbGFuZXMgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBlbnRpdHlIZWFkKCk6RW50aXR5TGlzdEl0ZW1cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcEVudGl0eUhlYWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbnVtRW50aXRpZXMoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcE51bUVudGl0aWVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG51bUludGVyYWN0aXZlRW50aXRpZXMoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcE51bUludGVyYWN0aXZlRW50aXRpZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbGVhcigpXHJcblx0e1xyXG5cdFx0dGhpcy5fcE51bUVudGl0aWVzID0gdGhpcy5fcE51bUludGVyYWN0aXZlRW50aXRpZXMgPSAwO1xyXG5cdFx0dGhpcy5fY3VsbFBsYW5lcyA9IHRoaXMuX2N1c3RvbUN1bGxQbGFuZXM/IHRoaXMuX2N1c3RvbUN1bGxQbGFuZXMgOiAoIHRoaXMuX3BDYW1lcmE/IHRoaXMuX3BDYW1lcmEuZnJ1c3R1bVBsYW5lcyA6IG51bGwgKTtcclxuXHRcdHRoaXMuX251bUN1bGxQbGFuZXMgPSB0aGlzLl9jdWxsUGxhbmVzPyB0aGlzLl9jdWxsUGxhbmVzLmxlbmd0aCA6IDA7XHJcblx0XHR0aGlzLl9wRW50aXR5SGVhZCA9IG51bGw7XHJcblx0XHR0aGlzLl9wRW50aXR5TGlzdEl0ZW1Qb29sLmZyZWVBbGwoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG5vZGVcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRwdWJsaWMgZW50ZXJOb2RlKG5vZGU6Tm9kZUJhc2UpOmJvb2xlYW5cclxuXHR7XHJcblx0XHR2YXIgZW50ZXI6Ym9vbGVhbiA9IHRoaXMuc2NlbmUuX2lDb2xsZWN0aW9uTWFyayAhPSBub2RlLl9pQ29sbGVjdGlvbk1hcmsgJiYgbm9kZS5pc0luRnJ1c3R1bSh0aGlzLl9jdWxsUGxhbmVzLCB0aGlzLl9udW1DdWxsUGxhbmVzKTtcclxuXHJcblx0XHRub2RlLl9pQ29sbGVjdGlvbk1hcmsgPSB0aGlzLnNjZW5lLl9pQ29sbGVjdGlvbk1hcms7XHJcblxyXG5cdFx0cmV0dXJuIGVudGVyO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZW50aXR5XHJcblx0ICovXHJcblx0cHVibGljIGFwcGx5RGlyZWN0aW9uYWxMaWdodChlbnRpdHk6SUVudGl0eSlcclxuXHR7XHJcblx0XHQvL2Rvbid0IGRvIGFueXRoaW5nIGhlcmVcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGVudGl0eVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhcHBseUVudGl0eShlbnRpdHk6SUVudGl0eSlcclxuXHR7XHJcblx0XHR0aGlzLl9wTnVtRW50aXRpZXMrKztcclxuXHJcblx0XHRpZiAoZW50aXR5Ll9pSXNNb3VzZUVuYWJsZWQoKSlcclxuXHRcdFx0dGhpcy5fcE51bUludGVyYWN0aXZlRW50aXRpZXMrKztcclxuXHJcblx0XHR2YXIgaXRlbTpFbnRpdHlMaXN0SXRlbSA9IHRoaXMuX3BFbnRpdHlMaXN0SXRlbVBvb2wuZ2V0SXRlbSgpO1xyXG5cdFx0aXRlbS5lbnRpdHkgPSBlbnRpdHk7XHJcblxyXG5cdFx0aXRlbS5uZXh0ID0gdGhpcy5fcEVudGl0eUhlYWQ7XHJcblx0XHR0aGlzLl9wRW50aXR5SGVhZCA9IGl0ZW07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBlbnRpdHlcclxuXHQgKi9cclxuXHRwdWJsaWMgYXBwbHlMaWdodFByb2JlKGVudGl0eTpJRW50aXR5KVxyXG5cdHtcclxuXHRcdC8vZG9uJ3QgZG8gYW55dGhpbmcgaGVyZVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZW50aXR5XHJcblx0ICovXHJcblx0cHVibGljIGFwcGx5UG9pbnRMaWdodChlbnRpdHk6SUVudGl0eSlcclxuXHR7XHJcblx0XHQvL2Rvbid0IGRvIGFueXRoaW5nIGhlcmVcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGVudGl0eVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhcHBseVNreWJveChlbnRpdHk6SUVudGl0eSlcclxuXHR7XHJcblx0XHQvL2Rvbid0IGRvIGFueXRoaW5nIGhlcmVcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IENvbGxlY3RvckJhc2U7Il19