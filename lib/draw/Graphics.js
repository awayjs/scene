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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9kcmF3L0dyYXBoaWNzLnRzIl0sIm5hbWVzIjpbIkdyYXBoaWNzIiwiR3JhcGhpY3MuY29uc3RydWN0b3IiLCJHcmFwaGljcy5iZWdpbkJpdG1hcEZpbGwiLCJHcmFwaGljcy5iZWdpbkZpbGwiLCJHcmFwaGljcy5iZWdpbkdyYWRpZW50RmlsbCIsIkdyYXBoaWNzLmNsZWFyIiwiR3JhcGhpY3MuY29weUZyb20iLCJHcmFwaGljcy5jdWJpY0N1cnZlVG8iLCJHcmFwaGljcy5jdXJ2ZVRvIiwiR3JhcGhpY3MuZHJhd0NpcmNsZSIsIkdyYXBoaWNzLmRyYXdFbGxpcHNlIiwiR3JhcGhpY3MuZHJhd0dyYXBoaWNzRGF0YSIsIkdyYXBoaWNzLmRyYXdQYXRoIiwiR3JhcGhpY3MuZHJhd1JlY3QiLCJHcmFwaGljcy5kcmF3Um91bmRSZWN0IiwiR3JhcGhpY3MuZHJhd1RyaWFuZ2xlcyIsIkdyYXBoaWNzLmVuZEZpbGwiLCJHcmFwaGljcy5saW5lQml0bWFwU3R5bGUiLCJHcmFwaGljcy5saW5lR3JhZGllbnRTdHlsZSIsIkdyYXBoaWNzLmxpbmVTdHlsZSIsIkdyYXBoaWNzLmxpbmVUbyIsIkdyYXBoaWNzLm1vdmVUbyJdLCJtYXBwaW5ncyI6IkFBYUEsQUFjQTs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csUUFBUTtJQUFkQSxTQUFNQSxRQUFRQTtJQXcwQmRDLENBQUNBO0lBdDBCQUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9DR0E7SUFDSUEsa0NBQWVBLEdBQXRCQSxVQUF1QkEsTUFBaUJBLEVBQUVBLE1BQW9CQSxFQUFFQSxNQUFxQkEsRUFBRUEsTUFBc0JBO1FBQW5FRSxzQkFBb0JBLEdBQXBCQSxhQUFvQkE7UUFBRUEsc0JBQXFCQSxHQUFyQkEsYUFBcUJBO1FBQUVBLHNCQUFzQkEsR0FBdEJBLGNBQXNCQTtJQUc3R0EsQ0FBQ0E7SUFFREY7Ozs7Ozs7Ozs7Ozs7T0FhR0E7SUFDSUEsNEJBQVNBLEdBQWhCQSxVQUFpQkEsS0FBS0EsQ0FBUUEsT0FBREEsQUFBUUEsRUFBRUEsS0FBZ0JBO1FBQWhCRyxxQkFBZ0JBLEdBQWhCQSxTQUFnQkE7SUFHdkRBLENBQUNBO0lBRURIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0ZHQTtJQUNJQSxvQ0FBaUJBLEdBQXhCQSxVQUF5QkEsSUFBaUJBLEVBQUVBLE1BQTRCQSxFQUFFQSxNQUFvQkEsRUFBRUEsTUFBNEJBLEVBQUVBLE1BQW9CQSxFQUFFQSxZQUEyQkEsRUFBRUEsbUJBQWtDQSxFQUFFQSxlQUEwQkE7UUFBakhJLHNCQUFvQkEsR0FBcEJBLGFBQW9CQTtRQUFFQSw0QkFBMkJBLEdBQTNCQSxvQkFBMkJBO1FBQUVBLG1DQUFrQ0EsR0FBbENBLDJCQUFrQ0E7UUFBRUEsK0JBQTBCQSxHQUExQkEsbUJBQTBCQTtJQUcvT0EsQ0FBQ0E7SUFFREo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpREdBO0lBQ0pBLCtEQUErREE7SUFDL0RBLEtBQUtBO0lBQ0xBLEVBQUVBO0lBQ0ZBLEtBQUtBO0lBRUpBOzs7O09BSUdBO0lBQ0lBLHdCQUFLQSxHQUFaQTtJQUdBSyxDQUFDQTtJQUVETDs7Ozs7O09BTUdBO0lBQ0lBLDJCQUFRQSxHQUFmQSxVQUFnQkEsY0FBdUJBO0lBR3ZDTSxDQUFDQTtJQUVETjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWlER0E7SUFDSUEsK0JBQVlBLEdBQW5CQSxVQUFvQkEsU0FBZ0JBLEVBQUVBLFNBQWdCQSxFQUFFQSxTQUFnQkEsRUFBRUEsU0FBZ0JBLEVBQUVBLE9BQWNBLEVBQUVBLE9BQWNBO0lBRzFITyxDQUFDQTtJQUVEUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2QkdBO0lBQ0lBLDBCQUFPQSxHQUFkQSxVQUFlQSxRQUFlQSxFQUFFQSxRQUFlQSxFQUFFQSxPQUFjQSxFQUFFQSxPQUFjQTtJQUcvRVEsQ0FBQ0E7SUFFRFI7Ozs7Ozs7Ozs7Ozs7O09BY0dBO0lBQ0lBLDZCQUFVQSxHQUFqQkEsVUFBa0JBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLE1BQWFBO0lBR25EUyxDQUFDQTtJQUVEVDs7Ozs7Ozs7Ozs7Ozs7O09BZUdBO0lBQ0lBLDhCQUFXQSxHQUFsQkEsVUFBbUJBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLEtBQVlBLEVBQUVBLE1BQWFBO0lBR2xFVSxDQUFDQTtJQUVEVjs7Ozs7Ozs7Ozs7T0FXR0E7SUFDSUEsbUNBQWdCQSxHQUF2QkEsVUFBd0JBLFlBQWlDQTtJQUd6RFcsQ0FBQ0E7SUFFRFg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNENHQTtJQUNJQSwyQkFBUUEsR0FBZkEsVUFBZ0JBLFFBQThCQSxFQUFFQSxJQUFrQkEsRUFBRUEsT0FBMkJBO0lBRy9GWSxDQUFDQTtJQUVEWjs7Ozs7Ozs7Ozs7Ozs7OztPQWdCR0E7SUFDSUEsMkJBQVFBLEdBQWZBLFVBQWdCQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxLQUFZQSxFQUFFQSxNQUFhQTtJQUcvRGEsQ0FBQ0E7SUFFRGI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5QkdBO0lBQ0lBLGdDQUFhQSxHQUFwQkEsVUFBcUJBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLEtBQVlBLEVBQUVBLE1BQWFBLEVBQUVBLFlBQW1CQSxFQUFFQSxhQUEwQkE7UUFBMUJjLDZCQUEwQkEsR0FBMUJBLG1CQUEwQkE7SUFHckhBLENBQUNBO0lBRURkLDRLQUE0S0E7SUFFNUtBOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCR0E7SUFDSUEsZ0NBQWFBLEdBQXBCQSxVQUFxQkEsUUFBc0JBLEVBQUVBLE9BQW9DQSxFQUFFQSxPQUE0QkEsRUFBRUEsT0FBOEJBO1FBQWxHZSx1QkFBb0NBLEdBQXBDQSxjQUFvQ0E7UUFBRUEsdUJBQTRCQSxHQUE1QkEsY0FBNEJBO1FBQUVBLHVCQUE4QkEsR0FBOUJBLGNBQThCQTtJQUcvSUEsQ0FBQ0E7SUFFRGY7Ozs7Ozs7Ozs7T0FVR0E7SUFDSUEsMEJBQU9BLEdBQWRBO0lBR0FnQixDQUFDQTtJQUVEaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0QkdBO0lBQ0lBLGtDQUFlQSxHQUF0QkEsVUFBdUJBLE1BQWlCQSxFQUFFQSxNQUFvQkEsRUFBRUEsTUFBcUJBLEVBQUVBLE1BQXNCQTtRQUFuRWlCLHNCQUFvQkEsR0FBcEJBLGFBQW9CQTtRQUFFQSxzQkFBcUJBLEdBQXJCQSxhQUFxQkE7UUFBRUEsc0JBQXNCQSxHQUF0QkEsY0FBc0JBO0lBRzdHQSxDQUFDQTtJQUVEakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFFR0E7SUFDSUEsb0NBQWlCQSxHQUF4QkEsVUFBeUJBLElBQWlCQSxFQUFFQSxNQUE0QkEsRUFBRUEsTUFBb0JBLEVBQUVBLE1BQW9CQSxFQUFFQSxNQUFvQkEsRUFBRUEsWUFBZ0NBLEVBQUVBLG1CQUE4Q0EsRUFBRUEsZUFBMEJBO1FBQWxJa0Isc0JBQW9CQSxHQUFwQkEsYUFBb0JBO1FBQUVBLDRCQUFnQ0EsR0FBaENBLG1CQUFnQ0E7UUFBRUEsbUNBQThDQSxHQUE5Q0EsMEJBQThDQTtRQUFFQSwrQkFBMEJBLEdBQTFCQSxtQkFBMEJBO0lBR3hQQSxDQUFDQTtJQUVEbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEJHQTtJQUNKQSwrREFBK0RBO0lBQy9EQSxLQUFLQTtJQUNMQSxFQUFFQTtJQUNGQSxLQUFLQTtJQUVKQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMElHQTtJQUNJQSw0QkFBU0EsR0FBaEJBLFVBQWlCQSxTQUFvQkEsRUFBRUEsS0FBd0JBLEVBQUVBLEtBQWdCQSxFQUFFQSxZQUE0QkEsRUFBRUEsU0FBOEJBLEVBQUVBLElBQXFCQSxFQUFFQSxNQUF3QkEsRUFBRUEsVUFBcUJBO1FBQXRNbUIseUJBQW9CQSxHQUFwQkEsYUFBb0JBO1FBQUVBLHFCQUF3QkEsR0FBeEJBLFNBQXdCQTtRQUFFQSxxQkFBZ0JBLEdBQWhCQSxTQUFnQkE7UUFBRUEsNEJBQTRCQSxHQUE1QkEsb0JBQTRCQTtRQUFFQSx5QkFBOEJBLEdBQTlCQSxnQkFBOEJBO1FBQUVBLG9CQUFxQkEsR0FBckJBLFdBQXFCQTtRQUFFQSxzQkFBd0JBLEdBQXhCQSxhQUF3QkE7UUFBRUEsMEJBQXFCQSxHQUFyQkEsY0FBcUJBO0lBR3ZOQSxDQUFDQTtJQUVEbkI7Ozs7Ozs7Ozs7Ozs7OztPQWVHQTtJQUNJQSx5QkFBTUEsR0FBYkEsVUFBY0EsQ0FBUUEsRUFBRUEsQ0FBUUE7SUFHaENvQixDQUFDQTtJQUVEcEI7Ozs7Ozs7OztPQVNHQTtJQUNJQSx5QkFBTUEsR0FBYkEsVUFBY0EsQ0FBUUEsRUFBRUEsQ0FBUUE7SUFHaENxQixDQUFDQTtJQUNGckIsZUFBQ0E7QUFBREEsQ0F4MEJBLEFBdzBCQ0EsSUFBQTtBQUVELEFBQWtCLGlCQUFULFFBQVEsQ0FBQyIsImZpbGUiOiJkcmF3L0dyYXBoaWNzLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCaXRtYXBEYXRhXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9CaXRtYXBEYXRhXCIpO1xyXG5pbXBvcnQgTWF0cml4XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeFwiKTtcclxuXHJcbmltcG9ydCBDYXBzU3R5bGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9kcmF3L0NhcHNTdHlsZVwiKTtcclxuaW1wb3J0IEdyYWRpZW50VHlwZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2RyYXcvR3JhZGllbnRUeXBlXCIpO1xyXG5pbXBvcnQgR3JhcGhpY3NQYXRoV2luZGluZ1x0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZHJhdy9HcmFwaGljc1BhdGhXaW5kaW5nXCIpO1xyXG5pbXBvcnQgSUdyYXBoaWNzRGF0YVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9kcmF3L0lHcmFwaGljc0RhdGFcIik7XHJcbmltcG9ydCBJbnRlcnBvbGF0aW9uTWV0aG9kXHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9kcmF3L0ludGVycG9sYXRpb25NZXRob2RcIik7XHJcbmltcG9ydCBKb2ludFN0eWxlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZHJhdy9Kb2ludFN0eWxlXCIpO1xyXG5pbXBvcnQgTGluZVNjYWxlTW9kZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9kcmF3L0xpbmVTY2FsZU1vZGVcIik7XHJcbmltcG9ydCBUcmlhbmdsZUN1bGxpbmdcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZHJhdy9UcmlhbmdsZUN1bGxpbmdcIik7XHJcbmltcG9ydCBTcHJlYWRNZXRob2RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9kcmF3L1NwcmVhZE1ldGhvZFwiKTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgR3JhcGhpY3MgY2xhc3MgY29udGFpbnMgYSBzZXQgb2YgbWV0aG9kcyB0aGF0IHlvdSBjYW4gdXNlIHRvIGNyZWF0ZSBhXHJcbiAqIHZlY3RvciBzaGFwZS4gRGlzcGxheSBvYmplY3RzIHRoYXQgc3VwcG9ydCBkcmF3aW5nIGluY2x1ZGUgU3ByaXRlIGFuZCBTaGFwZVxyXG4gKiBvYmplY3RzLiBFYWNoIG9mIHRoZXNlIGNsYXNzZXMgaW5jbHVkZXMgYSA8Y29kZT5ncmFwaGljczwvY29kZT4gcHJvcGVydHlcclxuICogdGhhdCBpcyBhIEdyYXBoaWNzIG9iamVjdC4gVGhlIGZvbGxvd2luZyBhcmUgYW1vbmcgdGhvc2UgaGVscGVyIGZ1bmN0aW9uc1xyXG4gKiBwcm92aWRlZCBmb3IgZWFzZSBvZiB1c2U6IDxjb2RlPmRyYXdSZWN0KCk8L2NvZGU+LFxyXG4gKiA8Y29kZT5kcmF3Um91bmRSZWN0KCk8L2NvZGU+LCA8Y29kZT5kcmF3Q2lyY2xlKCk8L2NvZGU+LCBhbmRcclxuICogPGNvZGU+ZHJhd0VsbGlwc2UoKTwvY29kZT4uXHJcbiAqXHJcbiAqIDxwPllvdSBjYW5ub3QgY3JlYXRlIGEgR3JhcGhpY3Mgb2JqZWN0IGRpcmVjdGx5IGZyb20gQWN0aW9uU2NyaXB0IGNvZGUuIElmXHJcbiAqIHlvdSBjYWxsIDxjb2RlPm5ldyBHcmFwaGljcygpPC9jb2RlPiwgYW4gZXhjZXB0aW9uIGlzIHRocm93bi48L3A+XHJcbiAqXHJcbiAqIDxwPlRoZSBHcmFwaGljcyBjbGFzcyBpcyBmaW5hbDsgaXQgY2Fubm90IGJlIHN1YmNsYXNzZWQuPC9wPlxyXG4gKi9cclxuY2xhc3MgR3JhcGhpY3Ncclxue1xyXG5cdC8qKlxyXG5cdCAqIEZpbGxzIGEgZHJhd2luZyBhcmVhIHdpdGggYSBiaXRtYXAgaW1hZ2UuIFRoZSBiaXRtYXAgY2FuIGJlIHJlcGVhdGVkIG9yXHJcblx0ICogdGlsZWQgdG8gZmlsbCB0aGUgYXJlYS4gVGhlIGZpbGwgcmVtYWlucyBpbiBlZmZlY3QgdW50aWwgeW91IGNhbGwgdGhlXHJcblx0ICogPGNvZGU+YmVnaW5GaWxsKCk8L2NvZGU+LCA8Y29kZT5iZWdpbkJpdG1hcEZpbGwoKTwvY29kZT4sXHJcblx0ICogPGNvZGU+YmVnaW5HcmFkaWVudEZpbGwoKTwvY29kZT4sIG9yIDxjb2RlPmJlZ2luU2hhZGVyRmlsbCgpPC9jb2RlPlxyXG5cdCAqIG1ldGhvZC4gQ2FsbGluZyB0aGUgPGNvZGU+Y2xlYXIoKTwvY29kZT4gbWV0aG9kIGNsZWFycyB0aGUgZmlsbC5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBhcHBsaWNhdGlvbiByZW5kZXJzIHRoZSBmaWxsIHdoZW5ldmVyIHRocmVlIG9yIG1vcmUgcG9pbnRzIGFyZVxyXG5cdCAqIGRyYXduLCBvciB3aGVuIHRoZSA8Y29kZT5lbmRGaWxsKCk8L2NvZGU+IG1ldGhvZCBpcyBjYWxsZWQuIDwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBiaXRtYXAgQSB0cmFuc3BhcmVudCBvciBvcGFxdWUgYml0bWFwIGltYWdlIHRoYXQgY29udGFpbnMgdGhlIGJpdHNcclxuXHQgKiAgICAgICAgICAgICAgIHRvIGJlIGRpc3BsYXllZC5cclxuXHQgKiBAcGFyYW0gbWF0cml4IEEgbWF0cml4IG9iamVjdChvZiB0aGUgZmxhc2guZ2VvbS5NYXRyaXggY2xhc3MpLCB3aGljaCB5b3VcclxuXHQgKiAgICAgICAgICAgICAgIGNhbiB1c2UgdG8gZGVmaW5lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgYml0bWFwLiBGb3JcclxuXHQgKiAgICAgICAgICAgICAgIGV4YW1wbGUsIHlvdSBjYW4gdXNlIHRoZSBmb2xsb3dpbmcgbWF0cml4IHRvIHJvdGF0ZSBhIGJpdG1hcFxyXG5cdCAqICAgICAgICAgICAgICAgYnkgNDUgZGVncmVlcyhwaS80IHJhZGlhbnMpOlxyXG5cdCAqIEBwYXJhbSByZXBlYXQgSWYgPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSBiaXRtYXAgaW1hZ2UgcmVwZWF0cyBpbiBhIHRpbGVkXHJcblx0ICogICAgICAgICAgICAgICBwYXR0ZXJuLiBJZiA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSBiaXRtYXAgaW1hZ2UgZG9lcyBub3RcclxuXHQgKiAgICAgICAgICAgICAgIHJlcGVhdCwgYW5kIHRoZSBlZGdlcyBvZiB0aGUgYml0bWFwIGFyZSB1c2VkIGZvciBhbnkgZmlsbFxyXG5cdCAqICAgICAgICAgICAgICAgYXJlYSB0aGF0IGV4dGVuZHMgYmV5b25kIHRoZSBiaXRtYXAuXHJcblx0ICpcclxuXHQgKiAgICAgICAgICAgICAgIDxwPkZvciBleGFtcGxlLCBjb25zaWRlciB0aGUgZm9sbG93aW5nIGJpdG1hcChhIDIwIHhcclxuXHQgKiAgICAgICAgICAgICAgIDIwLXBpeGVsIGNoZWNrZXJib2FyZCBwYXR0ZXJuKTo8L3A+XHJcblx0ICpcclxuXHQgKiAgICAgICAgICAgICAgIDxwPldoZW4gPGNvZGU+cmVwZWF0PC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4oYXNcclxuXHQgKiAgICAgICAgICAgICAgIGluIHRoZSBmb2xsb3dpbmcgZXhhbXBsZSksIHRoZSBiaXRtYXAgZmlsbCByZXBlYXRzIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgYml0bWFwOjwvcD5cclxuXHQgKlxyXG5cdCAqICAgICAgICAgICAgICAgPHA+V2hlbiA8Y29kZT5yZXBlYXQ8L2NvZGU+IGlzIHNldCB0byA8Y29kZT5mYWxzZTwvY29kZT4sXHJcblx0ICogICAgICAgICAgICAgICB0aGUgYml0bWFwIGZpbGwgdXNlcyB0aGUgZWRnZSBwaXhlbHMgZm9yIHRoZSBmaWxsIGFyZWFcclxuXHQgKiAgICAgICAgICAgICAgIG91dHNpZGUgdGhlIGJpdG1hcDo8L3A+XHJcblx0ICogQHBhcmFtIHNtb290aCBJZiA8Y29kZT5mYWxzZTwvY29kZT4sIHVwc2NhbGVkIGJpdG1hcCBpbWFnZXMgYXJlIHJlbmRlcmVkXHJcblx0ICogICAgICAgICAgICAgICBieSB1c2luZyBhIG5lYXJlc3QtbmVpZ2hib3IgYWxnb3JpdGhtIGFuZCBsb29rIHBpeGVsYXRlZC4gSWZcclxuXHQgKiAgICAgICAgICAgICAgIDxjb2RlPnRydWU8L2NvZGU+LCB1cHNjYWxlZCBiaXRtYXAgaW1hZ2VzIGFyZSByZW5kZXJlZCBieVxyXG5cdCAqICAgICAgICAgICAgICAgdXNpbmcgYSBiaWxpbmVhciBhbGdvcml0aG0uIFJlbmRlcmluZyBieSB1c2luZyB0aGUgbmVhcmVzdFxyXG5cdCAqICAgICAgICAgICAgICAgbmVpZ2hib3IgYWxnb3JpdGhtIGlzIGZhc3Rlci5cclxuXHQgKi9cclxuXHRwdWJsaWMgYmVnaW5CaXRtYXBGaWxsKGJpdG1hcDpCaXRtYXBEYXRhLCBtYXRyaXg6TWF0cml4ID0gbnVsbCwgcmVwZWF0OmJvb2xlYW4gPSB0cnVlLCBzbW9vdGg6Ym9vbGVhbiA9IGZhbHNlKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgYSBzaW1wbGUgb25lLWNvbG9yIGZpbGwgdGhhdCBzdWJzZXF1ZW50IGNhbGxzIHRvIG90aGVyIEdyYXBoaWNzXHJcblx0ICogbWV0aG9kcyhzdWNoIGFzIDxjb2RlPmxpbmVUbygpPC9jb2RlPiBvciA8Y29kZT5kcmF3Q2lyY2xlKCk8L2NvZGU+KSB1c2VcclxuXHQgKiB3aGVuIGRyYXdpbmcuIFRoZSBmaWxsIHJlbWFpbnMgaW4gZWZmZWN0IHVudGlsIHlvdSBjYWxsIHRoZVxyXG5cdCAqIDxjb2RlPmJlZ2luRmlsbCgpPC9jb2RlPiwgPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+LFxyXG5cdCAqIDxjb2RlPmJlZ2luR3JhZGllbnRGaWxsKCk8L2NvZGU+LCBvciA8Y29kZT5iZWdpblNoYWRlckZpbGwoKTwvY29kZT5cclxuXHQgKiBtZXRob2QuIENhbGxpbmcgdGhlIDxjb2RlPmNsZWFyKCk8L2NvZGU+IG1ldGhvZCBjbGVhcnMgdGhlIGZpbGwuXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgYXBwbGljYXRpb24gcmVuZGVycyB0aGUgZmlsbCB3aGVuZXZlciB0aHJlZSBvciBtb3JlIHBvaW50cyBhcmVcclxuXHQgKiBkcmF3biwgb3Igd2hlbiB0aGUgPGNvZGU+ZW5kRmlsbCgpPC9jb2RlPiBtZXRob2QgaXMgY2FsbGVkLjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBjb2xvciBUaGUgY29sb3Igb2YgdGhlIGZpbGwoMHhSUkdHQkIpLlxyXG5cdCAqIEBwYXJhbSBhbHBoYSBUaGUgYWxwaGEgdmFsdWUgb2YgdGhlIGZpbGwoMC4wIHRvIDEuMCkuXHJcblx0ICovXHJcblx0cHVibGljIGJlZ2luRmlsbChjb2xvcjpudW1iZXIgLyppbnQqLywgYWxwaGE6bnVtYmVyID0gMSlcclxuXHR7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIGEgZ3JhZGllbnQgZmlsbCB1c2VkIGJ5IHN1YnNlcXVlbnQgY2FsbHMgdG8gb3RoZXIgR3JhcGhpY3NcclxuXHQgKiBtZXRob2RzKHN1Y2ggYXMgPGNvZGU+bGluZVRvKCk8L2NvZGU+IG9yIDxjb2RlPmRyYXdDaXJjbGUoKTwvY29kZT4pIGZvclxyXG5cdCAqIHRoZSBvYmplY3QuIFRoZSBmaWxsIHJlbWFpbnMgaW4gZWZmZWN0IHVudGlsIHlvdSBjYWxsIHRoZVxyXG5cdCAqIDxjb2RlPmJlZ2luRmlsbCgpPC9jb2RlPiwgPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+LFxyXG5cdCAqIDxjb2RlPmJlZ2luR3JhZGllbnRGaWxsKCk8L2NvZGU+LCBvciA8Y29kZT5iZWdpblNoYWRlckZpbGwoKTwvY29kZT5cclxuXHQgKiBtZXRob2QuIENhbGxpbmcgdGhlIDxjb2RlPmNsZWFyKCk8L2NvZGU+IG1ldGhvZCBjbGVhcnMgdGhlIGZpbGwuXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgYXBwbGljYXRpb24gcmVuZGVycyB0aGUgZmlsbCB3aGVuZXZlciB0aHJlZSBvciBtb3JlIHBvaW50cyBhcmVcclxuXHQgKiBkcmF3biwgb3Igd2hlbiB0aGUgPGNvZGU+ZW5kRmlsbCgpPC9jb2RlPiBtZXRob2QgaXMgY2FsbGVkLiA8L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdHlwZSAgICAgICAgICAgICAgICBBIHZhbHVlIGZyb20gdGhlIEdyYWRpZW50VHlwZSBjbGFzcyB0aGF0XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWVzIHdoaWNoIGdyYWRpZW50IHR5cGUgdG8gdXNlOlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkdyYWRpZW50VHlwZS5MSU5FQVI8L2NvZGU+IG9yXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+R3JhZGllbnRUeXBlLlJBRElBTDwvY29kZT4uXHJcblx0ICogQHBhcmFtIGNvbG9ycyAgICAgICAgICAgICAgQW4gYXJyYXkgb2YgUkdCIGhleGFkZWNpbWFsIGNvbG9yIHZhbHVlcyB1c2VkXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gdGhlIGdyYWRpZW50OyBmb3IgZXhhbXBsZSwgcmVkIGlzIDB4RkYwMDAwLFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsdWUgaXMgMHgwMDAwRkYsIGFuZCBzbyBvbi4gWW91IGNhbiBzcGVjaWZ5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdXAgdG8gMTUgY29sb3JzLiBGb3IgZWFjaCBjb2xvciwgc3BlY2lmeSBhXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVzcG9uZGluZyB2YWx1ZSBpbiB0aGUgYWxwaGFzIGFuZCByYXRpb3NcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLlxyXG5cdCAqIEBwYXJhbSBhbHBoYXMgICAgICAgICAgICAgIEFuIGFycmF5IG9mIGFscGhhIHZhbHVlcyBmb3IgdGhlIGNvcnJlc3BvbmRpbmdcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcnMgaW4gdGhlIGNvbG9ycyBhcnJheTsgdmFsaWQgdmFsdWVzIGFyZSAwXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gMS4gSWYgdGhlIHZhbHVlIGlzIGxlc3MgdGhhbiAwLCB0aGUgZGVmYXVsdFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIDAuIElmIHRoZSB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gMSwgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCBpcyAxLlxyXG5cdCAqIEBwYXJhbSByYXRpb3MgICAgICAgICAgICAgIEFuIGFycmF5IG9mIGNvbG9yIGRpc3RyaWJ1dGlvbiByYXRpb3M7IHZhbGlkXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIGFyZSAwLTI1NS4gVGhpcyB2YWx1ZSBkZWZpbmVzIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2Ugb2YgdGhlIHdpZHRoIHdoZXJlIHRoZSBjb2xvciBpc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZWQgYXQgMTAwJS4gVGhlIHZhbHVlIDAgcmVwcmVzZW50cyB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0IHBvc2l0aW9uIGluIHRoZSBncmFkaWVudCBib3gsIGFuZCAyNTVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXByZXNlbnRzIHRoZSByaWdodCBwb3NpdGlvbiBpbiB0aGUgZ3JhZGllbnRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3guXHJcblx0ICogQHBhcmFtIG1hdHJpeCAgICAgICAgICAgICAgQSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggYXMgZGVmaW5lZCBieSB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFzaC5nZW9tLk1hdHJpeCBjbGFzcy4gVGhlIGZsYXNoLmdlb20uTWF0cml4XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3MgaW5jbHVkZXMgYVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmNyZWF0ZUdyYWRpZW50Qm94KCk8L2NvZGU+IG1ldGhvZCwgd2hpY2hcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXRzIHlvdSBjb252ZW5pZW50bHkgc2V0IHVwIHRoZSBtYXRyaXggZm9yIHVzZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggdGhlIDxjb2RlPmJlZ2luR3JhZGllbnRGaWxsKCk8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kLlxyXG5cdCAqIEBwYXJhbSBzcHJlYWRNZXRob2QgICAgICAgIEEgdmFsdWUgZnJvbSB0aGUgU3ByZWFkTWV0aG9kIGNsYXNzIHRoYXRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZXMgd2hpY2ggc3ByZWFkIG1ldGhvZCB0byB1c2UsIGVpdGhlcjpcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TcHJlYWRNZXRob2QuUEFEPC9jb2RlPixcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TcHJlYWRNZXRob2QuUkVGTEVDVDwvY29kZT4sIG9yXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+U3ByZWFkTWV0aG9kLlJFUEVBVDwvY29kZT4uXHJcblx0ICpcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Gb3IgZXhhbXBsZSwgY29uc2lkZXIgYSBzaW1wbGUgbGluZWFyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQgYmV0d2VlbiB0d28gY29sb3JzOjwvcD5cclxuXHQgKlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlRoaXMgZXhhbXBsZSB1c2VzXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+U3ByZWFkTWV0aG9kLlBBRDwvY29kZT4gZm9yIHRoZSBzcHJlYWRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2QsIGFuZCB0aGUgZ3JhZGllbnQgZmlsbCBsb29rcyBsaWtlIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbGxvd2luZzo8L3A+XHJcblx0ICpcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5JZiB5b3UgdXNlIDxjb2RlPlNwcmVhZE1ldGhvZC5SRUZMRUNUPC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB0aGUgc3ByZWFkIG1ldGhvZCwgdGhlIGdyYWRpZW50IGZpbGwgbG9va3NcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWtlIHRoZSBmb2xsb3dpbmc6PC9wPlxyXG5cdCAqXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+SWYgeW91IHVzZSA8Y29kZT5TcHJlYWRNZXRob2QuUkVQRUFUPC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB0aGUgc3ByZWFkIG1ldGhvZCwgdGhlIGdyYWRpZW50IGZpbGwgbG9va3NcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWtlIHRoZSBmb2xsb3dpbmc6PC9wPlxyXG5cdCAqIEBwYXJhbSBpbnRlcnBvbGF0aW9uTWV0aG9kIEEgdmFsdWUgZnJvbSB0aGUgSW50ZXJwb2xhdGlvbk1ldGhvZCBjbGFzcyB0aGF0XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWVzIHdoaWNoIHZhbHVlIHRvIHVzZTpcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5JbnRlcnBvbGF0aW9uTWV0aG9kLkxJTkVBUl9SR0I8L2NvZGU+IG9yXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+SW50ZXJwb2xhdGlvbk1ldGhvZC5SR0I8L2NvZGU+XHJcblx0ICpcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Gb3IgZXhhbXBsZSwgY29uc2lkZXIgYSBzaW1wbGUgbGluZWFyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQgYmV0d2VlbiB0d28gY29sb3JzKHdpdGggdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c3ByZWFkTWV0aG9kPC9jb2RlPiBwYXJhbWV0ZXIgc2V0IHRvXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+U3ByZWFkTWV0aG9kLlJFRkxFQ1Q8L2NvZGU+KS4gVGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmVyZW50IGludGVycG9sYXRpb24gbWV0aG9kcyBhZmZlY3QgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwZWFyYW5jZSBhcyBmb2xsb3dzOiA8L3A+XHJcblx0ICogQHBhcmFtIGZvY2FsUG9pbnRSYXRpbyAgICAgQSBudW1iZXIgdGhhdCBjb250cm9scyB0aGUgbG9jYXRpb24gb2YgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jYWwgcG9pbnQgb2YgdGhlIGdyYWRpZW50LiAwIG1lYW5zIHRoYXQgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jYWwgcG9pbnQgaXMgaW4gdGhlIGNlbnRlci4gMSBtZWFucyB0aGF0IHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY2FsIHBvaW50IGlzIGF0IG9uZSBib3JkZXIgb2YgdGhlIGdyYWRpZW50XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lyY2xlLiAtMSBtZWFucyB0aGF0IHRoZSBmb2NhbCBwb2ludCBpcyBhdCB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlciBib3JkZXIgb2YgdGhlIGdyYWRpZW50IGNpcmNsZS4gQSB2YWx1ZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlc3MgdGhhbiAtMSBvciBncmVhdGVyIHRoYW4gMSBpcyByb3VuZGVkIHRvIC0xXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgMS4gRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgZXhhbXBsZSBzaG93c1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgPGNvZGU+Zm9jYWxQb2ludFJhdGlvPC9jb2RlPiBzZXQgdG8gMC43NTpcclxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgSWYgdGhlIDxjb2RlPnR5cGU8L2NvZGU+IHBhcmFtZXRlciBpcyBub3QgdmFsaWQuXHJcblx0ICovXHJcblx0cHVibGljIGJlZ2luR3JhZGllbnRGaWxsKHR5cGU6R3JhZGllbnRUeXBlLCBjb2xvcnM6QXJyYXk8bnVtYmVyIC8qaW50Ki8+LCBhbHBoYXM6QXJyYXk8bnVtYmVyPiwgcmF0aW9zOkFycmF5PG51bWJlciAvKmludCovPiwgbWF0cml4Ok1hdHJpeCA9IG51bGwsIHNwcmVhZE1ldGhvZDpzdHJpbmcgPSBcInBhZFwiLCBpbnRlcnBvbGF0aW9uTWV0aG9kOnN0cmluZyA9IFwicmdiXCIsIGZvY2FsUG9pbnRSYXRpbzpudW1iZXIgPSAwKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgYSBzaGFkZXIgZmlsbCB1c2VkIGJ5IHN1YnNlcXVlbnQgY2FsbHMgdG8gb3RoZXIgR3JhcGhpY3MgbWV0aG9kc1xyXG5cdCAqIChzdWNoIGFzIDxjb2RlPmxpbmVUbygpPC9jb2RlPiBvciA8Y29kZT5kcmF3Q2lyY2xlKCk8L2NvZGU+KSBmb3IgdGhlXHJcblx0ICogb2JqZWN0LiBUaGUgZmlsbCByZW1haW5zIGluIGVmZmVjdCB1bnRpbCB5b3UgY2FsbCB0aGVcclxuXHQgKiA8Y29kZT5iZWdpbkZpbGwoKTwvY29kZT4sIDxjb2RlPmJlZ2luQml0bWFwRmlsbCgpPC9jb2RlPixcclxuXHQgKiA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiwgb3IgPGNvZGU+YmVnaW5TaGFkZXJGaWxsKCk8L2NvZGU+XHJcblx0ICogbWV0aG9kLiBDYWxsaW5nIHRoZSA8Y29kZT5jbGVhcigpPC9jb2RlPiBtZXRob2QgY2xlYXJzIHRoZSBmaWxsLlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIGFwcGxpY2F0aW9uIHJlbmRlcnMgdGhlIGZpbGwgd2hlbmV2ZXIgdGhyZWUgb3IgbW9yZSBwb2ludHMgYXJlXHJcblx0ICogZHJhd24sIG9yIHdoZW4gdGhlIDxjb2RlPmVuZEZpbGwoKTwvY29kZT4gbWV0aG9kIGlzIGNhbGxlZC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5TaGFkZXIgZmlsbHMgYXJlIG5vdCBzdXBwb3J0ZWQgdW5kZXIgR1BVIHJlbmRlcmluZzsgZmlsbGVkIGFyZWFzIHdpbGxcclxuXHQgKiBiZSBjb2xvcmVkIGN5YW4uPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHNoYWRlciBUaGUgc2hhZGVyIHRvIHVzZSBmb3IgdGhlIGZpbGwuIFRoaXMgU2hhZGVyIGluc3RhbmNlIGlzIG5vdFxyXG5cdCAqICAgICAgICAgICAgICAgcmVxdWlyZWQgdG8gc3BlY2lmeSBhbiBpbWFnZSBpbnB1dC4gSG93ZXZlciwgaWYgYW4gaW1hZ2VcclxuXHQgKiAgICAgICAgICAgICAgIGlucHV0IGlzIHNwZWNpZmllZCBpbiB0aGUgc2hhZGVyLCB0aGUgaW5wdXQgbXVzdCBiZSBwcm92aWRlZFxyXG5cdCAqICAgICAgICAgICAgICAgbWFudWFsbHkuIFRvIHNwZWNpZnkgdGhlIGlucHV0LCBzZXQgdGhlIDxjb2RlPmlucHV0PC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgcHJvcGVydHkgb2YgdGhlIGNvcnJlc3BvbmRpbmcgU2hhZGVySW5wdXQgcHJvcGVydHkgb2YgdGhlXHJcblx0ICogICAgICAgICAgICAgICA8Y29kZT5TaGFkZXIuZGF0YTwvY29kZT4gcHJvcGVydHkuXHJcblx0ICpcclxuXHQgKiAgICAgICAgICAgICAgIDxwPldoZW4geW91IHBhc3MgYSBTaGFkZXIgaW5zdGFuY2UgYXMgYW4gYXJndW1lbnQgdGhlIHNoYWRlclxyXG5cdCAqICAgICAgICAgICAgICAgaXMgY29waWVkIGludGVybmFsbHkuIFRoZSBkcmF3aW5nIGZpbGwgb3BlcmF0aW9uIHVzZXMgdGhhdFxyXG5cdCAqICAgICAgICAgICAgICAgaW50ZXJuYWwgY29weSwgbm90IGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCBzaGFkZXIuIEFueVxyXG5cdCAqICAgICAgICAgICAgICAgY2hhbmdlcyBtYWRlIHRvIHRoZSBzaGFkZXIsIHN1Y2ggYXMgY2hhbmdpbmcgYSBwYXJhbWV0ZXJcclxuXHQgKiAgICAgICAgICAgICAgIHZhbHVlLCBpbnB1dCwgb3IgYnl0ZWNvZGUsIGFyZSBub3QgYXBwbGllZCB0byB0aGUgY29waWVkXHJcblx0ICogICAgICAgICAgICAgICBzaGFkZXIgdGhhdCdzIHVzZWQgZm9yIHRoZSBmaWxsLjwvcD5cclxuXHQgKiBAcGFyYW0gbWF0cml4IEEgbWF0cml4IG9iamVjdChvZiB0aGUgZmxhc2guZ2VvbS5NYXRyaXggY2xhc3MpLCB3aGljaCB5b3VcclxuXHQgKiAgICAgICAgICAgICAgIGNhbiB1c2UgdG8gZGVmaW5lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgc2hhZGVyLiBGb3JcclxuXHQgKiAgICAgICAgICAgICAgIGV4YW1wbGUsIHlvdSBjYW4gdXNlIHRoZSBmb2xsb3dpbmcgbWF0cml4IHRvIHJvdGF0ZSBhIHNoYWRlclxyXG5cdCAqICAgICAgICAgICAgICAgYnkgNDUgZGVncmVlcyhwaS80IHJhZGlhbnMpOlxyXG5cdCAqXHJcblx0ICogICAgICAgICAgICAgICA8cD5UaGUgY29vcmRpbmF0ZXMgcmVjZWl2ZWQgaW4gdGhlIHNoYWRlciBhcmUgYmFzZWQgb24gdGhlXHJcblx0ICogICAgICAgICAgICAgICBtYXRyaXggdGhhdCBpcyBzcGVjaWZpZWQgZm9yIHRoZSA8Y29kZT5tYXRyaXg8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICBwYXJhbWV0ZXIuIEZvciBhIGRlZmF1bHQoPGNvZGU+bnVsbDwvY29kZT4pIG1hdHJpeCwgdGhlXHJcblx0ICogICAgICAgICAgICAgICBjb29yZGluYXRlcyBpbiB0aGUgc2hhZGVyIGFyZSBsb2NhbCBwaXhlbCBjb29yZGluYXRlcyB3aGljaFxyXG5cdCAqICAgICAgICAgICAgICAgY2FuIGJlIHVzZWQgdG8gc2FtcGxlIGFuIGlucHV0LjwvcD5cclxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgV2hlbiB0aGUgc2hhZGVyIG91dHB1dCB0eXBlIGlzIG5vdCBjb21wYXRpYmxlIHdpdGhcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvcGVyYXRpb24odGhlIHNoYWRlciBtdXN0IHNwZWNpZnkgYVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5waXhlbDM8L2NvZGU+IG9yIDxjb2RlPnBpeGVsNDwvY29kZT4gb3V0cHV0KS5cclxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgV2hlbiB0aGUgc2hhZGVyIHNwZWNpZmllcyBhbiBpbWFnZSBpbnB1dCB0aGF0IGlzbid0XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVkLlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIGEgQnl0ZUFycmF5IG9yIFZlY3Rvci48TnVtYmVyPiBpbnN0YW5jZSBpcyB1c2VkXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFzIGFuIGlucHV0IGFuZCB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IGFuZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMgYXJlbid0IHNwZWNpZmllZCBmb3JcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIFNoYWRlcklucHV0LCBvciB0aGUgc3BlY2lmaWVkIHZhbHVlcyBkb24ndCBtYXRjaFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgYW1vdW50IG9mIGRhdGEgaW4gdGhlIGlucHV0IG9iamVjdC4gU2VlIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TaGFkZXJJbnB1dC5pbnB1dDwvY29kZT4gcHJvcGVydHkgZm9yIG1vcmVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgaW5mb3JtYXRpb24uXHJcblx0ICovXHJcbi8vXHRcdHB1YmxpYyBiZWdpblNoYWRlckZpbGwoc2hhZGVyOlNoYWRlciwgbWF0cml4Ok1hdHJpeCA9IG51bGwpXHJcbi8vXHRcdHtcclxuLy9cclxuLy9cdFx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDbGVhcnMgdGhlIGdyYXBoaWNzIHRoYXQgd2VyZSBkcmF3biB0byB0aGlzIEdyYXBoaWNzIG9iamVjdCwgYW5kIHJlc2V0c1xyXG5cdCAqIGZpbGwgYW5kIGxpbmUgc3R5bGUgc2V0dGluZ3MuXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgY2xlYXIoKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb3BpZXMgYWxsIG9mIGRyYXdpbmcgY29tbWFuZHMgZnJvbSB0aGUgc291cmNlIEdyYXBoaWNzIG9iamVjdCBpbnRvIHRoZVxyXG5cdCAqIGNhbGxpbmcgR3JhcGhpY3Mgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHNvdXJjZUdyYXBoaWNzIFRoZSBHcmFwaGljcyBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHRoZSBkcmF3aW5nXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb3B5RnJvbShzb3VyY2VHcmFwaGljczpHcmFwaGljcylcclxuXHR7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRHJhd3MgYSBjdWJpYyBCZXppZXIgY3VydmUgZnJvbSB0aGUgY3VycmVudCBkcmF3aW5nIHBvc2l0aW9uIHRvIHRoZVxyXG5cdCAqIHNwZWNpZmllZCBhbmNob3IgcG9pbnQuIEN1YmljIEJlemllciBjdXJ2ZXMgY29uc2lzdCBvZiB0d28gYW5jaG9yIHBvaW50c1xyXG5cdCAqIGFuZCB0d28gY29udHJvbCBwb2ludHMuIFRoZSBjdXJ2ZSBpbnRlcnBvbGF0ZXMgdGhlIHR3byBhbmNob3IgcG9pbnRzIGFuZFxyXG5cdCAqIGN1cnZlcyB0b3dhcmQgdGhlIHR3byBjb250cm9sIHBvaW50cy5cclxuXHQgKlxyXG5cdCAqIFRoZSBmb3VyIHBvaW50cyB5b3UgdXNlIHRvIGRyYXcgYSBjdWJpYyBCZXppZXIgY3VydmUgd2l0aCB0aGVcclxuXHQgKiA8Y29kZT5jdWJpY0N1cnZlVG8oKTwvY29kZT4gbWV0aG9kIGFyZSBhcyBmb2xsb3dzOlxyXG5cdCAqXHJcblx0ICogPHVsPlxyXG5cdCAqICAgPGxpPlRoZSBjdXJyZW50IGRyYXdpbmcgcG9zaXRpb24gaXMgdGhlIGZpcnN0IGFuY2hvciBwb2ludC4gPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgYW5jaG9yWCBhbmQgYW5jaG9yWSBwYXJhbWV0ZXJzIHNwZWNpZnkgdGhlIHNlY29uZCBhbmNob3IgcG9pbnQuXHJcblx0ICogICA8L2xpPlxyXG5cdCAqICAgPGxpPlRoZSA8Y29kZT5jb250cm9sWDE8L2NvZGU+IGFuZCA8Y29kZT5jb250cm9sWTE8L2NvZGU+IHBhcmFtZXRlcnNcclxuXHQgKiAgIHNwZWNpZnkgdGhlIGZpcnN0IGNvbnRyb2wgcG9pbnQuPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgPGNvZGU+Y29udHJvbFgyPC9jb2RlPiBhbmQgPGNvZGU+Y29udHJvbFkyPC9jb2RlPiBwYXJhbWV0ZXJzXHJcblx0ICogICBzcGVjaWZ5IHRoZSBzZWNvbmQgY29udHJvbCBwb2ludC48L2xpPlxyXG5cdCAqIDwvdWw+XHJcblx0ICpcclxuXHQgKiBJZiB5b3UgY2FsbCB0aGUgPGNvZGU+Y3ViaWNDdXJ2ZVRvKCk8L2NvZGU+IG1ldGhvZCBiZWZvcmUgY2FsbGluZyB0aGVcclxuXHQgKiA8Y29kZT5tb3ZlVG8oKTwvY29kZT4gbWV0aG9kLCB5b3VyIGN1cnZlIHN0YXJ0cyBhdCBwb3NpdGlvbiAoMCwgMCkuXHJcblx0ICpcclxuXHQgKiBJZiB0aGUgPGNvZGU+Y3ViaWNDdXJ2ZVRvKCk8L2NvZGU+IG1ldGhvZCBzdWNjZWVkcywgdGhlIEZsYXNoIHJ1bnRpbWUgc2V0c1xyXG5cdCAqIHRoZSBjdXJyZW50IGRyYXdpbmcgcG9zaXRpb24gdG8gKDxjb2RlPmFuY2hvclg8L2NvZGU+LFxyXG5cdCAqIDxjb2RlPmFuY2hvclk8L2NvZGU+KS4gSWYgdGhlIDxjb2RlPmN1YmljQ3VydmVUbygpPC9jb2RlPiBtZXRob2QgZmFpbHMsXHJcblx0ICogdGhlIGN1cnJlbnQgZHJhd2luZyBwb3NpdGlvbiByZW1haW5zIHVuY2hhbmdlZC5cclxuXHQgKlxyXG5cdCAqIElmIHlvdXIgbW92aWUgY2xpcCBjb250YWlucyBjb250ZW50IGNyZWF0ZWQgd2l0aCB0aGUgRmxhc2ggZHJhd2luZyB0b29scyxcclxuXHQgKiB0aGUgcmVzdWx0cyBvZiBjYWxscyB0byB0aGUgPGNvZGU+Y3ViaWNDdXJ2ZVRvKCk8L2NvZGU+IG1ldGhvZCBhcmUgZHJhd25cclxuXHQgKiB1bmRlcm5lYXRoIHRoYXQgY29udGVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBjb250cm9sWDEgU3BlY2lmaWVzIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBjb250cm9sXHJcblx0ICogICAgICAgICAgICAgICAgICBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnRcclxuXHQgKiAgICAgICAgICAgICAgICAgIGRpc3BsYXkgb2JqZWN0LlxyXG5cdCAqIEBwYXJhbSBjb250cm9sWTEgU3BlY2lmaWVzIHRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgY29udHJvbFxyXG5cdCAqICAgICAgICAgICAgICAgICAgcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50XHJcblx0ICogICAgICAgICAgICAgICAgICBkaXNwbGF5IG9iamVjdC5cclxuXHQgKiBAcGFyYW0gY29udHJvbFgyIFNwZWNpZmllcyB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbiBvZiB0aGUgc2Vjb25kIGNvbnRyb2xcclxuXHQgKiAgICAgICAgICAgICAgICAgIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudFxyXG5cdCAqICAgICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QuXHJcblx0ICogQHBhcmFtIGNvbnRyb2xZMiBTcGVjaWZpZXMgdGhlIHZlcnRpY2FsIHBvc2l0aW9uIG9mIHRoZSBzZWNvbmQgY29udHJvbFxyXG5cdCAqICAgICAgICAgICAgICAgICAgcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50XHJcblx0ICogICAgICAgICAgICAgICAgICBkaXNwbGF5IG9iamVjdC5cclxuXHQgKiBAcGFyYW0gYW5jaG9yWCAgIFNwZWNpZmllcyB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbiBvZiB0aGUgYW5jaG9yIHBvaW50XHJcblx0ICogICAgICAgICAgICAgICAgICByZWxhdGl2ZSB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnQgZGlzcGxheVxyXG5cdCAqICAgICAgICAgICAgICAgICAgb2JqZWN0LlxyXG5cdCAqIEBwYXJhbSBhbmNob3JZICAgU3BlY2lmaWVzIHRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiBvZiB0aGUgYW5jaG9yIHBvaW50XHJcblx0ICogICAgICAgICAgICAgICAgICByZWxhdGl2ZSB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnQgZGlzcGxheVxyXG5cdCAqICAgICAgICAgICAgICAgICAgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjdWJpY0N1cnZlVG8oY29udHJvbFgxOm51bWJlciwgY29udHJvbFkxOm51bWJlciwgY29udHJvbFgyOm51bWJlciwgY29udHJvbFkyOm51bWJlciwgYW5jaG9yWDpudW1iZXIsIGFuY2hvclk6bnVtYmVyKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEcmF3cyBhIGN1cnZlIHVzaW5nIHRoZSBjdXJyZW50IGxpbmUgc3R5bGUgZnJvbSB0aGUgY3VycmVudCBkcmF3aW5nXHJcblx0ICogcG9zaXRpb24gdG8oYW5jaG9yWCwgYW5jaG9yWSkgYW5kIHVzaW5nIHRoZSBjb250cm9sIHBvaW50IHRoYXRcclxuXHQgKiAoPGNvZGU+Y29udHJvbFg8L2NvZGU+LCA8Y29kZT5jb250cm9sWTwvY29kZT4pIHNwZWNpZmllcy4gVGhlIGN1cnJlbnRcclxuXHQgKiBkcmF3aW5nIHBvc2l0aW9uIGlzIHRoZW4gc2V0IHRvKDxjb2RlPmFuY2hvclg8L2NvZGU+LFxyXG5cdCAqIDxjb2RlPmFuY2hvclk8L2NvZGU+KS4gSWYgdGhlIG1vdmllIGNsaXAgaW4gd2hpY2ggeW91IGFyZSBkcmF3aW5nIGNvbnRhaW5zXHJcblx0ICogY29udGVudCBjcmVhdGVkIHdpdGggdGhlIEZsYXNoIGRyYXdpbmcgdG9vbHMsIGNhbGxzIHRvIHRoZVxyXG5cdCAqIDxjb2RlPmN1cnZlVG8oKTwvY29kZT4gbWV0aG9kIGFyZSBkcmF3biB1bmRlcm5lYXRoIHRoaXMgY29udGVudC4gSWYgeW91XHJcblx0ICogY2FsbCB0aGUgPGNvZGU+Y3VydmVUbygpPC9jb2RlPiBtZXRob2QgYmVmb3JlIGFueSBjYWxscyB0byB0aGVcclxuXHQgKiA8Y29kZT5tb3ZlVG8oKTwvY29kZT4gbWV0aG9kLCB0aGUgZGVmYXVsdCBvZiB0aGUgY3VycmVudCBkcmF3aW5nIHBvc2l0aW9uXHJcblx0ICogaXMoMCwgMCkuIElmIGFueSBvZiB0aGUgcGFyYW1ldGVycyBhcmUgbWlzc2luZywgdGhpcyBtZXRob2QgZmFpbHMgYW5kIHRoZVxyXG5cdCAqIGN1cnJlbnQgZHJhd2luZyBwb3NpdGlvbiBpcyBub3QgY2hhbmdlZC5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBjdXJ2ZSBkcmF3biBpcyBhIHF1YWRyYXRpYyBCZXppZXIgY3VydmUuIFF1YWRyYXRpYyBCZXppZXIgY3VydmVzXHJcblx0ICogY29uc2lzdCBvZiB0d28gYW5jaG9yIHBvaW50cyBhbmQgb25lIGNvbnRyb2wgcG9pbnQuIFRoZSBjdXJ2ZSBpbnRlcnBvbGF0ZXNcclxuXHQgKiB0aGUgdHdvIGFuY2hvciBwb2ludHMgYW5kIGN1cnZlcyB0b3dhcmQgdGhlIGNvbnRyb2wgcG9pbnQuIDwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBjb250cm9sWCBBIG51bWJlciB0aGF0IHNwZWNpZmllcyB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbiBvZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgY29udHJvbCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICBwYXJlbnQgZGlzcGxheSBvYmplY3QuXHJcblx0ICogQHBhcmFtIGNvbnRyb2xZIEEgbnVtYmVyIHRoYXQgc3BlY2lmaWVzIHRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiBvZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgY29udHJvbCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICBwYXJlbnQgZGlzcGxheSBvYmplY3QuXHJcblx0ICogQHBhcmFtIGFuY2hvclggIEEgbnVtYmVyIHRoYXQgc3BlY2lmaWVzIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uIG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICBuZXh0IGFuY2hvciBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mXHJcblx0ICogICAgICAgICAgICAgICAgIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3QuXHJcblx0ICogQHBhcmFtIGFuY2hvclkgIEEgbnVtYmVyIHRoYXQgc3BlY2lmaWVzIHRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiBvZiB0aGUgbmV4dFxyXG5cdCAqICAgICAgICAgICAgICAgICBhbmNob3IgcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgcGFyZW50IGRpc3BsYXkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjdXJ2ZVRvKGNvbnRyb2xYOm51bWJlciwgY29udHJvbFk6bnVtYmVyLCBhbmNob3JYOm51bWJlciwgYW5jaG9yWTpudW1iZXIpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERyYXdzIGEgY2lyY2xlLiBTZXQgdGhlIGxpbmUgc3R5bGUsIGZpbGwsIG9yIGJvdGggYmVmb3JlIHlvdSBjYWxsIHRoZVxyXG5cdCAqIDxjb2RlPmRyYXdDaXJjbGUoKTwvY29kZT4gbWV0aG9kLCBieSBjYWxsaW5nIHRoZSA8Y29kZT5saW5lc3R5bGUoKTwvY29kZT4sXHJcblx0ICogPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4sIDxjb2RlPmJlZ2luRmlsbCgpPC9jb2RlPixcclxuXHQgKiA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiwgb3IgPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+XHJcblx0ICogbWV0aG9kLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHggICAgICBUaGUgPGk+eDwvaT4gbG9jYXRpb24gb2YgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlXHJcblx0ICogICAgICAgICAgICAgICB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3QoaW5cclxuXHQgKiAgICAgICAgICAgICAgIHBpeGVscykuXHJcblx0ICogQHBhcmFtIHkgICAgICBUaGUgPGk+eTwvaT4gbG9jYXRpb24gb2YgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlXHJcblx0ICogICAgICAgICAgICAgICB0byB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3QoaW5cclxuXHQgKiAgICAgICAgICAgICAgIHBpeGVscykuXHJcblx0ICogQHBhcmFtIHJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSBjaXJjbGUoaW4gcGl4ZWxzKS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZHJhd0NpcmNsZSh4Om51bWJlciwgeTpudW1iZXIsIHJhZGl1czpudW1iZXIpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERyYXdzIGFuIGVsbGlwc2UuIFNldCB0aGUgbGluZSBzdHlsZSwgZmlsbCwgb3IgYm90aCBiZWZvcmUgeW91IGNhbGwgdGhlXHJcblx0ICogPGNvZGU+ZHJhd0VsbGlwc2UoKTwvY29kZT4gbWV0aG9kLCBieSBjYWxsaW5nIHRoZVxyXG5cdCAqIDxjb2RlPmxpbmVzdHlsZSgpPC9jb2RlPiwgPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4sXHJcblx0ICogPGNvZGU+YmVnaW5GaWxsKCk8L2NvZGU+LCA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiwgb3JcclxuXHQgKiA8Y29kZT5iZWdpbkJpdG1hcEZpbGwoKTwvY29kZT4gbWV0aG9kLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHggICAgICBUaGUgPGk+eDwvaT4gbG9jYXRpb24gb2YgdGhlIHRvcC1sZWZ0IG9mIHRoZSBib3VuZGluZy1ib3ggb2ZcclxuXHQgKiAgICAgICAgICAgICAgIHRoZSBlbGxpcHNlIHJlbGF0aXZlIHRvIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudFxyXG5cdCAqICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QoaW4gcGl4ZWxzKS5cclxuXHQgKiBAcGFyYW0geSAgICAgIFRoZSA8aT55PC9pPiBsb2NhdGlvbiBvZiB0aGUgdG9wIGxlZnQgb2YgdGhlIGJvdW5kaW5nLWJveCBvZlxyXG5cdCAqICAgICAgICAgICAgICAgdGhlIGVsbGlwc2UgcmVsYXRpdmUgdG8gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50XHJcblx0ICogICAgICAgICAgICAgICBkaXNwbGF5IG9iamVjdChpbiBwaXhlbHMpLlxyXG5cdCAqIEBwYXJhbSB3aWR0aCAgVGhlIHdpZHRoIG9mIHRoZSBlbGxpcHNlKGluIHBpeGVscykuXHJcblx0ICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBlbGxpcHNlKGluIHBpeGVscykuXHJcblx0ICovXHJcblx0cHVibGljIGRyYXdFbGxpcHNlKHg6bnVtYmVyLCB5Om51bWJlciwgd2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTdWJtaXRzIGEgc2VyaWVzIG9mIElHcmFwaGljc0RhdGEgaW5zdGFuY2VzIGZvciBkcmF3aW5nLiBUaGlzIG1ldGhvZFxyXG5cdCAqIGFjY2VwdHMgYSBWZWN0b3IgY29udGFpbmluZyBvYmplY3RzIGluY2x1ZGluZyBwYXRocywgZmlsbHMsIGFuZCBzdHJva2VzXHJcblx0ICogdGhhdCBpbXBsZW1lbnQgdGhlIElHcmFwaGljc0RhdGEgaW50ZXJmYWNlLiBBIFZlY3RvciBvZiBJR3JhcGhpY3NEYXRhXHJcblx0ICogaW5zdGFuY2VzIGNhbiByZWZlciB0byBhIHBhcnQgb2YgYSBzaGFwZSwgb3IgYSBjb21wbGV4IGZ1bGx5IGRlZmluZWQgc2V0XHJcblx0ICogb2YgZGF0YSBmb3IgcmVuZGVyaW5nIGEgY29tcGxldGUgc2hhcGUuXHJcblx0ICpcclxuXHQgKiA8cD4gR3JhcGhpY3MgcGF0aHMgY2FuIGNvbnRhaW4gb3RoZXIgZ3JhcGhpY3MgcGF0aHMuIElmIHRoZVxyXG5cdCAqIDxjb2RlPmdyYXBoaWNzRGF0YTwvY29kZT4gVmVjdG9yIGluY2x1ZGVzIGEgcGF0aCwgdGhhdCBwYXRoIGFuZCBhbGwgaXRzXHJcblx0ICogc3ViLXBhdGhzIGFyZSByZW5kZXJlZCBkdXJpbmcgdGhpcyBvcGVyYXRpb24uIDwvcD5cclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkcmF3R3JhcGhpY3NEYXRhKGdyYXBoaWNzRGF0YTpBcnJheTxJR3JhcGhpY3NEYXRhPilcclxuXHR7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3VibWl0cyBhIHNlcmllcyBvZiBjb21tYW5kcyBmb3IgZHJhd2luZy4gVGhlIDxjb2RlPmRyYXdQYXRoKCk8L2NvZGU+XHJcblx0ICogbWV0aG9kIHVzZXMgdmVjdG9yIGFycmF5cyB0byBjb25zb2xpZGF0ZSBpbmRpdmlkdWFsIDxjb2RlPm1vdmVUbygpPC9jb2RlPixcclxuXHQgKiA8Y29kZT5saW5lVG8oKTwvY29kZT4sIGFuZCA8Y29kZT5jdXJ2ZVRvKCk8L2NvZGU+IGRyYXdpbmcgY29tbWFuZHMgaW50byBhXHJcblx0ICogc2luZ2xlIGNhbGwuIFRoZSA8Y29kZT5kcmF3UGF0aCgpPC9jb2RlPiBtZXRob2QgcGFyYW1ldGVycyBjb21iaW5lIGRyYXdpbmdcclxuXHQgKiBjb21tYW5kcyB3aXRoIHgtIGFuZCB5LWNvb3JkaW5hdGUgdmFsdWUgcGFpcnMgYW5kIGEgZHJhd2luZyBkaXJlY3Rpb24uIFRoZVxyXG5cdCAqIGRyYXdpbmcgY29tbWFuZHMgYXJlIHZhbHVlcyBmcm9tIHRoZSBHcmFwaGljc1BhdGhDb21tYW5kIGNsYXNzLiBUaGUgeC0gYW5kXHJcblx0ICogeS1jb29yZGluYXRlIHZhbHVlIHBhaXJzIGFyZSBOdW1iZXJzIGluIGFuIGFycmF5IHdoZXJlIGVhY2ggcGFpciBkZWZpbmVzIGFcclxuXHQgKiBjb29yZGluYXRlIGxvY2F0aW9uLiBUaGUgZHJhd2luZyBkaXJlY3Rpb24gaXMgYSB2YWx1ZSBmcm9tIHRoZVxyXG5cdCAqIEdyYXBoaWNzUGF0aFdpbmRpbmcgY2xhc3MuXHJcblx0ICpcclxuXHQgKiA8cD4gR2VuZXJhbGx5LCBkcmF3aW5ncyByZW5kZXIgZmFzdGVyIHdpdGggPGNvZGU+ZHJhd1BhdGgoKTwvY29kZT4gdGhhblxyXG5cdCAqIHdpdGggYSBzZXJpZXMgb2YgaW5kaXZpZHVhbCA8Y29kZT5saW5lVG8oKTwvY29kZT4gYW5kXHJcblx0ICogPGNvZGU+Y3VydmVUbygpPC9jb2RlPiBtZXRob2RzLiA8L3A+XHJcblx0ICpcclxuXHQgKiA8cD4gVGhlIDxjb2RlPmRyYXdQYXRoKCk8L2NvZGU+IG1ldGhvZCB1c2VzIGEgdXNlcyBhIGZsb2F0aW5nIGNvbXB1dGF0aW9uXHJcblx0ICogc28gcm90YXRpb24gYW5kIHNjYWxpbmcgb2Ygc2hhcGVzIGlzIG1vcmUgYWNjdXJhdGUgYW5kIGdpdmVzIGJldHRlclxyXG5cdCAqIHJlc3VsdHMuIEhvd2V2ZXIsIGN1cnZlcyBzdWJtaXR0ZWQgdXNpbmcgdGhlIDxjb2RlPmRyYXdQYXRoKCk8L2NvZGU+XHJcblx0ICogbWV0aG9kIGNhbiBoYXZlIHNtYWxsIHN1Yi1waXhlbCBhbGlnbm1lbnQgZXJyb3JzIHdoZW4gdXNlZCBpbiBjb25qdW5jdGlvblxyXG5cdCAqIHdpdGggdGhlIDxjb2RlPmxpbmVUbygpPC9jb2RlPiBhbmQgPGNvZGU+Y3VydmVUbygpPC9jb2RlPiBtZXRob2RzLiA8L3A+XHJcblx0ICpcclxuXHQgKiA8cD4gVGhlIDxjb2RlPmRyYXdQYXRoKCk8L2NvZGU+IG1ldGhvZCBhbHNvIHVzZXMgc2xpZ2h0bHkgZGlmZmVyZW50IHJ1bGVzXHJcblx0ICogZm9yIGZpbGxpbmcgYW5kIGRyYXdpbmcgbGluZXMuIFRoZXkgYXJlOiA8L3A+XHJcblx0ICpcclxuXHQgKiA8dWw+XHJcblx0ICogICA8bGk+V2hlbiBhIGZpbGwgaXMgYXBwbGllZCB0byByZW5kZXJpbmcgYSBwYXRoOlxyXG5cdCAqIDx1bD5cclxuXHQgKiAgIDxsaT5BIHN1Yi1wYXRoIG9mIGxlc3MgdGhhbiAzIHBvaW50cyBpcyBub3QgcmVuZGVyZWQuKEJ1dCBub3RlIHRoYXQgdGhlXHJcblx0ICogc3Ryb2tlIHJlbmRlcmluZyB3aWxsIHN0aWxsIG9jY3VyLCBjb25zaXN0ZW50IHdpdGggdGhlIHJ1bGVzIGZvciBzdHJva2VzXHJcblx0ICogYmVsb3cuKTwvbGk+XHJcblx0ICogICA8bGk+QSBzdWItcGF0aCB0aGF0IGlzbid0IGNsb3NlZCh0aGUgZW5kIHBvaW50IGlzIG5vdCBlcXVhbCB0byB0aGVcclxuXHQgKiBiZWdpbiBwb2ludCkgaXMgaW1wbGljaXRseSBjbG9zZWQuPC9saT5cclxuXHQgKiA8L3VsPlxyXG5cdCAqIDwvbGk+XHJcblx0ICogICA8bGk+V2hlbiBhIHN0cm9rZSBpcyBhcHBsaWVkIHRvIHJlbmRlcmluZyBhIHBhdGg6XHJcblx0ICogPHVsPlxyXG5cdCAqICAgPGxpPlRoZSBzdWItcGF0aHMgY2FuIGJlIGNvbXBvc2VkIG9mIGFueSBudW1iZXIgb2YgcG9pbnRzLjwvbGk+XHJcblx0ICogICA8bGk+VGhlIHN1Yi1wYXRoIGlzIG5ldmVyIGltcGxpY2l0bHkgY2xvc2VkLjwvbGk+XHJcblx0ICogPC91bD5cclxuXHQgKiA8L2xpPlxyXG5cdCAqIDwvdWw+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gd2luZGluZyBTcGVjaWZpZXMgdGhlIHdpbmRpbmcgcnVsZSB1c2luZyBhIHZhbHVlIGRlZmluZWQgaW4gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgR3JhcGhpY3NQYXRoV2luZGluZyBjbGFzcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZHJhd1BhdGgoY29tbWFuZHM6QXJyYXk8bnVtYmVyIC8qaW50Ki8+LCBkYXRhOkFycmF5PG51bWJlcj4sIHdpbmRpbmc6R3JhcGhpY3NQYXRoV2luZGluZylcclxuXHR7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRHJhd3MgYSByZWN0YW5nbGUuIFNldCB0aGUgbGluZSBzdHlsZSwgZmlsbCwgb3IgYm90aCBiZWZvcmUgeW91IGNhbGwgdGhlXHJcblx0ICogPGNvZGU+ZHJhd1JlY3QoKTwvY29kZT4gbWV0aG9kLCBieSBjYWxsaW5nIHRoZSA8Y29kZT5saW5lc3R5bGUoKTwvY29kZT4sXHJcblx0ICogPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4sIDxjb2RlPmJlZ2luRmlsbCgpPC9jb2RlPixcclxuXHQgKiA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiwgb3IgPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+XHJcblx0ICogbWV0aG9kLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHggICAgICBBIG51bWJlciBpbmRpY2F0aW5nIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3QoaW4gcGl4ZWxzKS5cclxuXHQgKiBAcGFyYW0geSAgICAgIEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIHZlcnRpY2FsIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3QoaW4gcGl4ZWxzKS5cclxuXHQgKiBAcGFyYW0gd2lkdGggIFRoZSB3aWR0aCBvZiB0aGUgcmVjdGFuZ2xlKGluIHBpeGVscykuXHJcblx0ICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSByZWN0YW5nbGUoaW4gcGl4ZWxzKS5cclxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgSWYgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBvciA8Y29kZT5oZWlnaHQ8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMgYXJlIG5vdCBhIG51bWJlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICg8Y29kZT5OdW1iZXIuTmFOPC9jb2RlPikuXHJcblx0ICovXHJcblx0cHVibGljIGRyYXdSZWN0KHg6bnVtYmVyLCB5Om51bWJlciwgd2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEcmF3cyBhIHJvdW5kZWQgcmVjdGFuZ2xlLiBTZXQgdGhlIGxpbmUgc3R5bGUsIGZpbGwsIG9yIGJvdGggYmVmb3JlIHlvdVxyXG5cdCAqIGNhbGwgdGhlIDxjb2RlPmRyYXdSb3VuZFJlY3QoKTwvY29kZT4gbWV0aG9kLCBieSBjYWxsaW5nIHRoZVxyXG5cdCAqIDxjb2RlPmxpbmVzdHlsZSgpPC9jb2RlPiwgPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4sXHJcblx0ICogPGNvZGU+YmVnaW5GaWxsKCk8L2NvZGU+LCA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiwgb3JcclxuXHQgKiA8Y29kZT5iZWdpbkJpdG1hcEZpbGwoKTwvY29kZT4gbWV0aG9kLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHggICAgICAgICAgICAgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbiByZWxhdGl2ZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIHBhcmVudCBkaXNwbGF5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0KGluIHBpeGVscykuXHJcblx0ICogQHBhcmFtIHkgICAgICAgICAgICAgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgdmVydGljYWwgcG9zaXRpb24gcmVsYXRpdmUgdG9cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3RcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIChpbiBwaXhlbHMpLlxyXG5cdCAqIEBwYXJhbSB3aWR0aCAgICAgICAgIFRoZSB3aWR0aCBvZiB0aGUgcm91bmQgcmVjdGFuZ2xlKGluIHBpeGVscykuXHJcblx0ICogQHBhcmFtIGhlaWdodCAgICAgICAgVGhlIGhlaWdodCBvZiB0aGUgcm91bmQgcmVjdGFuZ2xlKGluIHBpeGVscykuXHJcblx0ICogQHBhcmFtIGVsbGlwc2VXaWR0aCAgVGhlIHdpZHRoIG9mIHRoZSBlbGxpcHNlIHVzZWQgdG8gZHJhdyB0aGUgcm91bmRlZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGNvcm5lcnMoaW4gcGl4ZWxzKS5cclxuXHQgKiBAcGFyYW0gZWxsaXBzZUhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBlbGxpcHNlIHVzZWQgdG8gZHJhdyB0aGUgcm91bmRlZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGNvcm5lcnMoaW4gcGl4ZWxzKS4gT3B0aW9uYWw7IGlmIG5vIHZhbHVlIGlzXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWVkLCB0aGUgZGVmYXVsdCB2YWx1ZSBtYXRjaGVzIHRoYXQgcHJvdmlkZWRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhlIDxjb2RlPmVsbGlwc2VXaWR0aDwvY29kZT4gcGFyYW1ldGVyLlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBJZiB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+LCA8Y29kZT5oZWlnaHQ8L2NvZGU+LFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5lbGxpcHNlV2lkdGg8L2NvZGU+IG9yXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmVsbGlwc2VIZWlnaHQ8L2NvZGU+IHBhcmFtZXRlcnMgYXJlIG5vdCBhXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG51bWJlcig8Y29kZT5OdW1iZXIuTmFOPC9jb2RlPikuXHJcblx0ICovXHJcblx0cHVibGljIGRyYXdSb3VuZFJlY3QoeDpudW1iZXIsIHk6bnVtYmVyLCB3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIsIGVsbGlwc2VXaWR0aDpudW1iZXIsIGVsbGlwc2VIZWlnaHQ6bnVtYmVyID0gTmFOKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHQvL3B1YmxpYyBkcmF3Um91bmRSZWN0Q29tcGxleCh4OkZsb2F0LCB5OkZsb2F0LCB3aWR0aDpGbG9hdCwgaGVpZ2h0OkZsb2F0LCB0b3BMZWZ0UmFkaXVzOkZsb2F0LCB0b3BSaWdodFJhZGl1czpGbG9hdCwgYm90dG9tTGVmdFJhZGl1czpGbG9hdCwgYm90dG9tUmlnaHRSYWRpdXM6RmxvYXQpOlZvaWQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgYSBzZXQgb2YgdHJpYW5nbGVzLCB0eXBpY2FsbHkgdG8gZGlzdG9ydCBiaXRtYXBzIGFuZCBnaXZlIHRoZW0gYVxyXG5cdCAqIHRocmVlLWRpbWVuc2lvbmFsIGFwcGVhcmFuY2UuIFRoZSA8Y29kZT5kcmF3VHJpYW5nbGVzKCk8L2NvZGU+IG1ldGhvZCBtYXBzXHJcblx0ICogZWl0aGVyIHRoZSBjdXJyZW50IGZpbGwsIG9yIGEgYml0bWFwIGZpbGwsIHRvIHRoZSB0cmlhbmdsZSBmYWNlcyB1c2luZyBhXHJcblx0ICogc2V0IG9mKHUsdikgY29vcmRpbmF0ZXMuXHJcblx0ICpcclxuXHQgKiA8cD4gQW55IHR5cGUgb2YgZmlsbCBjYW4gYmUgdXNlZCwgYnV0IGlmIHRoZSBmaWxsIGhhcyBhIHRyYW5zZm9ybSBtYXRyaXhcclxuXHQgKiB0aGF0IHRyYW5zZm9ybSBtYXRyaXggaXMgaWdub3JlZC4gPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+IEEgPGNvZGU+dXZ0RGF0YTwvY29kZT4gcGFyYW1ldGVyIGltcHJvdmVzIHRleHR1cmUgbWFwcGluZyB3aGVuIGFcclxuXHQgKiBiaXRtYXAgZmlsbCBpcyB1c2VkLiA8L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gY3VsbGluZyBTcGVjaWZpZXMgd2hldGhlciB0byByZW5kZXIgdHJpYW5nbGVzIHRoYXQgZmFjZSBpbiBhXHJcblx0ICogICAgICAgICAgICAgICAgc3BlY2lmaWVkIGRpcmVjdGlvbi4gVGhpcyBwYXJhbWV0ZXIgcHJldmVudHMgdGhlIHJlbmRlcmluZ1xyXG5cdCAqICAgICAgICAgICAgICAgIG9mIHRyaWFuZ2xlcyB0aGF0IGNhbm5vdCBiZSBzZWVuIGluIHRoZSBjdXJyZW50IHZpZXcuIFRoaXNcclxuXHQgKiAgICAgICAgICAgICAgICBwYXJhbWV0ZXIgY2FuIGJlIHNldCB0byBhbnkgdmFsdWUgZGVmaW5lZCBieSB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICBUcmlhbmdsZUN1bGxpbmcgY2xhc3MuXHJcblx0ICovXHJcblx0cHVibGljIGRyYXdUcmlhbmdsZXModmVydGljZXM6QXJyYXk8bnVtYmVyPiwgaW5kaWNlczpBcnJheTxudW1iZXIgLyppbnQqLz4gPSBudWxsLCB1dnREYXRhOkFycmF5PG51bWJlcj4gPSBudWxsLCBjdWxsaW5nOlRyaWFuZ2xlQ3VsbGluZyA9IG51bGwpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFwcGxpZXMgYSBmaWxsIHRvIHRoZSBsaW5lcyBhbmQgY3VydmVzIHRoYXQgd2VyZSBhZGRlZCBzaW5jZSB0aGUgbGFzdCBjYWxsXHJcblx0ICogdG8gdGhlIDxjb2RlPmJlZ2luRmlsbCgpPC9jb2RlPiwgPGNvZGU+YmVnaW5HcmFkaWVudEZpbGwoKTwvY29kZT4sIG9yXHJcblx0ICogPGNvZGU+YmVnaW5CaXRtYXBGaWxsKCk8L2NvZGU+IG1ldGhvZC4gRmxhc2ggdXNlcyB0aGUgZmlsbCB0aGF0IHdhc1xyXG5cdCAqIHNwZWNpZmllZCBpbiB0aGUgcHJldmlvdXMgY2FsbCB0byB0aGUgPGNvZGU+YmVnaW5GaWxsKCk8L2NvZGU+LFxyXG5cdCAqIDxjb2RlPmJlZ2luR3JhZGllbnRGaWxsKCk8L2NvZGU+LCBvciA8Y29kZT5iZWdpbkJpdG1hcEZpbGwoKTwvY29kZT5cclxuXHQgKiBtZXRob2QuIElmIHRoZSBjdXJyZW50IGRyYXdpbmcgcG9zaXRpb24gZG9lcyBub3QgZXF1YWwgdGhlIHByZXZpb3VzXHJcblx0ICogcG9zaXRpb24gc3BlY2lmaWVkIGluIGEgPGNvZGU+bW92ZVRvKCk8L2NvZGU+IG1ldGhvZCBhbmQgYSBmaWxsIGlzXHJcblx0ICogZGVmaW5lZCwgdGhlIHBhdGggaXMgY2xvc2VkIHdpdGggYSBsaW5lIGFuZCB0aGVuIGZpbGxlZC5cclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBlbmRGaWxsKClcclxuXHR7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIGEgYml0bWFwIHRvIHVzZSBmb3IgdGhlIGxpbmUgc3Ryb2tlIHdoZW4gZHJhd2luZyBsaW5lcy5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBiaXRtYXAgbGluZSBzdHlsZSBpcyB1c2VkIGZvciBzdWJzZXF1ZW50IGNhbGxzIHRvIEdyYXBoaWNzIG1ldGhvZHNcclxuXHQgKiBzdWNoIGFzIHRoZSA8Y29kZT5saW5lVG8oKTwvY29kZT4gbWV0aG9kIG9yIHRoZSA8Y29kZT5kcmF3Q2lyY2xlKCk8L2NvZGU+XHJcblx0ICogbWV0aG9kLiBUaGUgbGluZSBzdHlsZSByZW1haW5zIGluIGVmZmVjdCB1bnRpbCB5b3UgY2FsbCB0aGVcclxuXHQgKiA8Y29kZT5saW5lU3R5bGUoKTwvY29kZT4gb3IgPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4gbWV0aG9kcywgb3JcclxuXHQgKiB0aGUgPGNvZGU+bGluZUJpdG1hcFN0eWxlKCk8L2NvZGU+IG1ldGhvZCBhZ2FpbiB3aXRoIGRpZmZlcmVudCBwYXJhbWV0ZXJzLlxyXG5cdCAqIDwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSBjYW4gY2FsbCB0aGUgPGNvZGU+bGluZUJpdG1hcFN0eWxlKCk8L2NvZGU+IG1ldGhvZCBpbiB0aGUgbWlkZGxlIG9mXHJcblx0ICogZHJhd2luZyBhIHBhdGggdG8gc3BlY2lmeSBkaWZmZXJlbnQgc3R5bGVzIGZvciBkaWZmZXJlbnQgbGluZSBzZWdtZW50c1xyXG5cdCAqIHdpdGhpbiBhIHBhdGguIDwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkNhbGwgdGhlIDxjb2RlPmxpbmVTdHlsZSgpPC9jb2RlPiBtZXRob2QgYmVmb3JlIHlvdSBjYWxsIHRoZVxyXG5cdCAqIDxjb2RlPmxpbmVCaXRtYXBTdHlsZSgpPC9jb2RlPiBtZXRob2QgdG8gZW5hYmxlIGEgc3Ryb2tlLCBvciBlbHNlIHRoZVxyXG5cdCAqIHZhbHVlIG9mIHRoZSBsaW5lIHN0eWxlIGlzIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4uPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Q2FsbHMgdG8gdGhlIDxjb2RlPmNsZWFyKCk8L2NvZGU+IG1ldGhvZCBzZXQgdGhlIGxpbmUgc3R5bGUgYmFjayB0b1xyXG5cdCAqIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4uIDwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBiaXRtYXAgVGhlIGJpdG1hcCB0byB1c2UgZm9yIHRoZSBsaW5lIHN0cm9rZS5cclxuXHQgKiBAcGFyYW0gbWF0cml4IEFuIG9wdGlvbmFsIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCBhcyBkZWZpbmVkIGJ5IHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgZmxhc2guZ2VvbS5NYXRyaXggY2xhc3MuIFRoZSBtYXRyaXggY2FuIGJlIHVzZWQgdG8gc2NhbGUgb3JcclxuXHQgKiAgICAgICAgICAgICAgIG90aGVyd2lzZSBtYW5pcHVsYXRlIHRoZSBiaXRtYXAgYmVmb3JlIGFwcGx5aW5nIGl0IHRvIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgbGluZSBzdHlsZS5cclxuXHQgKiBAcGFyYW0gcmVwZWF0IFdoZXRoZXIgdG8gcmVwZWF0IHRoZSBiaXRtYXAgaW4gYSB0aWxlZCBmYXNoaW9uLlxyXG5cdCAqIEBwYXJhbSBzbW9vdGggV2hldGhlciBzbW9vdGhpbmcgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIGJpdG1hcC5cclxuXHQgKi9cclxuXHRwdWJsaWMgbGluZUJpdG1hcFN0eWxlKGJpdG1hcDpCaXRtYXBEYXRhLCBtYXRyaXg6TWF0cml4ID0gbnVsbCwgcmVwZWF0OmJvb2xlYW4gPSB0cnVlLCBzbW9vdGg6Ym9vbGVhbiA9IGZhbHNlKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgYSBncmFkaWVudCB0byB1c2UgZm9yIHRoZSBzdHJva2Ugd2hlbiBkcmF3aW5nIGxpbmVzLlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIGdyYWRpZW50IGxpbmUgc3R5bGUgaXMgdXNlZCBmb3Igc3Vic2VxdWVudCBjYWxscyB0byBHcmFwaGljc1xyXG5cdCAqIG1ldGhvZHMgc3VjaCBhcyB0aGUgPGNvZGU+bGluZVRvKCk8L2NvZGU+IG1ldGhvZHMgb3IgdGhlXHJcblx0ICogPGNvZGU+ZHJhd0NpcmNsZSgpPC9jb2RlPiBtZXRob2QuIFRoZSBsaW5lIHN0eWxlIHJlbWFpbnMgaW4gZWZmZWN0IHVudGlsXHJcblx0ICogeW91IGNhbGwgdGhlIDxjb2RlPmxpbmVTdHlsZSgpPC9jb2RlPiBvciA8Y29kZT5saW5lQml0bWFwU3R5bGUoKTwvY29kZT5cclxuXHQgKiBtZXRob2RzLCBvciB0aGUgPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4gbWV0aG9kIGFnYWluIHdpdGhcclxuXHQgKiBkaWZmZXJlbnQgcGFyYW1ldGVycy4gPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiBjYWxsIHRoZSA8Y29kZT5saW5lR3JhZGllbnRTdHlsZSgpPC9jb2RlPiBtZXRob2QgaW4gdGhlIG1pZGRsZVxyXG5cdCAqIG9mIGRyYXdpbmcgYSBwYXRoIHRvIHNwZWNpZnkgZGlmZmVyZW50IHN0eWxlcyBmb3IgZGlmZmVyZW50IGxpbmUgc2VnbWVudHNcclxuXHQgKiB3aXRoaW4gYSBwYXRoLiA8L3A+XHJcblx0ICpcclxuXHQgKiA8cD5DYWxsIHRoZSA8Y29kZT5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kIGJlZm9yZSB5b3UgY2FsbCB0aGVcclxuXHQgKiA8Y29kZT5saW5lR3JhZGllbnRTdHlsZSgpPC9jb2RlPiBtZXRob2QgdG8gZW5hYmxlIGEgc3Ryb2tlLCBvciBlbHNlIHRoZVxyXG5cdCAqIHZhbHVlIG9mIHRoZSBsaW5lIHN0eWxlIGlzIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4uPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Q2FsbHMgdG8gdGhlIDxjb2RlPmNsZWFyKCk8L2NvZGU+IG1ldGhvZCBzZXQgdGhlIGxpbmUgc3R5bGUgYmFjayB0b1xyXG5cdCAqIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4uIDwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB0eXBlICAgICAgICAgICAgICAgIEEgdmFsdWUgZnJvbSB0aGUgR3JhZGllbnRUeXBlIGNsYXNzIHRoYXRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZXMgd2hpY2ggZ3JhZGllbnQgdHlwZSB0byB1c2UsIGVpdGhlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdyYWRpZW50VHlwZS5MSU5FQVIgb3IgR3JhZGllbnRUeXBlLlJBRElBTC5cclxuXHQgKiBAcGFyYW0gY29sb3JzICAgICAgICAgICAgICBBbiBhcnJheSBvZiBSR0IgaGV4YWRlY2ltYWwgY29sb3IgdmFsdWVzIHVzZWRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiB0aGUgZ3JhZGllbnQ7IGZvciBleGFtcGxlLCByZWQgaXMgMHhGRjAwMDAsXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgYmx1ZSBpcyAweDAwMDBGRiwgYW5kIHNvIG9uLiBZb3UgY2FuIHNwZWNpZnlcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cCB0byAxNSBjb2xvcnMuIEZvciBlYWNoIGNvbG9yLCBzcGVjaWZ5IGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3JyZXNwb25kaW5nIHZhbHVlIGluIHRoZSBhbHBoYXMgYW5kIHJhdGlvc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMuXHJcblx0ICogQHBhcmFtIGFscGhhcyAgICAgICAgICAgICAgQW4gYXJyYXkgb2YgYWxwaGEgdmFsdWVzIGZvciB0aGUgY29ycmVzcG9uZGluZ1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9ycyBpbiB0aGUgY29sb3JzIGFycmF5OyB2YWxpZCB2YWx1ZXMgYXJlIDBcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byAxLiBJZiB0aGUgdmFsdWUgaXMgbGVzcyB0aGFuIDAsIHRoZSBkZWZhdWx0XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgMC4gSWYgdGhlIHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiAxLCB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IGlzIDEuXHJcblx0ICogQHBhcmFtIHJhdGlvcyAgICAgICAgICAgICAgQW4gYXJyYXkgb2YgY29sb3IgZGlzdHJpYnV0aW9uIHJhdGlvczsgdmFsaWRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgYXJlIDAtMjU1LiBUaGlzIHZhbHVlIGRlZmluZXMgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudGFnZSBvZiB0aGUgd2lkdGggd2hlcmUgdGhlIGNvbG9yIGlzXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FtcGxlZCBhdCAxMDAlLiBUaGUgdmFsdWUgMCByZXByZXNlbnRzIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgcG9zaXRpb24gaW4gdGhlIGdyYWRpZW50IGJveCwgYW5kIDI1NVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcHJlc2VudHMgdGhlIHJpZ2h0IHBvc2l0aW9uIGluIHRoZSBncmFkaWVudFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveC5cclxuXHQgKiBAcGFyYW0gbWF0cml4ICAgICAgICAgICAgICBBIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCBhcyBkZWZpbmVkIGJ5IHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXNoLmdlb20uTWF0cml4IGNsYXNzLiBUaGUgZmxhc2guZ2VvbS5NYXRyaXhcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcyBpbmNsdWRlcyBhXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Y3JlYXRlR3JhZGllbnRCb3goKTwvY29kZT4gbWV0aG9kLCB3aGljaFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHMgeW91IGNvbnZlbmllbnRseSBzZXQgdXAgdGhlIG1hdHJpeCBmb3IgdXNlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2QuXHJcblx0ICogQHBhcmFtIHNwcmVhZE1ldGhvZCAgICAgICAgQSB2YWx1ZSBmcm9tIHRoZSBTcHJlYWRNZXRob2QgY2xhc3MgdGhhdFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmllcyB3aGljaCBzcHJlYWQgbWV0aG9kIHRvIHVzZTpcclxuXHQgKiBAcGFyYW0gaW50ZXJwb2xhdGlvbk1ldGhvZCBBIHZhbHVlIGZyb20gdGhlIEludGVycG9sYXRpb25NZXRob2QgY2xhc3MgdGhhdFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmllcyB3aGljaCB2YWx1ZSB0byB1c2UuIEZvciBleGFtcGxlLFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNpZGVyIGEgc2ltcGxlIGxpbmVhciBncmFkaWVudCBiZXR3ZWVuIHR3b1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9ycyh3aXRoIHRoZSA8Y29kZT5zcHJlYWRNZXRob2Q8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyIHNldCB0b1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlNwcmVhZE1ldGhvZC5SRUZMRUNUPC9jb2RlPikuIFRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZlcmVudCBpbnRlcnBvbGF0aW9uIG1ldGhvZHMgYWZmZWN0IHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVhcmFuY2UgYXMgZm9sbG93czpcclxuXHQgKiBAcGFyYW0gZm9jYWxQb2ludFJhdGlvICAgICBBIG51bWJlciB0aGF0IGNvbnRyb2xzIHRoZSBsb2NhdGlvbiBvZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2NhbCBwb2ludCBvZiB0aGUgZ3JhZGllbnQuIFRoZSB2YWx1ZSAwIG1lYW5zXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGZvY2FsIHBvaW50IGlzIGluIHRoZSBjZW50ZXIuIFRoZSB2YWx1ZSAxXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbnMgdGhlIGZvY2FsIHBvaW50IGlzIGF0IG9uZSBib3JkZXIgb2YgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQgY2lyY2xlLiBUaGUgdmFsdWUgLTEgbWVhbnMgdGhhdCB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2NhbCBwb2ludCBpcyBhdCB0aGUgb3RoZXIgYm9yZGVyIG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRpZW50IGNpcmNsZS4gVmFsdWVzIGxlc3MgdGhhbiAtMSBvciBncmVhdGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhbiAxIGFyZSByb3VuZGVkIHRvIC0xIG9yIDEuIFRoZSBmb2xsb3dpbmdcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSBzaG93cyBhIGdyYWRpZW50IHdpdGggYVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmZvY2FsUG9pbnRSYXRpbzwvY29kZT4gb2YgLTAuNzU6XHJcblx0ICovXHJcblx0cHVibGljIGxpbmVHcmFkaWVudFN0eWxlKHR5cGU6R3JhZGllbnRUeXBlLCBjb2xvcnM6QXJyYXk8bnVtYmVyIC8qaW50Ki8+LCBhbHBoYXM6QXJyYXk8bnVtYmVyPiwgcmF0aW9zOkFycmF5PG51bWJlcj4sIG1hdHJpeDpNYXRyaXggPSBudWxsLCBzcHJlYWRNZXRob2Q6U3ByZWFkTWV0aG9kID0gbnVsbCwgaW50ZXJwb2xhdGlvbk1ldGhvZDpJbnRlcnBvbGF0aW9uTWV0aG9kID0gbnVsbCwgZm9jYWxQb2ludFJhdGlvOm51bWJlciA9IDApXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZmllcyBhIHNoYWRlciB0byB1c2UgZm9yIHRoZSBsaW5lIHN0cm9rZSB3aGVuIGRyYXdpbmcgbGluZXMuXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgc2hhZGVyIGxpbmUgc3R5bGUgaXMgdXNlZCBmb3Igc3Vic2VxdWVudCBjYWxscyB0byBHcmFwaGljcyBtZXRob2RzXHJcblx0ICogc3VjaCBhcyB0aGUgPGNvZGU+bGluZVRvKCk8L2NvZGU+IG1ldGhvZCBvciB0aGUgPGNvZGU+ZHJhd0NpcmNsZSgpPC9jb2RlPlxyXG5cdCAqIG1ldGhvZC4gVGhlIGxpbmUgc3R5bGUgcmVtYWlucyBpbiBlZmZlY3QgdW50aWwgeW91IGNhbGwgdGhlXHJcblx0ICogPGNvZGU+bGluZVN0eWxlKCk8L2NvZGU+IG9yIDxjb2RlPmxpbmVHcmFkaWVudFN0eWxlKCk8L2NvZGU+IG1ldGhvZHMsIG9yXHJcblx0ICogdGhlIDxjb2RlPmxpbmVCaXRtYXBTdHlsZSgpPC9jb2RlPiBtZXRob2QgYWdhaW4gd2l0aCBkaWZmZXJlbnQgcGFyYW1ldGVycy5cclxuXHQgKiA8L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgY2FuIGNhbGwgdGhlIDxjb2RlPmxpbmVTaGFkZXJTdHlsZSgpPC9jb2RlPiBtZXRob2QgaW4gdGhlIG1pZGRsZSBvZlxyXG5cdCAqIGRyYXdpbmcgYSBwYXRoIHRvIHNwZWNpZnkgZGlmZmVyZW50IHN0eWxlcyBmb3IgZGlmZmVyZW50IGxpbmUgc2VnbWVudHNcclxuXHQgKiB3aXRoaW4gYSBwYXRoLiA8L3A+XHJcblx0ICpcclxuXHQgKiA8cD5DYWxsIHRoZSA8Y29kZT5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kIGJlZm9yZSB5b3UgY2FsbCB0aGVcclxuXHQgKiA8Y29kZT5saW5lU2hhZGVyU3R5bGUoKTwvY29kZT4gbWV0aG9kIHRvIGVuYWJsZSBhIHN0cm9rZSwgb3IgZWxzZSB0aGVcclxuXHQgKiB2YWx1ZSBvZiB0aGUgbGluZSBzdHlsZSBpcyA8Y29kZT51bmRlZmluZWQ8L2NvZGU+LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkNhbGxzIHRvIHRoZSA8Y29kZT5jbGVhcigpPC9jb2RlPiBtZXRob2Qgc2V0IHRoZSBsaW5lIHN0eWxlIGJhY2sgdG9cclxuXHQgKiA8Y29kZT51bmRlZmluZWQ8L2NvZGU+LiA8L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc2hhZGVyIFRoZSBzaGFkZXIgdG8gdXNlIGZvciB0aGUgbGluZSBzdHJva2UuXHJcblx0ICogQHBhcmFtIG1hdHJpeCBBbiBvcHRpb25hbCB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggYXMgZGVmaW5lZCBieSB0aGVcclxuXHQgKiAgICAgICAgICAgICAgIGZsYXNoLmdlb20uTWF0cml4IGNsYXNzLiBUaGUgbWF0cml4IGNhbiBiZSB1c2VkIHRvIHNjYWxlIG9yXHJcblx0ICogICAgICAgICAgICAgICBvdGhlcndpc2UgbWFuaXB1bGF0ZSB0aGUgYml0bWFwIGJlZm9yZSBhcHBseWluZyBpdCB0byB0aGVcclxuXHQgKiAgICAgICAgICAgICAgIGxpbmUgc3R5bGUuXHJcblx0ICovXHJcbi8vXHRcdHB1YmxpYyBsaW5lU2hhZGVyU3R5bGUoc2hhZGVyOlNoYWRlciwgbWF0cml4Ok1hdHJpeCA9IG51bGwpXHJcbi8vXHRcdHtcclxuLy9cclxuLy9cdFx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgYSBsaW5lIHN0eWxlIHVzZWQgZm9yIHN1YnNlcXVlbnQgY2FsbHMgdG8gR3JhcGhpY3MgbWV0aG9kcyBzdWNoXHJcblx0ICogYXMgdGhlIDxjb2RlPmxpbmVUbygpPC9jb2RlPiBtZXRob2Qgb3IgdGhlIDxjb2RlPmRyYXdDaXJjbGUoKTwvY29kZT5cclxuXHQgKiBtZXRob2QuIFRoZSBsaW5lIHN0eWxlIHJlbWFpbnMgaW4gZWZmZWN0IHVudGlsIHlvdSBjYWxsIHRoZVxyXG5cdCAqIDxjb2RlPmxpbmVHcmFkaWVudFN0eWxlKCk8L2NvZGU+IG1ldGhvZCwgdGhlXHJcblx0ICogPGNvZGU+bGluZUJpdG1hcFN0eWxlKCk8L2NvZGU+IG1ldGhvZCwgb3IgdGhlIDxjb2RlPmxpbmVTdHlsZSgpPC9jb2RlPlxyXG5cdCAqIG1ldGhvZCB3aXRoIGRpZmZlcmVudCBwYXJhbWV0ZXJzLlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiBjYWxsIHRoZSA8Y29kZT5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kIGluIHRoZSBtaWRkbGUgb2ZcclxuXHQgKiBkcmF3aW5nIGEgcGF0aCB0byBzcGVjaWZ5IGRpZmZlcmVudCBzdHlsZXMgZm9yIGRpZmZlcmVudCBsaW5lIHNlZ21lbnRzXHJcblx0ICogd2l0aGluIHRoZSBwYXRoLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6IDwvYj5DYWxscyB0byB0aGUgPGNvZGU+Y2xlYXIoKTwvY29kZT4gbWV0aG9kIHNldCB0aGUgbGluZVxyXG5cdCAqIHN0eWxlIGJhY2sgdG8gPGNvZGU+dW5kZWZpbmVkPC9jb2RlPi48L3A+XHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOiA8L2I+Rmxhc2ggTGl0ZSA0IHN1cHBvcnRzIG9ubHkgdGhlIGZpcnN0IHRocmVlIHBhcmFtZXRlcnNcclxuXHQgKiAoPGNvZGU+dGhpY2tuZXNzPC9jb2RlPiwgPGNvZGU+Y29sb3I8L2NvZGU+LCBhbmQgPGNvZGU+YWxwaGE8L2NvZGU+KS48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdGhpY2tuZXNzICAgIEFuIGludGVnZXIgdGhhdCBpbmRpY2F0ZXMgdGhlIHRoaWNrbmVzcyBvZiB0aGUgbGluZSBpblxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOyB2YWxpZCB2YWx1ZXMgYXJlIDAtMjU1LiBJZiBhIG51bWJlciBpcyBub3RcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmllZCwgb3IgaWYgdGhlIHBhcmFtZXRlciBpcyB1bmRlZmluZWQsIGEgbGluZSBpc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgbm90IGRyYXduLiBJZiBhIHZhbHVlIG9mIGxlc3MgdGhhbiAwIGlzIHBhc3NlZCwgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IGlzIDAuIFRoZSB2YWx1ZSAwIGluZGljYXRlcyBoYWlybGluZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgdGhpY2tuZXNzOyB0aGUgbWF4aW11bSB0aGlja25lc3MgaXMgMjU1LiBJZiBhIHZhbHVlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBncmVhdGVyIHRoYW4gMjU1IGlzIHBhc3NlZCwgdGhlIGRlZmF1bHQgaXMgMjU1LlxyXG5cdCAqIEBwYXJhbSBjb2xvciAgICAgICAgQSBoZXhhZGVjaW1hbCBjb2xvciB2YWx1ZSBvZiB0aGUgbGluZTsgZm9yIGV4YW1wbGUsXHJcblx0ICogICAgICAgICAgICAgICAgICAgICByZWQgaXMgMHhGRjAwMDAsIGJsdWUgaXMgMHgwMDAwRkYsIGFuZCBzbyBvbi4gSWYgYVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgdmFsdWUgaXMgbm90IGluZGljYXRlZCwgdGhlIGRlZmF1bHQgaXMgMHgwMDAwMDBcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgKGJsYWNrKS4gT3B0aW9uYWwuXHJcblx0ICogQHBhcmFtIGFscGhhICAgICAgICBBIG51bWJlciB0aGF0IGluZGljYXRlcyB0aGUgYWxwaGEgdmFsdWUgb2YgdGhlIGNvbG9yXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBvZiB0aGUgbGluZTsgdmFsaWQgdmFsdWVzIGFyZSAwIHRvIDEuIElmIGEgdmFsdWUgaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIG5vdCBpbmRpY2F0ZWQsIHRoZSBkZWZhdWx0IGlzIDEoc29saWQpLiBJZiB0aGUgdmFsdWVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGlzIGxlc3MgdGhhbiAwLCB0aGUgZGVmYXVsdCBpcyAwLiBJZiB0aGUgdmFsdWUgaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGdyZWF0ZXIgdGhhbiAxLCB0aGUgZGVmYXVsdCBpcyAxLlxyXG5cdCAqIEBwYXJhbSBwaXhlbEhpbnRpbmcoTm90IHN1cHBvcnRlZCBpbiBGbGFzaCBMaXRlIDQpIEEgQm9vbGVhbiB2YWx1ZSB0aGF0XHJcblx0ICogICAgICAgICAgICAgICAgICAgICBzcGVjaWZpZXMgd2hldGhlciB0byBoaW50IHN0cm9rZXMgdG8gZnVsbCBwaXhlbHMuIFRoaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGFmZmVjdHMgYm90aCB0aGUgcG9zaXRpb24gb2YgYW5jaG9ycyBvZiBhIGN1cnZlIGFuZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgdGhlIGxpbmUgc3Ryb2tlIHNpemUgaXRzZWxmLiBXaXRoXHJcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5waXhlbEhpbnRpbmc8L2NvZGU+IHNldCB0byA8Y29kZT50cnVlPC9jb2RlPixcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGxpbmUgd2lkdGhzIGFyZSBhZGp1c3RlZCB0byBmdWxsIHBpeGVsIHdpZHRocy4gV2l0aFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cGl4ZWxIaW50aW5nPC9jb2RlPiBzZXQgdG8gPGNvZGU+ZmFsc2U8L2NvZGU+LFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgZGlzam9pbnRzIGNhbiBhcHBlYXIgZm9yIGN1cnZlcyBhbmQgc3RyYWlnaHQgbGluZXMuXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBGb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZyBpbGx1c3RyYXRpb25zIHNob3cgaG93XHJcblx0ICogICAgICAgICAgICAgICAgICAgICBGbGFzaCBQbGF5ZXIgb3IgQWRvYmUgQUlSIHJlbmRlcnMgdHdvIHJvdW5kZWRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHJlY3RhbmdsZXMgdGhhdCBhcmUgaWRlbnRpY2FsLCBleGNlcHQgdGhhdCB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnBpeGVsSGludGluZzwvY29kZT4gcGFyYW1ldGVyIHVzZWQgaW4gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kIGlzIHNldCBkaWZmZXJlbnRseVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAodGhlIGltYWdlcyBhcmUgc2NhbGVkIGJ5IDIwMCUsIHRvIGVtcGhhc2l6ZSB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGRpZmZlcmVuY2UpOlxyXG5cdCAqXHJcblx0ICogICAgICAgICAgICAgICAgICAgICA8cD5JZiBhIHZhbHVlIGlzIG5vdCBzdXBwbGllZCwgdGhlIGxpbmUgZG9lcyBub3QgdXNlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBwaXhlbCBoaW50aW5nLjwvcD5cclxuXHQgKiBAcGFyYW0gc2NhbGVNb2RlICAgKE5vdCBzdXBwb3J0ZWQgaW4gRmxhc2ggTGl0ZSA0KSBBIHZhbHVlIGZyb20gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBMaW5lU2NhbGVNb2RlIGNsYXNzIHRoYXQgc3BlY2lmaWVzIHdoaWNoIHNjYWxlIG1vZGUgdG9cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHVzZTpcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDx1bD5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGxpPiA8Y29kZT5MaW5lU2NhbGVNb2RlLk5PUk1BTDwvY29kZT4gLSBBbHdheXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHNjYWxlIHRoZSBsaW5lIHRoaWNrbmVzcyB3aGVuIHRoZSBvYmplY3QgaXMgc2NhbGVkXHJcblx0ICogICAgICAgICAgICAgICAgICAgICh0aGUgZGVmYXVsdCkuIDwvbGk+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxsaT4gPGNvZGU+TGluZVNjYWxlTW9kZS5OT05FPC9jb2RlPiAtIE5ldmVyIHNjYWxlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICB0aGUgbGluZSB0aGlja25lc3MuIDwvbGk+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxsaT4gPGNvZGU+TGluZVNjYWxlTW9kZS5WRVJUSUNBTDwvY29kZT4gLSBEbyBub3RcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHNjYWxlIHRoZSBsaW5lIHRoaWNrbmVzcyBpZiB0aGUgb2JqZWN0IGlzIHNjYWxlZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxseSA8aT5vbmx5PC9pPi4gRm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgZm9sbG93aW5nIGNpcmNsZXMsIGRyYXduIHdpdGggYSBvbmUtcGl4ZWwgbGluZSwgYW5kXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBlYWNoIHdpdGggdGhlIDxjb2RlPnNjYWxlTW9kZTwvY29kZT4gcGFyYW1ldGVyIHNldCB0b1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+TGluZVNjYWxlTW9kZS5WRVJUSUNBTDwvY29kZT4uIFRoZSBjaXJjbGUgb24gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBsZWZ0IGlzIHNjYWxlZCB2ZXJ0aWNhbGx5IG9ubHksIGFuZCB0aGUgY2lyY2xlIG9uIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgcmlnaHQgaXMgc2NhbGVkIGJvdGggdmVydGljYWxseSBhbmQgaG9yaXpvbnRhbGx5OlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGxpPiA8Y29kZT5MaW5lU2NhbGVNb2RlLkhPUklaT05UQUw8L2NvZGU+IC0gRG8gbm90XHJcblx0ICogICAgICAgICAgICAgICAgICAgICBzY2FsZSB0aGUgbGluZSB0aGlja25lc3MgaWYgdGhlIG9iamVjdCBpcyBzY2FsZWRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxseSA8aT5vbmx5PC9pPi4gRm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgZm9sbG93aW5nIGNpcmNsZXMsIGRyYXduIHdpdGggYSBvbmUtcGl4ZWwgbGluZSwgYW5kXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBlYWNoIHdpdGggdGhlIDxjb2RlPnNjYWxlTW9kZTwvY29kZT4gcGFyYW1ldGVyIHNldCB0b1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+TGluZVNjYWxlTW9kZS5IT1JJWk9OVEFMPC9jb2RlPi4gVGhlIGNpcmNsZSBvblxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgdGhlIGxlZnQgaXMgc2NhbGVkIGhvcml6b250YWxseSBvbmx5LCBhbmQgdGhlIGNpcmNsZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgb24gdGhlIHJpZ2h0IGlzIHNjYWxlZCBib3RoIHZlcnRpY2FsbHkgYW5kXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsbHk6ICAgPC9saT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcblx0ICogQHBhcmFtIGNhcHMgICAgICAgIChOb3Qgc3VwcG9ydGVkIGluIEZsYXNoIExpdGUgNCkgQSB2YWx1ZSBmcm9tIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgQ2Fwc1N0eWxlIGNsYXNzIHRoYXQgc3BlY2lmaWVzIHRoZSB0eXBlIG9mIGNhcHMgYXQgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBlbmQgb2YgbGluZXMuIFZhbGlkIHZhbHVlcyBhcmU6XHJcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5DYXBzU3R5bGUuTk9ORTwvY29kZT4sXHJcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5DYXBzU3R5bGUuUk9VTkQ8L2NvZGU+LCBhbmRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkNhcHNTdHlsZS5TUVVBUkU8L2NvZGU+LiBJZiBhIHZhbHVlIGlzIG5vdFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgaW5kaWNhdGVkLCBGbGFzaCB1c2VzIHJvdW5kIGNhcHMuXHJcblx0ICpcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxwPkZvciBleGFtcGxlLCB0aGUgZm9sbG93aW5nIGlsbHVzdHJhdGlvbnMgc2hvdyB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGRpZmZlcmVudCA8Y29kZT5jYXBzU3R5bGU8L2NvZGU+IHNldHRpbmdzLiBGb3IgZWFjaFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgc2V0dGluZywgdGhlIGlsbHVzdHJhdGlvbiBzaG93cyBhIGJsdWUgbGluZSB3aXRoIGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHRoaWNrbmVzcyBvZiAzMChmb3Igd2hpY2ggdGhlIDxjb2RlPmNhcHNTdHlsZTwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGFwcGxpZXMpLCBhbmQgYSBzdXBlcmltcG9zZWQgYmxhY2sgbGluZSB3aXRoIGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHRoaWNrbmVzcyBvZiAxKGZvciB3aGljaCBubyA8Y29kZT5jYXBzU3R5bGU8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICBhcHBsaWVzKTogPC9wPlxyXG5cdCAqIEBwYXJhbSBqb2ludHMgICAgICAoTm90IHN1cHBvcnRlZCBpbiBGbGFzaCBMaXRlIDQpIEEgdmFsdWUgZnJvbSB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIEpvaW50U3R5bGUgY2xhc3MgdGhhdCBzcGVjaWZpZXMgdGhlIHR5cGUgb2Ygam9pbnRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGFwcGVhcmFuY2UgdXNlZCBhdCBhbmdsZXMuIFZhbGlkIHZhbHVlcyBhcmU6XHJcblx0ICogICAgICAgICAgICAgICAgICAgICA8Y29kZT5Kb2ludFN0eWxlLkJFVkVMPC9jb2RlPixcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkpvaW50U3R5bGUuTUlURVI8L2NvZGU+LCBhbmRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkpvaW50U3R5bGUuUk9VTkQ8L2NvZGU+LiBJZiBhIHZhbHVlIGlzIG5vdFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgaW5kaWNhdGVkLCBGbGFzaCB1c2VzIHJvdW5kIGpvaW50cy5cclxuXHQgKlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPHA+Rm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgaWxsdXN0cmF0aW9ucyBzaG93IHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgZGlmZmVyZW50IDxjb2RlPmpvaW50czwvY29kZT4gc2V0dGluZ3MuIEZvciBlYWNoXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLCB0aGUgaWxsdXN0cmF0aW9uIHNob3dzIGFuIGFuZ2xlZCBibHVlIGxpbmVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHdpdGggYSB0aGlja25lc3Mgb2YgMzAoZm9yIHdoaWNoIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+am9pbnRTdHlsZTwvY29kZT4gYXBwbGllcyksIGFuZCBhIHN1cGVyaW1wb3NlZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgYW5nbGVkIGJsYWNrIGxpbmUgd2l0aCBhIHRoaWNrbmVzcyBvZiAxKGZvciB3aGljaCBub1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+am9pbnRTdHlsZTwvY29kZT4gYXBwbGllcyk6IDwvcD5cclxuXHQgKlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPHA+PGI+Tm90ZTo8L2I+IEZvciA8Y29kZT5qb2ludHM8L2NvZGU+IHNldCB0b1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Sm9pbnRTdHlsZS5NSVRFUjwvY29kZT4sIHlvdSBjYW4gdXNlIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+bWl0ZXJMaW1pdDwvY29kZT4gcGFyYW1ldGVyIHRvIGxpbWl0IHRoZSBsZW5ndGhcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIG9mIHRoZSBtaXRlci48L3A+XHJcblx0ICogQHBhcmFtIG1pdGVyTGltaXQgIChOb3Qgc3VwcG9ydGVkIGluIEZsYXNoIExpdGUgNCkgQSBudW1iZXIgdGhhdFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgaW5kaWNhdGVzIHRoZSBsaW1pdCBhdCB3aGljaCBhIG1pdGVyIGlzIGN1dCBvZmYuIFZhbGlkXHJcblx0ICogICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgcmFuZ2UgZnJvbSAxIHRvIDI1NShhbmQgdmFsdWVzIG91dHNpZGUgdGhhdFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgcmFuZ2UgYXJlIHJvdW5kZWQgdG8gMSBvciAyNTUpLiBUaGlzIHZhbHVlIGlzIG9ubHlcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHVzZWQgaWYgdGhlIDxjb2RlPmpvaW50U3R5bGU8L2NvZGU+IGlzIHNldCB0b1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+XCJtaXRlclwiPC9jb2RlPi4gVGhlIDxjb2RlPm1pdGVyTGltaXQ8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICB2YWx1ZSByZXByZXNlbnRzIHRoZSBsZW5ndGggdGhhdCBhIG1pdGVyIGNhbiBleHRlbmRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGJleW9uZCB0aGUgcG9pbnQgYXQgd2hpY2ggdGhlIGxpbmVzIG1lZXQgdG8gZm9ybSBhXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBqb2ludC4gVGhlIHZhbHVlIGV4cHJlc3NlcyBhIGZhY3RvciBvZiB0aGUgbGluZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dGhpY2tuZXNzPC9jb2RlPi4gRm9yIGV4YW1wbGUsIHdpdGggYVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+bWl0ZXJMaW1pdDwvY29kZT4gZmFjdG9yIG9mIDIuNSBhbmQgYVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgPGNvZGU+dGhpY2tuZXNzPC9jb2RlPiBvZiAxMCBwaXhlbHMsIHRoZSBtaXRlciBpcyBjdXRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIG9mZiBhdCAyNSBwaXhlbHMuXHJcblx0ICpcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxwPkZvciBleGFtcGxlLCBjb25zaWRlciB0aGUgZm9sbG93aW5nIGFuZ2xlZCBsaW5lcyxcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGVhY2ggZHJhd24gd2l0aCBhIDxjb2RlPnRoaWNrbmVzczwvY29kZT4gb2YgMjAsIGJ1dFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgd2l0aCA8Y29kZT5taXRlckxpbWl0PC9jb2RlPiBzZXQgdG8gMSwgMiwgYW5kIDQuXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBTdXBlcmltcG9zZWQgYXJlIGJsYWNrIHJlZmVyZW5jZSBsaW5lcyBzaG93aW5nIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgbWVldGluZyBwb2ludHMgb2YgdGhlIGpvaW50czo8L3A+XHJcblx0ICpcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIDxwPk5vdGljZSB0aGF0IGEgZ2l2ZW4gPGNvZGU+bWl0ZXJMaW1pdDwvY29kZT4gdmFsdWVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIGhhcyBhIHNwZWNpZmljIG1heGltdW0gYW5nbGUgZm9yIHdoaWNoIHRoZSBtaXRlciBpc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgY3V0IG9mZi4gVGhlIGZvbGxvd2luZyB0YWJsZSBsaXN0cyBzb21lIGV4YW1wbGVzOjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgbGluZVN0eWxlKHRoaWNrbmVzczpudW1iZXIgPSAwLCBjb2xvcjpudW1iZXIgLyppbnQqLyA9IDAsIGFscGhhOm51bWJlciA9IDEsIHBpeGVsSGludGluZzpib29sZWFuID0gZmFsc2UsIHNjYWxlTW9kZTpMaW5lU2NhbGVNb2RlID0gbnVsbCwgY2FwczpDYXBzU3R5bGUgPSBudWxsLCBqb2ludHM6Sm9pbnRTdHlsZSA9IG51bGwsIG1pdGVyTGltaXQ6bnVtYmVyID0gMylcclxuXHR7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRHJhd3MgYSBsaW5lIHVzaW5nIHRoZSBjdXJyZW50IGxpbmUgc3R5bGUgZnJvbSB0aGUgY3VycmVudCBkcmF3aW5nXHJcblx0ICogcG9zaXRpb24gdG8oPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+KTsgdGhlIGN1cnJlbnQgZHJhd2luZyBwb3NpdGlvblxyXG5cdCAqIGlzIHRoZW4gc2V0IHRvKDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPikuIElmIHRoZSBkaXNwbGF5IG9iamVjdCBpblxyXG5cdCAqIHdoaWNoIHlvdSBhcmUgZHJhd2luZyBjb250YWlucyBjb250ZW50IHRoYXQgd2FzIGNyZWF0ZWQgd2l0aCB0aGUgRmxhc2hcclxuXHQgKiBkcmF3aW5nIHRvb2xzLCBjYWxscyB0byB0aGUgPGNvZGU+bGluZVRvKCk8L2NvZGU+IG1ldGhvZCBhcmUgZHJhd25cclxuXHQgKiB1bmRlcm5lYXRoIHRoZSBjb250ZW50LiBJZiB5b3UgY2FsbCA8Y29kZT5saW5lVG8oKTwvY29kZT4gYmVmb3JlIGFueSBjYWxsc1xyXG5cdCAqIHRvIHRoZSA8Y29kZT5tb3ZlVG8oKTwvY29kZT4gbWV0aG9kLCB0aGUgZGVmYXVsdCBwb3NpdGlvbiBmb3IgdGhlIGN1cnJlbnRcclxuXHQgKiBkcmF3aW5nIGlzKDxpPjAsIDA8L2k+KS4gSWYgYW55IG9mIHRoZSBwYXJhbWV0ZXJzIGFyZSBtaXNzaW5nLCB0aGlzXHJcblx0ICogbWV0aG9kIGZhaWxzIGFuZCB0aGUgY3VycmVudCBkcmF3aW5nIHBvc2l0aW9uIGlzIG5vdCBjaGFuZ2VkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHggQSBudW1iZXIgdGhhdCBpbmRpY2F0ZXMgdGhlIGhvcml6b250YWwgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlXHJcblx0ICogICAgICAgICAgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3QoaW4gcGl4ZWxzKS5cclxuXHQgKiBAcGFyYW0geSBBIG51bWJlciB0aGF0IGluZGljYXRlcyB0aGUgdmVydGljYWwgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlXHJcblx0ICogICAgICAgICAgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3QoaW4gcGl4ZWxzKS5cclxuXHQgKi9cclxuXHRwdWJsaWMgbGluZVRvKHg6bnVtYmVyLCB5Om51bWJlcilcclxuXHR7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW92ZXMgdGhlIGN1cnJlbnQgZHJhd2luZyBwb3NpdGlvbiB0byg8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4pLiBJZlxyXG5cdCAqIGFueSBvZiB0aGUgcGFyYW1ldGVycyBhcmUgbWlzc2luZywgdGhpcyBtZXRob2QgZmFpbHMgYW5kIHRoZSBjdXJyZW50XHJcblx0ICogZHJhd2luZyBwb3NpdGlvbiBpcyBub3QgY2hhbmdlZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB4IEEgbnVtYmVyIHRoYXQgaW5kaWNhdGVzIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZVxyXG5cdCAqICAgICAgICAgIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50IGRpc3BsYXkgb2JqZWN0KGluIHBpeGVscykuXHJcblx0ICogQHBhcmFtIHkgQSBudW1iZXIgdGhhdCBpbmRpY2F0ZXMgdGhlIHZlcnRpY2FsIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZVxyXG5cdCAqICAgICAgICAgIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgcGFyZW50IGRpc3BsYXkgb2JqZWN0KGluIHBpeGVscykuXHJcblx0ICovXHJcblx0cHVibGljIG1vdmVUbyh4Om51bWJlciwgeTpudW1iZXIpXHJcblx0e1xyXG5cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IEdyYXBoaWNzOyJdfQ==