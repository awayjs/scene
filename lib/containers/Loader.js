var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetLibraryBundle = require("awayjs-core/lib/library/AssetLibraryBundle");
var AssetLoader = require("awayjs-core/lib/library/AssetLoader");
var AssetEvent = require("awayjs-core/lib/events/AssetEvent");
var IOErrorEvent = require("awayjs-core/lib/events/IOErrorEvent");
var LoaderEvent = require("awayjs-core/lib/events/LoaderEvent");
var ParserEvent = require("awayjs-core/lib/events/ParserEvent");
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
/**
 * The Loader class is used to load SWF files or image(JPG, PNG, or GIF)
 * files. Use the <code>load()</code> method to initiate loading. The loaded
 * display object is added as a child of the Loader object.
 *
 * <p>Use the URLLoader class to load text or binary data.</p>
 *
 * <p>The Loader class overrides the following methods that it inherits,
 * because a Loader object can only have one child display object - the
 * display object that it loads. Calling the following methods throws an
 * exception: <code>addChild()</code>, <code>addChildAt()</code>,
 * <code>removeChild()</code>, <code>removeChildAt()</code>, and
 * <code>setChildIndex()</code>. To remove a loaded display object, you must
 * remove the <i>Loader</i> object from its parent DisplayObjectContainer
 * child array. </p>
 *
 * <p><b>Note:</b> The ActionScript 2.0 MovieClipLoader and LoadVars classes
 * are not used in ActionScript 3.0. The Loader and URLLoader classes replace
 * them.</p>
 *
 * <p>When you use the Loader class, consider the Flash Player and Adobe AIR
 * security model: </p>
 *
 * <ul>
 *   <li>You can load content from any accessible source. </li>
 *   <li>Loading is not allowed if the calling SWF file is in a network
 * sandbox and the file to be loaded is local. </li>
 *   <li>If the loaded content is a SWF file written with ActionScript 3.0, it
 * cannot be cross-scripted by a SWF file in another security sandbox unless
 * that cross-scripting arrangement was approved through a call to the
 * <code>System.allowDomain()</code> or the
 * <code>System.allowInsecureDomain()</code> method in the loaded content
 * file.</li>
 *   <li>If the loaded content is an AVM1 SWF file(written using ActionScript
 * 1.0 or 2.0), it cannot be cross-scripted by an AVM2 SWF file(written using
 * ActionScript 3.0). However, you can communicate between the two SWF files
 * by using the LocalConnection class.</li>
 *   <li>If the loaded content is an image, its data cannot be accessed by a
 * SWF file outside of the security sandbox, unless the domain of that SWF
 * file was included in a URL policy file at the origin domain of the
 * image.</li>
 *   <li>Movie clips in the local-with-file-system sandbox cannot script movie
 * clips in the local-with-networking sandbox, and the reverse is also
 * prevented. </li>
 *   <li>You cannot connect to commonly reserved ports. For a complete list of
 * blocked ports, see "Restricting Networking APIs" in the <i>ActionScript 3.0
 * Developer's Guide</i>. </li>
 * </ul>
 *
 * <p>However, in AIR, content in the <code>application</code> security
 * sandbox(content installed with the AIR application) are not restricted by
 * these security limitations.</p>
 *
 * <p>For more information related to security, see the Flash Player Developer
 * Center Topic: <a href="http://www.adobe.com/go/devnet_security_en"
 * scope="external">Security</a>.</p>
 *
 * <p>When loading a SWF file from an untrusted source(such as a domain other
 * than that of the Loader object's root SWF file), you may want to define a
 * mask for the Loader object, to prevent the loaded content(which is a child
 * of the Loader object) from drawing to portions of the Stage outside of that
 * mask, as shown in the following code:</p>
 */
var Loader = (function (_super) {
    __extends(Loader, _super);
    /**
     * Creates a Loader object that you can use to load files, such as SWF, JPEG,
     * GIF, or PNG files. Call the <code>load()</code> method to load the asset
     * as a child of the Loader instance. You can then add the Loader object to
     * the display list(for instance, by using the <code>addChild()</code>
     * method of a DisplayObjectContainer instance). The asset appears on the
     * Stage as it loads.
     *
     * <p>You can also use a Loader instance "offlist," that is without adding it
     * to a display object container on the display list. In this mode, the
     * Loader instance might be used to load a SWF file that contains additional
     * modules of an application. </p>
     *
     * <p>To detect when the SWF file is finished loading, you can use the events
     * of the LoaderInfo object associated with the
     * <code>contentLoaderInfo</code> property of the Loader object. At that
     * point, the code in the module SWF file can be executed to initialize and
     * start the module. In the offlist mode, a Loader instance might also be
     * used to load a SWF file that contains components or media assets. Again,
     * you can use the LoaderInfo object event notifications to detect when the
     * components are finished loading. At that point, the application can start
     * using the components and media assets in the library of the SWF file by
     * instantiating the ActionScript 3.0 classes that represent those components
     * and assets.</p>
     *
     * <p>To determine the status of a Loader object, monitor the following
     * events that the LoaderInfo object associated with the
     * <code>contentLoaderInfo</code> property of the Loader object:</p>
     *
     * <ul>
     *   <li>The <code>open</code> event is dispatched when loading begins.</li>
     *   <li>The <code>ioError</code> or <code>securityError</code> event is
     * dispatched if the file cannot be loaded or if an error occured during the
     * load process. </li>
     *   <li>The <code>progress</code> event fires continuously while the file is
     * being loaded.</li>
     *   <li>The <code>complete</code> event is dispatched when a file completes
     * downloading, but before the loaded movie clip's methods and properties are
     * available. </li>
     *   <li>The <code>init</code> event is dispatched after the properties and
     * methods of the loaded SWF file are accessible, so you can begin
     * manipulating the loaded SWF file. This event is dispatched before the
     * <code>complete</code> handler. In streaming SWF files, the
     * <code>init</code> event can occur significantly earlier than the
     * <code>complete</code> event. For most purposes, use the <code>init</code>
     * handler.</li>
     * </ul>
     */
    function Loader(useAssetLibrary, assetLibraryId) {
        var _this = this;
        if (useAssetLibrary === void 0) { useAssetLibrary = true; }
        if (assetLibraryId === void 0) { assetLibraryId = null; }
        _super.call(this);
        this._loadingSessions = new Array();
        this._useAssetLib = useAssetLibrary;
        this._assetLibId = assetLibraryId;
        this._onResourceCompleteDelegate = function (event) { return _this.onResourceComplete(event); };
        this._onAssetCompleteDelegate = function (event) { return _this.onAssetComplete(event); };
    }
    Object.defineProperty(Loader.prototype, "content", {
        /**
         * Contains the root display object of the SWF file or image(JPG, PNG, or
         * GIF) file that was loaded by using the <code>load()</code> or
         * <code>loadBytes()</code> methods.
         *
         * @throws SecurityError The loaded SWF file or image file belongs to a
         *                       security sandbox to which you do not have access.
         *                       For a loaded SWF file, you can avoid this situation
         *                       by having the file call the
         *                       <code>Security.allowDomain()</code> method or by
         *                       having the loading file specify a
         *                       <code>loaderContext</code> parameter with its
         *                       <code>securityDomain</code> property set to
         *                       <code>SecurityDomain.currentDomain</code> when you
         *                       call the <code>load()</code> or
         *                       <code>loadBytes()</code> method.
         */
        get: function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loader.prototype, "contentLoaderInfo", {
        /**
         * Returns a LoaderInfo object corresponding to the object being loaded.
         * LoaderInfo objects are shared between the Loader object and the loaded
         * content object. The LoaderInfo object supplies loading progress
         * information and statistics about the loaded file.
         *
         * <p>Events related to the load are dispatched by the LoaderInfo object
         * referenced by the <code>contentLoaderInfo</code> property of the Loader
         * object. The <code>contentLoaderInfo</code> property is set to a valid
         * LoaderInfo object, even before the content is loaded, so that you can add
         * event listeners to the object prior to the load.</p>
         *
         * <p>To detect uncaught errors that happen in a loaded SWF, use the
         * <code>Loader.uncaughtErrorEvents</code> property, not the
         * <code>Loader.contentLoaderInfo.uncaughtErrorEvents</code> property.</p>
         */
        get: function () {
            return this._contentLoaderInfo;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Cancels a <code>load()</code> method operation that is currently in
     * progress for the Loader instance.
     *
     */
    Loader.prototype.close = function () {
        if (this._useAssetLib) {
            var lib;
            lib = AssetLibraryBundle.getInstance(this._assetLibId);
            lib.stopAllLoadingSessions();
            this._loadingSessions = null;
            return;
        }
        var i /*int*/;
        var length = this._loadingSessions.length;
        for (i = 0; i < length; i++) {
            this.removeListeners(this._loadingSessions[i]);
            this._loadingSessions[i].stop();
            this._loadingSessions[i] = null;
        }
        this._loadingSessions = null;
    };
    /**
     * Loads a SWF, JPEG, progressive JPEG, unanimated GIF, or PNG file into an
     * object that is a child of this Loader object. If you load an animated GIF
     * file, only the first frame is displayed. As the Loader object can contain
     * only a single child, issuing a subsequent <code>load()</code> request
     * terminates the previous request, if still pending, and commences a new
     * load.
     *
     * <p><b>Note</b>: In AIR 1.5 and Flash Player 10, the maximum size for a
     * loaded image is 8,191 pixels in width or height, and the total number of
     * pixels cannot exceed 16,777,215 pixels.(So, if an loaded image is 8,191
     * pixels wide, it can only be 2,048 pixels high.) In Flash Player 9 and
     * earlier and AIR 1.1 and earlier, the limitation is 2,880 pixels in height
     * and 2,880 pixels in width.</p>
     *
     * <p>A SWF file or image loaded into a Loader object inherits the position,
     * rotation, and scale properties of the parent display objects of the Loader
     * object. </p>
     *
     * <p>Use the <code>unload()</code> method to remove movies or images loaded
     * with this method, or to cancel a load operation that is in progress.</p>
     *
     * <p>You can prevent a SWF file from using this method by setting the
     * <code>allowNetworking</code> parameter of the the <code>object</code> and
     * <code>embed</code> tags in the HTML page that contains the SWF
     * content.</p>
     *
     * <p>When you use this method, consider the Flash Player security model,
     * which is described in the Loader class description. </p>
     *
     * <p> In Flash Player 10 and later, if you use a multipart Content-Type(for
     * example "multipart/form-data") that contains an upload(indicated by a
     * "filename" parameter in a "content-disposition" header within the POST
     * body), the POST operation is subject to the security rules applied to
     * uploads:</p>
     *
     * <ul>
     *   <li>The POST operation must be performed in response to a user-initiated
     * action, such as a mouse click or key press.</li>
     *   <li>If the POST operation is cross-domain(the POST target is not on the
     * same server as the SWF file that is sending the POST request), the target
     * server must provide a URL policy file that permits cross-domain
     * access.</li>
     * </ul>
     *
     * <p>Also, for any multipart Content-Type, the syntax must be valid
     * (according to the RFC2046 standard). If the syntax appears to be invalid,
     * the POST operation is subject to the security rules applied to
     * uploads.</p>
     *
     * <p>For more information related to security, see the Flash Player
     * Developer Center Topic: <a
     * href="http://www.adobe.com/go/devnet_security_en"
     * scope="external">Security</a>.</p>
     *
     * @param request The absolute or relative URL of the SWF, JPEG, GIF, or PNG
     *                file to be loaded. A relative path must be relative to the
     *                main SWF file. Absolute URLs must include the protocol
     *                reference, such as http:// or file:///. Filenames cannot
     *                include disk drive specifications.
     * @param context A LoaderContext object, which has properties that define
     *                the following:
     *                <ul>
     *                  <li>Whether or not to check for the existence of a policy
     *                file upon loading the object</li>
     *                  <li>The ApplicationDomain for the loaded object</li>
     *                  <li>The SecurityDomain for the loaded object</li>
     *                  <li>The ImageDecodingPolicy for the loaded image
     *                object</li>
     *                </ul>
     *
     *                <p>If the <code>context</code> parameter is not specified
     *                or refers to a null object, the loaded content remains in
     *                its own security domain.</p>
     *
     *                <p>For complete details, see the description of the
     *                properties in the <a
     *                href="../system/LoaderContext.html">LoaderContext</a>
     *                class.</p>
     * @param ns      An optional namespace string under which the file is to be
     *                loaded, allowing the differentiation of two resources with
     *                identical assets.
     * @param parser  An optional parser object for translating the loaded data
     *                into a usable resource. If not provided, AssetLoader will
     *                attempt to auto-detect the file type.
     * @throws IOError               The <code>digest</code> property of the
     *                               <code>request</code> object is not
     *                               <code>null</code>. You should only set the
     *                               <code>digest</code> property of a URLRequest
     *                               object when calling the
     *                               <code>URLLoader.load()</code> method when
     *                               loading a SWZ file(an Adobe platform
     *                               component).
     * @throws IllegalOperationError If the <code>requestedContentParent</code>
     *                               property of the <code>context</code>
     *                               parameter is a <code>Loader</code>.
     * @throws IllegalOperationError If the <code>LoaderContext.parameters</code>
     *                               parameter is set to non-null and has some
     *                               values which are not Strings.
     * @throws SecurityError         The value of
     *                               <code>LoaderContext.securityDomain</code>
     *                               must be either <code>null</code> or
     *                               <code>SecurityDomain.currentDomain</code>.
     *                               This reflects the fact that you can only
     *                               place the loaded media in its natural
     *                               security sandbox or your own(the latter
     *                               requires a policy file).
     * @throws SecurityError         Local SWF files may not set
     *                               LoaderContext.securityDomain to anything
     *                               other than <code>null</code>. It is not
     *                               permitted to import non-local media into a
     *                               local sandbox, or to place other local media
     *                               in anything other than its natural sandbox.
     * @throws SecurityError         You cannot connect to commonly reserved
     *                               ports. For a complete list of blocked ports,
     *                               see "Restricting Networking APIs" in the
     *                               <i>ActionScript 3.0 Developer's Guide</i>.
     * @throws SecurityError         If the <code>applicationDomain</code> or
     *                               <code>securityDomain</code> properties of
     *                               the <code>context</code> parameter are from
     *                               a disallowed domain.
     * @throws SecurityError         If a local SWF file is attempting to use the
     *                               <code>securityDomain</code> property of the
     *                               <code>context</code> parameter.
     * @event asyncError    Dispatched by the <code>contentLoaderInfo</code>
     *                      object if the
     *                      <code>LoaderContext.requestedContentParent</code>
     *                      property has been specified and it is not possible to
     *                      add the loaded content as a child to the specified
     *                      DisplayObjectContainer. This could happen if the
     *                      loaded content is a
     *                      <code>flash.display.AVM1Movie</code> or if the
     *                      <code>addChild()</code> call to the
     *                      requestedContentParent throws an error.
     * @event complete      Dispatched by the <code>contentLoaderInfo</code>
     *                      object when the file has completed loading. The
     *                      <code>complete</code> event is always dispatched
     *                      after the <code>init</code> event.
     * @event httpStatus    Dispatched by the <code>contentLoaderInfo</code>
     *                      object when a network request is made over HTTP and
     *                      Flash Player can detect the HTTP status code.
     * @event init          Dispatched by the <code>contentLoaderInfo</code>
     *                      object when the properties and methods of the loaded
     *                      SWF file are accessible. The <code>init</code> event
     *                      always precedes the <code>complete</code> event.
     * @event ioError       Dispatched by the <code>contentLoaderInfo</code>
     *                      object when an input or output error occurs that
     *                      causes a load operation to fail.
     * @event open          Dispatched by the <code>contentLoaderInfo</code>
     *                      object when the loading operation starts.
     * @event progress      Dispatched by the <code>contentLoaderInfo</code>
     *                      object as data is received while load operation
     *                      progresses.
     * @event securityError Dispatched by the <code>contentLoaderInfo</code>
     *                      object if a SWF file in the local-with-filesystem
     *                      sandbox attempts to load content in the
     *                      local-with-networking sandbox, or vice versa.
     * @event securityError Dispatched by the <code>contentLoaderInfo</code>
     *                      object if the
     *                      <code>LoaderContext.requestedContentParent</code>
     *                      property has been specified and the security sandbox
     *                      of the
     *                      <code>LoaderContext.requestedContentParent</code>
     *                      does not have access to the loaded SWF.
     * @event unload        Dispatched by the <code>contentLoaderInfo</code>
     *                      object when a loaded object is removed.
     */
    Loader.prototype.load = function (request, context, ns, parser) {
        if (context === void 0) { context = null; }
        if (ns === void 0) { ns = null; }
        if (parser === void 0) { parser = null; }
        var token;
        if (this._useAssetLib) {
            var lib;
            lib = AssetLibraryBundle.getInstance(this._assetLibId);
            token = lib.load(request, context, ns, parser);
        }
        else {
            var loader = new AssetLoader();
            this._loadingSessions.push(loader);
            token = loader.load(request, context, ns, parser);
        }
        token.addEventListener(LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
        token.addEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
        // Error are handled separately (see documentation for addErrorHandler)
        token._iLoader._iAddErrorHandler(this.onLoadError);
        token._iLoader._iAddParseErrorHandler(this.onParseError);
        return token;
    };
    /**
     * Loads from binary data stored in a ByteArray object.
     *
     * <p>The <code>loadBytes()</code> method is asynchronous. You must wait for
     * the "init" event before accessing the properties of a loaded object.</p>
     *
     * <p>When you use this method, consider the Flash Player security model,
     * which is described in the Loader class description. </p>
     *
     * @param bytes   A ByteArray object. The contents of the ByteArray can be
     *                any of the file formats supported by the Loader class: SWF,
     *                GIF, JPEG, or PNG.
     * @param context A LoaderContext object. Only the
     *                <code>applicationDomain</code> property of the
     *                LoaderContext object applies; the
     *                <code>checkPolicyFile</code> and
     *                <code>securityDomain</code> properties of the LoaderContext
     *                object do not apply.
     *
     *                <p>If the <code>context</code> parameter is not specified
     *                or refers to a null object, the content is loaded into the
     *                current security domain -  a process referred to as "import
     *                loading" in Flash Player security documentation.
     *                Specifically, if the loading SWF file trusts the remote SWF
     *                by incorporating the remote SWF into its code, then the
     *                loading SWF can import it directly into its own security
     *                domain.</p>
     *
     *                <p>For more information related to security, see the Flash
     *                Player Developer Center Topic: <a
     *                href="http://www.adobe.com/go/devnet_security_en"
     *                scope="external">Security</a>.</p>
     * @throws ArgumentError         If the <code>length</code> property of the
     *                               ByteArray object is not greater than 0.
     * @throws IllegalOperationError If the <code>checkPolicyFile</code> or
     *                               <code>securityDomain</code> property of the
     *                               <code>context</code> parameter are non-null.
     * @throws IllegalOperationError If the <code>requestedContentParent</code>
     *                               property of the <code>context</code>
     *                               parameter is a <code>Loader</code>.
     * @throws IllegalOperationError If the <code>LoaderContext.parameters</code>
     *                               parameter is set to non-null and has some
     *                               values which are not Strings.
     * @throws SecurityError         If the provided
     *                               <code>applicationDomain</code> property of
     *                               the <code>context</code> property is from a
     *                               disallowed domain.
     * @throws SecurityError         You cannot connect to commonly reserved
     *                               ports. For a complete list of blocked ports,
     *                               see "Restricting Networking APIs" in the
     *                               <i>ActionScript 3.0 Developer's Guide</i>.
     * @event asyncError    Dispatched by the <code>contentLoaderInfo</code>
     *                      object if the
     *                      <code>LoaderContext.requestedContentParent</code>
     *                      property has been specified and it is not possible to
     *                      add the loaded content as a child to the specified
     *                      DisplayObjectContainer. This could happen if the
     *                      loaded content is a
     *                      <code>flash.display.AVM1Movie</code> or if the
     *                      <code>addChild()</code> call to the
     *                      requestedContentParent throws an error.
     * @event complete      Dispatched by the <code>contentLoaderInfo</code>
     *                      object when the operation is complete. The
     *                      <code>complete</code> event is always dispatched
     *                      after the <code>init</code> event.
     * @event init          Dispatched by the <code>contentLoaderInfo</code>
     *                      object when the properties and methods of the loaded
     *                      data are accessible. The <code>init</code> event
     *                      always precedes the <code>complete</code> event.
     * @event ioError       Dispatched by the <code>contentLoaderInfo</code>
     *                      object when the runtime cannot parse the data in the
     *                      byte array.
     * @event open          Dispatched by the <code>contentLoaderInfo</code>
     *                      object when the operation starts.
     * @event progress      Dispatched by the <code>contentLoaderInfo</code>
     *                      object as data is transfered in memory.
     * @event securityError Dispatched by the <code>contentLoaderInfo</code>
     *                      object if the
     *                      <code>LoaderContext.requestedContentParent</code>
     *                      property has been specified and the security sandbox
     *                      of the
     *                      <code>LoaderContext.requestedContentParent</code>
     *                      does not have access to the loaded SWF.
     * @event unload        Dispatched by the <code>contentLoaderInfo</code>
     *                      object when a loaded object is removed.
     */
    Loader.prototype.loadData = function (data, context, ns, parser) {
        if (context === void 0) { context = null; }
        if (ns === void 0) { ns = null; }
        if (parser === void 0) { parser = null; }
        var token;
        if (this._useAssetLib) {
            var lib;
            lib = AssetLibraryBundle.getInstance(this._assetLibId);
            token = lib.loadData(data, context, ns, parser);
        }
        else {
            var loader = new AssetLoader();
            this._loadingSessions.push(loader);
            token = loader.loadData(data, '', context, ns, parser);
        }
        token.addEventListener(LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
        token.addEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
        // Error are handled separately (see documentation for addErrorHandler)
        token._iLoader._iAddErrorHandler(this.onLoadError);
        token._iLoader._iAddParseErrorHandler(this.onParseError);
        return token;
    };
    /**
     * Removes a child of this Loader object that was loaded by using the
     * <code>load()</code> method. The <code>property</code> of the associated
     * LoaderInfo object is reset to <code>null</code>. The child is not
     * necessarily destroyed because other objects might have references to it;
     * however, it is no longer a child of the Loader object.
     *
     * <p>As a best practice, before you unload a child SWF file, you should
     * explicitly close any streams in the child SWF file's objects, such as
     * LocalConnection, NetConnection, NetStream, and Sound objects. Otherwise,
     * audio in the child SWF file might continue to play, even though the child
     * SWF file was unloaded. To close streams in the child SWF file, add an
     * event listener to the child that listens for the <code>unload</code>
     * event. When the parent calls <code>Loader.unload()</code>, the
     * <code>unload</code> event is dispatched to the child. The following code
     * shows how you might do this:</p>
     * <pre xml:space="preserve"> public closeAllStreams(evt:Event) {
     * myNetStream.close(); mySound.close(); myNetConnection.close();
     * myLocalConnection.close(); }
     * myMovieClip.loaderInfo.addEventListener(Event.UNLOAD,
     * closeAllStreams);</pre>
     *
     */
    Loader.prototype.unload = function () {
        //TODO
    };
    /**
     * Enables a specific parser.
     * When no specific parser is set for a loading/parsing opperation,
     * loader3d can autoselect the correct parser to use.
     * A parser must have been enabled, to be considered when autoselecting the parser.
     *
     * @param parserClass The parser class to enable.
     * @see away.parsers.Parsers
     */
    Loader.enableParser = function (parserClass) {
        AssetLoader.enableParser(parserClass);
    };
    /**
     * Enables a list of parsers.
     * When no specific parser is set for a loading/parsing opperation,
     * loader3d can autoselect the correct parser to use.
     * A parser must have been enabled, to be considered when autoselecting the parser.
     *
     * @param parserClasses A Vector of parser classes to enable.
     * @see away.parsers.Parsers
     */
    Loader.enableParsers = function (parserClasses) {
        AssetLoader.enableParsers(parserClasses);
    };
    Loader.prototype.removeListeners = function (dispatcher) {
        dispatcher.removeEventListener(LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
        dispatcher.removeEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
    };
    Loader.prototype.onAssetComplete = function (event) {
        this.dispatchEvent(event);
    };
    /**
     * Called when an error occurs during loading
     */
    Loader.prototype.onLoadError = function (event) {
        if (this.hasEventListener(IOErrorEvent.IO_ERROR)) {
            this.dispatchEvent(event);
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Called when a an error occurs during parsing
     */
    Loader.prototype.onParseError = function (event) {
        if (this.hasEventListener(ParserEvent.PARSE_ERROR)) {
            this.dispatchEvent(event);
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Called when the resource and all of its dependencies was retrieved.
     */
    Loader.prototype.onResourceComplete = function (event) {
        this._content = event.content;
        if (this._content)
            this.addChild(this._content);
        this.dispatchEvent(event);
    };
    return Loader;
})(DisplayObjectContainer);
module.exports = Loader;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL0xvYWRlci50cyJdLCJuYW1lcyI6WyJMb2FkZXIiLCJMb2FkZXIuY29uc3RydWN0b3IiLCJMb2FkZXIuY29udGVudCIsIkxvYWRlci5jb250ZW50TG9hZGVySW5mbyIsIkxvYWRlci5jbG9zZSIsIkxvYWRlci5sb2FkIiwiTG9hZGVyLmxvYWREYXRhIiwiTG9hZGVyLnVubG9hZCIsIkxvYWRlci5lbmFibGVQYXJzZXIiLCJMb2FkZXIuZW5hYmxlUGFyc2VycyIsIkxvYWRlci5yZW1vdmVMaXN0ZW5lcnMiLCJMb2FkZXIub25Bc3NldENvbXBsZXRlIiwiTG9hZGVyLm9uTG9hZEVycm9yIiwiTG9hZGVyLm9uUGFyc2VFcnJvciIsIkxvYWRlci5vblJlc291cmNlQ29tcGxldGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sa0JBQWtCLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUNwRixJQUFPLFdBQVcsV0FBZSxxQ0FBcUMsQ0FBQyxDQUFDO0FBSXhFLElBQU8sVUFBVSxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFFckUsSUFBTyxZQUFZLFdBQWUscUNBQXFDLENBQUMsQ0FBQztBQUN6RSxJQUFPLFdBQVcsV0FBZSxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3ZFLElBQU8sV0FBVyxXQUFlLG9DQUFvQyxDQUFDLENBQUM7QUFHdkUsSUFBTyxzQkFBc0IsV0FBWSxzREFBc0QsQ0FBQyxDQUFDO0FBSWpHLEFBK0RBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csTUFBTTtJQUFTQSxVQUFmQSxNQUFNQSxVQUErQkE7SUFzRTFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0ErQ0dBO0lBQ0hBLFNBdEhLQSxNQUFNQSxDQXNIQ0EsZUFBOEJBLEVBQUVBLGNBQTRCQTtRQXRIekVDLGlCQWlq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QUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUU5QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7SUFDM0JBLENBQUNBO0lBQ0ZkLGFBQUNBO0FBQURBLENBampCQSxBQWlqQkNBLEVBampCb0Isc0JBQXNCLEVBaWpCMUM7QUFFRCxBQUFnQixpQkFBUCxNQUFNLENBQUMiLCJmaWxlIjoiY29udGFpbmVycy9Mb2FkZXIuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFzc2V0TGlicmFyeUJ1bmRsZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeUJ1bmRsZVwiKTtcclxuaW1wb3J0IEFzc2V0TG9hZGVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TG9hZGVyXCIpO1xyXG5pbXBvcnQgQXNzZXRMb2FkZXJDb250ZXh0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMb2FkZXJDb250ZXh0XCIpO1xyXG5pbXBvcnQgQXNzZXRMb2FkZXJUb2tlblx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMb2FkZXJUb2tlblwiKTtcclxuaW1wb3J0IFVSTFJlcXVlc3RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxSZXF1ZXN0XCIpO1xyXG5pbXBvcnQgQXNzZXRFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0Fzc2V0RXZlbnRcIik7XHJcbmltcG9ydCBFdmVudERpc3BhdGNoZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCIpO1xyXG5pbXBvcnQgSU9FcnJvckV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvSU9FcnJvckV2ZW50XCIpO1xyXG5pbXBvcnQgTG9hZGVyRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9Mb2FkZXJFdmVudFwiKTtcclxuaW1wb3J0IFBhcnNlckV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvUGFyc2VyRXZlbnRcIik7XHJcbmltcG9ydCBQYXJzZXJCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wYXJzZXJzL1BhcnNlckJhc2VcIik7XHJcblxyXG5pbXBvcnQgRGlzcGxheU9iamVjdENvbnRhaW5lclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyXCIpO1xyXG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcclxuaW1wb3J0IExvYWRlckluZm9cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvTG9hZGVySW5mb1wiKTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgTG9hZGVyIGNsYXNzIGlzIHVzZWQgdG8gbG9hZCBTV0YgZmlsZXMgb3IgaW1hZ2UoSlBHLCBQTkcsIG9yIEdJRilcclxuICogZmlsZXMuIFVzZSB0aGUgPGNvZGU+bG9hZCgpPC9jb2RlPiBtZXRob2QgdG8gaW5pdGlhdGUgbG9hZGluZy4gVGhlIGxvYWRlZFxyXG4gKiBkaXNwbGF5IG9iamVjdCBpcyBhZGRlZCBhcyBhIGNoaWxkIG9mIHRoZSBMb2FkZXIgb2JqZWN0LlxyXG4gKlxyXG4gKiA8cD5Vc2UgdGhlIFVSTExvYWRlciBjbGFzcyB0byBsb2FkIHRleHQgb3IgYmluYXJ5IGRhdGEuPC9wPlxyXG4gKlxyXG4gKiA8cD5UaGUgTG9hZGVyIGNsYXNzIG92ZXJyaWRlcyB0aGUgZm9sbG93aW5nIG1ldGhvZHMgdGhhdCBpdCBpbmhlcml0cyxcclxuICogYmVjYXVzZSBhIExvYWRlciBvYmplY3QgY2FuIG9ubHkgaGF2ZSBvbmUgY2hpbGQgZGlzcGxheSBvYmplY3QgLSB0aGVcclxuICogZGlzcGxheSBvYmplY3QgdGhhdCBpdCBsb2Fkcy4gQ2FsbGluZyB0aGUgZm9sbG93aW5nIG1ldGhvZHMgdGhyb3dzIGFuXHJcbiAqIGV4Y2VwdGlvbjogPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4sIDxjb2RlPmFkZENoaWxkQXQoKTwvY29kZT4sXHJcbiAqIDxjb2RlPnJlbW92ZUNoaWxkKCk8L2NvZGU+LCA8Y29kZT5yZW1vdmVDaGlsZEF0KCk8L2NvZGU+LCBhbmRcclxuICogPGNvZGU+c2V0Q2hpbGRJbmRleCgpPC9jb2RlPi4gVG8gcmVtb3ZlIGEgbG9hZGVkIGRpc3BsYXkgb2JqZWN0LCB5b3UgbXVzdFxyXG4gKiByZW1vdmUgdGhlIDxpPkxvYWRlcjwvaT4gb2JqZWN0IGZyb20gaXRzIHBhcmVudCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHJcbiAqIGNoaWxkIGFycmF5LiA8L3A+XHJcbiAqXHJcbiAqIDxwPjxiPk5vdGU6PC9iPiBUaGUgQWN0aW9uU2NyaXB0IDIuMCBNb3ZpZUNsaXBMb2FkZXIgYW5kIExvYWRWYXJzIGNsYXNzZXNcclxuICogYXJlIG5vdCB1c2VkIGluIEFjdGlvblNjcmlwdCAzLjAuIFRoZSBMb2FkZXIgYW5kIFVSTExvYWRlciBjbGFzc2VzIHJlcGxhY2VcclxuICogdGhlbS48L3A+XHJcbiAqXHJcbiAqIDxwPldoZW4geW91IHVzZSB0aGUgTG9hZGVyIGNsYXNzLCBjb25zaWRlciB0aGUgRmxhc2ggUGxheWVyIGFuZCBBZG9iZSBBSVJcclxuICogc2VjdXJpdHkgbW9kZWw6IDwvcD5cclxuICpcclxuICogPHVsPlxyXG4gKiAgIDxsaT5Zb3UgY2FuIGxvYWQgY29udGVudCBmcm9tIGFueSBhY2Nlc3NpYmxlIHNvdXJjZS4gPC9saT5cclxuICogICA8bGk+TG9hZGluZyBpcyBub3QgYWxsb3dlZCBpZiB0aGUgY2FsbGluZyBTV0YgZmlsZSBpcyBpbiBhIG5ldHdvcmtcclxuICogc2FuZGJveCBhbmQgdGhlIGZpbGUgdG8gYmUgbG9hZGVkIGlzIGxvY2FsLiA8L2xpPlxyXG4gKiAgIDxsaT5JZiB0aGUgbG9hZGVkIGNvbnRlbnQgaXMgYSBTV0YgZmlsZSB3cml0dGVuIHdpdGggQWN0aW9uU2NyaXB0IDMuMCwgaXRcclxuICogY2Fubm90IGJlIGNyb3NzLXNjcmlwdGVkIGJ5IGEgU1dGIGZpbGUgaW4gYW5vdGhlciBzZWN1cml0eSBzYW5kYm94IHVubGVzc1xyXG4gKiB0aGF0IGNyb3NzLXNjcmlwdGluZyBhcnJhbmdlbWVudCB3YXMgYXBwcm92ZWQgdGhyb3VnaCBhIGNhbGwgdG8gdGhlXHJcbiAqIDxjb2RlPlN5c3RlbS5hbGxvd0RvbWFpbigpPC9jb2RlPiBvciB0aGVcclxuICogPGNvZGU+U3lzdGVtLmFsbG93SW5zZWN1cmVEb21haW4oKTwvY29kZT4gbWV0aG9kIGluIHRoZSBsb2FkZWQgY29udGVudFxyXG4gKiBmaWxlLjwvbGk+XHJcbiAqICAgPGxpPklmIHRoZSBsb2FkZWQgY29udGVudCBpcyBhbiBBVk0xIFNXRiBmaWxlKHdyaXR0ZW4gdXNpbmcgQWN0aW9uU2NyaXB0XHJcbiAqIDEuMCBvciAyLjApLCBpdCBjYW5ub3QgYmUgY3Jvc3Mtc2NyaXB0ZWQgYnkgYW4gQVZNMiBTV0YgZmlsZSh3cml0dGVuIHVzaW5nXHJcbiAqIEFjdGlvblNjcmlwdCAzLjApLiBIb3dldmVyLCB5b3UgY2FuIGNvbW11bmljYXRlIGJldHdlZW4gdGhlIHR3byBTV0YgZmlsZXNcclxuICogYnkgdXNpbmcgdGhlIExvY2FsQ29ubmVjdGlvbiBjbGFzcy48L2xpPlxyXG4gKiAgIDxsaT5JZiB0aGUgbG9hZGVkIGNvbnRlbnQgaXMgYW4gaW1hZ2UsIGl0cyBkYXRhIGNhbm5vdCBiZSBhY2Nlc3NlZCBieSBhXHJcbiAqIFNXRiBmaWxlIG91dHNpZGUgb2YgdGhlIHNlY3VyaXR5IHNhbmRib3gsIHVubGVzcyB0aGUgZG9tYWluIG9mIHRoYXQgU1dGXHJcbiAqIGZpbGUgd2FzIGluY2x1ZGVkIGluIGEgVVJMIHBvbGljeSBmaWxlIGF0IHRoZSBvcmlnaW4gZG9tYWluIG9mIHRoZVxyXG4gKiBpbWFnZS48L2xpPlxyXG4gKiAgIDxsaT5Nb3ZpZSBjbGlwcyBpbiB0aGUgbG9jYWwtd2l0aC1maWxlLXN5c3RlbSBzYW5kYm94IGNhbm5vdCBzY3JpcHQgbW92aWVcclxuICogY2xpcHMgaW4gdGhlIGxvY2FsLXdpdGgtbmV0d29ya2luZyBzYW5kYm94LCBhbmQgdGhlIHJldmVyc2UgaXMgYWxzb1xyXG4gKiBwcmV2ZW50ZWQuIDwvbGk+XHJcbiAqICAgPGxpPllvdSBjYW5ub3QgY29ubmVjdCB0byBjb21tb25seSByZXNlcnZlZCBwb3J0cy4gRm9yIGEgY29tcGxldGUgbGlzdCBvZlxyXG4gKiBibG9ja2VkIHBvcnRzLCBzZWUgXCJSZXN0cmljdGluZyBOZXR3b3JraW5nIEFQSXNcIiBpbiB0aGUgPGk+QWN0aW9uU2NyaXB0IDMuMFxyXG4gKiBEZXZlbG9wZXIncyBHdWlkZTwvaT4uIDwvbGk+XHJcbiAqIDwvdWw+XHJcbiAqXHJcbiAqIDxwPkhvd2V2ZXIsIGluIEFJUiwgY29udGVudCBpbiB0aGUgPGNvZGU+YXBwbGljYXRpb248L2NvZGU+IHNlY3VyaXR5XHJcbiAqIHNhbmRib3goY29udGVudCBpbnN0YWxsZWQgd2l0aCB0aGUgQUlSIGFwcGxpY2F0aW9uKSBhcmUgbm90IHJlc3RyaWN0ZWQgYnlcclxuICogdGhlc2Ugc2VjdXJpdHkgbGltaXRhdGlvbnMuPC9wPlxyXG4gKlxyXG4gKiA8cD5Gb3IgbW9yZSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHNlY3VyaXR5LCBzZWUgdGhlIEZsYXNoIFBsYXllciBEZXZlbG9wZXJcclxuICogQ2VudGVyIFRvcGljOiA8YSBocmVmPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZGV2bmV0X3NlY3VyaXR5X2VuXCJcclxuICogc2NvcGU9XCJleHRlcm5hbFwiPlNlY3VyaXR5PC9hPi48L3A+XHJcbiAqXHJcbiAqIDxwPldoZW4gbG9hZGluZyBhIFNXRiBmaWxlIGZyb20gYW4gdW50cnVzdGVkIHNvdXJjZShzdWNoIGFzIGEgZG9tYWluIG90aGVyXHJcbiAqIHRoYW4gdGhhdCBvZiB0aGUgTG9hZGVyIG9iamVjdCdzIHJvb3QgU1dGIGZpbGUpLCB5b3UgbWF5IHdhbnQgdG8gZGVmaW5lIGFcclxuICogbWFzayBmb3IgdGhlIExvYWRlciBvYmplY3QsIHRvIHByZXZlbnQgdGhlIGxvYWRlZCBjb250ZW50KHdoaWNoIGlzIGEgY2hpbGRcclxuICogb2YgdGhlIExvYWRlciBvYmplY3QpIGZyb20gZHJhd2luZyB0byBwb3J0aW9ucyBvZiB0aGUgU3RhZ2Ugb3V0c2lkZSBvZiB0aGF0XHJcbiAqIG1hc2ssIGFzIHNob3duIGluIHRoZSBmb2xsb3dpbmcgY29kZTo8L3A+XHJcbiAqL1xyXG5jbGFzcyBMb2FkZXIgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHJcbntcclxuXHQvKipcclxuXHQgKiBEaXNwYXRjaGVkIHdoZW4gYW55IGFzc2V0IGZpbmlzaGVzIHBhcnNpbmcuIEFsc28gc2VlIHNwZWNpZmljIGV2ZW50cyBmb3IgZWFjaFxyXG5cdCAqIGluZGl2aWR1YWwgYXNzZXQgdHlwZSAobWVzaGVzLCBtYXRlcmlhbHMgZXQgYy4pXHJcblx0ICpcclxuXHQgKiBAZXZlbnRUeXBlIEFzc2V0RXZlbnRcclxuXHQgKi9cclxuXHQvL1tFdmVudChuYW1lPVwiYXNzZXRDb21wbGV0ZVwiLCB0eXBlPVwiQXNzZXRFdmVudFwiKV1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3BhdGNoZWQgd2hlbiBhIGZ1bGwgcmVzb3VyY2UgKGluY2x1ZGluZyBkZXBlbmRlbmNpZXMpIGZpbmlzaGVzIGxvYWRpbmcuXHJcblx0ICpcclxuXHQgKiBAZXZlbnRUeXBlIExvYWRlckV2ZW50XHJcblx0ICovXHJcblx0Ly9bRXZlbnQobmFtZT1cInJlc291cmNlQ29tcGxldGVcIiwgdHlwZT1cIkxvYWRlckV2ZW50XCIpXVxyXG5cclxuXHRwcml2YXRlIF9sb2FkaW5nU2Vzc2lvbnM6QXJyYXk8QXNzZXRMb2FkZXI+O1xyXG5cdHByaXZhdGUgX3VzZUFzc2V0TGliOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfYXNzZXRMaWJJZDpzdHJpbmc7XHJcblx0cHJpdmF0ZSBfb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGU6RnVuY3Rpb247XHJcblx0cHJpdmF0ZSBfb25Bc3NldENvbXBsZXRlRGVsZWdhdGU6RnVuY3Rpb247XHJcblxyXG5cdHByaXZhdGUgX2NvbnRlbnQ6RGlzcGxheU9iamVjdDtcclxuXHRwcml2YXRlIF9jb250ZW50TG9hZGVySW5mbzpMb2FkZXJJbmZvO1xyXG5cclxuXHQvKipcclxuXHQgKiBDb250YWlucyB0aGUgcm9vdCBkaXNwbGF5IG9iamVjdCBvZiB0aGUgU1dGIGZpbGUgb3IgaW1hZ2UoSlBHLCBQTkcsIG9yXHJcblx0ICogR0lGKSBmaWxlIHRoYXQgd2FzIGxvYWRlZCBieSB1c2luZyB0aGUgPGNvZGU+bG9hZCgpPC9jb2RlPiBvclxyXG5cdCAqIDxjb2RlPmxvYWRCeXRlcygpPC9jb2RlPiBtZXRob2RzLlxyXG5cdCAqXHJcblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yIFRoZSBsb2FkZWQgU1dGIGZpbGUgb3IgaW1hZ2UgZmlsZSBiZWxvbmdzIHRvIGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgc2VjdXJpdHkgc2FuZGJveCB0byB3aGljaCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzLlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBGb3IgYSBsb2FkZWQgU1dGIGZpbGUsIHlvdSBjYW4gYXZvaWQgdGhpcyBzaXR1YXRpb25cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYnkgaGF2aW5nIHRoZSBmaWxlIGNhbGwgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlNlY3VyaXR5LmFsbG93RG9tYWluKCk8L2NvZGU+IG1ldGhvZCBvciBieVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBoYXZpbmcgdGhlIGxvYWRpbmcgZmlsZSBzcGVjaWZ5IGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+bG9hZGVyQ29udGV4dDwvY29kZT4gcGFyYW1ldGVyIHdpdGggaXRzXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnNlY3VyaXR5RG9tYWluPC9jb2RlPiBwcm9wZXJ0eSBzZXQgdG9cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+U2VjdXJpdHlEb21haW4uY3VycmVudERvbWFpbjwvY29kZT4gd2hlbiB5b3VcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgY2FsbCB0aGUgPGNvZGU+bG9hZCgpPC9jb2RlPiBvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5sb2FkQnl0ZXMoKTwvY29kZT4gbWV0aG9kLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgY29udGVudCgpOkRpc3BsYXlPYmplY3RcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29udGVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSBMb2FkZXJJbmZvIG9iamVjdCBjb3JyZXNwb25kaW5nIHRvIHRoZSBvYmplY3QgYmVpbmcgbG9hZGVkLlxyXG5cdCAqIExvYWRlckluZm8gb2JqZWN0cyBhcmUgc2hhcmVkIGJldHdlZW4gdGhlIExvYWRlciBvYmplY3QgYW5kIHRoZSBsb2FkZWRcclxuXHQgKiBjb250ZW50IG9iamVjdC4gVGhlIExvYWRlckluZm8gb2JqZWN0IHN1cHBsaWVzIGxvYWRpbmcgcHJvZ3Jlc3NcclxuXHQgKiBpbmZvcm1hdGlvbiBhbmQgc3RhdGlzdGljcyBhYm91dCB0aGUgbG9hZGVkIGZpbGUuXHJcblx0ICpcclxuXHQgKiA8cD5FdmVudHMgcmVsYXRlZCB0byB0aGUgbG9hZCBhcmUgZGlzcGF0Y2hlZCBieSB0aGUgTG9hZGVySW5mbyBvYmplY3RcclxuXHQgKiByZWZlcmVuY2VkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgb2YgdGhlIExvYWRlclxyXG5cdCAqIG9iamVjdC4gVGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgdG8gYSB2YWxpZFxyXG5cdCAqIExvYWRlckluZm8gb2JqZWN0LCBldmVuIGJlZm9yZSB0aGUgY29udGVudCBpcyBsb2FkZWQsIHNvIHRoYXQgeW91IGNhbiBhZGRcclxuXHQgKiBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIG9iamVjdCBwcmlvciB0byB0aGUgbG9hZC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UbyBkZXRlY3QgdW5jYXVnaHQgZXJyb3JzIHRoYXQgaGFwcGVuIGluIGEgbG9hZGVkIFNXRiwgdXNlIHRoZVxyXG5cdCAqIDxjb2RlPkxvYWRlci51bmNhdWdodEVycm9yRXZlbnRzPC9jb2RlPiBwcm9wZXJ0eSwgbm90IHRoZVxyXG5cdCAqIDxjb2RlPkxvYWRlci5jb250ZW50TG9hZGVySW5mby51bmNhdWdodEVycm9yRXZlbnRzPC9jb2RlPiBwcm9wZXJ0eS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBjb250ZW50TG9hZGVySW5mbygpOkxvYWRlckluZm9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29udGVudExvYWRlckluZm87XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgTG9hZGVyIG9iamVjdCB0aGF0IHlvdSBjYW4gdXNlIHRvIGxvYWQgZmlsZXMsIHN1Y2ggYXMgU1dGLCBKUEVHLFxyXG5cdCAqIEdJRiwgb3IgUE5HIGZpbGVzLiBDYWxsIHRoZSA8Y29kZT5sb2FkKCk8L2NvZGU+IG1ldGhvZCB0byBsb2FkIHRoZSBhc3NldFxyXG5cdCAqIGFzIGEgY2hpbGQgb2YgdGhlIExvYWRlciBpbnN0YW5jZS4gWW91IGNhbiB0aGVuIGFkZCB0aGUgTG9hZGVyIG9iamVjdCB0b1xyXG5cdCAqIHRoZSBkaXNwbGF5IGxpc3QoZm9yIGluc3RhbmNlLCBieSB1c2luZyB0aGUgPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT5cclxuXHQgKiBtZXRob2Qgb2YgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlKS4gVGhlIGFzc2V0IGFwcGVhcnMgb24gdGhlXHJcblx0ICogU3RhZ2UgYXMgaXQgbG9hZHMuXHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgY2FuIGFsc28gdXNlIGEgTG9hZGVyIGluc3RhbmNlIFwib2ZmbGlzdCxcIiB0aGF0IGlzIHdpdGhvdXQgYWRkaW5nIGl0XHJcblx0ICogdG8gYSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgb24gdGhlIGRpc3BsYXkgbGlzdC4gSW4gdGhpcyBtb2RlLCB0aGVcclxuXHQgKiBMb2FkZXIgaW5zdGFuY2UgbWlnaHQgYmUgdXNlZCB0byBsb2FkIGEgU1dGIGZpbGUgdGhhdCBjb250YWlucyBhZGRpdGlvbmFsXHJcblx0ICogbW9kdWxlcyBvZiBhbiBhcHBsaWNhdGlvbi4gPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VG8gZGV0ZWN0IHdoZW4gdGhlIFNXRiBmaWxlIGlzIGZpbmlzaGVkIGxvYWRpbmcsIHlvdSBjYW4gdXNlIHRoZSBldmVudHNcclxuXHQgKiBvZiB0aGUgTG9hZGVySW5mbyBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoZVxyXG5cdCAqIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgTG9hZGVyIG9iamVjdC4gQXQgdGhhdFxyXG5cdCAqIHBvaW50LCB0aGUgY29kZSBpbiB0aGUgbW9kdWxlIFNXRiBmaWxlIGNhbiBiZSBleGVjdXRlZCB0byBpbml0aWFsaXplIGFuZFxyXG5cdCAqIHN0YXJ0IHRoZSBtb2R1bGUuIEluIHRoZSBvZmZsaXN0IG1vZGUsIGEgTG9hZGVyIGluc3RhbmNlIG1pZ2h0IGFsc28gYmVcclxuXHQgKiB1c2VkIHRvIGxvYWQgYSBTV0YgZmlsZSB0aGF0IGNvbnRhaW5zIGNvbXBvbmVudHMgb3IgbWVkaWEgYXNzZXRzLiBBZ2FpbixcclxuXHQgKiB5b3UgY2FuIHVzZSB0aGUgTG9hZGVySW5mbyBvYmplY3QgZXZlbnQgbm90aWZpY2F0aW9ucyB0byBkZXRlY3Qgd2hlbiB0aGVcclxuXHQgKiBjb21wb25lbnRzIGFyZSBmaW5pc2hlZCBsb2FkaW5nLiBBdCB0aGF0IHBvaW50LCB0aGUgYXBwbGljYXRpb24gY2FuIHN0YXJ0XHJcblx0ICogdXNpbmcgdGhlIGNvbXBvbmVudHMgYW5kIG1lZGlhIGFzc2V0cyBpbiB0aGUgbGlicmFyeSBvZiB0aGUgU1dGIGZpbGUgYnlcclxuXHQgKiBpbnN0YW50aWF0aW5nIHRoZSBBY3Rpb25TY3JpcHQgMy4wIGNsYXNzZXMgdGhhdCByZXByZXNlbnQgdGhvc2UgY29tcG9uZW50c1xyXG5cdCAqIGFuZCBhc3NldHMuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VG8gZGV0ZXJtaW5lIHRoZSBzdGF0dXMgb2YgYSBMb2FkZXIgb2JqZWN0LCBtb25pdG9yIHRoZSBmb2xsb3dpbmdcclxuXHQgKiBldmVudHMgdGhhdCB0aGUgTG9hZGVySW5mbyBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoZVxyXG5cdCAqIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgTG9hZGVyIG9iamVjdDo8L3A+XHJcblx0ICpcclxuXHQgKiA8dWw+XHJcblx0ICogICA8bGk+VGhlIDxjb2RlPm9wZW48L2NvZGU+IGV2ZW50IGlzIGRpc3BhdGNoZWQgd2hlbiBsb2FkaW5nIGJlZ2lucy48L2xpPlxyXG5cdCAqICAgPGxpPlRoZSA8Y29kZT5pb0Vycm9yPC9jb2RlPiBvciA8Y29kZT5zZWN1cml0eUVycm9yPC9jb2RlPiBldmVudCBpc1xyXG5cdCAqIGRpc3BhdGNoZWQgaWYgdGhlIGZpbGUgY2Fubm90IGJlIGxvYWRlZCBvciBpZiBhbiBlcnJvciBvY2N1cmVkIGR1cmluZyB0aGVcclxuXHQgKiBsb2FkIHByb2Nlc3MuIDwvbGk+XHJcblx0ICogICA8bGk+VGhlIDxjb2RlPnByb2dyZXNzPC9jb2RlPiBldmVudCBmaXJlcyBjb250aW51b3VzbHkgd2hpbGUgdGhlIGZpbGUgaXNcclxuXHQgKiBiZWluZyBsb2FkZWQuPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgPGNvZGU+Y29tcGxldGU8L2NvZGU+IGV2ZW50IGlzIGRpc3BhdGNoZWQgd2hlbiBhIGZpbGUgY29tcGxldGVzXHJcblx0ICogZG93bmxvYWRpbmcsIGJ1dCBiZWZvcmUgdGhlIGxvYWRlZCBtb3ZpZSBjbGlwJ3MgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBhcmVcclxuXHQgKiBhdmFpbGFibGUuIDwvbGk+XHJcblx0ICogICA8bGk+VGhlIDxjb2RlPmluaXQ8L2NvZGU+IGV2ZW50IGlzIGRpc3BhdGNoZWQgYWZ0ZXIgdGhlIHByb3BlcnRpZXMgYW5kXHJcblx0ICogbWV0aG9kcyBvZiB0aGUgbG9hZGVkIFNXRiBmaWxlIGFyZSBhY2Nlc3NpYmxlLCBzbyB5b3UgY2FuIGJlZ2luXHJcblx0ICogbWFuaXB1bGF0aW5nIHRoZSBsb2FkZWQgU1dGIGZpbGUuIFRoaXMgZXZlbnQgaXMgZGlzcGF0Y2hlZCBiZWZvcmUgdGhlXHJcblx0ICogPGNvZGU+Y29tcGxldGU8L2NvZGU+IGhhbmRsZXIuIEluIHN0cmVhbWluZyBTV0YgZmlsZXMsIHRoZVxyXG5cdCAqIDxjb2RlPmluaXQ8L2NvZGU+IGV2ZW50IGNhbiBvY2N1ciBzaWduaWZpY2FudGx5IGVhcmxpZXIgdGhhbiB0aGVcclxuXHQgKiA8Y29kZT5jb21wbGV0ZTwvY29kZT4gZXZlbnQuIEZvciBtb3N0IHB1cnBvc2VzLCB1c2UgdGhlIDxjb2RlPmluaXQ8L2NvZGU+XHJcblx0ICogaGFuZGxlci48L2xpPlxyXG5cdCAqIDwvdWw+XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IodXNlQXNzZXRMaWJyYXJ5OmJvb2xlYW4gPSB0cnVlLCBhc3NldExpYnJhcnlJZDpzdHJpbmcgPSBudWxsKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zID0gbmV3IEFycmF5PEFzc2V0TG9hZGVyPigpO1xyXG5cdFx0dGhpcy5fdXNlQXNzZXRMaWIgPSB1c2VBc3NldExpYnJhcnk7XHJcblx0XHR0aGlzLl9hc3NldExpYklkID0gYXNzZXRMaWJyYXJ5SWQ7XHJcblxyXG5cdFx0dGhpcy5fb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGUgPSAoZXZlbnQ6TG9hZGVyRXZlbnQpID0+IHRoaXMub25SZXNvdXJjZUNvbXBsZXRlKGV2ZW50KTtcclxuXHRcdHRoaXMuX29uQXNzZXRDb21wbGV0ZURlbGVnYXRlID0gKGV2ZW50OkFzc2V0RXZlbnQpID0+IHRoaXMub25Bc3NldENvbXBsZXRlKGV2ZW50KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbmNlbHMgYSA8Y29kZT5sb2FkKCk8L2NvZGU+IG1ldGhvZCBvcGVyYXRpb24gdGhhdCBpcyBjdXJyZW50bHkgaW5cclxuXHQgKiBwcm9ncmVzcyBmb3IgdGhlIExvYWRlciBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9zZSgpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3VzZUFzc2V0TGliKSB7XHJcblx0XHRcdHZhciBsaWI6QXNzZXRMaWJyYXJ5QnVuZGxlO1xyXG5cdFx0XHRsaWIgPSBBc3NldExpYnJhcnlCdW5kbGUuZ2V0SW5zdGFuY2UodGhpcy5fYXNzZXRMaWJJZCk7XHJcblx0XHRcdGxpYi5zdG9wQWxsTG9hZGluZ1Nlc3Npb25zKCk7XHJcblx0XHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucyA9IG51bGw7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0dmFyIGk6bnVtYmVyIC8qaW50Ki87XHJcblx0XHR2YXIgbGVuZ3RoOm51bWJlciAvKmludCovID0gdGhpcy5fbG9hZGluZ1Nlc3Npb25zLmxlbmd0aDtcclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLnJlbW92ZUxpc3RlbmVycyh0aGlzLl9sb2FkaW5nU2Vzc2lvbnNbaV0pO1xyXG5cdFx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnNbaV0uc3RvcCgpO1xyXG5cdFx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnNbaV0gPSBudWxsO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIGEgU1dGLCBKUEVHLCBwcm9ncmVzc2l2ZSBKUEVHLCB1bmFuaW1hdGVkIEdJRiwgb3IgUE5HIGZpbGUgaW50byBhblxyXG5cdCAqIG9iamVjdCB0aGF0IGlzIGEgY2hpbGQgb2YgdGhpcyBMb2FkZXIgb2JqZWN0LiBJZiB5b3UgbG9hZCBhbiBhbmltYXRlZCBHSUZcclxuXHQgKiBmaWxlLCBvbmx5IHRoZSBmaXJzdCBmcmFtZSBpcyBkaXNwbGF5ZWQuIEFzIHRoZSBMb2FkZXIgb2JqZWN0IGNhbiBjb250YWluXHJcblx0ICogb25seSBhIHNpbmdsZSBjaGlsZCwgaXNzdWluZyBhIHN1YnNlcXVlbnQgPGNvZGU+bG9hZCgpPC9jb2RlPiByZXF1ZXN0XHJcblx0ICogdGVybWluYXRlcyB0aGUgcHJldmlvdXMgcmVxdWVzdCwgaWYgc3RpbGwgcGVuZGluZywgYW5kIGNvbW1lbmNlcyBhIG5ld1xyXG5cdCAqIGxvYWQuXHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlPC9iPjogSW4gQUlSIDEuNSBhbmQgRmxhc2ggUGxheWVyIDEwLCB0aGUgbWF4aW11bSBzaXplIGZvciBhXHJcblx0ICogbG9hZGVkIGltYWdlIGlzIDgsMTkxIHBpeGVscyBpbiB3aWR0aCBvciBoZWlnaHQsIGFuZCB0aGUgdG90YWwgbnVtYmVyIG9mXHJcblx0ICogcGl4ZWxzIGNhbm5vdCBleGNlZWQgMTYsNzc3LDIxNSBwaXhlbHMuKFNvLCBpZiBhbiBsb2FkZWQgaW1hZ2UgaXMgOCwxOTFcclxuXHQgKiBwaXhlbHMgd2lkZSwgaXQgY2FuIG9ubHkgYmUgMiwwNDggcGl4ZWxzIGhpZ2guKSBJbiBGbGFzaCBQbGF5ZXIgOSBhbmRcclxuXHQgKiBlYXJsaWVyIGFuZCBBSVIgMS4xIGFuZCBlYXJsaWVyLCB0aGUgbGltaXRhdGlvbiBpcyAyLDg4MCBwaXhlbHMgaW4gaGVpZ2h0XHJcblx0ICogYW5kIDIsODgwIHBpeGVscyBpbiB3aWR0aC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5BIFNXRiBmaWxlIG9yIGltYWdlIGxvYWRlZCBpbnRvIGEgTG9hZGVyIG9iamVjdCBpbmhlcml0cyB0aGUgcG9zaXRpb24sXHJcblx0ICogcm90YXRpb24sIGFuZCBzY2FsZSBwcm9wZXJ0aWVzIG9mIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3RzIG9mIHRoZSBMb2FkZXJcclxuXHQgKiBvYmplY3QuIDwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlVzZSB0aGUgPGNvZGU+dW5sb2FkKCk8L2NvZGU+IG1ldGhvZCB0byByZW1vdmUgbW92aWVzIG9yIGltYWdlcyBsb2FkZWRcclxuXHQgKiB3aXRoIHRoaXMgbWV0aG9kLCBvciB0byBjYW5jZWwgYSBsb2FkIG9wZXJhdGlvbiB0aGF0IGlzIGluIHByb2dyZXNzLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSBjYW4gcHJldmVudCBhIFNXRiBmaWxlIGZyb20gdXNpbmcgdGhpcyBtZXRob2QgYnkgc2V0dGluZyB0aGVcclxuXHQgKiA8Y29kZT5hbGxvd05ldHdvcmtpbmc8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGUgdGhlIDxjb2RlPm9iamVjdDwvY29kZT4gYW5kXHJcblx0ICogPGNvZGU+ZW1iZWQ8L2NvZGU+IHRhZ3MgaW4gdGhlIEhUTUwgcGFnZSB0aGF0IGNvbnRhaW5zIHRoZSBTV0ZcclxuXHQgKiBjb250ZW50LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPldoZW4geW91IHVzZSB0aGlzIG1ldGhvZCwgY29uc2lkZXIgdGhlIEZsYXNoIFBsYXllciBzZWN1cml0eSBtb2RlbCxcclxuXHQgKiB3aGljaCBpcyBkZXNjcmliZWQgaW4gdGhlIExvYWRlciBjbGFzcyBkZXNjcmlwdGlvbi4gPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+IEluIEZsYXNoIFBsYXllciAxMCBhbmQgbGF0ZXIsIGlmIHlvdSB1c2UgYSBtdWx0aXBhcnQgQ29udGVudC1UeXBlKGZvclxyXG5cdCAqIGV4YW1wbGUgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIpIHRoYXQgY29udGFpbnMgYW4gdXBsb2FkKGluZGljYXRlZCBieSBhXHJcblx0ICogXCJmaWxlbmFtZVwiIHBhcmFtZXRlciBpbiBhIFwiY29udGVudC1kaXNwb3NpdGlvblwiIGhlYWRlciB3aXRoaW4gdGhlIFBPU1RcclxuXHQgKiBib2R5KSwgdGhlIFBPU1Qgb3BlcmF0aW9uIGlzIHN1YmplY3QgdG8gdGhlIHNlY3VyaXR5IHJ1bGVzIGFwcGxpZWQgdG9cclxuXHQgKiB1cGxvYWRzOjwvcD5cclxuXHQgKlxyXG5cdCAqIDx1bD5cclxuXHQgKiAgIDxsaT5UaGUgUE9TVCBvcGVyYXRpb24gbXVzdCBiZSBwZXJmb3JtZWQgaW4gcmVzcG9uc2UgdG8gYSB1c2VyLWluaXRpYXRlZFxyXG5cdCAqIGFjdGlvbiwgc3VjaCBhcyBhIG1vdXNlIGNsaWNrIG9yIGtleSBwcmVzcy48L2xpPlxyXG5cdCAqICAgPGxpPklmIHRoZSBQT1NUIG9wZXJhdGlvbiBpcyBjcm9zcy1kb21haW4odGhlIFBPU1QgdGFyZ2V0IGlzIG5vdCBvbiB0aGVcclxuXHQgKiBzYW1lIHNlcnZlciBhcyB0aGUgU1dGIGZpbGUgdGhhdCBpcyBzZW5kaW5nIHRoZSBQT1NUIHJlcXVlc3QpLCB0aGUgdGFyZ2V0XHJcblx0ICogc2VydmVyIG11c3QgcHJvdmlkZSBhIFVSTCBwb2xpY3kgZmlsZSB0aGF0IHBlcm1pdHMgY3Jvc3MtZG9tYWluXHJcblx0ICogYWNjZXNzLjwvbGk+XHJcblx0ICogPC91bD5cclxuXHQgKlxyXG5cdCAqIDxwPkFsc28sIGZvciBhbnkgbXVsdGlwYXJ0IENvbnRlbnQtVHlwZSwgdGhlIHN5bnRheCBtdXN0IGJlIHZhbGlkXHJcblx0ICogKGFjY29yZGluZyB0byB0aGUgUkZDMjA0NiBzdGFuZGFyZCkuIElmIHRoZSBzeW50YXggYXBwZWFycyB0byBiZSBpbnZhbGlkLFxyXG5cdCAqIHRoZSBQT1NUIG9wZXJhdGlvbiBpcyBzdWJqZWN0IHRvIHRoZSBzZWN1cml0eSBydWxlcyBhcHBsaWVkIHRvXHJcblx0ICogdXBsb2Fkcy48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgbW9yZSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHNlY3VyaXR5LCBzZWUgdGhlIEZsYXNoIFBsYXllclxyXG5cdCAqIERldmVsb3BlciBDZW50ZXIgVG9waWM6IDxhXHJcblx0ICogaHJlZj1cImh0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2Rldm5ldF9zZWN1cml0eV9lblwiXHJcblx0ICogc2NvcGU9XCJleHRlcm5hbFwiPlNlY3VyaXR5PC9hPi48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcmVxdWVzdCBUaGUgYWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIG9mIHRoZSBTV0YsIEpQRUcsIEdJRiwgb3IgUE5HXHJcblx0ICogICAgICAgICAgICAgICAgZmlsZSB0byBiZSBsb2FkZWQuIEEgcmVsYXRpdmUgcGF0aCBtdXN0IGJlIHJlbGF0aXZlIHRvIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgIG1haW4gU1dGIGZpbGUuIEFic29sdXRlIFVSTHMgbXVzdCBpbmNsdWRlIHRoZSBwcm90b2NvbFxyXG5cdCAqICAgICAgICAgICAgICAgIHJlZmVyZW5jZSwgc3VjaCBhcyBodHRwOi8vIG9yIGZpbGU6Ly8vLiBGaWxlbmFtZXMgY2Fubm90XHJcblx0ICogICAgICAgICAgICAgICAgaW5jbHVkZSBkaXNrIGRyaXZlIHNwZWNpZmljYXRpb25zLlxyXG5cdCAqIEBwYXJhbSBjb250ZXh0IEEgTG9hZGVyQ29udGV4dCBvYmplY3QsIHdoaWNoIGhhcyBwcm9wZXJ0aWVzIHRoYXQgZGVmaW5lXHJcblx0ICogICAgICAgICAgICAgICAgdGhlIGZvbGxvd2luZzpcclxuXHQgKiAgICAgICAgICAgICAgICA8dWw+XHJcblx0ICogICAgICAgICAgICAgICAgICA8bGk+V2hldGhlciBvciBub3QgdG8gY2hlY2sgZm9yIHRoZSBleGlzdGVuY2Ugb2YgYSBwb2xpY3lcclxuXHQgKiAgICAgICAgICAgICAgICBmaWxlIHVwb24gbG9hZGluZyB0aGUgb2JqZWN0PC9saT5cclxuXHQgKiAgICAgICAgICAgICAgICAgIDxsaT5UaGUgQXBwbGljYXRpb25Eb21haW4gZm9yIHRoZSBsb2FkZWQgb2JqZWN0PC9saT5cclxuXHQgKiAgICAgICAgICAgICAgICAgIDxsaT5UaGUgU2VjdXJpdHlEb21haW4gZm9yIHRoZSBsb2FkZWQgb2JqZWN0PC9saT5cclxuXHQgKiAgICAgICAgICAgICAgICAgIDxsaT5UaGUgSW1hZ2VEZWNvZGluZ1BvbGljeSBmb3IgdGhlIGxvYWRlZCBpbWFnZVxyXG5cdCAqICAgICAgICAgICAgICAgIG9iamVjdDwvbGk+XHJcblx0ICogICAgICAgICAgICAgICAgPC91bD5cclxuXHQgKlxyXG5cdCAqICAgICAgICAgICAgICAgIDxwPklmIHRoZSA8Y29kZT5jb250ZXh0PC9jb2RlPiBwYXJhbWV0ZXIgaXMgbm90IHNwZWNpZmllZFxyXG5cdCAqICAgICAgICAgICAgICAgIG9yIHJlZmVycyB0byBhIG51bGwgb2JqZWN0LCB0aGUgbG9hZGVkIGNvbnRlbnQgcmVtYWlucyBpblxyXG5cdCAqICAgICAgICAgICAgICAgIGl0cyBvd24gc2VjdXJpdHkgZG9tYWluLjwvcD5cclxuXHQgKlxyXG5cdCAqICAgICAgICAgICAgICAgIDxwPkZvciBjb21wbGV0ZSBkZXRhaWxzLCBzZWUgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgIHByb3BlcnRpZXMgaW4gdGhlIDxhXHJcblx0ICogICAgICAgICAgICAgICAgaHJlZj1cIi4uL3N5c3RlbS9Mb2FkZXJDb250ZXh0Lmh0bWxcIj5Mb2FkZXJDb250ZXh0PC9hPlxyXG5cdCAqICAgICAgICAgICAgICAgIGNsYXNzLjwvcD5cclxuXHQgKiBAcGFyYW0gbnMgICAgICBBbiBvcHRpb25hbCBuYW1lc3BhY2Ugc3RyaW5nIHVuZGVyIHdoaWNoIHRoZSBmaWxlIGlzIHRvIGJlXHJcblx0ICogICAgICAgICAgICAgICAgbG9hZGVkLCBhbGxvd2luZyB0aGUgZGlmZmVyZW50aWF0aW9uIG9mIHR3byByZXNvdXJjZXMgd2l0aFxyXG5cdCAqICAgICAgICAgICAgICAgIGlkZW50aWNhbCBhc3NldHMuXHJcblx0ICogQHBhcmFtIHBhcnNlciAgQW4gb3B0aW9uYWwgcGFyc2VyIG9iamVjdCBmb3IgdHJhbnNsYXRpbmcgdGhlIGxvYWRlZCBkYXRhXHJcblx0ICogICAgICAgICAgICAgICAgaW50byBhIHVzYWJsZSByZXNvdXJjZS4gSWYgbm90IHByb3ZpZGVkLCBBc3NldExvYWRlciB3aWxsXHJcblx0ICogICAgICAgICAgICAgICAgYXR0ZW1wdCB0byBhdXRvLWRldGVjdCB0aGUgZmlsZSB0eXBlLlxyXG5cdCAqIEB0aHJvd3MgSU9FcnJvciAgICAgICAgICAgICAgIFRoZSA8Y29kZT5kaWdlc3Q8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlcXVlc3Q8L2NvZGU+IG9iamVjdCBpcyBub3RcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5udWxsPC9jb2RlPi4gWW91IHNob3VsZCBvbmx5IHNldCB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5kaWdlc3Q8L2NvZGU+IHByb3BlcnR5IG9mIGEgVVJMUmVxdWVzdFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB3aGVuIGNhbGxpbmcgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+VVJMTG9hZGVyLmxvYWQoKTwvY29kZT4gbWV0aG9kIHdoZW5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nIGEgU1daIGZpbGUoYW4gQWRvYmUgcGxhdGZvcm1cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQpLlxyXG5cdCAqIEB0aHJvd3MgSWxsZWdhbE9wZXJhdGlvbkVycm9yIElmIHRoZSA8Y29kZT5yZXF1ZXN0ZWRDb250ZW50UGFyZW50PC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5IG9mIHRoZSA8Y29kZT5jb250ZXh0PC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlciBpcyBhIDxjb2RlPkxvYWRlcjwvY29kZT4uXHJcblx0ICogQHRocm93cyBJbGxlZ2FsT3BlcmF0aW9uRXJyb3IgSWYgdGhlIDxjb2RlPkxvYWRlckNvbnRleHQucGFyYW1ldGVyczwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXIgaXMgc2V0IHRvIG5vbi1udWxsIGFuZCBoYXMgc29tZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyB3aGljaCBhcmUgbm90IFN0cmluZ3MuXHJcblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yICAgICAgICAgVGhlIHZhbHVlIG9mXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+TG9hZGVyQ29udGV4dC5zZWN1cml0eURvbWFpbjwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdXN0IGJlIGVpdGhlciA8Y29kZT5udWxsPC9jb2RlPiBvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlNlY3VyaXR5RG9tYWluLmN1cnJlbnREb21haW48L2NvZGU+LlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXMgcmVmbGVjdHMgdGhlIGZhY3QgdGhhdCB5b3UgY2FuIG9ubHlcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZSB0aGUgbG9hZGVkIG1lZGlhIGluIGl0cyBuYXR1cmFsXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdXJpdHkgc2FuZGJveCBvciB5b3VyIG93bih0aGUgbGF0dGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZXMgYSBwb2xpY3kgZmlsZSkuXHJcblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yICAgICAgICAgTG9jYWwgU1dGIGZpbGVzIG1heSBub3Qgc2V0XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9hZGVyQ29udGV4dC5zZWN1cml0eURvbWFpbiB0byBhbnl0aGluZ1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyIHRoYW4gPGNvZGU+bnVsbDwvY29kZT4uIEl0IGlzIG5vdFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pdHRlZCB0byBpbXBvcnQgbm9uLWxvY2FsIG1lZGlhIGludG8gYVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsIHNhbmRib3gsIG9yIHRvIHBsYWNlIG90aGVyIGxvY2FsIG1lZGlhXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gYW55dGhpbmcgb3RoZXIgdGhhbiBpdHMgbmF0dXJhbCBzYW5kYm94LlxyXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciAgICAgICAgIFlvdSBjYW5ub3QgY29ubmVjdCB0byBjb21tb25seSByZXNlcnZlZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcnRzLiBGb3IgYSBjb21wbGV0ZSBsaXN0IG9mIGJsb2NrZWQgcG9ydHMsXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VlIFwiUmVzdHJpY3RpbmcgTmV0d29ya2luZyBBUElzXCIgaW4gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+QWN0aW9uU2NyaXB0IDMuMCBEZXZlbG9wZXIncyBHdWlkZTwvaT4uXHJcblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yICAgICAgICAgSWYgdGhlIDxjb2RlPmFwcGxpY2F0aW9uRG9tYWluPC9jb2RlPiBvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnNlY3VyaXR5RG9tYWluPC9jb2RlPiBwcm9wZXJ0aWVzIG9mXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIDxjb2RlPmNvbnRleHQ8L2NvZGU+IHBhcmFtZXRlciBhcmUgZnJvbVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgZGlzYWxsb3dlZCBkb21haW4uXHJcblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yICAgICAgICAgSWYgYSBsb2NhbCBTV0YgZmlsZSBpcyBhdHRlbXB0aW5nIHRvIHVzZSB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5zZWN1cml0eURvbWFpbjwvY29kZT4gcHJvcGVydHkgb2YgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Y29udGV4dDwvY29kZT4gcGFyYW1ldGVyLlxyXG5cdCAqIEBldmVudCBhc3luY0Vycm9yICAgIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCBpZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5Mb2FkZXJDb250ZXh0LnJlcXVlc3RlZENvbnRlbnRQYXJlbnQ8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgaGFzIGJlZW4gc3BlY2lmaWVkIGFuZCBpdCBpcyBub3QgcG9zc2libGUgdG9cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBhZGQgdGhlIGxvYWRlZCBjb250ZW50IGFzIGEgY2hpbGQgdG8gdGhlIHNwZWNpZmllZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIuIFRoaXMgY291bGQgaGFwcGVuIGlmIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZCBjb250ZW50IGlzIGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5mbGFzaC5kaXNwbGF5LkFWTTFNb3ZpZTwvY29kZT4gb3IgaWYgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4gY2FsbCB0byB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ZWRDb250ZW50UGFyZW50IHRocm93cyBhbiBlcnJvci5cclxuXHQgKiBAZXZlbnQgY29tcGxldGUgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3Qgd2hlbiB0aGUgZmlsZSBoYXMgY29tcGxldGVkIGxvYWRpbmcuIFRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmNvbXBsZXRlPC9jb2RlPiBldmVudCBpcyBhbHdheXMgZGlzcGF0Y2hlZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIHRoZSA8Y29kZT5pbml0PC9jb2RlPiBldmVudC5cclxuXHQgKiBAZXZlbnQgaHR0cFN0YXR1cyAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3Qgd2hlbiBhIG5ldHdvcmsgcmVxdWVzdCBpcyBtYWRlIG92ZXIgSFRUUCBhbmRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBGbGFzaCBQbGF5ZXIgY2FuIGRldGVjdCB0aGUgSFRUUCBzdGF0dXMgY29kZS5cclxuXHQgKiBAZXZlbnQgaW5pdCAgICAgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3Qgd2hlbiB0aGUgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBvZiB0aGUgbG9hZGVkXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgU1dGIGZpbGUgYXJlIGFjY2Vzc2libGUuIFRoZSA8Y29kZT5pbml0PC9jb2RlPiBldmVudFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGFsd2F5cyBwcmVjZWRlcyB0aGUgPGNvZGU+Y29tcGxldGU8L2NvZGU+IGV2ZW50LlxyXG5cdCAqIEBldmVudCBpb0Vycm9yICAgICAgIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB3aGVuIGFuIGlucHV0IG9yIG91dHB1dCBlcnJvciBvY2N1cnMgdGhhdFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGNhdXNlcyBhIGxvYWQgb3BlcmF0aW9uIHRvIGZhaWwuXHJcblx0ICogQGV2ZW50IG9wZW4gICAgICAgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IHdoZW4gdGhlIGxvYWRpbmcgb3BlcmF0aW9uIHN0YXJ0cy5cclxuXHQgKiBAZXZlbnQgcHJvZ3Jlc3MgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgYXMgZGF0YSBpcyByZWNlaXZlZCB3aGlsZSBsb2FkIG9wZXJhdGlvblxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzZXMuXHJcblx0ICogQGV2ZW50IHNlY3VyaXR5RXJyb3IgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IGlmIGEgU1dGIGZpbGUgaW4gdGhlIGxvY2FsLXdpdGgtZmlsZXN5c3RlbVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIHNhbmRib3ggYXR0ZW1wdHMgdG8gbG9hZCBjb250ZW50IGluIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGxvY2FsLXdpdGgtbmV0d29ya2luZyBzYW5kYm94LCBvciB2aWNlIHZlcnNhLlxyXG5cdCAqIEBldmVudCBzZWN1cml0eUVycm9yIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCBpZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5Mb2FkZXJDb250ZXh0LnJlcXVlc3RlZENvbnRlbnRQYXJlbnQ8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgaGFzIGJlZW4gc3BlY2lmaWVkIGFuZCB0aGUgc2VjdXJpdHkgc2FuZGJveFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkxvYWRlckNvbnRleHQucmVxdWVzdGVkQ29udGVudFBhcmVudDwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byB0aGUgbG9hZGVkIFNXRi5cclxuXHQgKiBAZXZlbnQgdW5sb2FkICAgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3Qgd2hlbiBhIGxvYWRlZCBvYmplY3QgaXMgcmVtb3ZlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgbG9hZChyZXF1ZXN0OlVSTFJlcXVlc3QsIGNvbnRleHQ6QXNzZXRMb2FkZXJDb250ZXh0ID0gbnVsbCwgbnM6c3RyaW5nID0gbnVsbCwgcGFyc2VyOlBhcnNlckJhc2UgPSBudWxsKTpBc3NldExvYWRlclRva2VuXHJcblx0e1xyXG5cdFx0dmFyIHRva2VuOkFzc2V0TG9hZGVyVG9rZW47XHJcblxyXG5cdFx0aWYgKHRoaXMuX3VzZUFzc2V0TGliKSB7XHJcblx0XHRcdHZhciBsaWI6QXNzZXRMaWJyYXJ5QnVuZGxlO1xyXG5cdFx0XHRsaWIgPSBBc3NldExpYnJhcnlCdW5kbGUuZ2V0SW5zdGFuY2UodGhpcy5fYXNzZXRMaWJJZCk7XHJcblx0XHRcdHRva2VuID0gbGliLmxvYWQocmVxdWVzdCwgY29udGV4dCwgbnMsIHBhcnNlcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgbG9hZGVyOkFzc2V0TG9hZGVyID0gbmV3IEFzc2V0TG9hZGVyKCk7XHJcblx0XHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucy5wdXNoKGxvYWRlcik7XHJcblx0XHRcdHRva2VuID0gbG9hZGVyLmxvYWQocmVxdWVzdCwgY29udGV4dCwgbnMsIHBhcnNlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0dG9rZW4uYWRkRXZlbnRMaXN0ZW5lcihMb2FkZXJFdmVudC5SRVNPVVJDRV9DT01QTEVURSwgdGhpcy5fb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGUpO1xyXG5cdFx0dG9rZW4uYWRkRXZlbnRMaXN0ZW5lcihBc3NldEV2ZW50LkFTU0VUX0NPTVBMRVRFLCB0aGlzLl9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZSk7XHJcblxyXG5cdFx0Ly8gRXJyb3IgYXJlIGhhbmRsZWQgc2VwYXJhdGVseSAoc2VlIGRvY3VtZW50YXRpb24gZm9yIGFkZEVycm9ySGFuZGxlcilcclxuXHRcdHRva2VuLl9pTG9hZGVyLl9pQWRkRXJyb3JIYW5kbGVyKHRoaXMub25Mb2FkRXJyb3IpO1xyXG5cdFx0dG9rZW4uX2lMb2FkZXIuX2lBZGRQYXJzZUVycm9ySGFuZGxlcih0aGlzLm9uUGFyc2VFcnJvcik7XHJcblxyXG5cdFx0cmV0dXJuIHRva2VuO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTG9hZHMgZnJvbSBiaW5hcnkgZGF0YSBzdG9yZWQgaW4gYSBCeXRlQXJyYXkgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIDxjb2RlPmxvYWRCeXRlcygpPC9jb2RlPiBtZXRob2QgaXMgYXN5bmNocm9ub3VzLiBZb3UgbXVzdCB3YWl0IGZvclxyXG5cdCAqIHRoZSBcImluaXRcIiBldmVudCBiZWZvcmUgYWNjZXNzaW5nIHRoZSBwcm9wZXJ0aWVzIG9mIGEgbG9hZGVkIG9iamVjdC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5XaGVuIHlvdSB1c2UgdGhpcyBtZXRob2QsIGNvbnNpZGVyIHRoZSBGbGFzaCBQbGF5ZXIgc2VjdXJpdHkgbW9kZWwsXHJcblx0ICogd2hpY2ggaXMgZGVzY3JpYmVkIGluIHRoZSBMb2FkZXIgY2xhc3MgZGVzY3JpcHRpb24uIDwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBieXRlcyAgIEEgQnl0ZUFycmF5IG9iamVjdC4gVGhlIGNvbnRlbnRzIG9mIHRoZSBCeXRlQXJyYXkgY2FuIGJlXHJcblx0ICogICAgICAgICAgICAgICAgYW55IG9mIHRoZSBmaWxlIGZvcm1hdHMgc3VwcG9ydGVkIGJ5IHRoZSBMb2FkZXIgY2xhc3M6IFNXRixcclxuXHQgKiAgICAgICAgICAgICAgICBHSUYsIEpQRUcsIG9yIFBORy5cclxuXHQgKiBAcGFyYW0gY29udGV4dCBBIExvYWRlckNvbnRleHQgb2JqZWN0LiBPbmx5IHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgIDxjb2RlPmFwcGxpY2F0aW9uRG9tYWluPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICBMb2FkZXJDb250ZXh0IG9iamVjdCBhcHBsaWVzOyB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICA8Y29kZT5jaGVja1BvbGljeUZpbGU8L2NvZGU+IGFuZFxyXG5cdCAqICAgICAgICAgICAgICAgIDxjb2RlPnNlY3VyaXR5RG9tYWluPC9jb2RlPiBwcm9wZXJ0aWVzIG9mIHRoZSBMb2FkZXJDb250ZXh0XHJcblx0ICogICAgICAgICAgICAgICAgb2JqZWN0IGRvIG5vdCBhcHBseS5cclxuXHQgKlxyXG5cdCAqICAgICAgICAgICAgICAgIDxwPklmIHRoZSA8Y29kZT5jb250ZXh0PC9jb2RlPiBwYXJhbWV0ZXIgaXMgbm90IHNwZWNpZmllZFxyXG5cdCAqICAgICAgICAgICAgICAgIG9yIHJlZmVycyB0byBhIG51bGwgb2JqZWN0LCB0aGUgY29udGVudCBpcyBsb2FkZWQgaW50byB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICBjdXJyZW50IHNlY3VyaXR5IGRvbWFpbiAtICBhIHByb2Nlc3MgcmVmZXJyZWQgdG8gYXMgXCJpbXBvcnRcclxuXHQgKiAgICAgICAgICAgICAgICBsb2FkaW5nXCIgaW4gRmxhc2ggUGxheWVyIHNlY3VyaXR5IGRvY3VtZW50YXRpb24uXHJcblx0ICogICAgICAgICAgICAgICAgU3BlY2lmaWNhbGx5LCBpZiB0aGUgbG9hZGluZyBTV0YgZmlsZSB0cnVzdHMgdGhlIHJlbW90ZSBTV0ZcclxuXHQgKiAgICAgICAgICAgICAgICBieSBpbmNvcnBvcmF0aW5nIHRoZSByZW1vdGUgU1dGIGludG8gaXRzIGNvZGUsIHRoZW4gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgbG9hZGluZyBTV0YgY2FuIGltcG9ydCBpdCBkaXJlY3RseSBpbnRvIGl0cyBvd24gc2VjdXJpdHlcclxuXHQgKiAgICAgICAgICAgICAgICBkb21haW4uPC9wPlxyXG5cdCAqXHJcblx0ICogICAgICAgICAgICAgICAgPHA+Rm9yIG1vcmUgaW5mb3JtYXRpb24gcmVsYXRlZCB0byBzZWN1cml0eSwgc2VlIHRoZSBGbGFzaFxyXG5cdCAqICAgICAgICAgICAgICAgIFBsYXllciBEZXZlbG9wZXIgQ2VudGVyIFRvcGljOiA8YVxyXG5cdCAqICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9kZXZuZXRfc2VjdXJpdHlfZW5cIlxyXG5cdCAqICAgICAgICAgICAgICAgIHNjb3BlPVwiZXh0ZXJuYWxcIj5TZWN1cml0eTwvYT4uPC9wPlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciAgICAgICAgIElmIHRoZSA8Y29kZT5sZW5ndGg8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJ5dGVBcnJheSBvYmplY3QgaXMgbm90IGdyZWF0ZXIgdGhhbiAwLlxyXG5cdCAqIEB0aHJvd3MgSWxsZWdhbE9wZXJhdGlvbkVycm9yIElmIHRoZSA8Y29kZT5jaGVja1BvbGljeUZpbGU8L2NvZGU+IG9yXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c2VjdXJpdHlEb21haW48L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmNvbnRleHQ8L2NvZGU+IHBhcmFtZXRlciBhcmUgbm9uLW51bGwuXHJcblx0ICogQHRocm93cyBJbGxlZ2FsT3BlcmF0aW9uRXJyb3IgSWYgdGhlIDxjb2RlPnJlcXVlc3RlZENvbnRlbnRQYXJlbnQ8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgb2YgdGhlIDxjb2RlPmNvbnRleHQ8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyIGlzIGEgPGNvZGU+TG9hZGVyPC9jb2RlPi5cclxuXHQgKiBAdGhyb3dzIElsbGVnYWxPcGVyYXRpb25FcnJvciBJZiB0aGUgPGNvZGU+TG9hZGVyQ29udGV4dC5wYXJhbWV0ZXJzPC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlciBpcyBzZXQgdG8gbm9uLW51bGwgYW5kIGhhcyBzb21lXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIHdoaWNoIGFyZSBub3QgU3RyaW5ncy5cclxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgICAgICAgICBJZiB0aGUgcHJvdmlkZWRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5hcHBsaWNhdGlvbkRvbWFpbjwvY29kZT4gcHJvcGVydHkgb2ZcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgPGNvZGU+Y29udGV4dDwvY29kZT4gcHJvcGVydHkgaXMgZnJvbSBhXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWxsb3dlZCBkb21haW4uXHJcblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yICAgICAgICAgWW91IGNhbm5vdCBjb25uZWN0IHRvIGNvbW1vbmx5IHJlc2VydmVkXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9ydHMuIEZvciBhIGNvbXBsZXRlIGxpc3Qgb2YgYmxvY2tlZCBwb3J0cyxcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWUgXCJSZXN0cmljdGluZyBOZXR3b3JraW5nIEFQSXNcIiBpbiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT5BY3Rpb25TY3JpcHQgMy4wIERldmVsb3BlcidzIEd1aWRlPC9pPi5cclxuXHQgKiBAZXZlbnQgYXN5bmNFcnJvciAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgaWYgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+TG9hZGVyQ29udGV4dC5yZXF1ZXN0ZWRDb250ZW50UGFyZW50PC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5IGhhcyBiZWVuIHNwZWNpZmllZCBhbmQgaXQgaXMgbm90IHBvc3NpYmxlIHRvXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgYWRkIHRoZSBsb2FkZWQgY29udGVudCBhcyBhIGNoaWxkIHRvIHRoZSBzcGVjaWZpZWRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLiBUaGlzIGNvdWxkIGhhcHBlbiBpZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBsb2FkZWQgY29udGVudCBpcyBhXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Zmxhc2guZGlzcGxheS5BVk0xTW92aWU8L2NvZGU+IG9yIGlmIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+IGNhbGwgdG8gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdGVkQ29udGVudFBhcmVudCB0aHJvd3MgYW4gZXJyb3IuXHJcblx0ICogQGV2ZW50IGNvbXBsZXRlICAgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IHdoZW4gdGhlIG9wZXJhdGlvbiBpcyBjb21wbGV0ZS4gVGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Y29tcGxldGU8L2NvZGU+IGV2ZW50IGlzIGFsd2F5cyBkaXNwYXRjaGVkXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgdGhlIDxjb2RlPmluaXQ8L2NvZGU+IGV2ZW50LlxyXG5cdCAqIEBldmVudCBpbml0ICAgICAgICAgIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB3aGVuIHRoZSBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIG9mIHRoZSBsb2FkZWRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBkYXRhIGFyZSBhY2Nlc3NpYmxlLiBUaGUgPGNvZGU+aW5pdDwvY29kZT4gZXZlbnRcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBhbHdheXMgcHJlY2VkZXMgdGhlIDxjb2RlPmNvbXBsZXRlPC9jb2RlPiBldmVudC5cclxuXHQgKiBAZXZlbnQgaW9FcnJvciAgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3Qgd2hlbiB0aGUgcnVudGltZSBjYW5ub3QgcGFyc2UgdGhlIGRhdGEgaW4gdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgYnl0ZSBhcnJheS5cclxuXHQgKiBAZXZlbnQgb3BlbiAgICAgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3Qgd2hlbiB0aGUgb3BlcmF0aW9uIHN0YXJ0cy5cclxuXHQgKiBAZXZlbnQgcHJvZ3Jlc3MgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgYXMgZGF0YSBpcyB0cmFuc2ZlcmVkIGluIG1lbW9yeS5cclxuXHQgKiBAZXZlbnQgc2VjdXJpdHlFcnJvciBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgaWYgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+TG9hZGVyQ29udGV4dC5yZXF1ZXN0ZWRDb250ZW50UGFyZW50PC9jb2RlPlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5IGhhcyBiZWVuIHNwZWNpZmllZCBhbmQgdGhlIHNlY3VyaXR5IHNhbmRib3hcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvZiB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5Mb2FkZXJDb250ZXh0LnJlcXVlc3RlZENvbnRlbnRQYXJlbnQ8L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgZG9lcyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhlIGxvYWRlZCBTV0YuXHJcblx0ICogQGV2ZW50IHVubG9hZCAgICAgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IHdoZW4gYSBsb2FkZWQgb2JqZWN0IGlzIHJlbW92ZWQuXHJcblx0ICovXHJcblx0cHVibGljIGxvYWREYXRhKGRhdGE6YW55LCBjb250ZXh0OkFzc2V0TG9hZGVyQ29udGV4dCA9IG51bGwsIG5zOnN0cmluZyA9IG51bGwsIHBhcnNlcjpQYXJzZXJCYXNlID0gbnVsbCk6QXNzZXRMb2FkZXJUb2tlblxyXG5cdHtcclxuXHRcdHZhciB0b2tlbjpBc3NldExvYWRlclRva2VuO1xyXG5cclxuXHRcdGlmICh0aGlzLl91c2VBc3NldExpYikge1xyXG5cdFx0XHR2YXIgbGliOkFzc2V0TGlicmFyeUJ1bmRsZTtcclxuXHRcdFx0bGliID0gQXNzZXRMaWJyYXJ5QnVuZGxlLmdldEluc3RhbmNlKHRoaXMuX2Fzc2V0TGliSWQpO1xyXG5cdFx0XHR0b2tlbiA9IGxpYi5sb2FkRGF0YShkYXRhLCBjb250ZXh0LCBucywgcGFyc2VyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBsb2FkZXI6QXNzZXRMb2FkZXIgPSBuZXcgQXNzZXRMb2FkZXIoKTtcclxuXHRcdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zLnB1c2gobG9hZGVyKTtcclxuXHRcdFx0dG9rZW4gPSBsb2FkZXIubG9hZERhdGEoZGF0YSwgJycsIGNvbnRleHQsIG5zLCBwYXJzZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRva2VuLmFkZEV2ZW50TGlzdGVuZXIoTG9hZGVyRXZlbnQuUkVTT1VSQ0VfQ09NUExFVEUsIHRoaXMuX29uUmVzb3VyY2VDb21wbGV0ZURlbGVnYXRlKTtcclxuXHRcdHRva2VuLmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSwgdGhpcy5fb25Bc3NldENvbXBsZXRlRGVsZWdhdGUpO1xyXG5cclxuXHRcdC8vIEVycm9yIGFyZSBoYW5kbGVkIHNlcGFyYXRlbHkgKHNlZSBkb2N1bWVudGF0aW9uIGZvciBhZGRFcnJvckhhbmRsZXIpXHJcblx0XHR0b2tlbi5faUxvYWRlci5faUFkZEVycm9ySGFuZGxlcih0aGlzLm9uTG9hZEVycm9yKTtcclxuXHRcdHRva2VuLl9pTG9hZGVyLl9pQWRkUGFyc2VFcnJvckhhbmRsZXIodGhpcy5vblBhcnNlRXJyb3IpO1xyXG5cclxuXHRcdHJldHVybiB0b2tlbjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYSBjaGlsZCBvZiB0aGlzIExvYWRlciBvYmplY3QgdGhhdCB3YXMgbG9hZGVkIGJ5IHVzaW5nIHRoZVxyXG5cdCAqIDxjb2RlPmxvYWQoKTwvY29kZT4gbWV0aG9kLiBUaGUgPGNvZGU+cHJvcGVydHk8L2NvZGU+IG9mIHRoZSBhc3NvY2lhdGVkXHJcblx0ICogTG9hZGVySW5mbyBvYmplY3QgaXMgcmVzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4uIFRoZSBjaGlsZCBpcyBub3RcclxuXHQgKiBuZWNlc3NhcmlseSBkZXN0cm95ZWQgYmVjYXVzZSBvdGhlciBvYmplY3RzIG1pZ2h0IGhhdmUgcmVmZXJlbmNlcyB0byBpdDtcclxuXHQgKiBob3dldmVyLCBpdCBpcyBubyBsb25nZXIgYSBjaGlsZCBvZiB0aGUgTG9hZGVyIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIDxwPkFzIGEgYmVzdCBwcmFjdGljZSwgYmVmb3JlIHlvdSB1bmxvYWQgYSBjaGlsZCBTV0YgZmlsZSwgeW91IHNob3VsZFxyXG5cdCAqIGV4cGxpY2l0bHkgY2xvc2UgYW55IHN0cmVhbXMgaW4gdGhlIGNoaWxkIFNXRiBmaWxlJ3Mgb2JqZWN0cywgc3VjaCBhc1xyXG5cdCAqIExvY2FsQ29ubmVjdGlvbiwgTmV0Q29ubmVjdGlvbiwgTmV0U3RyZWFtLCBhbmQgU291bmQgb2JqZWN0cy4gT3RoZXJ3aXNlLFxyXG5cdCAqIGF1ZGlvIGluIHRoZSBjaGlsZCBTV0YgZmlsZSBtaWdodCBjb250aW51ZSB0byBwbGF5LCBldmVuIHRob3VnaCB0aGUgY2hpbGRcclxuXHQgKiBTV0YgZmlsZSB3YXMgdW5sb2FkZWQuIFRvIGNsb3NlIHN0cmVhbXMgaW4gdGhlIGNoaWxkIFNXRiBmaWxlLCBhZGQgYW5cclxuXHQgKiBldmVudCBsaXN0ZW5lciB0byB0aGUgY2hpbGQgdGhhdCBsaXN0ZW5zIGZvciB0aGUgPGNvZGU+dW5sb2FkPC9jb2RlPlxyXG5cdCAqIGV2ZW50LiBXaGVuIHRoZSBwYXJlbnQgY2FsbHMgPGNvZGU+TG9hZGVyLnVubG9hZCgpPC9jb2RlPiwgdGhlXHJcblx0ICogPGNvZGU+dW5sb2FkPC9jb2RlPiBldmVudCBpcyBkaXNwYXRjaGVkIHRvIHRoZSBjaGlsZC4gVGhlIGZvbGxvd2luZyBjb2RlXHJcblx0ICogc2hvd3MgaG93IHlvdSBtaWdodCBkbyB0aGlzOjwvcD5cclxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+IHB1YmxpYyBjbG9zZUFsbFN0cmVhbXMoZXZ0OkV2ZW50KSB7XHJcblx0ICogbXlOZXRTdHJlYW0uY2xvc2UoKTsgbXlTb3VuZC5jbG9zZSgpOyBteU5ldENvbm5lY3Rpb24uY2xvc2UoKTtcclxuXHQgKiBteUxvY2FsQ29ubmVjdGlvbi5jbG9zZSgpOyB9XHJcblx0ICogbXlNb3ZpZUNsaXAubG9hZGVySW5mby5hZGRFdmVudExpc3RlbmVyKEV2ZW50LlVOTE9BRCxcclxuXHQgKiBjbG9zZUFsbFN0cmVhbXMpOzwvcHJlPlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIHVubG9hZCgpXHJcblx0e1xyXG5cdFx0Ly9UT0RPXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFbmFibGVzIGEgc3BlY2lmaWMgcGFyc2VyLlxyXG5cdCAqIFdoZW4gbm8gc3BlY2lmaWMgcGFyc2VyIGlzIHNldCBmb3IgYSBsb2FkaW5nL3BhcnNpbmcgb3BwZXJhdGlvbixcclxuXHQgKiBsb2FkZXIzZCBjYW4gYXV0b3NlbGVjdCB0aGUgY29ycmVjdCBwYXJzZXIgdG8gdXNlLlxyXG5cdCAqIEEgcGFyc2VyIG11c3QgaGF2ZSBiZWVuIGVuYWJsZWQsIHRvIGJlIGNvbnNpZGVyZWQgd2hlbiBhdXRvc2VsZWN0aW5nIHRoZSBwYXJzZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcGFyc2VyQ2xhc3MgVGhlIHBhcnNlciBjbGFzcyB0byBlbmFibGUuXHJcblx0ICogQHNlZSBhd2F5LnBhcnNlcnMuUGFyc2Vyc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgZW5hYmxlUGFyc2VyKHBhcnNlckNsYXNzOk9iamVjdClcclxuXHR7XHJcblx0XHRBc3NldExvYWRlci5lbmFibGVQYXJzZXIocGFyc2VyQ2xhc3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRW5hYmxlcyBhIGxpc3Qgb2YgcGFyc2Vycy5cclxuXHQgKiBXaGVuIG5vIHNwZWNpZmljIHBhcnNlciBpcyBzZXQgZm9yIGEgbG9hZGluZy9wYXJzaW5nIG9wcGVyYXRpb24sXHJcblx0ICogbG9hZGVyM2QgY2FuIGF1dG9zZWxlY3QgdGhlIGNvcnJlY3QgcGFyc2VyIHRvIHVzZS5cclxuXHQgKiBBIHBhcnNlciBtdXN0IGhhdmUgYmVlbiBlbmFibGVkLCB0byBiZSBjb25zaWRlcmVkIHdoZW4gYXV0b3NlbGVjdGluZyB0aGUgcGFyc2VyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBhcnNlckNsYXNzZXMgQSBWZWN0b3Igb2YgcGFyc2VyIGNsYXNzZXMgdG8gZW5hYmxlLlxyXG5cdCAqIEBzZWUgYXdheS5wYXJzZXJzLlBhcnNlcnNcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIGVuYWJsZVBhcnNlcnMocGFyc2VyQ2xhc3NlczpBcnJheTxPYmplY3Q+KVxyXG5cdHtcclxuXHRcdEFzc2V0TG9hZGVyLmVuYWJsZVBhcnNlcnMocGFyc2VyQ2xhc3Nlcyk7XHJcblx0fVxyXG5cclxuXHJcblx0cHJpdmF0ZSByZW1vdmVMaXN0ZW5lcnMoZGlzcGF0Y2hlcjpFdmVudERpc3BhdGNoZXIpXHJcblx0e1xyXG5cdFx0ZGlzcGF0Y2hlci5yZW1vdmVFdmVudExpc3RlbmVyKExvYWRlckV2ZW50LlJFU09VUkNFX0NPTVBMRVRFLCB0aGlzLl9vblJlc291cmNlQ29tcGxldGVEZWxlZ2F0ZSk7XHJcblx0XHRkaXNwYXRjaGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSwgdGhpcy5fb25Bc3NldENvbXBsZXRlRGVsZWdhdGUpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbkFzc2V0Q29tcGxldGUoZXZlbnQ6QXNzZXRFdmVudClcclxuXHR7XHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIHdoZW4gYW4gZXJyb3Igb2NjdXJzIGR1cmluZyBsb2FkaW5nXHJcblx0ICovXHJcblx0cHJpdmF0ZSBvbkxvYWRFcnJvcihldmVudDpMb2FkZXJFdmVudCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdGlmICh0aGlzLmhhc0V2ZW50TGlzdGVuZXIoSU9FcnJvckV2ZW50LklPX0VSUk9SKSkge1xyXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGxlZCB3aGVuIGEgYW4gZXJyb3Igb2NjdXJzIGR1cmluZyBwYXJzaW5nXHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblBhcnNlRXJyb3IoZXZlbnQ6UGFyc2VyRXZlbnQpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKFBhcnNlckV2ZW50LlBBUlNFX0VSUk9SKSkge1xyXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGxlZCB3aGVuIHRoZSByZXNvdXJjZSBhbmQgYWxsIG9mIGl0cyBkZXBlbmRlbmNpZXMgd2FzIHJldHJpZXZlZC5cclxuXHQgKi9cclxuXHRwcml2YXRlIG9uUmVzb3VyY2VDb21wbGV0ZShldmVudDpMb2FkZXJFdmVudClcclxuXHR7XHJcblx0XHR0aGlzLl9jb250ZW50ID0gPERpc3BsYXlPYmplY3Q+IGV2ZW50LmNvbnRlbnQ7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2NvbnRlbnQpXHJcblx0XHRcdHRoaXMuYWRkQ2hpbGQodGhpcy5fY29udGVudCk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IExvYWRlcjsiXX0=