/**
 * Defines the values to use for specifying path-drawing commands.
 * The values in this class are used by the Graphics.drawPath() method,
 *or stored in the commands vector of a GraphicsPath object.
 */
export declare class GraphicsPathCommand {
    /**
     * Represents the default "do nothing" command.
     */
    static NO_OP: number;
    /**
     * Specifies a drawing command that moves the current drawing position
     * to the x- and y-coordinates specified in the data vector.
     */
    static MOVE_TO: number;
    /**
     * Specifies a drawing command that draws a line from the current drawing position
     * to the x- and y-coordinates specified in the data vector.
     */
    static LINE_TO: number;
    /**
     *  Specifies a drawing command that draws a curve from the current drawing position
     *  to the x- and y-coordinates specified in the data vector, using a control point.
     */
    static CURVE_TO: number;
    /**
     *  Specifies a drawing command that draws a curve from the current drawing position
     *  to the x- and y-coordinates specified in the data vector, using a control point.
     */
    static BUILD_JOINT: number;
    static BUILD_ROUND_JOINT: number;
    /**
     * Specifies a "line to" drawing command,
     * but uses two sets of coordinates (four values) instead of one set.
     */
    static WIDE_LINE_TO: number;
    /**
     *   Specifies a "move to" drawing command,
     *   but uses two sets of coordinates (four values) instead of one set.
     */
    static WIDE_MOVE_TO: number;
    /**
     * Specifies a drawing command that draws a curve from the current drawing position
     * to the x- and y-coordinates specified in the data vector, using 2 control points.
     */
    static CUBIC_CURVE: number;
}
export default GraphicsPathCommand;
