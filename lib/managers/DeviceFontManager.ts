import { Font } from '../text/Font';

const enum DEVICEFONT {
	SANS = 'sans',
	SERIF = 'serif',
	TYPEWRITER = 'typewriter'
}

export class DeviceFontManager {
	public static deviceFontMap: StringMap<string[]> = {};

	private static _emptyFont: Font;

	private static _deviceFonts: StringMap<Font> = {};

	public static getDeviceFont(fontName: string): Font {

		fontName = this.getDeviceFontName(fontName);

		if (this._deviceFonts[fontName])
			return this._deviceFonts[fontName];

		const font = new Font();
		font.name = fontName;
		this._deviceFonts[fontName] = font;
		return this._deviceFonts[fontName];
	}

	public static getDeviceFontName(fontName: string): string {
		for (const key in this.deviceFontMap) {
			const idx = this.deviceFontMap[key].indexOf(fontName);
			if (idx >= 0) {
				return key;
			}
		}
		console.warn(`[DeviceFontManager] - no mapping exists for ${fontName}
		 - falling back to ${DEVICEFONT.SANS}`);
		return DEVICEFONT.SANS;
	}
}

DeviceFontManager.deviceFontMap[DEVICEFONT.SANS] = [
	'_sans',
	'Arial'];

DeviceFontManager.deviceFontMap['Arial Narrow'] = [
	'Arial Narrow'];
DeviceFontManager.deviceFontMap['Arial Black'] = [
	'Arial Black'];
DeviceFontManager.deviceFontMap[DEVICEFONT.SERIF] = [];

DeviceFontManager.deviceFontMap[DEVICEFONT.TYPEWRITER] = [];