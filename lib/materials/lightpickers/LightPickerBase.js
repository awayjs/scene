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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvbGlnaHRwaWNrZXJzL0xpZ2h0UGlja2VyQmFzZS50cyJdLCJuYW1lcyI6WyJMaWdodFBpY2tlckJhc2UiLCJMaWdodFBpY2tlckJhc2UuY29uc3RydWN0b3IiLCJMaWdodFBpY2tlckJhc2UuZGlzcG9zZSIsIkxpZ2h0UGlja2VyQmFzZS5hc3NldFR5cGUiLCJMaWdodFBpY2tlckJhc2UubnVtRGlyZWN0aW9uYWxMaWdodHMiLCJMaWdodFBpY2tlckJhc2UubnVtUG9pbnRMaWdodHMiLCJMaWdodFBpY2tlckJhc2UubnVtQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLm51bUNhc3RpbmdQb2ludExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5udW1MaWdodFByb2JlcyIsIkxpZ2h0UGlja2VyQmFzZS5wb2ludExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5kaXJlY3Rpb25hbExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5jYXN0aW5nUG9pbnRMaWdodHMiLCJMaWdodFBpY2tlckJhc2UuY2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLmxpZ2h0UHJvYmVzIiwiTGlnaHRQaWNrZXJCYXNlLmxpZ2h0UHJvYmVXZWlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLmFsbFBpY2tlZExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5jb2xsZWN0TGlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLnVwZGF0ZVByb2JlV2VpZ2h0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUNwRSxJQUFPLGNBQWMsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBVTdFLEFBT0E7Ozs7OztHQURHO0lBQ0csZUFBZTtJQUFTQSxVQUF4QkEsZUFBZUEsVUFBdUJBO0lBZ0IzQ0E7O09BRUdBO0lBQ0hBLFNBbkJLQSxlQUFlQTtRQXFCbkJDLGlC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WUEsVUFBVUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7UUFDL0RBLElBQUlBLFFBQWlCQSxDQUFDQTtRQUV0QkEsSUFBSUEsRUFBRUEsR0FBVUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsR0FBVUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsR0FBVUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDOUVBLElBQUlBLEVBQVNBLEVBQUVBLEVBQVNBLEVBQUVBLEVBQVNBLENBQUNBO1FBQ3BDQSxJQUFJQSxDQUFRQSxFQUFFQSxLQUFLQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUMvQkEsSUFBSUEsQ0FBUUEsQ0FBQ0E7UUFHYkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUU1Q0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsYUFBYUEsQ0FBQ0E7WUFDL0NBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JCQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNyQkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDckJBLEFBQ0FBLHlEQUR5REE7WUFDekRBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLENBQUNBO1lBRTFCQSxBQUNBQSxtQ0FEbUNBO1lBQ25DQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxNQUFNQSxHQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNoQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDWkEsQ0FBQ0E7UUFFREEsQUFDQUEsWUFEWUE7UUFDWkEsS0FBS0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsS0FBS0EsQ0FBQ0E7UUFFaEJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLGdCQUFnQkEsRUFBRUEsRUFBRUEsQ0FBQ0E7WUFDekNBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0E7SUFDdkNBLENBQUNBO0lBQ0ZqQixzQkFBQ0E7QUFBREEsQ0FwTEEsQUFvTENBLEVBcEw2QixjQUFjLEVBb0wzQztBQUVELEFBQXlCLGlCQUFoQixlQUFlLENBQUMiLCJmaWxlIjoibWF0ZXJpYWxzL2xpZ2h0cGlja2Vycy9MaWdodFBpY2tlckJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XHJcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xyXG5pbXBvcnQgTmFtZWRBc3NldEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xyXG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xyXG5cclxuaW1wb3J0IExpZ2h0QmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9MaWdodEJhc2VcIik7XHJcbmltcG9ydCBJUmVuZGVyYWJsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVwiKTtcclxuaW1wb3J0IENvbGxlY3RvckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9Db2xsZWN0b3JCYXNlXCIpO1xyXG5pbXBvcnQgRGlyZWN0aW9uYWxMaWdodFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0RpcmVjdGlvbmFsTGlnaHRcIik7XHJcbmltcG9ydCBMaWdodFByb2JlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9MaWdodFByb2JlXCIpO1xyXG5pbXBvcnQgUG9pbnRMaWdodFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvUG9pbnRMaWdodFwiKTtcclxuXHJcbi8qKlxyXG4gKiBMaWdodFBpY2tlckJhc2UgcHJvdmlkZXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzZSBmb3IgbGlnaHQgcGlja2VyIGNsYXNzZXMuIFRoZXNlIGNsYXNzZXMgYXJlIHJlc3BvbnNpYmxlIGZvclxyXG4gKiBmZWVkaW5nIG1hdGVyaWFscyB3aXRoIHJlbGV2YW50IGxpZ2h0cy4gVXN1YWxseSwgU3RhdGljTGlnaHRQaWNrZXIgY2FuIGJlIHVzZWQsIGJ1dCBMaWdodFBpY2tlckJhc2UgY2FuIGJlXHJcbiAqIGV4dGVuZGVkIHRvIHByb3ZpZGUgbW9yZSBhcHBsaWNhdGlvbi1zcGVjaWZpYyBkeW5hbWljIHNlbGVjdGlvbiBvZiBsaWdodHMuXHJcbiAqXHJcbiAqIEBzZWUgU3RhdGljTGlnaHRQaWNrZXJcclxuICovXHJcbmNsYXNzIExpZ2h0UGlja2VyQmFzZSBleHRlbmRzIE5hbWVkQXNzZXRCYXNlIGltcGxlbWVudHMgSUFzc2V0XHJcbntcclxuXHRwdWJsaWMgX3BOdW1Qb2ludExpZ2h0czpudW1iZXIgPSAwO1xyXG5cdHB1YmxpYyBfcE51bURpcmVjdGlvbmFsTGlnaHRzOm51bWJlciA9IDA7XHJcblx0cHVibGljIF9wTnVtQ2FzdGluZ1BvaW50TGlnaHRzOm51bWJlciA9IDA7XHJcblx0cHVibGljIF9wTnVtQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzOm51bWJlciA9IDA7XHJcblx0cHVibGljIF9wTnVtTGlnaHRQcm9iZXM6bnVtYmVyID0gMDtcclxuXHJcblx0cHVibGljIF9wQWxsUGlja2VkTGlnaHRzOkFycmF5PExpZ2h0QmFzZT47XHJcblx0cHVibGljIF9wUG9pbnRMaWdodHM6QXJyYXk8UG9pbnRMaWdodD47XHJcblx0cHVibGljIF9wQ2FzdGluZ1BvaW50TGlnaHRzOkFycmF5PFBvaW50TGlnaHQ+O1xyXG5cdHB1YmxpYyBfcERpcmVjdGlvbmFsTGlnaHRzOkFycmF5PERpcmVjdGlvbmFsTGlnaHQ+O1xyXG5cdHB1YmxpYyBfcENhc3RpbmdEaXJlY3Rpb25hbExpZ2h0czpBcnJheTxEaXJlY3Rpb25hbExpZ2h0PjtcclxuXHRwdWJsaWMgX3BMaWdodFByb2JlczpBcnJheTxMaWdodFByb2JlPjtcclxuXHRwdWJsaWMgX3BMaWdodFByb2JlV2VpZ2h0czpBcnJheTxudW1iZXI+O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IExpZ2h0UGlja2VyQmFzZSBvYmplY3QuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwb3NlcyByZXNvdXJjZXMgdXNlZCBieSB0aGUgbGlnaHQgcGlja2VyLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlKClcclxuXHR7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdERvY1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5MSUdIVF9QSUNLRVI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWF4aW11bSBhbW91bnQgb2YgZGlyZWN0aW9uYWwgbGlnaHRzIHRoYXQgd2lsbCBiZSBwcm92aWRlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG51bURpcmVjdGlvbmFsTGlnaHRzKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BOdW1EaXJlY3Rpb25hbExpZ2h0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBwb2ludCBsaWdodHMgdGhhdCB3aWxsIGJlIHByb3ZpZGVkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbnVtUG9pbnRMaWdodHMoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcE51bVBvaW50TGlnaHRzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1heGltdW0gYW1vdW50IG9mIGRpcmVjdGlvbmFsIGxpZ2h0cyB0aGF0IGNhc3Qgc2hhZG93cy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG51bUNhc3RpbmdEaXJlY3Rpb25hbExpZ2h0cygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wTnVtQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGFtb3VudCBvZiBwb2ludCBsaWdodHMgdGhhdCBjYXN0IHNoYWRvd3MuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBudW1DYXN0aW5nUG9pbnRMaWdodHMoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcE51bUNhc3RpbmdQb2ludExpZ2h0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBsaWdodCBwcm9iZXMgdGhhdCB3aWxsIGJlIHByb3ZpZGVkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbnVtTGlnaHRQcm9iZXMoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcE51bUxpZ2h0UHJvYmVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGNvbGxlY3RlZCBwb2ludCBsaWdodHMgdG8gYmUgdXNlZCBmb3Igc2hhZGluZy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHBvaW50TGlnaHRzKCk6QXJyYXk8UG9pbnRMaWdodD5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFBvaW50TGlnaHRzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGNvbGxlY3RlZCBkaXJlY3Rpb25hbCBsaWdodHMgdG8gYmUgdXNlZCBmb3Igc2hhZGluZy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGRpcmVjdGlvbmFsTGlnaHRzKCk6QXJyYXk8RGlyZWN0aW9uYWxMaWdodD5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcERpcmVjdGlvbmFsTGlnaHRzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGNvbGxlY3RlZCBwb2ludCBsaWdodHMgdGhhdCBjYXN0IHNoYWRvd3MgdG8gYmUgdXNlZCBmb3Igc2hhZGluZy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGNhc3RpbmdQb2ludExpZ2h0cygpOkFycmF5PFBvaW50TGlnaHQ+XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BDYXN0aW5nUG9pbnRMaWdodHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY29sbGVjdGVkIGRpcmVjdGlvbmFsIGxpZ2h0cyB0aGF0IGNhc3Qgc2hhZG93cyB0byBiZSB1c2VkIGZvciBzaGFkaW5nLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgY2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzKCk6QXJyYXk8RGlyZWN0aW9uYWxMaWdodD5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcENhc3RpbmdEaXJlY3Rpb25hbExpZ2h0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjb2xsZWN0ZWQgbGlnaHQgcHJvYmVzIHRvIGJlIHVzZWQgZm9yIHNoYWRpbmcuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBsaWdodFByb2JlcygpOkFycmF5PExpZ2h0UHJvYmU+XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BMaWdodFByb2JlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB3ZWlnaHRzIGZvciBlYWNoIGxpZ2h0IHByb2JlLCBkZWZpbmluZyB0aGVpciBpbmZsdWVuY2Ugb24gdGhlIG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGxpZ2h0UHJvYmVXZWlnaHRzKCk6QXJyYXk8bnVtYmVyPlxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wTGlnaHRQcm9iZVdlaWdodHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIGNvbGxlY3Rpb24gb2YgYWxsIHRoZSBjb2xsZWN0ZWQgbGlnaHRzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYWxsUGlja2VkTGlnaHRzKCk6QXJyYXk8TGlnaHRCYXNlPlxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wQWxsUGlja2VkTGlnaHRzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyBzZXQgb2YgbGlnaHRzIGZvciBhIGdpdmVuIHJlbmRlcmFibGUgYW5kIEVudGl0eUNvbGxlY3Rvci4gQWx3YXlzIGNhbGwgc3VwZXIuY29sbGVjdExpZ2h0cygpIGFmdGVyIGN1c3RvbSBvdmVycmlkZGVuIGNvZGUuXHJcblx0ICovXHJcblx0cHVibGljIGNvbGxlY3RMaWdodHMocmVuZGVyYWJsZTpJUmVuZGVyYWJsZSlcclxuXHR7XHJcblx0XHR0aGlzLnVwZGF0ZVByb2JlV2VpZ2h0cyhyZW5kZXJhYmxlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhlIHdlaWdodHMgZm9yIHRoZSBsaWdodCBwcm9iZXMsIGJhc2VkIG9uIHRoZSByZW5kZXJhYmxlJ3MgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlbS5cclxuXHQgKiBAcGFyYW0gcmVuZGVyYWJsZSBUaGUgcmVuZGVyYmxlIGZvciB3aGljaCB0byBjYWxjdWxhdGUgdGhlIGxpZ2h0IHByb2JlcycgaW5mbHVlbmNlLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdXBkYXRlUHJvYmVXZWlnaHRzKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpXHJcblx0e1xyXG5cdFx0Ly8gdG9kbzogdGhpcyB3aWxsIGNhdXNlIHRoZSBzYW1lIGNhbGN1bGF0aW9ucyB0byBvY2N1ciBwZXIgVHJpYW5nbGVTdWJNZXNoLiBTZWUgaWYgdGhpcyBjYW4gYmUgaW1wcm92ZWQuXHJcblx0XHR2YXIgb2JqZWN0UG9zOlZlY3RvcjNEID0gcmVuZGVyYWJsZS5zb3VyY2VFbnRpdHkuc2NlbmVQb3NpdGlvbjtcclxuXHRcdHZhciBsaWdodFBvczpWZWN0b3IzRDtcclxuXHJcblx0XHR2YXIgcng6bnVtYmVyID0gb2JqZWN0UG9zLngsIHJ5Om51bWJlciA9IG9iamVjdFBvcy55LCByejpudW1iZXIgPSBvYmplY3RQb3MuejtcclxuXHRcdHZhciBkeDpudW1iZXIsIGR5Om51bWJlciwgZHo6bnVtYmVyO1xyXG5cdFx0dmFyIHc6bnVtYmVyLCB0b3RhbDpudW1iZXIgPSAwO1xyXG5cdFx0dmFyIGk6bnVtYmVyO1xyXG5cclxuXHRcdC8vIGNhbGN1bGF0ZXMgd2VpZ2h0cyBmb3IgcHJvYmVzXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fcE51bUxpZ2h0UHJvYmVzOyArK2kpIHtcclxuXHJcblx0XHRcdGxpZ2h0UG9zID0gdGhpcy5fcExpZ2h0UHJvYmVzW2ldLnNjZW5lUG9zaXRpb247XHJcblx0XHRcdGR4ID0gcnggLSBsaWdodFBvcy54O1xyXG5cdFx0XHRkeSA9IHJ5IC0gbGlnaHRQb3MueTtcclxuXHRcdFx0ZHogPSByeiAtIGxpZ2h0UG9zLno7XHJcblx0XHRcdC8vIHdlaWdodCBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHNxdWFyZSBvZiBkaXN0YW5jZVxyXG5cdFx0XHR3ID0gZHgqZHggKyBkeSpkeSArIGR6KmR6O1xyXG5cclxuXHRcdFx0Ly8ganVzdC4uLiBodWdlIGlmIGF0IHRoZSBzYW1lIHNwb3RcclxuXHRcdFx0dyA9IHcgPiAuMDAwMDE/IDEvdyA6IDUwMDAwMDAwO1xyXG5cdFx0XHR0aGlzLl9wTGlnaHRQcm9iZVdlaWdodHNbaV0gPSB3O1xyXG5cdFx0XHR0b3RhbCArPSB3O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIG5vcm1hbGl6ZVxyXG5cdFx0dG90YWwgPSAxL3RvdGFsO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9wTnVtTGlnaHRQcm9iZXM7ICsraSlcclxuXHRcdFx0dGhpcy5fcExpZ2h0UHJvYmVXZWlnaHRzW2ldICo9IHRvdGFsO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gTGlnaHRQaWNrZXJCYXNlOyJdfQ==