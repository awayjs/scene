import { Point } from "@awayjs/core/lib/geom/Point";
export declare class GraphicsFactoryHelper {
    static _tess_obj: any;
    static isClockWiseXY(point1x: number, point1y: number, point2x: number, point2y: number, point3x: number, point3y: number): boolean;
    static getSign(ax: number, ay: number, cx: number, cy: number, bx: number, by: number): number;
    static pointInTri(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, xx: number, xy: number): boolean;
    static getControlXForCurveX(a: number, c: number, b: number): number;
    static getControlYForCurveY(a: number, c: number, b: number): number;
    static drawPoint(startX: number, startY: number, vertices: Array<number>): void;
    static addTriangle(startX: number, startY: number, controlX: number, controlY: number, endX: number, endY: number, tri_type: number, vertices: Array<number>): void;
    static createCap(startX: number, startY: number, start_le: Point, start_ri: Point, dir_vec: Point, capstyle: number, cap_position: number, thickness: number, vertices: Array<number>): void;
    static getLineFormularData(a: Point, b: Point): Point;
    static getQuadricBezierPosition(t: any, start: any, control: any, end: any): number;
    static subdivideCurve(startx: number, starty: number, cx: number, cy: number, endx: number, endy: number, startx2: number, starty2: number, cx2: number, cy2: number, endx2: number, endy2: number, array_out: Array<number>, array2_out: Array<number>): void;
}
