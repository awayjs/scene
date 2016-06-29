"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Matrix3D_1 = require("@awayjs/core/lib/geom/Matrix3D");
var Plane3D_1 = require("@awayjs/core/lib/geom/Plane3D");
var ProjectionEvent_1 = require("@awayjs/core/lib/events/ProjectionEvent");
var PerspectiveProjection_1 = require("@awayjs/core/lib/projections/PerspectiveProjection");
var HierarchicalProperties_1 = require("../base/HierarchicalProperties");
var BoundsType_1 = require("../bounds/BoundsType");
var DisplayObjectContainer_1 = require("../display/DisplayObjectContainer");
var CameraEvent_1 = require("../events/CameraEvent");
var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera(projection) {
        var _this = this;
        if (projection === void 0) { projection = null; }
        _super.call(this);
        this._viewProjection = new Matrix3D_1.Matrix3D();
        this._viewProjectionDirty = true;
        this._frustumPlanesDirty = true;
        this._pIsEntity = true;
        this._onProjectionMatrixChangedDelegate = function (event) { return _this.onProjectionMatrixChanged(event); };
        this._projection = projection || new PerspectiveProjection_1.PerspectiveProjection();
        this._projection.addEventListener(ProjectionEvent_1.ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
        this._frustumPlanes = [];
        for (var i = 0; i < 6; ++i)
            this._frustumPlanes[i] = new Plane3D_1.Plane3D();
        this.z = -1000;
        //default bounds type
        this._boundsType = BoundsType_1.BoundsType.NULL;
    }
    Object.defineProperty(Camera.prototype, "assetType", {
        //@override
        get: function () {
            return Camera.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.onProjectionMatrixChanged = function (event) {
        this._viewProjectionDirty = true;
        this._frustumPlanesDirty = true;
        this.dispatchEvent(event);
    };
    Object.defineProperty(Camera.prototype, "frustumPlanes", {
        get: function () {
            if (this._frustumPlanesDirty)
                this.updateFrustum();
            return this._frustumPlanes;
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.updateFrustum = function () {
        var a, b, c;
        //var d : Number;
        var c11, c12, c13, c14;
        var c21, c22, c23, c24;
        var c31, c32, c33, c34;
        var c41, c42, c43, c44;
        var p;
        var raw = this.viewProjection.rawData;
        var invLen;
        c11 = raw[0];
        c12 = raw[4];
        c13 = raw[8];
        c14 = raw[12];
        c21 = raw[1];
        c22 = raw[5];
        c23 = raw[9];
        c24 = raw[13];
        c31 = raw[2];
        c32 = raw[6];
        c33 = raw[10];
        c34 = raw[14];
        c41 = raw[3];
        c42 = raw[7];
        c43 = raw[11];
        c44 = raw[15];
        // left plane
        p = this._frustumPlanes[0];
        a = c41 + c11;
        b = c42 + c12;
        c = c43 + c13;
        invLen = 1 / Math.sqrt(a * a + b * b + c * c);
        p.a = a * invLen;
        p.b = b * invLen;
        p.c = c * invLen;
        p.d = -(c44 + c14) * invLen;
        // right plane
        p = this._frustumPlanes[1];
        a = c41 - c11;
        b = c42 - c12;
        c = c43 - c13;
        invLen = 1 / Math.sqrt(a * a + b * b + c * c);
        p.a = a * invLen;
        p.b = b * invLen;
        p.c = c * invLen;
        p.d = (c14 - c44) * invLen;
        // bottom
        p = this._frustumPlanes[2];
        a = c41 + c21;
        b = c42 + c22;
        c = c43 + c23;
        invLen = 1 / Math.sqrt(a * a + b * b + c * c);
        p.a = a * invLen;
        p.b = b * invLen;
        p.c = c * invLen;
        p.d = -(c44 + c24) * invLen;
        // top
        p = this._frustumPlanes[3];
        a = c41 - c21;
        b = c42 - c22;
        c = c43 - c23;
        invLen = 1 / Math.sqrt(a * a + b * b + c * c);
        p.a = a * invLen;
        p.b = b * invLen;
        p.c = c * invLen;
        p.d = (c24 - c44) * invLen;
        // near
        p = this._frustumPlanes[4];
        a = c31;
        b = c32;
        c = c33;
        invLen = 1 / Math.sqrt(a * a + b * b + c * c);
        p.a = a * invLen;
        p.b = b * invLen;
        p.c = c * invLen;
        p.d = -c34 * invLen;
        // far
        p = this._frustumPlanes[5];
        a = c41 - c31;
        b = c42 - c32;
        c = c43 - c33;
        invLen = 1 / Math.sqrt(a * a + b * b + c * c);
        p.a = a * invLen;
        p.b = b * invLen;
        p.c = c * invLen;
        p.d = (c34 - c44) * invLen;
        this._frustumPlanesDirty = false;
    };
    Camera.prototype.pInvalidateHierarchicalProperties = function (bitFlag) {
        if (_super.prototype.pInvalidateHierarchicalProperties.call(this, bitFlag))
            return true;
        if (this._hierarchicalPropsDirty & HierarchicalProperties_1.HierarchicalProperties.SCENE_TRANSFORM) {
            this._viewProjectionDirty = true;
            this._frustumPlanesDirty = true;
        }
        return false;
    };
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
            this._projection.removeEventListener(ProjectionEvent_1.ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
            this._projection = value;
            this._projection.addEventListener(ProjectionEvent_1.ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
            this.dispatchEvent(new CameraEvent_1.CameraEvent(CameraEvent_1.CameraEvent.PROJECTION_CHANGED, this));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "viewProjection", {
        /**
         *
         */
        get: function () {
            if (this._viewProjectionDirty) {
                this._viewProjection.copyFrom(this.inverseSceneTransform);
                this._viewProjection.append(this._projection.matrix);
                this._viewProjectionDirty = false;
            }
            return this._viewProjection;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calculates the ray in scene space from the camera to the given normalized coordinates in screen space.
     *
     * @param nX The normalised x coordinate in screen space, -1 corresponds to the left edge of the viewport, 1 to the right.
     * @param nY The normalised y coordinate in screen space, -1 corresponds to the top edge of the viewport, 1 to the bottom.
     * @param sZ The z coordinate in screen space, representing the distance into the screen.
     * @return The ray from the camera to the scene space position of the given screen coordinates.
     */
    Camera.prototype.getRay = function (nX, nY, sZ) {
        return this.sceneTransform.deltaTransformVector(this._projection.unproject(nX, nY, sZ));
    };
    /**
     * Calculates the normalised position in screen space of the given scene position.
     *
     * @param point3d the position vector of the scene coordinates to be projected.
     * @return The normalised screen position of the given scene coordinates.
     */
    Camera.prototype.project = function (point3d) {
        return this._projection.project(this.inverseSceneTransform.transformVector(point3d));
    };
    /**
     * Calculates the scene position of the given normalized coordinates in screen space.
     *
     * @param nX The normalised x coordinate in screen space, minus the originX offset of the projection property.
     * @param nY The normalised y coordinate in screen space, minus the originY offset of the projection property.
     * @param sZ The z coordinate in screen space, representing the distance into the screen.
     * @return The scene position of the given screen coordinates.
     */
    Camera.prototype.unproject = function (nX, nY, sZ) {
        return this.sceneTransform.transformVector(this._projection.unproject(nX, nY, sZ));
    };
    Camera.prototype._applyRenderer = function (renderer) {
        // Since this getter is invoked every iteration of the render loop, and
        // the prefab construct could affect the sub-sprites, the prefab is
        // validated here to give it a chance to rebuild.
        if (this._iSourcePrefab)
            this._iSourcePrefab._iValidate();
        //nothing to do here
    };
    Camera.assetType = "[asset Camera]";
    return Camera;
}(DisplayObjectContainer_1.DisplayObjectContainer));
exports.Camera = Camera;
