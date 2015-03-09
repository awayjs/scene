
import NamedAssetBase				= require("awayjs-core/lib/library/NamedAssetBase");


import IAsset						= require("awayjs-core/lib/library/IAsset");
import AssetType					= require("awayjs-core/lib/library/AssetType");
import TesselatedFontTable			= require("awayjs-display/lib/text/TesselatedFontTable");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import CurveSubGeometry				= require("awayjs-core/lib/data/CurveSubGeometry");
/**
 * The TextFormat class represents character formatting information. Use the
 * TextFormat class to create specific text formatting for text fields. You
 * can apply text formatting to both static and dynamic text fields. The
 * properties of the TextFormat class apply to device and embedded fonts.
 * However, for embedded fonts, bold and italic text actually require specific
 * fonts. If you want to display bold or italic text with an embedded font,
 * you need to embed the bold and italic variations of that font.
 *
 * <p> You must use the constructor <code>new TextFormat()</code> to create a
 * TextFormat object before setting its properties. When you apply a
 * TextFormat object to a text field using the
 * <code>TextField.defaultTextFormat</code> property or the
 * <code>TextField.setTextFormat()</code> method, only its defined properties
 * are applied. Use the <code>TextField.defaultTextFormat</code> property to
 * apply formatting BEFORE you add text to the <code>TextField</code>, and the
 * <code>setTextFormat()</code> method to add formatting AFTER you add text to
 * the <code>TextField</code>. The TextFormat properties are <code>null</code>
 * by default because if you don't provide values for the properties, Flash
 * Player uses its own default formatting. The default formatting that Flash
 * Player uses for each property(if property's value is <code>null</code>) is
 * as follows:</p>
 *
 * <p>The default formatting for each property is also described in each
 * property description.</p>
 */
class TesselatedFontChar
{

	/**
	 * The width of the char
	 */
	public char_width:number;

	/**
	 * SubGeometry for this char
	 */
	public subgeom:CurveSubGeometry;

	/**
	 * the char_codes that this geom has kerning set for
	 */
	public kerningCharCodes:Array<number>=new Array<number>();
	/**
	 * the kerning values per char_code
	 */
	public kerningValues:Array<number>=new Array<number>();


	constructor(subgeom:CurveSubGeometry)
	{
		this.char_width=0;
		this.subgeom = subgeom;
		if (this.subgeom != null) {
			var positions2:Array<number> = this.subgeom.positions;
			for (var v:number = 0; v < positions2.length/3; v++) {
				if(positions2[v*3]>this.char_width)
					this.char_width=positions2[v*3];
			}
		}
	}

}

export = TesselatedFontChar;