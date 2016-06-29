"use strict";
/**
 * @class away.base.HitTestCache
 */
var HitTestCache = (function () {
    function HitTestCache() {
        /**
         *
         */
        this.cells = new Array();
        /**
         *
         */
        this.lastCollisionIndex = -1;
    }
    return HitTestCache;
}());
exports.HitTestCache = HitTestCache;
