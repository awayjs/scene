import { WaveAudio, IAudioChannel } from '@awayjs/core';
import { PartitionBase, EntityNode } from '@awayjs/view';
import { Graphics } from '@awayjs/graphics';
import { IMovieClipAdapter } from '../adapters/IMovieClipAdapter';
import { Timeline } from '../base/Timeline';
import { MouseEvent } from '../events/MouseEvent';
import { FrameScriptManager } from '../managers/FrameScriptManager';
import { DisplayObject } from './DisplayObject';
import { Sprite } from './Sprite';
import { DisplayObjectContainer } from './DisplayObjectContainer';
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
	private static _activeSounds: Record<number, IAudioChannel[]> = {};
	private static _activeSoundsOwners: Set<MovieClip> = new Set<MovieClip>();

	public static stopAllSounds() {
		MovieClip._activeSoundsOwners.forEach(e => e && e.stopAllSounds());
		MovieClip._activeSoundsOwners.clear();
	}

	public static assetType: string = '[asset MovieClip]';

	public static getNewMovieClip(timeline: Timeline = null): MovieClip {
		if (MovieClip._movieClips.length) {
			const movieClip: MovieClip = MovieClip._movieClips.pop();
			movieClip.timeline = timeline || new Timeline();
			movieClip.graphics = Graphics.getGraphics();
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
	private _onDragOver: (event: MouseEvent) => void;
	private _onDragOut: (event: MouseEvent) => void;
	private _onMouseDown: (event: MouseEvent) => void;
	private _onMouseUp: (event: MouseEvent) => void;

	private _time: number = 0;// the current time inside the animation

	private _currentFrameIndex: number = -1;// the current frame

	private _isPlaying: boolean = true;// false if paused or stopped

	private _currentSceneIndex: number = 0;
	private _sceneDirty: boolean = false;

	private _skipAdvance: boolean;

	private _isInit: boolean = true;

	public _sessionID_childs: NumberMap<DisplayObject> = {};

	private _sounds: Object = {};

	public _useHandCursor: boolean;

	private _parentSoundVolume: number;

	private _soundVolume: number;

	private _skipFramesForStream: number = 0;

	private _soundStreams: any;

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

	constructor(timeline: Timeline = null) {
		super();

		this._soundVolume = 1;
		this._parentSoundVolume = 1;
		this.doingSwap = false;
		this._isButton = false;
		this._buttonMode = false;
		this._useHandCursor = true;
		this.cursorType = 'pointer';
		//this.debugVisible=true;

		this._onMouseOver = (_event: MouseEvent) => {
			if (this.buttonEnabled)
				this.currentFrameIndex = 1;
			else
				this.currentFrameIndex = 0;
		};

		this._onMouseOut = (_event: MouseEvent) => {
			this.currentFrameIndex = 0;
		};

		this._onMouseDown = (_event: MouseEvent) => {
			if (this.buttonEnabled)
				this.currentFrameIndex = 2;
			else
				this.currentFrameIndex = 0;
		};

		this._onMouseUp = (_event: MouseEvent) => {
			this.currentFrameIndex = this.currentFrameIndex == 0 ? 0 : 1;
		};

		this._onDragOver = (_event: MouseEvent) => {
			if (this.buttonEnabled)
				this.currentFrameIndex = 2;
			else
				this.currentFrameIndex = 0;
		};

		this._onDragOut = (_event: MouseEvent) => {
			this.currentFrameIndex = 1;
		};

		this._timeline = timeline || new Timeline();
	}

	public startSound(
		id: any,
		sound: WaveAudio,
		loopsToPlay: number,
		onComplete?: () => void
	) {

		const channel: IAudioChannel = sound.play(0, loopsToPlay);

		channel.onSoundComplete = onComplete;

		this._sounds[id] = sound;

		if (!MovieClip._activeSounds[id]) {
			MovieClip._activeSounds[id] = [];
		}

		// store channels, stop it instead of sounds
		MovieClip._activeSounds[id].push(channel);
		MovieClip._activeSoundsOwners.add(this);
	}

	public stopSounds(soundID: any = null) {
		if (soundID) {
			if (this._sounds[soundID]) {
				this._sounds[soundID].stop();
				delete this._sounds[soundID];

				const channels = MovieClip._activeSounds[soundID];
				if (channels) {
					for (const c of channels) c.stop();
				}

				delete MovieClip._activeSounds[soundID];
			}
		} else {
			for (const key in this._sounds) {
				this._sounds[key].stop();

				const channels = MovieClip._activeSounds[soundID];
				if (channels) {
					for (const c of channels) c.stop();
				}

				delete MovieClip._activeSounds[key];
			}
			this._sounds = {};
		}

		if (Object.getOwnPropertyNames(this._sounds).length === 0) {
			MovieClip._activeSoundsOwners.delete(this);
		}

		const len: number = this._children.length;
		let child: DisplayObject;
		for (let i: number = 0; i < len; ++i) {
			child = this._children[i];
			if (child.isAsset(MovieClip))
				(<MovieClip>child).stopSounds(soundID);
		}

		this.stopCurrentStream(this._currentFrameIndex);
		MovieClip._activeSounds = {};

		if (this._soundStreams) {
			this._soundStreams.syncSounds(0, false, this.parent);
		}
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
		if (this._soundVolume == value) {
			return;
		}

		this._soundVolume = value;
		for (const key in this._sounds) {
			this._sounds[key].volume = value;
		}

		const len: number = this._children.length;
		let child: DisplayObject;
		for (let i: number = 0; i < len; ++i) {
			child = this._children[i];
			if (child.isAsset(MovieClip))
				(<MovieClip>child).soundVolume = value;
		}
	}

	public stopSound(id: number) {
		if (this._sounds[id]) {
			this._sounds[id].stop();
			delete this._sounds[id];
		}

		if (Object.getOwnPropertyNames(this._sounds).length === 0) {
			MovieClip._activeSoundsOwners.delete(this);
		}

		if (MovieClip._activeSounds[id]) {
			for (let i: number = 0; i < MovieClip._activeSounds[id].length; i++) {
				MovieClip._activeSounds[id][i].stop();
			}
			delete MovieClip._activeSounds[id];
		}
	}

	public stopAllSounds() {
		const keys = Object.keys(this._sounds);
		for (const k of keys) {
			this.stopSounds(k);
		}
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

	/* this was used for old Icycle-project text-translation
	public reset_textclones(): void {
		if (this.timeline) {
			//var len:number = this._potentialInstances.length;
			for (var key in this._potentialInstances) {
				if (this._potentialInstances[key] != null) {
					if (this._potentialInstances[key].isAsset(TextField)) {
						(<TextField>this._potentialInstances[key]).text =
							(<TextField>this.timeline.getPotentialChildPrototype(parseInt(key))).text;
					}
					else if (this._potentialInstances[key].isAsset(MovieClip))
						(<MovieClip>this._potentialInstances[key]).reset_textclones();
				}
			}
		}
	}*/

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

		this.graphics.clear();

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
		//FrameScriptManager.execute_queue();

	}

	public set currentFrameIndex(value: number) {
		const scenes = this.scenes;

		this._currentFrameIndex = 0;
		for (let i = 0; i < scenes.length && scenes.length > 2; i++) {
			if (scenes[i].offset + scenes[i].numFrames > value) {
				break;
			}

			this._currentSceneIndex++;
		}

		this.jumpToIndex(value, this._currentSceneIndex);
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

	public jumpToIndex(value: number, sceneIndex: string | number = 0): boolean {
		let queue_script: boolean = true;

		const numFrames: number = this._timeline.keyframe_indices.length;

		this.resetStreamStopped();
		if (!numFrames)
			return false;

		sceneIndex = typeof sceneIndex === 'string'
			? this.getSceneIndex(sceneIndex)
			: sceneIndex;

		const scene = this.scenes[sceneIndex];

		if (value < 0) {
			value = 0;
		} else if (value >= scene.numFrames) {
			// if value is greater than the available number of
			// frames, the playhead is moved to the last frame in the timeline.
			// In this case the frame specified is not considered a keyframe,
			// no scripts should be executed in this case
			value = scene.numFrames - 1;
			queue_script = false;
		}

		value += scene.offset;

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
		this.addEventListener(MouseEvent.DRAG_OVER, this._onDragOver);
		this.addEventListener(MouseEvent.DRAG_OUT, this._onDragOut);

		this.mouseChildren = false;
	}

	public removeButtonListeners(): void {
		this.removeEventListener(MouseEvent.MOUSE_OVER, this._onMouseOver);
		this.removeEventListener(MouseEvent.MOUSE_OUT, this._onMouseOut);
		this.removeEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown);
		this.removeEventListener(MouseEvent.MOUSE_UP, this._onMouseUp);
		this.removeEventListener(MouseEvent.DRAG_OVER, this._onDragOver);
		this.removeEventListener(MouseEvent.DRAG_OUT, this._onDragOut);
	}

	public swapChildrenAt(index1: number, index2: number): void {
		console.warn('[scene/MovieClip] - swapChildrenAt - not implemented');
	}

	public swapDepths(child: DisplayObject, depth: number) {
		console.warn('[scene/MovieClip] - swapDepths - not implemented');
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

		(<IMovieClipAdapter> this.adapter).unregisterScriptObject(child);

		delete this._sessionID_childs[child._sessionID];

		child._sessionID = -1;

		if (child.adapter && (<any>child.adapter).dispatchStaticEvent) {
			(<any>child.adapter).dispatchStaticEvent('removed', child.adapter);
		}
		if (this.isOnDisplayList() && (<any>child.adapter).dispatch_REMOVED_FROM_STAGE) {
			(<any>child.adapter).dispatch_REMOVED_FROM_STAGE(<DisplayObjectContainer>child);
		}

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
		movieClip.loop = this.loop;
		movieClip._soundStreams = this._soundStreams;
		movieClip._scenes = this._scenes;
		movieClip.symbolID = this.symbolID;

	}

	public advanceFrameInternal(): void {

		// if this._skipadvance is true, the mc has already been moving on its timeline this frame
		// this happens for objects that have been newly added to parent
		// they still need to queue their scripts

		//if(this._timeline && this._timeline.numFrames>0)
		if (this._timeline && this._timeline.numFrames > 0 && this._isPlaying && !this._skipAdvance) {

			const scene = this.currentScene;

			if (this._currentFrameIndex === scene.offset + scene.numFrames - 1) {
				if (this.loop) {
					// end of loop - jump to first frame.
					if (this._currentFrameIndex == scene.offset) {
						// do nothing if we are already on frame 1
					} else {
						this._currentFrameIndex = scene.offset;
						this.resetStreamStopped();
						this._timeline.gotoFrame(this, scene.offset, true, true, true);
					}
				} else //end of timeline, stop playing
					this._isPlaying = false;
			} else { // not end - construct next frame
				this._currentFrameIndex++;
				this._timeline.constructNextFrame(this);
			}
			//console.log("advancedFrame ", this.name, this._currentFrameIndex);
		}

		super.advanceFrame();

		this._skipAdvance = false;
	}

	public advanceFrame(): void {
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
}

PartitionBase.registerAbstraction(EntityNode, MovieClip);
