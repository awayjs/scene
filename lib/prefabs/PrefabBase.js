var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NamedAssetBase = require("awayjs-core/lib/library/NamedAssetBase");
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
})(NamedAssetBase);
module.exports = PrefabBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL3ByZWZhYmJhc2UudHMiXSwibmFtZXMiOlsiUHJlZmFiQmFzZSIsIlByZWZhYkJhc2UuY29uc3RydWN0b3IiLCJQcmVmYWJCYXNlLmdldE5ld09iamVjdCIsIlByZWZhYkJhc2UuX3BDcmVhdGVPYmplY3QiLCJQcmVmYWJCYXNlLl9pVmFsaWRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sY0FBYyxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFDNUUsSUFBTyxtQkFBbUIsV0FBWSw0Q0FBNEMsQ0FBQyxDQUFDO0FBSXBGLEFBR0E7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUF1QkE7SUFJdkNBLHdFQUF3RUE7SUFFdkVBOztPQUVHQTtJQUNIQSxTQVRLQSxVQUFVQTtRQVdkQyxpQkFBT0EsQ0FBQ0E7UUFURkEsY0FBU0EsR0FBd0JBLElBQUlBLEtBQUtBLEVBQWlCQSxDQUFDQTtJQVVuRUEsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLGlDQUFZQSxHQUFuQkE7UUFFQ0UsSUFBSUEsTUFBTUEsR0FBaUJBLElBQUlBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1FBRWpEQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUU1QkEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7SUFDZkEsQ0FBQ0E7SUFFRkYsMENBQTBDQTtJQUMxQ0EsS0FBS0E7SUFDTEEseURBQXlEQTtJQUN6REEsRUFBRUE7SUFDRkEsc0NBQXNDQTtJQUN0Q0EsRUFBRUE7SUFDRkEsbUJBQW1CQTtJQUNuQkEsS0FBS0E7SUFFR0EsbUNBQWNBLEdBQXJCQTtRQUVDRyxNQUFNQSxJQUFJQSxtQkFBbUJBLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUVNSCwrQkFBVUEsR0FBakJBO1FBRUNJLGtDQUFrQ0E7SUFDbkNBLENBQUNBO0lBQ0ZKLGlCQUFDQTtBQUFEQSxDQTVDQSxBQTRDQ0EsRUE1Q3dCLGNBQWMsRUE0Q3RDO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6InByZWZhYnMvUHJlZmFiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmFtZWRBc3NldEJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcblxuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuXG4vKipcbiAqIFByZWZhYkJhc2UgaXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzcyBmb3IgcHJlZmFicywgd2hpY2ggYXJlIHByZWJ1aWx0IGRpc3BsYXkgb2JqZWN0cyB0aGF0IGFsbG93IGVhc3kgY2xvbmluZyBhbmQgdXBkYXRpbmdcbiAqL1xuY2xhc3MgUHJlZmFiQmFzZSBleHRlbmRzIE5hbWVkQXNzZXRCYXNlXG57XG5cdHB1YmxpYyBfcE9iamVjdHM6QXJyYXk8RGlzcGxheU9iamVjdD4gPSBuZXcgQXJyYXk8RGlzcGxheU9iamVjdD4oKTtcblxuLy9cdFx0cHVibGljIF9wQmF0Y2hPYmplY3RzOkFycmF5PEJhdGNoT2JqZWN0PiA9IG5ldyBBcnJheTxCYXRjaE9iamVjdD4oKTtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBQcmVmYWJCYXNlIG9iamVjdC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIGRpc3BsYXkgb2JqZWN0IGdlbmVyYXRlZCBmcm9tIHRoaXMgcHJlZmFiXG5cdCAqL1xuXHRwdWJsaWMgZ2V0TmV3T2JqZWN0KCk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0dmFyIG9iamVjdDpEaXNwbGF5T2JqZWN0ID0gdGhpcy5fcENyZWF0ZU9iamVjdCgpO1xuXG5cdFx0dGhpcy5fcE9iamVjdHMucHVzaChvYmplY3QpO1xuXG5cdFx0cmV0dXJuIG9iamVjdDtcblx0fVxuXG4vL1x0XHRwdWJsaWMgZ2V0TmV3QmF0Y2hPYmplY3QoKTpCYXRjaE9iamVjdFxuLy9cdFx0e1xuLy9cdFx0XHR2YXIgb2JqZWN0OkJhdGNoT2JqZWN0ID0gdGhpcy5fcENyZWF0ZUJhdGNoT2JqZWN0KCk7XG4vL1xuLy9cdFx0XHR0aGlzLl9wQmF0Y2hPYmplY3RzLnB1c2gob2JqZWN0KTtcbi8vXG4vL1x0XHRcdHJldHVybiBvYmplY3Q7XG4vL1x0XHR9XG5cblx0cHVibGljIF9wQ3JlYXRlT2JqZWN0KCk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdHB1YmxpYyBfaVZhbGlkYXRlKClcblx0e1xuXHRcdC8vIFRvIGJlIG92ZXJyaWRkZW4gd2hlbiBuZWNlc3Nhcnlcblx0fVxufVxuXG5leHBvcnQgPSBQcmVmYWJCYXNlOyJdfQ==