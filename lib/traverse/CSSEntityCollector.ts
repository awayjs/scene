import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import ICollector					= require("awayjs-display/lib/traverse/ICollector");

/**
 * @class away.traverse.CSSEntityCollector
 */
class CSSEntityCollector extends CollectorBase implements ICollector
{
	constructor()
	{
		super();
	}
}

export = CSSEntityCollector;