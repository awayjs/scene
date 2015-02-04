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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9Db2xsZWN0b3JCYXNlLnRzIl0sIm5hbWVzIjpbIkNvbGxlY3RvckJhc2UiLCJDb2xsZWN0b3JCYXNlLmNvbnN0cnVjdG9yIiwiQ29sbGVjdG9yQmFzZS5jYW1lcmEiLCJDb2xsZWN0b3JCYXNlLmN1bGxQbGFuZXMiLCJDb2xsZWN0b3JCYXNlLmVudGl0eUhlYWQiLCJDb2xsZWN0b3JCYXNlLm51bUVudGl0aWVzIiwiQ29sbGVjdG9yQmFzZS5udW1JbnRlcmFjdGl2ZUVudGl0aWVzIiwiQ29sbGVjdG9yQmFzZS5jbGVhciIsIkNvbGxlY3RvckJhc2UuZW50ZXJOb2RlIiwiQ29sbGVjdG9yQmFzZS5hcHBseURpcmVjdGlvbmFsTGlnaHQiLCJDb2xsZWN0b3JCYXNlLmFwcGx5RW50aXR5IiwiQ29sbGVjdG9yQmFzZS5hcHBseUxpZ2h0UHJvYmUiLCJDb2xsZWN0b3JCYXNlLmFwcGx5UG9pbnRMaWdodCIsIkNvbGxlY3RvckJhc2UuYXBwbHlTa3lib3giXSwibWFwcGluZ3MiOiJBQUlBLElBQU8sa0JBQWtCLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQU9wRixBQUdBOztHQURHO0lBQ0csYUFBYTtJQWFsQkEsU0FiS0EsYUFBYUE7UUFTVkMsbUJBQWNBLEdBQVVBLENBQUNBLENBQUNBO1FBQzNCQSxrQkFBYUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDekJBLDZCQUF3QkEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFJMUNBLElBQUlBLENBQUNBLG9CQUFvQkEsR0FBR0EsSUFBSUEsa0JBQWtCQSxFQUFFQSxDQUFDQTtJQUN0REEsQ0FBQ0E7SUFLREQsc0JBQVdBLGlDQUFNQTtRQUhqQkE7O1dBRUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBQ3RCQSxDQUFDQTthQUVERixVQUFrQkEsS0FBWUE7WUFFN0JFLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO1lB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QUFZQSxDQUFDQTtRQUM5QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDMUJBLENBQUNBO0lBRURWOzs7T0FHR0E7SUFDSUEsdUNBQWVBLEdBQXRCQSxVQUF1QkEsTUFBY0E7UUFFcENXLHdCQUF3QkE7SUFDekJBLENBQUNBO0lBRURYOzs7T0FHR0E7SUFDSUEsdUNBQWVBLEdBQXRCQSxVQUF1QkEsTUFBY0E7UUFFcENZLHdCQUF3QkE7SUFDekJBLENBQUNBO0lBRURaOzs7T0FHR0E7SUFDSUEsbUNBQVdBLEdBQWxCQSxVQUFtQkEsTUFBY0E7UUFFaENhLHdCQUF3QkE7SUFDekJBLENBQUNBO0lBQ0ZiLG9CQUFDQTtBQUFEQSxDQXBKQSxBQW9KQ0EsSUFBQTtBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJ0cmF2ZXJzZS9Db2xsZWN0b3JCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGFuZTNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUGxhbmUzRFwiKTtcclxuXHJcbmltcG9ydCBTY2VuZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1NjZW5lXCIpO1xyXG5pbXBvcnQgRW50aXR5TGlzdEl0ZW1cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0VudGl0eUxpc3RJdGVtXCIpO1xyXG5pbXBvcnQgRW50aXR5TGlzdEl0ZW1Qb29sXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvRW50aXR5TGlzdEl0ZW1Qb29sXCIpO1xyXG5pbXBvcnQgTm9kZUJhc2VcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL05vZGVCYXNlXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvSVJlbmRlcmVyXCIpO1xyXG5pbXBvcnQgSUNvbGxlY3Rvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvSUNvbGxlY3RvclwiKTtcclxuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGF3YXkudHJhdmVyc2UuQ29sbGVjdG9yQmFzZVxyXG4gKi9cclxuY2xhc3MgQ29sbGVjdG9yQmFzZSBpbXBsZW1lbnRzIElDb2xsZWN0b3Jcclxue1xyXG5cdHB1YmxpYyBzY2VuZTpTY2VuZTtcclxuXHJcblx0cHVibGljIF9wRW50aXR5SGVhZDpFbnRpdHlMaXN0SXRlbTtcclxuXHRwdWJsaWMgX3BFbnRpdHlMaXN0SXRlbVBvb2w6RW50aXR5TGlzdEl0ZW1Qb29sO1xyXG5cdHB1YmxpYyBfcENhbWVyYTpDYW1lcmE7XHJcblx0cHJpdmF0ZSBfY3VzdG9tQ3VsbFBsYW5lczpBcnJheTxQbGFuZTNEPjtcclxuXHRwcml2YXRlIF9jdWxsUGxhbmVzOkFycmF5PFBsYW5lM0Q+O1xyXG5cdHByaXZhdGUgX251bUN1bGxQbGFuZXM6bnVtYmVyID0gMDtcclxuXHRwdWJsaWMgX3BOdW1FbnRpdGllczpudW1iZXIgPSAwO1xyXG5cdHB1YmxpYyBfcE51bUludGVyYWN0aXZlRW50aXRpZXM6bnVtYmVyID0gMDtcclxuXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BFbnRpdHlMaXN0SXRlbVBvb2wgPSBuZXcgRW50aXR5TGlzdEl0ZW1Qb29sKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgY2FtZXJhKCk6Q2FtZXJhXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BDYW1lcmE7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGNhbWVyYSh2YWx1ZTpDYW1lcmEpXHJcblx0e1xyXG5cdFx0dGhpcy5fcENhbWVyYSA9IHZhbHVlO1xyXG5cdFx0dGhpcy5fY3VsbFBsYW5lcyA9IHRoaXMuX3BDYW1lcmEuZnJ1c3R1bVBsYW5lcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBjdWxsUGxhbmVzKCk6QXJyYXk8UGxhbmUzRD5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fY3VzdG9tQ3VsbFBsYW5lcztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgY3VsbFBsYW5lcyh2YWx1ZTpBcnJheTxQbGFuZTNEPilcclxuXHR7XHJcblx0XHR0aGlzLl9jdXN0b21DdWxsUGxhbmVzID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgZW50aXR5SGVhZCgpOkVudGl0eUxpc3RJdGVtXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BFbnRpdHlIZWFkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG51bUVudGl0aWVzKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BOdW1FbnRpdGllcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBudW1JbnRlcmFjdGl2ZUVudGl0aWVzKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BOdW1JbnRlcmFjdGl2ZUVudGl0aWVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgY2xlYXIoKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BOdW1FbnRpdGllcyA9IHRoaXMuX3BOdW1JbnRlcmFjdGl2ZUVudGl0aWVzID0gMDtcclxuXHRcdHRoaXMuX2N1bGxQbGFuZXMgPSB0aGlzLl9jdXN0b21DdWxsUGxhbmVzPyB0aGlzLl9jdXN0b21DdWxsUGxhbmVzIDogKCB0aGlzLl9wQ2FtZXJhPyB0aGlzLl9wQ2FtZXJhLmZydXN0dW1QbGFuZXMgOiBudWxsICk7XHJcblx0XHR0aGlzLl9udW1DdWxsUGxhbmVzID0gdGhpcy5fY3VsbFBsYW5lcz8gdGhpcy5fY3VsbFBsYW5lcy5sZW5ndGggOiAwO1xyXG5cdFx0dGhpcy5fcEVudGl0eUhlYWQgPSBudWxsO1xyXG5cdFx0dGhpcy5fcEVudGl0eUxpc3RJdGVtUG9vbC5mcmVlQWxsKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBub2RlXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICovXHJcblx0cHVibGljIGVudGVyTm9kZShub2RlOk5vZGVCYXNlKTpib29sZWFuXHJcblx0e1xyXG5cdFx0dmFyIGVudGVyOmJvb2xlYW4gPSB0aGlzLnNjZW5lLl9pQ29sbGVjdGlvbk1hcmsgIT0gbm9kZS5faUNvbGxlY3Rpb25NYXJrICYmIG5vZGUuaXNJbkZydXN0dW0odGhpcy5fY3VsbFBsYW5lcywgdGhpcy5fbnVtQ3VsbFBsYW5lcyk7XHJcblxyXG5cdFx0bm9kZS5faUNvbGxlY3Rpb25NYXJrID0gdGhpcy5zY2VuZS5faUNvbGxlY3Rpb25NYXJrO1xyXG5cclxuXHRcdHJldHVybiBlbnRlcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGVudGl0eVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhcHBseURpcmVjdGlvbmFsTGlnaHQoZW50aXR5OklFbnRpdHkpXHJcblx0e1xyXG5cdFx0Ly9kb24ndCBkbyBhbnl0aGluZyBoZXJlXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBlbnRpdHlcclxuXHQgKi9cclxuXHRwdWJsaWMgYXBwbHlFbnRpdHkoZW50aXR5OklFbnRpdHkpXHJcblx0e1xyXG5cdFx0dGhpcy5fcE51bUVudGl0aWVzKys7XHJcblxyXG5cdFx0aWYgKGVudGl0eS5faUlzTW91c2VFbmFibGVkKCkpXHJcblx0XHRcdHRoaXMuX3BOdW1JbnRlcmFjdGl2ZUVudGl0aWVzKys7XHJcblxyXG5cdFx0dmFyIGl0ZW06RW50aXR5TGlzdEl0ZW0gPSB0aGlzLl9wRW50aXR5TGlzdEl0ZW1Qb29sLmdldEl0ZW0oKTtcclxuXHRcdGl0ZW0uZW50aXR5ID0gZW50aXR5O1xyXG5cclxuXHRcdGl0ZW0ubmV4dCA9IHRoaXMuX3BFbnRpdHlIZWFkO1xyXG5cdFx0dGhpcy5fcEVudGl0eUhlYWQgPSBpdGVtO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZW50aXR5XHJcblx0ICovXHJcblx0cHVibGljIGFwcGx5TGlnaHRQcm9iZShlbnRpdHk6SUVudGl0eSlcclxuXHR7XHJcblx0XHQvL2Rvbid0IGRvIGFueXRoaW5nIGhlcmVcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGVudGl0eVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhcHBseVBvaW50TGlnaHQoZW50aXR5OklFbnRpdHkpXHJcblx0e1xyXG5cdFx0Ly9kb24ndCBkbyBhbnl0aGluZyBoZXJlXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBlbnRpdHlcclxuXHQgKi9cclxuXHRwdWJsaWMgYXBwbHlTa3lib3goZW50aXR5OklFbnRpdHkpXHJcblx0e1xyXG5cdFx0Ly9kb24ndCBkbyBhbnl0aGluZyBoZXJlXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBDb2xsZWN0b3JCYXNlOyJdfQ==