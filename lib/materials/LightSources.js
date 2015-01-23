/**
 * Enumeration class for defining which lighting types affect the specific material
 * lighting component (diffuse and specular). This can be useful if, for example, you
 * want to use light probes for diffuse global lighting, but want specular reflections from
 * traditional light sources without those affecting the diffuse light.
 *
 * @see away.materials.ColorMaterial.diffuseLightSources
 * @see away.materials.ColorMaterial.specularLightSources
 * @see away.materials.TextureMaterial.diffuseLightSources
 * @see away.materials.TextureMaterial.specularLightSources
 */
var LightSources = (function () {
    function LightSources() {
    }
    /**
     * Defines normal lights are to be used as the source for the lighting
     * component.
     */
    LightSources.LIGHTS = 0x01;
    /**
     * Defines that global lighting probes are to be used as the source for the
     * lighting component.
     */
    LightSources.PROBES = 0x02;
    /**
     * Defines that both normal and global lighting probes  are to be used as the
     * source for the lighting component. This is equivalent to LightSources.LIGHTS | LightSources.PROBES.
     */
    LightSources.ALL = 0x03;
    return LightSources;
})();
module.exports = LightSources;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvbGlnaHRzb3VyY2VzLnRzIl0sIm5hbWVzIjpbIkxpZ2h0U291cmNlcyIsIkxpZ2h0U291cmNlcy5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6IkFBQUEsQUFXQTs7Ozs7Ozs7OztHQURHO0lBQ0csWUFBWTtJQUFsQkEsU0FBTUEsWUFBWUE7SUFtQmxCQyxDQUFDQTtJQWpCQUQ7OztPQUdHQTtJQUNXQSxtQkFBTUEsR0FBVUEsSUFBSUEsQ0FBQ0E7SUFFbkNBOzs7T0FHR0E7SUFDV0EsbUJBQU1BLEdBQVVBLElBQUlBLENBQUNBO0lBRW5DQTs7O09BR0dBO0lBQ1dBLGdCQUFHQSxHQUFVQSxJQUFJQSxDQUFDQTtJQUNqQ0EsbUJBQUNBO0FBQURBLENBbkJBLEFBbUJDQSxJQUFBO0FBRUQsQUFBc0IsaUJBQWIsWUFBWSxDQUFDIiwiZmlsZSI6Im1hdGVyaWFscy9MaWdodFNvdXJjZXMuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFbnVtZXJhdGlvbiBjbGFzcyBmb3IgZGVmaW5pbmcgd2hpY2ggbGlnaHRpbmcgdHlwZXMgYWZmZWN0IHRoZSBzcGVjaWZpYyBtYXRlcmlhbFxuICogbGlnaHRpbmcgY29tcG9uZW50IChkaWZmdXNlIGFuZCBzcGVjdWxhcikuIFRoaXMgY2FuIGJlIHVzZWZ1bCBpZiwgZm9yIGV4YW1wbGUsIHlvdVxuICogd2FudCB0byB1c2UgbGlnaHQgcHJvYmVzIGZvciBkaWZmdXNlIGdsb2JhbCBsaWdodGluZywgYnV0IHdhbnQgc3BlY3VsYXIgcmVmbGVjdGlvbnMgZnJvbVxuICogdHJhZGl0aW9uYWwgbGlnaHQgc291cmNlcyB3aXRob3V0IHRob3NlIGFmZmVjdGluZyB0aGUgZGlmZnVzZSBsaWdodC5cbiAqXG4gKiBAc2VlIGF3YXkubWF0ZXJpYWxzLkNvbG9yTWF0ZXJpYWwuZGlmZnVzZUxpZ2h0U291cmNlc1xuICogQHNlZSBhd2F5Lm1hdGVyaWFscy5Db2xvck1hdGVyaWFsLnNwZWN1bGFyTGlnaHRTb3VyY2VzXG4gKiBAc2VlIGF3YXkubWF0ZXJpYWxzLlRleHR1cmVNYXRlcmlhbC5kaWZmdXNlTGlnaHRTb3VyY2VzXG4gKiBAc2VlIGF3YXkubWF0ZXJpYWxzLlRleHR1cmVNYXRlcmlhbC5zcGVjdWxhckxpZ2h0U291cmNlc1xuICovXG5jbGFzcyBMaWdodFNvdXJjZXNcbntcblx0LyoqXG5cdCAqIERlZmluZXMgbm9ybWFsIGxpZ2h0cyBhcmUgdG8gYmUgdXNlZCBhcyB0aGUgc291cmNlIGZvciB0aGUgbGlnaHRpbmdcblx0ICogY29tcG9uZW50LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBMSUdIVFM6bnVtYmVyID0gMHgwMTtcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGF0IGdsb2JhbCBsaWdodGluZyBwcm9iZXMgYXJlIHRvIGJlIHVzZWQgYXMgdGhlIHNvdXJjZSBmb3IgdGhlXG5cdCAqIGxpZ2h0aW5nIGNvbXBvbmVudC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgUFJPQkVTOm51bWJlciA9IDB4MDI7XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhhdCBib3RoIG5vcm1hbCBhbmQgZ2xvYmFsIGxpZ2h0aW5nIHByb2JlcyAgYXJlIHRvIGJlIHVzZWQgYXMgdGhlXG5cdCAqIHNvdXJjZSBmb3IgdGhlIGxpZ2h0aW5nIGNvbXBvbmVudC4gVGhpcyBpcyBlcXVpdmFsZW50IHRvIExpZ2h0U291cmNlcy5MSUdIVFMgfCBMaWdodFNvdXJjZXMuUFJPQkVTLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBBTEw6bnVtYmVyID0gMHgwMztcbn1cblxuZXhwb3J0ID0gTGlnaHRTb3VyY2VzOyJdfQ==