import BitmapImage2D			from "awayjs-core/lib/image/BitmapImage2D";
import Matrix					from "awayjs-core/lib/geom/Matrix";

import CapsStyle				from "../draw/CapsStyle";
import GradientType				from "../draw/GradientType";
import GraphicsPathWinding		from "../draw/GraphicsPathWinding";
import IGraphicsData			from "../draw/IGraphicsData";
import InterpolationMethod		from "../draw/InterpolationMethod";
import JointStyle				from "../draw/JointStyle";
import LineScaleMode			from "../draw/LineScaleMode";
import TriangleCulling			from "../draw/TriangleCulling";
import SpreadMethod				from "../draw/SpreadMethod";

import GraphicsPath				from "../draw/GraphicsPath";
import GraphicsPathCommand		from "../draw/GraphicsPathCommand";
import DefaultMaterialManager	from "../managers/DefaultMaterialManager";
import MovieClip				from "../display/MovieClip";

import Point					from "awayjs-core/lib/geom/Point";
import AttributesBuffer			from "awayjs-core/lib/attributes/AttributesBuffer";
import AttributesView			from "awayjs-core/lib/attributes/AttributesView";
import Sprite					from "../display/Sprite";
import Float3Attributes			from "awayjs-core/lib/attributes/Float3Attributes";
import Float2Attributes			from "awayjs-core/lib/attributes/Float2Attributes";

import MathConsts				from "awayjs-core/lib/geom/MathConsts";

import PartialImplementationError		from "awayjs-core/lib/errors/PartialImplementationError";
import TriangleElements from "../graphics/TriangleElements";
import MaterialBase from "../materials/MaterialBase";
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
class GraphicsFactoryHelper
{

	public static _tess_obj:any;


	public static isClockWiseXY(point1x:number, point1y:number, point2x:number, point2y:number, point3x:number, point3y:number):boolean
	{
		var num:number=(point1x - point2x) * (point3y - point2y) - (point1y - point2y) * (point3x - point2x);
		if(num < 0)
			return false;
		return true;
	}

	public static getSign(ax:number, ay:number, cx:number, cy:number, bx:number, by:number):number
	{
		return (ax - bx) * (cy - by) - (ay - by) * (cx - bx);

	}

	public static pointInTri(ax:number, ay:number, bx:number, by:number ,cx:number, cy:number, xx:number, xy:number):boolean
	{
		var b1:boolean = GraphicsFactoryHelper.getSign(ax, ay, xx, xy, bx, by) > 0;
		var b2:boolean = GraphicsFactoryHelper.getSign(bx, by, xx, xy, cx, cy) > 0;
		var b3:boolean = GraphicsFactoryHelper.getSign(cx, cy, xx, xy, ax, ay) > 0;
		return ((b1 == b2) && (b2 == b3));
	}

	public static getControlXForCurveX(a:number, c:number, b:number):number
	{
		return c;
	}
	public static getControlYForCurveY(a:number, c:number, b:number):number
	{
		return c;
	}
	public static drawPoint(startX:number,startY:number, vertices:Array<number>)
	{
		GraphicsFactoryHelper.addTriangle(startX-2, startY-2, startX+2, startY-2, startX+2, startY+2, 0, vertices);
		GraphicsFactoryHelper.addTriangle(startX-2, startY-2, startX-2, startY+2, startX+2, startY+2, 0, vertices);
	}
	public static addTriangle(startX:number,startY:number, controlX:number, controlY:number, endX:number, endY:number, tri_type:number, vertices:Array<number>)
	{
		var final_vert_cnt:number = vertices.length;
		if(tri_type==0){
			vertices[final_vert_cnt++] = startX;
			vertices[final_vert_cnt++] = startY;
			vertices[final_vert_cnt++] = 1;
			vertices[final_vert_cnt++] = 2.0;
			vertices[final_vert_cnt++] = 0.0;
			vertices[final_vert_cnt++] = controlX;
			vertices[final_vert_cnt++] = controlY;
			vertices[final_vert_cnt++] = 1;
			vertices[final_vert_cnt++] = 2.0;
			vertices[final_vert_cnt++] = 0.0;
			vertices[final_vert_cnt++] = endX;
			vertices[final_vert_cnt++] = endY;
			vertices[final_vert_cnt++] = 1;
			vertices[final_vert_cnt++] = 2.0;
			vertices[final_vert_cnt++] = 0.0;
		}
		else{
			vertices[final_vert_cnt++] = startX;
			vertices[final_vert_cnt++] = startY;
			vertices[final_vert_cnt++] = tri_type;
			vertices[final_vert_cnt++] = 1.0;
			vertices[final_vert_cnt++] = 1.0;
			vertices[final_vert_cnt++] = controlX;
			vertices[final_vert_cnt++] = controlY;
			vertices[final_vert_cnt++] = tri_type;
			vertices[final_vert_cnt++] = 0.5;
			vertices[final_vert_cnt++] = 0.0;
			vertices[final_vert_cnt++] = endX;
			vertices[final_vert_cnt++] = endY;
			vertices[final_vert_cnt++] = tri_type;
			vertices[final_vert_cnt++] = 0.0;
			vertices[final_vert_cnt++] = 0.0;
		}

	}
	public static createCap(startX:number, startY:number, start_le:Point, start_ri:Point, dir_vec:Point, capstyle:number, cap_position:number, thickness:number, vertices:Array<number>)
	{

		if (capstyle == CapsStyle.ROUND) {
			//console.log("add round cap");
			var tmp1_x:number = startX + (cap_position * (dir_vec.x * thickness));
			var tmp1_y:number = startY + (cap_position * (dir_vec.y * thickness));
			tmp1_x = tmp1_x * 2 - start_le.x/2 - start_ri.x/2;
			tmp1_y = tmp1_y * 2 - start_le.y/2 - start_ri.y/2;
			GraphicsFactoryHelper.addTriangle(start_le.x, start_le.y, tmp1_x, tmp1_y, start_ri.x, start_ri.y, -1, vertices);
		}
		else if (capstyle == CapsStyle.SQUARE) {
			//console.log("add square cap");
			var tmp1_x:number = start_le.x + (cap_position * (dir_vec.x * thickness));
			var tmp1_y:number = start_le.y + (cap_position * (dir_vec.y * thickness));
			var tmp2_x:number = start_ri.x + (cap_position * (dir_vec.x * thickness));
			var tmp2_y:number = start_ri.y + (cap_position * (dir_vec.y * thickness));

			GraphicsFactoryHelper.addTriangle(tmp2_x,tmp2_y, tmp1_x, tmp1_y, start_le.x, start_le.y, 0, vertices);
			GraphicsFactoryHelper.addTriangle(tmp2_x,tmp2_y, start_le.x, start_le.y, start_ri.x, start_ri.y, 0, vertices);
		}
	}
	public static getLineFormularData(a:Point, b:Point):Point
	{

		var tmp_x = b.x - a.x;
		var tmp_y = b.y - a.y;
		var return_point:Point=new Point();
		if ((tmp_x != 0)&&(tmp_y!=0))
			return_point.x = tmp_y / tmp_x;
		return_point.y = -(return_point.x * a.x - a.y);
		return return_point;
	}
	public static getQuadricBezierPosition(t, start, control, end):number {
		var xt = 1 - t;
		return xt * xt * start + 2 * xt * t * control + t * t * end;
	}
	public static subdivideCurve(startx:number, starty:number, cx:number, cy:number, endx:number, endy:number, startx2:number, starty2:number, cx2:number, cy2:number, endx2:number, endy2:number, array_out:Array<number>, array2_out:Array<number>):void
	{
		var angle_1:number=Math.atan2(cy - starty, cx - startx) * MathConsts.RADIANS_TO_DEGREES;
		var angle_2:number=Math.atan2(endy - cy, endx - cx) * MathConsts.RADIANS_TO_DEGREES;
		var angle_delta:number=angle_2 - angle_1;
		//console.log("angle_delta "+angle_delta);

		if(angle_delta>180){
			angle_delta-=360;
		}
		if(angle_delta<-180){
			angle_delta+=360;
		}
		if(Math.abs(angle_delta)>=150){
			array_out.push(startx, starty, cx, cy,  endx, endy);
			array2_out.push(startx2, starty2, cx2, cy2, endx2, endy2);
			return;
		}

		var b1:boolean=false;
		var b2:boolean=false;
		if(angle_delta<0){
			// curve is curved to right side. right side is convex
			b1 = GraphicsFactoryHelper.getSign(startx, starty, cx2, cy2, endx, endy) > 0;
			b2 = GraphicsFactoryHelper.getSign(startx, starty, cx, cy, endx, endy) > 0;
			b1 = (((starty-endy)*(cx-startx)+(endx-startx)*(cy-starty))*((starty-endy)*(cx2-startx)+(endx-startx)*(cy2-starty)))<0;

		}
		else{
			// curve is curved to left side. left side is convex
			b1 = GraphicsFactoryHelper.getSign(startx2, starty2, cx2, cy2, endx2, endy2) > 0;
			b2 = GraphicsFactoryHelper.getSign(startx2, starty2, cx, cy, endx2, endy2) > 0;
			b1 = (((starty2-endy)*(cx-startx2)+(endx2-startx2)*(cy-starty2))*((starty2-endy2)*(cx2-startx2)+(endx2-startx2)*(cy2-starty2)))<0;

		}
		if(b1){
			array_out.push(startx, starty, cx, cy,  endx, endy);
			array2_out.push(startx2, starty2, cx2, cy2, endx2, endy2);
			return;
		}
		// triangles overlap. we must subdivide:

		var c1x = startx + (cx - startx) * 0.5;// new controlpoint 1.1
		var c1y = starty + (cy - starty) * 0.5;
		var c2x = cx + (endx - cx) * 0.5;// new controlpoint 1.2
		var c2y = cy + (endy - cy) * 0.5;
		var ax = c1x + (c2x - c1x) * 0.5;// new middlepoint 1
		var ay = c1y + (c2y - c1y) * 0.5;

		var c1x2 = startx2 + (cx2 - startx2) * 0.5;// new controlpoint 2.1
		var c1y2 = starty2 + (cy2 - starty2) * 0.5;
		var c2x2 = cx2 + (endx2 - cx2) * 0.5;// new controlpoint 2.2
		var c2y2 = cy2 + (endy2 - cy2) * 0.5;
		var ax2 = c1x2 + (c2x2 - c1x2) * 0.5;// new middlepoint 2
		var ay2 = c1y2 + (c2y2 - c1y2) * 0.5;

		GraphicsFactoryHelper.subdivideCurve(startx, starty, c1x, c1y, ax, ay, startx2, starty2, c1x2, c1y2, ax2, ay2, array_out, array2_out);
		GraphicsFactoryHelper.subdivideCurve(ax, ay, c2x, c2y, endx, endy, ax2, ay2, c2x2, c2y2, endx2, endy2, array_out, array2_out);

	}

}

export default GraphicsFactoryHelper;