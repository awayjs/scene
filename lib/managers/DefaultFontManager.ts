import {TesselatedFontTable} from "../text/TesselatedFontTable";
import {Font} from "../text/Font";
import {AssetBase} from "@awayjs/core";
export class DefaultFontManager
{
	private static _default_font:Font;
	private static _registered_fonts:any = {};
	private static _namespaces: string[] = [];

	public static shared_fonts_ns:string;

    public static deviceFont:Font=null;
    
	public static getDefaultFont():Font
	{
		if(DefaultFontManager._default_font==null){
			DefaultFontManager.setDefaultFont();
		}
		return DefaultFontManager._default_font;
	}

	public static applySharedFonts(ns:string)
	{
        if(ns == this.shared_fonts_ns) {
			return;
		}

        if(!this._registered_fonts[ns]) {
            this._registered_fonts[ns] = {};
		}

        if(!this._registered_fonts[this.shared_fonts_ns]){
            this._registered_fonts[this.shared_fonts_ns]={};
		}

        if(!this._default_font){
            if(this._registered_fonts[this.shared_fonts_ns]["arial"]){
                this._default_font = this._registered_fonts[this.shared_fonts_ns]["arial"];
            }
		}

        const fontsInSharedSWF = this._registered_fonts[this.shared_fonts_ns];
        for(var key in fontsInSharedSWF){
            if(!this._registered_fonts[ns][key]){
                this._registered_fonts[ns][key] = fontsInSharedSWF[key];
            } else {
                const len = this._registered_fonts[this.shared_fonts_ns][key].font_styles.length;
				
				for (let i = 0; i < len; i++ ) {
                    const fontStyle = this._registered_fonts[this.shared_fonts_ns][key].font_styles[i];
                    const oldTable = this._registered_fonts[ns][key].get_font_table(fontStyle.name, TesselatedFontTable.assetType, null, false);
					
					if (!oldTable) {
						this._registered_fonts[ns][key].font_styles.push(fontStyle);
					} else if (!oldTable.getGlyphCount()) {
						this._registered_fonts[ns][key].replace_font_table(fontStyle.name, fontStyle);				
                    }
				}
			} 
			
			if(this._registered_fonts[ns][key].font){
                this._registered_fonts[ns][key] = fontsInSharedSWF[key];
            }
        }
	}

	public static defineFont(fontName: string, ns: string = AssetBase.DEFAULT_NAMESPACE) {		
		this._registered_fonts || (this._registered_fonts = {});
		this._registered_fonts[ns] || (this._registered_fonts[ns] = {});

		fontName = (fontName + "").toLowerCase().replace(/bold|italic|regular/g, "").trim();
		
		const alias = fontName.replace(/ |-/g, '');

		let font: Font = this._registered_fonts[ns][fontName] || this._registered_fonts[ns][alias];

		if (font) {
			return font;
		}

		if(this._namespaces.indexOf(ns) === -1) {
			this._namespaces.push(ns);
		}

		font = new Font();
		font.name = fontName;

		if(!this._default_font)
			this._default_font = font;
		
		this._registered_fonts[ns][fontName] = font;
		this._registered_fonts[ns][alias] = font;

		return font;
	}

	public static getFont(fontName:string, namespace:string = undefined):Font{
        //console.warn("get font", fontName, DefaultFontManager._registered_fonts);
		if(!fontName)
			return DefaultFontManager.getDefaultFont();

		const ns = namespace || AssetBase.DEFAULT_NAMESPACE;

		fontName = (fontName + "").toLowerCase().replace(/bold|italic|regular|-/g, "").trim();

		this._registered_fonts || (this._registered_fonts = {});
		this._registered_fonts[ns] || (this._registered_fonts[ns] = {});

		let font: Font = this._registered_fonts[ns][fontName];

		if (font) {
			return font;
		} else if(this._namespaces.length > 1 && !namespace) {
			// lookup over all NS
			for(const ns of this._namespaces) {
				if(this._registered_fonts[ns][fontName]) {
					return this._registered_fonts[ns][fontName];
				}
			}
		} else if (this.shared_fonts_ns) {
			font = this._registered_fonts[this.shared_fonts_ns][fontName];

			if(font) {
				return font;
			}
		}

		return DefaultFontManager.getDefaultFont();
	}


	private static setDefaultFont(font:Font=null):void
	{
		if(!font)
			font=new Font();
		DefaultFontManager._default_font=font;
		/*
		var allchars=[];
		//allchars[cnt1++] = ['33',[0,0,226,67,0,192,11,68,127,127,0,0,0,128,177,67,0,80,137,68,127,127,0,0,0,0,212,67,0,192,204,68,127,127,0,0,0,0,212,67,0,192,204,68,127,127,0,0,0,128,177,67,0,80,137,68,127,127,0,0,0,0,129,67,0,192,204,68,127,127,0,0,0,0,129,67,0,192,204,68,127,127,0,0,0,128,177,67,0,80,137,68,127,127,0,0,0,0,100,67,0,192,11,68,127,127,0,0,0,0,100,67,0,192,11,68,127,127,0,0,0,128,177,67,0,80,137,68,127,127,0,0,0,0,226,67,0,192,11,68,127,127,0,0,0,0,221,67,0,0,0,69,127,127,0,0,0,0,170,67,0,208,242,68,127,127,0,0,0,0,110,67,0,0,0,69,127,127,0,0,0,0,110,67,0,0,0,69,127,127,0,0,0,0,170,67,0,208,242,68,127,127,0,0,0,0,110,67,0,160,229,68,127,127,0,0,0,0,110,67,0,160,229,68,127,127,0,0,0,0,170,67,0,208,242,68,127,127,0,0,0,0,221,67,0,160,229,68,127,127,0,0,0,0,221,67,0,160,229,68,127,127,0,0,0,0,170,67,0,208,242,68,127,127,0,0,0,0,221,67,0,0,0,69,127,127]]
		var i:number=0;
		for(i=0; i<cnt1;i++){
			var vertexBuffer:AttributesBuffer = new AttributesBuffer(20, allchars[i][1].length / 20);
			vertexBuffer.bufferView = new Uint8Array(<ArrayBuffer> allchars[i][1]);

			var curve_elements:TriangleElements = new TriangleElements(vertexBuffer);

			curve_elements.setPositions(new Float2Attributes(vertexBuffer));
			curve_elements.setCustomAttributes("curves", new Float3Attributes(vertexBuffer));

			//add UVs if they exist in the data
			if (attr_count == 28)
				curve_elements.setUVs(new Float2Attributes(vertexBuffer));

			new_font_style.setChar(font_style_char.toString(), curve_elements, char_width);
			DefaultFontManager._default_font_table = new TesselatedFontTable();
		}
		*/
		//DefaultFontManager._default_font_table.
	}
    public static clearAll(){
        DefaultFontManager._default_font=null;
        DefaultFontManager._registered_fonts={};
        DefaultFontManager.shared_fonts_ns=null;
    }

}