import GraphicsPathWinding		from "awayjs-display/lib/draw/GraphicsPathWinding";
import GraphicsPathCommand		from "awayjs-display/lib/draw/GraphicsPathCommand";
import Point					from "awayjs-core/lib/geom/Point";
/**

 * Defines the values to use for specifying path-drawing commands.
 * The values in this class are used by the Graphics.drawPath() method,
 *or stored in the commands vector of a GraphicsPath object.
 */
class GraphicsPath
{
    /**
     * The Vector of drawing commands as integers representing the path.
     */
    private _commands:Array<Array<number>>;
    /**
     * The Vector of Numbers containing the parameters used with the drawing commands.
     */
    private _data:Array<Array<number>>;

    private _draw_directions:Array<number>;
    private _contours_closed:Array<boolean>;

    /**
     * Specifies the winding rule using a value defined in the GraphicsPathWinding class.
     */
    private _winding:string;

    private _startPoint:Point;
    private _tmp_point:Point;
    private _cur_point:Point;
    private _direction:Point;
    private _isFill:boolean;

    constructor(commands:Array<number> = null, data:Array<number> = null, winding:string = GraphicsPathWinding.EVEN_ODD)
    {
        this._data=[];
        this._commands=[];
        this._draw_directions=[0];
        this._contours_closed=[false];

        if(commands!=null && data!=null){
            this._data[0]=data;
            this._commands[0]=commands;
        }
        else{
            this._data[0]=[];
            this._commands[0]=[];

        }

        this._direction=new Point(0, -1);
        this._startPoint=new Point();
        this._cur_point=new Point();
        this._tmp_point=new Point();
        this.isFill=false;
        this._winding=winding;
    }

    public get draw_directions():Array<number>
    {
        return this._draw_directions;
    }
    public get contours_closed():Array<boolean>
    {
        return this._contours_closed;
    }

    public get isFill():boolean
    {
        return this._isFill;
    }
    public set isFill(value:boolean)
    {
        this._isFill=value;
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
        this._cur_point.x=anchorX;
        this._cur_point.y=anchorY;
        this._data[this._data.length-1].push(controlX);
        this._data[this._data.length-1].push(controlY);
        this._data[this._data.length-1].push(anchorX);
        this._data[this._data.length-1].push(anchorY);

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
        if(this.isFill) {
            this._tmp_point.x = x - this._cur_point.x;
            this._tmp_point.y = y - this._cur_point.y;
            this._tmp_point.normalize();
            this._direction.x=this._tmp_point.x;
            this._direction.y=this._tmp_point.y;
            var degree_anchor:number = Math.atan2(this._tmp_point.x, this._tmp_point.y) * 180 / Math.PI;
            this._draw_directions[this._draw_directions.length-1]+=degree_anchor;
        }
        this._cur_point.x=x;
        this._cur_point.y=y;
    }

    public moveTo(x:number, y:number)
    {
        if(this._commands[this._commands.length-1].length>0){
            this.finalizeContour();
            this._draw_directions.push(0);
            this._contours_closed.push(false);
            this._commands.push([]);
            this._data.push([]);
        }
        this._startPoint.x = x;
        this._startPoint.y = y;
        this._cur_point.x = x;
        this._cur_point.y = y;
    }

    public finalizeContour()
    {
        if((this._startPoint.x != this._cur_point.x) || (this._startPoint.y != this._cur_point.y)){
            if(this.isFill) {
                this.lineTo(this._startPoint.x, this._startPoint.y);
            }
        }
        else{
            this._contours_closed[this._contours_closed.length-1]=true;
        }

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

export default GraphicsPath;