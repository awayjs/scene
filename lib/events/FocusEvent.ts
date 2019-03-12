import {Point, Vector3D, EventBase} from "@awayjs/core";

import {IEntity, IRenderable, IMaterial, IView} from "@awayjs/renderer";
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
	public view:IView;

	/**
	 * The entity inside which the event took place.
	 */
    public entity:IEntity;
    
	/**
	 * True if the focus was set by mouse-interaction
	 */
	public invokedByMouse:IEntity;

	/**
	 * The renderable owner inside which the event took place.
	 */
	public renderable:IRenderable;


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