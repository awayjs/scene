import { IGraphicsData } from "../draw/IGraphicsData";
import { GraphicsStrokeStyle } from "../draw/GraphicsStrokeStyle";
/**

 * Defines the values to use for specifying path-drawing commands.
 * The values in this class are used by the Graphics.drawPath() method,
 *or stored in the commands vector of a GraphicsPath object.
 */
export declare class GraphicsPath implements IGraphicsData {
    static data_type: string;
    /**
     * The Vector of drawing commands as integers representing the path.
     */
    private _commands;
    /**
     * The Vector of Numbers containing the parameters used with the drawing commands.
     */
    private _data;
    /**
     * Specifies the winding rule using a value defined in the GraphicsPathWinding class.
     */
    private _winding_rule;
    /**
     * The Vector of Numbers containing the parameters used with the drawing commands.
     */
    private _winding_directions;
    private _startPoint;
    private _cur_point;
    private _style;
    constructor(commands?: Array<number>, data?: Array<number>, winding_rule?: string);
    readonly data_type: string;
    style: IGraphicsData;
    fill(): IGraphicsData;
    stroke(): GraphicsStrokeStyle;
    readonly commands: Array<Array<number>>;
    readonly data: Array<Array<number>>;
    curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number): void;
    cubicCurveTo(controlX: number, controlY: number, control2X: number, control2Y: number, anchorX: number, anchorY: number): void;
    lineTo(x: number, y: number): void;
    moveTo(x: number, y: number): void;
    wideLineTo(x: number, y: number): void;
    wideMoveTo(x: number, y: number): void;
}
