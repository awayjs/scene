import {WaveAudio, ColorTransform, IAsset, Matrix3D, Matrix} from "@awayjs/core";

import {Style} from "@awayjs/renderer";

import {Graphics} from "@awayjs/graphics";

import {IDisplayObjectAdapter} from "../adapters/IDisplayObjectAdapter";
import {IMovieClipAdapter} from "../adapters/IMovieClipAdapter";
import {HierarchicalProperties} from "../base/HierarchicalProperties";
import {Billboard} from "../display/Billboard";
import {MovieClip} from "../display/MovieClip";
import {Sprite} from "../display/Sprite";
import {TextField} from "../display/TextField";
import {TextFieldType} from "../text/TextFieldType";
import {MorphSprite} from "../display/MorphSprite";
import {DisplayObject} from "../display/DisplayObject";
import {DisplayObjectContainer} from "../display/DisplayObjectContainer";
import {FrameScriptManager} from "../managers/FrameScriptManager";


export class Timeline
{
	private _functions:Array<(child:DisplayObject, target_mc:MovieClip, i:number) => void> = [];
    private _blocked:boolean;
    
	public _update_indices:number[] = [];
	public _update_frames:number[] = [];
	public isButton:boolean = false;
	public _labels:Object;			// dictionary to store label => keyframeindex
	public _framescripts:Object;    // dictionary to store keyframeindex => ExecuteScriptCommand
	public _framescripts_translated:Object;    // dictionary to store keyframeindex => bool that keeps track of already converted scripts

	public avm1InitActions:Object;    // dictionary to store keyframeindex => ExecuteScriptCommand
	public avm1ButtonActions:any[];    // dictionary to store keyframeindex => ExecuteScriptCommand
	public avm1Exports:Object;    // dictionary to store keyframeindex => ExecuteScriptCommand


	public keyframe_indices:number[];     		//stores 1 keyframeindex per frameindex
	public keyframe_firstframes:number[];     	//stores the firstframe of each keyframe
	public keyframe_constructframes:number[];    //stores the previous fullConstruct keyframeindex

	public keyframe_durations:ArrayBufferView;    //only needed to calulcate other arrays

	// synched:
	public frame_command_indices:ArrayBufferView;
	public frame_recipe:ArrayBufferView;

	// synched:
	public command_index_stream:ArrayBufferView;
	public command_length_stream:ArrayBufferView;

	public add_child_stream:ArrayBufferView;
	public add_sounds_stream:ArrayBufferView;
	public remove_child_stream:ArrayBufferView;
	public update_child_stream:ArrayBufferView;

	public update_child_props_length_stream:ArrayBufferView;
	public update_child_props_indices_stream:ArrayBufferView;

	public property_index_stream:ArrayBufferView;
	public property_type_stream:ArrayBufferView;


	public properties_stream_int:ArrayBufferView;		// lists of ints used for property values. for now, only mask_ids are using ints

	// property_values_stream:
	public properties_stream_f32_mtx_all:ArrayBufferView;	// list of floats
	public properties_stream_f32_mtx_scale_rot:ArrayBufferView;	// list of floats
	public properties_stream_f32_mtx_pos:ArrayBufferView;	// list of floats
	public properties_stream_f32_ct:ArrayBufferView;	// list of floats
	public properties_stream_strings:Array<string>;

	private _potentialPrototypes:IAsset[];
	public potentialPrototypesInitEventsMap:any;
	public graphicsPool:any;
	public audioPool:any;

	public numKeyFrames:number=0;

	constructor()
	{

		this.keyframe_indices = [];

		this.avm1Exports={};
		this.avm1InitActions={};
		this.avm1ButtonActions=[];
		this.graphicsPool={};
		this.audioPool={};
		this.potentialPrototypesInitEventsMap={};
		this._potentialPrototypes = [];
		this._labels = {};
		this._framescripts = {};
		this._framescripts_translated = {};

		//cache functions
		this._functions[1] = this.update_mtx_all;
		this._functions[2] = this.update_colortransform;
		this._functions[3] = this.update_masks;
		this._functions[4] = this.update_name;
		this._functions[5] = this.update_button_name;
		this._functions[6] = this.update_visibility;
		this._functions[7] = this.update_blendmode;
		this._functions[8] = this.update_rendermode;
		this._functions[11] = this.update_mtx_scale_rot;
		this._functions[12] = this.update_mtx_pos;
		this._functions[200] = this.enable_maskmode;
		this._functions[201] = this.remove_masks;
		this._functions[202] = this.swap_graphics;
		this._functions[203] = this.set_ratio;
		this._functions[204] = this.start_audio;

	}

	public init():void
	{
		if((this.frame_command_indices == null)||(this.frame_recipe == null)||(this.keyframe_durations == null)){
			return;
        }

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
		if(this._framescripts[keyframe_index] == null)
			return "";

		if (typeof this._framescripts[keyframe_index] == "string")
			return this._framescripts[keyframe_index];
		else{
			throw new Error("Framescript is already translated to Function!!!");
		}
	}
	public add_framescript(value:any, keyframe_index:number):void
	{
		if(FrameScriptManager.frameScriptDebug){
			// todo: this is only for as2_as_js scripts
			// if we are in debug mode, we try to extract the function name from the first line of framescript code,
			// and check if this function is available on the object that is set as frameScriptDebug
			// try to get the functions name (it should be the first line as comment)
			var functionname = value.split(/[\r\n]+/g)[0].split("//")[1];
			if(FrameScriptManager.frameScriptDebug[functionname]){
				this._framescripts[keyframe_index] = FrameScriptManager.frameScriptDebug[functionname];
				this._framescripts_translated[keyframe_index]=true;
				return;
			}
			else{
				throw new Error("Framescript could not be found on FrameScriptManager.frameScriptDebug.\n the Object set as FrameScriptmanager.frameScriptDebug should contain a function with the name '"+functionname+"' !!!");
			}
		}
		this._framescripts[keyframe_index] = value;
	}

	private regexIndexOf(str : string, regex : RegExp, startpos : number) {
		var indexOf = str.substring(startpos || 0).search(regex);
		return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
	}


	public get_deferred_script(target_mc:MovieClip, frame_idx:number) : void
	{
	/*	if(this.avm1framescripts[frame_idx]!=null){
			//(<IMovieClipAdapter>target_mc.adapter).callFrameScript(this.avm1framescripts_translated[target_mc.currentFrameIndex]);
			MovieClip.avm1ScriptQueue.push(target_mc);
			MovieClip.avm1ScriptQueueScripts.push(this.avm1framescripts_translated[frame_idx]);
			
		}*/
	}

	public add_script_for_postcontruct(target_mc:MovieClip, keyframe_idx:number, scriptPass1:Boolean=false) : void
	{
		if(this._framescripts[keyframe_idx]!=null){
			if(this._framescripts_translated[keyframe_idx]==null){
				this._framescripts[keyframe_idx] = (<IMovieClipAdapter> target_mc.adapter).addScript(this._framescripts[keyframe_idx], keyframe_idx);
				this._framescripts_translated[keyframe_idx]=true;
			}
			//console.log("add framescript", target_mc, target_mc.name, keyframe_idx, scriptPass1 );
			if(scriptPass1)
				FrameScriptManager.add_script_to_queue(target_mc, this._framescripts[keyframe_idx]);
			else
				FrameScriptManager.add_script_to_queue_pass2(target_mc, this._framescripts[keyframe_idx]);

		}
    }
    
	public get_script_for_frame(target_mc:MovieClip, frame_index:number):any{

		var keyframe_idx:number=this.keyframe_firstframes[frame_index];
		if(this._framescripts[keyframe_idx]!=null){
			if(frame_index==0 || this.keyframe_firstframes[frame_index-1]!=keyframe_idx){
			
				if(this._framescripts_translated[keyframe_idx]==null){
					this._framescripts[keyframe_idx] = (<IMovieClipAdapter> target_mc.adapter).addScript(this._framescripts[keyframe_idx], keyframe_idx);
					this._framescripts_translated[keyframe_idx]=true;
				}	
				return this._framescripts[keyframe_idx];
			}
		}
    }
    
	public get numFrames():number
	{
		return this.keyframe_indices.length;
	}

	public get potentialPrototypes():Array<IAsset>
	{
		return this._potentialPrototypes;

	}

	public getPotentialChildPrototype(id:number):IAsset
	{
		return this._potentialPrototypes[id];

	}
	public getKeyframeIndexForFrameIndex(frame_index:number) : number
	{
		return this.keyframe_indices[frame_index];
	}

	public getPotentialChildInstance(id:number) : IAsset
	{
		var asset:IAsset=this._potentialPrototypes[id];
		if(asset.isAsset(Graphics)){
			//(<Graphics>asset).endFill();
			return asset;
		}
		else{
			var clonedInstance:DisplayObject=<DisplayObject> (<IDisplayObjectAdapter> asset.adapter).clone().adaptee;
			return clonedInstance;
		}
	}
	public initChildInstance(child:DisplayObject, id:string)
	{
        var placeObjectTag:any=this.potentialPrototypesInitEventsMap[id];
        (<any>child.adapter).placeObjectTag=null;
        (<any>child.adapter).initEvents=null;
        child.instanceID=id;
        // todo: refactor so the addedOnFrame can be set in nicer way
        child.addedOnFrame=parseInt(id.split("#")[1]);
        if(placeObjectTag && ((<any>placeObjectTag).variableName || (placeObjectTag.events && placeObjectTag.events.length>0))){
            (<any>child.adapter).placeObjectTag=placeObjectTag;
            (<any>child.adapter).initEvents=this.potentialPrototypesInitEventsMap[id];
        }
    }
    
	public registerPotentialChild(prototype:IAsset) : number
	{
		var id = this._potentialPrototypes.length;
		this._potentialPrototypes[id] = prototype;
		return id;
	}

	public extractHitArea(target_mc:MovieClip):DisplayObjectContainer{
		target_mc.reset(false);
		this.gotoFrame(target_mc, this.numFrames-1, false);
		var i:number=target_mc.numChildren;
		var hitArea:DisplayObjectContainer=new DisplayObjectContainer();
		var child:DisplayObject;
		var originalChild:DisplayObject;
		while(i>0){
			i--;
			originalChild=target_mc.getChildAt(i);
			child=originalChild.clone();
			//child.reset();

			child.x = originalChild.x;
			child.scaleX = originalChild.scaleX;
			child.y = originalChild.y;
			child.scaleY = originalChild.scaleY;
			child.rotationZ = originalChild.rotationZ;
			hitArea.addChild(child);
		}
		target_mc.pickObject=hitArea;
		target_mc.reset(false);
		return hitArea;
	}

	public jumpToLabel(target_mc:MovieClip, label:string, offset:number=0) : void
	{
		var key_frame_index:number = this._labels[label.toLowerCase()];
		if(key_frame_index >= 0)
			target_mc.currentFrameIndex = this.keyframe_firstframes[key_frame_index]+offset;
	}

	public getScriptForLabel(target_mc:MovieClip, label:string):any
	{
		var key_frame_index:number = this._labels[label.toLowerCase()];
		if(key_frame_index < 0)
			return null;
		if(key_frame_index >= 0 && this._framescripts[key_frame_index]!=null){
			if(this._framescripts_translated[key_frame_index]==null){
				this._framescripts[key_frame_index] = (<IMovieClipAdapter> target_mc.adapter).addScript(this._framescripts[key_frame_index], key_frame_index);
				this._framescripts_translated[key_frame_index]=true;
			}
			return this._framescripts[key_frame_index];
		}
	}

	public gotoFrame(target_mc:MovieClip, value:number, queue_script:boolean = true, queue_pass2:boolean = false, forceReconstruct:boolean=false):void
	{
		var current_keyframe_idx:number = target_mc.constructedKeyFrameIndex;
		var target_keyframe_idx:number = this.keyframe_indices[value];

        var jumpBackToSameKeyFrame:boolean=false;
		if (current_keyframe_idx == target_keyframe_idx){
            if(!forceReconstruct)
                return;
            //  if the mc is already on same keyframe, it must be on different frame,
            //  so it must be jumping back to the first frame of a keyframe
            jumpBackToSameKeyFrame=true;
        }


		var i:number;
        var child:DisplayObject;

		if (current_keyframe_idx + 1 == target_keyframe_idx) { // target_keyframe_idx is the next keyframe. we can just use constructnext for this
			this.constructNextFrame(target_mc, queue_script, true);
			return;
		}

		var break_frame_idx:number = this.keyframe_constructframes[target_keyframe_idx];

		//  we now have 3 index to keyframes: current_keyframe_idx / target_keyframe_idx / break_frame_idx

        var jump_forward:boolean = (target_keyframe_idx > current_keyframe_idx);
        if(jumpBackToSameKeyFrame){
            jump_forward=false;
        }
		var jump_gap:boolean = (break_frame_idx > current_keyframe_idx);

		// in case we jump forward, but not jump a gap, we start at current_keyframe_idx + 1
		// in case we jump back or we jump a gap, we want to start constructing at BreakFrame
		var start_construct_idx:number = (jump_forward && !jump_gap)? current_keyframe_idx + 1 : break_frame_idx;


		if (jump_gap){ // if we jump a gap forward, we just can remove all childs from mc. all script blockage will be gone
			for (i = target_mc.numChildren - 1; i >= 0; i--){
				if (target_mc._children[i]._depthID < 0)
                    target_mc.removeChildAt(i);
            }
        }

		//if we jump back, we want to reset all objects (but not the timelines of the mcs)
		// in other cases, we want to collect the current objects to compare state of targetframe with state of currentframe
        var depth_sessionIDs:Object = {};
        var test={};
		var new_depth_sessionIDs:Object={};
        if (jump_forward){
            var depth_sessionIDs2={};
            depth_sessionIDs = target_mc.getSessionIDDepths();
            for(var key in depth_sessionIDs){
                depth_sessionIDs2[key]={id:depth_sessionIDs[key], instanceID:"oldID"}
                test[key]={id:depth_sessionIDs[key], instanceID:"oldID"}
            }
            depth_sessionIDs=depth_sessionIDs2;
        }

		//pass1: only apply add/remove commands into depth_sessionIDs.
		this.pass1(target_mc, start_construct_idx, target_keyframe_idx, depth_sessionIDs, new_depth_sessionIDs, queue_pass2);

		// check what childs are alive on both frames.
		// child-instances that are not alive anymore get removed and unregistered
		// child-instances that are alive on both frames have their properties reset if we are jumping back
		// child-instances that are alive on both frames but have different instance-id get fully reset
		for (i = target_mc.numChildren - 1; i >= 0; i--) {
            child = target_mc._children[i];
			if (child._depthID < 0) {
				if (!depth_sessionIDs[child._depthID]){
					target_mc.removeChildAt(i);
                }
                else if (depth_sessionIDs[child._depthID].instanceID=="oldID"){
                    // child-instance was not changed by timeline (should never happen when jumping back)
                }
                else if (depth_sessionIDs[child._depthID].instanceID==child.instanceID){
                    // child-instance was not changed by timeline
                    // if we jump back we still want to reset the childs-properties
                    if(!jump_forward){
                        if(child._adapter) {
                            if (!(<IDisplayObjectAdapter> child.adapter).isColorTransformByScript()) {
                                child.transform.clearColorTransform();
                            }
                            if (!(<IDisplayObjectAdapter> child.adapter).isBlockedByScript()) {
                                child.transform.clearMatrix3D();
                                //this.name="";
                                child.masks = null;
                                child.maskMode = false;
                            }
                            if (!(<IDisplayObjectAdapter> child.adapter).isVisibilityByScript()) {
                                child.visible = true;
                            }
                        }
                        else{
                            child.transform.clearColorTransform();
                            child.transform.clearMatrix3D();
                            child.visible = true;
                            child.masks = null;
                            child.maskMode = false;                            
                        }
                    }
                }
                else if (depth_sessionIDs[child._depthID].instanceID!=child.instanceID){
                    //  child-instance was changed by timeline.
                    //  force a full reset by re-adding it to timeline
                    target_mc.removeChildAt(i);
                }                
			}
		}

		var child1:IAsset;

		// onClipevents for children added in previous frames must be queued before the script of the target_mc, 
		target_mc.preventScript=true;
		for (var key in depth_sessionIDs) {
			if(!new_depth_sessionIDs[key] && depth_sessionIDs[key].instanceID!="oldID"){
				child1 = target_mc.getPotentialChildInstance(depth_sessionIDs[key].id, depth_sessionIDs[key].instanceID);
				child=<DisplayObject>child1;
				if (child._sessionID == -1)
					target_mc._addTimelineChildAt(child, Number(key), depth_sessionIDs[key].id);
			}			
		}
		target_mc.preventScript=false;
		
		if (queue_script && this.keyframe_firstframes[target_keyframe_idx] == value) //frame changed. and firstframe of keyframe. execute framescript if available
			this.add_script_for_postcontruct(target_mc, target_keyframe_idx, !queue_pass2);

		// add children that was constructed on this frame
		for (var key in depth_sessionIDs) {
			if(new_depth_sessionIDs[key] && depth_sessionIDs[key].instanceID!="oldID"){
				child1 = target_mc.getPotentialChildInstance(depth_sessionIDs[key].id, depth_sessionIDs[key].instanceID);
				child=<DisplayObject>child1;
				if (child._sessionID == -1)
					target_mc._addTimelineChildAt(child, Number(key), depth_sessionIDs[key].id);
			}
		}

		//pass2: apply update commands for objects on stage (only if they are not blocked by script)
		this.pass2(target_mc);

        target_mc.constructedKeyFrameIndex = target_keyframe_idx;
	}

	public pass1(target_mc:MovieClip, start_construct_idx:number, target_keyframe_idx:number, depth_sessionIDs:Object, new_depth_sessionIDs:Object, queue_pass2:boolean):void
	{
		var i:number;
		var k:number;

		this._update_indices.length = 0;// store a list of updatecommand_indices, so we dont have to read frame_recipe again
        this._update_frames.length=0;
        var update_cnt = 0;
		var start_index:number;
        var end_index:number;
		for (k = start_construct_idx; k <= target_keyframe_idx; k++) {
			var frame_command_idx:number = this.frame_command_indices[k];
			var frame_recipe:number = this.frame_recipe[k];

			if (frame_recipe & 2) {
				// remove childs
				start_index = this.command_index_stream[frame_command_idx];
				end_index = start_index + this.command_length_stream[frame_command_idx++];
				for (i = start_index; i < end_index; i++)
					delete depth_sessionIDs[this.remove_child_stream[i] - 16383];
			}

			if (frame_recipe & 4) {
				start_index = this.command_index_stream[frame_command_idx];
				end_index = start_index + this.command_length_stream[frame_command_idx++];
				if(queue_pass2){
					for (i = end_index - 1; i >= start_index; i--)
						depth_sessionIDs[this.add_child_stream[i*2 + 1] - 16383] = {id:this.add_child_stream[i*2], instanceID:this.add_child_stream[i*2]+"#"+this.keyframe_firstframes[k]};
				}
				else{
					for (i =start_index; i < end_index; i++)
						depth_sessionIDs[this.add_child_stream[i*2 + 1] - 16383] = {id:this.add_child_stream[i*2], instanceID:this.add_child_stream[i*2]+"#"+this.keyframe_firstframes[k]};
				}
				if(k==target_keyframe_idx){
					if(queue_pass2){
						for (i = end_index - 1; i >= start_index; i--){	
							new_depth_sessionIDs[this.add_child_stream[i*2 + 1] - 16383] = true;
						}
					}
					else{
						for (i =start_index; i < end_index; i++){
							new_depth_sessionIDs[this.add_child_stream[i*2 + 1] - 16383] = true;
						}

					}
				}
				
			}

			if (frame_recipe & 8){
                this._update_frames[update_cnt] = this.keyframe_firstframes[k];
                this._update_indices[update_cnt++] = frame_command_idx++;// execute update command later

            }
				
			if (frame_recipe & 16 && k==target_keyframe_idx) {
                this.start_sounds(target_mc, frame_command_idx);
			}

		}
	}

	public pass2(target_mc:MovieClip):void
	{
		var k:number;
		var len:number = this._update_indices.length;
		for (k = 0; k < len; k++)
			this.update_childs(target_mc, this._update_indices[k], this._update_frames[k]);
	}

	/* constructs the next frame of a mc.
		the function expects the currentFrameIndex already to be incremented
	*/
	public constructNextFrame(target_mc:MovieClip, queueScript:Boolean = true, scriptPass1:Boolean = false):void
	{
		var frameIndex:number = target_mc.currentFrameIndex;
		var new_keyFrameIndex:number = this.keyframe_indices[frameIndex];

		if(queueScript && this.keyframe_firstframes[new_keyFrameIndex] == frameIndex)
			this.add_script_for_postcontruct(target_mc, new_keyFrameIndex, scriptPass1);

		if(target_mc.constructedKeyFrameIndex != new_keyFrameIndex) {
			target_mc.constructedKeyFrameIndex = new_keyFrameIndex;

			var frame_command_idx = this.frame_command_indices[new_keyFrameIndex];
			var frame_recipe = this.frame_recipe[new_keyFrameIndex];

			if(frame_recipe & 1) {
				for (var i:number = target_mc.numChildren - 1; i >= 0; i--)
					if (target_mc._children[i]._depthID < 0)
						target_mc.removeChildAt(i);
			} else if (frame_recipe & 2) {
				this.remove_childs_continous(target_mc, frame_command_idx++);
			}

			if(frame_recipe & 4)
				this.add_childs_continous(target_mc, frame_command_idx++);

			if(frame_recipe & 8)
				this.update_childs(target_mc, frame_command_idx++);

			if(frame_recipe & 16)
				this.start_sounds(target_mc, frame_command_idx++);
        }
	}



	public remove_childs_continous(sourceMovieClip:MovieClip, frame_command_idx:number):void
	{
		var start_index:number = this.command_index_stream[frame_command_idx];
		var end_index:number = start_index + this.command_length_stream[frame_command_idx];
		var depth:number;
		for(var i:number = start_index; i < end_index; i++){
            depth=this.remove_child_stream[i] - 16383;
            var idx:number=sourceMovieClip.getDepthIndexInternal(depth);
            if(idx>=0)
			    sourceMovieClip.removeChildAt(idx);
		}
	}


	public add_childs_continous(sourceMovieClip:MovieClip, frame_command_idx:number):void
	{
		// apply add commands in reversed order to have script exeucted in correct order.
		// this could be changed in exporter
		var idx:number;
		var start_index:number = this.command_index_stream[frame_command_idx];
		var end_index:number = start_index + this.command_length_stream[frame_command_idx];
		for (var i:number = start_index; i < end_index; i++) {
			idx = i*2;
			var childAsset:IAsset=sourceMovieClip.getPotentialChildInstance(this.add_child_stream[idx], this.add_child_stream[idx]+"#"+sourceMovieClip.currentFrameIndex);
			sourceMovieClip._addTimelineChildAt(<DisplayObject>childAsset, this.add_child_stream[idx + 1] - 16383, this.add_child_stream[idx]);//this.add_child_stream[idx]);
		}
	}

	public start_sounds(target_mc:MovieClip, frame_command_idx:number):void
	{
		var start_index:number = this.command_index_stream[frame_command_idx];
		var end_index:number = start_index + this.command_length_stream[frame_command_idx];
		for(var i:number = start_index; i < end_index; i++) {
			var audioProps:any = this.audioPool[this.add_sounds_stream[i]];
			if(audioProps){
                if(audioProps.cmd==15){// start sound
                    var child:WaveAudio = audioProps.sound;
                    if(audioProps.props.loopCount>0){
                        child.loopsToPlay=audioProps.props.loopCount;
                    }
                    else{
                        child.loopsToPlay=0;
                    }
                    target_mc.startSound(audioProps.id, child, child.loopsToPlay);
                }
                else if(audioProps.cmd==16){// stop sound
                    target_mc.stopSound(audioProps.id);
                }
				//console.log("start sound:", child);
			}
		}

	}
	public update_childs(target_mc:MovieClip, frame_command_idx:number, frameIdx:number=-1):void
	{
		var p:number;
		var props_start_idx:number;
		var props_end_index:number;
		var start_index:number = this.command_index_stream[frame_command_idx];
		var end_index:number = start_index + this.command_length_stream[frame_command_idx];
		var child:DisplayObject;
		for(var i:number = start_index; i < end_index; i++) {
		//for(var i:number = end_index; i >= start_index; i--) {
			child = target_mc.getChildAtSessionID(this.update_child_stream[i]);
			if (child) {
                if(frameIdx>0 && child.addedOnFrame>frameIdx)
                    continue;
                
				// check if the child is active + not blocked by script
				this._blocked = Boolean(child._adapter && (<IDisplayObjectAdapter> child.adapter).isBlockedByScript());

				props_start_idx = this.update_child_props_indices_stream[i];
				props_end_index = props_start_idx + this.update_child_props_length_stream[i];
				for(p = props_start_idx; p < props_end_index; p++)
                    this._functions[this.property_type_stream[p]].call(this, child, target_mc, this.property_index_stream[p]);
                    
			}
			else{
				//console.log("timeline: child not found");
			}
		}
	}

	public update_mtx_all(child:DisplayObject, target_mc:MovieClip, i:number):void
	{
		if (this._blocked)
			return;

		i *= 6;
		var new_matrix:Matrix3D = child.transform.matrix3D;
		new_matrix._rawData[0] = this.properties_stream_f32_mtx_all[i++];
		new_matrix._rawData[1] = this.properties_stream_f32_mtx_all[i++];
		new_matrix._rawData[4] = this.properties_stream_f32_mtx_all[i++];
		new_matrix._rawData[5] = this.properties_stream_f32_mtx_all[i++];
		new_matrix._rawData[12] = this.properties_stream_f32_mtx_all[i++];
		new_matrix._rawData[13] = this.properties_stream_f32_mtx_all[i];

		child.transform.invalidateComponents();
	}

	public update_colortransform(child:DisplayObject, target_mc:MovieClip, i:number):void
	{
		if (Boolean(child._adapter && (<IDisplayObjectAdapter> child.adapter).isColorTransformByScript()))	
			return;

		i *= 8;
		var new_ct:ColorTransform = child.transform.colorTransform || (child.transform.colorTransform = new ColorTransform());
		new_ct._rawData[0] = this.properties_stream_f32_ct[i++];
		new_ct._rawData[1] = this.properties_stream_f32_ct[i++];
		new_ct._rawData[2] = this.properties_stream_f32_ct[i++];
		new_ct._rawData[3] = this.properties_stream_f32_ct[i++];
		new_ct._rawData[4] = this.properties_stream_f32_ct[i++];
		new_ct._rawData[5] = this.properties_stream_f32_ct[i++];
		new_ct._rawData[6] = this.properties_stream_f32_ct[i++];
		new_ct._rawData[7] = this.properties_stream_f32_ct[i];

		child.transform.invalidateColorTransform();
	}

	public update_masks(child:DisplayObject, target_mc:MovieClip, i:number):void
	{
		// an object could have multiple groups of masks, in case a graphic clip was merged into the timeline
		// this is not implmeented in the runtime yet
		// for now, a second mask-groupd would overwrite the first one
		var mask:DisplayObject;
		var masks:Array<DisplayObject> = new Array<DisplayObject>();
		var numMasks:number = this.properties_stream_int[i++];

        if(numMasks==0){
            child.masks = null;
            return;
        }
		//mask may not exist if a goto command moves the playhead to a point in the timeline after
		//one of the masks in a mask array has already been removed. Therefore a check is needed.
		for(var m:number = 0; m < numMasks; m++)
			if((mask = target_mc.getChildAtSessionID(this.properties_stream_int[i++])))
                masks.push(mask);
        


		child.masks = masks;
	}

	public update_name(child:DisplayObject, target_mc:MovieClip, i:number):void
	{
		child.name = this.properties_stream_strings[i];
		(<IMovieClipAdapter> target_mc.adapter).registerScriptObject(child);
	}

	public update_button_name(target:DisplayObject, sourceMovieClip:MovieClip, i:number):void
	{
		target.name = this.properties_stream_strings[i];
		// todo: creating the buttonlistenrs later should also be done, but for icycle i dont think this will cause problems
		(<MovieClip> target).addButtonListeners();
		(<IMovieClipAdapter> sourceMovieClip.adapter).registerScriptObject(target);
	}

	public update_visibility(child:DisplayObject, target_mc:MovieClip, i:number):void
	{
		if (!child._adapter || !(<IDisplayObjectAdapter> child.adapter).isVisibilityByScript())
			child.visible = Boolean(i);
	}

	public update_mtx_scale_rot(child:DisplayObject, target_mc:MovieClip, i:number):void
	{
		if (this._blocked)
			return;

		i *= 4;

		var new_matrix:Matrix3D = child.transform.matrix3D;
		new_matrix._rawData[0] = this.properties_stream_f32_mtx_scale_rot[i++];
		new_matrix._rawData[1] = this.properties_stream_f32_mtx_scale_rot[i++];
		new_matrix._rawData[4] = this.properties_stream_f32_mtx_scale_rot[i++];
		new_matrix._rawData[5] = this.properties_stream_f32_mtx_scale_rot[i];

		child.transform.invalidateComponents();

		child._invalidateHierarchicalProperties(HierarchicalProperties.SCENE_TRANSFORM);
	}

	public update_mtx_pos(child:DisplayObject, target_mc:MovieClip, i:number):void
	{
		if (this._blocked)
			return;

		i *= 2;

		var new_matrix:Matrix3D = child.transform.matrix3D;
		new_matrix._rawData[12] = this.properties_stream_f32_mtx_pos[i++];
		new_matrix._rawData[13] = this.properties_stream_f32_mtx_pos[i];

		child.transform.invalidatePosition();
	}

	public enable_maskmode(child:DisplayObject, target_mc:MovieClip, i:number):void
	{
		child.maskMode = true;
	}

	public remove_masks(child:DisplayObject, target_mc:MovieClip, i:number):void
	{
		child.masks = null;
	}
	public swap_graphics(child:DisplayObject, target_mc:MovieClip, i:number):void
	{
		if(child.isAsset(Sprite)){
			var myGraphics:Graphics=<Graphics>this.graphicsPool[this.properties_stream_int[i]];
			//console.log("frame:", target_mc.currentFrameIndex ,"swap graphics: ", target_mc.id, i, myGraphics.id);
			(<Sprite>child).graphics.clear();
			(<Sprite>child).graphics.copyFrom(myGraphics);
		}
	}

	public start_audio(child:DisplayObject, target_mc:MovieClip, i:number):void
	{
	}
	public set_ratio(child:DisplayObject, target_mc:MovieClip, i:number):void
	{
		(<MorphSprite>child).setRatio(this.properties_stream_int[i]/0xffff);
	}

	public update_blendmode(child:DisplayObject, target_mc:MovieClip, i:number):void
	{
		console.log("update blendmode "+i);
	}
	public update_rendermode(child:DisplayObject, target_mc:MovieClip, i:number):void
	{
		console.log("update rendermode "+i);
	}
}