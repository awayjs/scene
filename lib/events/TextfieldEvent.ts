import {EventBase} from "@awayjs/core";

/**
 * A FocusEvent is dispatched when a entity is focused
 */
export class TextfieldEvent extends EventBase
{

	/**
	 * Defines the value of the type property of a focusIn3d event object.
	 */
	public static CHANGED:string = "onChanged";


	/**
	 * Create a new MouseEvent object.
	 * @param type The type of the MouseEvent.
	 */
	constructor(type:string)
	{
		super(type);
	}



	/**
	 * Creates a copy of the MouseEvent object and sets the value of each property to match that of the original.
	 */
	public clone():TextfieldEvent
	{
		var result:TextfieldEvent = new TextfieldEvent(this.type);
		return result;
	}

}