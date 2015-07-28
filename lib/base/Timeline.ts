import MovieClip                    = require("awayjs-display/lib/entities/MovieClip");
import ByteArray						= require("awayjs-core/lib/utils/ByteArray");
import DisplayObject                    = require("awayjs-display/lib/base/DisplayObject");
import ColorTransform					= require("awayjs-core/lib/geom/ColorTransform");
import Matrix3D							= require("awayjs-core/lib/geom/Matrix3D");
import Vector3D							= require("awayjs-core/lib/geom/Vector3D");


class Timeline
{

	private _keyframe_indices:Array<number>;     		//stores 1 keyframeindex per frameindex
	private _keyframe_firstframes:Array<number>;     	//stores the firstframe of each keyframe
	private _keyframe_constructframes:Array<number>;    //stores the previous fullConstruct keyframeindex

	private _keyframe_durations:ArrayBufferView;    //only needed to calulcate other arrays

	public _labels:Object;			// dictionary to store label => keyframeindex
	public _framescripts:Object;    // dictionary to store keyframeindex => ExecuteScriptCommand
	public _framescripts_translated:Object;    // dictionary to store keyframeindex => bool that keeps track of already converted scripts

	// synched:
	private _frame_command_indices:ArrayBufferView;
	private _frame_recipe:ArrayBufferView;

	// synched:
	private _command_index_stream:ArrayBufferView;
	private _command_length_stream:ArrayBufferView;

	private _add_child_stream:ArrayBufferView;
	private _remove_child_stream:ArrayBufferView;
	private _update_child_stream:ArrayBufferView;

	private _update_child_props_length_stream:ArrayBufferView;
	private _update_child_props_indices_stream:ArrayBufferView;

	private _property_index_stream:ArrayBufferView;
	private _property_type_stream:ArrayBufferView;

	private _properties_stream_int:ArrayBufferView;		// lists of ints used for property values. for now, only mask_ids are using ints

	// propertiy_values_stream:
	private _properties_stream_f32_mtx_all:ArrayBufferView;	// list of floats
	private _properties_stream_f32_mtx_scale_rot:ArrayBufferView;	// list of floats
	private _properties_stream_f32_mtx_pos:ArrayBufferView;	// list of floats
	private _properties_stream_f32_ct:ArrayBufferView;	// list of floats
	private _properties_stream_strings:Array<string>;

	private _potentialPrototypes:Array<DisplayObject>;

	public numKeyFrames:number=0;

	constructor()
	{
		this._potentialPrototypes=[];
		this._keyframe_indices=[];
		this._labels={};
		this._framescripts={};
		this._framescripts_translated={};
	}

	public init():void
	{
		if((this._frame_command_indices==null)||(this._frame_recipe==null)||(this._keyframe_durations==null))
			return;
		this._keyframe_firstframes=[];
		this._keyframe_constructframes=[];
		var frame_cnt=0;
		var ic=0;
		var ic2=0;
		var keyframe_cnt=0;
		var last_construct_frame=0;
		for(ic=0; ic<this.numKeyFrames; ic++){
			var duration=this._keyframe_durations[(ic)];

			if((this._frame_recipe[ic] & 1) == 1)
				last_construct_frame=keyframe_cnt;

			this._keyframe_firstframes[keyframe_cnt]=frame_cnt;
			this._keyframe_constructframes[keyframe_cnt++]=last_construct_frame;

			for(ic2=0; ic2<duration; ic2++){
				this._keyframe_indices[frame_cnt++]=ic;
			}
		}
	}
	public get_framescript(keyframe_index:number):string
	{
		if(this._framescripts[keyframe_index]==null)
			return "";
		if (typeof this._framescripts[keyframe_index] == "string")
			return this._framescripts[keyframe_index];
		else{
			throw new Error("Framescript is already translated to Function!!!");
		}
		return "";
	}
	public add_framescript(value:string, keyframe_index:number)
	{
		this._framescripts[keyframe_index] = value;
	}

	private regexIndexOf(str : string, regex : RegExp, startpos : number) {
		var indexOf = str.substring(startpos || 0).search(regex);
		return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
	}


	public add_script_for_postcontruct(target_mc:MovieClip, keyframe_idx:number) : void
	{
		if(this._framescripts[keyframe_idx]!=null){
			if(this._framescripts_translated[keyframe_idx]==null){
				this.translateScript(target_mc.adapter.classReplacements,this._framescripts[keyframe_idx], keyframe_idx);
			}
			target_mc.addScriptForExecution(this._framescripts[keyframe_idx]);
		}
	}
	// TODO: handle this in the exporter so it's safe!
	public translateScript(classReplacements, frame_script_in:string, keyframe_idx:number)
	{
		var replaced = frame_script_in.replace(/(\\n|\r)/g, "");
		var replacementPreface = "";
		var replacementPostface = "";

		// where "this" is a single word
		//replaced = replaced.replace(/\bthis\./, "___scoped_this___.");

		for (var srcName in classReplacements) {
			var dstName = classReplacements[srcName];
			// where class name is a single word
			//var regex = "\b" + srcName + "\b";
			//replaced = replaced.replace(new RegExp(regex, "g"), dstName);

			// store old references to stuff in a temporary var to be reset after script execution;
			// make sure a definition exists, even if it's undefined
			replacementPreface += "var __OLD_" + srcName + " = typeof " + srcName + " == 'function'? " + srcName + " : undefined;\n";
			replacementPreface += srcName + " = require(\"" + dstName + "\");\n";
			replacementPreface += "function int(value) { return value | 0; }\n";
			replacementPostface += srcName + " = __OLD_" + srcName + ";\n";
		}

		// make sure we don't use "this", since Actionscript's "this" has the same scope rules as a variable
		var str =   replacementPreface +
				//"var ___scoped_this___ = this;" +
				//"with(___scoped_this___) { \n" +
			replaced +
				//"}\n" +
			replacementPostface;

		//console.log(str);

		this._framescripts_translated[keyframe_idx]=true;
		try {
			this._framescripts[keyframe_idx] = new Function(str);
		}
		catch(err)
		{
			console.log("Syntax error in script:\n", str);
			console.log(err.message);
			throw err;
		}
	}
	public set keyframe_durations(value:ArrayBufferView)
	{
		this._keyframe_durations=value;
	}
	public set frame_command_indices(value:ArrayBufferView)
	{
		this._frame_command_indices=value;
	}
	public set frame_recipe(value:ArrayBufferView)
	{
		this._frame_recipe=value;
	}


	public set command_index_stream(value:ArrayBufferView)
	{
		this._command_index_stream=value;
	}
	public set command_length_stream(value:ArrayBufferView)
	{
		this._command_length_stream=value;
	}


	public set add_child_stream(value:ArrayBufferView)
	{
		this._add_child_stream=value;
	}
	public set remove_child_stream(value:ArrayBufferView)
	{
		this._remove_child_stream=value;
	}
	public set update_child_stream(value:ArrayBufferView)
	{
		this._update_child_stream=value;
	}

	public set update_child_props_indices_stream(value:ArrayBufferView)
	{
		this._update_child_props_indices_stream=value;
	}
	public set update_child_props_length_stream(value:ArrayBufferView)
	{
		this._update_child_props_length_stream=value;
	}

	public set property_index_stream(value:ArrayBufferView)
	{
		this._property_index_stream=value;
	}
	public set property_type_stream(value:ArrayBufferView)
	{
		this._property_type_stream=value;
	}

	public set properties_stream_f32_mtx_all(value:Float32Array)
	{
		this._properties_stream_f32_mtx_all=value;
	}
	public set properties_stream_f32_mtx_scale_rot(value:Float32Array)
	{
		this._properties_stream_f32_mtx_scale_rot=value;
	}
	public set properties_stream_f32_mtx_pos(value:Float32Array)
	{
		this._properties_stream_f32_mtx_pos=value;
	}
	public set properties_stream_f32_ct(value:Float32Array)
	{
		this._properties_stream_f32_ct=value;
	}
	public set properties_stream_int(value:ArrayBufferView)
	{
		this._properties_stream_int=value;
	}
	public set properties_stream_strings(value:Array<string>)
	{
		this._properties_stream_strings=value;
	}

	public set keyframe_indices(value:Array<number>)
	{
		this._keyframe_indices=value;
	}
	public set keyframe_firstframes(value:Array<number>)
	{
		this._keyframe_firstframes=value;
	}
	public set keyframe_constructframes(value:Array<number>)
	{
		this._keyframe_constructframes=value;
	}

	public numFrames():number
	{
		return this._keyframe_indices.length;
	}


	public getPotentialChildPrototype(id:number):DisplayObject
	{
		return this._potentialPrototypes[id];

	}
	public getKeyframeIndexForFrameIndex(frame_index:number) : number
	{
		return this._keyframe_indices[frame_index];
	}

	public getPotentialChilds() : Array<DisplayObject>
	{
		return this._potentialPrototypes;
	}
	public getPotentialChildInstance(id:number) : DisplayObject
	{
		return this._potentialPrototypes[id].clone();
	}

	public registerPotentialChild(prototype:DisplayObject) : void
	{
		var id = this._potentialPrototypes.length;
		this._potentialPrototypes[id] = prototype;
	}
	public jumpToLabel(target_mc:MovieClip, label:string) : void
	{
		var key_frame_index:number = this._labels[label];
		if(key_frame_index>=0)
			target_mc.currentFrameIndex=this._keyframe_firstframes[key_frame_index];

	}


	public gotoFrame(target_mc:MovieClip, value : number)
	{

		//console.log("gotoframe");
		var frameIndex:number = target_mc.currentFrameIndex;
		var current_keyframe_idx:number = target_mc.constructedKeyFrameIndex;
		var target_keyframe_idx:number = this._keyframe_indices[value];

		var firstframe=this._keyframe_firstframes[target_keyframe_idx];
		if(frameIndex==value){
			//we are already on this frame.
			return;
		}
		//console.log("gotoframe 2");
		if(firstframe==value){
			//frame changed. and firstframe of keyframe. execute framescript if available
			this.add_script_for_postcontruct(target_mc, target_keyframe_idx);
		}

		if(current_keyframe_idx==target_keyframe_idx) {
			// already constructed
			return;
		}

		var break_frame_idx:number=this._keyframe_constructframes[target_keyframe_idx];

		//we now have 3 index to keyframes: current_keyframe_idx / target_keyframe_idx / break_frame_idx

		var jump_forward:boolean = (target_keyframe_idx > current_keyframe_idx);
		var jump_gap:boolean = (break_frame_idx > current_keyframe_idx);

		// in case we jump back or we jump a gap, we want to start constructing at BreakFrame
		var start_construct_idx:number=break_frame_idx;
		// in case we jump fporward, but not jump a gap, we start at current_keyframe_idx +1
		if((jump_forward)&&(!jump_gap)){
			start_construct_idx=current_keyframe_idx+1;
		}
		var removeAll:boolean=false;
		var removeAllFromScript:boolean=false;
		// if we jump backwards, or if we jump a gap, we want to remove everything from the stage.
		// if we jump a gap, we also want to free everything from script access.
		if((!jump_forward)||(jump_gap)){
			removeAll=true;
			if(jump_gap){
				removeAllFromScript;
			}
		}

		var previous_sessions:Array<number> = [];	// store a list of all previous active sessionIDs
		var previous_mcs:Array<MovieClip> = [];	// store a list of all previous active Movieclips
		var session_cnt:number=0;
		var prev_script_cnt:number=0;
		var i:number=0;
		var k:number=0;
		for (i=target_mc.numChildren-1; i>=0; i--) {
			//else{
			var child:DisplayObject = target_mc.getChildAt(i);

			// if we jump back, or if we do not jump a gap, we need to collect all sessionIDs, in order to know what to reset
			if((!jump_forward)||(!jump_gap)){
				previous_sessions[session_cnt++] = child["__sessionID"];
			}
			if (removeAll) {
				if(removeAllFromScript){
					target_mc.adapter.unregisterScriptObject(child);
					if(child.isAsset(MovieClip) && (<MovieClip>child).adapter)
						(<MovieClip>child).adapter.freeFromScript();

				}
				target_mc.removeChildAt(i);
			}
			else{
				if(child.isAsset(MovieClip))
					previous_mcs[prev_script_cnt++] = <MovieClip>child;
			}
		}

		//  pass1: only apply add/remove commands.
		var update_indices:Array<number>=[];// store a list of updatecommand_indices, so we dont have to read frame_recipe again
		var update_cnt=0;
		for(k=start_construct_idx;k<=target_keyframe_idx; k++){

			var frame_command_idx:number=this._frame_command_indices[k];
			var frame_recipe:number=this._frame_recipe[k];

			if ((frame_recipe & 2)==2)
				this.remove_childs(target_mc, this._command_index_stream[frame_command_idx], this._command_length_stream[frame_command_idx++] );

			if((frame_recipe & 4)==4)
				this.add_childs(target_mc, this._command_index_stream[frame_command_idx], this._command_length_stream[frame_command_idx++] );

			if((frame_recipe & 8)==8)
				update_indices[update_cnt++]=frame_command_idx;// execute update command later
		}

		session_cnt=0;
		var target_sessions:Array<number> = [];
		// between passes:
		// if a child has a sessionID that was not present in previous frame, it must be reset
		for (i=0; i<target_mc.numChildren; ++i) {
			var child:DisplayObject = target_mc.getChildAt(i);
			target_sessions[session_cnt++] = child["__sessionID"];
			if (previous_sessions.indexOf(child["__sessionID"]) == -1) {
				child.reset_to_init_state();
				if (child.isAsset(MovieClip))
					(<MovieClip>child).reset();
			}
			else{
				if(!jump_forward) {
					var doit:boolean = true;
					if (child.isAsset(MovieClip)) {
						if ((<MovieClip>child).adapter && (<MovieClip>child).adapter.isBlockedByScript())
							doit = false;
					}
					if (doit)
						child.reset_to_init_state();
				}
			}
		}

		// all objects that was present on previous frame, but not on current need to be unregistered
		for (i=0; i<previous_mcs.length; ++i) {
			if(target_sessions.indexOf(previous_mcs[i]["__sessionID"])==-1){
				previous_mcs[i].adapter.freeFromScript();
				target_mc.adapter.unregisterScriptObject(previous_mcs[i]);
			}
		}

		//  pass2: apply update commands for objects on stage (only if they are not blocked by script)
		var frame_command_idx:number=0;
		for(k=0;k<update_indices.length; k++){
			frame_command_idx=update_indices[k];
			this.update_childs(target_mc, this._command_index_stream[frame_command_idx], this._command_length_stream[frame_command_idx] );
		}
		target_mc.constructedKeyFrameIndex=target_keyframe_idx;
	}


	public constructNextFrame(target_mc:MovieClip)
	{

		//console.log("next frame");
		var frameIndex:number = target_mc.currentFrameIndex;
		var constructed_keyFrameIndex:number = target_mc.constructedKeyFrameIndex;
		var new_keyFrameIndex:number = this._keyframe_indices[frameIndex];

		if(constructed_keyFrameIndex!=new_keyFrameIndex){
			target_mc.constructedKeyFrameIndex=new_keyFrameIndex;

			var frame_command_idx=this._frame_command_indices[new_keyFrameIndex];
			var frame_recipe=this._frame_recipe[new_keyFrameIndex];

			if((frame_recipe & 1)==1) {
				var i:number = target_mc.numChildren;
				while (i--)
					target_mc.removeChildAt(i);

			} else if ((frame_recipe & 2)==2) {
				this.remove_childs_continous(target_mc, this._command_index_stream[frame_command_idx], this._command_length_stream[frame_command_idx++] );
			}

			if((frame_recipe & 4)==4)
				this.add_childs_continous(target_mc, this._command_index_stream[frame_command_idx], this._command_length_stream[frame_command_idx++] );

			if((frame_recipe & 8)==8)
				this.update_childs(target_mc, this._command_index_stream[frame_command_idx], this._command_length_stream[frame_command_idx++] );

		}
		if(this._keyframe_firstframes[new_keyFrameIndex]==frameIndex){
			this.add_script_for_postcontruct(target_mc, new_keyFrameIndex);
		}

	}


	public remove_childs(sourceMovieClip:MovieClip, start_index:number, len:number)
	{
		for(var i:number = 0; i < len; i++)
			sourceMovieClip.removeChildAtDepth(this._remove_child_stream[start_index+i] - 16383);
	}

	public remove_childs_continous(sourceMovieClip:MovieClip, start_index:number, len:number)
	{
		for(var i:number = 0; i < len; i++) {
			var target:DisplayObject = sourceMovieClip.removeChildAtDepth(this._remove_child_stream[start_index+i] - 16383);

			sourceMovieClip.adapter.unregisterScriptObject(target);
			if(target.isAsset(MovieClip) && (<MovieClip> target).adapter)
				(<MovieClip> target).adapter.freeFromScript();
		}
	}

	// used to add childs when jumping between frames
	public add_childs(sourceMovieClip:MovieClip, start_index:number, len:number)
	{
		for(var i:number = 0; i < len; i++){
			var target = sourceMovieClip.getPotentialChildInstance(this._add_child_stream[(start_index*2)+(i*2)]);
			target["__sessionID"] = start_index + i;
			sourceMovieClip.addChildAtDepth(target, this._add_child_stream[(start_index*2)+(i*2)+1] - 16383);
		}
	}

	// used to add childs when jumping between frames
	public add_childs_continous(sourceMovieClip:MovieClip, start_index:number, len:number)
	{
		for(var i:number = 0; i < len; i++){
			var target = sourceMovieClip.getPotentialChildInstance(this._add_child_stream[(start_index*2)+(i*2)]);
			target["__sessionID"] = start_index + i;

			if(target.isAsset(MovieClip)) {
				if ((<MovieClip>target).adapter && !(<MovieClip>target).adapter.isBlockedByScript()) {
					(<MovieClip>target).reset();
					target.reset_to_init_state();
				}
			} else {
				target.reset_to_init_state();
			}

			sourceMovieClip.addChildAtDepth(target, this._add_child_stream[(start_index*2)+(i*2)+1] - 16383);
		}
	}

	public update_childs(sourceMovieClip:MovieClip, start_index:number, len:number)
	{

		//console.log("update childs");
		var i:number;
		var pc:number;
		var props_cnt:number;
		var props_start_idx:number;
		var value_start_index:number;
		var props_type:number;
		var doit:boolean;
		//console.log("sourceMovieClip = "+sourceMovieClip.name+" objects to update = "+len);
		for(i=0; i<len;i++) {
			var childID:number=this._update_child_stream[start_index+i];
			//console.log("childID = "+childID);
			var target = sourceMovieClip.getPotentialChildInstance(childID);
			if (target.parent == sourceMovieClip) {
				doit = true;
				// check if the child is active + not blocked by script
				if (target.isAsset(MovieClip)) {
					if ((<MovieClip>target).adapter.isBlockedByScript()) {
						doit = false;
					}
				}
				props_start_idx=this._update_child_props_indices_stream[start_index+i];
				props_cnt=this._update_child_props_length_stream[start_index+i];

				//console.log("	props_cnt = "+props_cnt);
				for(pc=0; pc<props_cnt;pc++) {
					props_type = this._property_type_stream[props_start_idx+pc];
					value_start_index = this._property_index_stream[props_start_idx+pc];
					//console.log("	props_id = "+props_id);
					//console.log("	value_start_index = "+value_start_index);
					switch(props_type){
						case 0:
							break;

						case 1:// displaytransform
							if (doit) {
								var new_matrix:Matrix3D = target["_iMatrix3D"];
								if (new_matrix == null) {
									new_matrix = new Matrix3D();
								}
								new_matrix.rawData[0] = this._properties_stream_f32_mtx_all[(value_start_index * 6)];
								new_matrix.rawData[1] = this._properties_stream_f32_mtx_all[(value_start_index * 6) + 1];
								new_matrix.rawData[4] = this._properties_stream_f32_mtx_all[(value_start_index * 6) + 2];
								new_matrix.rawData[5] = this._properties_stream_f32_mtx_all[(value_start_index * 6) + 3];
								new_matrix.rawData[12] = this._properties_stream_f32_mtx_all[(value_start_index * 6) + 4];
								new_matrix.rawData[13] = this._properties_stream_f32_mtx_all[(value_start_index * 6) + 5];
								target["_iMatrix3D"] = new_matrix;
								//console.log("displaytransform  ");
							}
							break;

						case 2:// colormatrix
							if (doit) {
								var new_ct:ColorTransform = target["colorTransform"];
								if (new_ct == null) {
									new_ct = new ColorTransform();
								}
								new_ct.redMultiplier = this._properties_stream_f32_ct[(value_start_index * 8)];
								new_ct.greenMultiplier = this._properties_stream_f32_ct[(value_start_index * 8) + 1];
								new_ct.blueMultiplier = this._properties_stream_f32_ct[(value_start_index * 8) + 2];
								new_ct.alphaMultiplier = this._properties_stream_f32_ct[(value_start_index * 8) + 3];
								new_ct.redOffset = this._properties_stream_f32_ct[(value_start_index * 8) + 4];
								new_ct.greenOffset = this._properties_stream_f32_ct[(value_start_index * 8) + 5];
								new_ct.blueOffset = this._properties_stream_f32_ct[(value_start_index * 8) + 6];
								new_ct.alphaOffset = this._properties_stream_f32_ct[(value_start_index * 8) + 7];
								target["colorTransform"] = new_ct;
							}
							break;

						case 3:// masks
							var mask_length:number=this._properties_stream_int[value_start_index];
							var firstMaskID:number=this._properties_stream_int[value_start_index+1] -1;
							//console.log("mask length "+mask_length);
							if ((mask_length == 1) && (firstMaskID == -1)) {
								target["_iMaskID"] = childID;
								//console.log("set masks = "+childID);
							}
							else{
								var mc:number=0;
								var mc2:number=0;
								var masks = new Array<DisplayObject>();
								for(mc=1; mc<=mask_length; mc++){
									masks[mc2] = sourceMovieClip.getPotentialChildInstance(this._properties_stream_int[value_start_index+mc]-1);
									(<DisplayObject>masks[mc2]).mouseEnabled=false;
									if(masks[mc2].isAsset(MovieClip))
										(<MovieClip>masks[mc2]).mouseChildren=false;
									mc2++;
									//console.log("set mask2 = "+this._update_props_ints[value_start_index+mc]);
								}
								target._iMasks = masks;
							}
							break;

						case 4:// instance name movieclip instance
							target.name = this._properties_stream_strings[value_start_index];
							sourceMovieClip.adapter.registerScriptObject(target);
							//console.log("registered object = "+target.name);
							break;
						case 5:// instance name button instance
							target.name = this._properties_stream_strings[value_start_index];
							sourceMovieClip.adapter.registerScriptObject(target);
							//console.log("registered button = "+target.name);
							(<MovieClip>target).makeButton();
							break;

						case 6://visible
							if (doit) {
								if (value_start_index == 0)
									target.visible = false;
								else
									target.visible = true;
							}
							break;
						case 11:// displaytransform
							if (doit) {
								var new_matrix:Matrix3D = target["_iMatrix3D"];
								if (new_matrix == null) {
									new_matrix = new Matrix3D();
								}
								new_matrix.rawData[0] = this._properties_stream_f32_mtx_scale_rot[(value_start_index * 4)];
								new_matrix.rawData[1] = this._properties_stream_f32_mtx_scale_rot[(value_start_index * 4) + 1];
								new_matrix.rawData[4] = this._properties_stream_f32_mtx_scale_rot[(value_start_index * 4) + 2];
								new_matrix.rawData[5] = this._properties_stream_f32_mtx_scale_rot[(value_start_index * 4) + 3];
								target["_iMatrix3D"] = new_matrix;
								//console.log("displaytransform  rot/scale");
							}
							break;
						case 12:// displaytransform
							if (doit) {
								var new_matrix:Matrix3D = target["_iMatrix3D"];
								if (new_matrix == null) {
									new_matrix = new Matrix3D();
								}
								new_matrix.rawData[12] = this._properties_stream_f32_mtx_pos[(value_start_index * 2)];
								new_matrix.rawData[13] = this._properties_stream_f32_mtx_pos[(value_start_index * 2) + 1];
								target["_iMatrix3D"] = new_matrix;

								//console.log("displaytransform2  pos "+this._properties_stream_f32_mtx_pos[(value_start_index*2)]+" "+this._properties_stream_f32_mtx_pos[(value_start_index*2)+1]);
								//console.log("displaytransform  pos "+new_matrix.rawData[4]+" "+new_matrix.rawData[5]);

							}
							break;
						default:
							break;

					}
				}


				//else
				//	console.log("skip kid 2");
			}
			//else
			//	console.log("skip kid");
		}

	}
}

export = Timeline;