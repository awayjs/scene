import { Stage, BitmapImage2D } from '@awayjs/stage';
import { Font } from './Font';

export abstract class FNTGeneratorBase {
	constructor (
		protected _stage: Stage
	) {
	}

	public abstract generate(font: Font, maxSize: number, fontSize: number, padding: number): BitmapImage2D[];
}