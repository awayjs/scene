import IMaterialPass				= require("awayjs-display/lib/materials/passes/IMaterialPass");

/**
 * IMaterialPassData is an interface for classes that are used in the rendering pipeline to render the
 * contents of a material pass
 *
 * @class away.pool.IMaterialPassData
 */
interface IMaterialPassData
{
	/**
	 *
	 */
	materialPass:IMaterialPass;

	/**
	 *
	 */
	dispose();

	/**
	 *
	 */
	invalidate();
}

export = IMaterialPassData;