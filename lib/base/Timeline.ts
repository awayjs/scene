import { WaveAudio, ColorTransform, IAsset, Matrix3D } from '@awayjs/core';
import { Graphics } from '@awayjs/graphics';
import { IDisplayObjectAdapter } from '../adapters/IDisplayObjectAdapter';
import { IMovieClipAdapter } from '../adapters/IMovieClipAdapter';
import { HierarchicalProperties } from '../base/HierarchicalProperties';
import { MovieClip } from '../display/MovieClip';
import { Sprite } from '../display/Sprite';
import { MorphSprite } from '../display/MorphSprite';
import { DisplayObject } from '../display/DisplayObject';
import { DisplayObjectContainer } from '../display/DisplayObjectContainer';
import { FrameScriptManager } from '../managers/FrameScriptManager';
import { IFrameLabel } from './IFrameLabel';
import { TimelineActionType } from './TimelineActionType';
import { IFilter } from '../adapters/IFilter';
import { BlendMode } from '@awayjs/stage';

const BLEND_MODES = [
	'', BlendMode.NORMAL, BlendMode.LAYER,
	BlendMode.MULTIPLY, BlendMode.SCREEN,
	BlendMode.LIGHTEN, BlendMode.DARKEN,
	BlendMode.DIFFERENCE, BlendMode.ADD,
	BlendMode.SUBTRACT, BlendMode.INVERT,
	BlendMode.ALPHA, BlendMode.ERASE, BlendMode.OVERLAY,
	BlendMode.HARDLIGHT
];

function mapBlendIdToString(id: number = 1): string {
	return BLEND_MODES[id] || BLEND_MODES[1];
}

export class Timeline {
	private _functions: Array<(child: DisplayObject, target_mc: MovieClip, i: number) => void> = [];
	private _blocked: boolean;

	public _update_indices: number[] = [];
	public _update_frames: number[] = [];
	public isButton: boolean = false;
	public _labels: StringMap<IFrameLabel>;			// dictionary to store label => keyframeindex

	public avm1InitActions: Object;    // dictionary to store keyframeindex => ExecuteScriptCommand
	public avm1ButtonActions: any[];    // dictionary to store keyframeindex => ExecuteScriptCommand
	public avm1Exports: Object;    // dictionary to store keyframeindex => ExecuteScriptCommand

	//	framescripts are not stored by keyframe-index, but by frameIdx
	//	this makes it easy to get/set framescripts on the fly, even when no keyframe exists for that frame
	private _framescripts: Object;
	private _framescripts_translated: Object;

	public keyframe_to_frameidx: Object;
	public keyframe_indices: number[];     		//stores 1 keyframeindex per frameindex
	public keyframe_firstframes: number[];     	//stores the firstframe of each keyframe
	public keyframe_constructframes: number[];    //stores the previous fullConstruct keyframeindex

	public keyframe_durations: ArrayBufferView;    //only needed to calulcate other arrays

	// synched:
	public frame_command_indices: ArrayBufferView;
	public frame_recipe: ArrayBufferView;

	// synched:
	public command_index_stream: ArrayBufferView;
	public command_length_stream: ArrayBufferView;

	public add_child_stream: ArrayBufferView;
	public add_sounds_stream: ArrayBufferView;
	public remove_child_stream: ArrayBufferView;
	public update_child_stream: ArrayBufferView;

	public update_child_props_length_stream: ArrayBufferView;
	public update_child_props_indices_stream: ArrayBufferView;

	public property_index_stream: ArrayBufferView;
	public property_type_stream: ArrayBufferView;

	public properties_stream_int: ArrayBufferView;		// lists of ints used for property values. for now, only mask_ids are using ints

	// property_values_stream:
	public properties_stream_f32_mtx_all: ArrayBufferView;	// list of floats
	public properties_stream_f32_mtx_scale_rot: ArrayBufferView;	// list of floats
	public properties_stream_f32_mtx_pos: ArrayBufferView;	// list of floats
	public properties_stream_f32_ct: ArrayBufferView;	// list of floats
	public properties_stream_strings: string[];

	public properties_stream_filters: IFilter[];

	private _potentialPrototypes: IAsset[];
	public potentialPrototypesInitEventsMap: any;
	public graphicsPool: any;
	public audioPool: any;

	public numKeyFrames: number=0;

	constructor() {

		this.keyframe_indices = [];

		this.avm1Exports = {};
		this.avm1InitActions = {};
		this.avm1ButtonActions = [];
		this.graphicsPool = {};
		this.audioPool = {};
		this.potentialPrototypesInitEventsMap = {};
		this._potentialPrototypes = [];
		this._labels = {};
		this._framescripts = {};
		this._framescripts_translated = {};

		this.keyframe_to_frameidx = {};

		//cache functions
		this._functions[TimelineActionType.UPDATE_MTX] =  this.update_mtx_all.bind(this);
		this._functions[TimelineActionType.UPDATE_CMTX] =  this.update_colortransform.bind(this);
		this._functions[TimelineActionType.UPDATE_MASKS] =  this.update_masks.bind(this);
		this._functions[TimelineActionType.UPDATE_NAME] =  this.update_name.bind(this);
		this._functions[TimelineActionType.UPDATE_BUTTON_NAME] =  this.update_button_name.bind(this);
		this._functions[TimelineActionType.UPDATE_VISIBLE] =  this.update_visibility.bind(this);
		this._functions[TimelineActionType.UPDATE_BLENDMODE] =  this.update_blendmode.bind(this);
		this._functions[TimelineActionType.UPDATE_RENDERMODE] =  this.update_rendermode.bind(this);
		this._functions[TimelineActionType.UPDATE_FILTERS] =  this.update_filters.bind(this);
		this._functions[TimelineActionType.UPDATE_SCALE_ROT] =  this.update_mtx_scale_rot.bind(this);
		this._functions[TimelineActionType.UPDATE_POS] =  this.update_mtx_pos.bind(this);
		this._functions[TimelineActionType.ENABLE_MASKMODE] =  this.enable_maskmode.bind(this);
		this._functions[TimelineActionType.REMOVE_MASK] =  this.remove_masks.bind(this);
		this._functions[TimelineActionType.SWAP_GRAPHICS] =  this.swap_graphics.bind(this);
		this._functions[TimelineActionType.SET_RATIO] =  this.set_ratio.bind(this);
		this._functions[TimelineActionType.START_AUDIO] =  this.start_audio.bind(this);

	}

	public resetScripts() {
		this._framescripts = {};
		this._framescripts_translated = {};
	}

	public init(): void {
		if ((this.frame_command_indices == null) || (this.frame_recipe == null) || (this.keyframe_durations == null)) {
			return;
		}

		this.keyframe_firstframes = [];
		this.keyframe_constructframes = [];
		this.keyframe_indices = [];
		let frame_cnt = 0;
		let ic = 0;
		let ic2 = 0;
		let keyframe_cnt = 0;
		let last_construct_frame = 0;
		this.keyframe_to_frameidx = {};
		this.keyframe_to_frameidx[0] = 0;
		let duration_all = 0;
		for (ic = 0; ic < this.numKeyFrames; ic++) {

			this.keyframe_to_frameidx[ic] = duration_all;
			const duration = this.keyframe_durations[(ic)];
			duration_all += duration;
			if (this.frame_recipe[ic] & 1)
				last_construct_frame = keyframe_cnt;

			this.keyframe_firstframes[keyframe_cnt] = frame_cnt;
			this.keyframe_constructframes[keyframe_cnt++] = last_construct_frame;

			for (ic2 = 0; ic2 < duration; ic2++)
				this.keyframe_indices[frame_cnt++] = ic;
			//frame_cnt+=this.keyframe_durations[(ic)];
		}
	}

	public get_framescript(frame_index: number): string {
		if (this._framescripts[frame_index] == null)
			return '';

		if (typeof this._framescripts[frame_index] == 'string')
			return this._framescripts[frame_index];
		else {
			throw new Error('Framescript is already translated to Function!!!');
		}
	}

	private script_mc_id: number=-1;
	public add_framescript(script: any, frame_idx: number, target_mc: MovieClip): void {
		if (this.script_mc_id >= 0 && target_mc.id != this.script_mc_id)
			return;
		this.script_mc_id = target_mc.id;

		if (!this._framescripts[frame_idx]) {
			this._framescripts[frame_idx] = [];
		}
		this._framescripts[frame_idx].push(script);
	}

	private regexIndexOf(str: string, regex: RegExp, startpos: number) {
		const indexOf = str.substring(startpos || 0).search(regex);
		return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
	}

	public get_deferred_script(target_mc: MovieClip, frame_idx: number): void {
		/*	if(this.avm1framescripts[frame_idx]!=null){
			(<IMovieClipAdapter>target_mc.adapter)
				.callFrameScript(this.avm1framescripts_translated[target_mc.currentFrameIndex]);
			MovieClip.avm1ScriptQueue.push(target_mc);
			MovieClip.avm1ScriptQueueScripts.push(this.avm1framescripts_translated[frame_idx]);

		}*/
	}

	public add_script_for_postcontruct(target_mc: MovieClip, frame_idx: number, scriptPass1: Boolean = false): void {
		// todo: better was to check if this avm1 or avm2 mc:
		if ((<any>target_mc.adapter).clearPropsDic) {
			// in avm2 script might not yet exists, because its created by constructor
			// to handle this for now, while keeping our original order of scripts
			// we queue the frame_idx, and when exeucting the script we
			// check if its a number and try to get the script again

			if (scriptPass1)
				FrameScriptManager.add_script_to_queue(target_mc, frame_idx);
			else
				FrameScriptManager.add_script_to_queue_pass2(target_mc, frame_idx);

			return;
		}
		if (this._framescripts[frame_idx] != null) {
			if (this._framescripts_translated[frame_idx] == null) {
				this._framescripts[frame_idx] =
					(<IMovieClipAdapter>target_mc.adapter).addScript(this._framescripts[frame_idx], frame_idx);

				this._framescripts_translated[frame_idx] = true;
			}
			//console.log("add framescript", target_mc, target_mc.name, keyframe_idx, scriptPass1 );
			if (scriptPass1)
				FrameScriptManager.add_script_to_queue(target_mc, this._framescripts[frame_idx]);
			else
				FrameScriptManager.add_script_to_queue_pass2(target_mc, this._framescripts[frame_idx]);

		}
	}

	public get_script_for_frame(target_mc: MovieClip, frame_idx: number): any {

		if (frame_idx >= 0 && this._framescripts[frame_idx] != null) {
			if (this._framescripts_translated[frame_idx] == null) {
				this._framescripts[frame_idx] =
					(<IMovieClipAdapter>target_mc.adapter).addScript(this._framescripts[frame_idx], frame_idx);
				this._framescripts_translated[frame_idx] = true;
			}
			return this._framescripts[frame_idx];

		}
	}

	public get numFrames(): number {
		return this.keyframe_indices.length;
	}

	public getPotentialChildPrototype(id: number): IAsset {
		return this._potentialPrototypes[id];

	}

	public getKeyframeIndexForFrameIndex(frame_index: number): number {
		return this.keyframe_indices[frame_index];
	}

	public getPotentialChildInstance(id: number, instanceID: string = null): IAsset {
		const asset: IAsset = this._potentialPrototypes[id];
		if (asset.isAsset(Sprite)) {
			//In the case of Sprites, do not duplicate graphics
			//(<Graphics>asset).endFill();
			const sprite: Sprite = Sprite.getNewSprite((<Sprite> asset).graphics);
			sprite.mouseEnabled = false;

			return sprite;
		}

		if (asset.isAsset(MorphSprite)) {
			//In the case of Sprites, do not duplicate graphics
			//(<Graphics>asset).endFill();
			const morphSprite: MorphSprite = MorphSprite.getNewMorphSprite((<MorphSprite> asset).graphics);
			morphSprite.mouseEnabled = false;

			return morphSprite;
		}
		return (<any> asset.adapter).clone(false).adaptee;
	}

	public initChildInstance(child: DisplayObject, id: string) {
		const placeObjectTag: any = this.potentialPrototypesInitEventsMap[id];
		(<any>child.adapter).placeObjectTag = null;
		(<any>child.adapter).initEvents = null;
		child.instanceID = id;
		// todo: refactor so the addedOnFrame can be set in nicer way
		child.addedOnFrame = parseInt(id.split('#')[1]);

		if (placeObjectTag
				&& ((<any>placeObjectTag).variableName
				|| (placeObjectTag.events && placeObjectTag.events.length > 0))) {

			(<any>child.adapter).placeObjectTag = placeObjectTag;
			(<any>child.adapter).initEvents = this.potentialPrototypesInitEventsMap[id];
		}
	}

	public registerPotentialChild(prototype: IAsset): number {
		const id = this._potentialPrototypes.length;
		this._potentialPrototypes[id] = prototype;
		return id;
	}

	public extractHitArea(target_mc: MovieClip): DisplayObjectContainer {
		target_mc.reset(false);
		this.gotoFrame(target_mc, this.numFrames - 1, false);
		let i: number = target_mc.numChildren;
		const hitArea: DisplayObjectContainer = new DisplayObjectContainer();
		let child: DisplayObject;
		let originalChild: DisplayObject;
		while (i > 0) {
			i--;
			originalChild = target_mc.getChildAt(i);
			child = originalChild.clone();
			//child.reset();

			child.x = originalChild.x;
			child.scaleX = originalChild.scaleX;
			child.y = originalChild.y;
			child.scaleY = originalChild.scaleY;
			child.rotationZ = originalChild.rotationZ;
			hitArea.addChild(child);
		}
		hitArea.pickObjectFromTimeline = true;
		target_mc.pickObject = hitArea;
		target_mc.reset(false);
		return hitArea;
	}

	public getCurrentFrameLabel(target_mc: MovieClip): string {
		for (const key in this._labels) {
			if (this._labels[key].keyFrameIndex == target_mc.constructedKeyFrameIndex) {
				return this._labels[key].name;
			}
		}
		return null;
	}

	public getCurrentLabel(target_mc: MovieClip): string {
		let label: string = null;
		let lastLabelframeIdx: number = -1;

		for (const key in this._labels) {
			const keyIndex = this._labels[key].keyFrameIndex;

			if (keyIndex > lastLabelframeIdx && keyIndex <= target_mc.constructedKeyFrameIndex) {
				lastLabelframeIdx = keyIndex;
				label = this._labels[key].name;
			}
		}
		return label;
	}

	public jumpToLabel(target_mc: MovieClip, label: string, offset: number = 0): void {
		if (!this._labels[label]) {
			console.warn('[TIMELINE] - jumpToLabel with invalid label', target_mc, label, offset);
			return;
		}
		const key_frame_index: number = this._labels[label].keyFrameIndex;
		if (key_frame_index >= 0)
			target_mc.currentFrameIndex = this.keyframe_firstframes[key_frame_index] + offset;
	}

	public getScriptForLabel(target_mc: MovieClip, label: string): any {
		const key_frame_index: number = this._labels[label.toLowerCase()].keyFrameIndex;

		if (key_frame_index < 0)
			return null;

		const frameIdx: number = this.keyframe_firstframes[key_frame_index];

		if (frameIdx >= 0 && this._framescripts[frameIdx] != null) {
			if (this._framescripts_translated[frameIdx] == null) {

				this._framescripts[frameIdx] =
					(<IMovieClipAdapter>target_mc.adapter).addScript(this._framescripts[frameIdx], frameIdx);

				this._framescripts_translated[frameIdx] = true;
			}
			return this._framescripts[frameIdx];
		}
	}

	public gotoFrame(
		target_mc: MovieClip, frame_idx: number,
		queue_script: boolean = true, queue_pass2: boolean = false,
		forceReconstruct: boolean = false): void {

		const current_keyframe_idx: number = target_mc.constructedKeyFrameIndex;
		const target_keyframe_idx: number = this.keyframe_indices[frame_idx];

		let jumpBackToSameKeyFrame: boolean = false;
		if (current_keyframe_idx == target_keyframe_idx) {
			if (!forceReconstruct)
				return;
			//  if the mc is already on same keyframe, it must be on different frame,
			//  so it must be jumping back to the first frame of a keyframe
			jumpBackToSameKeyFrame = true;
		}

		let i: number;
		let child: DisplayObject;

		// target_keyframe_idx is the next keyframe. we can just use constructnext for this
		if (current_keyframe_idx + 1 == target_keyframe_idx) {
			this.constructNextFrame(target_mc, queue_script, true);
			return;
		}

		const break_frame_idx: number = this.keyframe_constructframes[target_keyframe_idx];

		//  we now have 3 index to keyframes: current_keyframe_idx / target_keyframe_idx / break_frame_idx

		let jump_forward: boolean = (target_keyframe_idx > current_keyframe_idx);
		if (jumpBackToSameKeyFrame) {
			jump_forward = false;
		}
		const jump_gap: boolean = (break_frame_idx > current_keyframe_idx);

		// in case we jump forward, but not jump a gap, we start at current_keyframe_idx + 1
		// in case we jump back or we jump a gap, we want to start constructing at BreakFrame
		const start_construct_idx: number = (jump_forward && !jump_gap) ? current_keyframe_idx + 1 : break_frame_idx;

		// if we jump a gap forward, we just can remove all childs from mc. all script blockage will be gone
		if (jump_gap) {
			for (i = target_mc.numChildren - 1; i >= 0; i--) {
				if (target_mc._children[i]._depthID < 0)
					target_mc.removeChildAt(i);
			}
		}
		if (target_mc.adapter && target_mc.adapter['$Bg__setPropDict'] && (<any>target_mc.adapter).clearPropsDic) {
			(<any>target_mc.adapter).clearPropsDic();

		}

		// if we jump back, we want to reset all objects (but not the timelines of the mcs)
		// in other cases, we want to collect the current objects
		// to compare state of targetframe with state of currentframe

		let depth_sessionIDs: Object = {};
		const new_depth_sessionIDs: Object = {};
		if (jump_forward) {
			const depth_sessionIDs2 = {};
			depth_sessionIDs = target_mc.getSessionIDDepths();

			for (const key in depth_sessionIDs) {
				depth_sessionIDs2[key] = { id:depth_sessionIDs[key], instanceID:'oldID' };
			}
			depth_sessionIDs = depth_sessionIDs2;
		}

		//pass1: only apply add/remove commands into depth_sessionIDs.
		this.pass1(
			target_mc,
			start_construct_idx,
			target_keyframe_idx,
			depth_sessionIDs,
			new_depth_sessionIDs,
			queue_pass2);

		// check what childs are alive on both frames.
		// child-instances that are not alive anymore get removed and unregistered
		// child-instances that are alive on both frames have their properties reset if we are jumping back
		// child-instances that are alive on both frames but have different instance-id get fully reset
		for (i = target_mc.numChildren - 1; i >= 0; i--) {
			child = target_mc._children[i];
			// only timeline childs will have a insanceID assigned
			if ((<any>child).instanceID !== '') {
				if (!depth_sessionIDs[child._depthID]) {
					target_mc.removeChildAt(i);
				} else if (depth_sessionIDs[child._depthID].instanceID == 'oldID') {
					// child-instance was not changed by timeline (should never happen when jumping back)
				} else if (depth_sessionIDs[child._depthID].instanceID == child.instanceID) {
					// child-instance was not changed by timeline
					// if we jump back we still want to reset the childs-properties
					if (!jump_forward) {
						const adapter = <IDisplayObjectAdapter>child._adapter;

						if (child._adapter) {
							if (!adapter.isColorTransformByScript()) {
								child.transform.clearColorTransform();
							}
							if (!adapter.isBlockedByScript() && !(<any>child).noTimelineUpdate) {
								child.transform.clearMatrix3D();
								//this.name="";
								child.masks = null;
								child.maskMode = false;
							}
							if (!(<IDisplayObjectAdapter> child.adapter).isVisibilityByScript()) {
								child.visible = true;
							}
						} else {
							child.transform.clearColorTransform();
							child.transform.clearMatrix3D();
							child.visible = true;
							child.masks = null;
							child.maskMode = false;
						}
					}
				} else if (depth_sessionIDs[child._depthID].instanceID != child.instanceID) {
					//  child-instance was changed by timeline.
					//  force a full reset by re-adding it to timeline
					target_mc.removeChildAt(i);
				}
			}
		}

		// add the children that have been placed on frames that we jumped but are still alive
		// for this childs, the initAdapter should execute before any framescripts
		// for as3, the adapter should to be recloned, so that it can do a clean constructor
		// framescripts for this child should not be executed (// todo: double check)
		target_mc.preventScript = true;
		for (const key in depth_sessionIDs) {
			if (!new_depth_sessionIDs[key] && depth_sessionIDs[key].instanceID != 'oldID') {
				child = <DisplayObject>target_mc.getPotentialChildInstance(
					depth_sessionIDs[key].id, depth_sessionIDs[key].instanceID, false);

				if (child._sessionID <= -1) {
					child = <DisplayObject>target_mc.getPotentialChildInstance(
						depth_sessionIDs[key].id, depth_sessionIDs[key].instanceID, true);
					target_mc._addTimelineChildAt(child, Number(key), depth_sessionIDs[key].id);
				}
			}
		}
		target_mc.preventScript = false;

		// if there is a framescript on this frame, we queue it now, so it sits after the initAdapter of the children
		if (queue_script)
			this.add_script_for_postcontruct(target_mc, frame_idx, !queue_pass2);

		// add the children that have been placed on the target frame
		// only reclone if it did not exists on the mc already
		// for this childs, we queue the framescripts
		for (const key in depth_sessionIDs) {
			if (new_depth_sessionIDs[key] && depth_sessionIDs[key].instanceID != 'oldID') {
				child = <DisplayObject>target_mc.getPotentialChildInstance(
					depth_sessionIDs[key].id, depth_sessionIDs[key].instanceID, false);

				if (child._sessionID <= -1) {
					child = <DisplayObject>target_mc.getPotentialChildInstance(
						depth_sessionIDs[key].id, depth_sessionIDs[key].instanceID, true);
					target_mc._addTimelineChildAt(child, Number(key), depth_sessionIDs[key].id);
				}
			}
		}

		//pass2: apply update commands for objects on stage (only if they are not blocked by script)
		this.pass2(target_mc);

		target_mc.constructedKeyFrameIndex = target_keyframe_idx;

		target_mc.finalizeTimelineConstruction();
	}

	public pass1(
		target_mc: MovieClip, start_construct_idx: number,
		target_keyframe_idx: number, depth_sessionIDs: Object,
		new_depth_sessionIDs: Object, queue_pass2: boolean): void {

		let i: number;
		let k: number;

		// store a list of updatecommand_indices, so we dont have to read frame_recipe again
		this._update_indices.length = 0;
		this._update_frames.length = 0;
		let update_cnt = 0;
		let start_index: number;
		let end_index: number;
		for (k = start_construct_idx; k <= target_keyframe_idx; k++) {
			let frame_command_idx: number = this.frame_command_indices[k];
			const frame_recipe: number = this.frame_recipe[k];

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
				if (queue_pass2) {
					for (i = end_index - 1; i >= start_index; i--)
						depth_sessionIDs[this.add_child_stream[i * 2 + 1] - 16383] = {
							id: this.add_child_stream[i * 2],
							instanceID:this.add_child_stream[i * 2] + '#' + this.keyframe_firstframes[k]
						};
				} else {
					for (i = start_index; i < end_index; i++)
						depth_sessionIDs [this.add_child_stream[i * 2 + 1] - 16383] = {
							id: this.add_child_stream[i * 2],
							instanceID: this.add_child_stream[i * 2] + '#' + this.keyframe_firstframes[k]
						};
				}
				if (k == target_keyframe_idx) {
					if (queue_pass2) {
						for (i = end_index - 1; i >= start_index; i--) {
							new_depth_sessionIDs[this.add_child_stream[i * 2 + 1] - 16383] = true;
						}
					} else {
						for (i = start_index; i < end_index; i++) {
							new_depth_sessionIDs[this.add_child_stream[i * 2 + 1] - 16383] = true;
						}

					}
				}

			}

			if (frame_recipe & 8) {
				this._update_frames[update_cnt] = this.keyframe_firstframes[k];
				this._update_indices[update_cnt++] = frame_command_idx++;// execute update command later

			}

			if (frame_recipe & 16 && k == target_keyframe_idx) {
				this.start_sounds(target_mc, frame_command_idx);
			}

		}
	}

	public pass2(target_mc: MovieClip): void {
		let k: number;
		const len: number = this._update_indices.length;
		for (k = 0; k < len; k++)
			this.update_childs(target_mc, this._update_indices[k], this._update_frames[k]);
	}

	/* constructs the next frame of a mc.
		the function expects the currentFrameIndex already to be incremented
	*/
	public constructNextFrame(target_mc: MovieClip, queueScript: Boolean = true, scriptPass1: Boolean = false): void {
		const frameIndex: number = target_mc.currentFrameIndex;
		const new_keyFrameIndex: number = this.keyframe_indices[frameIndex];

		if (queueScript)
			this.add_script_for_postcontruct(target_mc, frameIndex, scriptPass1);

		if (target_mc.constructedKeyFrameIndex != new_keyFrameIndex) {
			target_mc.constructedKeyFrameIndex = new_keyFrameIndex;

			let frame_command_idx = this.frame_command_indices[new_keyFrameIndex];
			const frame_recipe = this.frame_recipe[new_keyFrameIndex];

			if (frame_recipe & 1) {
				for (let i: number = target_mc.numChildren - 1; i >= 0; i--)
					if (target_mc._children[i]._depthID < 0)
						target_mc.removeChildAt(i);
			} else if (frame_recipe & 2) {
				this.remove_childs_continous(target_mc, frame_command_idx++);
			}

			if (frame_recipe & 4)
				this.add_childs_continous(target_mc, frame_command_idx++);

			if (frame_recipe & 8)
				this.update_childs(target_mc, frame_command_idx++);

			if (frame_recipe & 16)
				this.start_sounds(target_mc, frame_command_idx++);

			target_mc.finalizeTimelineConstruction();
		}
	}

	public remove_childs_continous(sourceMovieClip: MovieClip, frame_command_idx: number): void {
		const start_index: number = this.command_index_stream[frame_command_idx];
		const end_index: number = start_index + this.command_length_stream[frame_command_idx];

		for (let i: number = start_index; i < end_index; i++) {
			const depth = this.remove_child_stream[i] - 16383;
			const idx: number = sourceMovieClip.getDepthIndexInternal(depth);

			if (idx >= 0) {
				sourceMovieClip.removeChildAt(idx);
			}
		}
	}

	public add_childs_continous(sourceMovieClip: MovieClip, frame_command_idx: number): void {
		// apply add commands in reversed order to have script exeucted in correct order.
		// this could be changed in exporter
		let idx: number;
		const start_index: number = this.command_index_stream[frame_command_idx];
		const end_index: number = start_index + this.command_length_stream[frame_command_idx];
		for (let i: number = start_index; i < end_index; i++) {
			idx = i * 2;
			if (typeof this.add_child_stream[idx] === 'undefined') {
				console.log(
					'ERROR in timeline. could not find child-id in child_stream for idx', idx, this.add_child_stream);
				continue;
			}
			const childAsset: IAsset = sourceMovieClip.getPotentialChildInstance(
				this.add_child_stream[idx],
				this.add_child_stream[idx] + '#' + sourceMovieClip.currentFrameIndex,
				true);

			sourceMovieClip._addTimelineChildAt(
				<DisplayObject>childAsset,
				this.add_child_stream[idx + 1] - 16383,
				this.add_child_stream[idx]);//this.add_child_stream[idx]);
		}
	}

	public start_sounds(target_mc: MovieClip, frame_command_idx: number): void {
		const start_index: number = this.command_index_stream[frame_command_idx];
		const end_index: number = start_index + this.command_length_stream[frame_command_idx];

		for (let i: number = start_index; i < end_index; i++) {
			const audioProps: any = this.audioPool[this.add_sounds_stream[i]];

			if (audioProps) {
				if (audioProps.cmd == 15) {// start sound
					const child: WaveAudio = audioProps.sound;

					if (!child) {
						console.warn('[Timeline] Missed sound to start!', audioProps);
						return;
					}

					if (audioProps.props.loopCount > 0) {
						child.loopsToPlay = audioProps.props.loopCount;
					} else {
						child.loopsToPlay = 0;
					}

					target_mc.startSound(audioProps.id, child, child.loopsToPlay);
				} else if (audioProps.cmd == 16) {// stop sound
					target_mc.stopSound(audioProps.id);
				}
				//console.log("start sound:", child);
			}
		}

	}

	public update_childs(target_mc: MovieClip, frame_command_idx: number, frameIdx: number = -1): void {
		let p: number;
		let props_start_idx: number;
		let props_end_index: number;
		const start_index: number = this.command_index_stream[frame_command_idx];
		const end_index: number = start_index + this.command_length_stream[frame_command_idx];
		let child: DisplayObject;
		for (let i: number = start_index; i < end_index; i++) {
		//for(var i:number = end_index; i >= start_index; i--) {
			child = target_mc.getChildAtSessionID(this.update_child_stream[i]);
			if (child) {
				if (frameIdx > 0 && child.addedOnFrame > frameIdx)
					continue;

				// check if the child is active + not blocked by script
				this._blocked = Boolean(child._adapter && (<IDisplayObjectAdapter> child.adapter).isBlockedByScript());

				props_start_idx = this.update_child_props_indices_stream[i];
				props_end_index = props_start_idx + this.update_child_props_length_stream[i];
				for (p = props_start_idx; p < props_end_index; p++)
					this._functions[this.property_type_stream[p]](child, target_mc, this.property_index_stream[p]);

			} else {
				//console.log("timeline: child not found");
			}
		}
	}

	public update_mtx_all(child: DisplayObject, target_mc: MovieClip, i: number): void {
		if (this._blocked || (<any>child).noTimelineUpdate)
			return;

		i *= 6;
		const new_matrix: Matrix3D = child.transform.matrix3D;
		new_matrix._rawData[0] = this.properties_stream_f32_mtx_all[i++];
		new_matrix._rawData[1] = this.properties_stream_f32_mtx_all[i++];
		new_matrix._rawData[4] = this.properties_stream_f32_mtx_all[i++];
		new_matrix._rawData[5] = this.properties_stream_f32_mtx_all[i++];
		new_matrix._rawData[12] = this.properties_stream_f32_mtx_all[i++];
		new_matrix._rawData[13] = this.properties_stream_f32_mtx_all[i];

		child.transform.invalidateComponents();
	}

	public update_colortransform(child: DisplayObject, target_mc: MovieClip, i: number): void {
		if (child._adapter && (<IDisplayObjectAdapter> child.adapter).isColorTransformByScript())
			return;

		i *= 8;
		const new_ct: ColorTransform =
			child.transform.colorTransform || (child.transform.colorTransform = new ColorTransform());

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

	public update_masks(child: DisplayObject, target_mc: MovieClip, i: number): void {
		// an object could have multiple groups of masks, in case a graphic clip was merged into the timeline
		// this is not implmeented in the runtime yet
		// for now, a second mask-groupd would overwrite the first one
		let mask: DisplayObject;
		const masks: Array<DisplayObject> = new Array<DisplayObject>();
		const numMasks: number = this.properties_stream_int[i++];

		if (numMasks == 0) {
			child.masks = null;
			return;
		}
		//mask may not exist if a goto command moves the playhead to a point in the timeline after
		//one of the masks in a mask array has already been removed. Therefore a check is needed.
		for (let m: number = 0; m < numMasks; m++)
			if ((mask = target_mc.getChildAtSessionID(this.properties_stream_int[i++])))
				masks.push(mask);

		child.masks = masks;
	}

	public update_name(child: DisplayObject, target_mc: MovieClip, i: number): void {
		(<IMovieClipAdapter>target_mc.adapter).unregisterScriptObject(child);
		child.name = this.properties_stream_strings[i];
		(<IMovieClipAdapter> target_mc.adapter).registerScriptObject(child);
	}

	public update_button_name(target: DisplayObject, sourceMovieClip: MovieClip, i: number): void {
		target.name = this.properties_stream_strings[i];
		/**
		 * @todo creating the buttonlistenrs later should also be done
		 * but for icycle i dont think this will cause problems
		 */

		(<MovieClip> target).addButtonListeners();
		(<IMovieClipAdapter> sourceMovieClip.adapter).registerScriptObject(target);
	}

	public update_visibility(child: DisplayObject, target_mc: MovieClip, i: number): void {
		if (!child._adapter || !(<IDisplayObjectAdapter> child.adapter).isVisibilityByScript())
			child.visible = Boolean(i);
	}

	public update_mtx_scale_rot(child: DisplayObject, target_mc: MovieClip, i: number): void {
		if (this._blocked || (<any>child).noTimelineUpdate)
			return;

		i *= 4;

		const new_matrix: Matrix3D = child.transform.matrix3D;
		new_matrix._rawData[0] = this.properties_stream_f32_mtx_scale_rot[i++];
		new_matrix._rawData[1] = this.properties_stream_f32_mtx_scale_rot[i++];
		new_matrix._rawData[4] = this.properties_stream_f32_mtx_scale_rot[i++];
		new_matrix._rawData[5] = this.properties_stream_f32_mtx_scale_rot[i];

		child.transform.invalidateComponents();

		child._invalidateHierarchicalProperties(HierarchicalProperties.SCENE_TRANSFORM);
	}

	public update_mtx_pos(child: DisplayObject, target_mc: MovieClip, i: number): void {
		if (this._blocked || (<any>child).noTimelineUpdate)
			return;

		i *= 2;

		const new_matrix: Matrix3D = child.transform.matrix3D;
		new_matrix._rawData[12] = this.properties_stream_f32_mtx_pos[i++];
		new_matrix._rawData[13] = this.properties_stream_f32_mtx_pos[i];

		child.transform.invalidatePosition();
	}

	public enable_maskmode(child: DisplayObject, target_mc: MovieClip, i: number): void {
		child.maskMode = true;
	}

	public remove_masks(child: DisplayObject, target_mc: MovieClip, i: number): void {
		child.masks = null;
	}

	public update_filters(child: DisplayObject, target_mc: MovieClip, i: number): void {
		const startFilter: number = this.properties_stream_int[i++];
		const numFilter: number = this.properties_stream_int[i++];
		const adapter = <IDisplayObjectAdapter>child.adapter;

		if (numFilter === 0) {
			adapter.updateFilters(null);
			return;
		}

		adapter.updateFilters(this.properties_stream_filters.slice(startFilter, startFilter + numFilter));
	}

	public swap_graphics(child: DisplayObject, target_mc: MovieClip, i: number): void {
		if (child.isAsset(Sprite)) {
			const myGraphics: Graphics = <Graphics> this.graphicsPool[this.properties_stream_int[i]];
			//console.log("frame:", target_mc.currentFrameIndex ,"swap graphics: ", target_mc.id, i, myGraphics.id);

			(<Sprite>child).graphics = myGraphics;
		}
	}

	public start_audio(child: DisplayObject, target_mc: MovieClip, i: number): void {
	}

	public set_ratio(child: DisplayObject, target_mc: MovieClip, i: number): void {
		(<MorphSprite>child).setRatio(this.properties_stream_int[i] / 0xffff);
	}

	public update_blendmode(child: DisplayObject, target_mc: MovieClip, i: number): void {
		child.blendMode = mapBlendIdToString(i);
		//console.log("update blendmode "+mapBlendIdToString(i));
	}

	public update_rendermode(child: DisplayObject, target_mc: MovieClip, i: number): void {
		console.log('update rendermode ' + i);
	}

	public dispose() {
		for (let i = 0; i < this._potentialPrototypes.length; i++) {
			if ((<any> this._potentialPrototypes[i]).dispose)
				(<any> this._potentialPrototypes[i]).dispose();

		}
		this.keyframe_indices = [];
		this.avm1Exports = {};
		this.avm1InitActions = {};
		this.avm1ButtonActions = [];
		this.graphicsPool = {};
		this.audioPool = {};
		this.potentialPrototypesInitEventsMap = {};
		this._potentialPrototypes = [];
		this._labels = {};
		this._framescripts = {};
		this._framescripts_translated = {};
	}
}