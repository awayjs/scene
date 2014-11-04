import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
import ColorTransform = require("awayjs-core/lib/geom/ColorTransform");

import DisplayObjectContainer		= require("awayjs-display/lib/containers/DisplayObjectContainer");
import CommandPropsBase = require("awayjs-display/lib/entities/timelinedata/CommandPropsBase");
import InterpolationObject = require("awayjs-display/lib/entities/timelinedata/InterpolationObject");

class CommandPropsDisplayObject extends CommandPropsBase
{
    private _doDisplaymatrix:number;//0:doNothing, 1:absolute,2:interpolate
    // if _doDisplaymatrix is 1:absolute, we need access to the Matrix3D
    // if _doDisplaymatrix is 2:interpolate, we need access to a "interpolation"-Object know the matrix to set
    private _displayMatrix:Matrix3D;//for 2D objects we also use 3d-matrix for now...we have no 2d objects :)
    private _displayMatrixInterpolate:InterpolationObject;

    private _doColorTransform:number;//0:doNothing, 1:absolute,2:interpolate
    // if _doColorTransform is 1:absolute, we need access to the ColorTransform
    // if _doColorTransform is 2:interpolate, we need access to a "interpolation"-Object know the matrix to set
    private _colorTransform:ColorTransform;
    private _colorTransformInterpolate:InterpolationObject;

    private _doDepth:boolean;
    private _depth:number;// todo: how to handle depth best

    private _doFilters:boolean;
    private _filter:number;//todo: how to handle filter

    private _doBlendMode:boolean;
    private _blendMode:number;

    private _doDepthClip:boolean;
    private _depthClip:number;

    private _doInstanceName:boolean;
    private _instanceName:string;
    constructor()
    {
        super();
        this._doDisplaymatrix=0;
        this._doColorTransform=0;

        this._doInstanceName=false;
        this._doDepth=false;
        this._doFilters=false;
        this._doDepthClip=false;
        this._doBlendMode=false;
    }
    public setBlendMode( blendMode:number) {
        this._blendMode = blendMode;
        this._doBlendMode = true;
    }
    public setClipDepth( clipDepth:number) {
        this._depthClip = clipDepth;
        this._doDepthClip = true;
    }
    //todo:handle filters
    public setFilter( filter) {
        this._filter = filter;
        this._doFilters = true;
    }
    public setDepth( depth:number) {
        this._depth = depth;
        this._doDepth = true;
    }
    public setDisplaymatrixInterpolate( interpolate:InterpolationObject) {
        this._displayMatrixInterpolate = interpolate;
        this._doDisplaymatrix = 2;
    }
    public setDisplaymatrix(displayMatrix:Matrix3D) {
        this._displayMatrix = displayMatrix;
        this._doDisplaymatrix = 1;
    }
    public setColorTransform(colorTransform:ColorTransform) {
        this._colorTransform = colorTransform;
        this._doColorTransform = 1;
    }
    public setColorTranformInterpolate( interpolate:InterpolationObject) {
        this._colorTransformInterpolate = interpolate;
        this._doColorTransform = 2;
    }
    public setInstancename(instanceName:string){
        this._instanceName=instanceName;
        this._doInstanceName=true;
    }
    public deactivate(thisObj:DisplayObjectContainer):void
    {
        thisObj.visible=false;
    }

    public apply(thisObj:DisplayObjectContainer, time:number, speed:number):void
    {
        thisObj.visible=true;

        if(this._doDisplaymatrix==1){
            thisObj.transform.matrix3D=this._displayMatrix;
        }
        else if(this._doDisplaymatrix==2){
            // TODO
            //thisObj.transform.matrix3D=this._displayMatrixInterpolate.getState(time, speed);
        }
        //todo: check how to apply colortransform (i guess this will be materials of meshes)
        //maybe we must give displayobjectcontainer the functions to pass ColorTransform to children
        if(this._doColorTransform==1){
            //thisObj.=this._colorTransform;
        }
        else if(this._doColorTransform==2){
            //thisObj.transform.matrix3D=this._colorTransformInterpolate.getState(time, speed);
        }
        if(this._doInstanceName){
            thisObj.name=this._instanceName;
        }
        if(this._doDepth){
            // todo: handle depth setting
        }
        if(this._doBlendMode){
            // todo: handle blendMode setting
        }
        if(this._doDepthClip){
            // todo: handle depthClip setting
        }
        if(this._doFilters){
            // todo: handle filter setting
        }
    }
}

export = CommandPropsDisplayObject;
