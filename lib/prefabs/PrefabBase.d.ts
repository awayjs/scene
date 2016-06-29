import { AssetBase } from "@awayjs/core/lib/library/AssetBase";
import { DisplayObject } from "../display/DisplayObject";
/**
 * PrefabBase is an abstract base class for prefabs, which are prebuilt display objects that allow easy cloning and updating
 */
export declare class PrefabBase extends AssetBase {
    _pObjects: Array<DisplayObject>;
    /**
     * Creates a new PrefabBase object.
     */
    constructor();
    /**
     * Returns a display object generated from this prefab
     */
    getNewObject(): DisplayObject;
    _pCreateObject(): DisplayObject;
    _iValidate(): void;
}
