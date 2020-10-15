import { IAssetAdapter } from '@awayjs/core';

import { DisplayObject } from '../display/DisplayObject';
import { IFilter } from './IFilter';

export interface IDisplayObjectAdapter extends IAssetAdapter
{
	isBlockedByScript(): boolean;

	isVisibilityByScript(): boolean;

	isColorTransformByScript(): boolean;

	initAdapter(): void;

	onLoaded?: Function;

	executeConstructor?: Function;

	freeFromScript(): void;

	clone(): IDisplayObjectAdapter;

	updateFilters(newFilters: IFilter[]);
}