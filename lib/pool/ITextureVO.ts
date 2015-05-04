/**
 * ITextureVO is an interface for classes that are used in the rendering pipeline to render the
 * contents of a texture
 *
 * @class away.pool.ITextureVO
 */
interface ITextureVO
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

export = ITextureVO;