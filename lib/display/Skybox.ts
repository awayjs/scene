import {AssetEvent} from "@awayjs/core";

import {BlendMode, ImageCube} from "@awayjs/stage";

import {View, PickingCollision, PartitionBase, BoundingVolumeType} from "@awayjs/view";

import {IAnimationSet, IMaterial, ITexture, RenderableEvent, MaterialEvent, Style, StyleEvent, IRenderEntity} from "@awayjs/renderer";

import {ImageTextureCube} from "@awayjs/materials";

import {DisplayObject} from "./DisplayObject";

/**
 * A Skybox class is used to render a sky in the scene. It's always considered static and 'at infinity', and as
 * such it's always centered at the camera's position and sized to exactly fit within the camera's frustum, ensuring
 * the sky box is always as large as possible without being clipped.
 */
export class Skybox extends DisplayObject implements IMaterial
{
	private _textures:Array<ITexture> = new Array<ITexture>();

	public static assetType:string = "[asset Skybox]";

	private _texture:ImageTextureCube;
	private _animationSet:IAnimationSet;
	public _pBlendMode:string = BlendMode.NORMAL;
	private _owners:Array<IRenderEntity>;
	private _onTextureInvalidateDelegate:(event:AssetEvent) => void;

	public animateUVs:boolean = false;

	public bothSides:boolean = false;

    public curves:boolean = false;

    public imageRect:boolean = false;

	/**
	 *
	 */
	public get animationSet():IAnimationSet
	{
		return this._animationSet;
	}

	/**
	 * The blend mode to use when drawing this renderable. The following blend modes are supported:
	 * <ul>
	 * <li>BlendMode.NORMAL: No blending, unless the material inherently needs it</li>
	 * <li>BlendMode.LAYER: Force blending. This will draw the object the same as NORMAL, but without writing depth writes.</li>
	 * <li>BlendMode.MULTIPLY</li>
	 * <li>BlendMode.ADD</li>
	 * <li>BlendMode.ALPHA</li>
	 * </ul>
	 */
	public get blendMode():string
	{
		return this._pBlendMode;
	}

	public set blendMode(value:string)
	{
		if (this._pBlendMode == value)
			return;

		this._pBlendMode = value;

		this.invalidate();
	}


	/**
	 * A list of the IRenderables that use this material
	 *
	 * @private
	 */
	public get iOwners():Array<IRenderEntity>
	{
		return this._owners;
	}

	/**
	* The cube texture to use as the skybox.
	*/
	public get texture():ImageTextureCube
	{
		return this._texture;
	}

	public set texture(value:ImageTextureCube)
	{
		if (this._texture == value)
			return;

		if (this._texture)
			this.removeTexture(this._texture);

		this._texture = value;

		if (this._texture)
			this.addTexture(this._texture);

		this.invalidatePasses();
	}

	public getNumTextures():number
	{
		return this._textures.length;
	}

	public getTextureAt(index:number):ITexture
	{
		return this._textures[index];
	}

	/**
	 * Create a new Skybox object.
	 *
	 * @param material	The material with which to render the Skybox.
	 */
    constructor(image?:ImageCube, alpha?:number);
    constructor(color?:number, alpha?:number);
    constructor(imageColor:any = 0xFFFFFF, alpha:number = 1)
	{
		super();

		this._onTextureInvalidateDelegate = (event:AssetEvent) => this.onTextureInvalidate(event);

		this._owners = [this];

		this.style = new Style();
        if (imageColor instanceof ImageCube) {
            this._style.image = <ImageCube> imageColor;
            this.texture = new ImageTextureCube();
        } else {
            this._style.color = Number(imageColor);
        }
	}

	public isEntity():boolean
	{
		return true;
	}

	public get assetType():string
	{
		return Skybox.assetType;
	}

	/**
	 * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
	 *
	 * @private
	 */
	public invalidatePasses():void
	{
		this.dispatchEvent(new MaterialEvent(MaterialEvent.INVALIDATE_PASSES, this));
	}

	public invalidateElements():void
	{
		this.dispatchEvent(new RenderableEvent(RenderableEvent.INVALIDATE_ELEMENTS, this));
	}
	
	public invalidateMaterial():void
	{
		this.dispatchEvent(new RenderableEvent(RenderableEvent.INVALIDATE_MATERIAL, this));
	}
			
	public invalidateStyle():void
	{
		this.dispatchEvent(new RenderableEvent(RenderableEvent.INVALIDATE_STYLE, this));
	}

	public addTexture(texture:ITexture):void
	{
		this._textures.push(texture);

		texture.addEventListener(AssetEvent.INVALIDATE, this._onTextureInvalidateDelegate);

		this.onTextureInvalidate();
	}

	public removeTexture(texture:ITexture):void
	{
		this._textures.splice(this._textures.indexOf(texture), 1);

		texture.removeEventListener(AssetEvent.INVALIDATE, this._onTextureInvalidateDelegate);

		this.onTextureInvalidate();
	}

	private onTextureInvalidate(event:AssetEvent = null):void
	{
		this.invalidate();
	}

	public _onInvalidateProperties(event:StyleEvent):void
	{
		this.invalidateMaterial();
		this.invalidatePasses();
	}

	public _acceptTraverser(traverser:IEntityTraverser):void
	{
		traverser.applyTraversable(this);
	}
	
	public iAddOwner(owner:IRenderEntity):void
	{

	}

	/**
	 * Removes an IEntity as owner.
	 * @param owner
	 *
	 * @internal
	 */
	public iRemoveOwner(owner:IRenderEntity):void
	{

	}

	protected _getDefaultBoundingVolume():BoundingVolumeType
	{
		return BoundingVolumeType.NULL;
	}

	
	public testCollision(collision:PickingCollision, closestFlag:boolean):boolean
	{
		collision.pickable = null;
		
		return false;
	}
}

import {Matrix3D, ProjectionBase} from "@awayjs/core";

import {DefaultRenderer, _Render_RenderableBase, _Shader_TextureBase, ShaderBase, _Render_ElementsBase, RenderEntity} from "@awayjs/renderer";

import {ContextGLCompareMode, ShaderRegisterCache, ShaderRegisterData, AttributesBuffer} from "@awayjs/stage";

import {_Render_MaterialPassBase} from "@awayjs/materials";

import {SkyboxElements, _Stage_SkyboxElements} from "../elements/SkyboxElements";

/**
 * _Render_SkyboxMaterial forms an abstract base class for the default shaded materials provided by Stage,
 * using material methods to define their appearance.
 */
export class _Render_SkyboxMaterial extends _Render_MaterialPassBase
{
    public _skybox:Skybox;
    public _texture:_Shader_TextureBase;

    constructor(skybox:Skybox, renderElements:_Render_ElementsBase)
    {
        super(skybox, renderElements);

        this._skybox = skybox;

        this._shader = new ShaderBase(renderElements, this, this, this._stage);

        this._texture = <_Shader_TextureBase> this._shader.getAbstraction(this._skybox.texture);

        this._pAddPass(this);
    }

    public onClear(event:AssetEvent):void
    {
        super.onClear(event);

        this._texture.onClear(new AssetEvent(AssetEvent.CLEAR, this._skybox.texture));
        this._texture = null;

        this._skybox = null;
    }

    /**
     * @inheritDoc
     */
    public _pUpdateRender():void
    {
        super._pUpdateRender();

        this.requiresBlending = (this._material.blendMode != BlendMode.NORMAL);

        this.shader.setBlendMode((this._material.blendMode == BlendMode.NORMAL && this.requiresBlending)? BlendMode.LAYER : this._material.blendMode);
    }

    public _includeDependencies(shader:ShaderBase):void
    {
        super._includeDependencies(shader);

        shader.usesPositionFragment = true;
    }

    /**
     * @inheritDoc
     */
    public _getFragmentCode(registerCache:ShaderRegisterCache, sharedRegisters:ShaderRegisterData):string
    {
        return this._texture._getFragmentCode(sharedRegisters.shadedTarget, registerCache, sharedRegisters, sharedRegisters.positionVarying);
    }


    public _setRenderState(renderable:_Render_RenderableBase, view:View):void
    {
        super._setRenderState(renderable, view);

        this._texture._setRenderState(renderable);
    }
    /**
     * @inheritDoc
     */
    public _activate(view:View):void
    {
        super._activate(view);

        this._stage.context.setDepthTest(false, ContextGLCompareMode.LESS);

        this._texture.activate();
    }
}

/**
 * @class away.pool._Render_Skybox
 */
export class _Render_Skybox extends _Render_RenderableBase
{
    /**
     *
     */
	private static _elements:SkyboxElements;

    /**
     * //TODO
     *
     * @returns {away.base.TriangleElements}
     * @private
     */
    protected _getStageElements():_Stage_SkyboxElements
    {
        var elements:SkyboxElements = _Render_Skybox._elements;

        if (!elements) {
            elements = new SkyboxElements(new AttributesBuffer(11, 4));
            elements.autoDeriveNormals = false;
            elements.autoDeriveTangents = false;
            elements.setIndices(Array<number>(0, 1, 2, 2, 3, 0, 6, 5, 4, 4, 7, 6, 2, 6, 7, 7, 3, 2, 4, 5, 1, 1, 0, 4, 4, 0, 3, 3, 7, 4, 2, 1, 5, 5, 6, 2));
            elements.setPositions(Array<number>(-1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1));
        }

        return <_Stage_SkyboxElements> this._stage.getAbstraction(elements);
    }

    protected _getRenderMaterial():_Render_SkyboxMaterial
    {
        return <_Render_SkyboxMaterial> this.renderGroup.getRenderElements(this.stageElements.elements).getAbstraction(<Skybox> this._asset);
	}
		
	protected _getStyle():Style
    {
        return (<Skybox> this._asset).style;
    }
}

import {Plane3D} from "@awayjs/core";
import { IEntityTraverser, EntityNode } from '@awayjs/view';

/**
 * SkyboxNode is a space partitioning leaf node that contains a Skybox object.
 *
 * @class away.partition.SkyboxNode
 */
export class SkyboxNode extends EntityNode
{
	/**
	 *
	 * @param planes
	 * @param numPlanes
	 * @returns {boolean}
	 */
	public isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean
	{
		if (!this._entity._iIsVisible)
			return false;

		//a skybox is always in view unless its visibility is set to false
		return true;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	public isCastingShadow():boolean
	{
		return false; //skybox never casts shadows
	}
}

DefaultRenderer.registerMaterial(_Render_SkyboxMaterial, Skybox);
RenderEntity.registerRenderable(_Render_Skybox, Skybox);
PartitionBase.registerAbstraction(SkyboxNode, Skybox);