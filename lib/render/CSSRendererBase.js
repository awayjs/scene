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
        ////reset head values
        //this._renderableHead = null;
        //
        ////grab entity head
        //var item:EntityListItem = entityCollector.entityHead;
        //
        ////set temp values for entry point and camera forward vector
        //this._pCamera = entityCollector.camera;
        //this._iEntryPoint = this._pCamera.scenePosition;
        //this._pCameraForward = this._pCamera.transform.forwardVector;
        //
        ////iterate through all entities
        //while (item) {
        //	//item.entity._iCollectRenderables(this);
        //	item = item.next;
        //}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvQ1NTUmVuZGVyZXJCYXNlLnRzIl0sIm5hbWVzIjpbIkNTU1JlbmRlcmVyQmFzZSIsIkNTU1JlbmRlcmVyQmFzZS5jb25zdHJ1Y3RvciIsIkNTU1JlbmRlcmVyQmFzZS52aWV3UG9ydCIsIkNTU1JlbmRlcmVyQmFzZS5zY2lzc29yUmVjdCIsIkNTU1JlbmRlcmVyQmFzZS54IiwiQ1NTUmVuZGVyZXJCYXNlLnkiLCJDU1NSZW5kZXJlckJhc2Uud2lkdGgiLCJDU1NSZW5kZXJlckJhc2UuaGVpZ2h0IiwiQ1NTUmVuZGVyZXJCYXNlLl9pQmFja2dyb3VuZFIiLCJDU1NSZW5kZXJlckJhc2UuX2lCYWNrZ3JvdW5kRyIsIkNTU1JlbmRlcmVyQmFzZS5faUJhY2tncm91bmRCIiwiQ1NTUmVuZGVyZXJCYXNlLnNoYXJlQ29udGV4dCIsIkNTU1JlbmRlcmVyQmFzZS5kaXNwb3NlIiwiQ1NTUmVuZGVyZXJCYXNlLnJlbmRlciIsIkNTU1JlbmRlcmVyQmFzZS5faVJlbmRlciIsIkNTU1JlbmRlcmVyQmFzZS5faVJlbmRlckNhc2NhZGVzIiwiQ1NTUmVuZGVyZXJCYXNlLnBDb2xsZWN0UmVuZGVyYWJsZXMiLCJDU1NSZW5kZXJlckJhc2UucEV4ZWN1dGVSZW5kZXIiLCJDU1NSZW5kZXJlckJhc2UucERyYXciLCJDU1NSZW5kZXJlckJhc2UuX2lCYWNrZ3JvdW5kQWxwaGEiLCJDU1NSZW5kZXJlckJhc2UuYXBwbHlCaWxsYm9hcmQiLCJDU1NSZW5kZXJlckJhc2UuYXBwbHlMaW5lU3ViTWVzaCIsIkNTU1JlbmRlcmVyQmFzZS5hcHBseVNreWJveCIsIkNTU1JlbmRlcmVyQmFzZS5hcHBseVRyaWFuZ2xlU3ViTWVzaCIsIkNTU1JlbmRlcmVyQmFzZS5fYXBwbHlSZW5kZXJhYmxlIiwiQ1NTUmVuZGVyZXJCYXNlLm5vdGlmeVNjaXNzb3JVcGRhdGUiLCJDU1NSZW5kZXJlckJhc2Uubm90aWZ5Vmlld3BvcnRVcGRhdGUiLCJDU1NSZW5kZXJlckJhc2UudXBkYXRlR2xvYmFsUG9zIiwiQ1NTUmVuZGVyZXJCYXNlLl9pQ3JlYXRlRW50aXR5Q29sbGVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLEtBQUssV0FBZ0IsNEJBQTRCLENBQUMsQ0FBQztBQUMxRCxJQUFPLFNBQVMsV0FBZSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBRWpFLElBQU8sbUJBQW1CLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUNyRixJQUFPLGVBQWUsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBa0I5RSxJQUFPLGFBQWEsV0FBYyx5Q0FBeUMsQ0FBQyxDQUFDO0FBSTdFLEFBTUE7Ozs7O0dBREc7SUFDRyxlQUFlO0lBQVNBLFVBQXhCQSxlQUFlQSxVQUF3QkE7SUF5STVDQTs7T0FFR0E7SUFDSEEsU0E1SUtBLGVBQWVBLENBNElSQSxlQUErQkEsRUFBRUEsYUFBNkJBLEVBQUVBLE9BQTJCQTtRQUEzRkMsK0JBQStCQSxHQUEvQkEsdUJBQStCQTtRQUFFQSw2QkFBNkJBLEdBQTdCQSxxQkFBNkJBO1FBQUVBLHVCQUEyQkEsR0FBM0JBLG9CQUEyQkE7UUFFdEdBLGlCQUFPQSxDQUFDQTtRQXJJREEsaUJBQVlBLEdBQVVBLENBQUNBLENBQUNBO1FBQ3hCQSxpQkFBWUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDeEJBLGlCQUFZQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUN4QkEscUJBQWdCQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUM1QkEsa0JBQWFBLEdBQVdBLEtBQUtBLENBQUNBO1FBRS9CQSx3QkFBbUJBLEdBQVdBLElBQUlBLENBQUNBO1FBQ25DQSx5QkFBb0JBLEdBQVdBLElBQUlBLENBQUNBO1FBT25DQSxjQUFTQSxHQUFhQSxJQUFJQSxTQUFTQSxFQUFFQSxDQUFDQTtRQUV0Q0EsaUJBQVlBLEdBQWFBLElBQUlBLFNBQVNBLEVBQUVBLENBQUNBO1FBR3pDQSxjQUFTQSxHQUFTQSxJQUFJQSxLQUFLQSxFQUFFQSxDQUFDQTtRQUM5QkEsZUFBVUEsR0FBU0EsSUFB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QUFFRCxBQUF5QixpQkFBaEIsZUFBZSxDQUFDIiwiZmlsZSI6InJlbmRlci9DU1NSZW5kZXJlckJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvaW50XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUG9pbnRcIik7XHJcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUmVjdGFuZ2xlXCIpO1xyXG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcclxuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XHJcbmltcG9ydCBFdmVudERpc3BhdGNoZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCIpO1xyXG5cclxuaW1wb3J0IExpbmVTdWJNZXNoXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xpbmVTdWJNZXNoXCIpO1xyXG5pbXBvcnQgVHJpYW5nbGVTdWJNZXNoXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9UcmlhbmdsZVN1Yk1lc2hcIik7XHJcbmltcG9ydCBDU1NCaWxsYm9hcmRSZW5kZXJhYmxlXHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0NTU0JpbGxib2FyZFJlbmRlcmFibGVcIik7XHJcbmltcG9ydCBDU1NMaW5lU2VnbWVudFJlbmRlcmFibGVcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvQ1NTTGluZVNlZ21lbnRSZW5kZXJhYmxlXCIpO1xyXG5pbXBvcnQgQ1NTUmVuZGVyYWJsZUJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9DU1NSZW5kZXJhYmxlQmFzZVwiKTtcclxuaW1wb3J0IEVudGl0eUxpc3RJdGVtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9FbnRpdHlMaXN0SXRlbVwiKTtcclxuaW1wb3J0IElSZW5kZXJhYmxlUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmFibGVQb29sXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvSVJlbmRlcmVyXCIpO1xyXG5pbXBvcnQgSUVudGl0eVNvcnRlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3NvcnQvSUVudGl0eVNvcnRlclwiKTtcclxuaW1wb3J0IENTU0VudGl0eUNvbGxlY3Rvclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9DU1NFbnRpdHlDb2xsZWN0b3JcIik7XHJcbmltcG9ydCBFbnRpdHlDb2xsZWN0b3JcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9FbnRpdHlDb2xsZWN0b3JcIik7XHJcbmltcG9ydCBDb2xsZWN0b3JCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvQ29sbGVjdG9yQmFzZVwiKTtcclxuaW1wb3J0IEJpbGxib2FyZFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQmlsbGJvYXJkXCIpO1xyXG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0NhbWVyYVwiKTtcclxuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcclxuaW1wb3J0IFNreWJveFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9Ta3lib3hcIik7XHJcbmltcG9ydCBSZW5kZXJlckV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL1JlbmRlcmVyRXZlbnRcIik7XHJcbmltcG9ydCBDU1NNYXRlcmlhbEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvQ1NTTWF0ZXJpYWxCYXNlXCIpO1xyXG5pbXBvcnQgVGV4dHVyZUJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL1RleHR1cmVCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIFJlbmRlcmVyQmFzZSBmb3JtcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBjbGFzc2VzIHRoYXQgYXJlIHVzZWQgaW4gdGhlIHJlbmRlcmluZyBwaXBlbGluZSB0byByZW5kZXIgdGhlXHJcbiAqIGNvbnRlbnRzIG9mIGEgcGFydGl0aW9uXHJcbiAqXHJcbiAqIEBjbGFzcyBhd2F5LnJlbmRlci5SZW5kZXJlckJhc2VcclxuICovXHJcbmNsYXNzIENTU1JlbmRlcmVyQmFzZSBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxyXG57XHJcblx0cHJpdmF0ZSBfYmlsbGJvYXJkUmVuZGVyYWJsZVBvb2w6SVJlbmRlcmFibGVQb29sO1xyXG5cdHByaXZhdGUgX2xpbmVTZWdtZW50UmVuZGVyYWJsZVBvb2w6SVJlbmRlcmFibGVQb29sO1xyXG5cclxuXHRwdWJsaWMgX3BDYW1lcmE6Q2FtZXJhO1xyXG5cdHB1YmxpYyBfaUVudHJ5UG9pbnQ6VmVjdG9yM0Q7XHJcblx0cHVibGljIF9wQ2FtZXJhRm9yd2FyZDpWZWN0b3IzRDtcclxuXHJcblx0cHJpdmF0ZSBfYmFja2dyb3VuZFI6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9iYWNrZ3JvdW5kRzpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX2JhY2tncm91bmRCOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfYmFja2dyb3VuZEFscGhhOm51bWJlciA9IDE7XHJcblx0cHJpdmF0ZSBfc2hhcmVDb250ZXh0OmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0cHVibGljIF9wQmFja0J1ZmZlckludmFsaWQ6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHVibGljIF9kZXB0aFRleHR1cmVJbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRwdWJsaWMgX3JlbmRlcmFibGVIZWFkOkNTU1JlbmRlcmFibGVCYXNlO1xyXG5cclxuXHRwdWJsaWMgX3dpZHRoOm51bWJlcjtcclxuXHRwdWJsaWMgX2hlaWdodDpudW1iZXI7XHJcblxyXG5cdHByaXZhdGUgX3ZpZXdQb3J0OlJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoKTtcclxuXHRwcml2YXRlIF92aWV3cG9ydERpcnR5OmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfc2Npc3NvclJlY3Q6UmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgpO1xyXG5cdHByaXZhdGUgX3NjaXNzb3JEaXJ0eTpib29sZWFuO1xyXG5cclxuXHRwcml2YXRlIF9sb2NhbFBvczpQb2ludCA9IG5ldyBQb2ludCgpO1xyXG5cdHByaXZhdGUgX2dsb2JhbFBvczpQb2ludCA9IG5ldyBQb2ludCgpO1xyXG5cclxuXHRwcml2YXRlIF9zY2lzc29yVXBkYXRlZDpSZW5kZXJlckV2ZW50O1xyXG5cdHByaXZhdGUgX3ZpZXdQb3J0VXBkYXRlZDpSZW5kZXJlckV2ZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBBIHZpZXdQb3J0IHJlY3RhbmdsZSBlcXVpdmFsZW50IG9mIHRoZSBTdGFnZUdMIHNpemUgYW5kIHBvc2l0aW9uLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdmlld1BvcnQoKTpSZWN0YW5nbGVcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdmlld1BvcnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIHNjaXNzb3IgcmVjdGFuZ2xlIGVxdWl2YWxlbnQgb2YgdGhlIHZpZXcgc2l6ZSBhbmQgcG9zaXRpb24uXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2lzc29yUmVjdCgpOlJlY3RhbmdsZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zY2lzc29yUmVjdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCB4KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2xvY2FsUG9zLng7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHgodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLnggPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZUdsb2JhbFBvcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHkoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbG9jYWxQb3MueTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgeSh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMueSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2dsb2JhbFBvcy55ID0gdGhpcy5fbG9jYWxQb3MueSA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlR2xvYmFsUG9zKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fd2lkdGg7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHdpZHRoKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fd2lkdGggPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG5cdFx0dGhpcy5fc2Npc3NvclJlY3Qud2lkdGggPSB2YWx1ZTtcclxuXHRcdHRoaXMuX3ZpZXdQb3J0LndpZHRoID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEJhY2tCdWZmZXJJbnZhbGlkID0gdHJ1ZTtcclxuXHRcdHRoaXMuX2RlcHRoVGV4dHVyZUludmFsaWQgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMubm90aWZ5Vmlld3BvcnRVcGRhdGUoKTtcclxuXHRcdHRoaXMubm90aWZ5U2Npc3NvclVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGhlaWdodCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9oZWlnaHQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGhlaWdodCh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2hlaWdodCA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG5cdFx0dGhpcy5fc2Npc3NvclJlY3QuaGVpZ2h0ID0gdmFsdWU7XHJcblx0XHR0aGlzLl92aWV3UG9ydC5oZWlnaHQgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wQmFja0J1ZmZlckludmFsaWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5fZGVwdGhUZXh0dXJlSW52YWxpZCA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5ub3RpZnlWaWV3cG9ydFVwZGF0ZSgpO1xyXG5cdFx0dGhpcy5ub3RpZnlTY2lzc29yVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZW5kZXJhYmxlU29ydGVyOklFbnRpdHlTb3J0ZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgUmVuZGVyZXJCYXNlIG9iamVjdC5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihyZW5kZXJUb1RleHR1cmU6Ym9vbGVhbiA9IGZhbHNlLCBmb3JjZVNvZnR3YXJlOmJvb2xlYW4gPSBmYWxzZSwgcHJvZmlsZTpzdHJpbmcgPSBcImJhc2VsaW5lXCIpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvL3RoaXMuX2JpbGxib2FyZFJlbmRlcmFibGVQb29sID0gUmVuZGVyYWJsZVBvb2wuZ2V0UG9vbChDU1NCaWxsYm9hcmRSZW5kZXJhYmxlKTtcclxuXHRcdC8vdGhpcy5fbGluZVNlZ21lbnRSZW5kZXJhYmxlUG9vbCA9IFJlbmRlcmFibGVQb29sLmdldFBvb2woQ1NTTGluZVNlZ21lbnRSZW5kZXJhYmxlKTtcclxuXHJcblx0XHR0aGlzLl92aWV3UG9ydCA9IG5ldyBSZWN0YW5nbGUoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fd2lkdGggPT0gMClcclxuXHRcdFx0dGhpcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cclxuXHRcdGlmICh0aGlzLl9oZWlnaHQgPT0gMClcclxuXHRcdFx0dGhpcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYmFja2dyb3VuZCBjb2xvcidzIHJlZCBjb21wb25lbnQsIHVzZWQgd2hlbiBjbGVhcmluZy5cclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHVibGljIGdldCBfaUJhY2tncm91bmRSKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JhY2tncm91bmRSO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBfaUJhY2tncm91bmRSKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYmFja2dyb3VuZFIgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9iYWNrZ3JvdW5kUiA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BCYWNrQnVmZmVySW52YWxpZCA9IHRydWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYmFja2dyb3VuZCBjb2xvcidzIGdyZWVuIGNvbXBvbmVudCwgdXNlZCB3aGVuIGNsZWFyaW5nLlxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IF9pQmFja2dyb3VuZEcoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYmFja2dyb3VuZEc7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IF9pQmFja2dyb3VuZEcodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9iYWNrZ3JvdW5kRyA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2JhY2tncm91bmRHID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEJhY2tCdWZmZXJJbnZhbGlkID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBiYWNrZ3JvdW5kIGNvbG9yJ3MgYmx1ZSBjb21wb25lbnQsIHVzZWQgd2hlbiBjbGVhcmluZy5cclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHVibGljIGdldCBfaUJhY2tncm91bmRCKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JhY2tncm91bmRCO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBfaUJhY2tncm91bmRCKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYmFja2dyb3VuZEIgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9iYWNrZ3JvdW5kQiA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BCYWNrQnVmZmVySW52YWxpZCA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHNoYXJlQ29udGV4dCgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2hhcmVDb250ZXh0O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzaGFyZUNvbnRleHQodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fc2hhcmVDb250ZXh0ID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fc2hhcmVDb250ZXh0ID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy51cGRhdGVHbG9iYWxQb3MoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3Bvc2VzIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgUmVuZGVyZXJCYXNlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlKClcclxuXHR7XHJcblx0XHQvKlxyXG5cdFx0IGlmIChfYmFja2dyb3VuZEltYWdlUmVuZGVyZXIpIHtcclxuXHRcdCBfYmFja2dyb3VuZEltYWdlUmVuZGVyZXIuZGlzcG9zZSgpO1xyXG5cdFx0IF9iYWNrZ3JvdW5kSW1hZ2VSZW5kZXJlciA9IG51bGw7XHJcblx0XHQgfVxyXG5cdFx0ICovXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgcmVuZGVyKGVudGl0eUNvbGxlY3RvcjpDb2xsZWN0b3JCYXNlKVxyXG5cdHtcclxuXHRcdHRoaXMuX3ZpZXdwb3J0RGlydHkgPSBmYWxzZTtcclxuXHRcdHRoaXMuX3NjaXNzb3JEaXJ0eSA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVuZGVycyB0aGUgcG90ZW50aWFsbHkgdmlzaWJsZSBnZW9tZXRyeSB0byB0aGUgYmFjayBidWZmZXIgb3IgdGV4dHVyZS5cclxuXHQgKiBAcGFyYW0gZW50aXR5Q29sbGVjdG9yIFRoZSBFbnRpdHlDb2xsZWN0b3Igb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHBvdGVudGlhbGx5IHZpc2libGUgZ2VvbWV0cnkuXHJcblx0ICogQHBhcmFtIHNjaXNzb3JSZWN0XHJcblx0ICovXHJcblx0cHVibGljIF9pUmVuZGVyKGVudGl0eUNvbGxlY3RvcjpFbnRpdHlDb2xsZWN0b3IsIHRhcmdldDpUZXh0dXJlQmFzZSA9IG51bGwsIHNjaXNzb3JSZWN0OlJlY3RhbmdsZSA9IG51bGwsIHN1cmZhY2VTZWxlY3RvcjpudW1iZXIgPSAwKVxyXG5cdHtcclxuXHRcdGlmICghZW50aXR5Q29sbGVjdG9yLmVudGl0eUhlYWQpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLnBFeGVjdXRlUmVuZGVyKGVudGl0eUNvbGxlY3Rvciwgc2Npc3NvclJlY3QpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pUmVuZGVyQ2FzY2FkZXMoZW50aXR5Q29sbGVjdG9yOkNvbGxlY3RvckJhc2UsIHRhcmdldDpUZXh0dXJlQmFzZSwgbnVtQ2FzY2FkZXM6bnVtYmVyLCBzY2lzc29yUmVjdHM6QXJyYXk8UmVjdGFuZ2xlPiwgY2FtZXJhczpBcnJheTxDYW1lcmE+KVxyXG5cdHtcclxuXHJcblx0fVxyXG5cdHB1YmxpYyBwQ29sbGVjdFJlbmRlcmFibGVzKGVudGl0eUNvbGxlY3RvcjpDb2xsZWN0b3JCYXNlKVxyXG5cdHtcclxuXHRcdC8vLy9yZXNldCBoZWFkIHZhbHVlc1xyXG5cdFx0Ly90aGlzLl9yZW5kZXJhYmxlSGVhZCA9IG51bGw7XHJcblx0XHQvL1xyXG5cdFx0Ly8vL2dyYWIgZW50aXR5IGhlYWRcclxuXHRcdC8vdmFyIGl0ZW06RW50aXR5TGlzdEl0ZW0gPSBlbnRpdHlDb2xsZWN0b3IuZW50aXR5SGVhZDtcclxuXHRcdC8vXHJcblx0XHQvLy8vc2V0IHRlbXAgdmFsdWVzIGZvciBlbnRyeSBwb2ludCBhbmQgY2FtZXJhIGZvcndhcmQgdmVjdG9yXHJcblx0XHQvL3RoaXMuX3BDYW1lcmEgPSBlbnRpdHlDb2xsZWN0b3IuY2FtZXJhO1xyXG5cdFx0Ly90aGlzLl9pRW50cnlQb2ludCA9IHRoaXMuX3BDYW1lcmEuc2NlbmVQb3NpdGlvbjtcclxuXHRcdC8vdGhpcy5fcENhbWVyYUZvcndhcmQgPSB0aGlzLl9wQ2FtZXJhLnRyYW5zZm9ybS5mb3J3YXJkVmVjdG9yO1xyXG5cdFx0Ly9cclxuXHRcdC8vLy9pdGVyYXRlIHRocm91Z2ggYWxsIGVudGl0aWVzXHJcblx0XHQvL3doaWxlIChpdGVtKSB7XHJcblx0XHQvL1x0Ly9pdGVtLmVudGl0eS5faUNvbGxlY3RSZW5kZXJhYmxlcyh0aGlzKTtcclxuXHRcdC8vXHRpdGVtID0gaXRlbS5uZXh0O1xyXG5cdFx0Ly99XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW5kZXJzIHRoZSBwb3RlbnRpYWxseSB2aXNpYmxlIGdlb21ldHJ5IHRvIHRoZSBiYWNrIGJ1ZmZlciBvciB0ZXh0dXJlLiBPbmx5IGV4ZWN1dGVkIGlmIGV2ZXJ5dGhpbmcgaXMgc2V0IHVwLlxyXG5cdCAqIEBwYXJhbSBlbnRpdHlDb2xsZWN0b3IgVGhlIEVudGl0eUNvbGxlY3RvciBvYmplY3QgY29udGFpbmluZyB0aGUgcG90ZW50aWFsbHkgdmlzaWJsZSBnZW9tZXRyeS5cclxuXHQgKiBAcGFyYW0gc2Npc3NvclJlY3RcclxuXHQgKi9cclxuXHRwdWJsaWMgcEV4ZWN1dGVSZW5kZXIoZW50aXR5Q29sbGVjdG9yOkNTU0VudGl0eUNvbGxlY3Rvciwgc2Npc3NvclJlY3Q6UmVjdGFuZ2xlID0gbnVsbClcclxuXHR7XHJcblx0XHR0aGlzLnBDb2xsZWN0UmVuZGVyYWJsZXMoZW50aXR5Q29sbGVjdG9yKTtcclxuXHJcblx0XHR0aGlzLnBEcmF3KGVudGl0eUNvbGxlY3Rvcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBQZXJmb3JtcyB0aGUgYWN0dWFsIGRyYXdpbmcgb2YgZG9tIG9iamVjdHMgdG8gdGhlIHRhcmdldC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBlbnRpdHlDb2xsZWN0b3IgVGhlIEVudGl0eUNvbGxlY3RvciBvYmplY3QgY29udGFpbmluZyB0aGUgcG90ZW50aWFsbHkgdmlzaWJsZSBkb20gb2JqZWN0cy5cclxuXHQgKi9cclxuXHRwdWJsaWMgcERyYXcoZW50aXR5Q29sbGVjdG9yOkNTU0VudGl0eUNvbGxlY3RvcilcclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBfaUJhY2tncm91bmRBbHBoYSgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kQWxwaGE7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IF9pQmFja2dyb3VuZEFscGhhKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYmFja2dyb3VuZEFscGhhID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fYmFja2dyb3VuZEFscGhhID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEJhY2tCdWZmZXJJbnZhbGlkID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGJpbGxib2FyZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhcHBseUJpbGxib2FyZChiaWxsYm9hcmQ6QmlsbGJvYXJkKVxyXG5cdHtcclxuXHRcdC8vdGhpcy5fYXBwbHlSZW5kZXJhYmxlKDxDU1NSZW5kZXJhYmxlQmFzZT4gdGhpcy5fYmlsbGJvYXJkUmVuZGVyYWJsZVBvb2wuZ2V0SXRlbShiaWxsYm9hcmQpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGxpbmVTdWJNZXNoXHJcblx0ICovXHJcblx0cHVibGljIGFwcGx5TGluZVN1Yk1lc2gobGluZVN1Yk1lc2g6TGluZVN1Yk1lc2gpXHJcblx0e1xyXG5cdFx0Ly90aGlzLl9hcHBseVJlbmRlcmFibGUoPENTU1JlbmRlcmFibGVCYXNlPiB0aGlzLl9iaWxsYm9hcmRSZW5kZXJhYmxlUG9vbC5nZXRJdGVtKGxpbmVTZWdtZW50KSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBza3lib3hcclxuXHQgKi9cclxuXHRwdWJsaWMgYXBwbHlTa3lib3goc2t5Ym94OlNreWJveClcclxuXHR7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdHJpYW5nbGVTdWJNZXNoXHJcblx0ICovXHJcblx0cHVibGljIGFwcGx5VHJpYW5nbGVTdWJNZXNoKHRyaWFuZ2xlU3ViTWVzaDpUcmlhbmdsZVN1Yk1lc2gpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHJlbmRlcmFibGVcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX2FwcGx5UmVuZGVyYWJsZShyZW5kZXJhYmxlOkNTU1JlbmRlcmFibGVCYXNlKVxyXG5cdHtcclxuXHRcdHZhciBtYXRlcmlhbDpDU1NNYXRlcmlhbEJhc2U7Ly8gPSA8Q1NTTWF0ZXJpYWxCYXNlPiByZW5kZXJhYmxlLnJlbmRlcmFibGVPd25lci5tYXRlcmlhbDtcclxuXHRcdHZhciBlbnRpdHk6SUVudGl0eSA9IHJlbmRlcmFibGUuc291cmNlRW50aXR5O1xyXG5cdFx0dmFyIHBvc2l0aW9uOlZlY3RvcjNEID0gZW50aXR5LnNjZW5lUG9zaXRpb247XHJcblxyXG5cdFx0aWYgKG1hdGVyaWFsKSB7XHJcblx0XHRcdC8vc2V0IGlkcyBmb3IgZmFzdGVyIHJlZmVyZW5jaW5nXHJcblx0XHRcdHJlbmRlcmFibGUubWF0ZXJpYWxJZCA9IG1hdGVyaWFsLl9pTWF0ZXJpYWxJZDtcclxuLy9cdFx0XHRcdHJlbmRlcmFibGUucmVuZGVyT3JkZXJJZCA9IG1hdGVyaWFsLl9pUmVuZGVyT3JkZXJJZDtcclxuXHRcdFx0cmVuZGVyYWJsZS5jYXNjYWRlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0Ly8gcHJvamVjdCBvbnRvIGNhbWVyYSdzIHotYXhpc1xyXG5cdFx0XHRwb3NpdGlvbiA9IHRoaXMuX2lFbnRyeVBvaW50LnN1YnRyYWN0KHBvc2l0aW9uKTtcclxuXHRcdFx0cmVuZGVyYWJsZS56SW5kZXggPSBlbnRpdHkuek9mZnNldCAtIHBvc2l0aW9uLmRvdFByb2R1Y3QodGhpcy5fcENhbWVyYUZvcndhcmQpO1xyXG5cclxuXHRcdFx0Ly9zdG9yZSByZWZlcmVuY2UgdG8gc2NlbmUgdHJhbnNmb3JtXHJcblx0XHRcdHJlbmRlcmFibGUucmVuZGVyU2NlbmVUcmFuc2Zvcm0gPSByZW5kZXJhYmxlLnNvdXJjZUVudGl0eS5nZXRSZW5kZXJTY2VuZVRyYW5zZm9ybSh0aGlzLl9wQ2FtZXJhKTtcclxuXHJcblx0XHRcdC8vc3RvcmUgcmVmZXJlbmNlIHRvIG5leHQgaXRlbSBpbiBsaXN0XHJcblx0XHRcdHJlbmRlcmFibGUubmV4dCA9IHRoaXMuX3JlbmRlcmFibGVIZWFkO1xyXG5cdFx0XHR0aGlzLl9yZW5kZXJhYmxlSGVhZCA9IHJlbmRlcmFibGU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVNjaXNzb3JVcGRhdGUoKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9zY2lzc29yRGlydHkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9zY2lzc29yRGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdGlmICghdGhpcy5fc2Npc3NvclVwZGF0ZWQpXHJcblx0XHRcdHRoaXMuX3NjaXNzb3JVcGRhdGVkID0gbmV3IFJlbmRlcmVyRXZlbnQoUmVuZGVyZXJFdmVudC5TQ0lTU09SX1VQREFURUQpO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zY2lzc29yVXBkYXRlZCk7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVZpZXdwb3J0VXBkYXRlKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fdmlld3BvcnREaXJ0eSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3ZpZXdwb3J0RGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdGlmICghdGhpcy5fdmlld1BvcnRVcGRhdGVkKVxyXG5cdFx0XHR0aGlzLl92aWV3UG9ydFVwZGF0ZWQgPSBuZXcgUmVuZGVyZXJFdmVudChSZW5kZXJlckV2ZW50LlZJRVdQT1JUX1VQREFURUQpO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl92aWV3UG9ydFVwZGF0ZWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgdXBkYXRlR2xvYmFsUG9zKClcclxuXHR7XHJcblx0XHR0aGlzLl92aWV3UG9ydC54ID0gdGhpcy5fZ2xvYmFsUG9zLng7XHJcblx0XHR0aGlzLl92aWV3UG9ydC55ID0gdGhpcy5fZ2xvYmFsUG9zLnk7XHJcblxyXG5cdFx0dGhpcy5ub3RpZnlWaWV3cG9ydFVwZGF0ZSgpO1xyXG5cdFx0dGhpcy5ub3RpZnlTY2lzc29yVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIF9pQ3JlYXRlRW50aXR5Q29sbGVjdG9yKCk6Q29sbGVjdG9yQmFzZVxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBDU1NSZW5kZXJlckJhc2U7Il19