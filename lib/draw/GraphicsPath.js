"use strict";
var GraphicsPathWinding_1 = require("../draw/GraphicsPathWinding");
var GraphicsPathCommand_1 = require("../draw/GraphicsPathCommand");
var GraphicsFillStyle_1 = require("../draw/GraphicsFillStyle");
var GraphicsStrokeStyle_1 = require("../draw/GraphicsStrokeStyle");
var Point_1 = require("@awayjs/core/lib/geom/Point");
/**

 * Defines the values to use for specifying path-drawing commands.
 * The values in this class are used by the Graphics.drawPath() method,
 *or stored in the commands vector of a GraphicsPath object.
 */
var GraphicsPath = (function () {
    function GraphicsPath(commands, data, winding_rule) {
        if (commands === void 0) { commands = null; }
        if (data === void 0) { data = null; }
        if (winding_rule === void 0) { winding_rule = GraphicsPathWinding_1.GraphicsPathWinding.EVEN_ODD; }
        this._data = [];
        this._commands = [];
        this._style = null;
        if (commands != null && data != null) {
            this._data[0] = data;
            this._commands[0] = commands;
        }
        else {
            this._data[0] = [];
            this._commands[0] = [];
        }
        this._startPoint = new Point_1.Point();
        this._cur_point = new Point_1.Point();
        this._winding_rule = winding_rule;
        this._winding_directions = [];
    }
    Object.defineProperty(GraphicsPath.prototype, "data_type", {
        get: function () {
            return GraphicsPath.data_type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPath.prototype, "style", {
        get: function () {
            return this._style;
        },
        set: function (value) {
            this._style = value;
        },
        enumerable: true,
        configurable: true
    });
    GraphicsPath.prototype.fill = function () {
        if (this._style == null)
            return null;
        if (this._style.data_type == GraphicsFillStyle_1.GraphicsFillStyle.data_type)
            return this._style;
        return null;
    };
    GraphicsPath.prototype.stroke = function () {
        if (this._style == null)
            return null;
        if (this._style.data_type == GraphicsStrokeStyle_1.GraphicsStrokeStyle.data_type)
            return this._style;
        return null;
    };
    Object.defineProperty(GraphicsPath.prototype, "commands", {
        get: function () {
            return this._commands;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPath.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    GraphicsPath.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) {
        // if controlpoint and anchor are same, we add lineTo command
        if ((controlX == anchorX) && (controlY == anchorY)) {
            this.lineTo(controlX, controlY);
            this.moveTo(anchorX, anchorY);
            return;
        }
        // if anchor is current point, but controlpoint is different, we lineto controlpoint
        if (((this._cur_point.x == anchorX) && (this._cur_point.y == anchorY)) && ((this._cur_point.x != controlX) || (this._cur_point.y != controlY))) {
            this.lineTo(controlX, controlY);
            this.moveTo(anchorX, anchorY);
            return;
        }
        // if controlpoint is current point, but anchor is different, we lineto anchor
        if (((this._cur_point.x != anchorX) || (this._cur_point.y != anchorY)) && ((this._cur_point.x == controlX) && (this._cur_point.y == controlY))) {
            this.lineTo(anchorX, anchorY);
            return;
        }
        // if controlpoint and anchor are same as current point
        if (((this._cur_point.x == anchorX) && (this._cur_point.y == anchorY)) && ((this._cur_point.x == controlX) && (this._cur_point.y == controlY))) {
            console.log("curveTo command not added because startpoint and endpoint are the same.");
            this.lineTo(anchorX, anchorY);
            return;
        }
        if (this._commands[this._commands.length - 1].length == 0) {
            // every contour must start with a moveTo command, so we make sure we have correct startpoint
            this._commands[this._commands.length - 1].push(GraphicsPathCommand_1.GraphicsPathCommand.MOVE_TO);
            this._data[this._data.length - 1].push(this._cur_point.x);
            this._data[this._data.length - 1].push(this._cur_point.y);
        }
        this._commands[this._commands.length - 1].push(GraphicsPathCommand_1.GraphicsPathCommand.CURVE_TO);
        this._data[this._data.length - 1].push(controlX);
        this._data[this._data.length - 1].push(controlY);
        this._data[this._data.length - 1].push(anchorX);
        this._data[this._data.length - 1].push(anchorY);
        this._cur_point.x = anchorX;
        this._cur_point.y = anchorY;
    };
    GraphicsPath.prototype.cubicCurveTo = function (controlX, controlY, control2X, control2Y, anchorX, anchorY) {
        console.log("cubicCurveTo not yet fully supported.");
        if ((this._cur_point.x == anchorX) && (this._cur_point.y == anchorY)) {
            console.log("curveTo command not added because startpoint and endpoint are the same.");
            return;
        }
        if (this._commands[this._commands.length - 1].length == 0) {
            // every contour must start with a moveTo command, so we make sure we have correct startpoint
            this._commands[this._commands.length - 1].push(GraphicsPathCommand_1.GraphicsPathCommand.MOVE_TO);
            this._data[this._data.length - 1].push(this._cur_point.x);
            this._data[this._data.length - 1].push(this._cur_point.y);
        }
        this._commands[this._commands.length - 1].push(GraphicsPathCommand_1.GraphicsPathCommand.CURVE_TO);
        this._data[this._data.length - 1].push(controlX);
        this._data[this._data.length - 1].push(controlY);
        this._data[this._data.length - 1].push(anchorX);
        this._data[this._data.length - 1].push(anchorY);
        this._cur_point.x = anchorX;
        this._cur_point.y = anchorY;
    };
    GraphicsPath.prototype.lineTo = function (x, y) {
        if ((this._cur_point.x == x) && (this._cur_point.y == y)) {
            console.log("lineTo command not added because startpoint and endpoint are the same.");
            return;
        }
        if (this._commands[this._commands.length - 1].length == 0) {
            // every contour must start with a moveTo command, so we make sure we have correct startpoint
            this._commands[this._commands.length - 1].push(GraphicsPathCommand_1.GraphicsPathCommand.MOVE_TO);
            this._data[this._data.length - 1].push(this._cur_point.x);
            this._data[this._data.length - 1].push(this._cur_point.y);
        }
        this._commands[this._commands.length - 1].push(GraphicsPathCommand_1.GraphicsPathCommand.LINE_TO);
        this._data[this._data.length - 1].push(x);
        this._data[this._data.length - 1].push(y);
        this._cur_point.x = x;
        this._cur_point.y = y;
    };
    GraphicsPath.prototype.moveTo = function (x, y) {
        if ((this._cur_point.x == x) && (this._cur_point.y == y)) {
            console.log("moveTo command not added because startpoint and endpoint are the same.");
            return;
        }
        // whenever a moveTo command apears, we start a new contour
        if (this._commands[this._commands.length - 1].length > 0) {
            this._commands.push([GraphicsPathCommand_1.GraphicsPathCommand.MOVE_TO]);
            this._data.push([x, y]);
        }
        this._startPoint.x = x;
        this._startPoint.y = y;
        this._cur_point.x = x;
        this._cur_point.y = y;
    };
    GraphicsPath.prototype.wideLineTo = function (x, y) {
        // not used
        /*
         this._commands.push(GraphicsPathCommand.WIDE_LINE_TO);
         this._data.push(0);
         this._data.push(0);
         this._data.push(x);
         this._data.push(y);
         */
    };
    GraphicsPath.prototype.wideMoveTo = function (x, y) {
        // not used
        /*
         this._commands.push(GraphicsPathCommand.WIDE_MOVE_TO);
         this._data.push(0);
         this._data.push(0);
         this._data.push(x);
         this._data.push(y);
         */
    };
    GraphicsPath.data_type = "[graphicsdata path]";
    return GraphicsPath;
}());
exports.GraphicsPath = GraphicsPath;
