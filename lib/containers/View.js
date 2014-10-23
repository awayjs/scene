var getTimer = require("awayjs-core/lib/utils/getTimer");
var Scene = require("awayjs-display/lib/containers/Scene");
var RaycastPicker = require("awayjs-display/lib/pick/RaycastPicker");
var Camera = require("awayjs-display/lib/entities/Camera");
var CameraEvent = require("awayjs-display/lib/events/CameraEvent");
var SceneEvent = require("awayjs-display/lib/events/SceneEvent");
var RendererEvent = require("awayjs-display/lib/events/RendererEvent");
var MouseManager = require("awayjs-display/lib/managers/MouseManager");
var View = (function () {
    /*
     ***********************************************************************
     * Disabled / Not yet implemented
     ***********************************************************************
     *
     * private _background:away.textures.Texture2DBase;
     *
     * public _pTouch3DManager:away.managers.Touch3DManager;
     *
     */
    function View(renderer, scene, camera) {
        var _this = this;
        if (scene === void 0) { scene = null; }
        if (camera === void 0) { camera = null; }
        this._width = 0;
        this._height = 0;
        this._time = 0;
        this._deltaTime = 0;
        this._backgroundColor = 0x000000;
        this._backgroundAlpha = 1;
        this._viewportDirty = true;
        this._scissorDirty = true;
        this._mousePicker = new RaycastPicker();
        this._onScenePartitionChangedDelegate = function (event) { return _this.onScenePartitionChanged(event); };
        this._onProjectionChangedDelegate = function (event) { return _this.onProjectionChanged(event); };
        this._onViewportUpdatedDelegate = function (event) { return _this.onViewportUpdated(event); };
        this._onScissorUpdatedDelegate = function (event) { return _this.onScissorUpdated(event); };
        this.scene = scene || new Scene();
        this.camera = camera || new Camera();
        this.renderer = renderer;
        //make sure document border is zero
        document.body.style.margin = "0px";
        this._htmlElement = document.createElement("div");
        this._htmlElement.style.position = "absolute";
        document.body.appendChild(this._htmlElement);
        this._mouseManager = MouseManager.getInstance();
        this._mouseManager.registerView(this);
        //			if (this._shareContext)
        //				this._mouse3DManager.addViewLayer(this);
    }
    /**
     *
     * @param e
     */
    View.prototype.onScenePartitionChanged = function (event) {
        if (this._pCamera)
            this._pCamera.partition = this.scene.partition;
    };
    Object.defineProperty(View.prototype, "mouseX", {
        get: function () {
            return this._pMouseX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "mouseY", {
        get: function () {
            return this._pMouseY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "htmlElement", {
        /**
         *
         */
        get: function () {
            return this._htmlElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "renderer", {
        /**
         *
         */
        get: function () {
            return this._pRenderer;
        },
        set: function (value) {
            if (this._pRenderer == value)
                return;
            if (this._pRenderer) {
                this._pRenderer.dispose();
                this._pRenderer.removeEventListener(RendererEvent.VIEWPORT_UPDATED, this._onViewportUpdatedDelegate);
                this._pRenderer.removeEventListener(RendererEvent.SCISSOR_UPDATED, this._onScissorUpdatedDelegate);
            }
            this._pRenderer = value;
            this._pRenderer.addEventListener(RendererEvent.VIEWPORT_UPDATED, this._onViewportUpdatedDelegate);
            this._pRenderer.addEventListener(RendererEvent.SCISSOR_UPDATED, this._onScissorUpdatedDelegate);
            //reset entity collector
            this._pEntityCollector = this._pRenderer._iCreateEntityCollector();
            if (this._pCamera)
                this._pEntityCollector.camera = this._pCamera;
            //reset back buffer
            this._pRenderer._iBackgroundR = ((this._backgroundColor >> 16) & 0xff) / 0xff;
            this._pRenderer._iBackgroundG = ((this._backgroundColor >> 8) & 0xff) / 0xff;
            this._pRenderer._iBackgroundB = (this._backgroundColor & 0xff) / 0xff;
            this._pRenderer._iBackgroundAlpha = this._backgroundAlpha;
            this._pRenderer.width = this._width;
            this._pRenderer.height = this._height;
            this._pRenderer.shareContext = this._shareContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "shareContext", {
        /**
         *
         */
        get: function () {
            return this._shareContext;
        },
        set: function (value) {
            if (this._shareContext == value)
                return;
            this._shareContext = value;
            if (this._pRenderer)
                this._pRenderer.shareContext = this._shareContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "backgroundColor", {
        /**
         *
         */
        get: function () {
            return this._backgroundColor;
        },
        set: function (value) {
            if (this._backgroundColor == value)
                return;
            this._backgroundColor = value;
            this._pRenderer._iBackgroundR = ((value >> 16) & 0xff) / 0xff;
            this._pRenderer._iBackgroundG = ((value >> 8) & 0xff) / 0xff;
            this._pRenderer._iBackgroundB = (value & 0xff) / 0xff;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "backgroundAlpha", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return this._backgroundAlpha;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            if (value > 1)
                value = 1;
            else if (value < 0)
                value = 0;
            if (this._backgroundAlpha == value)
                return;
            this._pRenderer._iBackgroundAlpha = this._backgroundAlpha = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "camera", {
        /**
         *
         * @returns {Camera3D}
         */
        get: function () {
            return this._pCamera;
        },
        /**
         * Set camera that's used to render the scene for this viewport
         */
        set: function (value) {
            if (this._pCamera == value)
                return;
            if (this._pCamera)
                this._pCamera.removeEventListener(CameraEvent.PROJECTION_CHANGED, this._onProjectionChangedDelegate);
            this._pCamera = value;
            if (this._pEntityCollector)
                this._pEntityCollector.camera = this._pCamera;
            if (this._pScene)
                this._pCamera.partition = this._pScene.partition;
            this._pCamera.addEventListener(CameraEvent.PROJECTION_CHANGED, this._onProjectionChangedDelegate);
            this._scissorDirty = true;
            this._viewportDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "scene", {
        /**
         *
         * @returns {away.containers.Scene3D}
         */
        get: function () {
            return this._pScene;
        },
        /**
         * Set the scene that's used to render for this viewport
         */
        set: function (value) {
            if (this._pScene == value)
                return;
            if (this._pScene)
                this._pScene.removeEventListener(SceneEvent.PARTITION_CHANGED, this._onScenePartitionChangedDelegate);
            this._pScene = value;
            this._pScene.addEventListener(SceneEvent.PARTITION_CHANGED, this._onScenePartitionChangedDelegate);
            if (this._pCamera)
                this._pCamera.partition = this._pScene.partition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "deltaTime", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return this._deltaTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "width", {
        /**
         *
         */
        get: function () {
            return this._width;
        },
        set: function (value) {
            if (this._width == value)
                return;
            this._width = value;
            this._aspectRatio = this._width / this._height;
            this._pCamera.projection._iAspectRatio = this._aspectRatio;
            this._pRenderer.width = value;
            this._htmlElement.style.width = value + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "height", {
        /**
         *
         */
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (this._height == value)
                return;
            this._height = value;
            this._aspectRatio = this._width / this._height;
            this._pCamera.projection._iAspectRatio = this._aspectRatio;
            this._pRenderer.height = value;
            this._htmlElement.style.height = value + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "mousePicker", {
        /**
         *
         */
        get: function () {
            return this._mousePicker;
        },
        set: function (value) {
            if (this._mousePicker == value)
                return;
            if (value == null)
                this._mousePicker = new RaycastPicker();
            else
                this._mousePicker = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "x", {
        /**
         *
         */
        get: function () {
            return this._pRenderer.x;
        },
        set: function (value) {
            if (this._pRenderer.x == value)
                return;
            this._pRenderer.x == value;
            this._htmlElement.style.left = value + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "y", {
        /**
         *
         */
        get: function () {
            return this._pRenderer.y;
        },
        set: function (value) {
            if (this._pRenderer.y == value)
                return;
            this._pRenderer.y == value;
            this._htmlElement.style.top = value + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "visible", {
        /**
         *
         */
        get: function () {
            return (this._htmlElement.style.visibility == "visible");
        },
        set: function (value) {
            this._htmlElement.style.visibility = value ? "visible" : "hidden";
            //TODO transfer visible property to associated context (if one exists)
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "renderedFacesCount", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return 0; //TODO
            //return this._pEntityCollector._pNumTriangles;//numTriangles;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Renders the view.
     */
    View.prototype.render = function () {
        this.pUpdateTime();
        //update view and size data
        this._pCamera.projection._iAspectRatio = this._aspectRatio;
        if (this._scissorDirty) {
            this._scissorDirty = false;
            this._pCamera.projection._iUpdateScissorRect(this._pRenderer.scissorRect.x, this._pRenderer.scissorRect.y, this._pRenderer.scissorRect.width, this._pRenderer.scissorRect.height);
        }
        if (this._viewportDirty) {
            this._viewportDirty = false;
            this._pCamera.projection._iUpdateViewport(this._pRenderer.viewPort.x, this._pRenderer.viewPort.y, this._pRenderer.viewPort.width, this._pRenderer.viewPort.height);
        }
        // update picking
        if (!this._shareContext) {
            if (this.forceMouseMove && this._htmlElement == this._mouseManager._iActiveDiv && !this._mouseManager._iUpdateDirty)
                this._mouseManager._iCollidingObject = this.mousePicker.getViewCollision(this._pMouseX, this._pMouseY, this);
            this._mouseManager.fireMouseEvents(this.forceMouseMove);
        }
        //_touch3DManager.updateCollider();
        //clear entity collector ready for collection
        this._pEntityCollector.clear();
        // collect stuff to render
        this._pScene.traversePartitions(this._pEntityCollector);
        //render the contents of the entity collector
        this._pRenderer.render(this._pEntityCollector);
    };
    /**
     *
     */
    View.prototype.pUpdateTime = function () {
        var time = getTimer();
        if (this._time == 0)
            this._time = time;
        this._deltaTime = time - this._time;
        this._time = time;
    };
    /**
     *
     */
    View.prototype.dispose = function () {
        this._pRenderer.dispose();
        // TODO: imeplement mouseManager / touch3DManager
        this._mouseManager.unregisterView(this);
        //this._touch3DManager.disableTouchListeners(this);
        //this._touch3DManager.dispose();
        this._mouseManager = null;
        //this._touch3DManager = null;
        this._pRenderer = null;
        this._pEntityCollector = null;
    };
    Object.defineProperty(View.prototype, "iEntityCollector", {
        /**
         *
         */
        get: function () {
            return this._pEntityCollector;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    View.prototype.onProjectionChanged = function (event) {
        this._scissorDirty = true;
        this._viewportDirty = true;
    };
    /**
     *
     */
    View.prototype.onViewportUpdated = function (event) {
        this._viewportDirty = true;
    };
    /**
     *
     */
    View.prototype.onScissorUpdated = function (event) {
        this._scissorDirty = true;
    };
    View.prototype.project = function (point3d) {
        var v = this._pCamera.project(point3d);
        v.x = v.x * this._pRenderer.viewPort.width / 2 + this._width * this._pCamera.projection.originX;
        v.y = v.y * this._pRenderer.viewPort.height / 2 + this._height * this._pCamera.projection.originY;
        return v;
    };
    View.prototype.unproject = function (sX, sY, sZ) {
        return this._pCamera.unproject(2 * (sX - this._width * this._pCamera.projection.originX) / this._pRenderer.viewPort.width, 2 * (sY - this._height * this._pCamera.projection.originY) / this._pRenderer.viewPort.height, sZ);
    };
    View.prototype.getRay = function (sX, sY, sZ) {
        return this._pCamera.getRay((sX * 2 - this._width) / this._width, (sY * 2 - this._height) / this._height, sZ);
    };
    /*TODO: implement Background
     public get background():away.textures.Texture2DBase
     {
     return this._background;
     }
     */
    /*TODO: implement Background
     public set background( value:away.textures.Texture2DBase )
     {
     this._background = value;
     this._renderer.background = _background;
     }
     */
    // TODO: required dependency stageGL
    View.prototype.updateCollider = function () {
        if (!this._shareContext) {
            if (this._htmlElement == this._mouseManager._iActiveDiv)
                this._mouseManager._iCollidingObject = this.mousePicker.getViewCollision(this._pMouseX, this._pMouseY, this);
        }
        else {
            var collidingObject = this.mousePicker.getViewCollision(this._pMouseX, this._pMouseY, this);
            if (this.layeredView || this._mouseManager._iCollidingObject == null || collidingObject.rayEntryDistance < this._mouseManager._iCollidingObject.rayEntryDistance)
                this._mouseManager._iCollidingObject = collidingObject;
        }
    };
    return View;
})();
module.exports = View;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL3ZpZXcudHMiXSwibmFtZXMiOlsiVmlldyIsIlZpZXcuY29uc3RydWN0b3IiLCJWaWV3Lm9uU2NlbmVQYXJ0aXRpb25DaGFuZ2VkIiwiVmlldy5tb3VzZVgiLCJWaWV3Lm1vdXNlWSIsIlZpZXcuaHRtbEVsZW1lbnQiLCJWaWV3LnJlbmRlcmVyIiwiVmlldy5zaGFyZUNvbnRleHQiLCJWaWV3LmJhY2tncm91bmRDb2xvciIsIlZpZXcuYmFja2dyb3VuZEFscGhhIiwiVmlldy5jYW1lcmEiLCJWaWV3LnNjZW5lIiwiVmlldy5kZWx0YVRpbWUiLCJWaWV3LndpZHRoIiwiVmlldy5oZWlnaHQiLCJWaWV3Lm1vdXNlUGlja2VyIiwiVmlldy54IiwiVmlldy55IiwiVmlldy52aXNpYmxlIiwiVmlldy5yZW5kZXJlZEZhY2VzQ291bnQiLCJWaWV3LnJlbmRlciIsIlZpZXcucFVwZGF0ZVRpbWUiLCJWaWV3LmRpc3Bvc2UiLCJWaWV3LmlFbnRpdHlDb2xsZWN0b3IiLCJWaWV3Lm9uUHJvamVjdGlvbkNoYW5nZWQiLCJWaWV3Lm9uVmlld3BvcnRVcGRhdGVkIiwiVmlldy5vblNjaXNzb3JVcGRhdGVkIiwiVmlldy5wcm9qZWN0IiwiVmlldy51bnByb2plY3QiLCJWaWV3LmdldFJheSIsIlZpZXcudXBkYXRlQ29sbGlkZXIiXSwibWFwcGluZ3MiOiJBQUlBLElBQU8sUUFBUSxXQUFnQixnQ0FBZ0MsQ0FBQyxDQUFDO0FBRWpFLElBQU8sS0FBSyxXQUFnQixxQ0FBcUMsQ0FBQyxDQUFDO0FBR25FLElBQU8sYUFBYSxXQUFjLHVDQUF1QyxDQUFDLENBQUM7QUFJM0UsSUFBTyxNQUFNLFdBQWdCLG9DQUFvQyxDQUFDLENBQUM7QUFDbkUsSUFBTyxXQUFXLFdBQWUsdUNBQXVDLENBQUMsQ0FBQztBQUMxRSxJQUFPLFVBQVUsV0FBZSxzQ0FBc0MsQ0FBQyxDQUFDO0FBQ3hFLElBQU8sYUFBYSxXQUFjLHlDQUF5QyxDQUFD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QzFGQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxHQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUU1RkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDVkEsQ0FBQ0E7SUFFTTNCLHdCQUFTQSxHQUFoQkEsVUFBaUJBLEVBQVNBLEVBQUVBLEVBQVNBLEVBQUVBLEVBQVNBO1FBRS9DNEIsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFFbE5BLENBQUNBO0lBRU01QixxQkFBTUEsR0FBYkEsVUFBY0EsRUFBU0EsRUFBRUEsRUFBU0EsRUFBRUEsRUFBU0E7UUFFNUM2QixNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtJQUN2R0EsQ0FBQ0E7SUFpQkQ3Qjs7Ozs7T0FLR0E7SUFDSEE7Ozs7OztPQU1HQTtJQUVIQSxvQ0FBb0NBO0lBQzdCQSw2QkFBY0EsR0FBckJBO1FBRUM4QixFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN6QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsSUFBSUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7Z0JBQ3ZEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxpQkFBaUJBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDL0dBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ1BBLElBQUlBLGVBQWVBLEdBQXNCQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBRS9HQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxJQUFJQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxpQkFBaUJBLElBQUlBLElBQUlBLElBQUlBLGVBQWVBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxnQkFBZ0JBLENBQUNBO2dCQUNoS0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxlQUFlQSxDQUFDQTtRQUN6REEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFDRjlCLFdBQUNBO0FBQURBLENBOWpCQSxBQThqQkNBLElBQUE7QUFFRCxBQUFjLGlCQUFMLElBQUksQ0FBQyIsImZpbGUiOiJjb250YWluZXJzL1ZpZXcuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgUG9pbnRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Qb2ludFwiKTtcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUmVjdGFuZ2xlXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgZ2V0VGltZXJcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvZ2V0VGltZXJcIik7XG5cbmltcG9ydCBTY2VuZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1NjZW5lXCIpO1xuaW1wb3J0IElQaWNrZXJcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGljay9JUGlja2VyXCIpO1xuaW1wb3J0IFBpY2tpbmdDb2xsaXNpb25WT1x0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL1BpY2tpbmdDb2xsaXNpb25WT1wiKTtcbmltcG9ydCBSYXljYXN0UGlja2VyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGljay9SYXljYXN0UGlja2VyXCIpO1xuaW1wb3J0IElSZW5kZXJlclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcmVuZGVyL0lSZW5kZXJlclwiKTtcbmltcG9ydCBDU1NSZW5kZXJlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvQ1NTUmVuZGVyZXJCYXNlXCIpO1xuaW1wb3J0IElDb2xsZWN0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0NhbWVyYVwiKTtcbmltcG9ydCBDYW1lcmFFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL0NhbWVyYUV2ZW50XCIpO1xuaW1wb3J0IFNjZW5lRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9TY2VuZUV2ZW50XCIpO1xuaW1wb3J0IFJlbmRlcmVyRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvUmVuZGVyZXJFdmVudFwiKTtcbmltcG9ydCBNb3VzZU1hbmFnZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hbmFnZXJzL01vdXNlTWFuYWdlclwiKTtcblxuY2xhc3MgVmlld1xue1xuXG5cdC8qXG5cdCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdCAqIERldmVsb3BtZW50IE5vdGVzXG5cdCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdCAqXG5cdCAqIFNoYXJlQ29udGV4dCAgICAgLSB0aGlzIGlzIG5vdCBiZWluZyB1c2VkIGF0IHRoZSBtb21lbnQgaW50ZWdyYXRpb24gd2l0aCBvdGhlciBmcmFtZXdvcmtzIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQgb3IgdGVzdGVkXG5cdCAqICAgICAgICAgICAgICAgICAgICBhbmQgKCBfbG9jYWxQb3MgLyBfZ2xvYmFsUG9zICkgcG9zaXRpb24gb2Ygdmlld3BvcnQgYXJlIHRoZSBzYW1lIGZvciB0aGUgbW9tZW50XG5cdCAqXG5cdCAqIEJhY2tncm91bmRcblx0ICogICAgICAgICAgICAgICAgICAtIHRoaXMgaXMgY3VycmVudGx5IG5vdCBiZWluZyBpbmNsdWRlZCBpbiBvdXIgdGVzdHMgYW5kIGlzIGN1cnJlbnRseSBkaXNhYmxlZFxuXHQgKlxuXHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0ICovXG5cblx0Ly8gUHJvdGVjdGVkXG5cdHB1YmxpYyBfcFNjZW5lOlNjZW5lO1xuXHRwdWJsaWMgX3BDYW1lcmE6Q2FtZXJhO1xuXHRwdWJsaWMgX3BFbnRpdHlDb2xsZWN0b3I6SUNvbGxlY3Rvcjtcblx0cHVibGljIF9wUmVuZGVyZXI6SVJlbmRlcmVyO1xuXG5cdC8vIFByaXZhdGVcblx0cHJpdmF0ZSBfYXNwZWN0UmF0aW86bnVtYmVyO1xuXHRwcml2YXRlIF93aWR0aDpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9oZWlnaHQ6bnVtYmVyID0gMDtcblxuXHRwcml2YXRlIF90aW1lOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX2RlbHRhVGltZTpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9iYWNrZ3JvdW5kQ29sb3I6bnVtYmVyID0gMHgwMDAwMDA7XG5cdHByaXZhdGUgX2JhY2tncm91bmRBbHBoYTpudW1iZXIgPSAxO1xuXG5cdHByaXZhdGUgX3ZpZXdwb3J0RGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX3NjaXNzb3JEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblxuXHRwcml2YXRlIF9vblNjZW5lUGFydGl0aW9uQ2hhbmdlZERlbGVnYXRlOihldmVudDpTY2VuZUV2ZW50KSA9PiB2b2lkO1xuXHRwcml2YXRlIF9vblByb2plY3Rpb25DaGFuZ2VkRGVsZWdhdGU6KGV2ZW50OkNhbWVyYUV2ZW50KSA9PiB2b2lkO1xuXHRwcml2YXRlIF9vblZpZXdwb3J0VXBkYXRlZERlbGVnYXRlOihldmVudDpSZW5kZXJlckV2ZW50KSA9PiB2b2lkO1xuXHRwcml2YXRlIF9vblNjaXNzb3JVcGRhdGVkRGVsZWdhdGU6KGV2ZW50OlJlbmRlcmVyRXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX21vdXNlTWFuYWdlcjpNb3VzZU1hbmFnZXI7XG5cdHByaXZhdGUgX21vdXNlUGlja2VyOklQaWNrZXIgPSBuZXcgUmF5Y2FzdFBpY2tlcigpO1xuXG5cdHByaXZhdGUgX2h0bWxFbGVtZW50OkhUTUxEaXZFbGVtZW50O1xuXHRwcml2YXRlIF9zaGFyZUNvbnRleHQ6Ym9vbGVhbjtcblx0cHVibGljIF9wTW91c2VYOm51bWJlcjtcblx0cHVibGljIF9wTW91c2VZOm51bWJlcjtcblxuXHQvKlxuXHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0ICogRGlzYWJsZWQgLyBOb3QgeWV0IGltcGxlbWVudGVkXG5cdCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHQgKlxuXHQgKiBwcml2YXRlIF9iYWNrZ3JvdW5kOmF3YXkudGV4dHVyZXMuVGV4dHVyZTJEQmFzZTtcblx0ICpcblx0ICogcHVibGljIF9wVG91Y2gzRE1hbmFnZXI6YXdheS5tYW5hZ2Vycy5Ub3VjaDNETWFuYWdlcjtcblx0ICpcblx0ICovXG5cdGNvbnN0cnVjdG9yKHJlbmRlcmVyOklSZW5kZXJlciwgc2NlbmU6U2NlbmUgPSBudWxsLCBjYW1lcmE6Q2FtZXJhID0gbnVsbClcblx0e1xuXHRcdHRoaXMuX29uU2NlbmVQYXJ0aXRpb25DaGFuZ2VkRGVsZWdhdGUgPSAoZXZlbnQ6U2NlbmVFdmVudCkgPT4gdGhpcy5vblNjZW5lUGFydGl0aW9uQ2hhbmdlZChldmVudCk7XG5cdFx0dGhpcy5fb25Qcm9qZWN0aW9uQ2hhbmdlZERlbGVnYXRlID0gKGV2ZW50OkNhbWVyYUV2ZW50KSA9PiB0aGlzLm9uUHJvamVjdGlvbkNoYW5nZWQoZXZlbnQpO1xuXHRcdHRoaXMuX29uVmlld3BvcnRVcGRhdGVkRGVsZWdhdGUgPSAoZXZlbnQ6UmVuZGVyZXJFdmVudCkgPT4gdGhpcy5vblZpZXdwb3J0VXBkYXRlZChldmVudCk7XG5cdFx0dGhpcy5fb25TY2lzc29yVXBkYXRlZERlbGVnYXRlID0gKGV2ZW50OlJlbmRlcmVyRXZlbnQpID0+IHRoaXMub25TY2lzc29yVXBkYXRlZChldmVudCk7XG5cblx0XHR0aGlzLnNjZW5lID0gc2NlbmUgfHwgbmV3IFNjZW5lKCk7XG5cdFx0dGhpcy5jYW1lcmEgPSBjYW1lcmEgfHwgbmV3IENhbWVyYSgpO1xuXHRcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcblxuXHRcdC8vbWFrZSBzdXJlIGRvY3VtZW50IGJvcmRlciBpcyB6ZXJvXG5cdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW4gPSBcIjBweFwiO1xuXG5cdFx0dGhpcy5faHRtbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHRoaXMuX2h0bWxFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9odG1sRWxlbWVudCk7XG5cblx0XHR0aGlzLl9tb3VzZU1hbmFnZXIgPSBNb3VzZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcblx0XHR0aGlzLl9tb3VzZU1hbmFnZXIucmVnaXN0ZXJWaWV3KHRoaXMpO1xuXG4vL1x0XHRcdGlmICh0aGlzLl9zaGFyZUNvbnRleHQpXG4vL1x0XHRcdFx0dGhpcy5fbW91c2UzRE1hbmFnZXIuYWRkVmlld0xheWVyKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBlXG5cdCAqL1xuXHRwcml2YXRlIG9uU2NlbmVQYXJ0aXRpb25DaGFuZ2VkKGV2ZW50OlNjZW5lRXZlbnQpXG5cdHtcblx0XHRpZiAodGhpcy5fcENhbWVyYSlcblx0XHRcdHRoaXMuX3BDYW1lcmEucGFydGl0aW9uID0gdGhpcy5zY2VuZS5wYXJ0aXRpb247XG5cdH1cblxuXHRwdWJsaWMgbGF5ZXJlZFZpZXc6Ym9vbGVhbjsgLy9UT0RPOiBzb21ldGhpbmcgdG8gZW5hYmxlIHRoaXMgY29ycmVjdGx5XG5cblx0cHVibGljIGdldCBtb3VzZVgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTW91c2VYO1xuXHR9XG5cblx0cHVibGljIGdldCBtb3VzZVkoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTW91c2VZO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGh0bWxFbGVtZW50KCk6SFRNTERpdkVsZW1lbnRcblx0e1xuXHRcdHJldHVybiB0aGlzLl9odG1sRWxlbWVudDtcblx0fVxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgcmVuZGVyZXIoKTpJUmVuZGVyZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUmVuZGVyZXI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHJlbmRlcmVyKHZhbHVlOklSZW5kZXJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9wUmVuZGVyZXIgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAodGhpcy5fcFJlbmRlcmVyKSB7XG5cdFx0XHR0aGlzLl9wUmVuZGVyZXIuZGlzcG9zZSgpO1xuXHRcdFx0dGhpcy5fcFJlbmRlcmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoUmVuZGVyZXJFdmVudC5WSUVXUE9SVF9VUERBVEVELCB0aGlzLl9vblZpZXdwb3J0VXBkYXRlZERlbGVnYXRlKTtcblx0XHRcdHRoaXMuX3BSZW5kZXJlci5yZW1vdmVFdmVudExpc3RlbmVyKFJlbmRlcmVyRXZlbnQuU0NJU1NPUl9VUERBVEVELCB0aGlzLl9vblNjaXNzb3JVcGRhdGVkRGVsZWdhdGUpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3BSZW5kZXJlciA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcFJlbmRlcmVyLmFkZEV2ZW50TGlzdGVuZXIoUmVuZGVyZXJFdmVudC5WSUVXUE9SVF9VUERBVEVELCB0aGlzLl9vblZpZXdwb3J0VXBkYXRlZERlbGVnYXRlKTtcblx0XHR0aGlzLl9wUmVuZGVyZXIuYWRkRXZlbnRMaXN0ZW5lcihSZW5kZXJlckV2ZW50LlNDSVNTT1JfVVBEQVRFRCwgdGhpcy5fb25TY2lzc29yVXBkYXRlZERlbGVnYXRlKTtcblxuXHRcdC8vcmVzZXQgZW50aXR5IGNvbGxlY3RvclxuXHRcdHRoaXMuX3BFbnRpdHlDb2xsZWN0b3IgPSB0aGlzLl9wUmVuZGVyZXIuX2lDcmVhdGVFbnRpdHlDb2xsZWN0b3IoKTtcblxuXHRcdGlmICh0aGlzLl9wQ2FtZXJhKVxuXHRcdFx0dGhpcy5fcEVudGl0eUNvbGxlY3Rvci5jYW1lcmEgPSB0aGlzLl9wQ2FtZXJhO1xuXG5cdFx0Ly9yZXNldCBiYWNrIGJ1ZmZlclxuXHRcdHRoaXMuX3BSZW5kZXJlci5faUJhY2tncm91bmRSID0gKCh0aGlzLl9iYWNrZ3JvdW5kQ29sb3IgPj4gMTYpICYgMHhmZikvMHhmZjtcblx0XHR0aGlzLl9wUmVuZGVyZXIuX2lCYWNrZ3JvdW5kRyA9ICgodGhpcy5fYmFja2dyb3VuZENvbG9yID4+IDgpICYgMHhmZikvMHhmZjtcblx0XHR0aGlzLl9wUmVuZGVyZXIuX2lCYWNrZ3JvdW5kQiA9ICh0aGlzLl9iYWNrZ3JvdW5kQ29sb3IgJiAweGZmKS8weGZmO1xuXHRcdHRoaXMuX3BSZW5kZXJlci5faUJhY2tncm91bmRBbHBoYSA9IHRoaXMuX2JhY2tncm91bmRBbHBoYTtcblx0XHR0aGlzLl9wUmVuZGVyZXIud2lkdGggPSB0aGlzLl93aWR0aDtcblx0XHR0aGlzLl9wUmVuZGVyZXIuaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xuXHRcdHRoaXMuX3BSZW5kZXJlci5zaGFyZUNvbnRleHQgPSB0aGlzLl9zaGFyZUNvbnRleHQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgc2hhcmVDb250ZXh0KCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NoYXJlQ29udGV4dDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc2hhcmVDb250ZXh0KHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fc2hhcmVDb250ZXh0ID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fc2hhcmVDb250ZXh0ID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fcFJlbmRlcmVyKVxuXHRcdFx0dGhpcy5fcFJlbmRlcmVyLnNoYXJlQ29udGV4dCA9IHRoaXMuX3NoYXJlQ29udGV4dDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBiYWNrZ3JvdW5kQ29sb3IoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kQ29sb3I7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJhY2tncm91bmRDb2xvcih2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fYmFja2dyb3VuZENvbG9yID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYmFja2dyb3VuZENvbG9yID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wUmVuZGVyZXIuX2lCYWNrZ3JvdW5kUiA9ICgodmFsdWUgPj4gMTYpICYgMHhmZikvMHhmZjtcblx0XHR0aGlzLl9wUmVuZGVyZXIuX2lCYWNrZ3JvdW5kRyA9ICgodmFsdWUgPj4gOCkgJiAweGZmKS8weGZmO1xuXHRcdHRoaXMuX3BSZW5kZXJlci5faUJhY2tncm91bmRCID0gKHZhbHVlICYgMHhmZikvMHhmZjtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0cHVibGljIGdldCBiYWNrZ3JvdW5kQWxwaGEoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kQWxwaGE7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHZhbHVlXG5cdCAqL1xuXHRwdWJsaWMgc2V0IGJhY2tncm91bmRBbHBoYSh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodmFsdWUgPiAxKVxuXHRcdFx0dmFsdWUgPSAxO1xuXHRcdGVsc2UgaWYgKHZhbHVlIDwgMClcblx0XHRcdHZhbHVlID0gMDtcblxuXHRcdGlmICh0aGlzLl9iYWNrZ3JvdW5kQWxwaGEgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wUmVuZGVyZXIuX2lCYWNrZ3JvdW5kQWxwaGEgPSB0aGlzLl9iYWNrZ3JvdW5kQWxwaGEgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Q2FtZXJhM0R9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNhbWVyYSgpOkNhbWVyYVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BDYW1lcmE7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IGNhbWVyYSB0aGF0J3MgdXNlZCB0byByZW5kZXIgdGhlIHNjZW5lIGZvciB0aGlzIHZpZXdwb3J0XG5cdCAqL1xuXHRwdWJsaWMgc2V0IGNhbWVyYSh2YWx1ZTpDYW1lcmEpXG5cdHtcblx0XHRpZiAodGhpcy5fcENhbWVyYSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdGlmICh0aGlzLl9wQ2FtZXJhKVxuXHRcdFx0dGhpcy5fcENhbWVyYS5yZW1vdmVFdmVudExpc3RlbmVyKENhbWVyYUV2ZW50LlBST0pFQ1RJT05fQ0hBTkdFRCwgdGhpcy5fb25Qcm9qZWN0aW9uQ2hhbmdlZERlbGVnYXRlKTtcblxuXHRcdHRoaXMuX3BDYW1lcmEgPSB2YWx1ZTtcblxuXHRcdGlmICh0aGlzLl9wRW50aXR5Q29sbGVjdG9yKVxuXHRcdFx0dGhpcy5fcEVudGl0eUNvbGxlY3Rvci5jYW1lcmEgPSB0aGlzLl9wQ2FtZXJhO1xuXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSlcblx0XHRcdHRoaXMuX3BDYW1lcmEucGFydGl0aW9uID0gdGhpcy5fcFNjZW5lLnBhcnRpdGlvbjtcblxuXHRcdHRoaXMuX3BDYW1lcmEuYWRkRXZlbnRMaXN0ZW5lcihDYW1lcmFFdmVudC5QUk9KRUNUSU9OX0NIQU5HRUQsIHRoaXMuX29uUHJvamVjdGlvbkNoYW5nZWREZWxlZ2F0ZSk7XG5cdFx0dGhpcy5fc2Npc3NvckRpcnR5ID0gdHJ1ZTtcblx0XHR0aGlzLl92aWV3cG9ydERpcnR5ID0gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7YXdheS5jb250YWluZXJzLlNjZW5lM0R9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjZW5lKCk6U2NlbmVcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU2NlbmU7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBzY2VuZSB0aGF0J3MgdXNlZCB0byByZW5kZXIgZm9yIHRoaXMgdmlld3BvcnRcblx0ICovXG5cdHB1YmxpYyBzZXQgc2NlbmUodmFsdWU6U2NlbmUpXG5cdHtcblx0XHRpZiAodGhpcy5fcFNjZW5lID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSlcblx0XHRcdHRoaXMuX3BTY2VuZS5yZW1vdmVFdmVudExpc3RlbmVyKFNjZW5lRXZlbnQuUEFSVElUSU9OX0NIQU5HRUQsIHRoaXMuX29uU2NlbmVQYXJ0aXRpb25DaGFuZ2VkRGVsZWdhdGUpO1xuXG5cdFx0dGhpcy5fcFNjZW5lID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wU2NlbmUuYWRkRXZlbnRMaXN0ZW5lcihTY2VuZUV2ZW50LlBBUlRJVElPTl9DSEFOR0VELCB0aGlzLl9vblNjZW5lUGFydGl0aW9uQ2hhbmdlZERlbGVnYXRlKTtcblxuXHRcdGlmICh0aGlzLl9wQ2FtZXJhKVxuXHRcdFx0dGhpcy5fcENhbWVyYS5wYXJ0aXRpb24gPSB0aGlzLl9wU2NlbmUucGFydGl0aW9uO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGRlbHRhVGltZSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RlbHRhVGltZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB3aWR0aCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3dpZHRoO1xuXHR9XG5cblx0cHVibGljIHNldCB3aWR0aCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fd2lkdGggPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl93aWR0aCA9IHZhbHVlO1xuXHRcdHRoaXMuX2FzcGVjdFJhdGlvID0gdGhpcy5fd2lkdGgvdGhpcy5faGVpZ2h0O1xuXHRcdHRoaXMuX3BDYW1lcmEucHJvamVjdGlvbi5faUFzcGVjdFJhdGlvID0gdGhpcy5fYXNwZWN0UmF0aW87XG5cdFx0dGhpcy5fcFJlbmRlcmVyLndpZHRoID0gdmFsdWU7XG5cdFx0dGhpcy5faHRtbEVsZW1lbnQuc3R5bGUud2lkdGggPSB2YWx1ZSArIFwicHhcIjtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBoZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9oZWlnaHQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGhlaWdodCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5faGVpZ2h0ID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5faGVpZ2h0ID0gdmFsdWU7XG5cdFx0dGhpcy5fYXNwZWN0UmF0aW8gPSB0aGlzLl93aWR0aC90aGlzLl9oZWlnaHQ7XG5cdFx0dGhpcy5fcENhbWVyYS5wcm9qZWN0aW9uLl9pQXNwZWN0UmF0aW8gPSB0aGlzLl9hc3BlY3RSYXRpbztcblx0XHR0aGlzLl9wUmVuZGVyZXIuaGVpZ2h0ID0gdmFsdWU7XG5cdFx0dGhpcy5faHRtbEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gdmFsdWUgKyBcInB4XCI7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgbW91c2VQaWNrZXIoKTpJUGlja2VyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbW91c2VQaWNrZXI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1vdXNlUGlja2VyKHZhbHVlOklQaWNrZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fbW91c2VQaWNrZXIgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAodmFsdWUgPT0gbnVsbClcblx0XHRcdHRoaXMuX21vdXNlUGlja2VyID0gbmV3IFJheWNhc3RQaWNrZXIoKTtcblx0XHRlbHNlXG5cdFx0XHR0aGlzLl9tb3VzZVBpY2tlciA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUmVuZGVyZXIueDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgeCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fcFJlbmRlcmVyLnggPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wUmVuZGVyZXIueCA9PSB2YWx1ZTtcblx0XHR0aGlzLl9odG1sRWxlbWVudC5zdHlsZS5sZWZ0ID0gdmFsdWUgKyBcInB4XCI7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgeSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BSZW5kZXJlci55O1xuXHR9XG5cblx0cHVibGljIHNldCB5KHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9wUmVuZGVyZXIueSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BSZW5kZXJlci55ID09IHZhbHVlO1xuXHRcdHRoaXMuX2h0bWxFbGVtZW50LnN0eWxlLnRvcCA9IHZhbHVlICsgXCJweFwiO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHZpc2libGUoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuX2h0bWxFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPT0gXCJ2aXNpYmxlXCIpO1xuXHR9XG5cblx0cHVibGljIHNldCB2aXNpYmxlKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl9odG1sRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gdmFsdWU/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIjtcblx0XHQvL1RPRE8gdHJhbnNmZXIgdmlzaWJsZSBwcm9wZXJ0eSB0byBhc3NvY2lhdGVkIGNvbnRleHQgKGlmIG9uZSBleGlzdHMpXG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdHB1YmxpYyBnZXQgcmVuZGVyZWRGYWNlc0NvdW50KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gMDsgLy9UT0RPXG5cdFx0Ly9yZXR1cm4gdGhpcy5fcEVudGl0eUNvbGxlY3Rvci5fcE51bVRyaWFuZ2xlczsvL251bVRyaWFuZ2xlcztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW5kZXJzIHRoZSB2aWV3LlxuXHQgKi9cblx0cHVibGljIHJlbmRlcigpXG5cdHtcblx0XHR0aGlzLnBVcGRhdGVUaW1lKCk7XG5cblx0XHQvL3VwZGF0ZSB2aWV3IGFuZCBzaXplIGRhdGFcblx0XHR0aGlzLl9wQ2FtZXJhLnByb2plY3Rpb24uX2lBc3BlY3RSYXRpbyA9IHRoaXMuX2FzcGVjdFJhdGlvO1xuXG5cdFx0aWYgKHRoaXMuX3NjaXNzb3JEaXJ0eSkge1xuXHRcdFx0dGhpcy5fc2Npc3NvckRpcnR5ID0gZmFsc2U7XG5cdFx0XHR0aGlzLl9wQ2FtZXJhLnByb2plY3Rpb24uX2lVcGRhdGVTY2lzc29yUmVjdCh0aGlzLl9wUmVuZGVyZXIuc2Npc3NvclJlY3QueCwgdGhpcy5fcFJlbmRlcmVyLnNjaXNzb3JSZWN0LnksIHRoaXMuX3BSZW5kZXJlci5zY2lzc29yUmVjdC53aWR0aCwgdGhpcy5fcFJlbmRlcmVyLnNjaXNzb3JSZWN0LmhlaWdodCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3ZpZXdwb3J0RGlydHkpIHtcblx0XHRcdHRoaXMuX3ZpZXdwb3J0RGlydHkgPSBmYWxzZTtcblx0XHRcdHRoaXMuX3BDYW1lcmEucHJvamVjdGlvbi5faVVwZGF0ZVZpZXdwb3J0KHRoaXMuX3BSZW5kZXJlci52aWV3UG9ydC54LCB0aGlzLl9wUmVuZGVyZXIudmlld1BvcnQueSwgdGhpcy5fcFJlbmRlcmVyLnZpZXdQb3J0LndpZHRoLCB0aGlzLl9wUmVuZGVyZXIudmlld1BvcnQuaGVpZ2h0KTtcblx0XHR9XG5cblx0XHQvLyB1cGRhdGUgcGlja2luZ1xuXHRcdGlmICghdGhpcy5fc2hhcmVDb250ZXh0KSB7XG5cdFx0XHRpZiAodGhpcy5mb3JjZU1vdXNlTW92ZSAmJiB0aGlzLl9odG1sRWxlbWVudCA9PSB0aGlzLl9tb3VzZU1hbmFnZXIuX2lBY3RpdmVEaXYgJiYgIXRoaXMuX21vdXNlTWFuYWdlci5faVVwZGF0ZURpcnR5KVxuXHRcdFx0XHR0aGlzLl9tb3VzZU1hbmFnZXIuX2lDb2xsaWRpbmdPYmplY3QgPSB0aGlzLm1vdXNlUGlja2VyLmdldFZpZXdDb2xsaXNpb24odGhpcy5fcE1vdXNlWCwgdGhpcy5fcE1vdXNlWSwgdGhpcyk7XG5cblx0XHRcdHRoaXMuX21vdXNlTWFuYWdlci5maXJlTW91c2VFdmVudHModGhpcy5mb3JjZU1vdXNlTW92ZSk7XG5cdFx0XHQvL190b3VjaDNETWFuYWdlci5maXJlVG91Y2hFdmVudHMoKTtcblx0XHR9XG5cdFx0Ly9fdG91Y2gzRE1hbmFnZXIudXBkYXRlQ29sbGlkZXIoKTtcblxuXHRcdC8vY2xlYXIgZW50aXR5IGNvbGxlY3RvciByZWFkeSBmb3IgY29sbGVjdGlvblxuXHRcdHRoaXMuX3BFbnRpdHlDb2xsZWN0b3IuY2xlYXIoKTtcblxuXHRcdC8vIGNvbGxlY3Qgc3R1ZmYgdG8gcmVuZGVyXG5cdFx0dGhpcy5fcFNjZW5lLnRyYXZlcnNlUGFydGl0aW9ucyh0aGlzLl9wRW50aXR5Q29sbGVjdG9yKTtcblxuXHRcdC8vcmVuZGVyIHRoZSBjb250ZW50cyBvZiB0aGUgZW50aXR5IGNvbGxlY3RvclxuXHRcdHRoaXMuX3BSZW5kZXJlci5yZW5kZXIodGhpcy5fcEVudGl0eUNvbGxlY3Rvcik7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBwVXBkYXRlVGltZSgpOnZvaWRcblx0e1xuXHRcdHZhciB0aW1lOm51bWJlciA9IGdldFRpbWVyKCk7XG5cblx0XHRpZiAodGhpcy5fdGltZSA9PSAwKVxuXHRcdFx0dGhpcy5fdGltZSA9IHRpbWU7XG5cblx0XHR0aGlzLl9kZWx0YVRpbWUgPSB0aW1lIC0gdGhpcy5fdGltZTtcblx0XHR0aGlzLl90aW1lID0gdGltZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0dGhpcy5fcFJlbmRlcmVyLmRpc3Bvc2UoKTtcblxuXHRcdC8vIFRPRE86IGltZXBsZW1lbnQgbW91c2VNYW5hZ2VyIC8gdG91Y2gzRE1hbmFnZXJcblx0XHR0aGlzLl9tb3VzZU1hbmFnZXIudW5yZWdpc3RlclZpZXcodGhpcyk7XG5cblx0XHQvL3RoaXMuX3RvdWNoM0RNYW5hZ2VyLmRpc2FibGVUb3VjaExpc3RlbmVycyh0aGlzKTtcblx0XHQvL3RoaXMuX3RvdWNoM0RNYW5hZ2VyLmRpc3Bvc2UoKTtcblxuXHRcdHRoaXMuX21vdXNlTWFuYWdlciA9IG51bGw7XG5cdFx0Ly90aGlzLl90b3VjaDNETWFuYWdlciA9IG51bGw7XG5cblx0XHR0aGlzLl9wUmVuZGVyZXIgPSBudWxsO1xuXHRcdHRoaXMuX3BFbnRpdHlDb2xsZWN0b3IgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGlFbnRpdHlDb2xsZWN0b3IoKTpJQ29sbGVjdG9yXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEVudGl0eUNvbGxlY3Rvcjtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHJpdmF0ZSBvblByb2plY3Rpb25DaGFuZ2VkKGV2ZW50OkNhbWVyYUV2ZW50KVxuXHR7XG5cdFx0dGhpcy5fc2Npc3NvckRpcnR5ID0gdHJ1ZTtcblx0XHR0aGlzLl92aWV3cG9ydERpcnR5ID0gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHJpdmF0ZSBvblZpZXdwb3J0VXBkYXRlZChldmVudDpSZW5kZXJlckV2ZW50KVxuXHR7XG5cdFx0dGhpcy5fdmlld3BvcnREaXJ0eSA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHByaXZhdGUgb25TY2lzc29yVXBkYXRlZChldmVudDpSZW5kZXJlckV2ZW50KVxuXHR7XG5cdFx0dGhpcy5fc2Npc3NvckRpcnR5ID0gdHJ1ZTtcblx0fVxuXG5cdHB1YmxpYyBwcm9qZWN0KHBvaW50M2Q6VmVjdG9yM0QpOlZlY3RvcjNEXG5cdHtcblx0XHR2YXIgdjpWZWN0b3IzRCA9IHRoaXMuX3BDYW1lcmEucHJvamVjdChwb2ludDNkKTtcblx0XHR2LnggPSB2LngqdGhpcy5fcFJlbmRlcmVyLnZpZXdQb3J0LndpZHRoLzIgKyB0aGlzLl93aWR0aCp0aGlzLl9wQ2FtZXJhLnByb2plY3Rpb24ub3JpZ2luWDtcblx0XHR2LnkgPSB2LnkqdGhpcy5fcFJlbmRlcmVyLnZpZXdQb3J0LmhlaWdodC8yICsgdGhpcy5faGVpZ2h0KnRoaXMuX3BDYW1lcmEucHJvamVjdGlvbi5vcmlnaW5ZO1xuXG5cdFx0cmV0dXJuIHY7XG5cdH1cblxuXHRwdWJsaWMgdW5wcm9qZWN0KHNYOm51bWJlciwgc1k6bnVtYmVyLCBzWjpudW1iZXIpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcENhbWVyYS51bnByb2plY3QoMiooc1ggLSB0aGlzLl93aWR0aCp0aGlzLl9wQ2FtZXJhLnByb2plY3Rpb24ub3JpZ2luWCkvdGhpcy5fcFJlbmRlcmVyLnZpZXdQb3J0LndpZHRoLCAyKihzWSAtIHRoaXMuX2hlaWdodCp0aGlzLl9wQ2FtZXJhLnByb2plY3Rpb24ub3JpZ2luWSkvdGhpcy5fcFJlbmRlcmVyLnZpZXdQb3J0LmhlaWdodCwgc1opO1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0UmF5KHNYOm51bWJlciwgc1k6bnVtYmVyLCBzWjpudW1iZXIpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcENhbWVyYS5nZXRSYXkoKHNYKjIgLSB0aGlzLl93aWR0aCkvdGhpcy5fd2lkdGgsIChzWSoyIC0gdGhpcy5faGVpZ2h0KS90aGlzLl9oZWlnaHQsIHNaKTtcblx0fVxuXG5cdC8qIFRPRE86IGltcGxlbWVudCBUb3VjaDNETWFuYWdlclxuXHQgcHVibGljIGdldCB0b3VjaFBpY2tlcigpOklQaWNrZXJcblx0IHtcblx0IHJldHVybiB0aGlzLl90b3VjaDNETWFuYWdlci50b3VjaFBpY2tlcjtcblx0IH1cblx0ICovXG5cdC8qIFRPRE86IGltcGxlbWVudCBUb3VjaDNETWFuYWdlclxuXHQgcHVibGljIHNldCB0b3VjaFBpY2tlciggdmFsdWU6SVBpY2tlcilcblx0IHtcblx0IHRoaXMuX3RvdWNoM0RNYW5hZ2VyLnRvdWNoUGlja2VyID0gdmFsdWU7XG5cdCB9XG5cdCAqL1xuXG5cdHB1YmxpYyBmb3JjZU1vdXNlTW92ZTpib29sZWFuO1xuXG5cdC8qVE9ETzogaW1wbGVtZW50IEJhY2tncm91bmRcblx0IHB1YmxpYyBnZXQgYmFja2dyb3VuZCgpOmF3YXkudGV4dHVyZXMuVGV4dHVyZTJEQmFzZVxuXHQge1xuXHQgcmV0dXJuIHRoaXMuX2JhY2tncm91bmQ7XG5cdCB9XG5cdCAqL1xuXHQvKlRPRE86IGltcGxlbWVudCBCYWNrZ3JvdW5kXG5cdCBwdWJsaWMgc2V0IGJhY2tncm91bmQoIHZhbHVlOmF3YXkudGV4dHVyZXMuVGV4dHVyZTJEQmFzZSApXG5cdCB7XG5cdCB0aGlzLl9iYWNrZ3JvdW5kID0gdmFsdWU7XG5cdCB0aGlzLl9yZW5kZXJlci5iYWNrZ3JvdW5kID0gX2JhY2tncm91bmQ7XG5cdCB9XG5cdCAqL1xuXG5cdC8vIFRPRE86IHJlcXVpcmVkIGRlcGVuZGVuY3kgc3RhZ2VHTFxuXHRwdWJsaWMgdXBkYXRlQ29sbGlkZXIoKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9zaGFyZUNvbnRleHQpIHtcblx0XHRcdGlmICh0aGlzLl9odG1sRWxlbWVudCA9PSB0aGlzLl9tb3VzZU1hbmFnZXIuX2lBY3RpdmVEaXYpXG5cdFx0XHRcdHRoaXMuX21vdXNlTWFuYWdlci5faUNvbGxpZGluZ09iamVjdCA9IHRoaXMubW91c2VQaWNrZXIuZ2V0Vmlld0NvbGxpc2lvbih0aGlzLl9wTW91c2VYLCB0aGlzLl9wTW91c2VZLCB0aGlzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGNvbGxpZGluZ09iamVjdDpQaWNraW5nQ29sbGlzaW9uVk8gPSB0aGlzLm1vdXNlUGlja2VyLmdldFZpZXdDb2xsaXNpb24odGhpcy5fcE1vdXNlWCwgdGhpcy5fcE1vdXNlWSwgdGhpcyk7XG5cblx0XHRcdGlmICh0aGlzLmxheWVyZWRWaWV3IHx8IHRoaXMuX21vdXNlTWFuYWdlci5faUNvbGxpZGluZ09iamVjdCA9PSBudWxsIHx8IGNvbGxpZGluZ09iamVjdC5yYXlFbnRyeURpc3RhbmNlIDwgdGhpcy5fbW91c2VNYW5hZ2VyLl9pQ29sbGlkaW5nT2JqZWN0LnJheUVudHJ5RGlzdGFuY2UpXG5cdFx0XHRcdHRoaXMuX21vdXNlTWFuYWdlci5faUNvbGxpZGluZ09iamVjdCA9IGNvbGxpZGluZ09iamVjdDtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0ID0gVmlldzsiXX0=