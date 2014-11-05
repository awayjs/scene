/**
 * TimeLineObject represents a unique object that is (or will be) used by a TimeLine.
 *  A TimeLineObject basically consists of an objID, and an IAsset.
 *  The FrameCommands hold references to these TimeLineObjects, so they can access and modify the IAssets

 */
var TimeLineObject = (function () {
    function TimeLineObject(asset, objID, deactiveCommandProps) {
        this._asset = asset;
        this._objID = objID;
        this._is2D = true;
        this._isActive = false;
        this._deactivateCommandProps = deactiveCommandProps;
        this._deactivateCommandProps.deactivate(this._asset);
    }
    Object.defineProperty(TimeLineObject.prototype, "deactivateCommandProps", {
        set: function (newCommandprops) {
            this._deactivateCommandProps = newCommandprops;
        },
        enumerable: true,
        configurable: true
    });
    TimeLineObject.prototype.deactivate = function () {
        //if(this._deactivateCommandProps==undefined)
        //    return;
        this._deactivateCommandProps.deactivate(this._asset);
        this._isActive = false;
    };
    Object.defineProperty(TimeLineObject.prototype, "asset", {
        get: function () {
            return this._asset;
        },
        set: function (newAsset) {
            this._asset = newAsset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeLineObject.prototype, "objID", {
        get: function () {
            return this._objID;
        },
        set: function (newobjID) {
            this._objID = newobjID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeLineObject.prototype, "is2D", {
        get: function () {
            return this._is2D;
        },
        set: function (newis2D) {
            this._is2D = newis2D;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeLineObject.prototype, "isActive", {
        get: function () {
            return this._isActive;
        },
        set: function (newisActive) {
            this._isActive = newisActive;
        },
        enumerable: true,
        configurable: true
    });
    return TimeLineObject;
})();
module.exports = TimeLineObject;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy90aW1lbGluZWRhdGEvdGltZWxpbmVvYmplY3QudHMiXSwibmFtZXMiOlsiVGltZUxpbmVPYmplY3QiLCJUaW1lTGluZU9iamVjdC5jb25zdHJ1Y3RvciIsIlRpbWVMaW5lT2JqZWN0LmRlYWN0aXZhdGVDb21tYW5kUHJvcHMiLCJUaW1lTGluZU9iamVjdC5kZWFjdGl2YXRlIiwiVGltZUxpbmVPYmplY3QuYXNzZXQiLCJUaW1lTGluZU9iamVjdC5vYmpJRCIsIlRpbWVMaW5lT2JqZWN0LmlzMkQiLCJUaW1lTGluZU9iamVjdC5pc0FjdGl2ZSJdLCJtYXBwaW5ncyI6IkFBSUEsQUFNQTs7Ozs7R0FERztJQUNHLGNBQWM7SUFxQmhCQSxTQXJCRUEsY0FBY0EsQ0FxQkpBLEtBQVlBLEVBQUVBLEtBQVlBLEVBQUVBLG9CQUFxQ0E7UUFFekVDLElBQUlBLENBQUNBLE1BQU1BLEdBQUNBLEtBQUtBLENBQUNBO1FBQ2xCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxLQUFLQSxDQUFDQTtRQUNsQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLElBQUlBLENBQUNBLFNBQVNBLEdBQUNBLEtBQUtBLENBQUNBO1FBQ3JCQSxJQUFJQSxDQUFDQSx1QkFBdUJBLEdBQUNBLG9CQUFvQkEsQ0FBQ0E7UUFDbERBLElBQUlBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDekRBLENBQUNBO0lBQ0RELHNCQUFXQSxrREFBc0JBO2FBQWpDQSxVQUFrQ0EsZUFBZ0NBO1lBRTlERSxJQUFJQSxDQUFDQSx1QkFBdUJBLEdBQUNBLGVBQWVBLENBQUNBO1FBQ2pEQSxDQUFDQTs7O09BQUFGO0lBQ01BLG1DQUFVQSxHQUFqQkE7UUFFSUcsQUFFQUEsNkNBRjZDQTtRQUM3Q0EsYUFBYUE7UUFDYkEsSUFBSUEsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUNyREEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDekJBLENBQUNBO0lBRURILHNCQUFXQSxpQ0FBS0E7YUFBaEJBO1lBRUlJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO1FBQ3ZCQSxDQUFDQTthQUNESixVQUFpQkEsUUFBZUE7WUFFNUJJLElBQUlBLENBQUNBLE1BQU1BLEdBQUNBLFFBQVFBLENBQUNBO1FBQ3pCQSxDQUFDQTs7O09BSkFKO0lBS0RBLHNCQUFXQSxpQ0FBS0E7YUFBaEJBO1lBRUlLLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO1FBQ3ZCQSxDQUFDQTthQUNETCxVQUFpQkEsUUFBZUE7WUFFNUJLLElBQUlBLENBQUNBLE1BQU1BLEdBQUNBLFFBQVFBLENBQUNBO1FBQ3pCQSxDQUFDQTs7O09BSkFMO0lBS0RBLHNCQUFXQSxnQ0FBSUE7YUFBZkE7WUFFSU0sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDdEJBLENBQUNBO2FBQ0ROLFVBQWdCQSxPQUFlQTtZQUUzQk0sSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDdkJBLENBQUNBOzs7T0FKQU47SUFLREEsc0JBQVdBLG9DQUFRQTthQUFuQkE7WUFFSU8sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDMUJBLENBQUNBO2FBQ0RQLFVBQW9CQSxXQUFtQkE7WUFFbkNPLElBQUlBLENBQUNBLFNBQVNBLEdBQUNBLFdBQVdBLENBQUNBO1FBQy9CQSxDQUFDQTs7O09BSkFQO0lBS0xBLHFCQUFDQTtBQUFEQSxDQTFFQSxBQTBFQ0EsSUFBQTtBQUVELEFBQXdCLGlCQUFmLGNBQWMsQ0FBQyIsImZpbGUiOiJlbnRpdGllcy90aW1lbGluZWRhdGEvVGltZUxpbmVPYmplY3QuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElBc3NldFx0XHRcdFx0XHQgICAgPSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xyXG5cclxuaW1wb3J0IENvbW1hbmRQcm9wc0Jhc2UgPSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL3RpbWVsaW5lZGF0YS9Db21tYW5kUHJvcHNCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIFRpbWVMaW5lT2JqZWN0IHJlcHJlc2VudHMgYSB1bmlxdWUgb2JqZWN0IHRoYXQgaXMgKG9yIHdpbGwgYmUpIHVzZWQgYnkgYSBUaW1lTGluZS5cclxuICogIEEgVGltZUxpbmVPYmplY3QgYmFzaWNhbGx5IGNvbnNpc3RzIG9mIGFuIG9iaklELCBhbmQgYW4gSUFzc2V0LlxyXG4gKiAgVGhlIEZyYW1lQ29tbWFuZHMgaG9sZCByZWZlcmVuY2VzIHRvIHRoZXNlIFRpbWVMaW5lT2JqZWN0cywgc28gdGhleSBjYW4gYWNjZXNzIGFuZCBtb2RpZnkgdGhlIElBc3NldHNcclxuXHJcbiAqL1xyXG5jbGFzcyBUaW1lTGluZU9iamVjdFxyXG57XHJcbiAgICAvLyB0aGUgSUFzc2V0IG9mIHRoaXMgVGltZUxpbmVPYmplY3QuIFRoaXMgc2hvdWxkIGFscmVhZHkgYmUgYSB1bmlxdWUgT2JqZWN0LUluc3RhbmNlLlxyXG4gICAgcHJpdmF0ZSBfYXNzZXQ6SUFzc2V0O1xyXG5cclxuICAgIC8vIHRoZSBvYmplY3QtaWQgb2YgdGhpcyBUaW1lTGluZU9iamVjdC9JQXNzZXQuIFRoaXMgaXMgbm90IHJlYWxseSB1c2VkIGFueW1vcmUgKD8pLlxyXG4gICAgcHJpdmF0ZSBfb2JqSUQ6bnVtYmVyO1xyXG5cclxuICAgIC8vIFRoaXMgdGltZUxpbmVQcm9wcyBvZmZlcnMgZnVuY3Rpb24gdG8gZGVBY3RpdmF0ZSB0aGUgY3VycmVudCBUaW1lTGluZU9iamVjdC5cclxuICAgIC8vIHdoYXQgaGFwcGVucyBpbiB0aGUgZGVhY3RpdmF0ZSBmdW5jdGlvbiBpcyB1cCB0byB0aGUgQ29tbWFuZFByb3BzICh3aGljaCBjYW4gYmUgb2YgZGlmZmVyZW50IHR5cGUpXHJcbiAgICBwcml2YXRlIF9kZWFjdGl2YXRlQ29tbWFuZFByb3BzOkNvbW1hbmRQcm9wc0Jhc2U7XHJcblxyXG4gICAgLy8ga2VlcCB0cmFjayBpZiB0aGlzIFRpbWVMaW5lT2JqZWN0IGlzIGN1cnJlbnRseSBhY3RpdmUgb3Igbm90LlxyXG4gICAgLy8gZm9yIElBc3NldCB0aGF0IGV4dGVuZHMgRGlzcGxheU9iamVjdCwgYWN0aXZlIG1lYW5zIHRoZXkgYXJlIHZpc2libGUuXHJcbiAgICAvLyBmb3Igb3RoZXIgSUFzc2V0cyBpdCBjYW4gaGF2ZSBkaWZmZXJlbnQgbWVhbmluZyAoc291bmQgcGxheWluZy4uLilcclxuICAgIHByaXZhdGUgX2lzQWN0aXZlOmJvb2xlYW47XHJcblxyXG4gICAgLy8gaWYgdGhlIG9iamVjdCBpcyBhIERpc3BsYXlPYmplY3QgdGhhdCBzaG91bGQgYmUgY29uc2lkZXJlZCBhIDJEIG9iamVjdCxcclxuICAgIC8vIHdlIHdpbGwgdXBkYXRlIHRoZSB6LXBvc2l0aW9uIHRvIHJlcHJlc2VudCBvYmplY3QtZGVwdGggdG9kb1xyXG4gICAgcHJpdmF0ZSBfaXMyRDpib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFzc2V0OklBc3NldCwgb2JqSUQ6bnVtYmVyLCBkZWFjdGl2ZUNvbW1hbmRQcm9wczpDb21tYW5kUHJvcHNCYXNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2Fzc2V0PWFzc2V0O1xyXG4gICAgICAgIHRoaXMuX29iaklEPW9iaklEO1xyXG4gICAgICAgIHRoaXMuX2lzMkQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLl9pc0FjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLl9kZWFjdGl2YXRlQ29tbWFuZFByb3BzPWRlYWN0aXZlQ29tbWFuZFByb3BzO1xyXG4gICAgICAgIHRoaXMuX2RlYWN0aXZhdGVDb21tYW5kUHJvcHMuZGVhY3RpdmF0ZSh0aGlzLl9hc3NldCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGRlYWN0aXZhdGVDb21tYW5kUHJvcHMobmV3Q29tbWFuZHByb3BzOkNvbW1hbmRQcm9wc0Jhc2UpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fZGVhY3RpdmF0ZUNvbW1hbmRQcm9wcz1uZXdDb21tYW5kcHJvcHM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVhY3RpdmF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy9pZih0aGlzLl9kZWFjdGl2YXRlQ29tbWFuZFByb3BzPT11bmRlZmluZWQpXHJcbiAgICAgICAgLy8gICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX2RlYWN0aXZhdGVDb21tYW5kUHJvcHMuZGVhY3RpdmF0ZSh0aGlzLl9hc3NldCk7XHJcbiAgICAgICAgdGhpcy5faXNBY3RpdmU9ZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBhc3NldCgpOklBc3NldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hc3NldDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgYXNzZXQobmV3QXNzZXQ6SUFzc2V0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2Fzc2V0PW5ld0Fzc2V0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBvYmpJRCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vYmpJRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgb2JqSUQobmV3b2JqSUQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX29iaklEPW5ld29iaklEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpczJEKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pczJEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBpczJEKG5ld2lzMkQ6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9pczJEPW5ld2lzMkQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzQWN0aXZlKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0FjdGl2ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgaXNBY3RpdmUobmV3aXNBY3RpdmU6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9pc0FjdGl2ZT1uZXdpc0FjdGl2ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ID0gVGltZUxpbmVPYmplY3Q7XHJcbiJdfQ==