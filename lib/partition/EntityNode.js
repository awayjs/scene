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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZS50cyJdLCJuYW1lcyI6WyJFbnRpdHlOb2RlIiwiRW50aXR5Tm9kZS5jb25zdHJ1Y3RvciIsIkVudGl0eU5vZGUuZW50aXR5IiwiRW50aXR5Tm9kZS5yZW1vdmVGcm9tUGFyZW50IiwiRW50aXR5Tm9kZS5pc0Nhc3RpbmdTaGFkb3ciLCJFbnRpdHlOb2RlLmlzSW5GcnVzdHVtIiwiRW50aXR5Tm9kZS5hY2NlcHRUcmF2ZXJzZXIiLCJFbnRpdHlOb2RlLmlzSW50ZXJzZWN0aW5nUmF5IiwiRW50aXR5Tm9kZS5fcENyZWF0ZUJvdW5kc1ByaW1pdGl2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsSUFBTywwQkFBMEIsV0FBVyxtREFBbUQsQ0FBQyxDQUFDO0FBRWpHLElBQU8sUUFBUSxXQUFnQix1Q0FBdUMsQ0FBQyxDQUFDO0FBSXhFLEFBR0E7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFpQkE7SUFNaENBLFNBTktBLFVBQVVBLENBTUhBLE1BQWNBO1FBRXpCQyxpQkFBT0EsQ0FBQ0E7UUFDUkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUEsQ0FBQ0E7UUFDdEJBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLENBQUNBLENBQUNBO0lBQ3hCQSxDQUFDQTtJQUVERCxzQkFBV0EsOEJBQU1BO2FBQWpCQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7OztPQUFBRjtJQUVNQSxxQ0FBZ0JBLEdBQXZCQTtRQUVDRyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUNqQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFakNBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO0lBQ3RCQSxDQUFDQTtJQUVESDs7O09BR0dBO0lBQ0lBLG9DQUFlQSxHQUF0QkE7UUFFQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBRURKOzs7OztPQUtHQTtJQUNJQSxnQ0FBV0EsR0FBbEJBLFVBQW1CQSxNQUFxQkEsRUFBRUEsU0FBZ0JBO1FBRXpESyxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtZQUMvQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFFZEEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFDaEVBLENBQUNBO0lBRURMOztPQUVHQTtJQUNJQSxvQ0FBZUEsR0FBdEJBLFVBQXVCQSxTQUFvQkE7UUFFMUNNLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQzdCQSxTQUFTQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtJQUN0Q0EsQ0FBQ0E7SUFFRE47O09BRUdBO0lBQ0lBLHNDQUFpQkEsR0FBeEJBLFVBQXlCQSxXQUFvQkEsRUFBRUEsWUFBcUJBO1FBRW5FTyxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtZQUMvQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFFZEEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxXQUFXQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQTtJQUNsRUEsQ0FBQ0E7SUFFRFA7OztPQUdHQTtJQUNJQSw0Q0FBdUJBLEdBQTlCQTtRQUVDUSxNQUFNQSxJQUFJQSwwQkFBMEJBLEVBQUVBLENBQUNBO1FBQ3ZDQSw0Q0FBNENBO0lBQzdDQSxDQUFDQTtJQUNGUixpQkFBQ0E7QUFBREEsQ0E5RUEsQUE4RUNBLEVBOUV3QixRQUFRLEVBOEVoQztBQUVELEFBQW9CLGlCQUFYLFVBQVUsQ0FBQyIsImZpbGUiOiJwYXJ0aXRpb24vRW50aXR5Tm9kZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhbmUzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BsYW5lM0RcIik7XG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBQYXJ0aWFsSW1wbGVtZW50YXRpb25FcnJvclx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9QYXJ0aWFsSW1wbGVtZW50YXRpb25FcnJvclwiKTtcblxuaW1wb3J0IE5vZGVCYXNlXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9Ob2RlQmFzZVwiKTtcbmltcG9ydCBJQ29sbGVjdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9JQ29sbGVjdG9yXCIpO1xuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS5wYXJ0aXRpb24uRW50aXR5Tm9kZVxuICovXG5jbGFzcyBFbnRpdHlOb2RlIGV4dGVuZHMgTm9kZUJhc2VcbntcblxuXHRwcml2YXRlIF9lbnRpdHk6SUVudGl0eTtcblx0cHVibGljIF9pVXBkYXRlUXVldWVOZXh0OkVudGl0eU5vZGU7XG5cblx0Y29uc3RydWN0b3IoZW50aXR5OklFbnRpdHkpXG5cdHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX2VudGl0eSA9IGVudGl0eTtcblx0XHR0aGlzLl9pTnVtRW50aXRpZXMgPSAxO1xuXHR9XG5cblx0cHVibGljIGdldCBlbnRpdHkoKTpJRW50aXR5XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZW50aXR5O1xuXHR9XG5cblx0cHVibGljIHJlbW92ZUZyb21QYXJlbnQoKTp2b2lkXG5cdHtcblx0XHRpZiAodGhpcy5faVBhcmVudClcblx0XHRcdHRoaXMuX2lQYXJlbnQuaVJlbW92ZU5vZGUodGhpcyk7XG5cblx0XHR0aGlzLl9pUGFyZW50ID0gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdHB1YmxpYyBpc0Nhc3RpbmdTaGFkb3coKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5lbnRpdHkuY2FzdHNTaGFkb3dzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBwbGFuZXNcblx0ICogQHBhcmFtIG51bVBsYW5lc1xuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdHB1YmxpYyBpc0luRnJ1c3R1bShwbGFuZXM6QXJyYXk8UGxhbmUzRD4sIG51bVBsYW5lczpudW1iZXIpOmJvb2xlYW5cblx0e1xuXHRcdGlmICghdGhpcy5fZW50aXR5Ll9pSXNWaXNpYmxlKCkpXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRyZXR1cm4gdGhpcy5fZW50aXR5LndvcmxkQm91bmRzLmlzSW5GcnVzdHVtKHBsYW5lcywgbnVtUGxhbmVzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXI6SUNvbGxlY3Rvcilcblx0e1xuXHRcdGlmICh0cmF2ZXJzZXIuZW50ZXJOb2RlKHRoaXMpKVxuXHRcdFx0dHJhdmVyc2VyLmFwcGx5RW50aXR5KHRoaXMuX2VudGl0eSk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBpc0ludGVyc2VjdGluZ1JheShyYXlQb3NpdGlvbjpWZWN0b3IzRCwgcmF5RGlyZWN0aW9uOlZlY3RvcjNEKTpib29sZWFuXG5cdHtcblx0XHRpZiAoIXRoaXMuX2VudGl0eS5faUlzVmlzaWJsZSgpKVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2VudGl0eS5pc0ludGVyc2VjdGluZ1JheShyYXlQb3NpdGlvbiwgcmF5RGlyZWN0aW9uKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgX3BDcmVhdGVCb3VuZHNQcmltaXRpdmUoKTpJRW50aXR5XG5cdHtcblx0XHR0aHJvdyBuZXcgUGFydGlhbEltcGxlbWVudGF0aW9uRXJyb3IoKTtcblx0XHQvL3JldHVybiB0aGlzLl9lbnRpdHkuYm91bmRzLmJvdW5kaW5nRW50aXR5O1xuXHR9XG59XG5cbmV4cG9ydCA9IEVudGl0eU5vZGU7Il19