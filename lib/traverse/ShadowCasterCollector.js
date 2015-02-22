var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
/**
 * @class away.traverse.ShadowCasterCollector
 */
var ShadowCasterCollector = (function (_super) {
    __extends(ShadowCasterCollector, _super);
    function ShadowCasterCollector() {
        _super.call(this);
    }
    /**
     *
     */
    ShadowCasterCollector.prototype.enterNode = function (node) {
        var enter = this.scene._iCollectionMark != node._iCollectionMark && node.isCastingShadow();
        if (!enter) {
            node._iCollectionMark = this.scene._iCollectionMark;
            return false;
        }
        return _super.prototype.enterNode.call(this, node);
    };
    return ShadowCasterCollector;
})(CollectorBase);
module.exports = ShadowCasterCollector;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9TaGFkb3dDYXN0ZXJDb2xsZWN0b3IudHMiXSwibmFtZXMiOlsiU2hhZG93Q2FzdGVyQ29sbGVjdG9yIiwiU2hhZG93Q2FzdGVyQ29sbGVjdG9yLmNvbnN0cnVjdG9yIiwiU2hhZG93Q2FzdGVyQ29sbGVjdG9yLmVudGVyTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxhQUFhLFdBQWMsMkNBQTJDLENBQUMsQ0FBQztBQUUvRSxBQUdBOztHQURHO0lBQ0cscUJBQXFCO0lBQVNBLFVBQTlCQSxxQkFBcUJBLFVBQXNCQTtJQUVoREEsU0FGS0EscUJBQXFCQTtRQUl6QkMsaUJBQU9BLENBQUNBO0lBQ1RBLENBQUNBO0lBRUREOztPQUVHQTtJQUNJQSx5Q0FBU0EsR0FBaEJBLFVBQWlCQSxJQUFhQTtRQUU3QkUsSUFBSUEsS0FBS0EsR0FBV0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxJQUFJQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLElBQUlBLElBQUlBLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBO1FBRW5HQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNaQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLGdCQUFnQkEsQ0FBQ0E7WUFFcERBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1FBQ2RBLENBQUNBO1FBRURBLE1BQU1BLENBQUNBLGdCQUFLQSxDQUFDQSxTQUFTQSxZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUM5QkEsQ0FBQ0E7SUFDRkYsNEJBQUNBO0FBQURBLENBdEJBLEFBc0JDQSxFQXRCbUMsYUFBYSxFQXNCaEQ7QUFFRCxBQUErQixpQkFBdEIscUJBQXFCLENBQUMiLCJmaWxlIjoidHJhdmVyc2UvU2hhZG93Q2FzdGVyQ29sbGVjdG9yLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOb2RlQmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTm9kZUJhc2VcIik7XG5pbXBvcnQgQ29sbGVjdG9yQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0NvbGxlY3RvckJhc2VcIik7XG5cbi8qKlxuICogQGNsYXNzIGF3YXkudHJhdmVyc2UuU2hhZG93Q2FzdGVyQ29sbGVjdG9yXG4gKi9cbmNsYXNzIFNoYWRvd0Nhc3RlckNvbGxlY3RvciBleHRlbmRzIENvbGxlY3RvckJhc2Vcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGVudGVyTm9kZShub2RlOk5vZGVCYXNlKTpib29sZWFuXG5cdHtcblx0XHR2YXIgZW50ZXI6Ym9vbGVhbiA9IHRoaXMuc2NlbmUuX2lDb2xsZWN0aW9uTWFyayAhPSBub2RlLl9pQ29sbGVjdGlvbk1hcmsgJiYgbm9kZS5pc0Nhc3RpbmdTaGFkb3coKTtcblxuXHRcdGlmICghZW50ZXIpIHtcblx0XHRcdG5vZGUuX2lDb2xsZWN0aW9uTWFyayA9IHRoaXMuc2NlbmUuX2lDb2xsZWN0aW9uTWFyaztcblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdXBlci5lbnRlck5vZGUobm9kZSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gU2hhZG93Q2FzdGVyQ29sbGVjdG9yOyJdfQ==