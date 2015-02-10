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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvbGlnaHRwaWNrZXJzL2xpZ2h0cGlja2VyYmFzZS50cyJdLCJuYW1lcyI6WyJMaWdodFBpY2tlckJhc2UiLCJMaWdodFBpY2tlckJhc2UuY29uc3RydWN0b3IiLCJMaWdodFBpY2tlckJhc2UuZGlzcG9zZSIsIkxpZ2h0UGlja2VyQmFzZS5hc3NldFR5cGUiLCJMaWdodFBpY2tlckJhc2UubnVtRGlyZWN0aW9uYWxMaWdodHMiLCJMaWdodFBpY2tlckJhc2UubnVtUG9pbnRMaWdodHMiLCJMaWdodFBpY2tlckJhc2UubnVtQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLm51bUNhc3RpbmdQb2ludExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5udW1MaWdodFByb2JlcyIsIkxpZ2h0UGlja2VyQmFzZS5wb2ludExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5kaXJlY3Rpb25hbExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5jYXN0aW5nUG9pbnRMaWdodHMiLCJMaWdodFBpY2tlckJhc2UuY2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLmxpZ2h0UHJvYmVzIiwiTGlnaHRQaWNrZXJCYXNlLmxpZ2h0UHJvYmVXZWlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLmFsbFBpY2tlZExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5jb2xsZWN0TGlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLnVwZGF0ZVByb2JlV2VpZ2h0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUNwRSxJQUFPLGNBQWMsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBVTdFLEFBT0E7Ozs7OztHQURHO0lBQ0csZUFBZTtJQUFTQSxVQUF4QkEsZUFBZUEsVUFBdUJBO0lBZ0IzQ0E7O09BRUdBO0lBQ0hBLFNBbkJLQSxlQUFlQTtRQXFCbkJDLGlC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WUEsVUFBVUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7UUFDL0RBLElBQUlBLFFBQWlCQSxDQUFDQTtRQUV0QkEsSUFBSUEsRUFBRUEsR0FBVUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsR0FBVUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsR0FBVUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDOUVBLElBQUlBLEVBQVNBLEVBQUVBLEVBQVNBLEVBQUVBLEVBQVNBLENBQUNBO1FBQ3BDQSxJQUFJQSxDQUFRQSxFQUFFQSxLQUFLQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUMvQkEsSUFBSUEsQ0FBUUEsQ0FBQ0E7UUFHYkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUU1Q0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsYUFBYUEsQ0FBQ0E7WUFDL0NBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JCQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNyQkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDckJBLEFBQ0FBLHlEQUR5REE7WUFDekRBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLENBQUNBO1lBRTFCQSxBQUNBQSxtQ0FEbUNBO1lBQ25DQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxNQUFNQSxHQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNoQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDWkEsQ0FBQ0E7UUFFREEsQUFDQUEsWUFEWUE7UUFDWkEsS0FBS0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsS0FBS0EsQ0FBQ0E7UUFFaEJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLGdCQUFnQkEsRUFBRUEsRUFBRUEsQ0FBQ0E7WUFDekNBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0E7SUFDdkNBLENBQUNBO0lBQ0ZqQixzQkFBQ0E7QUFBREEsQ0FwTEEsQUFvTENBLEVBcEw2QixjQUFjLEVBb0wzQztBQUVELEFBQXlCLGlCQUFoQixlQUFlLENBQUMiLCJmaWxlIjoibWF0ZXJpYWxzL2xpZ2h0cGlja2Vycy9MaWdodFBpY2tlckJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcbmltcG9ydCBOYW1lZEFzc2V0QmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvTmFtZWRBc3NldEJhc2VcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xuXG5pbXBvcnQgTGlnaHRCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xpZ2h0QmFzZVwiKTtcbmltcG9ydCBJUmVuZGVyYWJsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVwiKTtcbmltcG9ydCBDb2xsZWN0b3JCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvQ29sbGVjdG9yQmFzZVwiKTtcbmltcG9ydCBEaXJlY3Rpb25hbExpZ2h0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvRGlyZWN0aW9uYWxMaWdodFwiKTtcbmltcG9ydCBMaWdodFByb2JlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9MaWdodFByb2JlXCIpO1xuaW1wb3J0IFBvaW50TGlnaHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL1BvaW50TGlnaHRcIik7XG5cbi8qKlxuICogTGlnaHRQaWNrZXJCYXNlIHByb3ZpZGVzIGFuIGFic3RyYWN0IGJhc2UgY2xhc2UgZm9yIGxpZ2h0IHBpY2tlciBjbGFzc2VzLiBUaGVzZSBjbGFzc2VzIGFyZSByZXNwb25zaWJsZSBmb3JcbiAqIGZlZWRpbmcgbWF0ZXJpYWxzIHdpdGggcmVsZXZhbnQgbGlnaHRzLiBVc3VhbGx5LCBTdGF0aWNMaWdodFBpY2tlciBjYW4gYmUgdXNlZCwgYnV0IExpZ2h0UGlja2VyQmFzZSBjYW4gYmVcbiAqIGV4dGVuZGVkIHRvIHByb3ZpZGUgbW9yZSBhcHBsaWNhdGlvbi1zcGVjaWZpYyBkeW5hbWljIHNlbGVjdGlvbiBvZiBsaWdodHMuXG4gKlxuICogQHNlZSBTdGF0aWNMaWdodFBpY2tlclxuICovXG5jbGFzcyBMaWdodFBpY2tlckJhc2UgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZSBpbXBsZW1lbnRzIElBc3NldFxue1xuXHRwdWJsaWMgX3BOdW1Qb2ludExpZ2h0czpudW1iZXIgPSAwO1xuXHRwdWJsaWMgX3BOdW1EaXJlY3Rpb25hbExpZ2h0czpudW1iZXIgPSAwO1xuXHRwdWJsaWMgX3BOdW1DYXN0aW5nUG9pbnRMaWdodHM6bnVtYmVyID0gMDtcblx0cHVibGljIF9wTnVtQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzOm51bWJlciA9IDA7XG5cdHB1YmxpYyBfcE51bUxpZ2h0UHJvYmVzOm51bWJlciA9IDA7XG5cblx0cHVibGljIF9wQWxsUGlja2VkTGlnaHRzOkFycmF5PExpZ2h0QmFzZT47XG5cdHB1YmxpYyBfcFBvaW50TGlnaHRzOkFycmF5PFBvaW50TGlnaHQ+O1xuXHRwdWJsaWMgX3BDYXN0aW5nUG9pbnRMaWdodHM6QXJyYXk8UG9pbnRMaWdodD47XG5cdHB1YmxpYyBfcERpcmVjdGlvbmFsTGlnaHRzOkFycmF5PERpcmVjdGlvbmFsTGlnaHQ+O1xuXHRwdWJsaWMgX3BDYXN0aW5nRGlyZWN0aW9uYWxMaWdodHM6QXJyYXk8RGlyZWN0aW9uYWxMaWdodD47XG5cdHB1YmxpYyBfcExpZ2h0UHJvYmVzOkFycmF5PExpZ2h0UHJvYmU+O1xuXHRwdWJsaWMgX3BMaWdodFByb2JlV2VpZ2h0czpBcnJheTxudW1iZXI+O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IExpZ2h0UGlja2VyQmFzZSBvYmplY3QuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERpc3Bvc2VzIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBsaWdodCBwaWNrZXIuXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBBc3NldFR5cGUuTElHSFRfUElDS0VSO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBkaXJlY3Rpb25hbCBsaWdodHMgdGhhdCB3aWxsIGJlIHByb3ZpZGVkLlxuXHQgKi9cblx0cHVibGljIGdldCBudW1EaXJlY3Rpb25hbExpZ2h0cygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BOdW1EaXJlY3Rpb25hbExpZ2h0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbWF4aW11bSBhbW91bnQgb2YgcG9pbnQgbGlnaHRzIHRoYXQgd2lsbCBiZSBwcm92aWRlZC5cblx0ICovXG5cdHB1YmxpYyBnZXQgbnVtUG9pbnRMaWdodHMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTnVtUG9pbnRMaWdodHM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG1heGltdW0gYW1vdW50IG9mIGRpcmVjdGlvbmFsIGxpZ2h0cyB0aGF0IGNhc3Qgc2hhZG93cy5cblx0ICovXG5cdHB1YmxpYyBnZXQgbnVtQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE51bUNhc3RpbmdEaXJlY3Rpb25hbExpZ2h0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgYW1vdW50IG9mIHBvaW50IGxpZ2h0cyB0aGF0IGNhc3Qgc2hhZG93cy5cblx0ICovXG5cdHB1YmxpYyBnZXQgbnVtQ2FzdGluZ1BvaW50TGlnaHRzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE51bUNhc3RpbmdQb2ludExpZ2h0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbWF4aW11bSBhbW91bnQgb2YgbGlnaHQgcHJvYmVzIHRoYXQgd2lsbCBiZSBwcm92aWRlZC5cblx0ICovXG5cdHB1YmxpYyBnZXQgbnVtTGlnaHRQcm9iZXMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTnVtTGlnaHRQcm9iZXM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGNvbGxlY3RlZCBwb2ludCBsaWdodHMgdG8gYmUgdXNlZCBmb3Igc2hhZGluZy5cblx0ICovXG5cdHB1YmxpYyBnZXQgcG9pbnRMaWdodHMoKTpBcnJheTxQb2ludExpZ2h0PlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BQb2ludExpZ2h0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgY29sbGVjdGVkIGRpcmVjdGlvbmFsIGxpZ2h0cyB0byBiZSB1c2VkIGZvciBzaGFkaW5nLlxuXHQgKi9cblx0cHVibGljIGdldCBkaXJlY3Rpb25hbExpZ2h0cygpOkFycmF5PERpcmVjdGlvbmFsTGlnaHQ+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcERpcmVjdGlvbmFsTGlnaHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBjb2xsZWN0ZWQgcG9pbnQgbGlnaHRzIHRoYXQgY2FzdCBzaGFkb3dzIHRvIGJlIHVzZWQgZm9yIHNoYWRpbmcuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNhc3RpbmdQb2ludExpZ2h0cygpOkFycmF5PFBvaW50TGlnaHQ+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcENhc3RpbmdQb2ludExpZ2h0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgY29sbGVjdGVkIGRpcmVjdGlvbmFsIGxpZ2h0cyB0aGF0IGNhc3Qgc2hhZG93cyB0byBiZSB1c2VkIGZvciBzaGFkaW5nLlxuXHQgKi9cblx0cHVibGljIGdldCBjYXN0aW5nRGlyZWN0aW9uYWxMaWdodHMoKTpBcnJheTxEaXJlY3Rpb25hbExpZ2h0PlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BDYXN0aW5nRGlyZWN0aW9uYWxMaWdodHM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGNvbGxlY3RlZCBsaWdodCBwcm9iZXMgdG8gYmUgdXNlZCBmb3Igc2hhZGluZy5cblx0ICovXG5cdHB1YmxpYyBnZXQgbGlnaHRQcm9iZXMoKTpBcnJheTxMaWdodFByb2JlPlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BMaWdodFByb2Jlcztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgd2VpZ2h0cyBmb3IgZWFjaCBsaWdodCBwcm9iZSwgZGVmaW5pbmcgdGhlaXIgaW5mbHVlbmNlIG9uIHRoZSBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGxpZ2h0UHJvYmVXZWlnaHRzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BMaWdodFByb2JlV2VpZ2h0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBBIGNvbGxlY3Rpb24gb2YgYWxsIHRoZSBjb2xsZWN0ZWQgbGlnaHRzLlxuXHQgKi9cblx0cHVibGljIGdldCBhbGxQaWNrZWRMaWdodHMoKTpBcnJheTxMaWdodEJhc2U+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEFsbFBpY2tlZExpZ2h0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHNldCBvZiBsaWdodHMgZm9yIGEgZ2l2ZW4gcmVuZGVyYWJsZSBhbmQgRW50aXR5Q29sbGVjdG9yLiBBbHdheXMgY2FsbCBzdXBlci5jb2xsZWN0TGlnaHRzKCkgYWZ0ZXIgY3VzdG9tIG92ZXJyaWRkZW4gY29kZS5cblx0ICovXG5cdHB1YmxpYyBjb2xsZWN0TGlnaHRzKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpXG5cdHtcblx0XHR0aGlzLnVwZGF0ZVByb2JlV2VpZ2h0cyhyZW5kZXJhYmxlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSB3ZWlnaHRzIGZvciB0aGUgbGlnaHQgcHJvYmVzLCBiYXNlZCBvbiB0aGUgcmVuZGVyYWJsZSdzIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZW0uXG5cdCAqIEBwYXJhbSByZW5kZXJhYmxlIFRoZSByZW5kZXJibGUgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgbGlnaHQgcHJvYmVzJyBpbmZsdWVuY2UuXG5cdCAqL1xuXHRwcml2YXRlIHVwZGF0ZVByb2JlV2VpZ2h0cyhyZW5kZXJhYmxlOklSZW5kZXJhYmxlKVxuXHR7XG5cdFx0Ly8gdG9kbzogdGhpcyB3aWxsIGNhdXNlIHRoZSBzYW1lIGNhbGN1bGF0aW9ucyB0byBvY2N1ciBwZXIgVHJpYW5nbGVTdWJNZXNoLiBTZWUgaWYgdGhpcyBjYW4gYmUgaW1wcm92ZWQuXG5cdFx0dmFyIG9iamVjdFBvczpWZWN0b3IzRCA9IHJlbmRlcmFibGUuc291cmNlRW50aXR5LnNjZW5lUG9zaXRpb247XG5cdFx0dmFyIGxpZ2h0UG9zOlZlY3RvcjNEO1xuXG5cdFx0dmFyIHJ4Om51bWJlciA9IG9iamVjdFBvcy54LCByeTpudW1iZXIgPSBvYmplY3RQb3MueSwgcno6bnVtYmVyID0gb2JqZWN0UG9zLno7XG5cdFx0dmFyIGR4Om51bWJlciwgZHk6bnVtYmVyLCBkejpudW1iZXI7XG5cdFx0dmFyIHc6bnVtYmVyLCB0b3RhbDpudW1iZXIgPSAwO1xuXHRcdHZhciBpOm51bWJlcjtcblxuXHRcdC8vIGNhbGN1bGF0ZXMgd2VpZ2h0cyBmb3IgcHJvYmVzXG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX3BOdW1MaWdodFByb2JlczsgKytpKSB7XG5cblx0XHRcdGxpZ2h0UG9zID0gdGhpcy5fcExpZ2h0UHJvYmVzW2ldLnNjZW5lUG9zaXRpb247XG5cdFx0XHRkeCA9IHJ4IC0gbGlnaHRQb3MueDtcblx0XHRcdGR5ID0gcnkgLSBsaWdodFBvcy55O1xuXHRcdFx0ZHogPSByeiAtIGxpZ2h0UG9zLno7XG5cdFx0XHQvLyB3ZWlnaHQgaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byBzcXVhcmUgb2YgZGlzdGFuY2Vcblx0XHRcdHcgPSBkeCpkeCArIGR5KmR5ICsgZHoqZHo7XG5cblx0XHRcdC8vIGp1c3QuLi4gaHVnZSBpZiBhdCB0aGUgc2FtZSBzcG90XG5cdFx0XHR3ID0gdyA+IC4wMDAwMT8gMS93IDogNTAwMDAwMDA7XG5cdFx0XHR0aGlzLl9wTGlnaHRQcm9iZVdlaWdodHNbaV0gPSB3O1xuXHRcdFx0dG90YWwgKz0gdztcblx0XHR9XG5cblx0XHQvLyBub3JtYWxpemVcblx0XHR0b3RhbCA9IDEvdG90YWw7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fcE51bUxpZ2h0UHJvYmVzOyArK2kpXG5cdFx0XHR0aGlzLl9wTGlnaHRQcm9iZVdlaWdodHNbaV0gKj0gdG90YWw7XG5cdH1cbn1cblxuZXhwb3J0ID0gTGlnaHRQaWNrZXJCYXNlOyJdfQ==