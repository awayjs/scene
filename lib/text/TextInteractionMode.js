/**
 * A class that defines the Interactive mode of a text field object.
 *
 * @see away.entities.TextField#textInteractionMode
 */
var TextInteractionMode = (function () {
    function TextInteractionMode() {
    }
    /**
     * The text field's default interaction mode is NORMAL and it varies across
     * platform. On Desktop, the normal mode implies that the text field is in
     * scrollable + selection mode. On Mobile platforms like Android, normal mode
     * implies that the text field can only be scrolled but the text can not be
     * selected.
     */
    TextInteractionMode.NORMAL = "normal";
    /**
     * On mobile platforms like Android, the text field starts in normal mode
     * (which implies scroll and non-selectable mode). The user can switch to
     * selection mode through the in-built context menu of the text field object.
     */
    TextInteractionMode.SELECTION = "selection";
    return TextInteractionMode;
})();
module.exports = TextInteractionMode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1RleHRJbnRlcmFjdGlvbk1vZGUudHMiXSwibmFtZXMiOlsiVGV4dEludGVyYWN0aW9uTW9kZSIsIlRleHRJbnRlcmFjdGlvbk1vZGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBS0E7Ozs7R0FERztJQUNHLG1CQUFtQjtJQUF6QkEsU0FBTUEsbUJBQW1CQTtJQWlCekJDLENBQUNBO0lBZkFEOzs7Ozs7T0FNR0E7SUFDV0EsMEJBQU1BLEdBQVVBLFFBQVFBLENBQUNBO0lBRXZDQTs7OztPQUlHQTtJQUNXQSw2QkFBU0EsR0FBVUEsV0FBV0EsQ0FBQ0E7SUFDOUNBLDBCQUFDQTtBQUFEQSxDQWpCQSxBQWlCQ0EsSUFBQTtBQUVELEFBQTZCLGlCQUFwQixtQkFBbUIsQ0FBQyIsImZpbGUiOiJ0ZXh0L1RleHRJbnRlcmFjdGlvbk1vZGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEEgY2xhc3MgdGhhdCBkZWZpbmVzIHRoZSBJbnRlcmFjdGl2ZSBtb2RlIG9mIGEgdGV4dCBmaWVsZCBvYmplY3QuXHJcbiAqXHJcbiAqIEBzZWUgYXdheS5lbnRpdGllcy5UZXh0RmllbGQjdGV4dEludGVyYWN0aW9uTW9kZVxyXG4gKi9cclxuY2xhc3MgVGV4dEludGVyYWN0aW9uTW9kZVxyXG57XHJcblx0LyoqXHJcblx0ICogVGhlIHRleHQgZmllbGQncyBkZWZhdWx0IGludGVyYWN0aW9uIG1vZGUgaXMgTk9STUFMIGFuZCBpdCB2YXJpZXMgYWNyb3NzXHJcblx0ICogcGxhdGZvcm0uIE9uIERlc2t0b3AsIHRoZSBub3JtYWwgbW9kZSBpbXBsaWVzIHRoYXQgdGhlIHRleHQgZmllbGQgaXMgaW5cclxuXHQgKiBzY3JvbGxhYmxlICsgc2VsZWN0aW9uIG1vZGUuIE9uIE1vYmlsZSBwbGF0Zm9ybXMgbGlrZSBBbmRyb2lkLCBub3JtYWwgbW9kZVxyXG5cdCAqIGltcGxpZXMgdGhhdCB0aGUgdGV4dCBmaWVsZCBjYW4gb25seSBiZSBzY3JvbGxlZCBidXQgdGhlIHRleHQgY2FuIG5vdCBiZVxyXG5cdCAqIHNlbGVjdGVkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgTk9STUFMOnN0cmluZyA9IFwibm9ybWFsXCI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9uIG1vYmlsZSBwbGF0Zm9ybXMgbGlrZSBBbmRyb2lkLCB0aGUgdGV4dCBmaWVsZCBzdGFydHMgaW4gbm9ybWFsIG1vZGVcclxuXHQgKiAod2hpY2ggaW1wbGllcyBzY3JvbGwgYW5kIG5vbi1zZWxlY3RhYmxlIG1vZGUpLiBUaGUgdXNlciBjYW4gc3dpdGNoIHRvXHJcblx0ICogc2VsZWN0aW9uIG1vZGUgdGhyb3VnaCB0aGUgaW4tYnVpbHQgY29udGV4dCBtZW51IG9mIHRoZSB0ZXh0IGZpZWxkIG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIFNFTEVDVElPTjpzdHJpbmcgPSBcInNlbGVjdGlvblwiO1xyXG59XHJcblxyXG5leHBvcnQgPSBUZXh0SW50ZXJhY3Rpb25Nb2RlOyJdfQ==