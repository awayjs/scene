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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByZWZhYkJhc2UudHMiXSwibmFtZXMiOlsiUHJlZmFiQmFzZSIsIlByZWZhYkJhc2UuY29uc3RydWN0b3IiLCJQcmVmYWJCYXNlLmdldE5ld09iamVjdCIsIlByZWZhYkJhc2UuX3BDcmVhdGVPYmplY3QiLCJQcmVmYWJCYXNlLl9pVmFsaWRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFjLG1DQUFtQyxDQUFDLENBQUM7QUFDbkUsSUFBTyxtQkFBbUIsV0FBWSw0Q0FBNEMsQ0FBQyxDQUFDO0FBSXBGLEFBR0E7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFrQkE7SUFJbENBLHdFQUF3RUE7SUFFdkVBOztPQUVHQTtJQUNIQSxTQVRLQSxVQUFVQTtRQVdkQyxpQkFBT0EsQ0FBQ0E7UUFURkEsY0FBU0EsR0FBd0JBLElBQUlBLEtBQUtBLEVBQWlCQSxDQUFDQTtJQVVuRUEsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLGlDQUFZQSxHQUFuQkE7UUFFQ0UsSUFBSUEsTUFBTUEsR0FBaUJBLElBQUlBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1FBRWpEQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUU1QkEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7SUFDZkEsQ0FBQ0E7SUFFRkYsMENBQTBDQTtJQUMxQ0EsS0FBS0E7SUFDTEEseURBQXlEQTtJQUN6REEsRUFBRUE7SUFDRkEsc0NBQXNDQTtJQUN0Q0EsRUFBRUE7SUFDRkEsbUJBQW1CQTtJQUNuQkEsS0FBS0E7SUFFR0EsbUNBQWNBLEdBQXJCQTtRQUVDRyxNQUFNQSxJQUFJQSxtQkFBbUJBLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUVNSCwrQkFBVUEsR0FBakJBO1FBRUNJLGtDQUFrQ0E7SUFDbkNBLENBQUNBO0lBQ0ZKLGlCQUFDQTtBQUFEQSxDQTVDQSxBQTRDQ0EsRUE1Q3dCLFNBQVMsRUE0Q2pDO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6InByZWZhYnMvUHJlZmFiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNzZXRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldEJhc2VcIik7XG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XG5cbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcblxuLyoqXG4gKiBQcmVmYWJCYXNlIGlzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIHByZWZhYnMsIHdoaWNoIGFyZSBwcmVidWlsdCBkaXNwbGF5IG9iamVjdHMgdGhhdCBhbGxvdyBlYXN5IGNsb25pbmcgYW5kIHVwZGF0aW5nXG4gKi9cbmNsYXNzIFByZWZhYkJhc2UgZXh0ZW5kcyBBc3NldEJhc2Vcbntcblx0cHVibGljIF9wT2JqZWN0czpBcnJheTxEaXNwbGF5T2JqZWN0PiA9IG5ldyBBcnJheTxEaXNwbGF5T2JqZWN0PigpO1xuXG4vL1x0XHRwdWJsaWMgX3BCYXRjaE9iamVjdHM6QXJyYXk8QmF0Y2hPYmplY3Q+ID0gbmV3IEFycmF5PEJhdGNoT2JqZWN0PigpO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IFByZWZhYkJhc2Ugb2JqZWN0LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgZGlzcGxheSBvYmplY3QgZ2VuZXJhdGVkIGZyb20gdGhpcyBwcmVmYWJcblx0ICovXG5cdHB1YmxpYyBnZXROZXdPYmplY3QoKTpEaXNwbGF5T2JqZWN0XG5cdHtcblx0XHR2YXIgb2JqZWN0OkRpc3BsYXlPYmplY3QgPSB0aGlzLl9wQ3JlYXRlT2JqZWN0KCk7XG5cblx0XHR0aGlzLl9wT2JqZWN0cy5wdXNoKG9iamVjdCk7XG5cblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9XG5cbi8vXHRcdHB1YmxpYyBnZXROZXdCYXRjaE9iamVjdCgpOkJhdGNoT2JqZWN0XG4vL1x0XHR7XG4vL1x0XHRcdHZhciBvYmplY3Q6QmF0Y2hPYmplY3QgPSB0aGlzLl9wQ3JlYXRlQmF0Y2hPYmplY3QoKTtcbi8vXG4vL1x0XHRcdHRoaXMuX3BCYXRjaE9iamVjdHMucHVzaChvYmplY3QpO1xuLy9cbi8vXHRcdFx0cmV0dXJuIG9iamVjdDtcbi8vXHRcdH1cblxuXHRwdWJsaWMgX3BDcmVhdGVPYmplY3QoKTpEaXNwbGF5T2JqZWN0XG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0cHVibGljIF9pVmFsaWRhdGUoKVxuXHR7XG5cdFx0Ly8gVG8gYmUgb3ZlcnJpZGRlbiB3aGVuIG5lY2Vzc2FyeVxuXHR9XG59XG5cbmV4cG9ydCA9IFByZWZhYkJhc2U7Il19