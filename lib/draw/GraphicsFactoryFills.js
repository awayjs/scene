"use strict";
var GraphicsPathCommand_1 = require("../draw/GraphicsPathCommand");
var DefaultMaterialManager_1 = require("../managers/DefaultMaterialManager");
var Point_1 = require("@awayjs/core/lib/geom/Point");
var AttributesView_1 = require("@awayjs/core/lib/attributes/AttributesView");
var Float3Attributes_1 = require("@awayjs/core/lib/attributes/Float3Attributes");
var Float2Attributes_1 = require("@awayjs/core/lib/attributes/Float2Attributes");
var MathConsts_1 = require("@awayjs/core/lib/geom/MathConsts");
var GraphicsFactoryHelper_1 = require("../draw/GraphicsFactoryHelper");
var TriangleElements_1 = require("../graphics/TriangleElements");
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
var GraphicsFactoryFills = (function () {
    function GraphicsFactoryFills() {
    }
    GraphicsFactoryFills.draw_pathes = function (targetGraphic) {
        var len = targetGraphic.queued_fill_pathes.length;
        var cp = 0;
        for (cp = 0; cp < len; cp++) {
            var one_path = targetGraphic.queued_fill_pathes[cp];
            //one_path.finalizeContour();
            var contour_commands = one_path.commands;
            var contour_data = one_path.data;
            var commands;
            var data;
            var i = 0;
            var k = 0;
            var vert_cnt = 0;
            var data_cnt = 0;
            var draw_direction = 0;
            var contours_vertices = [[]];
            var final_vert_list = [];
            var final_vert_cnt = 0;
            var lastPoint = new Point_1.Point();
            var last_dir_vec = new Point_1.Point();
            var end_point = new Point_1.Point();
            for (k = 0; k < contour_commands.length; k++) {
                contours_vertices.push([]);
                vert_cnt = 0;
                data_cnt = 0;
                commands = contour_commands[k];
                data = contour_data[k];
                draw_direction = 0;
                var new_dir = 0;
                var new_dir_1 = 0;
                var new_dir_2 = 0;
                var dir_delta = 0;
                var last_direction = 0;
                var tmp_dir_point = new Point_1.Point();
                if ((data[0] != data[data.length - 2]) || (data[1] != data[data.length - 1])) {
                    data[data.length] == data[0];
                    data[data.length] == data[1];
                }
                lastPoint.x = data[0];
                lastPoint.y = data[1];
                if (commands[1] == GraphicsPathCommand_1.GraphicsPathCommand.LINE_TO) {
                    last_dir_vec.x = data[2] - lastPoint.x;
                    last_dir_vec.y = data[3] - lastPoint.y;
                }
                else if (commands[1] == GraphicsPathCommand_1.GraphicsPathCommand.CURVE_TO) {
                    last_dir_vec.x = data[4] - lastPoint.x;
                    last_dir_vec.y = data[5] - lastPoint.y;
                }
                data_cnt = 2;
                last_dir_vec.normalize();
                last_direction = Math.atan2(last_dir_vec.y, last_dir_vec.x) * MathConsts_1.MathConsts.RADIANS_TO_DEGREES;
                for (i = 1; i < commands.length; i++) {
                    end_point = new Point_1.Point(data[data_cnt++], data[data_cnt++]);
                    if (commands[i] == GraphicsPathCommand_1.GraphicsPathCommand.MOVE_TO) {
                        console.log("ERROR ! ONLY THE FIRST COMMAND FOR A CONTOUR IS ALLOWED TO BE A 'MOVE_TO' COMMAND");
                    }
                    else if (commands[i] == GraphicsPathCommand_1.GraphicsPathCommand.CURVE_TO) {
                        end_point = new Point_1.Point(data[data_cnt++], data[data_cnt++]);
                    }
                    //get the directional vector and the direction for this segment
                    tmp_dir_point.x = end_point.x - lastPoint.x;
                    tmp_dir_point.y = end_point.y - lastPoint.y;
                    tmp_dir_point.normalize();
                    new_dir = Math.atan2(tmp_dir_point.y, tmp_dir_point.x) * MathConsts_1.MathConsts.RADIANS_TO_DEGREES;
                    // get the difference in angle to the last segment
                    dir_delta = new_dir - last_direction;
                    if (dir_delta > 180) {
                        dir_delta -= 360;
                    }
                    if (dir_delta < -180) {
                        dir_delta += 360;
                    }
                    draw_direction += dir_delta;
                    last_direction = new_dir;
                    lastPoint.x = end_point.x;
                    lastPoint.y = end_point.y;
                }
                lastPoint.x = data[0];
                lastPoint.y = data[1];
                data_cnt = 2;
                contours_vertices[contours_vertices.length - 1][vert_cnt++] = lastPoint.x;
                contours_vertices[contours_vertices.length - 1][vert_cnt++] = lastPoint.y;
                //console.log("Draw directions complete: "+draw_direction);
                for (i = 1; i < commands.length; i++) {
                    switch (commands[i]) {
                        case GraphicsPathCommand_1.GraphicsPathCommand.MOVE_TO:
                            console.log("ERROR ! ONLY THE FIRST COMMAND FOR A CONTOUR IS ALLOWED TO BE A 'MOVE_TO' COMMAND");
                            break;
                        case GraphicsPathCommand_1.GraphicsPathCommand.LINE_TO:
                            lastPoint.x = data[data_cnt++];
                            lastPoint.y = data[data_cnt++];
                            contours_vertices[contours_vertices.length - 1][vert_cnt++] = lastPoint.x;
                            contours_vertices[contours_vertices.length - 1][vert_cnt++] = lastPoint.y;
                            break;
                        case GraphicsPathCommand_1.GraphicsPathCommand.CURVE_TO:
                            var control_x = data[data_cnt++];
                            var control_y = data[data_cnt++];
                            var end_x = data[data_cnt++];
                            var end_y = data[data_cnt++];
                            tmp_dir_point.x = control_x - lastPoint.x;
                            tmp_dir_point.y = control_y - lastPoint.y;
                            tmp_dir_point.normalize();
                            new_dir_1 = Math.atan2(tmp_dir_point.y, tmp_dir_point.x) * MathConsts_1.MathConsts.RADIANS_TO_DEGREES;
                            tmp_dir_point.x = end_x - lastPoint.x;
                            tmp_dir_point.y = end_y - lastPoint.y;
                            tmp_dir_point.normalize();
                            new_dir_2 = Math.atan2(tmp_dir_point.y, tmp_dir_point.x) * MathConsts_1.MathConsts.RADIANS_TO_DEGREES;
                            // get the difference in angle to the last segment
                            var curve_direction = new_dir_2 - new_dir_1;
                            if (curve_direction > 180) {
                                curve_direction -= 360;
                            }
                            if (curve_direction < -180) {
                                curve_direction += 360;
                            }
                            if ((curve_direction == 0) && (curve_direction == 180) && (curve_direction == -180)) {
                                lastPoint.x = end_x;
                                lastPoint.y = end_y;
                                contours_vertices[contours_vertices.length - 1][vert_cnt++] = lastPoint.x;
                                contours_vertices[contours_vertices.length - 1][vert_cnt++] = lastPoint.y;
                                break;
                            }
                            var curve_attr_1 = -1;
                            if (draw_direction < 0) {
                                if (curve_direction > 0) {
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
                                if (curve_direction < 0) {
                                    //convex
                                    //console.log("convex");
                                    curve_attr_1 = 1;
                                    contours_vertices[contours_vertices.length - 1][vert_cnt++] = control_x;
                                    contours_vertices[contours_vertices.length - 1][vert_cnt++] = control_y;
                                }
                                contours_vertices[contours_vertices.length - 1][vert_cnt++] = end_x;
                                contours_vertices[contours_vertices.length - 1][vert_cnt++] = end_y;
                            }
                            if (GraphicsFactoryHelper_1.GraphicsFactoryHelper.isClockWiseXY(end_x, end_y, control_x, control_y, lastPoint.x, lastPoint.y)) {
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
                            else {
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
                        case GraphicsPathCommand_1.GraphicsPathCommand.CUBIC_CURVE:
                            //todo
                            break;
                    }
                }
            }
            var verts = [];
            var all_verts = [];
            var vertIndicess = [];
            var elems = [];
            for (k = 0; k < contours_vertices.length; k++) {
                var vertices = contours_vertices[k];
                //for (i = 0; i < vertices.length / 2; ++i)
                //console.log("vert collected" + i + " = " + vertices[i * 2] + " / " + vertices[i * 2 + 1]);
                var verticesF32 = new Float32Array(vertices);
                //var verticesF32 = new Float32Array([0,0, 100,0, 100,100, 0,100]);
                //console.log("in vertices", vertices);
                //var tess = new TESS();
                if (GraphicsFactoryHelper_1.GraphicsFactoryHelper._tess_obj == null) {
                    console.log("No libtess2 tesselator available.\nMake it available using Graphics._tess_obj=new TESS();");
                    return;
                }
                GraphicsFactoryHelper_1.GraphicsFactoryHelper._tess_obj.addContour(verticesF32, 2, 8, vertices.length / 2);
            }
            GraphicsFactoryHelper_1.GraphicsFactoryHelper._tess_obj.tesselate(0 /*TESS.WINDING_ODD*/, 0 /*TESS.ELEMENT_POLYGONS*/, 3, 2, null);
            //console.log("out vertices", Graphics._tess_obj.getVertices());
            verts = GraphicsFactoryHelper_1.GraphicsFactoryHelper._tess_obj.getVertices();
            elems = GraphicsFactoryHelper_1.GraphicsFactoryHelper._tess_obj.getElements();
            //console.log("out elements", Graphics._tess_obj.getElements());
            var numVerts = verts.length / 2;
            var numElems = elems.length / 3;
            for (i = 0; i < numVerts; ++i)
                all_verts.push(new Point_1.Point(verts[i * 2], verts[i * 2 + 1]));
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
            var attributesView = new AttributesView_1.AttributesView(Float32Array, 7);
            attributesView.set(final_vert_list);
            var attributesBuffer = attributesView.attributesBuffer;
            attributesView.dispose();
            var elements = new TriangleElements_1.TriangleElements(attributesBuffer);
            elements.setPositions(new Float2Attributes_1.Float2Attributes(attributesBuffer));
            elements.setCustomAttributes("curves", new Float3Attributes_1.Float3Attributes(attributesBuffer));
            elements.setUVs(new Float2Attributes_1.Float2Attributes(attributesBuffer));
            var material = DefaultMaterialManager_1.DefaultMaterialManager.getDefaultMaterial();
            material.bothSides = true;
            material.useColorTransform = true;
            material.curves = true;
            var thisGraphic = targetGraphic.addGraphic(elements, material);
        }
        targetGraphic.queued_fill_pathes.length = 0;
    };
    return GraphicsFactoryFills;
}());
exports.GraphicsFactoryFills = GraphicsFactoryFills;
