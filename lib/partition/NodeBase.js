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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTm9kZUJhc2UudHMiXSwibmFtZXMiOlsiTm9kZUJhc2UiLCJOb2RlQmFzZS5jb25zdHJ1Y3RvciIsIk5vZGVCYXNlLmJvdW5kc1Zpc2libGUiLCJOb2RlQmFzZS5ib3VuZHNDaGlsZHJlblZpc2libGUiLCJOb2RlQmFzZS5wYXJlbnQiLCJOb2RlQmFzZS5fcE51bUVudGl0aWVzIiwiTm9kZUJhc2UuaXNJbkZydXN0dW0iLCJOb2RlQmFzZS5pc0ludGVyc2VjdGluZ1JheSIsIk5vZGVCYXNlLmlzQ2FzdGluZ1NoYWRvdyIsIk5vZGVCYXNlLmZpbmRQYXJ0aXRpb25Gb3JFbnRpdHkiLCJOb2RlQmFzZS5hY2NlcHRUcmF2ZXJzZXIiLCJOb2RlQmFzZS5fcENyZWF0ZUJvdW5kc1ByaW1pdGl2ZSIsIk5vZGVCYXNlLmlBZGROb2RlIiwiTm9kZUJhc2UuaVJlbW92ZU5vZGUiLCJOb2RlQmFzZS5faVVwZGF0ZUltcGxpY2l0Qm91bmRzVmlzaWJsZSIsIk5vZGVCYXNlLl9pSXNCb3VuZHNWaXNpYmxlIiwiTm9kZUJhc2UuX2lVcGRhdGVFbnRpdHlCb3VuZHMiXSwibWFwcGluZ3MiOiJBQU1BLEFBR0E7O0dBREc7SUFDRyxRQUFRO0lBaUViQTs7T0FFR0E7SUFDSEEsU0FwRUtBLFFBQVFBO1FBT05DLG9CQUFlQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUczQkEsa0JBQWFBLEdBQVVBLENBQUNBLENBQUNBO1FBNEQvQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsS0FBS0EsRUFBWUEsQ0FBQ0E7SUFDM0NBLENBQUNBO0lBdkRERCxzQkFBV0EsbUNBQWFBO1FBSHhCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esc0JBQXNCQSxDQUFDQTtRQUNwQ0EsQ0FBQ0E7YUFFREYsVUFBeUJBLEtBQWFBO1lBRXJDRSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxzQkFBc0JBLElB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QzlCQSxFQUFFQTtJQUNGQSxTQUFTQTtJQUNUQSxpQ0FBaUNBO0lBQ2pDQSw4Q0FBOENBO0lBQzlDQSxLQUFLQTtJQUVHQSx1Q0FBb0JBLEdBQTNCQTtRQUVDZ0IsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1QkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtZQUNqQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUMvQkEsQ0FBQ0E7UUFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esc0JBQXNCQSxDQUFDQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxJQUFJQSxDQUFDQSx1QkFBdUJBLEVBQUVBLENBQUNBO0lBQzFEQSxDQUFDQTtJQUNGaEIsZUFBQ0E7QUFBREEsQ0FuT0EsQUFtT0NBLElBQUE7QUFFRCxBQUFrQixpQkFBVCxRQUFRLENBQUMiLCJmaWxlIjoicGFydGl0aW9uL05vZGVCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGFuZTNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUGxhbmUzRFwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xuXG5pbXBvcnQgSUNvbGxlY3Rvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvSUNvbGxlY3RvclwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5cbi8qKlxuICogQGNsYXNzIGF3YXkucGFydGl0aW9uLk5vZGVCYXNlXG4gKi9cbmNsYXNzIE5vZGVCYXNlXG57XG5cdHByaXZhdGUgX2JvdW5kc0NoaWxkcmVuVmlzaWJsZTpib29sZWFuO1xuXHRwcml2YXRlIF9leHBsaWNpdEJvdW5kc1Zpc2libGU6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfaW1wbGljaXRCb3VuZHNWaXNpYmxlOmJvb2xlYW47XG5cdHB1YmxpYyBfaVBhcmVudDpOb2RlQmFzZTtcblx0cHVibGljIF9wQ2hpbGROb2RlczpBcnJheTxOb2RlQmFzZT47XG5cdHB1YmxpYyBfcE51bUNoaWxkTm9kZXM6bnVtYmVyID0gMDtcblx0cHVibGljIF9wQm91bmRzUHJpbWl0aXZlOklFbnRpdHk7XG5cblx0cHVibGljIF9pTnVtRW50aXRpZXM6bnVtYmVyID0gMDtcblx0cHVibGljIF9pQ29sbGVjdGlvbk1hcms6bnVtYmVyOy8vID0gMDtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYm91bmRzVmlzaWJsZSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9leHBsaWNpdEJvdW5kc1Zpc2libGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJvdW5kc1Zpc2libGUodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9leHBsaWNpdEJvdW5kc1Zpc2libGUgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9leHBsaWNpdEJvdW5kc1Zpc2libGUgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX2lVcGRhdGVJbXBsaWNpdEJvdW5kc1Zpc2libGUodGhpcy5faVBhcmVudD8gdGhpcy5faVBhcmVudC5ib3VuZHNDaGlsZHJlblZpc2libGUgOiBmYWxzZSk7XG5cblx0fVxuXG5cdHB1YmxpYyBnZXQgYm91bmRzQ2hpbGRyZW5WaXNpYmxlKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kc0NoaWxkcmVuVmlzaWJsZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYm91bmRzQ2hpbGRyZW5WaXNpYmxlKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fYm91bmRzQ2hpbGRyZW5WaXNpYmxlID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYm91bmRzQ2hpbGRyZW5WaXNpYmxlID0gdmFsdWU7XG5cblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCB0aGlzLl9wTnVtQ2hpbGROb2RlczsgKytpKVxuXHRcdFx0dGhpcy5fcENoaWxkTm9kZXNbaV0uX2lVcGRhdGVJbXBsaWNpdEJvdW5kc1Zpc2libGUodGhpcy5fYm91bmRzQ2hpbGRyZW5WaXNpYmxlKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBwYXJlbnQoKTpOb2RlQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2lQYXJlbnQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIGdldCBfcE51bUVudGl0aWVzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faU51bUVudGl0aWVzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHR0aGlzLl9wQ2hpbGROb2RlcyA9IG5ldyBBcnJheTxOb2RlQmFzZT4oKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gcGxhbmVzXG5cdCAqIEBwYXJhbSBudW1QbGFuZXNcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGlzSW5GcnVzdHVtKHBsYW5lczpBcnJheTxQbGFuZTNEPiwgbnVtUGxhbmVzOm51bWJlcik6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHJheVBvc2l0aW9uXG5cdCAqIEBwYXJhbSByYXlEaXJlY3Rpb25cblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRwdWJsaWMgaXNJbnRlcnNlY3RpbmdSYXkocmF5UG9zaXRpb246VmVjdG9yM0QsIHJheURpcmVjdGlvbjpWZWN0b3IzRCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRwdWJsaWMgaXNDYXN0aW5nU2hhZG93KCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGVudGl0eVxuXHQgKiBAcmV0dXJucyB7YXdheS5wYXJ0aXRpb24uTm9kZUJhc2V9XG5cdCAqL1xuXHRwdWJsaWMgZmluZFBhcnRpdGlvbkZvckVudGl0eShlbnRpdHk6SUVudGl0eSk6Tm9kZUJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSB0cmF2ZXJzZXJcblx0ICovXG5cdHB1YmxpYyBhY2NlcHRUcmF2ZXJzZXIodHJhdmVyc2VyOklDb2xsZWN0b3IpXG5cdHtcblx0XHRpZiAodGhpcy5fcE51bUVudGl0aWVzID09IDAgJiYgIXRoaXMuX2ltcGxpY2l0Qm91bmRzVmlzaWJsZSlcblx0XHRcdHJldHVybjtcblxuXHRcdGlmICh0cmF2ZXJzZXIuZW50ZXJOb2RlKHRoaXMpKSB7XG5cdFx0XHR2YXIgaTpudW1iZXIgPSAwO1xuXG5cdFx0XHR3aGlsZSAoaSA8IHRoaXMuX3BOdW1DaGlsZE5vZGVzKVxuXHRcdFx0XHR0aGlzLl9wQ2hpbGROb2Rlc1tpKytdLmFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXIpO1xuXG5cdFx0XHRpZiAodGhpcy5faW1wbGljaXRCb3VuZHNWaXNpYmxlKVxuXHRcdFx0XHR0aGlzLl9wQm91bmRzUHJpbWl0aXZlLnBhcnRpdGlvbk5vZGUuYWNjZXB0VHJhdmVyc2VyKHRyYXZlcnNlcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcENyZWF0ZUJvdW5kc1ByaW1pdGl2ZSgpOklFbnRpdHlcblx0e1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBub2RlXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGlBZGROb2RlKG5vZGU6Tm9kZUJhc2UpXG5cdHtcblx0XHRub2RlLl9pUGFyZW50ID0gdGhpcztcblx0XHR0aGlzLl9pTnVtRW50aXRpZXMgKz0gbm9kZS5fcE51bUVudGl0aWVzO1xuXHRcdHRoaXMuX3BDaGlsZE5vZGVzWyB0aGlzLl9wTnVtQ2hpbGROb2RlcysrIF0gPSBub2RlO1xuXG5cdFx0bm9kZS5faVVwZGF0ZUltcGxpY2l0Qm91bmRzVmlzaWJsZSh0aGlzLmJvdW5kc0NoaWxkcmVuVmlzaWJsZSk7XG5cblx0XHR2YXIgbnVtRW50aXRpZXM6bnVtYmVyID0gbm9kZS5fcE51bUVudGl0aWVzO1xuXHRcdG5vZGUgPSB0aGlzO1xuXG5cdFx0ZG8ge1xuXHRcdFx0bm9kZS5faU51bUVudGl0aWVzICs9IG51bUVudGl0aWVzO1xuXHRcdH0gd2hpbGUgKChub2RlID0gbm9kZS5faVBhcmVudCkgIT0gbnVsbCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIG5vZGVcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgaVJlbW92ZU5vZGUobm9kZTpOb2RlQmFzZSlcblx0e1xuXHRcdHZhciBpbmRleDpudW1iZXIgPSB0aGlzLl9wQ2hpbGROb2Rlcy5pbmRleE9mKG5vZGUpO1xuXHRcdHRoaXMuX3BDaGlsZE5vZGVzW2luZGV4XSA9IHRoaXMuX3BDaGlsZE5vZGVzWy0tdGhpcy5fcE51bUNoaWxkTm9kZXNdO1xuXHRcdHRoaXMuX3BDaGlsZE5vZGVzLnBvcCgpO1xuXG5cdFx0bm9kZS5faVVwZGF0ZUltcGxpY2l0Qm91bmRzVmlzaWJsZShmYWxzZSk7XG5cblx0XHR2YXIgbnVtRW50aXRpZXM6bnVtYmVyID0gbm9kZS5fcE51bUVudGl0aWVzO1xuXHRcdG5vZGUgPSB0aGlzO1xuXG5cdFx0ZG8ge1xuXHRcdFx0bm9kZS5fcE51bUVudGl0aWVzIC09IG51bUVudGl0aWVzO1xuXHRcdH0gd2hpbGUgKChub2RlID0gbm9kZS5faVBhcmVudCkgIT0gbnVsbCk7XG5cdH1cblxuXHRwcml2YXRlIF9pVXBkYXRlSW1wbGljaXRCb3VuZHNWaXNpYmxlKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5faW1wbGljaXRCb3VuZHNWaXNpYmxlID09IHRoaXMuX2V4cGxpY2l0Qm91bmRzVmlzaWJsZSB8fCB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2ltcGxpY2l0Qm91bmRzVmlzaWJsZSA9IHRoaXMuX2V4cGxpY2l0Qm91bmRzVmlzaWJsZSB8fCB2YWx1ZTtcblxuXHRcdHRoaXMuX2lVcGRhdGVFbnRpdHlCb3VuZHMoKTtcblxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IHRoaXMuX3BOdW1DaGlsZE5vZGVzOyArK2kpXG5cdFx0XHR0aGlzLl9wQ2hpbGROb2Rlc1tpXS5faVVwZGF0ZUltcGxpY2l0Qm91bmRzVmlzaWJsZSh0aGlzLl9ib3VuZHNDaGlsZHJlblZpc2libGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pSXNCb3VuZHNWaXNpYmxlKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2ltcGxpY2l0Qm91bmRzVmlzaWJsZTtcblx0fVxuXG4vL1x0XHRwdWJsaWMgX3BVcGRhdGVOdW1FbnRpdGllcyh2YWx1ZTpudW1iZXIpXG4vL1x0XHR7XG4vL1x0XHRcdHZhciBkaWZmOm51bWJlciA9IHZhbHVlIC0gdGhpcy5fcE51bUVudGl0aWVzO1xuLy9cdFx0XHR2YXIgbm9kZTpOb2RlQmFzZSA9IHRoaXM7XG4vL1xuLy9cdFx0XHRkbyB7XG4vL1x0XHRcdFx0bm9kZS5fcE51bUVudGl0aWVzICs9IGRpZmY7XG4vL1x0XHRcdH0gd2hpbGUgKChub2RlID0gbm9kZS5faVBhcmVudCkgIT0gbnVsbCk7XG4vL1x0XHR9XG5cblx0cHVibGljIF9pVXBkYXRlRW50aXR5Qm91bmRzKClcblx0e1xuXHRcdGlmICh0aGlzLl9wQm91bmRzUHJpbWl0aXZlKSB7XG5cdFx0XHR0aGlzLl9wQm91bmRzUHJpbWl0aXZlLmRpc3Bvc2UoKTtcblx0XHRcdHRoaXMuX3BCb3VuZHNQcmltaXRpdmUgPSBudWxsO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9pbXBsaWNpdEJvdW5kc1Zpc2libGUpXG5cdFx0XHR0aGlzLl9wQm91bmRzUHJpbWl0aXZlID0gdGhpcy5fcENyZWF0ZUJvdW5kc1ByaW1pdGl2ZSgpO1xuXHR9XG59XG5cbmV4cG9ydCA9IE5vZGVCYXNlOyJdfQ==