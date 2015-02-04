var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PartialImplementationError = require("awayjs-core/lib/errors/PartialImplementationError");
var NodeBase = require("awayjs-display/lib/partition/NodeBase");
/**
 * @class away.partition.EntityNode
 */
var EntityNode = (function (_super) {
    __extends(EntityNode, _super);
    function EntityNode(entity) {
        _super.call(this);
        this._entity = entity;
        this._iNumEntities = 1;
    }
    Object.defineProperty(EntityNode.prototype, "entity", {
        get: function () {
            return this._entity;
        },
        enumerable: true,
        configurable: true
    });
    EntityNode.prototype.removeFromParent = function () {
        if (this._iParent)
            this._iParent.iRemoveNode(this);
        this._iParent = null;
    };
    /**
     *
     * @returns {boolean}
     */
    EntityNode.prototype.isCastingShadow = function () {
        return this.entity.castsShadows;
    };
    /**
     *
     * @param planes
     * @param numPlanes
     * @returns {boolean}
     */
    EntityNode.prototype.isInFrustum = function (planes, numPlanes) {
        if (!this._entity._iIsVisible())
            return false;
        return this._entity.worldBounds.isInFrustum(planes, numPlanes);
    };
    /**
     * @inheritDoc
     */
    EntityNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyEntity(this._entity);
    };
    /**
     * @inheritDoc
     */
    EntityNode.prototype.isIntersectingRay = function (rayPosition, rayDirection) {
        if (!this._entity._iIsVisible())
            return false;
        return this._entity.isIntersectingRay(rayPosition, rayDirection);
    };
    /**
     *
     * @protected
     */
    EntityNode.prototype._pCreateBoundsPrimitive = function () {
        throw new PartialImplementationError();
        //return this._entity.bounds.boundingEntity;
    };
    return EntityNode;
})(NodeBase);
module.exports = EntityNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZS50cyJdLCJuYW1lcyI6WyJFbnRpdHlOb2RlIiwiRW50aXR5Tm9kZS5jb25zdHJ1Y3RvciIsIkVudGl0eU5vZGUuZW50aXR5IiwiRW50aXR5Tm9kZS5yZW1vdmVGcm9tUGFyZW50IiwiRW50aXR5Tm9kZS5pc0Nhc3RpbmdTaGFkb3ciLCJFbnRpdHlOb2RlLmlzSW5GcnVzdHVtIiwiRW50aXR5Tm9kZS5hY2NlcHRUcmF2ZXJzZXIiLCJFbnRpdHlOb2RlLmlzSW50ZXJzZWN0aW5nUmF5IiwiRW50aXR5Tm9kZS5fcENyZWF0ZUJvdW5kc1ByaW1pdGl2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsSUFBTywwQkFBMEIsV0FBVyxtREFBbUQsQ0FBQyxDQUFDO0FBRWpHLElBQU8sUUFBUSxXQUFnQix1Q0FBdUMsQ0FBQyxDQUFDO0FBSXhFLEFBR0E7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFpQkE7SUFNaENBLFNBTktBLFVBQVVBLENBTUhBLE1BQWNBO1FBRXpCQyxpQkFBT0EsQ0FBQ0E7UUFDUkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUEsQ0FBQ0E7UUFDdEJBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLENBQUNBLENBQUNBO0lBQ3hCQSxDQUFDQTtJQUVERCxzQkFBV0EsOEJBQU1BO2FBQWpCQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7OztPQUFBRjtJQUVNQSxxQ0FBZ0JBLEdBQXZCQTtRQUVDRyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUNqQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFakNBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO0lBQ3RCQSxDQUFDQTtJQUVESDs7O09BR0dBO0lBQ0lBLG9DQUFlQSxHQUF0QkE7UUFFQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBRURKOzs7OztPQUtHQTtJQUNJQSxnQ0FBV0EsR0FBbEJBLFVBQW1CQSxNQUFxQkEsRUFBRUEsU0FBZ0JBO1FBRXpESyxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtZQUMvQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFFZEEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFDaEVBLENBQUNBO0lBRURMOztPQUVHQTtJQUNJQSxvQ0FBZUEsR0FBdEJBLFVBQXVCQSxTQUFvQkE7UUFFMUNNLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQzdCQSxTQUFTQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtJQUN0Q0EsQ0FBQ0E7SUFFRE47O09BRUdBO0lBQ0lBLHNDQUFpQkEsR0FBeEJBLFVBQXlCQSxXQUFvQkEsRUFBRUEsWUFBcUJBO1FBRW5FTyxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtZQUMvQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFFZEEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxXQUFXQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQTtJQUNsRUEsQ0FBQ0E7SUFFRFA7OztPQUdHQTtJQUNJQSw0Q0FBdUJBLEdBQTlCQTtRQUVDUSxNQUFNQSxJQUFJQSwwQkFBMEJBLEVBQUVBLENBQUNBO1FBQ3ZDQSw0Q0FBNENBO0lBQzdDQSxDQUFDQTtJQUNGUixpQkFBQ0E7QUFBREEsQ0E5RUEsQUE4RUNBLEVBOUV3QixRQUFRLEVBOEVoQztBQUVELEFBQW9CLGlCQUFYLFVBQVUsQ0FBQyIsImZpbGUiOiJwYXJ0aXRpb24vRW50aXR5Tm9kZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhbmUzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BsYW5lM0RcIik7XHJcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xyXG5pbXBvcnQgUGFydGlhbEltcGxlbWVudGF0aW9uRXJyb3JcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvUGFydGlhbEltcGxlbWVudGF0aW9uRXJyb3JcIik7XHJcblxyXG5pbXBvcnQgTm9kZUJhc2VcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL05vZGVCYXNlXCIpO1xyXG5pbXBvcnQgSUNvbGxlY3Rvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvSUNvbGxlY3RvclwiKTtcclxuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgYXdheS5wYXJ0aXRpb24uRW50aXR5Tm9kZVxyXG4gKi9cclxuY2xhc3MgRW50aXR5Tm9kZSBleHRlbmRzIE5vZGVCYXNlXHJcbntcclxuXHJcblx0cHJpdmF0ZSBfZW50aXR5OklFbnRpdHk7XHJcblx0cHVibGljIF9pVXBkYXRlUXVldWVOZXh0OkVudGl0eU5vZGU7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGVudGl0eTpJRW50aXR5KVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLl9lbnRpdHkgPSBlbnRpdHk7XHJcblx0XHR0aGlzLl9pTnVtRW50aXRpZXMgPSAxO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBlbnRpdHkoKTpJRW50aXR5XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2VudGl0eTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZW1vdmVGcm9tUGFyZW50KCk6dm9pZFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9pUGFyZW50KVxyXG5cdFx0XHR0aGlzLl9pUGFyZW50LmlSZW1vdmVOb2RlKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuX2lQYXJlbnQgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRwdWJsaWMgaXNDYXN0aW5nU2hhZG93KCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmVudGl0eS5jYXN0c1NoYWRvd3M7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBwbGFuZXNcclxuXHQgKiBAcGFyYW0gbnVtUGxhbmVzXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICovXHJcblx0cHVibGljIGlzSW5GcnVzdHVtKHBsYW5lczpBcnJheTxQbGFuZTNEPiwgbnVtUGxhbmVzOm51bWJlcik6Ym9vbGVhblxyXG5cdHtcclxuXHRcdGlmICghdGhpcy5fZW50aXR5Ll9pSXNWaXNpYmxlKCkpXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fZW50aXR5LndvcmxkQm91bmRzLmlzSW5GcnVzdHVtKHBsYW5lcywgbnVtUGxhbmVzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXI6SUNvbGxlY3RvcilcclxuXHR7XHJcblx0XHRpZiAodHJhdmVyc2VyLmVudGVyTm9kZSh0aGlzKSlcclxuXHRcdFx0dHJhdmVyc2VyLmFwcGx5RW50aXR5KHRoaXMuX2VudGl0eSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdERvY1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBpc0ludGVyc2VjdGluZ1JheShyYXlQb3NpdGlvbjpWZWN0b3IzRCwgcmF5RGlyZWN0aW9uOlZlY3RvcjNEKTpib29sZWFuXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9lbnRpdHkuX2lJc1Zpc2libGUoKSlcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9lbnRpdHkuaXNJbnRlcnNlY3RpbmdSYXkocmF5UG9zaXRpb24sIHJheURpcmVjdGlvbik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BDcmVhdGVCb3VuZHNQcmltaXRpdmUoKTpJRW50aXR5XHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IFBhcnRpYWxJbXBsZW1lbnRhdGlvbkVycm9yKCk7XHJcblx0XHQvL3JldHVybiB0aGlzLl9lbnRpdHkuYm91bmRzLmJvdW5kaW5nRW50aXR5O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gRW50aXR5Tm9kZTsiXX0=