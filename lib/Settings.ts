import { BlendMode }  from '@awayjs/stage';

export interface ISceneSettings {
	ALLOW_FORCE_MSAA: number;
	ALLOW_APPROXIMATION: number;
	MSAA_MINIMAL_IMAGE_SIZE: number;
	USE_UNSAFE_CACHE_AS_BITMAP: boolean;
	USE_UNSAFE_SCALE_9_SLICE: boolean;
	USE_UNSAFE_FILTERS: boolean;
	USE_UNSAFE_BLENDS: boolean;
	CPU_COPY_PIXELS_COUNT: number;
	REMAP_BLEND_MODE: boolean;
	BLEND_MODE_REMAP_TABLE: Record<string, string>;
	FONT_TESSELATION_QUALITY: number;
}

export const Settings: ISceneSettings = {
	/**
	 * @description Force MSAA for rendering to image bitmap (WebGL2), 0 - disable, 1-16 - msaa quality
	 */
	ALLOW_FORCE_MSAA: 8,
	/**
	 * @description Image size start from it MSAA is runned for image (without temporary copy)
	 */
	MSAA_MINIMAL_IMAGE_SIZE: 300,
	/**
	 * @description Try approximate MSAA for unsupported platforms by rendering to N time biggest texture
	 */
	ALLOW_APPROXIMATION: 0, // PLZ not enable yet, not works

	/**
	 * @description Currently cache-as-bitmap is unsafe feature, and produce a lot of bugs
	 */
	USE_UNSAFE_CACHE_AS_BITMAP: false,

	/**
	 * @description Currently cache-as-bitmap is unsafe feature, and produce a lot of bugs
	 */
	USE_UNSAFE_SCALE_9_SLICE: false,

	/**
	 * @description Use applyFilter for SceneImage2D or scene graph
	 */
	USE_UNSAFE_FILTERS: false,

	/**
	 * @description Use blend composing, this force cacheAsBitmap
	 */
	USE_UNSAFE_BLENDS: false,
	/**
	 * @description Remap blend modes from => to, can be used for remap a Darker to multiple and other
	 */
	REMAP_BLEND_MODE: true,

	/**
	 * @description Table for remapping a blend mode when it used
	 * @see REMAP_BLEND_MODE
	 */
	BLEND_MODE_REMAP_TABLE: { [BlendMode.DARKEN]: BlendMode.MULTIPLY },

	/**
	 * @description How many pixels can be processed on CPU for `copyPixel` operation for avoid run GPU
	 */
	CPU_COPY_PIXELS_COUNT: 64 * 64,

	/**
	 * @description Quality factor for pre-tesselated font shapes,
	 * values greater 1 no make sense, 1/10 produce normal font result for small fonts (14px)
	 */
	FONT_TESSELATION_QUALITY: 1 / 10
};