var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var ResizeEvent = (function (_super) {
    __extends(ResizeEvent, _super);
    function ResizeEvent(type, oldHeight, oldWidth) {
        if (oldHeight === void 0) { oldHeight = NaN; }
        if (oldWidth === void 0) { oldWidth = NaN; }
        _super.call(this, type);
        this._oldHeight = oldHeight;
        this._oldWidth = oldWidth;
    }
    Object.defineProperty(ResizeEvent.prototype, "oldHeight", {
        get: function () {
            return this._oldHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeEvent.prototype, "oldWidth", {
        get: function () {
            return this._oldWidth;
        },
        enumerable: true,
        configurable: true
    });
    ResizeEvent.RESIZE = "resize";
    return ResizeEvent;
})(Event);
module.exports = ResizeEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvUmVzaXplRXZlbnQudHMiXSwibmFtZXMiOlsiUmVzaXplRXZlbnQiLCJSZXNpemVFdmVudC5jb25zdHJ1Y3RvciIsIlJlc2l6ZUV2ZW50Lm9sZEhlaWdodCIsIlJlc2l6ZUV2ZW50Lm9sZFdpZHRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBRTNELElBQU0sV0FBVztJQUFTQSxVQUFwQkEsV0FBV0EsVUFBY0E7SUFPOUJBLFNBUEtBLFdBQVdBLENBT0pBLElBQVdBLEVBQUVBLFNBQXNCQSxFQUFFQSxRQUFxQkE7UUFBN0NDLHlCQUFzQkEsR0FBdEJBLGVBQXNCQTtRQUFFQSx3QkFBcUJBLEdBQXJCQSxjQUFxQkE7UUFFckVBLGtCQUFNQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUVaQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxTQUFTQSxDQUFDQTtRQUM1QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsUUFBUUEsQ0FBQ0E7SUFDM0JBLENBQUNBO0lBRURELHNCQUFXQSxrQ0FBU0E7YUFBcEJBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1FBQ3hCQSxDQUFDQTs7O09BQUFGO0lBRURBLHNCQUFXQSxpQ0FBUUE7YUFBbkJBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO1FBQ3ZCQSxDQUFDQTs7O09BQUFIO0lBckJhQSxrQkFBTUEsR0FBVUEsUUFBUUEsQ0FBQ0E7SUFzQnhDQSxrQkFBQ0E7QUFBREEsQ0F4QkEsQUF3QkNBLEVBeEJ5QixLQUFLLEVBd0I5QjtBQUVELEFBQXFCLGlCQUFaLFdBQVcsQ0FBQyIsImZpbGUiOiJldmVudHMvUmVzaXplRXZlbnQuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnRcIik7XHJcblxyXG5jbGFzcyBSZXNpemVFdmVudCBleHRlbmRzIEV2ZW50XHJcbntcclxuXHRwdWJsaWMgc3RhdGljIFJFU0laRTpzdHJpbmcgPSBcInJlc2l6ZVwiO1xyXG5cclxuXHRwcml2YXRlIF9vbGRIZWlnaHQ6bnVtYmVyO1xyXG5cdHByaXZhdGUgX29sZFdpZHRoOm51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcsIG9sZEhlaWdodDpudW1iZXIgPSBOYU4sIG9sZFdpZHRoOm51bWJlciA9IE5hTilcclxuXHR7XHJcblx0XHRzdXBlcih0eXBlKTtcclxuXHJcblx0XHR0aGlzLl9vbGRIZWlnaHQgPSBvbGRIZWlnaHQ7XHJcblx0XHR0aGlzLl9vbGRXaWR0aCA9IG9sZFdpZHRoO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBvbGRIZWlnaHQoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fb2xkSGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBvbGRXaWR0aCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9vbGRXaWR0aDtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFJlc2l6ZUV2ZW50OyJdfQ==