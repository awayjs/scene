var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Point = require("awayjs-core/lib/geom/Point");
var Rectangle = require("awayjs-core/lib/geom/Rectangle");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var RendererEvent = require("awayjs-display/lib/events/RendererEvent");
/**
 * RendererBase forms an abstract base class for classes that are used in the rendering pipeline to render the
 * contents of a partition
 *
 * @class away.render.RendererBase
 */
var CSSRendererBase = (function (_super) {
    __extends(CSSRendererBase, _super);
    /**
     * Creates a new RendererBase object.
     */
    function CSSRendererBase(renderToTexture, forceSoftware, profile) {
        if (renderToTexture === void 0) { renderToTexture = false; }
        if (forceSoftware === void 0) { forceSoftware = false; }
        if (profile === void 0) { profile = "baseline"; }
        _super.call(this);
        this._backgroundR = 0;
        this._backgroundG = 0;
        this._backgroundB = 0;
        this._backgroundAlpha = 1;
        this._shareContext = false;
        this._pBackBufferInvalid = true;
        this._depthTextureInvalid = true;
        this._viewPort = new Rectangle();
        this._scissorRect = new Rectangle();
        this._localPos = new Point();
        this._globalPos = new Point();
        //this._billboardRenderablePool = RenderablePool.getPool(CSSBillboardRenderable);
        //this._lineSegmentRenderablePool = RenderablePool.getPool(CSSLineSegmentRenderable);
        this._viewPort = new Rectangle();
        if (this._width == 0)
            this.width = window.innerWidth;
        if (this._height == 0)
            this.height = window.innerHeight;
    }
    Object.defineProperty(CSSRendererBase.prototype, "viewPort", {
        /**
         * A viewPort rectangle equivalent of the StageGL size and position.
         */
        get: function () {
            return this._viewPort;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "scissorRect", {
        /**
         * A scissor rectangle equivalent of the view size and position.
         */
        get: function () {
            return this._scissorRect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "x", {
        /**
         *
         */
        get: function () {
            return this._localPos.x;
        },
        set: function (value) {
            if (this.x == value)
                return;
            this.updateGlobalPos();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "y", {
        /**
         *
         */
        get: function () {
            return this._localPos.y;
        },
        set: function (value) {
            if (this.y == value)
                return;
            this._globalPos.y = this._localPos.y = value;
            this.updateGlobalPos();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "width", {
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
            this._scissorRect.width = value;
            this._viewPort.width = value;
            this._pBackBufferInvalid = true;
            this._depthTextureInvalid = true;
            this.notifyViewportUpdate();
            this.notifyScissorUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "height", {
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
            this._scissorRect.height = value;
            this._viewPort.height = value;
            this._pBackBufferInvalid = true;
            this._depthTextureInvalid = true;
            this.notifyViewportUpdate();
            this.notifyScissorUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "_iBackgroundR", {
        /**
         * The background color's red component, used when clearing.
         *
         * @private
         */
        get: function () {
            return this._backgroundR;
        },
        set: function (value) {
            if (this._backgroundR == value)
                return;
            this._backgroundR = value;
            this._pBackBufferInvalid = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "_iBackgroundG", {
        /**
         * The background color's green component, used when clearing.
         *
         * @private
         */
        get: function () {
            return this._backgroundG;
        },
        set: function (value) {
            if (this._backgroundG == value)
                return;
            this._backgroundG = value;
            this._pBackBufferInvalid = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "_iBackgroundB", {
        /**
         * The background color's blue component, used when clearing.
         *
         * @private
         */
        get: function () {
            return this._backgroundB;
        },
        set: function (value) {
            if (this._backgroundB == value)
                return;
            this._backgroundB = value;
            this._pBackBufferInvalid = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "shareContext", {
        get: function () {
            return this._shareContext;
        },
        set: function (value) {
            if (this._shareContext == value)
                return;
            this._shareContext = value;
            this.updateGlobalPos();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Disposes the resources used by the RendererBase.
     */
    CSSRendererBase.prototype.dispose = function () {
        /*
         if (_backgroundImageRenderer) {
         _backgroundImageRenderer.dispose();
         _backgroundImageRenderer = null;
         }
         */
    };
    CSSRendererBase.prototype.render = function (entityCollector) {
        this._viewportDirty = false;
        this._scissorDirty = false;
    };
    /**
     * Renders the potentially visible geometry to the back buffer or texture.
     * @param entityCollector The EntityCollector object containing the potentially visible geometry.
     * @param scissorRect
     */
    CSSRendererBase.prototype._iRender = function (entityCollector, target, scissorRect, surfaceSelector) {
        if (target === void 0) { target = null; }
        if (scissorRect === void 0) { scissorRect = null; }
        if (surfaceSelector === void 0) { surfaceSelector = 0; }
        if (!entityCollector.entityHead)
            return;
        this.pExecuteRender(entityCollector, scissorRect);
    };
    CSSRendererBase.prototype._iRenderCascades = function (entityCollector, target, numCascades, scissorRects, cameras) {
    };
    CSSRendererBase.prototype.pCollectRenderables = function (entityCollector) {
        //reset head values
        this._renderableHead = null;
        //grab entity head
        var item = entityCollector.entityHead;
        //set temp values for entry point and camera forward vector
        this._pCamera = entityCollector.camera;
        this._iEntryPoint = this._pCamera.scenePosition;
        this._pCameraForward = this._pCamera.transform.forwardVector;
        while (item) {
            item.entity._iCollectRenderables(this);
            item = item.next;
        }
    };
    /**
     * Renders the potentially visible geometry to the back buffer or texture. Only executed if everything is set up.
     * @param entityCollector The EntityCollector object containing the potentially visible geometry.
     * @param scissorRect
     */
    CSSRendererBase.prototype.pExecuteRender = function (entityCollector, scissorRect) {
        if (scissorRect === void 0) { scissorRect = null; }
        this.pCollectRenderables(entityCollector);
        this.pDraw(entityCollector);
    };
    /**
     * Performs the actual drawing of dom objects to the target.
     *
     * @param entityCollector The EntityCollector object containing the potentially visible dom objects.
     */
    CSSRendererBase.prototype.pDraw = function (entityCollector) {
        throw new AbstractMethodError();
    };
    Object.defineProperty(CSSRendererBase.prototype, "_iBackgroundAlpha", {
        get: function () {
            return this._backgroundAlpha;
        },
        set: function (value) {
            if (this._backgroundAlpha == value)
                return;
            this._backgroundAlpha = value;
            this._pBackBufferInvalid = true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param billboard
     */
    CSSRendererBase.prototype.applyBillboard = function (billboard) {
        //this._applyRenderable(<CSSRenderableBase> this._billboardRenderablePool.getItem(billboard));
    };
    /**
     *
     * @param lineSubMesh
     */
    CSSRendererBase.prototype.applyLineSubMesh = function (lineSubMesh) {
        //this._applyRenderable(<CSSRenderableBase> this._billboardRenderablePool.getItem(lineSegment));
    };
    /**
     *
     * @param skybox
     */
    CSSRendererBase.prototype.applySkybox = function (skybox) {
    };
    /**
     *
     * @param triangleSubMesh
     */
    CSSRendererBase.prototype.applyTriangleSubMesh = function (triangleSubMesh) {
    };
    /**
     *
     * @param renderable
     * @private
     */
    CSSRendererBase.prototype._applyRenderable = function (renderable) {
        var material; // = <CSSMaterialBase> renderable.renderableOwner.material;
        var entity = renderable.sourceEntity;
        var position = entity.scenePosition;
        if (material) {
            //set ids for faster referencing
            renderable.materialId = material._iMaterialId;
            //				renderable.renderOrderId = material._iRenderOrderId;
            renderable.cascaded = false;
            // project onto camera's z-axis
            position = this._iEntryPoint.subtract(position);
            renderable.zIndex = entity.zOffset - position.dotProduct(this._pCameraForward);
            //store reference to scene transform
            renderable.renderSceneTransform = renderable.sourceEntity.getRenderSceneTransform(this._pCamera);
            //store reference to next item in list
            renderable.next = this._renderableHead;
            this._renderableHead = renderable;
        }
    };
    /**
     * @private
     */
    CSSRendererBase.prototype.notifyScissorUpdate = function () {
        if (this._scissorDirty)
            return;
        this._scissorDirty = true;
        if (!this._scissorUpdated)
            this._scissorUpdated = new RendererEvent(RendererEvent.SCISSOR_UPDATED);
        this.dispatchEvent(this._scissorUpdated);
    };
    /**
     * @private
     */
    CSSRendererBase.prototype.notifyViewportUpdate = function () {
        if (this._viewportDirty)
            return;
        this._viewportDirty = true;
        if (!this._viewPortUpdated)
            this._viewPortUpdated = new RendererEvent(RendererEvent.VIEWPORT_UPDATED);
        this.dispatchEvent(this._viewPortUpdated);
    };
    /**
     *
     */
    CSSRendererBase.prototype.updateGlobalPos = function () {
        this._viewPort.x = this._globalPos.x;
        this._viewPort.y = this._globalPos.y;
        this.notifyViewportUpdate();
        this.notifyScissorUpdate();
    };
    CSSRendererBase.prototype._iCreateEntityCollector = function () {
        throw new AbstractMethodError();
    };
    return CSSRendererBase;
})(EventDispatcher);
module.exports = CSSRendererBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvQ1NTUmVuZGVyZXJCYXNlLnRzIl0sIm5hbWVzIjpbIkNTU1JlbmRlcmVyQmFzZSIsIkNTU1JlbmRlcmVyQmFzZS5jb25zdHJ1Y3RvciIsIkNTU1JlbmRlcmVyQmFzZS52aWV3UG9ydCIsIkNTU1JlbmRlcmVyQmFzZS5zY2lzc29yUmVjdCIsIkNTU1JlbmRlcmVyQmFzZS54IiwiQ1NTUmVuZGVyZXJCYXNlLnkiLCJDU1NSZW5kZXJlckJhc2Uud2lkdGgiLCJDU1NSZW5kZXJlckJhc2UuaGVpZ2h0IiwiQ1NTUmVuZGVyZXJCYXNlLl9pQmFja2dyb3VuZFIiLCJDU1NSZW5kZXJlckJhc2UuX2lCYWNrZ3JvdW5kRyIsIkNTU1JlbmRlcmVyQmFzZS5faUJhY2tncm91bmRCIiwiQ1NTUmVuZGVyZXJCYXNlLnNoYXJlQ29udGV4dCIsIkNTU1JlbmRlcmVyQmFzZS5kaXNwb3NlIiwiQ1NTUmVuZGVyZXJCYXNlLnJlbmRlciIsIkNTU1JlbmRlcmVyQmFzZS5faVJlbmRlciIsIkNTU1JlbmRlcmVyQmFzZS5faVJlbmRlckNhc2NhZGVzIiwiQ1NTUmVuZGVyZXJCYXNlLnBDb2xsZWN0UmVuZGVyYWJsZXMiLCJDU1NSZW5kZXJlckJhc2UucEV4ZWN1dGVSZW5kZXIiLCJDU1NSZW5kZXJlckJhc2UucERyYXciLCJDU1NSZW5kZXJlckJhc2UuX2lCYWNrZ3JvdW5kQWxwaGEiLCJDU1NSZW5kZXJlckJhc2UuYXBwbHlCaWxsYm9hcmQiLCJDU1NSZW5kZXJlckJhc2UuYXBwbHlMaW5lU3ViTWVzaCIsIkNTU1JlbmRlcmVyQmFzZS5hcHBseVNreWJveCIsIkNTU1JlbmRlcmVyQmFzZS5hcHBseVRyaWFuZ2xlU3ViTWVzaCIsIkNTU1JlbmRlcmVyQmFzZS5fYXBwbHlSZW5kZXJhYmxlIiwiQ1NTUmVuZGVyZXJCYXNlLm5vdGlmeVNjaXNzb3JVcGRhdGUiLCJDU1NSZW5kZXJlckJhc2Uubm90aWZ5Vmlld3BvcnRVcGRhdGUiLCJDU1NSZW5kZXJlckJhc2UudXBkYXRlR2xvYmFsUG9zIiwiQ1NTUmVuZGVyZXJCYXNlLl9pQ3JlYXRlRW50aXR5Q29sbGVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLEtBQUssV0FBZ0IsNEJBQTRCLENBQUMsQ0FBQztBQUMxRCxJQUFPLFNBQVMsV0FBZSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBRWpFLElBQU8sbUJBQW1CLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUNyRixJQUFPLGVBQWUsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBa0I5RSxJQUFPLGFBQWEsV0FBYyx5Q0FBeUMsQ0FBQyxDQUFDO0FBSTdFLEFBTUE7Ozs7O0dBREc7SUFDRyxlQUFlO0lBQVNBLFVBQXhCQSxlQUFlQSxVQUF3QkE7SUF5STVDQTs7T0FFR0E7SUFDSEEsU0E1SUtBLGVBQWVBLENBNElSQSxlQUErQkEsRUFBRUEsYUFBNkJBLEVBQUVBLE9BQTJCQTtRQUEzRkMsK0JBQStCQSxHQUEvQkEsdUJBQStCQTtRQUFFQSw2QkFBNkJBLEdBQTdCQSxxQkFBNkJBO1FBQUVBLHVCQUEyQkEsR0FBM0JBLG9CQUEyQkE7UUFFdEdBLGlCQUFPQSxDQUFDQTtRQXJJREEsaUJBQVlBLEdBQVVBLENBQUNBLENBQUNBO1FBQ3hCQSxpQkFBWUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDeEJBLGlCQUFZQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUN4QkEscUJBQWdCQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUM1QkEsa0JBQWFBLEdBQVdBLEtBQUtBLENBQUNBO1FBRS9CQSx3QkFBbUJBLEdBQVdBLElBQUlBLENBQUNBO1FBQ25DQSx5QkFBb0JBLEdBQVdBLElBQUlBLENBQUNBO1FBT25DQSxjQUFTQSxHQUFhQSxJQUFJQSxTQUFTQSxFQUFFQSxDQUFDQTtRQUV0Q0EsaUJBQVlBLEdBQWFBLElBQUlBLFNBQVNBLEVBQUVBLENBQUNBO1FBR3pDQSxjQUFTQSxHQUFTQSxJQUFJQSxLQUFLQSxFQUFFQSxDQUFDQTtRQUM5QkEsZUFBVUEsR0FBU0EsSUFB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QUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUVyQ0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxFQUFFQSxDQUFDQTtRQUM1QkEsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxFQUFFQSxDQUFDQTtJQUM1QkEsQ0FBQ0E7SUFHTTNCLGlEQUF1QkEsR0FBOUJBO1FBRUM0QixNQUFNQSxJQUFJQSxtQkFBbUJBLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUNGNUIsc0JBQUNBO0FBQURBLENBemJBLEFBeWJDQSxFQXpiNkIsZUFBZSxFQXliNUM7QUFFRCxBQUF5QixpQkFBaEIsZUFBZSxDQUFDIiwiZmlsZSI6InJlbmRlci9DU1NSZW5kZXJlckJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvaW50XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUG9pbnRcIik7XHJcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUmVjdGFuZ2xlXCIpO1xyXG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcclxuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XHJcbmltcG9ydCBFdmVudERpc3BhdGNoZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCIpO1xyXG5cclxuaW1wb3J0IExpbmVTdWJNZXNoXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xpbmVTdWJNZXNoXCIpO1xyXG5pbXBvcnQgVHJpYW5nbGVTdWJNZXNoXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9UcmlhbmdsZVN1Yk1lc2hcIik7XHJcbmltcG9ydCBDU1NCaWxsYm9hcmRSZW5kZXJhYmxlXHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0NTU0JpbGxib2FyZFJlbmRlcmFibGVcIik7XHJcbmltcG9ydCBDU1NMaW5lU2VnbWVudFJlbmRlcmFibGVcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvQ1NTTGluZVNlZ21lbnRSZW5kZXJhYmxlXCIpO1xyXG5pbXBvcnQgQ1NTUmVuZGVyYWJsZUJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9DU1NSZW5kZXJhYmxlQmFzZVwiKTtcclxuaW1wb3J0IEVudGl0eUxpc3RJdGVtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9FbnRpdHlMaXN0SXRlbVwiKTtcclxuaW1wb3J0IElSZW5kZXJhYmxlUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmFibGVQb29sXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvSVJlbmRlcmVyXCIpO1xyXG5pbXBvcnQgSUVudGl0eVNvcnRlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3NvcnQvSUVudGl0eVNvcnRlclwiKTtcclxuaW1wb3J0IENTU0VudGl0eUNvbGxlY3Rvclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9DU1NFbnRpdHlDb2xsZWN0b3JcIik7XHJcbmltcG9ydCBFbnRpdHlDb2xsZWN0b3JcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9FbnRpdHlDb2xsZWN0b3JcIik7XHJcbmltcG9ydCBJQ29sbGVjdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9JQ29sbGVjdG9yXCIpO1xyXG5pbXBvcnQgQmlsbGJvYXJkXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9CaWxsYm9hcmRcIik7XHJcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xyXG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xyXG5pbXBvcnQgU2t5Ym94XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL1NreWJveFwiKTtcclxuaW1wb3J0IFJlbmRlcmVyRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvUmVuZGVyZXJFdmVudFwiKTtcclxuaW1wb3J0IENTU01hdGVyaWFsQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9DU1NNYXRlcmlhbEJhc2VcIik7XHJcbmltcG9ydCBUZXh0dXJlUHJveHlCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvVGV4dHVyZVByb3h5QmFzZVwiKTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJlckJhc2UgZm9ybXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzcyBmb3IgY2xhc3NlcyB0aGF0IGFyZSB1c2VkIGluIHRoZSByZW5kZXJpbmcgcGlwZWxpbmUgdG8gcmVuZGVyIHRoZVxyXG4gKiBjb250ZW50cyBvZiBhIHBhcnRpdGlvblxyXG4gKlxyXG4gKiBAY2xhc3MgYXdheS5yZW5kZXIuUmVuZGVyZXJCYXNlXHJcbiAqL1xyXG5jbGFzcyBDU1NSZW5kZXJlckJhc2UgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcclxue1xyXG5cdHByaXZhdGUgX2JpbGxib2FyZFJlbmRlcmFibGVQb29sOklSZW5kZXJhYmxlUG9vbDtcclxuXHRwcml2YXRlIF9saW5lU2VnbWVudFJlbmRlcmFibGVQb29sOklSZW5kZXJhYmxlUG9vbDtcclxuXHJcblx0cHVibGljIF9wQ2FtZXJhOkNhbWVyYTtcclxuXHRwdWJsaWMgX2lFbnRyeVBvaW50OlZlY3RvcjNEO1xyXG5cdHB1YmxpYyBfcENhbWVyYUZvcndhcmQ6VmVjdG9yM0Q7XHJcblxyXG5cdHByaXZhdGUgX2JhY2tncm91bmRSOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfYmFja2dyb3VuZEc6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9iYWNrZ3JvdW5kQjpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX2JhY2tncm91bmRBbHBoYTpudW1iZXIgPSAxO1xyXG5cdHByaXZhdGUgX3NoYXJlQ29udGV4dDpib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHB1YmxpYyBfcEJhY2tCdWZmZXJJbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHB1YmxpYyBfZGVwdGhUZXh0dXJlSW52YWxpZDpib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0cHVibGljIF9yZW5kZXJhYmxlSGVhZDpDU1NSZW5kZXJhYmxlQmFzZTtcclxuXHJcblx0cHVibGljIF93aWR0aDpudW1iZXI7XHJcblx0cHVibGljIF9oZWlnaHQ6bnVtYmVyO1xyXG5cclxuXHRwcml2YXRlIF92aWV3UG9ydDpSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XHJcblx0cHJpdmF0ZSBfdmlld3BvcnREaXJ0eTpib29sZWFuO1xyXG5cdHByaXZhdGUgX3NjaXNzb3JSZWN0OlJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoKTtcclxuXHRwcml2YXRlIF9zY2lzc29yRGlydHk6Ym9vbGVhbjtcclxuXHJcblx0cHJpdmF0ZSBfbG9jYWxQb3M6UG9pbnQgPSBuZXcgUG9pbnQoKTtcclxuXHRwcml2YXRlIF9nbG9iYWxQb3M6UG9pbnQgPSBuZXcgUG9pbnQoKTtcclxuXHJcblx0cHJpdmF0ZSBfc2Npc3NvclVwZGF0ZWQ6UmVuZGVyZXJFdmVudDtcclxuXHRwcml2YXRlIF92aWV3UG9ydFVwZGF0ZWQ6UmVuZGVyZXJFdmVudDtcclxuXHJcblx0LyoqXHJcblx0ICogQSB2aWV3UG9ydCByZWN0YW5nbGUgZXF1aXZhbGVudCBvZiB0aGUgU3RhZ2VHTCBzaXplIGFuZCBwb3NpdGlvbi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHZpZXdQb3J0KCk6UmVjdGFuZ2xlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3ZpZXdQb3J0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQSBzY2lzc29yIHJlY3RhbmdsZSBlcXVpdmFsZW50IG9mIHRoZSB2aWV3IHNpemUgYW5kIHBvc2l0aW9uLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2Npc3NvclJlY3QoKTpSZWN0YW5nbGVcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2Npc3NvclJlY3Q7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgeCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9sb2NhbFBvcy54O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB4KHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy54ID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy51cGRhdGVHbG9iYWxQb3MoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCB5KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2xvY2FsUG9zLnk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHkodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLnkgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9nbG9iYWxQb3MueSA9IHRoaXMuX2xvY2FsUG9zLnkgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZUdsb2JhbFBvcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3dpZHRoO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB3aWR0aCh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3dpZHRoID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuXHRcdHRoaXMuX3NjaXNzb3JSZWN0LndpZHRoID0gdmFsdWU7XHJcblx0XHR0aGlzLl92aWV3UG9ydC53aWR0aCA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BCYWNrQnVmZmVySW52YWxpZCA9IHRydWU7XHJcblx0XHR0aGlzLl9kZXB0aFRleHR1cmVJbnZhbGlkID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLm5vdGlmeVZpZXdwb3J0VXBkYXRlKCk7XHJcblx0XHR0aGlzLm5vdGlmeVNjaXNzb3JVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBoZWlnaHQoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5faGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBoZWlnaHQodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9oZWlnaHQgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuXHRcdHRoaXMuX3NjaXNzb3JSZWN0LmhlaWdodCA9IHZhbHVlO1xyXG5cdFx0dGhpcy5fdmlld1BvcnQuaGVpZ2h0ID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEJhY2tCdWZmZXJJbnZhbGlkID0gdHJ1ZTtcclxuXHRcdHRoaXMuX2RlcHRoVGV4dHVyZUludmFsaWQgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMubm90aWZ5Vmlld3BvcnRVcGRhdGUoKTtcclxuXHRcdHRoaXMubm90aWZ5U2Npc3NvclVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgcmVuZGVyYWJsZVNvcnRlcjpJRW50aXR5U29ydGVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IFJlbmRlcmVyQmFzZSBvYmplY3QuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IocmVuZGVyVG9UZXh0dXJlOmJvb2xlYW4gPSBmYWxzZSwgZm9yY2VTb2Z0d2FyZTpib29sZWFuID0gZmFsc2UsIHByb2ZpbGU6c3RyaW5nID0gXCJiYXNlbGluZVwiKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0Ly90aGlzLl9iaWxsYm9hcmRSZW5kZXJhYmxlUG9vbCA9IFJlbmRlcmFibGVQb29sLmdldFBvb2woQ1NTQmlsbGJvYXJkUmVuZGVyYWJsZSk7XHJcblx0XHQvL3RoaXMuX2xpbmVTZWdtZW50UmVuZGVyYWJsZVBvb2wgPSBSZW5kZXJhYmxlUG9vbC5nZXRQb29sKENTU0xpbmVTZWdtZW50UmVuZGVyYWJsZSk7XHJcblxyXG5cdFx0dGhpcy5fdmlld1BvcnQgPSBuZXcgUmVjdGFuZ2xlKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3dpZHRoID09IDApXHJcblx0XHRcdHRoaXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcblx0XHRpZiAodGhpcy5faGVpZ2h0ID09IDApXHJcblx0XHRcdHRoaXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGJhY2tncm91bmQgY29sb3IncyByZWQgY29tcG9uZW50LCB1c2VkIHdoZW4gY2xlYXJpbmcuXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgX2lCYWNrZ3JvdW5kUigpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kUjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgX2lCYWNrZ3JvdW5kUih2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2JhY2tncm91bmRSID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fYmFja2dyb3VuZFIgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wQmFja0J1ZmZlckludmFsaWQgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGJhY2tncm91bmQgY29sb3IncyBncmVlbiBjb21wb25lbnQsIHVzZWQgd2hlbiBjbGVhcmluZy5cclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHVibGljIGdldCBfaUJhY2tncm91bmRHKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JhY2tncm91bmRHO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBfaUJhY2tncm91bmRHKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYmFja2dyb3VuZEcgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9iYWNrZ3JvdW5kRyA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BCYWNrQnVmZmVySW52YWxpZCA9IHRydWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYmFja2dyb3VuZCBjb2xvcidzIGJsdWUgY29tcG9uZW50LCB1c2VkIHdoZW4gY2xlYXJpbmcuXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgX2lCYWNrZ3JvdW5kQigpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kQjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgX2lCYWNrZ3JvdW5kQih2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2JhY2tncm91bmRCID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fYmFja2dyb3VuZEIgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wQmFja0J1ZmZlckludmFsaWQgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzaGFyZUNvbnRleHQoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NoYXJlQ29udGV4dDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgc2hhcmVDb250ZXh0KHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3NoYXJlQ29udGV4dCA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3NoYXJlQ29udGV4dCA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlR2xvYmFsUG9zKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwb3NlcyB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIFJlbmRlcmVyQmFzZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cdFx0LypcclxuXHRcdCBpZiAoX2JhY2tncm91bmRJbWFnZVJlbmRlcmVyKSB7XHJcblx0XHQgX2JhY2tncm91bmRJbWFnZVJlbmRlcmVyLmRpc3Bvc2UoKTtcclxuXHRcdCBfYmFja2dyb3VuZEltYWdlUmVuZGVyZXIgPSBudWxsO1xyXG5cdFx0IH1cclxuXHRcdCAqL1xyXG5cdH1cclxuXHJcblx0cHVibGljIHJlbmRlcihlbnRpdHlDb2xsZWN0b3I6SUNvbGxlY3RvcilcclxuXHR7XHJcblx0XHR0aGlzLl92aWV3cG9ydERpcnR5ID0gZmFsc2U7XHJcblx0XHR0aGlzLl9zY2lzc29yRGlydHkgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgdGhlIHBvdGVudGlhbGx5IHZpc2libGUgZ2VvbWV0cnkgdG8gdGhlIGJhY2sgYnVmZmVyIG9yIHRleHR1cmUuXHJcblx0ICogQHBhcmFtIGVudGl0eUNvbGxlY3RvciBUaGUgRW50aXR5Q29sbGVjdG9yIG9iamVjdCBjb250YWluaW5nIHRoZSBwb3RlbnRpYWxseSB2aXNpYmxlIGdlb21ldHJ5LlxyXG5cdCAqIEBwYXJhbSBzY2lzc29yUmVjdFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaVJlbmRlcihlbnRpdHlDb2xsZWN0b3I6RW50aXR5Q29sbGVjdG9yLCB0YXJnZXQ6VGV4dHVyZVByb3h5QmFzZSA9IG51bGwsIHNjaXNzb3JSZWN0OlJlY3RhbmdsZSA9IG51bGwsIHN1cmZhY2VTZWxlY3RvcjpudW1iZXIgPSAwKVxyXG5cdHtcclxuXHRcdGlmICghZW50aXR5Q29sbGVjdG9yLmVudGl0eUhlYWQpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLnBFeGVjdXRlUmVuZGVyKGVudGl0eUNvbGxlY3Rvciwgc2Npc3NvclJlY3QpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pUmVuZGVyQ2FzY2FkZXMoZW50aXR5Q29sbGVjdG9yOklDb2xsZWN0b3IsIHRhcmdldDpUZXh0dXJlUHJveHlCYXNlLCBudW1DYXNjYWRlczpudW1iZXIsIHNjaXNzb3JSZWN0czpBcnJheTxSZWN0YW5nbGU+LCBjYW1lcmFzOkFycmF5PENhbWVyYT4pXHJcblx0e1xyXG5cclxuXHR9XHJcblx0cHVibGljIHBDb2xsZWN0UmVuZGVyYWJsZXMoZW50aXR5Q29sbGVjdG9yOklDb2xsZWN0b3IpXHJcblx0e1xyXG5cdFx0Ly9yZXNldCBoZWFkIHZhbHVlc1xyXG5cdFx0dGhpcy5fcmVuZGVyYWJsZUhlYWQgPSBudWxsO1xyXG5cclxuXHRcdC8vZ3JhYiBlbnRpdHkgaGVhZFxyXG5cdFx0dmFyIGl0ZW06RW50aXR5TGlzdEl0ZW0gPSBlbnRpdHlDb2xsZWN0b3IuZW50aXR5SGVhZDtcclxuXHJcblx0XHQvL3NldCB0ZW1wIHZhbHVlcyBmb3IgZW50cnkgcG9pbnQgYW5kIGNhbWVyYSBmb3J3YXJkIHZlY3RvclxyXG5cdFx0dGhpcy5fcENhbWVyYSA9IGVudGl0eUNvbGxlY3Rvci5jYW1lcmE7XHJcblx0XHR0aGlzLl9pRW50cnlQb2ludCA9IHRoaXMuX3BDYW1lcmEuc2NlbmVQb3NpdGlvbjtcclxuXHRcdHRoaXMuX3BDYW1lcmFGb3J3YXJkID0gdGhpcy5fcENhbWVyYS50cmFuc2Zvcm0uZm9yd2FyZFZlY3RvcjtcclxuXHJcblx0XHQvL2l0ZXJhdGUgdGhyb3VnaCBhbGwgZW50aXRpZXNcclxuXHRcdHdoaWxlIChpdGVtKSB7XHJcblx0XHRcdGl0ZW0uZW50aXR5Ll9pQ29sbGVjdFJlbmRlcmFibGVzKHRoaXMpO1xyXG5cdFx0XHRpdGVtID0gaXRlbS5uZXh0O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgcG90ZW50aWFsbHkgdmlzaWJsZSBnZW9tZXRyeSB0byB0aGUgYmFjayBidWZmZXIgb3IgdGV4dHVyZS4gT25seSBleGVjdXRlZCBpZiBldmVyeXRoaW5nIGlzIHNldCB1cC5cclxuXHQgKiBAcGFyYW0gZW50aXR5Q29sbGVjdG9yIFRoZSBFbnRpdHlDb2xsZWN0b3Igb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHBvdGVudGlhbGx5IHZpc2libGUgZ2VvbWV0cnkuXHJcblx0ICogQHBhcmFtIHNjaXNzb3JSZWN0XHJcblx0ICovXHJcblx0cHVibGljIHBFeGVjdXRlUmVuZGVyKGVudGl0eUNvbGxlY3RvcjpDU1NFbnRpdHlDb2xsZWN0b3IsIHNjaXNzb3JSZWN0OlJlY3RhbmdsZSA9IG51bGwpXHJcblx0e1xyXG5cdFx0dGhpcy5wQ29sbGVjdFJlbmRlcmFibGVzKGVudGl0eUNvbGxlY3Rvcik7XHJcblxyXG5cdFx0dGhpcy5wRHJhdyhlbnRpdHlDb2xsZWN0b3IpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUGVyZm9ybXMgdGhlIGFjdHVhbCBkcmF3aW5nIG9mIGRvbSBvYmplY3RzIHRvIHRoZSB0YXJnZXQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZW50aXR5Q29sbGVjdG9yIFRoZSBFbnRpdHlDb2xsZWN0b3Igb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHBvdGVudGlhbGx5IHZpc2libGUgZG9tIG9iamVjdHMuXHJcblx0ICovXHJcblx0cHVibGljIHBEcmF3KGVudGl0eUNvbGxlY3RvcjpDU1NFbnRpdHlDb2xsZWN0b3IpXHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgX2lCYWNrZ3JvdW5kQWxwaGEoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYmFja2dyb3VuZEFscGhhO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBfaUJhY2tncm91bmRBbHBoYSh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2JhY2tncm91bmRBbHBoYSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2JhY2tncm91bmRBbHBoYSA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BCYWNrQnVmZmVySW52YWxpZCA9IHRydWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBiaWxsYm9hcmRcclxuXHQgKi9cclxuXHRwdWJsaWMgYXBwbHlCaWxsYm9hcmQoYmlsbGJvYXJkOkJpbGxib2FyZClcclxuXHR7XHJcblx0XHQvL3RoaXMuX2FwcGx5UmVuZGVyYWJsZSg8Q1NTUmVuZGVyYWJsZUJhc2U+IHRoaXMuX2JpbGxib2FyZFJlbmRlcmFibGVQb29sLmdldEl0ZW0oYmlsbGJvYXJkKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBsaW5lU3ViTWVzaFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhcHBseUxpbmVTdWJNZXNoKGxpbmVTdWJNZXNoOkxpbmVTdWJNZXNoKVxyXG5cdHtcclxuXHRcdC8vdGhpcy5fYXBwbHlSZW5kZXJhYmxlKDxDU1NSZW5kZXJhYmxlQmFzZT4gdGhpcy5fYmlsbGJvYXJkUmVuZGVyYWJsZVBvb2wuZ2V0SXRlbShsaW5lU2VnbWVudCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc2t5Ym94XHJcblx0ICovXHJcblx0cHVibGljIGFwcGx5U2t5Ym94KHNreWJveDpTa3lib3gpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHRyaWFuZ2xlU3ViTWVzaFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhcHBseVRyaWFuZ2xlU3ViTWVzaCh0cmlhbmdsZVN1Yk1lc2g6VHJpYW5nbGVTdWJNZXNoKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSByZW5kZXJhYmxlXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIF9hcHBseVJlbmRlcmFibGUocmVuZGVyYWJsZTpDU1NSZW5kZXJhYmxlQmFzZSlcclxuXHR7XHJcblx0XHR2YXIgbWF0ZXJpYWw6Q1NTTWF0ZXJpYWxCYXNlOy8vID0gPENTU01hdGVyaWFsQmFzZT4gcmVuZGVyYWJsZS5yZW5kZXJhYmxlT3duZXIubWF0ZXJpYWw7XHJcblx0XHR2YXIgZW50aXR5OklFbnRpdHkgPSByZW5kZXJhYmxlLnNvdXJjZUVudGl0eTtcclxuXHRcdHZhciBwb3NpdGlvbjpWZWN0b3IzRCA9IGVudGl0eS5zY2VuZVBvc2l0aW9uO1xyXG5cclxuXHRcdGlmIChtYXRlcmlhbCkge1xyXG5cdFx0XHQvL3NldCBpZHMgZm9yIGZhc3RlciByZWZlcmVuY2luZ1xyXG5cdFx0XHRyZW5kZXJhYmxlLm1hdGVyaWFsSWQgPSBtYXRlcmlhbC5faU1hdGVyaWFsSWQ7XHJcbi8vXHRcdFx0XHRyZW5kZXJhYmxlLnJlbmRlck9yZGVySWQgPSBtYXRlcmlhbC5faVJlbmRlck9yZGVySWQ7XHJcblx0XHRcdHJlbmRlcmFibGUuY2FzY2FkZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdC8vIHByb2plY3Qgb250byBjYW1lcmEncyB6LWF4aXNcclxuXHRcdFx0cG9zaXRpb24gPSB0aGlzLl9pRW50cnlQb2ludC5zdWJ0cmFjdChwb3NpdGlvbik7XHJcblx0XHRcdHJlbmRlcmFibGUuekluZGV4ID0gZW50aXR5LnpPZmZzZXQgLSBwb3NpdGlvbi5kb3RQcm9kdWN0KHRoaXMuX3BDYW1lcmFGb3J3YXJkKTtcclxuXHJcblx0XHRcdC8vc3RvcmUgcmVmZXJlbmNlIHRvIHNjZW5lIHRyYW5zZm9ybVxyXG5cdFx0XHRyZW5kZXJhYmxlLnJlbmRlclNjZW5lVHJhbnNmb3JtID0gcmVuZGVyYWJsZS5zb3VyY2VFbnRpdHkuZ2V0UmVuZGVyU2NlbmVUcmFuc2Zvcm0odGhpcy5fcENhbWVyYSk7XHJcblxyXG5cdFx0XHQvL3N0b3JlIHJlZmVyZW5jZSB0byBuZXh0IGl0ZW0gaW4gbGlzdFxyXG5cdFx0XHRyZW5kZXJhYmxlLm5leHQgPSB0aGlzLl9yZW5kZXJhYmxlSGVhZDtcclxuXHRcdFx0dGhpcy5fcmVuZGVyYWJsZUhlYWQgPSByZW5kZXJhYmxlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBub3RpZnlTY2lzc29yVXBkYXRlKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fc2Npc3NvckRpcnR5KVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fc2Npc3NvckRpcnR5ID0gdHJ1ZTtcclxuXHJcblx0XHRpZiAoIXRoaXMuX3NjaXNzb3JVcGRhdGVkKVxyXG5cdFx0XHR0aGlzLl9zY2lzc29yVXBkYXRlZCA9IG5ldyBSZW5kZXJlckV2ZW50KFJlbmRlcmVyRXZlbnQuU0NJU1NPUl9VUERBVEVEKTtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fc2Npc3NvclVwZGF0ZWQpO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBub3RpZnlWaWV3cG9ydFVwZGF0ZSgpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3ZpZXdwb3J0RGlydHkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl92aWV3cG9ydERpcnR5ID0gdHJ1ZTtcclxuXHJcblx0XHRpZiAoIXRoaXMuX3ZpZXdQb3J0VXBkYXRlZClcclxuXHRcdFx0dGhpcy5fdmlld1BvcnRVcGRhdGVkID0gbmV3IFJlbmRlcmVyRXZlbnQoUmVuZGVyZXJFdmVudC5WSUVXUE9SVF9VUERBVEVEKTtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fdmlld1BvcnRVcGRhdGVkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIHVwZGF0ZUdsb2JhbFBvcygpXHJcblx0e1xyXG5cdFx0dGhpcy5fdmlld1BvcnQueCA9IHRoaXMuX2dsb2JhbFBvcy54O1xyXG5cdFx0dGhpcy5fdmlld1BvcnQueSA9IHRoaXMuX2dsb2JhbFBvcy55O1xyXG5cclxuXHRcdHRoaXMubm90aWZ5Vmlld3BvcnRVcGRhdGUoKTtcclxuXHRcdHRoaXMubm90aWZ5U2Npc3NvclVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBfaUNyZWF0ZUVudGl0eUNvbGxlY3RvcigpOklDb2xsZWN0b3JcclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gQ1NTUmVuZGVyZXJCYXNlOyJdfQ==