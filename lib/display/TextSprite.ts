import { Sprite } from './Sprite';
import { TextField } from './TextField';
import { TesselatedFontTable } from '../text/TesselatedFontTable';
import { HierarchicalProperties } from '../base/HierarchicalProperties';
import { IEntityTraverser } from '@awayjs/view';

/**
 * TextSprite is used for masked text.
 * It is a child of the textfield that is used to render all visible (masked) graphics
 */
export class TextSprite extends Sprite {
	public parentTextField: TextField;

	public _acceptTraverser(traverser: IEntityTraverser): void {
		const tf: TextField = this.parentTextField;
		tf.reConstruct(true);

		if (tf._textFormat && !tf._textFormat.font_table.isAsset(TesselatedFontTable) && !tf._textFormat.material) {
			this.transform.colorTransform.color = (tf.textColor != null) ? tf.textColor : tf._textFormat.color;
			this._invalidateHierarchicalProperties(HierarchicalProperties.COLOR_TRANSFORM);
		}

		this._graphics._acceptTraverser(traverser);
	}
}