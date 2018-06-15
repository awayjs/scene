import {AssetEvent,IAsset, Matrix3D, EventBase, IAssetAdapter, Box} from "@awayjs/core";
import {Graphics} from "@awayjs/graphics";
import {IMovieClipAdapter} from "../adapters/IMovieClipAdapter";
import {Timeline} from "../base/Timeline";
import {MouseEvent} from "../events/MouseEvent";
import {FrameScriptManager} from "../managers/FrameScriptManager";

import {DisplayObject} from "./DisplayObject";
import {Sprite} from "./Sprite";
import {TextField} from "./TextField";


export class MovieClip extends Sprite
{
	public static avm1ScriptQueue:MovieClip[]=[];
	public static avm1ScriptQueueScripts:any[]=[];
	public static avm1LoadedActions:any[]=[];
	public static _skipAdvance:boolean;

	public swappedDepthsMap:any={};

	private static _movieClips:Array<MovieClip> = new Array<MovieClip>();

	public static assetType:string = "[asset MovieClip]";

	public static getNewMovieClip(timeline:Timeline = null):MovieClip
	{
		return (MovieClip._movieClips.length)? MovieClip._movieClips.pop() : new MovieClip(timeline)
	}

	private _timeline:Timeline;

	private _isButton:boolean = false;
	private _onMouseOver:(event:MouseEvent) => void;
	private _onMouseOut:(event:MouseEvent) => void;
	private _onMouseDown:(event:MouseEvent) => void;
	private _onMouseUp:(event:MouseEvent) => void;

	private _time:number = 0;// the current time inside the animation
	private _currentFrameIndex:number = -1;// the current frame

	private _isPlaying:boolean = true;// false if paused or stopped

	// not sure if needed
	private _enterFrame:AssetEvent;
	private _skipAdvance : boolean;
	private _isInit:boolean = true;

	private _potentialInstances:Array<IAsset> = [];
	private _depth_sessionIDs:Object = {};
	private _sessionID_childs:Object = {};

	public useHandCursor:boolean;
	public mouseListenerCount:number;

	private _hitArea:DisplayObject
	public _onLoadedActions:any=null;

	constructor(timeline:Timeline = null)
	{
		super();

		this.useHandCursor=true;
		this.mouseListenerCount=0;
		this.cursorType="pointer";
		//this.debugVisible=true;
		this._enterFrame = new AssetEvent(AssetEvent.ENTER_FRAME, this);

		this.inheritColorTransform = true;

		// todo: allow to set cursor-types for movieclip
		this._onMouseOver = (event:MouseEvent) => {
			//document.body.style.cursor = "pointer";
			this.currentFrameIndex = 1;
		};
		this._onMouseOut = (event:MouseEvent) => {
			//document.body.style.cursor = "initial";
			this.currentFrameIndex = 0;
		};
		this._onMouseDown = (event:MouseEvent) => {
			//document.body.style.cursor = "initial";
			this.currentFrameIndex = 2;
		};
		this._onMouseUp = (event:MouseEvent) => {
			//document.body.style.cursor = "initial";
			this.currentFrameIndex = this.currentFrameIndex == 0? 0 : 1;
		};

		this._timeline = timeline || new Timeline();
	}
	public buttonEnabled:boolean=true;

	public buttonReset(){
		if(this._isButton && !this.buttonEnabled){
			this.currentFrameIndex = 0;

		}
	}

		/**
	 * //TODO
	 *
	 * @protected
	 */
	public _getBoxBoundsInternal(matrix3D:Matrix3D, strokeFlag:boolean, fastFlag:boolean, cache:Box = null, target:Box = null):Box
	{
		if(this._hitArea) {
			//this._hitArea.

			/*var new_matrix:Matrix3D = this._hitArea.transform.matrix3D;
			this.transform.matrix3D.copyTo(new_matrix);

			this._hitArea.transform.invalidateComponents();*/
			return this._hitArea._getBoxBoundsInternal(matrix3D, strokeFlag, fastFlag, cache, target);	
		}

		return super._getBoxBoundsInternal(matrix3D, strokeFlag, fastFlag, cache, target);
	}
	
	public get hitArea():DisplayObject
	{
		return this._hitArea;
	}
	public set hitArea(value:DisplayObject)
	{
		this._hitArea=value;

		this._invalidateChildren();
	}

	public getMouseCursor():string
	{
		if(this.name=="scene")
			return "initial";
		if(this.useHandCursor && (this.mouseListenerCount>0)){
			return this.cursorType;
		}
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
	}
	public registerScriptObject(child:DisplayObject):void
	{
		this[child.name]=child;

		if(child.isAsset(MovieClip))
			(<MovieClip>child).removeButtonListeners();
	}
	public unregisterScriptObject(child:DisplayObject):void
	{
		delete this[child.name];

		if(child.isAsset(MovieClip))
			(<MovieClip>child).removeButtonListeners();
	}
	public dispose():void
	{
		this.disposeValues();

		MovieClip._movieClips.push(this);
	}

	public disposeValues():void
	{
		super.disposeValues();

		this._potentialInstances = [];
		this._depth_sessionIDs = {};
		this._sessionID_childs = {};
	}

	public reset_textclones():void
	{
		if(this.timeline) {
			var len:number = this._potentialInstances.length;
			for (var i:number = 0; i< len; i++) {
				if (this._potentialInstances[i] != null) {
					if (this._potentialInstances[i].isAsset(TextField))
						(<TextField>this._potentialInstances[i]).text = (<TextField>this.timeline.getPotentialChildPrototype(i)).text;
					else if (this._potentialInstances[i].isAsset(MovieClip))
						(<MovieClip>this._potentialInstances[i]).reset_textclones();
				}
			}
		}
	}

	public get buttonMode():boolean
	{
		return this._isButton;
	}
	public set buttonMode(value:boolean)
	{
		this._isButton = value;
	}
	public get isInit():boolean
	{
		return this._isInit;
	}
	public set isInit(value:boolean)
	{
		this._isInit = value;
	}

	public get timeline():Timeline
	{
		return this._timeline;
	}

	public set timeline(value:Timeline)
	{
		this._timeline = value;

		this.reset(false);
	}

	/**
	 *
	 */
	public loop:boolean = true;

	public get numFrames() : number
	{
		return this._timeline.numFrames;
	}

	public jumpToLabel(label:string):void
	{
		// the timeline.jumpTolabel will set currentFrameIndex
		this._timeline.jumpToLabel(this, label);
	}

	/**
	 * the current index of the current active frame
	 */
	public constructedKeyFrameIndex:number = -1;

	public reset(fireScripts:boolean=true):void
	{
		super.reset();

		// time only is relevant for the root mc, as it is the only one that executes the update function
		this._time = 0;
		this.swappedDepthsMap={};

		if(this._adapter)
			(<IMovieClipAdapter> this.adapter).freeFromScript();

		this.constructedKeyFrameIndex = -1;
		for (var i:number = this.numChildren - 1; i >= 0; i--)
			this.removeChildAt(i);



		this._skipAdvance = MovieClip._skipAdvance;
		this._skipAdvance=true;
		var numFrames:number = this._timeline.keyframe_indices.length;
		this._isPlaying = Boolean(numFrames > 1);
		if (numFrames) {
			this._currentFrameIndex = 0;
			//if(fireScripts)
			//	this._timeline.add_script_for_postcontruct(this, this._currentFrameIndex, true);
			//console.log("_currentFrameIndex ", this.name, this._currentFrameIndex);
			this._timeline.constructNextFrame(this, false, true);
		} else {
			this._currentFrameIndex = -1;
		}
	}


	public resetSessionIDs():void
	{
		this._depth_sessionIDs = {};
	}

	/*
	* Setting the currentFrameIndex will move the playhead for this movieclip to the new position
	 */
	public get currentFrameIndex():number
	{
		return this._currentFrameIndex;
	}

	public set currentFrameIndex(value:number)
	{
		//if currentFrame is set greater than the available number of
		//frames, the playhead is moved to the last frame in the timeline.
		//But because the frame specified was not a keyframe, no scripts are
		//executed, even if they exist on the last frame.
		var skip_script:boolean = false;

		var numFrames:number = this._timeline.keyframe_indices.length;

		if (!numFrames)
			return;

		if (value < 0) {
			value = 0;
		} else if (value >= numFrames) {
			value = numFrames - 1;
			skip_script = true;
		}

		if (this._currentFrameIndex == value)
			return;

		this._currentFrameIndex = value;

		//console.log("_currentFrameIndex ", this.name, this._currentFrameIndex);
		//changing current frame will ignore advance command for that
		//update's advanceFrame function, unless advanceFrame has
		//already been executed
		this._skipAdvance = MovieClip._skipAdvance;
		

		this._timeline.gotoFrame(this, value, skip_script);
	}

	public addEventListener(type:string, listener:(event:EventBase) => void):void
	{

		super.addEventListener(type, listener);

		switch (type) {
			case MouseEvent.MOUSE_OUT:
			case MouseEvent.MOUSE_MOVE:
			case MouseEvent.MOUSE_DOWN:
			case MouseEvent.MOUSE_OVER:
			case MouseEvent.MOUSE_UP_OUTSIDE:
			case MouseEvent.MOUSE_WHEEL:
				this.mouseListenerCount++;
				break;
		}
	}
	public removeEventListener(type:string, listener:(event:EventBase) => void):void
	{

		super.removeEventListener(type, listener);

		switch (type) {
			case MouseEvent.MOUSE_OUT:
			case MouseEvent.MOUSE_MOVE:
			case MouseEvent.MOUSE_DOWN:
			case MouseEvent.MOUSE_OVER:
			case MouseEvent.MOUSE_UP_OUTSIDE:
			case MouseEvent.MOUSE_WHEEL:
				if(this.mouseListenerCount>0)
					this.mouseListenerCount--;
				break;
		}
	}
	public addButtonListeners():void
	{
		this._isButton = true;

		this.stop();

		this.addEventListener(MouseEvent.MOUSE_OVER, this._onMouseOver);
		this.addEventListener(MouseEvent.MOUSE_OUT, this._onMouseOut);
		this.addEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown);
		this.addEventListener(MouseEvent.MOUSE_UP, this._onMouseUp);
	}

	public removeButtonListeners():void
	{
		this.removeEventListener(MouseEvent.MOUSE_OVER, this._onMouseOver);
		this.removeEventListener(MouseEvent.MOUSE_OUT, this._onMouseOut);
		this.removeEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown);
		this.removeEventListener(MouseEvent.MOUSE_UP, this._onMouseUp);

	}

	public getChildAtSessionID(sessionID:number):DisplayObject
	{
		return this._sessionID_childs[sessionID];
	}

	public getSessionIDDepths():Object
	{
		return this._depth_sessionIDs;
	}

	public swapDepths(child:DisplayObject, depth:number){

		var existingChild:DisplayObject=this.getChildAtDepth(depth);
		var currentDepth:number=child._depthID;
		if(currentDepth==depth){
			return;
		}
		this.swappedDepthsMap[currentDepth]=depth;
		this.removeChildAtDepth(currentDepth);
		if(existingChild){
			this.swappedDepthsMap[depth]=currentDepth;
			this.removeChildAtDepth(depth);
			super.addChildAtDepth(existingChild, currentDepth);
		}
		super.addChildAtDepth(child, depth);

	}

	public addChildAtDepth(child:DisplayObject, depth:number, replace:boolean = true):DisplayObject
	{
		child.reset();// this takes care of transform and visibility

		return super.addChildAtDepth(child, depth, replace);
	}

	public _addTimelineChildAt(child:DisplayObject, depth:number, sessionID:number):DisplayObject
	{
		this._depth_sessionIDs[depth] = child._sessionID = sessionID;

		this._sessionID_childs[sessionID] = child;

		return this.addChildAtDepth(child, depth);
	}

	public removeChildAtInternal(index:number):DisplayObject
	{
		var child:DisplayObject = this._children[index];

		if(child._adapter)
			(<IMovieClipAdapter> child.adapter).freeFromScript();

		(<IMovieClipAdapter> this.adapter).unregisterScriptObject(child);

		//check to make sure _depth_sessionIDs wasn't modified with a new child
		if (this._depth_sessionIDs[child._depthID] == child._sessionID)
			delete this._depth_sessionIDs[child._depthID];

		delete this._sessionID_childs[child._sessionID];

		child._sessionID = -1;

		return super.removeChildAtInternal(index);
	}

	public get assetType():string
	{
		return MovieClip.assetType;
	}

	/**
	 * Starts playback of animation from current position
	 */
	public play():void
	{
		if (this._timeline.keyframe_indices.length > 1)
			this._isPlaying = true;
	}

	/**
	 * should be called right before the call to away3d-render.
	 */
	public update(events:any[]=null):void
	{
		//if events is null, this is as2, if it is not null, this is as3web

		MovieClip._skipAdvance = true;
		if(events!=null){
			(<any>this.adapter).dispatchEvent(events[0]);
		}
		this.advanceFrame();

		MovieClip._skipAdvance = false;

		// after we advanced the scenegraph, we might have some script that needs executing
		FrameScriptManager.execute_queue();

		//this.dispatchEvent(this._enterFrame);

		// after we executed the onEnter, we might have some script that needs executing
		FrameScriptManager.execute_queue();

		// now we execute any intervals queued
		FrameScriptManager.execute_intervals();

		// finally, we execute any scripts that were added from intervals
		FrameScriptManager.execute_queue();

		//execute any disposes as a result of framescripts
		FrameScriptManager.execute_dispose();

		if(events!=null){
			(<any>this.adapter).dispatchEvent(events[1]);
		}
	}

	public getPotentialChildInstance(id:number) : IAsset
	{
		if (!this._potentialInstances[id])
			this._potentialInstances[id] = this._timeline.getPotentialChildInstance(id);

		return this._potentialInstances[id];
	}


	/**
	 * Stop playback of animation and hold current position
	 */
	public stop():void
	{
		this._isPlaying = false;
	}

	public clone():MovieClip
	{
		var newInstance:MovieClip = MovieClip.getNewMovieClip(this._timeline);

		this.copyTo(newInstance);

		return newInstance;
	}

	public copyTo(newInstance:MovieClip):void
	{
		super.copyTo(newInstance);

		newInstance.hitArea = this._hitArea;
		newInstance.timeline = this._timeline;
		newInstance.loop = this.loop;
	}

	public getScriptsForFrameConstruct():void
	{

		if(this._skipAdvance){
			this._timeline.add_script_for_postcontruct(this, this._currentFrameIndex, true);
		}
		var len:number = this._children.length;
		var child:DisplayObject;
		for (var i:number = 0; i < len; ++i) {
			child = this._children[i];

			if (child.isAsset(MovieClip))
				(<MovieClip> child).getScriptsForFrameConstruct();
		}
		this._skipAdvance = false;
	}
	public advanceFrame():void
	{
		if (this._isPlaying && !this._skipAdvance) {
			if (this._currentFrameIndex == this._timeline.keyframe_indices.length - 1) {
				if (this.loop) // end of loop - jump to first frame.
					this.currentFrameIndex = 0;
				else //end of timeline, stop playing
					this._isPlaying = false;
			} else { // not end - construct next frame
				this._currentFrameIndex++;
				this._timeline.constructNextFrame(this);
			}
			//console.log("advancedFrame ", this.name, this._currentFrameIndex);
		}
		if(this._skipAdvance){
			//console.log("added script ", this.name, this._currentFrameIndex);
			this._timeline.add_script_for_postcontruct(this, this._currentFrameIndex, true);
		}
		//this.adapter.callScript

		var len:number = this._children.length;
		var child:DisplayObject;
		for (var i:number = len-1; i >=  0; --i) {
			child = this._children[i];

			if (child.isAsset(MovieClip))
				(<MovieClip> child).advanceFrame();
		}
		//80pro temp this.dispatchEvent(this._enterFrame);
		this._skipAdvance = false;
	}

// DEBUG CODE:
	logHierarchy(depth: number = 0):void
	{
		this.printHierarchyName(depth, this);

		var len = this._children.length;
		var child:DisplayObject;
		for (var i:number = 0; i < len; i++) {
			child = this._children[i];

			if (child.isAsset(MovieClip))
				(<MovieClip> child).logHierarchy(depth + 1);
			else
				this.printHierarchyName(depth + 1, child);
		}
	}

	printHierarchyName(depth:number, target:DisplayObject):void
	{
		var str = "";
		for (var i = 0; i < depth; ++i)
			str += "--";

		str += " " + target.name + " = " + target.id;
		console.log(str);
	}

	public clear():void
	{
		//clear out potential instances
		var len:number = this._potentialInstances.length;
		for (var i:number = 0; i < len; i++) {
			var instance:IAsset = this._potentialInstances[i];

			//only dispose instances that are not used in script ie. do not have an instance name
			if (instance && instance.name == "") {
				if(!instance.isAsset(Graphics)){
					FrameScriptManager.add_child_to_dispose(<DisplayObject>instance);

				}
				delete this._potentialInstances[i];
			}
		}

		super.clear();
	}

	protected _isEntityInternal():boolean
	{
		return Boolean(this._hitArea != null) || super._isEntityInternal();
	}
}
export default MovieClip;
