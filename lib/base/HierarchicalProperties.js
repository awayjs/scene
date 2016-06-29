"use strict";
/**
 *
 */
var HierarchicalProperties = (function () {
    function HierarchicalProperties() {
    }
    /**
     *
     */
    HierarchicalProperties.MOUSE_ENABLED = 1;
    /**
     *
     */
    HierarchicalProperties.VISIBLE = 2;
    /**
     *
     */
    HierarchicalProperties.MASK_ID = 4;
    /**
     *
     */
    HierarchicalProperties.MASKS = 8;
    /**
     *
     */
    HierarchicalProperties.COLOR_TRANSFORM = 16;
    /**
     *
     */
    HierarchicalProperties.SCENE_TRANSFORM = 32;
    /**
     *
     */
    HierarchicalProperties.ALL = 63;
    return HierarchicalProperties;
}());
exports.HierarchicalProperties = HierarchicalProperties;
