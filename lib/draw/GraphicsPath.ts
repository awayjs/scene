import {GraphicsPathWinding}		from "../draw/GraphicsPathWinding";
import {GraphicsPathCommand}		from "../draw/GraphicsPathCommand";
import {IGraphicsData}		    from "../draw/IGraphicsData";
import {GraphicsFillStyle}		from "../draw/GraphicsFillStyle";
import {GraphicsStrokeStyle}		from "../draw/GraphicsStrokeStyle";

import {Point}					from "awayjs-core/lib/geom/Point";
/**

 * Defines the values to use for specifying path-drawing commands.
 * The values in this class are used by the Graphics.drawPath() method,
 *or stored in the commands vector of a GraphicsPath object.
 */
export class GraphicsPath implements IGraphicsData
{
    public static data_type:string = "[graphicsdata path]";
    /**
     * The Vector of drawing commands as integers representing the path.
     */
    private _commands:Array<Array<number>>;
    /**
     * The Vector of Numbers containing the parameters used with the drawing commands.
     */
    private _data:Array<Array<number>>;

    /**
     * Specifies the winding rule using a value defined in the GraphicsPathWinding class.
     */
    private _winding_rule:string;

    /**
     * The Vector of Numbers containing the parameters used with the drawing commands.
     */
    private _winding_directions:Array<number>;

    private _startPoint:Point;
    private _cur_point:Point;
    private _style:IGraphicsData;

    constructor(commands:Array<number> = null, data:Array<number> = null, winding_rule:string = GraphicsPathWinding.EVEN_ODD)
    {
        this._data=[];
        this._commands=[];
        this._style = null;

        if(commands!=null && data!=null){
            this._data[0]=data;
            this._commands[0]=commands;
        }
        else{
            this._data[0]=[];
            this._commands[0]=[];
        }
        this._startPoint=new Point();
        this._cur_point=new Point();
        this._winding_rule=winding_rule;
        this._winding_directions=[];
    }

    public get data_type():string
    {
        return GraphicsPath.data_type;
    }

    public get style():IGraphicsData
    {
        return this._style;
    }
    public set style(value:IGraphicsData)
    {
        this._style = value;
    }

    public fill():IGraphicsData
    {
        if (this._style==null)
            return null;
        if (this._style.data_type==GraphicsFillStyle.data_type)
            return this._style;
        return null;
    }
    public stroke():GraphicsStrokeStyle
    {
        if (this._style==null)
            return null;
        if (this._style.data_type==GraphicsStrokeStyle.data_type)
            return <GraphicsStrokeStyle>this._style;
        return null;
    }

    public get commands():Array<Array<number>>
    {
        return this._commands;
    }

    public get data():Array<Array<number>>
    {
        return this._data;
    }

    public curveTo(controlX:number, controlY:number, anchorX:number, anchorY:number)
    {
        if(this._commands[this._commands.length-1].length==0){
            // every contour must start with a moveTo command, so we make sure we have correct startpoint
            this._commands[this._commands.length-1].push(GraphicsPathCommand.MOVE_TO);
            this._data[this._data.length-1].push(this._cur_point.x);
            this._data[this._data.length-1].push(this._cur_point.y);
        }
        this._commands[this._commands.length-1].push(GraphicsPathCommand.CURVE_TO);
        /*
         if(this.isFill){
         this._tmp_point.x=anchorX-this._cur_point.x;
         this._tmp_point.y=anchorY-this._cur_point.y;
         this._tmp_point.normalize();

         var testpoint:Point=new Point(this._tmp_point.x, this._tmp_point.y);
         testpoint.normalize();
         var degree_anchor:number=Math.acos(this._tmp_point.x * this._direction.x + this._tmp_point.y * this._direction.y) * 180 / Math.PI;
         if(degree_anchor>180)degree_anchor-=360;
         //var degree_anchor:number=Math.atan2(this._tmp_point.x, this._tmp_point.y) * 180 / Math.PI;
         this._draw_directions[this._draw_directions.length-1]+=degree_anchor;
         this._tmp_point.x=controlX-this._cur_point.x;
         this._tmp_point.y=controlY-this._cur_point.y;
         this._tmp_point.normalize();
         //angle = atan2( a.x*b.y - a.y*b.x, a.x*b.x + a.y*b.y );
         var degree_control:number=(Math.atan2(this._tmp_point.x* testpoint.y - this._tmp_point.y* testpoint.x, this._tmp_point.x* testpoint.x + this._tmp_point.y* testpoint.y));
         if(degree_control>180)degree_control-=360;
         //var degree_control:number=(Math.atan2(this._tmp_point.x, this._tmp_point.y) * 180 / Math.PI);
         console.log("degree_control "+degree_control);
         console.log("degree_anchor "+degree_anchor);
         console.log("this._draw_directions[this._draw_directions.length-1] "+this._draw_directions[this._draw_directions.length-1]);
         this._direction.x=testpoint.x;
         this._direction.y=testpoint.y;
         if((degree_control)<0)
         this._data[this._data.length-1].push(1);
         else
         this._data[this._data.length-1].push(2);

         }
         else{
         this._data[this._data.length-1].push(1);
         }
         */
        this._data[this._data.length-1].push(controlX);
        this._data[this._data.length-1].push(controlY);
        this._data[this._data.length-1].push(anchorX);
        this._data[this._data.length-1].push(anchorY);
        this._cur_point.x=anchorX;
        this._cur_point.y=anchorY;

    }

    public lineTo(x:number, y:number)
    {
        if(this._commands[this._commands.length-1].length==0){
            // every contour must start with a moveTo command, so we make sure we have correct startpoint
            this._commands[this._commands.length-1].push(GraphicsPathCommand.MOVE_TO);
            this._data[this._data.length-1].push(this._cur_point.x);
            this._data[this._data.length-1].push(this._cur_point.y);
        }
        this._commands[this._commands.length-1].push(GraphicsPathCommand.LINE_TO);
        this._data[this._data.length-1].push(x);
        this._data[this._data.length-1].push(y);


        this._cur_point.x=x;
        this._cur_point.y=y;
    }

    public moveTo(x:number, y:number)
    {
        // whenever a moveTo command apears, we start a new contour
        if(this._commands[this._commands.length-1].length>0){
            this._commands.push([GraphicsPathCommand.MOVE_TO]);
            this._data.push([x, y]);
        }
        this._startPoint.x = x;
        this._startPoint.y = y;
        this._cur_point.x = x;
        this._cur_point.y = y;
    }

    public wideLineTo(x:number, y:number)
    {
        // not used
        /*
         this._commands.push(GraphicsPathCommand.WIDE_LINE_TO);
         this._data.push(0);
         this._data.push(0);
         this._data.push(x);
         this._data.push(y);
         */
    }

    public wideMoveTo(x:number, y:number)
    {
        // not used
        /*
         this._commands.push(GraphicsPathCommand.WIDE_MOVE_TO);
         this._data.push(0);
         this._data.push(0);
         this._data.push(x);
         this._data.push(y);
         */
    }

}