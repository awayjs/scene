import { Point, ArgumentError, RangeError } from '@awayjs/core';
import { IAnimator, IRenderContainer } from '@awayjs/renderer';
import { PartitionBase, EntityNode, ContainerEvent, ContainerNode } from '@awayjs/view';
import { DisplayObject } from './DisplayObject';

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

export class DisplayObjectContainer extends DisplayObject implements IRenderContainer {
	public static assetType: string = '[asset DisplayObjectContainer]';
	private static NO_CHILD_ERROR = new ArgumentError('Child parameter is not a child of the caller');

	private _animator: IAnimator;
	protected _children: Array<DisplayObject> = new Array<DisplayObject>();

	public doingSwap: boolean = false;

	/**
	 *
	 */
	public get assetType(): string {
		return DisplayObjectContainer.assetType;
	}

	/**
	 * Defines the animator of the display object.  Default value is <code>null</code>.
	 */
	public get animator(): IAnimator {
		return this._animator;
	}

	public set animator(value: IAnimator) {
		if (this._animator)
			this._animator.removeOwner(this);

		this._animator = value;

		if (this._animator)
			this._animator.addOwner(this);
	}

	/**
	 * Returns the number of children of this object.
	 */
	public get numChildren(): number {
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
	public tabChildren: boolean;

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
	constructor() {
		super();
		this.tabChildren = false;
	}

	public advanceFrame(): void {
		for (let i: number = 0; i < this._children.length; i++)
			this._children[i].advanceFrame();
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
	public addChild(child: DisplayObject): DisplayObject {
		return this.addChildAt(child, this._children.length);
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
	public addChildAt(child: DisplayObject, index: number): DisplayObject {
		if (child.parent && child.parent == this) {
			const childIndex: number = this.getChildIndex(child);

			if (childIndex != index && index < this._children.length) {
				this._children.splice(childIndex, 1);
				this._children.splice(index, 0, child);
			}

			return child;
		}

		if (child.parent)
			child.parent.removeChild(child);

		this._children.splice(index, 0, child);

		child._setParent(this);

		this.dispatchEvent(new ContainerEvent(ContainerEvent.ADD_CHILD_AT, child, index));

		return child;
	}

	public addChildren(...childarray: Array<DisplayObject>): void {
		const len: number = childarray.length;
		for (let i: number = 0; i <  len; i++)
			this.addChild(childarray[i]);
	}

	/**
	 *
	 */
	public clone(): DisplayObjectContainer {
		const newInstance: DisplayObjectContainer = new DisplayObjectContainer();

		this.copyTo(newInstance);

		return newInstance;
	}

	public copyTo(newInstance: DisplayObjectContainer): void {
		super.copyTo(newInstance);

		if (this._animator)
			newInstance.animator = this._animator.clone();

		const len: number = this._children.length;
		for (let i: number = 0; i < len; ++i) {
			const newChild = (<any> this._children[i].adapter).clone().adaptee;
			newInstance.addChild(newChild);
		}
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
	public contains(child: DisplayObject): boolean {
		return this._children.indexOf(child) >= 0;
	}

	/**
	 *
	 */
	public disposeValues(): void {

		if (this._animator)
			this._animator.dispose();

		for (let i: number = this._children.length - 1; i >= 0; i--)
			this.removeChild(this._children[i]);
		super.disposeValues();
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
	public getChildAt(index: number): DisplayObject {
		const child: DisplayObject = this._children[index];

		if (child == null)
			throw new RangeError('Index does not exist in the child list of the caller');

		return child;
	}

	/**
	 * Returns the child display object that exists with the specified name.
	 * If more that one child display object has the specified name,
	 * the method returns the first object in the child list.	 *
	 * <p>The <code>getChildAt()</code> method is faster than the
	 * <code>getChildByName()</code> method. The <code>getChildAt()</code> method
	 * accesses a child from a cached array, whereas the
	 * <code>getChildByName()</code> method has to traverse a linked list to
	 * access a child.</p>
	 *
	 * @param name The name of the child to return.
	 * @return The child display object with the specified name.
	 */
	public getChildByName(name: string): DisplayObject {
		const len: number = this._children.length;
		for (let i: number = 0; i < len; ++i)
			if (this._children[i].name == name)
				return this._children[i];

		return null;
	}

	/**
	 * Returns the index position of a <code>child</code> DisplayObject instance.
	 *
	 * @param child The DisplayObject instance to identify.
	 * @return The index position of the child display object to identify.
	 * @throws ArgumentError Throws if the child parameter is not a child of this object.
	 */
	public getChildIndex(child: DisplayObject): number {
		const childIndex: number = this._children.indexOf(child);

		if (childIndex == -1) {
			throw DisplayObjectContainer.NO_CHILD_ERROR;
		}

		return childIndex;
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
	 *         children (or grandchildren, and so on) of this
	 *         DisplayObjectContainer instance.
	 */
	public getObjectsUnderPoint(point: Point): Array<DisplayObject> {
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
	public removeChild(child: DisplayObject): DisplayObject {
		if (child == null)
			throw new ArgumentError('Parameter child cannot be null');

		this.removeChildAt(this.getChildIndex(child));

		return child;
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
	public removeChildAt(index: number): DisplayObject {
		return this.removeChildAtInternal(index);
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
	public removeChildren(beginIndex: number = 0, endIndex: number = 2147483647): void {
		if (beginIndex < 0)
			throw new RangeError('beginIndex is out of range of the child list');

		if (endIndex > this._children.length)
			throw new RangeError('endIndex is out of range of the child list');

		for (let i: number = endIndex - 1;i >= beginIndex; i--)
			this.removeChildAtInternal(i);
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
	public setChildIndex(child: DisplayObject, index: number): void {
		const original_idx = this.getChildIndex(child);
		if (original_idx < 0)
			throw new ArgumentError('Parameter child must be child of this object');

		if (index > this._children.length - 1)
			throw new RangeError('Parameter index is out of range of the child list');

		if (original_idx == index)
			return;

		this.removeChildAt(original_idx);

		this.addChildAt(child, index);

		if (child._sessionID >= 0 && (<any> this)._sessionID_childs) {
			delete (<any> this)._sessionID_childs[child._sessionID];
			child._sessionID = -1;
		}
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
	public swapChildren(child1: DisplayObject, child2: DisplayObject): void {
		if (child1.parent != this || child2.parent != this)
			return;
		this.swapChildrenAt(this.getChildIndex(child1), this.getChildIndex(child2));
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
	public swapChildrenAt(index1: number, index2: number): void {
		if (index1 == index2)
			return;
		if (index1 >= this._children.length || index2 >= this._children.length)
			throw ('[scene/DisplayobjectContainer] - swapChildrenAt - Range Error');

		let child1: DisplayObject;
		let child2: DisplayObject;

		if (index1 < index2) {
			child2 = this.removeChildAt(index2);
			child1 = this.removeChildAt(index1);

			this.addChildAt(child2, index1);
			this.addChildAt(child1, index2);
		} else {
			child1 = this.removeChildAt(index1);
			child2 = this.removeChildAt(index2);

			this.addChildAt(child1, index2);
			this.addChildAt(child2, index1);
		}

		// dirty code to check if this is a movieclip, and if so handle the sessionID_childs:
		if ((<any> this)._sessionID_childs) {
			if (this._children[index1]._sessionID >= 0) {
				delete (<any> this)._sessionID_childs[this._children[index1]._sessionID];
				this._children[index1]._sessionID == -1;
				this._children[index1]._avmDepthID == -1;
			}
			if (this._children[index2]._sessionID >= 0) {
				delete (<any> this)._sessionID_childs[this._children[index2]._sessionID];
				this._children[index2]._sessionID == -1;
				this._children[index1]._avmDepthID == -1;
			}
		}

	}

	public _initNode(node: ContainerNode): void {
		for (let i: number = 0; i < this._children.length; ++i)
			node.addChildAt(this._children[i], i);
	}

	/**
	 * @private
	 *
	 * @param child
	 */
	protected removeChildAtInternal(index: number): DisplayObject {
		const child: DisplayObject = this._children.splice(index, 1)[0];

		if (child.adapter && (<any>child.adapter).dispatchStaticEvent) {
			(<any>child.adapter).dispatchStaticEvent('removed', child.adapter);
		}
		if (this.isOnDisplayList() && (<any>child.adapter).dispatch_REMOVED_FROM_STAGE) {
			(<any>child.adapter).dispatch_REMOVED_FROM_STAGE(<DisplayObjectContainer>child);
		}

		child._setParent(null);

		this.dispatchEvent(new ContainerEvent(ContainerEvent.REMOVE_CHILD_AT, child, index));

		return child;
	}

	protected _updateMaskMode(): void {
		if (this.maskMode)
			this.mouseChildren = false;

		super._updateMaskMode();
	}
}
PartitionBase.registerAbstraction(EntityNode, DisplayObjectContainer);