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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL2xvYWRlcmluZm8udHMiXSwibmFtZXMiOlsiTG9hZGVySW5mbyIsIkxvYWRlckluZm8uY29uc3RydWN0b3IiLCJMb2FkZXJJbmZvLmJ5dGVzIiwiTG9hZGVySW5mby5ieXRlc0xvYWRlZCIsIkxvYWRlckluZm8uYnl0ZXNUb3RhbCIsIkxvYWRlckluZm8uY29udGVudCIsIkxvYWRlckluZm8uY29udGVudFR5cGUiLCJMb2FkZXJJbmZvLmxvYWRlciIsIkxvYWRlckluZm8udXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLGVBQWUsV0FBYSx3Q0FBd0MsQ0FBQyxDQUFDO0FBTTdFLEFBaUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FERztJQUNHLFVBQVU7SUFBU0EsVUFBbkJBLFVBQVVBLFVBQXdCQTtJQUF4Q0EsU0FBTUEsVUFBVUE7UUFBU0MsOEJBQWVBO0lBbUl4Q0EsQ0FBQ0E7SUExR0FELHNCQUFXQSw2QkFBS0E7UUFoQmhCQTs7Ozs7Ozs7Ozs7Ozs7O1dBZUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO1FBQ3BCQSxDQUFDQTs7O09BQUFGO0lBTURBLHNCQUFXQSxtQ0FBV0E7UUFKdEJBOzs7V0FHR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFDMUJBLENBQUNBOzs7T0FBQUg7SUFXREEsc0JBQVdBLGtDQUFVQTtRQVRyQkE7Ozs7Ozs7O1dBUUdBO2FBQ0hBO1lBRUNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO1FBQ3pCQSxDQUFDQTs7O09BQUFKO0lBa0JEQSxzQkFBV0EsK0JBQU9BO1FBaEJsQkE7Ozs7Ozs7Ozs7Ozs7OztXQWVHQTthQUNIQTtZQUVDSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7OztPQUFBTDtJQWFEQSxzQkFBV0EsbUNBQVdBO1FBWHRCQTs7Ozs7Ozs7OztXQVVHQTthQUNIQTtZQUVDTSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7OztPQUFBTjtJQW9CREEsc0JBQVdBLDhCQUFNQTtRQWxCakJBOzs7Ozs7Ozs7Ozs7Ozs7OztXQWlCR0E7YUFDSEE7WUFFQ08sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDckJBLENBQUNBOzs7T0FBQVA7SUFnQkRBLHNCQUFXQSwyQkFBR0E7UUFkZEE7Ozs7Ozs7Ozs7Ozs7V0FhR0E7YUFDSEE7WUFFQ1EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDbEJBLENBQUNBOzs7T0FBQVI7SUFDRkEsaUJBQUNBO0FBQURBLENBbklBLEFBbUlDQSxFQW5Jd0IsZUFBZSxFQW1JdkM7QUFFRCxBQUFvQixpQkFBWCxVQUFVLENBQUMiLCJmaWxlIjoiYmFzZS9Mb2FkZXJJbmZvLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudERpc3BhdGNoZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbmltcG9ydCBCeXRlQXJyYXlcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi91dGlscy9CeXRlQXJyYXlcIik7XG5cbmltcG9ydCBMb2FkZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvTG9hZGVyXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuXG4vKipcbiAqIFRoZSBMb2FkZXJJbmZvIGNsYXNzIHByb3ZpZGVzIGluZm9ybWF0aW9uIGFib3V0IGEgbG9hZGVkIFNXRiBmaWxlIG9yIGFcbiAqIGxvYWRlZCBpbWFnZSBmaWxlKEpQRUcsIEdJRiwgb3IgUE5HKS4gTG9hZGVySW5mbyBvYmplY3RzIGFyZSBhdmFpbGFibGUgZm9yXG4gKiBhbnkgZGlzcGxheSBvYmplY3QuIFRoZSBpbmZvcm1hdGlvbiBwcm92aWRlZCBpbmNsdWRlcyBsb2FkIHByb2dyZXNzLCB0aGVcbiAqIFVSTHMgb2YgdGhlIGxvYWRlciBhbmQgbG9hZGVkIGNvbnRlbnQsIHRoZSBudW1iZXIgb2YgYnl0ZXMgdG90YWwgZm9yIHRoZVxuICogbWVkaWEsIGFuZCB0aGUgbm9taW5hbCBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBtZWRpYS5cbiAqXG4gKiA8cD5Zb3UgY2FuIGFjY2VzcyBMb2FkZXJJbmZvIG9iamVjdHMgaW4gdHdvIHdheXM6IDwvcD5cbiAqXG4gKiA8dWw+XG4gKiAgIDxsaT5UaGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IG9mIGEgZmxhc2guZGlzcGxheS5Mb2FkZXJcbiAqIG9iamVjdCAtICBUaGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IGlzIGFsd2F5cyBhdmFpbGFibGVcbiAqIGZvciBhbnkgTG9hZGVyIG9iamVjdC4gRm9yIGEgTG9hZGVyIG9iamVjdCB0aGF0IGhhcyBub3QgY2FsbGVkIHRoZVxuICogPGNvZGU+bG9hZCgpPC9jb2RlPiBvciA8Y29kZT5sb2FkQnl0ZXMoKTwvY29kZT4gbWV0aG9kLCBvciB0aGF0IGhhcyBub3RcbiAqIHN1ZmZpY2llbnRseSBsb2FkZWQsIGF0dGVtcHRpbmcgdG8gYWNjZXNzIG1hbnkgb2YgdGhlIHByb3BlcnRpZXMgb2YgdGhlXG4gKiA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgdGhyb3dzIGFuIGVycm9yLjwvbGk+XG4gKiAgIDxsaT5UaGUgPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgb2YgYSBkaXNwbGF5IG9iamVjdC4gPC9saT5cbiAqIDwvdWw+XG4gKlxuICogPHA+VGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBvZiBhIExvYWRlciBvYmplY3QgcHJvdmlkZXNcbiAqIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjb250ZW50IHRoYXQgdGhlIExvYWRlciBvYmplY3QgaXMgbG9hZGluZywgd2hlcmVhc1xuICogdGhlIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IG9mIGEgRGlzcGxheU9iamVjdCBwcm92aWRlc1xuICogaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJvb3QgU1dGIGZpbGUgZm9yIHRoYXQgZGlzcGxheSBvYmplY3QuIDwvcD5cbiAqXG4gKiA8cD5XaGVuIHlvdSB1c2UgYSBMb2FkZXIgb2JqZWN0IHRvIGxvYWQgYSBkaXNwbGF5IG9iamVjdChzdWNoIGFzIGEgU1dGXG4gKiBmaWxlIG9yIGEgYml0bWFwKSwgdGhlIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBkaXNwbGF5XG4gKiBvYmplY3QgaXMgdGhlIHNhbWUgYXMgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGVcbiAqIExvYWRlciBvYmplY3QoPGNvZGU+RGlzcGxheU9iamVjdC5sb2FkZXJJbmZvID1cbiAqIExvYWRlci5jb250ZW50TG9hZGVySW5mbzwvY29kZT4pLiBCZWNhdXNlIHRoZSBpbnN0YW5jZSBvZiB0aGUgbWFpbiBjbGFzcyBvZlxuICogdGhlIFNXRiBmaWxlIGhhcyBubyBMb2FkZXIgb2JqZWN0LCB0aGUgPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgaXNcbiAqIHRoZSBvbmx5IHdheSB0byBhY2Nlc3MgdGhlIExvYWRlckluZm8gZm9yIHRoZSBpbnN0YW5jZSBvZiB0aGUgbWFpbiBjbGFzcyBvZlxuICogdGhlIFNXRiBmaWxlLjwvcD5cbiAqXG4gKiA8cD5UaGUgZm9sbG93aW5nIGRpYWdyYW0gc2hvd3MgdGhlIGRpZmZlcmVudCB1c2VzIG9mIHRoZSBMb2FkZXJJbmZvXG4gKiBvYmplY3QgLSBmb3IgdGhlIGluc3RhbmNlIG9mIHRoZSBtYWluIGNsYXNzIG9mIHRoZSBTV0YgZmlsZSwgZm9yIHRoZVxuICogPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IG9mIGEgTG9hZGVyIG9iamVjdCwgYW5kIGZvciB0aGVcbiAqIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IG9mIGEgbG9hZGVkIG9iamVjdDo8L3A+XG4gKlxuICogPHA+V2hlbiBhIGxvYWRpbmcgb3BlcmF0aW9uIGlzIG5vdCBjb21wbGV0ZSwgc29tZSBwcm9wZXJ0aWVzIG9mIHRoZVxuICogPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IG9mIGEgTG9hZGVyIG9iamVjdCBhcmUgbm90XG4gKiBhdmFpbGFibGUuIFlvdSBjYW4gb2J0YWluIHNvbWUgcHJvcGVydGllcywgc3VjaCBhc1xuICogPGNvZGU+Ynl0ZXNMb2FkZWQ8L2NvZGU+LCA8Y29kZT5ieXRlc1RvdGFsPC9jb2RlPiwgPGNvZGU+dXJsPC9jb2RlPixcbiAqIDxjb2RlPmxvYWRlclVSTDwvY29kZT4sIGFuZCA8Y29kZT5hcHBsaWNhdGlvbkRvbWFpbjwvY29kZT4uIFdoZW4gdGhlXG4gKiA8Y29kZT5sb2FkZXJJbmZvPC9jb2RlPiBvYmplY3QgZGlzcGF0Y2hlcyB0aGUgPGNvZGU+aW5pdDwvY29kZT4gZXZlbnQsIHlvdVxuICogY2FuIGFjY2VzcyBhbGwgcHJvcGVydGllcyBvZiB0aGUgPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gb2JqZWN0IGFuZCB0aGVcbiAqIGxvYWRlZCBpbWFnZSBvciBTV0YgZmlsZS48L3A+XG4gKlxuICogPHA+PGI+Tm90ZTo8L2I+IEFsbCBwcm9wZXJ0aWVzIG9mIExvYWRlckluZm8gb2JqZWN0cyBhcmUgcmVhZC1vbmx5LjwvcD5cbiAqXG4gKiA8cD5UaGUgPGNvZGU+RXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoRXZlbnQoKTwvY29kZT4gbWV0aG9kIGlzIG5vdFxuICogYXBwbGljYWJsZSB0byBMb2FkZXJJbmZvIG9iamVjdHMuIElmIHlvdSBjYWxsIDxjb2RlPmRpc3BhdGNoRXZlbnQoKTwvY29kZT5cbiAqIG9uIGEgTG9hZGVySW5mbyBvYmplY3QsIGFuIElsbGVnYWxPcGVyYXRpb25FcnJvciBleGNlcHRpb24gaXMgdGhyb3duLjwvcD5cbiAqIFxuICogQGV2ZW50IGNvbXBsZXRlICAgRGlzcGF0Y2hlZCB3aGVuIGRhdGEgaGFzIGxvYWRlZCBzdWNjZXNzZnVsbHkuIEluIG90aGVyXG4gKiAgICAgICAgICAgICAgICAgICB3b3JkcywgaXQgaXMgZGlzcGF0Y2hlZCB3aGVuIGFsbCB0aGUgY29udGVudCBoYXMgYmVlblxuICogICAgICAgICAgICAgICAgICAgZG93bmxvYWRlZCBhbmQgdGhlIGxvYWRpbmcgaGFzIGZpbmlzaGVkLiBUaGVcbiAqICAgICAgICAgICAgICAgICAgIDxjb2RlPmNvbXBsZXRlPC9jb2RlPiBldmVudCBpcyBhbHdheXMgZGlzcGF0Y2hlZCBhZnRlclxuICogICAgICAgICAgICAgICAgICAgdGhlIDxjb2RlPmluaXQ8L2NvZGU+IGV2ZW50LiBUaGUgPGNvZGU+aW5pdDwvY29kZT4gZXZlbnRcbiAqICAgICAgICAgICAgICAgICAgIGlzIGRpc3BhdGNoZWQgd2hlbiB0aGUgb2JqZWN0IGlzIHJlYWR5IHRvIGFjY2VzcywgdGhvdWdoXG4gKiAgICAgICAgICAgICAgICAgICB0aGUgY29udGVudCBtYXkgc3RpbGwgYmUgZG93bmxvYWRpbmcuXG4gKiBAZXZlbnQgaHR0cFN0YXR1cyBEaXNwYXRjaGVkIHdoZW4gYSBuZXR3b3JrIHJlcXVlc3QgaXMgbWFkZSBvdmVyIEhUVFAgYW5kXG4gKiAgICAgICAgICAgICAgICAgICBhbiBIVFRQIHN0YXR1cyBjb2RlIGNhbiBiZSBkZXRlY3RlZC5cbiAqIEBldmVudCBpbml0ICAgICAgIERpc3BhdGNoZWQgd2hlbiB0aGUgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBvZiBhIGxvYWRlZFxuICogICAgICAgICAgICAgICAgICAgU1dGIGZpbGUgYXJlIGFjY2Vzc2libGUgYW5kIHJlYWR5IGZvciB1c2UuIFRoZSBjb250ZW50LFxuICogICAgICAgICAgICAgICAgICAgaG93ZXZlciwgY2FuIHN0aWxsIGJlIGRvd25sb2FkaW5nLiBBIExvYWRlckluZm8gb2JqZWN0XG4gKiAgICAgICAgICAgICAgICAgICBkaXNwYXRjaGVzIHRoZSA8Y29kZT5pbml0PC9jb2RlPiBldmVudCB3aGVuIHRoZSBmb2xsb3dpbmdcbiAqICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbnMgZXhpc3Q6XG4gKiAgICAgICAgICAgICAgICAgICA8dWw+XG4gKiAgICAgICAgICAgICAgICAgICAgIDxsaT5BbGwgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBhc3NvY2lhdGVkIHdpdGggdGhlXG4gKiAgICAgICAgICAgICAgICAgICBsb2FkZWQgb2JqZWN0IGFuZCB0aG9zZSBhc3NvY2lhdGVkIHdpdGggdGhlIExvYWRlckluZm9cbiAqICAgICAgICAgICAgICAgICAgIG9iamVjdCBhcmUgYWNjZXNzaWJsZS48L2xpPlxuICogICAgICAgICAgICAgICAgICAgICA8bGk+VGhlIGNvbnN0cnVjdG9ycyBmb3IgYWxsIGNoaWxkIG9iamVjdHMgaGF2ZVxuICogICAgICAgICAgICAgICAgICAgY29tcGxldGVkLjwvbGk+XG4gKiAgICAgICAgICAgICAgICAgICAgIDxsaT5BbGwgQWN0aW9uU2NyaXB0IGNvZGUgaW4gdGhlIGZpcnN0IGZyYW1lIG9mIHRoZVxuICogICAgICAgICAgICAgICAgICAgbG9hZGVkIFNXRidzIG1haW4gdGltZWxpbmUgaGFzIGJlZW4gZXhlY3V0ZWQuPC9saT5cbiAqICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gKlxuICogICAgICAgICAgICAgICAgICAgPHA+Rm9yIGV4YW1wbGUsIGFuIDxjb2RlPkV2ZW50LklOSVQ8L2NvZGU+IGlzIGRpc3BhdGNoZWRcbiAqICAgICAgICAgICAgICAgICAgIHdoZW4gdGhlIGZpcnN0IGZyYW1lIG9mIGEgbW92aWUgb3IgYW5pbWF0aW9uIGlzIGxvYWRlZC5cbiAqICAgICAgICAgICAgICAgICAgIFRoZSBtb3ZpZSBpcyB0aGVuIGFjY2Vzc2libGUgYW5kIGNhbiBiZSBhZGRlZCB0byB0aGVcbiAqICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgbGlzdC4gVGhlIGNvbXBsZXRlIG1vdmllLCBob3dldmVyLCBjYW4gdGFrZVxuICogICAgICAgICAgICAgICAgICAgbG9uZ2VyIHRvIGRvd25sb2FkLiBUaGUgPGNvZGU+RXZlbnQuQ09NUExFVEU8L2NvZGU+IGlzXG4gKiAgICAgICAgICAgICAgICAgICBvbmx5IGRpc3BhdGNoZWQgb25jZSB0aGUgZnVsbCBtb3ZpZSBpcyBsb2FkZWQuPC9wPlxuICpcbiAqICAgICAgICAgICAgICAgICAgIDxwPlRoZSA8Y29kZT5pbml0PC9jb2RlPiBldmVudCBhbHdheXMgcHJlY2VkZXMgdGhlXG4gKiAgICAgICAgICAgICAgICAgICA8Y29kZT5jb21wbGV0ZTwvY29kZT4gZXZlbnQuPC9wPlxuICogQGV2ZW50IGlvRXJyb3IgICAgRGlzcGF0Y2hlZCB3aGVuIGFuIGlucHV0IG9yIG91dHB1dCBlcnJvciBvY2N1cnMgdGhhdFxuICogICAgICAgICAgICAgICAgICAgY2F1c2VzIGEgbG9hZCBvcGVyYXRpb24gdG8gZmFpbC5cbiAqIEBldmVudCBvcGVuICAgICAgIERpc3BhdGNoZWQgd2hlbiBhIGxvYWQgb3BlcmF0aW9uIHN0YXJ0cy5cbiAqIEBldmVudCBwcm9ncmVzcyAgIERpc3BhdGNoZWQgd2hlbiBkYXRhIGlzIHJlY2VpdmVkIGFzIHRoZSBkb3dubG9hZFxuICogICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uIHByb2dyZXNzZXMuXG4gKiBAZXZlbnQgdW5sb2FkICAgICBEaXNwYXRjaGVkIGJ5IGEgTG9hZGVySW5mbyBvYmplY3Qgd2hlbmV2ZXIgYSBsb2FkZWRcbiAqICAgICAgICAgICAgICAgICAgIG9iamVjdCBpcyByZW1vdmVkIGJ5IHVzaW5nIHRoZSA8Y29kZT51bmxvYWQoKTwvY29kZT5cbiAqICAgICAgICAgICAgICAgICAgIG1ldGhvZCBvZiB0aGUgTG9hZGVyIG9iamVjdCwgb3Igd2hlbiBhIHNlY29uZCBsb2FkIGlzXG4gKiAgICAgICAgICAgICAgICAgICBwZXJmb3JtZWQgYnkgdGhlIHNhbWUgTG9hZGVyIG9iamVjdCBhbmQgdGhlIG9yaWdpbmFsXG4gKiAgICAgICAgICAgICAgICAgICBjb250ZW50IGlzIHJlbW92ZWQgcHJpb3IgdG8gdGhlIGxvYWQgYmVnaW5uaW5nLlxuICovXG5jbGFzcyBMb2FkZXJJbmZvIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyXG57XG5cdHByaXZhdGUgX2J5dGVzOkJ5dGVBcnJheTtcblx0cHJpdmF0ZSBfYnl0ZXNMb2FkZWQ6bnVtYmVyO1xuXHRwcml2YXRlIF9ieXRlc1RvdGFsOm51bWJlcjtcblx0cHJpdmF0ZSBfY29udGVudDpEaXNwbGF5T2JqZWN0O1xuXHRwcml2YXRlIF9jb250ZW50VHlwZTpzdHJpbmc7XG5cdHByaXZhdGUgX2xvYWRlcjpMb2FkZXI7XG5cdHByaXZhdGUgX3VybDpzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgYnl0ZXMgYXNzb2NpYXRlZCB3aXRoIGEgTG9hZGVySW5mbyBvYmplY3QuXG5cdCAqIFxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgSWYgdGhlIG9iamVjdCBhY2Nlc3NpbmcgdGhpcyBBUEkgaXMgcHJldmVudGVkIGZyb21cblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc2luZyB0aGUgbG9hZGVkIG9iamVjdCBkdWUgdG8gc2VjdXJpdHlcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9ucy4gVGhpcyBzaXR1YXRpb24gY2FuIG9jY3VyLCBmb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLCB3aGVuIGEgTG9hZGVyIG9iamVjdCBhdHRlbXB0cyB0byBhY2Nlc3Ncblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mby5jb250ZW50PC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIGl0IGlzIG5vdCBncmFudGVkIHNlY3VyaXR5IHBlcm1pc3Npb24gdG8gYWNjZXNzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgbG9hZGVkIGNvbnRlbnQuXG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8cD5Gb3IgbW9yZSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHNlY3VyaXR5LCBzZWUgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBGbGFzaCBQbGF5ZXIgRGV2ZWxvcGVyIENlbnRlciBUb3BpYzogPGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9kZXZuZXRfc2VjdXJpdHlfZW5cIlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgc2NvcGU9XCJleHRlcm5hbFwiPlNlY3VyaXR5PC9hPi48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJ5dGVzKCk6Qnl0ZUFycmF5XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYnl0ZXM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG51bWJlciBvZiBieXRlcyB0aGF0IGFyZSBsb2FkZWQgZm9yIHRoZSBtZWRpYS4gV2hlbiB0aGlzIG51bWJlciBlcXVhbHNcblx0ICogdGhlIHZhbHVlIG9mIDxjb2RlPmJ5dGVzVG90YWw8L2NvZGU+LCBhbGwgb2YgdGhlIGJ5dGVzIGFyZSBsb2FkZWQuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJ5dGVzTG9hZGVkKCk6bnVtYmVyIC8qaW50Ki9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9ieXRlc0xvYWRlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbnVtYmVyIG9mIGNvbXByZXNzZWQgYnl0ZXMgaW4gdGhlIGVudGlyZSBtZWRpYSBmaWxlLlxuXHQgKlxuXHQgKiA8cD5CZWZvcmUgdGhlIGZpcnN0IDxjb2RlPnByb2dyZXNzPC9jb2RlPiBldmVudCBpcyBkaXNwYXRjaGVkIGJ5IHRoaXNcblx0ICogTG9hZGVySW5mbyBvYmplY3QncyBjb3JyZXNwb25kaW5nIExvYWRlciBvYmplY3QsIDxjb2RlPmJ5dGVzVG90YWw8L2NvZGU+XG5cdCAqIGlzIDAuIEFmdGVyIHRoZSBmaXJzdCA8Y29kZT5wcm9ncmVzczwvY29kZT4gZXZlbnQgZnJvbSB0aGUgTG9hZGVyIG9iamVjdCxcblx0ICogPGNvZGU+Ynl0ZXNUb3RhbDwvY29kZT4gcmVmbGVjdHMgdGhlIGFjdHVhbCBudW1iZXIgb2YgYnl0ZXMgdG8gYmVcblx0ICogZG93bmxvYWRlZC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJ5dGVzVG90YWwoKTpudW1iZXIgLyppbnQqL1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2J5dGVzVG90YWw7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGxvYWRlZCBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgTG9hZGVySW5mbyBvYmplY3QuXG5cdCAqIFxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgSWYgdGhlIG9iamVjdCBhY2Nlc3NpbmcgdGhpcyBBUEkgaXMgcHJldmVudGVkIGZyb21cblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc2luZyB0aGUgbG9hZGVkIG9iamVjdCBkdWUgdG8gc2VjdXJpdHlcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9ucy4gVGhpcyBzaXR1YXRpb24gY2FuIG9jY3VyLCBmb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLCB3aGVuIGEgTG9hZGVyIG9iamVjdCBhdHRlbXB0cyB0byBhY2Nlc3Ncblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mby5jb250ZW50PC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIGl0IGlzIG5vdCBncmFudGVkIHNlY3VyaXR5IHBlcm1pc3Npb24gdG8gYWNjZXNzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgbG9hZGVkIGNvbnRlbnQuXG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8cD5Gb3IgbW9yZSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHNlY3VyaXR5LCBzZWUgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBGbGFzaCBQbGF5ZXIgRGV2ZWxvcGVyIENlbnRlciBUb3BpYzogPGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9kZXZuZXRfc2VjdXJpdHlfZW5cIlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgc2NvcGU9XCJleHRlcm5hbFwiPlNlY3VyaXR5PC9hPi48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNvbnRlbnQoKTpEaXNwbGF5T2JqZWN0XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY29udGVudDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgTUlNRSB0eXBlIG9mIHRoZSBsb2FkZWQgZmlsZS4gVGhlIHZhbHVlIGlzIDxjb2RlPm51bGw8L2NvZGU+IGlmIG5vdFxuXHQgKiBlbm91Z2ggb2YgdGhlIGZpbGUgaGFzIGxvYWRlZCBpbiBvcmRlciB0byBkZXRlcm1pbmUgdGhlIHR5cGUuIFRoZVxuXHQgKiBmb2xsb3dpbmcgbGlzdCBnaXZlcyB0aGUgcG9zc2libGUgdmFsdWVzOlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPjxjb2RlPlwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIjwvY29kZT48L2xpPlxuXHQgKiAgIDxsaT48Y29kZT5cImltYWdlL2pwZWdcIjwvY29kZT48L2xpPlxuXHQgKiAgIDxsaT48Y29kZT5cImltYWdlL2dpZlwiPC9jb2RlPjwvbGk+XG5cdCAqICAgPGxpPjxjb2RlPlwiaW1hZ2UvcG5nXCI8L2NvZGU+PC9saT5cblx0ICogPC91bD5cblx0ICovXG5cdHB1YmxpYyBnZXQgY29udGVudFR5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl9jb250ZW50VHlwZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgTG9hZGVyIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhpcyBMb2FkZXJJbmZvIG9iamVjdC4gSWYgdGhpc1xuXHQgKiBMb2FkZXJJbmZvIG9iamVjdCBpcyB0aGUgPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgb2YgdGhlIGluc3RhbmNlXG5cdCAqIG9mIHRoZSBtYWluIGNsYXNzIG9mIHRoZSBTV0YgZmlsZSwgbm8gTG9hZGVyIG9iamVjdCBpcyBhc3NvY2lhdGVkLlxuXHQgKiBcblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yIElmIHRoZSBvYmplY3QgYWNjZXNzaW5nIHRoaXMgQVBJIGlzIHByZXZlbnRlZCBmcm9tXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NpbmcgdGhlIExvYWRlciBvYmplY3QgYmVjYXVzZSBvZiBzZWN1cml0eVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3Rpb25zLiBUaGlzIGNhbiBvY2N1ciwgZm9yIGluc3RhbmNlLCB3aGVuIGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZCBTV0YgZmlsZSBhdHRlbXB0cyB0byBhY2Nlc3MgaXRzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5sb2FkZXJJbmZvLmxvYWRlcjwvY29kZT4gcHJvcGVydHkgYW5kIGl0IGlzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBub3QgZ3JhbnRlZCBzZWN1cml0eSBwZXJtaXNzaW9uIHRvIGFjY2VzcyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmcgU1dGIGZpbGUuXG5cdCAqXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8cD5Gb3IgbW9yZSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHNlY3VyaXR5LCBzZWUgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBGbGFzaCBQbGF5ZXIgRGV2ZWxvcGVyIENlbnRlciBUb3BpYzogPGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9kZXZuZXRfc2VjdXJpdHlfZW5cIlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgc2NvcGU9XCJleHRlcm5hbFwiPlNlY3VyaXR5PC9hPi48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGxvYWRlcigpOkxvYWRlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRlcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgVVJMIG9mIHRoZSBtZWRpYSBiZWluZyBsb2FkZWQuXG5cdCAqXG5cdCAqIDxwPkJlZm9yZSB0aGUgZmlyc3QgPGNvZGU+cHJvZ3Jlc3M8L2NvZGU+IGV2ZW50IGlzIGRpc3BhdGNoZWQgYnkgdGhpc1xuXHQgKiBMb2FkZXJJbmZvIG9iamVjdCdzIGNvcnJlc3BvbmRpbmcgTG9hZGVyIG9iamVjdCwgdGhlIHZhbHVlIG9mIHRoZVxuXHQgKiA8Y29kZT51cmw8L2NvZGU+IHByb3BlcnR5IG1pZ2h0IHJlZmxlY3Qgb25seSB0aGUgaW5pdGlhbCBVUkwgc3BlY2lmaWVkIGluXG5cdCAqIHRoZSBjYWxsIHRvIHRoZSA8Y29kZT5sb2FkKCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgTG9hZGVyIG9iamVjdC4gQWZ0ZXIgdGhlXG5cdCAqIGZpcnN0IDxjb2RlPnByb2dyZXNzPC9jb2RlPiBldmVudCwgdGhlIDxjb2RlPnVybDwvY29kZT4gcHJvcGVydHkgcmVmbGVjdHNcblx0ICogdGhlIG1lZGlhJ3MgZmluYWwgVVJMLCBhZnRlciBhbnkgcmVkaXJlY3RzIGFuZCByZWxhdGl2ZSBVUkxzIGFyZVxuXHQgKiByZXNvbHZlZC48L3A+XG5cdCAqXG5cdCAqIDxwPkluIHNvbWUgY2FzZXMsIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+dXJsPC9jb2RlPiBwcm9wZXJ0eSBpcyB0cnVuY2F0ZWQ7XG5cdCAqIHNlZSB0aGUgPGNvZGU+aXNVUkxJbmFjY2Vzc2libGU8L2NvZGU+IHByb3BlcnR5IGZvciBkZXRhaWxzLjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgdXJsKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXJsO1xuXHR9XG59XG5cbmV4cG9ydCA9IExvYWRlckluZm87Il19