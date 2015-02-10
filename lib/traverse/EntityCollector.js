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
        this.isEntityCollector = true;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9lbnRpdHljb2xsZWN0b3IudHMiXSwibmFtZXMiOlsiRW50aXR5Q29sbGVjdG9yIiwiRW50aXR5Q29sbGVjdG9yLmNvbnN0cnVjdG9yIiwiRW50aXR5Q29sbGVjdG9yLmRpcmVjdGlvbmFsTGlnaHRzIiwiRW50aXR5Q29sbGVjdG9yLmxpZ2h0UHJvYmVzIiwiRW50aXR5Q29sbGVjdG9yLmxpZ2h0cyIsIkVudGl0eUNvbGxlY3Rvci5wb2ludExpZ2h0cyIsIkVudGl0eUNvbGxlY3Rvci5za3lCb3giLCJFbnRpdHlDb2xsZWN0b3IuYXBwbHlEaXJlY3Rpb25hbExpZ2h0IiwiRW50aXR5Q29sbGVjdG9yLmFwcGx5TGlnaHRQcm9iZSIsIkVudGl0eUNvbGxlY3Rvci5hcHBseVBvaW50TGlnaHQiLCJFbnRpdHlDb2xsZWN0b3IuYXBwbHlTa3lib3giLCJFbnRpdHlDb2xsZWN0b3IuY2xlYXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sYUFBYSxXQUFjLDJDQUEyQyxDQUFDLENBQUM7QUFPL0UsQUFHQTs7R0FERztJQUNHLGVBQWU7SUFBU0EsVUFBeEJBLGVBQWVBLFVBQXNCQTtJQXNEMUNBLFNBdERLQSxlQUFlQTtRQXdEbkJDLGlCQUFPQSxDQUFDQTtRQWhERkEsZ0JBQVdBLEdBQVVBLENBQUNBLENBQUNBO1FBRXRCQSwwQkFBcUJBLEdBQVVBLENBQUNBLENBQUNBO1FBQ2pDQSxvQkFBZUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDM0JBLG9CQUFlQSxHQUFVQSxDQUFDQSxDQUFDQTtRQThDbENBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLEtBQUtBLEVBQWFBLENBQUNBO1FBQ3ZDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEdBQUdBLElBQUlBLEtBQUtBLEVBQW9CQSxDQUFDQTtRQUN4REEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsS0FBS0EsRUFBY0EsQ0FBQ0E7UUFDNUNBLElBQUlB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LGVBQWVBLEdBQUdBLENBQUNBLENBQUNBO0lBQ3REQSxDQUFDQTtJQUNGWCxzQkFBQ0E7QUFBREEsQ0EzSEEsQUEySENBLEVBM0g2QixhQUFhLEVBMkgxQztBQUVELEFBQXlCLGlCQUFoQixlQUFlLENBQUMiLCJmaWxlIjoidHJhdmVyc2UvRW50aXR5Q29sbGVjdG9yLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaWdodEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvTGlnaHRCYXNlXCIpO1xuaW1wb3J0IENvbGxlY3RvckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9Db2xsZWN0b3JCYXNlXCIpO1xuaW1wb3J0IERpcmVjdGlvbmFsTGlnaHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9EaXJlY3Rpb25hbExpZ2h0XCIpO1xuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcbmltcG9ydCBMaWdodFByb2JlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9MaWdodFByb2JlXCIpO1xuaW1wb3J0IFBvaW50TGlnaHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL1BvaW50TGlnaHRcIik7XG5pbXBvcnQgU2t5Ym94XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL1NreWJveFwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS50cmF2ZXJzZS5FbnRpdHlDb2xsZWN0b3JcbiAqL1xuY2xhc3MgRW50aXR5Q29sbGVjdG9yIGV4dGVuZHMgQ29sbGVjdG9yQmFzZVxue1xuXHRwdWJsaWMgX3BTa3lib3g6U2t5Ym94O1xuXHRwdWJsaWMgX3BMaWdodHM6QXJyYXk8TGlnaHRCYXNlPjtcblx0cHJpdmF0ZSBfZGlyZWN0aW9uYWxMaWdodHM6QXJyYXk8RGlyZWN0aW9uYWxMaWdodD47XG5cdHByaXZhdGUgX3BvaW50TGlnaHRzOkFycmF5PFBvaW50TGlnaHQ+O1xuXHRwcml2YXRlIF9saWdodFByb2JlczpBcnJheTxMaWdodFByb2JlPjtcblxuXHRwdWJsaWMgX3BOdW1MaWdodHM6bnVtYmVyID0gMDtcblxuXHRwcml2YXRlIF9udW1EaXJlY3Rpb25hbExpZ2h0czpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9udW1Qb2ludExpZ2h0czpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9udW1MaWdodFByb2JlczpudW1iZXIgPSAwO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBkaXJlY3Rpb25hbExpZ2h0cygpOkFycmF5PERpcmVjdGlvbmFsTGlnaHQ+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGlyZWN0aW9uYWxMaWdodHM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgbGlnaHRQcm9iZXMoKTpBcnJheTxMaWdodFByb2JlPlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xpZ2h0UHJvYmVzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGxpZ2h0cygpOkFycmF5PExpZ2h0QmFzZT5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTGlnaHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBvaW50TGlnaHRzKCk6QXJyYXk8UG9pbnRMaWdodD5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wb2ludExpZ2h0cztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBza3lCb3goKTpTa3lib3hcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU2t5Ym94O1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3BMaWdodHMgPSBuZXcgQXJyYXk8TGlnaHRCYXNlPigpO1xuXHRcdHRoaXMuX2RpcmVjdGlvbmFsTGlnaHRzID0gbmV3IEFycmF5PERpcmVjdGlvbmFsTGlnaHQ+KCk7XG5cdFx0dGhpcy5fcG9pbnRMaWdodHMgPSBuZXcgQXJyYXk8UG9pbnRMaWdodD4oKTtcblx0XHR0aGlzLl9saWdodFByb2JlcyA9IG5ldyBBcnJheTxMaWdodFByb2JlPigpO1xuXG5cdFx0dGhpcy5pc0VudGl0eUNvbGxlY3RvciA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGVudGl0eVxuXHQgKi9cblx0cHVibGljIGFwcGx5RGlyZWN0aW9uYWxMaWdodChlbnRpdHk6SUVudGl0eSlcblx0e1xuXHRcdHRoaXMuX2RpcmVjdGlvbmFsTGlnaHRzWyB0aGlzLl9udW1EaXJlY3Rpb25hbExpZ2h0cysrIF0gPSA8RGlyZWN0aW9uYWxMaWdodD4gZW50aXR5O1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBlbnRpdHlcblx0ICovXG5cdHB1YmxpYyBhcHBseUxpZ2h0UHJvYmUoZW50aXR5OklFbnRpdHkpXG5cdHtcblx0XHR0aGlzLl9saWdodFByb2Jlc1sgdGhpcy5fbnVtTGlnaHRQcm9iZXMrKyBdID0gPExpZ2h0UHJvYmU+IGVudGl0eTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gZW50aXR5XG5cdCAqL1xuXHRwdWJsaWMgYXBwbHlQb2ludExpZ2h0KGVudGl0eTpJRW50aXR5KVxuXHR7XG5cdFx0dGhpcy5fcG9pbnRMaWdodHNbIHRoaXMuX251bVBvaW50TGlnaHRzKysgXSA9IDxQb2ludExpZ2h0PiBlbnRpdHk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGVudGl0eVxuXHQgKi9cblx0cHVibGljIGFwcGx5U2t5Ym94KGVudGl0eTpJRW50aXR5KVxuXHR7XG5cdFx0dGhpcy5fcFNreWJveCA9IDxTa3lib3g+IGVudGl0eTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGNsZWFyKClcblx0e1xuXHRcdHN1cGVyLmNsZWFyKCk7XG5cblx0XHR0aGlzLl9wU2t5Ym94ID0gbnVsbDtcblxuXHRcdGlmICh0aGlzLl9wTnVtTGlnaHRzID4gMClcblx0XHRcdHRoaXMuX3BMaWdodHMubGVuZ3RoID0gdGhpcy5fcE51bUxpZ2h0cyA9IDA7XG5cblx0XHRpZiAodGhpcy5fbnVtRGlyZWN0aW9uYWxMaWdodHMgPiAwKVxuXHRcdFx0dGhpcy5fZGlyZWN0aW9uYWxMaWdodHMubGVuZ3RoID0gdGhpcy5fbnVtRGlyZWN0aW9uYWxMaWdodHMgPSAwO1xuXG5cdFx0aWYgKHRoaXMuX251bVBvaW50TGlnaHRzID4gMClcblx0XHRcdHRoaXMuX3BvaW50TGlnaHRzLmxlbmd0aCA9IHRoaXMuX251bVBvaW50TGlnaHRzID0gMDtcblxuXHRcdGlmICh0aGlzLl9udW1MaWdodFByb2JlcyA+IDApXG5cdFx0XHR0aGlzLl9saWdodFByb2Jlcy5sZW5ndGggPSB0aGlzLl9udW1MaWdodFByb2JlcyA9IDA7XG5cdH1cbn1cblxuZXhwb3J0ID0gRW50aXR5Q29sbGVjdG9yOyJdfQ==