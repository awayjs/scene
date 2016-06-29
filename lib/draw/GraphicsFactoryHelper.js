"use strict";
var CapsStyle_1 = require("../draw/CapsStyle");
var Point_1 = require("@awayjs/core/lib/geom/Point");
var MathConsts_1 = require("@awayjs/core/lib/geom/MathConsts");
var GraphicsFactoryHelper = (function () {
    function GraphicsFactoryHelper() {
    }
    GraphicsFactoryHelper.isClockWiseXY = function (point1x, point1y, point2x, point2y, point3x, point3y) {
        var num = (point1x - point2x) * (point3y - point2y) - (point1y - point2y) * (point3x - point2x);
        if (num < 0)
            return false;
        return true;
    };
    GraphicsFactoryHelper.getSign = function (ax, ay, cx, cy, bx, by) {
        return (ax - bx) * (cy - by) - (ay - by) * (cx - bx);
    };
    GraphicsFactoryHelper.pointInTri = function (ax, ay, bx, by, cx, cy, xx, xy) {
        var b1 = GraphicsFactoryHelper.getSign(ax, ay, xx, xy, bx, by) > 0;
        var b2 = GraphicsFactoryHelper.getSign(bx, by, xx, xy, cx, cy) > 0;
        var b3 = GraphicsFactoryHelper.getSign(cx, cy, xx, xy, ax, ay) > 0;
        return ((b1 == b2) && (b2 == b3));
    };
    GraphicsFactoryHelper.getControlXForCurveX = function (a, c, b) {
        return c;
    };
    GraphicsFactoryHelper.getControlYForCurveY = function (a, c, b) {
        return c;
    };
    GraphicsFactoryHelper.drawPoint = function (startX, startY, vertices) {
        GraphicsFactoryHelper.addTriangle(startX - 2, startY - 2, startX + 2, startY - 2, startX + 2, startY + 2, 0, vertices);
        GraphicsFactoryHelper.addTriangle(startX - 2, startY - 2, startX - 2, startY + 2, startX + 2, startY + 2, 0, vertices);
    };
    GraphicsFactoryHelper.addTriangle = function (startX, startY, controlX, controlY, endX, endY, tri_type, vertices) {
        var final_vert_cnt = vertices.length;
        if (tri_type == 0) {
            vertices[final_vert_cnt++] = startX;
            vertices[final_vert_cnt++] = startY;
            vertices[final_vert_cnt++] = 4.5736980577097704e-41; // ((127<<24)+(127<<16)+0+0)
            vertices[final_vert_cnt++] = controlX;
            vertices[final_vert_cnt++] = controlY;
            vertices[final_vert_cnt++] = 4.5736980577097704e-41; // ((127<<24)+(127<<16)+0+0)
            vertices[final_vert_cnt++] = endX;
            vertices[final_vert_cnt++] = endY;
            vertices[final_vert_cnt++] = 4.5736980577097704e-41; // ((127<<24)+(127<<16)+0+0)
        }
        else if (tri_type < 0) {
            vertices[final_vert_cnt++] = startX;
            vertices[final_vert_cnt++] = startY;
            vertices[final_vert_cnt++] = 1.1708844992641982e-38; // ((127<<24)+(127<<16)+0+0)
            vertices[final_vert_cnt++] = controlX;
            vertices[final_vert_cnt++] = controlY;
            vertices[final_vert_cnt++] = 2.2778106537599901e-41; // ((127<<24)+(63<<16)+0+0)
            vertices[final_vert_cnt++] = endX;
            vertices[final_vert_cnt++] = endY;
            vertices[final_vert_cnt++] = 1.7796490496925177e-43; // ((127<<24)+0+0+0)
        }
        else if (tri_type > 0) {
            vertices[final_vert_cnt++] = startX;
            vertices[final_vert_cnt++] = startY;
            vertices[final_vert_cnt++] = 1.1708846393940446e-38; // ((-128<<24)+(127<<16)+0+0)
            vertices[final_vert_cnt++] = controlX;
            vertices[final_vert_cnt++] = controlY;
            vertices[final_vert_cnt++] = 2.2779507836064226e-41; // ((-128<<24)+(63<<16)+0+0)
            vertices[final_vert_cnt++] = endX;
            vertices[final_vert_cnt++] = endY;
            vertices[final_vert_cnt++] = 1.793662034335766e-43; // ((-128<<24)+0+0+0)
        }
    };
    GraphicsFactoryHelper.createCap = function (startX, startY, start_le, start_ri, dir_vec, capstyle, cap_position, thickness, vertices) {
        if (capstyle == CapsStyle_1.CapsStyle.ROUND) {
            //console.log("add round cap");
            var tmp1_x = startX + (cap_position * (dir_vec.x * thickness));
            var tmp1_y = startY + (cap_position * (dir_vec.y * thickness));
            tmp1_x = tmp1_x * 2 - start_le.x / 2 - start_ri.x / 2;
            tmp1_y = tmp1_y * 2 - start_le.y / 2 - start_ri.y / 2;
            GraphicsFactoryHelper.addTriangle(start_le.x, start_le.y, tmp1_x, tmp1_y, start_ri.x, start_ri.y, -1, vertices);
        }
        else if (capstyle == CapsStyle_1.CapsStyle.SQUARE) {
            //console.log("add square cap");
            var tmp1_x = start_le.x + (cap_position * (dir_vec.x * thickness));
            var tmp1_y = start_le.y + (cap_position * (dir_vec.y * thickness));
            var tmp2_x = start_ri.x + (cap_position * (dir_vec.x * thickness));
            var tmp2_y = start_ri.y + (cap_position * (dir_vec.y * thickness));
            GraphicsFactoryHelper.addTriangle(tmp2_x, tmp2_y, tmp1_x, tmp1_y, start_le.x, start_le.y, 0, vertices);
            GraphicsFactoryHelper.addTriangle(tmp2_x, tmp2_y, start_le.x, start_le.y, start_ri.x, start_ri.y, 0, vertices);
        }
    };
    GraphicsFactoryHelper.getLineFormularData = function (a, b) {
        var tmp_x = b.x - a.x;
        var tmp_y = b.y - a.y;
        var return_point = new Point_1.Point();
        if ((tmp_x != 0) && (tmp_y != 0))
            return_point.x = tmp_y / tmp_x;
        return_point.y = -(return_point.x * a.x - a.y);
        return return_point;
    };
    GraphicsFactoryHelper.getQuadricBezierPosition = function (t, start, control, end) {
        var xt = 1 - t;
        return xt * xt * start + 2 * xt * t * control + t * t * end;
    };
    GraphicsFactoryHelper.subdivideCurve = function (startx, starty, cx, cy, endx, endy, startx2, starty2, cx2, cy2, endx2, endy2, array_out, array2_out) {
        var angle_1 = Math.atan2(cy - starty, cx - startx) * MathConsts_1.MathConsts.RADIANS_TO_DEGREES;
        var angle_2 = Math.atan2(endy - cy, endx - cx) * MathConsts_1.MathConsts.RADIANS_TO_DEGREES;
        var angle_delta = angle_2 - angle_1;
        //console.log("angle_delta "+angle_delta);
        if (angle_delta > 180) {
            angle_delta -= 360;
        }
        if (angle_delta < -180) {
            angle_delta += 360;
        }
        if (Math.abs(angle_delta) >= 150) {
            array_out.push(startx, starty, cx, cy, endx, endy);
            array2_out.push(startx2, starty2, cx2, cy2, endx2, endy2);
            return;
        }
        var b1 = false;
        var b2 = false;
        if (angle_delta < 0) {
            // curve is curved to right side. right side is convex
            b1 = GraphicsFactoryHelper.getSign(startx, starty, cx2, cy2, endx, endy) > 0;
            b2 = GraphicsFactoryHelper.getSign(startx, starty, cx, cy, endx, endy) > 0;
            b1 = (((starty - endy) * (cx - startx) + (endx - startx) * (cy - starty)) * ((starty - endy) * (cx2 - startx) + (endx - startx) * (cy2 - starty))) < 0;
        }
        else {
            // curve is curved to left side. left side is convex
            b1 = GraphicsFactoryHelper.getSign(startx2, starty2, cx2, cy2, endx2, endy2) > 0;
            b2 = GraphicsFactoryHelper.getSign(startx2, starty2, cx, cy, endx2, endy2) > 0;
            b1 = (((starty2 - endy) * (cx - startx2) + (endx2 - startx2) * (cy - starty2)) * ((starty2 - endy2) * (cx2 - startx2) + (endx2 - startx2) * (cy2 - starty2))) < 0;
        }
        if (b1) {
            array_out.push(startx, starty, cx, cy, endx, endy);
            array2_out.push(startx2, starty2, cx2, cy2, endx2, endy2);
            return;
        }
        // triangles overlap. we must subdivide:
        var c1x = startx + (cx - startx) * 0.5; // new controlpoint 1.1
        var c1y = starty + (cy - starty) * 0.5;
        var c2x = cx + (endx - cx) * 0.5; // new controlpoint 1.2
        var c2y = cy + (endy - cy) * 0.5;
        var ax = c1x + (c2x - c1x) * 0.5; // new middlepoint 1
        var ay = c1y + (c2y - c1y) * 0.5;
        var c1x2 = startx2 + (cx2 - startx2) * 0.5; // new controlpoint 2.1
        var c1y2 = starty2 + (cy2 - starty2) * 0.5;
        var c2x2 = cx2 + (endx2 - cx2) * 0.5; // new controlpoint 2.2
        var c2y2 = cy2 + (endy2 - cy2) * 0.5;
        var ax2 = c1x2 + (c2x2 - c1x2) * 0.5; // new middlepoint 2
        var ay2 = c1y2 + (c2y2 - c1y2) * 0.5;
        GraphicsFactoryHelper.subdivideCurve(startx, starty, c1x, c1y, ax, ay, startx2, starty2, c1x2, c1y2, ax2, ay2, array_out, array2_out);
        GraphicsFactoryHelper.subdivideCurve(ax, ay, c2x, c2y, endx, endy, ax2, ay2, c2x2, c2y2, endx2, endy2, array_out, array2_out);
    };
    return GraphicsFactoryHelper;
}());
exports.GraphicsFactoryHelper = GraphicsFactoryHelper;
