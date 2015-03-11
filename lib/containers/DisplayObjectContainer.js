var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ArgumentError = require("awayjs-core/lib/errors/ArgumentError");
var Error = require("awayjs-core/lib/errors/Error");
var RangeError = require("awayjs-core/lib/errors/RangeError");
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
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
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
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
    function DisplayObjectContainer() {
        _super.call(this);
        this._mouseChildren = true;
        this._children = new Array();
    }
    Object.defineProperty(DisplayObjectContainer.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return DisplayObjectContainer.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObjectContainer.prototype, "mouseChildren", {
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
        get: function () {
            return this._mouseChildren;
        },
        set: function (value) {
            if (this._mouseChildren == value)
                return;
            this._mouseChildren = value;
            this._pUpdateImplicitMouseEnabled(this._pParent ? this._pParent.mouseChildren : true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObjectContainer.prototype, "numChildren", {
        /**
         * Returns the number of children of this object.
         */
        get: function () {
            return this._children.length;
        },
        enumerable: true,
        configurable: true
    });
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
    DisplayObjectContainer.prototype.addChild = function (child) {
        if (child == null)
            throw new Error("Parameter child cannot be null.");
        //if child already has a parent, remove it.
        if (child._pParent)
            child._pParent.removeChildInternal(child);
        child.iSetParent(this);
        this._children.push(child);
        return child;
    };
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
    DisplayObjectContainer.prototype.addChildAt = function (child, index /*int*/) {
        return child;
    };
    DisplayObjectContainer.prototype.addChildren = function () {
        var childarray = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childarray[_i - 0] = arguments[_i];
        }
        var len = childarray.length;
        for (var i = 0; i < len; i++)
            this.addChild(childarray[i]);
    };
    /**
     *
     */
    DisplayObjectContainer.prototype.clone = function () {
        var clone = new DisplayObjectContainer();
        clone.pivot = this.pivot;
        clone._iMatrix3D = this._iMatrix3D;
        clone.partition = this.partition;
        clone.name = name;
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            clone.addChild(this._children[i].clone());
        // todo: implement for all subtypes
        return clone;
    };
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
    DisplayObjectContainer.prototype.contains = function (child) {
        return this._children.indexOf(child) >= 0;
    };
    /**
     *
     */
    DisplayObjectContainer.prototype.disposeWithChildren = function () {
        this.dispose();
        while (this.numChildren > 0)
            this.getChildAt(0).dispose();
    };
    /**
     * Returns the child display object instance that exists at the specified
     * index.
     *
     * @param index The index position of the child object.
     * @return The child display object at the specified index position.
     * @throws RangeError    Throws if the index does not exist in the child
     *                       list.
     */
    DisplayObjectContainer.prototype.getChildAt = function (index /*int*/) {
        var child = this._children[index];
        if (child == null)
            throw new RangeError("Index does not exist in the child list of the caller");
        return child;
    };
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
    DisplayObjectContainer.prototype.getChildByName = function (name) {
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            if (this._children[i].name == name)
                return this._children[i];
        return null;
    };
    /**
     * Returns the index position of a <code>child</code> DisplayObject instance.
     *
     * @param child The DisplayObject instance to identify.
     * @return The index position of the child display object to identify.
     * @throws ArgumentError Throws if the child parameter is not a child of this
     *                       object.
     */
    DisplayObjectContainer.prototype.getChildIndex = function (child) {
        var childIndex = this._children.indexOf(child);
        if (childIndex == -1)
            throw new ArgumentError("Child parameter is not a child of the caller");
        return childIndex;
    };
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
    DisplayObjectContainer.prototype.getObjectsUnderPoint = function (point) {
        return new Array();
    };
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
    DisplayObjectContainer.prototype.removeChild = function (child) {
        if (child == null)
            throw new Error("Parameter child cannot be null");
        this.removeChildInternal(child);
        child.iSetParent(null);
        return child;
    };
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
    DisplayObjectContainer.prototype.removeChildAt = function (index /*int*/) {
        return this.removeChild(this._children[index]);
    };
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
    DisplayObjectContainer.prototype.removeChildren = function (beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = 0; }
        if (endIndex === void 0) { endIndex = 2147483647; }
        if (beginIndex < 0)
            throw new RangeError("beginIndex is out of range of the child list");
        if (endIndex > this._children.length)
            throw new RangeError("endIndex is out of range of the child list");
        for (var i = beginIndex; i < endIndex; i++)
            this.removeChild(this._children[i]);
    };
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
    DisplayObjectContainer.prototype.setChildIndex = function (child, index /*int*/) {
        //TODO
    };
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
    DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
        //TODO
    };
    /**
     * Swaps the z-order(front-to-back order) of the child objects at the two
     * specified index positions in the child list. All other child objects in
     * the display object container remain in the same index positions.
     *
     * @param index1 The index position of the first child object.
     * @param index2 The index position of the second child object.
     * @throws RangeError If either index does not exist in the child list.
     */
    DisplayObjectContainer.prototype.swapChildrenAt = function (index1 /*int*/, index2 /*int*/) {
        //TODO
    };
    /**
     * @protected
     */
    DisplayObjectContainer.prototype.pInvalidateSceneTransform = function () {
        _super.prototype.pInvalidateSceneTransform.call(this);
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i].pInvalidateSceneTransform();
    };
    /**
     * @protected
     */
    DisplayObjectContainer.prototype._pUpdateImplicitMouseEnabled = function (value) {
        _super.prototype._pUpdateImplicitMouseEnabled.call(this, value);
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i]._pUpdateImplicitMouseEnabled(this._mouseChildren);
    };
    /**
     * @protected
     */
    DisplayObjectContainer.prototype._pUpdateImplicitVisibility = function (value) {
        _super.prototype._pUpdateImplicitVisibility.call(this, value);
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i]._pUpdateImplicitVisibility(this._pImplicitVisibility);
    };
    /**
     * @protected
     */
    DisplayObjectContainer.prototype._pUpdateImplicitPartition = function (value, scene) {
        _super.prototype._pUpdateImplicitPartition.call(this, value, scene);
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i]._pUpdateImplicitPartition(this._pImplicitPartition, scene);
    };
    /**
     * @private
     *
     * @param child
     */
    DisplayObjectContainer.prototype.removeChildInternal = function (child) {
        this._children.splice(this.getChildIndex(child), 1);
        return child;
    };
    DisplayObjectContainer.assetType = "[asset DisplayObjectContainer]";
    return DisplayObjectContainer;
})(DisplayObject);
module.exports = DisplayObjectContainer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL0Rpc3BsYXlPYmplY3RDb250YWluZXIudHMiXSwibmFtZXMiOlsiRGlzcGxheU9iamVjdENvbnRhaW5lciIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuY29uc3RydWN0b3IiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFzc2V0VHlwZSIsIkRpc3BsYXlPYmplY3RDb250YWluZXIubW91c2VDaGlsZHJlbiIsIkRpc3BsYXlPYmplY3RDb250YWluZXIubnVtQ2hpbGRyZW4iLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZEF0IiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZHJlbiIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuY2xvbmUiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmNvbnRhaW5zIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5kaXNwb3NlV2l0aENoaWxkcmVuIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5nZXRDaGlsZEF0IiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZSIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuZ2V0Q2hpbGRJbmRleCIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuZ2V0T2JqZWN0c1VuZGVyUG9pbnQiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnJlbW92ZUNoaWxkIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5yZW1vdmVDaGlsZEF0IiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5yZW1vdmVDaGlsZHJlbiIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuc2V0Q2hpbGRJbmRleCIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuc3dhcENoaWxkcmVuIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5zd2FwQ2hpbGRyZW5BdCIsIkRpc3BsYXlPYmplY3RDb250YWluZXIucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnJlbW92ZUNoaWxkSW50ZXJuYWwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLElBQU8sYUFBYSxXQUFjLHNDQUFzQyxDQUFDLENBQUM7QUFDMUUsSUFBTyxLQUFLLFdBQWdCLDhCQUE4QixDQUFDLENBQUM7QUFDNUQsSUFBTyxVQUFVLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUVyRSxJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBSTNFLEFBcUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csc0JBQXNCO0lBQVNBLFVBQS9CQSxzQkFBc0JBLFVBQXNCQTtJQTJFakRBOzs7Ozs7Ozs7T0FTR0E7SUFDSEEsU0FyRktBLHNCQUFzQkE7UUF1RjFCQyxpQkFBT0EsQ0FBQ0E7UUFuRkRBLG1CQUFjQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUM5QkEsY0FBU0EsR0FBd0JBLElBQUlBLEtBQUtBLEVBQWlCQSxDQUFDQTtJQW1GcEVBLENBQUNBO0lBN0VERCxzQkFBV0EsNkNBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUN6Q0EsQ0FBQ0E7OztPQUFBRjtJQXVCREEsc0JBQVdBLGlEQUFhQTtRQXJCeEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW9CR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7UUFDNUJBLENBQUNBO2FBRURILFVBQXlCQSxLQUFhQTtZQUVyQ0csRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFB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Q0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFcERBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO0lBQ2RBLENBQUNBO0lBbGdCYXpCLGdDQUFTQSxHQUFVQSxnQ0FBZ0NBLENBQUNBO0lBbWdCbkVBLDZCQUFDQTtBQUFEQSxDQXJnQkEsQUFxZ0JDQSxFQXJnQm9DLGFBQWEsRUFxZ0JqRDtBQUVELEFBQWdDLGlCQUF2QixzQkFBc0IsQ0FBQyIsImZpbGUiOiJjb250YWluZXJzL0Rpc3BsYXlPYmplY3RDb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvaW50XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUG9pbnRcIik7XHJcbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XHJcbmltcG9ydCBBcmd1bWVudEVycm9yXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0FyZ3VtZW50RXJyb3JcIik7XHJcbmltcG9ydCBFcnJvclx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XHJcbmltcG9ydCBSYW5nZUVycm9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvUmFuZ2VFcnJvclwiKTtcclxuXHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xyXG5pbXBvcnQgUGFydGl0aW9uXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUGFydGl0aW9uXCIpO1xyXG5pbXBvcnQgU2NlbmVcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9TY2VuZVwiKTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIG9iamVjdHMgdGhhdCBjYW5cclxuICogc2VydmUgYXMgZGlzcGxheSBvYmplY3QgY29udGFpbmVycyBvbiB0aGUgZGlzcGxheSBsaXN0LiBUaGUgZGlzcGxheSBsaXN0XHJcbiAqIG1hbmFnZXMgYWxsIG9iamVjdHMgZGlzcGxheWVkIGluIHRoZSBGbGFzaCBydW50aW1lcy4gVXNlIHRoZVxyXG4gKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIHRvIGFycmFuZ2UgdGhlIGRpc3BsYXkgb2JqZWN0cyBpbiB0aGUgZGlzcGxheVxyXG4gKiBsaXN0LiBFYWNoIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IGhhcyBpdHMgb3duIGNoaWxkIGxpc3QgZm9yXHJcbiAqIG9yZ2FuaXppbmcgdGhlIHotb3JkZXIgb2YgdGhlIG9iamVjdHMuIFRoZSB6LW9yZGVyIGlzIHRoZSBmcm9udC10by1iYWNrXHJcbiAqIG9yZGVyIHRoYXQgZGV0ZXJtaW5lcyB3aGljaCBvYmplY3QgaXMgZHJhd24gaW4gZnJvbnQsIHdoaWNoIGlzIGJlaGluZCwgYW5kXHJcbiAqIHNvIG9uLlxyXG4gKlxyXG4gKiA8cD5EaXNwbGF5T2JqZWN0IGlzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3M7IHRoZXJlZm9yZSwgeW91IGNhbm5vdCBjYWxsXHJcbiAqIERpc3BsYXlPYmplY3QgZGlyZWN0bHkuIEludm9raW5nIDxjb2RlPm5ldyBEaXNwbGF5T2JqZWN0KCk8L2NvZGU+IHRocm93cyBhblxyXG4gKiA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPiBleGNlcHRpb24uPC9wPlxyXG4gKiBUaGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBjbGFzcyBpcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBhbGwgb2JqZWN0c1xyXG4gKiB0aGF0IGNhbiBjb250YWluIGNoaWxkIG9iamVjdHMuIEl0IGNhbm5vdCBiZSBpbnN0YW50aWF0ZWQgZGlyZWN0bHk7IGNhbGxpbmdcclxuICogdGhlIDxjb2RlPm5ldyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyKCk8L2NvZGU+IGNvbnN0cnVjdG9yIHRocm93cyBhblxyXG4gKiA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPiBleGNlcHRpb24uXHJcbiAqXHJcbiAqIDxwPkZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgdGhlIFwiRGlzcGxheSBQcm9ncmFtbWluZ1wiIGNoYXB0ZXIgb2YgdGhlXHJcbiAqIDxpPkFjdGlvblNjcmlwdCAzLjAgRGV2ZWxvcGVyJ3MgR3VpZGU8L2k+LjwvcD5cclxuICovXHJcbmNsYXNzIERpc3BsYXlPYmplY3RDb250YWluZXIgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0IGltcGxlbWVudHMgSUFzc2V0XHJcbntcclxuXHRwdWJsaWMgc3RhdGljIGFzc2V0VHlwZTpzdHJpbmcgPSBcIlthc3NldCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXVwiO1xyXG5cclxuXHRwcml2YXRlIF9tb3VzZUNoaWxkcmVuOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX2NoaWxkcmVuOkFycmF5PERpc3BsYXlPYmplY3Q+ID0gbmV3IEFycmF5PERpc3BsYXlPYmplY3Q+KCk7XHJcblx0cHVibGljIF9pSXNSb290OmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gRGlzcGxheU9iamVjdENvbnRhaW5lci5hc3NldFR5cGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBjaGlsZHJlbiBvZiB0aGUgb2JqZWN0IGFyZSBtb3VzZSwgb3IgdXNlclxyXG5cdCAqIGlucHV0IGRldmljZSwgZW5hYmxlZC4gSWYgYW4gb2JqZWN0IGlzIGVuYWJsZWQsIGEgdXNlciBjYW4gaW50ZXJhY3Qgd2l0aFxyXG5cdCAqIGl0IGJ5IHVzaW5nIGEgbW91c2Ugb3IgdXNlciBpbnB1dCBkZXZpY2UuIFRoZSBkZWZhdWx0IGlzXHJcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD5UaGlzIHByb3BlcnR5IGlzIHVzZWZ1bCB3aGVuIHlvdSBjcmVhdGUgYSBidXR0b24gd2l0aCBhbiBpbnN0YW5jZSBvZlxyXG5cdCAqIHRoZSBTcHJpdGUgY2xhc3MoaW5zdGVhZCBvZiB1c2luZyB0aGUgU2ltcGxlQnV0dG9uIGNsYXNzKS4gV2hlbiB5b3UgdXNlIGFcclxuXHQgKiBTcHJpdGUgaW5zdGFuY2UgdG8gY3JlYXRlIGEgYnV0dG9uLCB5b3UgY2FuIGNob29zZSB0byBkZWNvcmF0ZSB0aGUgYnV0dG9uXHJcblx0ICogYnkgdXNpbmcgdGhlIDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+IG1ldGhvZCB0byBhZGQgYWRkaXRpb25hbCBTcHJpdGVcclxuXHQgKiBpbnN0YW5jZXMuIFRoaXMgcHJvY2VzcyBjYW4gY2F1c2UgdW5leHBlY3RlZCBiZWhhdmlvciB3aXRoIG1vdXNlIGV2ZW50c1xyXG5cdCAqIGJlY2F1c2UgdGhlIFNwcml0ZSBpbnN0YW5jZXMgeW91IGFkZCBhcyBjaGlsZHJlbiBjYW4gYmVjb21lIHRoZSB0YXJnZXRcclxuXHQgKiBvYmplY3Qgb2YgYSBtb3VzZSBldmVudCB3aGVuIHlvdSBleHBlY3QgdGhlIHBhcmVudCBpbnN0YW5jZSB0byBiZSB0aGVcclxuXHQgKiB0YXJnZXQgb2JqZWN0LiBUbyBlbnN1cmUgdGhhdCB0aGUgcGFyZW50IGluc3RhbmNlIHNlcnZlcyBhcyB0aGUgdGFyZ2V0XHJcblx0ICogb2JqZWN0cyBmb3IgbW91c2UgZXZlbnRzLCB5b3UgY2FuIHNldCB0aGUgPGNvZGU+bW91c2VDaGlsZHJlbjwvY29kZT5cclxuXHQgKiBwcm9wZXJ0eSBvZiB0aGUgcGFyZW50IGluc3RhbmNlIHRvIDxjb2RlPmZhbHNlPC9jb2RlPi48L3A+XHJcblx0ICpcclxuXHQgKiA8cD4gTm8gZXZlbnQgaXMgZGlzcGF0Y2hlZCBieSBzZXR0aW5nIHRoaXMgcHJvcGVydHkuIFlvdSBtdXN0IHVzZSB0aGVcclxuXHQgKiA8Y29kZT5hZGRFdmVudExpc3RlbmVyKCk8L2NvZGU+IG1ldGhvZCB0byBjcmVhdGUgaW50ZXJhY3RpdmVcclxuXHQgKiBmdW5jdGlvbmFsaXR5LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1vdXNlQ2hpbGRyZW4oKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21vdXNlQ2hpbGRyZW47XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG1vdXNlQ2hpbGRyZW4odmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fbW91c2VDaGlsZHJlbiA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX21vdXNlQ2hpbGRyZW4gPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodGhpcy5fcFBhcmVudD8gdGhpcy5fcFBhcmVudC5tb3VzZUNoaWxkcmVuIDogdHJ1ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gb2YgdGhpcyBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBudW1DaGlsZHJlbigpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NoaWxkcmVuLmxlbmd0aDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERldGVybWluZXMgd2hldGhlciB0aGUgY2hpbGRyZW4gb2YgdGhlIG9iamVjdCBhcmUgdGFiIGVuYWJsZWQuIEVuYWJsZXMgb3JcclxuXHQgKiBkaXNhYmxlcyB0YWJiaW5nIGZvciB0aGUgY2hpbGRyZW4gb2YgdGhlIG9iamVjdC4gVGhlIGRlZmF1bHQgaXNcclxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPi5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBEbyBub3QgdXNlIHRoZSA8Y29kZT50YWJDaGlsZHJlbjwvY29kZT4gcHJvcGVydHkgd2l0aFxyXG5cdCAqIEZsZXguIEluc3RlYWQsIHVzZSB0aGVcclxuXHQgKiA8Y29kZT5teC5jb3JlLlVJQ29tcG9uZW50Lmhhc0ZvY3VzYWJsZUNoaWxkcmVuPC9jb2RlPiBwcm9wZXJ0eS48L3A+XHJcblx0ICpcclxuXHQgKiBAdGhyb3dzIElsbGVnYWxPcGVyYXRpb25FcnJvciBDYWxsaW5nIHRoaXMgcHJvcGVydHkgb2YgdGhlIFN0YWdlIG9iamVjdFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93cyBhbiBleGNlcHRpb24uIFRoZSBTdGFnZSBvYmplY3QgZG9lc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdCBpbXBsZW1lbnQgdGhpcyBwcm9wZXJ0eS5cclxuXHQgKi9cclxuXHRwdWJsaWMgdGFiQ2hpbGRyZW46Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGluZyB0aGUgPGNvZGU+bmV3IERpc3BsYXlPYmplY3RDb250YWluZXIoKTwvY29kZT4gY29uc3RydWN0b3IgdGhyb3dzXHJcblx0ICogYW4gPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT4gZXhjZXB0aW9uLiBZb3UgPGk+Y2FuPC9pPiwgaG93ZXZlciwgY2FsbFxyXG5cdCAqIGNvbnN0cnVjdG9ycyBmb3IgdGhlIGZvbGxvd2luZyBzdWJjbGFzc2VzIG9mIERpc3BsYXlPYmplY3RDb250YWluZXI6XHJcblx0ICogPHVsPlxyXG5cdCAqICAgPGxpPjxjb2RlPm5ldyBMb2FkZXIoKTwvY29kZT48L2xpPlxyXG5cdCAqICAgPGxpPjxjb2RlPm5ldyBTcHJpdGUoKTwvY29kZT48L2xpPlxyXG5cdCAqICAgPGxpPjxjb2RlPm5ldyBNb3ZpZUNsaXAoKTwvY29kZT48L2xpPlxyXG5cdCAqIDwvdWw+XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgY2hpbGQgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byB0aGlzIERpc3BsYXlPYmplY3RDb250YWluZXJcclxuXHQgKiBpbnN0YW5jZS4gVGhlIGNoaWxkIGlzIGFkZGVkIHRvIHRoZSBmcm9udCh0b3ApIG9mIGFsbCBvdGhlciBjaGlsZHJlbiBpblxyXG5cdCAqIHRoaXMgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZS4oVG8gYWRkIGEgY2hpbGQgdG8gYSBzcGVjaWZpYyBpbmRleFxyXG5cdCAqIHBvc2l0aW9uLCB1c2UgdGhlIDxjb2RlPmFkZENoaWxkQXQoKTwvY29kZT4gbWV0aG9kLilcclxuXHQgKlxyXG5cdCAqIDxwPklmIHlvdSBhZGQgYSBjaGlsZCBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBhIGRpZmZlcmVudCBkaXNwbGF5IG9iamVjdFxyXG5cdCAqIGNvbnRhaW5lciBhcyBhIHBhcmVudCwgdGhlIG9iamVjdCBpcyByZW1vdmVkIGZyb20gdGhlIGNoaWxkIGxpc3Qgb2YgdGhlXHJcblx0ICogb3RoZXIgZGlzcGxheSBvYmplY3QgY29udGFpbmVyLiA8L3A+XHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVGhlIGNvbW1hbmQgPGNvZGU+c3RhZ2UuYWRkQ2hpbGQoKTwvY29kZT4gY2FuIGNhdXNlXHJcblx0ICogcHJvYmxlbXMgd2l0aCBhIHB1Ymxpc2hlZCBTV0YgZmlsZSwgaW5jbHVkaW5nIHNlY3VyaXR5IHByb2JsZW1zIGFuZFxyXG5cdCAqIGNvbmZsaWN0cyB3aXRoIG90aGVyIGxvYWRlZCBTV0YgZmlsZXMuIFRoZXJlIGlzIG9ubHkgb25lIFN0YWdlIHdpdGhpbiBhXHJcblx0ICogRmxhc2ggcnVudGltZSBpbnN0YW5jZSwgbm8gbWF0dGVyIGhvdyBtYW55IFNXRiBmaWxlcyB5b3UgbG9hZCBpbnRvIHRoZVxyXG5cdCAqIHJ1bnRpbWUuIFNvLCBnZW5lcmFsbHksIG9iamVjdHMgc2hvdWxkIG5vdCBiZSBhZGRlZCB0byB0aGUgU3RhZ2UsXHJcblx0ICogZGlyZWN0bHksIGF0IGFsbC4gVGhlIG9ubHkgb2JqZWN0IHRoZSBTdGFnZSBzaG91bGQgY29udGFpbiBpcyB0aGUgcm9vdFxyXG5cdCAqIG9iamVjdC4gQ3JlYXRlIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciB0byBjb250YWluIGFsbCBvZiB0aGUgaXRlbXMgb24gdGhlXHJcblx0ICogZGlzcGxheSBsaXN0LiBUaGVuLCBpZiBuZWNlc3NhcnksIGFkZCB0aGF0IERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2VcclxuXHQgKiB0byB0aGUgU3RhZ2UuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNoaWxkIFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIGFkZCBhcyBhIGNoaWxkIG9mIHRoaXNcclxuXHQgKiAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZS5cclxuXHQgKiBAcmV0dXJuIFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRoYXQgeW91IHBhc3MgaW4gdGhlIDxjb2RlPmNoaWxkPC9jb2RlPlxyXG5cdCAqICAgICAgICAgcGFyYW1ldGVyLlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBUaHJvd3MgaWYgdGhlIGNoaWxkIGlzIHRoZSBzYW1lIGFzIHRoZSBwYXJlbnQuIEFsc29cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhyb3dzIGlmIHRoZSBjYWxsZXIgaXMgYSBjaGlsZChvciBncmFuZGNoaWxkIGV0Yy4pXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9mIHRoZSBjaGlsZCBiZWluZyBhZGRlZC5cclxuXHQgKiBAZXZlbnQgYWRkZWQgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWRkZWQgdG8gdGhlIGRpc3BsYXlcclxuXHQgKiAgICAgICAgICAgICAgbGlzdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgYWRkQ2hpbGQoY2hpbGQ6RGlzcGxheU9iamVjdCk6RGlzcGxheU9iamVjdFxyXG5cdHtcclxuXHRcdGlmIChjaGlsZCA9PSBudWxsKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQYXJhbWV0ZXIgY2hpbGQgY2Fubm90IGJlIG51bGwuXCIpO1xyXG5cclxuXHRcdC8vaWYgY2hpbGQgYWxyZWFkeSBoYXMgYSBwYXJlbnQsIHJlbW92ZSBpdC5cclxuXHRcdGlmIChjaGlsZC5fcFBhcmVudClcclxuXHRcdFx0Y2hpbGQuX3BQYXJlbnQucmVtb3ZlQ2hpbGRJbnRlcm5hbChjaGlsZCk7XHJcblxyXG5cdFx0Y2hpbGQuaVNldFBhcmVudCh0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9jaGlsZHJlbi5wdXNoKGNoaWxkKTtcclxuXHJcblx0XHRyZXR1cm4gY2hpbGQ7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gdGhpcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHJcblx0ICogaW5zdGFuY2UuIFRoZSBjaGlsZCBpcyBhZGRlZCBhdCB0aGUgaW5kZXggcG9zaXRpb24gc3BlY2lmaWVkLiBBbiBpbmRleCBvZlxyXG5cdCAqIDAgcmVwcmVzZW50cyB0aGUgYmFjayhib3R0b20pIG9mIHRoZSBkaXNwbGF5IGxpc3QgZm9yIHRoaXNcclxuXHQgKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIDxwPkZvciBleGFtcGxlLCB0aGUgZm9sbG93aW5nIGV4YW1wbGUgc2hvd3MgdGhyZWUgZGlzcGxheSBvYmplY3RzLCBsYWJlbGVkXHJcblx0ICogYSwgYiwgYW5kIGMsIGF0IGluZGV4IHBvc2l0aW9ucyAwLCAyLCBhbmQgMSwgcmVzcGVjdGl2ZWx5OjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPklmIHlvdSBhZGQgYSBjaGlsZCBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBhIGRpZmZlcmVudCBkaXNwbGF5IG9iamVjdFxyXG5cdCAqIGNvbnRhaW5lciBhcyBhIHBhcmVudCwgdGhlIG9iamVjdCBpcyByZW1vdmVkIGZyb20gdGhlIGNoaWxkIGxpc3Qgb2YgdGhlXHJcblx0ICogb3RoZXIgZGlzcGxheSBvYmplY3QgY29udGFpbmVyLiA8L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gY2hpbGQgVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gYWRkIGFzIGEgY2hpbGQgb2YgdGhpc1xyXG5cdCAqICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlLlxyXG5cdCAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggcG9zaXRpb24gdG8gd2hpY2ggdGhlIGNoaWxkIGlzIGFkZGVkLiBJZiB5b3VcclxuXHQgKiAgICAgICAgICAgICAgc3BlY2lmeSBhIGN1cnJlbnRseSBvY2N1cGllZCBpbmRleCBwb3NpdGlvbiwgdGhlIGNoaWxkIG9iamVjdFxyXG5cdCAqICAgICAgICAgICAgICB0aGF0IGV4aXN0cyBhdCB0aGF0IHBvc2l0aW9uIGFuZCBhbGwgaGlnaGVyIHBvc2l0aW9ucyBhcmVcclxuXHQgKiAgICAgICAgICAgICAgbW92ZWQgdXAgb25lIHBvc2l0aW9uIGluIHRoZSBjaGlsZCBsaXN0LlxyXG5cdCAqIEByZXR1cm4gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdGhhdCB5b3UgcGFzcyBpbiB0aGUgPGNvZGU+Y2hpbGQ8L2NvZGU+XHJcblx0ICogICAgICAgICBwYXJhbWV0ZXIuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRocm93cyBpZiB0aGUgY2hpbGQgaXMgdGhlIHNhbWUgYXMgdGhlIHBhcmVudC4gQWxzb1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aHJvd3MgaWYgdGhlIGNhbGxlciBpcyBhIGNoaWxkKG9yIGdyYW5kY2hpbGQgZXRjLilcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2YgdGhlIGNoaWxkIGJlaW5nIGFkZGVkLlxyXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciAgICBUaHJvd3MgaWYgdGhlIGluZGV4IHBvc2l0aW9uIGRvZXMgbm90IGV4aXN0IGluIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCBsaXN0LlxyXG5cdCAqIEBldmVudCBhZGRlZCBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhZGRlZCB0byB0aGUgZGlzcGxheVxyXG5cdCAqICAgICAgICAgICAgICBsaXN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhZGRDaGlsZEF0KGNoaWxkOkRpc3BsYXlPYmplY3QsIGluZGV4Om51bWJlciAvKmludCovKTpEaXNwbGF5T2JqZWN0XHJcblx0e1xyXG5cdFx0cmV0dXJuIGNoaWxkO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGFkZENoaWxkcmVuKC4uLmNoaWxkYXJyYXk6QXJyYXk8RGlzcGxheU9iamVjdD4pXHJcblx0e1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSBjaGlsZGFycmF5Lmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8ICBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5hZGRDaGlsZChjaGlsZGFycmF5W2ldKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGNsb25lKCk6RGlzcGxheU9iamVjdFxyXG5cdHtcclxuXHRcdHZhciBjbG9uZTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyID0gbmV3IERpc3BsYXlPYmplY3RDb250YWluZXIoKTtcclxuXHRcdGNsb25lLnBpdm90ID0gdGhpcy5waXZvdDtcclxuXHRcdGNsb25lLl9pTWF0cml4M0QgPSB0aGlzLl9pTWF0cml4M0Q7XHJcblx0XHRjbG9uZS5wYXJ0aXRpb24gPSB0aGlzLnBhcnRpdGlvbjtcclxuXHRcdGNsb25lLm5hbWUgPSBuYW1lO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXHJcblx0XHRcdGNsb25lLmFkZENoaWxkKHRoaXMuX2NoaWxkcmVuW2ldLmNsb25lKCkpO1xyXG5cclxuXHRcdC8vIHRvZG86IGltcGxlbWVudCBmb3IgYWxsIHN1YnR5cGVzXHJcblx0XHRyZXR1cm4gY2xvbmU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBkaXNwbGF5IG9iamVjdCBpcyBhIGNoaWxkIG9mIHRoZVxyXG5cdCAqIERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2Ugb3IgdGhlIGluc3RhbmNlIGl0c2VsZi4gVGhlIHNlYXJjaFxyXG5cdCAqIGluY2x1ZGVzIHRoZSBlbnRpcmUgZGlzcGxheSBsaXN0IGluY2x1ZGluZyB0aGlzIERpc3BsYXlPYmplY3RDb250YWluZXJcclxuXHQgKiBpbnN0YW5jZS4gR3JhbmRjaGlsZHJlbiwgZ3JlYXQtZ3JhbmRjaGlsZHJlbiwgYW5kIHNvIG9uIGVhY2ggcmV0dXJuXHJcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gY2hpbGQgVGhlIGNoaWxkIG9iamVjdCB0byB0ZXN0LlxyXG5cdCAqIEByZXR1cm4gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIDxjb2RlPmNoaWxkPC9jb2RlPiBvYmplY3QgaXMgYSBjaGlsZCBvZlxyXG5cdCAqICAgICAgICAgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgb3IgdGhlIGNvbnRhaW5lciBpdHNlbGY7IG90aGVyd2lzZVxyXG5cdCAqICAgICAgICAgPGNvZGU+ZmFsc2U8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb250YWlucyhjaGlsZDpEaXNwbGF5T2JqZWN0KTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NoaWxkcmVuLmluZGV4T2YoY2hpbGQpID49IDA7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlV2l0aENoaWxkcmVuKClcclxuXHR7XHJcblx0XHR0aGlzLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR3aGlsZSAodGhpcy5udW1DaGlsZHJlbiA+IDApXHJcblx0XHRcdHRoaXMuZ2V0Q2hpbGRBdCgwKS5kaXNwb3NlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBjaGlsZCBkaXNwbGF5IG9iamVjdCBpbnN0YW5jZSB0aGF0IGV4aXN0cyBhdCB0aGUgc3BlY2lmaWVkXHJcblx0ICogaW5kZXguXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBjaGlsZCBvYmplY3QuXHJcblx0ICogQHJldHVybiBUaGUgY2hpbGQgZGlzcGxheSBvYmplY3QgYXQgdGhlIHNwZWNpZmllZCBpbmRleCBwb3NpdGlvbi5cclxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgICAgVGhyb3dzIGlmIHRoZSBpbmRleCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgY2hpbGRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0Q2hpbGRBdChpbmRleDpudW1iZXIgLyppbnQqLyk6RGlzcGxheU9iamVjdFxyXG5cdHtcclxuXHRcdHZhciBjaGlsZDpEaXNwbGF5T2JqZWN0ID0gdGhpcy5fY2hpbGRyZW5baW5kZXhdO1xyXG5cclxuXHRcdGlmIChjaGlsZCA9PSBudWxsKVxyXG5cdFx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkluZGV4IGRvZXMgbm90IGV4aXN0IGluIHRoZSBjaGlsZCBsaXN0IG9mIHRoZSBjYWxsZXJcIik7XHJcblxyXG5cdFx0cmV0dXJuIGNoaWxkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgY2hpbGQgZGlzcGxheSBvYmplY3QgdGhhdCBleGlzdHMgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUuIElmXHJcblx0ICogbW9yZSB0aGF0IG9uZSBjaGlsZCBkaXNwbGF5IG9iamVjdCBoYXMgdGhlIHNwZWNpZmllZCBuYW1lLCB0aGUgbWV0aG9kXHJcblx0ICogcmV0dXJucyB0aGUgZmlyc3Qgb2JqZWN0IGluIHRoZSBjaGlsZCBsaXN0LlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIDxjb2RlPmdldENoaWxkQXQoKTwvY29kZT4gbWV0aG9kIGlzIGZhc3RlciB0aGFuIHRoZVxyXG5cdCAqIDxjb2RlPmdldENoaWxkQnlOYW1lKCk8L2NvZGU+IG1ldGhvZC4gVGhlIDxjb2RlPmdldENoaWxkQXQoKTwvY29kZT4gbWV0aG9kXHJcblx0ICogYWNjZXNzZXMgYSBjaGlsZCBmcm9tIGEgY2FjaGVkIGFycmF5LCB3aGVyZWFzIHRoZVxyXG5cdCAqIDxjb2RlPmdldENoaWxkQnlOYW1lKCk8L2NvZGU+IG1ldGhvZCBoYXMgdG8gdHJhdmVyc2UgYSBsaW5rZWQgbGlzdCB0b1xyXG5cdCAqIGFjY2VzcyBhIGNoaWxkLjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBjaGlsZCB0byByZXR1cm4uXHJcblx0ICogQHJldHVybiBUaGUgY2hpbGQgZGlzcGxheSBvYmplY3Qgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUuXHJcblx0ICovXHJcblx0cHVibGljIGdldENoaWxkQnlOYW1lKG5hbWU6c3RyaW5nKTpEaXNwbGF5T2JqZWN0XHJcblx0e1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcclxuXHRcdFx0aWYgKHRoaXMuX2NoaWxkcmVuW2ldLm5hbWUgPT0gbmFtZSlcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fY2hpbGRyZW5baV07XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBpbmRleCBwb3NpdGlvbiBvZiBhIDxjb2RlPmNoaWxkPC9jb2RlPiBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNoaWxkIFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIGlkZW50aWZ5LlxyXG5cdCAqIEByZXR1cm4gVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBjaGlsZCBkaXNwbGF5IG9iamVjdCB0byBpZGVudGlmeS5cclxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhyb3dzIGlmIHRoZSBjaGlsZCBwYXJhbWV0ZXIgaXMgbm90IGEgY2hpbGQgb2YgdGhpc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIGdldENoaWxkSW5kZXgoY2hpbGQ6RGlzcGxheU9iamVjdCk6bnVtYmVyIC8qaW50Ki9cclxuXHR7XHJcblx0XHR2YXIgY2hpbGRJbmRleDpudW1iZXIgPSB0aGlzLl9jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcclxuXHJcblx0XHRpZiAoY2hpbGRJbmRleCA9PSAtMSlcclxuXHRcdFx0dGhyb3cgbmV3IEFyZ3VtZW50RXJyb3IoXCJDaGlsZCBwYXJhbWV0ZXIgaXMgbm90IGEgY2hpbGQgb2YgdGhlIGNhbGxlclwiKTtcclxuXHJcblx0XHRyZXR1cm4gY2hpbGRJbmRleDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYW4gYXJyYXkgb2Ygb2JqZWN0cyB0aGF0IGxpZSB1bmRlciB0aGUgc3BlY2lmaWVkIHBvaW50IGFuZCBhcmVcclxuXHQgKiBjaGlsZHJlbihvciBncmFuZGNoaWxkcmVuLCBhbmQgc28gb24pIG9mIHRoaXMgRGlzcGxheU9iamVjdENvbnRhaW5lclxyXG5cdCAqIGluc3RhbmNlLiBBbnkgY2hpbGQgb2JqZWN0cyB0aGF0IGFyZSBpbmFjY2Vzc2libGUgZm9yIHNlY3VyaXR5IHJlYXNvbnMgYXJlXHJcblx0ICogb21pdHRlZCBmcm9tIHRoZSByZXR1cm5lZCBhcnJheS4gVG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBzZWN1cml0eVxyXG5cdCAqIHJlc3RyaWN0aW9uIGFmZmVjdHMgdGhlIHJldHVybmVkIGFycmF5LCBjYWxsIHRoZVxyXG5cdCAqIDxjb2RlPmFyZUluYWNjZXNzaWJsZU9iamVjdHNVbmRlclBvaW50KCk8L2NvZGU+IG1ldGhvZC5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSA8Y29kZT5wb2ludDwvY29kZT4gcGFyYW1ldGVyIGlzIGluIHRoZSBjb29yZGluYXRlIHNwYWNlIG9mIHRoZVxyXG5cdCAqIFN0YWdlLCB3aGljaCBtYXkgZGlmZmVyIGZyb20gdGhlIGNvb3JkaW5hdGUgc3BhY2Ugb2YgdGhlIGRpc3BsYXkgb2JqZWN0XHJcblx0ICogY29udGFpbmVyKHVubGVzcyB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIGlzIHRoZSBTdGFnZSkuIFlvdSBjYW4gdXNlXHJcblx0ICogdGhlIDxjb2RlPmdsb2JhbFRvTG9jYWwoKTwvY29kZT4gYW5kIHRoZSA8Y29kZT5sb2NhbFRvR2xvYmFsKCk8L2NvZGU+XHJcblx0ICogbWV0aG9kcyB0byBjb252ZXJ0IHBvaW50cyBiZXR3ZWVuIHRoZXNlIGNvb3JkaW5hdGUgc3BhY2VzLjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBwb2ludCBUaGUgcG9pbnQgdW5kZXIgd2hpY2ggdG8gbG9vay5cclxuXHQgKiBAcmV0dXJuIEFuIGFycmF5IG9mIG9iamVjdHMgdGhhdCBsaWUgdW5kZXIgdGhlIHNwZWNpZmllZCBwb2ludCBhbmQgYXJlXHJcblx0ICogICAgICAgICBjaGlsZHJlbihvciBncmFuZGNoaWxkcmVuLCBhbmQgc28gb24pIG9mIHRoaXNcclxuXHQgKiAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldE9iamVjdHNVbmRlclBvaW50KHBvaW50OlBvaW50KTpBcnJheTxEaXNwbGF5T2JqZWN0PlxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgQXJyYXk8RGlzcGxheU9iamVjdD4oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCA8Y29kZT5jaGlsZDwvY29kZT4gRGlzcGxheU9iamVjdCBpbnN0YW5jZSBmcm9tIHRoZVxyXG5cdCAqIGNoaWxkIGxpc3Qgb2YgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UuIFRoZSA8Y29kZT5wYXJlbnQ8L2NvZGU+XHJcblx0ICogcHJvcGVydHkgb2YgdGhlIHJlbW92ZWQgY2hpbGQgaXMgc2V0IHRvIDxjb2RlPm51bGw8L2NvZGU+ICwgYW5kIHRoZSBvYmplY3RcclxuXHQgKiBpcyBnYXJiYWdlIGNvbGxlY3RlZCBpZiBubyBvdGhlciByZWZlcmVuY2VzIHRvIHRoZSBjaGlsZCBleGlzdC4gVGhlIGluZGV4XHJcblx0ICogcG9zaXRpb25zIG9mIGFueSBkaXNwbGF5IG9iamVjdHMgYWJvdmUgdGhlIGNoaWxkIGluIHRoZVxyXG5cdCAqIERpc3BsYXlPYmplY3RDb250YWluZXIgYXJlIGRlY3JlYXNlZCBieSAxLlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIGdhcmJhZ2UgY29sbGVjdG9yIHJlYWxsb2NhdGVzIHVudXNlZCBtZW1vcnkgc3BhY2UuIFdoZW4gYSB2YXJpYWJsZVxyXG5cdCAqIG9yIG9iamVjdCBpcyBubyBsb25nZXIgYWN0aXZlbHkgcmVmZXJlbmNlZCBvciBzdG9yZWQgc29tZXdoZXJlLCB0aGVcclxuXHQgKiBnYXJiYWdlIGNvbGxlY3RvciBzd2VlcHMgdGhyb3VnaCBhbmQgd2lwZXMgb3V0IHRoZSBtZW1vcnkgc3BhY2UgaXQgdXNlZCB0b1xyXG5cdCAqIG9jY3VweSBpZiBubyBvdGhlciByZWZlcmVuY2VzIHRvIGl0IGV4aXN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBjaGlsZCBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byByZW1vdmUuXHJcblx0ICogQHJldHVybiBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0aGF0IHlvdSBwYXNzIGluIHRoZSA8Y29kZT5jaGlsZDwvY29kZT5cclxuXHQgKiAgICAgICAgIHBhcmFtZXRlci5cclxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhyb3dzIGlmIHRoZSBjaGlsZCBwYXJhbWV0ZXIgaXMgbm90IGEgY2hpbGQgb2YgdGhpc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIHJlbW92ZUNoaWxkKGNoaWxkOkRpc3BsYXlPYmplY3QpOkRpc3BsYXlPYmplY3RcclxuXHR7XHJcblx0XHRpZiAoY2hpbGQgPT0gbnVsbClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGFyYW1ldGVyIGNoaWxkIGNhbm5vdCBiZSBudWxsXCIpO1xyXG5cclxuXHRcdHRoaXMucmVtb3ZlQ2hpbGRJbnRlcm5hbChjaGlsZCk7XHJcblxyXG5cdFx0Y2hpbGQuaVNldFBhcmVudChudWxsKTtcclxuXHJcblx0XHRyZXR1cm4gY2hpbGQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGEgY2hpbGQgRGlzcGxheU9iamVjdCBmcm9tIHRoZSBzcGVjaWZpZWQgPGNvZGU+aW5kZXg8L2NvZGU+XHJcblx0ICogcG9zaXRpb24gaW4gdGhlIGNoaWxkIGxpc3Qgb2YgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXIuIFRoZVxyXG5cdCAqIDxjb2RlPnBhcmVudDwvY29kZT4gcHJvcGVydHkgb2YgdGhlIHJlbW92ZWQgY2hpbGQgaXMgc2V0IHRvXHJcblx0ICogPGNvZGU+bnVsbDwvY29kZT4sIGFuZCB0aGUgb2JqZWN0IGlzIGdhcmJhZ2UgY29sbGVjdGVkIGlmIG5vIG90aGVyXHJcblx0ICogcmVmZXJlbmNlcyB0byB0aGUgY2hpbGQgZXhpc3QuIFRoZSBpbmRleCBwb3NpdGlvbnMgb2YgYW55IGRpc3BsYXkgb2JqZWN0c1xyXG5cdCAqIGFib3ZlIHRoZSBjaGlsZCBpbiB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBhcmUgZGVjcmVhc2VkIGJ5IDEuXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgZ2FyYmFnZSBjb2xsZWN0b3IgcmVhbGxvY2F0ZXMgdW51c2VkIG1lbW9yeSBzcGFjZS4gV2hlbiBhIHZhcmlhYmxlXHJcblx0ICogb3Igb2JqZWN0IGlzIG5vIGxvbmdlciBhY3RpdmVseSByZWZlcmVuY2VkIG9yIHN0b3JlZCBzb21ld2hlcmUsIHRoZVxyXG5cdCAqIGdhcmJhZ2UgY29sbGVjdG9yIHN3ZWVwcyB0aHJvdWdoIGFuZCB3aXBlcyBvdXQgdGhlIG1lbW9yeSBzcGFjZSBpdCB1c2VkIHRvXHJcblx0ICogb2NjdXB5IGlmIG5vIG90aGVyIHJlZmVyZW5jZXMgdG8gaXQgZXhpc3QuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGluZGV4IFRoZSBjaGlsZCBpbmRleCBvZiB0aGUgRGlzcGxheU9iamVjdCB0byByZW1vdmUuXHJcblx0ICogQHJldHVybiBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0aGF0IHdhcyByZW1vdmVkLlxyXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciAgICBUaHJvd3MgaWYgdGhlIGluZGV4IGRvZXMgbm90IGV4aXN0IGluIHRoZSBjaGlsZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBsaXN0LlxyXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciBUaGlzIGNoaWxkIGRpc3BsYXkgb2JqZWN0IGJlbG9uZ3MgdG8gYSBzYW5kYm94IHRvXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHdoaWNoIHRoZSBjYWxsaW5nIG9iamVjdCBkb2VzIG5vdCBoYXZlIGFjY2Vzcy4gWW91XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGNhbiBhdm9pZCB0aGlzIHNpdHVhdGlvbiBieSBoYXZpbmcgdGhlIGNoaWxkIG1vdmllXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGNhbGwgdGhlIDxjb2RlPlNlY3VyaXR5LmFsbG93RG9tYWluKCk8L2NvZGU+IG1ldGhvZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgcmVtb3ZlQ2hpbGRBdChpbmRleDpudW1iZXIgLyppbnQqLyk6RGlzcGxheU9iamVjdFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuX2NoaWxkcmVuW2luZGV4XSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFsbCA8Y29kZT5jaGlsZDwvY29kZT4gRGlzcGxheU9iamVjdCBpbnN0YW5jZXMgZnJvbSB0aGUgY2hpbGQgbGlzdFxyXG5cdCAqIG9mIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlLiBUaGUgPGNvZGU+cGFyZW50PC9jb2RlPiBwcm9wZXJ0eVxyXG5cdCAqIG9mIHRoZSByZW1vdmVkIGNoaWxkcmVuIGlzIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPiwgYW5kIHRoZSBvYmplY3RzIGFyZVxyXG5cdCAqIGdhcmJhZ2UgY29sbGVjdGVkIGlmIG5vIG90aGVyIHJlZmVyZW5jZXMgdG8gdGhlIGNoaWxkcmVuIGV4aXN0LlxyXG5cdCAqXHJcblx0ICogVGhlIGdhcmJhZ2UgY29sbGVjdG9yIHJlYWxsb2NhdGVzIHVudXNlZCBtZW1vcnkgc3BhY2UuIFdoZW4gYSB2YXJpYWJsZSBvclxyXG5cdCAqIG9iamVjdCBpcyBubyBsb25nZXIgYWN0aXZlbHkgcmVmZXJlbmNlZCBvciBzdG9yZWQgc29tZXdoZXJlLCB0aGUgZ2FyYmFnZVxyXG5cdCAqIGNvbGxlY3RvciBzd2VlcHMgdGhyb3VnaCBhbmQgd2lwZXMgb3V0IHRoZSBtZW1vcnkgc3BhY2UgaXQgdXNlZCB0byBvY2N1cHlcclxuXHQgKiBpZiBubyBvdGhlciByZWZlcmVuY2VzIHRvIGl0IGV4aXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGJlZ2luSW5kZXggVGhlIGJlZ2lubmluZyBwb3NpdGlvbi4gQSB2YWx1ZSBzbWFsbGVyIHRoYW4gMCB0aHJvd3MgYSBSYW5nZUVycm9yLlxyXG5cdCAqIEBwYXJhbSBlbmRJbmRleCBUaGUgZW5kaW5nIHBvc2l0aW9uLiBBIHZhbHVlIHNtYWxsZXIgdGhhbiAwIHRocm93cyBhIFJhbmdlRXJyb3IuXHJcblx0ICogQHRocm93cyBSYW5nZUVycm9yICAgIFRocm93cyBpZiB0aGUgYmVnaW5JbmRleCBvciBlbmRJbmRleCBwb3NpdGlvbnMgZG9cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgbm90IGV4aXN0IGluIHRoZSBjaGlsZCBsaXN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZW1vdmVDaGlsZHJlbihiZWdpbkluZGV4Om51bWJlciAvKmludCovID0gMCwgZW5kSW5kZXg6bnVtYmVyIC8qaW50Ki8gPSAyMTQ3NDgzNjQ3KVxyXG5cdHtcclxuXHRcdGlmIChiZWdpbkluZGV4IDwgMClcclxuXHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJiZWdpbkluZGV4IGlzIG91dCBvZiByYW5nZSBvZiB0aGUgY2hpbGQgbGlzdFwiKTtcclxuXHJcblx0XHRpZiAoZW5kSW5kZXggPiB0aGlzLl9jaGlsZHJlbi5sZW5ndGgpXHJcblx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKFwiZW5kSW5kZXggaXMgb3V0IG9mIHJhbmdlIG9mIHRoZSBjaGlsZCBsaXN0XCIpO1xyXG5cclxuXHRcdGZvcih2YXIgaTpudW1iZXIgLyp1aW50Ki8gPSBiZWdpbkluZGV4OyBpIDwgZW5kSW5kZXg7IGkrKylcclxuXHRcdFx0dGhpcy5yZW1vdmVDaGlsZCh0aGlzLl9jaGlsZHJlbltpXSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSBwb3NpdGlvbiBvZiBhbiBleGlzdGluZyBjaGlsZCBpbiB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyLlxyXG5cdCAqIFRoaXMgYWZmZWN0cyB0aGUgbGF5ZXJpbmcgb2YgY2hpbGQgb2JqZWN0cy4gRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmdcclxuXHQgKiBleGFtcGxlIHNob3dzIHRocmVlIGRpc3BsYXkgb2JqZWN0cywgbGFiZWxlZCBhLCBiLCBhbmQgYywgYXQgaW5kZXhcclxuXHQgKiBwb3NpdGlvbnMgMCwgMSwgYW5kIDIsIHJlc3BlY3RpdmVseTpcclxuXHQgKlxyXG5cdCAqIDxwPldoZW4geW91IHVzZSB0aGUgPGNvZGU+c2V0Q2hpbGRJbmRleCgpPC9jb2RlPiBtZXRob2QgYW5kIHNwZWNpZnkgYW5cclxuXHQgKiBpbmRleCBwb3NpdGlvbiB0aGF0IGlzIGFscmVhZHkgb2NjdXBpZWQsIHRoZSBvbmx5IHBvc2l0aW9ucyB0aGF0IGNoYW5nZVxyXG5cdCAqIGFyZSB0aG9zZSBpbiBiZXR3ZWVuIHRoZSBkaXNwbGF5IG9iamVjdCdzIGZvcm1lciBhbmQgbmV3IHBvc2l0aW9uLiBBbGxcclxuXHQgKiBvdGhlcnMgd2lsbCBzdGF5IHRoZSBzYW1lLiBJZiBhIGNoaWxkIGlzIG1vdmVkIHRvIGFuIGluZGV4IExPV0VSIHRoYW4gaXRzXHJcblx0ICogY3VycmVudCBpbmRleCwgYWxsIGNoaWxkcmVuIGluIGJldHdlZW4gd2lsbCBJTkNSRUFTRSBieSAxIGZvciB0aGVpciBpbmRleFxyXG5cdCAqIHJlZmVyZW5jZS4gSWYgYSBjaGlsZCBpcyBtb3ZlZCB0byBhbiBpbmRleCBISUdIRVIgdGhhbiBpdHMgY3VycmVudCBpbmRleCxcclxuXHQgKiBhbGwgY2hpbGRyZW4gaW4gYmV0d2VlbiB3aWxsIERFQ1JFQVNFIGJ5IDEgZm9yIHRoZWlyIGluZGV4IHJlZmVyZW5jZS4gRm9yXHJcblx0ICogZXhhbXBsZSwgaWYgdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBpbiB0aGUgcHJldmlvdXMgZXhhbXBsZSBpcyBuYW1lZFxyXG5cdCAqIDxjb2RlPmNvbnRhaW5lcjwvY29kZT4sIHlvdSBjYW4gc3dhcCB0aGUgcG9zaXRpb24gb2YgdGhlIGRpc3BsYXkgb2JqZWN0c1xyXG5cdCAqIGxhYmVsZWQgYSBhbmQgYiBieSBjYWxsaW5nIHRoZSBmb2xsb3dpbmcgY29kZTo8L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UaGlzIGNvZGUgcmVzdWx0cyBpbiB0aGUgZm9sbG93aW5nIGFycmFuZ2VtZW50IG9mIG9iamVjdHM6PC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNoaWxkIFRoZSBjaGlsZCBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIGZvciB3aGljaCB5b3Ugd2FudCB0byBjaGFuZ2VcclxuXHQgKiAgICAgICAgICAgICAgdGhlIGluZGV4IG51bWJlci5cclxuXHQgKiBAcGFyYW0gaW5kZXggVGhlIHJlc3VsdGluZyBpbmRleCBudW1iZXIgZm9yIHRoZSA8Y29kZT5jaGlsZDwvY29kZT4gZGlzcGxheVxyXG5cdCAqICAgICAgICAgICAgICBvYmplY3QuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRocm93cyBpZiB0aGUgY2hpbGQgcGFyYW1ldGVyIGlzIG5vdCBhIGNoaWxkIG9mIHRoaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlxyXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciAgICBUaHJvd3MgaWYgdGhlIGluZGV4IGRvZXMgbm90IGV4aXN0IGluIHRoZSBjaGlsZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBsaXN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRDaGlsZEluZGV4KGNoaWxkOkRpc3BsYXlPYmplY3QsIGluZGV4Om51bWJlciAvKmludCovKVxyXG5cdHtcclxuXHRcdC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dhcHMgdGhlIHotb3JkZXIgKGZyb250LXRvLWJhY2sgb3JkZXIpIG9mIHRoZSB0d28gc3BlY2lmaWVkIGNoaWxkXHJcblx0ICogb2JqZWN0cy4gQWxsIG90aGVyIGNoaWxkIG9iamVjdHMgaW4gdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciByZW1haW4gaW5cclxuXHQgKiB0aGUgc2FtZSBpbmRleCBwb3NpdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gY2hpbGQxIFRoZSBmaXJzdCBjaGlsZCBvYmplY3QuXHJcblx0ICogQHBhcmFtIGNoaWxkMiBUaGUgc2Vjb25kIGNoaWxkIG9iamVjdC5cclxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhyb3dzIGlmIGVpdGhlciBjaGlsZCBwYXJhbWV0ZXIgaXMgbm90IGEgY2hpbGQgb2ZcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIHN3YXBDaGlsZHJlbihjaGlsZDE6RGlzcGxheU9iamVjdCwgY2hpbGQyOkRpc3BsYXlPYmplY3QpXHJcblx0e1xyXG5cdFx0Ly9UT0RPXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTd2FwcyB0aGUgei1vcmRlcihmcm9udC10by1iYWNrIG9yZGVyKSBvZiB0aGUgY2hpbGQgb2JqZWN0cyBhdCB0aGUgdHdvXHJcblx0ICogc3BlY2lmaWVkIGluZGV4IHBvc2l0aW9ucyBpbiB0aGUgY2hpbGQgbGlzdC4gQWxsIG90aGVyIGNoaWxkIG9iamVjdHMgaW5cclxuXHQgKiB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHJlbWFpbiBpbiB0aGUgc2FtZSBpbmRleCBwb3NpdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gaW5kZXgxIFRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgY2hpbGQgb2JqZWN0LlxyXG5cdCAqIEBwYXJhbSBpbmRleDIgVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBzZWNvbmQgY2hpbGQgb2JqZWN0LlxyXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciBJZiBlaXRoZXIgaW5kZXggZG9lcyBub3QgZXhpc3QgaW4gdGhlIGNoaWxkIGxpc3QuXHJcblx0ICovXHJcblx0cHVibGljIHN3YXBDaGlsZHJlbkF0KGluZGV4MTpudW1iZXIgLyppbnQqLywgaW5kZXgyOm51bWJlciAvKmludCovKVxyXG5cdHtcclxuXHRcdC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKClcclxuXHR7XHJcblx0XHRzdXBlci5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcclxuXHRcdFx0dGhpcy5fY2hpbGRyZW5baV0ucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0c3VwZXIuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh2YWx1ZSk7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcclxuXHRcdFx0dGhpcy5fY2hpbGRyZW5baV0uX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh0aGlzLl9tb3VzZUNoaWxkcmVuKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRzdXBlci5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSh2YWx1ZSk7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcclxuXHRcdFx0dGhpcy5fY2hpbGRyZW5baV0uX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodGhpcy5fcEltcGxpY2l0VmlzaWJpbGl0eSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIF9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24odmFsdWU6UGFydGl0aW9uLCBzY2VuZTpTY2VuZSlcclxuXHR7XHJcblx0XHRzdXBlci5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHZhbHVlLCBzY2VuZSk7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcclxuXHRcdFx0dGhpcy5fY2hpbGRyZW5baV0uX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24sIHNjZW5lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gY2hpbGRcclxuXHQgKi9cclxuXHRwcml2YXRlIHJlbW92ZUNoaWxkSW50ZXJuYWwoY2hpbGQ6RGlzcGxheU9iamVjdCk6RGlzcGxheU9iamVjdFxyXG5cdHtcclxuXHRcdHRoaXMuX2NoaWxkcmVuLnNwbGljZSh0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQpLCAxKTtcclxuXHJcblx0XHRyZXR1cm4gY2hpbGQ7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyOyJdfQ==