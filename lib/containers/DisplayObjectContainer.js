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
    return DisplayObjectContainer;
})(DisplayObject);
module.exports = DisplayObjectContainer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL0Rpc3BsYXlPYmplY3RDb250YWluZXIudHMiXSwibmFtZXMiOlsiRGlzcGxheU9iamVjdENvbnRhaW5lciIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuY29uc3RydWN0b3IiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFzc2V0VHlwZSIsIkRpc3BsYXlPYmplY3RDb250YWluZXIubW91c2VDaGlsZHJlbiIsIkRpc3BsYXlPYmplY3RDb250YWluZXIubnVtQ2hpbGRyZW4iLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZEF0IiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZHJlbiIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuY2xvbmUiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmNvbnRhaW5zIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5kaXNwb3NlV2l0aENoaWxkcmVuIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5nZXRDaGlsZEF0IiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZSIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuZ2V0Q2hpbGRJbmRleCIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuZ2V0T2JqZWN0c1VuZGVyUG9pbnQiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnJlbW92ZUNoaWxkIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5yZW1vdmVDaGlsZEF0IiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5yZW1vdmVDaGlsZHJlbiIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuc2V0Q2hpbGRJbmRleCIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuc3dhcENoaWxkcmVuIiwiRGlzcGxheU9iamVjdENvbnRhaW5lci5zd2FwQ2hpbGRyZW5BdCIsIkRpc3BsYXlPYmplY3RDb250YWluZXIucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCIsIkRpc3BsYXlPYmplY3RDb250YWluZXIuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkiLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnJlbW92ZUNoaWxkSW50ZXJuYWwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sU0FBUyxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFFcEUsSUFBTyxhQUFhLFdBQWMsc0NBQXNDLENBQUMsQ0FBQztBQUMxRSxJQUFPLEtBQUssV0FBZ0IsOEJBQThCLENBQUMsQ0FBQztBQUM1RCxJQUFPLFVBQVUsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBRXJFLElBQU8sYUFBYSxXQUFjLHVDQUF1QyxDQUFDLENBQUM7QUFJM0UsQUFxQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxzQkFBc0I7SUFBU0EsVUFBL0JBLHNCQUFzQkEsVUFBc0JBO0lBeUVqREE7Ozs7Ozs7OztPQVNHQTtJQUNIQSxTQW5GS0Esc0JBQXNCQTtRQXFGMUJDLGlCQUFPQSxDQUFDQTtRQW5GREEsbUJBQWNBLEdBQVdBLElBQUlBLENBQUNBO1FBQzlCQSxjQUFTQSxHQUF3QkEsSUFBSUEsS0FBS0EsRUFBaUJBLENBQUNBO0lBbUZwRUEsQ0FBQ0E7SUE3RURELHNCQUFXQSw2Q0FBU0E7UUFIcEJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7OztPQUFBRjtJQXVCREEsc0JBQVdBLGlEQUFhQTtRQXJCeEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW9CR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7UUFDNUJBLENBQUNBO2FBRURILFVBQXlC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Q0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFcERBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO0lBQ2RBLENBQUNBO0lBQ0Z6Qiw2QkFBQ0E7QUFBREEsQ0FuZ0JBLEFBbWdCQ0EsRUFuZ0JvQyxhQUFhLEVBbWdCakQ7QUFFRCxBQUFnQyxpQkFBdkIsc0JBQXNCLENBQUMiLCJmaWxlIjoiY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb2ludFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BvaW50XCIpO1xyXG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcclxuaW1wb3J0IElBc3NldFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcclxuaW1wb3J0IEFyZ3VtZW50RXJyb3JcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQXJndW1lbnRFcnJvclwiKTtcclxuaW1wb3J0IEVycm9yXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9FcnJvclwiKTtcclxuaW1wb3J0IFJhbmdlRXJyb3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9SYW5nZUVycm9yXCIpO1xyXG5cclxuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XHJcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9QYXJ0aXRpb25cIik7XHJcbmltcG9ydCBTY2VuZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1NjZW5lXCIpO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgb2JqZWN0cyB0aGF0IGNhblxyXG4gKiBzZXJ2ZSBhcyBkaXNwbGF5IG9iamVjdCBjb250YWluZXJzIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFRoZSBkaXNwbGF5IGxpc3RcclxuICogbWFuYWdlcyBhbGwgb2JqZWN0cyBkaXNwbGF5ZWQgaW4gdGhlIEZsYXNoIHJ1bnRpbWVzLiBVc2UgdGhlXHJcbiAqIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgdG8gYXJyYW5nZSB0aGUgZGlzcGxheSBvYmplY3RzIGluIHRoZSBkaXNwbGF5XHJcbiAqIGxpc3QuIEVhY2ggRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QgaGFzIGl0cyBvd24gY2hpbGQgbGlzdCBmb3JcclxuICogb3JnYW5pemluZyB0aGUgei1vcmRlciBvZiB0aGUgb2JqZWN0cy4gVGhlIHotb3JkZXIgaXMgdGhlIGZyb250LXRvLWJhY2tcclxuICogb3JkZXIgdGhhdCBkZXRlcm1pbmVzIHdoaWNoIG9iamVjdCBpcyBkcmF3biBpbiBmcm9udCwgd2hpY2ggaXMgYmVoaW5kLCBhbmRcclxuICogc28gb24uXHJcbiAqXHJcbiAqIDxwPkRpc3BsYXlPYmplY3QgaXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzczsgdGhlcmVmb3JlLCB5b3UgY2Fubm90IGNhbGxcclxuICogRGlzcGxheU9iamVjdCBkaXJlY3RseS4gSW52b2tpbmcgPGNvZGU+bmV3IERpc3BsYXlPYmplY3QoKTwvY29kZT4gdGhyb3dzIGFuXHJcbiAqIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+IGV4Y2VwdGlvbi48L3A+XHJcbiAqIFRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIGlzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIGFsbCBvYmplY3RzXHJcbiAqIHRoYXQgY2FuIGNvbnRhaW4gY2hpbGQgb2JqZWN0cy4gSXQgY2Fubm90IGJlIGluc3RhbnRpYXRlZCBkaXJlY3RseTsgY2FsbGluZ1xyXG4gKiB0aGUgPGNvZGU+bmV3IERpc3BsYXlPYmplY3RDb250YWluZXIoKTwvY29kZT4gY29uc3RydWN0b3IgdGhyb3dzIGFuXHJcbiAqIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+IGV4Y2VwdGlvbi5cclxuICpcclxuICogPHA+Rm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgXCJEaXNwbGF5IFByb2dyYW1taW5nXCIgY2hhcHRlciBvZiB0aGVcclxuICogPGk+QWN0aW9uU2NyaXB0IDMuMCBEZXZlbG9wZXIncyBHdWlkZTwvaT4uPC9wPlxyXG4gKi9cclxuY2xhc3MgRGlzcGxheU9iamVjdENvbnRhaW5lciBleHRlbmRzIERpc3BsYXlPYmplY3QgaW1wbGVtZW50cyBJQXNzZXRcclxue1xyXG5cdHByaXZhdGUgX21vdXNlQ2hpbGRyZW46Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfY2hpbGRyZW46QXJyYXk8RGlzcGxheU9iamVjdD4gPSBuZXcgQXJyYXk8RGlzcGxheU9iamVjdD4oKTtcclxuXHRwdWJsaWMgX2lJc1Jvb3Q6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBBc3NldFR5cGUuQ09OVEFJTkVSO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgY2hpbGRyZW4gb2YgdGhlIG9iamVjdCBhcmUgbW91c2UsIG9yIHVzZXJcclxuXHQgKiBpbnB1dCBkZXZpY2UsIGVuYWJsZWQuIElmIGFuIG9iamVjdCBpcyBlbmFibGVkLCBhIHVzZXIgY2FuIGludGVyYWN0IHdpdGhcclxuXHQgKiBpdCBieSB1c2luZyBhIG1vdXNlIG9yIHVzZXIgaW5wdXQgZGV2aWNlLiBUaGUgZGVmYXVsdCBpc1xyXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+VGhpcyBwcm9wZXJ0eSBpcyB1c2VmdWwgd2hlbiB5b3UgY3JlYXRlIGEgYnV0dG9uIHdpdGggYW4gaW5zdGFuY2Ugb2ZcclxuXHQgKiB0aGUgU3ByaXRlIGNsYXNzKGluc3RlYWQgb2YgdXNpbmcgdGhlIFNpbXBsZUJ1dHRvbiBjbGFzcykuIFdoZW4geW91IHVzZSBhXHJcblx0ICogU3ByaXRlIGluc3RhbmNlIHRvIGNyZWF0ZSBhIGJ1dHRvbiwgeW91IGNhbiBjaG9vc2UgdG8gZGVjb3JhdGUgdGhlIGJ1dHRvblxyXG5cdCAqIGJ5IHVzaW5nIHRoZSA8Y29kZT5hZGRDaGlsZCgpPC9jb2RlPiBtZXRob2QgdG8gYWRkIGFkZGl0aW9uYWwgU3ByaXRlXHJcblx0ICogaW5zdGFuY2VzLiBUaGlzIHByb2Nlc3MgY2FuIGNhdXNlIHVuZXhwZWN0ZWQgYmVoYXZpb3Igd2l0aCBtb3VzZSBldmVudHNcclxuXHQgKiBiZWNhdXNlIHRoZSBTcHJpdGUgaW5zdGFuY2VzIHlvdSBhZGQgYXMgY2hpbGRyZW4gY2FuIGJlY29tZSB0aGUgdGFyZ2V0XHJcblx0ICogb2JqZWN0IG9mIGEgbW91c2UgZXZlbnQgd2hlbiB5b3UgZXhwZWN0IHRoZSBwYXJlbnQgaW5zdGFuY2UgdG8gYmUgdGhlXHJcblx0ICogdGFyZ2V0IG9iamVjdC4gVG8gZW5zdXJlIHRoYXQgdGhlIHBhcmVudCBpbnN0YW5jZSBzZXJ2ZXMgYXMgdGhlIHRhcmdldFxyXG5cdCAqIG9iamVjdHMgZm9yIG1vdXNlIGV2ZW50cywgeW91IGNhbiBzZXQgdGhlIDxjb2RlPm1vdXNlQ2hpbGRyZW48L2NvZGU+XHJcblx0ICogcHJvcGVydHkgb2YgdGhlIHBhcmVudCBpbnN0YW5jZSB0byA8Y29kZT5mYWxzZTwvY29kZT4uPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+IE5vIGV2ZW50IGlzIGRpc3BhdGNoZWQgYnkgc2V0dGluZyB0aGlzIHByb3BlcnR5LiBZb3UgbXVzdCB1c2UgdGhlXHJcblx0ICogPGNvZGU+YWRkRXZlbnRMaXN0ZW5lcigpPC9jb2RlPiBtZXRob2QgdG8gY3JlYXRlIGludGVyYWN0aXZlXHJcblx0ICogZnVuY3Rpb25hbGl0eS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBtb3VzZUNoaWxkcmVuKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9tb3VzZUNoaWxkcmVuO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBtb3VzZUNoaWxkcmVuKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX21vdXNlQ2hpbGRyZW4gPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9tb3VzZUNoaWxkcmVuID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQubW91c2VDaGlsZHJlbiA6IHRydWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIG9mIHRoaXMgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbnVtQ2hpbGRyZW4oKTpudW1iZXIgLyppbnQqL1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGNoaWxkcmVuIG9mIHRoZSBvYmplY3QgYXJlIHRhYiBlbmFibGVkLiBFbmFibGVzIG9yXHJcblx0ICogZGlzYWJsZXMgdGFiYmluZyBmb3IgdGhlIGNoaWxkcmVuIG9mIHRoZSBvYmplY3QuIFRoZSBkZWZhdWx0IGlzXHJcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gRG8gbm90IHVzZSB0aGUgPGNvZGU+dGFiQ2hpbGRyZW48L2NvZGU+IHByb3BlcnR5IHdpdGhcclxuXHQgKiBGbGV4LiBJbnN0ZWFkLCB1c2UgdGhlXHJcblx0ICogPGNvZGU+bXguY29yZS5VSUNvbXBvbmVudC5oYXNGb2N1c2FibGVDaGlsZHJlbjwvY29kZT4gcHJvcGVydHkuPC9wPlxyXG5cdCAqXHJcblx0ICogQHRocm93cyBJbGxlZ2FsT3BlcmF0aW9uRXJyb3IgQ2FsbGluZyB0aGlzIHByb3BlcnR5IG9mIHRoZSBTdGFnZSBvYmplY3RcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvd3MgYW4gZXhjZXB0aW9uLiBUaGUgU3RhZ2Ugb2JqZWN0IGRvZXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3QgaW1wbGVtZW50IHRoaXMgcHJvcGVydHkuXHJcblx0ICovXHJcblx0cHVibGljIHRhYkNoaWxkcmVuOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGxpbmcgdGhlIDxjb2RlPm5ldyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyKCk8L2NvZGU+IGNvbnN0cnVjdG9yIHRocm93c1xyXG5cdCAqIGFuIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+IGV4Y2VwdGlvbi4gWW91IDxpPmNhbjwvaT4sIGhvd2V2ZXIsIGNhbGxcclxuXHQgKiBjb25zdHJ1Y3RvcnMgZm9yIHRoZSBmb2xsb3dpbmcgc3ViY2xhc3NlcyBvZiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyOlxyXG5cdCAqIDx1bD5cclxuXHQgKiAgIDxsaT48Y29kZT5uZXcgTG9hZGVyKCk8L2NvZGU+PC9saT5cclxuXHQgKiAgIDxsaT48Y29kZT5uZXcgU3ByaXRlKCk8L2NvZGU+PC9saT5cclxuXHQgKiAgIDxsaT48Y29kZT5uZXcgTW92aWVDbGlwKCk8L2NvZGU+PC9saT5cclxuXHQgKiA8L3VsPlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gdGhpcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHJcblx0ICogaW5zdGFuY2UuIFRoZSBjaGlsZCBpcyBhZGRlZCB0byB0aGUgZnJvbnQodG9wKSBvZiBhbGwgb3RoZXIgY2hpbGRyZW4gaW5cclxuXHQgKiB0aGlzIERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UuKFRvIGFkZCBhIGNoaWxkIHRvIGEgc3BlY2lmaWMgaW5kZXhcclxuXHQgKiBwb3NpdGlvbiwgdXNlIHRoZSA8Y29kZT5hZGRDaGlsZEF0KCk8L2NvZGU+IG1ldGhvZC4pXHJcblx0ICpcclxuXHQgKiA8cD5JZiB5b3UgYWRkIGEgY2hpbGQgb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgYSBkaWZmZXJlbnQgZGlzcGxheSBvYmplY3RcclxuXHQgKiBjb250YWluZXIgYXMgYSBwYXJlbnQsIHRoZSBvYmplY3QgaXMgcmVtb3ZlZCBmcm9tIHRoZSBjaGlsZCBsaXN0IG9mIHRoZVxyXG5cdCAqIG90aGVyIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lci4gPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFRoZSBjb21tYW5kIDxjb2RlPnN0YWdlLmFkZENoaWxkKCk8L2NvZGU+IGNhbiBjYXVzZVxyXG5cdCAqIHByb2JsZW1zIHdpdGggYSBwdWJsaXNoZWQgU1dGIGZpbGUsIGluY2x1ZGluZyBzZWN1cml0eSBwcm9ibGVtcyBhbmRcclxuXHQgKiBjb25mbGljdHMgd2l0aCBvdGhlciBsb2FkZWQgU1dGIGZpbGVzLiBUaGVyZSBpcyBvbmx5IG9uZSBTdGFnZSB3aXRoaW4gYVxyXG5cdCAqIEZsYXNoIHJ1bnRpbWUgaW5zdGFuY2UsIG5vIG1hdHRlciBob3cgbWFueSBTV0YgZmlsZXMgeW91IGxvYWQgaW50byB0aGVcclxuXHQgKiBydW50aW1lLiBTbywgZ2VuZXJhbGx5LCBvYmplY3RzIHNob3VsZCBub3QgYmUgYWRkZWQgdG8gdGhlIFN0YWdlLFxyXG5cdCAqIGRpcmVjdGx5LCBhdCBhbGwuIFRoZSBvbmx5IG9iamVjdCB0aGUgU3RhZ2Ugc2hvdWxkIGNvbnRhaW4gaXMgdGhlIHJvb3RcclxuXHQgKiBvYmplY3QuIENyZWF0ZSBhIERpc3BsYXlPYmplY3RDb250YWluZXIgdG8gY29udGFpbiBhbGwgb2YgdGhlIGl0ZW1zIG9uIHRoZVxyXG5cdCAqIGRpc3BsYXkgbGlzdC4gVGhlbiwgaWYgbmVjZXNzYXJ5LCBhZGQgdGhhdCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlXHJcblx0ICogdG8gdGhlIFN0YWdlLjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBjaGlsZCBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byBhZGQgYXMgYSBjaGlsZCBvZiB0aGlzXHJcblx0ICogICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UuXHJcblx0ICogQHJldHVybiBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0aGF0IHlvdSBwYXNzIGluIHRoZSA8Y29kZT5jaGlsZDwvY29kZT5cclxuXHQgKiAgICAgICAgIHBhcmFtZXRlci5cclxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgVGhyb3dzIGlmIHRoZSBjaGlsZCBpcyB0aGUgc2FtZSBhcyB0aGUgcGFyZW50LiBBbHNvXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRocm93cyBpZiB0aGUgY2FsbGVyIGlzIGEgY2hpbGQob3IgZ3JhbmRjaGlsZCBldGMuKVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBvZiB0aGUgY2hpbGQgYmVpbmcgYWRkZWQuXHJcblx0ICogQGV2ZW50IGFkZGVkIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZSBkaXNwbGF5XHJcblx0ICogICAgICAgICAgICAgIGxpc3QuXHJcblx0ICovXHJcblx0cHVibGljIGFkZENoaWxkKGNoaWxkOkRpc3BsYXlPYmplY3QpOkRpc3BsYXlPYmplY3RcclxuXHR7XHJcblx0XHRpZiAoY2hpbGQgPT0gbnVsbClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGFyYW1ldGVyIGNoaWxkIGNhbm5vdCBiZSBudWxsLlwiKTtcclxuXHJcblx0XHQvL2lmIGNoaWxkIGFscmVhZHkgaGFzIGEgcGFyZW50LCByZW1vdmUgaXQuXHJcblx0XHRpZiAoY2hpbGQuX3BQYXJlbnQpXHJcblx0XHRcdGNoaWxkLl9wUGFyZW50LnJlbW92ZUNoaWxkSW50ZXJuYWwoY2hpbGQpO1xyXG5cclxuXHRcdGNoaWxkLmlTZXRQYXJlbnQodGhpcyk7XHJcblxyXG5cdFx0dGhpcy5fY2hpbGRyZW4ucHVzaChjaGlsZCk7XHJcblxyXG5cdFx0cmV0dXJuIGNoaWxkO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBjaGlsZCBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIHRoaXMgRGlzcGxheU9iamVjdENvbnRhaW5lclxyXG5cdCAqIGluc3RhbmNlLiBUaGUgY2hpbGQgaXMgYWRkZWQgYXQgdGhlIGluZGV4IHBvc2l0aW9uIHNwZWNpZmllZC4gQW4gaW5kZXggb2ZcclxuXHQgKiAwIHJlcHJlc2VudHMgdGhlIGJhY2soYm90dG9tKSBvZiB0aGUgZGlzcGxheSBsaXN0IGZvciB0aGlzXHJcblx0ICogRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QuXHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZyBleGFtcGxlIHNob3dzIHRocmVlIGRpc3BsYXkgb2JqZWN0cywgbGFiZWxlZFxyXG5cdCAqIGEsIGIsIGFuZCBjLCBhdCBpbmRleCBwb3NpdGlvbnMgMCwgMiwgYW5kIDEsIHJlc3BlY3RpdmVseTo8L3A+XHJcblx0ICpcclxuXHQgKiA8cD5JZiB5b3UgYWRkIGEgY2hpbGQgb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgYSBkaWZmZXJlbnQgZGlzcGxheSBvYmplY3RcclxuXHQgKiBjb250YWluZXIgYXMgYSBwYXJlbnQsIHRoZSBvYmplY3QgaXMgcmVtb3ZlZCBmcm9tIHRoZSBjaGlsZCBsaXN0IG9mIHRoZVxyXG5cdCAqIG90aGVyIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lci4gPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNoaWxkIFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIGFkZCBhcyBhIGNoaWxkIG9mIHRoaXNcclxuXHQgKiAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZS5cclxuXHQgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IHBvc2l0aW9uIHRvIHdoaWNoIHRoZSBjaGlsZCBpcyBhZGRlZC4gSWYgeW91XHJcblx0ICogICAgICAgICAgICAgIHNwZWNpZnkgYSBjdXJyZW50bHkgb2NjdXBpZWQgaW5kZXggcG9zaXRpb24sIHRoZSBjaGlsZCBvYmplY3RcclxuXHQgKiAgICAgICAgICAgICAgdGhhdCBleGlzdHMgYXQgdGhhdCBwb3NpdGlvbiBhbmQgYWxsIGhpZ2hlciBwb3NpdGlvbnMgYXJlXHJcblx0ICogICAgICAgICAgICAgIG1vdmVkIHVwIG9uZSBwb3NpdGlvbiBpbiB0aGUgY2hpbGQgbGlzdC5cclxuXHQgKiBAcmV0dXJuIFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRoYXQgeW91IHBhc3MgaW4gdGhlIDxjb2RlPmNoaWxkPC9jb2RlPlxyXG5cdCAqICAgICAgICAgcGFyYW1ldGVyLlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBUaHJvd3MgaWYgdGhlIGNoaWxkIGlzIHRoZSBzYW1lIGFzIHRoZSBwYXJlbnQuIEFsc29cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhyb3dzIGlmIHRoZSBjYWxsZXIgaXMgYSBjaGlsZChvciBncmFuZGNoaWxkIGV0Yy4pXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9mIHRoZSBjaGlsZCBiZWluZyBhZGRlZC5cclxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgICAgVGhyb3dzIGlmIHRoZSBpbmRleCBwb3NpdGlvbiBkb2VzIG5vdCBleGlzdCBpbiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQgbGlzdC5cclxuXHQgKiBAZXZlbnQgYWRkZWQgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWRkZWQgdG8gdGhlIGRpc3BsYXlcclxuXHQgKiAgICAgICAgICAgICAgbGlzdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgYWRkQ2hpbGRBdChjaGlsZDpEaXNwbGF5T2JqZWN0LCBpbmRleDpudW1iZXIgLyppbnQqLyk6RGlzcGxheU9iamVjdFxyXG5cdHtcclxuXHRcdHJldHVybiBjaGlsZDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGRDaGlsZHJlbiguLi5jaGlsZGFycmF5OkFycmF5PERpc3BsYXlPYmplY3Q+KVxyXG5cdHtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gY2hpbGRhcnJheS5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCAgbGVuOyBpKyspXHJcblx0XHRcdHRoaXMuYWRkQ2hpbGQoY2hpbGRhcnJheVtpXSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9uZSgpOkRpc3BsYXlPYmplY3RcclxuXHR7XHJcblx0XHR2YXIgY2xvbmU6RGlzcGxheU9iamVjdENvbnRhaW5lciA9IG5ldyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyKCk7XHJcblx0XHRjbG9uZS5waXZvdCA9IHRoaXMucGl2b3Q7XHJcblx0XHRjbG9uZS5faU1hdHJpeDNEID0gdGhpcy5faU1hdHJpeDNEO1xyXG5cdFx0Y2xvbmUucGFydGl0aW9uID0gdGhpcy5wYXJ0aXRpb247XHJcblx0XHRjbG9uZS5uYW1lID0gbmFtZTtcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKVxyXG5cdFx0XHRjbG9uZS5hZGRDaGlsZCh0aGlzLl9jaGlsZHJlbltpXS5jbG9uZSgpKTtcclxuXHJcblx0XHQvLyB0b2RvOiBpbXBsZW1lbnQgZm9yIGFsbCBzdWJ0eXBlc1xyXG5cdFx0cmV0dXJuIGNsb25lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgZGlzcGxheSBvYmplY3QgaXMgYSBjaGlsZCBvZiB0aGVcclxuXHQgKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlIG9yIHRoZSBpbnN0YW5jZSBpdHNlbGYuIFRoZSBzZWFyY2hcclxuXHQgKiBpbmNsdWRlcyB0aGUgZW50aXJlIGRpc3BsYXkgbGlzdCBpbmNsdWRpbmcgdGhpcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHJcblx0ICogaW5zdGFuY2UuIEdyYW5kY2hpbGRyZW4sIGdyZWF0LWdyYW5kY2hpbGRyZW4sIGFuZCBzbyBvbiBlYWNoIHJldHVyblxyXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNoaWxkIFRoZSBjaGlsZCBvYmplY3QgdG8gdGVzdC5cclxuXHQgKiBAcmV0dXJuIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSA8Y29kZT5jaGlsZDwvY29kZT4gb2JqZWN0IGlzIGEgY2hpbGQgb2ZcclxuXHQgKiAgICAgICAgIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9yIHRoZSBjb250YWluZXIgaXRzZWxmOyBvdGhlcndpc2VcclxuXHQgKiAgICAgICAgIDxjb2RlPmZhbHNlPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgY29udGFpbnMoY2hpbGQ6RGlzcGxheU9iamVjdCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSA+PSAwO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZVdpdGhDaGlsZHJlbigpXHJcblx0e1xyXG5cdFx0dGhpcy5kaXNwb3NlKCk7XHJcblxyXG5cdFx0d2hpbGUgKHRoaXMubnVtQ2hpbGRyZW4gPiAwKVxyXG5cdFx0XHR0aGlzLmdldENoaWxkQXQoMCkuZGlzcG9zZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgY2hpbGQgZGlzcGxheSBvYmplY3QgaW5zdGFuY2UgdGhhdCBleGlzdHMgYXQgdGhlIHNwZWNpZmllZFxyXG5cdCAqIGluZGV4LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgY2hpbGQgb2JqZWN0LlxyXG5cdCAqIEByZXR1cm4gVGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggcG9zaXRpb24uXHJcblx0ICogQHRocm93cyBSYW5nZUVycm9yICAgIFRocm93cyBpZiB0aGUgaW5kZXggZG9lcyBub3QgZXhpc3QgaW4gdGhlIGNoaWxkXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGxpc3QuXHJcblx0ICovXHJcblx0cHVibGljIGdldENoaWxkQXQoaW5kZXg6bnVtYmVyIC8qaW50Ki8pOkRpc3BsYXlPYmplY3RcclxuXHR7XHJcblx0XHR2YXIgY2hpbGQ6RGlzcGxheU9iamVjdCA9IHRoaXMuX2NoaWxkcmVuW2luZGV4XTtcclxuXHJcblx0XHRpZiAoY2hpbGQgPT0gbnVsbClcclxuXHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJJbmRleCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgY2hpbGQgbGlzdCBvZiB0aGUgY2FsbGVyXCIpO1xyXG5cclxuXHRcdHJldHVybiBjaGlsZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IHRoYXQgZXhpc3RzIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lLiBJZlxyXG5cdCAqIG1vcmUgdGhhdCBvbmUgY2hpbGQgZGlzcGxheSBvYmplY3QgaGFzIHRoZSBzcGVjaWZpZWQgbmFtZSwgdGhlIG1ldGhvZFxyXG5cdCAqIHJldHVybnMgdGhlIGZpcnN0IG9iamVjdCBpbiB0aGUgY2hpbGQgbGlzdC5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSA8Y29kZT5nZXRDaGlsZEF0KCk8L2NvZGU+IG1ldGhvZCBpcyBmYXN0ZXIgdGhhbiB0aGVcclxuXHQgKiA8Y29kZT5nZXRDaGlsZEJ5TmFtZSgpPC9jb2RlPiBtZXRob2QuIFRoZSA8Y29kZT5nZXRDaGlsZEF0KCk8L2NvZGU+IG1ldGhvZFxyXG5cdCAqIGFjY2Vzc2VzIGEgY2hpbGQgZnJvbSBhIGNhY2hlZCBhcnJheSwgd2hlcmVhcyB0aGVcclxuXHQgKiA8Y29kZT5nZXRDaGlsZEJ5TmFtZSgpPC9jb2RlPiBtZXRob2QgaGFzIHRvIHRyYXZlcnNlIGEgbGlua2VkIGxpc3QgdG9cclxuXHQgKiBhY2Nlc3MgYSBjaGlsZC48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgY2hpbGQgdG8gcmV0dXJuLlxyXG5cdCAqIEByZXR1cm4gVGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IHdpdGggdGhlIHNwZWNpZmllZCBuYW1lLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRDaGlsZEJ5TmFtZShuYW1lOnN0cmluZyk6RGlzcGxheU9iamVjdFxyXG5cdHtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXHJcblx0XHRcdGlmICh0aGlzLl9jaGlsZHJlbltpXS5uYW1lID09IG5hbWUpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2NoaWxkcmVuW2ldO1xyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgaW5kZXggcG9zaXRpb24gb2YgYSA8Y29kZT5jaGlsZDwvY29kZT4gRGlzcGxheU9iamVjdCBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBjaGlsZCBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byBpZGVudGlmeS5cclxuXHQgKiBAcmV0dXJuIFRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgY2hpbGQgZGlzcGxheSBvYmplY3QgdG8gaWRlbnRpZnkuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRocm93cyBpZiB0aGUgY2hpbGQgcGFyYW1ldGVyIGlzIG5vdCBhIGNoaWxkIG9mIHRoaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRDaGlsZEluZGV4KGNoaWxkOkRpc3BsYXlPYmplY3QpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0dmFyIGNoaWxkSW5kZXg6bnVtYmVyID0gdGhpcy5fY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XHJcblxyXG5cdFx0aWYgKGNoaWxkSW5kZXggPT0gLTEpXHJcblx0XHRcdHRocm93IG5ldyBBcmd1bWVudEVycm9yKFwiQ2hpbGQgcGFyYW1ldGVyIGlzIG5vdCBhIGNoaWxkIG9mIHRoZSBjYWxsZXJcIik7XHJcblxyXG5cdFx0cmV0dXJuIGNoaWxkSW5kZXg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGFuIGFycmF5IG9mIG9iamVjdHMgdGhhdCBsaWUgdW5kZXIgdGhlIHNwZWNpZmllZCBwb2ludCBhbmQgYXJlXHJcblx0ICogY2hpbGRyZW4ob3IgZ3JhbmRjaGlsZHJlbiwgYW5kIHNvIG9uKSBvZiB0aGlzIERpc3BsYXlPYmplY3RDb250YWluZXJcclxuXHQgKiBpbnN0YW5jZS4gQW55IGNoaWxkIG9iamVjdHMgdGhhdCBhcmUgaW5hY2Nlc3NpYmxlIGZvciBzZWN1cml0eSByZWFzb25zIGFyZVxyXG5cdCAqIG9taXR0ZWQgZnJvbSB0aGUgcmV0dXJuZWQgYXJyYXkuIFRvIGRldGVybWluZSB3aGV0aGVyIHRoaXMgc2VjdXJpdHlcclxuXHQgKiByZXN0cmljdGlvbiBhZmZlY3RzIHRoZSByZXR1cm5lZCBhcnJheSwgY2FsbCB0aGVcclxuXHQgKiA8Y29kZT5hcmVJbmFjY2Vzc2libGVPYmplY3RzVW5kZXJQb2ludCgpPC9jb2RlPiBtZXRob2QuXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgPGNvZGU+cG9pbnQ8L2NvZGU+IHBhcmFtZXRlciBpcyBpbiB0aGUgY29vcmRpbmF0ZSBzcGFjZSBvZiB0aGVcclxuXHQgKiBTdGFnZSwgd2hpY2ggbWF5IGRpZmZlciBmcm9tIHRoZSBjb29yZGluYXRlIHNwYWNlIG9mIHRoZSBkaXNwbGF5IG9iamVjdFxyXG5cdCAqIGNvbnRhaW5lcih1bmxlc3MgdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBpcyB0aGUgU3RhZ2UpLiBZb3UgY2FuIHVzZVxyXG5cdCAqIHRoZSA8Y29kZT5nbG9iYWxUb0xvY2FsKCk8L2NvZGU+IGFuZCB0aGUgPGNvZGU+bG9jYWxUb0dsb2JhbCgpPC9jb2RlPlxyXG5cdCAqIG1ldGhvZHMgdG8gY29udmVydCBwb2ludHMgYmV0d2VlbiB0aGVzZSBjb29yZGluYXRlIHNwYWNlcy48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcG9pbnQgVGhlIHBvaW50IHVuZGVyIHdoaWNoIHRvIGxvb2suXHJcblx0ICogQHJldHVybiBBbiBhcnJheSBvZiBvYmplY3RzIHRoYXQgbGllIHVuZGVyIHRoZSBzcGVjaWZpZWQgcG9pbnQgYW5kIGFyZVxyXG5cdCAqICAgICAgICAgY2hpbGRyZW4ob3IgZ3JhbmRjaGlsZHJlbiwgYW5kIHNvIG9uKSBvZiB0aGlzXHJcblx0ICogICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRPYmplY3RzVW5kZXJQb2ludChwb2ludDpQb2ludCk6QXJyYXk8RGlzcGxheU9iamVjdD5cclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IEFycmF5PERpc3BsYXlPYmplY3Q+KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgPGNvZGU+Y2hpbGQ8L2NvZGU+IERpc3BsYXlPYmplY3QgaW5zdGFuY2UgZnJvbSB0aGVcclxuXHQgKiBjaGlsZCBsaXN0IG9mIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlLiBUaGUgPGNvZGU+cGFyZW50PC9jb2RlPlxyXG5cdCAqIHByb3BlcnR5IG9mIHRoZSByZW1vdmVkIGNoaWxkIGlzIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPiAsIGFuZCB0aGUgb2JqZWN0XHJcblx0ICogaXMgZ2FyYmFnZSBjb2xsZWN0ZWQgaWYgbm8gb3RoZXIgcmVmZXJlbmNlcyB0byB0aGUgY2hpbGQgZXhpc3QuIFRoZSBpbmRleFxyXG5cdCAqIHBvc2l0aW9ucyBvZiBhbnkgZGlzcGxheSBvYmplY3RzIGFib3ZlIHRoZSBjaGlsZCBpbiB0aGVcclxuXHQgKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGFyZSBkZWNyZWFzZWQgYnkgMS5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBnYXJiYWdlIGNvbGxlY3RvciByZWFsbG9jYXRlcyB1bnVzZWQgbWVtb3J5IHNwYWNlLiBXaGVuIGEgdmFyaWFibGVcclxuXHQgKiBvciBvYmplY3QgaXMgbm8gbG9uZ2VyIGFjdGl2ZWx5IHJlZmVyZW5jZWQgb3Igc3RvcmVkIHNvbWV3aGVyZSwgdGhlXHJcblx0ICogZ2FyYmFnZSBjb2xsZWN0b3Igc3dlZXBzIHRocm91Z2ggYW5kIHdpcGVzIG91dCB0aGUgbWVtb3J5IHNwYWNlIGl0IHVzZWQgdG9cclxuXHQgKiBvY2N1cHkgaWYgbm8gb3RoZXIgcmVmZXJlbmNlcyB0byBpdCBleGlzdC48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gY2hpbGQgVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gcmVtb3ZlLlxyXG5cdCAqIEByZXR1cm4gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdGhhdCB5b3UgcGFzcyBpbiB0aGUgPGNvZGU+Y2hpbGQ8L2NvZGU+XHJcblx0ICogICAgICAgICBwYXJhbWV0ZXIuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRocm93cyBpZiB0aGUgY2hpbGQgcGFyYW1ldGVyIGlzIG5vdCBhIGNoaWxkIG9mIHRoaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZW1vdmVDaGlsZChjaGlsZDpEaXNwbGF5T2JqZWN0KTpEaXNwbGF5T2JqZWN0XHJcblx0e1xyXG5cdFx0aWYgKGNoaWxkID09IG51bGwpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBhcmFtZXRlciBjaGlsZCBjYW5ub3QgYmUgbnVsbFwiKTtcclxuXHJcblx0XHR0aGlzLnJlbW92ZUNoaWxkSW50ZXJuYWwoY2hpbGQpO1xyXG5cclxuXHRcdGNoaWxkLmlTZXRQYXJlbnQobnVsbCk7XHJcblxyXG5cdFx0cmV0dXJuIGNoaWxkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhIGNoaWxkIERpc3BsYXlPYmplY3QgZnJvbSB0aGUgc3BlY2lmaWVkIDxjb2RlPmluZGV4PC9jb2RlPlxyXG5cdCAqIHBvc2l0aW9uIGluIHRoZSBjaGlsZCBsaXN0IG9mIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLiBUaGVcclxuXHQgKiA8Y29kZT5wYXJlbnQ8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSByZW1vdmVkIGNoaWxkIGlzIHNldCB0b1xyXG5cdCAqIDxjb2RlPm51bGw8L2NvZGU+LCBhbmQgdGhlIG9iamVjdCBpcyBnYXJiYWdlIGNvbGxlY3RlZCBpZiBubyBvdGhlclxyXG5cdCAqIHJlZmVyZW5jZXMgdG8gdGhlIGNoaWxkIGV4aXN0LiBUaGUgaW5kZXggcG9zaXRpb25zIG9mIGFueSBkaXNwbGF5IG9iamVjdHNcclxuXHQgKiBhYm92ZSB0aGUgY2hpbGQgaW4gdGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgYXJlIGRlY3JlYXNlZCBieSAxLlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIGdhcmJhZ2UgY29sbGVjdG9yIHJlYWxsb2NhdGVzIHVudXNlZCBtZW1vcnkgc3BhY2UuIFdoZW4gYSB2YXJpYWJsZVxyXG5cdCAqIG9yIG9iamVjdCBpcyBubyBsb25nZXIgYWN0aXZlbHkgcmVmZXJlbmNlZCBvciBzdG9yZWQgc29tZXdoZXJlLCB0aGVcclxuXHQgKiBnYXJiYWdlIGNvbGxlY3RvciBzd2VlcHMgdGhyb3VnaCBhbmQgd2lwZXMgb3V0IHRoZSBtZW1vcnkgc3BhY2UgaXQgdXNlZCB0b1xyXG5cdCAqIG9jY3VweSBpZiBubyBvdGhlciByZWZlcmVuY2VzIHRvIGl0IGV4aXN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBpbmRleCBUaGUgY2hpbGQgaW5kZXggb2YgdGhlIERpc3BsYXlPYmplY3QgdG8gcmVtb3ZlLlxyXG5cdCAqIEByZXR1cm4gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdGhhdCB3YXMgcmVtb3ZlZC5cclxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgICAgVGhyb3dzIGlmIHRoZSBpbmRleCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgY2hpbGRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5cclxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgVGhpcyBjaGlsZCBkaXNwbGF5IG9iamVjdCBiZWxvbmdzIHRvIGEgc2FuZGJveCB0b1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB3aGljaCB0aGUgY2FsbGluZyBvYmplY3QgZG9lcyBub3QgaGF2ZSBhY2Nlc3MuIFlvdVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBjYW4gYXZvaWQgdGhpcyBzaXR1YXRpb24gYnkgaGF2aW5nIHRoZSBjaGlsZCBtb3ZpZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBjYWxsIHRoZSA8Y29kZT5TZWN1cml0eS5hbGxvd0RvbWFpbigpPC9jb2RlPiBtZXRob2QuXHJcblx0ICovXHJcblx0cHVibGljIHJlbW92ZUNoaWxkQXQoaW5kZXg6bnVtYmVyIC8qaW50Ki8pOkRpc3BsYXlPYmplY3RcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW1vdmVDaGlsZCh0aGlzLl9jaGlsZHJlbltpbmRleF0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbGwgPGNvZGU+Y2hpbGQ8L2NvZGU+IERpc3BsYXlPYmplY3QgaW5zdGFuY2VzIGZyb20gdGhlIGNoaWxkIGxpc3RcclxuXHQgKiBvZiB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZS4gVGhlIDxjb2RlPnBhcmVudDwvY29kZT4gcHJvcGVydHlcclxuXHQgKiBvZiB0aGUgcmVtb3ZlZCBjaGlsZHJlbiBpcyBzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4sIGFuZCB0aGUgb2JqZWN0cyBhcmVcclxuXHQgKiBnYXJiYWdlIGNvbGxlY3RlZCBpZiBubyBvdGhlciByZWZlcmVuY2VzIHRvIHRoZSBjaGlsZHJlbiBleGlzdC5cclxuXHQgKlxyXG5cdCAqIFRoZSBnYXJiYWdlIGNvbGxlY3RvciByZWFsbG9jYXRlcyB1bnVzZWQgbWVtb3J5IHNwYWNlLiBXaGVuIGEgdmFyaWFibGUgb3JcclxuXHQgKiBvYmplY3QgaXMgbm8gbG9uZ2VyIGFjdGl2ZWx5IHJlZmVyZW5jZWQgb3Igc3RvcmVkIHNvbWV3aGVyZSwgdGhlIGdhcmJhZ2VcclxuXHQgKiBjb2xsZWN0b3Igc3dlZXBzIHRocm91Z2ggYW5kIHdpcGVzIG91dCB0aGUgbWVtb3J5IHNwYWNlIGl0IHVzZWQgdG8gb2NjdXB5XHJcblx0ICogaWYgbm8gb3RoZXIgcmVmZXJlbmNlcyB0byBpdCBleGlzdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBiZWdpbkluZGV4IFRoZSBiZWdpbm5pbmcgcG9zaXRpb24uIEEgdmFsdWUgc21hbGxlciB0aGFuIDAgdGhyb3dzIGEgUmFuZ2VFcnJvci5cclxuXHQgKiBAcGFyYW0gZW5kSW5kZXggVGhlIGVuZGluZyBwb3NpdGlvbi4gQSB2YWx1ZSBzbWFsbGVyIHRoYW4gMCB0aHJvd3MgYSBSYW5nZUVycm9yLlxyXG5cdCAqIEB0aHJvd3MgUmFuZ2VFcnJvciAgICBUaHJvd3MgaWYgdGhlIGJlZ2luSW5kZXggb3IgZW5kSW5kZXggcG9zaXRpb25zIGRvXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG5vdCBleGlzdCBpbiB0aGUgY2hpbGQgbGlzdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgcmVtb3ZlQ2hpbGRyZW4oYmVnaW5JbmRleDpudW1iZXIgLyppbnQqLyA9IDAsIGVuZEluZGV4Om51bWJlciAvKmludCovID0gMjE0NzQ4MzY0NylcclxuXHR7XHJcblx0XHRpZiAoYmVnaW5JbmRleCA8IDApXHJcblx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKFwiYmVnaW5JbmRleCBpcyBvdXQgb2YgcmFuZ2Ugb2YgdGhlIGNoaWxkIGxpc3RcIik7XHJcblxyXG5cdFx0aWYgKGVuZEluZGV4ID4gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoKVxyXG5cdFx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcihcImVuZEluZGV4IGlzIG91dCBvZiByYW5nZSBvZiB0aGUgY2hpbGQgbGlzdFwiKTtcclxuXHJcblx0XHRmb3IodmFyIGk6bnVtYmVyIC8qdWludCovID0gYmVnaW5JbmRleDsgaSA8IGVuZEluZGV4OyBpKyspXHJcblx0XHRcdHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5fY2hpbGRyZW5baV0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgcG9zaXRpb24gb2YgYW4gZXhpc3RpbmcgY2hpbGQgaW4gdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lci5cclxuXHQgKiBUaGlzIGFmZmVjdHMgdGhlIGxheWVyaW5nIG9mIGNoaWxkIG9iamVjdHMuIEZvciBleGFtcGxlLCB0aGUgZm9sbG93aW5nXHJcblx0ICogZXhhbXBsZSBzaG93cyB0aHJlZSBkaXNwbGF5IG9iamVjdHMsIGxhYmVsZWQgYSwgYiwgYW5kIGMsIGF0IGluZGV4XHJcblx0ICogcG9zaXRpb25zIDAsIDEsIGFuZCAyLCByZXNwZWN0aXZlbHk6XHJcblx0ICpcclxuXHQgKiA8cD5XaGVuIHlvdSB1c2UgdGhlIDxjb2RlPnNldENoaWxkSW5kZXgoKTwvY29kZT4gbWV0aG9kIGFuZCBzcGVjaWZ5IGFuXHJcblx0ICogaW5kZXggcG9zaXRpb24gdGhhdCBpcyBhbHJlYWR5IG9jY3VwaWVkLCB0aGUgb25seSBwb3NpdGlvbnMgdGhhdCBjaGFuZ2VcclxuXHQgKiBhcmUgdGhvc2UgaW4gYmV0d2VlbiB0aGUgZGlzcGxheSBvYmplY3QncyBmb3JtZXIgYW5kIG5ldyBwb3NpdGlvbi4gQWxsXHJcblx0ICogb3RoZXJzIHdpbGwgc3RheSB0aGUgc2FtZS4gSWYgYSBjaGlsZCBpcyBtb3ZlZCB0byBhbiBpbmRleCBMT1dFUiB0aGFuIGl0c1xyXG5cdCAqIGN1cnJlbnQgaW5kZXgsIGFsbCBjaGlsZHJlbiBpbiBiZXR3ZWVuIHdpbGwgSU5DUkVBU0UgYnkgMSBmb3IgdGhlaXIgaW5kZXhcclxuXHQgKiByZWZlcmVuY2UuIElmIGEgY2hpbGQgaXMgbW92ZWQgdG8gYW4gaW5kZXggSElHSEVSIHRoYW4gaXRzIGN1cnJlbnQgaW5kZXgsXHJcblx0ICogYWxsIGNoaWxkcmVuIGluIGJldHdlZW4gd2lsbCBERUNSRUFTRSBieSAxIGZvciB0aGVpciBpbmRleCByZWZlcmVuY2UuIEZvclxyXG5cdCAqIGV4YW1wbGUsIGlmIHRoZSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgaW4gdGhlIHByZXZpb3VzIGV4YW1wbGUgaXMgbmFtZWRcclxuXHQgKiA8Y29kZT5jb250YWluZXI8L2NvZGU+LCB5b3UgY2FuIHN3YXAgdGhlIHBvc2l0aW9uIG9mIHRoZSBkaXNwbGF5IG9iamVjdHNcclxuXHQgKiBsYWJlbGVkIGEgYW5kIGIgYnkgY2FsbGluZyB0aGUgZm9sbG93aW5nIGNvZGU6PC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhpcyBjb2RlIHJlc3VsdHMgaW4gdGhlIGZvbGxvd2luZyBhcnJhbmdlbWVudCBvZiBvYmplY3RzOjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBjaGlsZCBUaGUgY2hpbGQgRGlzcGxheU9iamVjdCBpbnN0YW5jZSBmb3Igd2hpY2ggeW91IHdhbnQgdG8gY2hhbmdlXHJcblx0ICogICAgICAgICAgICAgIHRoZSBpbmRleCBudW1iZXIuXHJcblx0ICogQHBhcmFtIGluZGV4IFRoZSByZXN1bHRpbmcgaW5kZXggbnVtYmVyIGZvciB0aGUgPGNvZGU+Y2hpbGQ8L2NvZGU+IGRpc3BsYXlcclxuXHQgKiAgICAgICAgICAgICAgb2JqZWN0LlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBUaHJvd3MgaWYgdGhlIGNoaWxkIHBhcmFtZXRlciBpcyBub3QgYSBjaGlsZCBvZiB0aGlzXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5cclxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgICAgVGhyb3dzIGlmIHRoZSBpbmRleCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgY2hpbGRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0Q2hpbGRJbmRleChjaGlsZDpEaXNwbGF5T2JqZWN0LCBpbmRleDpudW1iZXIgLyppbnQqLylcclxuXHR7XHJcblx0XHQvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN3YXBzIHRoZSB6LW9yZGVyIChmcm9udC10by1iYWNrIG9yZGVyKSBvZiB0aGUgdHdvIHNwZWNpZmllZCBjaGlsZFxyXG5cdCAqIG9iamVjdHMuIEFsbCBvdGhlciBjaGlsZCBvYmplY3RzIGluIHRoZSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgcmVtYWluIGluXHJcblx0ICogdGhlIHNhbWUgaW5kZXggcG9zaXRpb25zLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNoaWxkMSBUaGUgZmlyc3QgY2hpbGQgb2JqZWN0LlxyXG5cdCAqIEBwYXJhbSBjaGlsZDIgVGhlIHNlY29uZCBjaGlsZCBvYmplY3QuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFRocm93cyBpZiBlaXRoZXIgY2hpbGQgcGFyYW1ldGVyIGlzIG5vdCBhIGNoaWxkIG9mXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoaXMgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzd2FwQ2hpbGRyZW4oY2hpbGQxOkRpc3BsYXlPYmplY3QsIGNoaWxkMjpEaXNwbGF5T2JqZWN0KVxyXG5cdHtcclxuXHRcdC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3dhcHMgdGhlIHotb3JkZXIoZnJvbnQtdG8tYmFjayBvcmRlcikgb2YgdGhlIGNoaWxkIG9iamVjdHMgYXQgdGhlIHR3b1xyXG5cdCAqIHNwZWNpZmllZCBpbmRleCBwb3NpdGlvbnMgaW4gdGhlIGNoaWxkIGxpc3QuIEFsbCBvdGhlciBjaGlsZCBvYmplY3RzIGluXHJcblx0ICogdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciByZW1haW4gaW4gdGhlIHNhbWUgaW5kZXggcG9zaXRpb25zLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGluZGV4MSBUaGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIGZpcnN0IGNoaWxkIG9iamVjdC5cclxuXHQgKiBAcGFyYW0gaW5kZXgyIFRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgc2Vjb25kIGNoaWxkIG9iamVjdC5cclxuXHQgKiBAdGhyb3dzIFJhbmdlRXJyb3IgSWYgZWl0aGVyIGluZGV4IGRvZXMgbm90IGV4aXN0IGluIHRoZSBjaGlsZCBsaXN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzd2FwQ2hpbGRyZW5BdChpbmRleDE6bnVtYmVyIC8qaW50Ki8sIGluZGV4MjpudW1iZXIgLyppbnQqLylcclxuXHR7XHJcblx0XHQvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgcEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpXHJcblx0e1xyXG5cdFx0c3VwZXIucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXHJcblx0XHRcdHRoaXMuX2NoaWxkcmVuW2ldLnBJbnZhbGlkYXRlU2NlbmVUcmFuc2Zvcm0oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdHN1cGVyLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodmFsdWUpO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXHJcblx0XHRcdHRoaXMuX2NoaWxkcmVuW2ldLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodGhpcy5fbW91c2VDaGlsZHJlbik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIF9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0c3VwZXIuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWUpO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXHJcblx0XHRcdHRoaXMuX2NoaWxkcmVuW2ldLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHRoaXMuX3BJbXBsaWNpdFZpc2liaWxpdHkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHZhbHVlOlBhcnRpdGlvbiwgc2NlbmU6U2NlbmUpXHJcblx0e1xyXG5cdFx0c3VwZXIuX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih2YWx1ZSwgc2NlbmUpO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXHJcblx0XHRcdHRoaXMuX2NoaWxkcmVuW2ldLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24odGhpcy5fcEltcGxpY2l0UGFydGl0aW9uLCBzY2VuZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNoaWxkXHJcblx0ICovXHJcblx0cHJpdmF0ZSByZW1vdmVDaGlsZEludGVybmFsKGNoaWxkOkRpc3BsYXlPYmplY3QpOkRpc3BsYXlPYmplY3RcclxuXHR7XHJcblx0XHR0aGlzLl9jaGlsZHJlbi5zcGxpY2UodGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkKSwgMSk7XHJcblxyXG5cdFx0cmV0dXJuIGNoaWxkO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gRGlzcGxheU9iamVjdENvbnRhaW5lcjsiXX0=