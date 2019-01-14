import {AssetEvent,IAsset, WaveAudio} from "@awayjs/core";

import { PartitionBase, EntityNode } from '@awayjs/view';

import {Graphics} from "@awayjs/graphics";

import {IMovieClipAdapter} from "../adapters/IMovieClipAdapter";
import {IDisplayObjectAdapter} from "../adapters/IDisplayObjectAdapter";
import {Timeline} from "../base/Timeline";
import {MouseEvent} from "../events/MouseEvent";
import {FrameScriptManager} from "../managers/FrameScriptManager";

import {DisplayObject} from "./DisplayObject";
import {Sprite} from "./Sprite";
import {TextField} from "./TextField";


export class MovieClip extends Sprite
{
	//todo: this 3 are no longer used (?)
	public static avm1ScriptQueue:MovieClip[]=[];
	public static avm1ScriptQueueScripts:any[]=[];
	public static avm1LoadedActions:any[]=[];

	public static _skipAdvance:boolean;
	
	public doingSwap:boolean=false;
	public preventScript:boolean=false;

	private static _movieClips:Array<MovieClip> = new Array<MovieClip>();

	public static assetType:string = "[asset MovieClip]";

	public static getNewMovieClip(timeline:Timeline = null):MovieClip
	{
		return (MovieClip._movieClips.length)? MovieClip._movieClips.pop() : new MovieClip(timeline)
	}

	private _timeline:Timeline;

	// buttonMode specifies if the mc has any mouse-listeners attached that should trigger showing the hand-cursor
	// if this is set once to true; it will never get set back to false again.
	private _buttonMode:boolean = false;

	// isButton specifies if the mc-timeline is actually considered a button-timeline
	private _isButton:boolean = false;

	private _onMouseOver:(event:MouseEvent) => void;
	private _onMouseOut:(event:MouseEvent) => void;
	private _onDragOver:(event:MouseEvent) => void;
	private _onDragOut:(event:MouseEvent) => void;
	private _onMouseDown:(event:MouseEvent) => void;
	private _onMouseUp:(event:MouseEvent) => void;

	private _time:number = 0;// the current time inside the animation
	private _currentFrameIndex:number = -1;// the current frame

	private _isPlaying:boolean = true;// false if paused or stopped

	// not sure if needed
	private _enterFrame:AssetEvent;
	private _skipAdvance : boolean;
	private _isInit:boolean = true;

	private _potentialInstances:any = {};
	private _depth_sessionIDs:Object = {};
	private _sessionID_childs:Object = {};
	private _sounds:Object = {};

	public _useHandCursor:boolean;
	public onLoadedAction:any=null;
    public onCustomConstructor:any=null;
    private _parentSoundVolume:number;
    
	constructor(timeline:Timeline = null)
	{
		super();

        this._soundVolume=1;
        this._parentSoundVolume=1;
		this.doingSwap=false;
		this._isButton=false;
		this._buttonMode=false;
		this._useHandCursor=true;
		this.cursorType="pointer";
		//this.debugVisible=true;
		this._enterFrame = new AssetEvent(AssetEvent.ENTER_FRAME, this);

		this.inheritColorTransform = true;

		this._onMouseOver = (event:MouseEvent) => {
            if(this.buttonEnabled)
                this.currentFrameIndex = 1;
            else
                this.currentFrameIndex = 0;
		};
		this._onMouseOut = (event:MouseEvent) => {
			this.currentFrameIndex = 0;
		};
		this._onMouseDown = (event:MouseEvent) => {
            if(this.buttonEnabled)
                this.currentFrameIndex = 2;
            else
                this.currentFrameIndex = 0;
		};
		this._onMouseUp = (event:MouseEvent) => {
			this.currentFrameIndex = this.currentFrameIndex == 0? 0 : 1;
		};
		this._onDragOver = (event:MouseEvent) => {
            if(this.buttonEnabled)
                this.currentFrameIndex = 2;
            else
                this.currentFrameIndex = 0;
		};
		this._onDragOut = (event:MouseEvent) => {
			this.currentFrameIndex = 1;
		};
        
		this._timeline = timeline || new Timeline();
	}
	public buttonEnabled:boolean=true;

	public startSound(id:any, sound:WaveAudio, loopsToPlay:number){
        if(this._sounds[id]){
            this._sounds[id].stop();
        }
        sound.loopsToPlay=loopsToPlay;
        sound.play(0,false);
        this._sounds[id]=sound;
    }
	public stopSounds(soundID:any=null){
        if(soundID){
			if(this._sounds[soundID]){
            	this._sounds[soundID].stop();
                delete this._sounds[soundID];
            }
        }
        else{
            for (var key in this._sounds){
                this._sounds[key].stop();
            }
            this._sounds={};
        }
		var len:number = this._children.length;
		var child:DisplayObject;
		for (var i:number = 0; i < len; ++i) {
			child = this._children[i];
			if (child.isAsset(MovieClip))
				(<MovieClip> child).stopSounds(soundID);
		}
    }
    private _soundVolume:number;
	public get soundVolume():number{
        return this._soundVolume;
    }
	public set soundVolume(value:number){
        if(this._soundVolume==value){
            return;
        }
        this._soundVolume=value;
        for (var key in this._sounds){
            this._sounds[key].volume=value;
        }
		var len:number = this._children.length;
		var child:DisplayObject;
		for (var i:number = 0; i < len; ++i) {
			child = this._children[i];
			if (child.isAsset(MovieClip))
				(<MovieClip> child).soundVolume=value;
		}
    }
	public stopSound(id:number){
        if(this._sounds[id]){
            this._sounds[id].stop();
            delete this._sounds[id];
        }
    }
	public buttonReset(){
		if(this._isButton && !this.buttonEnabled){
			this.currentFrameIndex = 0;
		}
	}

	public getMouseCursor():string
	{
		if(this.name=="scene")
			return "initial";
		if(this._useHandCursor && (this.buttonMode)){
			return this.cursorType;
		}
        return "initial";
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

		this._potentialInstances = {};
		this._depth_sessionIDs = {};
		this._sessionID_childs = {};
	}

	public reset_textclones():void
	{
		if(this.timeline) {
			//var len:number = this._potentialInstances.length;
			for (var key in this._potentialInstances) {
				if (this._potentialInstances[key] != null) {
					if (this._potentialInstances[key].isAsset(TextField)){
						(<TextField>this._potentialInstances[key]).text = (<TextField>this.timeline.getPotentialChildPrototype(parseInt(key))).text;
                    }
					else if (this._potentialInstances[key].isAsset(MovieClip))
						(<MovieClip>this._potentialInstances[key]).reset_textclones();
				}
			}
		}
	}

	public get useHandCursor():boolean
	{
		return this._useHandCursor;
	}
	public set useHandCursor(value:boolean)
	{
		this._useHandCursor = value;
	}
	public get buttonMode():boolean
	{
		return this._buttonMode;
	}
	public set buttonMode(value:boolean)
	{
		this._buttonMode = value;
	}
	public get isButton():boolean
	{
		return this._isButton;
	}
	public set isButton(value:boolean)
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

	public jumpToLabel(label:string, offset:number=0):void
	{
		// the timeline.jumpTolabel will set currentFrameIndex
		this._timeline.jumpToLabel(this, label, offset);
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
        //this.stopSounds();

		if(this._adapter)
			(<IMovieClipAdapter> this.adapter).freeFromScript();

		this.constructedKeyFrameIndex = -1;
		for (var i:number = this.numChildren - 1; i >= 0; i--)
            this.removeChildAt(i);
        
        this.graphics.clear();


			
	
		if(fireScripts){
			var numFrames:number = this._timeline.keyframe_indices.length;
			this._isPlaying = Boolean(numFrames > 1);
			if (numFrames) {
				this._currentFrameIndex = 0;
				// contruct the timeline and queue the script.
				//if(fireScripts){
				this._timeline.constructNextFrame(this, fireScripts&&!this.doingSwap&&!this.preventScript, true);
				//}
			} else {
				this._currentFrameIndex = -1;
			}
		}
		// prevents the playhead to get moved in the advance frame again:	
		this._skipAdvance=true;

		
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
		var queue_script:boolean = true;

		var numFrames:number = this._timeline.keyframe_indices.length;

		if (!numFrames)
			return;

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

		this._skipAdvance=false;
		if (this._currentFrameIndex == value)
			return;

		this._currentFrameIndex = value;

		//console.log("_currentFrameIndex ", this.name, this._currentFrameIndex);
		//changing current frame will ignore advance command for that
		//update's advanceFrame function, unless advanceFrame has
		//already been executed

		//this._skipAdvance = MovieClip._skipAdvance;
		this._timeline.gotoFrame(this, value, queue_script, false, true);
	}

	public addButtonListeners():void
	{
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

	public removeButtonListeners():void
	{
		this.removeEventListener(MouseEvent.MOUSE_OVER, this._onMouseOver);
		this.removeEventListener(MouseEvent.MOUSE_OUT, this._onMouseOut);
		this.removeEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown);
		this.removeEventListener(MouseEvent.MOUSE_UP, this._onMouseUp);
		this.removeEventListener(MouseEvent.DRAG_OVER, this._onDragOver);
		this.removeEventListener(MouseEvent.DRAG_OUT, this._onDragOut);
	}

	public getChildAtSessionID(sessionID:number):DisplayObject
	{
		return this._sessionID_childs[sessionID];
	}

	public getSessionIDDepths():Object
	{
		return this._depth_sessionIDs;
	}

	public swapChildrenAt(index1:number, index2:number):void
	{
		var depth:number = this._children[index2]._depthID;
		var child:DisplayObject = this._children[index1];

		this.doingSwap=true;
		this.addChildAtDepth(this._children[index2], this._children[index1]._depthID);
        this.addChildAtDepth(child, depth);
        this._depth_sessionIDs[depth]=child._sessionID;
        this._depth_sessionIDs[this._children[index1]._depthID]=this._children[index2]._sessionID;
		this.doingSwap=false;
	}
	public swapDepths(child:DisplayObject, depth:number){

		var existingChild:DisplayObject=this.getChildAtDepth(depth);
		var currentDepth:number=child._depthID;
		if(currentDepth==depth){
			return;
		}
        delete this._depth_sessionIDs[currentDepth];
        this._depth_sessionIDs[depth]=child._sessionID;
		this.doingSwap=true;
		super.removeChildAtDepth(currentDepth);
		if(existingChild){
			super.removeChildAtDepth(depth);
			super.addChildAtDepth(existingChild, currentDepth);
		}
		super.addChildAtDepth(child, depth);
		this.doingSwap=false;

	}

	public addChildAtDepth(child:DisplayObject, depth:number, replace:boolean = true):DisplayObject
	{
		if(!this.doingSwap)
			child.reset();// this takes care of transform and visibility
		super.addChildAtDepth(child, depth, replace);
		
		if(!this.doingSwap){
			if(child.adapter!=child){
				(<IDisplayObjectAdapter>child.adapter).doInitEvents();
				if(child.isAsset(MovieClip)){
					   if((<MovieClip>child).onLoadedAction || (<MovieClip>child).onCustomConstructor){
						   FrameScriptManager.add_loaded_action_to_queue(<MovieClip>child);	   
					   }
				   }

			}
		}
		return 
	}

	public _addTimelineChildAt(child:DisplayObject, depth:number, sessionID:number):DisplayObject
	{
		this._depth_sessionIDs[depth] = child._sessionID = sessionID;

		this._sessionID_childs[sessionID] = child;
		
		if(child.adapter!=child && (<any>child.adapter).deleteOwnProperties){
			(<any>child.adapter).deleteOwnProperties();
		}

		
		return this.addChildAtDepth(child, depth);
	}

	public removeChildAtInternal(index:number):DisplayObject
	{
		var child:DisplayObject = this._children[index];

		if(!this.doingSwap){
			if(child._adapter)
				(<IMovieClipAdapter> child.adapter).freeFromScript();
	
			(<IMovieClipAdapter> this.adapter).unregisterScriptObject(child);
		}

		//check to make sure _depth_sessionIDs wasn't modified with a new child
		//if (this._depth_sessionIDs[child._depthID] == child._sessionID)
		//delete this._depth_sessionIDs[child._depthID];

		delete this._sessionID_childs[child._sessionID];

		if(!this.doingSwap){
            child._sessionID = -1;
        }
        else{
            child._sessionID = -2;

        }

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
	public update(events:any[]=null, dt:number=0):void
	{

		// Not used for AVM1 !!!
		// in AVM1 this in done in the onEnter of AVMAwayStage, because we have multiple roots

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
		FrameScriptManager.execute_intervals(dt);

		// finally, we execute any scripts that were added from intervals
		FrameScriptManager.execute_queue();

		//execute any disposes as a result of framescripts
		FrameScriptManager.execute_dispose();

		if(events!=null){
			(<any>this.adapter).dispatchEvent(events[1]);
		}
	}

	public getPotentialChildInstance(id:number, instanceID:string) : IAsset
	{
		if (!this._potentialInstances[id] || this._potentialInstances[id]._sessionID==-2)
			this._potentialInstances[id] = this._timeline.getPotentialChildInstance(id);
        this._timeline.initChildInstance(<DisplayObject>this._potentialInstances[id], instanceID);
		return this._potentialInstances[id];
	}


	/**
	 * Stop playback of animation and hold current position
	 */
	public stop():void
	{
        //this.stopSounds();
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

		// if this._skipadvance is true, the mc has already been moving on its timeline this frame
		// this happens for objects that have been newly added to parent
		// they still need to queue their scripts

		if (this._isPlaying && !this._skipAdvance) {
			if (this._currentFrameIndex == this._timeline.keyframe_indices.length - 1) {
				if (this.loop){
                     // end of loop - jump to first frame.
                     if(this._currentFrameIndex==0){
                        // do nothing if we are already on frame 1
                     }
                     else{
                        this._currentFrameIndex = 0;					
                        this._timeline.gotoFrame(this, 0, true, true, true);
                     }
				}	
				else //end of timeline, stop playing
					this._isPlaying = false;
			} else { // not end - construct next frame
				this._currentFrameIndex++;
				this._timeline.constructNextFrame(this);
			}
			//console.log("advancedFrame ", this.name, this._currentFrameIndex);
		}

		// than come the children from bottom up:

		var len:number = this._children.length;
		var child:DisplayObject;
		for (var i:number = 0;i< len; i++) {
			child = this._children[i];

			if (child.isAsset(MovieClip)){
				(<MovieClip> child).advanceFrame();
			}
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
		for (var key in this._potentialInstances) {
			var instance:IAsset = this._potentialInstances[key];

			//only dispose instances that are not used in script ie. do not have an instance name
			if (instance && instance.name == "") {
				if(!instance.isAsset(Graphics)){
					FrameScriptManager.add_child_to_dispose(<DisplayObject>instance);

				}
				delete this._potentialInstances[key];
			}
		}

		super.clear();
	}
}

PartitionBase.registerAbstraction(EntityNode, MovieClip);
