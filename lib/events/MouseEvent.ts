import {Point, Vector3D, EventBase} from "@awayjs/core";

import {IPartitionEntity, ITraversable, View} from "@awayjs/view";

import {IMaterial} from "@awayjs/renderer";
import { DisplayObject } from '../display/DisplayObject';

/**
 * A MouseEvent is dispatched when a mouse event occurs over a mouseEnabled object in View.
 * TODO: we don't have screenZ data, tho this should be easy to implement
 */
export class MouseEvent extends EventBase
{
	// Private.
	public _iAllowedToPropagate:boolean = true;
	public _iParentEvent:MouseEvent;

	/**
	 * Defines the value of the type property of a mouseOver3d event object.
	 */
	public static MOUSE_OVER:string = "mouseOver3d";

	/**
	 * Defines the value of the type property of a mouseOut3d event object.
	 */
	public static MOUSE_OUT:string = "mouseOut3d";

	/**
	 * Defines the value of the type property of a mouseUp3d event object.
	 */
	public static MOUSE_UP:string = "mouseUp3d";
	/**
	 * Defines the value of the type property of a mouseUp3d event object.
	 */
	public static MOUSE_UP_OUTSIDE:string = "mouseUpOutside3d";

	/**
	 * Defines the value of the type property of a mouseDown3d event object.
	 */
	public static MOUSE_DOWN:string = "mouseDown3d";

	/**
	 * Defines the value of the type property of a mouseMove3d event object.
	 */
	public static MOUSE_MOVE:string = "mouseMove3d";

	/**
	 * Defines the value of the type property of a dragMove3d event object.
	 */
	public static DRAG_MOVE:string = "dragMove3d";
	/**
	 * Defines the value of the type property of a dragOut3d event object.
	 */
	public static DRAG_OUT:string = "dragOut3d";
	/**
	 * Defines the value of the type property of a dragOver3d event object.
	 */
	public static DRAG_OVER:string = "dragOver3d";
	/**
	 * Defines the value of the type property of a dragStart3d event object.
	 */
	public static DRAG_START:string = "dragStart3d";
	/**
	 * Defines the value of the type property of a dragStop3d event object.
	 */
	public static DRAG_STOP:string = "dragStop3d";
	/**
	 * Defines the value of the type property of a focusIn3d event object.
	 */
	public static FOCUS_IN:string = "focusIn3d";
	/**
	 * Defines the value of the type property of a focusOut3d event object.
	 */
	public static FOCUS_OUT:string = "focusOut3d";
	/**
	 * Defines the value of the type property of a rollOver3d event object.
	 */
//		public static ROLL_OVER : string = "rollOver3d";

	/**
	 * Defines the value of the type property of a rollOut3d event object.
	 */
//		public static ROLL_OUT : string = "rollOut3d";

	/**
	 * Defines the value of the type property of a click3d event object.
	 */
	public static CLICK:string = "click3d";

	/**
	 * Defines the value of the type property of a doubleClick3d event object.
	 */
	public static DOUBLE_CLICK:string = "doubleClick3d";

	/**
	 * Defines the value of the type property of a mouseWheel3d event object.
	 */
	public static MOUSE_WHEEL:string = "mouseWheel3d";

	/**
	 * The horizontal coordinate at which the event occurred in view coordinates.
	 */
	public screenX:number;

	/**
	 * The vertical coordinate at which the event occurred in view coordinates.
	 */
	public screenY:number;

	/**
	 * The view object inside which the event took place.
	 */
	public view:View;

	/**
	 * The entity inside which the event took place.
	 */
	public entity:DisplayObject;
	
	/**
	 * The entity of the picker inside which the event took place.
	 */
	public pickerEntity:DisplayObject;

	/**
	 * The traversable owner inside which the event took place.
	 */
	public traversable:ITraversable;

	/**
	 * The material of the 3d element inside which the event took place.
	 */
	public material:IMaterial;

	/**
	 * The uv coordinate inside the draw primitive where the event took place.
	 */
	public uv:Point;

	/**
	 * The index of the elements where the event took place.
	 */
	public elementIndex:number;

	/**
	 * The position in object space where the event took place
	 */
	public position:Vector3D;

	/**
	 * The normal in object space where the event took place
	 */
	public normal:Vector3D;

	/**
	 * Indicates whether the Control key is active (true) or inactive (false).
	 */
	public ctrlKey:boolean;

	/**
	 * Indicates whether the Alt key is active (true) or inactive (false).
	 */
	public altKey:boolean;

	/**
	 * Indicates whether the Shift key is active (true) or inactive (false).
	 */
	public shiftKey:boolean;

	/**
	 * Indicates how many lines should be scrolled for each unit the user rotates the mouse wheel.
	 */
	public delta:number;

	/**
	 * Create a new MouseEvent object.
	 * @param type The type of the MouseEvent.
	 */
	constructor(type:string)
	{
		super(type);
	}

	/**
	 * @inheritDoc
	 */
	public get bubbles():boolean
	{
		var doesBubble:boolean = this._iAllowedToPropagate;
		this._iAllowedToPropagate = true;

		// Don't bubble if propagation has been stopped.
		return doesBubble;
	}

	/**
	 * @inheritDoc
	 */
	public stopPropagation():void
	{
		this._iAllowedToPropagate = false;

		if (this._iParentEvent)
			this._iParentEvent.stopPropagation();
	}

	/**
	 * @inheritDoc
	 */
	public stopImmediatePropagation():void
	{
		this._iAllowedToPropagate = false;

		if (this._iParentEvent)
			this._iParentEvent.stopImmediatePropagation();
	}

	/**
	 * Creates a copy of the MouseEvent object and sets the value of each property to match that of the original.
	 */
	public clone():MouseEvent
	{
		var result:MouseEvent = new MouseEvent(this.type);

		/* TODO: Debug / test - look into isDefaultPrevented
		 if (isDefaultPrevented())
		 result.preventDefault();
		 */

		result.screenX = this.screenX;
		result.screenY = this.screenY;

		result.view = this.view;
		result.entity = this.entity;
		result.pickerEntity = this.pickerEntity;
		result.traversable = this.traversable;
		result.material = this.material;
		result.uv = this.uv;
		result.position = this.position;
		result.normal = this.normal;
		result.elementIndex = this.elementIndex;
		result.delta = this.delta;

		result.ctrlKey = this.ctrlKey;
		result.shiftKey = this.shiftKey;

		result._iParentEvent = this;
		result._iAllowedToPropagate = this._iAllowedToPropagate;

		return result;
	}

	/**
	 * The position in scene space where the event took place
	 */
	public get scenePosition():Vector3D
	{
		return this.entity.transform.concatenatedMatrix3D.transformVector(this.position);
	}

	/**
	 * The normal in scene space where the event took place
	 */
	public get sceneNormal():Vector3D
	{
		var sceneNormal:Vector3D = this.entity.transform.concatenatedMatrix3D.deltaTransformVector(this.normal);
		sceneNormal.normalize();

		return sceneNormal;
	}
}