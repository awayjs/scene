/**
 * The JointStyle class is an enumeration of constant values that specify the
 * joint style to use in drawing lines. These constants are provided for use
 * as values in the <code>joints</code> parameter of the
 * <code>flash.display.Graphics.lineStyle()</code> method. The method supports
 * three types of joints: miter, round, and bevel, as the following example
 * shows:
 */
export declare class JointStyle {
    /**
     * Specifies beveled joints in the <code>joints</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    static BEVEL: number;
    /**
     * Specifies mitered joints in the <code>joints</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    static MITER: number;
    /**
     * Specifies round joints in the <code>joints</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    static ROUND: number;
}
