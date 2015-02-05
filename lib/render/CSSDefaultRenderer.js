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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvQ1NTRGVmYXVsdFJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbIkNTU0RlZmF1bHRSZW5kZXJlciIsIkNTU0RlZmF1bHRSZW5kZXJlci5jb25zdHJ1Y3RvciIsIkNTU0RlZmF1bHRSZW5kZXJlci5yZW5kZXIiLCJDU1NEZWZhdWx0UmVuZGVyZXIucERyYXciLCJDU1NEZWZhdWx0UmVuZGVyZXIucFVwZGF0ZUJhY2tCdWZmZXIiLCJDU1NEZWZhdWx0UmVuZGVyZXIuZHJhd1NreWJveCIsIkNTU0RlZmF1bHRSZW5kZXJlci5kcmF3UmVuZGVyYWJsZXMiLCJDU1NEZWZhdWx0UmVuZGVyZXIuZGlzcG9zZSIsIkNTU0RlZmF1bHRSZW5kZXJlci5faUNyZWF0ZUVudGl0eUNvbGxlY3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxRQUFRLFdBQWdCLCtCQUErQixDQUFDLENBQUM7QUFDaEUsSUFBTyxnQkFBZ0IsV0FBYyw4Q0FBOEMsQ0FBQyxDQUFDO0FBR3JGLElBQU8sZUFBZSxXQUFjLDJDQUEyQyxDQUFDLENBQUM7QUFFakYsSUFBTyxrQkFBa0IsV0FBYSxnREFBZ0QsQ0FBQyxDQUFDO0FBTXhGLEFBTUE7Ozs7O0dBREc7SUFDRyxrQkFBa0I7SUFBU0EsVUFBM0JBLGtCQUFrQkEsVUFBd0JBO0lBVy9DQTs7T0FFR0E7SUFDSEEsU0FkS0Esa0JBQWtCQTtRQWdCdEJDLGlCQUFPQSxDQUFDQTtRQVhEQSxtQkFBY0EsR0FBWUEsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFHekNBLHNCQUFpQkEsR0FBWUEsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFDNUNBLGVBQVVBLEdBQVlBLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBO1FBUzVDQSxBQUNBQSxtQ0FEbUNBO1FBQ25DQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNoREEsSUFB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QUFFRCxBQUE0QixpQkFBbkIsa0JBQWtCLENBQUMiLCJmaWxlIjoicmVuZGVyL0NTU0RlZmF1bHRSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcclxuaW1wb3J0IENvb3JkaW5hdGVTeXN0ZW1cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wcm9qZWN0aW9ucy9Db29yZGluYXRlU3lzdGVtXCIpO1xyXG5cclxuaW1wb3J0IENTU1JlbmRlcmFibGVCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvQ1NTUmVuZGVyYWJsZUJhc2VcIik7XHJcbmltcG9ydCBDU1NSZW5kZXJlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvQ1NTUmVuZGVyZXJCYXNlXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvSVJlbmRlcmVyXCIpO1xyXG5pbXBvcnQgQ1NTRW50aXR5Q29sbGVjdG9yXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0NTU0VudGl0eUNvbGxlY3RvclwiKTtcclxuaW1wb3J0IEVudGl0eUNvbGxlY3Rvclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0VudGl0eUNvbGxlY3RvclwiKTtcclxuaW1wb3J0IElDb2xsZWN0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XHJcbmltcG9ydCBDU1NNYXRlcmlhbEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvQ1NTTWF0ZXJpYWxCYXNlXCIpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgRGVmYXVsdFJlbmRlcmVyIGNsYXNzIHByb3ZpZGVzIHRoZSBkZWZhdWx0IHJlbmRlcmluZyBtZXRob2QuIEl0IHJlbmRlcnMgdGhlIHNjZW5lIGdyYXBoIG9iamVjdHMgdXNpbmcgdGhlXHJcbiAqIG1hdGVyaWFscyBhc3NpZ25lZCB0byB0aGVtLlxyXG4gKlxyXG4gKiBAY2xhc3MgYXdheS5yZW5kZXIuRGVmYXVsdFJlbmRlcmVyXHJcbiAqL1xyXG5jbGFzcyBDU1NEZWZhdWx0UmVuZGVyZXIgZXh0ZW5kcyBDU1NSZW5kZXJlckJhc2UgaW1wbGVtZW50cyBJUmVuZGVyZXJcclxue1xyXG5cdHByaXZhdGUgX2NvbnRhaW5lcjpIVE1MRGl2RWxlbWVudDtcclxuXHRwcml2YXRlIF9jb250ZXh0OkhUTUxEaXZFbGVtZW50O1xyXG5cdHByaXZhdGUgX2NvbnRleHRTdHlsZTpNU1N0eWxlQ1NTUHJvcGVydGllcztcclxuXHRwcml2YXRlIF9jb250ZXh0TWF0cml4Ok1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XHJcblx0XHJcblx0cHJpdmF0ZSBfYWN0aXZlTWF0ZXJpYWw6Q1NTTWF0ZXJpYWxCYXNlO1xyXG5cdHByaXZhdGUgX3NreWJveFByb2plY3Rpb246TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcclxuXHRwcml2YXRlIF90cmFuc2Zvcm06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBDU1NEZWZhdWx0UmVuZGVyZXIgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8vY3JlYXRlIGNvbnRhaW5lciBmb3IgdGhlIHJlbmRlcmVyXHJcblx0XHR0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0dGhpcy5fY29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuXHRcdHRoaXMuX2NvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuXHRcdFxyXG5cdFx0Ly9hZGQgY29udGFpbmVyIHRvIGJvZHlcclxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fY29udGFpbmVyKTtcclxuXHJcblx0XHQvL2NyZWF0ZSBjb254dGV4dCBmb3IgdGhlIHJlbmRlcmVyXHJcblx0XHR0aGlzLl9jb250ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdHRoaXMuX2NvbnRleHRTdHlsZSA9IHRoaXMuX2NvbnRleHQuc3R5bGU7XHJcblx0XHR0aGlzLl9jb250ZXh0U3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcblx0XHR0aGlzLl9jb250ZXh0U3R5bGUudHJhbnNmb3JtU3R5bGVcclxuXHRcdFx0PSB0aGlzLl9jb250ZXh0U3R5bGVbXCItd2Via2l0LXRyYW5zZm9ybS1zdHlsZVwiXVxyXG5cdFx0XHQ9IHRoaXMuX2NvbnRleHRTdHlsZVtcIi1tb3otdHJhbnNmb3JtLXN0eWxlXCJdXHJcblx0XHRcdD0gdGhpcy5fY29udGV4dFN0eWxlW1wiLW8tdHJhbnNmb3JtLXN0eWxlXCJdXHJcblx0XHRcdD0gdGhpcy5fY29udGV4dFN0eWxlW1wiLW1zLXRyYW5zZm9ybS1zdHlsZVwiXSA9IFwicHJlc2VydmUtM2RcIjtcclxuXHRcdHRoaXMuX2NvbnRleHRTdHlsZS50cmFuc2Zvcm1PcmlnaW5cclxuXHRcdFx0PSB0aGlzLl9jb250ZXh0U3R5bGVbXCItd2Via2l0LXRyYW5zZm9ybS1vcmlnaW5cIl1cclxuXHRcdFx0PSB0aGlzLl9jb250ZXh0U3R5bGVbXCItbW96LXRyYW5zZm9ybS1vcmlnaW5cIl1cclxuXHRcdFx0PSB0aGlzLl9jb250ZXh0U3R5bGVbXCItby10cmFuc2Zvcm0tb3JpZ2luXCJdXHJcblx0XHRcdD0gdGhpcy5fY29udGV4dFN0eWxlW1wiLW1zLXRyYW5zZm9ybS1vcmlnaW5cIl0gPSBcIjAlIDAlXCI7XHJcblxyXG5cdFx0Ly9hZGQgY29udGV4dCB0byBjb250YWluZXJcclxuXHRcdHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl9jb250ZXh0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGVudGl0eUNvbGxlY3RvclxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZW5kZXIoZW50aXR5Q29sbGVjdG9yOklDb2xsZWN0b3IpXHJcblx0e1xyXG5cdFx0c3VwZXIucmVuZGVyKGVudGl0eUNvbGxlY3Rvcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BCYWNrQnVmZmVySW52YWxpZCkvLyByZXNldCBvciB1cGRhdGUgcmVuZGVyIHNldHRpbmdzXHJcblx0XHRcdHRoaXMucFVwZGF0ZUJhY2tCdWZmZXIoKTtcclxuXHJcblx0XHR0aGlzLl9pUmVuZGVyKDxFbnRpdHlDb2xsZWN0b3I+IGVudGl0eUNvbGxlY3Rvcik7XHJcblxyXG5cdFx0dGhpcy5fcEJhY2tCdWZmZXJJbnZhbGlkID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdERvY1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBwRHJhdyhlbnRpdHlDb2xsZWN0b3I6RW50aXR5Q29sbGVjdG9yKVxyXG5cdHtcclxuLy9cdFx0XHRpZiAoZW50aXR5Q29sbGVjdG9yLnNreUJveCkge1xyXG4vL1x0XHRcdFx0aWYgKHRoaXMuX2FjdGl2ZU1hdGVyaWFsKVxyXG4vL1x0XHRcdFx0XHR0aGlzLl9hY3RpdmVNYXRlcmlhbC5pRGVhY3RpdmF0ZSh0aGlzLl9wU3RhZ2VHTCk7XHJcbi8vXHJcbi8vXHRcdFx0XHR0aGlzLl9hY3RpdmVNYXRlcmlhbCA9IG51bGw7XHJcbi8vXHJcbi8vXHRcdFx0XHR0aGlzLl9wQ29udGV4dC5zZXREZXB0aFRlc3QoZmFsc2UsIGF3YXkuZ2wuQ29udGV4dEdMQ29tcGFyZU1vZGUuQUxXQVlTKTtcclxuLy9cdFx0XHRcdHRoaXMuZHJhd1NreWJveChlbnRpdHlDb2xsZWN0b3IpO1xyXG4vL1xyXG4vL1x0XHRcdH1cclxuLy9cclxuLy9cdFx0XHR2YXIgd2hpY2g6bnVtYmVyID0gdGFyZ2V0PyBEZWZhdWx0UmVuZGVyZXIuU0NSRUVOX1BBU1NFUyA6IERlZmF1bHRSZW5kZXJlci5BTExfUEFTU0VTO1xyXG5cclxuXHRcdHZhciBzaGVldDpDU1NTdHlsZVNoZWV0ID0gPENTU1N0eWxlU2hlZXQ+IGRvY3VtZW50LnN0eWxlU2hlZXRzW2RvY3VtZW50LnN0eWxlU2hlZXRzLmxlbmd0aCAtIDFdO1xyXG5cclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IHNoZWV0LmNzc1J1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBzdHlsZTpNU1N0eWxlQ1NTUHJvcGVydGllcyA9ICg8Q1NTU3R5bGVSdWxlPiBzaGVldC5jc3NSdWxlc1tpXSkuc3R5bGU7XHJcblx0XHRcdHN0eWxlLnRyYW5zZm9ybVxyXG5cdFx0XHRcdD0gc3R5bGVbXCItd2Via2l0LXRyYW5zZm9ybVwiXVxyXG5cdFx0XHRcdD0gc3R5bGVbXCItbW96LXRyYW5zZm9ybVwiXVxyXG5cdFx0XHRcdD0gc3R5bGVbXCItby10cmFuc2Zvcm1cIl1cclxuXHRcdFx0XHQ9IHN0eWxlW1wiLW1zLXRyYW5zZm9ybVwiXSA9IChlbnRpdHlDb2xsZWN0b3IuY2FtZXJhLnByb2plY3Rpb24uY29vcmRpbmF0ZVN5c3RlbSA9PSBDb29yZGluYXRlU3lzdGVtLlJJR0hUX0hBTkRFRCk/IFwiXCIgOiBcInNjYWxlM2QoMSwgLTEsIDEpIHRyYW5zbGF0ZVkoLVwiICsgc3R5bGUuaGVpZ2h0ICsgXCIpXCI7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5kcmF3UmVuZGVyYWJsZXModGhpcy5fcmVuZGVyYWJsZUhlYWQsIGVudGl0eUNvbGxlY3Rvcik7XHJcblxyXG4vL1x0XHRcdGlmICh0aGlzLl9hY3RpdmVNYXRlcmlhbClcclxuLy9cdFx0XHRcdHRoaXMuX2FjdGl2ZU1hdGVyaWFsLmlEZWFjdGl2YXRlKHRoaXMuX3BTdGFnZUdMKTtcclxuXHJcblx0XHR0aGlzLl9hY3RpdmVNYXRlcmlhbCA9IG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoZSBiYWNrYnVmZmVyIHByb3BlcnRpZXMuXHJcblx0ICovXHJcblx0cHVibGljIHBVcGRhdGVCYWNrQnVmZmVyKClcclxuXHR7XHJcblx0XHR0aGlzLl9jb250YWluZXIuc3R5bGUud2lkdGggPSB0aGlzLl93aWR0aCArIFwicHhcIjtcclxuXHRcdHRoaXMuX2NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSB0aGlzLl9oZWlnaHQgKyBcInB4XCI7XHJcblx0XHR0aGlzLl9jb250YWluZXIuc3R5bGUuY2xpcCA9IFwicmVjdCgwcHgsIFwiICsgdGhpcy5fd2lkdGggKyBcInB4LCBcIiArIHRoaXMuX2hlaWdodCArIFwicHgsIDBweClcIjtcclxuXHJcblx0XHQvL3VwZGF0ZSBjb250ZXh0IG1hdHJpeFxyXG5cdFx0dGhpcy5fY29udGV4dE1hdHJpeC5yYXdEYXRhWzBdID0gdGhpcy5fd2lkdGgvMjtcclxuXHRcdHRoaXMuX2NvbnRleHRNYXRyaXgucmF3RGF0YVs1XSA9IC10aGlzLl9oZWlnaHQvMjtcclxuXHRcdHRoaXMuX2NvbnRleHRNYXRyaXgucmF3RGF0YVsxMF0gPSAtMTsgLy9maXggZm9yIGlubmFjY3VyYXRlIHotc29ydFxyXG5cdFx0dGhpcy5fY29udGV4dE1hdHJpeC5yYXdEYXRhWzEyXSA9IHRoaXMuX3dpZHRoLzI7XHJcblx0XHR0aGlzLl9jb250ZXh0TWF0cml4LnJhd0RhdGFbMTNdID0gdGhpcy5faGVpZ2h0LzI7XHJcblxyXG5cdFx0Ly91cGRhdGUgY29udGV4dCB0cmFuZm9ybVxyXG5cdFx0dGhpcy5fY29udGV4dFN0eWxlLnRyYW5zZm9ybVxyXG5cdFx0XHQ9IHRoaXMuX2NvbnRleHRTdHlsZVtcIi13ZWJraXQtdHJhbnNmb3JtXCJdXHJcblx0XHRcdD0gdGhpcy5fY29udGV4dFN0eWxlW1wiLW1vei10cmFuc2Zvcm1cIl1cclxuXHRcdFx0PSB0aGlzLl9jb250ZXh0U3R5bGVbXCItby10cmFuc2Zvcm1cIl1cclxuXHRcdFx0PSB0aGlzLl9jb250ZXh0U3R5bGVbXCItbXMtdHJhbnNmb3JtXCJdID0gdGhpcy5fY29udGV4dE1hdHJpeC50b1N0cmluZygpO1xyXG5cclxuXHRcdHRoaXMuX3BCYWNrQnVmZmVySW52YWxpZCA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRHJhdyB0aGUgc2t5Ym94IGlmIHByZXNlbnQuXHJcblx0ICogQHBhcmFtIGVudGl0eUNvbGxlY3RvciBUaGUgRW50aXR5Q29sbGVjdG9yIGNvbnRhaW5pbmcgYWxsIHBvdGVudGlhbGx5IHZpc2libGUgaW5mb3JtYXRpb24uXHJcblx0ICovXHJcblx0cHJpdmF0ZSBkcmF3U2t5Ym94KGVudGl0eUNvbGxlY3RvcjpDU1NFbnRpdHlDb2xsZWN0b3IpXHJcblx0e1xyXG5cdFx0Ly9UT0RPXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEcmF3IGEgbGlzdCBvZiByZW5kZXJhYmxlcy5cclxuXHQgKiBAcGFyYW0gcmVuZGVyYWJsZXMgVGhlIHJlbmRlcmFibGVzIHRvIGRyYXcuXHJcblx0ICogQHBhcmFtIGVudGl0eUNvbGxlY3RvciBUaGUgRW50aXR5Q29sbGVjdG9yIGNvbnRhaW5pbmcgYWxsIHBvdGVudGlhbGx5IHZpc2libGUgaW5mb3JtYXRpb24uXHJcblx0ICovXHJcblx0cHJpdmF0ZSBkcmF3UmVuZGVyYWJsZXMoaXRlbTpDU1NSZW5kZXJhYmxlQmFzZSwgZW50aXR5Q29sbGVjdG9yOkVudGl0eUNvbGxlY3RvcilcclxuXHR7XHJcblx0XHR2YXIgdmlld1Byb2plY3Rpb246TWF0cml4M0QgPSBlbnRpdHlDb2xsZWN0b3IuY2FtZXJhLnZpZXdQcm9qZWN0aW9uLmNsb25lKCk7XHJcblxyXG5cdFx0d2hpbGUgKGl0ZW0pIHtcclxuXHRcdFx0Ly90aGlzLl9hY3RpdmVNYXRlcmlhbCA9IDxDU1NNYXRlcmlhbEJhc2U+IGl0ZW0ubWF0ZXJpYWxPd25lci5tYXRlcmlhbDtcclxuXHJcblx0XHRcdC8vc2VyaWFsaXNlIHRyYW5zZm9ybSBhbmQgYXBwbHkgdG8gaHRtbCBlbGVtZW50XHJcblx0XHRcdHRoaXMuX3RyYW5zZm9ybS5jb3B5UmF3RGF0YUZyb20oaXRlbS5yZW5kZXJTY2VuZVRyYW5zZm9ybS5yYXdEYXRhKTtcclxuXHRcdFx0dGhpcy5fdHJhbnNmb3JtLmFwcGVuZCh2aWV3UHJvamVjdGlvbik7XHJcblxyXG5cdFx0XHR2YXIgc3R5bGU6TVNTdHlsZUNTU1Byb3BlcnRpZXMgPSBpdGVtLmh0bWxFbGVtZW50LnN0eWxlO1xyXG5cclxuXHRcdFx0c3R5bGUudHJhbnNmb3JtXHJcblx0XHRcdFx0PSBzdHlsZVtcIi13ZWJraXQtdHJhbnNmb3JtXCJdXHJcblx0XHRcdFx0PSBzdHlsZVtcIi1tb3otdHJhbnNmb3JtXCJdXHJcblx0XHRcdFx0PSBzdHlsZVtcIi1vLXRyYW5zZm9ybVwiXVxyXG5cdFx0XHRcdD0gc3R5bGVbXCItbXMtdHJhbnNmb3JtXCJdID0gdGhpcy5fdHJhbnNmb3JtLnRvU3RyaW5nKCk7XHJcblxyXG5cdFx0XHRzdHlsZS50cmFuc2Zvcm1TdHlsZVxyXG5cdFx0XHRcdD0gc3R5bGVbXCItd2Via2l0LXRyYW5zZm9ybS1zdHlsZVwiXVxyXG5cdFx0XHRcdD0gc3R5bGVbXCItbW96LXRyYW5zZm9ybS1zdHlsZVwiXVxyXG5cdFx0XHRcdD0gc3R5bGVbXCItby10cmFuc2Zvcm0tc3R5bGVcIl1cclxuXHRcdFx0XHQ9IHN0eWxlW1wiLW1zLXRyYW5zZm9ybS1zdHlsZVwiXSA9IFwicHJlc2VydmUtM2RcIjtcclxuXHJcblx0XHRcdC8vY2hlY2sgaWYgY2hpbGQgcmVxdWlyZXMgYWRkaW5nIHRvIHRoZSB2aWV3XHJcblx0XHRcdGlmICghdGhpcy5fY29udGV4dC5jb250YWlucyhpdGVtLmh0bWxFbGVtZW50KSlcclxuXHRcdFx0XHR0aGlzLl9jb250ZXh0LmFwcGVuZENoaWxkKGl0ZW0uaHRtbEVsZW1lbnQpO1xyXG5cclxuXHRcdFx0aXRlbSA9IGl0ZW0ubmV4dDtcclxuXHRcdH1cclxuXHJcbi8vXHRcdFx0dmFyIG51bVBhc3NlczpudW1iZXI7XHJcbi8vXHRcdFx0dmFyIGo6bnVtYmVyO1xyXG4vL1x0XHRcdHZhciBjYW1lcmE6YXdheS5lbnRpdGllcy5DYW1lcmEgPSBlbnRpdHlDb2xsZWN0b3IuY2FtZXJhO1xyXG4vL1x0XHRcdHZhciBpdGVtMjphd2F5LnJlbmRlci5DU1NSZW5kZXJhYmxlQmFzZTtcclxuLy9cclxuLy9cdFx0XHR3aGlsZSAoaXRlbSkge1xyXG4vL1x0XHRcdFx0dGhpcy5fYWN0aXZlTWF0ZXJpYWwgPSBpdGVtLm1hdGVyaWFsO1xyXG4vL1xyXG4vL1x0XHRcdFx0dGhpcy5fYWN0aXZlTWF0ZXJpYWwuaVVwZGF0ZU1hdGVyaWFsKHRoaXMuX3BDb250ZXh0KTtcclxuLy9cclxuLy9cdFx0XHRcdG51bVBhc3NlcyA9IHRoaXMuX2FjdGl2ZU1hdGVyaWFsLl9pTnVtUGFzc2VzO1xyXG4vL1xyXG4vL1x0XHRcdFx0aiA9IDA7XHJcbi8vXHJcbi8vXHRcdFx0XHRkbyB7XHJcbi8vXHRcdFx0XHRcdGl0ZW0yID0gaXRlbTtcclxuLy9cclxuLy9cdFx0XHRcdFx0dmFyIHJ0dE1hc2s6bnVtYmVyID0gdGhpcy5fYWN0aXZlTWF0ZXJpYWwuaVBhc3NSZW5kZXJzVG9UZXh0dXJlKGopPyAxIDogMjtcclxuLy9cclxuLy9cdFx0XHRcdFx0aWYgKChydHRNYXNrICYgd2hpY2gpICE9IDApIHtcclxuLy9cdFx0XHRcdFx0XHR0aGlzLl9hY3RpdmVNYXRlcmlhbC5pQWN0aXZhdGVQYXNzKGosIHRoaXMuX3BTdGFnZUdMLCBjYW1lcmEpO1xyXG4vL1xyXG4vL1x0XHRcdFx0XHRcdGRvIHtcclxuLy9cdFx0XHRcdFx0XHRcdHRoaXMuX2FjdGl2ZU1hdGVyaWFsLmlSZW5kZXJQYXNzKGosIGl0ZW0yLCB0aGlzLl9wU3RhZ2VHTCwgZW50aXR5Q29sbGVjdG9yKTtcclxuLy9cclxuLy9cdFx0XHRcdFx0XHRcdGl0ZW0yID0gaXRlbTIubmV4dDtcclxuLy9cclxuLy9cdFx0XHRcdFx0XHR9IHdoaWxlIChpdGVtMiAmJiBpdGVtMi5tYXRlcmlhbCA9PSB0aGlzLl9hY3RpdmVNYXRlcmlhbCk7XHJcbi8vXHJcbi8vXHRcdFx0XHRcdFx0dGhpcy5fYWN0aXZlTWF0ZXJpYWwuaURlYWN0aXZhdGVQYXNzKGosIHRoaXMuX3BTdGFnZUdMKTtcclxuLy9cclxuLy9cdFx0XHRcdFx0fSBlbHNlIHtcclxuLy9cdFx0XHRcdFx0XHRkbyB7XHJcbi8vXHRcdFx0XHRcdFx0XHRpdGVtMiA9IGl0ZW0yLm5leHQ7XHJcbi8vXHJcbi8vXHRcdFx0XHRcdFx0fSB3aGlsZSAoaXRlbTIgJiYgaXRlbTIucmVuZGVyYWJsZS5tYXRlcmlhbCA9PSB0aGlzLl9hY3RpdmVNYXRlcmlhbCk7XHJcbi8vXHRcdFx0XHRcdH1cclxuLy9cdFx0XHRcdH0gd2hpbGUgKCsraiA8IG51bVBhc3Nlcyk7XHJcbi8vXHJcbi8vXHRcdFx0XHRpdGVtID0gaXRlbTI7XHJcbi8vXHRcdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcclxuXHJcblx0XHQvL1RPRE9cclxuXHR9XHJcblxyXG5cclxuXHRwdWJsaWMgX2lDcmVhdGVFbnRpdHlDb2xsZWN0b3IoKTpJQ29sbGVjdG9yXHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBDU1NFbnRpdHlDb2xsZWN0b3IoKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IENTU0RlZmF1bHRSZW5kZXJlcjsiXX0=