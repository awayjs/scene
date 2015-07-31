import Event = require("awayjs-core/lib/events/Event");
import AssetEvent = require("awayjs-core/lib/events/AssetEvent");
import ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
import IAsset = require("awayjs-core/lib/library/IAsset");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import Mesh = require("awayjs-display/lib/entities/Mesh");
import Billboard = require("awayjs-display/lib/entities/Billboard");

import MouseEvent = require("awayjs-display/lib/events/MouseEvent");
import SceneEvent = require("awayjs-display/lib/events/SceneEvent");

import IMovieClipAdapter		= require("awayjs-display/lib/adapters/IMovieClipAdapter");
import Timeline = require("awayjs-display/lib/base/Timeline");
import FrameScriptManager = require("awayjs-display/lib/managers/FrameScriptManager");

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
    private _constructedKeyFrameIndex:number;// the current index of the current active frame

    private _fps:number;// we use ms internally, but have fps, so user can set time by frame
    private _isPlaying:boolean;// false if paused or stopped
    private _loop:boolean = true;

    // not sure if needed
    private _enterFrame:Event;
    private _skipAdvance : boolean;
    private _isInit : boolean;

    private _potentialInstances:Array<DisplayObject>;
   // private _framescripts_to_execute:Array<Function>;

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

    constructor()
    {
        super();
        this._potentialInstances = [];
        this._currentFrameIndex = -1;
        this._constructedKeyFrameIndex = -1;
        this._isInit=true;
        this._isPlaying = true; // auto-play
        this._isButton=false;

        this._fps = 30;
        this._time = 0;
        this._enterFrame = new Event(Event.ENTER_FRAME);
        this.inheritColorTransform = true;

        this._onMouseOver = (event:MouseEvent) => this.currentFrameIndex = 1;
        this._onMouseOut = (event:MouseEvent) => this.currentFrameIndex = 0;
        this._onMouseDown = (event:MouseEvent) => this.currentFrameIndex = 2;
        this._onMouseUp = (event:MouseEvent) => this.currentFrameIndex = this.currentFrameIndex == 0? 0 : 1;
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
        var i:number=0;
        var potential_child_length:number=value.getPotentialChilds().length;
        for(i=0; i<potential_child_length; i++){
            this._potentialInstances[i]=null;
        }
    }
    public get loop()
    {
        return this._loop;
    }

    public set loop(value:boolean)
    {
        this._loop = value;
    }

    public get numFrames() : number
    {
        return this.timeline.numFrames();
    }

    public jumpToLabel(label:string) : void
    {
        // the timeline.jumpTolabel will set currentFrameIndex
        this.timeline.jumpToLabel(this, label);
    }

    public get currentFrameIndex() : number
    {
        return this._currentFrameIndex;
    }
    public get constructedKeyFrameIndex() : number
    {
        return this._constructedKeyFrameIndex;
    }

    public set constructedKeyFrameIndex(value : number)
    {
        this._constructedKeyFrameIndex = value;
    }

    public reset():void
    {
        console.log("reset name = "+this.name);
        if(this.adapter){
            this.adapter.freeFromScript();
        }

        this._isPlaying = true;
        this._time = 0;
        this._currentFrameIndex = -1;
        this._constructedKeyFrameIndex = -1;
        var i:number=this.numChildren;
        while (i--){
            var child:DisplayObject=this.getChildAt(i);
            this.adapter.unregisterScriptObject(child);
            this.removeChildAt(i);
        }

        /*
        // force reset all potential childs on timeline. // this seem to slow things down without having positive any effect
        for (var key in this._potentialInstances) {
            if (this._potentialInstances[key]) {
                if (this._potentialInstances[key].isAsset(MovieClip))
                    (<MovieClip>this._potentialInstances[key]).reset();
            }
        }
        */

        if(this.parent!=null){
            this._skipAdvance = true;
            this.timeline.gotoFrame(this, 0);
            this._currentFrameIndex = 0;
        }

        // i was thinking we might need to reset all children, but it makes stuff worse
        /*
        var i:number=this.numChildren;
        while (i--) {
            var child = this.getChildAt(i);
            if (child.isAsset(MovieClip))
                (<MovieClip>child).reset();
        }
        */
        //this.advanceChildren();

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
    public set currentFrameIndex(value : number)
    {
        if(this._timeline) {
            value = Math.floor(value);
            if (value < 0)
                value = 0;
            else if (value >= this.timeline.numFrames())
                value = this.timeline.numFrames() - 1;

            this._skipAdvance = true;
            //this._time = 0;

            this.timeline.gotoFrame(this, value);

            this._currentFrameIndex = value;
        }
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

    public addChildAtDepth(child:DisplayObject, depth:number, replace:boolean = true):DisplayObject
    {
        //this should be implemented for all display objects
        child.inheritColorTransform = true;
		super.addChildAtDepth(child, depth, replace);

        return child;
    }

    public get fps():number
    {
        return this._fps;
    }

    public set fps(newFps:number)
    {
        this._fps = newFps;
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
    public update(timeDelta:number)
    {
        //this.logHierarchy();
        // TODO: Implement proper elastic racetrack logic
        var frameMarker:number = Math.floor(1000/this._fps);

        // right now, just advance frame once time marker has been reached (only allow for one frame advance per-update)
        this._time += Math.min(timeDelta, frameMarker);

        if (this._time >= frameMarker) {
            this._time = 0;
            this.advanceFrame();
            // after we advanced the scenegraph, we might have some script that needs executing
            FrameScriptManager.execute_queue();

            // now we want to execute the onEnter
            this.dispatchEvent(this._enterFrame);
            // after we executed the onEnter, we might have some script that needs executing
            FrameScriptManager.execute_queue();
            //console.log("update "+this._currentFrameIndex);
            //console.log("update key "+this._constructedKeyFrameIndex);
        }
    }

    public getPotentialChildInstance(id:number) : DisplayObject
    {
        if (!this._potentialInstances[id]) {
            this._potentialInstances[id] = this.timeline.getPotentialChildInstance(id);
        }

        return this._potentialInstances[id];
    }

    public addScriptForExecution(value:Function)
    {
        FrameScriptManager.add_script_to_queue(this, value);
    }
    public activateChild(id:number)
    {
        this.addChild(this.getPotentialChildInstance(id));
    }

    public deactivateChild(id:number)
    {
        this.removeChild(this._potentialInstances[id]);
    }

    /**
     * Stop playback of animation and hold current position
     */
    public stop()
    {
        this._isPlaying = false;
    }

    public clone(newInstance:MovieClip = null) : DisplayObject
    {
        newInstance = <MovieClip> super.clone(newInstance || new MovieClip());

        newInstance.timeline = this._timeline;

        newInstance._fps = this._fps;
        newInstance._loop = this._loop;

        return newInstance;
    }

	public iSetParent(value:DisplayObjectContainer)
	{
		super.iSetParent(value);

        this.reset();
	}

    public advanceFrame(skipChildren:boolean = false)
    {
        if(this.timeline) {
            var i;
            var oldFrameIndex = this._currentFrameIndex;
            var advance = (this._isPlaying && !this._skipAdvance) || oldFrameIndex == -1;
            if (advance && oldFrameIndex == this.timeline.numFrames() - 1 && !this._loop) {
                advance = false;
            }
            if (advance && oldFrameIndex == 0 && this.timeline.numFrames() == 1) {
                //console.log("one frame clip");
                this._currentFrameIndex = 0;
                advance = false;
            }
            if (advance) {
                //console.log("advance");
                ++this._currentFrameIndex;
                if (this._currentFrameIndex == this.timeline.numFrames()) {
                    // looping - jump to first frame.
                    this.currentFrameIndex=0;
                }
                else if (oldFrameIndex != this._currentFrameIndex){
                    // not looping - construct next frame
                    this.timeline.constructNextFrame(this);
                }
            }

            if (!skipChildren)
                this.advanceChildren();

        }
        this._skipAdvance = false;
    }

    private advanceChildren()
    {
        var len = this.numChildren;
        for (var i = 0; i <  len; ++i) {
            var child = this.getChildAt(i);
            if (child instanceof MovieClip)
                (<MovieClip>child).advanceFrame();
        }
    }




// DEBUG CODE:
    logHierarchy(depth: number = 0):void
    {
        this.printHierarchyName(depth, this);

        var len = this.numChildren;
        for (var i = 0; i < len; i++) {
            var child = this.getChildAt(i);

            if (child instanceof MovieClip)
                (<MovieClip>child).logHierarchy(depth + 1);
            else
                this.printHierarchyName(depth + 1, child);
        }
    }

    printHierarchyName(depth:number, target:DisplayObject)
    {
        var str = "";
        for (var i = 0; i < depth; ++i)
            str += "--";

        str += " " + target.name + " = " + target._iMaskID;
        console.log(str);
    }

    executePostConstructCommands():boolean
    {
        return true;
    }
}
export = MovieClip;
