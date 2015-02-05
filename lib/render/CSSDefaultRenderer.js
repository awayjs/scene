var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
var CoordinateSystem = require("awayjs-core/lib/projections/CoordinateSystem");
var CSSRendererBase = require("awayjs-display/lib/render/CSSRendererBase");
var CSSEntityCollector = require("awayjs-display/lib/traverse/CSSEntityCollector");
/**
 * The DefaultRenderer class provides the default rendering method. It renders the scene graph objects using the
 * materials assigned to them.
 *
 * @class away.render.DefaultRenderer
 */
var CSSDefaultRenderer = (function (_super) {
    __extends(CSSDefaultRenderer, _super);
    /**
     * Creates a new CSSDefaultRenderer object.
     */
    function CSSDefaultRenderer() {
        _super.call(this);
        this._contextMatrix = new Matrix3D();
        this._skyboxProjection = new Matrix3D();
        this._transform = new Matrix3D();
        //create container for the renderer
        this._container = document.createElement("div");
        this._container.style.overflow = "hidden";
        this._container.style.position = "absolute";
        //add container to body
        document.body.appendChild(this._container);
        //create conxtext for the renderer
        this._context = document.createElement("div");
        this._contextStyle = this._context.style;
        this._contextStyle.position = "absolute";
        this._contextStyle.transformStyle = this._contextStyle["-webkit-transform-style"] = this._contextStyle["-moz-transform-style"] = this._contextStyle["-o-transform-style"] = this._contextStyle["-ms-transform-style"] = "preserve-3d";
        this._contextStyle.transformOrigin = this._contextStyle["-webkit-transform-origin"] = this._contextStyle["-moz-transform-origin"] = this._contextStyle["-o-transform-origin"] = this._contextStyle["-ms-transform-origin"] = "0% 0%";
        //add context to container
        this._container.appendChild(this._context);
    }
    /**
     *
     * @param entityCollector
     */
    CSSDefaultRenderer.prototype.render = function (entityCollector) {
        _super.prototype.render.call(this, entityCollector);
        if (this._pBackBufferInvalid)
            this.pUpdateBackBuffer();
        this._iRender(entityCollector);
        this._pBackBufferInvalid = false;
    };
    /**
     * @inheritDoc
     */
    CSSDefaultRenderer.prototype.pDraw = function (entityCollector) {
        //			if (entityCollector.skyBox) {
        //				if (this._activeMaterial)
        //					this._activeMaterial.iDeactivate(this._pStageGL);
        //
        //				this._activeMaterial = null;
        //
        //				this._pContext.setDepthTest(false, away.gl.ContextGLCompareMode.ALWAYS);
        //				this.drawSkybox(entityCollector);
        //
        //			}
        //
        //			var which:number = target? DefaultRenderer.SCREEN_PASSES : DefaultRenderer.ALL_PASSES;
        var sheet = document.styleSheets[document.styleSheets.length - 1];
        for (var i = 0; i < sheet.cssRules.length; i++) {
            var style = sheet.cssRules[i].style;
            style.transform = style["-webkit-transform"] = style["-moz-transform"] = style["-o-transform"] = style["-ms-transform"] = (entityCollector.camera.projection.coordinateSystem == CoordinateSystem.RIGHT_HANDED) ? "" : "scale3d(1, -1, 1) translateY(-" + style.height + ")";
        }
        this.drawRenderables(this._renderableHead, entityCollector);
        //			if (this._activeMaterial)
        //				this._activeMaterial.iDeactivate(this._pStageGL);
        this._activeMaterial = null;
    };
    /**
     * Updates the backbuffer properties.
     */
    CSSDefaultRenderer.prototype.pUpdateBackBuffer = function () {
        this._container.style.width = this._width + "px";
        this._container.style.height = this._height + "px";
        this._container.style.clip = "rect(0px, " + this._width + "px, " + this._height + "px, 0px)";
        //update context matrix
        this._contextMatrix.rawData[0] = this._width / 2;
        this._contextMatrix.rawData[5] = -this._height / 2;
        this._contextMatrix.rawData[10] = -1; //fix for innaccurate z-sort
        this._contextMatrix.rawData[12] = this._width / 2;
        this._contextMatrix.rawData[13] = this._height / 2;
        //update context tranform
        this._contextStyle.transform = this._contextStyle["-webkit-transform"] = this._contextStyle["-moz-transform"] = this._contextStyle["-o-transform"] = this._contextStyle["-ms-transform"] = this._contextMatrix.toString();
        this._pBackBufferInvalid = false;
    };
    /**
     * Draw the skybox if present.
     * @param entityCollector The EntityCollector containing all potentially visible information.
     */
    CSSDefaultRenderer.prototype.drawSkybox = function (entityCollector) {
        //TODO
    };
    /**
     * Draw a list of renderables.
     * @param renderables The renderables to draw.
     * @param entityCollector The EntityCollector containing all potentially visible information.
     */
    CSSDefaultRenderer.prototype.drawRenderables = function (item, entityCollector) {
        var viewProjection = entityCollector.camera.viewProjection.clone();
        while (item) {
            //this._activeMaterial = <CSSMaterialBase> item.materialOwner.material;
            //serialise transform and apply to html element
            this._transform.copyRawDataFrom(item.renderSceneTransform.rawData);
            this._transform.append(viewProjection);
            var style = item.htmlElement.style;
            style.transform = style["-webkit-transform"] = style["-moz-transform"] = style["-o-transform"] = style["-ms-transform"] = this._transform.toString();
            style.transformStyle = style["-webkit-transform-style"] = style["-moz-transform-style"] = style["-o-transform-style"] = style["-ms-transform-style"] = "preserve-3d";
            //check if child requires adding to the view
            if (!this._context.contains(item.htmlElement))
                this._context.appendChild(item.htmlElement);
            item = item.next;
        }
        //			var numPasses:number;
        //			var j:number;
        //			var camera:away.entities.Camera = entityCollector.camera;
        //			var item2:away.render.CSSRenderableBase;
        //
        //			while (item) {
        //				this._activeMaterial = item.material;
        //
        //				this._activeMaterial.iUpdateMaterial(this._pContext);
        //
        //				numPasses = this._activeMaterial._iNumPasses;
        //
        //				j = 0;
        //
        //				do {
        //					item2 = item;
        //
        //					var rttMask:number = this._activeMaterial.iPassRendersToTexture(j)? 1 : 2;
        //
        //					if ((rttMask & which) != 0) {
        //						this._activeMaterial.iActivatePass(j, this._pStageGL, camera);
        //
        //						do {
        //							this._activeMaterial.iRenderPass(j, item2, this._pStageGL, entityCollector);
        //
        //							item2 = item2.next;
        //
        //						} while (item2 && item2.material == this._activeMaterial);
        //
        //						this._activeMaterial.iDeactivatePass(j, this._pStageGL);
        //
        //					} else {
        //						do {
        //							item2 = item2.next;
        //
        //						} while (item2 && item2.renderable.material == this._activeMaterial);
        //					}
        //				} while (++j < numPasses);
        //
        //				item = item2;
        //			}
    };
    CSSDefaultRenderer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        //TODO
    };
    CSSDefaultRenderer.prototype._iCreateEntityCollector = function () {
        return new CSSEntityCollector();
    };
    return CSSDefaultRenderer;
})(CSSRendererBase);
module.exports = CSSDefaultRenderer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvY3NzZGVmYXVsdHJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbIkNTU0RlZmF1bHRSZW5kZXJlciIsIkNTU0RlZmF1bHRSZW5kZXJlci5jb25zdHJ1Y3RvciIsIkNTU0RlZmF1bHRSZW5kZXJlci5yZW5kZXIiLCJDU1NEZWZhdWx0UmVuZGVyZXIucERyYXciLCJDU1NEZWZhdWx0UmVuZGVyZXIucFVwZGF0ZUJhY2tCdWZmZXIiLCJDU1NEZWZhdWx0UmVuZGVyZXIuZHJhd1NreWJveCIsIkNTU0RlZmF1bHRSZW5kZXJlci5kcmF3UmVuZGVyYWJsZXMiLCJDU1NEZWZhdWx0UmVuZGVyZXIuZGlzcG9zZSIsIkNTU0RlZmF1bHRSZW5kZXJlci5faUNyZWF0ZUVudGl0eUNvbGxlY3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxRQUFRLFdBQWdCLCtCQUErQixDQUFDLENBQUM7QUFDaEUsSUFBTyxnQkFBZ0IsV0FBYyw4Q0FBOEMsQ0FBQyxDQUFDO0FBR3JGLElBQU8sZUFBZSxXQUFjLDJDQUEyQyxDQUFDLENBQUM7QUFFakYsSUFBTyxrQkFBa0IsV0FBYSxnREFBZ0QsQ0FBQyxDQUFDO0FBTXhGLEFBTUE7Ozs7O0dBREc7SUFDRyxrQkFBa0I7SUFBU0EsVUFBM0JBLGtCQUFrQkEsVUFBd0JBO0lBVy9DQTs7T0FFR0E7SUFDSEEsU0FkS0Esa0JBQWtCQTtRQWdCdEJDLGlCQUFPQSxDQUFDQTtRQVhEQSxtQkFBY0EsR0FBWUEsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFHekNBLHNCQUFpQkEsR0FBWUEsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFDNUNBLGVBQVVBLEdBQVlBLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBO1FBUzVDQSxBQUNBQSxtQ0FEbUNBO1FBQ25DQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNoREEsSUFB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QUFFRCxBQUE0QixpQkFBbkIsa0JBQWtCLENBQUMiLCJmaWxlIjoicmVuZGVyL0NTU0RlZmF1bHRSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBDb29yZGluYXRlU3lzdGVtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcHJvamVjdGlvbnMvQ29vcmRpbmF0ZVN5c3RlbVwiKTtcblxuaW1wb3J0IENTU1JlbmRlcmFibGVCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvQ1NTUmVuZGVyYWJsZUJhc2VcIik7XG5pbXBvcnQgQ1NTUmVuZGVyZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcmVuZGVyL0NTU1JlbmRlcmVyQmFzZVwiKTtcbmltcG9ydCBJUmVuZGVyZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3JlbmRlci9JUmVuZGVyZXJcIik7XG5pbXBvcnQgQ1NTRW50aXR5Q29sbGVjdG9yXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0NTU0VudGl0eUNvbGxlY3RvclwiKTtcbmltcG9ydCBFbnRpdHlDb2xsZWN0b3JcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9FbnRpdHlDb2xsZWN0b3JcIik7XG5pbXBvcnQgSUNvbGxlY3Rvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvSUNvbGxlY3RvclwiKTtcbmltcG9ydCBDU1NNYXRlcmlhbEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvQ1NTTWF0ZXJpYWxCYXNlXCIpO1xuXG5cbi8qKlxuICogVGhlIERlZmF1bHRSZW5kZXJlciBjbGFzcyBwcm92aWRlcyB0aGUgZGVmYXVsdCByZW5kZXJpbmcgbWV0aG9kLiBJdCByZW5kZXJzIHRoZSBzY2VuZSBncmFwaCBvYmplY3RzIHVzaW5nIHRoZVxuICogbWF0ZXJpYWxzIGFzc2lnbmVkIHRvIHRoZW0uXG4gKlxuICogQGNsYXNzIGF3YXkucmVuZGVyLkRlZmF1bHRSZW5kZXJlclxuICovXG5jbGFzcyBDU1NEZWZhdWx0UmVuZGVyZXIgZXh0ZW5kcyBDU1NSZW5kZXJlckJhc2UgaW1wbGVtZW50cyBJUmVuZGVyZXJcbntcblx0cHJpdmF0ZSBfY29udGFpbmVyOkhUTUxEaXZFbGVtZW50O1xuXHRwcml2YXRlIF9jb250ZXh0OkhUTUxEaXZFbGVtZW50O1xuXHRwcml2YXRlIF9jb250ZXh0U3R5bGU6TVNTdHlsZUNTU1Byb3BlcnRpZXM7XG5cdHByaXZhdGUgX2NvbnRleHRNYXRyaXg6TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0XG5cdHByaXZhdGUgX2FjdGl2ZU1hdGVyaWFsOkNTU01hdGVyaWFsQmFzZTtcblx0cHJpdmF0ZSBfc2t5Ym94UHJvamVjdGlvbjpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXHRwcml2YXRlIF90cmFuc2Zvcm06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBDU1NEZWZhdWx0UmVuZGVyZXIgb2JqZWN0LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdC8vY3JlYXRlIGNvbnRhaW5lciBmb3IgdGhlIHJlbmRlcmVyXG5cdFx0dGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0aGlzLl9jb250YWluZXIuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXHRcdHRoaXMuX2NvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblx0XHRcblx0XHQvL2FkZCBjb250YWluZXIgdG8gYm9keVxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fY29udGFpbmVyKTtcblxuXHRcdC8vY3JlYXRlIGNvbnh0ZXh0IGZvciB0aGUgcmVuZGVyZXJcblx0XHR0aGlzLl9jb250ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0aGlzLl9jb250ZXh0U3R5bGUgPSB0aGlzLl9jb250ZXh0LnN0eWxlO1xuXHRcdHRoaXMuX2NvbnRleHRTdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblx0XHR0aGlzLl9jb250ZXh0U3R5bGUudHJhbnNmb3JtU3R5bGVcblx0XHRcdD0gdGhpcy5fY29udGV4dFN0eWxlW1wiLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGVcIl1cblx0XHRcdD0gdGhpcy5fY29udGV4dFN0eWxlW1wiLW1vei10cmFuc2Zvcm0tc3R5bGVcIl1cblx0XHRcdD0gdGhpcy5fY29udGV4dFN0eWxlW1wiLW8tdHJhbnNmb3JtLXN0eWxlXCJdXG5cdFx0XHQ9IHRoaXMuX2NvbnRleHRTdHlsZVtcIi1tcy10cmFuc2Zvcm0tc3R5bGVcIl0gPSBcInByZXNlcnZlLTNkXCI7XG5cdFx0dGhpcy5fY29udGV4dFN0eWxlLnRyYW5zZm9ybU9yaWdpblxuXHRcdFx0PSB0aGlzLl9jb250ZXh0U3R5bGVbXCItd2Via2l0LXRyYW5zZm9ybS1vcmlnaW5cIl1cblx0XHRcdD0gdGhpcy5fY29udGV4dFN0eWxlW1wiLW1vei10cmFuc2Zvcm0tb3JpZ2luXCJdXG5cdFx0XHQ9IHRoaXMuX2NvbnRleHRTdHlsZVtcIi1vLXRyYW5zZm9ybS1vcmlnaW5cIl1cblx0XHRcdD0gdGhpcy5fY29udGV4dFN0eWxlW1wiLW1zLXRyYW5zZm9ybS1vcmlnaW5cIl0gPSBcIjAlIDAlXCI7XG5cblx0XHQvL2FkZCBjb250ZXh0IHRvIGNvbnRhaW5lclxuXHRcdHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl9jb250ZXh0KTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gZW50aXR5Q29sbGVjdG9yXG5cdCAqL1xuXHRwdWJsaWMgcmVuZGVyKGVudGl0eUNvbGxlY3RvcjpJQ29sbGVjdG9yKVxuXHR7XG5cdFx0c3VwZXIucmVuZGVyKGVudGl0eUNvbGxlY3Rvcik7XG5cblx0XHRpZiAodGhpcy5fcEJhY2tCdWZmZXJJbnZhbGlkKS8vIHJlc2V0IG9yIHVwZGF0ZSByZW5kZXIgc2V0dGluZ3Ncblx0XHRcdHRoaXMucFVwZGF0ZUJhY2tCdWZmZXIoKTtcblxuXHRcdHRoaXMuX2lSZW5kZXIoPEVudGl0eUNvbGxlY3Rvcj4gZW50aXR5Q29sbGVjdG9yKTtcblxuXHRcdHRoaXMuX3BCYWNrQnVmZmVySW52YWxpZCA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgcERyYXcoZW50aXR5Q29sbGVjdG9yOkVudGl0eUNvbGxlY3Rvcilcblx0e1xuLy9cdFx0XHRpZiAoZW50aXR5Q29sbGVjdG9yLnNreUJveCkge1xuLy9cdFx0XHRcdGlmICh0aGlzLl9hY3RpdmVNYXRlcmlhbClcbi8vXHRcdFx0XHRcdHRoaXMuX2FjdGl2ZU1hdGVyaWFsLmlEZWFjdGl2YXRlKHRoaXMuX3BTdGFnZUdMKTtcbi8vXG4vL1x0XHRcdFx0dGhpcy5fYWN0aXZlTWF0ZXJpYWwgPSBudWxsO1xuLy9cbi8vXHRcdFx0XHR0aGlzLl9wQ29udGV4dC5zZXREZXB0aFRlc3QoZmFsc2UsIGF3YXkuZ2wuQ29udGV4dEdMQ29tcGFyZU1vZGUuQUxXQVlTKTtcbi8vXHRcdFx0XHR0aGlzLmRyYXdTa3lib3goZW50aXR5Q29sbGVjdG9yKTtcbi8vXG4vL1x0XHRcdH1cbi8vXG4vL1x0XHRcdHZhciB3aGljaDpudW1iZXIgPSB0YXJnZXQ/IERlZmF1bHRSZW5kZXJlci5TQ1JFRU5fUEFTU0VTIDogRGVmYXVsdFJlbmRlcmVyLkFMTF9QQVNTRVM7XG5cblx0XHR2YXIgc2hlZXQ6Q1NTU3R5bGVTaGVldCA9IDxDU1NTdHlsZVNoZWV0PiBkb2N1bWVudC5zdHlsZVNoZWV0c1tkb2N1bWVudC5zdHlsZVNoZWV0cy5sZW5ndGggLSAxXTtcblxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IHNoZWV0LmNzc1J1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgc3R5bGU6TVNTdHlsZUNTU1Byb3BlcnRpZXMgPSAoPENTU1N0eWxlUnVsZT4gc2hlZXQuY3NzUnVsZXNbaV0pLnN0eWxlO1xuXHRcdFx0c3R5bGUudHJhbnNmb3JtXG5cdFx0XHRcdD0gc3R5bGVbXCItd2Via2l0LXRyYW5zZm9ybVwiXVxuXHRcdFx0XHQ9IHN0eWxlW1wiLW1vei10cmFuc2Zvcm1cIl1cblx0XHRcdFx0PSBzdHlsZVtcIi1vLXRyYW5zZm9ybVwiXVxuXHRcdFx0XHQ9IHN0eWxlW1wiLW1zLXRyYW5zZm9ybVwiXSA9IChlbnRpdHlDb2xsZWN0b3IuY2FtZXJhLnByb2plY3Rpb24uY29vcmRpbmF0ZVN5c3RlbSA9PSBDb29yZGluYXRlU3lzdGVtLlJJR0hUX0hBTkRFRCk/IFwiXCIgOiBcInNjYWxlM2QoMSwgLTEsIDEpIHRyYW5zbGF0ZVkoLVwiICsgc3R5bGUuaGVpZ2h0ICsgXCIpXCI7XG5cdFx0fVxuXG5cdFx0dGhpcy5kcmF3UmVuZGVyYWJsZXModGhpcy5fcmVuZGVyYWJsZUhlYWQsIGVudGl0eUNvbGxlY3Rvcik7XG5cbi8vXHRcdFx0aWYgKHRoaXMuX2FjdGl2ZU1hdGVyaWFsKVxuLy9cdFx0XHRcdHRoaXMuX2FjdGl2ZU1hdGVyaWFsLmlEZWFjdGl2YXRlKHRoaXMuX3BTdGFnZUdMKTtcblxuXHRcdHRoaXMuX2FjdGl2ZU1hdGVyaWFsID0gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSBiYWNrYnVmZmVyIHByb3BlcnRpZXMuXG5cdCAqL1xuXHRwdWJsaWMgcFVwZGF0ZUJhY2tCdWZmZXIoKVxuXHR7XG5cdFx0dGhpcy5fY29udGFpbmVyLnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKyBcInB4XCI7XG5cdFx0dGhpcy5fY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHRoaXMuX2hlaWdodCArIFwicHhcIjtcblx0XHR0aGlzLl9jb250YWluZXIuc3R5bGUuY2xpcCA9IFwicmVjdCgwcHgsIFwiICsgdGhpcy5fd2lkdGggKyBcInB4LCBcIiArIHRoaXMuX2hlaWdodCArIFwicHgsIDBweClcIjtcblxuXHRcdC8vdXBkYXRlIGNvbnRleHQgbWF0cml4XG5cdFx0dGhpcy5fY29udGV4dE1hdHJpeC5yYXdEYXRhWzBdID0gdGhpcy5fd2lkdGgvMjtcblx0XHR0aGlzLl9jb250ZXh0TWF0cml4LnJhd0RhdGFbNV0gPSAtdGhpcy5faGVpZ2h0LzI7XG5cdFx0dGhpcy5fY29udGV4dE1hdHJpeC5yYXdEYXRhWzEwXSA9IC0xOyAvL2ZpeCBmb3IgaW5uYWNjdXJhdGUgei1zb3J0XG5cdFx0dGhpcy5fY29udGV4dE1hdHJpeC5yYXdEYXRhWzEyXSA9IHRoaXMuX3dpZHRoLzI7XG5cdFx0dGhpcy5fY29udGV4dE1hdHJpeC5yYXdEYXRhWzEzXSA9IHRoaXMuX2hlaWdodC8yO1xuXG5cdFx0Ly91cGRhdGUgY29udGV4dCB0cmFuZm9ybVxuXHRcdHRoaXMuX2NvbnRleHRTdHlsZS50cmFuc2Zvcm1cblx0XHRcdD0gdGhpcy5fY29udGV4dFN0eWxlW1wiLXdlYmtpdC10cmFuc2Zvcm1cIl1cblx0XHRcdD0gdGhpcy5fY29udGV4dFN0eWxlW1wiLW1vei10cmFuc2Zvcm1cIl1cblx0XHRcdD0gdGhpcy5fY29udGV4dFN0eWxlW1wiLW8tdHJhbnNmb3JtXCJdXG5cdFx0XHQ9IHRoaXMuX2NvbnRleHRTdHlsZVtcIi1tcy10cmFuc2Zvcm1cIl0gPSB0aGlzLl9jb250ZXh0TWF0cml4LnRvU3RyaW5nKCk7XG5cblx0XHR0aGlzLl9wQmFja0J1ZmZlckludmFsaWQgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEcmF3IHRoZSBza3lib3ggaWYgcHJlc2VudC5cblx0ICogQHBhcmFtIGVudGl0eUNvbGxlY3RvciBUaGUgRW50aXR5Q29sbGVjdG9yIGNvbnRhaW5pbmcgYWxsIHBvdGVudGlhbGx5IHZpc2libGUgaW5mb3JtYXRpb24uXG5cdCAqL1xuXHRwcml2YXRlIGRyYXdTa3lib3goZW50aXR5Q29sbGVjdG9yOkNTU0VudGl0eUNvbGxlY3Rvcilcblx0e1xuXHRcdC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIERyYXcgYSBsaXN0IG9mIHJlbmRlcmFibGVzLlxuXHQgKiBAcGFyYW0gcmVuZGVyYWJsZXMgVGhlIHJlbmRlcmFibGVzIHRvIGRyYXcuXG5cdCAqIEBwYXJhbSBlbnRpdHlDb2xsZWN0b3IgVGhlIEVudGl0eUNvbGxlY3RvciBjb250YWluaW5nIGFsbCBwb3RlbnRpYWxseSB2aXNpYmxlIGluZm9ybWF0aW9uLlxuXHQgKi9cblx0cHJpdmF0ZSBkcmF3UmVuZGVyYWJsZXMoaXRlbTpDU1NSZW5kZXJhYmxlQmFzZSwgZW50aXR5Q29sbGVjdG9yOkVudGl0eUNvbGxlY3Rvcilcblx0e1xuXHRcdHZhciB2aWV3UHJvamVjdGlvbjpNYXRyaXgzRCA9IGVudGl0eUNvbGxlY3Rvci5jYW1lcmEudmlld1Byb2plY3Rpb24uY2xvbmUoKTtcblxuXHRcdHdoaWxlIChpdGVtKSB7XG5cdFx0XHQvL3RoaXMuX2FjdGl2ZU1hdGVyaWFsID0gPENTU01hdGVyaWFsQmFzZT4gaXRlbS5tYXRlcmlhbE93bmVyLm1hdGVyaWFsO1xuXG5cdFx0XHQvL3NlcmlhbGlzZSB0cmFuc2Zvcm0gYW5kIGFwcGx5IHRvIGh0bWwgZWxlbWVudFxuXHRcdFx0dGhpcy5fdHJhbnNmb3JtLmNvcHlSYXdEYXRhRnJvbShpdGVtLnJlbmRlclNjZW5lVHJhbnNmb3JtLnJhd0RhdGEpO1xuXHRcdFx0dGhpcy5fdHJhbnNmb3JtLmFwcGVuZCh2aWV3UHJvamVjdGlvbik7XG5cblx0XHRcdHZhciBzdHlsZTpNU1N0eWxlQ1NTUHJvcGVydGllcyA9IGl0ZW0uaHRtbEVsZW1lbnQuc3R5bGU7XG5cblx0XHRcdHN0eWxlLnRyYW5zZm9ybVxuXHRcdFx0XHQ9IHN0eWxlW1wiLXdlYmtpdC10cmFuc2Zvcm1cIl1cblx0XHRcdFx0PSBzdHlsZVtcIi1tb3otdHJhbnNmb3JtXCJdXG5cdFx0XHRcdD0gc3R5bGVbXCItby10cmFuc2Zvcm1cIl1cblx0XHRcdFx0PSBzdHlsZVtcIi1tcy10cmFuc2Zvcm1cIl0gPSB0aGlzLl90cmFuc2Zvcm0udG9TdHJpbmcoKTtcblxuXHRcdFx0c3R5bGUudHJhbnNmb3JtU3R5bGVcblx0XHRcdFx0PSBzdHlsZVtcIi13ZWJraXQtdHJhbnNmb3JtLXN0eWxlXCJdXG5cdFx0XHRcdD0gc3R5bGVbXCItbW96LXRyYW5zZm9ybS1zdHlsZVwiXVxuXHRcdFx0XHQ9IHN0eWxlW1wiLW8tdHJhbnNmb3JtLXN0eWxlXCJdXG5cdFx0XHRcdD0gc3R5bGVbXCItbXMtdHJhbnNmb3JtLXN0eWxlXCJdID0gXCJwcmVzZXJ2ZS0zZFwiO1xuXG5cdFx0XHQvL2NoZWNrIGlmIGNoaWxkIHJlcXVpcmVzIGFkZGluZyB0byB0aGUgdmlld1xuXHRcdFx0aWYgKCF0aGlzLl9jb250ZXh0LmNvbnRhaW5zKGl0ZW0uaHRtbEVsZW1lbnQpKVxuXHRcdFx0XHR0aGlzLl9jb250ZXh0LmFwcGVuZENoaWxkKGl0ZW0uaHRtbEVsZW1lbnQpO1xuXG5cdFx0XHRpdGVtID0gaXRlbS5uZXh0O1xuXHRcdH1cblxuLy9cdFx0XHR2YXIgbnVtUGFzc2VzOm51bWJlcjtcbi8vXHRcdFx0dmFyIGo6bnVtYmVyO1xuLy9cdFx0XHR2YXIgY2FtZXJhOmF3YXkuZW50aXRpZXMuQ2FtZXJhID0gZW50aXR5Q29sbGVjdG9yLmNhbWVyYTtcbi8vXHRcdFx0dmFyIGl0ZW0yOmF3YXkucmVuZGVyLkNTU1JlbmRlcmFibGVCYXNlO1xuLy9cbi8vXHRcdFx0d2hpbGUgKGl0ZW0pIHtcbi8vXHRcdFx0XHR0aGlzLl9hY3RpdmVNYXRlcmlhbCA9IGl0ZW0ubWF0ZXJpYWw7XG4vL1xuLy9cdFx0XHRcdHRoaXMuX2FjdGl2ZU1hdGVyaWFsLmlVcGRhdGVNYXRlcmlhbCh0aGlzLl9wQ29udGV4dCk7XG4vL1xuLy9cdFx0XHRcdG51bVBhc3NlcyA9IHRoaXMuX2FjdGl2ZU1hdGVyaWFsLl9pTnVtUGFzc2VzO1xuLy9cbi8vXHRcdFx0XHRqID0gMDtcbi8vXG4vL1x0XHRcdFx0ZG8ge1xuLy9cdFx0XHRcdFx0aXRlbTIgPSBpdGVtO1xuLy9cbi8vXHRcdFx0XHRcdHZhciBydHRNYXNrOm51bWJlciA9IHRoaXMuX2FjdGl2ZU1hdGVyaWFsLmlQYXNzUmVuZGVyc1RvVGV4dHVyZShqKT8gMSA6IDI7XG4vL1xuLy9cdFx0XHRcdFx0aWYgKChydHRNYXNrICYgd2hpY2gpICE9IDApIHtcbi8vXHRcdFx0XHRcdFx0dGhpcy5fYWN0aXZlTWF0ZXJpYWwuaUFjdGl2YXRlUGFzcyhqLCB0aGlzLl9wU3RhZ2VHTCwgY2FtZXJhKTtcbi8vXG4vL1x0XHRcdFx0XHRcdGRvIHtcbi8vXHRcdFx0XHRcdFx0XHR0aGlzLl9hY3RpdmVNYXRlcmlhbC5pUmVuZGVyUGFzcyhqLCBpdGVtMiwgdGhpcy5fcFN0YWdlR0wsIGVudGl0eUNvbGxlY3Rvcik7XG4vL1xuLy9cdFx0XHRcdFx0XHRcdGl0ZW0yID0gaXRlbTIubmV4dDtcbi8vXG4vL1x0XHRcdFx0XHRcdH0gd2hpbGUgKGl0ZW0yICYmIGl0ZW0yLm1hdGVyaWFsID09IHRoaXMuX2FjdGl2ZU1hdGVyaWFsKTtcbi8vXG4vL1x0XHRcdFx0XHRcdHRoaXMuX2FjdGl2ZU1hdGVyaWFsLmlEZWFjdGl2YXRlUGFzcyhqLCB0aGlzLl9wU3RhZ2VHTCk7XG4vL1xuLy9cdFx0XHRcdFx0fSBlbHNlIHtcbi8vXHRcdFx0XHRcdFx0ZG8ge1xuLy9cdFx0XHRcdFx0XHRcdGl0ZW0yID0gaXRlbTIubmV4dDtcbi8vXG4vL1x0XHRcdFx0XHRcdH0gd2hpbGUgKGl0ZW0yICYmIGl0ZW0yLnJlbmRlcmFibGUubWF0ZXJpYWwgPT0gdGhpcy5fYWN0aXZlTWF0ZXJpYWwpO1xuLy9cdFx0XHRcdFx0fVxuLy9cdFx0XHRcdH0gd2hpbGUgKCsraiA8IG51bVBhc3Nlcyk7XG4vL1xuLy9cdFx0XHRcdGl0ZW0gPSBpdGVtMjtcbi8vXHRcdFx0fVxuXHR9XG5cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xuXG5cdFx0Ly9UT0RPXG5cdH1cblxuXG5cdHB1YmxpYyBfaUNyZWF0ZUVudGl0eUNvbGxlY3RvcigpOklDb2xsZWN0b3Jcblx0e1xuXHRcdHJldHVybiBuZXcgQ1NTRW50aXR5Q29sbGVjdG9yKCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gQ1NTRGVmYXVsdFJlbmRlcmVyOyJdfQ==