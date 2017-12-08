"use strict";
var core_1 = require("@awayjs/core");
var graphics_1 = require("@awayjs/graphics");
var HierarchicalProperties_1 = require("../base/HierarchicalProperties");
var MovieClip_1 = require("../display/MovieClip");
var FrameScriptManager_1 = require("../managers/FrameScriptManager");
var Timeline = (function () {
    function Timeline() {
        this._functions = [];
        this._update_indices = [];
        this.numKeyFrames = 0;
        this.keyframe_indices = [];
        this.graphicsPool = {};
        this.audioPool = {};
        this.potentialPrototypesInitEventsMap = {};
        this._potentialPrototypes = [];
        this._labels = {};
        this._framescripts = {};
        this._framescripts_translated = {};
        this.avm1framescripts = {};
        this.avm1framescripts_translated = {};
        //cache functions
        this._functions[1] = this.update_mtx_all;
        this._functions[2] = this.update_colortransform;
        this._functions[3] = this.update_masks;
        this._functions[4] = this.update_name;
        this._functions[5] = this.update_button_name;
        this._functions[6] = this.update_visibility;
        this._functions[7] = this.update_blendmode;
        this._functions[8] = this.update_rendermode;
        this._functions[11] = this.update_mtx_scale_rot;
        this._functions[12] = this.update_mtx_pos;
        this._functions[200] = this.enable_maskmode;
        this._functions[201] = this.remove_masks;
        this._functions[202] = this.swap_graphics;
        this._functions[203] = this.set_ratio;
        this._functions[204] = this.start_audio;
    }
    Timeline.prototype.init = function () {
        if ((this.frame_command_indices == null) || (this.frame_recipe == null) || (this.keyframe_durations == null))
            return;
        this.keyframe_firstframes = [];
        this.keyframe_constructframes = [];
        var frame_cnt = 0;
        var ic = 0;
        var ic2 = 0;
        var keyframe_cnt = 0;
        var last_construct_frame = 0;
        for (ic = 0; ic < this.numKeyFrames; ic++) {
            var duration = this.keyframe_durations[(ic)];
            if (this.frame_recipe[ic] & 1)
                last_construct_frame = keyframe_cnt;
            this.keyframe_firstframes[keyframe_cnt] = frame_cnt;
            this.keyframe_constructframes[keyframe_cnt++] = last_construct_frame;
            for (ic2 = 0; ic2 < duration; ic2++)
                this.keyframe_indices[frame_cnt++] = ic;
        }
    };
    Timeline.prototype.get_framescript = function (keyframe_index) {
        if (this._framescripts[keyframe_index] == null)
            return "";
        if (typeof this._framescripts[keyframe_index] == "string")
            return this._framescripts[keyframe_index];
        else {
            throw new Error("Framescript is already translated to Function!!!");
        }
    };
    Timeline.prototype.add_framescript = function (value, keyframe_index) {
        if (FrameScriptManager_1.FrameScriptManager.frameScriptDebug) {
            // if we are in debug mode, we try to extract the function name from the first line of framescript code,
            // and check if this function is available on the object that is set as frameScriptDebug
            // try to get the functions name (it should be the first line as comment)
            var functionname = value.split(/[\r\n]+/g)[0].split("//")[1];
            if (FrameScriptManager_1.FrameScriptManager.frameScriptDebug[functionname]) {
                this._framescripts[keyframe_index] = FrameScriptManager_1.FrameScriptManager.frameScriptDebug[functionname];
                this._framescripts_translated[keyframe_index] = true;
                return;
            }
            else {
                throw new Error("Framescript could not be found on FrameScriptManager.frameScriptDebug.\n the Object set as FrameScriptmanager.frameScriptDebug should contain a function with the name '" + functionname + "' !!!");
            }
        }
        this._framescripts[keyframe_index] = value;
    };
    Timeline.prototype.regexIndexOf = function (str, regex, startpos) {
        var indexOf = str.substring(startpos || 0).search(regex);
        return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
    };
    Timeline.prototype.add_script_for_postcontruct = function (target_mc, keyframe_idx, scriptPass1) {
        if (scriptPass1 === void 0) { scriptPass1 = false; }
        if (this._framescripts[keyframe_idx] != null) {
            if (this._framescripts_translated[keyframe_idx] == null) {
                this._framescripts[keyframe_idx] = target_mc.adapter.evalScript(this._framescripts[keyframe_idx]);
                this._framescripts_translated[keyframe_idx] = true;
            }
            if (scriptPass1)
                FrameScriptManager_1.FrameScriptManager.add_script_to_queue(target_mc, this._framescripts[keyframe_idx]);
            else
                FrameScriptManager_1.FrameScriptManager.add_script_to_queue_pass2(target_mc, this._framescripts[keyframe_idx]);
        }
        if (this.avm1framescripts[target_mc.currentFrameIndex] != null) {
            MovieClip_1.MovieClip.avm1ScriptQueue.push(target_mc);
        }
    };
    Object.defineProperty(Timeline.prototype, "numFrames", {
        get: function () {
            return this.keyframe_indices.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "potentialPrototypes", {
        get: function () {
            return this._potentialPrototypes;
        },
        enumerable: true,
        configurable: true
    });
    Timeline.prototype.getPotentialChildPrototype = function (id) {
        return this._potentialPrototypes[id];
    };
    Timeline.prototype.getKeyframeIndexForFrameIndex = function (frame_index) {
        return this.keyframe_indices[frame_index];
    };
    Timeline.prototype.getPotentialChildInstance = function (id) {
        var asset = this._potentialPrototypes[id];
        if (asset.isAsset(graphics_1.Graphics)) {
            //(<Graphics>asset).endFill();
            return asset;
        }
        else {
            var clonedInstance = asset.adapter.clone().adaptee;
            if (this.potentialPrototypesInitEventsMap[id]) {
                clonedInstance.adapter.initEvents = this.potentialPrototypesInitEventsMap[id];
            }
            return clonedInstance;
        }
    };
    Timeline.prototype.registerPotentialChild = function (prototype) {
        var id = this._potentialPrototypes.length;
        this._potentialPrototypes[id] = prototype;
    };
    Timeline.prototype.jumpToLabel = function (target_mc, label) {
        var key_frame_index = this._labels[label];
        if (key_frame_index >= 0)
            target_mc.currentFrameIndex = this.keyframe_firstframes[key_frame_index];
    };
    Timeline.prototype.gotoFrame = function (target_mc, value, skip_script) {
        if (skip_script === void 0) { skip_script = false; }
        var current_keyframe_idx = target_mc.constructedKeyFrameIndex;
        var target_keyframe_idx = this.keyframe_indices[value];
        if (current_keyframe_idx == target_keyframe_idx)
            return;
        if (current_keyframe_idx + 1 == target_keyframe_idx) {
            this.constructNextFrame(target_mc, !skip_script, true);
            return;
        }
        var break_frame_idx = this.keyframe_constructframes[target_keyframe_idx];
        //we now have 3 index to keyframes: current_keyframe_idx / target_keyframe_idx / break_frame_idx
        var jump_forward = (target_keyframe_idx > current_keyframe_idx);
        var jump_gap = (break_frame_idx > current_keyframe_idx);
        // in case we jump forward, but not jump a gap, we start at current_keyframe_idx + 1
        // in case we jump back or we jump a gap, we want to start constructing at BreakFrame
        var start_construct_idx = (jump_forward && !jump_gap) ? current_keyframe_idx + 1 : break_frame_idx;
        var i;
        var k;
        if (jump_gap)
            for (i = target_mc.numChildren - 1; i >= 0; i--)
                if (target_mc._children[i]._depthID < 0)
                    target_mc.removeChildAt(i);
        //if we jump back, we want to reset all objects (but not the timelines of the mcs)
        if (!jump_forward)
            target_mc.resetSessionIDs();
        // in other cases, we want to collect the current objects to compare state of targetframe with state of currentframe
        var depth_sessionIDs = target_mc.getSessionIDDepths();
        //pass1: only apply add/remove commands into depth_sessionIDs.
        this.pass1(start_construct_idx, target_keyframe_idx, depth_sessionIDs);
        // check what childs are alive on both frames.
        // childs that are not alive anymore get removed and unregistered
        // childs that are alive on both frames have their properties reset if we are jumping back
        var child;
        for (i = target_mc.numChildren - 1; i >= 0; i--) {
            child = target_mc._children[i];
            if (child._depthID < 0) {
                if (depth_sessionIDs[child._depthID] != child._sessionID) {
                    target_mc.removeChildAt(i);
                }
                else if (!jump_forward) {
                    if (child._adapter) {
                        if (!child.adapter.isBlockedByScript()) {
                            child.transform.clearMatrix3D();
                            child.transform.clearColorTransform();
                            //this.name="";
                            child.masks = null;
                            child.maskMode = false;
                        }
                        if (!child.adapter.isVisibilityByScript()) {
                            child.visible = true;
                        }
                    }
                }
            }
        }
        var child1;
        // now we need to addchild the objects that were added before targetframe first
        // than we can add the script of the targetframe
        // than we can addchild objects added on targetframe
        for (var key in depth_sessionIDs) {
            child1 = target_mc.getPotentialChildInstance(this.add_child_stream[depth_sessionIDs[key] * 2]);
            if (child1.isAsset(graphics_1.Graphics)) {
            }
            else {
                child = child1;
                if (child._sessionID == -1)
                    target_mc._addTimelineChildAt(child, Number(key), depth_sessionIDs[key]);
            }
        }
        if (!skip_script && this.keyframe_firstframes[target_keyframe_idx] == value)
            this.add_script_for_postcontruct(target_mc, target_keyframe_idx, true);
        //pass2: apply update commands for objects on stage (only if they are not blocked by script)
        this.pass2(target_mc);
        target_mc.constructedKeyFrameIndex = target_keyframe_idx;
    };
    Timeline.prototype.pass1 = function (start_construct_idx, target_keyframe_idx, depth_sessionIDs) {
        var i;
        var k;
        this._update_indices.length = 0; // store a list of updatecommand_indices, so we dont have to read frame_recipe again
        var update_cnt = 0;
        var start_index;
        var end_index;
        for (k = start_construct_idx; k <= target_keyframe_idx; k++) {
            var frame_command_idx = this.frame_command_indices[k];
            var frame_recipe = this.frame_recipe[k];
            if (frame_recipe & 2) {
                // remove childs
                start_index = this.command_index_stream[frame_command_idx];
                end_index = start_index + this.command_length_stream[frame_command_idx++];
                for (i = start_index; i < end_index; i++)
                    delete depth_sessionIDs[this.remove_child_stream[i] - 16383];
            }
            if (frame_recipe & 4) {
                start_index = this.command_index_stream[frame_command_idx];
                end_index = start_index + this.command_length_stream[frame_command_idx++];
                // apply add commands in reversed order to have script exeucted in correct order.
                // this could be changed in exporter
                for (i = end_index - 1; i >= start_index; i--)
                    depth_sessionIDs[this.add_child_stream[i * 2 + 1] - 16383] = i;
            }
            if (frame_recipe & 8)
                this._update_indices[update_cnt++] = frame_command_idx; // execute update command later
            if (frame_recipe & 16) {
                start_index = this.command_index_stream[frame_command_idx];
                end_index = start_index + this.command_length_stream[frame_command_idx++];
            }
        }
    };
    Timeline.prototype.pass2 = function (target_mc) {
        var k;
        var len = this._update_indices.length;
        for (k = 0; k < len; k++)
            this.update_childs(target_mc, this._update_indices[k]);
    };
    Timeline.prototype.constructNextFrame = function (target_mc, queueScript, scriptPass1) {
        if (queueScript === void 0) { queueScript = true; }
        if (scriptPass1 === void 0) { scriptPass1 = false; }
        var frameIndex = target_mc.currentFrameIndex;
        var new_keyFrameIndex = this.keyframe_indices[frameIndex];
        if (queueScript && this.keyframe_firstframes[new_keyFrameIndex] == frameIndex)
            this.add_script_for_postcontruct(target_mc, new_keyFrameIndex, scriptPass1);
        if (target_mc.constructedKeyFrameIndex != new_keyFrameIndex) {
            target_mc.constructedKeyFrameIndex = new_keyFrameIndex;
            var frame_command_idx = this.frame_command_indices[new_keyFrameIndex];
            var frame_recipe = this.frame_recipe[new_keyFrameIndex];
            if (frame_recipe & 1) {
                for (var i = target_mc.numChildren - 1; i >= 0; i--)
                    if (target_mc._children[i]._depthID < 0)
                        target_mc.removeChildAt(i);
            }
            else if (frame_recipe & 2) {
                this.remove_childs_continous(target_mc, frame_command_idx++);
            }
            if (frame_recipe & 4)
                this.add_childs_continous(target_mc, frame_command_idx++);
            if (frame_recipe & 8)
                this.update_childs(target_mc, frame_command_idx++);
            if (frame_recipe & 16)
                this.start_sounds(target_mc, frame_command_idx++);
        }
    };
    Timeline.prototype.remove_childs_continous = function (sourceMovieClip, frame_command_idx) {
        var start_index = this.command_index_stream[frame_command_idx];
        var end_index = start_index + this.command_length_stream[frame_command_idx];
        for (var i = start_index; i < end_index; i++)
            sourceMovieClip.removeChildAt(sourceMovieClip.getDepthIndexInternal(this.remove_child_stream[i] - 16383));
    };
    // used to add childs when jumping between frames
    Timeline.prototype.add_childs_continous = function (sourceMovieClip, frame_command_idx) {
        // apply add commands in reversed order to have script exeucted in correct order.
        // this could be changed in exporter
        var idx;
        var start_index = this.command_index_stream[frame_command_idx];
        var end_index = start_index + this.command_length_stream[frame_command_idx];
        for (var i = end_index - 1; i >= start_index; i--) {
            idx = i * 2;
            var childAsset = sourceMovieClip.getPotentialChildInstance(this.add_child_stream[idx]);
            if (childAsset.isAsset(graphics_1.Graphics)) {
            }
            else {
                sourceMovieClip._addTimelineChildAt(childAsset, this.add_child_stream[idx + 1] - 16383, i); //this.add_child_stream[idx]);
            }
        }
    };
    Timeline.prototype.start_sounds = function (target_mc, frame_command_idx) {
        var start_index = this.command_index_stream[frame_command_idx];
        var end_index = start_index + this.command_length_stream[frame_command_idx];
        for (var i = start_index; i < end_index; i++) {
            var child = this.audioPool[this.add_sounds_stream[i]];
            child.play(0, false);
        }
    };
    Timeline.prototype.update_childs = function (target_mc, frame_command_idx) {
        var p;
        var props_start_idx;
        var props_end_index;
        var start_index = this.command_index_stream[frame_command_idx];
        var end_index = start_index + this.command_length_stream[frame_command_idx];
        var child;
        for (var i = start_index; i < end_index; i++) {
            child = target_mc.getChildAtSessionID(this.update_child_stream[i]);
            if (child) {
                // check if the child is active + not blocked by script
                this._blocked = Boolean(child._adapter && child.adapter.isBlockedByScript());
                props_start_idx = this.update_child_props_indices_stream[i];
                props_end_index = props_start_idx + this.update_child_props_length_stream[i];
                for (p = props_start_idx; p < props_end_index; p++)
                    this._functions[this.property_type_stream[p]].call(this, child, target_mc, this.property_index_stream[p]);
            }
            else {
                console.log("timeline: child not found");
            }
        }
    };
    Timeline.prototype.update_mtx_all = function (child, target_mc, i) {
        if (this._blocked)
            return;
        i *= 6;
        var new_matrix = child.transform.matrix3D;
        new_matrix._rawData[0] = this.properties_stream_f32_mtx_all[i++];
        new_matrix._rawData[1] = this.properties_stream_f32_mtx_all[i++];
        new_matrix._rawData[4] = this.properties_stream_f32_mtx_all[i++];
        new_matrix._rawData[5] = this.properties_stream_f32_mtx_all[i++];
        new_matrix._rawData[12] = this.properties_stream_f32_mtx_all[i++];
        new_matrix._rawData[13] = this.properties_stream_f32_mtx_all[i];
        child.transform.invalidateComponents();
    };
    Timeline.prototype.update_colortransform = function (child, target_mc, i) {
        if (this._blocked)
            return;
        i *= 8;
        var new_ct = child.transform.colorTransform || (child.transform.colorTransform = new core_1.ColorTransform());
        new_ct._rawData[0] = this.properties_stream_f32_ct[i++];
        new_ct._rawData[1] = this.properties_stream_f32_ct[i++];
        new_ct._rawData[2] = this.properties_stream_f32_ct[i++];
        new_ct._rawData[3] = this.properties_stream_f32_ct[i++];
        new_ct._rawData[4] = this.properties_stream_f32_ct[i++];
        new_ct._rawData[5] = this.properties_stream_f32_ct[i++];
        new_ct._rawData[6] = this.properties_stream_f32_ct[i++];
        new_ct._rawData[7] = this.properties_stream_f32_ct[i];
        child.transform.invalidateColorTransform();
    };
    Timeline.prototype.update_masks = function (child, target_mc, i) {
        // an object could have multiple groups of masks, in case a graphic clip was merged into the timeline
        // this is not implmeented in the runtime yet
        // for now, a second mask-groupd would overwrite the first one
        var mask;
        var masks = new Array();
        var numMasks = this.properties_stream_int[i++];
        //mask may not exist if a goto command moves the playhead to a point in the timeline after
        //one of the masks in a mask array has already been removed. Therefore a check is needed.
        for (var m = 0; m < numMasks; m++)
            if ((mask = target_mc.getChildAtSessionID(this.properties_stream_int[i++])))
                masks.push(mask);
        child.masks = masks;
    };
    Timeline.prototype.update_name = function (child, target_mc, i) {
        child.name = this.properties_stream_strings[i];
        target_mc.adapter.registerScriptObject(child);
    };
    Timeline.prototype.update_button_name = function (target, sourceMovieClip, i) {
        target.name = this.properties_stream_strings[i];
        // todo: creating the buttonlistenrs later should also be done, but for icycle i dont think this will cause problems
        target.addButtonListeners();
        sourceMovieClip.adapter.registerScriptObject(target);
    };
    Timeline.prototype.update_visibility = function (child, target_mc, i) {
        if (!child._adapter || !child.adapter.isVisibilityByScript())
            child.visible = Boolean(i);
    };
    Timeline.prototype.update_mtx_scale_rot = function (child, target_mc, i) {
        if (this._blocked)
            return;
        i *= 4;
        var new_matrix = child.transform.matrix3D;
        new_matrix._rawData[0] = this.properties_stream_f32_mtx_scale_rot[i++];
        new_matrix._rawData[1] = this.properties_stream_f32_mtx_scale_rot[i++];
        new_matrix._rawData[4] = this.properties_stream_f32_mtx_scale_rot[i++];
        new_matrix._rawData[5] = this.properties_stream_f32_mtx_scale_rot[i];
        child.transform.invalidateComponents();
        child.pInvalidateHierarchicalProperties(HierarchicalProperties_1.HierarchicalProperties.SCENE_TRANSFORM);
    };
    Timeline.prototype.update_mtx_pos = function (child, target_mc, i) {
        if (this._blocked)
            return;
        i *= 2;
        var new_matrix = child.transform.matrix3D;
        new_matrix._rawData[12] = this.properties_stream_f32_mtx_pos[i++];
        new_matrix._rawData[13] = this.properties_stream_f32_mtx_pos[i];
        child.transform.invalidatePosition();
    };
    Timeline.prototype.enable_maskmode = function (child, target_mc, i) {
        child.maskMode = true;
    };
    Timeline.prototype.remove_masks = function (child, target_mc, i) {
        child.masks = null;
    };
    Timeline.prototype.swap_graphics = function (child, target_mc, i) {
        var myGraphics = this.graphicsPool[this.properties_stream_int[i]];
        //console.log("frame:", target_mc.currentFrameIndex ,"swap graphics: ", target_mc.id, i, myGraphics.id);
        child.graphics.clear();
        child.graphics.copyFrom(myGraphics);
    };
    Timeline.prototype.start_audio = function (child, target_mc, i) {
    };
    Timeline.prototype.set_ratio = function (child, target_mc, i) {
        child.setRatio(this.properties_stream_int[i] / 0xffff);
    };
    Timeline.prototype.update_blendmode = function (child, target_mc, i) {
        console.log("update blendmode " + i);
    };
    Timeline.prototype.update_rendermode = function (child, target_mc, i) {
        console.log("update rendermode " + i);
    };
    return Timeline;
}());
exports.Timeline = Timeline;
