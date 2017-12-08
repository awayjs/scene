"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("@awayjs/core");
var graphics_1 = require("@awayjs/graphics");
var BoundsType_1 = require("../bounds/BoundsType");
var CameraEvent_1 = require("../events/CameraEvent");
var DisplayObjectContainer_1 = require("./DisplayObjectContainer");
var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera(projection) {
        if (projection === void 0) { projection = null; }
        var _this = _super.call(this) || this;
        _this._pIsEntity = true;
        _this._projection = projection || new core_1.PerspectiveProjection();
        _this._projection.transform = _this._transform;
        _this.z = -1000;
        //default bounds type
        _this._boundsType = BoundsType_1.BoundsType.NULL;
        return _this;
    }
    Object.defineProperty(Camera.prototype, "assetType", {
        //@override
        get: function () {
            return Camera.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "projection", {
        /**
         *
         */
        get: function () {
            return this._projection;
        },
        set: function (value) {
            if (this._projection == value)
                return;
            if (!value)
                throw new Error("Projection cannot be null!");
            this._projection.transform = null;
            this._projection = value;
            this._projection.transform = this._transform;
            this.dispatchEvent(new CameraEvent_1.CameraEvent(CameraEvent_1.CameraEvent.PROJECTION_CHANGED, this));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calculates the normalised position in screen space of the given scene position.
     *
     * @param point3d the position vector of the scene coordinates to be projected.
     * @return The normalised screen position of the given scene coordinates.
     */
    Camera.prototype.project = function (vector3D) {
        return this._projection.project(vector3D);
    };
    /**
     * Calculates the scene position of the given normalized coordinates in screen space.
     *
     * @param nX The normalised x coordinate in screen space, minus the originX offset of the projection property.
     * @param nY The normalised y coordinate in screen space, minus the originY offset of the projection property.
     * @param sZ The z coordinate in screen space, representing the distance into the screen.
     * @return The scene position of the given screen coordinates.
     */
    Camera.prototype.unproject = function (nX, nY, sZ, target) {
        if (target === void 0) { target = null; }
        return this._projection.unproject(nX, nY, sZ, target);
    };
    return Camera;
}(DisplayObjectContainer_1.DisplayObjectContainer));
Camera.traverseName = graphics_1.TraverserBase.addEntityName("applyCamera");
Camera.assetType = "[asset Camera]";
exports.Camera = Camera;
