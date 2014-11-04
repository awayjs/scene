/**
 * TimeLineObject represents a unique object that is (or will be) used by a TimeLine.
 *  A TimeLineObject basically consists of an objID, and an IAsset.
 *  The FrameCommands hold references to these TimeLineObjects, so they can access and modify the IAssets

 */
class InterpolationObject
{
    private _type;//0:number , 1: matrix3D, 2: matrix2D, 3:ColorTransform,
    private _startValue;
    private _startTime:number;
    private _endValue;
    private _endTime:number;
    private _duration:number;

    constructor(type:number, startValue, endValue, startTime:number,endTime:number)
    {
        this._type=type;
        this._startValue=startValue;
        this._startTime=startTime;
        this._endValue=endValue;
        this._duration=endTime-startTime;
    }

    public getState(time:number, speed:number) {
        // todo: handle reverse playback
        if (time < this._startTime * speed) {
            return;
        }
        if (time > this._endTime * speed) {
            return;
        }
        if (this._type == 0) {
            //interpolate number
            return (this._startValue + (((time - this._startTime) * (this._duration * speed)) * (this._endValue - this._startValue)));
        }
        if (this._type == 1){
            //todo: interpolate matrix3D
        }
        if (this._type == 2) {
            //todo: interpolate Matrix3D, but handle it as 2D object (do not touch z.position)
        }
        if (this._type == 3) {
            //todo: interpolate ColorTransform
        }
        return;
    }
}

export = InterpolationObject;
