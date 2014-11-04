import AssetType					= require("awayjs-core/lib/library/AssetType");
import IAsset					    = require("awayjs-core/lib/library/IAsset");
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
import Mesh		                    = require("awayjs-display/lib/entities/Mesh");
import TimeLine = require("awayjs-display/lib/entities/TimeLine");
import FrameCommand = require("awayjs-display/lib/entities/timelinedata/FrameCommand");


/**
 * TimelineFrame holds 3 list of FrameCommands
 *  - list1 _frameCommands should be  executed when playing the timeline (previous Frame was played)
 *  - list2 _frameCommandsReverse should be executed when playing the timeline reversed (previous Frame was played)
 *  - list3 _frameCommandsInit should be executed when jumping to a frame, so we need to fully init the frame
 *
 *  Addionial TimelineFrame properties are:
 *  - script - can be executed, after the frameCommands have been executed
 *  - list of FrameLabels, and list of corresponding labelTypes
 *  - duration-value (1 frame is not necessary 1 frame long)
 *  - startTime and endTime are needed internally when deciding what frame to display
 */
class TimeLineFrame
{
    private _script:string;
    private _startTime:number;
    private _endTime:number;
    private _duration:number;
    private _timeline:TimeLine;
    private _frameCommands:Array<FrameCommand>;
    private _frameCommandsReverse:Array<FrameCommand>;
    private _frameCommandsInit:Array<FrameCommand>;
    private _framelabels:Array<string>;
    private _labelTypes:Array<number>;
    private _isDirty:boolean;

    constructor()
    {
        this._isDirty=true;
        this._script="";
        this._duration=1;//use millisecs for duration ? or frames ?
        this._frameCommands=new Array<FrameCommand>();
        this._frameCommandsReverse=new Array<FrameCommand>();
        this._frameCommandsInit=new Array<FrameCommand>();
        this._framelabels=new Array<string>();
        this._labelTypes=new Array<number>();
    }
    public addCommand(newCommand:FrameCommand)
    {
        // make the timeline available for the commands
        this._frameCommands.push(newCommand);
    }
    public addCommandReverse(newCommand:FrameCommand)
    {
        // make the timeline available for the commands
        this._frameCommandsReverse.push(newCommand);
    }
    public addCommandInit(newCommand:FrameCommand)
    {
        // make the timeline available for the commands
        this._frameCommandsInit.push(newCommand);
    }
    public addLabel(label:string, type:number)
    {
        this._framelabels.push(label);
        this._labelTypes.push(type);
    }
    public get framelabels():Array<string>
    {
        return this._framelabels;
    }
    public get labelTypes():Array<number>
    {
        return this._labelTypes;
    }
    public get script():string
    {
        return this._script;
    }
    public addToScript(newscript:string)
    {
        this._script+=newscript;
    }

    public get isDirty():boolean
    {
        return this._isDirty;
    }
    public makeDirty():void
    {
        this._isDirty=true;
    }
    public get startTime():number
    {
        return this._startTime;
    }
    public get duration():number
    {
        return this._duration;
    }
    public get endTime():number
    {
        return this._endTime;
    }
    public setFrameTime(startTime:number, duration:number)
    {
        this._startTime=startTime;
        this._duration=duration;
        this._endTime=startTime+duration;
    }
    /**
     * executes the set of Commands for this Frame.
     * Each Frame has 3 sets of commands:
     *  0 = init frame commands = the frame must be init as if previous frame was not played
     *  1 = play frame commands = the previous frame was played
     *  2 = playReverse Commands = the next frame was played
     */
    public executeCommands(commandSet:number, time:number, speed:number){
        // execute all the  frame commands for this frame
        if(commandSet==0){
            //todo: create the frameCommands for init in the parser
            for (var i = 0; i < this._frameCommandsInit.length; i++) {
                this._frameCommandsInit[i].execute(time, speed);
            }
        }
        else if (commandSet==1) {
            for (var i = 0; i < this._frameCommands.length; i++) {
                this._frameCommands[i].execute(time, speed);
            }
        }
        else if (commandSet==2) {
            //todo: create the frameCommands for reverse playback in the parser
            for (var i = 0; i < this._frameCommandsReverse.length; i++) {
                this._frameCommandsReverse[i].execute(time, speed);
            }
        }
        // mark this frame as not dirty, so it will not get executed again, unless TimeLine makes it dirty again.
        // whenever a Frame is entered, the Timeline should mark the previous frame as dirty.
        this._isDirty=false;
    }

}

export = TimeLineFrame;
