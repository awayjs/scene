"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetEvent_1 = require("@awayjs/core/lib/events/AssetEvent");
var DirectionalLight_1 = require("../../display/DirectionalLight");
var LightProbe_1 = require("../../display/LightProbe");
var PointLight_1 = require("../../display/PointLight");
var LightEvent_1 = require("../../events/LightEvent");
var LightPickerBase_1 = require("../../materials/lightpickers/LightPickerBase");
/**
 * StaticLightPicker is a light picker that provides a static set of lights. The lights can be reassigned, but
 * if the configuration changes (number of directional lights, point lights, etc), a material recompilation may
 * occur.
 */
var StaticLightPicker = (function (_super) {
    __extends(StaticLightPicker, _super);
    /**
     * Creates a new StaticLightPicker object.
     * @param lights The lights to be used for shading.
     */
    function StaticLightPicker(lights) {
        var _this = this;
        _super.call(this);
        this._onCastShadowChangeDelegate = function (event) { return _this.onCastShadowChange(event); };
        this.lights = lights;
    }
    Object.defineProperty(StaticLightPicker.prototype, "lights", {
        /**
         * The lights used for shading.
         */
        get: function () {
            return this._lights;
        },
        set: function (value) {
            var numPointLights = 0;
            var numDirectionalLights = 0;
            var numCastingPointLights = 0;
            var numCastingDirectionalLights = 0;
            var numLightProbes = 0;
            var light;
            if (this._lights)
                this.clearListeners();
            this._lights = value;
            this._pAllPickedLights = value;
            this._pPointLights = new Array();
            this._pCastingPointLights = new Array();
            this._pDirectionalLights = new Array();
            this._pCastingDirectionalLights = new Array();
            this._pLightProbes = new Array();
            var len = value.length;
            for (var i = 0; i < len; ++i) {
                light = value[i];
                light.addEventListener(LightEvent_1.LightEvent.CASTS_SHADOW_CHANGE, this._onCastShadowChangeDelegate);
                if (light instanceof PointLight_1.PointLight) {
                    if (light.shadowsEnabled)
                        this._pCastingPointLights[numCastingPointLights++] = light;
                    else
                        this._pPointLights[numPointLights++] = light;
                }
                else if (light instanceof DirectionalLight_1.DirectionalLight) {
                    if (light.shadowsEnabled)
                        this._pCastingDirectionalLights[numCastingDirectionalLights++] = light;
                    else
                        this._pDirectionalLights[numDirectionalLights++] = light;
                }
                else if (light instanceof LightProbe_1.LightProbe) {
                    this._pLightProbes[numLightProbes++] = light;
                }
            }
            if (this._pNumDirectionalLights == numDirectionalLights && this._pNumPointLights == numPointLights && this._pNumLightProbes == numLightProbes && this._pNumCastingPointLights == numCastingPointLights && this._pNumCastingDirectionalLights == numCastingDirectionalLights)
                return;
            this._pNumDirectionalLights = numDirectionalLights;
            this._pNumCastingDirectionalLights = numCastingDirectionalLights;
            this._pNumPointLights = numPointLights;
            this._pNumCastingPointLights = numCastingPointLights;
            this._pNumLightProbes = numLightProbes;
            // MUST HAVE MULTIPLE OF 4 ELEMENTS!
            this._pLightProbeWeights = new Array(Math.ceil(numLightProbes / 4) * 4);
            // notify material lights have changed
            this.dispatchEvent(new AssetEvent_1.AssetEvent(AssetEvent_1.AssetEvent.INVALIDATE, this));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Remove configuration change listeners on the lights.
     */
    StaticLightPicker.prototype.clearListeners = function () {
        var len = this._lights.length;
        for (var i = 0; i < len; ++i)
            this._lights[i].removeEventListener(LightEvent_1.LightEvent.CASTS_SHADOW_CHANGE, this._onCastShadowChangeDelegate);
    };
    /**
     * Notifies the material of a configuration change.
     */
    StaticLightPicker.prototype.onCastShadowChange = function (event) {
        // TODO: Assign to special caster collections, just append it to the lights in SinglePass
        // But keep seperated in multipass
        var light = event.target;
        if (light instanceof PointLight_1.PointLight)
            this.updatePointCasting(light);
        else if (light instanceof DirectionalLight_1.DirectionalLight)
            this.updateDirectionalCasting(light);
        this.dispatchEvent(new AssetEvent_1.AssetEvent(AssetEvent_1.AssetEvent.INVALIDATE, this));
    };
    /**
     * Called when a directional light's shadow casting configuration changes.
     */
    StaticLightPicker.prototype.updateDirectionalCasting = function (light) {
        var dl = light;
        if (light.shadowsEnabled) {
            --this._pNumDirectionalLights;
            ++this._pNumCastingDirectionalLights;
            this._pDirectionalLights.splice(this._pDirectionalLights.indexOf(dl), 1);
            this._pCastingDirectionalLights.push(light);
        }
        else {
            ++this._pNumDirectionalLights;
            --this._pNumCastingDirectionalLights;
            this._pCastingDirectionalLights.splice(this._pCastingDirectionalLights.indexOf(dl), 1);
            this._pDirectionalLights.push(light);
        }
    };
    /**
     * Called when a point light's shadow casting configuration changes.
     */
    StaticLightPicker.prototype.updatePointCasting = function (light) {
        var pl = light;
        if (light.shadowsEnabled) {
            --this._pNumPointLights;
            ++this._pNumCastingPointLights;
            this._pPointLights.splice(this._pPointLights.indexOf(pl), 1);
            this._pCastingPointLights.push(light);
        }
        else {
            ++this._pNumPointLights;
            --this._pNumCastingPointLights;
            this._pCastingPointLights.splice(this._pCastingPointLights.indexOf(pl), 1);
            this._pPointLights.push(light);
        }
    };
    return StaticLightPicker;
}(LightPickerBase_1.LightPickerBase));
exports.StaticLightPicker = StaticLightPicker;
