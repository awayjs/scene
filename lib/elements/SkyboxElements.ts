import {TriangleElements} from "@awayjs/graphics";

/**
 * @class away.base.TriangleElements
 */
export class SkyboxElements extends TriangleElements
{
    public static assetType:string = "[asset SkyboxElements]";


    public get assetType():string
    {
        return SkyboxElements.assetType;
    }
}

import {Stage} from "@awayjs/stage";

import {RenderGroup} from "@awayjs/renderer";

import {SkyboxMaterialPool} from "./SkyboxMaterialPool";
import {GL_SkyboxElements} from "./GL_SkyboxElements";

RenderGroup.registerMaterialPool(SkyboxMaterialPool, SkyboxElements);
Stage.registerAbstraction(GL_SkyboxElements, SkyboxElements);
