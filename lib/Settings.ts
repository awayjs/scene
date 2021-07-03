export interface ISceneSettings {
	ALLOW_FORCE_MSAA: number;
	ALLOW_APPROXIMATION: number;
	MSAA_MINIMAL_IMAGE_SIZE: number;
	USE_UNSAFE_CACHE_AS_BITMAP: boolean;
	USE_UNSAFE_SCALE_9_SLICE: boolean;
	USE_UNSAFE_FILTERS: boolean;
	USE_UNSAFE_BLENDS: boolean;
	CPU_COPY_PIXELS_COUNT: number;
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
	 * @description How many pixels can be processed on CPU for `copyPixel` operation for avoid run GPU
	 */
	CPU_COPY_PIXELS_COUNT: 64 * 64,
};