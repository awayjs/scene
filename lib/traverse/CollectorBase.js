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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9jb2xsZWN0b3JiYXNlLnRzIl0sIm5hbWVzIjpbIkNvbGxlY3RvckJhc2UiLCJDb2xsZWN0b3JCYXNlLmNvbnN0cnVjdG9yIiwiQ29sbGVjdG9yQmFzZS5jYW1lcmEiLCJDb2xsZWN0b3JCYXNlLmN1bGxQbGFuZXMiLCJDb2xsZWN0b3JCYXNlLmVudGl0eUhlYWQiLCJDb2xsZWN0b3JCYXNlLm51bUVudGl0aWVzIiwiQ29sbGVjdG9yQmFzZS5udW1JbnRlcmFjdGl2ZUVudGl0aWVzIiwiQ29sbGVjdG9yQmFzZS5jbGVhciIsIkNvbGxlY3RvckJhc2UuZW50ZXJOb2RlIiwiQ29sbGVjdG9yQmFzZS5hcHBseURpcmVjdGlvbmFsTGlnaHQiLCJDb2xsZWN0b3JCYXNlLmFwcGx5RW50aXR5IiwiQ29sbGVjdG9yQmFzZS5hcHBseUxpZ2h0UHJvYmUiLCJDb2xsZWN0b3JCYXNlLmFwcGx5UG9pbnRMaWdodCIsIkNvbGxlY3RvckJhc2UuYXBwbHlTa3lib3giXSwibWFwcGluZ3MiOiJBQUlBLElBQU8sa0JBQWtCLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQU1wRixBQUdBOztHQURHO0lBQ0csYUFBYTtJQWVsQkEsU0FmS0EsYUFBYUE7UUFTVkMsbUJBQWNBLEdBQVVBLENBQUNBLENBQUNBO1FBQzNCQSxrQkFBYUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDekJBLDZCQUF3QkEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFNMUNBLElBQUlBLENBQUNBLG9CQUFvQkEsR0FBR0EsSUFBSUEsa0JBQWtCQSxFQUFFQSxDQUFDQTtJQUN0REEsQ0FBQ0E7SUFLREQsc0JBQVdBLGlDQUFNQTtRQUhqQkE7O1dBRUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBQ3RCQSxDQUFDQTthQUVERixVQUFrQkEsS0FBWUE7WUFFN0JFLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO1lB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QUFZQSxDQUFDQTtRQUM5QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDMUJBLENBQUNBO0lBRURWOzs7T0FHR0E7SUFDSUEsdUNBQWVBLEdBQXRCQSxVQUF1QkEsTUFBY0E7UUFFcENXLHdCQUF3QkE7SUFDekJBLENBQUNBO0lBRURYOzs7T0FHR0E7SUFDSUEsdUNBQWVBLEdBQXRCQSxVQUF1QkEsTUFBY0E7UUFFcENZLHdCQUF3QkE7SUFDekJBLENBQUNBO0lBRURaOzs7T0FHR0E7SUFDSUEsbUNBQVdBLEdBQWxCQSxVQUFtQkEsTUFBY0E7UUFFaENhLHdCQUF3QkE7SUFDekJBLENBQUNBO0lBQ0ZiLG9CQUFDQTtBQUFEQSxDQXRKQSxBQXNKQ0EsSUFBQTtBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJ0cmF2ZXJzZS9Db2xsZWN0b3JCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGFuZTNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUGxhbmUzRFwiKTtcblxuaW1wb3J0IFNjZW5lXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvU2NlbmVcIik7XG5pbXBvcnQgRW50aXR5TGlzdEl0ZW1cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0VudGl0eUxpc3RJdGVtXCIpO1xuaW1wb3J0IEVudGl0eUxpc3RJdGVtUG9vbFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0VudGl0eUxpc3RJdGVtUG9vbFwiKTtcbmltcG9ydCBOb2RlQmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTm9kZUJhc2VcIik7XG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvSVJlbmRlcmVyXCIpO1xuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuXG4vKipcbiAqIEBjbGFzcyBhd2F5LnRyYXZlcnNlLkNvbGxlY3RvckJhc2VcbiAqL1xuY2xhc3MgQ29sbGVjdG9yQmFzZVxue1xuXHRwdWJsaWMgc2NlbmU6U2NlbmU7XG5cblx0cHVibGljIF9wRW50aXR5SGVhZDpFbnRpdHlMaXN0SXRlbTtcblx0cHVibGljIF9wRW50aXR5TGlzdEl0ZW1Qb29sOkVudGl0eUxpc3RJdGVtUG9vbDtcblx0cHVibGljIF9wQ2FtZXJhOkNhbWVyYTtcblx0cHJpdmF0ZSBfY3VzdG9tQ3VsbFBsYW5lczpBcnJheTxQbGFuZTNEPjtcblx0cHJpdmF0ZSBfY3VsbFBsYW5lczpBcnJheTxQbGFuZTNEPjtcblx0cHJpdmF0ZSBfbnVtQ3VsbFBsYW5lczpudW1iZXIgPSAwO1xuXHRwdWJsaWMgX3BOdW1FbnRpdGllczpudW1iZXIgPSAwO1xuXHRwdWJsaWMgX3BOdW1JbnRlcmFjdGl2ZUVudGl0aWVzOm51bWJlciA9IDA7XG5cblx0cHVibGljIGlzRW50aXR5Q29sbGVjdG9yOmJvb2xlYW47XG5cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0dGhpcy5fcEVudGl0eUxpc3RJdGVtUG9vbCA9IG5ldyBFbnRpdHlMaXN0SXRlbVBvb2woKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBjYW1lcmEoKTpDYW1lcmFcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQ2FtZXJhO1xuXHR9XG5cblx0cHVibGljIHNldCBjYW1lcmEodmFsdWU6Q2FtZXJhKVxuXHR7XG5cdFx0dGhpcy5fcENhbWVyYSA9IHZhbHVlO1xuXHRcdHRoaXMuX2N1bGxQbGFuZXMgPSB0aGlzLl9wQ2FtZXJhLmZydXN0dW1QbGFuZXM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgY3VsbFBsYW5lcygpOkFycmF5PFBsYW5lM0Q+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY3VzdG9tQ3VsbFBsYW5lcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgY3VsbFBsYW5lcyh2YWx1ZTpBcnJheTxQbGFuZTNEPilcblx0e1xuXHRcdHRoaXMuX2N1c3RvbUN1bGxQbGFuZXMgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBlbnRpdHlIZWFkKCk6RW50aXR5TGlzdEl0ZW1cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wRW50aXR5SGVhZDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBudW1FbnRpdGllcygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BOdW1FbnRpdGllcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBudW1JbnRlcmFjdGl2ZUVudGl0aWVzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE51bUludGVyYWN0aXZlRW50aXRpZXM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBjbGVhcigpXG5cdHtcblx0XHR0aGlzLl9wTnVtRW50aXRpZXMgPSB0aGlzLl9wTnVtSW50ZXJhY3RpdmVFbnRpdGllcyA9IDA7XG5cdFx0dGhpcy5fY3VsbFBsYW5lcyA9IHRoaXMuX2N1c3RvbUN1bGxQbGFuZXM/IHRoaXMuX2N1c3RvbUN1bGxQbGFuZXMgOiAoIHRoaXMuX3BDYW1lcmE/IHRoaXMuX3BDYW1lcmEuZnJ1c3R1bVBsYW5lcyA6IG51bGwgKTtcblx0XHR0aGlzLl9udW1DdWxsUGxhbmVzID0gdGhpcy5fY3VsbFBsYW5lcz8gdGhpcy5fY3VsbFBsYW5lcy5sZW5ndGggOiAwO1xuXHRcdHRoaXMuX3BFbnRpdHlIZWFkID0gbnVsbDtcblx0XHR0aGlzLl9wRW50aXR5TGlzdEl0ZW1Qb29sLmZyZWVBbGwoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gbm9kZVxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdHB1YmxpYyBlbnRlck5vZGUobm9kZTpOb2RlQmFzZSk6Ym9vbGVhblxuXHR7XG5cdFx0dmFyIGVudGVyOmJvb2xlYW4gPSB0aGlzLnNjZW5lLl9pQ29sbGVjdGlvbk1hcmsgIT0gbm9kZS5faUNvbGxlY3Rpb25NYXJrICYmIG5vZGUuaXNJbkZydXN0dW0odGhpcy5fY3VsbFBsYW5lcywgdGhpcy5fbnVtQ3VsbFBsYW5lcyk7XG5cblx0XHRub2RlLl9pQ29sbGVjdGlvbk1hcmsgPSB0aGlzLnNjZW5lLl9pQ29sbGVjdGlvbk1hcms7XG5cblx0XHRyZXR1cm4gZW50ZXI7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGVudGl0eVxuXHQgKi9cblx0cHVibGljIGFwcGx5RGlyZWN0aW9uYWxMaWdodChlbnRpdHk6SUVudGl0eSlcblx0e1xuXHRcdC8vZG9uJ3QgZG8gYW55dGhpbmcgaGVyZVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBlbnRpdHlcblx0ICovXG5cdHB1YmxpYyBhcHBseUVudGl0eShlbnRpdHk6SUVudGl0eSlcblx0e1xuXHRcdHRoaXMuX3BOdW1FbnRpdGllcysrO1xuXG5cdFx0aWYgKGVudGl0eS5faUlzTW91c2VFbmFibGVkKCkpXG5cdFx0XHR0aGlzLl9wTnVtSW50ZXJhY3RpdmVFbnRpdGllcysrO1xuXG5cdFx0dmFyIGl0ZW06RW50aXR5TGlzdEl0ZW0gPSB0aGlzLl9wRW50aXR5TGlzdEl0ZW1Qb29sLmdldEl0ZW0oKTtcblx0XHRpdGVtLmVudGl0eSA9IGVudGl0eTtcblxuXHRcdGl0ZW0ubmV4dCA9IHRoaXMuX3BFbnRpdHlIZWFkO1xuXHRcdHRoaXMuX3BFbnRpdHlIZWFkID0gaXRlbTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gZW50aXR5XG5cdCAqL1xuXHRwdWJsaWMgYXBwbHlMaWdodFByb2JlKGVudGl0eTpJRW50aXR5KVxuXHR7XG5cdFx0Ly9kb24ndCBkbyBhbnl0aGluZyBoZXJlXG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGVudGl0eVxuXHQgKi9cblx0cHVibGljIGFwcGx5UG9pbnRMaWdodChlbnRpdHk6SUVudGl0eSlcblx0e1xuXHRcdC8vZG9uJ3QgZG8gYW55dGhpbmcgaGVyZVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBlbnRpdHlcblx0ICovXG5cdHB1YmxpYyBhcHBseVNreWJveChlbnRpdHk6SUVudGl0eSlcblx0e1xuXHRcdC8vZG9uJ3QgZG8gYW55dGhpbmcgaGVyZVxuXHR9XG59XG5cbmV4cG9ydCA9IENvbGxlY3RvckJhc2U7Il19