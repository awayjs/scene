"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("@awayjs/core");
var CastError = (function (_super) {
    __extends(CastError, _super);
    function CastError(message) {
        return _super.call(this, message) || this;
    }
    return CastError;
}(core_1.ErrorBase));
exports.CastError = CastError;
