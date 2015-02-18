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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByZWZhYkJhc2UudHMiXSwibmFtZXMiOlsiUHJlZmFiQmFzZSIsIlByZWZhYkJhc2UuY29uc3RydWN0b3IiLCJQcmVmYWJCYXNlLmdldE5ld09iamVjdCIsIlByZWZhYkJhc2UuX3BDcmVhdGVPYmplY3QiLCJQcmVmYWJCYXNlLl9pVmFsaWRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sY0FBYyxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFDNUUsSUFBTyxtQkFBbUIsV0FBWSw0Q0FBNEMsQ0FBQyxDQUFDO0FBSXBGLEFBR0E7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUF1QkE7SUFJdkNBLHdFQUF3RUE7SUFFdkVBOztPQUVHQTtJQUNIQSxTQVRLQSxVQUFVQTtRQVdkQyxpQkFBT0EsQ0FBQ0E7UUFURkEsY0FBU0EsR0FBd0JBLElBQUlBLEtBQUtBLEVBQWlCQSxDQUFDQTtJQVVuRUEsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLGlDQUFZQSxHQUFuQkE7UUFFQ0UsSUFBSUEsTUFBTUEsR0FBaUJBLElBQUlBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1FBRWpEQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUU1QkEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7SUFDZkEsQ0FBQ0E7SUFFRkYsMENBQTBDQTtJQUMxQ0EsS0FBS0E7SUFDTEEseURBQXlEQTtJQUN6REEsRUFBRUE7SUFDRkEsc0NBQXNDQTtJQUN0Q0EsRUFBRUE7SUFDRkEsbUJBQW1CQTtJQUNuQkEsS0FBS0E7SUFFR0EsbUNBQWNBLEdBQXJCQTtRQUVDRyxNQUFNQSxJQUFJQSxtQkFBbUJBLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUVNSCwrQkFBVUEsR0FBakJBO1FBRUNJLGtDQUFrQ0E7SUFDbkNBLENBQUNBO0lBQ0ZKLGlCQUFDQTtBQUFEQSxDQTVDQSxBQTRDQ0EsRUE1Q3dCLGNBQWMsRUE0Q3RDO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6InByZWZhYnMvUHJlZmFiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmFtZWRBc3NldEJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcclxuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xyXG5cclxuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xyXG5cclxuLyoqXHJcbiAqIFByZWZhYkJhc2UgaXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzcyBmb3IgcHJlZmFicywgd2hpY2ggYXJlIHByZWJ1aWx0IGRpc3BsYXkgb2JqZWN0cyB0aGF0IGFsbG93IGVhc3kgY2xvbmluZyBhbmQgdXBkYXRpbmdcclxuICovXHJcbmNsYXNzIFByZWZhYkJhc2UgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZVxyXG57XHJcblx0cHVibGljIF9wT2JqZWN0czpBcnJheTxEaXNwbGF5T2JqZWN0PiA9IG5ldyBBcnJheTxEaXNwbGF5T2JqZWN0PigpO1xyXG5cclxuLy9cdFx0cHVibGljIF9wQmF0Y2hPYmplY3RzOkFycmF5PEJhdGNoT2JqZWN0PiA9IG5ldyBBcnJheTxCYXRjaE9iamVjdD4oKTtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBQcmVmYWJCYXNlIG9iamVjdC5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSBkaXNwbGF5IG9iamVjdCBnZW5lcmF0ZWQgZnJvbSB0aGlzIHByZWZhYlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXROZXdPYmplY3QoKTpEaXNwbGF5T2JqZWN0XHJcblx0e1xyXG5cdFx0dmFyIG9iamVjdDpEaXNwbGF5T2JqZWN0ID0gdGhpcy5fcENyZWF0ZU9iamVjdCgpO1xyXG5cclxuXHRcdHRoaXMuX3BPYmplY3RzLnB1c2gob2JqZWN0KTtcclxuXHJcblx0XHRyZXR1cm4gb2JqZWN0O1xyXG5cdH1cclxuXHJcbi8vXHRcdHB1YmxpYyBnZXROZXdCYXRjaE9iamVjdCgpOkJhdGNoT2JqZWN0XHJcbi8vXHRcdHtcclxuLy9cdFx0XHR2YXIgb2JqZWN0OkJhdGNoT2JqZWN0ID0gdGhpcy5fcENyZWF0ZUJhdGNoT2JqZWN0KCk7XHJcbi8vXHJcbi8vXHRcdFx0dGhpcy5fcEJhdGNoT2JqZWN0cy5wdXNoKG9iamVjdCk7XHJcbi8vXHJcbi8vXHRcdFx0cmV0dXJuIG9iamVjdDtcclxuLy9cdFx0fVxyXG5cclxuXHRwdWJsaWMgX3BDcmVhdGVPYmplY3QoKTpEaXNwbGF5T2JqZWN0XHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaVZhbGlkYXRlKClcclxuXHR7XHJcblx0XHQvLyBUbyBiZSBvdmVycmlkZGVuIHdoZW4gbmVjZXNzYXJ5XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBQcmVmYWJCYXNlOyJdfQ==