import { Image2D } from "@awayjs/core/lib/image/Image2D";
import { ByteArray } from "@awayjs/core/lib/utils/ByteArray";
import { Single2DTexture } from "../textures/Single2DTexture";
/**
 * Helper class for casting assets to usable objects
 */
export declare class Cast {
    private static _colorNames;
    private static _hexChars;
    private static _notClasses;
    private static _classes;
    static string(data: any): string;
    static byteArray(data: any): ByteArray;
    private static isHex(str);
    static tryColor(data: any): number;
    static color(data: any): number;
    static tryClass(name: string): any;
    static image2D(data: any): Image2D;
    static bitmapTexture(data: any): Single2DTexture;
}
