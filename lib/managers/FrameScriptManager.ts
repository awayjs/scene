import { DisplayObject } from '../display/DisplayObject';
import { MovieClip } from '../display/MovieClip';
import { IMovieClipAdapter } from '../adapters/IMovieClipAdapter';
import { IDisplayObjectAdapter } from '../adapters/IDisplayObjectAdapter';

interface IInterval {
	f: Function;
	t: number;
	dt: number;
	isTimeout: boolean;
}
interface IScriptQueue {
	queued_mcs: MovieClip[],
	queued_scripts: any[],
	queued_mcs_pass2: MovieClip[],
	queued_scripts_pass2: any[],
	constructors: MovieClip[],
}
export class FrameScriptManager {
	// FrameScript debugging:
	// the first line of a FrameScript should be a comment that represents the functions unique name
	// the exporter creates a js file, containing a object that has the framescripts functions set as properties according to the unique names
	// this object can be set as "frameScriptDebug" in order to enable debug mode

	public static frameScriptDebug: Object = undefined;
	public static useAVM1: boolean = false;

	//queue of objects for disposal
	private static _queued_dispose: DisplayObject[] = [];

	private static _queue: IScriptQueue;

	private static _active_intervals: Object = new Object(); // maps id to function

	private static _intervalID: number = 0;
	public static setInterval(fun: Function, time: number): number {
		this._intervalID++;
		// make sure we have at least 4ms intervals
		if (time < 4) {
			time = 4;
		}
		this._active_intervals[this._intervalID] = <IInterval>{ 'f': fun, 't': time, 'dt': 0, 'isTimeout': false };
		return this._intervalID;
	}

	public static setTimeOut(fun: Function, time: number): number {
		this._intervalID++;
		// make sure we have at least 4ms intervals
		if (time < 4) {
			time = 4;
		}
		this._active_intervals[this._intervalID] = <IInterval>{ 'f': fun, 't': time, 'dt': 0, 'isTimeout': true };
		return this._intervalID;
	}

	public static clearInterval(id: number): void {
		delete this._active_intervals[id];
	}

	public static clearTimeout(id: number): void {
		delete this._active_intervals[id];
	}

	public static execute_intervals(dt: number = 0): void {
		let interval: IInterval;
		for (const key in this._active_intervals) {
			interval = this._active_intervals[key];
			interval.dt += dt;
			// keep executing the setInterval for as many times as the dt allows
			// a setInterval can delete itself, so we need to check if it still exists
			while (this._active_intervals[key] && interval.dt >= interval.t) {
				interval.dt -= interval.t;
				interval.f();
				if (interval.isTimeout) {
					delete this._active_intervals[key];
				}
			}
		}
	}

	public static add_child_to_dispose(child: DisplayObject): void {
		this._queued_dispose.push(child);
	}

	public static get_queue(): IScriptQueue {
		if (!FrameScriptManager._queue) {
			FrameScriptManager._queue = {
				queued_mcs: [],
				queued_scripts: [],
				queued_mcs_pass2: [],
				queued_scripts_pass2: [],
				constructors: [],
			};
		}
		return FrameScriptManager._queue;
	}

	public static add_script_to_queue(mc: MovieClip, script: any): void {
		//console.log("add_script_to_queue", mc.name);
		const queue = FrameScriptManager.get_queue();
		// whenever we queue scripts of new objects, we first inject the lists of pass2
		let i = queue.queued_mcs_pass2.length;
		while (i > 0) {
			i--;
			queue.queued_mcs.push(queue.queued_mcs_pass2[i]);
			queue.queued_scripts.push(queue.queued_scripts_pass2[i]);
		}
		queue.queued_mcs_pass2.length = 0;
		queue.queued_scripts_pass2.length = 0;
		(<any>mc.adapter).allowScript = true;
		queue.queued_mcs.push(mc);
		queue.queued_scripts.push(script);
	}

	public static add_loaded_action_to_queue(mc: MovieClip): void {
		//console.log("add_loaded_action_to_queue", mc.name);
		const queue = FrameScriptManager.get_queue();
		queue.queued_mcs.push(mc);
		queue.queued_scripts.push(null);
	}

	public static add_script_to_queue_pass2(mc: MovieClip, script: any): void {

		//console.log("add_script_to_queue_pass2", mc.name);
		const queue = FrameScriptManager.get_queue();
		(<any>mc.adapter).allowScript = true;
		queue.queued_mcs_pass2.push(mc);
		queue.queued_scripts_pass2.push(script);
	}

	public static execute_as3_constructors_finish_scene(mc: MovieClip): void {
		/**
		 * this gets executed after a timeline-navigation
		 * first execute_as3_constructors_recursiv is called for the mc that was navigated
		 * after that execute_as3_constructors_finish_scene is called for the scene-mc
		 * so that we can continue with the next top-level child that has not yet been processed
		 */
		const children = mc._children;
		for (let i = 0; i < children.length; i++) {
			if (children[i].parent && (<IDisplayObjectAdapter>children[i].adapter).executeConstructor)
				FrameScriptManager.execute_as3_constructors_recursiv(<MovieClip>children[i]);
		}
	}

	public static execute_as3_constructors_recursiv(mc: MovieClip): void {
		/**
		 * when called from advanceFrame, this should iterate all childs and execute constructors
		 *
		 * when called after a navigation command,
		 * this should iterate the navigated object first,
		 * than it should continue with unprocessed top-level children
		 *
		 * this scenegraph:
		 * 	scene
		 * 		- mc1
		 * 			- child1
		 *		- mc2
		 *			- child2
		 *		- mc3
		 *			- child3
		 *
		 * should normally be executed in the same order.
		 * the constructors of childs will be executed from within the super-calls in the parent-constructors
		 * this happens after the parent constructor has initialized the parent properties,
		 * but before the parents custom constructor code has run
		 * so when putting traces in the constructors, the order in which the traces appear is this:
		 * - child1 - start constructor
		 * - child1 - end constructor
		 * - mc1 - start constructor
		 * - mc1 - end constructor
		 * - chidl2 - start constructor
		 * - chidl2 - end constructor
		 * - mc2 - start constructor
		 * - mc2 - end constructor
		 * - child3 - start constructor
		 * - child3 - end constructor
		 * - mc3 - start constructor
		 * - mc3 - end constructor
		 *
		 * now when we have a timeline navigation called from for example constructor of mc1
		 *
		 * after the timeline navigation, it will first process new constructors added for the new frame we navigated too
		 * it will than continue to work of top-level childs that have not been processed yet
		 * so the order should look like this:
		 * - child1 - start constructor
		 * - child1 - end constructor
		 * - mc1 - start constructor (calls timeline navigation on itself - gotoAndStop(2))
		 * 		- child1.2 (on frame 2) - start constructor
		 * 		- child1.2 (on frame 2) - end constructor
		 * 		- chidl2 - start constructor
		 * 		- chidl2 - end constructor
		 * 		- mc2 - start constructor
		 *		- mc2 - end constructor
		 *		- child3 - start constructor
		 *		- child3 - end constructor
		 *		- mc3 - start constructor
		 *		- mc3 - end constructor
		 * 	- mc1 - end constructor
		 *
		 */

		const mcadapter = mc.adapter;
		const constructorFunc = (<IDisplayObjectAdapter>mcadapter).executeConstructor;
		if (constructorFunc) {
			// constructor has not run yet. will run constructors of all childs aswell
			(<IDisplayObjectAdapter>mcadapter).executeConstructor = null;
			constructorFunc();
		} else {
			// constructor already has run. we need to still do recursion on childs
			const children = mc._children;
			for (let i = 0; i < children.length; i++) {
				if (children[i].parent)
					FrameScriptManager.execute_as3_constructors_recursiv(<MovieClip>children[i]);
			}
		}

		// if mc was created by timeline, instanceID != ""
		if ((<any>mc).just_added_to_timeline && mc.instanceID != '' && mcadapter && (<any>mcadapter).dispatchStaticEvent) {

			(<any>mcadapter).dispatchStaticEvent('added', mcadapter);
			(<any>mc).just_added_to_timeline = false;
			mc.hasDispatchedAddedToStage = mc.isOnDisplayList();
			if (mc.hasDispatchedAddedToStage)
				(<any>mcadapter).dispatchStaticEvent('addedToStage', mcadapter);
			// 	todo: this does not dispatch ADDED and ADDED_TO_STAGE on SHAPE,
			//	because in awayjs timeline Shape are Sprite without any as3-adapter
		}
	}

	// todo: better / faster way to check if a obj is currently on stage
	public static isOnStage(mc: DisplayObject): boolean {
		let parent = mc;
		while (parent && !parent.isAVMScene) {
			parent = parent.parent;
		}
		if (parent && parent.isAVMScene)
			return true;
		return false;
	}

	public static execute_avm1_constructors(): void {

		const queue = FrameScriptManager.get_queue();

		if (queue.queued_mcs.length == 0 && queue.queued_mcs_pass2.length == 0)
			return;

		let i = queue.queued_mcs_pass2.length;
		while (i > 0) {
			i--;
			queue.queued_mcs.push(queue.queued_mcs_pass2[i]);
			queue.queued_scripts.push(queue.queued_scripts_pass2[i]);
		}
		queue.queued_mcs_pass2.length = 0;
		queue.queued_scripts_pass2.length = 0;

		const queues_tmp: any[] = queue.queued_mcs;

		let mc: MovieClip;

		if (FrameScriptManager.useAVM1) {
			i = queues_tmp.length;
			while (i > 0) {
				i--;
				mc = queues_tmp[i];
				if (!FrameScriptManager.isOnStage(mc))
					continue;

				if ((<any>mc).onInitialize) {
					const myFunc = (<any>mc).onInitialize;
					(<any>mc).onInitialize = null;
					myFunc();
				}
			}
			for (i = 0; i < queues_tmp.length; i++) {
				mc = queues_tmp[i];
				if (!FrameScriptManager.isOnStage(mc))
					continue;
				// onClipEvent (construct) comes before class-constructor
				if ((<any>mc).onConstruct) {
					const myFunc = (<any>mc).onConstruct;
					(<any>mc).onConstruct = null;
					myFunc();
				}
				// class-constructor
				const constructorFunc = (<IDisplayObjectAdapter>mc.adapter).executeConstructor;
				if (constructorFunc) {
					(<IDisplayObjectAdapter>mc.adapter).executeConstructor = null;
					//console.log(randomVal, "call constructor for ", mc.parent.name, mc.name);
					constructorFunc();
				}
			}
		}

	}

	public static execute_queue(): void {

		const queue = FrameScriptManager.get_queue();
		if (queue.queued_mcs.length == 0 && queue.queued_mcs_pass2.length == 0)
			return;

		const queues_tmp: any[] = queue.queued_mcs.concat();
		const queues_scripts_tmp: any[] = queue.queued_scripts.concat();
		queue.queued_mcs.length = 0;
		queue.queued_scripts.length = 0;

		let i = queue.queued_mcs_pass2.length;
		while (i > 0) {
			i--;
			queues_tmp.push(queue.queued_mcs_pass2[i]);
			queues_scripts_tmp.push(queue.queued_scripts_pass2[i]);
		}
		queue.queued_mcs_pass2.length = 0;
		queue.queued_scripts_pass2.length = 0;

		let mc: MovieClip;

		if (FrameScriptManager.useAVM1) {
			// first we need to execute all onclipEvent(initialize)
			for (i = 0; i < queues_tmp.length; i++) {
				mc = queues_tmp[i];
				// ignore objects that are not on stage
				if (!FrameScriptManager.isOnStage(mc))
					continue;
				if ((<any>mc).onInitialize) {
					const myFunc = (<any>mc).onInitialize;
					(<any>mc).onInitialize = null;
					myFunc();
				}
			}
			// second we execute onClipEvent (construct) and class-constructors
			for (i = 0; i < queues_tmp.length; i++) {
				mc = queues_tmp[i];
				// ignore objects that are not on stage
				if (!FrameScriptManager.isOnStage(mc))
					continue;

				if ((<any>mc).onConstruct) {
					const myFunc = (<any>mc).onConstruct;
					(<any>mc).onConstruct = null;
					myFunc();
				}

				const constructorFunc = (<IDisplayObjectAdapter>mc.adapter).executeConstructor;
				if (constructorFunc) {
					(<IDisplayObjectAdapter>mc.adapter).executeConstructor = null;
					//console.log(randomVal, "call constructor for ", mc.parent.name, mc.name);
					constructorFunc();
				}
			}
		}
		//console.log("execute scripts")
		for (i = 0; i < queues_tmp.length; i++) {
			mc = queues_tmp[i];
			//console.log("scriptqueue", mc.name);
			if (FrameScriptManager.useAVM1) {
				// ignore objects that are not on stage
				if (!FrameScriptManager.isOnStage(mc))
					continue;
				// execute onclipEvent(loaded)
				if ((<any>mc).onLoaded) {
					const myFunc = (<any>mc).onLoaded;
					(<any>mc).onLoaded = null;
					myFunc();
				}
				// execute onLoad defined as class-property
				if (!(<any>mc.adapter).hasOnLoadExecuted) {
					// i wanted to delete the onLoad property after it has been executed
					// but its a prototype-method, and not sure how to savly delete it
					// thats why i am working with the "hasOnLoadExecuted" for now
					(<any>mc.adapter).hasOnLoadExecuted = true;
					const func = (<any>mc.adapter).alGet('onLoad');
					if (func) {
						func.alCall(mc.adapter);
					}
				}
			}
			if (queues_scripts_tmp[i] != null) {
				mc = queues_tmp[i];
				// only execute scripts for mcs that already had constructors run
				// other framescripts get send back into the queue for being executed in next call to execute_queue
				// in FP10 and above there should always come a execute_queue after processing constructors
				// so after all constructors have been run, all objects should pass this test
				// we cant check for if a executeConstructor exists here, because we only consider a constructor run,
				// once it has processed the super-constructors. not when we actually call the constructor-function
				// (this is because child-constructor do execute from within the super-constructor)
				// for avm1 (<any>mc.adapter).constructorHasRun should always be true
				if (mc && mc.adapter && !(<any>mc.adapter).constructorHasRun) {
					//console.log("mc with contructor - queue script", mc.name)
					queue.queued_mcs.push(mc);
					queue.queued_scripts.push(queues_scripts_tmp[i]);
				} else if (mc && mc.adapter && (<IMovieClipAdapter>mc.adapter).executeScript) {
					//console.log("mc script", mc.name);
					(<IMovieClipAdapter>mc.adapter).executeScript(queues_scripts_tmp[i]);
				} else {
					//console.log("mc ignored", mc.name)
				}
			} else {
				//console.log("script is null", mc.name)
			}

		}
	}

	public static execute_dispose(): void {
		const len: number = this._queued_dispose.length;
		for (let i: number = 0; i < len; i++)
			this._queued_dispose[i].dispose();

		this._queued_dispose.length = 0;
	}
}
export default FrameScriptManager;