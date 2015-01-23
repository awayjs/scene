/**
 * FrameCommand associates a TimeLineobject with CommandProps.
 * CommandProps can be of different class, depending on the type of Asset that the TimeLineObject references to.
 */
var FrameCommand = (function () {
    function FrameCommand(tlObj) {
        this._tlObj = tlObj;
        this.commandProps = null;
        this._activate = true;
    }
    Object.defineProperty(FrameCommand.prototype, "activateObj", {
        get: function () {
            return this._activate;
        },
        set: function (newActve) {
            this._activate = newActve;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameCommand.prototype, "commandProps", {
        get: function () {
            return this._commandProps;
        },
        set: function (newProps) {
            this._commandProps = newProps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameCommand.prototype, "tlObj", {
        get: function () {
            return this._tlObj;
        },
        set: function (newtlObj) {
            this._tlObj = newtlObj;
        },
        enumerable: true,
        configurable: true
    });
    FrameCommand.prototype.execute = function (time, speed) {
        if (this.commandProps == undefined)
            return; //commandProps must always be defined
        // if this is a activate command, we call the apply function of the CommandProps
        if (this._activate) {
            this.tlObj.isActive = true;
            this.commandProps.apply(this.tlObj.asset, time, speed);
        }
        else {
            this.tlObj.isActive = false;
            this.commandProps.deactivate(this.tlObj.asset);
        }
    };
    return FrameCommand;
})();
module.exports = FrameCommand;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy90aW1lbGluZWRhdGEvZnJhbWVjb21tYW5kLnRzIl0sIm5hbWVzIjpbIkZyYW1lQ29tbWFuZCIsIkZyYW1lQ29tbWFuZC5jb25zdHJ1Y3RvciIsIkZyYW1lQ29tbWFuZC5hY3RpdmF0ZU9iaiIsIkZyYW1lQ29tbWFuZC5jb21tYW5kUHJvcHMiLCJGcmFtZUNvbW1hbmQudGxPYmoiLCJGcmFtZUNvbW1hbmQuZXhlY3V0ZSJdLCJtYXBwaW5ncyI6IkFBR0EsQUFJQTs7O0dBREc7SUFDRyxZQUFZO0lBTWRBLFNBTkVBLFlBQVlBLENBTUZBLEtBQW9CQTtRQUU1QkMsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDbEJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUNBLElBQUlBLENBQUNBO1FBQ3ZCQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFDQSxJQUFJQSxDQUFDQTtJQUN4QkEsQ0FBQ0E7SUFDREQsc0JBQVdBLHFDQUFXQTthQUl0QkE7WUFFSUUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDMUJBLENBQUNBO2FBUERGLFVBQXVCQSxRQUFnQkE7WUFFbkNFLElBQUlBLENBQUNBLFNBQVNBLEdBQUNBLFFBQVFBLENBQUNBO1FBQzVCQSxDQUFDQTs7O09BQUFGO0lBS0RBLHNCQUFXQSxzQ0FBWUE7YUFJdkJBO1lBRUlHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBO1FBQzlCQSxDQUFDQTthQVBESCxVQUF3QkEsUUFBeUJBO1lBRTdDRyxJQUFJQSxDQUFDQSxhQUFhQSxHQUFDQSxRQUFRQSxDQUFDQTtRQUNoQ0EsQ0FBQ0E7OztPQUFBSDtJQUtEQSxzQkFBV0EsK0JBQUtBO2FBQWhCQTtZQUVJSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUN2QkEsQ0FBQ0E7YUFDREosVUFBaUJBLFFBQXVCQTtZQUVwQ0ksSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDekJBLENBQUNBOzs7T0FKQUo7SUFLTUEsOEJBQU9BLEdBQWRBLFVBQWVBLElBQVdBLEVBQUVBLEtBQVlBO1FBRXBDSyxFQUFFQSxDQUFBQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxJQUFFQSxTQUFTQSxDQUFDQTtZQUM1QkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EscUNBQXFDQTtRQUVqREEsQUFDQUEsZ0ZBRGdGQTtRQUNoRkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7WUFDZkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsR0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDekJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO1FBQzNEQSxDQUFDQTtRQUVEQSxJQUFJQSxDQUFBQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxHQUFDQSxLQUFLQSxDQUFDQTtZQUMxQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDbkRBLENBQUNBO0lBQ0xBLENBQUNBO0lBQ0xMLG1CQUFDQTtBQUFEQSxDQXBEQSxBQW9EQ0EsSUFBQTtBQUVELEFBQXNCLGlCQUFiLFlBQVksQ0FBQyIsImZpbGUiOiJlbnRpdGllcy90aW1lbGluZWRhdGEvRnJhbWVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tYW5kUHJvcHNCYXNlID0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy90aW1lbGluZWRhdGEvQ29tbWFuZFByb3BzQmFzZVwiKTtcclxuaW1wb3J0IFRpbWVMaW5lT2JqZWN0ID0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy90aW1lbGluZWRhdGEvVGltZUxpbmVPYmplY3RcIik7XHJcblxyXG4vKipcclxuICogRnJhbWVDb21tYW5kIGFzc29jaWF0ZXMgYSBUaW1lTGluZW9iamVjdCB3aXRoIENvbW1hbmRQcm9wcy5cclxuICogQ29tbWFuZFByb3BzIGNhbiBiZSBvZiBkaWZmZXJlbnQgY2xhc3MsIGRlcGVuZGluZyBvbiB0aGUgdHlwZSBvZiBBc3NldCB0aGF0IHRoZSBUaW1lTGluZU9iamVjdCByZWZlcmVuY2VzIHRvLlxyXG4gKi9cclxuY2xhc3MgRnJhbWVDb21tYW5kXHJcbntcclxuICAgIHByaXZhdGUgX2NvbW1hbmRQcm9wczpDb21tYW5kUHJvcHNCYXNlOy8vIHRoaXMgaG9sZCB0aGUgZGF0YSBmb3IgdGhlIGNvbW1hbmRcclxuICAgIHByaXZhdGUgX3RsT2JqOlRpbWVMaW5lT2JqZWN0Oy8vIHRoZSBvYmplY3QgdG8gdXBkYXRlXHJcbiAgICBwcml2YXRlIF9hY3RpdmF0ZTpib29sZWFuOy8vIGlmIHRoaXMgaXMgZmFsc2UsIGl0IGlzIGEgcmVtb3ZlIGNvbW1hbmQuIHdlIGNhbGwgdGhlIGRlYWN0aXZhdGUgZnVuY3Rpb24gaW5zdGVhZCBvZiBhcHBseVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRsT2JqOlRpbWVMaW5lT2JqZWN0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3RsT2JqPXRsT2JqO1xyXG4gICAgICAgIHRoaXMuY29tbWFuZFByb3BzPW51bGw7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZhdGU9dHJ1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgYWN0aXZhdGVPYmoobmV3QWN0dmU6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmF0ZT1uZXdBY3R2ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgYWN0aXZhdGVPYmooKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2YXRlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBjb21tYW5kUHJvcHMobmV3UHJvcHM6Q29tbWFuZFByb3BzQmFzZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9jb21tYW5kUHJvcHM9bmV3UHJvcHM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1hbmRQcm9wcygpOkNvbW1hbmRQcm9wc0Jhc2VcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZFByb3BzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCB0bE9iaigpOlRpbWVMaW5lT2JqZWN0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RsT2JqO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCB0bE9iaihuZXd0bE9iajpUaW1lTGluZU9iamVjdClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl90bE9iaj1uZXd0bE9iajtcclxuICAgIH1cclxuICAgIHB1YmxpYyBleGVjdXRlKHRpbWU6bnVtYmVyLCBzcGVlZDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmNvbW1hbmRQcm9wcz09dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm47IC8vY29tbWFuZFByb3BzIG11c3QgYWx3YXlzIGJlIGRlZmluZWRcclxuXHJcbiAgICAgICAgLy8gaWYgdGhpcyBpcyBhIGFjdGl2YXRlIGNvbW1hbmQsIHdlIGNhbGwgdGhlIGFwcGx5IGZ1bmN0aW9uIG9mIHRoZSBDb21tYW5kUHJvcHNcclxuICAgICAgICBpZih0aGlzLl9hY3RpdmF0ZSl7XHJcbiAgICAgICAgICAgIHRoaXMudGxPYmouaXNBY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kUHJvcHMuYXBwbHkodGhpcy50bE9iai5hc3NldCwgdGltZSwgc3BlZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiB0aGlzIGlzIGEgcmVtb3ZlIGNvbW1hbmQsIHdlIGNhbGwgdGhlIGRlYWN0aXZhdGUgZnVuY3Rpb24gb2YgdGhlIENvbW1hbmRQcm9wc1xyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudGxPYmouaXNBY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZFByb3BzLmRlYWN0aXZhdGUodGhpcy50bE9iai5hc3NldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgPSBGcmFtZUNvbW1hbmQ7XHJcbiJdfQ==