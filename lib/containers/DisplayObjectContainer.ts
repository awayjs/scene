import Box							= require("awayjs-core/lib/geom/Box");
import Point						= require("awayjs-core/lib/geom/Point");
import IAsset						= require("awayjs-core/lib/library/IAsset");
import ArgumentError				= require("awayjs-core/lib/errors/ArgumentError");
import Error						= require("awayjs-core/lib/errors/Error");
import RangeError					= require("awayjs-core/lib/errors/RangeError");

import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");
import ContainerNode				= require("awayjs-display/lib/partition/ContainerNode");
import Scene						= require("awayjs-display/lib/containers/Scene");

/**
 * The DisplayObjectContainer class is the base class for all objects that can
 * serve as display object containers on the display list. The display list
 * manages all objects displayed in the Flash runtimes. Use the
 * DisplayObjectContainer class to arrange the display objects in the display
 * list. Each DisplayObjectContainer object has its own child list for
 * organizing the z-order of the objects. The z-order is the front-to-back
 * order that determines which object is drawn in front, which is behind, and
 * so on.
 *
 * <p>DisplayObject is an abstract base class; therefore, you cannot call
 * DisplayObject directly. Invoking <code>new DisplayObject()</code> throws an
 * <code>ArgumentError</code> exception.</p>
 * The DisplayObjectContainer class is an abstract base class for all objects
 * that can contain child objects. It cannot be instantiated directly; calling
 * the <code>new DisplayObjectContainer()</code> constructor throws an
 * <code>ArgumentError</code> exception.
 *
 * <p>For more information, see the "Display Programming" chapter of the
 * <i>ActionScript 3.0 Developer's Guide</i>.</p>
 */
class DisplayObjectContainer extends DisplayObject implements IAsset
{
	public static assetType:string = "[asset DisplayObjectContainer]";

	private _containerNodes:Array<ContainerNode> = new Array<ContainerNode>();
	private _mouseChildren:boolean = true;
	private _depths:Array<number> = new Array<number>();
	private _nextHighestDepth:number = 0;
	private _nextHighestDepthDirty:boolean;
	public _children:Array<DisplayObject> = new Array<DisplayObject>();
	public _iIsRoot:boolean;

	/**
	 *
	 */
	public get assetType():string
	{
		return DisplayObjectContainer.assetType;
	}

	/**
	 * Determines whether or not the children of the object are mouse, or user
	 * input device, enabled. If an object is enabled, a user can interact with
	 * it by using a mouse or user input device. The default is
	 * <code>true</code>.
	 *
	 * <p>This property is useful when you create a button with an instance of
	 * the Sprite class(instead of using the SimpleButton class). When you use a
	 * Sprite instance to create a button, you can choose to decorate the button
	 * by using the <code>addChild()</code> method to add additional Sprite
	 * instances. This process can cause unexpected behavior with mouse events
	 * because the Sprite instances you add as children can become the target
	 * object of a mouse event when you expect the parent instance to be the
	 * target object. To ensure that the parent instance serves as the target
	 * objects for mouse events, you can set the <code>mouseChildren</code>
	 * property of the parent instance to <code>false</code>.</p>
	 *
	 * <p> No event is dispatched by setting this property. You must use the
	 * <code>addEventListener()</code> method to create interactive
	 * functionality.</p>
	 */
	public get mouseChildren():boolean
	{
		return this._mouseChildren;
	}

	public set mouseChildren(value:boolean)
	{
		if (this._mouseChildren == value)
			return;

		this._mouseChildren = value;

		this._pUpdateImplicitMouseEnabled(this._pParent? this._pParent._pImplicitMouseEnabled : true);
	}

	/**
	 * Returns the number of children of this object.
	 */
	public get numChildren():number /*int*/
	{
		return this._children.length;
	}

	/**
	 * Determines whether the children of the object are tab enabled. Enables or
	 * disables tabbing for the children of the object. The default is
	 * <code>true</code>.
	 *
	 * <p><b>Note:</b> Do not use the <code>tabChildren</code> property with
	 * Flex. Instead, use the
	 * <code>mx.core.UIComponent.hasFocusableChildren</code> property.</p>
	 *
	 * @throws IllegalOperationError Calling this property of the Stage object
	 *                               throws an exception. The Stage object does
	 *                               not implement this property.
	 */
	public tabChildren:boolean;

	/**
	 * Calling the <code>new DisplayObjectContainer()</code> constructor throws
	 * an <code>ArgumentError</code> exception. You <i>can</i>, however, call
	 * constructors for the following subclasses of DisplayObjectContainer:
	 * <ul>
	 *   <li><code>new Loader()</code></li>
	 *   <li><code>new Sprite()</code></li>
	 *   <li><code>new MovieClip()</code></li>
	 * </ul>
	 */
	constructor()
	{
		super();

		this._pIsContainer = true;
	}

	/**
	 * Adds a child DisplayObject instance to this DisplayObjectContainer
	 * instance. The child is added to the front(top) of all other children in
	 * this DisplayObjectContainer instance.(To add a child to a specific index
	 * position, use the <code>addChildAt()</code> method.)
	 *
	 * <p>If you add a child object that already has a different display object
	 * container as a parent, the object is removed from the child list of the
	 * other display object container. </p>
	 *
	 * <p><b>Note:</b> The command <code>stage.addChild()</code> can cause
	 * problems with a published SWF file, including security problems and
	 * conflicts with other loaded SWF files. There is only one Stage within a
	 * Flash runtime instance, no matter how many SWF files you load into the
	 * runtime. So, generally, objects should not be added to the Stage,
	 * directly, at all. The only object the Stage should contain is the root
	 * object. Create a DisplayObjectContainer to contain all of the items on the
	 * display list. Then, if necessary, add that DisplayObjectContainer instance
	 * to the Stage.</p>
	 *
	 * @param child The DisplayObject instance to add as a child of this
	 *              DisplayObjectContainer instance.
	 * @return The DisplayObject instance that you pass in the <code>child</code>
	 *         parameter.
	 * @throws ArgumentError Throws if the child is the same as the parent. Also
	 *                       throws if the caller is a child(or grandchild etc.)
	 *                       of the child being added.
	 * @event added Dispatched when a display object is added to the display
	 *              list.
	 */
	public addChild(child:DisplayObject):DisplayObject
	{
		return this.addChildAt(child, this._children.length);
	}

	public addChildAtDepth(child:DisplayObject, depth:number, replace:boolean = true):DisplayObject
	{
		if (child == null)
			throw new Error("Parameter child cannot be null.");
		
		//if child already has a parent, remove it.
		if (child._pParent)
			child._pParent.removeChildAtInternal(child._pParent.getChildIndex(child));

		var index = this.getDepthIndexInternal(depth);

		if (index != -1) {
			if (replace) {
				this.removeChildAt(index);
			} else {
				//move depth of existing child up by 1
				this.addChildAtDepth(this._children[index], this._depths[index] + 1, false);
			}
		}

		if (this._nextHighestDepth < depth + 1)
			this._nextHighestDepth = depth + 1;

		this._children.push(child);
		this._depths.push(depth);

		child.iSetParent(this);

		this._pInvalidateBounds();

		return child;
	}
	
	/**
	 * Adds a child DisplayObject instance to this DisplayObjectContainer
	 * instance. The child is added at the index position specified. An index of
	 * 0 represents the back(bottom) of the display list for this
	 * DisplayObjectContainer object.
	 *
	 * <p>For example, the following example shows three display objects, labeled
	 * a, b, and c, at index positions 0, 2, and 1, respectively:</p>
	 *
	 * <p>If you add a child object that already has a different display object
	 * container as a parent, the object is removed from the child list of the
	 * other display object container. </p>
	 *
	 * @param child The DisplayObject instance to add as a child of this
	 *              DisplayObjectContainer instance.
	 * @param index The index position to which the child is added. If you
	 *              specify a currently occupied index position, the child object
	 *              that exists at that position and all higher positions are
	 *              moved up one position in the child list.
	 * @return The DisplayObject instance that you pass in the <code>child</code>
	 *         parameter.
	 * @throws ArgumentError Throws if the child is the same as the parent. Also
	 *                       throws if the caller is a child(or grandchild etc.)
	 *                       of the child being added.
	 * @throws RangeError    Throws if the index position does not exist in the
	 *                       child list.
	 * @event added Dispatched when a display object is added to the display
	 *              list.
	 */
	public addChildAt(child:DisplayObject, index:number):DisplayObject
	{
		return this.addChildAtDepth(child, (index < this._depths.length)? this._depths[index] : this.getNextHighestDepth(), false);
	}

	public addChildren(...childarray:Array<DisplayObject>)
	{
		var len:number = childarray.length;
		for (var i:number = 0; i <  len; i++)
			this.addChild(childarray[i]);
	}

	/**
	 *
	 */
	public clone(newInstance:DisplayObjectContainer = null):DisplayObject
	{
		newInstance = <DisplayObjectContainer> super.clone(newInstance || new DisplayObjectContainer());

		newInstance.partition = this.partition;
		newInstance.mouseEnabled = this.mouseEnabled;
		newInstance.mouseChildren = this.mouseChildren;

		var len:number = this._children.length;
		for (var i:number = 0; i < len; ++i)
			newInstance.addChild(this._children[i].clone());

		return newInstance;
	}

	/**
	 * Determines whether the specified display object is a child of the
	 * DisplayObjectContainer instance or the instance itself. The search
	 * includes the entire display list including this DisplayObjectContainer
	 * instance. Grandchildren, great-grandchildren, and so on each return
	 * <code>true</code>.
	 *
	 * @param child The child object to test.
	 * @return <code>true</code> if the <code>child</code> object is a child of
	 *         the DisplayObjectContainer or the container itself; otherwise
	 *         <code>false</code>.
	 */
	public contains(child:DisplayObject):boolean
	{
		return this._children.indexOf(child) >= 0;
	}

	/**
	 *
	 */
	public disposeWithChildren()
	{
		this.dispose();

		while (this.numChildren > 0)
			this.getChildAt(0).dispose();
	}
	
	public getChildAtDepth(depth:number /*int*/):DisplayObject
	{
		return this.getChildAt(this.getDepthIndexInternal(depth));
	}
	
	/**
	 * Returns the child display object instance that exists at the specified
	 * index.
	 *
	 * @param index The index position of the child object.
	 * @return The child display object at the specified index position.
	 * @throws RangeError    Throws if the index does not exist in the child
	 *                       list.
	 */
	public getChildAt(index:number /*int*/):DisplayObject
	{
		var child:DisplayObject = this._children[index];

		if (child == null)
			throw new RangeError("Index does not exist in the child list of the caller");

		return child;
	}

	/**
	 * Returns the child display object that exists with the specified name. If
	 * more that one child display object has the specified name, the method
	 * returns the first object in the child list.
	 *
	 * <p>The <code>getChildAt()</code> method is faster than the
	 * <code>getChildByName()</code> method. The <code>getChildAt()</code> method
	 * accesses a child from a cached array, whereas the
	 * <code>getChildByName()</code> method has to traverse a linked list to
	 * access a child.</p>
	 *
	 * @param name The name of the child to return.
	 * @return The child display object with the specified name.
	 */
	public getChildByName(name:string):DisplayObject
	{
		var len:number = this._children.length;
		for (var i:number = 0; i < len; ++i)
			if (this._children[i].name == name)
				return this._children[i];

		return null;
	}

	/**
	 * Returns the index position of a <code>child</code> DisplayObject instance.
	 *
	 * @param child The DisplayObject instance to identify.
	 * @return The index position of the child display object to identify.
	 * @throws ArgumentError Throws if the child parameter is not a child of this
	 *                       object.
	 */
	public getChildIndex(child:DisplayObject):number /*int*/
	{
		var childIndex:number = this._children.indexOf(child);

		if (childIndex == -1)
			throw new ArgumentError("Child parameter is not a child of the caller");

		return childIndex;
	}

	public getChildDepth(child:DisplayObject):number /*int*/
	{
		return this._depths[this.getChildIndex(child)];
	}

	public getNextHighestDepth()
	{
		if (this._nextHighestDepthDirty)
			this._updateNextHighestDepth();

		return this._nextHighestDepth;
	}

	/**
	 * Returns an array of objects that lie under the specified point and are
	 * children(or grandchildren, and so on) of this DisplayObjectContainer
	 * instance. Any child objects that are inaccessible for security reasons are
	 * omitted from the returned array. To determine whether this security
	 * restriction affects the returned array, call the
	 * <code>areInaccessibleObjectsUnderPoint()</code> method.
	 *
	 * <p>The <code>point</code> parameter is in the coordinate space of the
	 * Stage, which may differ from the coordinate space of the display object
	 * container(unless the display object container is the Stage). You can use
	 * the <code>globalToLocal()</code> and the <code>localToGlobal()</code>
	 * methods to convert points between these coordinate spaces.</p>
	 *
	 * @param point The point under which to look.
	 * @return An array of objects that lie under the specified point and are
	 *         children(or grandchildren, and so on) of this
	 *         DisplayObjectContainer instance.
	 */
	public getObjectsUnderPoint(point:Point):Array<DisplayObject>
	{
		return new Array<DisplayObject>();
	}

	/**
	 * Removes the specified <code>child</code> DisplayObject instance from the
	 * child list of the DisplayObjectContainer instance. The <code>parent</code>
	 * property of the removed child is set to <code>null</code> , and the object
	 * is garbage collected if no other references to the child exist. The index
	 * positions of any display objects above the child in the
	 * DisplayObjectContainer are decreased by 1.
	 *
	 * <p>The garbage collector reallocates unused memory space. When a variable
	 * or object is no longer actively referenced or stored somewhere, the
	 * garbage collector sweeps through and wipes out the memory space it used to
	 * occupy if no other references to it exist.</p>
	 *
	 * @param child The DisplayObject instance to remove.
	 * @return The DisplayObject instance that you pass in the <code>child</code>
	 *         parameter.
	 * @throws ArgumentError Throws if the child parameter is not a child of this
	 *                       object.
	 */
	public removeChild(child:DisplayObject):DisplayObject
	{
		if (child == null)
			throw new Error("Parameter child cannot be null");

		this.removeChildAt(this.getChildIndex(child));

		return child;
	}

	public removeChildAtDepth(depth:number /*int*/):DisplayObject
	{
		return this.removeChildAt(this.getDepthIndexInternal(depth));
	}	

	/**
	 * Removes a child DisplayObject from the specified <code>index</code>
	 * position in the child list of the DisplayObjectContainer. The
	 * <code>parent</code> property of the removed child is set to
	 * <code>null</code>, and the object is garbage collected if no other
	 * references to the child exist. The index positions of any display objects
	 * above the child in the DisplayObjectContainer are decreased by 1.
	 *
	 * <p>The garbage collector reallocates unused memory space. When a variable
	 * or object is no longer actively referenced or stored somewhere, the
	 * garbage collector sweeps through and wipes out the memory space it used to
	 * occupy if no other references to it exist.</p>
	 *
	 * @param index The child index of the DisplayObject to remove.
	 * @return The DisplayObject instance that was removed.
	 * @throws RangeError    Throws if the index does not exist in the child
	 *                       list.
	 * @throws SecurityError This child display object belongs to a sandbox to
	 *                       which the calling object does not have access. You
	 *                       can avoid this situation by having the child movie
	 *                       call the <code>Security.allowDomain()</code> method.
	 */
	public removeChildAt(index:number /*int*/):DisplayObject
	{
		var child:DisplayObject = this.removeChildAtInternal(index);

		child.iSetParent(null);

		this._pInvalidateBounds();
		
		return child;
	}

	/**
	 * Removes all <code>child</code> DisplayObject instances from the child list
	 * of the DisplayObjectContainer instance. The <code>parent</code> property
	 * of the removed children is set to <code>null</code>, and the objects are
	 * garbage collected if no other references to the children exist.
	 *
	 * The garbage collector reallocates unused memory space. When a variable or
	 * object is no longer actively referenced or stored somewhere, the garbage
	 * collector sweeps through and wipes out the memory space it used to occupy
	 * if no other references to it exist.
	 *
	 * @param beginIndex The beginning position. A value smaller than 0 throws a RangeError.
	 * @param endIndex The ending position. A value smaller than 0 throws a RangeError.
	 * @throws RangeError    Throws if the beginIndex or endIndex positions do
	 *                       not exist in the child list.
	 */
	public removeChildren(beginIndex:number /*int*/ = 0, endIndex:number /*int*/ = 2147483647)
	{
		if (beginIndex < 0)
			throw new RangeError("beginIndex is out of range of the child list");

		if (endIndex > this._children.length)
			throw new RangeError("endIndex is out of range of the child list");

		for(var i:number /*uint*/ = beginIndex; i < endIndex; i++)
			this.removeChild(this._children[i]);
	}

	/**
	 * Changes the position of an existing child in the display object container.
	 * This affects the layering of child objects. For example, the following
	 * example shows three display objects, labeled a, b, and c, at index
	 * positions 0, 1, and 2, respectively:
	 *
	 * <p>When you use the <code>setChildIndex()</code> method and specify an
	 * index position that is already occupied, the only positions that change
	 * are those in between the display object's former and new position. All
	 * others will stay the same. If a child is moved to an index LOWER than its
	 * current index, all children in between will INCREASE by 1 for their index
	 * reference. If a child is moved to an index HIGHER than its current index,
	 * all children in between will DECREASE by 1 for their index reference. For
	 * example, if the display object container in the previous example is named
	 * <code>container</code>, you can swap the position of the display objects
	 * labeled a and b by calling the following code:</p>
	 *
	 * <p>This code results in the following arrangement of objects:</p>
	 *
	 * @param child The child DisplayObject instance for which you want to change
	 *              the index number.
	 * @param index The resulting index number for the <code>child</code> display
	 *              object.
	 * @throws ArgumentError Throws if the child parameter is not a child of this
	 *                       object.
	 * @throws RangeError    Throws if the index does not exist in the child
	 *                       list.
	 */
	public setChildIndex(child:DisplayObject, index:number /*int*/)
	{
		//TODO
	}

	/**
	 * Swaps the z-order (front-to-back order) of the two specified child
	 * objects. All other child objects in the display object container remain in
	 * the same index positions.
	 *
	 * @param child1 The first child object.
	 * @param child2 The second child object.
	 * @throws ArgumentError Throws if either child parameter is not a child of
	 *                       this object.
	 */
	public swapChildren(child1:DisplayObject, child2:DisplayObject)
	{
		this.swapChildrenAt(this.getChildIndex(child1), this.getChildIndex(child2))
	}

	/**
	 * Swaps the z-order(front-to-back order) of the child objects at the two
	 * specified index positions in the child list. All other child objects in
	 * the display object container remain in the same index positions.
	 *
	 * @param index1 The index position of the first child object.
	 * @param index2 The index position of the second child object.
	 * @throws RangeError If either index does not exist in the child list.
	 */
	public swapChildrenAt(index1:number, index2:number)
	{
		var depth:number = this._depths[index2];
		var child:DisplayObject = this._children[index1];

		this.addChildAtDepth(this._children[index2], this._depths[index1]);
		this.addChildAtDepth(child, depth);
	}


	/**
	 * //TODO
	 *
	 * @protected
	 */
	public _pUpdateBoxBounds()
	{
		super._pUpdateBoxBounds();

		var min:number;
		var max:number;
		var minX:number, minY:number, minZ:number;
		var maxX:number, maxY:number, maxZ:number;

		var box:Box;
		var numChildren:number = this._children.length;

		if (numChildren > 0) {
			for (var i:number = 0; i < numChildren; ++i) {
				box = this._children[i].getBox(this);

				if (i == 0) {
					maxX = box.width + (minX = box.x);
					maxY = box.height + (minY = box.y);
					maxZ = box.depth + (minZ = box.z);
				} else {
					max = box.width + (min = box.x);
					if (min < minX)
						minX = min;
					if (max > maxX)
						maxX = max;

					max = box.height + (min = box.y);
					if (min < minY)
						minY = min;
					if (max > maxY)
						maxY = max;

					max = box.depth + (min = box.z);
					if (min < minZ)
						minZ = min;
					if (max > maxZ)
						maxZ = max;
				}
			}

			this._pBoxBounds.width = maxX - (this._pBoxBounds.x = minX);
			this._pBoxBounds.height = maxY - (this._pBoxBounds.y = minY);
			this._pBoxBounds.depth = maxZ - (this._pBoxBounds.z = minZ);
		} else {
			this._pBoxBounds.setEmpty();
		}
	}


	/**
	 * @protected
	 */
	public pInvalidateSceneTransform()
	{
		super.pInvalidateSceneTransform();

		var len:number = this._children.length;
		for (var i:number = 0; i < len; ++i)
			this._children[i].pInvalidateSceneTransform();
	}

	/**
	 * @protected
	 */
	public _pUpdateImplicitMouseEnabled(value:boolean)
	{
		super._pUpdateImplicitMouseEnabled(value);

		var len:number = this._children.length;
		for (var i:number = 0; i < len; ++i)
			this._children[i]._pUpdateImplicitMouseEnabled(this._mouseChildren && this._pImplicitMouseEnabled);
	}

	/**
	 * @protected
	 */
	public _pUpdateImplicitVisibility(value:boolean)
	{
		super._pUpdateImplicitVisibility(value);

		var len:number = this._children.length;
		for (var i:number = 0; i < len; ++i)
			this._children[i]._pUpdateImplicitVisibility(this._pImplicitVisibility);
	}


	/**
	 * @protected
	 */
	public _pUpdateImplicitMaskId(value:number)
	{
		super._pUpdateImplicitMaskId(value);

		var len:number = this._children.length;
		for (var i:number = 0; i < len; ++i)
			this._children[i]._pUpdateImplicitMaskId(this._pImplicitMaskId);
	}
	/**
	 * @protected
	 */
	public _pUpdateImplicitMasks(value:Array<Array<DisplayObject>>)
	{
		super._pUpdateImplicitMasks(value);

		var len:number = this._children.length;
		for (var i:number = 0; i < len; ++i)
			this._children[i]._pUpdateImplicitMasks(this._pImplicitMasks);
	}

	/**
	 * @protected
	 */
	public _pUpdateImplicitPartition(value:PartitionBase, scene:Scene)
	{
		super._pUpdateImplicitPartition(value, scene);

		var len:number = this._children.length;
		for (var i:number = 0; i < len; ++i)
			this._children[i]._pUpdateImplicitPartition(this._pImplicitPartition, scene);
	}

	/**
	 * @private
	 *
	 * @param child
	 */
	private removeChildAtInternal(index:number):DisplayObject
	{
		var child:DisplayObject = this._children.splice(index, 1)[0];
		var depth:number = this._depths.splice(index, 1)[0];

		//update next highest depth
		if (this._nextHighestDepth == depth + 1)
			this._nextHighestDepthDirty = true;

		return child;
	}
	
	private getDepthIndexInternal(depth:number /*int*/):number
	{
		return this._depths.indexOf(depth);
	}

	private _updateNextHighestDepth()
	{
		this._nextHighestDepthDirty = false;

		this._nextHighestDepth = 0;
		var len:number = this._depths.length;
		for (var i:number = 0; i < len; i++)
			if (this._nextHighestDepth < this._depths[i])
				this._nextHighestDepth = this._depths[i];

		this._nextHighestDepth += 1;
	}
	
	/**
	 * Evaluates the display object to see if it overlaps or intersects with the
	 * point specified by the <code>x</code> and <code>y</code> parameters. The
	 * <code>x</code> and <code>y</code> parameters specify a point in the
	 * coordinate space of the Scene, not the display object container that
	 * contains the display object(unless that display object container is the
	 * Scene).
	 *
	 * @param x         The <i>x</i> coordinate to test against this object.
	 * @param y         The <i>y</i> coordinate to test against this object.
	 * @param shapeFlag Whether to check against the actual pixels of the object
	 *                 (<code>true</code>) or the bounding box
	 *                 (<code>false</code>).
	 * @return <code>true</code> if the display object overlaps or intersects
	 *         with the specified point; <code>false</code> otherwise.
	 */
	public hitTestPoint(x:number, y:number, shapeFlag:boolean = false, masksFlag:boolean = false):boolean
	{
		if(this._pImplicitMaskId !== -1 && !masksFlag)
			return;

		if(!this._pImplicitVisibility)
			return;

		var masks:Array<DisplayObject> = this.masks;

		if (masks) {
			var numMasks:number = masks.length;
			var maskHit:boolean = false;
			for (var i:number = 0; i < numMasks; i++) {
				if (masks[i].hitTestPoint(x, y, shapeFlag, true)) {
					maskHit = true;
					break;
				}
			}

			if (!maskHit)
				return false;
		}

		return this._hitTestPointInternal(x, y, shapeFlag, masksFlag)
	}

	public _iAddContainerNode(entityNode:ContainerNode):ContainerNode
	{
		this._containerNodes.push(entityNode);

		return entityNode;
	}


	public _iRemoveContainerNode(entityNode:ContainerNode):ContainerNode
	{
		var index:number = this._containerNodes.indexOf(entityNode);

		this._containerNodes.splice(index, 1);

		return entityNode;
	}

	public _hitTestPointInternal(x:number, y:number, shapeFlag:boolean, masksFlag:boolean):boolean
	{
		var numChildren:number = this.numChildren;
		for(var i:number = 0; i < numChildren; i++)
			if(this._children[i].hitTestPoint(x,y, shapeFlag, masksFlag))
				return true;

		return false;
	}
}

export = DisplayObjectContainer;