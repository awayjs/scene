import BitmapImage2D			= require("awayjs-core/lib/image/BitmapImage2D");
import Matrix					= require("awayjs-core/lib/geom/Matrix");

import CapsStyle				= require("awayjs-display/lib/draw/CapsStyle");
import GradientType				= require("awayjs-display/lib/draw/GradientType");
import GraphicsPathWinding		= require("awayjs-display/lib/draw/GraphicsPathWinding");
import IGraphicsData			= require("awayjs-display/lib/draw/IGraphicsData");
import InterpolationMethod		= require("awayjs-display/lib/draw/InterpolationMethod");
import JointStyle				= require("awayjs-display/lib/draw/JointStyle");
import LineScaleMode			= require("awayjs-display/lib/draw/LineScaleMode");
import TriangleCulling			= require("awayjs-display/lib/draw/TriangleCulling");
import SpreadMethod				= require("awayjs-display/lib/draw/SpreadMethod");

import GraphicsPath				= require("awayjs-display/lib/draw/GraphicsPath");
import GraphicsPathCommand		= require("awayjs-display/lib/draw/GraphicsPathCommand");
import DefaultMaterialManager	= require("awayjs-display/lib/managers/DefaultMaterialManager");
import MovieClip				= require("awayjs-display/lib/display/MovieClip");

import Point					= require("awayjs-core/lib/geom/Point")
import AttributesBuffer			= require("awayjs-core/lib/attributes/AttributesBuffer");
import AttributesView			= require("awayjs-core/lib/attributes/AttributesView");
import Mesh						= require("awayjs-display/lib/display/Mesh");
import Float3Attributes			= require("awayjs-core/lib/attributes/Float3Attributes");
import Float2Attributes			= require("awayjs-core/lib/attributes/Float2Attributes");


import PartialImplementationError		= require("awayjs-core/lib/errors/PartialImplementationError");
import TriangleElements = require("awayjs-display/lib/graphics/TriangleElements");
import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
/**
 * The Graphics class contains a set of methods that you can use to create a
 * vector shape. Display objects that support drawing include Sprite and Shape
 * objects. Each of these classes includes a <code>graphics</code> property
 * that is a Graphics object. The following are among those helper functions
 * provided for ease of use: <code>drawRect()</code>,
 * <code>drawRoundRect()</code>, <code>drawCircle()</code>, and
 * <code>drawEllipse()</code>.
 *
 * <p>You cannot create a Graphics object directly from ActionScript code. If
 * you call <code>new Graphics()</code>, an exception is thrown.</p>
 *
 * <p>The Graphics class is final; it cannot be subclassed.</p>
 */
class Graphics
{
	private _queued_fill_pathes:Array<GraphicsPath>;
	private _queued_stroke_pathes:Array<GraphicsPath>;

	public static _tess_obj:any;

	public _target:Mesh;

	private _active_fill_path:GraphicsPath;
	private _active_stroke_path:GraphicsPath;

	private _current_position:Point=new Point();

	constructor(target:Mesh){
		this._target=target;
		this._queued_fill_pathes=[];
		this._queued_stroke_pathes=[];
		this._active_fill_path=null;
		this._active_stroke_path=null;
		this._current_position=new Point();
	}
	/**
	 * Fills a drawing area with a bitmap image. The bitmap can be repeated or
	 * tiled to fill the area. The fill remains in effect until you call the
	 * <code>beginFill()</code>, <code>beginBitmapFill()</code>,
	 * <code>beginGradientFill()</code>, or <code>beginShaderFill()</code>
	 * method. Calling the <code>clear()</code> method clears the fill.
	 *
	 * <p>The application renders the fill whenever three or more points are
	 * drawn, or when the <code>endFill()</code> method is called. </p>
	 *
	 * @param bitmap A transparent or opaque bitmap image that contains the bits
	 *               to be displayed.
	 * @param matrix A matrix object(of the flash.geom.Matrix class), which you
	 *               can use to define transformations on the bitmap. For
	 *               example, you can use the following matrix to rotate a bitmap
	 *               by 45 degrees(pi/4 radians):
	 * @param repeat If <code>true</code>, the bitmap image repeats in a tiled
	 *               pattern. If <code>false</code>, the bitmap image does not
	 *               repeat, and the edges of the bitmap are used for any fill
	 *               area that extends beyond the bitmap.
	 *
	 *               <p>For example, consider the following bitmap(a 20 x
	 *               20-pixel checkerboard pattern):</p>
	 *
	 *               <p>When <code>repeat</code> is set to <code>true</code>(as
	 *               in the following example), the bitmap fill repeats the
	 *               bitmap:</p>
	 *
	 *               <p>When <code>repeat</code> is set to <code>false</code>,
	 *               the bitmap fill uses the edge pixels for the fill area
	 *               outside the bitmap:</p>
	 * @param smooth If <code>false</code>, upscaled bitmap images are rendered
	 *               by using a nearest-neighbor algorithm and look pixelated. If
	 *               <code>true</code>, upscaled bitmap images are rendered by
	 *               using a bilinear algorithm. Rendering by using the nearest
	 *               neighbor algorithm is faster.
	 */
	public beginBitmapFill(bitmap:BitmapImage2D, matrix:Matrix = null, repeat:boolean = true, smooth:boolean = false)
	{
		this.draw_fill();
		// start a new fill path
		this._active_fill_path=new GraphicsPath();
		this._active_fill_path.isFill=true;
		if(this._current_position.x!=0 || this._current_position.y!=0)
			this._active_fill_path.moveTo(this._current_position.x, this._current_position.y);
		this._queued_fill_pathes.push(this._active_fill_path);
	}

	/**
	 * Specifies a simple one-color fill that subsequent calls to other Graphics
	 * methods(such as <code>lineTo()</code> or <code>drawCircle()</code>) use
	 * when drawing. The fill remains in effect until you call the
	 * <code>beginFill()</code>, <code>beginBitmapFill()</code>,
	 * <code>beginGradientFill()</code>, or <code>beginShaderFill()</code>
	 * method. Calling the <code>clear()</code> method clears the fill.
	 *
	 * <p>The application renders the fill whenever three or more points are
	 * drawn, or when the <code>endFill()</code> method is called.</p>
	 *
	 * @param color The color of the fill(0xRRGGBB).
	 * @param alpha The alpha value of the fill(0.0 to 1.0).
	 */
	public beginFill(color:number /*int*/, alpha:number = 1)
	{
		this.draw_fill();
		// start a new fill path
		this._active_fill_path=new GraphicsPath();
		this._active_fill_path.isFill=true;
		if(this._current_position.x!=0 || this._current_position.y!=0)
			this._active_fill_path.moveTo(this._current_position.x, this._current_position.y);
		this._queued_fill_pathes.push(this._active_fill_path);

	}

	/**
	 * Specifies a gradient fill used by subsequent calls to other Graphics
	 * methods(such as <code>lineTo()</code> or <code>drawCircle()</code>) for
	 * the object. The fill remains in effect until you call the
	 * <code>beginFill()</code>, <code>beginBitmapFill()</code>,
	 * <code>beginGradientFill()</code>, or <code>beginShaderFill()</code>
	 * method. Calling the <code>clear()</code> method clears the fill.
	 *
	 * <p>The application renders the fill whenever three or more points are
	 * drawn, or when the <code>endFill()</code> method is called. </p>
	 *
	 * @param type                A value from the GradientType class that
	 *                            specifies which gradient type to use:
	 *                            <code>GradientType.LINEAR</code> or
	 *                            <code>GradientType.RADIAL</code>.
	 * @param colors              An array of RGB hexadecimal color values used
	 *                            in the gradient; for example, red is 0xFF0000,
	 *                            blue is 0x0000FF, and so on. You can specify
	 *                            up to 15 colors. For each color, specify a
	 *                            corresponding value in the alphas and ratios
	 *                            parameters.
	 * @param alphas              An array of alpha values for the corresponding
	 *                            colors in the colors array; valid values are 0
	 *                            to 1. If the value is less than 0, the default
	 *                            is 0. If the value is greater than 1, the
	 *                            default is 1.
	 * @param ratios              An array of color distribution ratios; valid
	 *                            values are 0-255. This value defines the
	 *                            percentage of the width where the color is
	 *                            sampled at 100%. The value 0 represents the
	 *                            left position in the gradient box, and 255
	 *                            represents the right position in the gradient
	 *                            box.
	 * @param matrix              A transformation matrix as defined by the
	 *                            flash.geom.Matrix class. The flash.geom.Matrix
	 *                            class includes a
	 *                            <code>createGradientBox()</code> method, which
	 *                            lets you conveniently set up the matrix for use
	 *                            with the <code>beginGradientFill()</code>
	 *                            method.
	 * @param spreadMethod        A value from the SpreadMethod class that
	 *                            specifies which spread method to use, either:
	 *                            <code>SpreadMethod.PAD</code>,
	 *                            <code>SpreadMethod.REFLECT</code>, or
	 *                            <code>SpreadMethod.REPEAT</code>.
	 *
	 *                            <p>For example, consider a simple linear
	 *                            gradient between two colors:</p>
	 *
	 *                            <p>This example uses
	 *                            <code>SpreadMethod.PAD</code> for the spread
	 *                            method, and the gradient fill looks like the
	 *                            following:</p>
	 *
	 *                            <p>If you use <code>SpreadMethod.REFLECT</code>
	 *                            for the spread method, the gradient fill looks
	 *                            like the following:</p>
	 *
	 *                            <p>If you use <code>SpreadMethod.REPEAT</code>
	 *                            for the spread method, the gradient fill looks
	 *                            like the following:</p>
	 * @param interpolationMethod A value from the InterpolationMethod class that
	 *                            specifies which value to use:
	 *                            <code>InterpolationMethod.LINEAR_RGB</code> or
	 *                            <code>InterpolationMethod.RGB</code>
	 *
	 *                            <p>For example, consider a simple linear
	 *                            gradient between two colors(with the
	 *                            <code>spreadMethod</code> parameter set to
	 *                            <code>SpreadMethod.REFLECT</code>). The
	 *                            different interpolation methods affect the
	 *                            appearance as follows: </p>
	 * @param focalPointRatio     A number that controls the location of the
	 *                            focal point of the gradient. 0 means that the
	 *                            focal point is in the center. 1 means that the
	 *                            focal point is at one border of the gradient
	 *                            circle. -1 means that the focal point is at the
	 *                            other border of the gradient circle. A value
	 *                            less than -1 or greater than 1 is rounded to -1
	 *                            or 1. For example, the following example shows
	 *                            a <code>focalPointRatio</code> set to 0.75:
	 * @throws ArgumentError If the <code>type</code> parameter is not valid.
	 */
	public beginGradientFill(type:GradientType, colors:Array<number /*int*/>, alphas:Array<number>, ratios:Array<number /*int*/>, matrix:Matrix = null, spreadMethod:string = "pad", interpolationMethod:string = "rgb", focalPointRatio:number = 0)
	{
		this.draw_fill();
		// start a new fill path
		this._active_fill_path=new GraphicsPath();
		this._active_fill_path.isFill=true;
		if(this._current_position.x!=0 || this._current_position.y!=0)
			this._active_fill_path.moveTo(this._current_position.x, this._current_position.y);
		this._queued_fill_pathes.push(this._active_fill_path);

	}

	/**
	 * Specifies a shader fill used by subsequent calls to other Graphics methods
	 * (such as <code>lineTo()</code> or <code>drawCircle()</code>) for the
	 * object. The fill remains in effect until you call the
	 * <code>beginFill()</code>, <code>beginBitmapFill()</code>,
	 * <code>beginGradientFill()</code>, or <code>beginShaderFill()</code>
	 * method. Calling the <code>clear()</code> method clears the fill.
	 *
	 * <p>The application renders the fill whenever three or more points are
	 * drawn, or when the <code>endFill()</code> method is called.</p>
	 *
	 * <p>Shader fills are not supported under GPU rendering; filled areas will
	 * be colored cyan.</p>
	 *
	 * @param shader The shader to use for the fill. This Shader instance is not
	 *               required to specify an image input. However, if an image
	 *               input is specified in the shader, the input must be provided
	 *               manually. To specify the input, set the <code>input</code>
	 *               property of the corresponding ShaderInput property of the
	 *               <code>Shader.data</code> property.
	 *
	 *               <p>When you pass a Shader instance as an argument the shader
	 *               is copied internally. The drawing fill operation uses that
	 *               internal copy, not a reference to the original shader. Any
	 *               changes made to the shader, such as changing a parameter
	 *               value, input, or bytecode, are not applied to the copied
	 *               shader that's used for the fill.</p>
	 * @param matrix A matrix object(of the flash.geom.Matrix class), which you
	 *               can use to define transformations on the shader. For
	 *               example, you can use the following matrix to rotate a shader
	 *               by 45 degrees(pi/4 radians):
	 *
	 *               <p>The coordinates received in the shader are based on the
	 *               matrix that is specified for the <code>matrix</code>
	 *               parameter. For a default(<code>null</code>) matrix, the
	 *               coordinates in the shader are local pixel coordinates which
	 *               can be used to sample an input.</p>
	 * @throws ArgumentError When the shader output type is not compatible with
	 *                       this operation(the shader must specify a
	 *                       <code>pixel3</code> or <code>pixel4</code> output).
	 * @throws ArgumentError When the shader specifies an image input that isn't
	 *                       provided.
	 * @throws ArgumentError When a ByteArray or Vector.<Number> instance is used
	 *                       as an input and the <code>width</code> and
	 *                       <code>height</code> properties aren't specified for
	 *                       the ShaderInput, or the specified values don't match
	 *                       the amount of data in the input object. See the
	 *                       <code>ShaderInput.input</code> property for more
	 *                       information.
	 */
//		public beginShaderFill(shader:Shader, matrix:Matrix = null)
//		{
//
//		}

	/**
	 * Clears the graphics that were drawn to this Graphics object, and resets
	 * fill and line style settings.
	 *
	 */
	public clear()
	{
		// todo: do this the correct way
		this._target.graphics.dispose();
	}

	/**
	 * Copies all of drawing commands from the source Graphics object into the
	 * calling Graphics object.
	 *
	 * @param sourceGraphics The Graphics object from which to copy the drawing
	 *                       commands.
	 */
	public copyFrom(sourceGraphics:Graphics)
	{
		sourceGraphics._target.graphics.copyTo(this._target.graphics);
	}

	/**
	 * Draws a cubic Bezier curve from the current drawing position to the
	 * specified anchor point. Cubic Bezier curves consist of two anchor points
	 * and two control points. The curve interpolates the two anchor points and
	 * curves toward the two control points.
	 *
	 * The four points you use to draw a cubic Bezier curve with the
	 * <code>cubicCurveTo()</code> method are as follows:
	 *
	 * <ul>
	 *   <li>The current drawing position is the first anchor point. </li>
	 *   <li>The anchorX and anchorY parameters specify the second anchor point.
	 *   </li>
	 *   <li>The <code>controlX1</code> and <code>controlY1</code> parameters
	 *   specify the first control point.</li>
	 *   <li>The <code>controlX2</code> and <code>controlY2</code> parameters
	 *   specify the second control point.</li>
	 * </ul>
	 *
	 * If you call the <code>cubicCurveTo()</code> method before calling the
	 * <code>moveTo()</code> method, your curve starts at position (0, 0).
	 *
	 * If the <code>cubicCurveTo()</code> method succeeds, the Flash runtime sets
	 * the current drawing position to (<code>anchorX</code>,
	 * <code>anchorY</code>). If the <code>cubicCurveTo()</code> method fails,
	 * the current drawing position remains unchanged.
	 *
	 * If your movie clip contains content created with the Flash drawing tools,
	 * the results of calls to the <code>cubicCurveTo()</code> method are drawn
	 * underneath that content.
	 *
	 * @param controlX1 Specifies the horizontal position of the first control
	 *                  point relative to the registration point of the parent
	 *                  display object.
	 * @param controlY1 Specifies the vertical position of the first control
	 *                  point relative to the registration point of the parent
	 *                  display object.
	 * @param controlX2 Specifies the horizontal position of the second control
	 *                  point relative to the registration point of the parent
	 *                  display object.
	 * @param controlY2 Specifies the vertical position of the second control
	 *                  point relative to the registration point of the parent
	 *                  display object.
	 * @param anchorX   Specifies the horizontal position of the anchor point
	 *                  relative to the registration point of the parent display
	 *                  object.
	 * @param anchorY   Specifies the vertical position of the anchor point
	 *                  relative to the registration point of the parent display
	 *                  object.
	 */
	public cubicCurveTo(controlX1:number, controlY1:number, controlX2:number, controlY2:number, anchorX:number, anchorY:number)
	{

		throw new PartialImplementationError("cubicCurveTo");
		/*
		 t = 0.5; // given example value
		 x = (1 - t) * (1 - t) * p[0].x + 2 * (1 - t) * t * p[1].x + t * t * p[2].x;
		 y = (1 - t) * (1 - t) * p[0].y + 2 * (1 - t) * t * p[1].y + t * t * p[2].y;

		 this.queued_command_types.push(Graphics.CMD_BEZIER);
		 this.queued_command_data.push(controlX1);
		 this.queued_command_data.push(controlY1);
		 this.queued_command_data.push(controlX2);
		 this.queued_command_data.push(controlY2);
		 this.queued_command_data.push(anchorX);
		 this.queued_command_data.push(anchorY);

		 // todo: somehow convert cubic bezier curve into 2 quadric curves...

		 this.draw_direction+=0;
		 */

	}

	/**
	 * Draws a curve using the current line style from the current drawing
	 * position to(anchorX, anchorY) and using the control point that
	 * (<code>controlX</code>, <code>controlY</code>) specifies. The current
	 * drawing position is then set to(<code>anchorX</code>,
	 * <code>anchorY</code>). If the movie clip in which you are drawing contains
	 * content created with the Flash drawing tools, calls to the
	 * <code>curveTo()</code> method are drawn underneath this content. If you
	 * call the <code>curveTo()</code> method before any calls to the
	 * <code>moveTo()</code> method, the default of the current drawing position
	 * is(0, 0). If any of the parameters are missing, this method fails and the
	 * current drawing position is not changed.
	 *
	 * <p>The curve drawn is a quadratic Bezier curve. Quadratic Bezier curves
	 * consist of two anchor points and one control point. The curve interpolates
	 * the two anchor points and curves toward the control point. </p>
	 *
	 * @param controlX A number that specifies the horizontal position of the
	 *                 control point relative to the registration point of the
	 *                 parent display object.
	 * @param controlY A number that specifies the vertical position of the
	 *                 control point relative to the registration point of the
	 *                 parent display object.
	 * @param anchorX  A number that specifies the horizontal position of the
	 *                 next anchor point relative to the registration point of
	 *                 the parent display object.
	 * @param anchorY  A number that specifies the vertical position of the next
	 *                 anchor point relative to the registration point of the
	 *                 parent display object.
	 */
	public curveTo(controlX:number, controlY:number, anchorX:number, anchorY:number)
	{

		if(this._active_fill_path!=null){
			this._active_fill_path.curveTo(controlX, controlY, anchorX, anchorY);
		}
		if(this._active_stroke_path!=null){
			this._active_stroke_path.curveTo(controlX, controlY, anchorX, anchorY);
		}
		this._current_position.x=anchorX;
		this._current_position.y=anchorY;
		/*
		this.queued_command_types.push(Graphics.CMD_CURVE);
		this.queued_command_data.push(controlX);
		this.queued_command_data.push(controlY);
		this.queued_command_data.push(anchorX);
		this.queued_command_data.push(anchorY);
		*/
	}

	/**
	 * Draws a circle. Set the line style, fill, or both before you call the
	 * <code>drawCircle()</code> method, by calling the <code>linestyle()</code>,
	 * <code>lineGradientStyle()</code>, <code>beginFill()</code>,
	 * <code>beginGradientFill()</code>, or <code>beginBitmapFill()</code>
	 * method.
	 *
	 * @param x      The <i>x</i> location of the center of the circle relative
	 *               to the registration point of the parent display object(in
	 *               pixels).
	 * @param y      The <i>y</i> location of the center of the circle relative
	 *               to the registration point of the parent display object(in
	 *               pixels).
	 * @param radius The radius of the circle(in pixels).
	 */
	public drawCircle(x:number, y:number, radius:number)
	{
		var radius2=radius*1.065;
		if(this._active_fill_path!=null){
			this._active_fill_path.moveTo(x-radius, y);
			for(var i=8; i>=0;i--){

				var degree = (i) *(360/8)*Math.PI/180;
				var degree2 = degree + ((360/16)*Math.PI/180);
				this._active_fill_path.curveTo(x-(Math.cos(degree2)*radius2), y+(Math.sin(degree2)*radius2),x-(Math.cos(degree)*radius), y+(Math.sin(degree)*radius));
			}
		}
		if(this._active_stroke_path!=null){
			this._active_stroke_path.moveTo(x, y+radius);
			var radius2=radius*0.93;
			this._active_stroke_path.curveTo(x-(radius2), y+(radius2), x-radius, y);
			this._active_stroke_path.curveTo(x-(radius2), y-(radius2), x, y-radius);
			this._active_stroke_path.curveTo(x+(radius2), y-(radius2), x+radius, y);
			this._active_stroke_path.curveTo(x+(radius2), y+(radius2), x, y+radius);
		}
	}

	/**
	 * Draws an ellipse. Set the line style, fill, or both before you call the
	 * <code>drawEllipse()</code> method, by calling the
	 * <code>linestyle()</code>, <code>lineGradientStyle()</code>,
	 * <code>beginFill()</code>, <code>beginGradientFill()</code>, or
	 * <code>beginBitmapFill()</code> method.
	 *
	 * @param x      The <i>x</i> location of the top-left of the bounding-box of
	 *               the ellipse relative to the registration point of the parent
	 *               display object(in pixels).
	 * @param y      The <i>y</i> location of the top left of the bounding-box of
	 *               the ellipse relative to the registration point of the parent
	 *               display object(in pixels).
	 * @param width  The width of the ellipse(in pixels).
	 * @param height The height of the ellipse(in pixels).
	 */
	public drawEllipse(x:number, y:number, width:number, height:number)
	{
		width/=2;
		height/=2;
		if(this._active_fill_path!=null){

			this._active_fill_path.moveTo(x, y+height);
			this._active_fill_path.curveTo(x-(width), y+(height), x-width, y);
			this._active_fill_path.curveTo(x-(width), y-(height), x, y-height);
			this._active_fill_path.curveTo(x+(width), y-(height), x+width, y);
			this._active_fill_path.curveTo(x+(width), y+(height), x, y+height);
		}
		if(this._active_stroke_path!=null){
			this._active_stroke_path.moveTo(x, y+height);
			this._active_stroke_path.curveTo(x-(width), y+(height), x-width, y);
			this._active_stroke_path.curveTo(x-(width), y-(height), x, y-height);
			this._active_stroke_path.curveTo(x+(width), y-(height), x+width, y);
			this._active_stroke_path.curveTo(x+(width), y+(height), x, y+height);
		}

	}

	/**
	 * Submits a series of IGraphicsData instances for drawing. This method
	 * accepts a Vector containing objects including paths, fills, and strokes
	 * that implement the IGraphicsData interface. A Vector of IGraphicsData
	 * instances can refer to a part of a shape, or a complex fully defined set
	 * of data for rendering a complete shape.
	 *
	 * <p> Graphics paths can contain other graphics paths. If the
	 * <code>graphicsData</code> Vector includes a path, that path and all its
	 * sub-paths are rendered during this operation. </p>
	 *
	 */
	public drawGraphicsData(graphicsData:Array<IGraphicsData>)
	{
		//this.draw_fill();
		/*
		 for (var i:number=0; i<graphicsData.length; i++){
		 //todo
		 if(graphicsData[i].dataType=="beginFill"){

		 }
		 else if(graphicsData[i].dataType=="endFill"){

		 }
		 else if(graphicsData[i].dataType=="endFill"){

		 }
		 else if(graphicsData[i].dataType=="Path"){

		 }

		 }
		 */

	}

	/**
	 * Submits a series of commands for drawing. The <code>drawPath()</code>
	 * method uses vector arrays to consolidate individual <code>moveTo()</code>,
	 * <code>lineTo()</code>, and <code>curveTo()</code> drawing commands into a
	 * single call. The <code>drawPath()</code> method parameters combine drawing
	 * commands with x- and y-coordinate value pairs and a drawing direction. The
	 * drawing commands are values from the GraphicsPathCommand class. The x- and
	 * y-coordinate value pairs are Numbers in an array where each pair defines a
	 * coordinate location. The drawing direction is a value from the
	 * GraphicsPathWinding class.
	 *
	 * <p> Generally, drawings render faster with <code>drawPath()</code> than
	 * with a series of individual <code>lineTo()</code> and
	 * <code>curveTo()</code> methods. </p>
	 *
	 * <p> The <code>drawPath()</code> method uses a uses a floating computation
	 * so rotation and scaling of shapes is more accurate and gives better
	 * results. However, curves submitted using the <code>drawPath()</code>
	 * method can have small sub-pixel alignment errors when used in conjunction
	 * with the <code>lineTo()</code> and <code>curveTo()</code> methods. </p>
	 *
	 * <p> The <code>drawPath()</code> method also uses slightly different rules
	 * for filling and drawing lines. They are: </p>
	 *
	 * <ul>
	 *   <li>When a fill is applied to rendering a path:
	 * <ul>
	 *   <li>A sub-path of less than 3 points is not rendered.(But note that the
	 * stroke rendering will still occur, consistent with the rules for strokes
	 * below.)</li>
	 *   <li>A sub-path that isn't closed(the end point is not equal to the
	 * begin point) is implicitly closed.</li>
	 * </ul>
	 * </li>
	 *   <li>When a stroke is applied to rendering a path:
	 * <ul>
	 *   <li>The sub-paths can be composed of any number of points.</li>
	 *   <li>The sub-path is never implicitly closed.</li>
	 * </ul>
	 * </li>
	 * </ul>
	 *
	 * @param winding Specifies the winding rule using a value defined in the
	 *                GraphicsPathWinding class.
	 */
	public drawPath(commands:Array<number /*int*/>, data:Array<number>, winding:GraphicsPathWinding)
	{
		//todo
		/*
		 if(this._active_fill_path!=null){
		 this._active_fill_path.curveTo(controlX, controlY, anchorX, anchorY);
		 }
		 if(this._active_stroke_path!=null){
		 this._active_stroke_path.curveTo(controlX, controlY, anchorX, anchorY);
		 }
		 this._current_position.x=anchorX;
		 this._current_position.y=anchorY;
		 */

	}

	/**
	 * Draws a rectangle. Set the line style, fill, or both before you call the
	 * <code>drawRect()</code> method, by calling the <code>linestyle()</code>,
	 * <code>lineGradientStyle()</code>, <code>beginFill()</code>,
	 * <code>beginGradientFill()</code>, or <code>beginBitmapFill()</code>
	 * method.
	 *
	 * @param x      A number indicating the horizontal position relative to the
	 *               registration point of the parent display object(in pixels).
	 * @param y      A number indicating the vertical position relative to the
	 *               registration point of the parent display object(in pixels).
	 * @param width  The width of the rectangle(in pixels).
	 * @param height The height of the rectangle(in pixels).
	 * @throws ArgumentError If the <code>width</code> or <code>height</code>
	 *                       parameters are not a number
	 *                      (<code>Number.NaN</code>).
	 */
	public drawRect(x:number, y:number, width:number, height:number)
	{
		if(this._active_fill_path!=null){
			this._active_fill_path.moveTo(x, y);
			this._active_fill_path.lineTo(x+width, y);
			this._active_fill_path.lineTo(x+width, y+height);
			this._active_fill_path.lineTo(x, y+height);
			this._active_fill_path.lineTo(x, y);
		}
		if(this._active_stroke_path!=null){
			this._active_stroke_path.moveTo(x, y);
			this._active_stroke_path.lineTo(x+width, y);
			this._active_stroke_path.lineTo(x+width, y+height);
			this._active_stroke_path.lineTo(x, y+height);
			this._active_stroke_path.lineTo(x, y);
		}
	}

	/**
	 * Draws a rounded rectangle. Set the line style, fill, or both before you
	 * call the <code>drawRoundRect()</code> method, by calling the
	 * <code>linestyle()</code>, <code>lineGradientStyle()</code>,
	 * <code>beginFill()</code>, <code>beginGradientFill()</code>, or
	 * <code>beginBitmapFill()</code> method.
	 *
	 * @param x             A number indicating the horizontal position relative
	 *                      to the registration point of the parent display
	 *                      object(in pixels).
	 * @param y             A number indicating the vertical position relative to
	 *                      the registration point of the parent display object
	 *                     (in pixels).
	 * @param width         The width of the round rectangle(in pixels).
	 * @param height        The height of the round rectangle(in pixels).
	 * @param ellipseWidth  The width of the ellipse used to draw the rounded
	 *                      corners(in pixels).
	 * @param ellipseHeight The height of the ellipse used to draw the rounded
	 *                      corners(in pixels). Optional; if no value is
	 *                      specified, the default value matches that provided
	 *                      for the <code>ellipseWidth</code> parameter.
	 * @throws ArgumentError If the <code>width</code>, <code>height</code>,
	 *                       <code>ellipseWidth</code> or
	 *                       <code>ellipseHeight</code> parameters are not a
	 *                       number(<code>Number.NaN</code>).
	 */
	public drawRoundRect(x:number, y:number, width:number, height:number, ellipseWidth:number, ellipseHeight:number = NaN)
	{

		if(!ellipseHeight){
			ellipseHeight=ellipseWidth;
		}
		if(this._active_fill_path!=null){
			this._active_fill_path.moveTo(x+ellipseWidth, y);
			this._active_fill_path.lineTo(x+width-ellipseWidth, y);
			this._active_fill_path.curveTo(x+width, y, x+width, y+ellipseHeight);
			this._active_fill_path.lineTo(x+width, y+height-ellipseHeight);
			this._active_fill_path.curveTo(x+width, y+height, x+width-ellipseWidth, y+height);
			this._active_fill_path.lineTo(x+ellipseWidth, y+height);
			this._active_fill_path.curveTo(x, y+height, x, y+height-ellipseHeight);
			this._active_fill_path.lineTo(x, y+ellipseHeight);
			this._active_fill_path.curveTo(x, y, x+ellipseWidth, y);
		}
		if(this._active_stroke_path!=null){
			this._active_stroke_path.moveTo(x+ellipseWidth, y);
			this._active_stroke_path.lineTo(x+width-ellipseWidth, y);
			this._active_stroke_path.curveTo(x+width, y, x+width, y+ellipseHeight);
			this._active_stroke_path.lineTo(x+width, y+height-ellipseHeight);
			this._active_stroke_path.curveTo(x+width, y+height, x+width-ellipseWidth, y+height);
			this._active_stroke_path.lineTo(x+ellipseWidth, y+height);
			this._active_stroke_path.curveTo(x, y+height, x, y+height-ellipseHeight);
			this._active_stroke_path.lineTo(x, y+ellipseHeight);
			this._active_stroke_path.curveTo(x, y, x+ellipseWidth, y);
		}
	}

	//public drawRoundRectComplex(x:Float, y:Float, width:Float, height:Float, topLeftRadius:Float, topRightRadius:Float, bottomLeftRadius:Float, bottomRightRadius:Float):Void;

	/**
	 * Renders a set of triangles, typically to distort bitmaps and give them a
	 * three-dimensional appearance. The <code>drawTriangles()</code> method maps
	 * either the current fill, or a bitmap fill, to the triangle faces using a
	 * set of(u,v) coordinates.
	 *
	 * <p> Any type of fill can be used, but if the fill has a transform matrix
	 * that transform matrix is ignored. </p>
	 *
	 * <p> A <code>uvtData</code> parameter improves texture mapping when a
	 * bitmap fill is used. </p>
	 *
	 * @param culling Specifies whether to render triangles that face in a
	 *                specified direction. This parameter prevents the rendering
	 *                of triangles that cannot be seen in the current view. This
	 *                parameter can be set to any value defined by the
	 *                TriangleCulling class.
	 */
	public drawTriangles(vertices:Array<number>, indices:Array<number /*int*/> = null, uvtData:Array<number> = null, culling:TriangleCulling = null)
	{
		if(this._active_fill_path!=null){
			//todo
		}
		if(this._active_stroke_path!=null){
			//todo
		}

	}

	/**
	 * Applies a fill to the lines and curves that were added since the last call
	 * to the <code>beginFill()</code>, <code>beginGradientFill()</code>, or
	 * <code>beginBitmapFill()</code> method. Flash uses the fill that was
	 * specified in the previous call to the <code>beginFill()</code>,
	 * <code>beginGradientFill()</code>, or <code>beginBitmapFill()</code>
	 * method. If the current drawing position does not equal the previous
	 * position specified in a <code>moveTo()</code> method and a fill is
	 * defined, the path is closed with a line and then filled.
	 *
	 */
	public endFill()
	{
		this.draw_strokes();
		this.draw_fill();
		this._active_fill_path=null;
		this._active_stroke_path=null;

	}

	/**
	 * Specifies a bitmap to use for the line stroke when drawing lines.
	 *
	 * <p>The bitmap line style is used for subsequent calls to Graphics methods
	 * such as the <code>lineTo()</code> method or the <code>drawCircle()</code>
	 * method. The line style remains in effect until you call the
	 * <code>lineStyle()</code> or <code>lineGradientStyle()</code> methods, or
	 * the <code>lineBitmapStyle()</code> method again with different parameters.
	 * </p>
	 *
	 * <p>You can call the <code>lineBitmapStyle()</code> method in the middle of
	 * drawing a path to specify different styles for different line segments
	 * within a path. </p>
	 *
	 * <p>Call the <code>lineStyle()</code> method before you call the
	 * <code>lineBitmapStyle()</code> method to enable a stroke, or else the
	 * value of the line style is <code>undefined</code>.</p>
	 *
	 * <p>Calls to the <code>clear()</code> method set the line style back to
	 * <code>undefined</code>. </p>
	 *
	 * @param bitmap The bitmap to use for the line stroke.
	 * @param matrix An optional transformation matrix as defined by the
	 *               flash.geom.Matrix class. The matrix can be used to scale or
	 *               otherwise manipulate the bitmap before applying it to the
	 *               line style.
	 * @param repeat Whether to repeat the bitmap in a tiled fashion.
	 * @param smooth Whether smoothing should be applied to the bitmap.
	 */
	public lineBitmapStyle(bitmap:BitmapImage2D, matrix:Matrix = null, repeat:boolean = true, smooth:boolean = false)
	{
		// start a new stroke path
		this._active_stroke_path=new GraphicsPath();
		if(this._current_position.x!=0 || this._current_position.y!=0)
			this._active_stroke_path.moveTo(this._current_position.x, this._current_position.y);
		this._queued_stroke_pathes.push(this._active_stroke_path);

	}

	/**
	 * Specifies a gradient to use for the stroke when drawing lines.
	 *
	 * <p>The gradient line style is used for subsequent calls to Graphics
	 * methods such as the <code>lineTo()</code> methods or the
	 * <code>drawCircle()</code> method. The line style remains in effect until
	 * you call the <code>lineStyle()</code> or <code>lineBitmapStyle()</code>
	 * methods, or the <code>lineGradientStyle()</code> method again with
	 * different parameters. </p>
	 *
	 * <p>You can call the <code>lineGradientStyle()</code> method in the middle
	 * of drawing a path to specify different styles for different line segments
	 * within a path. </p>
	 *
	 * <p>Call the <code>lineStyle()</code> method before you call the
	 * <code>lineGradientStyle()</code> method to enable a stroke, or else the
	 * value of the line style is <code>undefined</code>.</p>
	 *
	 * <p>Calls to the <code>clear()</code> method set the line style back to
	 * <code>undefined</code>. </p>
	 *
	 * @param type                A value from the GradientType class that
	 *                            specifies which gradient type to use, either
	 *                            GradientType.LINEAR or GradientType.RADIAL.
	 * @param colors              An array of RGB hexadecimal color values used
	 *                            in the gradient; for example, red is 0xFF0000,
	 *                            blue is 0x0000FF, and so on. You can specify
	 *                            up to 15 colors. For each color, specify a
	 *                            corresponding value in the alphas and ratios
	 *                            parameters.
	 * @param alphas              An array of alpha values for the corresponding
	 *                            colors in the colors array; valid values are 0
	 *                            to 1. If the value is less than 0, the default
	 *                            is 0. If the value is greater than 1, the
	 *                            default is 1.
	 * @param ratios              An array of color distribution ratios; valid
	 *                            values are 0-255. This value defines the
	 *                            percentage of the width where the color is
	 *                            sampled at 100%. The value 0 represents the
	 *                            left position in the gradient box, and 255
	 *                            represents the right position in the gradient
	 *                            box.
	 * @param matrix              A transformation matrix as defined by the
	 *                            flash.geom.Matrix class. The flash.geom.Matrix
	 *                            class includes a
	 *                            <code>createGradientBox()</code> method, which
	 *                            lets you conveniently set up the matrix for use
	 *                            with the <code>lineGradientStyle()</code>
	 *                            method.
	 * @param spreadMethod        A value from the SpreadMethod class that
	 *                            specifies which spread method to use:
	 * @param interpolationMethod A value from the InterpolationMethod class that
	 *                            specifies which value to use. For example,
	 *                            consider a simple linear gradient between two
	 *                            colors(with the <code>spreadMethod</code>
	 *                            parameter set to
	 *                            <code>SpreadMethod.REFLECT</code>). The
	 *                            different interpolation methods affect the
	 *                            appearance as follows:
	 * @param focalPointRatio     A number that controls the location of the
	 *                            focal point of the gradient. The value 0 means
	 *                            the focal point is in the center. The value 1
	 *                            means the focal point is at one border of the
	 *                            gradient circle. The value -1 means that the
	 *                            focal point is at the other border of the
	 *                            gradient circle. Values less than -1 or greater
	 *                            than 1 are rounded to -1 or 1. The following
	 *                            image shows a gradient with a
	 *                            <code>focalPointRatio</code> of -0.75:
	 */
	public lineGradientStyle(type:GradientType, colors:Array<number /*int*/>, alphas:Array<number>, ratios:Array<number>, matrix:Matrix = null, spreadMethod:SpreadMethod = null, interpolationMethod:InterpolationMethod = null, focalPointRatio:number = 0)
	{
		// start a new stroke path
		this._active_stroke_path=new GraphicsPath();
		if(this._current_position.x!=0 || this._current_position.y!=0)
			this._active_stroke_path.moveTo(this._current_position.x, this._current_position.y);
		this._queued_stroke_pathes.push(this._active_stroke_path);

	}

	/**
	 * Specifies a shader to use for the line stroke when drawing lines.
	 *
	 * <p>The shader line style is used for subsequent calls to Graphics methods
	 * such as the <code>lineTo()</code> method or the <code>drawCircle()</code>
	 * method. The line style remains in effect until you call the
	 * <code>lineStyle()</code> or <code>lineGradientStyle()</code> methods, or
	 * the <code>lineBitmapStyle()</code> method again with different parameters.
	 * </p>
	 *
	 * <p>You can call the <code>lineShaderStyle()</code> method in the middle of
	 * drawing a path to specify different styles for different line segments
	 * within a path. </p>
	 *
	 * <p>Call the <code>lineStyle()</code> method before you call the
	 * <code>lineShaderStyle()</code> method to enable a stroke, or else the
	 * value of the line style is <code>undefined</code>.</p>
	 *
	 * <p>Calls to the <code>clear()</code> method set the line style back to
	 * <code>undefined</code>. </p>
	 *
	 * @param shader The shader to use for the line stroke.
	 * @param matrix An optional transformation matrix as defined by the
	 *               flash.geom.Matrix class. The matrix can be used to scale or
	 *               otherwise manipulate the bitmap before applying it to the
	 *               line style.
	 */
//		public lineShaderStyle(shader:Shader, matrix:Matrix = null)
//		{
//
//		}

	/**
	 * Specifies a line style used for subsequent calls to Graphics methods such
	 * as the <code>lineTo()</code> method or the <code>drawCircle()</code>
	 * method. The line style remains in effect until you call the
	 * <code>lineGradientStyle()</code> method, the
	 * <code>lineBitmapStyle()</code> method, or the <code>lineStyle()</code>
	 * method with different parameters.
	 *
	 * <p>You can call the <code>lineStyle()</code> method in the middle of
	 * drawing a path to specify different styles for different line segments
	 * within the path.</p>
	 *
	 * <p><b>Note: </b>Calls to the <code>clear()</code> method set the line
	 * style back to <code>undefined</code>.</p>
	 *
	 * <p><b>Note: </b>Flash Lite 4 supports only the first three parameters
	 * (<code>thickness</code>, <code>color</code>, and <code>alpha</code>).</p>
	 *
	 * @param thickness    An integer that indicates the thickness of the line in
	 *                     points; valid values are 0-255. If a number is not
	 *                     specified, or if the parameter is undefined, a line is
	 *                     not drawn. If a value of less than 0 is passed, the
	 *                     default is 0. The value 0 indicates hairline
	 *                     thickness; the maximum thickness is 255. If a value
	 *                     greater than 255 is passed, the default is 255.
	 * @param color        A hexadecimal color value of the line; for example,
	 *                     red is 0xFF0000, blue is 0x0000FF, and so on. If a
	 *                     value is not indicated, the default is 0x000000
	 *                    (black). Optional.
	 * @param alpha        A number that indicates the alpha value of the color
	 *                     of the line; valid values are 0 to 1. If a value is
	 *                     not indicated, the default is 1(solid). If the value
	 *                     is less than 0, the default is 0. If the value is
	 *                     greater than 1, the default is 1.
	 * @param pixelHinting(Not supported in Flash Lite 4) A Boolean value that
	 *                     specifies whether to hint strokes to full pixels. This
	 *                     affects both the position of anchors of a curve and
	 *                     the line stroke size itself. With
	 *                     <code>pixelHinting</code> set to <code>true</code>,
	 *                     line widths are adjusted to full pixel widths. With
	 *                     <code>pixelHinting</code> set to <code>false</code>,
	 *                     disjoints can appear for curves and straight lines.
	 *                     For example, the following illustrations show how
	 *                     Flash Player or Adobe AIR renders two rounded
	 *                     rectangles that are identical, except that the
	 *                     <code>pixelHinting</code> parameter used in the
	 *                     <code>lineStyle()</code> method is set differently
	 *                    (the images are scaled by 200%, to emphasize the
	 *                     difference):
	 *
	 *                     <p>If a value is not supplied, the line does not use
	 *                     pixel hinting.</p>
	 * @param scaleMode   (Not supported in Flash Lite 4) A value from the
	 *                     LineScaleMode class that specifies which scale mode to
	 *                     use:
	 *                     <ul>
	 *                       <li> <code>LineScaleMode.NORMAL</code> - Always
	 *                     scale the line thickness when the object is scaled
	 *                    (the default). </li>
	 *                       <li> <code>LineScaleMode.NONE</code> - Never scale
	 *                     the line thickness. </li>
	 *                       <li> <code>LineScaleMode.VERTICAL</code> - Do not
	 *                     scale the line thickness if the object is scaled
	 *                     vertically <i>only</i>. For example, consider the
	 *                     following circles, drawn with a one-pixel line, and
	 *                     each with the <code>scaleMode</code> parameter set to
	 *                     <code>LineScaleMode.VERTICAL</code>. The circle on the
	 *                     left is scaled vertically only, and the circle on the
	 *                     right is scaled both vertically and horizontally:
	 *                     </li>
	 *                       <li> <code>LineScaleMode.HORIZONTAL</code> - Do not
	 *                     scale the line thickness if the object is scaled
	 *                     horizontally <i>only</i>. For example, consider the
	 *                     following circles, drawn with a one-pixel line, and
	 *                     each with the <code>scaleMode</code> parameter set to
	 *                     <code>LineScaleMode.HORIZONTAL</code>. The circle on
	 *                     the left is scaled horizontally only, and the circle
	 *                     on the right is scaled both vertically and
	 *                     horizontally:   </li>
	 *                     </ul>
	 * @param caps        (Not supported in Flash Lite 4) A value from the
	 *                     CapsStyle class that specifies the type of caps at the
	 *                     end of lines. Valid values are:
	 *                     <code>CapsStyle.NONE</code>,
	 *                     <code>CapsStyle.ROUND</code>, and
	 *                     <code>CapsStyle.SQUARE</code>. If a value is not
	 *                     indicated, Flash uses round caps.
	 *
	 *                     <p>For example, the following illustrations show the
	 *                     different <code>capsStyle</code> settings. For each
	 *                     setting, the illustration shows a blue line with a
	 *                     thickness of 30(for which the <code>capsStyle</code>
	 *                     applies), and a superimposed black line with a
	 *                     thickness of 1(for which no <code>capsStyle</code>
	 *                     applies): </p>
	 * @param joints      (Not supported in Flash Lite 4) A value from the
	 *                     JointStyle class that specifies the type of joint
	 *                     appearance used at angles. Valid values are:
	 *                     <code>JointStyle.BEVEL</code>,
	 *                     <code>JointStyle.MITER</code>, and
	 *                     <code>JointStyle.ROUND</code>. If a value is not
	 *                     indicated, Flash uses round joints.
	 *
	 *                     <p>For example, the following illustrations show the
	 *                     different <code>joints</code> settings. For each
	 *                     setting, the illustration shows an angled blue line
	 *                     with a thickness of 30(for which the
	 *                     <code>jointStyle</code> applies), and a superimposed
	 *                     angled black line with a thickness of 1(for which no
	 *                     <code>jointStyle</code> applies): </p>
	 *
	 *                     <p><b>Note:</b> For <code>joints</code> set to
	 *                     <code>JointStyle.MITER</code>, you can use the
	 *                     <code>miterLimit</code> parameter to limit the length
	 *                     of the miter.</p>
	 * @param miterLimit  (Not supported in Flash Lite 4) A number that
	 *                     indicates the limit at which a miter is cut off. Valid
	 *                     values range from 1 to 255(and values outside that
	 *                     range are rounded to 1 or 255). This value is only
	 *                     used if the <code>jointStyle</code> is set to
	 *                     <code>"miter"</code>. The <code>miterLimit</code>
	 *                     value represents the length that a miter can extend
	 *                     beyond the point at which the lines meet to form a
	 *                     joint. The value expresses a factor of the line
	 *                     <code>thickness</code>. For example, with a
	 *                     <code>miterLimit</code> factor of 2.5 and a
	 *                     <code>thickness</code> of 10 pixels, the miter is cut
	 *                     off at 25 pixels.
	 *
	 *                     <p>For example, consider the following angled lines,
	 *                     each drawn with a <code>thickness</code> of 20, but
	 *                     with <code>miterLimit</code> set to 1, 2, and 4.
	 *                     Superimposed are black reference lines showing the
	 *                     meeting points of the joints:</p>
	 *
	 *                     <p>Notice that a given <code>miterLimit</code> value
	 *                     has a specific maximum angle for which the miter is
	 *                     cut off. The following table lists some examples:</p>
	 */
	public lineStyle(thickness:number = 0, color:number /*int*/ = 0, alpha:number = 1, pixelHinting:boolean = false, scaleMode:LineScaleMode = null, caps:CapsStyle = null, joints:JointStyle = null, miterLimit:number = 3)
	{

		// start a new stroke path
		this._active_stroke_path=new GraphicsPath();
		if(this._current_position.x!=0 || this._current_position.y!=0)
			this._active_stroke_path.moveTo(this._current_position.x, this._current_position.y);
		this._queued_stroke_pathes.push(this._active_stroke_path);
	}

	/**
	 * Draws a line using the current line style from the current drawing
	 * position to(<code>x</code>, <code>y</code>); the current drawing position
	 * is then set to(<code>x</code>, <code>y</code>). If the display object in
	 * which you are drawing contains content that was created with the Flash
	 * drawing tools, calls to the <code>lineTo()</code> method are drawn
	 * underneath the content. If you call <code>lineTo()</code> before any calls
	 * to the <code>moveTo()</code> method, the default position for the current
	 * drawing is(<i>0, 0</i>). If any of the parameters are missing, this
	 * method fails and the current drawing position is not changed.
	 *
	 * @param x A number that indicates the horizontal position relative to the
	 *          registration point of the parent display object(in pixels).
	 * @param y A number that indicates the vertical position relative to the
	 *          registration point of the parent display object(in pixels).
	 */
	public lineTo(x:number, y:number)
	{
		if(this._active_fill_path!=null){
			this._active_fill_path.lineTo(x, y);
		}
		if(this._active_stroke_path!=null){
			this._active_stroke_path.lineTo(x, y);
		}
		this._current_position.x=x;
		this._current_position.y=y;

	}

	/**
	 * Moves the current drawing position to(<code>x</code>, <code>y</code>). If
	 * any of the parameters are missing, this method fails and the current
	 * drawing position is not changed.
	 *
	 * @param x A number that indicates the horizontal position relative to the
	 *          registration point of the parent display object(in pixels).
	 * @param y A number that indicates the vertical position relative to the
	 *          registration point of the parent display object(in pixels).
	 */
	public moveTo(x:number, y:number)
	{

		if(this._active_fill_path!=null){
			this._active_fill_path.moveTo(x, y);
		}
		if(this._active_stroke_path!=null){
			this._active_stroke_path.moveTo(x, y);
		}
		this._current_position.x=x;
		this._current_position.y=y;
	}

	public draw_strokes(){
		if(this._active_stroke_path==null)return;
		this._active_stroke_path.finalizeContour();
		var contour_commands:Array<Array<number> >=this._active_stroke_path.commands;
		var contour_data:Array<Array<number> >=this._active_stroke_path.data;
		var contour_closed:Array<boolean >=this._active_stroke_path.contours_closed;

		var commands:Array<number>;
		var data:Array<number>;
		var i:number=0;
		var k:number=0;
		var vert_cnt:number=0;
		var data_cnt:number=0;
		var draw_started:boolean=false;
		var final_vert_list:Array<number> = [];
		var final_vert_cnt:number=0;
		var lastPoint:Point=new Point();
		var start_point:Point=new Point();
		var end_point:Point=new Point();
		var start_left:Point=new Point();
		var start_right:Point=new Point();
		var ctr_left:Point=new Point();
		var ctr_right:Point=new Point();
		var ctr_left2:Point=new Point();
		var ctr_right2:Point=new Point();
		var end_left:Point=new Point();
		var end_right:Point=new Point();
		var tmp_point:Point=new Point();
		var tmp_point2:Point=new Point();
		var first_point:Point=new Point();
		var first_point_set:boolean=false;
		var closed:boolean=false;
		var thickness:number=3;
		var tessVerts:Array<number>=[];

		Graphics._tess_obj.newTess(1024 * 512);
		for(k=0; k<contour_commands.length; k++) {
			var contour_points:Array<Point>=[];
			var contour_types:Array<number>=[];
			commands = contour_commands[k];
			data = contour_data[k];
			closed=contour_closed[k];
			vert_cnt = 0;
			data_cnt = 0;
			draw_started=false;
			first_point_set=false;
			for (i = 0; i < commands.length; i++) {
				switch (commands[i]) {
					case GraphicsPathCommand.MOVE_TO:
						lastPoint.x = data[data_cnt++];
						lastPoint.y = data[data_cnt++];
						break;

					case GraphicsPathCommand.LINE_TO:
						contour_types.push(GraphicsPathCommand.LINE_TO);
						end_point.x = data[data_cnt++];
						end_point.y = data[data_cnt++];

						tmp_point.x = -1*(end_point.y-lastPoint.y);
						tmp_point.y = end_point.x-lastPoint.x;
						tmp_point.normalize();

						// rotate point
						start_left.x  = lastPoint.x + (tmp_point.x * thickness);
						start_left.y  = lastPoint.y + (tmp_point.y * thickness);
						start_right.x = lastPoint.x - (tmp_point.x * thickness);
						start_right.y = lastPoint.y - (tmp_point.y * thickness);
						// rotate point
						end_left.x  = end_point.x + (tmp_point.x * thickness);
						end_left.y  = end_point.y + (tmp_point.y * thickness);
						end_right.x = end_point.x - (tmp_point.x * thickness);
						end_right.y = end_point.y - (tmp_point.y * thickness);

						lastPoint.x=end_point.x;
						lastPoint.y=end_point.y;

						contour_points.push(new Point(start_right.x, start_right.y));
						contour_points.push(new Point(start_left.x, start_left.y));
						contour_points.push(new Point(end_right.x, end_right.y));
						contour_points.push(new Point(end_left.x, end_left.y));

						break;
					case GraphicsPathCommand.CURVE_TO:
						contour_types.push(GraphicsPathCommand.CURVE_TO);
						contour_types.push(GraphicsPathCommand.CURVE_TO_2);
						var curve_direction:number = data[data_cnt++];
						var control_x:number = data[data_cnt++];
						var control_y:number = data[data_cnt++];
						var end_x:number = data[data_cnt++];
						var end_y:number = data[data_cnt++];


						tmp_point.x = -1*(control_y-lastPoint.y);
						tmp_point.y = control_x-lastPoint.x;
						tmp_point.normalize();

						// rotate point
						start_left.x  = lastPoint.x + (tmp_point.x * thickness);
						start_left.y  = lastPoint.y + (tmp_point.y * thickness);
						start_right.x = lastPoint.x - (tmp_point.x * thickness);
						start_right.y = lastPoint.y - (tmp_point.y * thickness);
						// rotate point
						ctr_left.x  = control_x + (tmp_point.x * thickness);
						ctr_left.y  = control_y + (tmp_point.y * thickness);
						ctr_right.x = control_x - (tmp_point.x * thickness);
						ctr_right.y = control_y - (tmp_point.y * thickness);

						contour_points.push(new Point(start_right.x, start_right.y));
						contour_points.push(new Point(start_left.x, start_left.y));
						contour_points.push(new Point(ctr_right.x, ctr_right.y));
						contour_points.push(new Point(ctr_left.x, ctr_left.y));

						tmp_point.x = -1*(end_y-control_y);
						tmp_point.y = end_x-control_x;
						tmp_point.normalize();

						ctr_left2.x  = control_x + (tmp_point.x * thickness);
						ctr_left2.y  = control_y + (tmp_point.y * thickness);
						ctr_right2.x = control_x - (tmp_point.x * thickness);
						ctr_right2.y = control_y - (tmp_point.y * thickness);

						end_left.x  = end_x + (tmp_point.x * thickness);
						end_left.y  = end_y + (tmp_point.y * thickness);
						end_right.x = end_x - (tmp_point.x * thickness);
						end_right.y = end_y - (tmp_point.y * thickness);

						contour_points.push(new Point(ctr_right2.x, ctr_right2.y));
						contour_points.push(new Point(ctr_left2.x, ctr_left2.y));
						contour_points.push(new Point(end_right.x, end_right.y));
						contour_points.push(new Point(end_left.x, end_left.y));

						lastPoint.x=end_x;
						lastPoint.y=end_y;
						break;
				}
			}
			var con_length:number=contour_points.length/4;
			var next_start_right:Point=new Point();
			var next_start_left:Point=new Point();
			var next_end_right:Point=new Point();
			var next_end_left:Point=new Point();
			var prevLeft:Point;
			var prevRight:Point;
			for (i = 0; i < con_length; i++) {
				start_right = contour_points[i * 4];
				start_left = contour_points[i * 4 + 1];
				end_right = contour_points[i * 4 + 2];
				end_left = contour_points[i * 4 + 3];
				var nextIdx:number = i + 1;
				if (i >= con_length - 1) {
					// last segment
					if (closed) {
						nextIdx = 0;
					}
					else {
						nextIdx = -1;
					}
				}
				if (nextIdx >= 0) {
					next_start_right = contour_points[nextIdx * 4];
					next_start_left = contour_points[nextIdx * 4 + 1];
					next_end_right = contour_points[nextIdx * 4 + 2];
					next_end_left = contour_points[nextIdx * 4 + 3];

					var cur_vertical:boolean = false;
					var next_vertical:boolean = false;
					var cur_horizontal:boolean = false;
					var next_horizontal:boolean = false;

					tmp_point.x = end_right.x - start_right.x;
					tmp_point.y = end_right.y - start_right.y;
					var factor1:number=0;
					var offsetY1:number=0;
					if (tmp_point.x == 0)cur_vertical = true;
					else if (tmp_point.y == 0)cur_horizontal = true;
					else {
						factor1 = tmp_point.y / tmp_point.x;
						offsetY1 = -(factor1 * start_right.x - start_right.y);
					}

					tmp_point.x = next_end_right.x - next_start_right.x;
					tmp_point.y = next_end_right.y - next_start_right.y;
					var factor2:number=0;
					var offsetY2:number=0;
					if (tmp_point.x == 0)next_vertical = true;
					else if (tmp_point.y == 0)next_horizontal = true;
					else {
						factor2 = tmp_point.y / tmp_point.x;
						offsetY2 = -(factor2 * next_start_right.x - next_start_right.y);
					}


					tmp_point.x = end_left.x - start_left.x;
					tmp_point.y = end_left.y - start_left.y;
					var factor3:number=0;
					var offsetY3:number=0;
					if (tmp_point.x == 0)cur_vertical = true;
					else if (tmp_point.y == 0)cur_horizontal = true;
					else {
						factor3 = tmp_point.y / tmp_point.x;
						offsetY3 = -(factor3 * start_left.x - start_left.y);
					}

					tmp_point.x = next_end_left.x - next_start_left.x;
					tmp_point.y = next_end_left.y - next_start_left.y;
					var factor4:number=0;
					var offsetY4:number=0;
					if (tmp_point.x == 0)next_vertical = true;
					else if (tmp_point.y == 0)next_horizontal = true;
					else {
						factor4 = tmp_point.y / tmp_point.x;
						offsetY4 = -(factor4 * next_start_left.x - next_start_left.y);
					}
					if ((cur_vertical && cur_horizontal)||(next_horizontal && next_vertical)) console.log("ERROR");
					if((factor1==factor2)||(factor3==factor4)) {
						console.log("STRAIGHT LINE factor same");
						console.log("factor = "+ factor1);
						console.log("factor = "+ factor2);
						console.log("factor = "+ factor3);
						console.log("factor = "+ factor4);
					}
					//else
					if ((cur_horizontal && next_horizontal)||(cur_vertical && next_vertical)) console.log("STRAIGHT LINE");
					else {
						if ((cur_vertical)&&(next_horizontal)) {
							console.log("(cur_vertical)&&(next_horizontal)");
							next_start_right.x = end_right.x;
							end_right.y = next_start_right.y;
							next_start_left.x = end_left.x;
							end_left.y = next_start_left.y;
						}
						else if ((cur_vertical)&&(!next_horizontal)) {
							console.log("(cur_vertical)&&(!next_horizontal)");
							next_start_right.x = end_right.x = start_right.x;
							next_start_right.y = end_right.y = factor2 * start_right.x + offsetY2;
							next_start_left.x = end_left.x = start_left.x;
							next_start_left.y = end_left.y = factor4 * start_left.x + offsetY4;
						}
						else if ((!cur_vertical)&&(next_horizontal)) {
							console.log("(!cur_vertical)&&(next_horizontal)");
							next_start_right.y = end_right.y = next_start_right.y;
							next_start_right.x = end_right.x = (next_start_right.y - offsetY1)/factor1;
							next_start_left.y = end_left.y = next_start_left.y;
							next_start_left.x = end_left.x = (next_start_left.y - offsetY3)/factor3;
						}
						else if ((next_vertical)&&(cur_horizontal)) {
							console.log("(next_vertical)&&(cur_horizontal)");
							end_right.x = next_start_right.x;
							next_start_right.y = end_right.y;
							end_left.x = next_start_left.x;
							next_start_left.y = end_left.y;
						}
						else if ((next_vertical)&&(!cur_horizontal)) {
							console.log("(next_vertical)&&(!cur_horizontal)");
							next_start_right.x = end_right.x = next_start_right.x;
							next_start_right.y = end_right.y = factor1 * next_start_right.x + offsetY1;
							next_start_left.x = end_left.x = next_start_left.x;
							next_start_left.y = end_left.y = factor3 * next_start_left.x + offsetY3;

						}
						else if ((!next_vertical)&&(cur_horizontal)) {
							console.log("(!next_vertical)&&(!cur_horizontal)");
							next_start_right.y = end_right.y;
							next_start_right.x = end_right.x = (end_right.y - offsetY2)/factor2;
							next_start_left.y = end_left.y;
							next_start_left.x = end_left.x = (end_left.y - offsetY4)/factor4;

						}
						else {
							console.log("else");
							console.log("factor1 - factor2 "+(factor1 - factor2));
							console.log("offsetY1 - offsetY2 "+(offsetY1 - offsetY2));
							console.log("factor3 - factor4 "+(factor3 - factor4));
							console.log("offsetY3 - offsetY4 "+(offsetY3 - offsetY4));

							next_start_right.x = end_right.x = -((offsetY1 - offsetY2) / (factor1 - factor2));
							next_start_right.y = end_right.y = factor1 * end_right.x + offsetY1;
							next_start_left.x = end_left.x = -((offsetY3 - offsetY4) / (factor3 - factor4));
							next_start_left.y = end_left.y = factor3 * end_left.x + offsetY3;
						}
					}

					next_start_right.x = end_right.x;
					next_start_right.y = end_right.y;
					next_start_left.x = end_left.x;
					next_start_left.y = end_left.y;


					// calculate the correct end points
				}
			}

			for (i = 0; i < con_length; i++) {
				if(contour_types[i]==GraphicsPathCommand.CURVE_TO_2)
					continue;
				start_right = contour_points[i * 4];
				start_left = contour_points[i * 4 + 1];
				if(contour_types[i]==GraphicsPathCommand.CURVE_TO) {
					i++;
					ctr_right = contour_points[i * 4];
					ctr_left = contour_points[i * 4 + 1];
					end_right = contour_points[i * 4 + 2];
					end_left = contour_points[i * 4 + 3];

					var finished_curves:Array<Point>=[];
					var finished_curves_types:Array<number>=[];
					var test_concave_curves:Array<Point>=[];
					var test_convex_curves:Array<Point>=[];
					var curve_sign:boolean=this.getSign(start_right.x, start_right.y,  ctr_right.x, ctr_right.y, end_right.x, end_right.y )>0;
					var curve_sign2:number=-1;
					var curve_sign3:number=1;
					tessVerts.length=0;
					if(curve_sign){
						var subdivided:Array<number> = [];
						var subdivided2:Array<number> = [];
						this.subdivideCurve(start_right.x, start_right.y, ctr_right.x, ctr_right.y, end_right.x, end_right.y, start_left.x, start_left.y, ctr_left.x, ctr_left.y, end_left.x, end_left.y, subdivided, subdivided2);
						for(var sc:number=0; sc<subdivided.length/6; sc++) {
							finished_curves.push(new Point(subdivided[sc * 6], subdivided[sc * 6 + 1]));
							finished_curves.push(new Point(subdivided[sc * 6 + 2], subdivided[sc * 6 + 3]));
							finished_curves.push(new Point(subdivided[sc * 6 + 4], subdivided[sc * 6 + 5]));
							finished_curves_types.push(-1);
							tessVerts.push(subdivided[sc * 6], subdivided[sc * 6 + 1]);
							tessVerts.push(subdivided[sc * 6 + 4], subdivided[sc * 6 + 5]);
						}
						for(var sc:number=(subdivided2.length/6)-1; sc>=0; sc--) {
							finished_curves.push(new Point(subdivided2[sc * 6 + 4], subdivided2[sc * 6 + 5]));
							finished_curves.push(new Point(subdivided2[sc * 6 + 2], subdivided2[sc * 6 + 3]));
							finished_curves.push(new Point(subdivided2[sc * 6], subdivided2[sc * 6 + 1]));
							finished_curves_types.push(1);
							tessVerts.push(subdivided2[sc * 6 + 4], subdivided2[sc * 6 + 5]);
							tessVerts.push(subdivided2[sc * 6 + 2], subdivided2[sc * 6 + 3]);
							tessVerts.push(subdivided2[sc * 6], subdivided2[sc * 6 + 1]);
						}
					}
					else{
						var subdivided:Array<number> = [];
						var subdivided2:Array<number> = [];
						this.subdivideCurve(start_left.x, start_left.y, ctr_left.x, ctr_left.y, end_left.x, end_left.y, start_right.x, start_right.y, ctr_right.x, ctr_right.y, end_right.x, end_right.y,subdivided, subdivided2);
						for(var sc:number=0; sc<subdivided.length/6; sc++) {
							finished_curves.push(new Point(subdivided[sc * 6], subdivided[sc * 6 + 1]));
							finished_curves.push(new Point(subdivided[sc * 6 + 2], subdivided[sc * 6 + 3]));
							finished_curves.push(new Point(subdivided[sc * 6 + 4], subdivided[sc * 6 + 5]));
							finished_curves_types.push(-1);
							tessVerts.push(subdivided[sc * 6], subdivided[sc * 6 + 1]);
							tessVerts.push(subdivided[sc * 6 + 4], subdivided[sc * 6 + 5]);
						}
						for(var sc:number=(subdivided2.length/6)-1; sc>=0; sc--) {
							finished_curves.push(new Point(subdivided2[sc * 6 + 4], subdivided2[sc * 6 + 5]));
							finished_curves.push(new Point(subdivided2[sc * 6 + 2], subdivided2[sc * 6 + 3]));
							finished_curves.push(new Point(subdivided2[sc * 6], subdivided2[sc * 6 + 1]));
							finished_curves_types.push(1);
							tessVerts.push(subdivided2[sc * 6 + 4], subdivided2[sc * 6 + 5]);
							tessVerts.push(subdivided2[sc * 6 + 2], subdivided2[sc * 6 + 3]);
							tessVerts.push(subdivided2[sc * 6], subdivided2[sc * 6 + 1]);
						}
					}
					if(tessVerts.length>0){

						var verticesF32 = new Float32Array(tessVerts);
						if (Graphics._tess_obj == null) {
							console.log("No libtess2 tesselator available.\nMake it available using Graphics._tess_obj=new TESS();");
							return;
						}
						Graphics._tess_obj.addContour(verticesF32, 2, 8, tessVerts.length / 2);
					}
					var t:number=0;
					for(t=0; t<finished_curves_types.length;t++){

						 final_vert_list[final_vert_cnt++] = finished_curves[t*3].x;
						 final_vert_list[final_vert_cnt++] = finished_curves[t*3].y;;
						 final_vert_list[final_vert_cnt++] = finished_curves_types[t];
						 final_vert_list[final_vert_cnt++] = 1.0;
						 final_vert_list[final_vert_cnt++] = 1.0;
						 final_vert_list[final_vert_cnt++] = 1.0;
						 final_vert_list[final_vert_cnt++] = 1.0;
						 final_vert_list[final_vert_cnt++] = finished_curves[t*3+1].x;
						 final_vert_list[final_vert_cnt++] = finished_curves[t*3+1].y;
						 final_vert_list[final_vert_cnt++] = finished_curves_types[t];
						 final_vert_list[final_vert_cnt++] = 0.5;
						 final_vert_list[final_vert_cnt++] = 0.0;
						 final_vert_list[final_vert_cnt++] = 1.0;
						 final_vert_list[final_vert_cnt++] = 1.0;
						 final_vert_list[final_vert_cnt++] = finished_curves[t*3+2].x;
						 final_vert_list[final_vert_cnt++] = finished_curves[t*3+2].y;
						 final_vert_list[final_vert_cnt++] = finished_curves_types[t];
						 final_vert_list[final_vert_cnt++] = 0.0;
						 final_vert_list[final_vert_cnt++] = 0.0;
						 final_vert_list[final_vert_cnt++] = 1.0;
						 final_vert_list[final_vert_cnt++] = 1.0;

					}
				}
				else{
					end_right = contour_points[i * 4 + 2];
					end_left = contour_points[i * 4 + 3];
					final_vert_list[final_vert_cnt++] = start_right.x;
					final_vert_list[final_vert_cnt++] = start_right.y;
					final_vert_list[final_vert_cnt++] = 1;
					final_vert_list[final_vert_cnt++] = 2.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = start_left.x;
					final_vert_list[final_vert_cnt++] = start_left.y;
					final_vert_list[final_vert_cnt++] = 1;
					final_vert_list[final_vert_cnt++] = 2.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = end_left.x;
					final_vert_list[final_vert_cnt++] = end_left.y;
					final_vert_list[final_vert_cnt++] = 1;
					final_vert_list[final_vert_cnt++] = 2.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = 0.0;

					final_vert_list[final_vert_cnt++] = start_right.x;
					final_vert_list[final_vert_cnt++] = start_right.y;
					final_vert_list[final_vert_cnt++] = 1;
					final_vert_list[final_vert_cnt++] = 2.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = end_left.x;
					final_vert_list[final_vert_cnt++] = end_left.y;
					final_vert_list[final_vert_cnt++] = 1;
					final_vert_list[final_vert_cnt++] = 2.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = end_right.x;
					final_vert_list[final_vert_cnt++] = end_right.y;
					final_vert_list[final_vert_cnt++] = 1;
					final_vert_list[final_vert_cnt++] = 2.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = 0.0;
					final_vert_list[final_vert_cnt++] = 0.0;
				}

			}
		}
		/*
		 for (i = 0; i < final_vert_list.length/7; ++i)
		 console.log("final verts stroke "+i+" = "+final_vert_list[i*7]+" / "+final_vert_list[i*7+1]);
		 */
		Graphics._tess_obj.tesselate(4/*TESS.WINDING_ODD*/, 0/*TESS.ELEMENT_POLYGONS*/, 3, 2, null);

		var verts:Array<number>=[];
		var all_verts:Array<Point>=[];
		var vertIndicess:Array<number>=[];
		var elems:Array<number>=[];
		verts = Graphics._tess_obj.getVertices();
		elems = Graphics._tess_obj.getElements();


		var numVerts:number = verts.length / 2;
		var numElems:number = elems.length / 3;
		for (i = 0; i < numVerts; ++i)
			all_verts.push(new Point(verts[i * 2], verts[i * 2 + 1]));

		for (i = 0; i < numElems; ++i) {
			var p1 = elems[i * 3];
			var p2 = elems[i * 3 + 1];
			var p3 = elems[i * 3 + 2];

			final_vert_list[final_vert_cnt++] = all_verts[p3].x;
			final_vert_list[final_vert_cnt++] = all_verts[p3].y;
			final_vert_list[final_vert_cnt++] = 1;
			final_vert_list[final_vert_cnt++] = 2.0;
			final_vert_list[final_vert_cnt++] = 0.0;
			final_vert_list[final_vert_cnt++] = 1.0;
			final_vert_list[final_vert_cnt++] = 1.0;
			final_vert_list[final_vert_cnt++] = all_verts[p2].x;
			final_vert_list[final_vert_cnt++] = all_verts[p2].y;
			final_vert_list[final_vert_cnt++] = 1;
			final_vert_list[final_vert_cnt++] = 2.0;
			final_vert_list[final_vert_cnt++] = 0.0;
			final_vert_list[final_vert_cnt++] = 1.0;
			final_vert_list[final_vert_cnt++] = 1.0;
			final_vert_list[final_vert_cnt++] = all_verts[p1].x;
			final_vert_list[final_vert_cnt++] = all_verts[p1].y;
			final_vert_list[final_vert_cnt++] = 1;
			final_vert_list[final_vert_cnt++] = 2.0;
			final_vert_list[final_vert_cnt++] = 0.0;
			final_vert_list[final_vert_cnt++] = 1.0;
			final_vert_list[final_vert_cnt++] = 1.0;

		}

		// todo: handle material / submesh settings, and check if a material / submesh already exists for this settings

		var attributesView:AttributesView = new AttributesView(Float32Array, 7);
		attributesView.set(final_vert_list);
		var attributesBuffer:AttributesBuffer = attributesView.buffer;
		attributesView.dispose();
		var elements:TriangleElements = new TriangleElements(attributesBuffer);
		elements.setPositions(new Float2Attributes(attributesBuffer));
		elements.setCustomAttributes("curves", new Float3Attributes(attributesBuffer));
		elements.setUVs(new Float2Attributes(attributesBuffer));
		var material:MaterialBase = DefaultMaterialManager.getDefaultMaterial();
		material.bothSides = true;
		material.useColorTransform = true;
		material.curves = true;
		this._target.graphics.addGraphic(elements, material);
		this._active_stroke_path=null;
	}

	public isClockWiseXY(point1x:number, point1y:number, point2x:number, point2y:number, point3x:number, point3y:number):boolean
	{
		return ((point1x - point2x) * (point3y - point2y) - (point1y - point2y) * (point3x - point2x) < 0);
	}

	public getSign(ax:number, ay:number, cx:number, cy:number, bx:number, by:number):number
	{
		/*if(this.isClockWiseXY(ax, ay, bx, by, cx, cy)) {
		 return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
		 }*/
		return (ax - bx) * (cy - by) - (ay - by) * (cx - bx);

	}

	public pointInTri(ax:number, ay:number, bx:number, by:number ,cx:number, cy:number, xx:number, xy:number):boolean
	{
		var b1:boolean = this.getSign(ax, ay, xx, xy, bx, by) > 0;
		var b2:boolean = this.getSign(bx, by, xx, xy, cx, cy) > 0;
		var b3:boolean = this.getSign(cx, cy, xx, xy, ax, ay) > 0;
		return ((b1 == b2) && (b2 == b3));
	}
	public subdivideCurve(startx:number, starty:number, cx:number, cy:number, endx:number, endy:number, startx2:number, starty2:number, cx2:number, cy2:number, endx2:number, endy2:number, array_out:Array<number>, array2_out:Array<number>):void
	{
		/*
		 if(!this.pointInTri(startx2, starty2, cx2, cy2, endx2, endy2, cx, cy)){
		 }
		 */
		array_out.push(startx, starty, cx, cy,  endx, endy);
		array2_out.push(startx2, starty2, cx2, cy2, endx2, endy2);
		return;
		var c1x = startx + (cx - startx) * 0.5;
		var c1y = starty + (cy - starty) * 0.5;
		var c2x = cx + (endx - cx) * 0.5;
		var c2y = cy + (endy - cy) * 0.5;
		var ax = c1x + (c2x - c1x) * 0.5;
		var ay = c1y + (c2y - c1y) * 0.5;

		var c1x2 = startx2 + (cx2 - startx2) * 0.5;
		var c1y2 = starty2 + (cy2 - starty2) * 0.5;
		var c2x2 = cx2 + (endx2 - cx2) * 0.5;
		var c2y2 = cy2 + (endy2 - cy2) * 0.5;
		var ax2 = c1x2 + (c2x2 - c1x2) * 0.5;
		var ay2 = c1y2 + (c2y2 - c1y2) * 0.5;
		if(this.pointInTri(startx2, starty2, c1x2, c1y2, ax2, ay2, c1x, c1y)){
			this.subdivideCurve(startx, starty, c1x, c1y, ax, ay, startx2, starty2, c1x2, c1y2, ax2, ay2, array_out, array2_out);
		}
		else{
			array_out.push(startx, starty, c1x, c1y, ax, ay);
			array2_out.push(startx2, starty2, c1x2, c1y2, ax2, ay2);
		}

		if(this.pointInTri(ax2, ay2, c2x2, c2y2,  endx2, endy2, c2x, c2y)){
			this.subdivideCurve(ax, ay, c2x, c2y, endx, endy, ax2, ay2, c2x2, c2y2, endx2, endy2, array_out, array2_out);
		}
		else{
			array_out.push(ax, ay, c2x, c2y, endx, endy);
			array2_out.push(ax2, ay2, c2x2, c2y2, endx2, endy2);
		}
	}
	public draw_fill(){
		if(this._active_fill_path==null)return;
		this._active_fill_path.finalizeContour();

		var contour_commands:Array<Array<number> >=this._active_fill_path.commands;
		var contour_data:Array<Array<number> >=this._active_fill_path.data;
		var contour_draw_directions:Array<number>=this._active_fill_path.draw_directions;
		var commands:Array<number>;
		var data:Array<number>;
		var i:number=0;
		var k:number=0;
		var vert_cnt:number=0;
		var data_cnt:number=0;
		var draw_direction:number=0;
		var contours_vertices:Array<Array<number>> = [[]];
		var final_vert_list:Array<number> = [];
		var final_vert_cnt:number=0;
		var lastPoint:Point=new Point();
		for(k=0; k<contour_commands.length; k++) {
			contours_vertices.push([]);
			vert_cnt = 0;
			data_cnt = 0;
			commands=contour_commands[k];
			data=contour_data[k];
			draw_direction=contour_draw_directions[k];
			for (i = 0; i < commands.length; i++) {
				switch (commands[i]) {
					case GraphicsPathCommand.MOVE_TO:
						lastPoint.x = data[data_cnt++];
						lastPoint.y = data[data_cnt++];
						contours_vertices[contours_vertices.length - 1][vert_cnt++] = lastPoint.x;
						contours_vertices[contours_vertices.length - 1][vert_cnt++] = lastPoint.y;
						break;
					case GraphicsPathCommand.LINE_TO:
						lastPoint.x = data[data_cnt++];
						lastPoint.y = data[data_cnt++];
						contours_vertices[contours_vertices.length - 1][vert_cnt++] = lastPoint.x;
						contours_vertices[contours_vertices.length - 1][vert_cnt++] = lastPoint.y;
						break;
					case GraphicsPathCommand.CURVE_TO:
						var curve_direction:number = data[data_cnt++];
						var control_x:number = data[data_cnt++];
						var control_y:number = data[data_cnt++];
						var end_x:number = data[data_cnt++];
						var end_y:number = data[data_cnt++];
						var curve_attr_1 = -1;
						if (draw_direction > 0) {
							if (curve_direction == 1) {
								//convex
								//console.log("convex");
								curve_attr_1 = 1;
								contours_vertices[contours_vertices.length - 1][vert_cnt++] = control_x;
								contours_vertices[contours_vertices.length - 1][vert_cnt++] = control_y;
							}
							contours_vertices[contours_vertices.length - 1][vert_cnt++] = end_x;
							contours_vertices[contours_vertices.length - 1][vert_cnt++] = end_y;
						}
						else {
							if (curve_direction == 2) {
								//convex
								//console.log("convex");
								curve_attr_1 = 1;
								contours_vertices[contours_vertices.length - 1][vert_cnt++] = control_x;
								contours_vertices[contours_vertices.length - 1][vert_cnt++] = control_y;
							}
							contours_vertices[contours_vertices.length - 1][vert_cnt++] = end_x;
							contours_vertices[contours_vertices.length - 1][vert_cnt++] = end_y;
						}

						if(!this.isClockWiseXY(end_x, end_y, control_x, control_y, lastPoint.x, lastPoint.y)){
							final_vert_list[final_vert_cnt++] = end_x;
							final_vert_list[final_vert_cnt++] = end_y;
							final_vert_list[final_vert_cnt++] = curve_attr_1;
							final_vert_list[final_vert_cnt++] = 1.0;
							final_vert_list[final_vert_cnt++] = 1.0;
							final_vert_list[final_vert_cnt++] = 1.0;
							final_vert_list[final_vert_cnt++] = 0.0;
							final_vert_list[final_vert_cnt++] = control_x;
							final_vert_list[final_vert_cnt++] = control_y;
							final_vert_list[final_vert_cnt++] = curve_attr_1;
							final_vert_list[final_vert_cnt++] = 0.5;
							final_vert_list[final_vert_cnt++] = 0.0;
							final_vert_list[final_vert_cnt++] = 1.0;
							final_vert_list[final_vert_cnt++] = 0.0;
							final_vert_list[final_vert_cnt++] = lastPoint.x;
							final_vert_list[final_vert_cnt++] = lastPoint.y;
							final_vert_list[final_vert_cnt++] = curve_attr_1;
							final_vert_list[final_vert_cnt++] = 0.0;
							final_vert_list[final_vert_cnt++] = 0.0;
							final_vert_list[final_vert_cnt++] = 1.0;
							final_vert_list[final_vert_cnt++] = 0.0;
						}
						else{
							final_vert_list[final_vert_cnt++] = lastPoint.x;
							final_vert_list[final_vert_cnt++] = lastPoint.y;
							final_vert_list[final_vert_cnt++] = curve_attr_1;
							final_vert_list[final_vert_cnt++] = 1.0;
							final_vert_list[final_vert_cnt++] = 1.0;
							final_vert_list[final_vert_cnt++] = 1.0;
							final_vert_list[final_vert_cnt++] = 0.0;
							final_vert_list[final_vert_cnt++] = control_x;
							final_vert_list[final_vert_cnt++] = control_y;
							final_vert_list[final_vert_cnt++] = curve_attr_1;
							final_vert_list[final_vert_cnt++] = 0.5;
							final_vert_list[final_vert_cnt++] = 0.0;
							final_vert_list[final_vert_cnt++] = 1.0;
							final_vert_list[final_vert_cnt++] = 0.0;
							final_vert_list[final_vert_cnt++] = end_x;
							final_vert_list[final_vert_cnt++] = end_y;
							final_vert_list[final_vert_cnt++] = curve_attr_1;
							final_vert_list[final_vert_cnt++] = 0.0;
							final_vert_list[final_vert_cnt++] = 0.0;
							final_vert_list[final_vert_cnt++] = 1.0;
							final_vert_list[final_vert_cnt++] = 0.0;

						}
						lastPoint.x = end_x;
						lastPoint.y = end_y;

						break;
					case GraphicsPathCommand.CUBIC_CURVE:
						//todo
						break;
				}
			}
		}
		var verts:Array<number>=[];
		var all_verts:Array<Point>=[];
		var vertIndicess:Array<number>=[];
		var elems:Array<number>=[];
		Graphics._tess_obj.newTess(1024 * 512);
		for(k=0; k<contours_vertices.length; k++) {
			var vertices=contours_vertices[k];
			/*
			 for (i = 0; i < vertices.length / 2; ++i)
			 console.log("vert collected" + i + " = " + vertices[i * 2] + " / " + vertices[i * 2 + 1]);
			 */
			var verticesF32 = new Float32Array(vertices);
			//var verticesF32 = new Float32Array([0,0, 100,0, 100,100, 0,100]);
			//console.log("in vertices", vertices);
			//var tess = new TESS();
			if (Graphics._tess_obj == null) {
				console.log("No libtess2 tesselator available.\nMake it available using Graphics._tess_obj=new TESS();");
				return;
			}
			Graphics._tess_obj.addContour(verticesF32, 2, 8, vertices.length / 2);

		}
		Graphics._tess_obj.tesselate(0/*TESS.WINDING_ODD*/, 0/*TESS.ELEMENT_POLYGONS*/, 3, 2, null);

		//console.log("out vertices", Graphics._tess_obj.getVertices());
		verts = Graphics._tess_obj.getVertices();
		elems = Graphics._tess_obj.getElements();
		//console.log("out elements", Graphics._tess_obj.getElements());


		var numVerts:number = verts.length / 2;
		var numElems:number = elems.length / 3;
		for (i = 0; i < numVerts; ++i)
			all_verts.push(new Point(verts[i * 2], verts[i * 2 + 1]));

		for (i = 0; i < numElems; ++i) {
			var p1 = elems[i * 3];
			var p2 = elems[i * 3 + 1];
			var p3 = elems[i * 3 + 2];

			final_vert_list[final_vert_cnt++] = all_verts[p3].x;
			final_vert_list[final_vert_cnt++] = all_verts[p3].y;
			final_vert_list[final_vert_cnt++] = 1;
			final_vert_list[final_vert_cnt++] = 2.0;
			final_vert_list[final_vert_cnt++] = 0.0;
			final_vert_list[final_vert_cnt++] = 1.0;
			final_vert_list[final_vert_cnt++] = 0.0;
			final_vert_list[final_vert_cnt++] = all_verts[p2].x;
			final_vert_list[final_vert_cnt++] = all_verts[p2].y;
			final_vert_list[final_vert_cnt++] = 1;
			final_vert_list[final_vert_cnt++] = 2.0;
			final_vert_list[final_vert_cnt++] = 0.0;
			final_vert_list[final_vert_cnt++] = 1.0;
			final_vert_list[final_vert_cnt++] = 0.0;
			final_vert_list[final_vert_cnt++] = all_verts[p1].x;
			final_vert_list[final_vert_cnt++] = all_verts[p1].y;
			final_vert_list[final_vert_cnt++] = 1;
			final_vert_list[final_vert_cnt++] = 2.0;
			final_vert_list[final_vert_cnt++] = 0.0;
			final_vert_list[final_vert_cnt++] = 1.0;
			final_vert_list[final_vert_cnt++] = 0.0;

		}
		//for (i = 0; i < final_vert_list.length/7; ++i)
		//	console.log("final verts "+i+" = "+final_vert_list[i*7]+" / "+final_vert_list[i*7+1]);
		var attributesView:AttributesView = new AttributesView(Float32Array, 7);
		attributesView.set(final_vert_list);
		var attributesBuffer:AttributesBuffer = attributesView.buffer;
		attributesView.dispose();
		var elements:TriangleElements = new TriangleElements(attributesBuffer);
		elements.setPositions(new Float2Attributes(attributesBuffer));
		elements.setCustomAttributes("curves", new Float3Attributes(attributesBuffer));
		elements.setUVs(new Float2Attributes(attributesBuffer));
		var material:MaterialBase = DefaultMaterialManager.getDefaultMaterial();
		material.bothSides = true;
		material.useColorTransform = true;
		material.curves = true;
		this._target.graphics.addGraphic(elements, material);
		this._active_fill_path=null;
	}
}

export = Graphics;