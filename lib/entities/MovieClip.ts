import Event = require("awayjs-core/lib/events/Event");
import AssetEvent = require("awayjs-core/lib/events/AssetEvent");
import ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
import IAsset = require("awayjs-core/lib/library/IAsset");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import Mesh = require("awayjs-display/lib/entities/Mesh");
import Billboard = require("awayjs-display/lib/entities/Billboard");
import TextField = require("awayjs-display/lib/entities/TextField");

import MouseEvent               = require("awayjs-display/lib/events/MouseEvent");

import IMovieClipAdapter		= require("awayjs-display/lib/adapters/IMovieClipAdapter");
import Timeline                 = require("awayjs-display/lib/base/Timeline");
import FrameScriptManager       = require("awayjs-display/lib/managers/FrameScriptManager");

class MovieClip extends DisplayObjectContainer
{
    public static assetType:string = "[asset MovieClip]";

    private _timeline:Timeline;

    private _isButton:boolean;
    private _onMouseOver:(event:MouseEvent) => void;
    private _onMouseOut:(event:MouseEvent) => void;
    private _onMouseDown:(event:MouseEvent) => void;
    private _onMouseUp:(event:MouseEvent) => void;

    private _time:number;// the current time inside the animation
    private _currentFrameIndex:number;// the current frame

    private _isPlaying:boolean;// false if paused or stopped

    // not sure if needed
    private _enterFrame:Event;
    private _skipAdvance : boolean;
    private _isInit : boolean;

    private _potentialInstances:Object;
    private _sessionID_childs:Object;

	/**
	 * adapter is used to provide MovieClip to scripts taken from different platforms
	 * setter typically managed by factory
	 */
	public get adapter():IMovieClipAdapter
	{
		return <IMovieClipAdapter> this._adapter;
	}

	public set adapter(value:IMovieClipAdapter)
	{
		this._adapter = value;
	}

    constructor(timeline:Timeline = null)
    {
        super();
        this._sessionID_childs = {};
        this._potentialInstances = {};
        this._currentFrameIndex = -1;
        this.constructedKeyFrameIndex = -1;
        this._isInit=true;
        this._isPlaying = true; // auto-play
        this._isButton=false;

        this._time = 0;
        this._enterFrame = new Event(Event.ENTER_FRAME);
        this.inheritColorTransform = true;

        this._onMouseOver = (event:MouseEvent) => this.currentFrameIndex = 1;
        this._onMouseOut = (event:MouseEvent) => this.currentFrameIndex = 0;
        this._onMouseDown = (event:MouseEvent) => this.currentFrameIndex = 2;
        this._onMouseUp = (event:MouseEvent) => this.currentFrameIndex = this.currentFrameIndex == 0? 0 : 1;

        this._timeline = timeline || new Timeline();
    }


    public clear_textclones()
    {
        for (var key in this._potentialInstances){
            if(this._potentialInstances[key]!=null) {
                if (this._potentialInstances[key].isAsset(TextField)) {
                    this._potentialInstances[key] = null;
                }
                else if (this._potentialInstances[key].isAsset(MovieClip)) {
                    (<MovieClip>this._potentialInstances[key]).clear_textclones();
                }
            }
        }
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
    }

    /**
     *
     */
    public loop:boolean = true;

    public get numFrames() : number
    {
        return this._timeline.numFrames;
    }

    public jumpToLabel(label:string)
    {
        // the timeline.jumpTolabel will set currentFrameIndex
        this._timeline.jumpToLabel(this, label);
    }

    /**
     * the current index of the current active frame
     */
    public constructedKeyFrameIndex:number;

    public exit_frame():void
    {
        this._skipAdvance = false;

        var child:DisplayObject;
        for (var i:number = this.numChildren - 1; i >= 0; i--) {
            child = this._children[i];
            if(child.isAsset(MovieClip))
                (<MovieClip> child).exit_frame();
        }
    }
    public reset():void
    {
        super.reset();

        // time only is relevant for the root mc, as it is the only one that executes the update function
        this._time = 0;

        if(this.adapter)
            this.adapter.freeFromScript();

        this._isPlaying = true;

        this._currentFrameIndex = -1;
        this.constructedKeyFrameIndex = -1;
        for (var i:number = this.numChildren - 1; i >= 0; i--)
            this.removeChildAt(i);

        this._skipAdvance = true;

        if (this._timeline.numFrames) {
            this._currentFrameIndex = 0;
            this._timeline.constructNextFrame(this, true, true);
        }
    }

    /*
     * Setting the currentFrameIndex without moving the playhead for this movieclip to the new position
     */
    public set_currentFrameIndex(value : number) {
        this._skipAdvance = true;
        this._currentFrameIndex = value;
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
        if (this._currentFrameIndex == value)
            return;

        if(this._timeline.numFrames) {
            value = Math.floor(value);

            var skip_script:boolean = false;

            if (value < 0) {
                value = 0;
            } else if (value >= this._timeline.numFrames) {
                value = this._timeline.numFrames - 1;
                skip_script=true;
            }

            // on changing currentframe we do not need to set skipadvance. the advanceframe should already be happened...
            this._skipAdvance = true;
            //this._time = 0;

            this._timeline.gotoFrame(this, value, skip_script);
        }

        this._currentFrameIndex = value;
    }

    public addButtonListeners()
    {
        this._isButton = true;

        this.stop();

        this.addEventListener(MouseEvent.MOUSE_OVER, this._onMouseOver);
        this.addEventListener(MouseEvent.MOUSE_OUT, this._onMouseOut);
        this.addEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown);
        this.addEventListener(MouseEvent.MOUSE_UP, this._onMouseUp);
    }

    public removeButtonListeners()
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

    public addChildAtDepth(child:DisplayObject, depth:number, replace:boolean = true):DisplayObject
    {
        //this should be implemented for all display objects
        child.inheritColorTransform = true;

        child.reset();// this takes care of transform and visibility

        super.addChildAtDepth(child, depth, true);

        this._sessionID_childs[child._sessionID] = child;

        return child;
    }

    public removeChildAtInternal(index:number /*int*/):DisplayObject
    {
        delete this._sessionID_childs[this._children[index]._sessionID];

        var child:DisplayObject = super.removeChildAtInternal(index);

        if(child.adapter)
            child.adapter.freeFromScript();

        this.adapter.unregisterScriptObject(child);


        return child;
    }

    public get assetType():string
    {
        return MovieClip.assetType;
    }

    /**
     * Starts playback of animation from current position
     */
    public play()
    {
        this._isPlaying = true;
    }

    /**
     * should be called right before the call to away3d-render.
     */
    public update()
    {
        this.advanceFrame();

        // after we advanced the scenegraph, we might have some script that needs executing
        FrameScriptManager.execute_queue();

        // now we want to execute the onEnter
        this.dispatchEvent(this._enterFrame);

        // after we executed the onEnter, we might have some script that needs executing
        FrameScriptManager.execute_queue();

        // now we execute any intervals queued
        FrameScriptManager.execute_intervals();

        // finally, we execute any scripts that were added from intervals
        FrameScriptManager.execute_queue();

        this.exit_frame();
    }

    public getPotentialChildInstance(id:number) : DisplayObject
    {
        if (!this._potentialInstances[id])
            this._potentialInstances[id] = this._timeline.getPotentialChildInstance(id);


        return this._potentialInstances[id];
    }


    /**
     * Stop playback of animation and hold current position
     */
    public stop()
    {
        this._isPlaying = false;
    }

    public clone():MovieClip
    {
        var newInstance:MovieClip = new MovieClip(this._timeline);

        this.copyTo(newInstance);

        return newInstance;
    }

    public copyTo(newInstance:MovieClip)
    {
        super.copyTo(newInstance);

        newInstance.timeline = this._timeline;
        newInstance.loop = this.loop;
    }


    public iSetParent(value:DisplayObjectContainer)
	{
		super.iSetParent(value);
	}

    public advanceFrame(skipChildren:boolean = false)
    {
        var numFrames:number = this._timeline.numFrames;
        if(numFrames) {
            if (((this._isPlaying && !this._skipAdvance) || this._currentFrameIndex == -1) && (this._currentFrameIndex != numFrames - 1 || this.loop)) {
                this._currentFrameIndex++;
                if (this._currentFrameIndex == numFrames) { // looping - jump to first frame.
                    this.currentFrameIndex = 0;
                } else { // not looping - construct next frame
                    this._timeline.constructNextFrame(this);
                }
            }

            if (!skipChildren)
                this.advanceChildren();
        }

        this._skipAdvance = false;
    }

    private advanceChildren()
    {
        var len:number = this.numChildren;
        var child:DisplayObject;
        for (var i:number = 0; i <  len; ++i) {
            child = this._children[i];

            if (child.isAsset(MovieClip))
                (<MovieClip> child).advanceFrame();
        }
    }




// DEBUG CODE:
    logHierarchy(depth: number = 0):void
    {
        this.printHierarchyName(depth, this);

        var len = this.numChildren;
        var child:DisplayObject;
        for (var i:number = 0; i < len; i++) {
            child = this._children[i];

            if (child.isAsset(MovieClip))
                (<MovieClip> child).logHierarchy(depth + 1);
            else
                this.printHierarchyName(depth + 1, child);
        }
    }

    printHierarchyName(depth:number, target:DisplayObject)
    {
        var str = "";
        for (var i = 0; i < depth; ++i)
            str += "--";

        str += " " + target.name + " = " + target.id;
        console.log(str);
    }


}
export = MovieClip;
