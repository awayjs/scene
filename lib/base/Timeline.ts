import { WaveAudio, ColorTransform, IAsset, Matrix3D } from '@awayjs/core';
import { Graphics } from '@awayjs/graphics';
import { IDisplayObjectAdapter } from '../adapters/IDisplayObjectAdapter';
import { IMovieClipAdapter } from '../adapters/IMovieClipAdapter';
import { MovieClip } from '../display/MovieClip';
import { Sprite } from '../display/Sprite';
import { MorphSprite } from '../display/MorphSprite';
import { DisplayObject } from '../display/DisplayObject';
import { DisplayObjectContainer } from '../display/DisplayObjectContainer';
import { IFrameLabel } from './IFrameLabel';
import { TimelineActionType as AType } from './TimelineActionType';
import { IFilter } from '../adapters/IFilter';
import { BlendMode } from '@awayjs/stage';
import { ISymbolDecoder } from './ISymbolDecoder';
import { IFrameScript } from './IFrameScript';
import { HierarchicalProperty } from '@awayjs/view';

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

type TApplyFunction = (timeline: Timeline, child: DisplayObject, ratget: MovieClip, i: number) => void;
export class Timeline {
	public static readonly applyFunctionMap: Record<AType, TApplyFunction > = {
		[AType.UPDATE_MTX]: Timeline.update_mtx_all,
		[AType.UPDATE_CMTX]: Timeline.update_colortransform,
		[AType.UPDATE_MASKS]: Timeline.update_masks,
		[AType.UPDATE_NAME]: Timeline.update_name,
		[AType.UPDATE_BUTTON_NAME]: Timeline.update_button_name,
		[AType.UPDATE_VISIBLE]: Timeline.update_visibility,
		[AType.UPDATE_BLENDMODE]: Timeline.update_blendmode,
		[AType.UPDATE_RENDERMODE]: Timeline.update_rendermode,
		[AType.UPDATE_FILTERS]: Timeline.update_filters,
		[AType.UPDATE_SCALE_ROT]: Timeline.update_mtx_scale_rot,
		[AType.UPDATE_POS]: Timeline.update_mtx_pos,
		[AType.ENABLE_MASKMODE]: Timeline.enable_maskmode,
		[AType.REMOVE_MASK]: Timeline.remove_masks,
		[AType.SWAP_GRAPHICS]: Timeline.swap_graphics,
		[AType.SET_RATIO]: Timeline.set_ratio,
		[AType.START_AUDIO]: Timeline.start_audio
	};

	private _symbolDecoder: ISymbolDecoder;
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
	private _framescripts: StringMap<IFrameScript[]>;
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

	public properties_stream_int: ArrayBufferView;

	// property_values_stream:
	public properties_stream_f32_mtx_all: ArrayBufferView;	// list of floats
	public properties_stream_f32_mtx_scale_rot: ArrayBufferView;	// list of floats
	public properties_stream_f32_mtx_pos: ArrayBufferView;	// list of floats
	public properties_stream_f32_ct: ArrayBufferView;	// list of floats
	public properties_stream_strings: string[];

	public properties_stream_filters: IFilter[];

	public placeObjectTagsForSessionIDs: NumberMap<any>;
	public graphicsPool: any;

	public audioPool: any;

	public numKeyFrames: number;

	/**
	 * in AS3 framescript are getting added to mc by calling "mc.addFrameScript" from within the mc.constructor
	 * because timelines are shared between all instances of a mc,
	 * only the first instance of a mc should be allowd to add framescripts to the timeline
	 * to check this, we track the id of mc-instance that adds the first framescript,
	 * and only allow additional framescripts to be added from same instance
	 **/
	private _initalMcID: number;

	constructor() {

		this._initalMcID = -1;
		this.numKeyFrames = 0;
		this.keyframe_indices = [];
		this.avm1Exports = {};
		this.avm1InitActions = {};
		this.avm1ButtonActions = [];
		this.graphicsPool = {};
		this.audioPool = {};
		this.placeObjectTagsForSessionIDs = {};
		this._labels = {};
		this._framescripts = {};
		this._framescripts_translated = {};
		this.keyframe_to_frameidx = {};
	}

	public get symbolDecoder(): ISymbolDecoder {
		return this._symbolDecoder;
	}

	public set symbolDecoder(value: ISymbolDecoder) {
		this._symbolDecoder = value;
	}

	public resetScripts() {
		this._framescripts = {};
		this._framescripts_translated = {};
	}

	/* should be called after timeline-streams have been set.
	prepares
	*/
	public init(): void {

		if (!this._symbolDecoder) {
			console.warn('[Timeline] - init - no _symbolDecoder is set');
		}

		if ((this.frame_command_indices == null) || (this.frame_recipe == null) || (this.keyframe_durations == null)) {
			return;
		}

		let frame_cnt = 0;
		let ic = 0;
		let ic2 = 0;
		let duration = 0;
		let keyframe_cnt = 0;
		let last_construct_frame = 0;
		this.keyframe_firstframes = [];
		this.keyframe_constructframes = [];
		this.keyframe_indices = [];
		this.keyframe_to_frameidx = {};
		this.keyframe_to_frameidx[0] = 0;
		let duration_all = 0;
		for (ic = 0; ic < this.numKeyFrames; ic++) {

			this.keyframe_to_frameidx[ic] = duration_all;
			duration = this.keyframe_durations[(ic)];
			duration_all += duration;
			if (this.frame_recipe[ic] & 1)
				last_construct_frame = keyframe_cnt;

			this.keyframe_firstframes[keyframe_cnt] = frame_cnt;
			this.keyframe_constructframes[keyframe_cnt++] = last_construct_frame;

			for (ic2 = 0; ic2 < duration; ic2++)
				this.keyframe_indices[frame_cnt++] = ic;
		}
	}

	// legacy code. no longer used
	public get_framescript(frame_index: number): string {
		if (this._framescripts[frame_index] == null)
			return '';

		if (typeof this._framescripts[frame_index] == 'string')
			return <string><any> this._framescripts[frame_index];
		else {
			throw new Error('Framescript is already translated to Function!!!');
		}
	}

	/**
	* for AS3:
	* 		- called from constructor of MC
	* for AS2:
	* 		- called when decoding swf-tags to timeline-streams
	* @param script -
	* @param frame_idx - the index of the frame (not the keyframe-index)
	* @param target_mc - the mc-instance that is calling this function
	*/
	public add_framescript(script: any, frame_idx: number, target_mc: MovieClip, isAVM1: boolean = false): void {
		if (this._initalMcID >= 0 && target_mc.id != this._initalMcID)
			return;
		this._initalMcID = target_mc.id;
		if (!this._framescripts[frame_idx]) {
			this._framescripts[frame_idx] = [];
		}
		if (Array.isArray(script)) {
			for (let i = 0; i < script.length; i++) {
				this._framescripts[frame_idx][this._framescripts[frame_idx].length] = script[i];
			}
		} else {
			this._framescripts[frame_idx].push(script);
		}
		this._framescripts_translated[frame_idx] = !isAVM1;
	}

	/**
	 * get a array of framescripts for a specific frame
	 * for AVM1 "checkForTranslation" should be true, so we get translated framescripts
	 * @param target_mc
	 * @param frame_idx
	 * @param checkForTranslation
	 */
	public get_script_for_frame(
		target_mc: MovieClip,
		frame_idx: number,
		checkForTranslation: boolean = false): IFrameScript[] {

		if (frame_idx >= 0 && this._framescripts[frame_idx]) {
			if (checkForTranslation && !this._framescripts_translated[frame_idx]) {
				// todo: cleanup so we can retrieve className of target_mc without hacks
				const name = (<any>target_mc).className ?  (<any>target_mc).className : target_mc.name;
				this._framescripts[frame_idx] = this.symbolDecoder.prepareFrameScriptsForAVM1(
					this._framescripts[frame_idx],
					frame_idx,
					name,
					target_mc.id);
				this._framescripts_translated[frame_idx] = true;
			}
			return this._framescripts[frame_idx];
		}
		return null;
	}

	public get numFrames(): number {
		return this.keyframe_indices.length;
	}

	public getKeyframeIndexForFrameIndex(frame_index: number): number {
		return this.keyframe_indices[frame_index];
	}

	public getChildInstance(symbolID: number, sessionID: number) {
		return this.symbolDecoder.createChildInstanceForTimeline(this, symbolID, sessionID);
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

	/**
	 * Get the label at the current frame of the target_mc MovieClip instance.
	 * If the current frame has no label, it returns null
	 * @param target_mc
	 */
	public getCurrentFrameLabel(target_mc: MovieClip): string {
		for (const key in this._labels) {
			if (this._labels[key].keyFrameIndex == target_mc.constructedKeyFrameIndex) {
				return this._labels[key].name;
			}
		}
		return null;
	}

	/**
	 * Get the label at the current frame of the target_mc MovieClip instance.
	 * If the current frame has no label it returns the name of the previous frame that includes a label.
	 * If the current frame and previous frames do not include a label, it returns null
	 * @param target_mc
	 */
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

	/**
	 * Get scripts for a specific frame
	 * atm this is only called from AVM1MovieClip._callFrame
	 * @param target_mc
	 * @param label
	 * @param isAVM1
	 */
	public getScriptForLabel(target_mc: MovieClip, label: string, isAVM1: boolean = false): IFrameScript[] {
		const key_frame_index: number = this._labels[label.toLowerCase()].keyFrameIndex;
		if (key_frame_index < 0)
			return null;
		const frameIdx: number = this.keyframe_firstframes[key_frame_index];
		if (frameIdx >= 0 && this._framescripts[frameIdx]) {
			return this.get_script_for_frame(target_mc, frameIdx, isAVM1);
		}
		return null;
	}

	/**
	 * move the playhead of the timeline to a specific frame
	 * @param target_mc
	 * @param frame_idx
	 * @param queue_script
	 * @param queue_pass2
	 * @param forceReconstruct
	 */
	public gotoFrame(target_mc: MovieClip, frame_idx: number,
		queue_script: boolean = true,
		queue_pass2: boolean = false,
		forceReconstruct: boolean = false): void {
		const current_keyframe_idx: number = target_mc.constructedKeyFrameIndex;
		const target_keyframe_idx: number = this.keyframe_indices[frame_idx];

		if (current_keyframe_idx == target_keyframe_idx && !forceReconstruct) {
			return;
		} else if (current_keyframe_idx + 1 == target_keyframe_idx) {
			// target_keyframe_idx is the next keyframe. we can just use constructnext for this
			this.constructNextFrame(target_mc, queue_script, true);
			return;
		}

		// when constructing a frame we must start constructing
		// either at the beginning of the timeline, or at a frame where all object was removed
		// construct_keyframe_idx is the index of the first keyframe we must process
		const construct_keyframe_idx: number = this.keyframe_constructframes[target_keyframe_idx];

		//  3 keyframes:
		//		- current_keyframe_idx
		//		- target_keyframe_idx
		//		- construct_keyframe_idx

		// normally construction must start at construct_keyframe_idx
		// if we jump forward, and target_keyframe_idx >

		let start_construct_idx: number = construct_keyframe_idx;

		const jump_forward: boolean = (target_keyframe_idx > current_keyframe_idx);
		if (jump_forward && current_keyframe_idx > construct_keyframe_idx)
			start_construct_idx = current_keyframe_idx + 1;

		(<IMovieClipAdapter>target_mc.adapter).constructFrame(this, start_construct_idx,
			target_keyframe_idx,
			jump_forward,
			frame_idx,
			queue_pass2,
			queue_script);

		// apply update commands for objects still on stage (only if they are not blocked by script)
		this.applyCollectedUpdateCommands(target_mc);

		target_mc.constructedKeyFrameIndex = target_keyframe_idx;

	}

	public applyCollectedUpdateCommands(target_mc: MovieClip): void {
		let k: number;
		const len: number = this._update_indices.length;
		for (k = 0; k < len; k++)
			this.update_childs(target_mc, this._update_indices[k], this._update_frames[k]);
	}

	/**
	 * constructs the next frame of the timeline
	 * expects the target_mc.currentFrameIndex to already be set to the next frame
	 * @param target_mc
	 * @param queueScript
	 * @param scriptPass1
	 */
	public constructNextFrame(target_mc: MovieClip, queueScript: boolean = true, scriptPass1: boolean = false): void {
		const frameIndex: number = target_mc.currentFrameIndex;
		const new_keyFrameIndex: number = this.keyframe_indices[frameIndex];

		if (queueScript)
			(<IMovieClipAdapter>target_mc.adapter).queueFrameScripts(this, frameIndex, scriptPass1);

		if (target_mc.constructedKeyFrameIndex != new_keyFrameIndex) {
			target_mc.constructedKeyFrameIndex = new_keyFrameIndex;

			let frame_command_idx = this.frame_command_indices[new_keyFrameIndex];
			const frame_recipe = this.frame_recipe[new_keyFrameIndex];

			if (frame_recipe & 1) {
				(<IMovieClipAdapter>target_mc.adapter).removeAllTimelineChilds();
			} else if (frame_recipe & 2) {
				this.remove_childs_continous(target_mc, frame_command_idx++);
			}

			if (frame_recipe & 4)
				this.add_childs_continous(target_mc, frame_command_idx++);

			if (frame_recipe & 8)
				this.update_childs(target_mc, frame_command_idx++);

			if (frame_recipe & 16)
				this.start_sounds(target_mc, frame_command_idx++);

		}
	}

	public remove_childs_continous(sourceMovieClip: MovieClip, frame_command_idx: number): void {
		const start_index: number = this.command_index_stream[frame_command_idx];
		const end_index: number = start_index + this.command_length_stream[frame_command_idx];
		for (let i: number = start_index; i < end_index; i++) {
			// in avm1 we remove by depth, in avm2 we remove by sessionID
			(<IMovieClipAdapter>sourceMovieClip.adapter).removeTimelineChildAt(this.remove_child_stream[i]);
		}
	}

	public add_childs_continous(target_mc: MovieClip, frame_command_idx: number): void {
		let idx: number;
		const start_index: number = this.command_index_stream[frame_command_idx];
		const end_index: number = start_index + this.command_length_stream[frame_command_idx];
		for (let i: number = start_index; i < end_index; i++) {
			idx = i * 3;
			if (typeof this.add_child_stream[idx] === 'undefined') {
				console.warn('[Timeline] - add_childs_continous - could not find child-id in child_stream for idx',
					idx, this.add_child_stream);
				continue;
			}
			const childAsset: IAsset = this._symbolDecoder.createChildInstanceForTimeline(this,
				this.add_child_stream[idx + 2], this.add_child_stream[idx]);
			(<IMovieClipAdapter>target_mc.adapter).addTimelineChildAtDepth(<DisplayObject>childAsset,
				this.add_child_stream[idx + 1]);
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

		const start = this.command_index_stream[frame_command_idx];
		const end = start + this.command_length_stream[frame_command_idx];

		for (let i = start; i < end; i++) {
			const child = target_mc.getTimelineChildAtSessionID(this.update_child_stream[i]);

			if (!child) {
				continue;
			}

			// check if the child is blocked by script for transform
			this._blocked = !!(child._adapter && (<IDisplayObjectAdapter> child.adapter).isBlockedByScript());

			const propsStart = this.update_child_props_indices_stream[i];
			const propsEnd = propsStart + this.update_child_props_length_stream[i];

			for (let p = propsStart; p < propsEnd; p++) {
				Timeline.applyFunctionMap[this.property_type_stream[p]] (
					this,
					child,
					target_mc,
					this.property_index_stream[p]
				);
			}
		}
	}

	public static update_mtx_all(timeline: Timeline, child: DisplayObject, _target_mc: MovieClip, i: number): void {
		if (timeline._blocked || (<any>child).noTimelineUpdate)
			return;

		i *= 6;

		const new_matrix: Matrix3D = child.transform.matrix3D;
		const props_stream = timeline.properties_stream_f32_mtx_all;

		new_matrix._rawData[0] = props_stream[i++];
		new_matrix._rawData[1] = props_stream[i++];
		new_matrix._rawData[4] = props_stream[i++];
		new_matrix._rawData[5] = props_stream[i++];
		new_matrix._rawData[12] = props_stream[i++];
		new_matrix._rawData[13] = props_stream[i];

		child.transform.invalidateComponents();
	}

	public static update_colortransform(
		timeline: Timeline,child: DisplayObject, _target_mc: MovieClip, i: number
	): void {

		if (child._adapter && (<IDisplayObjectAdapter> child.adapter).isColorTransformByScript())
			return;

		i *= 8;
		const props_stream = timeline.properties_stream_f32_ct;
		const new_ct = child.transform.colorTransform || (child.transform.colorTransform = new ColorTransform());

		new_ct._rawData[0] = props_stream[i++];
		new_ct._rawData[1] = props_stream[i++];
		new_ct._rawData[2] = props_stream[i++];
		new_ct._rawData[3] = props_stream[i++];
		new_ct._rawData[4] = props_stream[i++];
		new_ct._rawData[5] = props_stream[i++];
		new_ct._rawData[6] = props_stream[i++];
		new_ct._rawData[7] = props_stream[i];

		child.transform.invalidateColorTransform();
	}

	public static update_masks(timeline: Timeline, child: DisplayObject, target_mc: MovieClip, i: number): void {
		// an object could have amultiple groups of masks, in case a graphic clip was merged into the timeline
		// this is not implmeented in the runtime yet
		// for now, a second mask-groupd would overwrite the first one
		let mask: DisplayObject;
		const masks: Array<DisplayObject> = new Array<DisplayObject>();
		const numMasks: number = timeline.properties_stream_int[i++];

		const numOldMasks: number = child.masks ? child.masks.length : 0;
		for (let m: number = 0; m < numOldMasks; m++) {
			const oldMask = child.masks[m];
			if (!oldMask.isTimelineMask) {
				masks.push(oldMask);
			} else {
				oldMask.isTimelineMask = false;
			}
		}

		if (numMasks == 0) {
			child.masks = masks.length > 0 ? masks : null;
			return;
		}

		//mask may not exist if a goto command moves the playhead to a point in the timeline after
		//one of the masks in a mask array has already been removed. Therefore a check is needed.
		for (let m: number = 0; m < numMasks; m++)
			if ((mask = target_mc.getTimelineChildAtSessionID(timeline.properties_stream_int[i++]))) {
				// @todo: we should have ref to maskee on mask, so that we can set maskee.maskMode = false
				// if mask is used as property-mask on other object
				mask.isTimelineMask = true;
				masks.push(mask);
			}

		child.masks = masks;
	}

	public static update_name(timeline: Timeline, child: DisplayObject, target_mc: MovieClip, i: number): void {
		if (timeline.properties_stream_strings[i].indexOf('instance') == 0) {
			return;
		}

		(<IMovieClipAdapter>target_mc.adapter).unregisterScriptObject(child);
		child.name = timeline.properties_stream_strings[i];
		(<IMovieClipAdapter> target_mc.adapter).registerScriptObject(child);
	}

	public static update_button_name(
		timeline: Timeline, target: DisplayObject, sourceMovieClip: MovieClip, i: number
	): void {

		target.name = timeline.properties_stream_strings[i];
		(<MovieClip> target).addButtonListeners();
		(<IMovieClipAdapter> sourceMovieClip.adapter).registerScriptObject(target);
	}

	public static update_visibility(_timeline: Timeline, child: DisplayObject, target_mc: MovieClip, i: number): void {
		if (!child._adapter || !(<IDisplayObjectAdapter> child.adapter).isVisibilityByScript()) {
			child.visible = !!i;
		}
	}

	public static update_mtx_scale_rot(
		timeline: Timeline, child: DisplayObject, _target_mc: MovieClip, i: number
	): void {

		if (timeline._blocked || (<any>child).noTimelineUpdate) {
			return;
		}

		i *= 4;

		const new_matrix: Matrix3D = child.transform.matrix3D;
		const props_stream = timeline.properties_stream_f32_mtx_scale_rot;

		new_matrix._rawData[0] = props_stream[i++];
		new_matrix._rawData[1] = props_stream[i++];
		new_matrix._rawData[4] = props_stream[i++];
		new_matrix._rawData[5] = props_stream[i];

		child.transform.invalidateComponents();

		child._invalidateHierarchicalProperty(HierarchicalProperty.SCENE_TRANSFORM);
	}

	public static update_mtx_pos(timeline: Timeline, child: DisplayObject, target_mc: MovieClip, i: number): void {
		if (timeline._blocked || (<any>child).noTimelineUpdate)
			return;

		i *= 2;

		const new_matrix = child.transform.matrix3D;

		new_matrix._rawData[12] = timeline.properties_stream_f32_mtx_pos[i++];
		new_matrix._rawData[13] = timeline.properties_stream_f32_mtx_pos[i];

		child.transform.invalidatePosition();
	}

	public static enable_maskmode(_timeline: Timeline, child: DisplayObject, _target_mc: MovieClip, _i: number): void {
		child.maskMode = true;
	}

	public static remove_masks(_timeline: Timeline, child: DisplayObject, _target_mc: MovieClip, _i: number): void {
		child.masks = null;
	}

	public static update_filters(timeline: Timeline, child: DisplayObject, _target_mc: MovieClip, i: number): void {
		const startFilter: number = timeline.properties_stream_int[i++];
		const numFilter: number = timeline.properties_stream_int[i++];
		const adapter = <IDisplayObjectAdapter>child.adapter;

		if (numFilter === 0) {
			adapter.updateFilters(null);
			return;
		}

		adapter.updateFilters(
			timeline.properties_stream_filters.slice(startFilter, startFilter + numFilter)
		);
	}

	public static swap_graphics(timeline: Timeline, child: DisplayObject, _target_mc: MovieClip, i: number): void {
		if (!child.isAsset(Sprite)) {
			console.warn('[Timeline] - swap_graphics - child is not a Sprite');
			return;
		}

		const sprite = <Sprite>child;
		const target = <Graphics> timeline.graphicsPool[timeline.properties_stream_int[i]];

		if (target.id === sprite.graphics.id) {
			// already the same graphics
			return;
		}

		sprite.graphics = target;
	}

	public static start_audio(_timeline: Timeline, _child: DisplayObject, _target_mc: MovieClip, _i: number): void {}

	public static set_ratio(_timeline: Timeline, child: DisplayObject, _target_mc: MovieClip, i: number): void {
		if (!child.isAsset(MorphSprite)) {
			console.warn('[Timeline] - set_ratio - child is not a MorphSprite');
			return;
		}

		(<MorphSprite>child).setRatio(_timeline.properties_stream_int[i] / 0xffff);
	}

	public static update_blendmode(_timeline: Timeline, child: DisplayObject, _target_mc: MovieClip, i: number): void {
		child.blendMode = mapBlendIdToString(i);
	}

	public static update_rendermode(
		_timeline: Timeline, _child: DisplayObject, _target_mc: MovieClip, i: number): void {
		console.log('update rendermode ' + i);
	}

	public dispose() {
		this.keyframe_indices = [];
		this.avm1Exports = {};
		this.avm1InitActions = {};
		this.avm1ButtonActions = [];
		this.graphicsPool = {};
		this.audioPool = {};
		this.placeObjectTagsForSessionIDs = {};
		this._labels = {};
		this._framescripts = {};
		this._framescripts_translated = {};
	}
}