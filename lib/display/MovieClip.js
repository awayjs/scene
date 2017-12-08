"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("@awayjs/core");
var graphics_1 = require("@awayjs/graphics");
var Timeline_1 = require("../base/Timeline");
var MouseEvent_1 = require("../events/MouseEvent");
var FrameScriptManager_1 = require("../managers/FrameScriptManager");
var Sprite_1 = require("./Sprite");
var TextField_1 = require("./TextField");
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip(timeline) {
        if (timeline === void 0) { timeline = null; }
        var _this = _super.call(this) || this;
        _this._isButton = false;
        _this._time = 0; // the current time inside the animation
        _this._currentFrameIndex = -1; // the current frame
        _this._isPlaying = true; // false if paused or stopped
        _this._isInit = true;
        _this._potentialInstances = [];
        _this._depth_sessionIDs = {};
        _this._sessionID_childs = {};
        /**
         *
         */
        _this.loop = true;
        /**
         * the current index of the current active frame
         */
        _this.constructedKeyFrameIndex = -1;
        _this.cursorType = "pointer";
        _this._enterFrame = new core_1.AssetEvent(core_1.AssetEvent.ENTER_FRAME, _this);
        _this.inheritColorTransform = true;
        // todo: allow to set cursor-types for movieclip
        _this._onMouseOver = function (event) {
            document.body.style.cursor = "pointer";
            _this.currentFrameIndex = 1;
        };
        _this._onMouseOut = function (event) {
            document.body.style.cursor = "initial";
            _this.currentFrameIndex = 0;
        };
        _this._onMouseDown = function (event) {
            document.body.style.cursor = "initial";
            _this.currentFrameIndex = 2;
        };
        _this._onMouseUp = function (event) {
            document.body.style.cursor = "initial";
            _this.currentFrameIndex = _this.currentFrameIndex == 0 ? 0 : 1;
        };
        _this._timeline = timeline || new Timeline_1.Timeline();
        return _this;
    }
    MovieClip.getNewMovieClip = function (timeline) {
        if (timeline === void 0) { timeline = null; }
        return (MovieClip._movieClips.length) ? MovieClip._movieClips.pop() : new MovieClip(timeline);
    };
    MovieClip.prototype.registerScriptObject = function (child) {
        this[child.name] = child;
        if (child.isAsset(MovieClip))
            child.removeButtonListeners();
    };
    MovieClip.prototype.unregisterScriptObject = function (child) {
        delete this[child.name];
        if (child.isAsset(MovieClip))
            child.removeButtonListeners();
    };
    MovieClip.prototype.dispose = function () {
        this.disposeValues();
        MovieClip._movieClips.push(this);
    };
    MovieClip.prototype.disposeValues = function () {
        _super.prototype.disposeValues.call(this);
        this._potentialInstances = [];
        this._depth_sessionIDs = {};
        this._sessionID_childs = {};
    };
    MovieClip.prototype.reset_textclones = function () {
        if (this.timeline) {
            var len = this._potentialInstances.length;
            for (var i = 0; i < len; i++) {
                if (this._potentialInstances[i] != null) {
                    if (this._potentialInstances[i].isAsset(TextField_1.TextField))
                        this._potentialInstances[i].text = this.timeline.getPotentialChildPrototype(i).text;
                    else if (this._potentialInstances[i].isAsset(MovieClip))
                        this._potentialInstances[i].reset_textclones();
                }
            }
        }
    };
    Object.defineProperty(MovieClip.prototype, "buttonMode", {
        get: function () {
            return this._isButton;
        },
        set: function (value) {
            this._isButton = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "isInit", {
        get: function () {
            return this._isInit;
        },
        set: function (value) {
            this._isInit = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "timeline", {
        get: function () {
            return this._timeline;
        },
        set: function (value) {
            this._timeline = value;
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "numFrames", {
        get: function () {
            return this._timeline.numFrames;
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.jumpToLabel = function (label) {
        // the timeline.jumpTolabel will set currentFrameIndex
        this._timeline.jumpToLabel(this, label);
    };
    MovieClip.prototype.reset = function () {
        _super.prototype.reset.call(this);
        // time only is relevant for the root mc, as it is the only one that executes the update function
        this._time = 0;
        if (this._adapter)
            this.adapter.freeFromScript();
        this.constructedKeyFrameIndex = -1;
        for (var i = this.numChildren - 1; i >= 0; i--)
            this.removeChildAt(i);
        this._skipAdvance = MovieClip._skipAdvance;
        var numFrames = this._timeline.keyframe_indices.length;
        this._isPlaying = Boolean(numFrames > 1);
        if (numFrames) {
            this._currentFrameIndex = 0;
            this._timeline.constructNextFrame(this, true, true);
        }
        else {
            this._currentFrameIndex = -1;
        }
    };
    MovieClip.prototype.resetSessionIDs = function () {
        this._depth_sessionIDs = {};
    };
    Object.defineProperty(MovieClip.prototype, "currentFrameIndex", {
        /*
        * Setting the currentFrameIndex will move the playhead for this movieclip to the new position
         */
        get: function () {
            return this._currentFrameIndex;
        },
        set: function (value) {
            //if currentFrame is set greater than the available number of
            //frames, the playhead is moved to the last frame in the timeline.
            //But because the frame specified was not a keyframe, no scripts are
            //executed, even if they exist on the last frame.
            var skip_script = false;
            var numFrames = this._timeline.keyframe_indices.length;
            if (!numFrames)
                return;
            if (value < 0) {
                value = 0;
            }
            else if (value >= numFrames) {
                value = numFrames - 1;
                skip_script = true;
            }
            if (this._currentFrameIndex == value)
                return;
            this._currentFrameIndex = value;
            //changing current frame will ignore advance command for that
            //update's advanceFrame function, unless advanceFrame has
            //already been executed
            this._skipAdvance = MovieClip._skipAdvance;
            this._timeline.gotoFrame(this, value, skip_script);
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.addButtonListeners = function () {
        this._isButton = true;
        this.stop();
        this.addEventListener(MouseEvent_1.MouseEvent.MOUSE_OVER, this._onMouseOver);
        this.addEventListener(MouseEvent_1.MouseEvent.MOUSE_OUT, this._onMouseOut);
        this.addEventListener(MouseEvent_1.MouseEvent.MOUSE_DOWN, this._onMouseDown);
        this.addEventListener(MouseEvent_1.MouseEvent.MOUSE_UP, this._onMouseUp);
    };
    MovieClip.prototype.removeButtonListeners = function () {
        this.removeEventListener(MouseEvent_1.MouseEvent.MOUSE_OVER, this._onMouseOver);
        this.removeEventListener(MouseEvent_1.MouseEvent.MOUSE_OUT, this._onMouseOut);
        this.removeEventListener(MouseEvent_1.MouseEvent.MOUSE_DOWN, this._onMouseDown);
        this.removeEventListener(MouseEvent_1.MouseEvent.MOUSE_UP, this._onMouseUp);
    };
    MovieClip.prototype.getChildAtSessionID = function (sessionID) {
        return this._sessionID_childs[sessionID];
    };
    MovieClip.prototype.getSessionIDDepths = function () {
        return this._depth_sessionIDs;
    };
    MovieClip.prototype.addChildAtDepth = function (child, depth, replace) {
        if (replace === void 0) { replace = true; }
        child.reset(); // this takes care of transform and visibility
        return _super.prototype.addChildAtDepth.call(this, child, depth, replace);
    };
    MovieClip.prototype._addTimelineChildAt = function (child, depth, sessionID) {
        this._depth_sessionIDs[depth] = child._sessionID = sessionID;
        this._sessionID_childs[sessionID] = child;
        return this.addChildAtDepth(child, depth);
    };
    MovieClip.prototype.removeChildAtInternal = function (index) {
        var child = this._children[index];
        if (child._adapter)
            child.adapter.freeFromScript();
        this.adapter.unregisterScriptObject(child);
        //check to make sure _depth_sessionIDs wasn't modified with a new child
        if (this._depth_sessionIDs[child._depthID] == child._sessionID)
            delete this._depth_sessionIDs[child._depthID];
        delete this._sessionID_childs[child._sessionID];
        child._sessionID = -1;
        return _super.prototype.removeChildAtInternal.call(this, index);
    };
    Object.defineProperty(MovieClip.prototype, "assetType", {
        get: function () {
            return MovieClip.assetType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Starts playback of animation from current position
     */
    MovieClip.prototype.play = function () {
        if (this._timeline.keyframe_indices.length > 1)
            this._isPlaying = true;
    };
    /**
     * should be called right before the call to away3d-render.
     */
    MovieClip.prototype.update = function (events) {
        //if events is null, this is as2, if it is not null, this is as3web
        if (events === void 0) { events = null; }
        MovieClip._skipAdvance = true;
        if (events != null) {
            this.adapter.dispatchEvent(events[0]);
        }
        this.advanceFrame();
        MovieClip._skipAdvance = false;
        // after we advanced the scenegraph, we might have some script that needs executing
        FrameScriptManager_1.FrameScriptManager.execute_queue();
        //this.dispatchEvent(this._enterFrame);
        // after we executed the onEnter, we might have some script that needs executing
        FrameScriptManager_1.FrameScriptManager.execute_queue();
        // now we execute any intervals queued
        FrameScriptManager_1.FrameScriptManager.execute_intervals();
        // finally, we execute any scripts that were added from intervals
        FrameScriptManager_1.FrameScriptManager.execute_queue();
        //execute any disposes as a result of framescripts
        FrameScriptManager_1.FrameScriptManager.execute_dispose();
        if (events != null) {
            this.adapter.dispatchEvent(events[1]);
        }
    };
    MovieClip.prototype.getPotentialChildInstance = function (id) {
        if (!this._potentialInstances[id])
            this._potentialInstances[id] = this._timeline.getPotentialChildInstance(id);
        return this._potentialInstances[id];
    };
    /**
     * Stop playback of animation and hold current position
     */
    MovieClip.prototype.stop = function () {
        this._isPlaying = false;
    };
    MovieClip.prototype.clone = function () {
        var newInstance = MovieClip.getNewMovieClip(this._timeline);
        this.copyTo(newInstance);
        return newInstance;
    };
    MovieClip.prototype.copyTo = function (newInstance) {
        _super.prototype.copyTo.call(this, newInstance);
        newInstance.timeline = this._timeline;
        newInstance.loop = this.loop;
    };
    MovieClip.prototype.advanceFrame = function () {
        if (this._isPlaying && !this._skipAdvance) {
            if (this._currentFrameIndex == this._timeline.keyframe_indices.length - 1) {
                if (this.loop)
                    this.currentFrameIndex = 0;
                else
                    this._isPlaying = false;
            }
            else {
                this._currentFrameIndex++;
                this._timeline.constructNextFrame(this);
            }
        }
        var len = this._children.length;
        var child;
        for (var i = 0; i < len; ++i) {
            child = this._children[i];
            if (child.isAsset(MovieClip))
                child.advanceFrame();
        }
        //80pro temp this.dispatchEvent(this._enterFrame);
        this._skipAdvance = false;
    };
    // DEBUG CODE:
    MovieClip.prototype.logHierarchy = function (depth) {
        if (depth === void 0) { depth = 0; }
        this.printHierarchyName(depth, this);
        var len = this._children.length;
        var child;
        for (var i = 0; i < len; i++) {
            child = this._children[i];
            if (child.isAsset(MovieClip))
                child.logHierarchy(depth + 1);
            else
                this.printHierarchyName(depth + 1, child);
        }
    };
    MovieClip.prototype.printHierarchyName = function (depth, target) {
        var str = "";
        for (var i = 0; i < depth; ++i)
            str += "--";
        str += " " + target.name + " = " + target.id;
        console.log(str);
    };
    MovieClip.prototype.clear = function () {
        //clear out potential instances
        var len = this._potentialInstances.length;
        for (var i = 0; i < len; i++) {
            var instance = this._potentialInstances[i];
            //only dispose instances that are not used in script ie. do not have an instance name
            if (instance && instance.name == "") {
                if (!instance.isAsset(graphics_1.Graphics)) {
                    FrameScriptManager_1.FrameScriptManager.add_child_to_dispose(instance);
                }
                delete this._potentialInstances[i];
            }
        }
        _super.prototype.clear.call(this);
    };
    return MovieClip;
}(Sprite_1.Sprite));
MovieClip.avm1ScriptQueue = [];
MovieClip._movieClips = new Array();
MovieClip.assetType = "[asset MovieClip]";
exports.MovieClip = MovieClip;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MovieClip;
