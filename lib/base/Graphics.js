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
var Graphics = (function () {
    function Graphics() {
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
    Graphics.prototype.beginBitmapFill = function (bitmap, matrix, repeat, smooth) {
        if (matrix === void 0) { matrix = null; }
        if (repeat === void 0) { repeat = true; }
        if (smooth === void 0) { smooth = false; }
    };
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
    Graphics.prototype.beginFill = function (color /*int*/, alpha) {
        if (alpha === void 0) { alpha = 1; }
    };
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
    Graphics.prototype.beginGradientFill = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
        if (matrix === void 0) { matrix = null; }
        if (spreadMethod === void 0) { spreadMethod = "pad"; }
        if (interpolationMethod === void 0) { interpolationMethod = "rgb"; }
        if (focalPointRatio === void 0) { focalPointRatio = 0; }
    };
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
    Graphics.prototype.clear = function () {
    };
    /**
     * Copies all of drawing commands from the source Graphics object into the
     * calling Graphics object.
     *
     * @param sourceGraphics The Graphics object from which to copy the drawing
     *                       commands.
     */
    Graphics.prototype.copyFrom = function (sourceGraphics) {
    };
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
    Graphics.prototype.cubicCurveTo = function (controlX1, controlY1, controlX2, controlY2, anchorX, anchorY) {
    };
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
    Graphics.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) {
    };
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
    Graphics.prototype.drawCircle = function (x, y, radius) {
    };
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
    Graphics.prototype.drawEllipse = function (x, y, width, height) {
    };
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
    Graphics.prototype.drawGraphicsData = function (graphicsData) {
    };
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
    Graphics.prototype.drawPath = function (commands, data, winding) {
    };
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
    Graphics.prototype.drawRect = function (x, y, width, height) {
    };
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
    Graphics.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
        if (ellipseHeight === void 0) { ellipseHeight = NaN; }
    };
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
    Graphics.prototype.drawTriangles = function (vertices, indices, uvtData, culling) {
        if (indices === void 0) { indices = null; }
        if (uvtData === void 0) { uvtData = null; }
        if (culling === void 0) { culling = null; }
    };
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
    Graphics.prototype.endFill = function () {
    };
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
    Graphics.prototype.lineBitmapStyle = function (bitmap, matrix, repeat, smooth) {
        if (matrix === void 0) { matrix = null; }
        if (repeat === void 0) { repeat = true; }
        if (smooth === void 0) { smooth = false; }
    };
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
    Graphics.prototype.lineGradientStyle = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
        if (matrix === void 0) { matrix = null; }
        if (spreadMethod === void 0) { spreadMethod = null; }
        if (interpolationMethod === void 0) { interpolationMethod = null; }
        if (focalPointRatio === void 0) { focalPointRatio = 0; }
    };
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
    Graphics.prototype.lineStyle = function (thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit) {
        if (thickness === void 0) { thickness = 0; }
        if (color === void 0) { color = 0; }
        if (alpha === void 0) { alpha = 1; }
        if (pixelHinting === void 0) { pixelHinting = false; }
        if (scaleMode === void 0) { scaleMode = null; }
        if (caps === void 0) { caps = null; }
        if (joints === void 0) { joints = null; }
        if (miterLimit === void 0) { miterLimit = 3; }
    };
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
    Graphics.prototype.lineTo = function (x, y) {
    };
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
    Graphics.prototype.moveTo = function (x, y) {
    };
    return Graphics;
})();
module.exports = Graphics;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0dyYXBoaWNzLnRzIl0sIm5hbWVzIjpbIkdyYXBoaWNzIiwiR3JhcGhpY3MuY29uc3RydWN0b3IiLCJHcmFwaGljcy5iZWdpbkJpdG1hcEZpbGwiLCJHcmFwaGljcy5iZWdpbkZpbGwiLCJHcmFwaGljcy5iZWdpbkdyYWRpZW50RmlsbCIsIkdyYXBoaWNzLmNsZWFyIiwiR3JhcGhpY3MuY29weUZyb20iLCJHcmFwaGljcy5jdWJpY0N1cnZlVG8iLCJHcmFwaGljcy5jdXJ2ZVRvIiwiR3JhcGhpY3MuZHJhd0NpcmNsZSIsIkdyYXBoaWNzLmRyYXdFbGxpcHNlIiwiR3JhcGhpY3MuZHJhd0dyYXBoaWNzRGF0YSIsIkdyYXBoaWNzLmRyYXdQYXRoIiwiR3JhcGhpY3MuZHJhd1JlY3QiLCJHcmFwaGljcy5kcmF3Um91bmRSZWN0IiwiR3JhcGhpY3MuZHJhd1RyaWFuZ2xlcyIsIkdyYXBoaWNzLmVuZEZpbGwiLCJHcmFwaGljcy5saW5lQml0bWFwU3R5bGUiLCJHcmFwaGljcy5saW5lR3JhZGllbnRTdHlsZSIsIkdyYXBoaWNzLmxpbmVTdHlsZSIsIkdyYXBoaWNzLmxpbmVUbyIsIkdyYXBoaWNzLm1vdmVUbyJdLCJtYXBwaW5ncyI6IkFBYUEsQUFjQTs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csUUFBUTtJQUFkQSxTQUFNQSxRQUFRQTtJQXcwQmRDLENBQUNBO0lBdDBCQUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9DR0E7SUFDSUEsa0NBQWVBLEdBQXRCQSxVQUF1QkEsTUFBaUJBLEVBQUVBLE1BQW9CQSxFQUFFQSxNQUFxQkEsRUFBRUEsTUFBc0JBO1FBQW5FRSxzQkFBb0JBLEdBQXBCQSxhQUFvQkE7UUFBRUEsc0JBQXFCQSxHQUFyQkEsYUFBcUJBO1FBQUVBLHNCQUFzQkEsR0FBdEJBLGNBQXNCQTtJQUc3R0EsQ0FBQ0E7SUFFREY7Ozs7Ozs7Ozs7Ozs7T0FhR0E7SUFDSUEsNEJBQVNBLEdBQWhCQSxVQUFpQkEsS0FBS0EsQ0FBUUEsT0FBREEsQUFBUUEsRUFBRUEsS0FBZ0JBO1FBQWhCRyxxQkFBZ0JBLEdBQWhCQSxTQUFnQkE7SUFHdkRBLENBQUNBO0lBRURIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0ZHQTtJQUNJQSxvQ0FBaUJBLEdBQXhCQSxVQUF5QkEsSUFBaUJBLEVBQUVBLE1BQTRCQSxFQUFFQSxNQUFvQkEsRUFBRUEsTUFBNEJBLEVBQUVBLE1BQW9CQSxFQUFFQSxZQUEyQkEsRUFBRUEsbUJBQWtDQSxFQUFFQSxlQUEwQkE7UUFBakhJLHNCQUFvQkEsR0FBcEJBLGFBQW9CQTtRQUFFQSw0QkFBMkJBLEdBQTNCQSxvQkFBMkJBO1FBQUVBLG1DQUFrQ0EsR0FBbENBLDJCQUFrQ0E7UUFBRUEsK0JBQTBCQSxHQUExQkEsbUJBQTBCQTtJQUcvT0EsQ0FBQ0E7SUFFREo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpREdBO0lBQ0pBLCtEQUErREE7SUFDL0RBLEtBQUtBO0lBQ0xBLEVBQUVBO0lBQ0ZBLEtBQUtBO0lBRUpBOzs7O09BSUdBO0lBQ0lBLHdCQUFLQSxHQUFaQTtJQUdBSyxDQUFDQTtJQUVETDs7Ozs7O09BTUdBO0lBQ0lBLDJCQUFRQSxHQUFmQSxVQUFnQkEsY0FBdUJBO0lBR3ZDTSxDQUFDQTtJQUVETjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWlER0E7SUFDSUEsK0JBQVlBLEdBQW5CQSxVQUFvQkEsU0FBZ0JBLEVBQUVBLFNBQWdCQSxFQUFFQSxTQUFnQkEsRUFBRUEsU0FBZ0JBLEVBQUVBLE9BQWNBLEVBQUVBLE9BQWNBO0lBRzFITyxDQUFDQTtJQUVEUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2QkdBO0lBQ0lBLDBCQUFPQSxHQUFkQSxVQUFlQSxRQUFlQSxFQUFFQSxRQUFlQSxFQUFFQSxPQUFjQSxFQUFFQSxPQUFjQTtJQUcvRVEsQ0FBQ0E7SUFFRFI7Ozs7Ozs7Ozs7Ozs7O09BY0dBO0lBQ0lBLDZCQUFVQSxHQUFqQkEsVUFBa0JBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLE1BQWFBO0lBR25EUyxDQUFDQTtJQUVEVDs7Ozs7Ozs7Ozs7Ozs7O09BZUdBO0lBQ0lBLDhCQUFXQSxHQUFsQkEsVUFBbUJBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLEtBQVlBLEVBQUVBLE1BQWFBO0lBR2xFVSxDQUFDQTtJQUVEVjs7Ozs7Ozs7Ozs7T0FXR0E7SUFDSUEsbUNBQWdCQSxHQUF2QkEsVUFBd0JBLFlBQWlDQTtJQUd6RFcsQ0FBQ0E7SUFFRFg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNENHQTtJQUNJQSwyQkFBUUEsR0FBZkEsVUFBZ0JBLFFBQThCQSxFQUFFQSxJQUFrQkEsRUFBRUEsT0FBMkJBO0lBRy9GWSxDQUFDQTtJQUVEWjs7Ozs7Ozs7Ozs7Ozs7OztPQWdCR0E7SUFDSUEsMkJBQVFBLEdBQWZBLFVBQWdCQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxLQUFZQSxFQUFFQSxNQUFhQTtJQUcvRGEsQ0FBQ0E7SUFFRGI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5QkdBO0lBQ0lBLGdDQUFhQSxHQUFwQkEsVUFBcUJBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLEtBQVlBLEVBQUVBLE1BQWFBLEVBQUVBLFlBQW1CQSxFQUFFQSxhQUEwQkE7UUFBMUJjLDZCQUEwQkEsR0FBMUJBLG1CQUEwQkE7SUFHckhBLENBQUNBO0lBRURkLDRLQUE0S0E7SUFFNUtBOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCR0E7SUFDSUEsZ0NBQWFBLEdBQXBCQSxVQUFxQkEsUUFBc0JBLEVBQUVBLE9BQW9DQSxFQUFFQSxPQUE0QkEsRUFBRUEsT0FBOEJBO1FBQWxHZSx1QkFBb0NBLEdBQXBDQSxjQUFvQ0E7UUFBRUEsdUJBQTRCQSxHQUE1QkEsY0FBNEJBO1FBQUVBLHVCQUE4QkEsR0FBOUJBLGNBQThCQTtJQUcvSUEsQ0FBQ0E7SUFFRGY7Ozs7Ozs7Ozs7T0FVR0E7SUFDSUEsMEJBQU9BLEdBQWRBO0lBR0FnQixDQUFDQTtJQUVEaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0QkdBO0lBQ0lBLGtDQUFlQSxHQUF0QkEsVUFBdUJBLE1BQWlCQSxFQUFFQSxNQUFvQkEsRUFBRUEsTUFBcUJBLEVBQUVBLE1BQXNCQTtRQUFuRWlCLHNCQUFvQkEsR0FBcEJBLGFBQW9CQTtRQUFFQSxzQkFBcUJBLEdBQXJCQSxhQUFxQkE7UUFBRUEsc0JBQXNCQSxHQUF0QkEsY0FBc0JBO0lBRzdHQSxDQUFDQTtJQUVEakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFFR0E7SUFDSUEsb0NBQWlCQSxHQUF4QkEsVUFBeUJBLElBQWlCQSxFQUFFQSxNQUE0QkEsRUFBRUEsTUFBb0JBLEVBQUVBLE1BQW9CQSxFQUFFQSxNQUFvQkEsRUFBRUEsWUFBZ0NBLEVBQUVBLG1CQUE4Q0EsRUFBRUEsZUFBMEJBO1FBQWxJa0Isc0JBQW9CQSxHQUFwQkEsYUFBb0JBO1FBQUVBLDRCQUFnQ0EsR0FBaENBLG1CQUFnQ0E7UUFBRUEsbUNBQThDQSxHQUE5Q0EsMEJBQThDQTtRQUFFQSwrQkFBMEJBLEdBQTFCQSxtQkFBMEJBO0lBR3hQQSxDQUFDQTtJQUVEbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEJHQTtJQUNKQSwrREFBK0RBO0lBQy9EQSxLQUFLQTtJQUNMQSxFQUFFQTtJQUNGQSxLQUFLQTtJQUVKQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMElHQTtJQUNJQSw0QkFBU0EsR0FBaEJBLFVBQWlCQSxTQUFvQkEsRUFBRUEsS0FBd0JBLEVBQUVBLEtBQWdCQSxFQUFFQSxZQUE0QkEsRUFBRUEsU0FBOEJBLEVBQUVBLElBQXFCQSxFQUFFQSxNQUF3QkEsRUFBRUEsVUFBcUJBO1FBQXRNbUIseUJBQW9CQSxHQUFwQkEsYUFBb0JBO1FBQUVBLHFCQUF3QkEsR0FBeEJBLFNBQXdCQTtRQUFFQSxxQkFBZ0JBLEdBQWhCQSxTQUFnQkE7UUFBRUEsNEJBQTRCQSxHQUE1QkEsb0JBQTRCQTtRQUFFQSx5QkFBOEJBLEdBQTlCQSxnQkFBOEJBO1FBQUVBLG9CQUFxQkEsR0FBckJBLFdBQXFCQTtRQUFFQSxzQkFBd0JBLEdBQXhCQSxhQUF3QkE7UUFBRUEsMEJBQXFCQSxHQUFyQkEsY0FBcUJBO0lBR3ZOQSxDQUFDQTtJQUVEbkI7Ozs7Ozs7Ozs7Ozs7OztPQWVHQTtJQUNJQSx5QkFBTUEsR0FBYkEsVUFBY0EsQ0FBUUEsRUFBRUEsQ0FBUUE7SUFHaENvQixDQUFDQTtJQUVEcEI7Ozs7Ozs7OztPQVNHQTtJQUNJQSx5QkFBTUEsR0FBYkEsVUFBY0EsQ0FBUUEsRUFBRUEsQ0FBUUE7SUFHaENxQixDQUFDQTtJQUNGckIsZUFBQ0E7QUFBREEsQ0F4MEJBLEFBdzBCQ0EsSUFBQTtBQUVELEFBQWtCLGlCQUFULFFBQVEsQ0FBQyIsImZpbGUiOiJiYXNlL0dyYXBoaWNzLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCaXRtYXBEYXRhXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvYmFzZS9CaXRtYXBEYXRhXCIpO1xuaW1wb3J0IE1hdHJpeFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXhcIik7XG5cbmltcG9ydCBDYXBzU3R5bGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0NhcHNTdHlsZVwiKTtcbmltcG9ydCBHcmFkaWVudFR5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0dyYWRpZW50VHlwZVwiKTtcbmltcG9ydCBHcmFwaGljc1BhdGhXaW5kaW5nXHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0dyYXBoaWNzUGF0aFdpbmRpbmdcIik7XG5pbXBvcnQgSUdyYXBoaWNzRGF0YVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lHcmFwaGljc0RhdGFcIik7XG5pbXBvcnQgSW50ZXJwb2xhdGlvbk1ldGhvZFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JbnRlcnBvbGF0aW9uTWV0aG9kXCIpO1xuaW1wb3J0IEpvaW50U3R5bGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0pvaW50U3R5bGVcIik7XG5pbXBvcnQgTGluZVNjYWxlTW9kZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xpbmVTY2FsZU1vZGVcIik7XG5pbXBvcnQgVHJpYW5nbGVDdWxsaW5nXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvVHJpYW5nbGVDdWxsaW5nXCIpO1xuaW1wb3J0IFNwcmVhZE1ldGhvZFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvU3ByZWFkTWV0aG9kXCIpO1xuXG4vKipcbiAqIFRoZSBHcmFwaGljcyBjbGFzcyBjb250YWlucyBhIHNldCBvZiBtZXRob2RzIHRoYXQgeW91IGNhbiB1c2UgdG8gY3JlYXRlIGFcbiAqIHZlY3RvciBzaGFwZS4gRGlzcGxheSBvYmplY3RzIHRoYXQgc3VwcG9ydCBkcmF3aW5nIGluY2x1ZGUgU3ByaXRlIGFuZCBTaGFwZVxuICogb2JqZWN0cy4gRWFjaCBvZiB0aGVzZSBjbGFzc2VzIGluY2x1ZGVzIGEgPGNvZGU+Z3JhcGhpY3M8L2NvZGU+IHByb3BlcnR5XG4gKiB0aGF0IGlzIGEgR3JhcGhpY3Mgb2JqZWN0LiBUaGUgZm9sbG93aW5nIGFyZSBhbW9uZyB0aG9zZSBoZWxwZXIgZnVuY3Rpb25zXG4gKiBwcm92aWRlZCBmb3IgZWFzZSBvZiB1c2U6IDxjb2RlPmRyYXdSZWN0KCk8L2NvZGU+LFxuICogPGNvZGU+ZHJhd1JvdW5kUmVjdCgpPC9jb2RlPiwgPGNvZGU+ZHJhd0NpcmNsZSgpPC9jb2RlPiwgYW5kXG4gKiA8Y29kZT5kcmF3RWxsaXBzZSgpPC9jb2RlPi5cbiAqXG4gKiA8cD5Zb3UgY2Fubm90IGNyZWF0ZSBhIEdyYXBoaWNzIG9iamVjdCBkaXJlY3RseSBmcm9tIEFjdGlvblNjcmlwdCBjb2RlLiBJZlxuICogeW91IGNhbGwgPGNvZGU+bmV3IEdyYXBoaWNzKCk8L2NvZGU+LCBhbiBleGNlcHRpb24gaXMgdGhyb3duLjwvcD5cbiAqXG4gKiA8cD5UaGUgR3JhcGhpY3MgY2xhc3MgaXMgZmluYWw7IGl0IGNhbm5vdCBiZSBzdWJjbGFzc2VkLjwvcD5cbiAqL1xuY2xhc3MgR3JhcGhpY3Ncbntcblx0LyoqXG5cdCAqIEZpbGxzIGEgZHJhd2luZyBhcmVhIHdpdGggYSBiaXRtYXAgaW1hZ2UuIFRoZSBiaXRtYXAgY2FuIGJlIHJlcGVhdGVkIG9yXG5cdCAqIHRpbGVkIHRvIGZpbGwgdGhlIGFyZWEuIFRoZSBmaWxsIHJlbWFpbnMgaW4gZWZmZWN0IHVudGlsIHlvdSBjYWxsIHRoZVxuXHQgKiA8Y29kZT5iZWdpbkZpbGwoKTwvY29kZT4sIDxjb2RlPmJlZ2luQml0bWFwRmlsbCgpPC9jb2RlPixcblx0ICogPGNvZGU+YmVnaW5HcmFkaWVudEZpbGwoKTwvY29kZT4sIG9yIDxjb2RlPmJlZ2luU2hhZGVyRmlsbCgpPC9jb2RlPlxuXHQgKiBtZXRob2QuIENhbGxpbmcgdGhlIDxjb2RlPmNsZWFyKCk8L2NvZGU+IG1ldGhvZCBjbGVhcnMgdGhlIGZpbGwuXG5cdCAqXG5cdCAqIDxwPlRoZSBhcHBsaWNhdGlvbiByZW5kZXJzIHRoZSBmaWxsIHdoZW5ldmVyIHRocmVlIG9yIG1vcmUgcG9pbnRzIGFyZVxuXHQgKiBkcmF3biwgb3Igd2hlbiB0aGUgPGNvZGU+ZW5kRmlsbCgpPC9jb2RlPiBtZXRob2QgaXMgY2FsbGVkLiA8L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBiaXRtYXAgQSB0cmFuc3BhcmVudCBvciBvcGFxdWUgYml0bWFwIGltYWdlIHRoYXQgY29udGFpbnMgdGhlIGJpdHNcblx0ICogICAgICAgICAgICAgICB0byBiZSBkaXNwbGF5ZWQuXG5cdCAqIEBwYXJhbSBtYXRyaXggQSBtYXRyaXggb2JqZWN0KG9mIHRoZSBmbGFzaC5nZW9tLk1hdHJpeCBjbGFzcyksIHdoaWNoIHlvdVxuXHQgKiAgICAgICAgICAgICAgIGNhbiB1c2UgdG8gZGVmaW5lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgYml0bWFwLiBGb3Jcblx0ICogICAgICAgICAgICAgICBleGFtcGxlLCB5b3UgY2FuIHVzZSB0aGUgZm9sbG93aW5nIG1hdHJpeCB0byByb3RhdGUgYSBiaXRtYXBcblx0ICogICAgICAgICAgICAgICBieSA0NSBkZWdyZWVzKHBpLzQgcmFkaWFucyk6XG5cdCAqIEBwYXJhbSByZXBlYXQgSWYgPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSBiaXRtYXAgaW1hZ2UgcmVwZWF0cyBpbiBhIHRpbGVkXG5cdCAqICAgICAgICAgICAgICAgcGF0dGVybi4gSWYgPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgYml0bWFwIGltYWdlIGRvZXMgbm90XG5cdCAqICAgICAgICAgICAgICAgcmVwZWF0LCBhbmQgdGhlIGVkZ2VzIG9mIHRoZSBiaXRtYXAgYXJlIHVzZWQgZm9yIGFueSBmaWxsXG5cdCAqICAgICAgICAgICAgICAgYXJlYSB0aGF0IGV4dGVuZHMgYmV5b25kIHRoZSBiaXRtYXAuXG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgPHA+Rm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoZSBmb2xsb3dpbmcgYml0bWFwKGEgMjAgeFxuXHQgKiAgICAgICAgICAgICAgIDIwLXBpeGVsIGNoZWNrZXJib2FyZCBwYXR0ZXJuKTo8L3A+XG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgPHA+V2hlbiA8Y29kZT5yZXBlYXQ8L2NvZGU+IGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPihhc1xuXHQgKiAgICAgICAgICAgICAgIGluIHRoZSBmb2xsb3dpbmcgZXhhbXBsZSksIHRoZSBiaXRtYXAgZmlsbCByZXBlYXRzIHRoZVxuXHQgKiAgICAgICAgICAgICAgIGJpdG1hcDo8L3A+XG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgPHA+V2hlbiA8Y29kZT5yZXBlYXQ8L2NvZGU+IGlzIHNldCB0byA8Y29kZT5mYWxzZTwvY29kZT4sXG5cdCAqICAgICAgICAgICAgICAgdGhlIGJpdG1hcCBmaWxsIHVzZXMgdGhlIGVkZ2UgcGl4ZWxzIGZvciB0aGUgZmlsbCBhcmVhXG5cdCAqICAgICAgICAgICAgICAgb3V0c2lkZSB0aGUgYml0bWFwOjwvcD5cblx0ICogQHBhcmFtIHNtb290aCBJZiA8Y29kZT5mYWxzZTwvY29kZT4sIHVwc2NhbGVkIGJpdG1hcCBpbWFnZXMgYXJlIHJlbmRlcmVkXG5cdCAqICAgICAgICAgICAgICAgYnkgdXNpbmcgYSBuZWFyZXN0LW5laWdoYm9yIGFsZ29yaXRobSBhbmQgbG9vayBwaXhlbGF0ZWQuIElmXG5cdCAqICAgICAgICAgICAgICAgPGNvZGU+dHJ1ZTwvY29kZT4sIHVwc2NhbGVkIGJpdG1hcCBpbWFnZXMgYXJlIHJlbmRlcmVkIGJ5XG5cdCAqICAgICAgICAgICAgICAgdXNpbmcgYSBiaWxpbmVhciBhbGdvcml0aG0uIFJlbmRlcmluZyBieSB1c2luZyB0aGUgbmVhcmVzdFxuXHQgKiAgICAgICAgICAgICAgIG5laWdoYm9yIGFsZ29yaXRobSBpcyBmYXN0ZXIuXG5cdCAqL1xuXHRwdWJsaWMgYmVnaW5CaXRtYXBGaWxsKGJpdG1hcDpCaXRtYXBEYXRhLCBtYXRyaXg6TWF0cml4ID0gbnVsbCwgcmVwZWF0OmJvb2xlYW4gPSB0cnVlLCBzbW9vdGg6Ym9vbGVhbiA9IGZhbHNlKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgYSBzaW1wbGUgb25lLWNvbG9yIGZpbGwgdGhhdCBzdWJzZXF1ZW50IGNhbGxzIHRvIG90aGVyIEdyYXBoaWNzXG5cdCAqIG1ldGhvZHMoc3VjaCBhcyA8Y29kZT5saW5lVG8oKTwvY29kZT4gb3IgPGNvZGU+ZHJhd0NpcmNsZSgpPC9jb2RlPikgdXNlXG5cdCAqIHdoZW4gZHJhd2luZy4gVGhlIGZpbGwgcmVtYWlucyBpbiBlZmZlY3QgdW50aWwgeW91IGNhbGwgdGhlXG5cdCAqIDxjb2RlPmJlZ2luRmlsbCgpPC9jb2RlPiwgPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+LFxuXHQgKiA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiwgb3IgPGNvZGU+YmVnaW5TaGFkZXJGaWxsKCk8L2NvZGU+XG5cdCAqIG1ldGhvZC4gQ2FsbGluZyB0aGUgPGNvZGU+Y2xlYXIoKTwvY29kZT4gbWV0aG9kIGNsZWFycyB0aGUgZmlsbC5cblx0ICpcblx0ICogPHA+VGhlIGFwcGxpY2F0aW9uIHJlbmRlcnMgdGhlIGZpbGwgd2hlbmV2ZXIgdGhyZWUgb3IgbW9yZSBwb2ludHMgYXJlXG5cdCAqIGRyYXduLCBvciB3aGVuIHRoZSA8Y29kZT5lbmRGaWxsKCk8L2NvZGU+IG1ldGhvZCBpcyBjYWxsZWQuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gY29sb3IgVGhlIGNvbG9yIG9mIHRoZSBmaWxsKDB4UlJHR0JCKS5cblx0ICogQHBhcmFtIGFscGhhIFRoZSBhbHBoYSB2YWx1ZSBvZiB0aGUgZmlsbCgwLjAgdG8gMS4wKS5cblx0ICovXG5cdHB1YmxpYyBiZWdpbkZpbGwoY29sb3I6bnVtYmVyIC8qaW50Ki8sIGFscGhhOm51bWJlciA9IDEpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyBhIGdyYWRpZW50IGZpbGwgdXNlZCBieSBzdWJzZXF1ZW50IGNhbGxzIHRvIG90aGVyIEdyYXBoaWNzXG5cdCAqIG1ldGhvZHMoc3VjaCBhcyA8Y29kZT5saW5lVG8oKTwvY29kZT4gb3IgPGNvZGU+ZHJhd0NpcmNsZSgpPC9jb2RlPikgZm9yXG5cdCAqIHRoZSBvYmplY3QuIFRoZSBmaWxsIHJlbWFpbnMgaW4gZWZmZWN0IHVudGlsIHlvdSBjYWxsIHRoZVxuXHQgKiA8Y29kZT5iZWdpbkZpbGwoKTwvY29kZT4sIDxjb2RlPmJlZ2luQml0bWFwRmlsbCgpPC9jb2RlPixcblx0ICogPGNvZGU+YmVnaW5HcmFkaWVudEZpbGwoKTwvY29kZT4sIG9yIDxjb2RlPmJlZ2luU2hhZGVyRmlsbCgpPC9jb2RlPlxuXHQgKiBtZXRob2QuIENhbGxpbmcgdGhlIDxjb2RlPmNsZWFyKCk8L2NvZGU+IG1ldGhvZCBjbGVhcnMgdGhlIGZpbGwuXG5cdCAqXG5cdCAqIDxwPlRoZSBhcHBsaWNhdGlvbiByZW5kZXJzIHRoZSBmaWxsIHdoZW5ldmVyIHRocmVlIG9yIG1vcmUgcG9pbnRzIGFyZVxuXHQgKiBkcmF3biwgb3Igd2hlbiB0aGUgPGNvZGU+ZW5kRmlsbCgpPC9jb2RlPiBtZXRob2QgaXMgY2FsbGVkLiA8L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB0eXBlICAgICAgICAgICAgICAgIEEgdmFsdWUgZnJvbSB0aGUgR3JhZGllbnRUeXBlIGNsYXNzIHRoYXRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWVzIHdoaWNoIGdyYWRpZW50IHR5cGUgdG8gdXNlOlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5HcmFkaWVudFR5cGUuTElORUFSPC9jb2RlPiBvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5HcmFkaWVudFR5cGUuUkFESUFMPC9jb2RlPi5cblx0ICogQHBhcmFtIGNvbG9ycyAgICAgICAgICAgICAgQW4gYXJyYXkgb2YgUkdCIGhleGFkZWNpbWFsIGNvbG9yIHZhbHVlcyB1c2VkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIHRoZSBncmFkaWVudDsgZm9yIGV4YW1wbGUsIHJlZCBpcyAweEZGMDAwMCxcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgYmx1ZSBpcyAweDAwMDBGRiwgYW5kIHNvIG9uLiBZb3UgY2FuIHNwZWNpZnlcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdXAgdG8gMTUgY29sb3JzLiBGb3IgZWFjaCBjb2xvciwgc3BlY2lmeSBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlc3BvbmRpbmcgdmFsdWUgaW4gdGhlIGFscGhhcyBhbmQgcmF0aW9zXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMuXG5cdCAqIEBwYXJhbSBhbHBoYXMgICAgICAgICAgICAgIEFuIGFycmF5IG9mIGFscGhhIHZhbHVlcyBmb3IgdGhlIGNvcnJlc3BvbmRpbmdcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JzIGluIHRoZSBjb2xvcnMgYXJyYXk7IHZhbGlkIHZhbHVlcyBhcmUgMFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byAxLiBJZiB0aGUgdmFsdWUgaXMgbGVzcyB0aGFuIDAsIHRoZSBkZWZhdWx0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIDAuIElmIHRoZSB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gMSwgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQgaXMgMS5cblx0ICogQHBhcmFtIHJhdGlvcyAgICAgICAgICAgICAgQW4gYXJyYXkgb2YgY29sb3IgZGlzdHJpYnV0aW9uIHJhdGlvczsgdmFsaWRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIGFyZSAwLTI1NS4gVGhpcyB2YWx1ZSBkZWZpbmVzIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50YWdlIG9mIHRoZSB3aWR0aCB3aGVyZSB0aGUgY29sb3IgaXNcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FtcGxlZCBhdCAxMDAlLiBUaGUgdmFsdWUgMCByZXByZXNlbnRzIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0IHBvc2l0aW9uIGluIHRoZSBncmFkaWVudCBib3gsIGFuZCAyNTVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwcmVzZW50cyB0aGUgcmlnaHQgcG9zaXRpb24gaW4gdGhlIGdyYWRpZW50XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveC5cblx0ICogQHBhcmFtIG1hdHJpeCAgICAgICAgICAgICAgQSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggYXMgZGVmaW5lZCBieSB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhc2guZ2VvbS5NYXRyaXggY2xhc3MuIFRoZSBmbGFzaC5nZW9tLk1hdHJpeFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcyBpbmNsdWRlcyBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmNyZWF0ZUdyYWRpZW50Qm94KCk8L2NvZGU+IG1ldGhvZCwgd2hpY2hcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0cyB5b3UgY29udmVuaWVudGx5IHNldCB1cCB0aGUgbWF0cml4IGZvciB1c2Vcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgPGNvZGU+YmVnaW5HcmFkaWVudEZpbGwoKTwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kLlxuXHQgKiBAcGFyYW0gc3ByZWFkTWV0aG9kICAgICAgICBBIHZhbHVlIGZyb20gdGhlIFNwcmVhZE1ldGhvZCBjbGFzcyB0aGF0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmllcyB3aGljaCBzcHJlYWQgbWV0aG9kIHRvIHVzZSwgZWl0aGVyOlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TcHJlYWRNZXRob2QuUEFEPC9jb2RlPixcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+U3ByZWFkTWV0aG9kLlJFRkxFQ1Q8L2NvZGU+LCBvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TcHJlYWRNZXRob2QuUkVQRUFUPC9jb2RlPi5cblx0ICpcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+Rm9yIGV4YW1wbGUsIGNvbnNpZGVyIGEgc2ltcGxlIGxpbmVhclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkaWVudCBiZXR3ZWVuIHR3byBjb2xvcnM6PC9wPlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5UaGlzIGV4YW1wbGUgdXNlc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TcHJlYWRNZXRob2QuUEFEPC9jb2RlPiBmb3IgdGhlIHNwcmVhZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2QsIGFuZCB0aGUgZ3JhZGllbnQgZmlsbCBsb29rcyBsaWtlIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2xsb3dpbmc6PC9wPlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5JZiB5b3UgdXNlIDxjb2RlPlNwcmVhZE1ldGhvZC5SRUZMRUNUPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhlIHNwcmVhZCBtZXRob2QsIHRoZSBncmFkaWVudCBmaWxsIGxvb2tzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpa2UgdGhlIGZvbGxvd2luZzo8L3A+XG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPklmIHlvdSB1c2UgPGNvZGU+U3ByZWFkTWV0aG9kLlJFUEVBVDwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoZSBzcHJlYWQgbWV0aG9kLCB0aGUgZ3JhZGllbnQgZmlsbCBsb29rc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWtlIHRoZSBmb2xsb3dpbmc6PC9wPlxuXHQgKiBAcGFyYW0gaW50ZXJwb2xhdGlvbk1ldGhvZCBBIHZhbHVlIGZyb20gdGhlIEludGVycG9sYXRpb25NZXRob2QgY2xhc3MgdGhhdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZXMgd2hpY2ggdmFsdWUgdG8gdXNlOlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5JbnRlcnBvbGF0aW9uTWV0aG9kLkxJTkVBUl9SR0I8L2NvZGU+IG9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkludGVycG9sYXRpb25NZXRob2QuUkdCPC9jb2RlPlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Gb3IgZXhhbXBsZSwgY29uc2lkZXIgYSBzaW1wbGUgbGluZWFyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRpZW50IGJldHdlZW4gdHdvIGNvbG9ycyh3aXRoIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5zcHJlYWRNZXRob2Q8L2NvZGU+IHBhcmFtZXRlciBzZXQgdG9cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+U3ByZWFkTWV0aG9kLlJFRkxFQ1Q8L2NvZGU+KS4gVGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZlcmVudCBpbnRlcnBvbGF0aW9uIG1ldGhvZHMgYWZmZWN0IHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBlYXJhbmNlIGFzIGZvbGxvd3M6IDwvcD5cblx0ICogQHBhcmFtIGZvY2FsUG9pbnRSYXRpbyAgICAgQSBudW1iZXIgdGhhdCBjb250cm9scyB0aGUgbG9jYXRpb24gb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY2FsIHBvaW50IG9mIHRoZSBncmFkaWVudC4gMCBtZWFucyB0aGF0IHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2NhbCBwb2ludCBpcyBpbiB0aGUgY2VudGVyLiAxIG1lYW5zIHRoYXQgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY2FsIHBvaW50IGlzIGF0IG9uZSBib3JkZXIgb2YgdGhlIGdyYWRpZW50XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpcmNsZS4gLTEgbWVhbnMgdGhhdCB0aGUgZm9jYWwgcG9pbnQgaXMgYXQgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyIGJvcmRlciBvZiB0aGUgZ3JhZGllbnQgY2lyY2xlLiBBIHZhbHVlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlc3MgdGhhbiAtMSBvciBncmVhdGVyIHRoYW4gMSBpcyByb3VuZGVkIHRvIC0xXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIDEuIEZvciBleGFtcGxlLCB0aGUgZm9sbG93aW5nIGV4YW1wbGUgc2hvd3Ncblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgYSA8Y29kZT5mb2NhbFBvaW50UmF0aW88L2NvZGU+IHNldCB0byAwLjc1OlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgSWYgdGhlIDxjb2RlPnR5cGU8L2NvZGU+IHBhcmFtZXRlciBpcyBub3QgdmFsaWQuXG5cdCAqL1xuXHRwdWJsaWMgYmVnaW5HcmFkaWVudEZpbGwodHlwZTpHcmFkaWVudFR5cGUsIGNvbG9yczpBcnJheTxudW1iZXIgLyppbnQqLz4sIGFscGhhczpBcnJheTxudW1iZXI+LCByYXRpb3M6QXJyYXk8bnVtYmVyIC8qaW50Ki8+LCBtYXRyaXg6TWF0cml4ID0gbnVsbCwgc3ByZWFkTWV0aG9kOnN0cmluZyA9IFwicGFkXCIsIGludGVycG9sYXRpb25NZXRob2Q6c3RyaW5nID0gXCJyZ2JcIiwgZm9jYWxQb2ludFJhdGlvOm51bWJlciA9IDApXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyBhIHNoYWRlciBmaWxsIHVzZWQgYnkgc3Vic2VxdWVudCBjYWxscyB0byBvdGhlciBHcmFwaGljcyBtZXRob2RzXG5cdCAqIChzdWNoIGFzIDxjb2RlPmxpbmVUbygpPC9jb2RlPiBvciA8Y29kZT5kcmF3Q2lyY2xlKCk8L2NvZGU+KSBmb3IgdGhlXG5cdCAqIG9iamVjdC4gVGhlIGZpbGwgcmVtYWlucyBpbiBlZmZlY3QgdW50aWwgeW91IGNhbGwgdGhlXG5cdCAqIDxjb2RlPmJlZ2luRmlsbCgpPC9jb2RlPiwgPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+LFxuXHQgKiA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiwgb3IgPGNvZGU+YmVnaW5TaGFkZXJGaWxsKCk8L2NvZGU+XG5cdCAqIG1ldGhvZC4gQ2FsbGluZyB0aGUgPGNvZGU+Y2xlYXIoKTwvY29kZT4gbWV0aG9kIGNsZWFycyB0aGUgZmlsbC5cblx0ICpcblx0ICogPHA+VGhlIGFwcGxpY2F0aW9uIHJlbmRlcnMgdGhlIGZpbGwgd2hlbmV2ZXIgdGhyZWUgb3IgbW9yZSBwb2ludHMgYXJlXG5cdCAqIGRyYXduLCBvciB3aGVuIHRoZSA8Y29kZT5lbmRGaWxsKCk8L2NvZGU+IG1ldGhvZCBpcyBjYWxsZWQuPC9wPlxuXHQgKlxuXHQgKiA8cD5TaGFkZXIgZmlsbHMgYXJlIG5vdCBzdXBwb3J0ZWQgdW5kZXIgR1BVIHJlbmRlcmluZzsgZmlsbGVkIGFyZWFzIHdpbGxcblx0ICogYmUgY29sb3JlZCBjeWFuLjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHNoYWRlciBUaGUgc2hhZGVyIHRvIHVzZSBmb3IgdGhlIGZpbGwuIFRoaXMgU2hhZGVyIGluc3RhbmNlIGlzIG5vdFxuXHQgKiAgICAgICAgICAgICAgIHJlcXVpcmVkIHRvIHNwZWNpZnkgYW4gaW1hZ2UgaW5wdXQuIEhvd2V2ZXIsIGlmIGFuIGltYWdlXG5cdCAqICAgICAgICAgICAgICAgaW5wdXQgaXMgc3BlY2lmaWVkIGluIHRoZSBzaGFkZXIsIHRoZSBpbnB1dCBtdXN0IGJlIHByb3ZpZGVkXG5cdCAqICAgICAgICAgICAgICAgbWFudWFsbHkuIFRvIHNwZWNpZnkgdGhlIGlucHV0LCBzZXQgdGhlIDxjb2RlPmlucHV0PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgIHByb3BlcnR5IG9mIHRoZSBjb3JyZXNwb25kaW5nIFNoYWRlcklucHV0IHByb3BlcnR5IG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgIDxjb2RlPlNoYWRlci5kYXRhPC9jb2RlPiBwcm9wZXJ0eS5cblx0ICpcblx0ICogICAgICAgICAgICAgICA8cD5XaGVuIHlvdSBwYXNzIGEgU2hhZGVyIGluc3RhbmNlIGFzIGFuIGFyZ3VtZW50IHRoZSBzaGFkZXJcblx0ICogICAgICAgICAgICAgICBpcyBjb3BpZWQgaW50ZXJuYWxseS4gVGhlIGRyYXdpbmcgZmlsbCBvcGVyYXRpb24gdXNlcyB0aGF0XG5cdCAqICAgICAgICAgICAgICAgaW50ZXJuYWwgY29weSwgbm90IGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCBzaGFkZXIuIEFueVxuXHQgKiAgICAgICAgICAgICAgIGNoYW5nZXMgbWFkZSB0byB0aGUgc2hhZGVyLCBzdWNoIGFzIGNoYW5naW5nIGEgcGFyYW1ldGVyXG5cdCAqICAgICAgICAgICAgICAgdmFsdWUsIGlucHV0LCBvciBieXRlY29kZSwgYXJlIG5vdCBhcHBsaWVkIHRvIHRoZSBjb3BpZWRcblx0ICogICAgICAgICAgICAgICBzaGFkZXIgdGhhdCdzIHVzZWQgZm9yIHRoZSBmaWxsLjwvcD5cblx0ICogQHBhcmFtIG1hdHJpeCBBIG1hdHJpeCBvYmplY3Qob2YgdGhlIGZsYXNoLmdlb20uTWF0cml4IGNsYXNzKSwgd2hpY2ggeW91XG5cdCAqICAgICAgICAgICAgICAgY2FuIHVzZSB0byBkZWZpbmUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBzaGFkZXIuIEZvclxuXHQgKiAgICAgICAgICAgICAgIGV4YW1wbGUsIHlvdSBjYW4gdXNlIHRoZSBmb2xsb3dpbmcgbWF0cml4IHRvIHJvdGF0ZSBhIHNoYWRlclxuXHQgKiAgICAgICAgICAgICAgIGJ5IDQ1IGRlZ3JlZXMocGkvNCByYWRpYW5zKTpcblx0ICpcblx0ICogICAgICAgICAgICAgICA8cD5UaGUgY29vcmRpbmF0ZXMgcmVjZWl2ZWQgaW4gdGhlIHNoYWRlciBhcmUgYmFzZWQgb24gdGhlXG5cdCAqICAgICAgICAgICAgICAgbWF0cml4IHRoYXQgaXMgc3BlY2lmaWVkIGZvciB0aGUgPGNvZGU+bWF0cml4PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgIHBhcmFtZXRlci4gRm9yIGEgZGVmYXVsdCg8Y29kZT5udWxsPC9jb2RlPikgbWF0cml4LCB0aGVcblx0ICogICAgICAgICAgICAgICBjb29yZGluYXRlcyBpbiB0aGUgc2hhZGVyIGFyZSBsb2NhbCBwaXhlbCBjb29yZGluYXRlcyB3aGljaFxuXHQgKiAgICAgICAgICAgICAgIGNhbiBiZSB1c2VkIHRvIHNhbXBsZSBhbiBpbnB1dC48L3A+XG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIHRoZSBzaGFkZXIgb3V0cHV0IHR5cGUgaXMgbm90IGNvbXBhdGlibGUgd2l0aFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvcGVyYXRpb24odGhlIHNoYWRlciBtdXN0IHNwZWNpZnkgYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cGl4ZWwzPC9jb2RlPiBvciA8Y29kZT5waXhlbDQ8L2NvZGU+IG91dHB1dCkuXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIHRoZSBzaGFkZXIgc3BlY2lmaWVzIGFuIGltYWdlIGlucHV0IHRoYXQgaXNuJ3Rcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVkLlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgV2hlbiBhIEJ5dGVBcnJheSBvciBWZWN0b3IuPE51bWJlcj4gaW5zdGFuY2UgaXMgdXNlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYXMgYW4gaW5wdXQgYW5kIHRoZSA8Y29kZT53aWR0aDwvY29kZT4gYW5kXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMgYXJlbid0IHNwZWNpZmllZCBmb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoZSBTaGFkZXJJbnB1dCwgb3IgdGhlIHNwZWNpZmllZCB2YWx1ZXMgZG9uJ3QgbWF0Y2hcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoZSBhbW91bnQgb2YgZGF0YSBpbiB0aGUgaW5wdXQgb2JqZWN0LiBTZWUgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TaGFkZXJJbnB1dC5pbnB1dDwvY29kZT4gcHJvcGVydHkgZm9yIG1vcmVcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGluZm9ybWF0aW9uLlxuXHQgKi9cbi8vXHRcdHB1YmxpYyBiZWdpblNoYWRlckZpbGwoc2hhZGVyOlNoYWRlciwgbWF0cml4Ok1hdHJpeCA9IG51bGwpXG4vL1x0XHR7XG4vL1xuLy9cdFx0fVxuXG5cdC8qKlxuXHQgKiBDbGVhcnMgdGhlIGdyYXBoaWNzIHRoYXQgd2VyZSBkcmF3biB0byB0aGlzIEdyYXBoaWNzIG9iamVjdCwgYW5kIHJlc2V0c1xuXHQgKiBmaWxsIGFuZCBsaW5lIHN0eWxlIHNldHRpbmdzLlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGNsZWFyKClcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICogQ29waWVzIGFsbCBvZiBkcmF3aW5nIGNvbW1hbmRzIGZyb20gdGhlIHNvdXJjZSBHcmFwaGljcyBvYmplY3QgaW50byB0aGVcblx0ICogY2FsbGluZyBHcmFwaGljcyBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBzb3VyY2VHcmFwaGljcyBUaGUgR3JhcGhpY3Mgb2JqZWN0IGZyb20gd2hpY2ggdG8gY29weSB0aGUgZHJhd2luZ1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMuXG5cdCAqL1xuXHRwdWJsaWMgY29weUZyb20oc291cmNlR3JhcGhpY3M6R3JhcGhpY3MpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIERyYXdzIGEgY3ViaWMgQmV6aWVyIGN1cnZlIGZyb20gdGhlIGN1cnJlbnQgZHJhd2luZyBwb3NpdGlvbiB0byB0aGVcblx0ICogc3BlY2lmaWVkIGFuY2hvciBwb2ludC4gQ3ViaWMgQmV6aWVyIGN1cnZlcyBjb25zaXN0IG9mIHR3byBhbmNob3IgcG9pbnRzXG5cdCAqIGFuZCB0d28gY29udHJvbCBwb2ludHMuIFRoZSBjdXJ2ZSBpbnRlcnBvbGF0ZXMgdGhlIHR3byBhbmNob3IgcG9pbnRzIGFuZFxuXHQgKiBjdXJ2ZXMgdG93YXJkIHRoZSB0d28gY29udHJvbCBwb2ludHMuXG5cdCAqXG5cdCAqIFRoZSBmb3VyIHBvaW50cyB5b3UgdXNlIHRvIGRyYXcgYSBjdWJpYyBCZXppZXIgY3VydmUgd2l0aCB0aGVcblx0ICogPGNvZGU+Y3ViaWNDdXJ2ZVRvKCk8L2NvZGU+IG1ldGhvZCBhcmUgYXMgZm9sbG93czpcblx0ICpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT5UaGUgY3VycmVudCBkcmF3aW5nIHBvc2l0aW9uIGlzIHRoZSBmaXJzdCBhbmNob3IgcG9pbnQuIDwvbGk+XG5cdCAqICAgPGxpPlRoZSBhbmNob3JYIGFuZCBhbmNob3JZIHBhcmFtZXRlcnMgc3BlY2lmeSB0aGUgc2Vjb25kIGFuY2hvciBwb2ludC5cblx0ICogICA8L2xpPlxuXHQgKiAgIDxsaT5UaGUgPGNvZGU+Y29udHJvbFgxPC9jb2RlPiBhbmQgPGNvZGU+Y29udHJvbFkxPC9jb2RlPiBwYXJhbWV0ZXJzXG5cdCAqICAgc3BlY2lmeSB0aGUgZmlyc3QgY29udHJvbCBwb2ludC48L2xpPlxuXHQgKiAgIDxsaT5UaGUgPGNvZGU+Y29udHJvbFgyPC9jb2RlPiBhbmQgPGNvZGU+Y29udHJvbFkyPC9jb2RlPiBwYXJhbWV0ZXJzXG5cdCAqICAgc3BlY2lmeSB0aGUgc2Vjb25kIGNvbnRyb2wgcG9pbnQuPC9saT5cblx0ICogPC91bD5cblx0ICpcblx0ICogSWYgeW91IGNhbGwgdGhlIDxjb2RlPmN1YmljQ3VydmVUbygpPC9jb2RlPiBtZXRob2QgYmVmb3JlIGNhbGxpbmcgdGhlXG5cdCAqIDxjb2RlPm1vdmVUbygpPC9jb2RlPiBtZXRob2QsIHlvdXIgY3VydmUgc3RhcnRzIGF0IHBvc2l0aW9uICgwLCAwKS5cblx0ICpcblx0ICogSWYgdGhlIDxjb2RlPmN1YmljQ3VydmVUbygpPC9jb2RlPiBtZXRob2Qgc3VjY2VlZHMsIHRoZSBGbGFzaCBydW50aW1lIHNldHNcblx0ICogdGhlIGN1cnJlbnQgZHJhd2luZyBwb3NpdGlvbiB0byAoPGNvZGU+YW5jaG9yWDwvY29kZT4sXG5cdCAqIDxjb2RlPmFuY2hvclk8L2NvZGU+KS4gSWYgdGhlIDxjb2RlPmN1YmljQ3VydmVUbygpPC9jb2RlPiBtZXRob2QgZmFpbHMsXG5cdCAqIHRoZSBjdXJyZW50IGRyYXdpbmcgcG9zaXRpb24gcmVtYWlucyB1bmNoYW5nZWQuXG5cdCAqXG5cdCAqIElmIHlvdXIgbW92aWUgY2xpcCBjb250YWlucyBjb250ZW50IGNyZWF0ZWQgd2l0aCB0aGUgRmxhc2ggZHJhd2luZyB0b29scyxcblx0ICogdGhlIHJlc3VsdHMgb2YgY2FsbHMgdG8gdGhlIDxjb2RlPmN1YmljQ3VydmVUbygpPC9jb2RlPiBtZXRob2QgYXJlIGRyYXduXG5cdCAqIHVuZGVybmVhdGggdGhhdCBjb250ZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0gY29udHJvbFgxIFNwZWNpZmllcyB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgY29udHJvbFxuXHQgKiAgICAgICAgICAgICAgICAgIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudFxuXHQgKiAgICAgICAgICAgICAgICAgIGRpc3BsYXkgb2JqZWN0LlxuXHQgKiBAcGFyYW0gY29udHJvbFkxIFNwZWNpZmllcyB0aGUgdmVydGljYWwgcG9zaXRpb24gb2YgdGhlIGZpcnN0IGNvbnRyb2xcblx0ICogICAgICAgICAgICAgICAgICBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnRcblx0ICogICAgICAgICAgICAgICAgICBkaXNwbGF5IG9iamVjdC5cblx0ICogQHBhcmFtIGNvbnRyb2xYMiBTcGVjaWZpZXMgdGhlIGhvcml6b250YWwgcG9zaXRpb24gb2YgdGhlIHNlY29uZCBjb250cm9sXG5cdCAqICAgICAgICAgICAgICAgICAgcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50XG5cdCAqICAgICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QuXG5cdCAqIEBwYXJhbSBjb250cm9sWTIgU3BlY2lmaWVzIHRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiBvZiB0aGUgc2Vjb25kIGNvbnRyb2xcblx0ICogICAgICAgICAgICAgICAgICBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnRcblx0ICogICAgICAgICAgICAgICAgICBkaXNwbGF5IG9iamVjdC5cblx0ICogQHBhcmFtIGFuY2hvclggICBTcGVjaWZpZXMgdGhlIGhvcml6b250YWwgcG9zaXRpb24gb2YgdGhlIGFuY2hvciBwb2ludFxuXHQgKiAgICAgICAgICAgICAgICAgIHJlbGF0aXZlIHRvIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudCBkaXNwbGF5XG5cdCAqICAgICAgICAgICAgICAgICAgb2JqZWN0LlxuXHQgKiBAcGFyYW0gYW5jaG9yWSAgIFNwZWNpZmllcyB0aGUgdmVydGljYWwgcG9zaXRpb24gb2YgdGhlIGFuY2hvciBwb2ludFxuXHQgKiAgICAgICAgICAgICAgICAgIHJlbGF0aXZlIHRvIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudCBkaXNwbGF5XG5cdCAqICAgICAgICAgICAgICAgICAgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGN1YmljQ3VydmVUbyhjb250cm9sWDE6bnVtYmVyLCBjb250cm9sWTE6bnVtYmVyLCBjb250cm9sWDI6bnVtYmVyLCBjb250cm9sWTI6bnVtYmVyLCBhbmNob3JYOm51bWJlciwgYW5jaG9yWTpudW1iZXIpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIERyYXdzIGEgY3VydmUgdXNpbmcgdGhlIGN1cnJlbnQgbGluZSBzdHlsZSBmcm9tIHRoZSBjdXJyZW50IGRyYXdpbmdcblx0ICogcG9zaXRpb24gdG8oYW5jaG9yWCwgYW5jaG9yWSkgYW5kIHVzaW5nIHRoZSBjb250cm9sIHBvaW50IHRoYXRcblx0ICogKDxjb2RlPmNvbnRyb2xYPC9jb2RlPiwgPGNvZGU+Y29udHJvbFk8L2NvZGU+KSBzcGVjaWZpZXMuIFRoZSBjdXJyZW50XG5cdCAqIGRyYXdpbmcgcG9zaXRpb24gaXMgdGhlbiBzZXQgdG8oPGNvZGU+YW5jaG9yWDwvY29kZT4sXG5cdCAqIDxjb2RlPmFuY2hvclk8L2NvZGU+KS4gSWYgdGhlIG1vdmllIGNsaXAgaW4gd2hpY2ggeW91IGFyZSBkcmF3aW5nIGNvbnRhaW5zXG5cdCAqIGNvbnRlbnQgY3JlYXRlZCB3aXRoIHRoZSBGbGFzaCBkcmF3aW5nIHRvb2xzLCBjYWxscyB0byB0aGVcblx0ICogPGNvZGU+Y3VydmVUbygpPC9jb2RlPiBtZXRob2QgYXJlIGRyYXduIHVuZGVybmVhdGggdGhpcyBjb250ZW50LiBJZiB5b3Vcblx0ICogY2FsbCB0aGUgPGNvZGU+Y3VydmVUbygpPC9jb2RlPiBtZXRob2QgYmVmb3JlIGFueSBjYWxscyB0byB0aGVcblx0ICogPGNvZGU+bW92ZVRvKCk8L2NvZGU+IG1ldGhvZCwgdGhlIGRlZmF1bHQgb2YgdGhlIGN1cnJlbnQgZHJhd2luZyBwb3NpdGlvblxuXHQgKiBpcygwLCAwKS4gSWYgYW55IG9mIHRoZSBwYXJhbWV0ZXJzIGFyZSBtaXNzaW5nLCB0aGlzIG1ldGhvZCBmYWlscyBhbmQgdGhlXG5cdCAqIGN1cnJlbnQgZHJhd2luZyBwb3NpdGlvbiBpcyBub3QgY2hhbmdlZC5cblx0ICpcblx0ICogPHA+VGhlIGN1cnZlIGRyYXduIGlzIGEgcXVhZHJhdGljIEJlemllciBjdXJ2ZS4gUXVhZHJhdGljIEJlemllciBjdXJ2ZXNcblx0ICogY29uc2lzdCBvZiB0d28gYW5jaG9yIHBvaW50cyBhbmQgb25lIGNvbnRyb2wgcG9pbnQuIFRoZSBjdXJ2ZSBpbnRlcnBvbGF0ZXNcblx0ICogdGhlIHR3byBhbmNob3IgcG9pbnRzIGFuZCBjdXJ2ZXMgdG93YXJkIHRoZSBjb250cm9sIHBvaW50LiA8L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBjb250cm9sWCBBIG51bWJlciB0aGF0IHNwZWNpZmllcyB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbiBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgIGNvbnRyb2wgcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgIHBhcmVudCBkaXNwbGF5IG9iamVjdC5cblx0ICogQHBhcmFtIGNvbnRyb2xZIEEgbnVtYmVyIHRoYXQgc3BlY2lmaWVzIHRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgIGNvbnRyb2wgcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgIHBhcmVudCBkaXNwbGF5IG9iamVjdC5cblx0ICogQHBhcmFtIGFuY2hvclggIEEgbnVtYmVyIHRoYXQgc3BlY2lmaWVzIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgbmV4dCBhbmNob3IgcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZlxuXHQgKiAgICAgICAgICAgICAgICAgdGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdC5cblx0ICogQHBhcmFtIGFuY2hvclkgIEEgbnVtYmVyIHRoYXQgc3BlY2lmaWVzIHRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiBvZiB0aGUgbmV4dFxuXHQgKiAgICAgICAgICAgICAgICAgYW5jaG9yIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICBwYXJlbnQgZGlzcGxheSBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY3VydmVUbyhjb250cm9sWDpudW1iZXIsIGNvbnRyb2xZOm51bWJlciwgYW5jaG9yWDpudW1iZXIsIGFuY2hvclk6bnVtYmVyKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBEcmF3cyBhIGNpcmNsZS4gU2V0IHRoZSBsaW5lIHN0eWxlLCBmaWxsLCBvciBib3RoIGJlZm9yZSB5b3UgY2FsbCB0aGVcblx0ICogPGNvZGU+ZHJhd0NpcmNsZSgpPC9jb2RlPiBtZXRob2QsIGJ5IGNhbGxpbmcgdGhlIDxjb2RlPmxpbmVzdHlsZSgpPC9jb2RlPixcblx0ICogPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4sIDxjb2RlPmJlZ2luRmlsbCgpPC9jb2RlPixcblx0ICogPGNvZGU+YmVnaW5HcmFkaWVudEZpbGwoKTwvY29kZT4sIG9yIDxjb2RlPmJlZ2luQml0bWFwRmlsbCgpPC9jb2RlPlxuXHQgKiBtZXRob2QuXG5cdCAqXG5cdCAqIEBwYXJhbSB4ICAgICAgVGhlIDxpPng8L2k+IGxvY2F0aW9uIG9mIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZVxuXHQgKiAgICAgICAgICAgICAgIHRvIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdChpblxuXHQgKiAgICAgICAgICAgICAgIHBpeGVscykuXG5cdCAqIEBwYXJhbSB5ICAgICAgVGhlIDxpPnk8L2k+IGxvY2F0aW9uIG9mIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZVxuXHQgKiAgICAgICAgICAgICAgIHRvIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdChpblxuXHQgKiAgICAgICAgICAgICAgIHBpeGVscykuXG5cdCAqIEBwYXJhbSByYWRpdXMgVGhlIHJhZGl1cyBvZiB0aGUgY2lyY2xlKGluIHBpeGVscykuXG5cdCAqL1xuXHRwdWJsaWMgZHJhd0NpcmNsZSh4Om51bWJlciwgeTpudW1iZXIsIHJhZGl1czpudW1iZXIpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIERyYXdzIGFuIGVsbGlwc2UuIFNldCB0aGUgbGluZSBzdHlsZSwgZmlsbCwgb3IgYm90aCBiZWZvcmUgeW91IGNhbGwgdGhlXG5cdCAqIDxjb2RlPmRyYXdFbGxpcHNlKCk8L2NvZGU+IG1ldGhvZCwgYnkgY2FsbGluZyB0aGVcblx0ICogPGNvZGU+bGluZXN0eWxlKCk8L2NvZGU+LCA8Y29kZT5saW5lR3JhZGllbnRTdHlsZSgpPC9jb2RlPixcblx0ICogPGNvZGU+YmVnaW5GaWxsKCk8L2NvZGU+LCA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiwgb3Jcblx0ICogPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+IG1ldGhvZC5cblx0ICpcblx0ICogQHBhcmFtIHggICAgICBUaGUgPGk+eDwvaT4gbG9jYXRpb24gb2YgdGhlIHRvcC1sZWZ0IG9mIHRoZSBib3VuZGluZy1ib3ggb2Zcblx0ICogICAgICAgICAgICAgICB0aGUgZWxsaXBzZSByZWxhdGl2ZSB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnRcblx0ICogICAgICAgICAgICAgICBkaXNwbGF5IG9iamVjdChpbiBwaXhlbHMpLlxuXHQgKiBAcGFyYW0geSAgICAgIFRoZSA8aT55PC9pPiBsb2NhdGlvbiBvZiB0aGUgdG9wIGxlZnQgb2YgdGhlIGJvdW5kaW5nLWJveCBvZlxuXHQgKiAgICAgICAgICAgICAgIHRoZSBlbGxpcHNlIHJlbGF0aXZlIHRvIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudFxuXHQgKiAgICAgICAgICAgICAgIGRpc3BsYXkgb2JqZWN0KGluIHBpeGVscykuXG5cdCAqIEBwYXJhbSB3aWR0aCAgVGhlIHdpZHRoIG9mIHRoZSBlbGxpcHNlKGluIHBpeGVscykuXG5cdCAqIEBwYXJhbSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgZWxsaXBzZShpbiBwaXhlbHMpLlxuXHQgKi9cblx0cHVibGljIGRyYXdFbGxpcHNlKHg6bnVtYmVyLCB5Om51bWJlciwgd2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBTdWJtaXRzIGEgc2VyaWVzIG9mIElHcmFwaGljc0RhdGEgaW5zdGFuY2VzIGZvciBkcmF3aW5nLiBUaGlzIG1ldGhvZFxuXHQgKiBhY2NlcHRzIGEgVmVjdG9yIGNvbnRhaW5pbmcgb2JqZWN0cyBpbmNsdWRpbmcgcGF0aHMsIGZpbGxzLCBhbmQgc3Ryb2tlc1xuXHQgKiB0aGF0IGltcGxlbWVudCB0aGUgSUdyYXBoaWNzRGF0YSBpbnRlcmZhY2UuIEEgVmVjdG9yIG9mIElHcmFwaGljc0RhdGFcblx0ICogaW5zdGFuY2VzIGNhbiByZWZlciB0byBhIHBhcnQgb2YgYSBzaGFwZSwgb3IgYSBjb21wbGV4IGZ1bGx5IGRlZmluZWQgc2V0XG5cdCAqIG9mIGRhdGEgZm9yIHJlbmRlcmluZyBhIGNvbXBsZXRlIHNoYXBlLlxuXHQgKlxuXHQgKiA8cD4gR3JhcGhpY3MgcGF0aHMgY2FuIGNvbnRhaW4gb3RoZXIgZ3JhcGhpY3MgcGF0aHMuIElmIHRoZVxuXHQgKiA8Y29kZT5ncmFwaGljc0RhdGE8L2NvZGU+IFZlY3RvciBpbmNsdWRlcyBhIHBhdGgsIHRoYXQgcGF0aCBhbmQgYWxsIGl0c1xuXHQgKiBzdWItcGF0aHMgYXJlIHJlbmRlcmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbi4gPC9wPlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRyYXdHcmFwaGljc0RhdGEoZ3JhcGhpY3NEYXRhOkFycmF5PElHcmFwaGljc0RhdGE+KVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBTdWJtaXRzIGEgc2VyaWVzIG9mIGNvbW1hbmRzIGZvciBkcmF3aW5nLiBUaGUgPGNvZGU+ZHJhd1BhdGgoKTwvY29kZT5cblx0ICogbWV0aG9kIHVzZXMgdmVjdG9yIGFycmF5cyB0byBjb25zb2xpZGF0ZSBpbmRpdmlkdWFsIDxjb2RlPm1vdmVUbygpPC9jb2RlPixcblx0ICogPGNvZGU+bGluZVRvKCk8L2NvZGU+LCBhbmQgPGNvZGU+Y3VydmVUbygpPC9jb2RlPiBkcmF3aW5nIGNvbW1hbmRzIGludG8gYVxuXHQgKiBzaW5nbGUgY2FsbC4gVGhlIDxjb2RlPmRyYXdQYXRoKCk8L2NvZGU+IG1ldGhvZCBwYXJhbWV0ZXJzIGNvbWJpbmUgZHJhd2luZ1xuXHQgKiBjb21tYW5kcyB3aXRoIHgtIGFuZCB5LWNvb3JkaW5hdGUgdmFsdWUgcGFpcnMgYW5kIGEgZHJhd2luZyBkaXJlY3Rpb24uIFRoZVxuXHQgKiBkcmF3aW5nIGNvbW1hbmRzIGFyZSB2YWx1ZXMgZnJvbSB0aGUgR3JhcGhpY3NQYXRoQ29tbWFuZCBjbGFzcy4gVGhlIHgtIGFuZFxuXHQgKiB5LWNvb3JkaW5hdGUgdmFsdWUgcGFpcnMgYXJlIE51bWJlcnMgaW4gYW4gYXJyYXkgd2hlcmUgZWFjaCBwYWlyIGRlZmluZXMgYVxuXHQgKiBjb29yZGluYXRlIGxvY2F0aW9uLiBUaGUgZHJhd2luZyBkaXJlY3Rpb24gaXMgYSB2YWx1ZSBmcm9tIHRoZVxuXHQgKiBHcmFwaGljc1BhdGhXaW5kaW5nIGNsYXNzLlxuXHQgKlxuXHQgKiA8cD4gR2VuZXJhbGx5LCBkcmF3aW5ncyByZW5kZXIgZmFzdGVyIHdpdGggPGNvZGU+ZHJhd1BhdGgoKTwvY29kZT4gdGhhblxuXHQgKiB3aXRoIGEgc2VyaWVzIG9mIGluZGl2aWR1YWwgPGNvZGU+bGluZVRvKCk8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT5jdXJ2ZVRvKCk8L2NvZGU+IG1ldGhvZHMuIDwvcD5cblx0ICpcblx0ICogPHA+IFRoZSA8Y29kZT5kcmF3UGF0aCgpPC9jb2RlPiBtZXRob2QgdXNlcyBhIHVzZXMgYSBmbG9hdGluZyBjb21wdXRhdGlvblxuXHQgKiBzbyByb3RhdGlvbiBhbmQgc2NhbGluZyBvZiBzaGFwZXMgaXMgbW9yZSBhY2N1cmF0ZSBhbmQgZ2l2ZXMgYmV0dGVyXG5cdCAqIHJlc3VsdHMuIEhvd2V2ZXIsIGN1cnZlcyBzdWJtaXR0ZWQgdXNpbmcgdGhlIDxjb2RlPmRyYXdQYXRoKCk8L2NvZGU+XG5cdCAqIG1ldGhvZCBjYW4gaGF2ZSBzbWFsbCBzdWItcGl4ZWwgYWxpZ25tZW50IGVycm9ycyB3aGVuIHVzZWQgaW4gY29uanVuY3Rpb25cblx0ICogd2l0aCB0aGUgPGNvZGU+bGluZVRvKCk8L2NvZGU+IGFuZCA8Y29kZT5jdXJ2ZVRvKCk8L2NvZGU+IG1ldGhvZHMuIDwvcD5cblx0ICpcblx0ICogPHA+IFRoZSA8Y29kZT5kcmF3UGF0aCgpPC9jb2RlPiBtZXRob2QgYWxzbyB1c2VzIHNsaWdodGx5IGRpZmZlcmVudCBydWxlc1xuXHQgKiBmb3IgZmlsbGluZyBhbmQgZHJhd2luZyBsaW5lcy4gVGhleSBhcmU6IDwvcD5cblx0ICpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT5XaGVuIGEgZmlsbCBpcyBhcHBsaWVkIHRvIHJlbmRlcmluZyBhIHBhdGg6XG5cdCAqIDx1bD5cblx0ICogICA8bGk+QSBzdWItcGF0aCBvZiBsZXNzIHRoYW4gMyBwb2ludHMgaXMgbm90IHJlbmRlcmVkLihCdXQgbm90ZSB0aGF0IHRoZVxuXHQgKiBzdHJva2UgcmVuZGVyaW5nIHdpbGwgc3RpbGwgb2NjdXIsIGNvbnNpc3RlbnQgd2l0aCB0aGUgcnVsZXMgZm9yIHN0cm9rZXNcblx0ICogYmVsb3cuKTwvbGk+XG5cdCAqICAgPGxpPkEgc3ViLXBhdGggdGhhdCBpc24ndCBjbG9zZWQodGhlIGVuZCBwb2ludCBpcyBub3QgZXF1YWwgdG8gdGhlXG5cdCAqIGJlZ2luIHBvaW50KSBpcyBpbXBsaWNpdGx5IGNsb3NlZC48L2xpPlxuXHQgKiA8L3VsPlxuXHQgKiA8L2xpPlxuXHQgKiAgIDxsaT5XaGVuIGEgc3Ryb2tlIGlzIGFwcGxpZWQgdG8gcmVuZGVyaW5nIGEgcGF0aDpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT5UaGUgc3ViLXBhdGhzIGNhbiBiZSBjb21wb3NlZCBvZiBhbnkgbnVtYmVyIG9mIHBvaW50cy48L2xpPlxuXHQgKiAgIDxsaT5UaGUgc3ViLXBhdGggaXMgbmV2ZXIgaW1wbGljaXRseSBjbG9zZWQuPC9saT5cblx0ICogPC91bD5cblx0ICogPC9saT5cblx0ICogPC91bD5cblx0ICpcblx0ICogQHBhcmFtIHdpbmRpbmcgU3BlY2lmaWVzIHRoZSB3aW5kaW5nIHJ1bGUgdXNpbmcgYSB2YWx1ZSBkZWZpbmVkIGluIHRoZVxuXHQgKiAgICAgICAgICAgICAgICBHcmFwaGljc1BhdGhXaW5kaW5nIGNsYXNzLlxuXHQgKi9cblx0cHVibGljIGRyYXdQYXRoKGNvbW1hbmRzOkFycmF5PG51bWJlciAvKmludCovPiwgZGF0YTpBcnJheTxudW1iZXI+LCB3aW5kaW5nOkdyYXBoaWNzUGF0aFdpbmRpbmcpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIERyYXdzIGEgcmVjdGFuZ2xlLiBTZXQgdGhlIGxpbmUgc3R5bGUsIGZpbGwsIG9yIGJvdGggYmVmb3JlIHlvdSBjYWxsIHRoZVxuXHQgKiA8Y29kZT5kcmF3UmVjdCgpPC9jb2RlPiBtZXRob2QsIGJ5IGNhbGxpbmcgdGhlIDxjb2RlPmxpbmVzdHlsZSgpPC9jb2RlPixcblx0ICogPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4sIDxjb2RlPmJlZ2luRmlsbCgpPC9jb2RlPixcblx0ICogPGNvZGU+YmVnaW5HcmFkaWVudEZpbGwoKTwvY29kZT4sIG9yIDxjb2RlPmJlZ2luQml0bWFwRmlsbCgpPC9jb2RlPlxuXHQgKiBtZXRob2QuXG5cdCAqXG5cdCAqIEBwYXJhbSB4ICAgICAgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGVcblx0ICogICAgICAgICAgICAgICByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdChpbiBwaXhlbHMpLlxuXHQgKiBAcGFyYW0geSAgICAgIEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIHZlcnRpY2FsIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZVxuXHQgKiAgICAgICAgICAgICAgIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50IGRpc3BsYXkgb2JqZWN0KGluIHBpeGVscykuXG5cdCAqIEBwYXJhbSB3aWR0aCAgVGhlIHdpZHRoIG9mIHRoZSByZWN0YW5nbGUoaW4gcGl4ZWxzKS5cblx0ICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSByZWN0YW5nbGUoaW4gcGl4ZWxzKS5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIElmIHRoZSA8Y29kZT53aWR0aDwvY29kZT4gb3IgPGNvZGU+aGVpZ2h0PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVycyBhcmUgbm90IGEgbnVtYmVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICg8Y29kZT5OdW1iZXIuTmFOPC9jb2RlPikuXG5cdCAqL1xuXHRwdWJsaWMgZHJhd1JlY3QoeDpudW1iZXIsIHk6bnVtYmVyLCB3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIERyYXdzIGEgcm91bmRlZCByZWN0YW5nbGUuIFNldCB0aGUgbGluZSBzdHlsZSwgZmlsbCwgb3IgYm90aCBiZWZvcmUgeW91XG5cdCAqIGNhbGwgdGhlIDxjb2RlPmRyYXdSb3VuZFJlY3QoKTwvY29kZT4gbWV0aG9kLCBieSBjYWxsaW5nIHRoZVxuXHQgKiA8Y29kZT5saW5lc3R5bGUoKTwvY29kZT4sIDxjb2RlPmxpbmVHcmFkaWVudFN0eWxlKCk8L2NvZGU+LFxuXHQgKiA8Y29kZT5iZWdpbkZpbGwoKTwvY29kZT4sIDxjb2RlPmJlZ2luR3JhZGllbnRGaWxsKCk8L2NvZGU+LCBvclxuXHQgKiA8Y29kZT5iZWdpbkJpdG1hcEZpbGwoKTwvY29kZT4gbWV0aG9kLlxuXHQgKlxuXHQgKiBAcGFyYW0geCAgICAgICAgICAgICBBIG51bWJlciBpbmRpY2F0aW5nIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uIHJlbGF0aXZlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudCBkaXNwbGF5XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdChpbiBwaXhlbHMpLlxuXHQgKiBAcGFyYW0geSAgICAgICAgICAgICBBIG51bWJlciBpbmRpY2F0aW5nIHRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiByZWxhdGl2ZSB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3Rcblx0ICogICAgICAgICAgICAgICAgICAgICAoaW4gcGl4ZWxzKS5cblx0ICogQHBhcmFtIHdpZHRoICAgICAgICAgVGhlIHdpZHRoIG9mIHRoZSByb3VuZCByZWN0YW5nbGUoaW4gcGl4ZWxzKS5cblx0ICogQHBhcmFtIGhlaWdodCAgICAgICAgVGhlIGhlaWdodCBvZiB0aGUgcm91bmQgcmVjdGFuZ2xlKGluIHBpeGVscykuXG5cdCAqIEBwYXJhbSBlbGxpcHNlV2lkdGggIFRoZSB3aWR0aCBvZiB0aGUgZWxsaXBzZSB1c2VkIHRvIGRyYXcgdGhlIHJvdW5kZWRcblx0ICogICAgICAgICAgICAgICAgICAgICAgY29ybmVycyhpbiBwaXhlbHMpLlxuXHQgKiBAcGFyYW0gZWxsaXBzZUhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBlbGxpcHNlIHVzZWQgdG8gZHJhdyB0aGUgcm91bmRlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJzKGluIHBpeGVscykuIE9wdGlvbmFsOyBpZiBubyB2YWx1ZSBpc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZWQsIHRoZSBkZWZhdWx0IHZhbHVlIG1hdGNoZXMgdGhhdCBwcm92aWRlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhlIDxjb2RlPmVsbGlwc2VXaWR0aDwvY29kZT4gcGFyYW1ldGVyLlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgSWYgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiwgPGNvZGU+aGVpZ2h0PC9jb2RlPixcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmVsbGlwc2VXaWR0aDwvY29kZT4gb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmVsbGlwc2VIZWlnaHQ8L2NvZGU+IHBhcmFtZXRlcnMgYXJlIG5vdCBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBudW1iZXIoPGNvZGU+TnVtYmVyLk5hTjwvY29kZT4pLlxuXHQgKi9cblx0cHVibGljIGRyYXdSb3VuZFJlY3QoeDpudW1iZXIsIHk6bnVtYmVyLCB3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIsIGVsbGlwc2VXaWR0aDpudW1iZXIsIGVsbGlwc2VIZWlnaHQ6bnVtYmVyID0gTmFOKVxuXHR7XG5cblx0fVxuXG5cdC8vcHVibGljIGRyYXdSb3VuZFJlY3RDb21wbGV4KHg6RmxvYXQsIHk6RmxvYXQsIHdpZHRoOkZsb2F0LCBoZWlnaHQ6RmxvYXQsIHRvcExlZnRSYWRpdXM6RmxvYXQsIHRvcFJpZ2h0UmFkaXVzOkZsb2F0LCBib3R0b21MZWZ0UmFkaXVzOkZsb2F0LCBib3R0b21SaWdodFJhZGl1czpGbG9hdCk6Vm9pZDtcblxuXHQvKipcblx0ICogUmVuZGVycyBhIHNldCBvZiB0cmlhbmdsZXMsIHR5cGljYWxseSB0byBkaXN0b3J0IGJpdG1hcHMgYW5kIGdpdmUgdGhlbSBhXG5cdCAqIHRocmVlLWRpbWVuc2lvbmFsIGFwcGVhcmFuY2UuIFRoZSA8Y29kZT5kcmF3VHJpYW5nbGVzKCk8L2NvZGU+IG1ldGhvZCBtYXBzXG5cdCAqIGVpdGhlciB0aGUgY3VycmVudCBmaWxsLCBvciBhIGJpdG1hcCBmaWxsLCB0byB0aGUgdHJpYW5nbGUgZmFjZXMgdXNpbmcgYVxuXHQgKiBzZXQgb2YodSx2KSBjb29yZGluYXRlcy5cblx0ICpcblx0ICogPHA+IEFueSB0eXBlIG9mIGZpbGwgY2FuIGJlIHVzZWQsIGJ1dCBpZiB0aGUgZmlsbCBoYXMgYSB0cmFuc2Zvcm0gbWF0cml4XG5cdCAqIHRoYXQgdHJhbnNmb3JtIG1hdHJpeCBpcyBpZ25vcmVkLiA8L3A+XG5cdCAqXG5cdCAqIDxwPiBBIDxjb2RlPnV2dERhdGE8L2NvZGU+IHBhcmFtZXRlciBpbXByb3ZlcyB0ZXh0dXJlIG1hcHBpbmcgd2hlbiBhXG5cdCAqIGJpdG1hcCBmaWxsIGlzIHVzZWQuIDwvcD5cblx0ICpcblx0ICogQHBhcmFtIGN1bGxpbmcgU3BlY2lmaWVzIHdoZXRoZXIgdG8gcmVuZGVyIHRyaWFuZ2xlcyB0aGF0IGZhY2UgaW4gYVxuXHQgKiAgICAgICAgICAgICAgICBzcGVjaWZpZWQgZGlyZWN0aW9uLiBUaGlzIHBhcmFtZXRlciBwcmV2ZW50cyB0aGUgcmVuZGVyaW5nXG5cdCAqICAgICAgICAgICAgICAgIG9mIHRyaWFuZ2xlcyB0aGF0IGNhbm5vdCBiZSBzZWVuIGluIHRoZSBjdXJyZW50IHZpZXcuIFRoaXNcblx0ICogICAgICAgICAgICAgICAgcGFyYW1ldGVyIGNhbiBiZSBzZXQgdG8gYW55IHZhbHVlIGRlZmluZWQgYnkgdGhlXG5cdCAqICAgICAgICAgICAgICAgIFRyaWFuZ2xlQ3VsbGluZyBjbGFzcy5cblx0ICovXG5cdHB1YmxpYyBkcmF3VHJpYW5nbGVzKHZlcnRpY2VzOkFycmF5PG51bWJlcj4sIGluZGljZXM6QXJyYXk8bnVtYmVyIC8qaW50Ki8+ID0gbnVsbCwgdXZ0RGF0YTpBcnJheTxudW1iZXI+ID0gbnVsbCwgY3VsbGluZzpUcmlhbmdsZUN1bGxpbmcgPSBudWxsKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBsaWVzIGEgZmlsbCB0byB0aGUgbGluZXMgYW5kIGN1cnZlcyB0aGF0IHdlcmUgYWRkZWQgc2luY2UgdGhlIGxhc3QgY2FsbFxuXHQgKiB0byB0aGUgPGNvZGU+YmVnaW5GaWxsKCk8L2NvZGU+LCA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiwgb3Jcblx0ICogPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+IG1ldGhvZC4gRmxhc2ggdXNlcyB0aGUgZmlsbCB0aGF0IHdhc1xuXHQgKiBzcGVjaWZpZWQgaW4gdGhlIHByZXZpb3VzIGNhbGwgdG8gdGhlIDxjb2RlPmJlZ2luRmlsbCgpPC9jb2RlPixcblx0ICogPGNvZGU+YmVnaW5HcmFkaWVudEZpbGwoKTwvY29kZT4sIG9yIDxjb2RlPmJlZ2luQml0bWFwRmlsbCgpPC9jb2RlPlxuXHQgKiBtZXRob2QuIElmIHRoZSBjdXJyZW50IGRyYXdpbmcgcG9zaXRpb24gZG9lcyBub3QgZXF1YWwgdGhlIHByZXZpb3VzXG5cdCAqIHBvc2l0aW9uIHNwZWNpZmllZCBpbiBhIDxjb2RlPm1vdmVUbygpPC9jb2RlPiBtZXRob2QgYW5kIGEgZmlsbCBpc1xuXHQgKiBkZWZpbmVkLCB0aGUgcGF0aCBpcyBjbG9zZWQgd2l0aCBhIGxpbmUgYW5kIHRoZW4gZmlsbGVkLlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGVuZEZpbGwoKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgYSBiaXRtYXAgdG8gdXNlIGZvciB0aGUgbGluZSBzdHJva2Ugd2hlbiBkcmF3aW5nIGxpbmVzLlxuXHQgKlxuXHQgKiA8cD5UaGUgYml0bWFwIGxpbmUgc3R5bGUgaXMgdXNlZCBmb3Igc3Vic2VxdWVudCBjYWxscyB0byBHcmFwaGljcyBtZXRob2RzXG5cdCAqIHN1Y2ggYXMgdGhlIDxjb2RlPmxpbmVUbygpPC9jb2RlPiBtZXRob2Qgb3IgdGhlIDxjb2RlPmRyYXdDaXJjbGUoKTwvY29kZT5cblx0ICogbWV0aG9kLiBUaGUgbGluZSBzdHlsZSByZW1haW5zIGluIGVmZmVjdCB1bnRpbCB5b3UgY2FsbCB0aGVcblx0ICogPGNvZGU+bGluZVN0eWxlKCk8L2NvZGU+IG9yIDxjb2RlPmxpbmVHcmFkaWVudFN0eWxlKCk8L2NvZGU+IG1ldGhvZHMsIG9yXG5cdCAqIHRoZSA8Y29kZT5saW5lQml0bWFwU3R5bGUoKTwvY29kZT4gbWV0aG9kIGFnYWluIHdpdGggZGlmZmVyZW50IHBhcmFtZXRlcnMuXG5cdCAqIDwvcD5cblx0ICpcblx0ICogPHA+WW91IGNhbiBjYWxsIHRoZSA8Y29kZT5saW5lQml0bWFwU3R5bGUoKTwvY29kZT4gbWV0aG9kIGluIHRoZSBtaWRkbGUgb2Zcblx0ICogZHJhd2luZyBhIHBhdGggdG8gc3BlY2lmeSBkaWZmZXJlbnQgc3R5bGVzIGZvciBkaWZmZXJlbnQgbGluZSBzZWdtZW50c1xuXHQgKiB3aXRoaW4gYSBwYXRoLiA8L3A+XG5cdCAqXG5cdCAqIDxwPkNhbGwgdGhlIDxjb2RlPmxpbmVTdHlsZSgpPC9jb2RlPiBtZXRob2QgYmVmb3JlIHlvdSBjYWxsIHRoZVxuXHQgKiA8Y29kZT5saW5lQml0bWFwU3R5bGUoKTwvY29kZT4gbWV0aG9kIHRvIGVuYWJsZSBhIHN0cm9rZSwgb3IgZWxzZSB0aGVcblx0ICogdmFsdWUgb2YgdGhlIGxpbmUgc3R5bGUgaXMgPGNvZGU+dW5kZWZpbmVkPC9jb2RlPi48L3A+XG5cdCAqXG5cdCAqIDxwPkNhbGxzIHRvIHRoZSA8Y29kZT5jbGVhcigpPC9jb2RlPiBtZXRob2Qgc2V0IHRoZSBsaW5lIHN0eWxlIGJhY2sgdG9cblx0ICogPGNvZGU+dW5kZWZpbmVkPC9jb2RlPi4gPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gYml0bWFwIFRoZSBiaXRtYXAgdG8gdXNlIGZvciB0aGUgbGluZSBzdHJva2UuXG5cdCAqIEBwYXJhbSBtYXRyaXggQW4gb3B0aW9uYWwgdHJhbnNmb3JtYXRpb24gbWF0cml4IGFzIGRlZmluZWQgYnkgdGhlXG5cdCAqICAgICAgICAgICAgICAgZmxhc2guZ2VvbS5NYXRyaXggY2xhc3MuIFRoZSBtYXRyaXggY2FuIGJlIHVzZWQgdG8gc2NhbGUgb3Jcblx0ICogICAgICAgICAgICAgICBvdGhlcndpc2UgbWFuaXB1bGF0ZSB0aGUgYml0bWFwIGJlZm9yZSBhcHBseWluZyBpdCB0byB0aGVcblx0ICogICAgICAgICAgICAgICBsaW5lIHN0eWxlLlxuXHQgKiBAcGFyYW0gcmVwZWF0IFdoZXRoZXIgdG8gcmVwZWF0IHRoZSBiaXRtYXAgaW4gYSB0aWxlZCBmYXNoaW9uLlxuXHQgKiBAcGFyYW0gc21vb3RoIFdoZXRoZXIgc21vb3RoaW5nIHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBiaXRtYXAuXG5cdCAqL1xuXHRwdWJsaWMgbGluZUJpdG1hcFN0eWxlKGJpdG1hcDpCaXRtYXBEYXRhLCBtYXRyaXg6TWF0cml4ID0gbnVsbCwgcmVwZWF0OmJvb2xlYW4gPSB0cnVlLCBzbW9vdGg6Ym9vbGVhbiA9IGZhbHNlKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgYSBncmFkaWVudCB0byB1c2UgZm9yIHRoZSBzdHJva2Ugd2hlbiBkcmF3aW5nIGxpbmVzLlxuXHQgKlxuXHQgKiA8cD5UaGUgZ3JhZGllbnQgbGluZSBzdHlsZSBpcyB1c2VkIGZvciBzdWJzZXF1ZW50IGNhbGxzIHRvIEdyYXBoaWNzXG5cdCAqIG1ldGhvZHMgc3VjaCBhcyB0aGUgPGNvZGU+bGluZVRvKCk8L2NvZGU+IG1ldGhvZHMgb3IgdGhlXG5cdCAqIDxjb2RlPmRyYXdDaXJjbGUoKTwvY29kZT4gbWV0aG9kLiBUaGUgbGluZSBzdHlsZSByZW1haW5zIGluIGVmZmVjdCB1bnRpbFxuXHQgKiB5b3UgY2FsbCB0aGUgPGNvZGU+bGluZVN0eWxlKCk8L2NvZGU+IG9yIDxjb2RlPmxpbmVCaXRtYXBTdHlsZSgpPC9jb2RlPlxuXHQgKiBtZXRob2RzLCBvciB0aGUgPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4gbWV0aG9kIGFnYWluIHdpdGhcblx0ICogZGlmZmVyZW50IHBhcmFtZXRlcnMuIDwvcD5cblx0ICpcblx0ICogPHA+WW91IGNhbiBjYWxsIHRoZSA8Y29kZT5saW5lR3JhZGllbnRTdHlsZSgpPC9jb2RlPiBtZXRob2QgaW4gdGhlIG1pZGRsZVxuXHQgKiBvZiBkcmF3aW5nIGEgcGF0aCB0byBzcGVjaWZ5IGRpZmZlcmVudCBzdHlsZXMgZm9yIGRpZmZlcmVudCBsaW5lIHNlZ21lbnRzXG5cdCAqIHdpdGhpbiBhIHBhdGguIDwvcD5cblx0ICpcblx0ICogPHA+Q2FsbCB0aGUgPGNvZGU+bGluZVN0eWxlKCk8L2NvZGU+IG1ldGhvZCBiZWZvcmUgeW91IGNhbGwgdGhlXG5cdCAqIDxjb2RlPmxpbmVHcmFkaWVudFN0eWxlKCk8L2NvZGU+IG1ldGhvZCB0byBlbmFibGUgYSBzdHJva2UsIG9yIGVsc2UgdGhlXG5cdCAqIHZhbHVlIG9mIHRoZSBsaW5lIHN0eWxlIGlzIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4uPC9wPlxuXHQgKlxuXHQgKiA8cD5DYWxscyB0byB0aGUgPGNvZGU+Y2xlYXIoKTwvY29kZT4gbWV0aG9kIHNldCB0aGUgbGluZSBzdHlsZSBiYWNrIHRvXG5cdCAqIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4uIDwvcD5cblx0ICpcblx0ICogQHBhcmFtIHR5cGUgICAgICAgICAgICAgICAgQSB2YWx1ZSBmcm9tIHRoZSBHcmFkaWVudFR5cGUgY2xhc3MgdGhhdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZXMgd2hpY2ggZ3JhZGllbnQgdHlwZSB0byB1c2UsIGVpdGhlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHcmFkaWVudFR5cGUuTElORUFSIG9yIEdyYWRpZW50VHlwZS5SQURJQUwuXG5cdCAqIEBwYXJhbSBjb2xvcnMgICAgICAgICAgICAgIEFuIGFycmF5IG9mIFJHQiBoZXhhZGVjaW1hbCBjb2xvciB2YWx1ZXMgdXNlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiB0aGUgZ3JhZGllbnQ7IGZvciBleGFtcGxlLCByZWQgaXMgMHhGRjAwMDAsXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsdWUgaXMgMHgwMDAwRkYsIGFuZCBzbyBvbi4gWW91IGNhbiBzcGVjaWZ5XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwIHRvIDE1IGNvbG9ycy4gRm9yIGVhY2ggY29sb3IsIHNwZWNpZnkgYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3JyZXNwb25kaW5nIHZhbHVlIGluIHRoZSBhbHBoYXMgYW5kIHJhdGlvc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLlxuXHQgKiBAcGFyYW0gYWxwaGFzICAgICAgICAgICAgICBBbiBhcnJheSBvZiBhbHBoYSB2YWx1ZXMgZm9yIHRoZSBjb3JyZXNwb25kaW5nXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9ycyBpbiB0aGUgY29sb3JzIGFycmF5OyB2YWxpZCB2YWx1ZXMgYXJlIDBcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gMS4gSWYgdGhlIHZhbHVlIGlzIGxlc3MgdGhhbiAwLCB0aGUgZGVmYXVsdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcyAwLiBJZiB0aGUgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIDEsIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IGlzIDEuXG5cdCAqIEBwYXJhbSByYXRpb3MgICAgICAgICAgICAgIEFuIGFycmF5IG9mIGNvbG9yIGRpc3RyaWJ1dGlvbiByYXRpb3M7IHZhbGlkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyBhcmUgMC0yNTUuIFRoaXMgdmFsdWUgZGVmaW5lcyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudGFnZSBvZiB0aGUgd2lkdGggd2hlcmUgdGhlIGNvbG9yIGlzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZWQgYXQgMTAwJS4gVGhlIHZhbHVlIDAgcmVwcmVzZW50cyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCBwb3NpdGlvbiBpbiB0aGUgZ3JhZGllbnQgYm94LCBhbmQgMjU1XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcHJlc2VudHMgdGhlIHJpZ2h0IHBvc2l0aW9uIGluIHRoZSBncmFkaWVudFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3guXG5cdCAqIEBwYXJhbSBtYXRyaXggICAgICAgICAgICAgIEEgdHJhbnNmb3JtYXRpb24gbWF0cml4IGFzIGRlZmluZWQgYnkgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXNoLmdlb20uTWF0cml4IGNsYXNzLiBUaGUgZmxhc2guZ2VvbS5NYXRyaXhcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3MgaW5jbHVkZXMgYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5jcmVhdGVHcmFkaWVudEJveCgpPC9jb2RlPiBtZXRob2QsIHdoaWNoXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHMgeW91IGNvbnZlbmllbnRseSBzZXQgdXAgdGhlIG1hdHJpeCBmb3IgdXNlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggdGhlIDxjb2RlPmxpbmVHcmFkaWVudFN0eWxlKCk8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZC5cblx0ICogQHBhcmFtIHNwcmVhZE1ldGhvZCAgICAgICAgQSB2YWx1ZSBmcm9tIHRoZSBTcHJlYWRNZXRob2QgY2xhc3MgdGhhdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZXMgd2hpY2ggc3ByZWFkIG1ldGhvZCB0byB1c2U6XG5cdCAqIEBwYXJhbSBpbnRlcnBvbGF0aW9uTWV0aG9kIEEgdmFsdWUgZnJvbSB0aGUgSW50ZXJwb2xhdGlvbk1ldGhvZCBjbGFzcyB0aGF0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmllcyB3aGljaCB2YWx1ZSB0byB1c2UuIEZvciBleGFtcGxlLFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zaWRlciBhIHNpbXBsZSBsaW5lYXIgZ3JhZGllbnQgYmV0d2VlbiB0d29cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JzKHdpdGggdGhlIDxjb2RlPnNwcmVhZE1ldGhvZDwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyIHNldCB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TcHJlYWRNZXRob2QuUkVGTEVDVDwvY29kZT4pLiBUaGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmVyZW50IGludGVycG9sYXRpb24gbWV0aG9kcyBhZmZlY3QgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVhcmFuY2UgYXMgZm9sbG93czpcblx0ICogQHBhcmFtIGZvY2FsUG9pbnRSYXRpbyAgICAgQSBudW1iZXIgdGhhdCBjb250cm9scyB0aGUgbG9jYXRpb24gb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY2FsIHBvaW50IG9mIHRoZSBncmFkaWVudC4gVGhlIHZhbHVlIDAgbWVhbnNcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGZvY2FsIHBvaW50IGlzIGluIHRoZSBjZW50ZXIuIFRoZSB2YWx1ZSAxXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5zIHRoZSBmb2NhbCBwb2ludCBpcyBhdCBvbmUgYm9yZGVyIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkaWVudCBjaXJjbGUuIFRoZSB2YWx1ZSAtMSBtZWFucyB0aGF0IHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2NhbCBwb2ludCBpcyBhdCB0aGUgb3RoZXIgYm9yZGVyIG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkaWVudCBjaXJjbGUuIFZhbHVlcyBsZXNzIHRoYW4gLTEgb3IgZ3JlYXRlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGFuIDEgYXJlIHJvdW5kZWQgdG8gLTEgb3IgMS4gVGhlIGZvbGxvd2luZ1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSBzaG93cyBhIGdyYWRpZW50IHdpdGggYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5mb2NhbFBvaW50UmF0aW88L2NvZGU+IG9mIC0wLjc1OlxuXHQgKi9cblx0cHVibGljIGxpbmVHcmFkaWVudFN0eWxlKHR5cGU6R3JhZGllbnRUeXBlLCBjb2xvcnM6QXJyYXk8bnVtYmVyIC8qaW50Ki8+LCBhbHBoYXM6QXJyYXk8bnVtYmVyPiwgcmF0aW9zOkFycmF5PG51bWJlcj4sIG1hdHJpeDpNYXRyaXggPSBudWxsLCBzcHJlYWRNZXRob2Q6U3ByZWFkTWV0aG9kID0gbnVsbCwgaW50ZXJwb2xhdGlvbk1ldGhvZDpJbnRlcnBvbGF0aW9uTWV0aG9kID0gbnVsbCwgZm9jYWxQb2ludFJhdGlvOm51bWJlciA9IDApXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyBhIHNoYWRlciB0byB1c2UgZm9yIHRoZSBsaW5lIHN0cm9rZSB3aGVuIGRyYXdpbmcgbGluZXMuXG5cdCAqXG5cdCAqIDxwPlRoZSBzaGFkZXIgbGluZSBzdHlsZSBpcyB1c2VkIGZvciBzdWJzZXF1ZW50IGNhbGxzIHRvIEdyYXBoaWNzIG1ldGhvZHNcblx0ICogc3VjaCBhcyB0aGUgPGNvZGU+bGluZVRvKCk8L2NvZGU+IG1ldGhvZCBvciB0aGUgPGNvZGU+ZHJhd0NpcmNsZSgpPC9jb2RlPlxuXHQgKiBtZXRob2QuIFRoZSBsaW5lIHN0eWxlIHJlbWFpbnMgaW4gZWZmZWN0IHVudGlsIHlvdSBjYWxsIHRoZVxuXHQgKiA8Y29kZT5saW5lU3R5bGUoKTwvY29kZT4gb3IgPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4gbWV0aG9kcywgb3Jcblx0ICogdGhlIDxjb2RlPmxpbmVCaXRtYXBTdHlsZSgpPC9jb2RlPiBtZXRob2QgYWdhaW4gd2l0aCBkaWZmZXJlbnQgcGFyYW1ldGVycy5cblx0ICogPC9wPlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIGNhbGwgdGhlIDxjb2RlPmxpbmVTaGFkZXJTdHlsZSgpPC9jb2RlPiBtZXRob2QgaW4gdGhlIG1pZGRsZSBvZlxuXHQgKiBkcmF3aW5nIGEgcGF0aCB0byBzcGVjaWZ5IGRpZmZlcmVudCBzdHlsZXMgZm9yIGRpZmZlcmVudCBsaW5lIHNlZ21lbnRzXG5cdCAqIHdpdGhpbiBhIHBhdGguIDwvcD5cblx0ICpcblx0ICogPHA+Q2FsbCB0aGUgPGNvZGU+bGluZVN0eWxlKCk8L2NvZGU+IG1ldGhvZCBiZWZvcmUgeW91IGNhbGwgdGhlXG5cdCAqIDxjb2RlPmxpbmVTaGFkZXJTdHlsZSgpPC9jb2RlPiBtZXRob2QgdG8gZW5hYmxlIGEgc3Ryb2tlLCBvciBlbHNlIHRoZVxuXHQgKiB2YWx1ZSBvZiB0aGUgbGluZSBzdHlsZSBpcyA8Y29kZT51bmRlZmluZWQ8L2NvZGU+LjwvcD5cblx0ICpcblx0ICogPHA+Q2FsbHMgdG8gdGhlIDxjb2RlPmNsZWFyKCk8L2NvZGU+IG1ldGhvZCBzZXQgdGhlIGxpbmUgc3R5bGUgYmFjayB0b1xuXHQgKiA8Y29kZT51bmRlZmluZWQ8L2NvZGU+LiA8L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBzaGFkZXIgVGhlIHNoYWRlciB0byB1c2UgZm9yIHRoZSBsaW5lIHN0cm9rZS5cblx0ICogQHBhcmFtIG1hdHJpeCBBbiBvcHRpb25hbCB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggYXMgZGVmaW5lZCBieSB0aGVcblx0ICogICAgICAgICAgICAgICBmbGFzaC5nZW9tLk1hdHJpeCBjbGFzcy4gVGhlIG1hdHJpeCBjYW4gYmUgdXNlZCB0byBzY2FsZSBvclxuXHQgKiAgICAgICAgICAgICAgIG90aGVyd2lzZSBtYW5pcHVsYXRlIHRoZSBiaXRtYXAgYmVmb3JlIGFwcGx5aW5nIGl0IHRvIHRoZVxuXHQgKiAgICAgICAgICAgICAgIGxpbmUgc3R5bGUuXG5cdCAqL1xuLy9cdFx0cHVibGljIGxpbmVTaGFkZXJTdHlsZShzaGFkZXI6U2hhZGVyLCBtYXRyaXg6TWF0cml4ID0gbnVsbClcbi8vXHRcdHtcbi8vXG4vL1x0XHR9XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyBhIGxpbmUgc3R5bGUgdXNlZCBmb3Igc3Vic2VxdWVudCBjYWxscyB0byBHcmFwaGljcyBtZXRob2RzIHN1Y2hcblx0ICogYXMgdGhlIDxjb2RlPmxpbmVUbygpPC9jb2RlPiBtZXRob2Qgb3IgdGhlIDxjb2RlPmRyYXdDaXJjbGUoKTwvY29kZT5cblx0ICogbWV0aG9kLiBUaGUgbGluZSBzdHlsZSByZW1haW5zIGluIGVmZmVjdCB1bnRpbCB5b3UgY2FsbCB0aGVcblx0ICogPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4gbWV0aG9kLCB0aGVcblx0ICogPGNvZGU+bGluZUJpdG1hcFN0eWxlKCk8L2NvZGU+IG1ldGhvZCwgb3IgdGhlIDxjb2RlPmxpbmVTdHlsZSgpPC9jb2RlPlxuXHQgKiBtZXRob2Qgd2l0aCBkaWZmZXJlbnQgcGFyYW1ldGVycy5cblx0ICpcblx0ICogPHA+WW91IGNhbiBjYWxsIHRoZSA8Y29kZT5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kIGluIHRoZSBtaWRkbGUgb2Zcblx0ICogZHJhd2luZyBhIHBhdGggdG8gc3BlY2lmeSBkaWZmZXJlbnQgc3R5bGVzIGZvciBkaWZmZXJlbnQgbGluZSBzZWdtZW50c1xuXHQgKiB3aXRoaW4gdGhlIHBhdGguPC9wPlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOiA8L2I+Q2FsbHMgdG8gdGhlIDxjb2RlPmNsZWFyKCk8L2NvZGU+IG1ldGhvZCBzZXQgdGhlIGxpbmVcblx0ICogc3R5bGUgYmFjayB0byA8Y29kZT51bmRlZmluZWQ8L2NvZGU+LjwvcD5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTogPC9iPkZsYXNoIExpdGUgNCBzdXBwb3J0cyBvbmx5IHRoZSBmaXJzdCB0aHJlZSBwYXJhbWV0ZXJzXG5cdCAqICg8Y29kZT50aGlja25lc3M8L2NvZGU+LCA8Y29kZT5jb2xvcjwvY29kZT4sIGFuZCA8Y29kZT5hbHBoYTwvY29kZT4pLjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHRoaWNrbmVzcyAgICBBbiBpbnRlZ2VyIHRoYXQgaW5kaWNhdGVzIHRoZSB0aGlja25lc3Mgb2YgdGhlIGxpbmUgaW5cblx0ICogICAgICAgICAgICAgICAgICAgICBwb2ludHM7IHZhbGlkIHZhbHVlcyBhcmUgMC0yNTUuIElmIGEgbnVtYmVyIGlzIG5vdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmllZCwgb3IgaWYgdGhlIHBhcmFtZXRlciBpcyB1bmRlZmluZWQsIGEgbGluZSBpc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgIG5vdCBkcmF3bi4gSWYgYSB2YWx1ZSBvZiBsZXNzIHRoYW4gMCBpcyBwYXNzZWQsIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQgaXMgMC4gVGhlIHZhbHVlIDAgaW5kaWNhdGVzIGhhaXJsaW5lXG5cdCAqICAgICAgICAgICAgICAgICAgICAgdGhpY2tuZXNzOyB0aGUgbWF4aW11bSB0aGlja25lc3MgaXMgMjU1LiBJZiBhIHZhbHVlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgZ3JlYXRlciB0aGFuIDI1NSBpcyBwYXNzZWQsIHRoZSBkZWZhdWx0IGlzIDI1NS5cblx0ICogQHBhcmFtIGNvbG9yICAgICAgICBBIGhleGFkZWNpbWFsIGNvbG9yIHZhbHVlIG9mIHRoZSBsaW5lOyBmb3IgZXhhbXBsZSxcblx0ICogICAgICAgICAgICAgICAgICAgICByZWQgaXMgMHhGRjAwMDAsIGJsdWUgaXMgMHgwMDAwRkYsIGFuZCBzbyBvbi4gSWYgYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHZhbHVlIGlzIG5vdCBpbmRpY2F0ZWQsIHRoZSBkZWZhdWx0IGlzIDB4MDAwMDAwXG5cdCAqICAgICAgICAgICAgICAgICAgICAoYmxhY2spLiBPcHRpb25hbC5cblx0ICogQHBhcmFtIGFscGhhICAgICAgICBBIG51bWJlciB0aGF0IGluZGljYXRlcyB0aGUgYWxwaGEgdmFsdWUgb2YgdGhlIGNvbG9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgb2YgdGhlIGxpbmU7IHZhbGlkIHZhbHVlcyBhcmUgMCB0byAxLiBJZiBhIHZhbHVlIGlzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgbm90IGluZGljYXRlZCwgdGhlIGRlZmF1bHQgaXMgMShzb2xpZCkuIElmIHRoZSB2YWx1ZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGlzIGxlc3MgdGhhbiAwLCB0aGUgZGVmYXVsdCBpcyAwLiBJZiB0aGUgdmFsdWUgaXNcblx0ICogICAgICAgICAgICAgICAgICAgICBncmVhdGVyIHRoYW4gMSwgdGhlIGRlZmF1bHQgaXMgMS5cblx0ICogQHBhcmFtIHBpeGVsSGludGluZyhOb3Qgc3VwcG9ydGVkIGluIEZsYXNoIExpdGUgNCkgQSBCb29sZWFuIHZhbHVlIHRoYXRcblx0ICogICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZXMgd2hldGhlciB0byBoaW50IHN0cm9rZXMgdG8gZnVsbCBwaXhlbHMuIFRoaXNcblx0ICogICAgICAgICAgICAgICAgICAgICBhZmZlY3RzIGJvdGggdGhlIHBvc2l0aW9uIG9mIGFuY2hvcnMgb2YgYSBjdXJ2ZSBhbmRcblx0ICogICAgICAgICAgICAgICAgICAgICB0aGUgbGluZSBzdHJva2Ugc2l6ZSBpdHNlbGYuIFdpdGhcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5waXhlbEhpbnRpbmc8L2NvZGU+IHNldCB0byA8Y29kZT50cnVlPC9jb2RlPixcblx0ICogICAgICAgICAgICAgICAgICAgICBsaW5lIHdpZHRocyBhcmUgYWRqdXN0ZWQgdG8gZnVsbCBwaXhlbCB3aWR0aHMuIFdpdGhcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5waXhlbEhpbnRpbmc8L2NvZGU+IHNldCB0byA8Y29kZT5mYWxzZTwvY29kZT4sXG5cdCAqICAgICAgICAgICAgICAgICAgICAgZGlzam9pbnRzIGNhbiBhcHBlYXIgZm9yIGN1cnZlcyBhbmQgc3RyYWlnaHQgbGluZXMuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgaWxsdXN0cmF0aW9ucyBzaG93IGhvd1xuXHQgKiAgICAgICAgICAgICAgICAgICAgIEZsYXNoIFBsYXllciBvciBBZG9iZSBBSVIgcmVuZGVycyB0d28gcm91bmRlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHJlY3RhbmdsZXMgdGhhdCBhcmUgaWRlbnRpY2FsLCBleGNlcHQgdGhhdCB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5waXhlbEhpbnRpbmc8L2NvZGU+IHBhcmFtZXRlciB1c2VkIGluIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmxpbmVTdHlsZSgpPC9jb2RlPiBtZXRob2QgaXMgc2V0IGRpZmZlcmVudGx5XG5cdCAqICAgICAgICAgICAgICAgICAgICAodGhlIGltYWdlcyBhcmUgc2NhbGVkIGJ5IDIwMCUsIHRvIGVtcGhhc2l6ZSB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICBkaWZmZXJlbmNlKTpcblx0ICpcblx0ICogICAgICAgICAgICAgICAgICAgICA8cD5JZiBhIHZhbHVlIGlzIG5vdCBzdXBwbGllZCwgdGhlIGxpbmUgZG9lcyBub3QgdXNlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgcGl4ZWwgaGludGluZy48L3A+XG5cdCAqIEBwYXJhbSBzY2FsZU1vZGUgICAoTm90IHN1cHBvcnRlZCBpbiBGbGFzaCBMaXRlIDQpIEEgdmFsdWUgZnJvbSB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICBMaW5lU2NhbGVNb2RlIGNsYXNzIHRoYXQgc3BlY2lmaWVzIHdoaWNoIHNjYWxlIG1vZGUgdG9cblx0ICogICAgICAgICAgICAgICAgICAgICB1c2U6XG5cdCAqICAgICAgICAgICAgICAgICAgICAgPHVsPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGxpPiA8Y29kZT5MaW5lU2NhbGVNb2RlLk5PUk1BTDwvY29kZT4gLSBBbHdheXNcblx0ICogICAgICAgICAgICAgICAgICAgICBzY2FsZSB0aGUgbGluZSB0aGlja25lc3Mgd2hlbiB0aGUgb2JqZWN0IGlzIHNjYWxlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgKHRoZSBkZWZhdWx0KS4gPC9saT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxsaT4gPGNvZGU+TGluZVNjYWxlTW9kZS5OT05FPC9jb2RlPiAtIE5ldmVyIHNjYWxlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgdGhlIGxpbmUgdGhpY2tuZXNzLiA8L2xpPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGxpPiA8Y29kZT5MaW5lU2NhbGVNb2RlLlZFUlRJQ0FMPC9jb2RlPiAtIERvIG5vdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHNjYWxlIHRoZSBsaW5lIHRoaWNrbmVzcyBpZiB0aGUgb2JqZWN0IGlzIHNjYWxlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsbHkgPGk+b25seTwvaT4uIEZvciBleGFtcGxlLCBjb25zaWRlciB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICBmb2xsb3dpbmcgY2lyY2xlcywgZHJhd24gd2l0aCBhIG9uZS1waXhlbCBsaW5lLCBhbmRcblx0ICogICAgICAgICAgICAgICAgICAgICBlYWNoIHdpdGggdGhlIDxjb2RlPnNjYWxlTW9kZTwvY29kZT4gcGFyYW1ldGVyIHNldCB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkxpbmVTY2FsZU1vZGUuVkVSVElDQUw8L2NvZGU+LiBUaGUgY2lyY2xlIG9uIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGxlZnQgaXMgc2NhbGVkIHZlcnRpY2FsbHkgb25seSwgYW5kIHRoZSBjaXJjbGUgb24gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgcmlnaHQgaXMgc2NhbGVkIGJvdGggdmVydGljYWxseSBhbmQgaG9yaXpvbnRhbGx5OlxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8bGk+IDxjb2RlPkxpbmVTY2FsZU1vZGUuSE9SSVpPTlRBTDwvY29kZT4gLSBEbyBub3Rcblx0ICogICAgICAgICAgICAgICAgICAgICBzY2FsZSB0aGUgbGluZSB0aGlja25lc3MgaWYgdGhlIG9iamVjdCBpcyBzY2FsZWRcblx0ICogICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsbHkgPGk+b25seTwvaT4uIEZvciBleGFtcGxlLCBjb25zaWRlciB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICBmb2xsb3dpbmcgY2lyY2xlcywgZHJhd24gd2l0aCBhIG9uZS1waXhlbCBsaW5lLCBhbmRcblx0ICogICAgICAgICAgICAgICAgICAgICBlYWNoIHdpdGggdGhlIDxjb2RlPnNjYWxlTW9kZTwvY29kZT4gcGFyYW1ldGVyIHNldCB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkxpbmVTY2FsZU1vZGUuSE9SSVpPTlRBTDwvY29kZT4uIFRoZSBjaXJjbGUgb25cblx0ICogICAgICAgICAgICAgICAgICAgICB0aGUgbGVmdCBpcyBzY2FsZWQgaG9yaXpvbnRhbGx5IG9ubHksIGFuZCB0aGUgY2lyY2xlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgb24gdGhlIHJpZ2h0IGlzIHNjYWxlZCBib3RoIHZlcnRpY2FsbHkgYW5kXG5cdCAqICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbGx5OiAgIDwvbGk+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgPC91bD5cblx0ICogQHBhcmFtIGNhcHMgICAgICAgIChOb3Qgc3VwcG9ydGVkIGluIEZsYXNoIExpdGUgNCkgQSB2YWx1ZSBmcm9tIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIENhcHNTdHlsZSBjbGFzcyB0aGF0IHNwZWNpZmllcyB0aGUgdHlwZSBvZiBjYXBzIGF0IHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGVuZCBvZiBsaW5lcy4gVmFsaWQgdmFsdWVzIGFyZTpcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5DYXBzU3R5bGUuTk9ORTwvY29kZT4sXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Q2Fwc1N0eWxlLlJPVU5EPC9jb2RlPiwgYW5kXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Q2Fwc1N0eWxlLlNRVUFSRTwvY29kZT4uIElmIGEgdmFsdWUgaXMgbm90XG5cdCAqICAgICAgICAgICAgICAgICAgICAgaW5kaWNhdGVkLCBGbGFzaCB1c2VzIHJvdW5kIGNhcHMuXG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPHA+Rm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgaWxsdXN0cmF0aW9ucyBzaG93IHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGRpZmZlcmVudCA8Y29kZT5jYXBzU3R5bGU8L2NvZGU+IHNldHRpbmdzLiBGb3IgZWFjaFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHNldHRpbmcsIHRoZSBpbGx1c3RyYXRpb24gc2hvd3MgYSBibHVlIGxpbmUgd2l0aCBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgdGhpY2tuZXNzIG9mIDMwKGZvciB3aGljaCB0aGUgPGNvZGU+Y2Fwc1N0eWxlPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGFwcGxpZXMpLCBhbmQgYSBzdXBlcmltcG9zZWQgYmxhY2sgbGluZSB3aXRoIGFcblx0ICogICAgICAgICAgICAgICAgICAgICB0aGlja25lc3Mgb2YgMShmb3Igd2hpY2ggbm8gPGNvZGU+Y2Fwc1N0eWxlPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGFwcGxpZXMpOiA8L3A+XG5cdCAqIEBwYXJhbSBqb2ludHMgICAgICAoTm90IHN1cHBvcnRlZCBpbiBGbGFzaCBMaXRlIDQpIEEgdmFsdWUgZnJvbSB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICBKb2ludFN0eWxlIGNsYXNzIHRoYXQgc3BlY2lmaWVzIHRoZSB0eXBlIG9mIGpvaW50XG5cdCAqICAgICAgICAgICAgICAgICAgICAgYXBwZWFyYW5jZSB1c2VkIGF0IGFuZ2xlcy4gVmFsaWQgdmFsdWVzIGFyZTpcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5Kb2ludFN0eWxlLkJFVkVMPC9jb2RlPixcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5Kb2ludFN0eWxlLk1JVEVSPC9jb2RlPiwgYW5kXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Sm9pbnRTdHlsZS5ST1VORDwvY29kZT4uIElmIGEgdmFsdWUgaXMgbm90XG5cdCAqICAgICAgICAgICAgICAgICAgICAgaW5kaWNhdGVkLCBGbGFzaCB1c2VzIHJvdW5kIGpvaW50cy5cblx0ICpcblx0ICogICAgICAgICAgICAgICAgICAgICA8cD5Gb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZyBpbGx1c3RyYXRpb25zIHNob3cgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgZGlmZmVyZW50IDxjb2RlPmpvaW50czwvY29kZT4gc2V0dGluZ3MuIEZvciBlYWNoXG5cdCAqICAgICAgICAgICAgICAgICAgICAgc2V0dGluZywgdGhlIGlsbHVzdHJhdGlvbiBzaG93cyBhbiBhbmdsZWQgYmx1ZSBsaW5lXG5cdCAqICAgICAgICAgICAgICAgICAgICAgd2l0aCBhIHRoaWNrbmVzcyBvZiAzMChmb3Igd2hpY2ggdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+am9pbnRTdHlsZTwvY29kZT4gYXBwbGllcyksIGFuZCBhIHN1cGVyaW1wb3NlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGFuZ2xlZCBibGFjayBsaW5lIHdpdGggYSB0aGlja25lc3Mgb2YgMShmb3Igd2hpY2ggbm9cblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5qb2ludFN0eWxlPC9jb2RlPiBhcHBsaWVzKTogPC9wPlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxwPjxiPk5vdGU6PC9iPiBGb3IgPGNvZGU+am9pbnRzPC9jb2RlPiBzZXQgdG9cblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5Kb2ludFN0eWxlLk1JVEVSPC9jb2RlPiwgeW91IGNhbiB1c2UgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+bWl0ZXJMaW1pdDwvY29kZT4gcGFyYW1ldGVyIHRvIGxpbWl0IHRoZSBsZW5ndGhcblx0ICogICAgICAgICAgICAgICAgICAgICBvZiB0aGUgbWl0ZXIuPC9wPlxuXHQgKiBAcGFyYW0gbWl0ZXJMaW1pdCAgKE5vdCBzdXBwb3J0ZWQgaW4gRmxhc2ggTGl0ZSA0KSBBIG51bWJlciB0aGF0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgaW5kaWNhdGVzIHRoZSBsaW1pdCBhdCB3aGljaCBhIG1pdGVyIGlzIGN1dCBvZmYuIFZhbGlkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIHJhbmdlIGZyb20gMSB0byAyNTUoYW5kIHZhbHVlcyBvdXRzaWRlIHRoYXRcblx0ICogICAgICAgICAgICAgICAgICAgICByYW5nZSBhcmUgcm91bmRlZCB0byAxIG9yIDI1NSkuIFRoaXMgdmFsdWUgaXMgb25seVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHVzZWQgaWYgdGhlIDxjb2RlPmpvaW50U3R5bGU8L2NvZGU+IGlzIHNldCB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlwibWl0ZXJcIjwvY29kZT4uIFRoZSA8Y29kZT5taXRlckxpbWl0PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHZhbHVlIHJlcHJlc2VudHMgdGhlIGxlbmd0aCB0aGF0IGEgbWl0ZXIgY2FuIGV4dGVuZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGJleW9uZCB0aGUgcG9pbnQgYXQgd2hpY2ggdGhlIGxpbmVzIG1lZXQgdG8gZm9ybSBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgam9pbnQuIFRoZSB2YWx1ZSBleHByZXNzZXMgYSBmYWN0b3Igb2YgdGhlIGxpbmVcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT50aGlja25lc3M8L2NvZGU+LiBGb3IgZXhhbXBsZSwgd2l0aCBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+bWl0ZXJMaW1pdDwvY29kZT4gZmFjdG9yIG9mIDIuNSBhbmQgYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnRoaWNrbmVzczwvY29kZT4gb2YgMTAgcGl4ZWxzLCB0aGUgbWl0ZXIgaXMgY3V0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgb2ZmIGF0IDI1IHBpeGVscy5cblx0ICpcblx0ICogICAgICAgICAgICAgICAgICAgICA8cD5Gb3IgZXhhbXBsZSwgY29uc2lkZXIgdGhlIGZvbGxvd2luZyBhbmdsZWQgbGluZXMsXG5cdCAqICAgICAgICAgICAgICAgICAgICAgZWFjaCBkcmF3biB3aXRoIGEgPGNvZGU+dGhpY2tuZXNzPC9jb2RlPiBvZiAyMCwgYnV0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgd2l0aCA8Y29kZT5taXRlckxpbWl0PC9jb2RlPiBzZXQgdG8gMSwgMiwgYW5kIDQuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgU3VwZXJpbXBvc2VkIGFyZSBibGFjayByZWZlcmVuY2UgbGluZXMgc2hvd2luZyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICBtZWV0aW5nIHBvaW50cyBvZiB0aGUgam9pbnRzOjwvcD5cblx0ICpcblx0ICogICAgICAgICAgICAgICAgICAgICA8cD5Ob3RpY2UgdGhhdCBhIGdpdmVuIDxjb2RlPm1pdGVyTGltaXQ8L2NvZGU+IHZhbHVlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgaGFzIGEgc3BlY2lmaWMgbWF4aW11bSBhbmdsZSBmb3Igd2hpY2ggdGhlIG1pdGVyIGlzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgY3V0IG9mZi4gVGhlIGZvbGxvd2luZyB0YWJsZSBsaXN0cyBzb21lIGV4YW1wbGVzOjwvcD5cblx0ICovXG5cdHB1YmxpYyBsaW5lU3R5bGUodGhpY2tuZXNzOm51bWJlciA9IDAsIGNvbG9yOm51bWJlciAvKmludCovID0gMCwgYWxwaGE6bnVtYmVyID0gMSwgcGl4ZWxIaW50aW5nOmJvb2xlYW4gPSBmYWxzZSwgc2NhbGVNb2RlOkxpbmVTY2FsZU1vZGUgPSBudWxsLCBjYXBzOkNhcHNTdHlsZSA9IG51bGwsIGpvaW50czpKb2ludFN0eWxlID0gbnVsbCwgbWl0ZXJMaW1pdDpudW1iZXIgPSAzKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBEcmF3cyBhIGxpbmUgdXNpbmcgdGhlIGN1cnJlbnQgbGluZSBzdHlsZSBmcm9tIHRoZSBjdXJyZW50IGRyYXdpbmdcblx0ICogcG9zaXRpb24gdG8oPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+KTsgdGhlIGN1cnJlbnQgZHJhd2luZyBwb3NpdGlvblxuXHQgKiBpcyB0aGVuIHNldCB0byg8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4pLiBJZiB0aGUgZGlzcGxheSBvYmplY3QgaW5cblx0ICogd2hpY2ggeW91IGFyZSBkcmF3aW5nIGNvbnRhaW5zIGNvbnRlbnQgdGhhdCB3YXMgY3JlYXRlZCB3aXRoIHRoZSBGbGFzaFxuXHQgKiBkcmF3aW5nIHRvb2xzLCBjYWxscyB0byB0aGUgPGNvZGU+bGluZVRvKCk8L2NvZGU+IG1ldGhvZCBhcmUgZHJhd25cblx0ICogdW5kZXJuZWF0aCB0aGUgY29udGVudC4gSWYgeW91IGNhbGwgPGNvZGU+bGluZVRvKCk8L2NvZGU+IGJlZm9yZSBhbnkgY2FsbHNcblx0ICogdG8gdGhlIDxjb2RlPm1vdmVUbygpPC9jb2RlPiBtZXRob2QsIHRoZSBkZWZhdWx0IHBvc2l0aW9uIGZvciB0aGUgY3VycmVudFxuXHQgKiBkcmF3aW5nIGlzKDxpPjAsIDA8L2k+KS4gSWYgYW55IG9mIHRoZSBwYXJhbWV0ZXJzIGFyZSBtaXNzaW5nLCB0aGlzXG5cdCAqIG1ldGhvZCBmYWlscyBhbmQgdGhlIGN1cnJlbnQgZHJhd2luZyBwb3NpdGlvbiBpcyBub3QgY2hhbmdlZC5cblx0ICpcblx0ICogQHBhcmFtIHggQSBudW1iZXIgdGhhdCBpbmRpY2F0ZXMgdGhlIGhvcml6b250YWwgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlXG5cdCAqICAgICAgICAgIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50IGRpc3BsYXkgb2JqZWN0KGluIHBpeGVscykuXG5cdCAqIEBwYXJhbSB5IEEgbnVtYmVyIHRoYXQgaW5kaWNhdGVzIHRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGVcblx0ICogICAgICAgICAgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3QoaW4gcGl4ZWxzKS5cblx0ICovXG5cdHB1YmxpYyBsaW5lVG8oeDpudW1iZXIsIHk6bnVtYmVyKVxuXHR7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyB0aGUgY3VycmVudCBkcmF3aW5nIHBvc2l0aW9uIHRvKDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPikuIElmXG5cdCAqIGFueSBvZiB0aGUgcGFyYW1ldGVycyBhcmUgbWlzc2luZywgdGhpcyBtZXRob2QgZmFpbHMgYW5kIHRoZSBjdXJyZW50XG5cdCAqIGRyYXdpbmcgcG9zaXRpb24gaXMgbm90IGNoYW5nZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB4IEEgbnVtYmVyIHRoYXQgaW5kaWNhdGVzIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZVxuXHQgKiAgICAgICAgICByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdChpbiBwaXhlbHMpLlxuXHQgKiBAcGFyYW0geSBBIG51bWJlciB0aGF0IGluZGljYXRlcyB0aGUgdmVydGljYWwgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlXG5cdCAqICAgICAgICAgIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50IGRpc3BsYXkgb2JqZWN0KGluIHBpeGVscykuXG5cdCAqL1xuXHRwdWJsaWMgbW92ZVRvKHg6bnVtYmVyLCB5Om51bWJlcilcblx0e1xuXG5cdH1cbn1cblxuZXhwb3J0ID0gR3JhcGhpY3M7Il19