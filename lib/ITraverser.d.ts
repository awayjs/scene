import { IEntity } from "./display/IEntity";
import { INode } from "./partition/INode";
import { IRenderable } from "./base/IRenderable";
/**
 * ITraverser is an interface for classes that are used in the rendering pipeline to render the
 * contents of a partition
 *
 * @class away.render.ITraverser
 */
export interface ITraverser {
    /**
     *
     * @param node
     * @returns {boolean}
     */
    enterNode(node: INode): boolean;
    /**
     *
     * @param entity
     */
    applyDirectionalLight(entity: IEntity): any;
    /**
     *
     * @param entity
     */
    applyEntity(entity: IEntity): any;
    /**
     *
     * @param entity
     */
    applyRenderable(renderable: IRenderable): any;
    /**
     *
     * @param entity
     */
    applyLightProbe(entity: IEntity): any;
    /**
     *
     * @param entity
     */
    applyPointLight(entity: IEntity): any;
    /**
     *
     * @param entity
     */
    applySkybox(entity: IEntity): any;
}
