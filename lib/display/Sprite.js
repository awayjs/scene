"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetEvent_1 = require("@awayjs/core/lib/events/AssetEvent");
var Point_1 = require("@awayjs/core/lib/geom/Point");
var Vector3D_1 = require("@awayjs/core/lib/geom/Vector3D");
var Graphics_1 = require("../graphics/Graphics");
var DisplayObjectContainer_1 = require("../display/DisplayObjectContainer");
/**
 * Sprite is an instance of a Graphics, augmenting it with a presence in the scene graph, a material, and an animation
 * state. It consists out of Graphices, which in turn correspond to SubGeometries. Graphices allow different parts
 * of the graphics to be assigned different materials.
 */
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    /**
     * Create a new Sprite object.
     *
     * @param material    [optional]        The material with which to render the Sprite.
     */
    function Sprite(material) {
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
    Object.defineProperty(Sprite.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return Sprite.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "graphics", {
        /**
         * Specifies the Graphics object belonging to this Sprite object, where
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
    Object.defineProperty(Sprite.prototype, "animator", {
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
    Object.defineProperty(Sprite.prototype, "material", {
        /**
         * The material with which to render the Sprite.
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
    Object.defineProperty(Sprite.prototype, "style", {
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
    Sprite.prototype.bakeTransformations = function () {
        this._graphics.applyTransformation(this.transform.matrix3D);
        this.transform.clearMatrix3D();
    };
    /**
     * @inheritDoc
     */
    Sprite.prototype.dispose = function () {
        this.disposeValues();
        Sprite._sprites.push(this);
    };
    /**
     * @inheritDoc
     */
    Sprite.prototype.disposeValues = function () {
        _super.prototype.disposeValues.call(this);
        this._graphics.dispose();
    };
    /**
     * Clones this Sprite instance along with all it's children, while re-using the same
     * material, graphics and animation set. The returned result will be a copy of this sprite,
     * containing copies of all of it's children.
     *
     * Properties that are re-used (i.e. not cloned) by the new copy include name,
     * graphics, and material. Properties that are cloned or created anew for the copy
     * include subSpritees, children of the sprite, and the animator.
     *
     * If you want to copy just the sprite, reusing it's graphics and material while not
     * cloning it's children, the simplest way is to create a new sprite manually:
     *
     * <code>
     * var clone : Sprite = new Sprite(original.graphics, original.material);
     * </code>
     */
    Sprite.prototype.clone = function () {
        var newInstance = (Sprite._sprites.length) ? Sprite._sprites.pop() : new Sprite();
        this.copyTo(newInstance);
        return newInstance;
    };
    Sprite.prototype.copyTo = function (sprite) {
        _super.prototype.copyTo.call(this, sprite);
        this._graphics.copyTo(sprite.graphics);
    };
    /**
     * //TODO
     *
     * @protected
     */
    Sprite.prototype._pUpdateBoxBounds = function () {
        _super.prototype._pUpdateBoxBounds.call(this);
        this._pBoxBounds.union(this._graphics.getBoxBounds(), this._pBoxBounds);
    };
    Sprite.prototype._pUpdateSphereBounds = function () {
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
    Sprite.prototype._onGraphicsInvalidate = function (event) {
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
    Sprite.prototype._acceptTraverser = function (traverser) {
        this.graphics.acceptTraverser(traverser);
    };
    Sprite.prototype._hitTestPointInternal = function (x, y, shapeFlag, masksFlag) {
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
        return _super.prototype._hitTestPointInternal.call(this, x, y, shapeFlag, masksFlag);
    };
    Sprite.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._graphics.clear();
    };
    Sprite._sprites = new Array();
    Sprite.assetType = "[asset Sprite]";
    return Sprite;
}(DisplayObjectContainer_1.DisplayObjectContainer));
exports.Sprite = Sprite;
