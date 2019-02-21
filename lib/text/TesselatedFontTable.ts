import {Matrix, AssetBase, Point, Rectangle} from "@awayjs/core";

import {ImageSampler, AttributesBuffer, Float2Attributes, AttributesView, BitmapImage2D} from "@awayjs/stage";

import {Graphics, GraphicsPath, Shape, TriangleElements, GraphicsFactoryStrokes, GraphicsFactoryFills, JointStyle, CapsStyle, DrawMode, GraphicsStrokeStyle, GraphicsFactoryHelper} from "@awayjs/graphics";

import {Style} from "@awayjs/renderer";
import {MaterialBase, MethodMaterial} from "@awayjs/materials";
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
	public vertical_glyph_offset:number;
	private _charDictDirty:Boolean;
	private _usesCurves:boolean;
	private _opentype_font:any;
	private _glyphIdxToChar:any;

	private _fntSizeLimit:number=-1;
	private _fnt_channels:BitmapImage2D[];

	public font:any;
	public fallbackTable:IFontTable;

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
		this._glyphIdxToChar={};
		this._whitespace_width=0;
		this._fnt_channels=[];
		this.vertical_glyph_offset=0;

		if(opentype_font){
			this._opentype_font=opentype_font;
			/*
            console.log("head.yMax ",opentype_font);
			
			 console.log("head.yMax "+opentype_font.tables.head.yMax);
			 console.log("head.yMin "+opentype_font.tables.head.yMin);
			 console.log("font.numGlyphs "+opentype_font.numGlyphs);
			 console.log('Ascender', opentype_font.tables.hhea.ascender);
			 console.log('Descender', opentype_font.tables.hhea.descender);
			 console.log('Typo Ascender', opentype_font.tables.os2.sTypoAscender);
			 console.log('Typo Descender', opentype_font.tables.os2.sTypoDescender);
			 */
			this._font_em_size=72;//2048;
            this._ascent=opentype_font.tables.hhea.ascender/(this._opentype_font.unitsPerEm/72);///this._font_em_size;
            this._descent=-2+opentype_font.tables.hhea.descender/(this._opentype_font.unitsPerEm/72);
           /* console.log("this._ascent", this._ascent);
            console.log("this._descent", this._descent);(this._ascent-this.descent)
            console.log("this._ascent-this._descent", this._ascent-this.descent)*/
			this._current_size=0;
            this._size_multiply=0;
            
            var thisGlyph=this._opentype_font.charToGlyph(String.fromCharCode(32));
            if(thisGlyph){
                //this._whitespace_width=(opentype_font.tables.hhea.advanceWidthMax/72);//*(1 / thisGlyph.path.unitsPerEm * 72));
                this._whitespace_width=thisGlyph.advanceWidth/(this._opentype_font.unitsPerEm/72);
                //console.log("this._whitespace_width", thisGlyph.advanceWidth);
            }
			return;
		}
	}

	public addFNTChannel(mat:BitmapImage2D){
		this._fnt_channels.push(mat);
	}
	public getGlyphCount():number{
        return this._font_chars.length;
	}
	
	private _drawDebugRect(glyph_verts:number[], minx:number, maxx:number,miny:number,maxy:number,){
		
			// left
			glyph_verts[glyph_verts.length]=minx;
			glyph_verts[glyph_verts.length]=miny;
			
			glyph_verts[glyph_verts.length]=minx+1;
			glyph_verts[glyph_verts.length]=maxy;

			glyph_verts[glyph_verts.length]=minx;
			glyph_verts[glyph_verts.length]=maxy;
			
			glyph_verts[glyph_verts.length]=minx;
			glyph_verts[glyph_verts.length]=miny;
			
			glyph_verts[glyph_verts.length]=minx+1;
			glyph_verts[glyph_verts.length]=miny;
			
			glyph_verts[glyph_verts.length]=minx+1;
			glyph_verts[glyph_verts.length]=maxy;

			// right
			
			glyph_verts[glyph_verts.length]=maxx;
			glyph_verts[glyph_verts.length]=miny;
			
			glyph_verts[glyph_verts.length]=maxx-1;
			glyph_verts[glyph_verts.length]=maxy;

			glyph_verts[glyph_verts.length]=maxx;
			glyph_verts[glyph_verts.length]=maxy;
			
			glyph_verts[glyph_verts.length]=maxx;
			glyph_verts[glyph_verts.length]=miny;
			
			glyph_verts[glyph_verts.length]=maxx-1;
			glyph_verts[glyph_verts.length]=miny;
			
			glyph_verts[glyph_verts.length]=maxx-1;
			glyph_verts[glyph_verts.length]=maxy;

			// top
			glyph_verts[glyph_verts.length]=minx+1;
			glyph_verts[glyph_verts.length]=miny;
			
			glyph_verts[glyph_verts.length]=minx+1;
			glyph_verts[glyph_verts.length]=miny+1;

			glyph_verts[glyph_verts.length]=maxx-1;
			glyph_verts[glyph_verts.length]=miny;
			
			glyph_verts[glyph_verts.length]=minx+1;
			glyph_verts[glyph_verts.length]=miny+1;
			
			glyph_verts[glyph_verts.length]=maxx-1;
			glyph_verts[glyph_verts.length]=miny+1;
			
			glyph_verts[glyph_verts.length]=maxx-1;
			glyph_verts[glyph_verts.length]=miny;

			
			// bottom
			glyph_verts[glyph_verts.length]=minx+1;
			glyph_verts[glyph_verts.length]=maxy;
			
			glyph_verts[glyph_verts.length]=minx+1;
			glyph_verts[glyph_verts.length]=maxy-1;

			glyph_verts[glyph_verts.length]=maxx-1;
			glyph_verts[glyph_verts.length]=maxy;
			
			glyph_verts[glyph_verts.length]=minx+1;
			glyph_verts[glyph_verts.length]=maxy-1;
			
			glyph_verts[glyph_verts.length]=maxx-1;
			glyph_verts[glyph_verts.length]=maxy-1;
			
			glyph_verts[glyph_verts.length]=maxx-1;
			glyph_verts[glyph_verts.length]=maxy;
	}
	public generateFNTTextures(padding:number, fontSize:number, texSize:number):Shape[]{
		console.log("generateFNTTextures");
		if(fontSize){
			this._fntSizeLimit=fontSize;
			this.initFontSize(fontSize);

		}

		if(this._opentype_font){
			// 	if this was loaded from opentype, 
			//	we make sure all glyphs are tesselated first
			for(var g:number=0; g<this._opentype_font.glyphs.length;g++){
				var thisGlyph=this._opentype_font.charToGlyph(String.fromCharCode(this._opentype_font.glyphs.glyphs[g].unicode));//this._opentype_font.glyphs.glyphs[g].name);
				if(thisGlyph){
					var thisPath=thisGlyph.getPath();
					var awayPath:GraphicsPath=new GraphicsPath();
					var i=0;
					var len=thisPath.commands.length;
					var startx:number=0;
					var starty:number=0;
					var y_offset=this._ascent;
					for(i=0;i<len;i++){
						var cmd = thisPath.commands[i];
						//console.log("cmd", cmd.type, cmd.x, cmd.y, cmd.x1, cmd.y1, cmd.x2, cmd.y2);
						if (cmd.type === 'M') {
							awayPath.moveTo(cmd.x, cmd.y+y_offset);
							startx=cmd.x;
							starty=cmd.y+y_offset;
						}
						else if (cmd.type === 'L') {	awayPath.lineTo(cmd.x, cmd.y+y_offset);}
						else if (cmd.type === 'Q') {	awayPath.curveTo(cmd.x1, cmd.y1+y_offset, cmd.x, cmd.y+y_offset);}
						else if (cmd.type === 'C') {	awayPath.cubicCurveTo(cmd.x1, cmd.y1+y_offset, cmd.x2, cmd.y2+y_offset, cmd.x, cmd.y+y_offset);}
						else if (cmd.type === 'Z') {	awayPath.lineTo(startx, starty);}
					}                        
					var tesselated_font_char:TesselatedFontChar = new TesselatedFontChar(null, null, awayPath);
					tesselated_font_char.char_width=(thisGlyph.advanceWidth*(1 / thisGlyph.path.unitsPerEm * 72));
					tesselated_font_char.fill_data=GraphicsFactoryFills.pathToAttributesBuffer(awayPath, true);
					if(!tesselated_font_char.fill_data){
						console.log("error tesselating opentype glyph", this._opentype_font.glyphs.glyphs[g]);
						//return null;
					}
					else{
						this._font_chars.push(tesselated_font_char);
						this._font_chars_dic[this._opentype_font.glyphs.glyphs[g].unicode]=tesselated_font_char;

					}
					//console.log("unicode:",this._opentype_font.glyphs.glyphs[g].unicode);
					//console.log("name:",this._opentype_font.glyphs.glyphs[g].name);
				
				}
				else{
					console.log("no char found for", this._opentype_font.glyphs.glyphs[g]);
				}
			}
		}
		var char_vertices:AttributesBuffer;
		var x:number=0;
		var y:number=0;
		var buffer:Float32Array;
		var v:number;
		var glyph_verts:number[][]=[[]];
		var channel_idx:number=0;
		var maxSize=0;
		var allChars:any[]=[];
		var allWidth=0;

		var maxy:number=Number.MIN_VALUE;
		var maxx:number=Number.MIN_VALUE;
		var miny:number=Number.MAX_VALUE;
		var minx:number=Number.MAX_VALUE;
		var tmpx:number=0;
		var tmpy:number=0;
		
		// 	step1: loop over all chars, get their bounds and sort them by there height
		//	done without applying any font-scale to the glyphdata
		var allAreas:number=0;
        for(var i:number=0; i<this._font_chars.length;i++){
			char_vertices = this._font_chars[i].fill_data;
			//console.log("got the glyph from opentype", this._opentype_font.glyphs.glyphs[g]);
			buffer = new Float32Array(char_vertices.buffer);
			maxy=Number.MIN_VALUE;
			maxx=Number.MIN_VALUE;
			miny=Number.MAX_VALUE;
			minx=Number.MAX_VALUE;
			tmpx=0;
			tmpy=0;
			for (v = 0; v < char_vertices.count; v++) {
				tmpx=(buffer[v * 2]);
				tmpy=(buffer[v * 2 + 1]);
				if(tmpx<minx)	minx=tmpx;
				if(tmpx>maxx)	maxx=tmpx;
				if(tmpy<miny)	miny=tmpy;
				if(tmpy>maxy)	maxy=tmpy;
			}
			this._font_chars[i].fnt_rect=new Rectangle(
				(minx)/(this._font_chars[i].char_width),
				(miny)/(this._font_em_size),
				(maxx-minx)/(this._font_chars[i].char_width),
				(maxy-miny)/(this._font_em_size));

			allWidth+=(maxx-minx)+padding*2;
			allAreas+=(maxx-minx+padding+padding)*(maxy-miny+padding+padding);
			allChars[allChars.length]={
				idx:i,
				minx:minx,
				miny:miny,
				width:maxx-minx,
				height:maxy-miny
			}
		}
		allChars.sort(function(a,b){
			return a.height>b.height?-1:1;
		});


		// now allChars contains all glyphs sorted by height 

		var curHeight:number=0;
		maxSize=texSize;
		var size_multiply:number=1;
		if(fontSize){
			this.initFontSize(fontSize);			
			size_multiply=this._size_multiply;
		}
		else{
			// 	figure out the optiomal fontSize so that the glyphs fill the texture

			//	imagine the spaces needed by all glyphs would be a perfect quat
			//	compare the width of that quat with the available width to have a first guess at fontSize

			// 	make the size slightly bigger as the estimate and check if all glyphs will fit
			//	if they do not fit, slightly reduce the scale.
			// 	repeat until all glyphs fit

			size_multiply=maxSize/(Math.sqrt(allAreas))*1.2;
			var invalid:boolean=true;
			var curCharHeight:number=0;
			while(invalid){
				invalid=false;
				x=0;
				y=padding;
				for(var i:number=0; i<allChars.length;i++){		
					curCharHeight=allChars[i].height*size_multiply;
					tmpx=0;
					tmpy=0;
					x+=padding;					
					if(x+allChars[i].width * size_multiply + padding>=maxSize){
						x=padding;
						y+=curHeight + padding*2;
						curHeight=0;
					}					
					if(curCharHeight>curHeight){
						curHeight=curCharHeight;
					}
					if(y+curCharHeight + padding*2>=maxSize){
						invalid=true;
						size_multiply=size_multiply*0.995;
						break;
					}
					x+=(allChars[i].width) * size_multiply+padding;		
				};
			}		
		}
		
		this.fntSizeLimit=size_multiply*this._font_em_size;	

		// collect the glyph-data:

		var font_char:TesselatedFontChar;
		x=0;
		y=padding;
        for(var i:number=0; i<allChars.length;i++){

			font_char=this._font_chars[allChars[i].idx];
			char_vertices = font_char.fill_data;
			buffer = new Float32Array(char_vertices.buffer);
			minx=allChars[i].minx;
			maxx=Number.MIN_VALUE;
			miny=allChars[i].miny;
			maxy=Number.MIN_VALUE;
			tmpx=0;
			tmpy=0;
			x+=padding;
			
			if(x+allChars[i].width * size_multiply + padding>=maxSize){
				x=padding;
				y+=curHeight + padding*2;
				curHeight=0;
			}
			allChars[i].height*=size_multiply;
			if(allChars[i].height>curHeight){
				curHeight=allChars[i].height;
			}
			if(y+curHeight + padding*2>=maxSize){
				x=padding;
				y=padding;
				curHeight=0;
				channel_idx++;
				glyph_verts[channel_idx]=[];
			}
			font_char.fnt_channel=channel_idx;
			for (v = 0; v < char_vertices.count; v++) {
				tmpx=((buffer[v * 2]-minx) * size_multiply) + x;
				tmpy=((buffer[v * 2 + 1]-miny) * size_multiply) + y;
				glyph_verts[channel_idx][glyph_verts[channel_idx].length] = tmpx;
				glyph_verts[channel_idx][glyph_verts[channel_idx].length] = tmpy;
				if(tmpx>maxx){
					maxx=tmpx;
				}
				if(tmpy>maxy){
					maxy=tmpy;
				}
			}
			font_char.fnt_uv=new Rectangle(x/maxSize, 1-(y/maxSize), (maxx-x)/maxSize, ((maxy-y)/maxSize));
			
			//this._drawDebugRect(glyph_verts[channel_idx], x, maxx, y, maxy);

			x+=(allChars[i].width) * size_multiply+padding;

		};
		var shapes:Shape[]=[];
        for(var i:number=0; i<glyph_verts.length;i++){
			var attr_length:number = 2;//(tess_fontTable.usesCurves)?3:2;
			var attributesView:AttributesView = new AttributesView(Float32Array, attr_length);
			attributesView.set(glyph_verts[i]);
			var vertexBuffer:AttributesBuffer = attributesView.attributesBuffer.cloneBufferView();
			attributesView.dispose();
			var elements = new TriangleElements(vertexBuffer);
			elements.setPositions(new Float2Attributes(vertexBuffer));
			var shape = Shape.getShape(elements);
			
			var sampler:ImageSampler = new ImageSampler();
			shape.style = new Style();

			var color=0xffffff;			
			var alpha=1;
			var obj=Graphics.get_material_for_color(color, alpha);

			shape.material = obj.material;
			if(obj.colorPos){
				shape.style.addSamplerAt(sampler, shape.material.getTextureAt(0));
				(<MaterialBase> shape.material).animateUVs=true;
				shape.style.uvMatrix = new Matrix(0, 0, 0, 0, obj.colorPos.x, obj.colorPos.y);
			}
			shapes[i]=shape;
		}
		return shapes;
		
    }
	public getRatio(size:number):number
	{
		return this._size_multiply;
	}
	public hasChar(char_code:string):boolean
	{
		var tesselated_font_char:TesselatedFontChar=this._font_chars_dic[name];
		if(tesselated_font_char==null){
			if(this._opentype_font){
				//console.log("get char for '"+String.fromCharCode(parseInt(name))+"'. char does not exists yet. try creating it from opentype.");
				var thisGlyph=this._opentype_font.charToGlyph(String.fromCharCode(parseInt(name)));
				if(thisGlyph){
                    return true;
                }
            }
        }
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
		//console.log("text-font-table: ",this._ascent, this._descent, this._font_em_size)
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
			return (Math.floor(this._whitespace_width*this._size_multiply*20))/20;
		}
		if(char_code=="9"){
			return (Math.floor(this._whitespace_width*this._size_multiply*8*20))/20;
		}
		var tesselated_font_char:TesselatedFontChar = this.getChar(char_code);
		if(tesselated_font_char){
			return (Math.floor(tesselated_font_char.char_width*this._size_multiply*20))/20;
		}
		else{
			if(char_code=="9679"){
				tesselated_font_char=this.createPointGlyph_9679();
				return (Math.floor(tesselated_font_char.char_width*this._size_multiply*20))/20;
			}
		}
		if(this.fallbackTable)
			return this.fallbackTable.getCharWidth(char_code);

		return 0;
	}

	public get usesCurves():boolean
	{
		return this._usesCurves;
	}

	public getLineHeight():number
	{
		var thisLineheighttest:number=this._size_multiply*(this._ascent-this.descent);
		return thisLineheighttest; // sf
		//return this._size_multiply*this._font_em_size;
	//	return (this._ascent+this._descent)*this._size_multiply;	// enable for icycle
	}
	public getUnderLineHeight():number
	{
		return this._size_multiply*(this._ascent-this.descent/2);
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

	get fntSizeLimit():number {
		return this._fntSizeLimit;
	}

	set fntSizeLimit(value:number){
		this._fntSizeLimit=value;
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

	public buildTextLineFromIndices(tf:TextField, format:TextFormat, x:number, y:number, indices:number[], advance:number[]):Point {

		var textShape:TextShape=tf.getTextShapeForIdentifierAndFormat(format.color.toString(), format);

		var origin_x=x;
		var origin_y=y;
		y -= this._ascent*this._size_multiply;//this.getLineHeight();
		var charGlyph:TesselatedFontChar;
		var char_vertices:AttributesBuffer;
		var c:number=0;
		var c_len:number=0;
		var startIdx:number=0;
		var buffer:Float32Array;
		var v:number;
		var size_multiply:number;
		var hack_x_mirror:boolean=false;

		var idx:number=0;
		var i:number=0;
		var i_len:number=indices.length;
		if(this._glyphIdxToChar[tf.assetNamespace]==null){
			console.log("no glyphIdx-map for textfield", tf.adaptee.assetNamespace);
			return new Point(0, 0);
		}
		// loop over all the words and create the text data for it
		// each word provides its own start-x and start-y values, so we can just ignore whitespace-here
		for (i = 0; i < i_len; i++) {
			idx=indices[i];

			charGlyph=this._glyphIdxToChar[tf.assetNamespace][idx];
			size_multiply=this._size_multiply;

			if(!charGlyph) {
				//console.log("no glyph found at idx", idx, "todo: support fallback fonts");
			}
			else{
				if(charGlyph.fill_data==null){
                    
                    if(charGlyph.fill_data_path.commands[0][0]==1 && charGlyph.fill_data_path.data[0][0]==0 && charGlyph.fill_data_path.data[0][1]==0){
                        charGlyph.fill_data_path.data[0].shift();
                        charGlyph.fill_data_path.data[0].shift();
                        charGlyph.fill_data_path.commands[0].shift();
                        charGlyph.fill_data_path.commands[0][0]=2;
                    }
                    charGlyph.fill_data=GraphicsFactoryFills.pathToAttributesBuffer(charGlyph.fill_data_path, true);
                }
				char_vertices = charGlyph.fill_data;
				if(char_vertices){
					buffer = new Float32Array(char_vertices.buffer);
					if(this.usesCurves) {
						for (v = 0; v < char_vertices.count; v++) {
							textShape.verts[textShape.verts.length] = buffer[v * 3] * size_multiply + x;
							textShape.verts[textShape.verts.length] = buffer[v * 3 + 1] * size_multiply + y;
							textShape.verts[textShape.verts.length] = buffer[v * 3 + 2];
						}
					}
					else {
						for (v = 0; v < char_vertices.count; v++) {
							textShape.verts[textShape.verts.length] = buffer[v * 2] * size_multiply + x;
							textShape.verts[textShape.verts.length] = buffer[v * 2 + 1] * size_multiply + y;
						}

					}
				}
			}
			x+=advance[i];// * size_multiply;
		}
		return new Point(x-origin_x, this.getLineHeight());


	}


	public fillTextRun(tf:TextField, format:TextFormat, startWord:number, wordCnt:number) {

		var useFNT:boolean=this._fntSizeLimit>=0 && (this._fntSizeLimit==0 || this._fntSizeLimit>=format.size);
		var textShape:TextShape=tf.getTextShapeForIdentifierAndFormat(format.color.toString()+useFNT.toString()+"0", format);

		var fntTextShapesByChannel:any={};
		var fntSelectedTextShapesByChannel:any={};
		var currentFNTTextShapeMap:any;

		var mat:MethodMaterial = new MethodMaterial(this._fnt_channels[0]);
		mat.bothSides = true;
		mat.alphaBlending = true;
		mat.useColorTransform = true;
		mat.style.sampler = new ImageSampler(false, true, true);
		textShape.fntMaterial=useFNT?mat:null;
		fntTextShapesByChannel[0]=textShape;
		var newFormat:TextFormat=format.clone();
		newFormat.color=0xffffff;
		var textShapeSelected:TextShape=tf.getTextShapeForIdentifierAndFormat(newFormat.color.toString()+useFNT.toString()+"0", newFormat);
		fntSelectedTextShapesByChannel[0]=textShapeSelected;
		var mat:MethodMaterial = new MethodMaterial(this._fnt_channels[0]);
		mat.bothSides = true;
		mat.alphaBlending = true;
		mat.useColorTransform = true;
		mat.style.sampler = new ImageSampler(false, true, true);
		textShapeSelected.fntMaterial=useFNT?mat:null;
		var currentTextShape:TextShape=null;
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
		var size_multiply:number;
		var hack_x_mirror:boolean=false;
		var select_start:number=tf.selectionBeginIndex;
		var select_end:number=tf.selectionEndIndex;
		if(tf.selectionEndIndex<tf.selectionBeginIndex){
			select_start=tf.selectionEndIndex;
			select_end=tf.selectionBeginIndex;
		}
		var start_x:number=0;
		if(newFormat.underline && (startWord+1)<tf.words.length){
			start_x=tf.words[startWord+1];
		}
		// loop over all the words and create the text data for it
		// each word provides its own start-x and start-y values, so we can just ignore whitespace-here
		for (w = startWord; w < w_len; w+=5) {
			startIdx=tf.words[w];
            x=tf.words[w+1];
            y=tf.words[w+2];
			if(this.name=="BoldStyle"){
				y-=0.2*this.getLineHeight();
			}
			else{
				//y-=0.03*this._current_size;
			}
			//todo: this is a temporary fix for sunflower `si` VoltMeter text vertical align
			if(format.font_name=="DJB Get Digital"){
				y-=2;
			}
			//y=tf.words[w+2]+(this.ascent-this.get_font_em_size())*this._size_multiply; // enable for icycle
			c_len=startIdx + tf.words[w+4];
			for (c = startIdx; c < c_len; c++) {
				hack_x_mirror=false;
				if(tf.chars_codes[c]==40){
					//tf.chars_codes[c]=41;
					//hack_x_mirror=true;
				}
				currentTextShape=(tf.isInFocus && c>=select_start && c<select_end )?textShapeSelected:textShape;
				if(tf.chars_codes[c]!=32 && tf.chars_codes[c]!=9){
					charGlyph=this.getChar(tf.chars_codes[c].toString());
					size_multiply=this._size_multiply;
					if(!charGlyph && this.fallbackTable) {
						charGlyph = (<TesselatedFontTable>this.fallbackTable).getChar(tf.chars_codes[c].toString());
						size_multiply=(<TesselatedFontTable>this.fallbackTable)._size_multiply;
					}
					if(charGlyph){

						if(useFNT){
							// the font should use fnt							
							currentFNTTextShapeMap=(tf.isInFocus && c>=select_start && c<select_end )?fntSelectedTextShapesByChannel:fntTextShapesByChannel;
							var curFormat=currentTextShape.format;
							var currentTextShapeFNT=currentFNTTextShapeMap[charGlyph.fnt_channel];
							if(!currentTextShapeFNT){								
								var newtextShape:TextShape=tf.getTextShapeForIdentifierAndFormat(curFormat.color.toString()+useFNT.toString()+charGlyph.fnt_channel.toString(), curFormat);
								var mat:MethodMaterial = new MethodMaterial(this._fnt_channels[charGlyph.fnt_channel]);
								mat.bothSides = true;
								mat.alphaBlending = true;
								mat.useColorTransform = true;
								mat.style.sampler = new ImageSampler(false, true, true);
								newtextShape.fntMaterial=mat;
								currentFNTTextShapeMap[charGlyph.fnt_channel]=newtextShape;
								currentTextShapeFNT=newtextShape;
							}
							var x1:number=x+((charGlyph.char_width * size_multiply)*charGlyph.fnt_rect.x);
							var x2:number=x1+((charGlyph.char_width * size_multiply)*charGlyph.fnt_rect.width);
							var y1:number=y+((this._font_em_size * size_multiply)*charGlyph.fnt_rect.y)
							var y2:number=y1+((this._font_em_size * size_multiply)*charGlyph.fnt_rect.height)
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = x1;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = y1;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = charGlyph.fnt_uv.x;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = charGlyph.fnt_uv.y;

							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = x2;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = y1;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = charGlyph.fnt_uv.x + charGlyph.fnt_uv.width;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = charGlyph.fnt_uv.y;


							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = x2;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = y2;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = charGlyph.fnt_uv.x + charGlyph.fnt_uv.width;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = charGlyph.fnt_uv.y - charGlyph.fnt_uv.height;

							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = x1;// 
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = y1;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = charGlyph.fnt_uv.x;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = charGlyph.fnt_uv.y;

							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = x1;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = y2;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = charGlyph.fnt_uv.x;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = charGlyph.fnt_uv.y- charGlyph.fnt_uv.height;;

							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = x2;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = y2;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = charGlyph.fnt_uv.x+ charGlyph.fnt_uv.width;
							currentTextShapeFNT.verts[currentTextShapeFNT.verts.length] = charGlyph.fnt_uv.y - charGlyph.fnt_uv.height;
							
						}
						else{
							char_vertices = charGlyph.fill_data;
							buffer = new Float32Array(char_vertices.buffer);
							if(this.usesCurves) {
								for (v = 0; v < char_vertices.count; v++) {
									currentTextShape.verts[currentTextShape.verts.length] = (buffer[v * 3] * size_multiply )+ x;
									currentTextShape.verts[currentTextShape.verts.length] = (buffer[v * 3 + 1] * size_multiply ) + y;
									currentTextShape.verts[currentTextShape.verts.length] = buffer[v * 3 + 2];
								}
							}
							else {
								if(hack_x_mirror){
									for (v = 0; v < char_vertices.count; v++) {
										currentTextShape.verts[currentTextShape.verts.length] = ((charGlyph.char_width-buffer[v * 2]) * size_multiply) + x;
										currentTextShape.verts[currentTextShape.verts.length] = ((buffer[v * 2 + 1]-this.vertical_glyph_offset) * size_multiply) + y;
									}
								}
								else{
									for (v = 0; v < char_vertices.count; v++) {
										currentTextShape.verts[currentTextShape.verts.length] = ((buffer[v * 2]) * size_multiply) + x;
										currentTextShape.verts[currentTextShape.verts.length] = ((buffer[v * 2 + 1]-this.vertical_glyph_offset) * size_multiply) + y;
									}
								}
							}

						}
						x+=charGlyph.char_width * size_multiply;
						// todo: handle kerning
					}
					else{
						//console.log("TesselatedFontTable: Error: char not found in fontTable", tf.chars_codes[c], tf.chars_codes[c].toString());
					}
				}
			}
			var half_thickness:number=0.25*tf.internalScale.y;
			var topY:number=y+this.getUnderLineHeight()+half_thickness;
			var bottomY:number=y+this.getUnderLineHeight()-half_thickness;
			if(newFormat.underline && (startWord+1)<tf.words.length){
				currentTextShape.verts[currentTextShape.verts.length]=start_x;
				currentTextShape.verts[currentTextShape.verts.length]=bottomY;
				currentTextShape.verts[currentTextShape.verts.length]=start_x;
				currentTextShape.verts[currentTextShape.verts.length]=topY;
				currentTextShape.verts[currentTextShape.verts.length]=x;
				currentTextShape.verts[currentTextShape.verts.length]=topY;
				currentTextShape.verts[currentTextShape.verts.length]=x;
				currentTextShape.verts[currentTextShape.verts.length]=topY;
				currentTextShape.verts[currentTextShape.verts.length]=x;
				currentTextShape.verts[currentTextShape.verts.length]=bottomY;
				currentTextShape.verts[currentTextShape.verts.length]=start_x;
				currentTextShape.verts[currentTextShape.verts.length]=bottomY;
			}

		}
		buffer=null;


	}

	public createPointGlyph_9679():TesselatedFontChar
	{
		var verts:number[]=[];
		GraphicsFactoryHelper.drawElipse(this._font_em_size/2, this._font_em_size/2, this._font_em_size/8, this._font_em_size/8, verts, 0, 360, 5, false);
		
		var attributesView:AttributesView = new AttributesView(Float32Array, 2);
		attributesView.set(verts);		
		var attributesBuffer:AttributesBuffer = attributesView.attributesBuffer.cloneBufferView();
		attributesView.dispose();		
		var tesselated_font_char:TesselatedFontChar = new TesselatedFontChar(attributesBuffer, null, null);
		tesselated_font_char.char_width=this._font_em_size;
		this._font_chars.push(tesselated_font_char);
		this._font_chars_dic["9679"]=tesselated_font_char;
		return tesselated_font_char;
	}

	/**
	 *
	 */
	public getChar(name:string):TesselatedFontChar
	{
		var tesselated_font_char:TesselatedFontChar=this._font_chars_dic[name];
		if(tesselated_font_char==null){
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
                        var y_offset=this._ascent;
                        //40 = 66
						for(i=0;i<len;i++){
                            var cmd = thisPath.commands[i];
                            //console.log("cmd", cmd.type, cmd.x, cmd.y, cmd.x1, cmd.y1, cmd.x2, cmd.y2);
							if (cmd.type === 'M') {
								awayPath.moveTo(cmd.x, cmd.y+y_offset);
								startx=cmd.x;
								starty=cmd.y+y_offset;
							}
							else if (cmd.type === 'L') {	awayPath.lineTo(cmd.x, cmd.y+y_offset);}
							else if (cmd.type === 'Q') {	awayPath.curveTo(cmd.x1, cmd.y1+y_offset, cmd.x, cmd.y+y_offset);}
							else if (cmd.type === 'C') {	awayPath.cubicCurveTo(cmd.x1, cmd.y1+y_offset, cmd.x2, cmd.y2+y_offset, cmd.x, cmd.y+y_offset);}
							else if (cmd.type === 'Z') {	awayPath.lineTo(startx, starty);}
                        }
                        /*
								awayPath.moveTo(0, 0);
								awayPath.lineTo(-5000, 500);
								awayPath.lineTo(-5000, 5000);
								awayPath.lineTo(-500, 5000);
                                awayPath.lineTo(-500, 500);
                                */


						//awayPath.style = new GraphicsStrokeStyle(0xff0000, 1, 1, JointStyle.MITER, CapsStyle.NONE, 100);
/*
						var final_vert_list:Array<number>=[];
						//todo
						//GraphicsFactoryStrokes.draw_pathes([awayPath], final_vert_list, false);
						var attributesView:AttributesView = new AttributesView(Float32Array, 3);
						attributesView.set(final_vert_list);
						var attributesBuffer:AttributesBuffer = attributesView.attributesBuffer.cloneBufferView();
						attributesView.dispose();

                        //console.log("tesselated_font_char.char_width "+tesselated_font_char.char_width);
                        */
                        var tesselated_font_char:TesselatedFontChar = new TesselatedFontChar(null, null, awayPath);
						tesselated_font_char.char_width=(thisGlyph.advanceWidth*(1 / thisGlyph.path.unitsPerEm * 72));
                        tesselated_font_char.fill_data=GraphicsFactoryFills.pathToAttributesBuffer(awayPath, true);
                        if(!tesselated_font_char.fill_data){
                            console.log("error tesselating opentype glyph");
                            return null;
                        }
						this._font_chars.push(tesselated_font_char);
						this._font_chars_dic[name]=tesselated_font_char;
					}
				}
			}
			if(name=="9679"){
				tesselated_font_char=this.createPointGlyph_9679();
			}
		}
		else if(tesselated_font_char.fill_data==null && tesselated_font_char.stroke_data==null && tesselated_font_char.fill_data_path!=null){
			// 	hack for messed up "X": remove the first command if it is moveTo that points to 0,0
			//	change the new first command to moveTo
			if( tesselated_font_char.fill_data_path.commands[0][0]==1 && tesselated_font_char.fill_data_path.data[0][0]==0 && tesselated_font_char.fill_data_path.data[0][1]==0){
				tesselated_font_char.fill_data_path.data[0].shift();
				tesselated_font_char.fill_data_path.data[0].shift();
				tesselated_font_char.fill_data_path.commands[0].shift();
				tesselated_font_char.fill_data_path.commands[0][0]=2;
			}
			tesselated_font_char.fill_data=GraphicsFactoryFills.pathToAttributesBuffer(tesselated_font_char.fill_data_path, true);
			if(!tesselated_font_char.fill_data){
				console.log("error tesselating glyph");
				return null;
			}
		}
		if(!tesselated_font_char){
			//console.warn("Warning: could not find glyph: ", name, String.fromCharCode(parseInt(name)), this.font.name, this.name, this.font);
		}
		return tesselated_font_char;
	}
	/**
	 *
	 */

	public setChar(name:string, char_width:number, fills_data:AttributesBuffer=null, stroke_data:AttributesBuffer=null, uses_curves:boolean=false, glyph_idx:number=0, fill_data_path:GraphicsPath=null, fileURL:string=""):void
	{
		char_width=Math.floor(char_width*20)/20;
		//console.log("adding char", name, String.fromCharCode(parseInt(name)));
		if((fills_data==null)&&(stroke_data==null)&&(fill_data_path==null))
			throw("TesselatedFontTable: trying to create a TesselatedFontChar with no data (fills_data, stroke_data and fill_data_path is null)");
		if(this._font_chars.length>0){
			if(uses_curves!=this._usesCurves){
				throw("TesselatedFontTable: Can not set different types of graphic-glyphs (curves vs non-cuves) on the same FontTable!");
			}
		}
		else{
			this._usesCurves=uses_curves;
		}
		var tesselated_font_char:TesselatedFontChar = new TesselatedFontChar(fills_data, stroke_data, fill_data_path);
		tesselated_font_char.char_width=char_width;
        tesselated_font_char.glyph_idx=glyph_idx;
        tesselated_font_char.name=name;
		if(this._glyphIdxToChar[fileURL]==null){
			this._glyphIdxToChar[fileURL]={};
		}
		this._glyphIdxToChar[fileURL][glyph_idx] = tesselated_font_char;

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