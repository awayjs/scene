import {ShaderRegisterCache, ShaderRegisterData, ShaderRegisterElement} from "@awayjs/stage";

import {ShaderBase, MaterialStatePool} from "@awayjs/renderer";

/**
 * @class away.pool.LineMaterialPool
 */
export class SkyboxMaterialPool extends MaterialStatePool
{
    public _includeDependencies(shader:ShaderBase):void
    {
    }

    /**
     * @inheritDoc
     */
    public _getVertexCode(shader:ShaderBase, registerCache:ShaderRegisterCache, sharedRegisters:ShaderRegisterData):string
    {
        var code:string = "";

        //get the projection coordinates
        var position:ShaderRegisterElement = (shader.globalPosDependencies > 0)? sharedRegisters.globalPositionVertex : sharedRegisters.animatedPosition;

        //reserving vertex constants for projection matrix
        var viewMatrixReg:ShaderRegisterElement = registerCache.getFreeVertexConstant();
        registerCache.getFreeVertexConstant();
        registerCache.getFreeVertexConstant();
        registerCache.getFreeVertexConstant();
        shader.viewMatrixIndex = viewMatrixReg.index*4;

        var scenePosition:ShaderRegisterElement = registerCache.getFreeVertexConstant();
        shader.scenePositionIndex = scenePosition.index*4;

        var skyboxScale:ShaderRegisterElement = registerCache.getFreeVertexConstant();

        var temp:ShaderRegisterElement = registerCache.getFreeVertexVectorTemp();

        code += "mul " + temp + ", " + position + ", " + skyboxScale + "\n" +
            "add " + temp + ", " + temp + ", " + scenePosition + "\n";

        if (shader.projectionDependencies > 0) {
            sharedRegisters.projectionFragment = registerCache.getFreeVarying();
            code += "m44 " + temp + ", " + temp + ", " + viewMatrixReg + "\n" +
                "mov " + sharedRegisters.projectionFragment + ", " + temp + "\n" +
                "mov op, " + temp + "\n";
        } else {
            code += "m44 op, " + temp + ", " + viewMatrixReg + "\n";
        }

        return code;
    }

    public _getFragmentCode(shader:ShaderBase, registerCache:ShaderRegisterCache, sharedRegisters:ShaderRegisterData):string
    {
        return "";
    }
}