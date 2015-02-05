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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L3RleHRpbnRlcmFjdGlvbm1vZGUudHMiXSwibmFtZXMiOlsiVGV4dEludGVyYWN0aW9uTW9kZSIsIlRleHRJbnRlcmFjdGlvbk1vZGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBS0E7Ozs7R0FERztJQUNHLG1CQUFtQjtJQUF6QkEsU0FBTUEsbUJBQW1CQTtJQWlCekJDLENBQUNBO0lBZkFEOzs7Ozs7T0FNR0E7SUFDV0EsMEJBQU1BLEdBQVVBLFFBQVFBLENBQUNBO0lBRXZDQTs7OztPQUlHQTtJQUNXQSw2QkFBU0EsR0FBVUEsV0FBV0EsQ0FBQ0E7SUFDOUNBLDBCQUFDQTtBQUFEQSxDQWpCQSxBQWlCQ0EsSUFBQTtBQUVELEFBQTZCLGlCQUFwQixtQkFBbUIsQ0FBQyIsImZpbGUiOiJ0ZXh0L1RleHRJbnRlcmFjdGlvbk1vZGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIGNsYXNzIHRoYXQgZGVmaW5lcyB0aGUgSW50ZXJhY3RpdmUgbW9kZSBvZiBhIHRleHQgZmllbGQgb2JqZWN0LlxuICpcbiAqIEBzZWUgYXdheS5lbnRpdGllcy5UZXh0RmllbGQjdGV4dEludGVyYWN0aW9uTW9kZVxuICovXG5jbGFzcyBUZXh0SW50ZXJhY3Rpb25Nb2RlXG57XG5cdC8qKlxuXHQgKiBUaGUgdGV4dCBmaWVsZCdzIGRlZmF1bHQgaW50ZXJhY3Rpb24gbW9kZSBpcyBOT1JNQUwgYW5kIGl0IHZhcmllcyBhY3Jvc3Ncblx0ICogcGxhdGZvcm0uIE9uIERlc2t0b3AsIHRoZSBub3JtYWwgbW9kZSBpbXBsaWVzIHRoYXQgdGhlIHRleHQgZmllbGQgaXMgaW5cblx0ICogc2Nyb2xsYWJsZSArIHNlbGVjdGlvbiBtb2RlLiBPbiBNb2JpbGUgcGxhdGZvcm1zIGxpa2UgQW5kcm9pZCwgbm9ybWFsIG1vZGVcblx0ICogaW1wbGllcyB0aGF0IHRoZSB0ZXh0IGZpZWxkIGNhbiBvbmx5IGJlIHNjcm9sbGVkIGJ1dCB0aGUgdGV4dCBjYW4gbm90IGJlXG5cdCAqIHNlbGVjdGVkLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBOT1JNQUw6c3RyaW5nID0gXCJub3JtYWxcIjtcblxuXHQvKipcblx0ICogT24gbW9iaWxlIHBsYXRmb3JtcyBsaWtlIEFuZHJvaWQsIHRoZSB0ZXh0IGZpZWxkIHN0YXJ0cyBpbiBub3JtYWwgbW9kZVxuXHQgKiAod2hpY2ggaW1wbGllcyBzY3JvbGwgYW5kIG5vbi1zZWxlY3RhYmxlIG1vZGUpLiBUaGUgdXNlciBjYW4gc3dpdGNoIHRvXG5cdCAqIHNlbGVjdGlvbiBtb2RlIHRocm91Z2ggdGhlIGluLWJ1aWx0IGNvbnRleHQgbWVudSBvZiB0aGUgdGV4dCBmaWVsZCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIFNFTEVDVElPTjpzdHJpbmcgPSBcInNlbGVjdGlvblwiO1xufVxuXG5leHBvcnQgPSBUZXh0SW50ZXJhY3Rpb25Nb2RlOyJdfQ==