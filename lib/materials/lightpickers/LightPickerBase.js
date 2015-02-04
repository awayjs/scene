var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
var NamedAssetBase = require("awayjs-core/lib/library/NamedAssetBase");
/**
 * LightPickerBase provides an abstract base clase for light picker classes. These classes are responsible for
 * feeding materials with relevant lights. Usually, StaticLightPicker can be used, but LightPickerBase can be
 * extended to provide more application-specific dynamic selection of lights.
 *
 * @see StaticLightPicker
 */
var LightPickerBase = (function (_super) {
    __extends(LightPickerBase, _super);
    /**
     * Creates a new LightPickerBase object.
     */
    function LightPickerBase() {
        _super.call(this);
        this._pNumPointLights = 0;
        this._pNumDirectionalLights = 0;
        this._pNumCastingPointLights = 0;
        this._pNumCastingDirectionalLights = 0;
        this._pNumLightProbes = 0;
    }
    /**
     * Disposes resources used by the light picker.
     */
    LightPickerBase.prototype.dispose = function () {
    };
    Object.defineProperty(LightPickerBase.prototype, "assetType", {
        /**
         * @inheritDoc
         */
        get: function () {
            return AssetType.LIGHT_PICKER;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "numDirectionalLights", {
        /**
         * The maximum amount of directional lights that will be provided.
         */
        get: function () {
            return this._pNumDirectionalLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "numPointLights", {
        /**
         * The maximum amount of point lights that will be provided.
         */
        get: function () {
            return this._pNumPointLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "numCastingDirectionalLights", {
        /**
         * The maximum amount of directional lights that cast shadows.
         */
        get: function () {
            return this._pNumCastingDirectionalLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "numCastingPointLights", {
        /**
         * The amount of point lights that cast shadows.
         */
        get: function () {
            return this._pNumCastingPointLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "numLightProbes", {
        /**
         * The maximum amount of light probes that will be provided.
         */
        get: function () {
            return this._pNumLightProbes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "pointLights", {
        /**
         * The collected point lights to be used for shading.
         */
        get: function () {
            return this._pPointLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "directionalLights", {
        /**
         * The collected directional lights to be used for shading.
         */
        get: function () {
            return this._pDirectionalLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "castingPointLights", {
        /**
         * The collected point lights that cast shadows to be used for shading.
         */
        get: function () {
            return this._pCastingPointLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "castingDirectionalLights", {
        /**
         * The collected directional lights that cast shadows to be used for shading.
         */
        get: function () {
            return this._pCastingDirectionalLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "lightProbes", {
        /**
         * The collected light probes to be used for shading.
         */
        get: function () {
            return this._pLightProbes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "lightProbeWeights", {
        /**
         * The weights for each light probe, defining their influence on the object.
         */
        get: function () {
            return this._pLightProbeWeights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "allPickedLights", {
        /**
         * A collection of all the collected lights.
         */
        get: function () {
            return this._pAllPickedLights;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates set of lights for a given renderable and EntityCollector. Always call super.collectLights() after custom overridden code.
     */
    LightPickerBase.prototype.collectLights = function (renderable) {
        this.updateProbeWeights(renderable);
    };
    /**
     * Updates the weights for the light probes, based on the renderable's position relative to them.
     * @param renderable The renderble for which to calculate the light probes' influence.
     */
    LightPickerBase.prototype.updateProbeWeights = function (renderable) {
        // todo: this will cause the same calculations to occur per TriangleSubMesh. See if this can be improved.
        var objectPos = renderable.sourceEntity.scenePosition;
        var lightPos;
        var rx = objectPos.x, ry = objectPos.y, rz = objectPos.z;
        var dx, dy, dz;
        var w, total = 0;
        var i;
        for (i = 0; i < this._pNumLightProbes; ++i) {
            lightPos = this._pLightProbes[i].scenePosition;
            dx = rx - lightPos.x;
            dy = ry - lightPos.y;
            dz = rz - lightPos.z;
            // weight is inversely proportional to square of distance
            w = dx * dx + dy * dy + dz * dz;
            // just... huge if at the same spot
            w = w > .00001 ? 1 / w : 50000000;
            this._pLightProbeWeights[i] = w;
            total += w;
        }
        // normalize
        total = 1 / total;
        for (i = 0; i < this._pNumLightProbes; ++i)
            this._pLightProbeWeights[i] *= total;
    };
    return LightPickerBase;
})(NamedAssetBase);
module.exports = LightPickerBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvbGlnaHRwaWNrZXJzL0xpZ2h0UGlja2VyQmFzZS50cyJdLCJuYW1lcyI6WyJMaWdodFBpY2tlckJhc2UiLCJMaWdodFBpY2tlckJhc2UuY29uc3RydWN0b3IiLCJMaWdodFBpY2tlckJhc2UuZGlzcG9zZSIsIkxpZ2h0UGlja2VyQmFzZS5hc3NldFR5cGUiLCJMaWdodFBpY2tlckJhc2UubnVtRGlyZWN0aW9uYWxMaWdodHMiLCJMaWdodFBpY2tlckJhc2UubnVtUG9pbnRMaWdodHMiLCJMaWdodFBpY2tlckJhc2UubnVtQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLm51bUNhc3RpbmdQb2ludExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5udW1MaWdodFByb2JlcyIsIkxpZ2h0UGlja2VyQmFzZS5wb2ludExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5kaXJlY3Rpb25hbExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5jYXN0aW5nUG9pbnRMaWdodHMiLCJMaWdodFBpY2tlckJhc2UuY2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLmxpZ2h0UHJvYmVzIiwiTGlnaHRQaWNrZXJCYXNlLmxpZ2h0UHJvYmVXZWlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLmFsbFBpY2tlZExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5jb2xsZWN0TGlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLnVwZGF0ZVByb2JlV2VpZ2h0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUNwRSxJQUFPLGNBQWMsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBVTdFLEFBT0E7Ozs7OztHQURHO0lBQ0csZUFBZTtJQUFTQSxVQUF4QkEsZUFBZUEsVUFBdUJBO0lBZ0IzQ0E7O09BRUdBO0lBQ0hBLFNBbkJLQSxlQUFlQTtRQXFCbkJDLGlC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WUEsVUFBVUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7UUFDL0RBLElBQUlBLFFBQWlCQSxDQUFDQTtRQUV0QkEsSUFBSUEsRUFBRUEsR0FBVUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsR0FBVUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsR0FBVUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDOUVBLElBQUlBLEVBQVNBLEVBQUVBLEVBQVNBLEVBQUVBLEVBQVNBLENBQUNBO1FBQ3BDQSxJQUFJQSxDQUFRQSxFQUFFQSxLQUFLQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUMvQkEsSUFBSUEsQ0FBUUEsQ0FBQ0E7UUFHYkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUU1Q0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsYUFBYUEsQ0FBQ0E7WUFDL0NBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JCQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNyQkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDckJBLEFBQ0FBLHlEQUR5REE7WUFDekRBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLENBQUNBO1lBRTFCQSxBQUNBQSxtQ0FEbUNBO1lBQ25DQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxNQUFNQSxHQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNoQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDWkEsQ0FBQ0E7UUFFREEsQUFDQUEsWUFEWUE7UUFDWkEsS0FBS0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsS0FBS0EsQ0FBQ0E7UUFFaEJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLGdCQUFnQkEsRUFBRUEsRUFBRUEsQ0FBQ0E7WUFDekNBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0E7SUFDdkNBLENBQUNBO0lBQ0ZqQixzQkFBQ0E7QUFBREEsQ0FwTEEsQUFvTENBLEVBcEw2QixjQUFjLEVBb0wzQztBQUVELEFBQXlCLGlCQUFoQixlQUFlLENBQUMiLCJmaWxlIjoibWF0ZXJpYWxzL2xpZ2h0cGlja2Vycy9MaWdodFBpY2tlckJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XHJcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xyXG5pbXBvcnQgTmFtZWRBc3NldEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xyXG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xyXG5cclxuaW1wb3J0IExpZ2h0QmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9MaWdodEJhc2VcIik7XHJcbmltcG9ydCBJUmVuZGVyYWJsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVwiKTtcclxuaW1wb3J0IElDb2xsZWN0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XHJcbmltcG9ydCBEaXJlY3Rpb25hbExpZ2h0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvRGlyZWN0aW9uYWxMaWdodFwiKTtcclxuaW1wb3J0IExpZ2h0UHJvYmVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0xpZ2h0UHJvYmVcIik7XHJcbmltcG9ydCBQb2ludExpZ2h0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9Qb2ludExpZ2h0XCIpO1xyXG5cclxuLyoqXHJcbiAqIExpZ2h0UGlja2VyQmFzZSBwcm92aWRlcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNlIGZvciBsaWdodCBwaWNrZXIgY2xhc3Nlcy4gVGhlc2UgY2xhc3NlcyBhcmUgcmVzcG9uc2libGUgZm9yXHJcbiAqIGZlZWRpbmcgbWF0ZXJpYWxzIHdpdGggcmVsZXZhbnQgbGlnaHRzLiBVc3VhbGx5LCBTdGF0aWNMaWdodFBpY2tlciBjYW4gYmUgdXNlZCwgYnV0IExpZ2h0UGlja2VyQmFzZSBjYW4gYmVcclxuICogZXh0ZW5kZWQgdG8gcHJvdmlkZSBtb3JlIGFwcGxpY2F0aW9uLXNwZWNpZmljIGR5bmFtaWMgc2VsZWN0aW9uIG9mIGxpZ2h0cy5cclxuICpcclxuICogQHNlZSBTdGF0aWNMaWdodFBpY2tlclxyXG4gKi9cclxuY2xhc3MgTGlnaHRQaWNrZXJCYXNlIGV4dGVuZHMgTmFtZWRBc3NldEJhc2UgaW1wbGVtZW50cyBJQXNzZXRcclxue1xyXG5cdHB1YmxpYyBfcE51bVBvaW50TGlnaHRzOm51bWJlciA9IDA7XHJcblx0cHVibGljIF9wTnVtRGlyZWN0aW9uYWxMaWdodHM6bnVtYmVyID0gMDtcclxuXHRwdWJsaWMgX3BOdW1DYXN0aW5nUG9pbnRMaWdodHM6bnVtYmVyID0gMDtcclxuXHRwdWJsaWMgX3BOdW1DYXN0aW5nRGlyZWN0aW9uYWxMaWdodHM6bnVtYmVyID0gMDtcclxuXHRwdWJsaWMgX3BOdW1MaWdodFByb2JlczpudW1iZXIgPSAwO1xyXG5cclxuXHRwdWJsaWMgX3BBbGxQaWNrZWRMaWdodHM6QXJyYXk8TGlnaHRCYXNlPjtcclxuXHRwdWJsaWMgX3BQb2ludExpZ2h0czpBcnJheTxQb2ludExpZ2h0PjtcclxuXHRwdWJsaWMgX3BDYXN0aW5nUG9pbnRMaWdodHM6QXJyYXk8UG9pbnRMaWdodD47XHJcblx0cHVibGljIF9wRGlyZWN0aW9uYWxMaWdodHM6QXJyYXk8RGlyZWN0aW9uYWxMaWdodD47XHJcblx0cHVibGljIF9wQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzOkFycmF5PERpcmVjdGlvbmFsTGlnaHQ+O1xyXG5cdHB1YmxpYyBfcExpZ2h0UHJvYmVzOkFycmF5PExpZ2h0UHJvYmU+O1xyXG5cdHB1YmxpYyBfcExpZ2h0UHJvYmVXZWlnaHRzOkFycmF5PG51bWJlcj47XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgTGlnaHRQaWNrZXJCYXNlIG9iamVjdC5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3Bvc2VzIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBsaWdodCBwaWNrZXIuXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gQXNzZXRUeXBlLkxJR0hUX1BJQ0tFUjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBkaXJlY3Rpb25hbCBsaWdodHMgdGhhdCB3aWxsIGJlIHByb3ZpZGVkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbnVtRGlyZWN0aW9uYWxMaWdodHMoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcE51bURpcmVjdGlvbmFsTGlnaHRzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1heGltdW0gYW1vdW50IG9mIHBvaW50IGxpZ2h0cyB0aGF0IHdpbGwgYmUgcHJvdmlkZWQuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBudW1Qb2ludExpZ2h0cygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wTnVtUG9pbnRMaWdodHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWF4aW11bSBhbW91bnQgb2YgZGlyZWN0aW9uYWwgbGlnaHRzIHRoYXQgY2FzdCBzaGFkb3dzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbnVtQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BOdW1DYXN0aW5nRGlyZWN0aW9uYWxMaWdodHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYW1vdW50IG9mIHBvaW50IGxpZ2h0cyB0aGF0IGNhc3Qgc2hhZG93cy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG51bUNhc3RpbmdQb2ludExpZ2h0cygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wTnVtQ2FzdGluZ1BvaW50TGlnaHRzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1heGltdW0gYW1vdW50IG9mIGxpZ2h0IHByb2JlcyB0aGF0IHdpbGwgYmUgcHJvdmlkZWQuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBudW1MaWdodFByb2JlcygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wTnVtTGlnaHRQcm9iZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY29sbGVjdGVkIHBvaW50IGxpZ2h0cyB0byBiZSB1c2VkIGZvciBzaGFkaW5nLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcG9pbnRMaWdodHMoKTpBcnJheTxQb2ludExpZ2h0PlxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wUG9pbnRMaWdodHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY29sbGVjdGVkIGRpcmVjdGlvbmFsIGxpZ2h0cyB0byBiZSB1c2VkIGZvciBzaGFkaW5nLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgZGlyZWN0aW9uYWxMaWdodHMoKTpBcnJheTxEaXJlY3Rpb25hbExpZ2h0PlxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wRGlyZWN0aW9uYWxMaWdodHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY29sbGVjdGVkIHBvaW50IGxpZ2h0cyB0aGF0IGNhc3Qgc2hhZG93cyB0byBiZSB1c2VkIGZvciBzaGFkaW5nLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgY2FzdGluZ1BvaW50TGlnaHRzKCk6QXJyYXk8UG9pbnRMaWdodD5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcENhc3RpbmdQb2ludExpZ2h0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjb2xsZWN0ZWQgZGlyZWN0aW9uYWwgbGlnaHRzIHRoYXQgY2FzdCBzaGFkb3dzIHRvIGJlIHVzZWQgZm9yIHNoYWRpbmcuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBjYXN0aW5nRGlyZWN0aW9uYWxMaWdodHMoKTpBcnJheTxEaXJlY3Rpb25hbExpZ2h0PlxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGNvbGxlY3RlZCBsaWdodCBwcm9iZXMgdG8gYmUgdXNlZCBmb3Igc2hhZGluZy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGxpZ2h0UHJvYmVzKCk6QXJyYXk8TGlnaHRQcm9iZT5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcExpZ2h0UHJvYmVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHdlaWdodHMgZm9yIGVhY2ggbGlnaHQgcHJvYmUsIGRlZmluaW5nIHRoZWlyIGluZmx1ZW5jZSBvbiB0aGUgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbGlnaHRQcm9iZVdlaWdodHMoKTpBcnJheTxudW1iZXI+XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BMaWdodFByb2JlV2VpZ2h0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgY29sbGVjdGlvbiBvZiBhbGwgdGhlIGNvbGxlY3RlZCBsaWdodHMuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhbGxQaWNrZWRMaWdodHMoKTpBcnJheTxMaWdodEJhc2U+XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BBbGxQaWNrZWRMaWdodHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHNldCBvZiBsaWdodHMgZm9yIGEgZ2l2ZW4gcmVuZGVyYWJsZSBhbmQgRW50aXR5Q29sbGVjdG9yLiBBbHdheXMgY2FsbCBzdXBlci5jb2xsZWN0TGlnaHRzKCkgYWZ0ZXIgY3VzdG9tIG92ZXJyaWRkZW4gY29kZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgY29sbGVjdExpZ2h0cyhyZW5kZXJhYmxlOklSZW5kZXJhYmxlKVxyXG5cdHtcclxuXHRcdHRoaXMudXBkYXRlUHJvYmVXZWlnaHRzKHJlbmRlcmFibGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgd2VpZ2h0cyBmb3IgdGhlIGxpZ2h0IHByb2JlcywgYmFzZWQgb24gdGhlIHJlbmRlcmFibGUncyBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGVtLlxyXG5cdCAqIEBwYXJhbSByZW5kZXJhYmxlIFRoZSByZW5kZXJibGUgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgbGlnaHQgcHJvYmVzJyBpbmZsdWVuY2UuXHJcblx0ICovXHJcblx0cHJpdmF0ZSB1cGRhdGVQcm9iZVdlaWdodHMocmVuZGVyYWJsZTpJUmVuZGVyYWJsZSlcclxuXHR7XHJcblx0XHQvLyB0b2RvOiB0aGlzIHdpbGwgY2F1c2UgdGhlIHNhbWUgY2FsY3VsYXRpb25zIHRvIG9jY3VyIHBlciBUcmlhbmdsZVN1Yk1lc2guIFNlZSBpZiB0aGlzIGNhbiBiZSBpbXByb3ZlZC5cclxuXHRcdHZhciBvYmplY3RQb3M6VmVjdG9yM0QgPSByZW5kZXJhYmxlLnNvdXJjZUVudGl0eS5zY2VuZVBvc2l0aW9uO1xyXG5cdFx0dmFyIGxpZ2h0UG9zOlZlY3RvcjNEO1xyXG5cclxuXHRcdHZhciByeDpudW1iZXIgPSBvYmplY3RQb3MueCwgcnk6bnVtYmVyID0gb2JqZWN0UG9zLnksIHJ6Om51bWJlciA9IG9iamVjdFBvcy56O1xyXG5cdFx0dmFyIGR4Om51bWJlciwgZHk6bnVtYmVyLCBkejpudW1iZXI7XHJcblx0XHR2YXIgdzpudW1iZXIsIHRvdGFsOm51bWJlciA9IDA7XHJcblx0XHR2YXIgaTpudW1iZXI7XHJcblxyXG5cdFx0Ly8gY2FsY3VsYXRlcyB3ZWlnaHRzIGZvciBwcm9iZXNcclxuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9wTnVtTGlnaHRQcm9iZXM7ICsraSkge1xyXG5cclxuXHRcdFx0bGlnaHRQb3MgPSB0aGlzLl9wTGlnaHRQcm9iZXNbaV0uc2NlbmVQb3NpdGlvbjtcclxuXHRcdFx0ZHggPSByeCAtIGxpZ2h0UG9zLng7XHJcblx0XHRcdGR5ID0gcnkgLSBsaWdodFBvcy55O1xyXG5cdFx0XHRkeiA9IHJ6IC0gbGlnaHRQb3MuejtcclxuXHRcdFx0Ly8gd2VpZ2h0IGlzIGludmVyc2VseSBwcm9wb3J0aW9uYWwgdG8gc3F1YXJlIG9mIGRpc3RhbmNlXHJcblx0XHRcdHcgPSBkeCpkeCArIGR5KmR5ICsgZHoqZHo7XHJcblxyXG5cdFx0XHQvLyBqdXN0Li4uIGh1Z2UgaWYgYXQgdGhlIHNhbWUgc3BvdFxyXG5cdFx0XHR3ID0gdyA+IC4wMDAwMT8gMS93IDogNTAwMDAwMDA7XHJcblx0XHRcdHRoaXMuX3BMaWdodFByb2JlV2VpZ2h0c1tpXSA9IHc7XHJcblx0XHRcdHRvdGFsICs9IHc7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gbm9ybWFsaXplXHJcblx0XHR0b3RhbCA9IDEvdG90YWw7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX3BOdW1MaWdodFByb2JlczsgKytpKVxyXG5cdFx0XHR0aGlzLl9wTGlnaHRQcm9iZVdlaWdodHNbaV0gKj0gdG90YWw7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBMaWdodFBpY2tlckJhc2U7Il19