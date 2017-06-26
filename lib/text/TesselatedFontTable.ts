import {AssetBase, AttributesBuffer, AttributesView} from "@awayjs/core";

import {GraphicsPath, GraphicsFactoryStrokes, JointStyle, CapsStyle, DrawMode, GraphicsStrokeStyle} from "@awayjs/graphics";

import {TesselatedFontChar} from "./TesselatedFontChar";
import {IFontTable} from "./IFontTable";
import {TextFormat} from "./TextFormat";
import {TextShape} from "./TextShape";

import {TextField} from "../display/TextField";
/**
 * GraphicBase wraps a TriangleElements as a scene graph instantiation. A GraphicBase is owned by a Sprite object.
 *
 *
 * @see away.base.TriangleElements
 * @see away.entities.Sprite
 *
 * @class away.base.GraphicBase
 */
export class TesselatedFontTable extends AssetBase implements IFontTable
{
	public static assetType:string = "[asset TesselatedFontTable]";
	private _font_chars:Array<TesselatedFontChar>;
	public _font_chars_dic:Object;
	private _font_em_size:number;
	private _whitespace_width:number;
	private _offset_x:number;
	private _offset_y:number;
	private _ascent:number;
	private _descent:number;
	public _current_size:number;
	public _size_multiply:number;
	private _charDictDirty:Boolean;
	private _usesCurves:boolean;
	private _opentype_font:any;
	
	public fallbackTable:IFontTable;

	//TODO test shader picking
//		public get shaderPickingDetails():boolean
//		{
//
//			return this.sourceEntity.shaderPickingDetails;
//		}

	/**
	 * Creates a new TesselatedFont object
	 * If a opentype_font object is passed, the chars will get tessellated whenever requested.
	 * If no opentype font object is passed, it is expected that tesselated chars
	 */
	constructor(opentype_font:any=null)
	{
		super();
		this._font_chars = [];
		this._font_chars_dic = new Object();
		this._current_size=0;
		this._size_multiply=0;
		this._ascent=0;
		this._descent=0;
		this._usesCurves=false;

		if(opentype_font){
			this._opentype_font=opentype_font;

			/*
			 console.log("head.yMax "+head.yMax);
			 console.log("head.yMin "+head.yMin);
			 console.log("font.numGlyphs "+font.numGlyphs);
			 console.log('Ascender', font.tables.hhea.ascender);
			 console.log('Descender', font.tables.hhea.descender);
			 console.log('Typo Ascender', font.tables.os2.sTypoAscender);
			 console.log('Typo Descender', font.tables.os2.sTypoDescender);
			 */
			//this._ascent=this._opentype_font.tables.hhea.ascender;
			//this._descent=this._opentype_font.tables.hhea.descender;
			this._font_em_size=72;
			this._current_size=0;
			this._size_multiply=0;
			return;
		}
	}

	public hasChar(char_code:string):boolean
	{
		return this._font_chars_dic[char_code]!=null;
	}

	public changeOpenTypeFont(newOpenTypeFont:any, tesselateAllOld:boolean=true)
	{
		if((tesselateAllOld)&&(this._opentype_font)){
			//todo: make sure all available chars are tesselated
		}
		// todo: when updating a font we must take care that they are compatible in terms of em_size
		this._opentype_font = newOpenTypeFont;
	}
	public initFontSize(font_size:number)
	{
		if(this.fallbackTable)
			this.fallbackTable.initFontSize(font_size);
		if(this._current_size==font_size) return;
		this._current_size = font_size;
		this._size_multiply= font_size/this._font_em_size;
	}

	public getCharVertCnt(char_code:string):number
	{

		var tesselated_font_char:TesselatedFontChar = this._font_chars_dic[char_code];
		if(tesselated_font_char){
			return tesselated_font_char.fill_data.length;
		}

		return 0;
	}
	public getCharWidth(char_code:string):number
	{
		if(char_code=="32"){
			return this._whitespace_width*this._size_multiply;
		}
		var tesselated_font_char:TesselatedFontChar = this._font_chars_dic[char_code];
		if(tesselated_font_char){
			return tesselated_font_char.char_width*this._size_multiply;
		}
		return 0;
	}

	public get usesCurves():boolean
	{
		return this._usesCurves;
	}

	public getLineHeight():number
	{
		return this._current_size;
	}

	public get assetType():string
	{
		return TesselatedFontTable.assetType;
	}
	/**
	 *
	 */
	public dispose():void
	{

	}

	get ascent():number {
		return this._ascent;
	}

	set ascent(value:number){
		this._ascent=value;
	}
	get descent():number {
		return this._descent;
	}

	set descent(value:number){
		this._descent=value;
	}

	get offset_x():number {
		return this._offset_x;
	}

	set offset_x(value:number){
		this._offset_x=value;
	}
	get offset_y():number {
		return this._offset_y;
	}

	set offset_y(value:number){
		this._offset_y=value;
	}
	public get_font_chars():Array<TesselatedFontChar>
	{
		return this._font_chars
	}
	public get_font_em_size():number
	{
		return this._font_em_size
	}
	public set_whitespace_width(value:number):void
	{
		this._whitespace_width=value;
	}
	public get_whitespace_width():number
	{
		return this._whitespace_width
	}
	public set_font_em_size(font_em_size:number):void
	{
		this._font_em_size=font_em_size;
	}


	public fillTextRun(tf:TextField, format:TextFormat, startWord:number, wordCnt:number) {

		var textShape:TextShape=tf.getTextShapeForIdentifierAndFormat(format.color.toString(), format);

		var charGlyph:TesselatedFontChar;
		var w:number=0;
		var w_len:number=startWord + (wordCnt*5);
		var char_vertices:AttributesBuffer;
		var c:number=0;
		var c_len:number=0;
		var x:number=0;
		var y:number=0;
		var startIdx:number=0;
		var buffer:Float32Array;
		var v:number;
		// loop over all the words and create the text data for it
		// each word provides its own start-x and start-y values, so we can just ignore whitespace-here
		for (w = startWord; w < w_len; w+=5) {
			startIdx=tf.words[w];
			x=tf.words[w+1];
			y=tf.words[w+2];
			c_len=startIdx + tf.words[w+4];
			for (c = startIdx; c < c_len; c++) {
				if(tf.chars_codes[c]!=32){
					charGlyph=this.getChar(tf.chars_codes[c].toString());
					if(!charGlyph && this.fallbackTable) {
						charGlyph = (<TesselatedFontTable>this.fallbackTable).getChar(tf.chars_codes[c].toString());
					}
					if(charGlyph){
						char_vertices = charGlyph.fill_data;
						buffer = new Float32Array(char_vertices.buffer);
						if(this.usesCurves) {
							for (v = 0; v < char_vertices.count; v++) {
								textShape.verts[textShape.verts.length] = buffer[v * 3] * this._size_multiply + x;
								textShape.verts[textShape.verts.length] = buffer[v * 3 + 1] * this._size_multiply + y;
								textShape.verts[textShape.verts.length] = buffer[v * 3 + 2];
							}
						}
						else {
							for (v = 0; v < char_vertices.count; v++) {
								textShape.verts[textShape.verts.length] = buffer[v * 2] * this._size_multiply + x;
								textShape.verts[textShape.verts.length] = buffer[v * 2 + 1] * this._size_multiply + y;
							}
						}
						x+=charGlyph.char_width * this._size_multiply;
						// todo: handle kerning
					}
					else{
						console.log("TesselatedFontTable: Error: char not found in fontTable");
					}
				}
			}

		}


	}


	/**
	 *
	 */
	public getChar(name:string):TesselatedFontChar
	{
		if(this._font_chars_dic[name]==null){
			if(this._opentype_font){
				//console.log("get char for '"+String.fromCharCode(parseInt(name))+"'. char does not exists yet. try creating it from opentype.");
				var thisGlyph=this._opentype_font.charToGlyph(String.fromCharCode(parseInt(name)));
				if(thisGlyph){
					//console.log("got the glyph from opentype");
					if(true){//todo: only do this for webGL
						var thisPath=thisGlyph.getPath();
						var awayPath:GraphicsPath=new GraphicsPath();
						var i=0;
						var len=thisPath.commands.length;

						//awayPath.lineTo(0, 0);
						//awayPath.moveTo(0,0);//-100);
						//awayPath.curveTo(100, 250, 200,0);
						//awayPath.lineTo(150, 100);
						//awayPath.moveTo(0,20);
						//awayPath.curveTo(100, 270, 200,20);
						//awayPath.moveTo(0,-20);
						//awayPath.moveTo(0,-10);
						//awayPath.curveTo(100, -110, 200,-10);


						var startx:number=0;
						var starty:number=0;
						for(i=0;i<len;i++){
							var cmd = thisPath.commands[i];
							if (cmd.type === 'M') {
								awayPath.moveTo(cmd.x, cmd.y);
								startx=cmd.x;
								starty=cmd.y;
							}
							else if (cmd.type === 'L') {	awayPath.lineTo(cmd.x, cmd.y);}
							else if (cmd.type === 'Q') {	awayPath.curveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);}
							else if (cmd.type === 'C') {	awayPath.cubicCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);}
							else if (cmd.type === 'Z') {	awayPath.lineTo(startx, starty);}
						}


						awayPath.style = new  GraphicsStrokeStyle(0xff0000, 1, 1, JointStyle.MITER, CapsStyle.NONE, 100);

						var final_vert_list:Array<number>=[];
						//todo
						GraphicsFactoryStrokes.draw_pathes([awayPath], final_vert_list, false);
						var attributesView:AttributesView = new AttributesView(Float32Array, 3);
						attributesView.set(final_vert_list);
						var attributesBuffer:AttributesBuffer = attributesView.attributesBuffer;
						attributesView.dispose();

						var tesselated_font_char:TesselatedFontChar = new TesselatedFontChar(attributesBuffer, null);
						tesselated_font_char.char_width=(thisGlyph.advanceWidth*(1 / thisGlyph.path.unitsPerEm * 72));
						//console.log("tesselated_font_char.char_width "+tesselated_font_char.char_width);
						this._font_chars.push(tesselated_font_char);
						this._font_chars_dic[name]=tesselated_font_char;
					}
				}
			}
		}
		return this._font_chars_dic[name];
	}
	/**
	 *
	 */
	public setChar(name:string, char_width:number, fills_data:AttributesBuffer=null, stroke_data:AttributesBuffer=null, uses_curves:boolean=false):void
	{
		if((fills_data==null)&&(stroke_data==null))
			throw("TesselatedFontTable: trying to create a TesselatedFontChar with no data (fills_data and stroke_data is null)");
		if(this._font_chars.length>0){
			if(uses_curves!=this._usesCurves){
				throw("TesselatedFontTable: Can not set different types of graphic-glyphs (curves vs non-cuves) on the same FontTable!");
			}
		}
		else{
			this._usesCurves=uses_curves;
		}
		var tesselated_font_char:TesselatedFontChar = new TesselatedFontChar(fills_data, stroke_data);
		tesselated_font_char.char_width=char_width;
		this._font_chars.push(tesselated_font_char);
		this._font_chars_dic[name]=tesselated_font_char;
	}
	public buildTextRuns(textRuns:Array<Array<number>>, output_verts:Array<Array<number>>):void
	{
		if((textRuns.length*2)!=(output_verts.length))
			throw("Invalid data passed to TesselatedFontTable.buildTextRuns(). output_verts.length is not double textRuns.length.")

		var i:number=0;
		var font_size:number=0;
		var drawMode:number=0;
		var charCode:number=0;
		var xpos:number=0;
		var ypos:number=0;
		var runCnt:number=0;
		var runLen:number=0;
		var vertCnt:number=0;
		var len:number=textRuns.length;
		var textrun:Array<number>;
		var thisChar:TesselatedFontChar;
		for (i=0;i<len;i++){
			textrun=textRuns[i];
			font_size=textrun[0];
			drawMode=textrun[1];
			ypos=textrun[2];
			runLen=textrun.length;
			for (runCnt=3;runCnt<runLen;runCnt+=2){
				charCode=textrun[runCnt];
				xpos=textrun[runCnt+1];
				thisChar=this.getChar(charCode.toString());
				if((drawMode==DrawMode.BOTH)||(drawMode==DrawMode.STROKE)){
					if(output_verts[i*2]==null){
						throw("Trying to render strokes for a textrun, but no output_vert list was set for this textrun strokes")
					}


				}
				if((drawMode==DrawMode.BOTH)||(drawMode==DrawMode.FILL)){
					if(output_verts[i*2+1]==null){
						throw("Trying to render fills for a textrun, but no output_vert list was set for this textrun fills")
					}

				}
			}

		}
	}

}