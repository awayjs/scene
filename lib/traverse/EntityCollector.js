var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
/**
 * @class away.traverse.EntityCollector
 */
var EntityCollector = (function (_super) {
    __extends(EntityCollector, _super);
    function EntityCollector() {
        _super.call(this);
        this._pNumLights = 0;
        this._numDirectionalLights = 0;
        this._numPointLights = 0;
        this._numLightProbes = 0;
        this._pLights = new Array();
        this._directionalLights = new Array();
        this._pointLights = new Array();
        this._lightProbes = new Array();
    }
    Object.defineProperty(EntityCollector.prototype, "directionalLights", {
        /**
         *
         */
        get: function () {
            return this._directionalLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityCollector.prototype, "lightProbes", {
        /**
         *
         */
        get: function () {
            return this._lightProbes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityCollector.prototype, "lights", {
        /**
         *
         */
        get: function () {
            return this._pLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityCollector.prototype, "pointLights", {
        /**
         *
         */
        get: function () {
            return this._pointLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityCollector.prototype, "skyBox", {
        /**
         *
         */
        get: function () {
            return this._pSkybox;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param entity
     */
    EntityCollector.prototype.applyDirectionalLight = function (entity) {
        this._directionalLights[this._numDirectionalLights++] = entity;
    };
    /**
     *
     * @param entity
     */
    EntityCollector.prototype.applyLightProbe = function (entity) {
        this._lightProbes[this._numLightProbes++] = entity;
    };
    /**
     *
     * @param entity
     */
    EntityCollector.prototype.applyPointLight = function (entity) {
        this._pointLights[this._numPointLights++] = entity;
    };
    /**
     *
     * @param entity
     */
    EntityCollector.prototype.applySkybox = function (entity) {
        this._pSkybox = entity;
    };
    /**
     *
     */
    EntityCollector.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._pSkybox = null;
        if (this._pNumLights > 0)
            this._pLights.length = this._pNumLights = 0;
        if (this._numDirectionalLights > 0)
            this._directionalLights.length = this._numDirectionalLights = 0;
        if (this._numPointLights > 0)
            this._pointLights.length = this._numPointLights = 0;
        if (this._numLightProbes > 0)
            this._lightProbes.length = this._numLightProbes = 0;
    };
    return EntityCollector;
})(CollectorBase);
module.exports = EntityCollector;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9FbnRpdHlDb2xsZWN0b3IudHMiXSwibmFtZXMiOlsiRW50aXR5Q29sbGVjdG9yIiwiRW50aXR5Q29sbGVjdG9yLmNvbnN0cnVjdG9yIiwiRW50aXR5Q29sbGVjdG9yLmRpcmVjdGlvbmFsTGlnaHRzIiwiRW50aXR5Q29sbGVjdG9yLmxpZ2h0UHJvYmVzIiwiRW50aXR5Q29sbGVjdG9yLmxpZ2h0cyIsIkVudGl0eUNvbGxlY3Rvci5wb2ludExpZ2h0cyIsIkVudGl0eUNvbGxlY3Rvci5za3lCb3giLCJFbnRpdHlDb2xsZWN0b3IuYXBwbHlEaXJlY3Rpb25hbExpZ2h0IiwiRW50aXR5Q29sbGVjdG9yLmFwcGx5TGlnaHRQcm9iZSIsIkVudGl0eUNvbGxlY3Rvci5hcHBseVBvaW50TGlnaHQiLCJFbnRpdHlDb2xsZWN0b3IuYXBwbHlTa3lib3giLCJFbnRpdHlDb2xsZWN0b3IuY2xlYXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sYUFBYSxXQUFjLDJDQUEyQyxDQUFDLENBQUM7QUFPL0UsQUFHQTs7R0FERztJQUNHLGVBQWU7SUFBU0EsVUFBeEJBLGVBQWVBLFVBQXNCQTtJQXNEMUNBLFNBdERLQSxlQUFlQTtRQXdEbkJDLGlCQUFPQSxDQUFDQTtRQWhERkEsZ0JBQVdBLEdBQVVBLENBQUNBLENBQUNBO1FBRXRCQSwwQkFBcUJBLEdBQVVBLENBQUNBLENBQUNBO1FBQ2pDQSxvQkFBZUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDM0JBLG9CQUFlQSxHQUFVQSxDQUFDQSxDQUFDQTtRQThDbENBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLEtBQUtBLEVBQWFBLENBQUNBO1FBQ3ZDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEdBQUdBLElBQUlBLEtBQUtBLEVBQW9CQSxDQUFDQTtRQUN4REEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsS0FBS0EsRUFBY0EsQ0FBQ0E7UUFDNUNBLElBQUlB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QkFBQ0E7QUFBREEsQ0F6SEEsQUF5SENBLEVBekg2QixhQUFhLEVBeUgxQztBQUVELEFBQXlCLGlCQUFoQixlQUFlLENBQUMiLCJmaWxlIjoidHJhdmVyc2UvRW50aXR5Q29sbGVjdG9yLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaWdodEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvTGlnaHRCYXNlXCIpO1xyXG5pbXBvcnQgQ29sbGVjdG9yQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0NvbGxlY3RvckJhc2VcIik7XHJcbmltcG9ydCBEaXJlY3Rpb25hbExpZ2h0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvRGlyZWN0aW9uYWxMaWdodFwiKTtcclxuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcclxuaW1wb3J0IExpZ2h0UHJvYmVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0xpZ2h0UHJvYmVcIik7XHJcbmltcG9ydCBQb2ludExpZ2h0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9Qb2ludExpZ2h0XCIpO1xyXG5pbXBvcnQgU2t5Ym94XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL1NreWJveFwiKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgYXdheS50cmF2ZXJzZS5FbnRpdHlDb2xsZWN0b3JcclxuICovXHJcbmNsYXNzIEVudGl0eUNvbGxlY3RvciBleHRlbmRzIENvbGxlY3RvckJhc2Vcclxue1xyXG5cdHB1YmxpYyBfcFNreWJveDpTa3lib3g7XHJcblx0cHVibGljIF9wTGlnaHRzOkFycmF5PExpZ2h0QmFzZT47XHJcblx0cHJpdmF0ZSBfZGlyZWN0aW9uYWxMaWdodHM6QXJyYXk8RGlyZWN0aW9uYWxMaWdodD47XHJcblx0cHJpdmF0ZSBfcG9pbnRMaWdodHM6QXJyYXk8UG9pbnRMaWdodD47XHJcblx0cHJpdmF0ZSBfbGlnaHRQcm9iZXM6QXJyYXk8TGlnaHRQcm9iZT47XHJcblxyXG5cdHB1YmxpYyBfcE51bUxpZ2h0czpudW1iZXIgPSAwO1xyXG5cclxuXHRwcml2YXRlIF9udW1EaXJlY3Rpb25hbExpZ2h0czpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX251bVBvaW50TGlnaHRzOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfbnVtTGlnaHRQcm9iZXM6bnVtYmVyID0gMDtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGRpcmVjdGlvbmFsTGlnaHRzKCk6QXJyYXk8RGlyZWN0aW9uYWxMaWdodD5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZGlyZWN0aW9uYWxMaWdodHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbGlnaHRQcm9iZXMoKTpBcnJheTxMaWdodFByb2JlPlxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9saWdodFByb2JlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBsaWdodHMoKTpBcnJheTxMaWdodEJhc2U+XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BMaWdodHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcG9pbnRMaWdodHMoKTpBcnJheTxQb2ludExpZ2h0PlxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wb2ludExpZ2h0cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBza3lCb3goKTpTa3lib3hcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFNreWJveDtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX3BMaWdodHMgPSBuZXcgQXJyYXk8TGlnaHRCYXNlPigpO1xyXG5cdFx0dGhpcy5fZGlyZWN0aW9uYWxMaWdodHMgPSBuZXcgQXJyYXk8RGlyZWN0aW9uYWxMaWdodD4oKTtcclxuXHRcdHRoaXMuX3BvaW50TGlnaHRzID0gbmV3IEFycmF5PFBvaW50TGlnaHQ+KCk7XHJcblx0XHR0aGlzLl9saWdodFByb2JlcyA9IG5ldyBBcnJheTxMaWdodFByb2JlPigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZW50aXR5XHJcblx0ICovXHJcblx0cHVibGljIGFwcGx5RGlyZWN0aW9uYWxMaWdodChlbnRpdHk6SUVudGl0eSlcclxuXHR7XHJcblx0XHR0aGlzLl9kaXJlY3Rpb25hbExpZ2h0c1sgdGhpcy5fbnVtRGlyZWN0aW9uYWxMaWdodHMrKyBdID0gPERpcmVjdGlvbmFsTGlnaHQ+IGVudGl0eTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGVudGl0eVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhcHBseUxpZ2h0UHJvYmUoZW50aXR5OklFbnRpdHkpXHJcblx0e1xyXG5cdFx0dGhpcy5fbGlnaHRQcm9iZXNbIHRoaXMuX251bUxpZ2h0UHJvYmVzKysgXSA9IDxMaWdodFByb2JlPiBlbnRpdHk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBlbnRpdHlcclxuXHQgKi9cclxuXHRwdWJsaWMgYXBwbHlQb2ludExpZ2h0KGVudGl0eTpJRW50aXR5KVxyXG5cdHtcclxuXHRcdHRoaXMuX3BvaW50TGlnaHRzWyB0aGlzLl9udW1Qb2ludExpZ2h0cysrIF0gPSA8UG9pbnRMaWdodD4gZW50aXR5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZW50aXR5XHJcblx0ICovXHJcblx0cHVibGljIGFwcGx5U2t5Ym94KGVudGl0eTpJRW50aXR5KVxyXG5cdHtcclxuXHRcdHRoaXMuX3BTa3lib3ggPSA8U2t5Ym94PiBlbnRpdHk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbGVhcigpXHJcblx0e1xyXG5cdFx0c3VwZXIuY2xlYXIoKTtcclxuXHJcblx0XHR0aGlzLl9wU2t5Ym94ID0gbnVsbDtcclxuXHJcblx0XHRpZiAodGhpcy5fcE51bUxpZ2h0cyA+IDApXHJcblx0XHRcdHRoaXMuX3BMaWdodHMubGVuZ3RoID0gdGhpcy5fcE51bUxpZ2h0cyA9IDA7XHJcblxyXG5cdFx0aWYgKHRoaXMuX251bURpcmVjdGlvbmFsTGlnaHRzID4gMClcclxuXHRcdFx0dGhpcy5fZGlyZWN0aW9uYWxMaWdodHMubGVuZ3RoID0gdGhpcy5fbnVtRGlyZWN0aW9uYWxMaWdodHMgPSAwO1xyXG5cclxuXHRcdGlmICh0aGlzLl9udW1Qb2ludExpZ2h0cyA+IDApXHJcblx0XHRcdHRoaXMuX3BvaW50TGlnaHRzLmxlbmd0aCA9IHRoaXMuX251bVBvaW50TGlnaHRzID0gMDtcclxuXHJcblx0XHRpZiAodGhpcy5fbnVtTGlnaHRQcm9iZXMgPiAwKVxyXG5cdFx0XHR0aGlzLl9saWdodFByb2Jlcy5sZW5ndGggPSB0aGlzLl9udW1MaWdodFByb2JlcyA9IDA7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBFbnRpdHlDb2xsZWN0b3I7Il19