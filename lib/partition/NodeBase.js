/**
 * @class away.partition.NodeBase
 */
var NodeBase = (function () {
    /**
     *
     */
    function NodeBase() {
        this._pNumChildNodes = 0;
        this._iNumEntities = 0;
        this._pChildNodes = new Array();
    }
    Object.defineProperty(NodeBase.prototype, "boundsVisible", {
        /**
         *
         */
        get: function () {
            return this._explicitBoundsVisible;
        },
        set: function (value) {
            if (this._explicitBoundsVisible == value)
                return;
            this._explicitBoundsVisible = value;
            this._iUpdateImplicitBoundsVisible(this._iParent ? this._iParent.boundsChildrenVisible : false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeBase.prototype, "boundsChildrenVisible", {
        get: function () {
            return this._boundsChildrenVisible;
        },
        set: function (value) {
            if (this._boundsChildrenVisible == value)
                return;
            this._boundsChildrenVisible = value;
            for (var i = 0; i < this._pNumChildNodes; ++i)
                this._pChildNodes[i]._iUpdateImplicitBoundsVisible(this._boundsChildrenVisible);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeBase.prototype, "parent", {
        /**
         *
         */
        get: function () {
            return this._iParent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeBase.prototype, "_pNumEntities", {
        /**
         *
         * @protected
         */
        get: function () {
            return this._iNumEntities;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param planes
     * @param numPlanes
     * @returns {boolean}
     * @internal
     */
    NodeBase.prototype.isInFrustum = function (planes, numPlanes) {
        return true;
    };
    /**
     *
     * @param rayPosition
     * @param rayDirection
     * @returns {boolean}
     */
    NodeBase.prototype.isIntersectingRay = function (rayPosition, rayDirection) {
        return true;
    };
    /**
     *
     * @returns {boolean}
     */
    NodeBase.prototype.isCastingShadow = function () {
        return true;
    };
    /**
     *
     * @param entity
     * @returns {away.partition.NodeBase}
     */
    NodeBase.prototype.findPartitionForEntity = function (entity) {
        return this;
    };
    /**
     *
     * @param traverser
     */
    NodeBase.prototype.acceptTraverser = function (traverser) {
        if (this._pNumEntities == 0 && !this._implicitBoundsVisible)
            return;
        if (traverser.enterNode(this)) {
            var i = 0;
            while (i < this._pNumChildNodes)
                this._pChildNodes[i++].acceptTraverser(traverser);
            if (this._implicitBoundsVisible)
                this._pBoundsPrimitive.partitionNode.acceptTraverser(traverser);
        }
    };
    /**
     *
     * @protected
     */
    NodeBase.prototype._pCreateBoundsPrimitive = function () {
        return null;
    };
    /**
     *
     * @param node
     * @internal
     */
    NodeBase.prototype.iAddNode = function (node) {
        node._iParent = this;
        this._iNumEntities += node._pNumEntities;
        this._pChildNodes[this._pNumChildNodes++] = node;
        node._iUpdateImplicitBoundsVisible(this.boundsChildrenVisible);
        var numEntities = node._pNumEntities;
        node = this;
        do {
            node._iNumEntities += numEntities;
        } while ((node = node._iParent) != null);
    };
    /**
     *
     * @param node
     * @internal
     */
    NodeBase.prototype.iRemoveNode = function (node) {
        var index = this._pChildNodes.indexOf(node);
        this._pChildNodes[index] = this._pChildNodes[--this._pNumChildNodes];
        this._pChildNodes.pop();
        node._iUpdateImplicitBoundsVisible(false);
        var numEntities = node._pNumEntities;
        node = this;
        do {
            node._pNumEntities -= numEntities;
        } while ((node = node._iParent) != null);
    };
    NodeBase.prototype._iUpdateImplicitBoundsVisible = function (value) {
        if (this._implicitBoundsVisible == this._explicitBoundsVisible || value)
            return;
        this._implicitBoundsVisible = this._explicitBoundsVisible || value;
        this._iUpdateEntityBounds();
        for (var i = 0; i < this._pNumChildNodes; ++i)
            this._pChildNodes[i]._iUpdateImplicitBoundsVisible(this._boundsChildrenVisible);
    };
    /**
     * @internal
     */
    NodeBase.prototype._iIsBoundsVisible = function () {
        return this._implicitBoundsVisible;
    };
    //		public _pUpdateNumEntities(value:number)
    //		{
    //			var diff:number = value - this._pNumEntities;
    //			var node:NodeBase = this;
    //
    //			do {
    //				node._pNumEntities += diff;
    //			} while ((node = node._iParent) != null);
    //		}
    NodeBase.prototype._iUpdateEntityBounds = function () {
        if (this._pBoundsPrimitive) {
            this._pBoundsPrimitive.dispose();
            this._pBoundsPrimitive = null;
        }
        if (this._implicitBoundsVisible)
            this._pBoundsPrimitive = this._pCreateBoundsPrimitive();
    };
    return NodeBase;
})();
module.exports = NodeBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTm9kZUJhc2UudHMiXSwibmFtZXMiOlsiTm9kZUJhc2UiLCJOb2RlQmFzZS5jb25zdHJ1Y3RvciIsIk5vZGVCYXNlLmJvdW5kc1Zpc2libGUiLCJOb2RlQmFzZS5ib3VuZHNDaGlsZHJlblZpc2libGUiLCJOb2RlQmFzZS5wYXJlbnQiLCJOb2RlQmFzZS5fcE51bUVudGl0aWVzIiwiTm9kZUJhc2UuaXNJbkZydXN0dW0iLCJOb2RlQmFzZS5pc0ludGVyc2VjdGluZ1JheSIsIk5vZGVCYXNlLmlzQ2FzdGluZ1NoYWRvdyIsIk5vZGVCYXNlLmZpbmRQYXJ0aXRpb25Gb3JFbnRpdHkiLCJOb2RlQmFzZS5hY2NlcHRUcmF2ZXJzZXIiLCJOb2RlQmFzZS5fcENyZWF0ZUJvdW5kc1ByaW1pdGl2ZSIsIk5vZGVCYXNlLmlBZGROb2RlIiwiTm9kZUJhc2UuaVJlbW92ZU5vZGUiLCJOb2RlQmFzZS5faVVwZGF0ZUltcGxpY2l0Qm91bmRzVmlzaWJsZSIsIk5vZGVCYXNlLl9pSXNCb3VuZHNWaXNpYmxlIiwiTm9kZUJhc2UuX2lVcGRhdGVFbnRpdHlCb3VuZHMiXSwibWFwcGluZ3MiOiJBQU1BLEFBR0E7O0dBREc7SUFDRyxRQUFRO0lBaUViQTs7T0FFR0E7SUFDSEEsU0FwRUtBLFFBQVFBO1FBT05DLG9CQUFlQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUczQkEsa0JBQWFBLEdBQVVBLENBQUNBLENBQUNBO1FBNEQvQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsS0FBS0EsRUFBWUEsQ0FBQ0E7SUFDM0NBLENBQUNBO0lBdkRERCxzQkFBV0EsbUNBQWFBO1FBSHhCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esc0JBQXNCQSxDQUFDQTtRQUNwQ0EsQ0FBQ0E7YUFFREYsVUFBeUJBLEtBQWFBO1lBRXJDRSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxzQkFBc0JBLElB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QzlCQSxFQUFFQTtJQUNGQSxTQUFTQTtJQUNUQSxpQ0FBaUNBO0lBQ2pDQSw4Q0FBOENBO0lBQzlDQSxLQUFLQTtJQUVHQSx1Q0FBb0JBLEdBQTNCQTtRQUVDZ0IsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1QkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtZQUNqQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUMvQkEsQ0FBQ0E7UUFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esc0JBQXNCQSxDQUFDQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxJQUFJQSxDQUFDQSx1QkFBdUJBLEVBQUVBLENBQUNBO0lBQzFEQSxDQUFDQTtJQUNGaEIsZUFBQ0E7QUFBREEsQ0FuT0EsQUFtT0NBLElBQUE7QUFFRCxBQUFrQixpQkFBVCxRQUFRLENBQUMiLCJmaWxlIjoicGFydGl0aW9uL05vZGVCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGFuZTNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUGxhbmUzRFwiKTtcclxuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XHJcblxyXG5pbXBvcnQgSUNvbGxlY3Rvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvSUNvbGxlY3RvclwiKTtcclxuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgYXdheS5wYXJ0aXRpb24uTm9kZUJhc2VcclxuICovXHJcbmNsYXNzIE5vZGVCYXNlXHJcbntcclxuXHRwcml2YXRlIF9ib3VuZHNDaGlsZHJlblZpc2libGU6Ym9vbGVhbjtcclxuXHRwcml2YXRlIF9leHBsaWNpdEJvdW5kc1Zpc2libGU6Ym9vbGVhbjtcclxuXHRwcml2YXRlIF9pbXBsaWNpdEJvdW5kc1Zpc2libGU6Ym9vbGVhbjtcclxuXHRwdWJsaWMgX2lQYXJlbnQ6Tm9kZUJhc2U7XHJcblx0cHVibGljIF9wQ2hpbGROb2RlczpBcnJheTxOb2RlQmFzZT47XHJcblx0cHVibGljIF9wTnVtQ2hpbGROb2RlczpudW1iZXIgPSAwO1xyXG5cdHB1YmxpYyBfcEJvdW5kc1ByaW1pdGl2ZTpJRW50aXR5O1xyXG5cclxuXHRwdWJsaWMgX2lOdW1FbnRpdGllczpudW1iZXIgPSAwO1xyXG5cdHB1YmxpYyBfaUNvbGxlY3Rpb25NYXJrOm51bWJlcjsvLyA9IDA7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBib3VuZHNWaXNpYmxlKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9leHBsaWNpdEJvdW5kc1Zpc2libGU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGJvdW5kc1Zpc2libGUodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fZXhwbGljaXRCb3VuZHNWaXNpYmxlID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fZXhwbGljaXRCb3VuZHNWaXNpYmxlID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5faVVwZGF0ZUltcGxpY2l0Qm91bmRzVmlzaWJsZSh0aGlzLl9pUGFyZW50PyB0aGlzLl9pUGFyZW50LmJvdW5kc0NoaWxkcmVuVmlzaWJsZSA6IGZhbHNlKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IGJvdW5kc0NoaWxkcmVuVmlzaWJsZSgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzQ2hpbGRyZW5WaXNpYmxlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBib3VuZHNDaGlsZHJlblZpc2libGUodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYm91bmRzQ2hpbGRyZW5WaXNpYmxlID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fYm91bmRzQ2hpbGRyZW5WaXNpYmxlID0gdmFsdWU7XHJcblxyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgdGhpcy5fcE51bUNoaWxkTm9kZXM7ICsraSlcclxuXHRcdFx0dGhpcy5fcENoaWxkTm9kZXNbaV0uX2lVcGRhdGVJbXBsaWNpdEJvdW5kc1Zpc2libGUodGhpcy5fYm91bmRzQ2hpbGRyZW5WaXNpYmxlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBwYXJlbnQoKTpOb2RlQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9pUGFyZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIGdldCBfcE51bUVudGl0aWVzKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lOdW1FbnRpdGllcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BDaGlsZE5vZGVzID0gbmV3IEFycmF5PE5vZGVCYXNlPigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcGxhbmVzXHJcblx0ICogQHBhcmFtIG51bVBsYW5lc1xyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpc0luRnJ1c3R1bShwbGFuZXM6QXJyYXk8UGxhbmUzRD4sIG51bVBsYW5lczpudW1iZXIpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHJheVBvc2l0aW9uXHJcblx0ICogQHBhcmFtIHJheURpcmVjdGlvblxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpc0ludGVyc2VjdGluZ1JheShyYXlQb3NpdGlvbjpWZWN0b3IzRCwgcmF5RGlyZWN0aW9uOlZlY3RvcjNEKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpc0Nhc3RpbmdTaGFkb3coKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBlbnRpdHlcclxuXHQgKiBAcmV0dXJucyB7YXdheS5wYXJ0aXRpb24uTm9kZUJhc2V9XHJcblx0ICovXHJcblx0cHVibGljIGZpbmRQYXJ0aXRpb25Gb3JFbnRpdHkoZW50aXR5OklFbnRpdHkpOk5vZGVCYXNlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB0cmF2ZXJzZXJcclxuXHQgKi9cclxuXHRwdWJsaWMgYWNjZXB0VHJhdmVyc2VyKHRyYXZlcnNlcjpJQ29sbGVjdG9yKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wTnVtRW50aXRpZXMgPT0gMCAmJiAhdGhpcy5faW1wbGljaXRCb3VuZHNWaXNpYmxlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0aWYgKHRyYXZlcnNlci5lbnRlck5vZGUodGhpcykpIHtcclxuXHRcdFx0dmFyIGk6bnVtYmVyID0gMDtcclxuXHJcblx0XHRcdHdoaWxlIChpIDwgdGhpcy5fcE51bUNoaWxkTm9kZXMpXHJcblx0XHRcdFx0dGhpcy5fcENoaWxkTm9kZXNbaSsrXS5hY2NlcHRUcmF2ZXJzZXIodHJhdmVyc2VyKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLl9pbXBsaWNpdEJvdW5kc1Zpc2libGUpXHJcblx0XHRcdFx0dGhpcy5fcEJvdW5kc1ByaW1pdGl2ZS5wYXJ0aXRpb25Ob2RlLmFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIF9wQ3JlYXRlQm91bmRzUHJpbWl0aXZlKCk6SUVudGl0eVxyXG5cdHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbm9kZVxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpQWRkTm9kZShub2RlOk5vZGVCYXNlKVxyXG5cdHtcclxuXHRcdG5vZGUuX2lQYXJlbnQgPSB0aGlzO1xyXG5cdFx0dGhpcy5faU51bUVudGl0aWVzICs9IG5vZGUuX3BOdW1FbnRpdGllcztcclxuXHRcdHRoaXMuX3BDaGlsZE5vZGVzWyB0aGlzLl9wTnVtQ2hpbGROb2RlcysrIF0gPSBub2RlO1xyXG5cclxuXHRcdG5vZGUuX2lVcGRhdGVJbXBsaWNpdEJvdW5kc1Zpc2libGUodGhpcy5ib3VuZHNDaGlsZHJlblZpc2libGUpO1xyXG5cclxuXHRcdHZhciBudW1FbnRpdGllczpudW1iZXIgPSBub2RlLl9wTnVtRW50aXRpZXM7XHJcblx0XHRub2RlID0gdGhpcztcclxuXHJcblx0XHRkbyB7XHJcblx0XHRcdG5vZGUuX2lOdW1FbnRpdGllcyArPSBudW1FbnRpdGllcztcclxuXHRcdH0gd2hpbGUgKChub2RlID0gbm9kZS5faVBhcmVudCkgIT0gbnVsbCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBub2RlXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIGlSZW1vdmVOb2RlKG5vZGU6Tm9kZUJhc2UpXHJcblx0e1xyXG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuX3BDaGlsZE5vZGVzLmluZGV4T2Yobm9kZSk7XHJcblx0XHR0aGlzLl9wQ2hpbGROb2Rlc1tpbmRleF0gPSB0aGlzLl9wQ2hpbGROb2Rlc1stLXRoaXMuX3BOdW1DaGlsZE5vZGVzXTtcclxuXHRcdHRoaXMuX3BDaGlsZE5vZGVzLnBvcCgpO1xyXG5cclxuXHRcdG5vZGUuX2lVcGRhdGVJbXBsaWNpdEJvdW5kc1Zpc2libGUoZmFsc2UpO1xyXG5cclxuXHRcdHZhciBudW1FbnRpdGllczpudW1iZXIgPSBub2RlLl9wTnVtRW50aXRpZXM7XHJcblx0XHRub2RlID0gdGhpcztcclxuXHJcblx0XHRkbyB7XHJcblx0XHRcdG5vZGUuX3BOdW1FbnRpdGllcyAtPSBudW1FbnRpdGllcztcclxuXHRcdH0gd2hpbGUgKChub2RlID0gbm9kZS5faVBhcmVudCkgIT0gbnVsbCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIF9pVXBkYXRlSW1wbGljaXRCb3VuZHNWaXNpYmxlKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2ltcGxpY2l0Qm91bmRzVmlzaWJsZSA9PSB0aGlzLl9leHBsaWNpdEJvdW5kc1Zpc2libGUgfHwgdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9pbXBsaWNpdEJvdW5kc1Zpc2libGUgPSB0aGlzLl9leHBsaWNpdEJvdW5kc1Zpc2libGUgfHwgdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5faVVwZGF0ZUVudGl0eUJvdW5kcygpO1xyXG5cclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IHRoaXMuX3BOdW1DaGlsZE5vZGVzOyArK2kpXHJcblx0XHRcdHRoaXMuX3BDaGlsZE5vZGVzW2ldLl9pVXBkYXRlSW1wbGljaXRCb3VuZHNWaXNpYmxlKHRoaXMuX2JvdW5kc0NoaWxkcmVuVmlzaWJsZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgX2lJc0JvdW5kc1Zpc2libGUoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2ltcGxpY2l0Qm91bmRzVmlzaWJsZTtcclxuXHR9XHJcblxyXG4vL1x0XHRwdWJsaWMgX3BVcGRhdGVOdW1FbnRpdGllcyh2YWx1ZTpudW1iZXIpXHJcbi8vXHRcdHtcclxuLy9cdFx0XHR2YXIgZGlmZjpudW1iZXIgPSB2YWx1ZSAtIHRoaXMuX3BOdW1FbnRpdGllcztcclxuLy9cdFx0XHR2YXIgbm9kZTpOb2RlQmFzZSA9IHRoaXM7XHJcbi8vXHJcbi8vXHRcdFx0ZG8ge1xyXG4vL1x0XHRcdFx0bm9kZS5fcE51bUVudGl0aWVzICs9IGRpZmY7XHJcbi8vXHRcdFx0fSB3aGlsZSAoKG5vZGUgPSBub2RlLl9pUGFyZW50KSAhPSBudWxsKTtcclxuLy9cdFx0fVxyXG5cclxuXHRwdWJsaWMgX2lVcGRhdGVFbnRpdHlCb3VuZHMoKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wQm91bmRzUHJpbWl0aXZlKSB7XHJcblx0XHRcdHRoaXMuX3BCb3VuZHNQcmltaXRpdmUuZGlzcG9zZSgpO1xyXG5cdFx0XHR0aGlzLl9wQm91bmRzUHJpbWl0aXZlID0gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5faW1wbGljaXRCb3VuZHNWaXNpYmxlKVxyXG5cdFx0XHR0aGlzLl9wQm91bmRzUHJpbWl0aXZlID0gdGhpcy5fcENyZWF0ZUJvdW5kc1ByaW1pdGl2ZSgpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gTm9kZUJhc2U7Il19