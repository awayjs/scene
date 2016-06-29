"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetEvent_1 = require("@awayjs/core/lib/events/AssetEvent");
var Point_1 = require("@awayjs/core/lib/geom/Point");
var Vector3D_1 = require("@awayjs/core/lib/geom/Vector3D");
var DisplayObject_1 = require("../display/DisplayObject");
var Graphics_1 = require("../graphics/Graphics");
/**
 * This class is used to create lightweight shapes using the ActionScript
 * drawing application program interface(API). The Shape class includes a
 * <code>graphics</code> property, which lets you access methods from the
 * Graphics class.
 *
 * <p>The Shape class also includes a <code>graphics</code>property, and it
 * includes other features not available to the Shape class. For example, a
 * Shape object is a display object container, whereas a Shape object is not
 * (and cannot contain child display objects). For this reason, Shape objects
 * consume less memory than Shape objects that contain the same graphics.
 * However, a Shape object supports user input events, while a Shape object
 * does not.</p>
 */
var Shape = (function (_super) {
    __extends(Shape, _super);
    /**
     * Create a new Shape object.
     *
     * @param material    [optional]        The material with which to render the Shape.
     */
    function Shape(material) {
        var _this = this;
        if (material === void 0) { material = null; }
        _super.call(this);
        //temp point used in hit testing
        this._tempPoint = new Point_1.Point();
        this._onGraphicsInvalidateDelegate = function (event) { return _this._onGraphicsInvalidate(event); };
        this._graphics = new Graphics_1.Graphics(); //unique graphics object for each Sprite
        this._graphics.addEventListener(AssetEvent_1.AssetEvent.INVALIDATE, this._onGraphicsInvalidateDelegate);
        this.material = material;
    }
    Object.defineProperty(Shape.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return Shape.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "graphics", {
        /**
         * Specifies the Graphics object belonging to this Shape object, where
         * drawing commands can occur.
         */
        get: function () {
            if (this._iSourcePrefab)
                this._iSourcePrefab._iValidate();
            return this._graphics;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "animator", {
        /**
         * Defines the animator of the graphics object.  Default value is <code>null</code>.
         */
        get: function () {
            return this._graphics.animator;
        },
        set: function (value) {
            if (this._graphics.animator)
                this._graphics.animator.removeOwner(this);
            this._graphics.animator = value;
            if (this._graphics.animator)
                this._graphics.animator.addOwner(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "material", {
        /**
         * The material with which to render the Shape.
         */
        get: function () {
            return this._graphics.material;
        },
        set: function (value) {
            this._graphics.material = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "style", {
        /**
         *
         */
        get: function () {
            return this._graphics.style;
        },
        set: function (value) {
            this._graphics.style = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    Shape.prototype.bakeTransformations = function () {
        this._graphics.applyTransformation(this.transform.matrix3D);
        this.transform.clearMatrix3D();
    };
    /**
     * @inheritDoc
     */
    Shape.prototype.dispose = function () {
        this.disposeValues();
        Shape._shapes.push(this);
    };
    /**
     * @inheritDoc
     */
    Shape.prototype.disposeValues = function () {
        _super.prototype.disposeValues.call(this);
        this._graphics.dispose();
    };
    /**
     * Clones this Shape instance along with all it's children, while re-using the same
     * material, graphics and animation set. The returned result will be a copy of this shape,
     * containing copies of all of it's children.
     *
     * Properties that are re-used (i.e. not cloned) by the new copy include name,
     * graphics, and material. Properties that are cloned or created anew for the copy
     * include subShapees, children of the shape, and the animator.
     *
     * If you want to copy just the shape, reusing it's graphics and material while not
     * cloning it's children, the simplest way is to create a new shape manually:
     *
     * <code>
     * var clone : Shape = new Shape(original.graphics, original.material);
     * </code>
     */
    Shape.prototype.clone = function () {
        var newInstance = (Shape._shapes.length) ? Shape._shapes.pop() : new Shape();
        this.copyTo(newInstance);
        return newInstance;
    };
    Shape.prototype.copyTo = function (shape) {
        _super.prototype.copyTo.call(this, shape);
        this._graphics.copyTo(shape.graphics);
    };
    /**
     * //TODO
     *
     * @protected
     */
    Shape.prototype._pUpdateBoxBounds = function () {
        _super.prototype._pUpdateBoxBounds.call(this);
        this._pBoxBounds.union(this._graphics.getBoxBounds(), this._pBoxBounds);
    };
    Shape.prototype._pUpdateSphereBounds = function () {
        _super.prototype._pUpdateSphereBounds.call(this);
        var box = this.getBox();
        if (!this._center)
            this._center = new Vector3D_1.Vector3D();
        this._center.x = box.x + box.width / 2;
        this._center.y = box.y + box.height / 2;
        this._center.z = box.z + box.depth / 2;
        this._pSphereBounds = this._graphics.getSphereBounds(this._center, this._pSphereBounds);
    };
    /**
     * //TODO
     *
     * @private
     */
    Shape.prototype._onGraphicsInvalidate = function (event) {
        if (this._pIsEntity != Boolean(this._graphics.count)) {
            if (this._pImplicitPartition)
                this._pImplicitPartition._iUnregisterEntity(this);
            this._pIsEntity = Boolean(this._graphics.count);
            if (this._pImplicitPartition)
                this._pImplicitPartition._iRegisterEntity(this);
        }
        this._pInvalidateBounds();
    };
    /**
     *
     * @param renderer
     *
     * @internal
     */
    Shape.prototype._acceptTraverser = function (traverser) {
        this.graphics.acceptTraverser(traverser);
    };
    Shape.prototype._hitTestPointInternal = function (x, y, shapeFlag, masksFlag) {
        if (this._graphics.count) {
            this._tempPoint.setTo(x, y);
            var local = this.globalToLocal(this._tempPoint, this._tempPoint);
            var box;
            //early out for box test
            if (!(box = this.getBox()).contains(local.x, local.y, 0))
                return false;
            //early out for non-shape tests
            if (!shapeFlag)
                return true;
            //ok do the graphics thing
            if (this._graphics._hitTestPointInternal(local.x, local.y))
                return true;
        }
        return false;
    };
    Shape.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._graphics.clear();
    };
    Shape._shapes = new Array();
    Shape.assetType = "[asset Shape]";
    return Shape;
}(DisplayObject_1.DisplayObject));
exports.Shape = Shape;
