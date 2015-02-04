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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1ZpZXcudHMiXSwibmFtZXMiOlsiVmlldyIsIlZpZXcuY29uc3RydWN0b3IiLCJWaWV3Lm9uU2NlbmVQYXJ0aXRpb25DaGFuZ2VkIiwiVmlldy5tb3VzZVgiLCJWaWV3Lm1vdXNlWSIsIlZpZXcuaHRtbEVsZW1lbnQiLCJWaWV3LnJlbmRlcmVyIiwiVmlldy5zaGFyZUNvbnRleHQiLCJWaWV3LmJhY2tncm91bmRDb2xvciIsIlZpZXcuYmFja2dyb3VuZEFscGhhIiwiVmlldy5jYW1lcmEiLCJWaWV3LnNjZW5lIiwiVmlldy5kZWx0YVRpbWUiLCJWaWV3LndpZHRoIiwiVmlldy5oZWlnaHQiLCJWaWV3Lm1vdXNlUGlja2VyIiwiVmlldy54IiwiVmlldy55IiwiVmlldy52aXNpYmxlIiwiVmlldy5yZW5kZXJlZEZhY2VzQ291bnQiLCJWaWV3LnJlbmRlciIsIlZpZXcucFVwZGF0ZVRpbWUiLCJWaWV3LmRpc3Bvc2UiLCJWaWV3LmlFbnRpdHlDb2xsZWN0b3IiLCJWaWV3Lm9uUHJvamVjdGlvbkNoYW5nZWQiLCJWaWV3Lm9uVmlld3BvcnRVcGRhdGVkIiwiVmlldy5vblNjaXNzb3JVcGRhdGVkIiwiVmlldy5wcm9qZWN0IiwiVmlldy51bnByb2plY3QiLCJWaWV3LmdldFJheSIsIlZpZXcudXBkYXRlQ29sbGlkZXIiXSwibWFwcGluZ3MiOiJBQUlBLElBQU8sUUFBUSxXQUFnQixnQ0FBZ0MsQ0FBQyxDQUFDO0FBRWpFLElBQU8sS0FBSyxXQUFnQixxQ0FBcUMsQ0FBQyxDQUFDO0FBR25FLElBQU8sYUFBYSxXQUFjLHVDQUF1QyxDQUFDLENBQUM7QUFJM0UsSUFBTyxNQUFNLFdBQWdCLG9DQUFvQyxDQUFDLENBQUM7QUFDbkUsSUFBTyxXQUFXLFdBQWUsdUNBQXVDLENBQUMsQ0FBQztBQUMxRSxJQUFPLFVBQVUsV0FBZSxzQ0FBc0MsQ0FBQyxDQUFDO0FBQ3hFLElBQU8sYUFBYSxXQUFjLHlDQUF5QyxDQUFD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QzFGQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxHQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUU1RkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDVkEsQ0FBQ0E7SUFFTTNCLHdCQUFTQSxHQUFoQkEsVUFBaUJBLEVBQVNBLEVBQUVBLEVBQVNBLEVBQUVBLEVBQVNBO1FBRS9DNEIsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFFbE5BLENBQUNBO0lBRU01QixxQkFBTUEsR0FBYkEsVUFBY0EsRUFBU0EsRUFBRUEsRUFBU0EsRUFBRUEsRUFBU0E7UUFFNUM2QixNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtJQUN2R0EsQ0FBQ0E7SUFpQkQ3Qjs7Ozs7T0FLR0E7SUFDSEE7Ozs7OztPQU1HQTtJQUVIQSxvQ0FBb0NBO0lBQzdCQSw2QkFBY0EsR0FBckJBO1FBRUM4QixFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN6QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsSUFBSUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7Z0JBQ3ZEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxpQkFBaUJBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDL0dBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ1BBLElBQUlBLGVBQWVBLEdBQXNCQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBRS9HQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxJQUFJQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxpQkFBaUJBLElBQUlBLElBQUlBLElBQUlBLGVBQWVBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxnQkFBZ0JBLENBQUNBO2dCQUNoS0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxlQUFlQSxDQUFDQTtRQUN6REEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFDRjlCLFdBQUNBO0FBQURBLENBOWpCQSxBQThqQkNBLElBQUE7QUFFRCxBQUFjLGlCQUFMLElBQUksQ0FBQyIsImZpbGUiOiJjb250YWluZXJzL1ZpZXcuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XHJcbmltcG9ydCBQb2ludFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BvaW50XCIpO1xyXG5pbXBvcnQgUmVjdGFuZ2xlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1JlY3RhbmdsZVwiKTtcclxuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XHJcbmltcG9ydCBnZXRUaW1lclx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9nZXRUaW1lclwiKTtcclxuXHJcbmltcG9ydCBTY2VuZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1NjZW5lXCIpO1xyXG5pbXBvcnQgSVBpY2tlclx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL0lQaWNrZXJcIik7XHJcbmltcG9ydCBQaWNraW5nQ29sbGlzaW9uVk9cdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGljay9QaWNraW5nQ29sbGlzaW9uVk9cIik7XHJcbmltcG9ydCBSYXljYXN0UGlja2VyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGljay9SYXljYXN0UGlja2VyXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvSVJlbmRlcmVyXCIpO1xyXG5pbXBvcnQgQ1NTUmVuZGVyZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcmVuZGVyL0NTU1JlbmRlcmVyQmFzZVwiKTtcclxuaW1wb3J0IElDb2xsZWN0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XHJcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xyXG5pbXBvcnQgQ2FtZXJhRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9DYW1lcmFFdmVudFwiKTtcclxuaW1wb3J0IFNjZW5lRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9TY2VuZUV2ZW50XCIpO1xyXG5pbXBvcnQgUmVuZGVyZXJFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9SZW5kZXJlckV2ZW50XCIpO1xyXG5pbXBvcnQgTW91c2VNYW5hZ2VyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYW5hZ2Vycy9Nb3VzZU1hbmFnZXJcIik7XHJcblxyXG5jbGFzcyBWaWV3XHJcbntcclxuXHJcblx0LypcclxuXHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cdCAqIERldmVsb3BtZW50IE5vdGVzXHJcblx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHQgKlxyXG5cdCAqIFNoYXJlQ29udGV4dCAgICAgLSB0aGlzIGlzIG5vdCBiZWluZyB1c2VkIGF0IHRoZSBtb21lbnQgaW50ZWdyYXRpb24gd2l0aCBvdGhlciBmcmFtZXdvcmtzIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQgb3IgdGVzdGVkXHJcblx0ICogICAgICAgICAgICAgICAgICAgIGFuZCAoIF9sb2NhbFBvcyAvIF9nbG9iYWxQb3MgKSBwb3NpdGlvbiBvZiB2aWV3cG9ydCBhcmUgdGhlIHNhbWUgZm9yIHRoZSBtb21lbnRcclxuXHQgKlxyXG5cdCAqIEJhY2tncm91bmRcclxuXHQgKiAgICAgICAgICAgICAgICAgIC0gdGhpcyBpcyBjdXJyZW50bHkgbm90IGJlaW5nIGluY2x1ZGVkIGluIG91ciB0ZXN0cyBhbmQgaXMgY3VycmVudGx5IGRpc2FibGVkXHJcblx0ICpcclxuXHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHQgKi9cclxuXHJcblx0Ly8gUHJvdGVjdGVkXHJcblx0cHVibGljIF9wU2NlbmU6U2NlbmU7XHJcblx0cHVibGljIF9wQ2FtZXJhOkNhbWVyYTtcclxuXHRwdWJsaWMgX3BFbnRpdHlDb2xsZWN0b3I6SUNvbGxlY3RvcjtcclxuXHRwdWJsaWMgX3BSZW5kZXJlcjpJUmVuZGVyZXI7XHJcblxyXG5cdC8vIFByaXZhdGVcclxuXHRwcml2YXRlIF9hc3BlY3RSYXRpbzpudW1iZXI7XHJcblx0cHJpdmF0ZSBfd2lkdGg6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9oZWlnaHQ6bnVtYmVyID0gMDtcclxuXHJcblx0cHJpdmF0ZSBfdGltZTpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX2RlbHRhVGltZTpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX2JhY2tncm91bmRDb2xvcjpudW1iZXIgPSAweDAwMDAwMDtcclxuXHRwcml2YXRlIF9iYWNrZ3JvdW5kQWxwaGE6bnVtYmVyID0gMTtcclxuXHJcblx0cHJpdmF0ZSBfdmlld3BvcnREaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9zY2lzc29yRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG5cdHByaXZhdGUgX29uU2NlbmVQYXJ0aXRpb25DaGFuZ2VkRGVsZWdhdGU6KGV2ZW50OlNjZW5lRXZlbnQpID0+IHZvaWQ7XHJcblx0cHJpdmF0ZSBfb25Qcm9qZWN0aW9uQ2hhbmdlZERlbGVnYXRlOihldmVudDpDYW1lcmFFdmVudCkgPT4gdm9pZDtcclxuXHRwcml2YXRlIF9vblZpZXdwb3J0VXBkYXRlZERlbGVnYXRlOihldmVudDpSZW5kZXJlckV2ZW50KSA9PiB2b2lkO1xyXG5cdHByaXZhdGUgX29uU2Npc3NvclVwZGF0ZWREZWxlZ2F0ZTooZXZlbnQ6UmVuZGVyZXJFdmVudCkgPT4gdm9pZDtcclxuXHRwcml2YXRlIF9tb3VzZU1hbmFnZXI6TW91c2VNYW5hZ2VyO1xyXG5cdHByaXZhdGUgX21vdXNlUGlja2VyOklQaWNrZXIgPSBuZXcgUmF5Y2FzdFBpY2tlcigpO1xyXG5cclxuXHRwcml2YXRlIF9odG1sRWxlbWVudDpIVE1MRGl2RWxlbWVudDtcclxuXHRwcml2YXRlIF9zaGFyZUNvbnRleHQ6Ym9vbGVhbjtcclxuXHRwdWJsaWMgX3BNb3VzZVg6bnVtYmVyO1xyXG5cdHB1YmxpYyBfcE1vdXNlWTpudW1iZXI7XHJcblxyXG5cdC8qXHJcblx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0ICogRGlzYWJsZWQgLyBOb3QgeWV0IGltcGxlbWVudGVkXHJcblx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0ICpcclxuXHQgKiBwcml2YXRlIF9iYWNrZ3JvdW5kOmF3YXkudGV4dHVyZXMuVGV4dHVyZTJEQmFzZTtcclxuXHQgKlxyXG5cdCAqIHB1YmxpYyBfcFRvdWNoM0RNYW5hZ2VyOmF3YXkubWFuYWdlcnMuVG91Y2gzRE1hbmFnZXI7XHJcblx0ICpcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihyZW5kZXJlcjpJUmVuZGVyZXIsIHNjZW5lOlNjZW5lID0gbnVsbCwgY2FtZXJhOkNhbWVyYSA9IG51bGwpXHJcblx0e1xyXG5cdFx0dGhpcy5fb25TY2VuZVBhcnRpdGlvbkNoYW5nZWREZWxlZ2F0ZSA9IChldmVudDpTY2VuZUV2ZW50KSA9PiB0aGlzLm9uU2NlbmVQYXJ0aXRpb25DaGFuZ2VkKGV2ZW50KTtcclxuXHRcdHRoaXMuX29uUHJvamVjdGlvbkNoYW5nZWREZWxlZ2F0ZSA9IChldmVudDpDYW1lcmFFdmVudCkgPT4gdGhpcy5vblByb2plY3Rpb25DaGFuZ2VkKGV2ZW50KTtcclxuXHRcdHRoaXMuX29uVmlld3BvcnRVcGRhdGVkRGVsZWdhdGUgPSAoZXZlbnQ6UmVuZGVyZXJFdmVudCkgPT4gdGhpcy5vblZpZXdwb3J0VXBkYXRlZChldmVudCk7XHJcblx0XHR0aGlzLl9vblNjaXNzb3JVcGRhdGVkRGVsZWdhdGUgPSAoZXZlbnQ6UmVuZGVyZXJFdmVudCkgPT4gdGhpcy5vblNjaXNzb3JVcGRhdGVkKGV2ZW50KTtcclxuXHJcblx0XHR0aGlzLnNjZW5lID0gc2NlbmUgfHwgbmV3IFNjZW5lKCk7XHJcblx0XHR0aGlzLmNhbWVyYSA9IGNhbWVyYSB8fCBuZXcgQ2FtZXJhKCk7XHJcblx0XHR0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XHJcblxyXG5cdFx0Ly9tYWtlIHN1cmUgZG9jdW1lbnQgYm9yZGVyIGlzIHplcm9cclxuXHRcdGRvY3VtZW50LmJvZHkuc3R5bGUubWFyZ2luID0gXCIwcHhcIjtcclxuXHJcblx0XHR0aGlzLl9odG1sRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHR0aGlzLl9odG1sRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuXHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2h0bWxFbGVtZW50KTtcclxuXHJcblx0XHR0aGlzLl9tb3VzZU1hbmFnZXIgPSBNb3VzZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuXHRcdHRoaXMuX21vdXNlTWFuYWdlci5yZWdpc3RlclZpZXcodGhpcyk7XHJcblxyXG4vL1x0XHRcdGlmICh0aGlzLl9zaGFyZUNvbnRleHQpXHJcbi8vXHRcdFx0XHR0aGlzLl9tb3VzZTNETWFuYWdlci5hZGRWaWV3TGF5ZXIodGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblNjZW5lUGFydGl0aW9uQ2hhbmdlZChldmVudDpTY2VuZUV2ZW50KVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wQ2FtZXJhKVxyXG5cdFx0XHR0aGlzLl9wQ2FtZXJhLnBhcnRpdGlvbiA9IHRoaXMuc2NlbmUucGFydGl0aW9uO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGxheWVyZWRWaWV3OmJvb2xlYW47IC8vVE9ETzogc29tZXRoaW5nIHRvIGVuYWJsZSB0aGlzIGNvcnJlY3RseVxyXG5cclxuXHRwdWJsaWMgZ2V0IG1vdXNlWCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wTW91c2VYO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBtb3VzZVkoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcE1vdXNlWTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBodG1sRWxlbWVudCgpOkhUTUxEaXZFbGVtZW50XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2h0bWxFbGVtZW50O1xyXG5cdH1cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcmVuZGVyZXIoKTpJUmVuZGVyZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFJlbmRlcmVyO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCByZW5kZXJlcih2YWx1ZTpJUmVuZGVyZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BSZW5kZXJlciA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wUmVuZGVyZXIpIHtcclxuXHRcdFx0dGhpcy5fcFJlbmRlcmVyLmRpc3Bvc2UoKTtcclxuXHRcdFx0dGhpcy5fcFJlbmRlcmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoUmVuZGVyZXJFdmVudC5WSUVXUE9SVF9VUERBVEVELCB0aGlzLl9vblZpZXdwb3J0VXBkYXRlZERlbGVnYXRlKTtcclxuXHRcdFx0dGhpcy5fcFJlbmRlcmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoUmVuZGVyZXJFdmVudC5TQ0lTU09SX1VQREFURUQsIHRoaXMuX29uU2Npc3NvclVwZGF0ZWREZWxlZ2F0ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fcFJlbmRlcmVyID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcFJlbmRlcmVyLmFkZEV2ZW50TGlzdGVuZXIoUmVuZGVyZXJFdmVudC5WSUVXUE9SVF9VUERBVEVELCB0aGlzLl9vblZpZXdwb3J0VXBkYXRlZERlbGVnYXRlKTtcclxuXHRcdHRoaXMuX3BSZW5kZXJlci5hZGRFdmVudExpc3RlbmVyKFJlbmRlcmVyRXZlbnQuU0NJU1NPUl9VUERBVEVELCB0aGlzLl9vblNjaXNzb3JVcGRhdGVkRGVsZWdhdGUpO1xyXG5cclxuXHRcdC8vcmVzZXQgZW50aXR5IGNvbGxlY3RvclxyXG5cdFx0dGhpcy5fcEVudGl0eUNvbGxlY3RvciA9IHRoaXMuX3BSZW5kZXJlci5faUNyZWF0ZUVudGl0eUNvbGxlY3RvcigpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wQ2FtZXJhKVxyXG5cdFx0XHR0aGlzLl9wRW50aXR5Q29sbGVjdG9yLmNhbWVyYSA9IHRoaXMuX3BDYW1lcmE7XHJcblxyXG5cdFx0Ly9yZXNldCBiYWNrIGJ1ZmZlclxyXG5cdFx0dGhpcy5fcFJlbmRlcmVyLl9pQmFja2dyb3VuZFIgPSAoKHRoaXMuX2JhY2tncm91bmRDb2xvciA+PiAxNikgJiAweGZmKS8weGZmO1xyXG5cdFx0dGhpcy5fcFJlbmRlcmVyLl9pQmFja2dyb3VuZEcgPSAoKHRoaXMuX2JhY2tncm91bmRDb2xvciA+PiA4KSAmIDB4ZmYpLzB4ZmY7XHJcblx0XHR0aGlzLl9wUmVuZGVyZXIuX2lCYWNrZ3JvdW5kQiA9ICh0aGlzLl9iYWNrZ3JvdW5kQ29sb3IgJiAweGZmKS8weGZmO1xyXG5cdFx0dGhpcy5fcFJlbmRlcmVyLl9pQmFja2dyb3VuZEFscGhhID0gdGhpcy5fYmFja2dyb3VuZEFscGhhO1xyXG5cdFx0dGhpcy5fcFJlbmRlcmVyLndpZHRoID0gdGhpcy5fd2lkdGg7XHJcblx0XHR0aGlzLl9wUmVuZGVyZXIuaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xyXG5cdFx0dGhpcy5fcFJlbmRlcmVyLnNoYXJlQ29udGV4dCA9IHRoaXMuX3NoYXJlQ29udGV4dDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzaGFyZUNvbnRleHQoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NoYXJlQ29udGV4dDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgc2hhcmVDb250ZXh0KHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3NoYXJlQ29udGV4dCA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3NoYXJlQ29udGV4dCA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wUmVuZGVyZXIpXHJcblx0XHRcdHRoaXMuX3BSZW5kZXJlci5zaGFyZUNvbnRleHQgPSB0aGlzLl9zaGFyZUNvbnRleHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYmFja2dyb3VuZENvbG9yKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JhY2tncm91bmRDb2xvcjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYmFja2dyb3VuZENvbG9yKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYmFja2dyb3VuZENvbG9yID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fYmFja2dyb3VuZENvbG9yID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcFJlbmRlcmVyLl9pQmFja2dyb3VuZFIgPSAoKHZhbHVlID4+IDE2KSAmIDB4ZmYpLzB4ZmY7XHJcblx0XHR0aGlzLl9wUmVuZGVyZXIuX2lCYWNrZ3JvdW5kRyA9ICgodmFsdWUgPj4gOCkgJiAweGZmKS8weGZmO1xyXG5cdFx0dGhpcy5fcFJlbmRlcmVyLl9pQmFja2dyb3VuZEIgPSAodmFsdWUgJiAweGZmKS8weGZmO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYmFja2dyb3VuZEFscGhhKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JhY2tncm91bmRBbHBoYTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHZhbHVlXHJcblx0ICovXHJcblx0cHVibGljIHNldCBiYWNrZ3JvdW5kQWxwaGEodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZSA+IDEpXHJcblx0XHRcdHZhbHVlID0gMTtcclxuXHRcdGVsc2UgaWYgKHZhbHVlIDwgMClcclxuXHRcdFx0dmFsdWUgPSAwO1xyXG5cclxuXHRcdGlmICh0aGlzLl9iYWNrZ3JvdW5kQWxwaGEgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wUmVuZGVyZXIuX2lCYWNrZ3JvdW5kQWxwaGEgPSB0aGlzLl9iYWNrZ3JvdW5kQWxwaGEgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge0NhbWVyYTNEfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgY2FtZXJhKCk6Q2FtZXJhXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BDYW1lcmE7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgY2FtZXJhIHRoYXQncyB1c2VkIHRvIHJlbmRlciB0aGUgc2NlbmUgZm9yIHRoaXMgdmlld3BvcnRcclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0IGNhbWVyYSh2YWx1ZTpDYW1lcmEpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BDYW1lcmEgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRpZiAodGhpcy5fcENhbWVyYSlcclxuXHRcdFx0dGhpcy5fcENhbWVyYS5yZW1vdmVFdmVudExpc3RlbmVyKENhbWVyYUV2ZW50LlBST0pFQ1RJT05fQ0hBTkdFRCwgdGhpcy5fb25Qcm9qZWN0aW9uQ2hhbmdlZERlbGVnYXRlKTtcclxuXHJcblx0XHR0aGlzLl9wQ2FtZXJhID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BFbnRpdHlDb2xsZWN0b3IpXHJcblx0XHRcdHRoaXMuX3BFbnRpdHlDb2xsZWN0b3IuY2FtZXJhID0gdGhpcy5fcENhbWVyYTtcclxuXHJcblx0XHRpZiAodGhpcy5fcFNjZW5lKVxyXG5cdFx0XHR0aGlzLl9wQ2FtZXJhLnBhcnRpdGlvbiA9IHRoaXMuX3BTY2VuZS5wYXJ0aXRpb247XHJcblxyXG5cdFx0dGhpcy5fcENhbWVyYS5hZGRFdmVudExpc3RlbmVyKENhbWVyYUV2ZW50LlBST0pFQ1RJT05fQ0hBTkdFRCwgdGhpcy5fb25Qcm9qZWN0aW9uQ2hhbmdlZERlbGVnYXRlKTtcclxuXHRcdHRoaXMuX3NjaXNzb3JEaXJ0eSA9IHRydWU7XHJcblx0XHR0aGlzLl92aWV3cG9ydERpcnR5ID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge2F3YXkuY29udGFpbmVycy5TY2VuZTNEfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2NlbmUoKTpTY2VuZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wU2NlbmU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgdGhlIHNjZW5lIHRoYXQncyB1c2VkIHRvIHJlbmRlciBmb3IgdGhpcyB2aWV3cG9ydFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXQgc2NlbmUodmFsdWU6U2NlbmUpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wU2NlbmUpXHJcblx0XHRcdHRoaXMuX3BTY2VuZS5yZW1vdmVFdmVudExpc3RlbmVyKFNjZW5lRXZlbnQuUEFSVElUSU9OX0NIQU5HRUQsIHRoaXMuX29uU2NlbmVQYXJ0aXRpb25DaGFuZ2VkRGVsZWdhdGUpO1xyXG5cclxuXHRcdHRoaXMuX3BTY2VuZSA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BTY2VuZS5hZGRFdmVudExpc3RlbmVyKFNjZW5lRXZlbnQuUEFSVElUSU9OX0NIQU5HRUQsIHRoaXMuX29uU2NlbmVQYXJ0aXRpb25DaGFuZ2VkRGVsZWdhdGUpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wQ2FtZXJhKVxyXG5cdFx0XHR0aGlzLl9wQ2FtZXJhLnBhcnRpdGlvbiA9IHRoaXMuX3BTY2VuZS5wYXJ0aXRpb247XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICovXHJcblx0cHVibGljIGdldCBkZWx0YVRpbWUoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZGVsdGFUaW1lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3dpZHRoO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB3aWR0aCh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3dpZHRoID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuXHRcdHRoaXMuX2FzcGVjdFJhdGlvID0gdGhpcy5fd2lkdGgvdGhpcy5faGVpZ2h0O1xyXG5cdFx0dGhpcy5fcENhbWVyYS5wcm9qZWN0aW9uLl9pQXNwZWN0UmF0aW8gPSB0aGlzLl9hc3BlY3RSYXRpbztcclxuXHRcdHRoaXMuX3BSZW5kZXJlci53aWR0aCA9IHZhbHVlO1xyXG5cdFx0dGhpcy5faHRtbEVsZW1lbnQuc3R5bGUud2lkdGggPSB2YWx1ZSArIFwicHhcIjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBoZWlnaHQoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5faGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBoZWlnaHQodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9oZWlnaHQgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuXHRcdHRoaXMuX2FzcGVjdFJhdGlvID0gdGhpcy5fd2lkdGgvdGhpcy5faGVpZ2h0O1xyXG5cdFx0dGhpcy5fcENhbWVyYS5wcm9qZWN0aW9uLl9pQXNwZWN0UmF0aW8gPSB0aGlzLl9hc3BlY3RSYXRpbztcclxuXHRcdHRoaXMuX3BSZW5kZXJlci5oZWlnaHQgPSB2YWx1ZTtcclxuXHRcdHRoaXMuX2h0bWxFbGVtZW50LnN0eWxlLmhlaWdodCA9IHZhbHVlICsgXCJweFwiO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1vdXNlUGlja2VyKCk6SVBpY2tlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9tb3VzZVBpY2tlcjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgbW91c2VQaWNrZXIodmFsdWU6SVBpY2tlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fbW91c2VQaWNrZXIgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRpZiAodmFsdWUgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5fbW91c2VQaWNrZXIgPSBuZXcgUmF5Y2FzdFBpY2tlcigpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLl9tb3VzZVBpY2tlciA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFJlbmRlcmVyLng7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHgodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wUmVuZGVyZXIueCA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BSZW5kZXJlci54ID09IHZhbHVlO1xyXG5cdFx0dGhpcy5faHRtbEVsZW1lbnQuc3R5bGUubGVmdCA9IHZhbHVlICsgXCJweFwiO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHkoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFJlbmRlcmVyLnk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHkodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wUmVuZGVyZXIueSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BSZW5kZXJlci55ID09IHZhbHVlO1xyXG5cdFx0dGhpcy5faHRtbEVsZW1lbnQuc3R5bGUudG9wID0gdmFsdWUgKyBcInB4XCI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdmlzaWJsZSgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gKHRoaXMuX2h0bWxFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPT0gXCJ2aXNpYmxlXCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB2aXNpYmxlKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0dGhpcy5faHRtbEVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IHZhbHVlPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCI7XHJcblx0XHQvL1RPRE8gdHJhbnNmZXIgdmlzaWJsZSBwcm9wZXJ0eSB0byBhc3NvY2lhdGVkIGNvbnRleHQgKGlmIG9uZSBleGlzdHMpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICovXHJcblx0cHVibGljIGdldCByZW5kZXJlZEZhY2VzQ291bnQoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gMDsgLy9UT0RPXHJcblx0XHQvL3JldHVybiB0aGlzLl9wRW50aXR5Q29sbGVjdG9yLl9wTnVtVHJpYW5nbGVzOy8vbnVtVHJpYW5nbGVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgdmlldy5cclxuXHQgKi9cclxuXHRwdWJsaWMgcmVuZGVyKClcclxuXHR7XHJcblx0XHR0aGlzLnBVcGRhdGVUaW1lKCk7XHJcblxyXG5cdFx0Ly91cGRhdGUgdmlldyBhbmQgc2l6ZSBkYXRhXHJcblx0XHR0aGlzLl9wQ2FtZXJhLnByb2plY3Rpb24uX2lBc3BlY3RSYXRpbyA9IHRoaXMuX2FzcGVjdFJhdGlvO1xyXG5cclxuXHRcdGlmICh0aGlzLl9zY2lzc29yRGlydHkpIHtcclxuXHRcdFx0dGhpcy5fc2Npc3NvckRpcnR5ID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuX3BDYW1lcmEucHJvamVjdGlvbi5faVVwZGF0ZVNjaXNzb3JSZWN0KHRoaXMuX3BSZW5kZXJlci5zY2lzc29yUmVjdC54LCB0aGlzLl9wUmVuZGVyZXIuc2Npc3NvclJlY3QueSwgdGhpcy5fcFJlbmRlcmVyLnNjaXNzb3JSZWN0LndpZHRoLCB0aGlzLl9wUmVuZGVyZXIuc2Npc3NvclJlY3QuaGVpZ2h0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fdmlld3BvcnREaXJ0eSkge1xyXG5cdFx0XHR0aGlzLl92aWV3cG9ydERpcnR5ID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuX3BDYW1lcmEucHJvamVjdGlvbi5faVVwZGF0ZVZpZXdwb3J0KHRoaXMuX3BSZW5kZXJlci52aWV3UG9ydC54LCB0aGlzLl9wUmVuZGVyZXIudmlld1BvcnQueSwgdGhpcy5fcFJlbmRlcmVyLnZpZXdQb3J0LndpZHRoLCB0aGlzLl9wUmVuZGVyZXIudmlld1BvcnQuaGVpZ2h0KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyB1cGRhdGUgcGlja2luZ1xyXG5cdFx0aWYgKCF0aGlzLl9zaGFyZUNvbnRleHQpIHtcclxuXHRcdFx0aWYgKHRoaXMuZm9yY2VNb3VzZU1vdmUgJiYgdGhpcy5faHRtbEVsZW1lbnQgPT0gdGhpcy5fbW91c2VNYW5hZ2VyLl9pQWN0aXZlRGl2ICYmICF0aGlzLl9tb3VzZU1hbmFnZXIuX2lVcGRhdGVEaXJ0eSlcclxuXHRcdFx0XHR0aGlzLl9tb3VzZU1hbmFnZXIuX2lDb2xsaWRpbmdPYmplY3QgPSB0aGlzLm1vdXNlUGlja2VyLmdldFZpZXdDb2xsaXNpb24odGhpcy5fcE1vdXNlWCwgdGhpcy5fcE1vdXNlWSwgdGhpcyk7XHJcblxyXG5cdFx0XHR0aGlzLl9tb3VzZU1hbmFnZXIuZmlyZU1vdXNlRXZlbnRzKHRoaXMuZm9yY2VNb3VzZU1vdmUpO1xyXG5cdFx0XHQvL190b3VjaDNETWFuYWdlci5maXJlVG91Y2hFdmVudHMoKTtcclxuXHRcdH1cclxuXHRcdC8vX3RvdWNoM0RNYW5hZ2VyLnVwZGF0ZUNvbGxpZGVyKCk7XHJcblxyXG5cdFx0Ly9jbGVhciBlbnRpdHkgY29sbGVjdG9yIHJlYWR5IGZvciBjb2xsZWN0aW9uXHJcblx0XHR0aGlzLl9wRW50aXR5Q29sbGVjdG9yLmNsZWFyKCk7XHJcblxyXG5cdFx0Ly8gY29sbGVjdCBzdHVmZiB0byByZW5kZXJcclxuXHRcdHRoaXMuX3BTY2VuZS50cmF2ZXJzZVBhcnRpdGlvbnModGhpcy5fcEVudGl0eUNvbGxlY3Rvcik7XHJcblxyXG5cdFx0Ly9yZW5kZXIgdGhlIGNvbnRlbnRzIG9mIHRoZSBlbnRpdHkgY29sbGVjdG9yXHJcblx0XHR0aGlzLl9wUmVuZGVyZXIucmVuZGVyKHRoaXMuX3BFbnRpdHlDb2xsZWN0b3IpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgcFVwZGF0ZVRpbWUoKTp2b2lkXHJcblx0e1xyXG5cdFx0dmFyIHRpbWU6bnVtYmVyID0gZ2V0VGltZXIoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fdGltZSA9PSAwKVxyXG5cdFx0XHR0aGlzLl90aW1lID0gdGltZTtcclxuXHJcblx0XHR0aGlzLl9kZWx0YVRpbWUgPSB0aW1lIC0gdGhpcy5fdGltZTtcclxuXHRcdHRoaXMuX3RpbWUgPSB0aW1lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5fcFJlbmRlcmVyLmRpc3Bvc2UoKTtcclxuXHJcblx0XHQvLyBUT0RPOiBpbWVwbGVtZW50IG1vdXNlTWFuYWdlciAvIHRvdWNoM0RNYW5hZ2VyXHJcblx0XHR0aGlzLl9tb3VzZU1hbmFnZXIudW5yZWdpc3RlclZpZXcodGhpcyk7XHJcblxyXG5cdFx0Ly90aGlzLl90b3VjaDNETWFuYWdlci5kaXNhYmxlVG91Y2hMaXN0ZW5lcnModGhpcyk7XHJcblx0XHQvL3RoaXMuX3RvdWNoM0RNYW5hZ2VyLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR0aGlzLl9tb3VzZU1hbmFnZXIgPSBudWxsO1xyXG5cdFx0Ly90aGlzLl90b3VjaDNETWFuYWdlciA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5fcFJlbmRlcmVyID0gbnVsbDtcclxuXHRcdHRoaXMuX3BFbnRpdHlDb2xsZWN0b3IgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGlFbnRpdHlDb2xsZWN0b3IoKTpJQ29sbGVjdG9yXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BFbnRpdHlDb2xsZWN0b3I7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25Qcm9qZWN0aW9uQ2hhbmdlZChldmVudDpDYW1lcmFFdmVudClcclxuXHR7XHJcblx0XHR0aGlzLl9zY2lzc29yRGlydHkgPSB0cnVlO1xyXG5cdFx0dGhpcy5fdmlld3BvcnREaXJ0eSA9IHRydWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25WaWV3cG9ydFVwZGF0ZWQoZXZlbnQ6UmVuZGVyZXJFdmVudClcclxuXHR7XHJcblx0XHR0aGlzLl92aWV3cG9ydERpcnR5ID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblNjaXNzb3JVcGRhdGVkKGV2ZW50OlJlbmRlcmVyRXZlbnQpXHJcblx0e1xyXG5cdFx0dGhpcy5fc2Npc3NvckRpcnR5ID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBwcm9qZWN0KHBvaW50M2Q6VmVjdG9yM0QpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0dmFyIHY6VmVjdG9yM0QgPSB0aGlzLl9wQ2FtZXJhLnByb2plY3QocG9pbnQzZCk7XHJcblx0XHR2LnggPSB2LngqdGhpcy5fcFJlbmRlcmVyLnZpZXdQb3J0LndpZHRoLzIgKyB0aGlzLl93aWR0aCp0aGlzLl9wQ2FtZXJhLnByb2plY3Rpb24ub3JpZ2luWDtcclxuXHRcdHYueSA9IHYueSp0aGlzLl9wUmVuZGVyZXIudmlld1BvcnQuaGVpZ2h0LzIgKyB0aGlzLl9oZWlnaHQqdGhpcy5fcENhbWVyYS5wcm9qZWN0aW9uLm9yaWdpblk7XHJcblxyXG5cdFx0cmV0dXJuIHY7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdW5wcm9qZWN0KHNYOm51bWJlciwgc1k6bnVtYmVyLCBzWjpudW1iZXIpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BDYW1lcmEudW5wcm9qZWN0KDIqKHNYIC0gdGhpcy5fd2lkdGgqdGhpcy5fcENhbWVyYS5wcm9qZWN0aW9uLm9yaWdpblgpL3RoaXMuX3BSZW5kZXJlci52aWV3UG9ydC53aWR0aCwgMiooc1kgLSB0aGlzLl9oZWlnaHQqdGhpcy5fcENhbWVyYS5wcm9qZWN0aW9uLm9yaWdpblkpL3RoaXMuX3BSZW5kZXJlci52aWV3UG9ydC5oZWlnaHQsIHNaKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0UmF5KHNYOm51bWJlciwgc1k6bnVtYmVyLCBzWjpudW1iZXIpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BDYW1lcmEuZ2V0UmF5KChzWCoyIC0gdGhpcy5fd2lkdGgpL3RoaXMuX3dpZHRoLCAoc1kqMiAtIHRoaXMuX2hlaWdodCkvdGhpcy5faGVpZ2h0LCBzWik7XHJcblx0fVxyXG5cclxuXHQvKiBUT0RPOiBpbXBsZW1lbnQgVG91Y2gzRE1hbmFnZXJcclxuXHQgcHVibGljIGdldCB0b3VjaFBpY2tlcigpOklQaWNrZXJcclxuXHQge1xyXG5cdCByZXR1cm4gdGhpcy5fdG91Y2gzRE1hbmFnZXIudG91Y2hQaWNrZXI7XHJcblx0IH1cclxuXHQgKi9cclxuXHQvKiBUT0RPOiBpbXBsZW1lbnQgVG91Y2gzRE1hbmFnZXJcclxuXHQgcHVibGljIHNldCB0b3VjaFBpY2tlciggdmFsdWU6SVBpY2tlcilcclxuXHQge1xyXG5cdCB0aGlzLl90b3VjaDNETWFuYWdlci50b3VjaFBpY2tlciA9IHZhbHVlO1xyXG5cdCB9XHJcblx0ICovXHJcblxyXG5cdHB1YmxpYyBmb3JjZU1vdXNlTW92ZTpib29sZWFuO1xyXG5cclxuXHQvKlRPRE86IGltcGxlbWVudCBCYWNrZ3JvdW5kXHJcblx0IHB1YmxpYyBnZXQgYmFja2dyb3VuZCgpOmF3YXkudGV4dHVyZXMuVGV4dHVyZTJEQmFzZVxyXG5cdCB7XHJcblx0IHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kO1xyXG5cdCB9XHJcblx0ICovXHJcblx0LypUT0RPOiBpbXBsZW1lbnQgQmFja2dyb3VuZFxyXG5cdCBwdWJsaWMgc2V0IGJhY2tncm91bmQoIHZhbHVlOmF3YXkudGV4dHVyZXMuVGV4dHVyZTJEQmFzZSApXHJcblx0IHtcclxuXHQgdGhpcy5fYmFja2dyb3VuZCA9IHZhbHVlO1xyXG5cdCB0aGlzLl9yZW5kZXJlci5iYWNrZ3JvdW5kID0gX2JhY2tncm91bmQ7XHJcblx0IH1cclxuXHQgKi9cclxuXHJcblx0Ly8gVE9ETzogcmVxdWlyZWQgZGVwZW5kZW5jeSBzdGFnZUdMXHJcblx0cHVibGljIHVwZGF0ZUNvbGxpZGVyKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX3NoYXJlQ29udGV4dCkge1xyXG5cdFx0XHRpZiAodGhpcy5faHRtbEVsZW1lbnQgPT0gdGhpcy5fbW91c2VNYW5hZ2VyLl9pQWN0aXZlRGl2KVxyXG5cdFx0XHRcdHRoaXMuX21vdXNlTWFuYWdlci5faUNvbGxpZGluZ09iamVjdCA9IHRoaXMubW91c2VQaWNrZXIuZ2V0Vmlld0NvbGxpc2lvbih0aGlzLl9wTW91c2VYLCB0aGlzLl9wTW91c2VZLCB0aGlzKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBjb2xsaWRpbmdPYmplY3Q6UGlja2luZ0NvbGxpc2lvblZPID0gdGhpcy5tb3VzZVBpY2tlci5nZXRWaWV3Q29sbGlzaW9uKHRoaXMuX3BNb3VzZVgsIHRoaXMuX3BNb3VzZVksIHRoaXMpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMubGF5ZXJlZFZpZXcgfHwgdGhpcy5fbW91c2VNYW5hZ2VyLl9pQ29sbGlkaW5nT2JqZWN0ID09IG51bGwgfHwgY29sbGlkaW5nT2JqZWN0LnJheUVudHJ5RGlzdGFuY2UgPCB0aGlzLl9tb3VzZU1hbmFnZXIuX2lDb2xsaWRpbmdPYmplY3QucmF5RW50cnlEaXN0YW5jZSlcclxuXHRcdFx0XHR0aGlzLl9tb3VzZU1hbmFnZXIuX2lDb2xsaWRpbmdPYmplY3QgPSBjb2xsaWRpbmdPYmplY3Q7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBWaWV3OyJdfQ==