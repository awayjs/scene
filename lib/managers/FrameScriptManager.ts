import {DisplayObject} from "../display/DisplayObject";
import {MovieClip} from "../display/MovieClip";
import {IMovieClipAdapter} from "../adapters/IMovieClipAdapter";
import { IDisplayObjectAdapter } from '../adapters/IDisplayObjectAdapter';

interface IInterval{
	f:Function;
	t:number;
	dt:number;
	isTimeout:boolean;
}
interface IScriptQueue{
	queued_mcs:MovieClip[],
	queued_scripts:any[],
	queued_mcs_pass2:MovieClip[],
	queued_scripts_pass2:any[],
	constructors:MovieClip[],
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


	private static _queue:IScriptQueue[] = [];

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


	public static add_queue(){
		FrameScriptManager._queue.push({
			queued_mcs:[],
			queued_scripts:[],
			queued_mcs_pass2:[],
			queued_scripts_pass2:[],
			constructors:[],
		});
	}

	public static get_queue():IScriptQueue{
		let queue=FrameScriptManager._queue[FrameScriptManager._queue.length-1];
		if(!queue){
			FrameScriptManager.add_queue();
		}
		return FrameScriptManager._queue[FrameScriptManager._queue.length-1];
	}
	public static add_script_to_queue(mc:MovieClip, script:any):void
	{
		let queue=FrameScriptManager.get_queue();
		// whenever we queue scripts of new objects, we first inject the lists of pass2
		var i=queue.queued_mcs_pass2.length;
		while(i>0){
			i--;
			queue.queued_mcs.push(queue.queued_mcs_pass2[i]);
			queue.queued_scripts.push(queue.queued_scripts_pass2[i]);
		}
		queue.queued_mcs_pass2.length = 0;
		queue.queued_scripts_pass2.length = 0;
		queue.queued_mcs.push(mc);
		queue.queued_scripts.push(script);
	}
	public static add_loaded_action_to_queue(mc:MovieClip):void
	{
		let queue=FrameScriptManager.get_queue();
		// whenever we queue scripts of new objects, we first inject the lists of pass2
		var i=queue.queued_mcs_pass2.length;
		while(i>0){
			i--;
			queue.queued_mcs.push(queue.queued_mcs_pass2[i]);
			queue.queued_scripts.push(queue.queued_scripts_pass2[i]);
		}
		queue.queued_mcs_pass2.length = 0;
		queue.queued_scripts_pass2.length = 0;
		if(queue.queued_mcs[queue.queued_mcs.length-1]==mc){
			return;
		}
		queue.queued_mcs.push(mc);
		queue.queued_scripts.push(null);
	}

	public static add_script_to_queue_pass2(mc:MovieClip, script:any):void
	{
		let queue=FrameScriptManager.get_queue();
		queue.queued_mcs_pass2.push(mc);
		queue.queued_scripts_pass2.push(script);
	}

	public static queue_as3_constructor(mc:MovieClip):void
	{
		let queue=FrameScriptManager.get_queue();
		queue.constructors.push(mc);
	}
	
	public static execute_as3_constructors():void
	{
		if(FrameScriptManager._queue.length==0){	
			return;
		}
		let queue = FrameScriptManager._queue[FrameScriptManager._queue.length-1];
		
		while(queue.constructors.length>0){
			let queues_tmp:any[]=queue.constructors.concat();
			//console.log("queue", queues_tmp)
			queue.constructors.length = 0;
			let mc:MovieClip;
			let i:number;
			for (i = 0; i <queues_tmp.length; i++) {
				// during the loop we might add more scripts to the queue
				mc=queues_tmp[i];
				let mcadapter=mc.adapter;
				let constructorFunc = (<IDisplayObjectAdapter>mcadapter).executeConstructor;
				if(constructorFunc){
					(<IDisplayObjectAdapter>mcadapter).executeConstructor = null;
					constructorFunc();
				}
				
				// if mc was created by timeline, instanceID!=""
				if((<any>mc).just_added_to_timeline && mc.instanceID!="" && mcadapter && (<any>mcadapter).dispatchStaticEvent){	
					(<any>mcadapter).dispatchStaticEvent("added", mcadapter);
					(<any>mc).just_added_to_timeline=false;
					mc.hasDispatchedAddedToStage=mc.isOnDisplayList();
					if(mc.hasDispatchedAddedToStage)
						(<any>mcadapter).dispatchStaticEvent("addedToStage", mcadapter);
				}
				// 	todo: this does not dispatch ADDED and ADDED_TO_STAGE on timeline-SHAPE, 
				//	because in awayjs timeline those are Sprite without any as3-adapter
				
			}
		}
	}
	public static execute_queue():void
	{
		let queue;
		if(FrameScriptManager._queue.length>1){
			queue = FrameScriptManager._queue.pop();
		}
		else if(FrameScriptManager._queue.length==0){	
			return;
		}
		else{
			queue = FrameScriptManager._queue[0];
		}
		if(queue.constructors.length>1){
			FrameScriptManager.execute_as3_constructors();
		}
		if(queue.queued_mcs.length==0 && queue.queued_mcs_pass2.length==0)
			return;

		while(queue.queued_mcs.length>0 || queue.queued_mcs_pass2.length>0){

			var queues_tmp:any[]=queue.queued_mcs.concat();
			var queues_scripts_tmp:any[]=queue.queued_scripts.concat();		
			queue.queued_mcs.length = 0;
			queue.queued_scripts.length = 0;
	
			var i=queue.queued_mcs_pass2.length;
			while(i>0){
				i--;
				queues_tmp.push(queue.queued_mcs_pass2[i]);
				queues_scripts_tmp.push(queue.queued_scripts_pass2[i]);
			}
			queue.queued_mcs_pass2.length = 0;
			queue.queued_scripts_pass2.length = 0;
	
			//console.log("execute queue",queue.queued_scripts);
			
			var mc:MovieClip;
			for (i = 0; i <queues_tmp.length; i++) {
				// during the loop we might add more scripts to the queue
				mc=queues_tmp[i];
				// first we execute any pending loadedAction for this MC
				if ((<any>mc).onLoaded) {
					//atm this is only used for avm1, to execute queued "onloaded" actions. 
					let myFunc = (<any>mc).onLoaded;
					(<any>mc).onLoaded = null;
					myFunc();
				}
				if (queues_scripts_tmp[i] != null) {
					//console.log("execute script", mc.name, queues_scripts_tmp[i]);
					if (mc && mc.adapter && (<IMovieClipAdapter>mc.adapter).executeScript)
						(<IMovieClipAdapter>mc.adapter).executeScript(queues_scripts_tmp[i]);
				}
				
			}
		}
	}


	public static execute_dispose(): void {
		var len: number = this._queued_dispose.length;
		for (var i: number = 0; i < len; i++)
			this._queued_dispose[i].dispose();

		this._queued_dispose.length = 0;
	}
}
export default FrameScriptManager;