import UVTransform					= require("awayjs-core/lib/geom/UVTransform");
import AssetType					= require("awayjs-core/lib/library/AssetType");
import IAsset					    = require("awayjs-core/lib/library/IAsset");
//import Transform				    = require("awayjs-core/lib/geom/Transform");
import Matrix3D					    = require("awayjs-core/lib/geom/Matrix3D");
import Matrix					    = require("awayjs-core/lib/geom/Matrix");

import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import SubGeometryBase				= require("awayjs-display/lib/base/SubGeometryBase");
import SubGeometry					= require("awayjs-display/lib/base/TriangleSubGeometry");
import ISubMesh						= require("awayjs-display/lib/base/ISubMesh");
import ISubMeshClass				= require("awayjs-display/lib/base/ISubMeshClass");
import Geometry						= require("awayjs-display/lib/base/Geometry");
import GeometryEvent				= require("awayjs-display/lib/events/GeometryEvent");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import IRenderer					= require("awayjs-display/lib/render/IRenderer");
import DisplayObjectContainer		 = require("awayjs-display/lib/containers/DisplayObjectContainer");
import TimeLineFrame		        = require("awayjs-display/lib/entities/timelinedata/TimeLineFrame");
import TimeLineObject		        = require("awayjs-display/lib/entities/timelinedata/TimeLineObject");

/**
 * Timeline is a DisplayObjectContainer, that can control the animation of a list of TimeLineObjects.
 * For now, the focus of Development is on animating the new type of 2D-Geometry exported from FlashPro,
 * but there is no reason that this cannot be used to animate any type of object, that implements IAsset.
**/
class TimeLine extends DisplayObjectContainer
{
    // pool of available TimeLineObject-objects for this timeline.
    // Each TImeLineObject hold reference to a pre-instanced (cloned) IAsset,
    // so we do not have to do any cloning while playing.
    // If a IAsset is of a type that extends DisplayObject, it gets added as Child, with .visible=false
    // we need this list, and can not use the children-list directly,
    // because TimeLine needs to be able to control IAsset that to not extend DisplayObject.
    private _timeLineObjs:Array<TimeLineObject>;

    private _frames:Array<TimeLineFrame>;
    private _time:number;// the current time inside the animation
    private _currentFrame:number;// the current frame
    private _speed:number;// the speed of animation. for now keep it positive, as reverse playing will need changes to the commands
    private _fps:number;// we use ms internally, but have fps, so user can set time by frame
    private _isplaying:boolean;// false if paused or stopped
    private _isInit:boolean;// false if paused or stopped
    private _playMode:number;// 0: normal, 1: loop, 2: pingpong
    private _duration:number=0;

    constructor()
    {
        super();
        this._timeLineObjs=new Array<TimeLineObject>();
        this._frames=new Array<TimeLineFrame>();
        this._currentFrame=0;
        this._speed=1.0;
        this._isplaying=false;
        this._fps=25;
        this._time=0;
        this._duration=0;
        this._playMode=1;
    }

    public get speed():number
    {
        return this._speed;
    }
    public set speed(newSpeed:number)
    {
        this._speed=newSpeed;
    }
    public get fps():number
    {
        return this._fps;
    }
    public set fps(newFps:number)
    {
        this._fps=newFps;
    }
    public get assetType():string
    {
      return AssetType.TIMELINE;
    }

    /**
     * should be called right before the call to away3d-render.
     */
    public update(timeDelta:number, jumpingToFrame:boolean=false)
    {
        var tlo:number;
        // only update if playing, or if not init before, or if jumping to frame
        if((this._isplaying)||(!this._isInit)||(jumpingToFrame)) {

            // multiply the timeDelta with the speed (can be negative)
            // update the this._time accordingly
            var timeDelta:number = timeDelta * this._speed;
            this._time += timeDelta;
            // take care that the _time is within bounds
            while(this._time>this._duration){
                if(this._playMode==0){
                    this._time=this._duration;
                    this.stop();
                }
                else if(this._playMode==1){
                    this._time-=this._duration;
                }
            }
            while(this._time<0){
                if(this._playMode==0){
                    this._time=0;
                    this.stop();
                }
                else if(this._playMode==1) {
                    this._time += this._duration;
                }
            }


            // now we know the exact time of the animation that we want to display.
            // next we need to decide which Frame needs to be displayed. (index in Array)
            // this should always be currentFrame, or currentFrame++
            // each frame has startTime and EndTime, so we can easily decide
            var frameCnt:number = 0;
            var curFrame:TimeLineFrame;
            var foundFrame:Boolean = false;
            // this while loop should only be executed 1-2 times
            while (frameCnt < this._frames.length) {
                curFrame = this._frames[this._currentFrame];
                //console.log("searchForFrame=="+this._time+" startTime= "+curFrame.startTime+" endTime = "+curFrame.endTime);

                if ((this._time >= curFrame.startTime) && (this._time <= curFrame.endTime)) {
                    foundFrame = true;
                    frameCnt = this._frames.length;
                }
                else {
                    curFrame.makeDirty();// make sure the frame gets executed next time it should show
                    if (this._speed < 0) {
                        this._currentFrame--;
                        if (this._currentFrame < 0) {
                            this._currentFrame = this._frames.length - 1;
                        }
                    }
                    else {
                        this._currentFrame++;
                        if (this._currentFrame >= this._frames.length) {
                            this._currentFrame = 0;
                        }
                    }
                }
                frameCnt++;
            }
            //console.log("foundframe="+foundFrame+" thistime= "+this._time+" frameIDX = "+this._currentFrame);

            // if foundFrame is true, curFrame is the frame to display.
            if (foundFrame) {
                //console.log("Frame dirty="+curFrame.isDirty);
                if(curFrame.isDirty) {
                    //console.log("Reset isOnStage value");
                    // reset the "isOnStage" state for all the objects

                    var commandSet:number=1;// 1 = execute normal playback commands
                    if(this._speed<0){
                        commandSet=2;//2 = execute reversed playback commands
                    }
                    // if we are jumping Frames, we need to hide all objects and fully init
                    //if(jumpingToFrame) {
                        commandSet = 0;//0 = execute full init frame commands
                        for (tlo = 0; tlo < this._timeLineObjs.length; tlo++) {
                            if (this._timeLineObjs[tlo].isActive) {
                                this._timeLineObjs[tlo].deactivate();
                            }
                        }
                   // }
                    //todo: use the correct set of commands (for now we always use set 1)
                    curFrame.executeCommands(1, this._time, this._speed);

                    // now we have all objects on stage, we can execute the frame script for this frame
                    this.executeFrameScript(curFrame.script);

                }
                else{
                    // the frame has already been initiated.
                    // for now we do nothing
                    // later we might want to implement interpolation here
                }
            }
            this._isInit=true;
        }
        // update all the visible TimeLineObjects that are of type timeline
        for (tlo=0; tlo<this._timeLineObjs.length;tlo++){
            if(this._timeLineObjs[tlo].isActive){
                if(this._timeLineObjs[tlo].asset.assetType==AssetType.TIMELINE){
                    (<TimeLine>this._timeLineObjs[tlo].asset).update(timeDelta);
                }
            }
        }

    }
    /**
     * Add a new TimeLineFrame.
     */
    public addFrame(newFrame:TimeLineFrame)
    {
        this._duration+=newFrame.duration;
        this._frames.push(newFrame);
    }
    public get duration():number
    {
        return this._duration;
    }
    public set duration(newDuration:number)
    {
        this._duration=newDuration;
    }
    /**
     * This is called inside the TimeLineFrame.execute() function.
     */
    public executeFrameScript(frameScript:string)
    {

        // this function should interpret the framescript.
        // the timeline object offer functions getObjectByInstanceName(instanceName:string)
        // a nested movieClip like "mainWindow.clip1" could be accessed like this:
        // getObjectByInstanceName("mainWindow").getObjectByInstanceName("clip1")

        // the AssetLibrary can be used as equivalent for the flash-library.
        // it already has options to access library-assets by name, so i think we can work with that.

    }
    /**
     * Starts playback of animation from current position
     */
    public start() {
        this._isplaying=true;
        this.update(0);
    }
    /**
     * Stop playback of animation and hold current position
     */
    public stop() {
        this._isplaying=false;// no need to call any other stuff
    }

    /**
     * Classic gotoAndPlay like as3 api - set frame by frame-number.
     */
    public gotoAndPlay(frameNumber:number){
        this._time=frameNumber*(1000/this._fps);
        this._isplaying=true;
        this.update(0, true);
    }
    /**
     * Classic gotoAndStop as3 api - set frame by frame-number.
     */
    public gotoAndStop(frameNumber:number){
        this._time=frameNumber*(1000/this._fps);
        this.update(0, true);
        this._isplaying=false;//stop playback again
    }
    /**
     * gotoAndPlay - set frame by frame-label.
     */
    public gotoAndPlayLabel(frameLabel:string) {
        var frameNumber:number = -1;
        for (var i:number = 0; i < this._frames.length; i++) {
            for (var fl:number = 0; fl < this._frames[i].framelabels.length; fl++) {
                if (this._frames[i].framelabels[fl] == frameLabel) {
                    fl = this._frames[i].framelabels.length;
                    frameNumber = i;
                    i = this._frames.length;
                }
            }
        }
        if (frameNumber >= 0) {
            this._time = frameNumber * (1000 / this._fps);
            this._isplaying = true;
            this.update(0, true);
        }
    }
    /**
     * gotoAndStop - set frame by frame-label.
     */
    public gotoAndStopLabel(frameLabel:string) {
        var frameNumber:number = -1;
        for (var i:number = 0; i < this._frames.length; i++) {
            for (var fl:number = 0; fl < this._frames[i].framelabels.length; fl++) {
                if (this._frames[i].framelabels[fl] == frameLabel) {
                    fl = this._frames[i].framelabels.length;
                    frameNumber = i;
                    i = this._frames.length;
                }
            }
        }
        if (frameNumber >= 0) {
            this._time = frameNumber * (1000 / this._fps);
            this.update(0, true);
            this._isplaying = false;
        }
    }
    /**
     * gotoAndPlay - set time in ms.
     */
    public gotoAndPlayTime(time:number){
        this._time=time;
        this._isplaying=true;
        this.update(0, true);
    }
    /**
     * gotoAndStop - set time in ms.
     */
    public gotoAndStopTime(time:number){
        this._time=time;
        this.update(0, true);
        this._isplaying=false;//stop playback again
    }

    public addTimeLineObject(newTlObj:TimeLineObject, isDisplayObj:boolean=true) {
        if (isDisplayObj) {
            this.addChild(<DisplayObjectContainer>newTlObj.asset);
        }
        newTlObj.deactivate();
        this._timeLineObjs.push(newTlObj);
    }
    public getTimeLineObjectByID(objID:number):TimeLineObject
    {
        for (var tlo:number=0; tlo<this._timeLineObjs.length;tlo++){
            if(this._timeLineObjs[tlo].objID==objID){
                return this._timeLineObjs[tlo];
            }
        }
        return undefined;
    }
    public getObjectByInstanceName(instanceName:string):IAsset
    {
        for (var tlo:number=0; tlo<this._timeLineObjs.length;tlo++){
            if(this._timeLineObjs[tlo].asset.name==instanceName){
                return this._timeLineObjs[tlo].asset;
            }
        }
    }
}

export = TimeLine;
