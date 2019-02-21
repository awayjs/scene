import {TesselatedFontTable} from "../text/TesselatedFontTable";
import {Font} from "../text/Font";
import {AssetBase} from "@awayjs/core";
export class DefaultFontManager
{
	private static _default_font:Font;
	private static _registered_fonts:any={};
	public static shared_fonts_ns:string;

	public static getDefaultFont():Font
	{
		if(DefaultFontManager._default_font==null){
			DefaultFontManager.setDefaultFont();
		}
		return DefaultFontManager._default_font;
	}
	public static applySharedFonts(ns:string)
	{
        if(ns==DefaultFontManager.shared_fonts_ns)
            return;
        if(!DefaultFontManager._registered_fonts[ns]){
            DefaultFontManager._registered_fonts[ns]={};
        }
        if(!DefaultFontManager._registered_fonts[DefaultFontManager.shared_fonts_ns]){
            DefaultFontManager._registered_fonts[DefaultFontManager.shared_fonts_ns]={};
        }
        if(!DefaultFontManager._default_font){
            if(DefaultFontManager._registered_fonts[DefaultFontManager.shared_fonts_ns]["arial"]){
                DefaultFontManager._default_font=DefaultFontManager._registered_fonts[DefaultFontManager.shared_fonts_ns]["arial"];
            }
        }
        var fontsInSharedSWF=DefaultFontManager._registered_fonts[DefaultFontManager.shared_fonts_ns];
        for(var key in fontsInSharedSWF){
            if(!DefaultFontManager._registered_fonts[ns][key]){
                DefaultFontManager._registered_fonts[ns][key]=fontsInSharedSWF[key];
            }
            else{
                var len=DefaultFontManager._registered_fonts[DefaultFontManager.shared_fonts_ns][key].font_styles.length;
                for(var i:number=0; i<len;i++){
                    var fontStyle=DefaultFontManager._registered_fonts[DefaultFontManager.shared_fonts_ns][key].font_styles[i];
                    var oldTable=DefaultFontManager._registered_fonts[ns][key].get_font_table(fontStyle.name, TesselatedFontTable.assetType, null, false);
                    if(!oldTable)
                        DefaultFontManager._registered_fonts[ns][key].font_styles.push(fontStyle);
                    else{
                        if(oldTable.getGlyphCount()==0){
                            DefaultFontManager._registered_fonts[ns][key].replace_font_table(fontStyle.name, fontStyle);
                        }
                    }
                }
            } if(DefaultFontManager._registered_fonts[ns][key].font){
                DefaultFontManager._registered_fonts[ns][key]=fontsInSharedSWF[key];
            }
        }
	}

	public static getFont(fontName:string, ns:string=AssetBase.DEFAULT_NAMESPACE):Font{
        //console.warn("get font", fontName, DefaultFontManager._registered_fonts);
		if(!fontName)
            return DefaultFontManager.getDefaultFont();
        fontName=fontName.toString().toLowerCase();
        if(!DefaultFontManager._registered_fonts[ns]){
            DefaultFontManager._registered_fonts[ns]={};
        }
        if(ns==AssetBase.DEFAULT_NAMESPACE){  
            if(!DefaultFontManager._registered_fonts[DefaultFontManager.shared_fonts_ns]){
                DefaultFontManager._registered_fonts[DefaultFontManager.shared_fonts_ns]={};
            }       
            if(DefaultFontManager._registered_fonts[DefaultFontManager.shared_fonts_ns][fontName]){
                return DefaultFontManager._registered_fonts[DefaultFontManager.shared_fonts_ns][fontName];                
            }
            for (var key in DefaultFontManager._registered_fonts){               
                if(DefaultFontManager._registered_fonts[key][fontName]){
                    return DefaultFontManager._registered_fonts[key][fontName];                
                } 
            }
        }

		if(DefaultFontManager._registered_fonts[ns][fontName]){
			return DefaultFontManager._registered_fonts[ns][fontName];
		}
		var newFont:Font=new Font();
		newFont.name=fontName;
		//DefaultFontManager._registered_fonts[fontName.toString().split(" ")[0].toLowerCase()]=newFont;
		DefaultFontManager._registered_fonts[ns][fontName]=newFont;
		return newFont;
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

}