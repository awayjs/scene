import {IDisplayObjectAdapter} from "../adapters/IDisplayObjectAdapter";
import {DisplayObject} from "../display/DisplayObject";

export interface ITextfieldAdapter extends IDisplayObjectAdapter
{
	dispatchKeyEvent(charCode:number, isShift?:boolean, isCTRL?:boolean, isAlt?:boolean);

}