var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
/**
 * Dispatched to notify changes in a sub geometry object's state.
 *
 * @class away.events.SubGeometryEvent
 * @see away.core.base.Geometry
 */
var SubGeometryEvent = (function (_super) {
    __extends(SubGeometryEvent, _super);
    /**
     * Create a new GeometryEvent
     * @param type The event type.
     * @param dataType An optional data type of the vertex data being updated.
     */
    function SubGeometryEvent(type, dataType) {
        if (dataType === void 0) { dataType = ""; }
        _super.call(this, type);
        this._dataType = dataType;
    }
    Object.defineProperty(SubGeometryEvent.prototype, "dataType", {
        /**
         * The data type of the vertex data.
         */
        get: function () {
            return this._dataType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones the event.
     *
     * @return An exact duplicate of the current object.
     */
    SubGeometryEvent.prototype.clone = function () {
        return new SubGeometryEvent(this.type, this._dataType);
    };
    /**
     * Dispatched when a TriangleSubGeometry's index data has been updated.
     */
    SubGeometryEvent.INDICES_UPDATED = "indicesUpdated";
    /**
     * Dispatched when a TriangleSubGeometry's vertex data has been updated.
     */
    SubGeometryEvent.VERTICES_UPDATED = "verticesUpdated";
    return SubGeometryEvent;
})(Event);
module.exports = SubGeometryEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvU3ViR2VvbWV0cnlFdmVudC50cyJdLCJuYW1lcyI6WyJTdWJHZW9tZXRyeUV2ZW50IiwiU3ViR2VvbWV0cnlFdmVudC5jb25zdHJ1Y3RvciIsIlN1Ykdlb21ldHJ5RXZlbnQuZGF0YVR5cGUiLCJTdWJHZW9tZXRyeUV2ZW50LmNsb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBRTNELEFBTUE7Ozs7O0dBREc7SUFDRyxnQkFBZ0I7SUFBU0EsVUFBekJBLGdCQUFnQkEsVUFBY0E7SUFjbkNBOzs7O09BSUdBO0lBQ0hBLFNBbkJLQSxnQkFBZ0JBLENBbUJUQSxJQUFXQSxFQUFFQSxRQUFvQkE7UUFBcEJDLHdCQUFvQkEsR0FBcEJBLGFBQW9CQTtRQUU1Q0Esa0JBQU1BLElBQUlBLENBQUNBLENBQUNBO1FBRVpBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFFBQVFBLENBQUNBO0lBQzNCQSxDQUFDQTtJQUtERCxzQkFBV0Esc0NBQVFBO1FBSG5CQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDdkJBLENBQUNBOzs7T0FBQUY7SUFFREE7Ozs7T0FJR0E7SUFDSUEsZ0NBQUtBLEdBQVpBO1FBRUNHLE1BQU1BLENBQUNBLElBQUlBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFDeERBLENBQUNBO0lBeENESDs7T0FFR0E7SUFDV0EsZ0NBQWVBLEdBQVVBLGdCQUFnQkEsQ0FBQ0E7SUFFeERBOztPQUVHQTtJQUNXQSxpQ0FBZ0JBLEdBQVVBLGlCQUFpQkEsQ0FBQ0E7SUFpQzNEQSx1QkFBQ0E7QUFBREEsQ0EzQ0EsQUEyQ0NBLEVBM0M4QixLQUFLLEVBMkNuQztBQUVELEFBQTBCLGlCQUFqQixnQkFBZ0IsQ0FBQyIsImZpbGUiOiJldmVudHMvU3ViR2VvbWV0cnlFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcclxuXHJcbi8qKlxyXG4gKiBEaXNwYXRjaGVkIHRvIG5vdGlmeSBjaGFuZ2VzIGluIGEgc3ViIGdlb21ldHJ5IG9iamVjdCdzIHN0YXRlLlxyXG4gKlxyXG4gKiBAY2xhc3MgYXdheS5ldmVudHMuU3ViR2VvbWV0cnlFdmVudFxyXG4gKiBAc2VlIGF3YXkuY29yZS5iYXNlLkdlb21ldHJ5XHJcbiAqL1xyXG5jbGFzcyBTdWJHZW9tZXRyeUV2ZW50IGV4dGVuZHMgRXZlbnRcclxue1xyXG5cdC8qKlxyXG5cdCAqIERpc3BhdGNoZWQgd2hlbiBhIFRyaWFuZ2xlU3ViR2VvbWV0cnkncyBpbmRleCBkYXRhIGhhcyBiZWVuIHVwZGF0ZWQuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBJTkRJQ0VTX1VQREFURUQ6c3RyaW5nID0gXCJpbmRpY2VzVXBkYXRlZFwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwYXRjaGVkIHdoZW4gYSBUcmlhbmdsZVN1Ykdlb21ldHJ5J3MgdmVydGV4IGRhdGEgaGFzIGJlZW4gdXBkYXRlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIFZFUlRJQ0VTX1VQREFURUQ6c3RyaW5nID0gXCJ2ZXJ0aWNlc1VwZGF0ZWRcIjtcclxuXHJcblx0cHJpdmF0ZSBfZGF0YVR5cGU6c3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGUgYSBuZXcgR2VvbWV0cnlFdmVudFxyXG5cdCAqIEBwYXJhbSB0eXBlIFRoZSBldmVudCB0eXBlLlxyXG5cdCAqIEBwYXJhbSBkYXRhVHlwZSBBbiBvcHRpb25hbCBkYXRhIHR5cGUgb2YgdGhlIHZlcnRleCBkYXRhIGJlaW5nIHVwZGF0ZWQuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcsIGRhdGFUeXBlOnN0cmluZyA9IFwiXCIpXHJcblx0e1xyXG5cdFx0c3VwZXIodHlwZSk7XHJcblxyXG5cdFx0dGhpcy5fZGF0YVR5cGUgPSBkYXRhVHlwZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBkYXRhIHR5cGUgb2YgdGhlIHZlcnRleCBkYXRhLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgZGF0YVR5cGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZGF0YVR5cGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDbG9uZXMgdGhlIGV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBBbiBleGFjdCBkdXBsaWNhdGUgb2YgdGhlIGN1cnJlbnQgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9uZSgpOkV2ZW50XHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBTdWJHZW9tZXRyeUV2ZW50KHRoaXMudHlwZSwgdGhpcy5fZGF0YVR5cGUpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gU3ViR2VvbWV0cnlFdmVudDsiXX0=