import {EventBase} from "@awayjs/core";

import {IPartitionEntity, View, ITraversable} from "@awayjs/view";
/**
 * A FocusEvent is dispatched when a entity is focused
 */
export class FocusEvent extends EventBase
{

	/**
	 * Defines the value of the type property of a focusIn3d event object.
	 */
	public static FOCUS_IN:string = "focusIn3d";
	/**
	 * Defines the value of the type property of a focusOut3d event object.
	 */
	public static FOCUS_OUT:string = "focusOut3d";

	/**
	 * The view object inside which the event took place.
	 */
	public view:View;

	/**
	 * The entity inside which the event took place.
	 */
    public entity:IPartitionEntity;
    
	/**
	 * True if the focus was set by mouse-interaction
	 */
	public invokedByMouse:IPartitionEntity;

	/**
	 * The traversable owner inside which the event took place.
	 */
	public traversable:ITraversable;


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
	public clone():FocusEvent
	{
		var result:FocusEvent = new FocusEvent(this.type);

		/* TODO: Debug / test - look into isDefaultPrevented
		 if (isDefaultPrevented())
		 result.preventDefault();
		 */


		result.view = this.view;
		result.entity = this.entity;


		return result;
	}

}