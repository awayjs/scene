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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvY3NzcmVuZGVyZXJiYXNlLnRzIl0sIm5hbWVzIjpbIkNTU1JlbmRlcmVyQmFzZSIsIkNTU1JlbmRlcmVyQmFzZS5jb25zdHJ1Y3RvciIsIkNTU1JlbmRlcmVyQmFzZS52aWV3UG9ydCIsIkNTU1JlbmRlcmVyQmFzZS5zY2lzc29yUmVjdCIsIkNTU1JlbmRlcmVyQmFzZS54IiwiQ1NTUmVuZGVyZXJCYXNlLnkiLCJDU1NSZW5kZXJlckJhc2Uud2lkdGgiLCJDU1NSZW5kZXJlckJhc2UuaGVpZ2h0IiwiQ1NTUmVuZGVyZXJCYXNlLl9pQmFja2dyb3VuZFIiLCJDU1NSZW5kZXJlckJhc2UuX2lCYWNrZ3JvdW5kRyIsIkNTU1JlbmRlcmVyQmFzZS5faUJhY2tncm91bmRCIiwiQ1NTUmVuZGVyZXJCYXNlLnNoYXJlQ29udGV4dCIsIkNTU1JlbmRlcmVyQmFzZS5kaXNwb3NlIiwiQ1NTUmVuZGVyZXJCYXNlLnJlbmRlciIsIkNTU1JlbmRlcmVyQmFzZS5faVJlbmRlciIsIkNTU1JlbmRlcmVyQmFzZS5faVJlbmRlckNhc2NhZGVzIiwiQ1NTUmVuZGVyZXJCYXNlLnBDb2xsZWN0UmVuZGVyYWJsZXMiLCJDU1NSZW5kZXJlckJhc2UucEV4ZWN1dGVSZW5kZXIiLCJDU1NSZW5kZXJlckJhc2UucERyYXciLCJDU1NSZW5kZXJlckJhc2UuX2lCYWNrZ3JvdW5kQWxwaGEiLCJDU1NSZW5kZXJlckJhc2UuYXBwbHlCaWxsYm9hcmQiLCJDU1NSZW5kZXJlckJhc2UuYXBwbHlMaW5lU3ViTWVzaCIsIkNTU1JlbmRlcmVyQmFzZS5hcHBseVNreWJveCIsIkNTU1JlbmRlcmVyQmFzZS5hcHBseVRyaWFuZ2xlU3ViTWVzaCIsIkNTU1JlbmRlcmVyQmFzZS5fYXBwbHlSZW5kZXJhYmxlIiwiQ1NTUmVuZGVyZXJCYXNlLm5vdGlmeVNjaXNzb3JVcGRhdGUiLCJDU1NSZW5kZXJlckJhc2Uubm90aWZ5Vmlld3BvcnRVcGRhdGUiLCJDU1NSZW5kZXJlckJhc2UudXBkYXRlR2xvYmFsUG9zIiwiQ1NTUmVuZGVyZXJCYXNlLl9pQ3JlYXRlRW50aXR5Q29sbGVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLEtBQUssV0FBZ0IsNEJBQTRCLENBQUMsQ0FBQztBQUMxRCxJQUFPLFNBQVMsV0FBZSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBRWpFLElBQU8sbUJBQW1CLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUNyRixJQUFPLGVBQWUsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBa0I5RSxJQUFPLGFBQWEsV0FBYyx5Q0FBeUMsQ0FBQyxDQUFDO0FBSTdFLEFBTUE7Ozs7O0dBREc7SUFDRyxlQUFlO0lBQVNBLFVBQXhCQSxlQUFlQSxVQUF3QkE7SUF5STVDQTs7T0FFR0E7SUFDSEEsU0E1SUtBLGVBQWVBLENBNElSQSxlQUErQkEsRUFBRUEsYUFBNkJBLEVBQUVBLE9BQTJCQTtRQUEzRkMsK0JBQStCQSxHQUEvQkEsdUJBQStCQTtRQUFFQSw2QkFBNkJBLEdBQTdCQSxxQkFBNkJBO1FBQUVBLHVCQUEyQkEsR0FBM0JBLG9CQUEyQkE7UUFFdEdBLGlCQUFPQSxDQUFDQTtRQXJJREEsaUJBQVlBLEdBQVVBLENBQUNBLENBQUNBO1FBQ3hCQSxpQkFBWUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDeEJBLGlCQUFZQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUN4QkEscUJBQWdCQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUM1QkEsa0JBQWFBLEdBQVdBLEtBQUtBLENBQUNBO1FBRS9CQSx3QkFBbUJBLEdBQVdBLElBQUlBLENBQUNBO1FBQ25DQSx5QkFBb0JBLEdBQVdBLElBQUlBLENBQUNBO1FBT25DQSxjQUFTQSxHQUFhQSxJQUFJQSxTQUFTQSxFQUFFQSxDQUFDQTtRQUV0Q0EsaUJBQVlBLEdBQWFBLElBQUlBLFNBQVNBLEVBQUVBLENBQUNBO1FBR3pDQSxjQUFTQSxHQUFTQSxJQUFJQSxLQUFLQSxFQUFFQSxDQUFDQTtRQUM5QkEsZUFBVUEsR0FBU0EsSUFB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QUFFRCxBQUF5QixpQkFBaEIsZUFBZSxDQUFDIiwiZmlsZSI6InJlbmRlci9DU1NSZW5kZXJlckJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvaW50XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUG9pbnRcIik7XG5pbXBvcnQgUmVjdGFuZ2xlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1JlY3RhbmdsZVwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiKTtcblxuaW1wb3J0IExpbmVTdWJNZXNoXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xpbmVTdWJNZXNoXCIpO1xuaW1wb3J0IFRyaWFuZ2xlU3ViTWVzaFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvVHJpYW5nbGVTdWJNZXNoXCIpO1xuaW1wb3J0IENTU0JpbGxib2FyZFJlbmRlcmFibGVcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvQ1NTQmlsbGJvYXJkUmVuZGVyYWJsZVwiKTtcbmltcG9ydCBDU1NMaW5lU2VnbWVudFJlbmRlcmFibGVcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvQ1NTTGluZVNlZ21lbnRSZW5kZXJhYmxlXCIpO1xuaW1wb3J0IENTU1JlbmRlcmFibGVCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvQ1NTUmVuZGVyYWJsZUJhc2VcIik7XG5pbXBvcnQgRW50aXR5TGlzdEl0ZW1cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0VudGl0eUxpc3RJdGVtXCIpO1xuaW1wb3J0IElSZW5kZXJhYmxlUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmFibGVQb29sXCIpO1xuaW1wb3J0IElSZW5kZXJlclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcmVuZGVyL0lSZW5kZXJlclwiKTtcbmltcG9ydCBJRW50aXR5U29ydGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvc29ydC9JRW50aXR5U29ydGVyXCIpO1xuaW1wb3J0IENTU0VudGl0eUNvbGxlY3Rvclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9DU1NFbnRpdHlDb2xsZWN0b3JcIik7XG5pbXBvcnQgRW50aXR5Q29sbGVjdG9yXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvRW50aXR5Q29sbGVjdG9yXCIpO1xuaW1wb3J0IENvbGxlY3RvckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9Db2xsZWN0b3JCYXNlXCIpO1xuaW1wb3J0IEJpbGxib2FyZFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQmlsbGJvYXJkXCIpO1xuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuaW1wb3J0IFNreWJveFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9Ta3lib3hcIik7XG5pbXBvcnQgUmVuZGVyZXJFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9SZW5kZXJlckV2ZW50XCIpO1xuaW1wb3J0IENTU01hdGVyaWFsQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9DU1NNYXRlcmlhbEJhc2VcIik7XG5pbXBvcnQgVGV4dHVyZVByb3h5QmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL1RleHR1cmVQcm94eUJhc2VcIik7XG5cbi8qKlxuICogUmVuZGVyZXJCYXNlIGZvcm1zIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIGNsYXNzZXMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgcmVuZGVyaW5nIHBpcGVsaW5lIHRvIHJlbmRlciB0aGVcbiAqIGNvbnRlbnRzIG9mIGEgcGFydGl0aW9uXG4gKlxuICogQGNsYXNzIGF3YXkucmVuZGVyLlJlbmRlcmVyQmFzZVxuICovXG5jbGFzcyBDU1NSZW5kZXJlckJhc2UgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcbntcblx0cHJpdmF0ZSBfYmlsbGJvYXJkUmVuZGVyYWJsZVBvb2w6SVJlbmRlcmFibGVQb29sO1xuXHRwcml2YXRlIF9saW5lU2VnbWVudFJlbmRlcmFibGVQb29sOklSZW5kZXJhYmxlUG9vbDtcblxuXHRwdWJsaWMgX3BDYW1lcmE6Q2FtZXJhO1xuXHRwdWJsaWMgX2lFbnRyeVBvaW50OlZlY3RvcjNEO1xuXHRwdWJsaWMgX3BDYW1lcmFGb3J3YXJkOlZlY3RvcjNEO1xuXG5cdHByaXZhdGUgX2JhY2tncm91bmRSOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX2JhY2tncm91bmRHOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX2JhY2tncm91bmRCOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX2JhY2tncm91bmRBbHBoYTpudW1iZXIgPSAxO1xuXHRwcml2YXRlIF9zaGFyZUNvbnRleHQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdHB1YmxpYyBfcEJhY2tCdWZmZXJJbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xuXHRwdWJsaWMgX2RlcHRoVGV4dHVyZUludmFsaWQ6Ym9vbGVhbiA9IHRydWU7XG5cblx0cHVibGljIF9yZW5kZXJhYmxlSGVhZDpDU1NSZW5kZXJhYmxlQmFzZTtcblxuXHRwdWJsaWMgX3dpZHRoOm51bWJlcjtcblx0cHVibGljIF9oZWlnaHQ6bnVtYmVyO1xuXG5cdHByaXZhdGUgX3ZpZXdQb3J0OlJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoKTtcblx0cHJpdmF0ZSBfdmlld3BvcnREaXJ0eTpib29sZWFuO1xuXHRwcml2YXRlIF9zY2lzc29yUmVjdDpSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XG5cdHByaXZhdGUgX3NjaXNzb3JEaXJ0eTpib29sZWFuO1xuXG5cdHByaXZhdGUgX2xvY2FsUG9zOlBvaW50ID0gbmV3IFBvaW50KCk7XG5cdHByaXZhdGUgX2dsb2JhbFBvczpQb2ludCA9IG5ldyBQb2ludCgpO1xuXG5cdHByaXZhdGUgX3NjaXNzb3JVcGRhdGVkOlJlbmRlcmVyRXZlbnQ7XG5cdHByaXZhdGUgX3ZpZXdQb3J0VXBkYXRlZDpSZW5kZXJlckV2ZW50O1xuXG5cdC8qKlxuXHQgKiBBIHZpZXdQb3J0IHJlY3RhbmdsZSBlcXVpdmFsZW50IG9mIHRoZSBTdGFnZUdMIHNpemUgYW5kIHBvc2l0aW9uLlxuXHQgKi9cblx0cHVibGljIGdldCB2aWV3UG9ydCgpOlJlY3RhbmdsZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3ZpZXdQb3J0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgc2Npc3NvciByZWN0YW5nbGUgZXF1aXZhbGVudCBvZiB0aGUgdmlldyBzaXplIGFuZCBwb3NpdGlvbi5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2Npc3NvclJlY3QoKTpSZWN0YW5nbGVcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zY2lzc29yUmVjdDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB4KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9jYWxQb3MueDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgeCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy54ID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy51cGRhdGVHbG9iYWxQb3MoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB5KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9jYWxQb3MueTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgeSh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy55ID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZ2xvYmFsUG9zLnkgPSB0aGlzLl9sb2NhbFBvcy55ID0gdmFsdWU7XG5cblx0XHR0aGlzLnVwZGF0ZUdsb2JhbFBvcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fd2lkdGg7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHdpZHRoKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl93aWR0aCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3dpZHRoID0gdmFsdWU7XG5cdFx0dGhpcy5fc2Npc3NvclJlY3Qud2lkdGggPSB2YWx1ZTtcblx0XHR0aGlzLl92aWV3UG9ydC53aWR0aCA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEJhY2tCdWZmZXJJbnZhbGlkID0gdHJ1ZTtcblx0XHR0aGlzLl9kZXB0aFRleHR1cmVJbnZhbGlkID0gdHJ1ZTtcblxuXHRcdHRoaXMubm90aWZ5Vmlld3BvcnRVcGRhdGUoKTtcblx0XHR0aGlzLm5vdGlmeVNjaXNzb3JVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBoZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9oZWlnaHQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGhlaWdodCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5faGVpZ2h0ID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5faGVpZ2h0ID0gdmFsdWU7XG5cdFx0dGhpcy5fc2Npc3NvclJlY3QuaGVpZ2h0ID0gdmFsdWU7XG5cdFx0dGhpcy5fdmlld1BvcnQuaGVpZ2h0ID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wQmFja0J1ZmZlckludmFsaWQgPSB0cnVlO1xuXHRcdHRoaXMuX2RlcHRoVGV4dHVyZUludmFsaWQgPSB0cnVlO1xuXG5cdFx0dGhpcy5ub3RpZnlWaWV3cG9ydFVwZGF0ZSgpO1xuXHRcdHRoaXMubm90aWZ5U2Npc3NvclVwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgcmVuZGVyYWJsZVNvcnRlcjpJRW50aXR5U29ydGVyO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IFJlbmRlcmVyQmFzZSBvYmplY3QuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihyZW5kZXJUb1RleHR1cmU6Ym9vbGVhbiA9IGZhbHNlLCBmb3JjZVNvZnR3YXJlOmJvb2xlYW4gPSBmYWxzZSwgcHJvZmlsZTpzdHJpbmcgPSBcImJhc2VsaW5lXCIpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0Ly90aGlzLl9iaWxsYm9hcmRSZW5kZXJhYmxlUG9vbCA9IFJlbmRlcmFibGVQb29sLmdldFBvb2woQ1NTQmlsbGJvYXJkUmVuZGVyYWJsZSk7XG5cdFx0Ly90aGlzLl9saW5lU2VnbWVudFJlbmRlcmFibGVQb29sID0gUmVuZGVyYWJsZVBvb2wuZ2V0UG9vbChDU1NMaW5lU2VnbWVudFJlbmRlcmFibGUpO1xuXG5cdFx0dGhpcy5fdmlld1BvcnQgPSBuZXcgUmVjdGFuZ2xlKCk7XG5cblx0XHRpZiAodGhpcy5fd2lkdGggPT0gMClcblx0XHRcdHRoaXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuXHRcdGlmICh0aGlzLl9oZWlnaHQgPT0gMClcblx0XHRcdHRoaXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBiYWNrZ3JvdW5kIGNvbG9yJ3MgcmVkIGNvbXBvbmVudCwgdXNlZCB3aGVuIGNsZWFyaW5nLlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIGdldCBfaUJhY2tncm91bmRSKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYmFja2dyb3VuZFI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IF9pQmFja2dyb3VuZFIodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2JhY2tncm91bmRSID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYmFja2dyb3VuZFIgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BCYWNrQnVmZmVySW52YWxpZCA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGJhY2tncm91bmQgY29sb3IncyBncmVlbiBjb21wb25lbnQsIHVzZWQgd2hlbiBjbGVhcmluZy5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBnZXQgX2lCYWNrZ3JvdW5kRygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JhY2tncm91bmRHO1xuXHR9XG5cblx0cHVibGljIHNldCBfaUJhY2tncm91bmRHKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9iYWNrZ3JvdW5kRyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2JhY2tncm91bmRHID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wQmFja0J1ZmZlckludmFsaWQgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBiYWNrZ3JvdW5kIGNvbG9yJ3MgYmx1ZSBjb21wb25lbnQsIHVzZWQgd2hlbiBjbGVhcmluZy5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBnZXQgX2lCYWNrZ3JvdW5kQigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JhY2tncm91bmRCO1xuXHR9XG5cblx0cHVibGljIHNldCBfaUJhY2tncm91bmRCKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9iYWNrZ3JvdW5kQiA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2JhY2tncm91bmRCID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wQmFja0J1ZmZlckludmFsaWQgPSB0cnVlO1xuXHR9XG5cblx0cHVibGljIGdldCBzaGFyZUNvbnRleHQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2hhcmVDb250ZXh0O1xuXHR9XG5cblx0cHVibGljIHNldCBzaGFyZUNvbnRleHQodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9zaGFyZUNvbnRleHQgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9zaGFyZUNvbnRleHQgPSB2YWx1ZTtcblxuXHRcdHRoaXMudXBkYXRlR2xvYmFsUG9zKCk7XG5cdH1cblxuXHQvKipcblx0ICogRGlzcG9zZXMgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBSZW5kZXJlckJhc2UuXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHQvKlxuXHRcdCBpZiAoX2JhY2tncm91bmRJbWFnZVJlbmRlcmVyKSB7XG5cdFx0IF9iYWNrZ3JvdW5kSW1hZ2VSZW5kZXJlci5kaXNwb3NlKCk7XG5cdFx0IF9iYWNrZ3JvdW5kSW1hZ2VSZW5kZXJlciA9IG51bGw7XG5cdFx0IH1cblx0XHQgKi9cblx0fVxuXG5cdHB1YmxpYyByZW5kZXIoZW50aXR5Q29sbGVjdG9yOkNvbGxlY3RvckJhc2UpXG5cdHtcblx0XHR0aGlzLl92aWV3cG9ydERpcnR5ID0gZmFsc2U7XG5cdFx0dGhpcy5fc2Npc3NvckRpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogUmVuZGVycyB0aGUgcG90ZW50aWFsbHkgdmlzaWJsZSBnZW9tZXRyeSB0byB0aGUgYmFjayBidWZmZXIgb3IgdGV4dHVyZS5cblx0ICogQHBhcmFtIGVudGl0eUNvbGxlY3RvciBUaGUgRW50aXR5Q29sbGVjdG9yIG9iamVjdCBjb250YWluaW5nIHRoZSBwb3RlbnRpYWxseSB2aXNpYmxlIGdlb21ldHJ5LlxuXHQgKiBAcGFyYW0gc2Npc3NvclJlY3Rcblx0ICovXG5cdHB1YmxpYyBfaVJlbmRlcihlbnRpdHlDb2xsZWN0b3I6RW50aXR5Q29sbGVjdG9yLCB0YXJnZXQ6VGV4dHVyZVByb3h5QmFzZSA9IG51bGwsIHNjaXNzb3JSZWN0OlJlY3RhbmdsZSA9IG51bGwsIHN1cmZhY2VTZWxlY3RvcjpudW1iZXIgPSAwKVxuXHR7XG5cdFx0aWYgKCFlbnRpdHlDb2xsZWN0b3IuZW50aXR5SGVhZClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMucEV4ZWN1dGVSZW5kZXIoZW50aXR5Q29sbGVjdG9yLCBzY2lzc29yUmVjdCk7XG5cdH1cblxuXHRwdWJsaWMgX2lSZW5kZXJDYXNjYWRlcyhlbnRpdHlDb2xsZWN0b3I6Q29sbGVjdG9yQmFzZSwgdGFyZ2V0OlRleHR1cmVQcm94eUJhc2UsIG51bUNhc2NhZGVzOm51bWJlciwgc2Npc3NvclJlY3RzOkFycmF5PFJlY3RhbmdsZT4sIGNhbWVyYXM6QXJyYXk8Q2FtZXJhPilcblx0e1xuXG5cdH1cblx0cHVibGljIHBDb2xsZWN0UmVuZGVyYWJsZXMoZW50aXR5Q29sbGVjdG9yOkNvbGxlY3RvckJhc2UpXG5cdHtcblx0XHQvLy8vcmVzZXQgaGVhZCB2YWx1ZXNcblx0XHQvL3RoaXMuX3JlbmRlcmFibGVIZWFkID0gbnVsbDtcblx0XHQvL1xuXHRcdC8vLy9ncmFiIGVudGl0eSBoZWFkXG5cdFx0Ly92YXIgaXRlbTpFbnRpdHlMaXN0SXRlbSA9IGVudGl0eUNvbGxlY3Rvci5lbnRpdHlIZWFkO1xuXHRcdC8vXG5cdFx0Ly8vL3NldCB0ZW1wIHZhbHVlcyBmb3IgZW50cnkgcG9pbnQgYW5kIGNhbWVyYSBmb3J3YXJkIHZlY3RvclxuXHRcdC8vdGhpcy5fcENhbWVyYSA9IGVudGl0eUNvbGxlY3Rvci5jYW1lcmE7XG5cdFx0Ly90aGlzLl9pRW50cnlQb2ludCA9IHRoaXMuX3BDYW1lcmEuc2NlbmVQb3NpdGlvbjtcblx0XHQvL3RoaXMuX3BDYW1lcmFGb3J3YXJkID0gdGhpcy5fcENhbWVyYS50cmFuc2Zvcm0uZm9yd2FyZFZlY3Rvcjtcblx0XHQvL1xuXHRcdC8vLy9pdGVyYXRlIHRocm91Z2ggYWxsIGVudGl0aWVzXG5cdFx0Ly93aGlsZSAoaXRlbSkge1xuXHRcdC8vXHQvL2l0ZW0uZW50aXR5Ll9pQ29sbGVjdFJlbmRlcmFibGVzKHRoaXMpO1xuXHRcdC8vXHRpdGVtID0gaXRlbS5uZXh0O1xuXHRcdC8vfVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbmRlcnMgdGhlIHBvdGVudGlhbGx5IHZpc2libGUgZ2VvbWV0cnkgdG8gdGhlIGJhY2sgYnVmZmVyIG9yIHRleHR1cmUuIE9ubHkgZXhlY3V0ZWQgaWYgZXZlcnl0aGluZyBpcyBzZXQgdXAuXG5cdCAqIEBwYXJhbSBlbnRpdHlDb2xsZWN0b3IgVGhlIEVudGl0eUNvbGxlY3RvciBvYmplY3QgY29udGFpbmluZyB0aGUgcG90ZW50aWFsbHkgdmlzaWJsZSBnZW9tZXRyeS5cblx0ICogQHBhcmFtIHNjaXNzb3JSZWN0XG5cdCAqL1xuXHRwdWJsaWMgcEV4ZWN1dGVSZW5kZXIoZW50aXR5Q29sbGVjdG9yOkNTU0VudGl0eUNvbGxlY3Rvciwgc2Npc3NvclJlY3Q6UmVjdGFuZ2xlID0gbnVsbClcblx0e1xuXHRcdHRoaXMucENvbGxlY3RSZW5kZXJhYmxlcyhlbnRpdHlDb2xsZWN0b3IpO1xuXG5cdFx0dGhpcy5wRHJhdyhlbnRpdHlDb2xsZWN0b3IpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm1zIHRoZSBhY3R1YWwgZHJhd2luZyBvZiBkb20gb2JqZWN0cyB0byB0aGUgdGFyZ2V0LlxuXHQgKlxuXHQgKiBAcGFyYW0gZW50aXR5Q29sbGVjdG9yIFRoZSBFbnRpdHlDb2xsZWN0b3Igb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHBvdGVudGlhbGx5IHZpc2libGUgZG9tIG9iamVjdHMuXG5cdCAqL1xuXHRwdWJsaWMgcERyYXcoZW50aXR5Q29sbGVjdG9yOkNTU0VudGl0eUNvbGxlY3Rvcilcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IF9pQmFja2dyb3VuZEFscGhhKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYmFja2dyb3VuZEFscGhhO1xuXHR9XG5cblx0cHVibGljIHNldCBfaUJhY2tncm91bmRBbHBoYSh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fYmFja2dyb3VuZEFscGhhID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYmFja2dyb3VuZEFscGhhID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wQmFja0J1ZmZlckludmFsaWQgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBiaWxsYm9hcmRcblx0ICovXG5cdHB1YmxpYyBhcHBseUJpbGxib2FyZChiaWxsYm9hcmQ6QmlsbGJvYXJkKVxuXHR7XG5cdFx0Ly90aGlzLl9hcHBseVJlbmRlcmFibGUoPENTU1JlbmRlcmFibGVCYXNlPiB0aGlzLl9iaWxsYm9hcmRSZW5kZXJhYmxlUG9vbC5nZXRJdGVtKGJpbGxib2FyZCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBsaW5lU3ViTWVzaFxuXHQgKi9cblx0cHVibGljIGFwcGx5TGluZVN1Yk1lc2gobGluZVN1Yk1lc2g6TGluZVN1Yk1lc2gpXG5cdHtcblx0XHQvL3RoaXMuX2FwcGx5UmVuZGVyYWJsZSg8Q1NTUmVuZGVyYWJsZUJhc2U+IHRoaXMuX2JpbGxib2FyZFJlbmRlcmFibGVQb29sLmdldEl0ZW0obGluZVNlZ21lbnQpKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gc2t5Ym94XG5cdCAqL1xuXHRwdWJsaWMgYXBwbHlTa3lib3goc2t5Ym94OlNreWJveClcblx0e1xuXG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHRyaWFuZ2xlU3ViTWVzaFxuXHQgKi9cblx0cHVibGljIGFwcGx5VHJpYW5nbGVTdWJNZXNoKHRyaWFuZ2xlU3ViTWVzaDpUcmlhbmdsZVN1Yk1lc2gpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSByZW5kZXJhYmxlXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIF9hcHBseVJlbmRlcmFibGUocmVuZGVyYWJsZTpDU1NSZW5kZXJhYmxlQmFzZSlcblx0e1xuXHRcdHZhciBtYXRlcmlhbDpDU1NNYXRlcmlhbEJhc2U7Ly8gPSA8Q1NTTWF0ZXJpYWxCYXNlPiByZW5kZXJhYmxlLnJlbmRlcmFibGVPd25lci5tYXRlcmlhbDtcblx0XHR2YXIgZW50aXR5OklFbnRpdHkgPSByZW5kZXJhYmxlLnNvdXJjZUVudGl0eTtcblx0XHR2YXIgcG9zaXRpb246VmVjdG9yM0QgPSBlbnRpdHkuc2NlbmVQb3NpdGlvbjtcblxuXHRcdGlmIChtYXRlcmlhbCkge1xuXHRcdFx0Ly9zZXQgaWRzIGZvciBmYXN0ZXIgcmVmZXJlbmNpbmdcblx0XHRcdHJlbmRlcmFibGUubWF0ZXJpYWxJZCA9IG1hdGVyaWFsLl9pTWF0ZXJpYWxJZDtcbi8vXHRcdFx0XHRyZW5kZXJhYmxlLnJlbmRlck9yZGVySWQgPSBtYXRlcmlhbC5faVJlbmRlck9yZGVySWQ7XG5cdFx0XHRyZW5kZXJhYmxlLmNhc2NhZGVkID0gZmFsc2U7XG5cblx0XHRcdC8vIHByb2plY3Qgb250byBjYW1lcmEncyB6LWF4aXNcblx0XHRcdHBvc2l0aW9uID0gdGhpcy5faUVudHJ5UG9pbnQuc3VidHJhY3QocG9zaXRpb24pO1xuXHRcdFx0cmVuZGVyYWJsZS56SW5kZXggPSBlbnRpdHkuek9mZnNldCAtIHBvc2l0aW9uLmRvdFByb2R1Y3QodGhpcy5fcENhbWVyYUZvcndhcmQpO1xuXG5cdFx0XHQvL3N0b3JlIHJlZmVyZW5jZSB0byBzY2VuZSB0cmFuc2Zvcm1cblx0XHRcdHJlbmRlcmFibGUucmVuZGVyU2NlbmVUcmFuc2Zvcm0gPSByZW5kZXJhYmxlLnNvdXJjZUVudGl0eS5nZXRSZW5kZXJTY2VuZVRyYW5zZm9ybSh0aGlzLl9wQ2FtZXJhKTtcblxuXHRcdFx0Ly9zdG9yZSByZWZlcmVuY2UgdG8gbmV4dCBpdGVtIGluIGxpc3Rcblx0XHRcdHJlbmRlcmFibGUubmV4dCA9IHRoaXMuX3JlbmRlcmFibGVIZWFkO1xuXHRcdFx0dGhpcy5fcmVuZGVyYWJsZUhlYWQgPSByZW5kZXJhYmxlO1xuXHRcdH1cblx0fVxuXG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG5vdGlmeVNjaXNzb3JVcGRhdGUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3NjaXNzb3JEaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3NjaXNzb3JEaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAoIXRoaXMuX3NjaXNzb3JVcGRhdGVkKVxuXHRcdFx0dGhpcy5fc2Npc3NvclVwZGF0ZWQgPSBuZXcgUmVuZGVyZXJFdmVudChSZW5kZXJlckV2ZW50LlNDSVNTT1JfVVBEQVRFRCk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fc2Npc3NvclVwZGF0ZWQpO1xuXHR9XG5cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgbm90aWZ5Vmlld3BvcnRVcGRhdGUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3ZpZXdwb3J0RGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl92aWV3cG9ydERpcnR5ID0gdHJ1ZTtcblxuXHRcdGlmICghdGhpcy5fdmlld1BvcnRVcGRhdGVkKVxuXHRcdFx0dGhpcy5fdmlld1BvcnRVcGRhdGVkID0gbmV3IFJlbmRlcmVyRXZlbnQoUmVuZGVyZXJFdmVudC5WSUVXUE9SVF9VUERBVEVEKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl92aWV3UG9ydFVwZGF0ZWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlR2xvYmFsUG9zKClcblx0e1xuXHRcdHRoaXMuX3ZpZXdQb3J0LnggPSB0aGlzLl9nbG9iYWxQb3MueDtcblx0XHR0aGlzLl92aWV3UG9ydC55ID0gdGhpcy5fZ2xvYmFsUG9zLnk7XG5cblx0XHR0aGlzLm5vdGlmeVZpZXdwb3J0VXBkYXRlKCk7XG5cdFx0dGhpcy5ub3RpZnlTY2lzc29yVXBkYXRlKCk7XG5cdH1cblxuXG5cdHB1YmxpYyBfaUNyZWF0ZUVudGl0eUNvbGxlY3RvcigpOkNvbGxlY3RvckJhc2Vcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gQ1NTUmVuZGVyZXJCYXNlOyJdfQ==