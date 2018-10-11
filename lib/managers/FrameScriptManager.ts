import {DisplayObject} from "../display/DisplayObject";
import {MovieClip} from "../display/MovieClip";
import {IMovieClipAdapter} from "../adapters/IMovieClipAdapter";
import { BuildMode } from '@awayjs/core';

interface IInterval{
	f:Function;
	t:number;
	dt:number;
	isTimeout:boolean;
}
export class FrameScriptManager
{
	// FrameScript debugging:
	// the first line of a FrameScript should be a comment that represents the functions unique name
	// the exporter creates a js file, containing a object that has the framescripts functions set as properties according to the unique names
	// this object can be set as "frameScriptDebug" in order to enable debug mode


	public static frameScriptDebug:Object = undefined;

	//queue of objects for disposal
	private static _queued_dispose:DisplayObject[] = [];

	// queues pass1 of scripts.
	private static _queued_mcs:MovieClip[] = [];
	private static _queued_scripts:any[] = [];

	// queues pass2 of scripts. this will be inserted in reversed order into pass1 queue right before something should be added to pass1
	private static _queued_mcs_pass2:MovieClip[] = [];
	private static _queued_scripts_pass2:any[] = [];

	private static _active_intervals:Object = new Object(); // maps id to function

	private static _intervalID:number=0;
	public static setInterval(fun:Function, time:number):number
	{
		this._intervalID++;
		// make sure we have at least 4ms intervals
		if(time<4){
			time=4;
		}
		this._active_intervals[this._intervalID]=<IInterval>{"f":fun, "t":time, "dt":0, "isTimeout":false};
		return this._intervalID
	}
	public static setTimeOut(fun:Function, time:number):number
	{
		this._intervalID++;
		// make sure we have at least 4ms intervals
		if(time<4){
			time=4;
		}
		this._active_intervals[this._intervalID]=<IInterval>{"f":fun, "t":time, "dt":0, "isTimeout":true};
		return this._intervalID
	}

	public static clearInterval(id:number):void
	{
		delete this._active_intervals[id];
	}

	public static clearTimeout(id:number):void
	{
		delete this._active_intervals[id];
	}

	public static execute_intervals(dt:number=0):void
	{
		var interval:IInterval;
		for(var key in this._active_intervals){
			interval=this._active_intervals[key];
			interval.dt+=dt;
			// keep executing the setInterval for as many times as the dt allows
			// a setInterval can delete itself, so we need to check if it still exists
			while(this._active_intervals[key] && interval.dt>=interval.t){
				interval.dt-=interval.t;
				interval.f();
				if(interval.isTimeout){
					delete this._active_intervals[key];
				}
			}
		}
	}

	public static add_child_to_dispose(child:DisplayObject):void
	{
		this._queued_dispose.push(child);
	}

	public static add_script_to_queue(mc:MovieClip, script:any):void
	{
		// whenever we queue scripts of new objects, we first inject the lists of pass2
		var i=this._queued_mcs_pass2.length;
		while(i>0){
			i--;
			this._queued_mcs.push(this._queued_mcs_pass2[i]);
			this._queued_scripts.push(this._queued_scripts_pass2[i]);
		}
		this._queued_mcs_pass2.length = 0;
		this._queued_scripts_pass2.length = 0;
		this._queued_mcs.push(mc);
		this._queued_scripts.push(script);
	}
	public static add_loaded_action_to_queue(mc:MovieClip):void
	{
		// whenever we queue scripts of new objects, we first inject the lists of pass2
		var i=this._queued_mcs_pass2.length;
		while(i>0){
			i--;
			this._queued_mcs.push(this._queued_mcs_pass2[i]);
			this._queued_scripts.push(this._queued_scripts_pass2[i]);
		}
		this._queued_mcs_pass2.length = 0;
		this._queued_scripts_pass2.length = 0;
		if(this._queued_mcs[this._queued_mcs.length-1]==mc){
			return;
		}
		this._queued_mcs.push(mc);
		this._queued_scripts.push(null);
	}

	public static add_script_to_queue_pass2(mc:MovieClip, script:any):void
	{
		this._queued_mcs_pass2.push(mc);
		this._queued_scripts_pass2.push(script);
	}

	public static execute_queue():void
	{
		if(this._queued_mcs.length==0 && this._queued_mcs_pass2.length==0)
			return;

		while(this._queued_mcs.length>0 || this._queued_mcs_pass2.length>0){

			var queues_tmp:any[]=this._queued_mcs.concat();
			var queues_scripts_tmp:any[]=this._queued_scripts.concat();		
			this._queued_mcs.length = 0;
			this._queued_scripts.length = 0;
	
			var i=this._queued_mcs_pass2.length;
			while(i>0){
				i--;
				queues_tmp.push(this._queued_mcs_pass2[i]);
				queues_scripts_tmp.push(this._queued_scripts_pass2[i]);
			}
			this._queued_mcs_pass2.length = 0;
			this._queued_scripts_pass2.length = 0;
	
			//console.log("execute queue",this._queued_scripts);
			
			var mc:MovieClip;
			for (i = 0; i <queues_tmp.length; i++) {
				// during the loop we might add more scripts to the queue
				mc=queues_tmp[i];
				if(mc._implicitPartition && mc._implicitPartition.root) {
					// first we execute any pending loadedAction for this MC
					if((<any>mc).onLoadedAction){
						(<any>mc).onLoadedAction();
						(<any>mc).onLoadedAction=null;	
					}
					if((<any>mc).onCustomConstructor){
						(<any>mc).onCustomConstructor();
						(<any>mc).onCustomConstructor=null;	
					}
					if(queues_scripts_tmp[i]!=null){
						//console.log("execute script", mc.name, queues_scripts_tmp[i]);
						(<IMovieClipAdapter>mc.adapter).executeScript(queues_scripts_tmp[i]);
					}
				}
			}
		}
	}


	public static execute_dispose():void
	{
		var len:number = this._queued_dispose.length;
		for (var i:number = 0; i < len; i++)
			this._queued_dispose[i].dispose();

		this._queued_dispose.length = 0;
	}
}
export default FrameScriptManager;