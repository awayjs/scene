import {EventBase} from "@awayjs/core";

import {Camera} from "../display/Camera";

/**
 * @class away.events.CameraEvent
 */
export class KeyboardEvent extends EventBase
{
	public static KEYDOWN:string = "keydown";
	public static KEYUP:string = "keyup";

	private _charCode:number;
	private _char:string;
	public isShift:boolean;
	public isCTRL:boolean;
	public isAlt:boolean;

	
	constructor(type:string, char:string, charCode:number=0)
	{
		super(type);

		this._char = char;
		this._charCode = charCode;
		this.isShift = false;
		this.isCTRL = false;
		this.isAlt = false;
	}

	public get char():string
	{
		return this._char;
	}
	public get charCode():number
	{
		return this._charCode;
	}

	/**
	 * Clones the event.
	 * @return An exact duplicate of the current object.
	 */
	public clone():KeyboardEvent
	{
		return new KeyboardEvent(this.type, this._char, this._charCode);
	}
}