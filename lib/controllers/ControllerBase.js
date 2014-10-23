var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var ControllerBase = (function () {
    function ControllerBase(targetObject) {
        if (targetObject === void 0) { targetObject = null; }
        this._pAutoUpdate = true;
        this.targetObject = targetObject;
    }
    ControllerBase.prototype.pNotifyUpdate = function () {
        if (this._pTargetObject && this._pTargetObject._iAssignedPartition && this._pAutoUpdate) {
            this._pTargetObject._iAssignedPartition.iMarkForUpdate(this._pTargetObject);
        }
    };
    Object.defineProperty(ControllerBase.prototype, "targetObject", {
        get: function () {
            return this._pTargetObject;
        },
        set: function (val) {
            if (this._pTargetObject == val) {
                return;
            }
            if (this._pTargetObject && this._pAutoUpdate) {
                this._pTargetObject._iController = null;
            }
            this._pTargetObject = val;
            if (this._pTargetObject && this._pAutoUpdate) {
                this._pTargetObject._iController = this;
            }
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerBase.prototype, "autoUpdate", {
        get: function () {
            return this._pAutoUpdate;
        },
        set: function (val) {
            if (this._pAutoUpdate == val) {
                return;
            }
            this._pAutoUpdate = val;
            if (this._pTargetObject) {
                if (this._pTargetObject) {
                    this._pTargetObject._iController = this;
                }
                else {
                    this._pTargetObject._iController = null;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ControllerBase.prototype.update = function (interpolate) {
        if (interpolate === void 0) { interpolate = true; }
        throw new AbstractMethodError();
    };
    return ControllerBase;
})();
module.exports = ControllerBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9jb250cm9sbGVycy9jb250cm9sbGVyYmFzZS50cyJdLCJuYW1lcyI6WyJDb250cm9sbGVyQmFzZSIsIkNvbnRyb2xsZXJCYXNlLmNvbnN0cnVjdG9yIiwiQ29udHJvbGxlckJhc2UucE5vdGlmeVVwZGF0ZSIsIkNvbnRyb2xsZXJCYXNlLnRhcmdldE9iamVjdCIsIkNvbnRyb2xsZXJCYXNlLmF1dG9VcGRhdGUiLCJDb250cm9sbGVyQmFzZS51cGRhdGUiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sbUJBQW1CLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUlwRixJQUFNLGNBQWM7SUFNbkJBLFNBTktBLGNBQWNBLENBTVBBLFlBQWlDQTtRQUFqQ0MsNEJBQWlDQSxHQUFqQ0EsbUJBQWlDQTtRQUh0Q0EsaUJBQVlBLEdBQVdBLElBQUlBLENBQUNBO1FBS2xDQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxZQUFZQSxDQUFDQTtJQUNsQ0EsQ0FBQ0E7SUFFTUQsc0NBQWFBLEdBQXBCQTtRQUVDRSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxJQUFJQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxtQkFBbUJBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO1lBQ3pGQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxtQkFBbUJBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBO1FBQzdFQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUVERixzQkFBV0Esd0NBQVlBO2FBQXZCQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7YUFFREgsVUFBd0JBLEdBQWlCQTtZQUV4Q0csRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hDQSxNQUFNQSxDQUFDQTtZQUNSQSxDQUFDQTtZQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDOUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3pDQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUUxQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzlDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUN6Q0EsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0E7UUFDdEJBLENBQUNBOzs7T0FqQkFIO0lBbUJEQSxzQkFBV0Esc0NBQVVBO2FBQXJCQTtZQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7YUFFREosVUFBc0JBLEdBQVdBO1lBRWhDSSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDOUJBLE1BQU1BLENBQUNBO1lBQ1JBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLEdBQUdBLENBQUNBO1lBRXhCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDekJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBO29CQUN6QkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBQ3pDQSxDQUFDQTtnQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ1BBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBO2dCQUN6Q0EsQ0FBQ0E7WUFDRkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7OztPQWhCQUo7SUFrQk1BLCtCQUFNQSxHQUFiQSxVQUFjQSxXQUEwQkE7UUFBMUJLLDJCQUEwQkEsR0FBMUJBLGtCQUEwQkE7UUFFdkNBLE1BQU1BLElBQUlBLG1CQUFtQkEsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBQ0ZMLHFCQUFDQTtBQUFEQSxDQWpFQSxBQWlFQ0EsSUFBQTtBQUVELEFBQXdCLGlCQUFmLGNBQWMsQ0FBQyIsImZpbGUiOiJjb250cm9sbGVycy9Db250cm9sbGVyQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XG5cbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcblxuY2xhc3MgQ29udHJvbGxlckJhc2VcbntcblxuXHRwdWJsaWMgX3BBdXRvVXBkYXRlOmJvb2xlYW4gPSB0cnVlO1xuXHRwdWJsaWMgX3BUYXJnZXRPYmplY3Q6RGlzcGxheU9iamVjdDtcblxuXHRjb25zdHJ1Y3Rvcih0YXJnZXRPYmplY3Q6RGlzcGxheU9iamVjdCA9IG51bGwpXG5cdHtcblx0XHR0aGlzLnRhcmdldE9iamVjdCA9IHRhcmdldE9iamVjdDtcblx0fVxuXG5cdHB1YmxpYyBwTm90aWZ5VXBkYXRlKClcblx0e1xuXHRcdGlmICh0aGlzLl9wVGFyZ2V0T2JqZWN0ICYmIHRoaXMuX3BUYXJnZXRPYmplY3QuX2lBc3NpZ25lZFBhcnRpdGlvbiAmJiB0aGlzLl9wQXV0b1VwZGF0ZSkge1xuXHRcdFx0dGhpcy5fcFRhcmdldE9iamVjdC5faUFzc2lnbmVkUGFydGl0aW9uLmlNYXJrRm9yVXBkYXRlKHRoaXMuX3BUYXJnZXRPYmplY3QpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBnZXQgdGFyZ2V0T2JqZWN0KCk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BUYXJnZXRPYmplY3Q7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHRhcmdldE9iamVjdCh2YWw6RGlzcGxheU9iamVjdClcblx0e1xuXHRcdGlmICh0aGlzLl9wVGFyZ2V0T2JqZWN0ID09IHZhbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9wVGFyZ2V0T2JqZWN0ICYmIHRoaXMuX3BBdXRvVXBkYXRlKSB7XG5cdFx0XHR0aGlzLl9wVGFyZ2V0T2JqZWN0Ll9pQ29udHJvbGxlciA9IG51bGw7XG5cdFx0fVxuXHRcdHRoaXMuX3BUYXJnZXRPYmplY3QgPSB2YWw7XG5cblx0XHRpZiAodGhpcy5fcFRhcmdldE9iamVjdCAmJiB0aGlzLl9wQXV0b1VwZGF0ZSkge1xuXHRcdFx0dGhpcy5fcFRhcmdldE9iamVjdC5faUNvbnRyb2xsZXIgPSB0aGlzO1xuXHRcdH1cblx0XHR0aGlzLnBOb3RpZnlVcGRhdGUoKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgYXV0b1VwZGF0ZSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQXV0b1VwZGF0ZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYXV0b1VwZGF0ZSh2YWw6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9wQXV0b1VwZGF0ZSA9PSB2YWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5fcEF1dG9VcGRhdGUgPSB2YWw7XG5cblx0XHRpZiAodGhpcy5fcFRhcmdldE9iamVjdCkge1xuXHRcdFx0aWYgKHRoaXMuX3BUYXJnZXRPYmplY3QpIHtcblx0XHRcdFx0dGhpcy5fcFRhcmdldE9iamVjdC5faUNvbnRyb2xsZXIgPSB0aGlzO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fcFRhcmdldE9iamVjdC5faUNvbnRyb2xsZXIgPSBudWxsO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUoaW50ZXJwb2xhdGU6Ym9vbGVhbiA9IHRydWUpXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG59XG5cbmV4cG9ydCA9IENvbnRyb2xsZXJCYXNlOyJdfQ==