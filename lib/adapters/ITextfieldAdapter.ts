import { IDisplayObjectAdapter } from '../adapters/IDisplayObjectAdapter';

export interface ITextfieldAdapter extends IDisplayObjectAdapter
{
	dispatchKeyEvent(charCode: number, isShift?: boolean, isCTRL?: boolean, isAlt?: boolean);

}