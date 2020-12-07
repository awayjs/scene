export interface ISceneSettings {
	ALLOW_FORCE_MSAA: number,
	ENABLE_DISABLE_CONSTRUCTOR: boolean;
}

export const Settings: ISceneSettings = {
	/**
	 * @description Force MSAA for rendering to image bitmap (WebGL2), 0 - disable, 1-16 - msaa quality
	 */
	ALLOW_FORCE_MSAA: 0,

	/**
	 * @description Enable once constructor execution pipline
	 */
	ENABLE_DISABLE_CONSTRUCTOR: false,
};