var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetBase = require("awayjs-core/lib/library/AssetBase");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
/**
 * PrefabBase is an abstract base class for prefabs, which are prebuilt display objects that allow easy cloning and updating
 */
var PrefabBase = (function (_super) {
    __extends(PrefabBase, _super);
    //		public _pBatchObjects:Array<BatchObject> = new Array<BatchObject>();
    /**
     * Creates a new PrefabBase object.
     */
    function PrefabBase() {
        _super.call(this);
        this._pObjects = new Array();
    }
    /**
     * Returns a display object generated from this prefab
     */
    PrefabBase.prototype.getNewObject = function () {
        var object = this._pCreateObject();
        this._pObjects.push(object);
        return object;
    };
    //		public getNewBatchObject():BatchObject
    //		{
    //			var object:BatchObject = this._pCreateBatchObject();
    //
    //			this._pBatchObjects.push(object);
    //
    //			return object;
    //		}
    PrefabBase.prototype._pCreateObject = function () {
        throw new AbstractMethodError();
    };
    PrefabBase.prototype._iValidate = function () {
        // To be overridden when necessary
    };
    return PrefabBase;
})(AssetBase);
module.exports = PrefabBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByZWZhYkJhc2UudHMiXSwibmFtZXMiOlsiUHJlZmFiQmFzZSIsIlByZWZhYkJhc2UuY29uc3RydWN0b3IiLCJQcmVmYWJCYXNlLmdldE5ld09iamVjdCIsIlByZWZhYkJhc2UuX3BDcmVhdGVPYmplY3QiLCJQcmVmYWJCYXNlLl9pVmFsaWRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFjLG1DQUFtQyxDQUFDLENBQUM7QUFDbkUsSUFBTyxtQkFBbUIsV0FBWSw0Q0FBNEMsQ0FBQyxDQUFDO0FBSXBGLEFBR0E7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFrQkE7SUFJbENBLHdFQUF3RUE7SUFFdkVBOztPQUVHQTtJQUNIQSxTQVRLQSxVQUFVQTtRQVdkQyxpQkFBT0EsQ0FBQ0E7UUFURkEsY0FBU0EsR0FBd0JBLElBQUlBLEtBQUtBLEVBQWlCQSxDQUFDQTtJQVVuRUEsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLGlDQUFZQSxHQUFuQkE7UUFFQ0UsSUFBSUEsTUFBTUEsR0FBaUJBLElBQUlBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1FBRWpEQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUU1QkEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7SUFDZkEsQ0FBQ0E7SUFFRkYsMENBQTBDQTtJQUMxQ0EsS0FBS0E7SUFDTEEseURBQXlEQTtJQUN6REEsRUFBRUE7SUFDRkEsc0NBQXNDQTtJQUN0Q0EsRUFBRUE7SUFDRkEsbUJBQW1CQTtJQUNuQkEsS0FBS0E7SUFFR0EsbUNBQWNBLEdBQXJCQTtRQUVDRyxNQUFNQSxJQUFJQSxtQkFBbUJBLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUVNSCwrQkFBVUEsR0FBakJBO1FBRUNJLGtDQUFrQ0E7SUFDbkNBLENBQUNBO0lBQ0ZKLGlCQUFDQTtBQUFEQSxDQTVDQSxBQTRDQ0EsRUE1Q3dCLFNBQVMsRUE0Q2pDO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6InByZWZhYnMvUHJlZmFiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNzZXRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldEJhc2VcIik7XHJcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcclxuXHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcclxuXHJcbi8qKlxyXG4gKiBQcmVmYWJCYXNlIGlzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIHByZWZhYnMsIHdoaWNoIGFyZSBwcmVidWlsdCBkaXNwbGF5IG9iamVjdHMgdGhhdCBhbGxvdyBlYXN5IGNsb25pbmcgYW5kIHVwZGF0aW5nXHJcbiAqL1xyXG5jbGFzcyBQcmVmYWJCYXNlIGV4dGVuZHMgQXNzZXRCYXNlXHJcbntcclxuXHRwdWJsaWMgX3BPYmplY3RzOkFycmF5PERpc3BsYXlPYmplY3Q+ID0gbmV3IEFycmF5PERpc3BsYXlPYmplY3Q+KCk7XHJcblxyXG4vL1x0XHRwdWJsaWMgX3BCYXRjaE9iamVjdHM6QXJyYXk8QmF0Y2hPYmplY3Q+ID0gbmV3IEFycmF5PEJhdGNoT2JqZWN0PigpO1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IFByZWZhYkJhc2Ugb2JqZWN0LlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhIGRpc3BsYXkgb2JqZWN0IGdlbmVyYXRlZCBmcm9tIHRoaXMgcHJlZmFiXHJcblx0ICovXHJcblx0cHVibGljIGdldE5ld09iamVjdCgpOkRpc3BsYXlPYmplY3RcclxuXHR7XHJcblx0XHR2YXIgb2JqZWN0OkRpc3BsYXlPYmplY3QgPSB0aGlzLl9wQ3JlYXRlT2JqZWN0KCk7XHJcblxyXG5cdFx0dGhpcy5fcE9iamVjdHMucHVzaChvYmplY3QpO1xyXG5cclxuXHRcdHJldHVybiBvYmplY3Q7XHJcblx0fVxyXG5cclxuLy9cdFx0cHVibGljIGdldE5ld0JhdGNoT2JqZWN0KCk6QmF0Y2hPYmplY3RcclxuLy9cdFx0e1xyXG4vL1x0XHRcdHZhciBvYmplY3Q6QmF0Y2hPYmplY3QgPSB0aGlzLl9wQ3JlYXRlQmF0Y2hPYmplY3QoKTtcclxuLy9cclxuLy9cdFx0XHR0aGlzLl9wQmF0Y2hPYmplY3RzLnB1c2gob2JqZWN0KTtcclxuLy9cclxuLy9cdFx0XHRyZXR1cm4gb2JqZWN0O1xyXG4vL1x0XHR9XHJcblxyXG5cdHB1YmxpYyBfcENyZWF0ZU9iamVjdCgpOkRpc3BsYXlPYmplY3RcclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pVmFsaWRhdGUoKVxyXG5cdHtcclxuXHRcdC8vIFRvIGJlIG92ZXJyaWRkZW4gd2hlbiBuZWNlc3NhcnlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFByZWZhYkJhc2U7Il19