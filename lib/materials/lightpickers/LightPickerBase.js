var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetBase = require("awayjs-core/lib/library/AssetBase");
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
            return LightPickerBase.assetType;
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
    LightPickerBase.assetType = "[asset LightPicker]";
    return LightPickerBase;
})(AssetBase);
module.exports = LightPickerBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvbGlnaHRwaWNrZXJzL0xpZ2h0UGlja2VyQmFzZS50cyJdLCJuYW1lcyI6WyJMaWdodFBpY2tlckJhc2UiLCJMaWdodFBpY2tlckJhc2UuY29uc3RydWN0b3IiLCJMaWdodFBpY2tlckJhc2UuZGlzcG9zZSIsIkxpZ2h0UGlja2VyQmFzZS5hc3NldFR5cGUiLCJMaWdodFBpY2tlckJhc2UubnVtRGlyZWN0aW9uYWxMaWdodHMiLCJMaWdodFBpY2tlckJhc2UubnVtUG9pbnRMaWdodHMiLCJMaWdodFBpY2tlckJhc2UubnVtQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLm51bUNhc3RpbmdQb2ludExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5udW1MaWdodFByb2JlcyIsIkxpZ2h0UGlja2VyQmFzZS5wb2ludExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5kaXJlY3Rpb25hbExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5jYXN0aW5nUG9pbnRMaWdodHMiLCJMaWdodFBpY2tlckJhc2UuY2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLmxpZ2h0UHJvYmVzIiwiTGlnaHRQaWNrZXJCYXNlLmxpZ2h0UHJvYmVXZWlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLmFsbFBpY2tlZExpZ2h0cyIsIkxpZ2h0UGlja2VyQmFzZS5jb2xsZWN0TGlnaHRzIiwiTGlnaHRQaWNrZXJCYXNlLnVwZGF0ZVByb2JlV2VpZ2h0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQVVwRSxBQU9BOzs7Ozs7R0FERztJQUNHLGVBQWU7SUFBU0EsVUFBeEJBLGVBQWVBLFVBQWtCQTtJQWtCdENBOztPQUVHQTtJQUNIQSxTQXJCS0EsZUFBZUE7UUF1Qm5CQyxpQkFBT0EsQ0FBQ0E7UUFuQkZBLHFCQUFnQkEsR0FBVUEsQ0FBQ0Es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LEtBQUtBLElBQUlBLENBQUNBLENBQUNBO1FBQ1pBLENBQUNBO1FBRURBLEFBQ0FBLFlBRFlBO1FBQ1pBLEtBQUtBLEdBQUdBLENBQUNBLEdBQUNBLEtBQUtBLENBQUNBO1FBRWhCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLEVBQUVBLENBQUNBO1lBQ3pDQSxJQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLEtBQUtBLENBQUNBO0lBQ3ZDQSxDQUFDQTtJQW5MYWpCLHlCQUFTQSxHQUFVQSxxQkFBcUJBLENBQUNBO0lBb0x4REEsc0JBQUNBO0FBQURBLENBdExBLEFBc0xDQSxFQXRMNkIsU0FBUyxFQXNMdEM7QUFFRCxBQUF5QixpQkFBaEIsZUFBZSxDQUFDIiwiZmlsZSI6Im1hdGVyaWFscy9saWdodHBpY2tlcnMvTGlnaHRQaWNrZXJCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IEFzc2V0QmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldEJhc2VcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xuXG5pbXBvcnQgTGlnaHRCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xpZ2h0QmFzZVwiKTtcbmltcG9ydCBJUmVuZGVyYWJsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVwiKTtcbmltcG9ydCBDb2xsZWN0b3JCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvQ29sbGVjdG9yQmFzZVwiKTtcbmltcG9ydCBEaXJlY3Rpb25hbExpZ2h0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvRGlyZWN0aW9uYWxMaWdodFwiKTtcbmltcG9ydCBMaWdodFByb2JlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9MaWdodFByb2JlXCIpO1xuaW1wb3J0IFBvaW50TGlnaHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL1BvaW50TGlnaHRcIik7XG5cbi8qKlxuICogTGlnaHRQaWNrZXJCYXNlIHByb3ZpZGVzIGFuIGFic3RyYWN0IGJhc2UgY2xhc2UgZm9yIGxpZ2h0IHBpY2tlciBjbGFzc2VzLiBUaGVzZSBjbGFzc2VzIGFyZSByZXNwb25zaWJsZSBmb3JcbiAqIGZlZWRpbmcgbWF0ZXJpYWxzIHdpdGggcmVsZXZhbnQgbGlnaHRzLiBVc3VhbGx5LCBTdGF0aWNMaWdodFBpY2tlciBjYW4gYmUgdXNlZCwgYnV0IExpZ2h0UGlja2VyQmFzZSBjYW4gYmVcbiAqIGV4dGVuZGVkIHRvIHByb3ZpZGUgbW9yZSBhcHBsaWNhdGlvbi1zcGVjaWZpYyBkeW5hbWljIHNlbGVjdGlvbiBvZiBsaWdodHMuXG4gKlxuICogQHNlZSBTdGF0aWNMaWdodFBpY2tlclxuICovXG5jbGFzcyBMaWdodFBpY2tlckJhc2UgZXh0ZW5kcyBBc3NldEJhc2UgaW1wbGVtZW50cyBJQXNzZXRcbntcblx0cHVibGljIHN0YXRpYyBhc3NldFR5cGU6c3RyaW5nID0gXCJbYXNzZXQgTGlnaHRQaWNrZXJdXCI7XG5cblx0cHVibGljIF9wTnVtUG9pbnRMaWdodHM6bnVtYmVyID0gMDtcblx0cHVibGljIF9wTnVtRGlyZWN0aW9uYWxMaWdodHM6bnVtYmVyID0gMDtcblx0cHVibGljIF9wTnVtQ2FzdGluZ1BvaW50TGlnaHRzOm51bWJlciA9IDA7XG5cdHB1YmxpYyBfcE51bUNhc3RpbmdEaXJlY3Rpb25hbExpZ2h0czpudW1iZXIgPSAwO1xuXHRwdWJsaWMgX3BOdW1MaWdodFByb2JlczpudW1iZXIgPSAwO1xuXG5cdHB1YmxpYyBfcEFsbFBpY2tlZExpZ2h0czpBcnJheTxMaWdodEJhc2U+O1xuXHRwdWJsaWMgX3BQb2ludExpZ2h0czpBcnJheTxQb2ludExpZ2h0Pjtcblx0cHVibGljIF9wQ2FzdGluZ1BvaW50TGlnaHRzOkFycmF5PFBvaW50TGlnaHQ+O1xuXHRwdWJsaWMgX3BEaXJlY3Rpb25hbExpZ2h0czpBcnJheTxEaXJlY3Rpb25hbExpZ2h0Pjtcblx0cHVibGljIF9wQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzOkFycmF5PERpcmVjdGlvbmFsTGlnaHQ+O1xuXHRwdWJsaWMgX3BMaWdodFByb2JlczpBcnJheTxMaWdodFByb2JlPjtcblx0cHVibGljIF9wTGlnaHRQcm9iZVdlaWdodHM6QXJyYXk8bnVtYmVyPjtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBMaWdodFBpY2tlckJhc2Ugb2JqZWN0LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEaXNwb3NlcyByZXNvdXJjZXMgdXNlZCBieSB0aGUgbGlnaHQgcGlja2VyLlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gTGlnaHRQaWNrZXJCYXNlLmFzc2V0VHlwZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbWF4aW11bSBhbW91bnQgb2YgZGlyZWN0aW9uYWwgbGlnaHRzIHRoYXQgd2lsbCBiZSBwcm92aWRlZC5cblx0ICovXG5cdHB1YmxpYyBnZXQgbnVtRGlyZWN0aW9uYWxMaWdodHMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTnVtRGlyZWN0aW9uYWxMaWdodHM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG1heGltdW0gYW1vdW50IG9mIHBvaW50IGxpZ2h0cyB0aGF0IHdpbGwgYmUgcHJvdmlkZWQuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG51bVBvaW50TGlnaHRzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE51bVBvaW50TGlnaHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBkaXJlY3Rpb25hbCBsaWdodHMgdGhhdCBjYXN0IHNoYWRvd3MuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG51bUNhc3RpbmdEaXJlY3Rpb25hbExpZ2h0cygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BOdW1DYXN0aW5nRGlyZWN0aW9uYWxMaWdodHM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGFtb3VudCBvZiBwb2ludCBsaWdodHMgdGhhdCBjYXN0IHNoYWRvd3MuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG51bUNhc3RpbmdQb2ludExpZ2h0cygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BOdW1DYXN0aW5nUG9pbnRMaWdodHM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG1heGltdW0gYW1vdW50IG9mIGxpZ2h0IHByb2JlcyB0aGF0IHdpbGwgYmUgcHJvdmlkZWQuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG51bUxpZ2h0UHJvYmVzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcE51bUxpZ2h0UHJvYmVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBjb2xsZWN0ZWQgcG9pbnQgbGlnaHRzIHRvIGJlIHVzZWQgZm9yIHNoYWRpbmcuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBvaW50TGlnaHRzKCk6QXJyYXk8UG9pbnRMaWdodD5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUG9pbnRMaWdodHM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGNvbGxlY3RlZCBkaXJlY3Rpb25hbCBsaWdodHMgdG8gYmUgdXNlZCBmb3Igc2hhZGluZy5cblx0ICovXG5cdHB1YmxpYyBnZXQgZGlyZWN0aW9uYWxMaWdodHMoKTpBcnJheTxEaXJlY3Rpb25hbExpZ2h0PlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BEaXJlY3Rpb25hbExpZ2h0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgY29sbGVjdGVkIHBvaW50IGxpZ2h0cyB0aGF0IGNhc3Qgc2hhZG93cyB0byBiZSB1c2VkIGZvciBzaGFkaW5nLlxuXHQgKi9cblx0cHVibGljIGdldCBjYXN0aW5nUG9pbnRMaWdodHMoKTpBcnJheTxQb2ludExpZ2h0PlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BDYXN0aW5nUG9pbnRMaWdodHM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGNvbGxlY3RlZCBkaXJlY3Rpb25hbCBsaWdodHMgdGhhdCBjYXN0IHNoYWRvd3MgdG8gYmUgdXNlZCBmb3Igc2hhZGluZy5cblx0ICovXG5cdHB1YmxpYyBnZXQgY2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzKCk6QXJyYXk8RGlyZWN0aW9uYWxMaWdodD5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQ2FzdGluZ0RpcmVjdGlvbmFsTGlnaHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBjb2xsZWN0ZWQgbGlnaHQgcHJvYmVzIHRvIGJlIHVzZWQgZm9yIHNoYWRpbmcuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGxpZ2h0UHJvYmVzKCk6QXJyYXk8TGlnaHRQcm9iZT5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTGlnaHRQcm9iZXM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHdlaWdodHMgZm9yIGVhY2ggbGlnaHQgcHJvYmUsIGRlZmluaW5nIHRoZWlyIGluZmx1ZW5jZSBvbiB0aGUgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGdldCBsaWdodFByb2JlV2VpZ2h0cygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTGlnaHRQcm9iZVdlaWdodHM7XG5cdH1cblxuXHQvKipcblx0ICogQSBjb2xsZWN0aW9uIG9mIGFsbCB0aGUgY29sbGVjdGVkIGxpZ2h0cy5cblx0ICovXG5cdHB1YmxpYyBnZXQgYWxsUGlja2VkTGlnaHRzKCk6QXJyYXk8TGlnaHRCYXNlPlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BBbGxQaWNrZWRMaWdodHM7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyBzZXQgb2YgbGlnaHRzIGZvciBhIGdpdmVuIHJlbmRlcmFibGUgYW5kIEVudGl0eUNvbGxlY3Rvci4gQWx3YXlzIGNhbGwgc3VwZXIuY29sbGVjdExpZ2h0cygpIGFmdGVyIGN1c3RvbSBvdmVycmlkZGVuIGNvZGUuXG5cdCAqL1xuXHRwdWJsaWMgY29sbGVjdExpZ2h0cyhyZW5kZXJhYmxlOklSZW5kZXJhYmxlKVxuXHR7XG5cdFx0dGhpcy51cGRhdGVQcm9iZVdlaWdodHMocmVuZGVyYWJsZSk7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgd2VpZ2h0cyBmb3IgdGhlIGxpZ2h0IHByb2JlcywgYmFzZWQgb24gdGhlIHJlbmRlcmFibGUncyBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGVtLlxuXHQgKiBAcGFyYW0gcmVuZGVyYWJsZSBUaGUgcmVuZGVyYmxlIGZvciB3aGljaCB0byBjYWxjdWxhdGUgdGhlIGxpZ2h0IHByb2JlcycgaW5mbHVlbmNlLlxuXHQgKi9cblx0cHJpdmF0ZSB1cGRhdGVQcm9iZVdlaWdodHMocmVuZGVyYWJsZTpJUmVuZGVyYWJsZSlcblx0e1xuXHRcdC8vIHRvZG86IHRoaXMgd2lsbCBjYXVzZSB0aGUgc2FtZSBjYWxjdWxhdGlvbnMgdG8gb2NjdXIgcGVyIFRyaWFuZ2xlU3ViTWVzaC4gU2VlIGlmIHRoaXMgY2FuIGJlIGltcHJvdmVkLlxuXHRcdHZhciBvYmplY3RQb3M6VmVjdG9yM0QgPSByZW5kZXJhYmxlLnNvdXJjZUVudGl0eS5zY2VuZVBvc2l0aW9uO1xuXHRcdHZhciBsaWdodFBvczpWZWN0b3IzRDtcblxuXHRcdHZhciByeDpudW1iZXIgPSBvYmplY3RQb3MueCwgcnk6bnVtYmVyID0gb2JqZWN0UG9zLnksIHJ6Om51bWJlciA9IG9iamVjdFBvcy56O1xuXHRcdHZhciBkeDpudW1iZXIsIGR5Om51bWJlciwgZHo6bnVtYmVyO1xuXHRcdHZhciB3Om51bWJlciwgdG90YWw6bnVtYmVyID0gMDtcblx0XHR2YXIgaTpudW1iZXI7XG5cblx0XHQvLyBjYWxjdWxhdGVzIHdlaWdodHMgZm9yIHByb2Jlc1xuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9wTnVtTGlnaHRQcm9iZXM7ICsraSkge1xuXG5cdFx0XHRsaWdodFBvcyA9IHRoaXMuX3BMaWdodFByb2Jlc1tpXS5zY2VuZVBvc2l0aW9uO1xuXHRcdFx0ZHggPSByeCAtIGxpZ2h0UG9zLng7XG5cdFx0XHRkeSA9IHJ5IC0gbGlnaHRQb3MueTtcblx0XHRcdGR6ID0gcnogLSBsaWdodFBvcy56O1xuXHRcdFx0Ly8gd2VpZ2h0IGlzIGludmVyc2VseSBwcm9wb3J0aW9uYWwgdG8gc3F1YXJlIG9mIGRpc3RhbmNlXG5cdFx0XHR3ID0gZHgqZHggKyBkeSpkeSArIGR6KmR6O1xuXG5cdFx0XHQvLyBqdXN0Li4uIGh1Z2UgaWYgYXQgdGhlIHNhbWUgc3BvdFxuXHRcdFx0dyA9IHcgPiAuMDAwMDE/IDEvdyA6IDUwMDAwMDAwO1xuXHRcdFx0dGhpcy5fcExpZ2h0UHJvYmVXZWlnaHRzW2ldID0gdztcblx0XHRcdHRvdGFsICs9IHc7XG5cdFx0fVxuXG5cdFx0Ly8gbm9ybWFsaXplXG5cdFx0dG90YWwgPSAxL3RvdGFsO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX3BOdW1MaWdodFByb2JlczsgKytpKVxuXHRcdFx0dGhpcy5fcExpZ2h0UHJvYmVXZWlnaHRzW2ldICo9IHRvdGFsO1xuXHR9XG59XG5cbmV4cG9ydCA9IExpZ2h0UGlja2VyQmFzZTsiXX0=