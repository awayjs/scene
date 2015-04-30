/**
 * ITextureObject is an interface for classes that are used in the rendering pipeline to render the
 * contents of a texture
 *
 * @class away.pool.ITextureObject
 */
interface ITextureObject
{
	/**
	 *
	 */
	dispose();

	/**
	 *
	 */
	invalidate();
}

export = ITextureObject;