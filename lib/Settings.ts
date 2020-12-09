export interface ISceneSettings {
	ALLOW_FORCE_MSAA: number,
	ALLOW_APPROXIMATION: number;
}

export const Settings: ISceneSettings = {
	/**
	 * @description Force MSAA for rendering to image bitmap (WebGL2), 0 - disable, 1-16 - msaa quality
	 */
	ALLOW_FORCE_MSAA: 4,
	/**
	 * @description Try approximate MSAA for unsupported platforms by rendering to N time biggest texture
	 */
	ALLOW_APPROXIMATION: 0 // PLZ not enable yet, not works
};