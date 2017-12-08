"use strict";
var FrameScriptManager = (function () {
    function FrameScriptManager() {
    }
    FrameScriptManager.setInterval = function (func) {
        this._intervalID++;
        this._active_intervals[this._intervalID] = func;
        return this._intervalID;
    };
    FrameScriptManager.clearInterval = function (id) {
        delete this._active_intervals[id];
    };
    FrameScriptManager.execute_intervals = function () {
        for (var key in this._active_intervals) {
            this._active_intervals[key].call();
        }
    };
    FrameScriptManager.add_child_to_dispose = function (child) {
        this._queued_dispose.push(child);
    };
    FrameScriptManager.add_script_to_queue = function (mc, script) {
        // whenever we queue scripts of new objects, we first inject the lists of pass2
        var i = this._queued_mcs_pass2.length;
        while (i--) {
            this._queued_mcs.push(this._queued_mcs_pass2[i]);
            this._queued_scripts.push(this._queued_scripts_pass2[i]);
        }
        this._queued_mcs_pass2.length = 0;
        this._queued_scripts_pass2.length = 0;
        this._queued_mcs.push(mc);
        this._queued_scripts.push(script);
    };
    FrameScriptManager.add_script_to_queue_pass2 = function (mc, script) {
        this._queued_mcs_pass2.push(mc);
        this._queued_scripts_pass2.push(script);
    };
    FrameScriptManager.execute_queue = function () {
        if (this._queued_mcs.length == 0 && this._queued_mcs_pass2.length == 0)
            return;
        var i = this._queued_mcs_pass2.length;
        while (i--) {
            this._queued_mcs.push(this._queued_mcs_pass2[i]);
            this._queued_scripts.push(this._queued_scripts_pass2[i]);
        }
        this._queued_mcs_pass2.length = 0;
        this._queued_scripts_pass2.length = 0;
        var mc;
        for (i = 0; i < this._queued_mcs.length; i++) {
            // during the loop we might add more scripts to the queue
            mc = this._queued_mcs[i];
            if (mc.scene != null) {
                //	try {
                this._queued_scripts[i].call(mc.adapter);
            }
        }
        // all scripts executed. clear all
        this._queued_mcs.length = 0;
        this._queued_scripts.length = 0;
    };
    FrameScriptManager.execute_dispose = function () {
        /*
        var len:number = this._queued_dispose.length;
        for (var i:number = 0; i < len; i++)
            this._queued_dispose[i].dispose();

        this._queued_dispose.length = 0;
        */
    };
    return FrameScriptManager;
}());
// FrameScript debugging:
// the first line of a FrameScript should be a comment that represents the functions unique name
// the exporter creates a js file, containing a object that has the framescripts functions set as properties according to the unique names
// this object can be set as "frameScriptDebug" in order to enable debug mode
FrameScriptManager.frameScriptDebug = undefined;
//queue of objects for disposal
FrameScriptManager._queued_dispose = new Array();
// queues pass1 of scripts.
FrameScriptManager._queued_mcs = [];
FrameScriptManager._queued_scripts = [];
// queues pass2 of scripts. this will be inserted in reversed order into pass1 queue right before something should be added to pass1
FrameScriptManager._queued_mcs_pass2 = [];
FrameScriptManager._queued_scripts_pass2 = [];
FrameScriptManager._active_intervals = new Object(); // maps id to function
FrameScriptManager._intervalID = 0;
exports.FrameScriptManager = FrameScriptManager;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FrameScriptManager;
