import { IGraphicsData } from "../draw/IGraphicsData";
export declare class GraphicsStrokeStyle implements IGraphicsData {
    static data_type: string;
    private _color;
    private _alpha;
    private _thickness;
    private _jointstyle;
    private _capstyle;
    private _miter_limit;
    constructor(color?: number, alpha?: number, thickness?: number, jointstyle?: number, capstyle?: number, miter_limit?: number);
    readonly data_type: string;
    color: number;
    alpha: number;
    readonly half_thickness: number;
    thickness: number;
    jointstyle: number;
    miter_limit: number;
    capstyle: number;
}
