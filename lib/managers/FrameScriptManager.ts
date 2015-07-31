import MovieClip					= require("awayjs-display/lib/entities/MovieClip");

class FrameScriptManager
{
	private static _queued_mcs:Array<MovieClip> = [];
	private static _queued_scripts:Array<Function> = [];

	public static add_script_to_queue(mc:MovieClip, script:Function):void
	{
		this._queued_mcs.push(mc);
		this._queued_scripts.push(script);
	}

	public static execute_queue():void
	{
		var i=0;
		var mc:MovieClip;
		for (i = 0; i <this._queued_mcs.length; i++) {
			// during the loop we might add more scripts to the queue
			mc=this._queued_mcs[i];
			if((mc.parent!=null)||(mc.name=="Scene 1")) {
				var caller = mc.adapter ? mc.adapter : mc;
				try {
					this._queued_scripts[i].call(caller);
				}
				catch (err) {
					console.log("Script error in " + mc.name + "\n", this._queued_scripts[i]);
					console.log(err.message);
					throw err;
				}
			}
		}
		// all scripts executed. clear all
		this._queued_mcs=[];
		this._queued_scripts=[];
	}
}
export = FrameScriptManager;