import { IAbstractionClass, IAbstractionPool, IAsset, IAssetClass } from '@awayjs/core';

export class GlslShaderBase implements IAbstractionPool  {
	private static _abstractionClassPool: Record<string, IAbstractionClass> = {};
	id: number;

	public requestAbstraction(asset: IAsset): IAbstractionClass {
		return GlslShaderBase._abstractionClassPool[asset.assetType];
	}

	/**
	 *
	 * @param imageObjectClass
	 */
	public static registerAbstraction(abstractionClass: IAbstractionClass, assetClass: IAssetClass): void {
		GlslShaderBase._abstractionClassPool[assetClass.assetType] = abstractionClass;
	}
}
