import IAsset					    = require("awayjs-core/lib/library/IAsset");

import CommandPropsBase = require("awayjs-display/lib/entities/timelinedata/CommandPropsBase");

/**
 * TimeLineObject represents a unique object that is (or will be) used by a TimeLine.
 *  A TimeLineObject basically consists of an objID, and an IAsset.
 *  The FrameCommands hold references to these TimeLineObjects, so they can access and modify the IAssets

 */
class TimeLineObject
{
    // the IAsset of this TimeLineObject. This should already be a unique Object-Instance.
    private _asset:IAsset;

    // the object-id of this TimeLineObject/IAsset. This is not really used anymore (?).
    private _objID:number;

    // This timeLineProps offers function to deActivate the current TimeLineObject.
    // what happens in the deactivate function is up to the CommandProps (which can be of different type)
    private _deactivateCommandProps:CommandPropsBase;

    // keep track if this TimeLineObject is currently active or not.
    // for IAsset that extends DisplayObject, active means they are visible.
    // for other IAssets it can have different meaning (sound playing...)
    private _isActive:boolean;

    // if the object is a DisplayObject that should be considered a 2D object,
    // we will update the z-position to represent object-depth todo
    private _is2D:boolean;

    constructor(asset:IAsset, objID:number, deactiveCommandProps:CommandPropsBase)
    {
        this._asset=asset;
        this._objID=objID;
        this._is2D=true;
        this._isActive=false;
        this._deactivateCommandProps=deactiveCommandProps;
        this._deactivateCommandProps.deactivate(this._asset);
    }
    public set deactivateCommandProps(newCommandprops:CommandPropsBase)
    {
        this._deactivateCommandProps=newCommandprops;
    }
    public deactivate()
    {
        //if(this._deactivateCommandProps==undefined)
        //    return;
        this._deactivateCommandProps.deactivate(this._asset);
        this._isActive=false;
    }

    public get asset():IAsset
    {
        return this._asset;
    }
    public set asset(newAsset:IAsset)
    {
        this._asset=newAsset;
    }
    public get objID():number
    {
        return this._objID;
    }
    public set objID(newobjID:number)
    {
        this._objID=newobjID;
    }
    public get is2D():boolean
    {
        return this._is2D;
    }
    public set is2D(newis2D:boolean)
    {
        this._is2D=newis2D;
    }
    public get isActive():boolean
    {
        return this._isActive;
    }
    public set isActive(newisActive:boolean)
    {
        this._isActive=newisActive;
    }
}

export = TimeLineObject;
