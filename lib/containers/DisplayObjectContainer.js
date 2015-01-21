var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
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
            return AssetType.CONTAINER;
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
    DisplayObjectContainer.prototype._pUpdateScene = function (value) {
        _super.prototype._pUpdateScene.call(this, value);
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i]._pUpdateScene(value);
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
    DisplayObjectContainer.prototype._pUpdateImplicitPartition = function (value) {
        _super.prototype._pUpdateImplicitPartition.call(this, value);
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i]._pUpdateImplicitPartition(this._pImplicitPartition);
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
    return DisplayObjectContainer;
})(DisplayObject);
module.exports = DisplayObjectContainer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL0Rpc3BsYXlPYmplY3RDb250YWluZXIudHMiXSwibmFtZXMiOlsiRGlzcGxheU9iamVjdENvbnRhaW5lciIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuY29uc3RydWN0b3IiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFzc2V0VHlwZSIsIkRpc3BsYXlPYmplY3RDb250YWluZXIubW91c2VDaGlsZHJlbiIsIkRpc3BsYXlPYmplY3RDb250YWluZXIubnVtQ2hpbGRyZW4iLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZEF0IiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZHJlbiIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuY2xvbmUiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmNvbnRhaW5zIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5kaXNwb3NlV2l0aENoaWxkcmVuIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5nZXRDaGlsZEF0IiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZSIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuZ2V0Q2hpbGRJbmRleCIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuZ2V0T2JqZWN0c1VuZGVyUG9pbnQiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnJlbW92ZUNoaWxkIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5yZW1vdmVDaGlsZEF0IiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5yZW1vdmVDaGlsZHJlbiIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuc2V0Q2hpbGRJbmRleCIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuc3dhcENoaWxkcmVuIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5zd2FwQ2hpbGRyZW5BdCIsIkRpc3BsYXlPYmplY3RDb250YWluZXIucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuX3BVcGRhdGVTY2VuZSIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnJlbW92ZUNoaWxkSW50ZXJuYWwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sU0FBUyxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFFcEUsSUFBTyxhQUFhLFdBQWMsc0NBQXNDLENBQUMsQ0FBQztBQUMxRSxJQUFPLEtBQUssV0FBZ0IsOEJBQThCLENBQUMsQ0FBQztBQUM1RCxJQUFPLFVBQVUsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBRXJFLElBQU8sYUFBYSxXQUFjLHVDQUF1QyxDQUFDLENBQUM7QUFJM0UsQUFxQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxzQkFBc0I7SUFBU0EsVUFBL0JBLHNCQUFzQkEsVUFBc0JBO0lBeUVqREE7Ozs7Ozs7OztPQVNHQTtJQUNIQSxTQW5GS0Esc0JBQXNCQTtRQXFGMUJDLGlCQUFPQSxDQUFDQTtRQW5GREEsbUJBQWNBLEdBQVdBLElBQUlBLENBQUNBO1FBQzlCQSxjQUFTQSxHQUF3QkEsSUFBSUEsS0FBS0EsRUFBaUJBLENBQUNBO0lBbUZwRUEsQ0FBQ0E7SUE3RURELHNCQUFXQSw2Q0FBU0E7UUFIcEJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7OztPQUFBRjtJQXVCREEsc0JBQVdBLGlEQUFhQTtRQXJCeEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW9CR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FB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R0EsR0FBVUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDdkNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLEVBQUVBLENBQUNBO1lBQ2xDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSx5QkFBeUJBLENBQUNBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7SUFDeEVBLENBQUNBO0lBRUR6Qjs7OztPQUlHQTtJQUNLQSxvREFBbUJBLEdBQTNCQSxVQUE0QkEsS0FBbUJBO1FBRTlDMEIsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFcERBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO0lBQ2RBLENBQUNBO0lBQ0YxQiw2QkFBQ0E7QUFBREEsQ0EvZ0JBLEFBK2dCQ0EsRUEvZ0JvQyxhQUFhLEVBK2dCakQ7QUFFRCxBQUFnQyxpQkFBdkIsc0JBQXNCLENBQUMiLCJmaWxlIjoiY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb2ludFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BvaW50XCIpO1xuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IEFyZ3VtZW50RXJyb3JcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQXJndW1lbnRFcnJvclwiKTtcbmltcG9ydCBFcnJvclx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvRXJyb3JcIik7XG5pbXBvcnQgUmFuZ2VFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL1JhbmdlRXJyb3JcIik7XG5cbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IFBhcnRpdGlvblx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL1BhcnRpdGlvblwiKTtcbmltcG9ydCBTY2VuZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1NjZW5lXCIpO1xuXG4vKipcbiAqIFRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgb2JqZWN0cyB0aGF0IGNhblxuICogc2VydmUgYXMgZGlzcGxheSBvYmplY3QgY29udGFpbmVycyBvbiB0aGUgZGlzcGxheSBsaXN0LiBUaGUgZGlzcGxheSBsaXN0XG4gKiBtYW5hZ2VzIGFsbCBvYmplY3RzIGRpc3BsYXllZCBpbiB0aGUgRmxhc2ggcnVudGltZXMuIFVzZSB0aGVcbiAqIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgdG8gYXJyYW5nZSB0aGUgZGlzcGxheSBvYmplY3RzIGluIHRoZSBkaXNwbGF5XG4gKiBsaXN0LiBFYWNoIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IGhhcyBpdHMgb3duIGNoaWxkIGxpc3QgZm9yXG4gKiBvcmdhbml6aW5nIHRoZSB6LW9yZGVyIG9mIHRoZSBvYmplY3RzLiBUaGUgei1vcmRlciBpcyB0aGUgZnJvbnQtdG8tYmFja1xuICogb3JkZXIgdGhhdCBkZXRlcm1pbmVzIHdoaWNoIG9iamVjdCBpcyBkcmF3biBpbiBmcm9udCwgd2hpY2ggaXMgYmVoaW5kLCBhbmRcbiAqIHNvIG9uLlxuICpcbiAqIDxwPkRpc3BsYXlPYmplY3QgaXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzczsgdGhlcmVmb3JlLCB5b3UgY2Fubm90IGNhbGxcbiAqIERpc3BsYXlPYmplY3QgZGlyZWN0bHkuIEludm9raW5nIDxjb2RlPm5ldyBEaXNwbGF5T2JqZWN0KCk8L2NvZGU+IHRocm93cyBhblxuICogPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT4gZXhjZXB0aW9uLjwvcD5cbiAqIFRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIGlzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIGFsbCBvYmplY3RzXG4gKiB0aGF0IGNhbiBjb250YWluIGNoaWxkIG9iamVjdHMuIEl0IGNhbm5vdCBiZSBpbnN0YW50aWF0ZWQgZGlyZWN0bHk7IGNhbGxpbmdcbiAqIHRoZSA8Y29kZT5uZXcgRGlzcGxheU9iamVjdENvbnRhaW5lcigpPC9jb2RlPiBjb25zdHJ1Y3RvciB0aHJvd3MgYW5cbiAqIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+IGV4Y2VwdGlvbi5cbiAqXG4gKiA8cD5Gb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBcIkRpc3BsYXkgUHJvZ3JhbW1pbmdcIiBjaGFwdGVyIG9mIHRoZVxuICogPGk+QWN0aW9uU2NyaXB0IDMuMCBEZXZlbG9wZXIncyBHdWlkZTwvaT4uPC9wPlxuICovXG5jbGFzcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGV4dGVuZHMgRGlzcGxheU9iamVjdCBpbXBsZW1lbnRzIElBc3NldFxue1xuXHRwcml2YXRlIF9tb3VzZUNoaWxkcmVuOmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9jaGlsZHJlbjpBcnJheTxEaXNwbGF5T2JqZWN0PiA9IG5ldyBBcnJheTxEaXNwbGF5T2JqZWN0PigpO1xuXHRwdWJsaWMgX2lJc1Jvb3Q6Ym9vbGVhbjtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLkNPTlRBSU5FUjtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBjaGlsZHJlbiBvZiB0aGUgb2JqZWN0IGFyZSBtb3VzZSwgb3IgdXNlclxuXHQgKiBpbnB1dCBkZXZpY2UsIGVuYWJsZWQuIElmIGFuIG9iamVjdCBpcyBlbmFibGVkLCBhIHVzZXIgY2FuIGludGVyYWN0IHdpdGhcblx0ICogaXQgYnkgdXNpbmcgYSBtb3VzZSBvciB1c2VyIGlucHV0IGRldmljZS4gVGhlIGRlZmF1bHQgaXNcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPlRoaXMgcHJvcGVydHkgaXMgdXNlZnVsIHdoZW4geW91IGNyZWF0ZSBhIGJ1dHRvbiB3aXRoIGFuIGluc3RhbmNlIG9mXG5cdCAqIHRoZSBTcHJpdGUgY2xhc3MoaW5zdGVhZCBvZiB1c2luZyB0aGUgU2ltcGxlQnV0dG9uIGNsYXNzKS4gV2hlbiB5b3UgdXNlIGFcblx0ICogU3ByaXRlIGluc3RhbmNlIHRvIGNyZWF0ZSBhIGJ1dHRvbiwgeW91IGNhbiBjaG9vc2UgdG8gZGVjb3JhdGUgdGhlIGJ1dHRvblxuXHQgKiBieSB1c2luZyB0aGUgPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4gbWV0aG9kIHRvIGFkZCBhZGRpdGlvbmFsIFNwcml0ZVxuXHQgKiBpbnN0YW5jZXMuIFRoaXMgcHJvY2VzcyBjYW4gY2F1c2UgdW5leHBlY3RlZCBiZWhhdmlvciB3aXRoIG1vdXNlIGV2ZW50c1xuXHQgKiBiZWNhdXNlIHRoZSBTcHJpdGUgaW5zdGFuY2VzIHlvdSBhZGQgYXMgY2hpbGRyZW4gY2FuIGJlY29tZSB0aGUgdGFyZ2V0XG5cdCAqIG9iamVjdCBvZiBhIG1vdXNlIGV2ZW50IHdoZW4geW91IGV4cGVjdCB0aGUgcGFyZW50IGluc3RhbmNlIHRvIGJlIHRoZVxuXHQgKiB0YXJnZXQgb2JqZWN0LiBUbyBlbnN1cmUgdGhhdCB0aGUgcGFyZW50IGluc3RhbmNlIHNlcnZlcyBhcyB0aGUgdGFyZ2V0XG5cdCAqIG9iamVjdHMgZm9yIG1vdXNlIGV2ZW50cywgeW91IGNhbiBzZXQgdGhlIDxjb2RlPm1vdXNlQ2hpbGRyZW48L2NvZGU+XG5cdCAqIHByb3BlcnR5IG9mIHRoZSBwYXJlbnQgaW5zdGFuY2UgdG8gPGNvZGU+ZmFsc2U8L2NvZGU+LjwvcD5cblx0ICpcblx0ICogPHA+IE5vIGV2ZW50IGlzIGRpc3BhdGNoZWQgYnkgc2V0dGluZyB0aGlzIHByb3BlcnR5LiBZb3UgbXVzdCB1c2UgdGhlXG5cdCAqIDxjb2RlPmFkZEV2ZW50TGlzdGVuZXIoKTwvY29kZT4gbWV0aG9kIHRvIGNyZWF0ZSBpbnRlcmFjdGl2ZVxuXHQgKiBmdW5jdGlvbmFsaXR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgbW91c2VDaGlsZHJlbigpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9tb3VzZUNoaWxkcmVuO1xuXHR9XG5cblx0cHVibGljIHNldCBtb3VzZUNoaWxkcmVuKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fbW91c2VDaGlsZHJlbiA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX21vdXNlQ2hpbGRyZW4gPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh0aGlzLl9wUGFyZW50PyB0aGlzLl9wUGFyZW50Lm1vdXNlQ2hpbGRyZW4gOiB0cnVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gb2YgdGhpcyBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG51bUNoaWxkcmVuKCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7XG5cdH1cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBjaGlsZHJlbiBvZiB0aGUgb2JqZWN0IGFyZSB0YWIgZW5hYmxlZC4gRW5hYmxlcyBvclxuXHQgKiBkaXNhYmxlcyB0YWJiaW5nIGZvciB0aGUgY2hpbGRyZW4gb2YgdGhlIG9iamVjdC4gVGhlIGRlZmF1bHQgaXNcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBEbyBub3QgdXNlIHRoZSA8Y29kZT50YWJDaGlsZHJlbjwvY29kZT4gcHJvcGVydHkgd2l0aFxuXHQgKiBGbGV4LiBJbnN0ZWFkLCB1c2UgdGhlXG5cdCAqIDxjb2RlPm14LmNvcmUuVUlDb21wb25lbnQuaGFzRm9jdXNhYmxlQ2hpbGRyZW48L2NvZGU+IHByb3BlcnR5LjwvcD5cblx0ICpcblx0ICogQHRocm93cyBJbGxlZ2FsT3BlcmF0aW9uRXJyb3IgQ2FsbGluZyB0aGlzIHByb3BlcnR5IG9mIHRoZSBTdGFnZSBvYmplY3Rcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3dzIGFuIGV4Y2VwdGlvbi4gVGhlIFN0YWdlIG9iamVjdCBkb2VzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdCBpbXBsZW1lbnQgdGhpcyBwcm9wZXJ0eS5cblx0ICovXG5cdHB1YmxpYyB0YWJDaGlsZHJlbjpib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBDYWxsaW5nIHRoZSA8Y29kZT5uZXcgRGlzcGxheU9iamVjdENvbnRhaW5lcigpPC9jb2RlPiBjb25zdHJ1Y3RvciB0aHJvd3Ncblx0ICogYW4gPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT4gZXhjZXB0aW9uLiBZb3UgPGk+Y2FuPC9pPiwgaG93ZXZlciwgY2FsbFxuXHQgKiBjb25zdHJ1Y3RvcnMgZm9yIHRoZSBmb2xsb3dpbmcgc3ViY2xhc3NlcyBvZiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyOlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPjxjb2RlPm5ldyBMb2FkZXIoKTwvY29kZT48L2xpPlxuXHQgKiAgIDxsaT48Y29kZT5uZXcgU3ByaXRlKCk8L2NvZGU+PC9saT5cblx0ICogICA8bGk+PGNvZGU+bmV3IE1vdmllQ2xpcCgpPC9jb2RlPjwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZHMgYSBjaGlsZCBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIHRoaXMgRGlzcGxheU9iamVjdENvbnRhaW5lclxuXHQgKiBpbnN0YW5jZS4gVGhlIGNoaWxkIGlzIGFkZGVkIHRvIHRoZSBmcm9udCh0b3ApIG9mIGFsbCBvdGhlciBjaGlsZHJlbiBpblxuXHQgKiB0aGlzIERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UuKFRvIGFkZCBhIGNoaWxkIHRvIGEgc3BlY2lmaWMgaW5kZXhcblx0ICogcG9zaXRpb24sIHVzZSB0aGUgPGNvZGU+YWRkQ2hpbGRBdCgpPC9jb2RlPiBtZXRob2QuKVxuXHQgKlxuXHQgKiA8cD5JZiB5b3UgYWRkIGEgY2hpbGQgb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgYSBkaWZmZXJlbnQgZGlzcGxheSBvYmplY3Rcblx0ICogY29udGFpbmVyIGFzIGEgcGFyZW50LCB0aGUgb2JqZWN0IGlzIHJlbW92ZWQgZnJvbSB0aGUgY2hpbGQgbGlzdCBvZiB0aGVcblx0ICogb3RoZXIgZGlzcGxheSBvYmplY3QgY29udGFpbmVyLiA8L3A+XG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBUaGUgY29tbWFuZCA8Y29kZT5zdGFnZS5hZGRDaGlsZCgpPC9jb2RlPiBjYW4gY2F1c2Vcblx0ICogcHJvYmxlbXMgd2l0aCBhIHB1Ymxpc2hlZCBTV0YgZmlsZSwgaW5jbHVkaW5nIHNlY3VyaXR5IHByb2JsZW1zIGFuZFxuXHQgKiBjb25mbGljdHMgd2l0aCBvdGhlciBsb2FkZWQgU1dGIGZpbGVzLiBUaGVyZSBpcyBvbmx5IG9uZSBTdGFnZSB3aXRoaW4gYVxuXHQgKiBGbGFzaCBydW50aW1lIGluc3RhbmNlLCBubyBtYXR0ZXIgaG93IG1hbnkgU1dGIGZpbGVzIHlvdSBsb2FkIGludG8gdGhlXG5cdCAqIHJ1bnRpbWUuIFNvLCBnZW5lcmFsbHksIG9iamVjdHMgc2hvdWxkIG5vdCBiZSBhZGRlZCB0byB0aGUgU3RhZ2UsXG5cdCAqIGRpcmVjdGx5LCBhdCBhbGwuIFRoZSBvbmx5IG9iamVjdCB0aGUgU3RhZ2Ugc2hvdWxkIGNvbnRhaW4gaXMgdGhlIHJvb3Rcblx0ICogb2JqZWN0LiBDcmVhdGUgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHRvIGNvbnRhaW4gYWxsIG9mIHRoZSBpdGVtcyBvbiB0aGVcblx0ICogZGlzcGxheSBsaXN0LiBUaGVuLCBpZiBuZWNlc3NhcnksIGFkZCB0aGF0IERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2Vcblx0ICogdG8gdGhlIFN0YWdlLjwvcD5cblx0ICpcblx0ICogQHBhcmFtIGNoaWxkIFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIGFkZCBhcyBhIGNoaWxkIG9mIHRoaXNcblx0ICogICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UuXG5cdCAqIEByZXR1cm4gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdGhhdCB5b3UgcGFzcyBpbiB0aGUgPGNvZGU+Y2hpbGQ8L2NvZGU+XG5cdCAqICAgICAgICAgcGFyYW1ldGVyLlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhyb3dzIGlmIHRoZSBjaGlsZCBpcyB0aGUgc2FtZSBhcyB0aGUgcGFyZW50LiBBbHNvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aHJvd3MgaWYgdGhlIGNhbGxlciBpcyBhIGNoaWxkKG9yIGdyYW5kY2hpbGQgZXRjLilcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9mIHRoZSBjaGlsZCBiZWluZyBhZGRlZC5cblx0ICogQGV2ZW50IGFkZGVkIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZSBkaXNwbGF5XG5cdCAqICAgICAgICAgICAgICBsaXN0LlxuXHQgKi9cblx0cHVibGljIGFkZENoaWxkKGNoaWxkOkRpc3BsYXlPYmplY3QpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdGlmIChjaGlsZCA9PSBudWxsKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGFyYW1ldGVyIGNoaWxkIGNhbm5vdCBiZSBudWxsLlwiKTtcblxuXHRcdC8vaWYgY2hpbGQgYWxyZWFkeSBoYXMgYSBwYXJlbnQsIHJlbW92ZSBpdC5cblx0XHRpZiAoY2hpbGQuX3BQYXJlbnQpXG5cdFx0XHRjaGlsZC5fcFBhcmVudC5yZW1vdmVDaGlsZEludGVybmFsKGNoaWxkKTtcblxuXHRcdGNoaWxkLmlTZXRQYXJlbnQodGhpcyk7XG5cblx0XHR0aGlzLl9jaGlsZHJlbi5wdXNoKGNoaWxkKTtcblxuXHRcdHJldHVybiBjaGlsZDtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEFkZHMgYSBjaGlsZCBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIHRoaXMgRGlzcGxheU9iamVjdENvbnRhaW5lclxuXHQgKiBpbnN0YW5jZS4gVGhlIGNoaWxkIGlzIGFkZGVkIGF0IHRoZSBpbmRleCBwb3NpdGlvbiBzcGVjaWZpZWQuIEFuIGluZGV4IG9mXG5cdCAqIDAgcmVwcmVzZW50cyB0aGUgYmFjayhib3R0b20pIG9mIHRoZSBkaXNwbGF5IGxpc3QgZm9yIHRoaXNcblx0ICogRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QuXG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCB0aGUgZm9sbG93aW5nIGV4YW1wbGUgc2hvd3MgdGhyZWUgZGlzcGxheSBvYmplY3RzLCBsYWJlbGVkXG5cdCAqIGEsIGIsIGFuZCBjLCBhdCBpbmRleCBwb3NpdGlvbnMgMCwgMiwgYW5kIDEsIHJlc3BlY3RpdmVseTo8L3A+XG5cdCAqXG5cdCAqIDxwPklmIHlvdSBhZGQgYSBjaGlsZCBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBhIGRpZmZlcmVudCBkaXNwbGF5IG9iamVjdFxuXHQgKiBjb250YWluZXIgYXMgYSBwYXJlbnQsIHRoZSBvYmplY3QgaXMgcmVtb3ZlZCBmcm9tIHRoZSBjaGlsZCBsaXN0IG9mIHRoZVxuXHQgKiBvdGhlciBkaXNwbGF5IG9iamVjdCBjb250YWluZXIuIDwvcD5cblx0ICpcblx0ICogQHBhcmFtIGNoaWxkIFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIGFkZCBhcyBhIGNoaWxkIG9mIHRoaXNcblx0ICogICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UuXG5cdCAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggcG9zaXRpb24gdG8gd2hpY2ggdGhlIGNoaWxkIGlzIGFkZGVkLiBJZiB5b3Vcblx0ICogICAgICAgICAgICAgIHNwZWNpZnkgYSBjdXJyZW50bHkgb2NjdXBpZWQgaW5kZXggcG9zaXRpb24sIHRoZSBjaGlsZCBvYmplY3Rcblx0ICogICAgICAgICAgICAgIHRoYXQgZXhpc3RzIGF0IHRoYXQgcG9zaXRpb24gYW5kIGFsbCBoaWdoZXIgcG9zaXRpb25zIGFyZVxuXHQgKiAgICAgICAgICAgICAgbW92ZWQgdXAgb25lIHBvc2l0aW9uIGluIHRoZSBjaGlsZCBsaXN0LlxuXHQgKiBAcmV0dXJuIFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRoYXQgeW91IHBhc3MgaW4gdGhlIDxjb2RlPmNoaWxkPC9jb2RlPlxuXHQgKiAgICAgICAgIHBhcmFtZXRlci5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRocm93cyBpZiB0aGUgY2hpbGQgaXMgdGhlIHNhbWUgYXMgdGhlIHBhcmVudC4gQWxzb1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhyb3dzIGlmIHRoZSBjYWxsZXIgaXMgYSBjaGlsZChvciBncmFuZGNoaWxkIGV0Yy4pXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBvZiB0aGUgY2hpbGQgYmVpbmcgYWRkZWQuXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciAgICBUaHJvd3MgaWYgdGhlIGluZGV4IHBvc2l0aW9uIGRvZXMgbm90IGV4aXN0IGluIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQgbGlzdC5cblx0ICogQGV2ZW50IGFkZGVkIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZSBkaXNwbGF5XG5cdCAqICAgICAgICAgICAgICBsaXN0LlxuXHQgKi9cblx0cHVibGljIGFkZENoaWxkQXQoY2hpbGQ6RGlzcGxheU9iamVjdCwgaW5kZXg6bnVtYmVyIC8qaW50Ki8pOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHJldHVybiBjaGlsZDtcblx0fVxuXG5cdHB1YmxpYyBhZGRDaGlsZHJlbiguLi5jaGlsZGFycmF5OkFycmF5PERpc3BsYXlPYmplY3Q+KVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSBjaGlsZGFycmF5Lmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCAgbGVuOyBpKyspXG5cdFx0XHR0aGlzLmFkZENoaWxkKGNoaWxkYXJyYXlbaV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgY2xvbmUoKTpEaXNwbGF5T2JqZWN0XG5cdHtcblx0XHR2YXIgY2xvbmU6RGlzcGxheU9iamVjdENvbnRhaW5lciA9IG5ldyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyKCk7XG5cdFx0Y2xvbmUucGl2b3QgPSB0aGlzLnBpdm90O1xuXHRcdGNsb25lLl9pTWF0cml4M0QgPSB0aGlzLl9pTWF0cml4M0Q7XG5cdFx0Y2xvbmUucGFydGl0aW9uID0gdGhpcy5wYXJ0aXRpb247XG5cdFx0Y2xvbmUubmFtZSA9IG5hbWU7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcblx0XHRcdGNsb25lLmFkZENoaWxkKHRoaXMuX2NoaWxkcmVuW2ldLmNsb25lKCkpO1xuXG5cdFx0Ly8gdG9kbzogaW1wbGVtZW50IGZvciBhbGwgc3VidHlwZXNcblx0XHRyZXR1cm4gY2xvbmU7XG5cdH1cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgZGlzcGxheSBvYmplY3QgaXMgYSBjaGlsZCBvZiB0aGVcblx0ICogRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZSBvciB0aGUgaW5zdGFuY2UgaXRzZWxmLiBUaGUgc2VhcmNoXG5cdCAqIGluY2x1ZGVzIHRoZSBlbnRpcmUgZGlzcGxheSBsaXN0IGluY2x1ZGluZyB0aGlzIERpc3BsYXlPYmplY3RDb250YWluZXJcblx0ICogaW5zdGFuY2UuIEdyYW5kY2hpbGRyZW4sIGdyZWF0LWdyYW5kY2hpbGRyZW4sIGFuZCBzbyBvbiBlYWNoIHJldHVyblxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPi5cblx0ICpcblx0ICogQHBhcmFtIGNoaWxkIFRoZSBjaGlsZCBvYmplY3QgdG8gdGVzdC5cblx0ICogQHJldHVybiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgPGNvZGU+Y2hpbGQ8L2NvZGU+IG9iamVjdCBpcyBhIGNoaWxkIG9mXG5cdCAqICAgICAgICAgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgb3IgdGhlIGNvbnRhaW5lciBpdHNlbGY7IG90aGVyd2lzZVxuXHQgKiAgICAgICAgIDxjb2RlPmZhbHNlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBjb250YWlucyhjaGlsZDpEaXNwbGF5T2JqZWN0KTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY2hpbGRyZW4uaW5kZXhPZihjaGlsZCkgPj0gMDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2VXaXRoQ2hpbGRyZW4oKVxuXHR7XG5cdFx0dGhpcy5kaXNwb3NlKCk7XG5cblx0XHR3aGlsZSAodGhpcy5udW1DaGlsZHJlbiA+IDApXG5cdFx0XHR0aGlzLmdldENoaWxkQXQoMCkuZGlzcG9zZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IGluc3RhbmNlIHRoYXQgZXhpc3RzIGF0IHRoZSBzcGVjaWZpZWRcblx0ICogaW5kZXguXG5cdCAqXG5cdCAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIGNoaWxkIG9iamVjdC5cblx0ICogQHJldHVybiBUaGUgY2hpbGQgZGlzcGxheSBvYmplY3QgYXQgdGhlIHNwZWNpZmllZCBpbmRleCBwb3NpdGlvbi5cblx0ICogQHRocm93cyBSYW5nZUVycm9yICAgIFRocm93cyBpZiB0aGUgaW5kZXggZG9lcyBub3QgZXhpc3QgaW4gdGhlIGNoaWxkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBsaXN0LlxuXHQgKi9cblx0cHVibGljIGdldENoaWxkQXQoaW5kZXg6bnVtYmVyIC8qaW50Ki8pOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHZhciBjaGlsZDpEaXNwbGF5T2JqZWN0ID0gdGhpcy5fY2hpbGRyZW5baW5kZXhdO1xuXG5cdFx0aWYgKGNoaWxkID09IG51bGwpXG5cdFx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkluZGV4IGRvZXMgbm90IGV4aXN0IGluIHRoZSBjaGlsZCBsaXN0IG9mIHRoZSBjYWxsZXJcIik7XG5cblx0XHRyZXR1cm4gY2hpbGQ7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgY2hpbGQgZGlzcGxheSBvYmplY3QgdGhhdCBleGlzdHMgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUuIElmXG5cdCAqIG1vcmUgdGhhdCBvbmUgY2hpbGQgZGlzcGxheSBvYmplY3QgaGFzIHRoZSBzcGVjaWZpZWQgbmFtZSwgdGhlIG1ldGhvZFxuXHQgKiByZXR1cm5zIHRoZSBmaXJzdCBvYmplY3QgaW4gdGhlIGNoaWxkIGxpc3QuXG5cdCAqXG5cdCAqIDxwPlRoZSA8Y29kZT5nZXRDaGlsZEF0KCk8L2NvZGU+IG1ldGhvZCBpcyBmYXN0ZXIgdGhhbiB0aGVcblx0ICogPGNvZGU+Z2V0Q2hpbGRCeU5hbWUoKTwvY29kZT4gbWV0aG9kLiBUaGUgPGNvZGU+Z2V0Q2hpbGRBdCgpPC9jb2RlPiBtZXRob2Rcblx0ICogYWNjZXNzZXMgYSBjaGlsZCBmcm9tIGEgY2FjaGVkIGFycmF5LCB3aGVyZWFzIHRoZVxuXHQgKiA8Y29kZT5nZXRDaGlsZEJ5TmFtZSgpPC9jb2RlPiBtZXRob2QgaGFzIHRvIHRyYXZlcnNlIGEgbGlua2VkIGxpc3QgdG9cblx0ICogYWNjZXNzIGEgY2hpbGQuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgY2hpbGQgdG8gcmV0dXJuLlxuXHQgKiBAcmV0dXJuIFRoZSBjaGlsZCBkaXNwbGF5IG9iamVjdCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZS5cblx0ICovXG5cdHB1YmxpYyBnZXRDaGlsZEJ5TmFtZShuYW1lOnN0cmluZyk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXG5cdFx0XHRpZiAodGhpcy5fY2hpbGRyZW5baV0ubmFtZSA9PSBuYW1lKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fY2hpbGRyZW5baV07XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBpbmRleCBwb3NpdGlvbiBvZiBhIDxjb2RlPmNoaWxkPC9jb2RlPiBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAcGFyYW0gY2hpbGQgVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gaWRlbnRpZnkuXG5cdCAqIEByZXR1cm4gVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBjaGlsZCBkaXNwbGF5IG9iamVjdCB0byBpZGVudGlmeS5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRocm93cyBpZiB0aGUgY2hpbGQgcGFyYW1ldGVyIGlzIG5vdCBhIGNoaWxkIG9mIHRoaXNcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBnZXRDaGlsZEluZGV4KGNoaWxkOkRpc3BsYXlPYmplY3QpOm51bWJlciAvKmludCovXG5cdHtcblx0XHR2YXIgY2hpbGRJbmRleDpudW1iZXIgPSB0aGlzLl9jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcblxuXHRcdGlmIChjaGlsZEluZGV4ID09IC0xKVxuXHRcdFx0dGhyb3cgbmV3IEFyZ3VtZW50RXJyb3IoXCJDaGlsZCBwYXJhbWV0ZXIgaXMgbm90IGEgY2hpbGQgb2YgdGhlIGNhbGxlclwiKTtcblxuXHRcdHJldHVybiBjaGlsZEluZGV4O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gYXJyYXkgb2Ygb2JqZWN0cyB0aGF0IGxpZSB1bmRlciB0aGUgc3BlY2lmaWVkIHBvaW50IGFuZCBhcmVcblx0ICogY2hpbGRyZW4ob3IgZ3JhbmRjaGlsZHJlbiwgYW5kIHNvIG9uKSBvZiB0aGlzIERpc3BsYXlPYmplY3RDb250YWluZXJcblx0ICogaW5zdGFuY2UuIEFueSBjaGlsZCBvYmplY3RzIHRoYXQgYXJlIGluYWNjZXNzaWJsZSBmb3Igc2VjdXJpdHkgcmVhc29ucyBhcmVcblx0ICogb21pdHRlZCBmcm9tIHRoZSByZXR1cm5lZCBhcnJheS4gVG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBzZWN1cml0eVxuXHQgKiByZXN0cmljdGlvbiBhZmZlY3RzIHRoZSByZXR1cm5lZCBhcnJheSwgY2FsbCB0aGVcblx0ICogPGNvZGU+YXJlSW5hY2Nlc3NpYmxlT2JqZWN0c1VuZGVyUG9pbnQoKTwvY29kZT4gbWV0aG9kLlxuXHQgKlxuXHQgKiA8cD5UaGUgPGNvZGU+cG9pbnQ8L2NvZGU+IHBhcmFtZXRlciBpcyBpbiB0aGUgY29vcmRpbmF0ZSBzcGFjZSBvZiB0aGVcblx0ICogU3RhZ2UsIHdoaWNoIG1heSBkaWZmZXIgZnJvbSB0aGUgY29vcmRpbmF0ZSBzcGFjZSBvZiB0aGUgZGlzcGxheSBvYmplY3Rcblx0ICogY29udGFpbmVyKHVubGVzcyB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIGlzIHRoZSBTdGFnZSkuIFlvdSBjYW4gdXNlXG5cdCAqIHRoZSA8Y29kZT5nbG9iYWxUb0xvY2FsKCk8L2NvZGU+IGFuZCB0aGUgPGNvZGU+bG9jYWxUb0dsb2JhbCgpPC9jb2RlPlxuXHQgKiBtZXRob2RzIHRvIGNvbnZlcnQgcG9pbnRzIGJldHdlZW4gdGhlc2UgY29vcmRpbmF0ZSBzcGFjZXMuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9pbnQgVGhlIHBvaW50IHVuZGVyIHdoaWNoIHRvIGxvb2suXG5cdCAqIEByZXR1cm4gQW4gYXJyYXkgb2Ygb2JqZWN0cyB0aGF0IGxpZSB1bmRlciB0aGUgc3BlY2lmaWVkIHBvaW50IGFuZCBhcmVcblx0ICogICAgICAgICBjaGlsZHJlbihvciBncmFuZGNoaWxkcmVuLCBhbmQgc28gb24pIG9mIHRoaXNcblx0ICogICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlLlxuXHQgKi9cblx0cHVibGljIGdldE9iamVjdHNVbmRlclBvaW50KHBvaW50OlBvaW50KTpBcnJheTxEaXNwbGF5T2JqZWN0PlxuXHR7XG5cdFx0cmV0dXJuIG5ldyBBcnJheTxEaXNwbGF5T2JqZWN0PigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCA8Y29kZT5jaGlsZDwvY29kZT4gRGlzcGxheU9iamVjdCBpbnN0YW5jZSBmcm9tIHRoZVxuXHQgKiBjaGlsZCBsaXN0IG9mIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlLiBUaGUgPGNvZGU+cGFyZW50PC9jb2RlPlxuXHQgKiBwcm9wZXJ0eSBvZiB0aGUgcmVtb3ZlZCBjaGlsZCBpcyBzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4gLCBhbmQgdGhlIG9iamVjdFxuXHQgKiBpcyBnYXJiYWdlIGNvbGxlY3RlZCBpZiBubyBvdGhlciByZWZlcmVuY2VzIHRvIHRoZSBjaGlsZCBleGlzdC4gVGhlIGluZGV4XG5cdCAqIHBvc2l0aW9ucyBvZiBhbnkgZGlzcGxheSBvYmplY3RzIGFib3ZlIHRoZSBjaGlsZCBpbiB0aGVcblx0ICogRGlzcGxheU9iamVjdENvbnRhaW5lciBhcmUgZGVjcmVhc2VkIGJ5IDEuXG5cdCAqXG5cdCAqIDxwPlRoZSBnYXJiYWdlIGNvbGxlY3RvciByZWFsbG9jYXRlcyB1bnVzZWQgbWVtb3J5IHNwYWNlLiBXaGVuIGEgdmFyaWFibGVcblx0ICogb3Igb2JqZWN0IGlzIG5vIGxvbmdlciBhY3RpdmVseSByZWZlcmVuY2VkIG9yIHN0b3JlZCBzb21ld2hlcmUsIHRoZVxuXHQgKiBnYXJiYWdlIGNvbGxlY3RvciBzd2VlcHMgdGhyb3VnaCBhbmQgd2lwZXMgb3V0IHRoZSBtZW1vcnkgc3BhY2UgaXQgdXNlZCB0b1xuXHQgKiBvY2N1cHkgaWYgbm8gb3RoZXIgcmVmZXJlbmNlcyB0byBpdCBleGlzdC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBjaGlsZCBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byByZW1vdmUuXG5cdCAqIEByZXR1cm4gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdGhhdCB5b3UgcGFzcyBpbiB0aGUgPGNvZGU+Y2hpbGQ8L2NvZGU+XG5cdCAqICAgICAgICAgcGFyYW1ldGVyLlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhyb3dzIGlmIHRoZSBjaGlsZCBwYXJhbWV0ZXIgaXMgbm90IGEgY2hpbGQgb2YgdGhpc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIHJlbW92ZUNoaWxkKGNoaWxkOkRpc3BsYXlPYmplY3QpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdGlmIChjaGlsZCA9PSBudWxsKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGFyYW1ldGVyIGNoaWxkIGNhbm5vdCBiZSBudWxsXCIpO1xuXG5cdFx0dGhpcy5yZW1vdmVDaGlsZEludGVybmFsKGNoaWxkKTtcblxuXHRcdGNoaWxkLmlTZXRQYXJlbnQobnVsbCk7XG5cblx0XHRyZXR1cm4gY2hpbGQ7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlcyBhIGNoaWxkIERpc3BsYXlPYmplY3QgZnJvbSB0aGUgc3BlY2lmaWVkIDxjb2RlPmluZGV4PC9jb2RlPlxuXHQgKiBwb3NpdGlvbiBpbiB0aGUgY2hpbGQgbGlzdCBvZiB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lci4gVGhlXG5cdCAqIDxjb2RlPnBhcmVudDwvY29kZT4gcHJvcGVydHkgb2YgdGhlIHJlbW92ZWQgY2hpbGQgaXMgc2V0IHRvXG5cdCAqIDxjb2RlPm51bGw8L2NvZGU+LCBhbmQgdGhlIG9iamVjdCBpcyBnYXJiYWdlIGNvbGxlY3RlZCBpZiBubyBvdGhlclxuXHQgKiByZWZlcmVuY2VzIHRvIHRoZSBjaGlsZCBleGlzdC4gVGhlIGluZGV4IHBvc2l0aW9ucyBvZiBhbnkgZGlzcGxheSBvYmplY3RzXG5cdCAqIGFib3ZlIHRoZSBjaGlsZCBpbiB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBhcmUgZGVjcmVhc2VkIGJ5IDEuXG5cdCAqXG5cdCAqIDxwPlRoZSBnYXJiYWdlIGNvbGxlY3RvciByZWFsbG9jYXRlcyB1bnVzZWQgbWVtb3J5IHNwYWNlLiBXaGVuIGEgdmFyaWFibGVcblx0ICogb3Igb2JqZWN0IGlzIG5vIGxvbmdlciBhY3RpdmVseSByZWZlcmVuY2VkIG9yIHN0b3JlZCBzb21ld2hlcmUsIHRoZVxuXHQgKiBnYXJiYWdlIGNvbGxlY3RvciBzd2VlcHMgdGhyb3VnaCBhbmQgd2lwZXMgb3V0IHRoZSBtZW1vcnkgc3BhY2UgaXQgdXNlZCB0b1xuXHQgKiBvY2N1cHkgaWYgbm8gb3RoZXIgcmVmZXJlbmNlcyB0byBpdCBleGlzdC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBpbmRleCBUaGUgY2hpbGQgaW5kZXggb2YgdGhlIERpc3BsYXlPYmplY3QgdG8gcmVtb3ZlLlxuXHQgKiBAcmV0dXJuIFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRoYXQgd2FzIHJlbW92ZWQuXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciAgICBUaHJvd3MgaWYgdGhlIGluZGV4IGRvZXMgbm90IGV4aXN0IGluIHRoZSBjaGlsZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5cblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yIFRoaXMgY2hpbGQgZGlzcGxheSBvYmplY3QgYmVsb25ncyB0byBhIHNhbmRib3ggdG9cblx0ICogICAgICAgICAgICAgICAgICAgICAgIHdoaWNoIHRoZSBjYWxsaW5nIG9iamVjdCBkb2VzIG5vdCBoYXZlIGFjY2Vzcy4gWW91XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBjYW4gYXZvaWQgdGhpcyBzaXR1YXRpb24gYnkgaGF2aW5nIHRoZSBjaGlsZCBtb3ZpZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgY2FsbCB0aGUgPGNvZGU+U2VjdXJpdHkuYWxsb3dEb21haW4oKTwvY29kZT4gbWV0aG9kLlxuXHQgKi9cblx0cHVibGljIHJlbW92ZUNoaWxkQXQoaW5kZXg6bnVtYmVyIC8qaW50Ki8pOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuX2NoaWxkcmVuW2luZGV4XSk7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlcyBhbGwgPGNvZGU+Y2hpbGQ8L2NvZGU+IERpc3BsYXlPYmplY3QgaW5zdGFuY2VzIGZyb20gdGhlIGNoaWxkIGxpc3Rcblx0ICogb2YgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UuIFRoZSA8Y29kZT5wYXJlbnQ8L2NvZGU+IHByb3BlcnR5XG5cdCAqIG9mIHRoZSByZW1vdmVkIGNoaWxkcmVuIGlzIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPiwgYW5kIHRoZSBvYmplY3RzIGFyZVxuXHQgKiBnYXJiYWdlIGNvbGxlY3RlZCBpZiBubyBvdGhlciByZWZlcmVuY2VzIHRvIHRoZSBjaGlsZHJlbiBleGlzdC5cblx0ICpcblx0ICogVGhlIGdhcmJhZ2UgY29sbGVjdG9yIHJlYWxsb2NhdGVzIHVudXNlZCBtZW1vcnkgc3BhY2UuIFdoZW4gYSB2YXJpYWJsZSBvclxuXHQgKiBvYmplY3QgaXMgbm8gbG9uZ2VyIGFjdGl2ZWx5IHJlZmVyZW5jZWQgb3Igc3RvcmVkIHNvbWV3aGVyZSwgdGhlIGdhcmJhZ2Vcblx0ICogY29sbGVjdG9yIHN3ZWVwcyB0aHJvdWdoIGFuZCB3aXBlcyBvdXQgdGhlIG1lbW9yeSBzcGFjZSBpdCB1c2VkIHRvIG9jY3VweVxuXHQgKiBpZiBubyBvdGhlciByZWZlcmVuY2VzIHRvIGl0IGV4aXN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gYmVnaW5JbmRleCBUaGUgYmVnaW5uaW5nIHBvc2l0aW9uLiBBIHZhbHVlIHNtYWxsZXIgdGhhbiAwIHRocm93cyBhIFJhbmdlRXJyb3IuXG5cdCAqIEBwYXJhbSBlbmRJbmRleCBUaGUgZW5kaW5nIHBvc2l0aW9uLiBBIHZhbHVlIHNtYWxsZXIgdGhhbiAwIHRocm93cyBhIFJhbmdlRXJyb3IuXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciAgICBUaHJvd3MgaWYgdGhlIGJlZ2luSW5kZXggb3IgZW5kSW5kZXggcG9zaXRpb25zIGRvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBub3QgZXhpc3QgaW4gdGhlIGNoaWxkIGxpc3QuXG5cdCAqL1xuXHRwdWJsaWMgcmVtb3ZlQ2hpbGRyZW4oYmVnaW5JbmRleDpudW1iZXIgLyppbnQqLyA9IDAsIGVuZEluZGV4Om51bWJlciAvKmludCovID0gMjE0NzQ4MzY0Nylcblx0e1xuXHRcdGlmIChiZWdpbkluZGV4IDwgMClcblx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKFwiYmVnaW5JbmRleCBpcyBvdXQgb2YgcmFuZ2Ugb2YgdGhlIGNoaWxkIGxpc3RcIik7XG5cblx0XHRpZiAoZW5kSW5kZXggPiB0aGlzLl9jaGlsZHJlbi5sZW5ndGgpXG5cdFx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcihcImVuZEluZGV4IGlzIG91dCBvZiByYW5nZSBvZiB0aGUgY2hpbGQgbGlzdFwiKTtcblxuXHRcdGZvcih2YXIgaTpudW1iZXIgLyp1aW50Ki8gPSBiZWdpbkluZGV4OyBpIDwgZW5kSW5kZXg7IGkrKylcblx0XHRcdHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5fY2hpbGRyZW5baV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoYW5nZXMgdGhlIHBvc2l0aW9uIG9mIGFuIGV4aXN0aW5nIGNoaWxkIGluIHRoZSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIuXG5cdCAqIFRoaXMgYWZmZWN0cyB0aGUgbGF5ZXJpbmcgb2YgY2hpbGQgb2JqZWN0cy4gRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmdcblx0ICogZXhhbXBsZSBzaG93cyB0aHJlZSBkaXNwbGF5IG9iamVjdHMsIGxhYmVsZWQgYSwgYiwgYW5kIGMsIGF0IGluZGV4XG5cdCAqIHBvc2l0aW9ucyAwLCAxLCBhbmQgMiwgcmVzcGVjdGl2ZWx5OlxuXHQgKlxuXHQgKiA8cD5XaGVuIHlvdSB1c2UgdGhlIDxjb2RlPnNldENoaWxkSW5kZXgoKTwvY29kZT4gbWV0aG9kIGFuZCBzcGVjaWZ5IGFuXG5cdCAqIGluZGV4IHBvc2l0aW9uIHRoYXQgaXMgYWxyZWFkeSBvY2N1cGllZCwgdGhlIG9ubHkgcG9zaXRpb25zIHRoYXQgY2hhbmdlXG5cdCAqIGFyZSB0aG9zZSBpbiBiZXR3ZWVuIHRoZSBkaXNwbGF5IG9iamVjdCdzIGZvcm1lciBhbmQgbmV3IHBvc2l0aW9uLiBBbGxcblx0ICogb3RoZXJzIHdpbGwgc3RheSB0aGUgc2FtZS4gSWYgYSBjaGlsZCBpcyBtb3ZlZCB0byBhbiBpbmRleCBMT1dFUiB0aGFuIGl0c1xuXHQgKiBjdXJyZW50IGluZGV4LCBhbGwgY2hpbGRyZW4gaW4gYmV0d2VlbiB3aWxsIElOQ1JFQVNFIGJ5IDEgZm9yIHRoZWlyIGluZGV4XG5cdCAqIHJlZmVyZW5jZS4gSWYgYSBjaGlsZCBpcyBtb3ZlZCB0byBhbiBpbmRleCBISUdIRVIgdGhhbiBpdHMgY3VycmVudCBpbmRleCxcblx0ICogYWxsIGNoaWxkcmVuIGluIGJldHdlZW4gd2lsbCBERUNSRUFTRSBieSAxIGZvciB0aGVpciBpbmRleCByZWZlcmVuY2UuIEZvclxuXHQgKiBleGFtcGxlLCBpZiB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIGluIHRoZSBwcmV2aW91cyBleGFtcGxlIGlzIG5hbWVkXG5cdCAqIDxjb2RlPmNvbnRhaW5lcjwvY29kZT4sIHlvdSBjYW4gc3dhcCB0aGUgcG9zaXRpb24gb2YgdGhlIGRpc3BsYXkgb2JqZWN0c1xuXHQgKiBsYWJlbGVkIGEgYW5kIGIgYnkgY2FsbGluZyB0aGUgZm9sbG93aW5nIGNvZGU6PC9wPlxuXHQgKlxuXHQgKiA8cD5UaGlzIGNvZGUgcmVzdWx0cyBpbiB0aGUgZm9sbG93aW5nIGFycmFuZ2VtZW50IG9mIG9iamVjdHM6PC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gY2hpbGQgVGhlIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgZm9yIHdoaWNoIHlvdSB3YW50IHRvIGNoYW5nZVxuXHQgKiAgICAgICAgICAgICAgdGhlIGluZGV4IG51bWJlci5cblx0ICogQHBhcmFtIGluZGV4IFRoZSByZXN1bHRpbmcgaW5kZXggbnVtYmVyIGZvciB0aGUgPGNvZGU+Y2hpbGQ8L2NvZGU+IGRpc3BsYXlcblx0ICogICAgICAgICAgICAgIG9iamVjdC5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRocm93cyBpZiB0aGUgY2hpbGQgcGFyYW1ldGVyIGlzIG5vdCBhIGNoaWxkIG9mIHRoaXNcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5cblx0ICogQHRocm93cyBSYW5nZUVycm9yICAgIFRocm93cyBpZiB0aGUgaW5kZXggZG9lcyBub3QgZXhpc3QgaW4gdGhlIGNoaWxkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBsaXN0LlxuXHQgKi9cblx0cHVibGljIHNldENoaWxkSW5kZXgoY2hpbGQ6RGlzcGxheU9iamVjdCwgaW5kZXg6bnVtYmVyIC8qaW50Ki8pXG5cdHtcblx0XHQvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBTd2FwcyB0aGUgei1vcmRlciAoZnJvbnQtdG8tYmFjayBvcmRlcikgb2YgdGhlIHR3byBzcGVjaWZpZWQgY2hpbGRcblx0ICogb2JqZWN0cy4gQWxsIG90aGVyIGNoaWxkIG9iamVjdHMgaW4gdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciByZW1haW4gaW5cblx0ICogdGhlIHNhbWUgaW5kZXggcG9zaXRpb25zLlxuXHQgKlxuXHQgKiBAcGFyYW0gY2hpbGQxIFRoZSBmaXJzdCBjaGlsZCBvYmplY3QuXG5cdCAqIEBwYXJhbSBjaGlsZDIgVGhlIHNlY29uZCBjaGlsZCBvYmplY3QuXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBUaHJvd3MgaWYgZWl0aGVyIGNoaWxkIHBhcmFtZXRlciBpcyBub3QgYSBjaGlsZCBvZlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgc3dhcENoaWxkcmVuKGNoaWxkMTpEaXNwbGF5T2JqZWN0LCBjaGlsZDI6RGlzcGxheU9iamVjdClcblx0e1xuXHRcdC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIFN3YXBzIHRoZSB6LW9yZGVyKGZyb250LXRvLWJhY2sgb3JkZXIpIG9mIHRoZSBjaGlsZCBvYmplY3RzIGF0IHRoZSB0d29cblx0ICogc3BlY2lmaWVkIGluZGV4IHBvc2l0aW9ucyBpbiB0aGUgY2hpbGQgbGlzdC4gQWxsIG90aGVyIGNoaWxkIG9iamVjdHMgaW5cblx0ICogdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciByZW1haW4gaW4gdGhlIHNhbWUgaW5kZXggcG9zaXRpb25zLlxuXHQgKlxuXHQgKiBAcGFyYW0gaW5kZXgxIFRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgY2hpbGQgb2JqZWN0LlxuXHQgKiBAcGFyYW0gaW5kZXgyIFRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgc2Vjb25kIGNoaWxkIG9iamVjdC5cblx0ICogQHRocm93cyBSYW5nZUVycm9yIElmIGVpdGhlciBpbmRleCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgY2hpbGQgbGlzdC5cblx0ICovXG5cdHB1YmxpYyBzd2FwQ2hpbGRyZW5BdChpbmRleDE6bnVtYmVyIC8qaW50Ki8sIGluZGV4MjpudW1iZXIgLyppbnQqLylcblx0e1xuXHRcdC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKClcblx0e1xuXHRcdHN1cGVyLnBJbnZhbGlkYXRlU2NlbmVUcmFuc2Zvcm0oKTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKVxuXHRcdFx0dGhpcy5fY2hpbGRyZW5baV0ucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZVNjZW5lKHZhbHVlOlNjZW5lKVxuXHR7XG5cdFx0c3VwZXIuX3BVcGRhdGVTY2VuZSh2YWx1ZSk7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcblx0XHRcdHRoaXMuX2NoaWxkcmVuW2ldLl9wVXBkYXRlU2NlbmUodmFsdWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRzdXBlci5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHZhbHVlKTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKVxuXHRcdFx0dGhpcy5fY2hpbGRyZW5baV0uX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh0aGlzLl9tb3VzZUNoaWxkcmVuKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdHN1cGVyLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHZhbHVlKTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKVxuXHRcdFx0dGhpcy5fY2hpbGRyZW5baV0uX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodGhpcy5fcEltcGxpY2l0VmlzaWJpbGl0eSk7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24odmFsdWU6UGFydGl0aW9uKVxuXHR7XG5cdFx0c3VwZXIuX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih2YWx1ZSk7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcblx0XHRcdHRoaXMuX2NoaWxkcmVuW2ldLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24odGhpcy5fcEltcGxpY2l0UGFydGl0aW9uKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKlxuXHQgKiBAcGFyYW0gY2hpbGRcblx0ICovXG5cdHByaXZhdGUgcmVtb3ZlQ2hpbGRJbnRlcm5hbChjaGlsZDpEaXNwbGF5T2JqZWN0KTpEaXNwbGF5T2JqZWN0XG5cdHtcblx0XHR0aGlzLl9jaGlsZHJlbi5zcGxpY2UodGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkKSwgMSk7XG5cblx0XHRyZXR1cm4gY2hpbGQ7XG5cdH1cbn1cblxuZXhwb3J0ID0gRGlzcGxheU9iamVjdENvbnRhaW5lcjsiXX0=