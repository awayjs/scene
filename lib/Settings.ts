import { ConfigManager } from '@awayjs/core';
import { BlendMode }  from '@awayjs/stage';

export interface ISceneSettings {
	ALLOW_FORCE_MSAA: number;
	ALLOW_APPROXIMATION: number;
	MSAA_MINIMAL_IMAGE_SIZE: number;
	USE_UNSAFE_CACHE_AS_BITMAP: boolean;
	HONOR_CACHE_AS_BITMAP: boolean;
	USE_UNSAFE_SCALE_9_SLICE: boolean;
	USE_UNSAFE_FILTERS: boolean;
	USE_UNSAFE_BLENDS: boolean;
	HONOR_NATIVE_BLENDS: boolean;
	CPU_COPY_PIXELS_COUNT: number;
	REMAP_BLEND_MODE: boolean;
	BLEND_MODE_REMAP_TABLE: Record<string, string>;
	FONT_TESSELATION_QUALITY: number;
	USE_UNSAFE_FNT: boolean;
	TEXT_SHAPE_ROUND_PRECISION: number;
}

export const Settings: ISceneSettings = ConfigManager.instance.addStore<any>('scene', {
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
	 * @description Legacy enable flag (OR'd with HONOR_CACHE_AS_BITMAP). Kept so existing
	 * configs that set USE_UNSAFE_CACHE_AS_BITMAP=true keep working.
	 */
	USE_UNSAFE_CACHE_AS_BITMAP: false,

	/**
	 * @description Honor AS3 DisplayObject.cacheAsBitmap. Default true after E8 sticky-cache
	 * fix (localNode SCENE_TRANSFORM no longer rebuilds RTT every frame). Set false to
	 * restore the legacy setter no-op if a title regresses.
	 */
	HONOR_CACHE_AS_BITMAP: true,

	/**
	 * @description Currently cache-as-bitmap is unsafe feature, and produce a lot of bugs
	 */
	USE_UNSAFE_SCALE_9_SLICE: false,

	/**
	 * @description Use applyFilter for SceneImage2D or scene graph
	 */
	USE_UNSAFE_FILTERS: false,

	/**
	 * @description Use blend composing for non-native blends; also forces honor of all blends.
	 * Native blends (LAYER/ERASE/…) are honored separately via HONOR_NATIVE_BLENDS.
	 */
	USE_UNSAFE_BLENDS: false,

	/**
	 * @description Honor Flash-native DisplayObject.blendMode values (LAYER, ERASE, MULTIPLY,
	 * ADD, SCREEN, ALPHA, SUBTRACT, NORMAL) so LAYER+ERASE transparency groups engage
	 * ContainerNode.renderToImage / CacheRenderer as Flash would. Default true (E9).
	 * Non-native blends (OVERLAY, HARDLIGHT, …) still require USE_UNSAFE_BLENDS.
	 * Kill-switch: HONOR_NATIVE_BLENDS=false restores the legacy getter empty-string gate.
	 */
	HONOR_NATIVE_BLENDS: true,

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
	FONT_TESSELATION_QUALITY: 1 / 10,
	/**
	 * @description Use unsafe FNT (pre-cached font shapes onto texture)
	 */
	USE_UNSAFE_FNT: false,

	/**
	 * @description Precision of text building for rounding a vertices placement of text shape.
	 * Used for correction text blurring when pixel is missposited
	 */
	TEXT_SHAPE_ROUND_PRECISION: 0.1,
});