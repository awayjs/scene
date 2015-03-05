var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
/**
 * The LoaderInfo class provides information about a loaded SWF file or a
 * loaded image file(JPEG, GIF, or PNG). LoaderInfo objects are available for
 * any display object. The information provided includes load progress, the
 * URLs of the loader and loaded content, the number of bytes total for the
 * media, and the nominal height and width of the media.
 *
 * <p>You can access LoaderInfo objects in two ways: </p>
 *
 * <ul>
 *   <li>The <code>contentLoaderInfo</code> property of a flash.display.Loader
 * object -  The <code>contentLoaderInfo</code> property is always available
 * for any Loader object. For a Loader object that has not called the
 * <code>load()</code> or <code>loadBytes()</code> method, or that has not
 * sufficiently loaded, attempting to access many of the properties of the
 * <code>contentLoaderInfo</code> property throws an error.</li>
 *   <li>The <code>loaderInfo</code> property of a display object. </li>
 * </ul>
 *
 * <p>The <code>contentLoaderInfo</code> property of a Loader object provides
 * information about the content that the Loader object is loading, whereas
 * the <code>loaderInfo</code> property of a DisplayObject provides
 * information about the root SWF file for that display object. </p>
 *
 * <p>When you use a Loader object to load a display object(such as a SWF
 * file or a bitmap), the <code>loaderInfo</code> property of the display
 * object is the same as the <code>contentLoaderInfo</code> property of the
 * Loader object(<code>DisplayObject.loaderInfo =
 * Loader.contentLoaderInfo</code>). Because the instance of the main class of
 * the SWF file has no Loader object, the <code>loaderInfo</code> property is
 * the only way to access the LoaderInfo for the instance of the main class of
 * the SWF file.</p>
 *
 * <p>The following diagram shows the different uses of the LoaderInfo
 * object - for the instance of the main class of the SWF file, for the
 * <code>contentLoaderInfo</code> property of a Loader object, and for the
 * <code>loaderInfo</code> property of a loaded object:</p>
 *
 * <p>When a loading operation is not complete, some properties of the
 * <code>contentLoaderInfo</code> property of a Loader object are not
 * available. You can obtain some properties, such as
 * <code>bytesLoaded</code>, <code>bytesTotal</code>, <code>url</code>,
 * <code>loaderURL</code>, and <code>applicationDomain</code>. When the
 * <code>loaderInfo</code> object dispatches the <code>init</code> event, you
 * can access all properties of the <code>loaderInfo</code> object and the
 * loaded image or SWF file.</p>
 *
 * <p><b>Note:</b> All properties of LoaderInfo objects are read-only.</p>
 *
 * <p>The <code>EventDispatcher.dispatchEvent()</code> method is not
 * applicable to LoaderInfo objects. If you call <code>dispatchEvent()</code>
 * on a LoaderInfo object, an IllegalOperationError exception is thrown.</p>
 *
 * @event complete   Dispatched when data has loaded successfully. In other
 *                   words, it is dispatched when all the content has been
 *                   downloaded and the loading has finished. The
 *                   <code>complete</code> event is always dispatched after
 *                   the <code>init</code> event. The <code>init</code> event
 *                   is dispatched when the object is ready to access, though
 *                   the content may still be downloading.
 * @event httpStatus Dispatched when a network request is made over HTTP and
 *                   an HTTP status code can be detected.
 * @event init       Dispatched when the properties and methods of a loaded
 *                   SWF file are accessible and ready for use. The content,
 *                   however, can still be downloading. A LoaderInfo object
 *                   dispatches the <code>init</code> event when the following
 *                   conditions exist:
 *                   <ul>
 *                     <li>All properties and methods associated with the
 *                   loaded object and those associated with the LoaderInfo
 *                   object are accessible.</li>
 *                     <li>The constructors for all child objects have
 *                   completed.</li>
 *                     <li>All ActionScript code in the first frame of the
 *                   loaded SWF's main timeline has been executed.</li>
 *                   </ul>
 *
 *                   <p>For example, an <code>Event.INIT</code> is dispatched
 *                   when the first frame of a movie or animation is loaded.
 *                   The movie is then accessible and can be added to the
 *                   display list. The complete movie, however, can take
 *                   longer to download. The <code>Event.COMPLETE</code> is
 *                   only dispatched once the full movie is loaded.</p>
 *
 *                   <p>The <code>init</code> event always precedes the
 *                   <code>complete</code> event.</p>
 * @event ioError    Dispatched when an input or output error occurs that
 *                   causes a load operation to fail.
 * @event open       Dispatched when a load operation starts.
 * @event progress   Dispatched when data is received as the download
 *                   operation progresses.
 * @event unload     Dispatched by a LoaderInfo object whenever a loaded
 *                   object is removed by using the <code>unload()</code>
 *                   method of the Loader object, or when a second load is
 *                   performed by the same Loader object and the original
 *                   content is removed prior to the load beginning.
 */
var LoaderInfo = (function (_super) {
    __extends(LoaderInfo, _super);
    function LoaderInfo() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(LoaderInfo.prototype, "bytes", {
        /**
         * The bytes associated with a LoaderInfo object.
         *
         * @throws SecurityError If the object accessing this API is prevented from
         *                       accessing the loaded object due to security
         *                       restrictions. This situation can occur, for
         *                       instance, when a Loader object attempts to access
         *                       the <code>contentLoaderInfo.content</code> property
         *                       and it is not granted security permission to access
         *                       the loaded content.
         *
         *                       <p>For more information related to security, see the
         *                       Flash Player Developer Center Topic: <a
         *                       href="http://www.adobe.com/go/devnet_security_en"
         *                       scope="external">Security</a>.</p>
         */
        get: function () {
            return this._bytes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfo.prototype, "bytesLoaded", {
        /**
         * The number of bytes that are loaded for the media. When this number equals
         * the value of <code>bytesTotal</code>, all of the bytes are loaded.
         */
        get: function () {
            return this._bytesLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfo.prototype, "bytesTotal", {
        /**
         * The number of compressed bytes in the entire media file.
         *
         * <p>Before the first <code>progress</code> event is dispatched by this
         * LoaderInfo object's corresponding Loader object, <code>bytesTotal</code>
         * is 0. After the first <code>progress</code> event from the Loader object,
         * <code>bytesTotal</code> reflects the actual number of bytes to be
         * downloaded.</p>
         */
        get: function () {
            return this._bytesTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfo.prototype, "content", {
        /**
         * The loaded object associated with this LoaderInfo object.
         *
         * @throws SecurityError If the object accessing this API is prevented from
         *                       accessing the loaded object due to security
         *                       restrictions. This situation can occur, for
         *                       instance, when a Loader object attempts to access
         *                       the <code>contentLoaderInfo.content</code> property
         *                       and it is not granted security permission to access
         *                       the loaded content.
         *
         *                       <p>For more information related to security, see the
         *                       Flash Player Developer Center Topic: <a
         *                       href="http://www.adobe.com/go/devnet_security_en"
         *                       scope="external">Security</a>.</p>
         */
        get: function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfo.prototype, "contentType", {
        /**
         * The MIME type of the loaded file. The value is <code>null</code> if not
         * enough of the file has loaded in order to determine the type. The
         * following list gives the possible values:
         * <ul>
         *   <li><code>"application/x-shockwave-flash"</code></li>
         *   <li><code>"image/jpeg"</code></li>
         *   <li><code>"image/gif"</code></li>
         *   <li><code>"image/png"</code></li>
         * </ul>
         */
        get: function () {
            return this._contentType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfo.prototype, "loader", {
        /**
         * The Loader object associated with this LoaderInfo object. If this
         * LoaderInfo object is the <code>loaderInfo</code> property of the instance
         * of the main class of the SWF file, no Loader object is associated.
         *
         * @throws SecurityError If the object accessing this API is prevented from
         *                       accessing the Loader object because of security
         *                       restrictions. This can occur, for instance, when a
         *                       loaded SWF file attempts to access its
         *                       <code>loaderInfo.loader</code> property and it is
         *                       not granted security permission to access the
         *                       loading SWF file.
         *
         *                       <p>For more information related to security, see the
         *                       Flash Player Developer Center Topic: <a
         *                       href="http://www.adobe.com/go/devnet_security_en"
         *                       scope="external">Security</a>.</p>
         */
        get: function () {
            return this._loader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfo.prototype, "url", {
        /**
         * The URL of the media being loaded.
         *
         * <p>Before the first <code>progress</code> event is dispatched by this
         * LoaderInfo object's corresponding Loader object, the value of the
         * <code>url</code> property might reflect only the initial URL specified in
         * the call to the <code>load()</code> method of the Loader object. After the
         * first <code>progress</code> event, the <code>url</code> property reflects
         * the media's final URL, after any redirects and relative URLs are
         * resolved.</p>
         *
         * <p>In some cases, the value of the <code>url</code> property is truncated;
         * see the <code>isURLInaccessible</code> property for details.</p>
         */
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    return LoaderInfo;
})(EventDispatcher);
module.exports = LoaderInfo;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xvYWRlckluZm8udHMiXSwibmFtZXMiOlsiTG9hZGVySW5mbyIsIkxvYWRlckluZm8uY29uc3RydWN0b3IiLCJMb2FkZXJJbmZvLmJ5dGVzIiwiTG9hZGVySW5mby5ieXRlc0xvYWRlZCIsIkxvYWRlckluZm8uYnl0ZXNUb3RhbCIsIkxvYWRlckluZm8uY29udGVudCIsIkxvYWRlckluZm8uY29udGVudFR5cGUiLCJMb2FkZXJJbmZvLmxvYWRlciIsIkxvYWRlckluZm8udXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLGVBQWUsV0FBYSx3Q0FBd0MsQ0FBQyxDQUFDO0FBTTdFLEFBaUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FERztJQUNHLFVBQVU7SUFBU0EsVUFBbkJBLFVBQVVBLFVBQXdCQTtJQUF4Q0EsU0FBTUEsVUFBVUE7UUFBU0MsOEJBQWVBO0lBbUl4Q0EsQ0FBQ0E7SUExR0FELHNCQUFXQSw2QkFBS0E7UUFoQmhCQTs7Ozs7Ozs7Ozs7Ozs7O1dBZUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO1FBQ3BCQSxDQUFDQTs7O09BQUFGO0lBTURBLHNCQUFXQSxtQ0FBV0E7UUFKdEJBOzs7V0FHR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFDMUJBLENBQUNBOzs7T0FBQUg7SUFXREEsc0JBQVdBLGtDQUFVQTtRQVRyQkE7Ozs7Ozs7O1dBUUdBO2FBQ0hBO1lBRUNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO1FBQ3pCQSxDQUFDQTs7O09BQUFKO0lBa0JEQSxzQkFBV0EsK0JBQU9BO1FBaEJsQkE7Ozs7Ozs7Ozs7Ozs7OztXQWVHQTthQUNIQTtZQUVDSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7OztPQUFBTDtJQWFEQSxzQkFBV0EsbUNBQVdBO1FBWHRCQTs7Ozs7Ozs7OztXQVVHQTthQUNIQTtZQUVDTSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7OztPQUFBTjtJQW9CREEsc0JBQVdBLDhCQUFNQTtRQWxCakJBOzs7Ozs7Ozs7Ozs7Ozs7OztXQWlCR0E7YUFDSEE7WUFFQ08sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDckJBLENBQUNBOzs7T0FBQVA7SUFnQkRBLHNCQUFXQSwyQkFBR0E7UUFkZEE7Ozs7Ozs7Ozs7Ozs7V0FhR0E7YUFDSEE7WUFFQ1EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDbEJBLENBQUNBOzs7T0FBQVI7SUFDRkEsaUJBQUNBO0FBQURBLENBbklBLEFBbUlDQSxFQW5Jd0IsZUFBZSxFQW1JdkM7QUFFRCxBQUFvQixpQkFBWCxVQUFVLENBQUMiLCJmaWxlIjoiYmFzZS9Mb2FkZXJJbmZvLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudERpc3BhdGNoZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiKTtcclxuaW1wb3J0IEJ5dGVBcnJheVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3V0aWxzL0J5dGVBcnJheVwiKTtcclxuXHJcbmltcG9ydCBMb2FkZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvTG9hZGVyXCIpO1xyXG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XHJcblxyXG4vKipcclxuICogVGhlIExvYWRlckluZm8gY2xhc3MgcHJvdmlkZXMgaW5mb3JtYXRpb24gYWJvdXQgYSBsb2FkZWQgU1dGIGZpbGUgb3IgYVxyXG4gKiBsb2FkZWQgaW1hZ2UgZmlsZShKUEVHLCBHSUYsIG9yIFBORykuIExvYWRlckluZm8gb2JqZWN0cyBhcmUgYXZhaWxhYmxlIGZvclxyXG4gKiBhbnkgZGlzcGxheSBvYmplY3QuIFRoZSBpbmZvcm1hdGlvbiBwcm92aWRlZCBpbmNsdWRlcyBsb2FkIHByb2dyZXNzLCB0aGVcclxuICogVVJMcyBvZiB0aGUgbG9hZGVyIGFuZCBsb2FkZWQgY29udGVudCwgdGhlIG51bWJlciBvZiBieXRlcyB0b3RhbCBmb3IgdGhlXHJcbiAqIG1lZGlhLCBhbmQgdGhlIG5vbWluYWwgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgbWVkaWEuXHJcbiAqXHJcbiAqIDxwPllvdSBjYW4gYWNjZXNzIExvYWRlckluZm8gb2JqZWN0cyBpbiB0d28gd2F5czogPC9wPlxyXG4gKlxyXG4gKiA8dWw+XHJcbiAqICAgPGxpPlRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgb2YgYSBmbGFzaC5kaXNwbGF5LkxvYWRlclxyXG4gKiBvYmplY3QgLSAgVGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBpcyBhbHdheXMgYXZhaWxhYmxlXHJcbiAqIGZvciBhbnkgTG9hZGVyIG9iamVjdC4gRm9yIGEgTG9hZGVyIG9iamVjdCB0aGF0IGhhcyBub3QgY2FsbGVkIHRoZVxyXG4gKiA8Y29kZT5sb2FkKCk8L2NvZGU+IG9yIDxjb2RlPmxvYWRCeXRlcygpPC9jb2RlPiBtZXRob2QsIG9yIHRoYXQgaGFzIG5vdFxyXG4gKiBzdWZmaWNpZW50bHkgbG9hZGVkLCBhdHRlbXB0aW5nIHRvIGFjY2VzcyBtYW55IG9mIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZVxyXG4gKiA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgdGhyb3dzIGFuIGVycm9yLjwvbGk+XHJcbiAqICAgPGxpPlRoZSA8Y29kZT5sb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBvZiBhIGRpc3BsYXkgb2JqZWN0LiA8L2xpPlxyXG4gKiA8L3VsPlxyXG4gKlxyXG4gKiA8cD5UaGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IG9mIGEgTG9hZGVyIG9iamVjdCBwcm92aWRlc1xyXG4gKiBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY29udGVudCB0aGF0IHRoZSBMb2FkZXIgb2JqZWN0IGlzIGxvYWRpbmcsIHdoZXJlYXNcclxuICogdGhlIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IG9mIGEgRGlzcGxheU9iamVjdCBwcm92aWRlc1xyXG4gKiBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcm9vdCBTV0YgZmlsZSBmb3IgdGhhdCBkaXNwbGF5IG9iamVjdC4gPC9wPlxyXG4gKlxyXG4gKiA8cD5XaGVuIHlvdSB1c2UgYSBMb2FkZXIgb2JqZWN0IHRvIGxvYWQgYSBkaXNwbGF5IG9iamVjdChzdWNoIGFzIGEgU1dGXHJcbiAqIGZpbGUgb3IgYSBiaXRtYXApLCB0aGUgPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgb2YgdGhlIGRpc3BsYXlcclxuICogb2JqZWN0IGlzIHRoZSBzYW1lIGFzIHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgb2YgdGhlXHJcbiAqIExvYWRlciBvYmplY3QoPGNvZGU+RGlzcGxheU9iamVjdC5sb2FkZXJJbmZvID1cclxuICogTG9hZGVyLmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPikuIEJlY2F1c2UgdGhlIGluc3RhbmNlIG9mIHRoZSBtYWluIGNsYXNzIG9mXHJcbiAqIHRoZSBTV0YgZmlsZSBoYXMgbm8gTG9hZGVyIG9iamVjdCwgdGhlIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IGlzXHJcbiAqIHRoZSBvbmx5IHdheSB0byBhY2Nlc3MgdGhlIExvYWRlckluZm8gZm9yIHRoZSBpbnN0YW5jZSBvZiB0aGUgbWFpbiBjbGFzcyBvZlxyXG4gKiB0aGUgU1dGIGZpbGUuPC9wPlxyXG4gKlxyXG4gKiA8cD5UaGUgZm9sbG93aW5nIGRpYWdyYW0gc2hvd3MgdGhlIGRpZmZlcmVudCB1c2VzIG9mIHRoZSBMb2FkZXJJbmZvXHJcbiAqIG9iamVjdCAtIGZvciB0aGUgaW5zdGFuY2Ugb2YgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIFNXRiBmaWxlLCBmb3IgdGhlXHJcbiAqIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBvZiBhIExvYWRlciBvYmplY3QsIGFuZCBmb3IgdGhlXHJcbiAqIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IG9mIGEgbG9hZGVkIG9iamVjdDo8L3A+XHJcbiAqXHJcbiAqIDxwPldoZW4gYSBsb2FkaW5nIG9wZXJhdGlvbiBpcyBub3QgY29tcGxldGUsIHNvbWUgcHJvcGVydGllcyBvZiB0aGVcclxuICogPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IG9mIGEgTG9hZGVyIG9iamVjdCBhcmUgbm90XHJcbiAqIGF2YWlsYWJsZS4gWW91IGNhbiBvYnRhaW4gc29tZSBwcm9wZXJ0aWVzLCBzdWNoIGFzXHJcbiAqIDxjb2RlPmJ5dGVzTG9hZGVkPC9jb2RlPiwgPGNvZGU+Ynl0ZXNUb3RhbDwvY29kZT4sIDxjb2RlPnVybDwvY29kZT4sXHJcbiAqIDxjb2RlPmxvYWRlclVSTDwvY29kZT4sIGFuZCA8Y29kZT5hcHBsaWNhdGlvbkRvbWFpbjwvY29kZT4uIFdoZW4gdGhlXHJcbiAqIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IG9iamVjdCBkaXNwYXRjaGVzIHRoZSA8Y29kZT5pbml0PC9jb2RlPiBldmVudCwgeW91XHJcbiAqIGNhbiBhY2Nlc3MgYWxsIHByb3BlcnRpZXMgb2YgdGhlIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IG9iamVjdCBhbmQgdGhlXHJcbiAqIGxvYWRlZCBpbWFnZSBvciBTV0YgZmlsZS48L3A+XHJcbiAqXHJcbiAqIDxwPjxiPk5vdGU6PC9iPiBBbGwgcHJvcGVydGllcyBvZiBMb2FkZXJJbmZvIG9iamVjdHMgYXJlIHJlYWQtb25seS48L3A+XHJcbiAqXHJcbiAqIDxwPlRoZSA8Y29kZT5FdmVudERpc3BhdGNoZXIuZGlzcGF0Y2hFdmVudCgpPC9jb2RlPiBtZXRob2QgaXMgbm90XHJcbiAqIGFwcGxpY2FibGUgdG8gTG9hZGVySW5mbyBvYmplY3RzLiBJZiB5b3UgY2FsbCA8Y29kZT5kaXNwYXRjaEV2ZW50KCk8L2NvZGU+XHJcbiAqIG9uIGEgTG9hZGVySW5mbyBvYmplY3QsIGFuIElsbGVnYWxPcGVyYXRpb25FcnJvciBleGNlcHRpb24gaXMgdGhyb3duLjwvcD5cclxuICogXHJcbiAqIEBldmVudCBjb21wbGV0ZSAgIERpc3BhdGNoZWQgd2hlbiBkYXRhIGhhcyBsb2FkZWQgc3VjY2Vzc2Z1bGx5LiBJbiBvdGhlclxyXG4gKiAgICAgICAgICAgICAgICAgICB3b3JkcywgaXQgaXMgZGlzcGF0Y2hlZCB3aGVuIGFsbCB0aGUgY29udGVudCBoYXMgYmVlblxyXG4gKiAgICAgICAgICAgICAgICAgICBkb3dubG9hZGVkIGFuZCB0aGUgbG9hZGluZyBoYXMgZmluaXNoZWQuIFRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICA8Y29kZT5jb21wbGV0ZTwvY29kZT4gZXZlbnQgaXMgYWx3YXlzIGRpc3BhdGNoZWQgYWZ0ZXJcclxuICogICAgICAgICAgICAgICAgICAgdGhlIDxjb2RlPmluaXQ8L2NvZGU+IGV2ZW50LiBUaGUgPGNvZGU+aW5pdDwvY29kZT4gZXZlbnRcclxuICogICAgICAgICAgICAgICAgICAgaXMgZGlzcGF0Y2hlZCB3aGVuIHRoZSBvYmplY3QgaXMgcmVhZHkgdG8gYWNjZXNzLCB0aG91Z2hcclxuICogICAgICAgICAgICAgICAgICAgdGhlIGNvbnRlbnQgbWF5IHN0aWxsIGJlIGRvd25sb2FkaW5nLlxyXG4gKiBAZXZlbnQgaHR0cFN0YXR1cyBEaXNwYXRjaGVkIHdoZW4gYSBuZXR3b3JrIHJlcXVlc3QgaXMgbWFkZSBvdmVyIEhUVFAgYW5kXHJcbiAqICAgICAgICAgICAgICAgICAgIGFuIEhUVFAgc3RhdHVzIGNvZGUgY2FuIGJlIGRldGVjdGVkLlxyXG4gKiBAZXZlbnQgaW5pdCAgICAgICBEaXNwYXRjaGVkIHdoZW4gdGhlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgb2YgYSBsb2FkZWRcclxuICogICAgICAgICAgICAgICAgICAgU1dGIGZpbGUgYXJlIGFjY2Vzc2libGUgYW5kIHJlYWR5IGZvciB1c2UuIFRoZSBjb250ZW50LFxyXG4gKiAgICAgICAgICAgICAgICAgICBob3dldmVyLCBjYW4gc3RpbGwgYmUgZG93bmxvYWRpbmcuIEEgTG9hZGVySW5mbyBvYmplY3RcclxuICogICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hlcyB0aGUgPGNvZGU+aW5pdDwvY29kZT4gZXZlbnQgd2hlbiB0aGUgZm9sbG93aW5nXHJcbiAqICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbnMgZXhpc3Q6XHJcbiAqICAgICAgICAgICAgICAgICAgIDx1bD5cclxuICogICAgICAgICAgICAgICAgICAgICA8bGk+QWxsIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgYXNzb2NpYXRlZCB3aXRoIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICBsb2FkZWQgb2JqZWN0IGFuZCB0aG9zZSBhc3NvY2lhdGVkIHdpdGggdGhlIExvYWRlckluZm9cclxuICogICAgICAgICAgICAgICAgICAgb2JqZWN0IGFyZSBhY2Nlc3NpYmxlLjwvbGk+XHJcbiAqICAgICAgICAgICAgICAgICAgICAgPGxpPlRoZSBjb25zdHJ1Y3RvcnMgZm9yIGFsbCBjaGlsZCBvYmplY3RzIGhhdmVcclxuICogICAgICAgICAgICAgICAgICAgY29tcGxldGVkLjwvbGk+XHJcbiAqICAgICAgICAgICAgICAgICAgICAgPGxpPkFsbCBBY3Rpb25TY3JpcHQgY29kZSBpbiB0aGUgZmlyc3QgZnJhbWUgb2YgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgIGxvYWRlZCBTV0YncyBtYWluIHRpbWVsaW5lIGhhcyBiZWVuIGV4ZWN1dGVkLjwvbGk+XHJcbiAqICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAqXHJcbiAqICAgICAgICAgICAgICAgICAgIDxwPkZvciBleGFtcGxlLCBhbiA8Y29kZT5FdmVudC5JTklUPC9jb2RlPiBpcyBkaXNwYXRjaGVkXHJcbiAqICAgICAgICAgICAgICAgICAgIHdoZW4gdGhlIGZpcnN0IGZyYW1lIG9mIGEgbW92aWUgb3IgYW5pbWF0aW9uIGlzIGxvYWRlZC5cclxuICogICAgICAgICAgICAgICAgICAgVGhlIG1vdmllIGlzIHRoZW4gYWNjZXNzaWJsZSBhbmQgY2FuIGJlIGFkZGVkIHRvIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICBkaXNwbGF5IGxpc3QuIFRoZSBjb21wbGV0ZSBtb3ZpZSwgaG93ZXZlciwgY2FuIHRha2VcclxuICogICAgICAgICAgICAgICAgICAgbG9uZ2VyIHRvIGRvd25sb2FkLiBUaGUgPGNvZGU+RXZlbnQuQ09NUExFVEU8L2NvZGU+IGlzXHJcbiAqICAgICAgICAgICAgICAgICAgIG9ubHkgZGlzcGF0Y2hlZCBvbmNlIHRoZSBmdWxsIG1vdmllIGlzIGxvYWRlZC48L3A+XHJcbiAqXHJcbiAqICAgICAgICAgICAgICAgICAgIDxwPlRoZSA8Y29kZT5pbml0PC9jb2RlPiBldmVudCBhbHdheXMgcHJlY2VkZXMgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgIDxjb2RlPmNvbXBsZXRlPC9jb2RlPiBldmVudC48L3A+XHJcbiAqIEBldmVudCBpb0Vycm9yICAgIERpc3BhdGNoZWQgd2hlbiBhbiBpbnB1dCBvciBvdXRwdXQgZXJyb3Igb2NjdXJzIHRoYXRcclxuICogICAgICAgICAgICAgICAgICAgY2F1c2VzIGEgbG9hZCBvcGVyYXRpb24gdG8gZmFpbC5cclxuICogQGV2ZW50IG9wZW4gICAgICAgRGlzcGF0Y2hlZCB3aGVuIGEgbG9hZCBvcGVyYXRpb24gc3RhcnRzLlxyXG4gKiBAZXZlbnQgcHJvZ3Jlc3MgICBEaXNwYXRjaGVkIHdoZW4gZGF0YSBpcyByZWNlaXZlZCBhcyB0aGUgZG93bmxvYWRcclxuICogICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uIHByb2dyZXNzZXMuXHJcbiAqIEBldmVudCB1bmxvYWQgICAgIERpc3BhdGNoZWQgYnkgYSBMb2FkZXJJbmZvIG9iamVjdCB3aGVuZXZlciBhIGxvYWRlZFxyXG4gKiAgICAgICAgICAgICAgICAgICBvYmplY3QgaXMgcmVtb3ZlZCBieSB1c2luZyB0aGUgPGNvZGU+dW5sb2FkKCk8L2NvZGU+XHJcbiAqICAgICAgICAgICAgICAgICAgIG1ldGhvZCBvZiB0aGUgTG9hZGVyIG9iamVjdCwgb3Igd2hlbiBhIHNlY29uZCBsb2FkIGlzXHJcbiAqICAgICAgICAgICAgICAgICAgIHBlcmZvcm1lZCBieSB0aGUgc2FtZSBMb2FkZXIgb2JqZWN0IGFuZCB0aGUgb3JpZ2luYWxcclxuICogICAgICAgICAgICAgICAgICAgY29udGVudCBpcyByZW1vdmVkIHByaW9yIHRvIHRoZSBsb2FkIGJlZ2lubmluZy5cclxuICovXHJcbmNsYXNzIExvYWRlckluZm8gZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcclxue1xyXG5cdHByaXZhdGUgX2J5dGVzOkJ5dGVBcnJheTtcclxuXHRwcml2YXRlIF9ieXRlc0xvYWRlZDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfYnl0ZXNUb3RhbDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfY29udGVudDpEaXNwbGF5T2JqZWN0O1xyXG5cdHByaXZhdGUgX2NvbnRlbnRUeXBlOnN0cmluZztcclxuXHRwcml2YXRlIF9sb2FkZXI6TG9hZGVyO1xyXG5cdHByaXZhdGUgX3VybDpzdHJpbmc7XHJcblx0LyoqXHJcblx0ICogVGhlIGJ5dGVzIGFzc29jaWF0ZWQgd2l0aCBhIExvYWRlckluZm8gb2JqZWN0LlxyXG5cdCAqIFxyXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciBJZiB0aGUgb2JqZWN0IGFjY2Vzc2luZyB0aGlzIEFQSSBpcyBwcmV2ZW50ZWQgZnJvbVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NpbmcgdGhlIGxvYWRlZCBvYmplY3QgZHVlIHRvIHNlY3VyaXR5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9ucy4gVGhpcyBzaXR1YXRpb24gY2FuIG9jY3VyLCBmb3JcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UsIHdoZW4gYSBMb2FkZXIgb2JqZWN0IGF0dGVtcHRzIHRvIGFjY2Vzc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm8uY29udGVudDwvY29kZT4gcHJvcGVydHlcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIGl0IGlzIG5vdCBncmFudGVkIHNlY3VyaXR5IHBlcm1pc3Npb24gdG8gYWNjZXNzXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoZSBsb2FkZWQgY29udGVudC5cclxuXHQgKlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8cD5Gb3IgbW9yZSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHNlY3VyaXR5LCBzZWUgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIEZsYXNoIFBsYXllciBEZXZlbG9wZXIgQ2VudGVyIFRvcGljOiA8YVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZGV2bmV0X3NlY3VyaXR5X2VuXCJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgc2NvcGU9XCJleHRlcm5hbFwiPlNlY3VyaXR5PC9hPi48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBieXRlcygpOkJ5dGVBcnJheVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9ieXRlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBudW1iZXIgb2YgYnl0ZXMgdGhhdCBhcmUgbG9hZGVkIGZvciB0aGUgbWVkaWEuIFdoZW4gdGhpcyBudW1iZXIgZXF1YWxzXHJcblx0ICogdGhlIHZhbHVlIG9mIDxjb2RlPmJ5dGVzVG90YWw8L2NvZGU+LCBhbGwgb2YgdGhlIGJ5dGVzIGFyZSBsb2FkZWQuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBieXRlc0xvYWRlZCgpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2J5dGVzTG9hZGVkO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG51bWJlciBvZiBjb21wcmVzc2VkIGJ5dGVzIGluIHRoZSBlbnRpcmUgbWVkaWEgZmlsZS5cclxuXHQgKlxyXG5cdCAqIDxwPkJlZm9yZSB0aGUgZmlyc3QgPGNvZGU+cHJvZ3Jlc3M8L2NvZGU+IGV2ZW50IGlzIGRpc3BhdGNoZWQgYnkgdGhpc1xyXG5cdCAqIExvYWRlckluZm8gb2JqZWN0J3MgY29ycmVzcG9uZGluZyBMb2FkZXIgb2JqZWN0LCA8Y29kZT5ieXRlc1RvdGFsPC9jb2RlPlxyXG5cdCAqIGlzIDAuIEFmdGVyIHRoZSBmaXJzdCA8Y29kZT5wcm9ncmVzczwvY29kZT4gZXZlbnQgZnJvbSB0aGUgTG9hZGVyIG9iamVjdCxcclxuXHQgKiA8Y29kZT5ieXRlc1RvdGFsPC9jb2RlPiByZWZsZWN0cyB0aGUgYWN0dWFsIG51bWJlciBvZiBieXRlcyB0byBiZVxyXG5cdCAqIGRvd25sb2FkZWQuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYnl0ZXNUb3RhbCgpOm51bWJlciAvKmludCovXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2J5dGVzVG90YWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbG9hZGVkIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhpcyBMb2FkZXJJbmZvIG9iamVjdC5cclxuXHQgKiBcclxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgSWYgdGhlIG9iamVjdCBhY2Nlc3NpbmcgdGhpcyBBUEkgaXMgcHJldmVudGVkIGZyb21cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzaW5nIHRoZSBsb2FkZWQgb2JqZWN0IGR1ZSB0byBzZWN1cml0eVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbnMuIFRoaXMgc2l0dWF0aW9uIGNhbiBvY2N1ciwgZm9yXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLCB3aGVuIGEgTG9hZGVyIG9iamVjdCBhdHRlbXB0cyB0byBhY2Nlc3NcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvLmNvbnRlbnQ8L2NvZGU+IHByb3BlcnR5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCBpdCBpcyBub3QgZ3JhbnRlZCBzZWN1cml0eSBwZXJtaXNzaW9uIHRvIGFjY2Vzc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgbG9hZGVkIGNvbnRlbnQuXHJcblx0ICpcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPHA+Rm9yIG1vcmUgaW5mb3JtYXRpb24gcmVsYXRlZCB0byBzZWN1cml0eSwgc2VlIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBGbGFzaCBQbGF5ZXIgRGV2ZWxvcGVyIENlbnRlciBUb3BpYzogPGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cImh0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2Rldm5ldF9zZWN1cml0eV9lblwiXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHNjb3BlPVwiZXh0ZXJuYWxcIj5TZWN1cml0eTwvYT4uPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgY29udGVudCgpOkRpc3BsYXlPYmplY3RcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29udGVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBNSU1FIHR5cGUgb2YgdGhlIGxvYWRlZCBmaWxlLiBUaGUgdmFsdWUgaXMgPGNvZGU+bnVsbDwvY29kZT4gaWYgbm90XHJcblx0ICogZW5vdWdoIG9mIHRoZSBmaWxlIGhhcyBsb2FkZWQgaW4gb3JkZXIgdG8gZGV0ZXJtaW5lIHRoZSB0eXBlLiBUaGVcclxuXHQgKiBmb2xsb3dpbmcgbGlzdCBnaXZlcyB0aGUgcG9zc2libGUgdmFsdWVzOlxyXG5cdCAqIDx1bD5cclxuXHQgKiAgIDxsaT48Y29kZT5cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCI8L2NvZGU+PC9saT5cclxuXHQgKiAgIDxsaT48Y29kZT5cImltYWdlL2pwZWdcIjwvY29kZT48L2xpPlxyXG5cdCAqICAgPGxpPjxjb2RlPlwiaW1hZ2UvZ2lmXCI8L2NvZGU+PC9saT5cclxuXHQgKiAgIDxsaT48Y29kZT5cImltYWdlL3BuZ1wiPC9jb2RlPjwvbGk+XHJcblx0ICogPC91bD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGNvbnRlbnRUeXBlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbnRlbnRUeXBlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIExvYWRlciBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgTG9hZGVySW5mbyBvYmplY3QuIElmIHRoaXNcclxuXHQgKiBMb2FkZXJJbmZvIG9iamVjdCBpcyB0aGUgPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgb2YgdGhlIGluc3RhbmNlXHJcblx0ICogb2YgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIFNXRiBmaWxlLCBubyBMb2FkZXIgb2JqZWN0IGlzIGFzc29jaWF0ZWQuXHJcblx0ICogXHJcblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yIElmIHRoZSBvYmplY3QgYWNjZXNzaW5nIHRoaXMgQVBJIGlzIHByZXZlbnRlZCBmcm9tXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc2luZyB0aGUgTG9hZGVyIG9iamVjdCBiZWNhdXNlIG9mIHNlY3VyaXR5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9ucy4gVGhpcyBjYW4gb2NjdXIsIGZvciBpbnN0YW5jZSwgd2hlbiBhXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZCBTV0YgZmlsZSBhdHRlbXB0cyB0byBhY2Nlc3MgaXRzXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmxvYWRlckluZm8ubG9hZGVyPC9jb2RlPiBwcm9wZXJ0eSBhbmQgaXQgaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgbm90IGdyYW50ZWQgc2VjdXJpdHkgcGVybWlzc2lvbiB0byBhY2Nlc3MgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmcgU1dGIGZpbGUuXHJcblx0ICpcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPHA+Rm9yIG1vcmUgaW5mb3JtYXRpb24gcmVsYXRlZCB0byBzZWN1cml0eSwgc2VlIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBGbGFzaCBQbGF5ZXIgRGV2ZWxvcGVyIENlbnRlciBUb3BpYzogPGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cImh0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2Rldm5ldF9zZWN1cml0eV9lblwiXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHNjb3BlPVwiZXh0ZXJuYWxcIj5TZWN1cml0eTwvYT4uPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbG9hZGVyKCk6TG9hZGVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRlcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBVUkwgb2YgdGhlIG1lZGlhIGJlaW5nIGxvYWRlZC5cclxuXHQgKlxyXG5cdCAqIDxwPkJlZm9yZSB0aGUgZmlyc3QgPGNvZGU+cHJvZ3Jlc3M8L2NvZGU+IGV2ZW50IGlzIGRpc3BhdGNoZWQgYnkgdGhpc1xyXG5cdCAqIExvYWRlckluZm8gb2JqZWN0J3MgY29ycmVzcG9uZGluZyBMb2FkZXIgb2JqZWN0LCB0aGUgdmFsdWUgb2YgdGhlXHJcblx0ICogPGNvZGU+dXJsPC9jb2RlPiBwcm9wZXJ0eSBtaWdodCByZWZsZWN0IG9ubHkgdGhlIGluaXRpYWwgVVJMIHNwZWNpZmllZCBpblxyXG5cdCAqIHRoZSBjYWxsIHRvIHRoZSA8Y29kZT5sb2FkKCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgTG9hZGVyIG9iamVjdC4gQWZ0ZXIgdGhlXHJcblx0ICogZmlyc3QgPGNvZGU+cHJvZ3Jlc3M8L2NvZGU+IGV2ZW50LCB0aGUgPGNvZGU+dXJsPC9jb2RlPiBwcm9wZXJ0eSByZWZsZWN0c1xyXG5cdCAqIHRoZSBtZWRpYSdzIGZpbmFsIFVSTCwgYWZ0ZXIgYW55IHJlZGlyZWN0cyBhbmQgcmVsYXRpdmUgVVJMcyBhcmVcclxuXHQgKiByZXNvbHZlZC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5JbiBzb21lIGNhc2VzLCB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPnVybDwvY29kZT4gcHJvcGVydHkgaXMgdHJ1bmNhdGVkO1xyXG5cdCAqIHNlZSB0aGUgPGNvZGU+aXNVUkxJbmFjY2Vzc2libGU8L2NvZGU+IHByb3BlcnR5IGZvciBkZXRhaWxzLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHVybCgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl91cmw7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBMb2FkZXJJbmZvOyJdfQ==