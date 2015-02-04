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
        //if (this._implicitBoundsVisible)
        //	this._pBoundsPrimitive = this._pCreateBoundsPrimitive();
    };
    return NodeBase;
})();
module.exports = NodeBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTm9kZUJhc2UudHMiXSwibmFtZXMiOlsiTm9kZUJhc2UiLCJOb2RlQmFzZS5jb25zdHJ1Y3RvciIsIk5vZGVCYXNlLmJvdW5kc1Zpc2libGUiLCJOb2RlQmFzZS5ib3VuZHNDaGlsZHJlblZpc2libGUiLCJOb2RlQmFzZS5wYXJlbnQiLCJOb2RlQmFzZS5fcE51bUVudGl0aWVzIiwiTm9kZUJhc2UuaXNJbkZydXN0dW0iLCJOb2RlQmFzZS5pc0ludGVyc2VjdGluZ1JheSIsIk5vZGVCYXNlLmlzQ2FzdGluZ1NoYWRvdyIsIk5vZGVCYXNlLmZpbmRQYXJ0aXRpb25Gb3JFbnRpdHkiLCJOb2RlQmFzZS5hY2NlcHRUcmF2ZXJzZXIiLCJOb2RlQmFzZS5fcENyZWF0ZUJvdW5kc1ByaW1pdGl2ZSIsIk5vZGVCYXNlLmlBZGROb2RlIiwiTm9kZUJhc2UuaVJlbW92ZU5vZGUiLCJOb2RlQmFzZS5faVVwZGF0ZUltcGxpY2l0Qm91bmRzVmlzaWJsZSIsIk5vZGVCYXNlLl9pSXNCb3VuZHNWaXNpYmxlIiwiTm9kZUJhc2UuX2lVcGRhdGVFbnRpdHlCb3VuZHMiXSwibWFwcGluZ3MiOiJBQU1BLEFBR0E7O0dBREc7SUFDRyxRQUFRO0lBaUViQTs7T0FFR0E7SUFDSEEsU0FwRUtBLFFBQVFBO1FBT05DLG9CQUFlQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUczQkEsa0JBQWFBLEdBQVVBLENBQUNBLENBQUNBO1FBNEQvQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsS0FBS0EsRUFBWUEsQ0FBQ0E7SUFDM0NBLENBQUNBO0lBdkRERCxzQkFBV0EsbUNBQWFBO1FBSHhCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esc0JBQXNCQSxDQUFDQTtRQUNwQ0EsQ0FBQ0E7YUFFREYsVUFBeUJBLEtBQWFBO1lBRXJDRSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxzQkFBc0JBLElB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QzlCQSxFQUFFQTtJQUNGQSxTQUFTQTtJQUNUQSxpQ0FBaUNBO0lBQ2pDQSw4Q0FBOENBO0lBQzlDQSxLQUFLQTtJQUVHQSx1Q0FBb0JBLEdBQTNCQTtRQUVDZ0IsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1QkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtZQUNqQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUMvQkEsQ0FBQ0E7UUFFREEsa0NBQWtDQTtRQUNsQ0EsMkRBQTJEQTtJQUM1REEsQ0FBQ0E7SUFDRmhCLGVBQUNBO0FBQURBLENBbk9BLEFBbU9DQSxJQUFBO0FBRUQsQUFBa0IsaUJBQVQsUUFBUSxDQUFDIiwiZmlsZSI6InBhcnRpdGlvbi9Ob2RlQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhbmUzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BsYW5lM0RcIik7XHJcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xyXG5cclxuaW1wb3J0IElDb2xsZWN0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGF3YXkucGFydGl0aW9uLk5vZGVCYXNlXHJcbiAqL1xyXG5jbGFzcyBOb2RlQmFzZVxyXG57XHJcblx0cHJpdmF0ZSBfYm91bmRzQ2hpbGRyZW5WaXNpYmxlOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfZXhwbGljaXRCb3VuZHNWaXNpYmxlOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfaW1wbGljaXRCb3VuZHNWaXNpYmxlOmJvb2xlYW47XHJcblx0cHVibGljIF9pUGFyZW50Ok5vZGVCYXNlO1xyXG5cdHB1YmxpYyBfcENoaWxkTm9kZXM6QXJyYXk8Tm9kZUJhc2U+O1xyXG5cdHB1YmxpYyBfcE51bUNoaWxkTm9kZXM6bnVtYmVyID0gMDtcclxuXHRwdWJsaWMgX3BCb3VuZHNQcmltaXRpdmU6SUVudGl0eTtcclxuXHJcblx0cHVibGljIF9pTnVtRW50aXRpZXM6bnVtYmVyID0gMDtcclxuXHRwdWJsaWMgX2lDb2xsZWN0aW9uTWFyazpudW1iZXI7Ly8gPSAwO1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYm91bmRzVmlzaWJsZSgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRCb3VuZHNWaXNpYmxlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBib3VuZHNWaXNpYmxlKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2V4cGxpY2l0Qm91bmRzVmlzaWJsZSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2V4cGxpY2l0Qm91bmRzVmlzaWJsZSA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX2lVcGRhdGVJbXBsaWNpdEJvdW5kc1Zpc2libGUodGhpcy5faVBhcmVudD8gdGhpcy5faVBhcmVudC5ib3VuZHNDaGlsZHJlblZpc2libGUgOiBmYWxzZSk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBib3VuZHNDaGlsZHJlblZpc2libGUoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kc0NoaWxkcmVuVmlzaWJsZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYm91bmRzQ2hpbGRyZW5WaXNpYmxlKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2JvdW5kc0NoaWxkcmVuVmlzaWJsZSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2JvdW5kc0NoaWxkcmVuVmlzaWJsZSA9IHZhbHVlO1xyXG5cclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IHRoaXMuX3BOdW1DaGlsZE5vZGVzOyArK2kpXHJcblx0XHRcdHRoaXMuX3BDaGlsZE5vZGVzW2ldLl9pVXBkYXRlSW1wbGljaXRCb3VuZHNWaXNpYmxlKHRoaXMuX2JvdW5kc0NoaWxkcmVuVmlzaWJsZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcGFyZW50KCk6Tm9kZUJhc2VcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5faVBhcmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgX3BOdW1FbnRpdGllcygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9pTnVtRW50aXRpZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHR0aGlzLl9wQ2hpbGROb2RlcyA9IG5ldyBBcnJheTxOb2RlQmFzZT4oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBsYW5lc1xyXG5cdCAqIEBwYXJhbSBudW1QbGFuZXNcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgaXNJbkZydXN0dW0ocGxhbmVzOkFycmF5PFBsYW5lM0Q+LCBudW1QbGFuZXM6bnVtYmVyKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSByYXlQb3NpdGlvblxyXG5cdCAqIEBwYXJhbSByYXlEaXJlY3Rpb25cclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRwdWJsaWMgaXNJbnRlcnNlY3RpbmdSYXkocmF5UG9zaXRpb246VmVjdG9yM0QsIHJheURpcmVjdGlvbjpWZWN0b3IzRCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRwdWJsaWMgaXNDYXN0aW5nU2hhZG93KCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZW50aXR5XHJcblx0ICogQHJldHVybnMge2F3YXkucGFydGl0aW9uLk5vZGVCYXNlfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBmaW5kUGFydGl0aW9uRm9yRW50aXR5KGVudGl0eTpJRW50aXR5KTpOb2RlQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdHJhdmVyc2VyXHJcblx0ICovXHJcblx0cHVibGljIGFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXI6SUNvbGxlY3RvcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcE51bUVudGl0aWVzID09IDAgJiYgIXRoaXMuX2ltcGxpY2l0Qm91bmRzVmlzaWJsZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGlmICh0cmF2ZXJzZXIuZW50ZXJOb2RlKHRoaXMpKSB7XHJcblx0XHRcdHZhciBpOm51bWJlciA9IDA7XHJcblxyXG5cdFx0XHR3aGlsZSAoaSA8IHRoaXMuX3BOdW1DaGlsZE5vZGVzKVxyXG5cdFx0XHRcdHRoaXMuX3BDaGlsZE5vZGVzW2krK10uYWNjZXB0VHJhdmVyc2VyKHRyYXZlcnNlcik7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5faW1wbGljaXRCb3VuZHNWaXNpYmxlKVxyXG5cdFx0XHRcdHRoaXMuX3BCb3VuZHNQcmltaXRpdmUucGFydGl0aW9uTm9kZS5hY2NlcHRUcmF2ZXJzZXIodHJhdmVyc2VyKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcENyZWF0ZUJvdW5kc1ByaW1pdGl2ZSgpOklFbnRpdHlcclxuXHR7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG5vZGVcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgaUFkZE5vZGUobm9kZTpOb2RlQmFzZSlcclxuXHR7XHJcblx0XHRub2RlLl9pUGFyZW50ID0gdGhpcztcclxuXHRcdHRoaXMuX2lOdW1FbnRpdGllcyArPSBub2RlLl9wTnVtRW50aXRpZXM7XHJcblx0XHR0aGlzLl9wQ2hpbGROb2Rlc1sgdGhpcy5fcE51bUNoaWxkTm9kZXMrKyBdID0gbm9kZTtcclxuXHJcblx0XHRub2RlLl9pVXBkYXRlSW1wbGljaXRCb3VuZHNWaXNpYmxlKHRoaXMuYm91bmRzQ2hpbGRyZW5WaXNpYmxlKTtcclxuXHJcblx0XHR2YXIgbnVtRW50aXRpZXM6bnVtYmVyID0gbm9kZS5fcE51bUVudGl0aWVzO1xyXG5cdFx0bm9kZSA9IHRoaXM7XHJcblxyXG5cdFx0ZG8ge1xyXG5cdFx0XHRub2RlLl9pTnVtRW50aXRpZXMgKz0gbnVtRW50aXRpZXM7XHJcblx0XHR9IHdoaWxlICgobm9kZSA9IG5vZGUuX2lQYXJlbnQpICE9IG51bGwpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbm9kZVxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpUmVtb3ZlTm9kZShub2RlOk5vZGVCYXNlKVxyXG5cdHtcclxuXHRcdHZhciBpbmRleDpudW1iZXIgPSB0aGlzLl9wQ2hpbGROb2Rlcy5pbmRleE9mKG5vZGUpO1xyXG5cdFx0dGhpcy5fcENoaWxkTm9kZXNbaW5kZXhdID0gdGhpcy5fcENoaWxkTm9kZXNbLS10aGlzLl9wTnVtQ2hpbGROb2Rlc107XHJcblx0XHR0aGlzLl9wQ2hpbGROb2Rlcy5wb3AoKTtcclxuXHJcblx0XHRub2RlLl9pVXBkYXRlSW1wbGljaXRCb3VuZHNWaXNpYmxlKGZhbHNlKTtcclxuXHJcblx0XHR2YXIgbnVtRW50aXRpZXM6bnVtYmVyID0gbm9kZS5fcE51bUVudGl0aWVzO1xyXG5cdFx0bm9kZSA9IHRoaXM7XHJcblxyXG5cdFx0ZG8ge1xyXG5cdFx0XHRub2RlLl9wTnVtRW50aXRpZXMgLT0gbnVtRW50aXRpZXM7XHJcblx0XHR9IHdoaWxlICgobm9kZSA9IG5vZGUuX2lQYXJlbnQpICE9IG51bGwpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBfaVVwZGF0ZUltcGxpY2l0Qm91bmRzVmlzaWJsZSh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9pbXBsaWNpdEJvdW5kc1Zpc2libGUgPT0gdGhpcy5fZXhwbGljaXRCb3VuZHNWaXNpYmxlIHx8IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5faW1wbGljaXRCb3VuZHNWaXNpYmxlID0gdGhpcy5fZXhwbGljaXRCb3VuZHNWaXNpYmxlIHx8IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX2lVcGRhdGVFbnRpdHlCb3VuZHMoKTtcclxuXHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCB0aGlzLl9wTnVtQ2hpbGROb2RlczsgKytpKVxyXG5cdFx0XHR0aGlzLl9wQ2hpbGROb2Rlc1tpXS5faVVwZGF0ZUltcGxpY2l0Qm91bmRzVmlzaWJsZSh0aGlzLl9ib3VuZHNDaGlsZHJlblZpc2libGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIF9pSXNCb3VuZHNWaXNpYmxlKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9pbXBsaWNpdEJvdW5kc1Zpc2libGU7XHJcblx0fVxyXG5cclxuLy9cdFx0cHVibGljIF9wVXBkYXRlTnVtRW50aXRpZXModmFsdWU6bnVtYmVyKVxyXG4vL1x0XHR7XHJcbi8vXHRcdFx0dmFyIGRpZmY6bnVtYmVyID0gdmFsdWUgLSB0aGlzLl9wTnVtRW50aXRpZXM7XHJcbi8vXHRcdFx0dmFyIG5vZGU6Tm9kZUJhc2UgPSB0aGlzO1xyXG4vL1xyXG4vL1x0XHRcdGRvIHtcclxuLy9cdFx0XHRcdG5vZGUuX3BOdW1FbnRpdGllcyArPSBkaWZmO1xyXG4vL1x0XHRcdH0gd2hpbGUgKChub2RlID0gbm9kZS5faVBhcmVudCkgIT0gbnVsbCk7XHJcbi8vXHRcdH1cclxuXHJcblx0cHVibGljIF9pVXBkYXRlRW50aXR5Qm91bmRzKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcEJvdW5kc1ByaW1pdGl2ZSkge1xyXG5cdFx0XHR0aGlzLl9wQm91bmRzUHJpbWl0aXZlLmRpc3Bvc2UoKTtcclxuXHRcdFx0dGhpcy5fcEJvdW5kc1ByaW1pdGl2ZSA9IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9pZiAodGhpcy5faW1wbGljaXRCb3VuZHNWaXNpYmxlKVxyXG5cdFx0Ly9cdHRoaXMuX3BCb3VuZHNQcmltaXRpdmUgPSB0aGlzLl9wQ3JlYXRlQm91bmRzUHJpbWl0aXZlKCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBOb2RlQmFzZTsiXX0=