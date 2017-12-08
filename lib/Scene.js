"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectContainer_1 = require("./display/DisplayObjectContainer");
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this._objects = new Object();
        _this._views = new Array();
        _this._iCollectionMark = 0;
        _this.mouseEnabled = false;
        _this._iIsRoot = true;
        _this._iIsPartition = true;
        _this._pScene = _this;
        _this._pPartition = _this;
        return _this;
    }
    Object.defineProperty(Scene.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return Scene.assetType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @internal
     */
    Scene.prototype._invalidateEntity = function (entity) {
        this._objects[entity.id] = entity;
        var len = this._views.length;
        for (var i = 0; i < len; i++)
            this._views[i].invalidateEntity(entity);
    };
    /**
     * @internal
     */
    Scene.prototype._clearEntity = function (entity) {
        delete this._objects[entity.id];
        var len = this._views.length;
        for (var i = 0; i < len; i++)
            this._views[i].clearEntity(entity);
    };
    /**
     * @internal
     */
    Scene.prototype._addView = function (view) {
        this._views.push(view);
        for (var key in this._objects)
            view.invalidateEntity(this._objects[key]);
    };
    /**
     * @internal
     */
    Scene.prototype._removeView = function (view) {
        this._views.splice(this._views.indexOf(view), 1);
        for (var key in this._objects)
            view.clearEntity(this._objects[key]);
    };
    return Scene;
}(DisplayObjectContainer_1.DisplayObjectContainer));
Scene.assetType = "[asset Scene]";
exports.Scene = Scene;
