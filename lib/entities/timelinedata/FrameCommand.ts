import CommandPropsBase = require("awayjs-display/lib/entities/timelinedata/CommandPropsBase");
import TimeLineObject = require("awayjs-display/lib/entities/timelinedata/TimeLineObject");

/**
 * FrameCommand associates a TimeLineobject with CommandProps.
 * CommandProps can be of different class, depending on the type of Asset that the TimeLineObject references to.
 */
class FrameCommand
{
    private _commandProps:CommandPropsBase;// this hold the data for the command
    private _tlObj:TimeLineObject;// the object to update
    private _activate:boolean;// if this is false, it is a remove command. we call the deactivate function instead of apply

    constructor(tlObj:TimeLineObject)
    {
        this._tlObj=tlObj;
        this.commandProps=null;
        this._activate=true;
    }
    public set activateObj(newActve:boolean)
    {
        this._activate=newActve;
    }
    public get activateObj():boolean
    {
        return this._activate;
    }
    public set commandProps(newProps:CommandPropsBase)
    {
        this._commandProps=newProps;
    }
    public get commandProps():CommandPropsBase
    {
        return this._commandProps;
    }
    public get tlObj():TimeLineObject
    {
        return this._tlObj;
    }
    public set tlObj(newtlObj:TimeLineObject)
    {
        this._tlObj=newtlObj;
    }
    public execute(time:number, speed:number):void
    {
        if(this.commandProps==undefined)
            return; //commandProps must always be defined

        // if this is a activate command, we call the apply function of the CommandProps
        if(this._activate){
            this.tlObj.isActive=true;
            this.commandProps.apply(this.tlObj.asset, time, speed);
        }
        // if this is a remove command, we call the deactivate function of the CommandProps
        else{
            this.tlObj.isActive=false;
            this.commandProps.deactivate(this.tlObj.asset);
        }
    }
}

export = FrameCommand;
