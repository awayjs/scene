import HierarchicalProperties			= require("awayjs-display/lib/base/HierarchicalProperties");
import DisplayObjectContainer			= require("awayjs-display/lib/containers/DisplayObjectContainer");
import MovieClip						= require("awayjs-display/lib/entities/MovieClip");
import ByteArray						= require("awayjs-core/lib/utils/ByteArray");
import DisplayObject                    = require("awayjs-display/lib/base/DisplayObject");
import ColorTransform					= require("awayjs-core/lib/geom/ColorTransform");
import Matrix3D							= require("awayjs-core/lib/geom/Matrix3D");
import Vector3D							= require("awayjs-core/lib/geom/Vector3D");
import FrameScriptManager = require("awayjs-display/lib/managers/FrameScriptManager");


class Timeline
{
	public _labels:Object;			// dictionary to store label => keyframeindex
	public _framescripts:Object;    // dictionary to store keyframeindex => ExecuteScriptCommand
	public _framescripts_translated:Object;    // dictionary to store keyframeindex => bool that keeps track of already converted scripts

	public keyframe_indices:Array<number>;     		//stores 1 keyframeindex per frameindex
	public keyframe_firstframes:Array<number>;     	//stores the firstframe of each keyframe
	public keyframe_constructframes:Array<number>;    //stores the previous fullConstruct keyframeindex

	public keyframe_durations:ArrayBufferView;    //only needed to calulcate other arrays

	// synched:
	public frame_command_indices:ArrayBufferView;
	public frame_recipe:ArrayBufferView;

	// synched:
	public command_index_stream:ArrayBufferView;
	public command_length_stream:ArrayBufferView;

	public add_child_stream:ArrayBufferView;
	public remove_child_stream:ArrayBufferView;
	public update_child_stream:ArrayBufferView;

	public update_child_props_length_stream:ArrayBufferView;
	public update_child_props_indices_stream:ArrayBufferView;

	public property_index_stream:ArrayBufferView;
	public property_type_stream:ArrayBufferView;

	public properties_stream_int:ArrayBufferView;		// lists of ints used for property values. for now, only mask_ids are using ints

	// propertiy_values_stream:
	public properties_stream_f32_mtx_all:ArrayBufferView;	// list of floats
	public properties_stream_f32_mtx_scale_rot:ArrayBufferView;	// list of floats
	public properties_stream_f32_mtx_pos:ArrayBufferView;	// list of floats
	public properties_stream_f32_ct:ArrayBufferView;	// list of floats
	public properties_stream_strings:Array<string>;

	private _potentialPrototypes:Array<DisplayObject>;

	public numKeyFrames:number=0;

	constructor()
	{
		this.keyframe_indices=[];

		this._potentialPrototypes=[];
		this._labels={};
		this._framescripts={};
		this._framescripts_translated={};
	}

	public init():void
	{
		if((this.frame_command_indices == null)||(this.frame_recipe == null)||(this.keyframe_durations == null))
			return;

		this.keyframe_firstframes = [];
		this.keyframe_constructframes = [];
		var frame_cnt = 0;
		var ic = 0;
		var ic2 = 0;
		var keyframe_cnt = 0;
		var last_construct_frame = 0;
		for(ic = 0; ic < this.numKeyFrames; ic++){
			var duration=this.keyframe_durations[(ic)];

			if(this.frame_recipe[ic] & 1)
				last_construct_frame = keyframe_cnt;

			this.keyframe_firstframes[keyframe_cnt] = frame_cnt;
			this.keyframe_constructframes[keyframe_cnt++] = last_construct_frame;

			for(ic2 = 0; ic2 < duration; ic2++)
				this.keyframe_indices[frame_cnt++] = ic;
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


	public add_script_for_postcontruct(target_mc:MovieClip, keyframe_idx:number, scriptPass1:Boolean=false) : void
	{
		if(this._framescripts[keyframe_idx]!=null){
			if(this._framescripts_translated[keyframe_idx]==null){
				this._framescripts[keyframe_idx] = target_mc.adapter.evalScript(this._framescripts[keyframe_idx]);
				this._framescripts_translated[keyframe_idx]=true;
			}
			if(scriptPass1)
				FrameScriptManager.add_script_to_queue(target_mc, this._framescripts[keyframe_idx]);
			else
				FrameScriptManager.add_script_to_queue_pass2(target_mc, this._framescripts[keyframe_idx]);

		}
	}

	public get numFrames():number
	{
		return this.keyframe_indices.length;
	}


	public getPotentialChildPrototype(id:number):DisplayObject
	{
		return this._potentialPrototypes[id];

	}
	public getKeyframeIndexForFrameIndex(frame_index:number) : number
	{
		return this.keyframe_indices[frame_index];
	}

	public getPotentialChilds():Array<DisplayObject>
	{
		return this._potentialPrototypes;
	}

	public getPotentialChildInstance(id:number) : DisplayObject
	{
		var this_clone:DisplayObject=this._potentialPrototypes[id].clone();
		this_clone.name="";
		return this_clone;
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
			target_mc.currentFrameIndex=this.keyframe_firstframes[key_frame_index];
	}


	public gotoFrame(target_mc:MovieClip, value:number, skip_script:boolean = false)
	{
		var frameIndex:number = target_mc.currentFrameIndex;

		if (frameIndex == value) //we are already on exactly this frame.
			return;

		var current_keyframe_idx:number = target_mc.constructedKeyFrameIndex;
		var target_keyframe_idx:number = this.keyframe_indices[value];

		var firstframe:number = this.keyframe_firstframes[target_keyframe_idx];

		if (current_keyframe_idx + 1 == target_keyframe_idx) { // target_keyframe_idx is the next keyframe. we can just use constructnext for this
			target_mc.set_currentFrameIndex(value);
			this.constructNextFrame(target_mc, !skip_script, true);
			return;
		}


		if (current_keyframe_idx == target_keyframe_idx) // already constructed - exit
			return;

		var break_frame_idx:number = this.keyframe_constructframes[target_keyframe_idx];

		//we now have 3 index to keyframes: current_keyframe_idx / target_keyframe_idx / break_frame_idx

		var jump_forward:boolean = (target_keyframe_idx > current_keyframe_idx);
		var jump_gap:boolean = (break_frame_idx > current_keyframe_idx);

		// in case we jump back or we jump a gap, we want to start constructing at BreakFrame
		var start_construct_idx:number = break_frame_idx;

		if (jump_forward && !jump_gap) // in case we jump forward, but not jump a gap, we start at current_keyframe_idx +1
			start_construct_idx = current_keyframe_idx + 1;

		var child_depths = target_mc.getChildDepths();
		var sessionID_depths:Object = {};
		var i:number;
		var end_index:number;
		var k:number;
		var child:DisplayObject;
		var depth:number;

		if (jump_forward && start_construct_idx == target_keyframe_idx){
			// if we jump back, we dont want this shortcut, because we need to compare targetframe vs currentframe

			// shortcut: if the targetframe is the breakframe itself, we can just call constructNextFrame
			// before we do that, we need to clear the childlist
/*
			while(i--){
				child = target_mc._children[i];
				if(child.adapter)child.adapter.freeFromScript();
				target_mc.adapter.unregisterScriptObject(child);
				target_mc.removeChild(child);
			}
			target_mc.set_currentFrameIndex(value);
			this.constructNextFrame(target_mc, false);
			return;
			*/
		}

		for (i = target_mc.numChildren - 1; i >= 0; i--) {
			child = target_mc._children[i];
			if (jump_gap) { // if we jump a gap forward, we just can remove all childs from mc. all script blockage will be gone
				target_mc.removeChild(child);
			} else if (jump_forward) { // in other cases, we want to collect the current objects to compare state of targetframe with state of currentframe
				sessionID_depths[child._depthID] = child._sessionID;
			}
		}

		//  step1: only apply add/remove commands into current_childs_dic.
		var update_indices:Array<number> = [];// store a list of updatecommand_indices, so we dont have to read frame_recipe again
		var update_cnt = 0;
		var targetFrame_first_sessionID:number=0;
		for (k = start_construct_idx; k <= target_keyframe_idx; k++) {
			var frame_command_idx:number = this.frame_command_indices[k];
			var frame_recipe:number = this.frame_recipe[k];
			var start_index:number;
			var idx:number;

			if (frame_recipe & 2) {
				// remove childs
				start_index = this.command_index_stream[frame_command_idx];
				end_index = start_index + this.command_length_stream[frame_command_idx++];
				for (i = start_index; i < end_index; i++) {
					depth = this.remove_child_stream[i] - 16383;
					delete child_depths[depth];
					delete sessionID_depths[depth];
				}
			}

			if (frame_recipe & 4) {
				start_index = this.command_index_stream[frame_command_idx];
				end_index = start_index + this.command_length_stream[frame_command_idx++];
				// apply add commands in reversed order to have script exeucted in correct order.
				// this could be changed in exporter
				for (i = end_index - 1; i >= start_index; i--) {
					idx = i*2;
					var target:DisplayObject = target_mc.getPotentialChildInstance(this.add_child_stream[idx]);

					depth = this.add_child_stream[idx + 1] - 16383;
					child_depths[depth] = target;
					sessionID_depths[depth] = i;
				}
				if(k==target_keyframe_idx){
					targetFrame_first_sessionID=start_index;
				}
			}

			if (frame_recipe & 8)
				update_indices[update_cnt++] = frame_command_idx;// execute update command later
		}

		//  step2: construct the final frame

		// check what childs are alive on both frames.
		// childs that are not alive anymore get removed and unregistered
		// childs that are alive on both frames get removed from the target_childs_dic
		for (i = target_mc.numChildren - 1; i >= 0; i--) {
			child = target_mc._children[i];
			depth = child._depthID;
			if (sessionID_depths[depth] == child._sessionID)
				delete sessionID_depths[depth];
			else
				target_mc.removeChildAt(i);
		}

		// the objects that are now child of target_mc, are alive on both frames
		// if we jump back, or we jump a gap forward, we want to reset all objects (but not the timelines of the mcs)
		if((!jump_forward)||(jump_gap)){
			for (i = target_mc.numChildren - 1; i >= 0; i--) {
				child = target_mc._children[i];
				if(child.adapter ) {
					if (!child.adapter.isBlockedByScript()) {
						if (child._iMatrix3D) {
							child._iMatrix3D.identity();
							child._iMatrix3D = child._iMatrix3D;
						}
						if (child._iColorTransform) {
							child._iColorTransform.clear();
							child._iColorTransform = child._iColorTransform;
						}
						//this.name="";
						child.masks = null;
						child.maskMode = false;
					}
					if (!child.adapter.isVisibilityByScript()) {
						child.visible = true;
					}
				}
			}
		}

		// we need to addchild the objects that was added befor targetframe first
		// than we can add the script of the targetframe
		// than we can addchild objects added on targetframe

		for (var key in sessionID_depths) {
			if(parseInt(key)<targetFrame_first_sessionID){
				child = child_depths[key];
				child._sessionID = sessionID_depths[key];
				target_mc.addChildAtDepth(child, parseInt(key));
			}
		}
		if (!skip_script && firstframe == value) //frame changed. and firstframe of keyframe. execute framescript if available
			this.add_script_for_postcontruct(target_mc, target_keyframe_idx, true);

		for (var key in sessionID_depths) {
			if(parseInt(key)>=targetFrame_first_sessionID) {
				child = child_depths[key];
				child._sessionID = sessionID_depths[key];
				target_mc.addChildAtDepth(child, parseInt(key));
			}
		}

		//  pass2: apply update commands for objects on stage (only if they are not blocked by script)
		var frame_command_idx:number;
		var len:number = update_indices.length;
		for (k = 0; k < len; k++) {
			frame_command_idx = update_indices[k];
			this.update_childs(target_mc, this.command_index_stream[frame_command_idx], this.command_length_stream[frame_command_idx]);
		}

		target_mc.constructedKeyFrameIndex = target_keyframe_idx;
	}


	public constructNextFrame(target_mc:MovieClip, queueScript:Boolean=true, scriptPass1:Boolean = false)
	{
		var frameIndex:number = target_mc.currentFrameIndex;
		var constructed_keyFrameIndex:number = target_mc.constructedKeyFrameIndex;
		var new_keyFrameIndex:number = this.keyframe_indices[frameIndex];

		if(queueScript && this.keyframe_firstframes[new_keyFrameIndex] == frameIndex)
			this.add_script_for_postcontruct(target_mc, new_keyFrameIndex, scriptPass1);

		if(constructed_keyFrameIndex != new_keyFrameIndex) {
			target_mc.constructedKeyFrameIndex = new_keyFrameIndex;

			var frame_command_idx = this.frame_command_indices[new_keyFrameIndex];
			var frame_recipe = this.frame_recipe[new_keyFrameIndex];

			if(frame_recipe & 1) {
				for (var i:number = target_mc.numChildren - 1; i >= 0; i--)
					target_mc.removeChildAt(i);
			} else if (frame_recipe & 2) {
				this.remove_childs_continous(target_mc, this.command_index_stream[frame_command_idx], this.command_length_stream[frame_command_idx++] );
			}

			if(frame_recipe & 4)
				this.add_childs_continous(target_mc, this.command_index_stream[frame_command_idx], this.command_length_stream[frame_command_idx++] );

			if(frame_recipe & 8)
				this.update_childs(target_mc, this.command_index_stream[frame_command_idx], this.command_length_stream[frame_command_idx++]);
		}
	}



	public remove_childs_continous(sourceMovieClip:MovieClip, start_index:number, len:number)
	{
		for(var i:number = 0; i < len; i++)
			sourceMovieClip.removeChildAtDepth(this.remove_child_stream[start_index + i] - 16383);
	}


	// used to add childs when jumping between frames
	public add_childs_continous(sourceMovieClip:MovieClip, start_index:number, len:number)
	{
		// apply add commands in reversed order to have script exeucted in correct order.
		// this could be changed in exporter
		var idx:number;
		var end_index:number = start_index + len;
		for (var i:number = end_index - 1; i >= start_index; i--) {
			idx = i*2;
			var target:DisplayObject = sourceMovieClip.getPotentialChildInstance(this.add_child_stream[idx]);
			target._sessionID = i;
			sourceMovieClip.addChildAtDepth(target, this.add_child_stream[idx + 1] - 16383);
		}
	}

	public update_childs(sourceMovieClip:MovieClip, start_index:number, len:number)
	{
		var props_start_idx:number;
		var props_len:number;
		var props_end_index:number;
		var value_start_index:number;
		var props_type:number;
		var doit:boolean;
		var end_index:number = start_index + len;
		for(var i:number = start_index; i < end_index; i++) {
			var target:DisplayObject = sourceMovieClip.getChildAtSessionID(this.update_child_stream[i]);
			if (target != null) {
				doit = true;
				// check if the child is active + not blocked by script
				if (target.adapter && target.adapter.isBlockedByScript())
					doit = false;
				props_start_idx = this.update_child_props_indices_stream[i];
				props_len = this.update_child_props_length_stream[i];
				props_end_index = props_start_idx + props_len;
				for(var p:number = props_start_idx; p < props_end_index; p++) {
					props_type = this.property_type_stream[p];
					value_start_index = this.property_index_stream[p];
					switch(props_type){
						case 0:

							break;

						case 1:// displaytransform
							if (doit) {
								value_start_index *= 6;
								var new_matrix:Matrix3D = target._iMatrix3D;
								new_matrix.rawData[0] = this.properties_stream_f32_mtx_all[value_start_index++];
								new_matrix.rawData[1] = this.properties_stream_f32_mtx_all[value_start_index++];
								new_matrix.rawData[4] = this.properties_stream_f32_mtx_all[value_start_index++];
								new_matrix.rawData[5] = this.properties_stream_f32_mtx_all[value_start_index++];
								new_matrix.rawData[12] = this.properties_stream_f32_mtx_all[value_start_index++];
								new_matrix.rawData[13] = this.properties_stream_f32_mtx_all[value_start_index];

								target.x = new_matrix.rawData[12];
								target.y = new_matrix.rawData[13];

								target._elementsDirty = true;

								target.pInvalidateHierarchicalProperties(HierarchicalProperties.SCENE_TRANSFORM);
							}

							break;

						case 2:// colormatrix
							if (doit) {
								value_start_index *= 8;
								var new_ct:ColorTransform = target._iColorTransform || (target._iColorTransform = new ColorTransform());
								new_ct.redMultiplier = this.properties_stream_f32_ct[value_start_index++];
								new_ct.greenMultiplier = this.properties_stream_f32_ct[value_start_index++];
								new_ct.blueMultiplier = this.properties_stream_f32_ct[value_start_index++];
								new_ct.alphaMultiplier = this.properties_stream_f32_ct[value_start_index++];
								new_ct.redOffset = this.properties_stream_f32_ct[value_start_index++];
								new_ct.greenOffset = this.properties_stream_f32_ct[value_start_index++];
								new_ct.blueOffset = this.properties_stream_f32_ct[value_start_index++];
								new_ct.alphaOffset = this.properties_stream_f32_ct[value_start_index];

								target.pInvalidateHierarchicalProperties(HierarchicalProperties.COLOR_TRANSFORM);
							}

							break;

						case 3: //mask the mc with a list of objects

							// an object could have multiple groups of masks, in case a graphic clip was merged into the timeline
							// this is not implmeented in the runtime yet
							// for now, a second mask-groupd would overwrite the first one
							var mask:DisplayObject;
							var masks:Array<DisplayObject> = new Array<DisplayObject>();
							var numMasks:number = this.properties_stream_int[value_start_index++];

							//mask may not exist if a goto command moves the playhead to a point in the timeline after
							//one of the masks in a mask array has already been removed. Therefore a check is needed.
							for(var m:number = 0; m < numMasks; m++)
								if((mask = sourceMovieClip.getChildAtSessionID(this.properties_stream_int[value_start_index++])))
									masks.push(mask);

							target.masks = masks;

							break;

						case 4:// instance name movieclip instance
							target.name = this.properties_stream_strings[value_start_index];
							sourceMovieClip.adapter.registerScriptObject(target);

							break;

						case 5:// instance name button instance
							target.name = this.properties_stream_strings[value_start_index];
							// todo: creating the buttonlistenrs later should also be done, but for icycle i dont think this will cause problems
							(<MovieClip>target).addButtonListeners();
							sourceMovieClip.adapter.registerScriptObject(target);

							break;

						case 6://visible
							if (!target.adapter || !target.adapter.isVisibilityByScript())
								target.visible = Boolean(value_start_index);

							break;

						case 11:// displaytransform
							if (doit) {
								value_start_index *= 4;
								var new_matrix:Matrix3D = target._iMatrix3D;
								new_matrix.rawData[0] = this.properties_stream_f32_mtx_scale_rot[value_start_index++];
								new_matrix.rawData[1] = this.properties_stream_f32_mtx_scale_rot[value_start_index++];
								new_matrix.rawData[4] = this.properties_stream_f32_mtx_scale_rot[value_start_index++];
								new_matrix.rawData[5] = this.properties_stream_f32_mtx_scale_rot[value_start_index];
								target._elementsDirty = true;

								target.pInvalidateHierarchicalProperties(HierarchicalProperties.SCENE_TRANSFORM);
							}

							break;

						case 12:// displaytransform
							if (doit) {
								value_start_index *= 2;
								target.x = this.properties_stream_f32_mtx_pos[value_start_index++];
								target.y = this.properties_stream_f32_mtx_pos[value_start_index];
							}
							break;

						case 200:
							target.maskMode = true;
							break;

						case 201:
							target.masks = null;
							break;

						default:
							break;

					}
				}
			}
		}
	}
}

export = Timeline;