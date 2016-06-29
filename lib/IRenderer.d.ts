import { IEventDispatcher } from "@awayjs/core/lib/events/IEventDispatcher";
import { Plane3D } from "@awayjs/core/lib/geom/Plane3D";
import { ImageBase } from "@awayjs/core/lib/image/ImageBase";
import { Rectangle } from "@awayjs/core/lib/geom/Rectangle";
import { ITraverser } from "./ITraverser";
import { Camera } from "./display/Camera";
import { Scene } from "./display/Scene";
/**
 * IRenderer is an interface for classes that are used in the rendering pipeline to render the
 * contents of a partition
 *
 * @class away.render.IRenderer
 */
export interface IRenderer extends ITraverser, IEventDispatcher {
    cullPlanes: Array<Plane3D>;
    /**
     *
     */
    shareContext: boolean;
    /**
     *
     */
    x: number;
    /**
     *
     */
    y: number;
    /**
     *
     */
    width: number;
    /**
     *
     */
    height: number;
    /**
     *
     */
    viewPort: Rectangle;
    /**
     *
     */
    scissorRect: Rectangle;
    /**
     *
     */
    dispose(): any;
    /**
     *
     * @param entityCollector
     */
    render(camera: Camera, scene: Scene): any;
    /**
     * @internal
     */
    _iBackgroundR: number;
    /**
     * @internal
     */
    _iBackgroundG: number;
    /**
     * @internal
     */
    _iBackgroundB: number;
    /**
     * @internal
     */
    _iBackgroundAlpha: number;
    _iRender(camera: Camera, scene: Scene, target?: ImageBase, scissorRect?: Rectangle, surfaceSelector?: number): any;
    _iRenderCascades(camera: Camera, scene: Scene, target: ImageBase, numCascades: number, scissorRects: Array<Rectangle>, cameras: Array<Camera>): any;
}
