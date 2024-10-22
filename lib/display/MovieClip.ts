import { WaveAudio, IAudioChannel, EventBase, BaseAudioChannel } from '@awayjs/core';
import { PartitionBase, EntityNode } from '@awayjs/view';
import { IMovieClipAdapter } from '../adapters/IMovieClipAdapter';
import { Timeline } from '../base/Timeline';
import { MouseEvent } from '../events/MouseEvent';
import { FrameScriptManager } from '../managers/FrameScriptManager';
import { DisplayObject } from './DisplayObject';
import { Sprite } from './Sprite';
import { DisplayObjectContainer } from './DisplayObjectContainer';
import { MouseButtons } from '../base/MouseButtons';

interface IScene {
	offset: number;
	name: string;
	labels: ILabel[];
	numFrames: number;
}

interface ILabel {
	frame: number;
	name: string;
}
export class MovieClip extends Sprite {
	public static mcForConstructor: MovieClip;
	//todo: this 3 are no longer used (?)
	public static avm1ScriptQueue: MovieClip[] = [];
	public static avm1ScriptQueueScripts: any[] = [];
	public static avm1LoadedActions: any[] = [];

	public static movieClipSoundsManagerClass = null;

	private static _movieClips: Array<MovieClip> = new Array<MovieClip>();
	private static _activeSounds: Record<number, WaveAudio> = {};

	public static stopSounds(sound?: WaveAudio) {
		if (sound) {
			if (MovieClip._activeSounds[sound.id])
				MovieClip._activeSounds[sound.id].stop();
		} else {
			for (const key in MovieClip._activeSounds)
				MovieClip._activeSounds[key].stop();
		}
	}

	public static assetType: string = '[asset MovieClip]';

	public static getNewMovieClip(timeline: Timeline): MovieClip {
		if (MovieClip._movieClips.length) {
			const movieClip: MovieClip = MovieClip._movieClips.pop();
			movieClip.timeline = timeline;
			return movieClip;
		}

		return new MovieClip(timeline);
	}

	public static clearPool() {
		MovieClip._movieClips = [];
	}

	public symbolID: number = 0;
	public preventScript: boolean = false;
	private _timeline: Timeline;

	private _scenes: IScene[] = [];
	// buttonMode specifies if the mc has any mouse-listeners attached that should trigger showing the hand-cursor
	// if this is set once to true; it will never get set back to false again.
	private _buttonMode: boolean = false;

	// isButton specifies if the mc-timeline is actually considered a button-timeline
	private _isButton: boolean = false;

	private _onMouseOver: (event: MouseEvent) => void;
	private _onMouseOut: (event: MouseEvent) => void;
	private _onMouseDown: (event: MouseEvent) => void;
	private _onMouseUp: (event: MouseEvent) => void;
	private _onMouseUpOutside: (event: MouseEvent) => void;

	private _time: number = 0;// the current time inside the animation

	private _currentFrameIndex: number = -1;// the current frame

	private _isPlaying: boolean = true;// false if paused or stopped

	private _currentSceneIndex: number = 0;
	private _sceneDirty: boolean = false;

	private _skipAdvance: boolean;

	private _isInit: boolean = true;

	public _sessionID_childs: NumberMap<DisplayObject> = {};

	private _sounds: Record<number, IAudioChannel[]> = {};

	public _useHandCursor: boolean;

	private _soundVolume: number;

	private _skipFramesForStream: number = 0;

	private _soundStreams: any;

	/**
	 * Mark that operation provided by timeline except a script, some operation not allowed from script
	 * `removeChild` should not remove a child name
	 * @private
	 */
	private _isTimelinePass = false;

	/**
	 * Some symbols can be a sprite. This means that when we spawn it, we should track only first frame.
	 * @private
	 */
	private _isSprite: boolean = false;
	public get isSprite() {
		return this._isSprite;
	}

	public buttonEnabled: boolean = true;

	public initSoundStream(streamInfo: any, maxFrameNum: number) {
		if (!this._soundStreams) {
			this._soundStreams = new MovieClip.movieClipSoundsManagerClass(this);
		}
		this._soundStreams.initSoundStream(streamInfo, maxFrameNum);
	}

	public addSoundStreamBlock(frameNum: number, streamBlock: any) {
		if (!this._soundStreams) {
			this._soundStreams = new MovieClip.movieClipSoundsManagerClass(this);
		}
		this._soundStreams.addSoundStreamBlock(frameNum, streamBlock);
	}

	private stopCurrentStream(frameNum: number) {
		if (this._soundStreams) {
			//console.log("sync sounds for mc: ", this.numFrames);
			return this._soundStreams.stopStream(frameNum);
		}
	}

	private resetStreamStopped() {
		if (this._soundStreams) {
			//console.log("sync sounds for mc: ", this.numFrames);
			this._soundStreams.resetStreamStopped();
		}
	}

	private _syncSounds(frameNum: number): number {
		if (this._soundStreams) {
			//console.log("sync sounds for mc: ", this.numFrames);
			return this._soundStreams.syncSounds(frameNum, this._isPlaying, this.parent);
		}
		return 0;
	}

	constructor(timeline: Timeline, spriteMode = false) {
		super();

		this._soundVolume = 1;
		this._isButton = false;
		this._buttonMode = false;
		this._useHandCursor = true;

		this.doingSwap = false;
		this.cursorType = 'pointer';
		//this.debugVisible=true;

		this._onMouseOver = (_event: MouseEvent) => {
			if (this.buttonEnabled)
				this.currentFrameIndex = (_event.buttons & MouseButtons.PRIMARY_BUTTON) ? this.currentFrameIndex == 0 ? 0 : 2 : 1;
			else
				this.currentFrameIndex = 0;
		};

		this._onMouseOut = (_event: MouseEvent) => {
			this.currentFrameIndex = (_event.buttons & MouseButtons.PRIMARY_BUTTON && this.currentFrameIndex != 0) ? 1 : 0;
		};

		this._onMouseDown = (_event: MouseEvent) => {
			if (this.buttonEnabled)
				this.currentFrameIndex = 2;
			else
				this.currentFrameIndex = 0;
		};

		this._onMouseUp = (_event: MouseEvent) => {
			this.currentFrameIndex = 1;
		};

		this._onMouseUpOutside = (_event: MouseEvent) => {
			this.currentFrameIndex = 0;
		};

		this._timeline = timeline;

		if (spriteMode) {
			this.transformToSprite();
		}

		this._onChannelCompleteStopError = this._onChannelCompleteStopError.bind(this);
	}

	/**
	 * Reduce frames of timeline to sprite mode.
	 * Used for UIComponents, where timeline store more that 1 frame
	 */
	public transformToSprite() {
		if (this._isSprite) {
			return;
		}

		this._isSprite = true;

		const timeline = this._timeline;

		// regular MC or frames already is not more 1
		if (timeline.numFrames <= 1) {
			return;
		}

		timeline.frame_command_indices = <any>[timeline.frame_command_indices[0]];
		timeline.frame_recipe = <any>[timeline.frame_recipe[0]];
		timeline.keyframe_constructframes = [timeline.keyframe_constructframes[0]];
		timeline.keyframe_durations = <any>[timeline.keyframe_durations[0]];
		timeline.keyframe_firstframes = [timeline.keyframe_firstframes[0]];
		timeline.keyframe_indices = [timeline.keyframe_indices[0]];
	}

	public startSound(
		sound: WaveAudio,
		loopsToPlay: number,
		onSoundComplete?: (event: EventBase) => void
	) {

		const channel: IAudioChannel = sound.play(0, loopsToPlay);

		channel.volume = this._soundVolume;

		if (onSoundComplete)
			channel.addEventListener(BaseAudioChannel.COMPLETE, onSoundComplete);

		//internal listener to clear
		channel.addEventListener(BaseAudioChannel.COMPLETE, this._onChannelCompleteStopError);
		channel.addEventListener(BaseAudioChannel.STOP, this._onChannelCompleteStopError);
		channel.addEventListener(BaseAudioChannel.ERROR, this._onChannelCompleteStopError);

		const id = sound.id;

		if (!this._sounds[id])
			this._sounds[id] = [];

		// store channels, stop it instead of sounds
		this._sounds[id].push(channel);

		//store active sound
		MovieClip._activeSounds[id] = sound;
	}

	public stopSounds(sound: WaveAudio = null) {

		if (sound) {
			if (this._sounds[sound.id])
				this._stopChannels(sound);
		} else {
			for (const key in this._sounds)
				for (const c of this._sounds[key])
					c.stop();
		}

		const len: number = this._children.length;
		let child: DisplayObject;
		for (let i: number = 0; i < len; ++i) {
			child = this._children[i];
			if (child.isAsset(MovieClip))
				(<MovieClip>child).stopSounds(sound);
		}

		this.stopCurrentStream(this._currentFrameIndex);

		if (this._soundStreams)
			this._soundStreams.syncSounds(0, false, this.parent);
	}

	/**
	 * Compute scene index by global frame index
	 * @param frameIndex
	 * @private
	 */
	private getSceneIndexByFrame(frameIndex: number): number {
		const scenes = this.scenes;

		if (scenes.length <= 1) {
			return 0;
		}

		for (let i = 0; i < scenes.length; i++) {
			if (scenes[i].offset > frameIndex) {
				return i - 1;
			}
		}

		return scenes.length - 1;
	}

	private getSceneIndex(scene: string) {
		const scenes = this.scenes;

		for (let i = 0; i < scenes.length && scene; i++) {
			if (scenes[i].name === scene) {
				return  i;
			}
		}

		return 0;
	}

	public set currentSceneName(scene: string) {
		const index = this.getSceneIndex(scene);

		this._sceneDirty = this._currentSceneIndex !== index;
		this._currentSceneIndex = index;
		this._currentFrameIndex = this._scenes[index].offset;
	}

	public get currentSceneName(): string {
		return  this.scenes[this._currentSceneIndex].name;
	}

	public get currentScene(): IScene {
		const currentScene = this.scenes[this._currentSceneIndex];

		if (currentScene.numFrames === -1) {
			currentScene.numFrames = this.timeline.numFrames - currentScene.offset;
		}

		return currentScene;
	}

	public get scenes(): IScene[] {
		if (this._scenes.length === 0) {
			this._scenes[0] = {
				name: 'Scene1',
				offset: 0,
				labels: [],
				numFrames: this.timeline.numFrames,
			};
		}

		return this._scenes;
	}

	public set scenes(value: IScene[]) {
		this._scenes = value;
	}

	public get isPlaying(): boolean {
		return this._isPlaying;
	}

	public get soundVolume(): number {
		return this._soundVolume;
	}

	public set soundVolume(value: number) {
		if (this._soundVolume == value)
			return;

		this._soundVolume = value;

		let channels: IAudioChannel[];
		for (const key in this._sounds)
			if ((channels = this._sounds[key]))
				for (const c of channels) c.volume = value;
	}

	public stopSound(sound: WaveAudio) {
		MovieClip.stopSounds(sound);
	}

	public buttonReset() {
		if (this._isButton && !this.buttonEnabled) {
			this.currentFrameIndex = 0;
		}
	}

	public getMouseCursor(): string {
		if (this.name == 'scene')
			return 'initial';
		if (this._useHandCursor && this.buttonMode) {
			return this.cursorType;
		}
		return 'initial';
		/*
		var cursorName:string;
		var parent:DisplayObject=this.parent;
		while(parent){
			if(parent.isAsset(MovieClip)){
				cursorName=(<MovieClip>parent).getMouseCursor();
				if(cursorName!="initial"){
					return cursorName;
				}
			}
			parent=parent.parent;
			if(parent && parent.name=="scene"){
				return "initial";
			}
		}
		return "initial";
		*/
	}

	public queueFrameScripts(timeline: Timeline, frame_idx: number, scriptPass1: boolean) {
		console.warn('[MovieClip] - queueFrameScripts should only be called on AVM-Adapters');
	}

	public registerScriptObject(child: DisplayObject): void {
		this[child.name] = child;

		if (child.isAsset(MovieClip))
			(<MovieClip>child).removeButtonListeners();
	}

	public unregisterScriptObject(child: DisplayObject): void {
		delete this[child.name];

		if (child.isAsset(MovieClip))
			(<MovieClip>child).removeButtonListeners();
	}

	public dispose(): void {
		this.disposeValues();

		MovieClip._movieClips.push(this);
	}

	public disposeValues(): void {
		super.disposeValues();

		this._sessionID_childs = {};

		this._timeline = null;
	}

	public get useHandCursor(): boolean {
		return this._useHandCursor;
	}

	public set useHandCursor(value: boolean) {
		this._useHandCursor = value;
	}

	public get buttonMode(): boolean {
		return this._buttonMode;
	}

	public set buttonMode(value: boolean) {
		this._buttonMode = value;
	}

	public get isButton(): boolean {
		return this._isButton;
	}

	public set isButton(value: boolean) {
		this._isButton = value;
	}

	public get isInit(): boolean {
		return this._isInit;
	}

	public set isInit(value: boolean) {
		this._isInit = value;
	}

	public get timeline(): Timeline {
		return this._timeline;
	}

	public set timeline(value: Timeline) {
		if (this._timeline == value)
			return;

		this._timeline = value;

		this.reset(false, false);
	}

	/**
	 *
	 */
	public loop: boolean = true;

	public get numFrames(): number {
		return this._timeline.numFrames;
	}

	public jumpToLabel(label: string, offset: number = 0): boolean {
		// the timeline.jumpTolabel will set currentFrameIndex
		const index = this._currentFrameIndex;

		this._timeline.jumpToLabel(this, label, offset);

		return index !== this._currentFrameIndex;
	}

	/**
	 * the current index of the current active frame
	 */
	public constructedKeyFrameIndex: number = -1;

	public reset(fireScripts: boolean = true, resetSelf: boolean = true): void {
		this._isTimelinePass = true;

		if (resetSelf)
			super.reset();

		if (this.id == 4115)
			console.warn('reset', this.id);

		this.resetStreamStopped();

		// time only is relevant for the root mc, as it is the only one that executes the update function
		this._time = 0;
		//this.stopSounds();

		if (resetSelf && this._adapter)
			(<IMovieClipAdapter> this.adapter).freeFromScript();

		this.constructedKeyFrameIndex = -1;
		for (let i: number = this.numChildren - 1; i >= 0; i--)
			this.removeChildAt(i);

		if (this._graphics)
			this._graphics.clear();

		if (fireScripts) {
			const numFrames: number = this._timeline.keyframe_indices.length;
			this._isPlaying = Boolean(numFrames > 1);
			this._currentSceneIndex = 0;

			if (numFrames) {
				this._currentFrameIndex = 0;
				// contruct the timeline and queue the script.
				//if(fireScripts){
				this._timeline.constructNextFrame(this, fireScripts && !this.doingSwap && !this.preventScript, true);
				//}
			} else {
				this._currentFrameIndex = -1;
			}
		}
		// prevents the playhead to get moved in the advance frame again:
		this._skipAdvance = true;
		this._isTimelinePass = false;
	}

	public set currentFrameIndex(value: number) {
		this.jumpToIndex(value);
	}

	public get currentFrameIndex() {
		return this._currentFrameIndex;
	}

	/*
	* Setting the currentFrameIndex will move the playhead for this movieclip to the new position
	 */
	public get currentFrameIndexRelative(): number {
		return this._currentFrameIndex - this.currentScene.offset;
	}

	public set currentFrameIndexRelative(value: number) {
		this.jumpToIndex(value, this._currentSceneIndex);
	}

	public jumpToIndex(value: number, sceneIndex?: string | number): boolean {
		let queue_script: boolean = true;

		let offset: number = 0;
		let numFrames: number = this._timeline.keyframe_indices.length;

		this.resetStreamStopped();
		if (!numFrames)
			return false;

		const scenes = this.scenes;

		// scene not presented - global navigation
		// we should compute scene index and shift frame
		if (typeof sceneIndex === 'undefined') {

			sceneIndex = this.getSceneIndexByFrame(value);

		} else {
			sceneIndex = typeof sceneIndex === 'string' ? this.getSceneIndex(sceneIndex) : sceneIndex;

			const scene = scenes[sceneIndex];

			// fix negative frames size on latest scene.
			// this is because we don't know how many frames in instance time
			if (scene.numFrames === -1) {
				scene.numFrames = numFrames - scene.offset;
			}

			offset = scene.offset;
			numFrames = scene.numFrames;
		}

		this._currentSceneIndex =  sceneIndex;

		if (value < 0) {
			value = 0;
		} else if (value >= numFrames) {
			// if value is greater than the available number of
			// frames, the playhead is moved to the last frame in the timeline.
			// In this case the frame specified is not considered a keyframe,
			// no scripts should be executed in this case
			value = numFrames - 1;
			queue_script = false;
		}

		value += offset;

		this._skipAdvance = false;
		if (this._currentFrameIndex === value && !this._sceneDirty)
			return false;

		this._sceneDirty = false;
		this._currentFrameIndex = value;

		//console.log("_currentFrameIndex ", this.name, this._currentFrameIndex);
		//changing current frame will ignore advance command for that
		//update's advanceFrame function, unless advanceFrame has
		//already been executed

		this._timeline.gotoFrame(this, value, queue_script, false, false);

		return true;
	}

	public addButtonListeners(): void {
		this._isButton = true;

		this.stop();

		this.addEventListener(MouseEvent.MOUSE_OVER, this._onMouseOver);
		this.addEventListener(MouseEvent.MOUSE_OUT, this._onMouseOut);
		this.addEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown);
		this.addEventListener(MouseEvent.MOUSE_UP, this._onMouseUp);
		this.addEventListener(MouseEvent.MOUSE_UP_OUTSIDE, this._onMouseUpOutside);

		this.mouseChildren = false;
	}

	public removeButtonListeners(): void {
		this.removeEventListener(MouseEvent.MOUSE_OVER, this._onMouseOver);
		this.removeEventListener(MouseEvent.MOUSE_OUT, this._onMouseOut);
		this.removeEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown);
		this.removeEventListener(MouseEvent.MOUSE_UP, this._onMouseUp);
		this.removeEventListener(MouseEvent.MOUSE_UP_OUTSIDE, this._onMouseUpOutside);
	}

	public getTimelineChildAtSessionID(sessionID: number): DisplayObject {
		return this._sessionID_childs[sessionID];
	}

	// should only be called from timeline when navigating frames
	public constructFrame(timeline: Timeline, start_construct_idx: number,
		target_keyframe_idx: number, jump_forward: boolean,
		frame_idx: number, queue_pass2: boolean, queue_script: boolean) {
		console.warn('[scene/MovieClip] - constructFrame not implemented');
	}

	public addTimelineChildAtDepth(child: DisplayObject, depth: number, sessionID: number): DisplayObject {
		console.warn('[scene/MovieClip] - addTimelineChildAtDepth not implemented');
		return null;
	}

	public removeTimelineChildAtDepth(depth: number): void {
		console.warn('[scene/MovieClip] - removeTimelineChildAtDepth not implemented');
	}

	public removeChildAtInternal(index: number): DisplayObject {
		const child: DisplayObject = this._children[index];

		if (child._adapter)
			(<IMovieClipAdapter>child.adapter).freeFromScript();

		// only timeline can do this
		if (this._isTimelinePass) {

			(<IMovieClipAdapter> this.adapter).unregisterScriptObject(child);
		}

		delete this._sessionID_childs[child._sessionID];

		child._sessionID = -1;

		return super.removeChildAtInternal(index);
	}

	public get assetType(): string {
		return MovieClip.assetType;
	}

	/**
	 * Starts playback of animation from current position
	 */
	public play(): void {
		if (this._timeline.keyframe_indices.length > 1)
			this._isPlaying = true;
	}

	/**
	 * Stop playback of animation and hold current position
	 */
	public stop(): void {
		//this.stopSounds();
		this.resetStreamStopped();
		this._isPlaying = false;
	}

	public clone(): MovieClip {
		const newInstance: MovieClip = MovieClip.getNewMovieClip(this._timeline);

		this.copyTo(newInstance);

		return newInstance;
	}

	public copyTo(movieClip: MovieClip): void {
		super.copyTo(movieClip);

		movieClip.buttonMode = this.buttonMode;
		movieClip.symbolID = this.symbolID;
		movieClip.loop = this.loop;
		movieClip._soundStreams = this._soundStreams;
		movieClip._scenes = this._scenes;

		// move to sprite mode too
		if (this._isSprite) {
			movieClip.transformToSprite();
		}
	}

	public advanceFrameInternal(): void {
		// if this._skipadvance is true, the mc has already been moving on its timeline this frame
		// this happens for objects that have been newly added to parent
		// they still need to queue their scripts

		//if(this._timeline && this._timeline.numFrames>0)
		if (this._timeline && this._timeline.numFrames > 0 && this._isPlaying && !this._skipAdvance) {

			if (this._currentFrameIndex === this._timeline.numFrames - 1) {
				if (this.loop) {
					if (this._currentFrameIndex !== 0) {
						this._currentFrameIndex = 0;
						this._currentSceneIndex = 0;

						this.resetStreamStopped();
						this._timeline.gotoFrame(this, 0, true, true, true);
					}
					// end of loop - jump to first frame.
				} else //end of timeline, stop playing
					this._isPlaying = false;
			} else { // not end - construct next frame
				this._currentFrameIndex++;
				this._currentSceneIndex = this.getSceneIndexByFrame(this._currentFrameIndex);

				this._timeline.constructNextFrame(this);
			}
			//console.log("advancedFrame ", this.name, this._currentFrameIndex);
		}

		super.advanceFrame();
		this._skipAdvance = false;
	}

	public advanceFrame(): void {
		this._isTimelinePass = true;
		if (this._skipFramesForStream == 0) {
			this.advanceFrameInternal();
		}
		/*if(this._skipFramesForStream<0){
			console.log("wait for audio to catch up");
		}*/
		this._skipFramesForStream = this._syncSounds(this._currentFrameIndex);
		while (this._skipFramesForStream > 0) {
			//console.log("skip frame for keeping audio stream synced");
			FrameScriptManager.execute_queue();
			this.advanceFrameInternal();
			this._skipFramesForStream = this._syncSounds(this._currentFrameIndex);
		}

		this._isTimelinePass = false;
	}

	// DEBUG CODE:
	logHierarchy(depth: number = 0): void {
		this.printHierarchyName(depth, this);

		const len = this._children.length;
		let child: DisplayObject;
		for (let i: number = 0; i < len; i++) {
			child = this._children[i];

			if (child.isAsset(MovieClip))
				(<MovieClip>child).logHierarchy(depth + 1);
			else
				this.printHierarchyName(depth + 1, child);
		}
	}

	printHierarchyName(depth: number, target: DisplayObject): void {
		let str = '';
		for (let i = 0; i < depth; ++i)
			str += '--';

		str += ' ' + target.name + ' = ' + target.id;
		console.log(str);
	}

	public clear(): void {
		//clear out potential instances
		this.resetStreamStopped();
		/* check memory disposal with new approach of child-instancing
		for (var key in this._potentialInstances) {
			var instance: IAsset = this._potentialInstances[key];

			//only dispose instances that are not used in script ie. do not have an instance name
			if (instance && !instance.name) {
				if (!instance.isAsset(Sprite)) {
					FrameScriptManager.add_child_to_dispose(<DisplayObject>instance);

				}
				delete this._potentialInstances[key];
			}
		}
		*/

		super.clear();
	}

	private _onChannelCompleteStopError(event: EventBase): void {
		const channel: IAudioChannel = event.target;
		const sound = channel.owner;
		const channels = this._sounds[sound.id];
		const index = channels ? channels.indexOf(channel) : -1;

		channel.removeEventListener(BaseAudioChannel.COMPLETE, this._onChannelCompleteStopError);
		channel.removeEventListener(BaseAudioChannel.STOP, this._onChannelCompleteStopError);
		channel.removeEventListener(BaseAudioChannel.ERROR, this._onChannelCompleteStopError);

		if (index != -1) {
			channels.splice(index, 1);

			if (channels.length === 0)
				this._removeSound(sound);
		}
	}

	private _stopChannels(sound: WaveAudio) {
		const id: number = sound.id;
		const channels = this._sounds[id];

		for (const c of channels)
			c.stop();
	}

	private _removeSound(sound: WaveAudio): void {
		//remove sound from local sounds
		delete this._sounds[sound.id];

		//remove sound from active sounds
		if (!sound.isPlaying)
			delete MovieClip._activeSounds[sound.id];
	}
}

PartitionBase.registerAbstraction(EntityNode, MovieClip);
