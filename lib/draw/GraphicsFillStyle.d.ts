import { IGraphicsData } from "../draw/IGraphicsData";
export declare class GraphicsFillStyle implements IGraphicsData {
    static data_type: string;
    /**
     * The Vector of drawing commands as integers representing the path.
     */
    private _color;
    private _alpha;
    constructor(color?: number, alpha?: number);
    readonly data_type: string;
}
