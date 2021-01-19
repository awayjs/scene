import { Font } from '../text/Font';
import { AssetBase } from '@awayjs/core';
import { DeviceFontManager } from './DeviceFontManager';

export class DefaultFontManager {

	// set to true while loading fonts.swf
	public static deviceFontsLoading: boolean = false;

	private static _registered_fonts: any = {};
	private static _registered_fonts_by_className: any = {};
	private static _namespaces: string[] = [];

	private static _embbedCFF_fonts: any = {};

	public static defineFont_CFF(fontName: string, ns: string = AssetBase.DEFAULT_NAMESPACE) {
		this._embbedCFF_fonts || (this._embbedCFF_fonts = {});
		this._embbedCFF_fonts[ns] || (this._embbedCFF_fonts[ns] = {});

		let font: Font = this._embbedCFF_fonts[ns][fontName];

		if (font) {
			return font;
		}

		font = new Font();
		font.name = fontName;
		this._embbedCFF_fonts[ns][fontName] = font;
		return font;
	}

	public static getFont_CFF(fontName: string, namespace: string = AssetBase.DEFAULT_NAMESPACE) {

		if (!fontName) {
			return DeviceFontManager.getDeviceFont(fontName);
		}

		const ns = namespace || AssetBase.DEFAULT_NAMESPACE;

		this._embbedCFF_fonts || (this._embbedCFF_fonts = {});
		this._embbedCFF_fonts[ns] || (this._embbedCFF_fonts[ns] = {});

		const font: Font = this._embbedCFF_fonts[ns][fontName];

		if (font) {
			return font;
		}

		for (const key in this._embbedCFF_fonts) {
			if (this._embbedCFF_fonts[key][fontName]) {
				return this._embbedCFF_fonts[key][fontName];
			}
		}
		return DeviceFontManager.getDeviceFont(fontName);
	}

	public static defineFont(fontName: string, ns: string = AssetBase.DEFAULT_NAMESPACE) {

		//console.log('[DefaultFontManager] - defineFont', fontName, 'deviceFont:', this.deviceFontsLoading);

		this._registered_fonts || (this._registered_fonts = {});
		this._registered_fonts[ns] || (this._registered_fonts[ns] = {});

		if (this.deviceFontsLoading) {
			return DeviceFontManager.getDeviceFont(fontName);
		}

		let font: Font = this._registered_fonts[ns][fontName];

		if (font) {
			return font;
		}

		font = new Font();
		font.name = fontName;

		if (this._namespaces.indexOf(ns) === -1) {
			this._namespaces.push(ns);
		}

		this._registered_fonts[ns][fontName] = font;

		return font;
	}

	public static registerFontForClassName(font: Font, className: string) {
		this._registered_fonts_by_className[className] = font;
	}

	public static getFont(fontName: string, namespace: string = undefined): Font {

		//console.log('[DefaultFontManager] - getFont', fontName);

		if (!fontName) {
			return DeviceFontManager.getDeviceFont(fontName);
		}

		// hack for dynamic fonts: first check if reguested font-name is a classname that was registered
		if (this._registered_fonts_by_className[fontName]) {
			return this._registered_fonts_by_className[fontName];
		}

		const ns = namespace || AssetBase.DEFAULT_NAMESPACE;

		this._registered_fonts || (this._registered_fonts = {});
		this._registered_fonts[ns] || (this._registered_fonts[ns] = {});

		const font: Font = this._registered_fonts[ns][fontName];

		if (font) {
			return font;
		} else if (this._namespaces.length > 0 && !namespace) {
			// lookup over all NS
			for (const ns of this._namespaces) {
				if (this._registered_fonts[ns][fontName]) {
					return this._registered_fonts[ns][fontName];
				}
			}
		}
		return DeviceFontManager.getDeviceFont(fontName);
	}

	public static clearAll() {
		this.deviceFontsLoading = false;
		this._registered_fonts = {};
	}

}