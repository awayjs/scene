import {Matrix3D, Vector3D, ProjectionBase} from "@awayjs/core";

import {GL_TriangleElements} from "@awayjs/graphics";

import {ShaderBase, RenderStateBase} from "@awayjs/renderer";

import {ContextGLDrawMode, ContextGLProgramType, IContextGL} from "@awayjs/stage";

/**
 *
 * @class away.pool.GL_SkyboxElements
 */
export class GL_SkyboxElements extends GL_TriangleElements
{
	private _skyboxProjection:Matrix3D = new Matrix3D();

	public draw(renderable:RenderStateBase, shader:ShaderBase, projection:ProjectionBase, count:number, offset:number):void
	{
		var index:number = shader.scenePositionIndex;
		var camPos:Vector3D = projection.transform.concatenatedMatrix3D.position;
		shader.vertexConstantData[index++] = 2*camPos.x;
		shader.vertexConstantData[index++] = 2*camPos.y;
		shader.vertexConstantData[index++] = 2*camPos.z;
		shader.vertexConstantData[index++] = 1;
		shader.vertexConstantData[index++] = shader.vertexConstantData[index++] = shader.vertexConstantData[index++] = projection.far/Math.sqrt(3);
		shader.vertexConstantData[index] = 1;

		var near:Vector3D = new Vector3D();

		this._skyboxProjection.copyFrom(projection.viewMatrix3D);
		this._skyboxProjection.copyRowTo(2, near);

		var cx:number = near.x;
		var cy:number = near.y;
		var cz:number = near.z;
		var cw:number = -(near.x*camPos.x + near.y*camPos.y + near.z*camPos.z + Math.sqrt(cx*cx + cy*cy + cz*cz));

		var signX:number = cx >= 0? 1 : -1;
		var signY:number = cy >= 0? 1 : -1;

		var p:Vector3D = new Vector3D(signX, signY, 1, 1);

		var inverse:Matrix3D = this._skyboxProjection.clone();
		inverse.invert();

		var q:Vector3D = inverse.transformVector(p);

		this._skyboxProjection.copyRowTo(3, p);

		var a:number = (q.x*p.x + q.y*p.y + q.z*p.z + q.w*p.w)/(cx*q.x + cy*q.y + cz*q.z + cw*q.w);

		this._skyboxProjection.copyRowFrom(2, new Vector3D(cx*a, cy*a, cz*a, cw*a));
		
		//set constants
		if (shader.sceneMatrixIndex >= 0)
			shader.sceneMatrix.copyFrom(renderable.renderSceneTransform, true);

		shader.viewMatrix.copyFrom(this._skyboxProjection, true);

		var context:IContextGL = this._stage.context;
		context.setProgramConstantsFromArray(ContextGLProgramType.VERTEX, shader.vertexConstantData);
		context.setProgramConstantsFromArray(ContextGLProgramType.FRAGMENT, shader.fragmentConstantData);

		if (this._indices)
			this.getIndexBufferGL().draw(ContextGLDrawMode.TRIANGLES, 0, this.numIndices);
		else
			this._stage.context.drawVertices(ContextGLDrawMode.TRIANGLES, offset, count || this.numVertices);
	}
}