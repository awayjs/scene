"use strict";
/**
 * Defines the values to use for specifying path-drawing commands.
 * The values in this class are used by the Graphics.drawPath() method,
 *or stored in the commands vector of a GraphicsPath object.
 */
var GraphicsPathCommand = (function () {
    function GraphicsPathCommand() {
    }
    /**
     * Represents the default "do nothing" command.
     */
    GraphicsPathCommand.NO_OP = 0;
    /**
     * Specifies a drawing command that moves the current drawing position
     * to the x- and y-coordinates specified in the data vector.
     */
    GraphicsPathCommand.MOVE_TO = 1;
    /**
     * Specifies a drawing command that draws a line from the current drawing position
     * to the x- and y-coordinates specified in the data vector.
     */
    GraphicsPathCommand.LINE_TO = 2;
    /**
     *  Specifies a drawing command that draws a curve from the current drawing position
     *  to the x- and y-coordinates specified in the data vector, using a control point.
     */
    GraphicsPathCommand.CURVE_TO = 3;
    /**
     *  Specifies a drawing command that draws a curve from the current drawing position
     *  to the x- and y-coordinates specified in the data vector, using a control point.
     */
    GraphicsPathCommand.BUILD_JOINT = 13;
    GraphicsPathCommand.BUILD_ROUND_JOINT = 14;
    /**
     * Specifies a "line to" drawing command,
     * but uses two sets of coordinates (four values) instead of one set.
     */
    GraphicsPathCommand.WIDE_LINE_TO = 4;
    /**
     *   Specifies a "move to" drawing command,
     *   but uses two sets of coordinates (four values) instead of one set.
     */
    GraphicsPathCommand.WIDE_MOVE_TO = 5;
    /**
     * Specifies a drawing command that draws a curve from the current drawing position
     * to the x- and y-coordinates specified in the data vector, using 2 control points.
     */
    GraphicsPathCommand.CUBIC_CURVE = 6;
    return GraphicsPathCommand;
}());
exports.GraphicsPathCommand = GraphicsPathCommand;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GraphicsPathCommand;
