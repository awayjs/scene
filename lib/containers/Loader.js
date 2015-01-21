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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL0xvYWRlci50cyJdLCJuYW1lcyI6WyJMb2FkZXIiLCJMb2FkZXIuY29uc3RydWN0b3IiLCJMb2FkZXIuY29udGVudCIsIkxvYWRlci5jb250ZW50TG9hZGVySW5mbyIsIkxvYWRlci5jbG9zZSIsIkxvYWRlci5sb2FkIiwiTG9hZGVyLmxvYWREYXRhIiwiTG9hZGVyLnVubG9hZCIsIkxvYWRlci5lbmFibGVQYXJzZXIiLCJMb2FkZXIuZW5hYmxlUGFyc2VycyIsIkxvYWRlci5yZW1vdmVMaXN0ZW5lcnMiLCJMb2FkZXIub25Bc3NldENvbXBsZXRlIiwiTG9hZGVyLm9uTG9hZEVycm9yIiwiTG9hZGVyLm9uUGFyc2VFcnJvciIsIkxvYWRlci5vblJlc291cmNlQ29tcGxldGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sa0JBQWtCLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUNwRixJQUFPLFdBQVcsV0FBZSxxQ0FBcUMsQ0FBQyxDQUFDO0FBSXhFLElBQU8sVUFBVSxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFFckUsSUFBTyxZQUFZLFdBQWUscUNBQXFDLENBQUMsQ0FBQztBQUN6RSxJQUFPLFdBQVcsV0FBZSxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3ZFLElBQU8sV0FBVyxXQUFlLG9DQUFvQyxDQUFDLENBQUM7QUFHdkUsSUFBTyxzQkFBc0IsV0FBWSxzREFBc0QsQ0FBQyxDQUFDO0FBSWpHLEFBK0RBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csTUFBTTtJQUFTQSxVQUFmQSxNQUFNQSxVQUErQkE7SUFzRTFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0ErQ0dBO0lBQ0hBLFNBdEhLQSxNQUFNQSxDQXNIQ0EsZUFBOEJBLEVBQUVBLGNBQTRCQTtRQXRIekVDLGlCQWlq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QUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUU5QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7SUFDM0JBLENBQUNBO0lBQ0ZkLGFBQUNBO0FBQURBLENBampCQSxBQWlqQkNBLEVBampCb0Isc0JBQXNCLEVBaWpCMUM7QUFFRCxBQUFnQixpQkFBUCxNQUFNLENBQUMiLCJmaWxlIjoiY29udGFpbmVycy9Mb2FkZXIuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFzc2V0TGlicmFyeUJ1bmRsZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0TGlicmFyeUJ1bmRsZVwiKTtcbmltcG9ydCBBc3NldExvYWRlclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldExvYWRlclwiKTtcbmltcG9ydCBBc3NldExvYWRlckNvbnRleHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldExvYWRlckNvbnRleHRcIik7XG5pbXBvcnQgQXNzZXRMb2FkZXJUb2tlblx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRMb2FkZXJUb2tlblwiKTtcbmltcG9ydCBVUkxSZXF1ZXN0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMUmVxdWVzdFwiKTtcbmltcG9ydCBBc3NldEV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvQXNzZXRFdmVudFwiKTtcbmltcG9ydCBFdmVudERpc3BhdGNoZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnREaXNwYXRjaGVyXCIpO1xuaW1wb3J0IElPRXJyb3JFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0lPRXJyb3JFdmVudFwiKTtcbmltcG9ydCBMb2FkZXJFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0xvYWRlckV2ZW50XCIpO1xuaW1wb3J0IFBhcnNlckV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvUGFyc2VyRXZlbnRcIik7XG5pbXBvcnQgUGFyc2VyQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcGFyc2Vycy9QYXJzZXJCYXNlXCIpO1xuXG5pbXBvcnQgRGlzcGxheU9iamVjdENvbnRhaW5lclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgTG9hZGVySW5mb1x0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9Mb2FkZXJJbmZvXCIpO1xuXG4vKipcbiAqIFRoZSBMb2FkZXIgY2xhc3MgaXMgdXNlZCB0byBsb2FkIFNXRiBmaWxlcyBvciBpbWFnZShKUEcsIFBORywgb3IgR0lGKVxuICogZmlsZXMuIFVzZSB0aGUgPGNvZGU+bG9hZCgpPC9jb2RlPiBtZXRob2QgdG8gaW5pdGlhdGUgbG9hZGluZy4gVGhlIGxvYWRlZFxuICogZGlzcGxheSBvYmplY3QgaXMgYWRkZWQgYXMgYSBjaGlsZCBvZiB0aGUgTG9hZGVyIG9iamVjdC5cbiAqXG4gKiA8cD5Vc2UgdGhlIFVSTExvYWRlciBjbGFzcyB0byBsb2FkIHRleHQgb3IgYmluYXJ5IGRhdGEuPC9wPlxuICpcbiAqIDxwPlRoZSBMb2FkZXIgY2xhc3Mgb3ZlcnJpZGVzIHRoZSBmb2xsb3dpbmcgbWV0aG9kcyB0aGF0IGl0IGluaGVyaXRzLFxuICogYmVjYXVzZSBhIExvYWRlciBvYmplY3QgY2FuIG9ubHkgaGF2ZSBvbmUgY2hpbGQgZGlzcGxheSBvYmplY3QgLSB0aGVcbiAqIGRpc3BsYXkgb2JqZWN0IHRoYXQgaXQgbG9hZHMuIENhbGxpbmcgdGhlIGZvbGxvd2luZyBtZXRob2RzIHRocm93cyBhblxuICogZXhjZXB0aW9uOiA8Y29kZT5hZGRDaGlsZCgpPC9jb2RlPiwgPGNvZGU+YWRkQ2hpbGRBdCgpPC9jb2RlPixcbiAqIDxjb2RlPnJlbW92ZUNoaWxkKCk8L2NvZGU+LCA8Y29kZT5yZW1vdmVDaGlsZEF0KCk8L2NvZGU+LCBhbmRcbiAqIDxjb2RlPnNldENoaWxkSW5kZXgoKTwvY29kZT4uIFRvIHJlbW92ZSBhIGxvYWRlZCBkaXNwbGF5IG9iamVjdCwgeW91IG11c3RcbiAqIHJlbW92ZSB0aGUgPGk+TG9hZGVyPC9pPiBvYmplY3QgZnJvbSBpdHMgcGFyZW50IERpc3BsYXlPYmplY3RDb250YWluZXJcbiAqIGNoaWxkIGFycmF5LiA8L3A+XG4gKlxuICogPHA+PGI+Tm90ZTo8L2I+IFRoZSBBY3Rpb25TY3JpcHQgMi4wIE1vdmllQ2xpcExvYWRlciBhbmQgTG9hZFZhcnMgY2xhc3Nlc1xuICogYXJlIG5vdCB1c2VkIGluIEFjdGlvblNjcmlwdCAzLjAuIFRoZSBMb2FkZXIgYW5kIFVSTExvYWRlciBjbGFzc2VzIHJlcGxhY2VcbiAqIHRoZW0uPC9wPlxuICpcbiAqIDxwPldoZW4geW91IHVzZSB0aGUgTG9hZGVyIGNsYXNzLCBjb25zaWRlciB0aGUgRmxhc2ggUGxheWVyIGFuZCBBZG9iZSBBSVJcbiAqIHNlY3VyaXR5IG1vZGVsOiA8L3A+XG4gKlxuICogPHVsPlxuICogICA8bGk+WW91IGNhbiBsb2FkIGNvbnRlbnQgZnJvbSBhbnkgYWNjZXNzaWJsZSBzb3VyY2UuIDwvbGk+XG4gKiAgIDxsaT5Mb2FkaW5nIGlzIG5vdCBhbGxvd2VkIGlmIHRoZSBjYWxsaW5nIFNXRiBmaWxlIGlzIGluIGEgbmV0d29ya1xuICogc2FuZGJveCBhbmQgdGhlIGZpbGUgdG8gYmUgbG9hZGVkIGlzIGxvY2FsLiA8L2xpPlxuICogICA8bGk+SWYgdGhlIGxvYWRlZCBjb250ZW50IGlzIGEgU1dGIGZpbGUgd3JpdHRlbiB3aXRoIEFjdGlvblNjcmlwdCAzLjAsIGl0XG4gKiBjYW5ub3QgYmUgY3Jvc3Mtc2NyaXB0ZWQgYnkgYSBTV0YgZmlsZSBpbiBhbm90aGVyIHNlY3VyaXR5IHNhbmRib3ggdW5sZXNzXG4gKiB0aGF0IGNyb3NzLXNjcmlwdGluZyBhcnJhbmdlbWVudCB3YXMgYXBwcm92ZWQgdGhyb3VnaCBhIGNhbGwgdG8gdGhlXG4gKiA8Y29kZT5TeXN0ZW0uYWxsb3dEb21haW4oKTwvY29kZT4gb3IgdGhlXG4gKiA8Y29kZT5TeXN0ZW0uYWxsb3dJbnNlY3VyZURvbWFpbigpPC9jb2RlPiBtZXRob2QgaW4gdGhlIGxvYWRlZCBjb250ZW50XG4gKiBmaWxlLjwvbGk+XG4gKiAgIDxsaT5JZiB0aGUgbG9hZGVkIGNvbnRlbnQgaXMgYW4gQVZNMSBTV0YgZmlsZSh3cml0dGVuIHVzaW5nIEFjdGlvblNjcmlwdFxuICogMS4wIG9yIDIuMCksIGl0IGNhbm5vdCBiZSBjcm9zcy1zY3JpcHRlZCBieSBhbiBBVk0yIFNXRiBmaWxlKHdyaXR0ZW4gdXNpbmdcbiAqIEFjdGlvblNjcmlwdCAzLjApLiBIb3dldmVyLCB5b3UgY2FuIGNvbW11bmljYXRlIGJldHdlZW4gdGhlIHR3byBTV0YgZmlsZXNcbiAqIGJ5IHVzaW5nIHRoZSBMb2NhbENvbm5lY3Rpb24gY2xhc3MuPC9saT5cbiAqICAgPGxpPklmIHRoZSBsb2FkZWQgY29udGVudCBpcyBhbiBpbWFnZSwgaXRzIGRhdGEgY2Fubm90IGJlIGFjY2Vzc2VkIGJ5IGFcbiAqIFNXRiBmaWxlIG91dHNpZGUgb2YgdGhlIHNlY3VyaXR5IHNhbmRib3gsIHVubGVzcyB0aGUgZG9tYWluIG9mIHRoYXQgU1dGXG4gKiBmaWxlIHdhcyBpbmNsdWRlZCBpbiBhIFVSTCBwb2xpY3kgZmlsZSBhdCB0aGUgb3JpZ2luIGRvbWFpbiBvZiB0aGVcbiAqIGltYWdlLjwvbGk+XG4gKiAgIDxsaT5Nb3ZpZSBjbGlwcyBpbiB0aGUgbG9jYWwtd2l0aC1maWxlLXN5c3RlbSBzYW5kYm94IGNhbm5vdCBzY3JpcHQgbW92aWVcbiAqIGNsaXBzIGluIHRoZSBsb2NhbC13aXRoLW5ldHdvcmtpbmcgc2FuZGJveCwgYW5kIHRoZSByZXZlcnNlIGlzIGFsc29cbiAqIHByZXZlbnRlZC4gPC9saT5cbiAqICAgPGxpPllvdSBjYW5ub3QgY29ubmVjdCB0byBjb21tb25seSByZXNlcnZlZCBwb3J0cy4gRm9yIGEgY29tcGxldGUgbGlzdCBvZlxuICogYmxvY2tlZCBwb3J0cywgc2VlIFwiUmVzdHJpY3RpbmcgTmV0d29ya2luZyBBUElzXCIgaW4gdGhlIDxpPkFjdGlvblNjcmlwdCAzLjBcbiAqIERldmVsb3BlcidzIEd1aWRlPC9pPi4gPC9saT5cbiAqIDwvdWw+XG4gKlxuICogPHA+SG93ZXZlciwgaW4gQUlSLCBjb250ZW50IGluIHRoZSA8Y29kZT5hcHBsaWNhdGlvbjwvY29kZT4gc2VjdXJpdHlcbiAqIHNhbmRib3goY29udGVudCBpbnN0YWxsZWQgd2l0aCB0aGUgQUlSIGFwcGxpY2F0aW9uKSBhcmUgbm90IHJlc3RyaWN0ZWQgYnlcbiAqIHRoZXNlIHNlY3VyaXR5IGxpbWl0YXRpb25zLjwvcD5cbiAqXG4gKiA8cD5Gb3IgbW9yZSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHNlY3VyaXR5LCBzZWUgdGhlIEZsYXNoIFBsYXllciBEZXZlbG9wZXJcbiAqIENlbnRlciBUb3BpYzogPGEgaHJlZj1cImh0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2Rldm5ldF9zZWN1cml0eV9lblwiXG4gKiBzY29wZT1cImV4dGVybmFsXCI+U2VjdXJpdHk8L2E+LjwvcD5cbiAqXG4gKiA8cD5XaGVuIGxvYWRpbmcgYSBTV0YgZmlsZSBmcm9tIGFuIHVudHJ1c3RlZCBzb3VyY2Uoc3VjaCBhcyBhIGRvbWFpbiBvdGhlclxuICogdGhhbiB0aGF0IG9mIHRoZSBMb2FkZXIgb2JqZWN0J3Mgcm9vdCBTV0YgZmlsZSksIHlvdSBtYXkgd2FudCB0byBkZWZpbmUgYVxuICogbWFzayBmb3IgdGhlIExvYWRlciBvYmplY3QsIHRvIHByZXZlbnQgdGhlIGxvYWRlZCBjb250ZW50KHdoaWNoIGlzIGEgY2hpbGRcbiAqIG9mIHRoZSBMb2FkZXIgb2JqZWN0KSBmcm9tIGRyYXdpbmcgdG8gcG9ydGlvbnMgb2YgdGhlIFN0YWdlIG91dHNpZGUgb2YgdGhhdFxuICogbWFzaywgYXMgc2hvd24gaW4gdGhlIGZvbGxvd2luZyBjb2RlOjwvcD5cbiAqL1xuY2xhc3MgTG9hZGVyIGV4dGVuZHMgRGlzcGxheU9iamVjdENvbnRhaW5lclxue1xuXHQvKipcblx0ICogRGlzcGF0Y2hlZCB3aGVuIGFueSBhc3NldCBmaW5pc2hlcyBwYXJzaW5nLiBBbHNvIHNlZSBzcGVjaWZpYyBldmVudHMgZm9yIGVhY2hcblx0ICogaW5kaXZpZHVhbCBhc3NldCB0eXBlIChtZXNoZXMsIG1hdGVyaWFscyBldCBjLilcblx0ICpcblx0ICogQGV2ZW50VHlwZSBBc3NldEV2ZW50XG5cdCAqL1xuXHQvL1tFdmVudChuYW1lPVwiYXNzZXRDb21wbGV0ZVwiLCB0eXBlPVwiQXNzZXRFdmVudFwiKV1cblxuXG5cdC8qKlxuXHQgKiBEaXNwYXRjaGVkIHdoZW4gYSBmdWxsIHJlc291cmNlIChpbmNsdWRpbmcgZGVwZW5kZW5jaWVzKSBmaW5pc2hlcyBsb2FkaW5nLlxuXHQgKlxuXHQgKiBAZXZlbnRUeXBlIExvYWRlckV2ZW50XG5cdCAqL1xuXHQvL1tFdmVudChuYW1lPVwicmVzb3VyY2VDb21wbGV0ZVwiLCB0eXBlPVwiTG9hZGVyRXZlbnRcIildXG5cblx0cHJpdmF0ZSBfbG9hZGluZ1Nlc3Npb25zOkFycmF5PEFzc2V0TG9hZGVyPjtcblx0cHJpdmF0ZSBfdXNlQXNzZXRMaWI6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfYXNzZXRMaWJJZDpzdHJpbmc7XG5cdHByaXZhdGUgX29uUmVzb3VyY2VDb21wbGV0ZURlbGVnYXRlOkZ1bmN0aW9uO1xuXHRwcml2YXRlIF9vbkFzc2V0Q29tcGxldGVEZWxlZ2F0ZTpGdW5jdGlvbjtcblxuXHRwcml2YXRlIF9jb250ZW50OkRpc3BsYXlPYmplY3Q7XG5cdHByaXZhdGUgX2NvbnRlbnRMb2FkZXJJbmZvOkxvYWRlckluZm87XG5cblx0LyoqXG5cdCAqIENvbnRhaW5zIHRoZSByb290IGRpc3BsYXkgb2JqZWN0IG9mIHRoZSBTV0YgZmlsZSBvciBpbWFnZShKUEcsIFBORywgb3Jcblx0ICogR0lGKSBmaWxlIHRoYXQgd2FzIGxvYWRlZCBieSB1c2luZyB0aGUgPGNvZGU+bG9hZCgpPC9jb2RlPiBvclxuXHQgKiA8Y29kZT5sb2FkQnl0ZXMoKTwvY29kZT4gbWV0aG9kcy5cblx0ICpcblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yIFRoZSBsb2FkZWQgU1dGIGZpbGUgb3IgaW1hZ2UgZmlsZSBiZWxvbmdzIHRvIGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHNlY3VyaXR5IHNhbmRib3ggdG8gd2hpY2ggeW91IGRvIG5vdCBoYXZlIGFjY2Vzcy5cblx0ICogICAgICAgICAgICAgICAgICAgICAgIEZvciBhIGxvYWRlZCBTV0YgZmlsZSwgeW91IGNhbiBhdm9pZCB0aGlzIHNpdHVhdGlvblxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYnkgaGF2aW5nIHRoZSBmaWxlIGNhbGwgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TZWN1cml0eS5hbGxvd0RvbWFpbigpPC9jb2RlPiBtZXRob2Qgb3IgYnlcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGhhdmluZyB0aGUgbG9hZGluZyBmaWxlIHNwZWNpZnkgYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+bG9hZGVyQ29udGV4dDwvY29kZT4gcGFyYW1ldGVyIHdpdGggaXRzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5zZWN1cml0eURvbWFpbjwvY29kZT4gcHJvcGVydHkgc2V0IHRvXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TZWN1cml0eURvbWFpbi5jdXJyZW50RG9tYWluPC9jb2RlPiB3aGVuIHlvdVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgY2FsbCB0aGUgPGNvZGU+bG9hZCgpPC9jb2RlPiBvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+bG9hZEJ5dGVzKCk8L2NvZGU+IG1ldGhvZC5cblx0ICovXG5cdHB1YmxpYyBnZXQgY29udGVudCgpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9jb250ZW50O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBMb2FkZXJJbmZvIG9iamVjdCBjb3JyZXNwb25kaW5nIHRvIHRoZSBvYmplY3QgYmVpbmcgbG9hZGVkLlxuXHQgKiBMb2FkZXJJbmZvIG9iamVjdHMgYXJlIHNoYXJlZCBiZXR3ZWVuIHRoZSBMb2FkZXIgb2JqZWN0IGFuZCB0aGUgbG9hZGVkXG5cdCAqIGNvbnRlbnQgb2JqZWN0LiBUaGUgTG9hZGVySW5mbyBvYmplY3Qgc3VwcGxpZXMgbG9hZGluZyBwcm9ncmVzc1xuXHQgKiBpbmZvcm1hdGlvbiBhbmQgc3RhdGlzdGljcyBhYm91dCB0aGUgbG9hZGVkIGZpbGUuXG5cdCAqXG5cdCAqIDxwPkV2ZW50cyByZWxhdGVkIHRvIHRoZSBsb2FkIGFyZSBkaXNwYXRjaGVkIGJ5IHRoZSBMb2FkZXJJbmZvIG9iamVjdFxuXHQgKiByZWZlcmVuY2VkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgb2YgdGhlIExvYWRlclxuXHQgKiBvYmplY3QuIFRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIGEgdmFsaWRcblx0ICogTG9hZGVySW5mbyBvYmplY3QsIGV2ZW4gYmVmb3JlIHRoZSBjb250ZW50IGlzIGxvYWRlZCwgc28gdGhhdCB5b3UgY2FuIGFkZFxuXHQgKiBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIG9iamVjdCBwcmlvciB0byB0aGUgbG9hZC48L3A+XG5cdCAqXG5cdCAqIDxwPlRvIGRldGVjdCB1bmNhdWdodCBlcnJvcnMgdGhhdCBoYXBwZW4gaW4gYSBsb2FkZWQgU1dGLCB1c2UgdGhlXG5cdCAqIDxjb2RlPkxvYWRlci51bmNhdWdodEVycm9yRXZlbnRzPC9jb2RlPiBwcm9wZXJ0eSwgbm90IHRoZVxuXHQgKiA8Y29kZT5Mb2FkZXIuY29udGVudExvYWRlckluZm8udW5jYXVnaHRFcnJvckV2ZW50czwvY29kZT4gcHJvcGVydHkuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBjb250ZW50TG9hZGVySW5mbygpOkxvYWRlckluZm9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9jb250ZW50TG9hZGVySW5mbztcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgTG9hZGVyIG9iamVjdCB0aGF0IHlvdSBjYW4gdXNlIHRvIGxvYWQgZmlsZXMsIHN1Y2ggYXMgU1dGLCBKUEVHLFxuXHQgKiBHSUYsIG9yIFBORyBmaWxlcy4gQ2FsbCB0aGUgPGNvZGU+bG9hZCgpPC9jb2RlPiBtZXRob2QgdG8gbG9hZCB0aGUgYXNzZXRcblx0ICogYXMgYSBjaGlsZCBvZiB0aGUgTG9hZGVyIGluc3RhbmNlLiBZb3UgY2FuIHRoZW4gYWRkIHRoZSBMb2FkZXIgb2JqZWN0IHRvXG5cdCAqIHRoZSBkaXNwbGF5IGxpc3QoZm9yIGluc3RhbmNlLCBieSB1c2luZyB0aGUgPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT5cblx0ICogbWV0aG9kIG9mIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZSkuIFRoZSBhc3NldCBhcHBlYXJzIG9uIHRoZVxuXHQgKiBTdGFnZSBhcyBpdCBsb2Fkcy5cblx0ICpcblx0ICogPHA+WW91IGNhbiBhbHNvIHVzZSBhIExvYWRlciBpbnN0YW5jZSBcIm9mZmxpc3QsXCIgdGhhdCBpcyB3aXRob3V0IGFkZGluZyBpdFxuXHQgKiB0byBhIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBvbiB0aGUgZGlzcGxheSBsaXN0LiBJbiB0aGlzIG1vZGUsIHRoZVxuXHQgKiBMb2FkZXIgaW5zdGFuY2UgbWlnaHQgYmUgdXNlZCB0byBsb2FkIGEgU1dGIGZpbGUgdGhhdCBjb250YWlucyBhZGRpdGlvbmFsXG5cdCAqIG1vZHVsZXMgb2YgYW4gYXBwbGljYXRpb24uIDwvcD5cblx0ICpcblx0ICogPHA+VG8gZGV0ZWN0IHdoZW4gdGhlIFNXRiBmaWxlIGlzIGZpbmlzaGVkIGxvYWRpbmcsIHlvdSBjYW4gdXNlIHRoZSBldmVudHNcblx0ICogb2YgdGhlIExvYWRlckluZm8gb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGVcblx0ICogPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBMb2FkZXIgb2JqZWN0LiBBdCB0aGF0XG5cdCAqIHBvaW50LCB0aGUgY29kZSBpbiB0aGUgbW9kdWxlIFNXRiBmaWxlIGNhbiBiZSBleGVjdXRlZCB0byBpbml0aWFsaXplIGFuZFxuXHQgKiBzdGFydCB0aGUgbW9kdWxlLiBJbiB0aGUgb2ZmbGlzdCBtb2RlLCBhIExvYWRlciBpbnN0YW5jZSBtaWdodCBhbHNvIGJlXG5cdCAqIHVzZWQgdG8gbG9hZCBhIFNXRiBmaWxlIHRoYXQgY29udGFpbnMgY29tcG9uZW50cyBvciBtZWRpYSBhc3NldHMuIEFnYWluLFxuXHQgKiB5b3UgY2FuIHVzZSB0aGUgTG9hZGVySW5mbyBvYmplY3QgZXZlbnQgbm90aWZpY2F0aW9ucyB0byBkZXRlY3Qgd2hlbiB0aGVcblx0ICogY29tcG9uZW50cyBhcmUgZmluaXNoZWQgbG9hZGluZy4gQXQgdGhhdCBwb2ludCwgdGhlIGFwcGxpY2F0aW9uIGNhbiBzdGFydFxuXHQgKiB1c2luZyB0aGUgY29tcG9uZW50cyBhbmQgbWVkaWEgYXNzZXRzIGluIHRoZSBsaWJyYXJ5IG9mIHRoZSBTV0YgZmlsZSBieVxuXHQgKiBpbnN0YW50aWF0aW5nIHRoZSBBY3Rpb25TY3JpcHQgMy4wIGNsYXNzZXMgdGhhdCByZXByZXNlbnQgdGhvc2UgY29tcG9uZW50c1xuXHQgKiBhbmQgYXNzZXRzLjwvcD5cblx0ICpcblx0ICogPHA+VG8gZGV0ZXJtaW5lIHRoZSBzdGF0dXMgb2YgYSBMb2FkZXIgb2JqZWN0LCBtb25pdG9yIHRoZSBmb2xsb3dpbmdcblx0ICogZXZlbnRzIHRoYXQgdGhlIExvYWRlckluZm8gb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGVcblx0ICogPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBMb2FkZXIgb2JqZWN0OjwvcD5cblx0ICpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT5UaGUgPGNvZGU+b3BlbjwvY29kZT4gZXZlbnQgaXMgZGlzcGF0Y2hlZCB3aGVuIGxvYWRpbmcgYmVnaW5zLjwvbGk+XG5cdCAqICAgPGxpPlRoZSA8Y29kZT5pb0Vycm9yPC9jb2RlPiBvciA8Y29kZT5zZWN1cml0eUVycm9yPC9jb2RlPiBldmVudCBpc1xuXHQgKiBkaXNwYXRjaGVkIGlmIHRoZSBmaWxlIGNhbm5vdCBiZSBsb2FkZWQgb3IgaWYgYW4gZXJyb3Igb2NjdXJlZCBkdXJpbmcgdGhlXG5cdCAqIGxvYWQgcHJvY2Vzcy4gPC9saT5cblx0ICogICA8bGk+VGhlIDxjb2RlPnByb2dyZXNzPC9jb2RlPiBldmVudCBmaXJlcyBjb250aW51b3VzbHkgd2hpbGUgdGhlIGZpbGUgaXNcblx0ICogYmVpbmcgbG9hZGVkLjwvbGk+XG5cdCAqICAgPGxpPlRoZSA8Y29kZT5jb21wbGV0ZTwvY29kZT4gZXZlbnQgaXMgZGlzcGF0Y2hlZCB3aGVuIGEgZmlsZSBjb21wbGV0ZXNcblx0ICogZG93bmxvYWRpbmcsIGJ1dCBiZWZvcmUgdGhlIGxvYWRlZCBtb3ZpZSBjbGlwJ3MgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBhcmVcblx0ICogYXZhaWxhYmxlLiA8L2xpPlxuXHQgKiAgIDxsaT5UaGUgPGNvZGU+aW5pdDwvY29kZT4gZXZlbnQgaXMgZGlzcGF0Y2hlZCBhZnRlciB0aGUgcHJvcGVydGllcyBhbmRcblx0ICogbWV0aG9kcyBvZiB0aGUgbG9hZGVkIFNXRiBmaWxlIGFyZSBhY2Nlc3NpYmxlLCBzbyB5b3UgY2FuIGJlZ2luXG5cdCAqIG1hbmlwdWxhdGluZyB0aGUgbG9hZGVkIFNXRiBmaWxlLiBUaGlzIGV2ZW50IGlzIGRpc3BhdGNoZWQgYmVmb3JlIHRoZVxuXHQgKiA8Y29kZT5jb21wbGV0ZTwvY29kZT4gaGFuZGxlci4gSW4gc3RyZWFtaW5nIFNXRiBmaWxlcywgdGhlXG5cdCAqIDxjb2RlPmluaXQ8L2NvZGU+IGV2ZW50IGNhbiBvY2N1ciBzaWduaWZpY2FudGx5IGVhcmxpZXIgdGhhbiB0aGVcblx0ICogPGNvZGU+Y29tcGxldGU8L2NvZGU+IGV2ZW50LiBGb3IgbW9zdCBwdXJwb3NlcywgdXNlIHRoZSA8Y29kZT5pbml0PC9jb2RlPlxuXHQgKiBoYW5kbGVyLjwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih1c2VBc3NldExpYnJhcnk6Ym9vbGVhbiA9IHRydWUsIGFzc2V0TGlicmFyeUlkOnN0cmluZyA9IG51bGwpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zID0gbmV3IEFycmF5PEFzc2V0TG9hZGVyPigpO1xuXHRcdHRoaXMuX3VzZUFzc2V0TGliID0gdXNlQXNzZXRMaWJyYXJ5O1xuXHRcdHRoaXMuX2Fzc2V0TGliSWQgPSBhc3NldExpYnJhcnlJZDtcblxuXHRcdHRoaXMuX29uUmVzb3VyY2VDb21wbGV0ZURlbGVnYXRlID0gKGV2ZW50OkxvYWRlckV2ZW50KSA9PiB0aGlzLm9uUmVzb3VyY2VDb21wbGV0ZShldmVudCk7XG5cdFx0dGhpcy5fb25Bc3NldENvbXBsZXRlRGVsZWdhdGUgPSAoZXZlbnQ6QXNzZXRFdmVudCkgPT4gdGhpcy5vbkFzc2V0Q29tcGxldGUoZXZlbnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbmNlbHMgYSA8Y29kZT5sb2FkKCk8L2NvZGU+IG1ldGhvZCBvcGVyYXRpb24gdGhhdCBpcyBjdXJyZW50bHkgaW5cblx0ICogcHJvZ3Jlc3MgZm9yIHRoZSBMb2FkZXIgaW5zdGFuY2UuXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgY2xvc2UoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3VzZUFzc2V0TGliKSB7XG5cdFx0XHR2YXIgbGliOkFzc2V0TGlicmFyeUJ1bmRsZTtcblx0XHRcdGxpYiA9IEFzc2V0TGlicmFyeUJ1bmRsZS5nZXRJbnN0YW5jZSh0aGlzLl9hc3NldExpYklkKTtcblx0XHRcdGxpYi5zdG9wQWxsTG9hZGluZ1Nlc3Npb25zKCk7XG5cdFx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMgPSBudWxsO1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXHRcdHZhciBpOm51bWJlciAvKmludCovO1xuXHRcdHZhciBsZW5ndGg6bnVtYmVyIC8qaW50Ki8gPSB0aGlzLl9sb2FkaW5nU2Vzc2lvbnMubGVuZ3RoO1xuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0dGhpcy5yZW1vdmVMaXN0ZW5lcnModGhpcy5fbG9hZGluZ1Nlc3Npb25zW2ldKTtcblx0XHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9uc1tpXS5zdG9wKCk7XG5cdFx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnNbaV0gPSBudWxsO1xuXHRcdH1cblx0XHR0aGlzLl9sb2FkaW5nU2Vzc2lvbnMgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIExvYWRzIGEgU1dGLCBKUEVHLCBwcm9ncmVzc2l2ZSBKUEVHLCB1bmFuaW1hdGVkIEdJRiwgb3IgUE5HIGZpbGUgaW50byBhblxuXHQgKiBvYmplY3QgdGhhdCBpcyBhIGNoaWxkIG9mIHRoaXMgTG9hZGVyIG9iamVjdC4gSWYgeW91IGxvYWQgYW4gYW5pbWF0ZWQgR0lGXG5cdCAqIGZpbGUsIG9ubHkgdGhlIGZpcnN0IGZyYW1lIGlzIGRpc3BsYXllZC4gQXMgdGhlIExvYWRlciBvYmplY3QgY2FuIGNvbnRhaW5cblx0ICogb25seSBhIHNpbmdsZSBjaGlsZCwgaXNzdWluZyBhIHN1YnNlcXVlbnQgPGNvZGU+bG9hZCgpPC9jb2RlPiByZXF1ZXN0XG5cdCAqIHRlcm1pbmF0ZXMgdGhlIHByZXZpb3VzIHJlcXVlc3QsIGlmIHN0aWxsIHBlbmRpbmcsIGFuZCBjb21tZW5jZXMgYSBuZXdcblx0ICogbG9hZC5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTwvYj46IEluIEFJUiAxLjUgYW5kIEZsYXNoIFBsYXllciAxMCwgdGhlIG1heGltdW0gc2l6ZSBmb3IgYVxuXHQgKiBsb2FkZWQgaW1hZ2UgaXMgOCwxOTEgcGl4ZWxzIGluIHdpZHRoIG9yIGhlaWdodCwgYW5kIHRoZSB0b3RhbCBudW1iZXIgb2Zcblx0ICogcGl4ZWxzIGNhbm5vdCBleGNlZWQgMTYsNzc3LDIxNSBwaXhlbHMuKFNvLCBpZiBhbiBsb2FkZWQgaW1hZ2UgaXMgOCwxOTFcblx0ICogcGl4ZWxzIHdpZGUsIGl0IGNhbiBvbmx5IGJlIDIsMDQ4IHBpeGVscyBoaWdoLikgSW4gRmxhc2ggUGxheWVyIDkgYW5kXG5cdCAqIGVhcmxpZXIgYW5kIEFJUiAxLjEgYW5kIGVhcmxpZXIsIHRoZSBsaW1pdGF0aW9uIGlzIDIsODgwIHBpeGVscyBpbiBoZWlnaHRcblx0ICogYW5kIDIsODgwIHBpeGVscyBpbiB3aWR0aC48L3A+XG5cdCAqXG5cdCAqIDxwPkEgU1dGIGZpbGUgb3IgaW1hZ2UgbG9hZGVkIGludG8gYSBMb2FkZXIgb2JqZWN0IGluaGVyaXRzIHRoZSBwb3NpdGlvbixcblx0ICogcm90YXRpb24sIGFuZCBzY2FsZSBwcm9wZXJ0aWVzIG9mIHRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3RzIG9mIHRoZSBMb2FkZXJcblx0ICogb2JqZWN0LiA8L3A+XG5cdCAqXG5cdCAqIDxwPlVzZSB0aGUgPGNvZGU+dW5sb2FkKCk8L2NvZGU+IG1ldGhvZCB0byByZW1vdmUgbW92aWVzIG9yIGltYWdlcyBsb2FkZWRcblx0ICogd2l0aCB0aGlzIG1ldGhvZCwgb3IgdG8gY2FuY2VsIGEgbG9hZCBvcGVyYXRpb24gdGhhdCBpcyBpbiBwcm9ncmVzcy48L3A+XG5cdCAqXG5cdCAqIDxwPllvdSBjYW4gcHJldmVudCBhIFNXRiBmaWxlIGZyb20gdXNpbmcgdGhpcyBtZXRob2QgYnkgc2V0dGluZyB0aGVcblx0ICogPGNvZGU+YWxsb3dOZXR3b3JraW5nPC9jb2RlPiBwYXJhbWV0ZXIgb2YgdGhlIHRoZSA8Y29kZT5vYmplY3Q8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT5lbWJlZDwvY29kZT4gdGFncyBpbiB0aGUgSFRNTCBwYWdlIHRoYXQgY29udGFpbnMgdGhlIFNXRlxuXHQgKiBjb250ZW50LjwvcD5cblx0ICpcblx0ICogPHA+V2hlbiB5b3UgdXNlIHRoaXMgbWV0aG9kLCBjb25zaWRlciB0aGUgRmxhc2ggUGxheWVyIHNlY3VyaXR5IG1vZGVsLFxuXHQgKiB3aGljaCBpcyBkZXNjcmliZWQgaW4gdGhlIExvYWRlciBjbGFzcyBkZXNjcmlwdGlvbi4gPC9wPlxuXHQgKlxuXHQgKiA8cD4gSW4gRmxhc2ggUGxheWVyIDEwIGFuZCBsYXRlciwgaWYgeW91IHVzZSBhIG11bHRpcGFydCBDb250ZW50LVR5cGUoZm9yXG5cdCAqIGV4YW1wbGUgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIpIHRoYXQgY29udGFpbnMgYW4gdXBsb2FkKGluZGljYXRlZCBieSBhXG5cdCAqIFwiZmlsZW5hbWVcIiBwYXJhbWV0ZXIgaW4gYSBcImNvbnRlbnQtZGlzcG9zaXRpb25cIiBoZWFkZXIgd2l0aGluIHRoZSBQT1NUXG5cdCAqIGJvZHkpLCB0aGUgUE9TVCBvcGVyYXRpb24gaXMgc3ViamVjdCB0byB0aGUgc2VjdXJpdHkgcnVsZXMgYXBwbGllZCB0b1xuXHQgKiB1cGxvYWRzOjwvcD5cblx0ICpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT5UaGUgUE9TVCBvcGVyYXRpb24gbXVzdCBiZSBwZXJmb3JtZWQgaW4gcmVzcG9uc2UgdG8gYSB1c2VyLWluaXRpYXRlZFxuXHQgKiBhY3Rpb24sIHN1Y2ggYXMgYSBtb3VzZSBjbGljayBvciBrZXkgcHJlc3MuPC9saT5cblx0ICogICA8bGk+SWYgdGhlIFBPU1Qgb3BlcmF0aW9uIGlzIGNyb3NzLWRvbWFpbih0aGUgUE9TVCB0YXJnZXQgaXMgbm90IG9uIHRoZVxuXHQgKiBzYW1lIHNlcnZlciBhcyB0aGUgU1dGIGZpbGUgdGhhdCBpcyBzZW5kaW5nIHRoZSBQT1NUIHJlcXVlc3QpLCB0aGUgdGFyZ2V0XG5cdCAqIHNlcnZlciBtdXN0IHByb3ZpZGUgYSBVUkwgcG9saWN5IGZpbGUgdGhhdCBwZXJtaXRzIGNyb3NzLWRvbWFpblxuXHQgKiBhY2Nlc3MuPC9saT5cblx0ICogPC91bD5cblx0ICpcblx0ICogPHA+QWxzbywgZm9yIGFueSBtdWx0aXBhcnQgQ29udGVudC1UeXBlLCB0aGUgc3ludGF4IG11c3QgYmUgdmFsaWRcblx0ICogKGFjY29yZGluZyB0byB0aGUgUkZDMjA0NiBzdGFuZGFyZCkuIElmIHRoZSBzeW50YXggYXBwZWFycyB0byBiZSBpbnZhbGlkLFxuXHQgKiB0aGUgUE9TVCBvcGVyYXRpb24gaXMgc3ViamVjdCB0byB0aGUgc2VjdXJpdHkgcnVsZXMgYXBwbGllZCB0b1xuXHQgKiB1cGxvYWRzLjwvcD5cblx0ICpcblx0ICogPHA+Rm9yIG1vcmUgaW5mb3JtYXRpb24gcmVsYXRlZCB0byBzZWN1cml0eSwgc2VlIHRoZSBGbGFzaCBQbGF5ZXJcblx0ICogRGV2ZWxvcGVyIENlbnRlciBUb3BpYzogPGFcblx0ICogaHJlZj1cImh0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2Rldm5ldF9zZWN1cml0eV9lblwiXG5cdCAqIHNjb3BlPVwiZXh0ZXJuYWxcIj5TZWN1cml0eTwvYT4uPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gcmVxdWVzdCBUaGUgYWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIG9mIHRoZSBTV0YsIEpQRUcsIEdJRiwgb3IgUE5HXG5cdCAqICAgICAgICAgICAgICAgIGZpbGUgdG8gYmUgbG9hZGVkLiBBIHJlbGF0aXZlIHBhdGggbXVzdCBiZSByZWxhdGl2ZSB0byB0aGVcblx0ICogICAgICAgICAgICAgICAgbWFpbiBTV0YgZmlsZS4gQWJzb2x1dGUgVVJMcyBtdXN0IGluY2x1ZGUgdGhlIHByb3RvY29sXG5cdCAqICAgICAgICAgICAgICAgIHJlZmVyZW5jZSwgc3VjaCBhcyBodHRwOi8vIG9yIGZpbGU6Ly8vLiBGaWxlbmFtZXMgY2Fubm90XG5cdCAqICAgICAgICAgICAgICAgIGluY2x1ZGUgZGlzayBkcml2ZSBzcGVjaWZpY2F0aW9ucy5cblx0ICogQHBhcmFtIGNvbnRleHQgQSBMb2FkZXJDb250ZXh0IG9iamVjdCwgd2hpY2ggaGFzIHByb3BlcnRpZXMgdGhhdCBkZWZpbmVcblx0ICogICAgICAgICAgICAgICAgdGhlIGZvbGxvd2luZzpcblx0ICogICAgICAgICAgICAgICAgPHVsPlxuXHQgKiAgICAgICAgICAgICAgICAgIDxsaT5XaGV0aGVyIG9yIG5vdCB0byBjaGVjayBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBhIHBvbGljeVxuXHQgKiAgICAgICAgICAgICAgICBmaWxlIHVwb24gbG9hZGluZyB0aGUgb2JqZWN0PC9saT5cblx0ICogICAgICAgICAgICAgICAgICA8bGk+VGhlIEFwcGxpY2F0aW9uRG9tYWluIGZvciB0aGUgbG9hZGVkIG9iamVjdDwvbGk+XG5cdCAqICAgICAgICAgICAgICAgICAgPGxpPlRoZSBTZWN1cml0eURvbWFpbiBmb3IgdGhlIGxvYWRlZCBvYmplY3Q8L2xpPlxuXHQgKiAgICAgICAgICAgICAgICAgIDxsaT5UaGUgSW1hZ2VEZWNvZGluZ1BvbGljeSBmb3IgdGhlIGxvYWRlZCBpbWFnZVxuXHQgKiAgICAgICAgICAgICAgICBvYmplY3Q8L2xpPlxuXHQgKiAgICAgICAgICAgICAgICA8L3VsPlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICA8cD5JZiB0aGUgPGNvZGU+Y29udGV4dDwvY29kZT4gcGFyYW1ldGVyIGlzIG5vdCBzcGVjaWZpZWRcblx0ICogICAgICAgICAgICAgICAgb3IgcmVmZXJzIHRvIGEgbnVsbCBvYmplY3QsIHRoZSBsb2FkZWQgY29udGVudCByZW1haW5zIGluXG5cdCAqICAgICAgICAgICAgICAgIGl0cyBvd24gc2VjdXJpdHkgZG9tYWluLjwvcD5cblx0ICpcblx0ICogICAgICAgICAgICAgICAgPHA+Rm9yIGNvbXBsZXRlIGRldGFpbHMsIHNlZSB0aGUgZGVzY3JpcHRpb24gb2YgdGhlXG5cdCAqICAgICAgICAgICAgICAgIHByb3BlcnRpZXMgaW4gdGhlIDxhXG5cdCAqICAgICAgICAgICAgICAgIGhyZWY9XCIuLi9zeXN0ZW0vTG9hZGVyQ29udGV4dC5odG1sXCI+TG9hZGVyQ29udGV4dDwvYT5cblx0ICogICAgICAgICAgICAgICAgY2xhc3MuPC9wPlxuXHQgKiBAcGFyYW0gbnMgICAgICBBbiBvcHRpb25hbCBuYW1lc3BhY2Ugc3RyaW5nIHVuZGVyIHdoaWNoIHRoZSBmaWxlIGlzIHRvIGJlXG5cdCAqICAgICAgICAgICAgICAgIGxvYWRlZCwgYWxsb3dpbmcgdGhlIGRpZmZlcmVudGlhdGlvbiBvZiB0d28gcmVzb3VyY2VzIHdpdGhcblx0ICogICAgICAgICAgICAgICAgaWRlbnRpY2FsIGFzc2V0cy5cblx0ICogQHBhcmFtIHBhcnNlciAgQW4gb3B0aW9uYWwgcGFyc2VyIG9iamVjdCBmb3IgdHJhbnNsYXRpbmcgdGhlIGxvYWRlZCBkYXRhXG5cdCAqICAgICAgICAgICAgICAgIGludG8gYSB1c2FibGUgcmVzb3VyY2UuIElmIG5vdCBwcm92aWRlZCwgQXNzZXRMb2FkZXIgd2lsbFxuXHQgKiAgICAgICAgICAgICAgICBhdHRlbXB0IHRvIGF1dG8tZGV0ZWN0IHRoZSBmaWxlIHR5cGUuXG5cdCAqIEB0aHJvd3MgSU9FcnJvciAgICAgICAgICAgICAgIFRoZSA8Y29kZT5kaWdlc3Q8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5yZXF1ZXN0PC9jb2RlPiBvYmplY3QgaXMgbm90XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPm51bGw8L2NvZGU+LiBZb3Ugc2hvdWxkIG9ubHkgc2V0IHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5kaWdlc3Q8L2NvZGU+IHByb3BlcnR5IG9mIGEgVVJMUmVxdWVzdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3Qgd2hlbiBjYWxsaW5nIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5VUkxMb2FkZXIubG9hZCgpPC9jb2RlPiBtZXRob2Qgd2hlblxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nIGEgU1daIGZpbGUoYW4gQWRvYmUgcGxhdGZvcm1cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50KS5cblx0ICogQHRocm93cyBJbGxlZ2FsT3BlcmF0aW9uRXJyb3IgSWYgdGhlIDxjb2RlPnJlcXVlc3RlZENvbnRlbnRQYXJlbnQ8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5IG9mIHRoZSA8Y29kZT5jb250ZXh0PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXIgaXMgYSA8Y29kZT5Mb2FkZXI8L2NvZGU+LlxuXHQgKiBAdGhyb3dzIElsbGVnYWxPcGVyYXRpb25FcnJvciBJZiB0aGUgPGNvZGU+TG9hZGVyQ29udGV4dC5wYXJhbWV0ZXJzPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXIgaXMgc2V0IHRvIG5vbi1udWxsIGFuZCBoYXMgc29tZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgd2hpY2ggYXJlIG5vdCBTdHJpbmdzLlxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgICAgICAgICBUaGUgdmFsdWUgb2Zcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+TG9hZGVyQ29udGV4dC5zZWN1cml0eURvbWFpbjwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVzdCBiZSBlaXRoZXIgPGNvZGU+bnVsbDwvY29kZT4gb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+U2VjdXJpdHlEb21haW4uY3VycmVudERvbWFpbjwvY29kZT4uXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXMgcmVmbGVjdHMgdGhlIGZhY3QgdGhhdCB5b3UgY2FuIG9ubHlcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2UgdGhlIGxvYWRlZCBtZWRpYSBpbiBpdHMgbmF0dXJhbFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN1cml0eSBzYW5kYm94IG9yIHlvdXIgb3duKHRoZSBsYXR0ZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZXMgYSBwb2xpY3kgZmlsZSkuXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciAgICAgICAgIExvY2FsIFNXRiBmaWxlcyBtYXkgbm90IHNldFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2FkZXJDb250ZXh0LnNlY3VyaXR5RG9tYWluIHRvIGFueXRoaW5nXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyIHRoYW4gPGNvZGU+bnVsbDwvY29kZT4uIEl0IGlzIG5vdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXR0ZWQgdG8gaW1wb3J0IG5vbi1sb2NhbCBtZWRpYSBpbnRvIGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWwgc2FuZGJveCwgb3IgdG8gcGxhY2Ugb3RoZXIgbG9jYWwgbWVkaWFcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gYW55dGhpbmcgb3RoZXIgdGhhbiBpdHMgbmF0dXJhbCBzYW5kYm94LlxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgICAgICAgICBZb3UgY2Fubm90IGNvbm5lY3QgdG8gY29tbW9ubHkgcmVzZXJ2ZWRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9ydHMuIEZvciBhIGNvbXBsZXRlIGxpc3Qgb2YgYmxvY2tlZCBwb3J0cyxcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VlIFwiUmVzdHJpY3RpbmcgTmV0d29ya2luZyBBUElzXCIgaW4gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPkFjdGlvblNjcmlwdCAzLjAgRGV2ZWxvcGVyJ3MgR3VpZGU8L2k+LlxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgICAgICAgICBJZiB0aGUgPGNvZGU+YXBwbGljYXRpb25Eb21haW48L2NvZGU+IG9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnNlY3VyaXR5RG9tYWluPC9jb2RlPiBwcm9wZXJ0aWVzIG9mXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSA8Y29kZT5jb250ZXh0PC9jb2RlPiBwYXJhbWV0ZXIgYXJlIGZyb21cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSBkaXNhbGxvd2VkIGRvbWFpbi5cblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yICAgICAgICAgSWYgYSBsb2NhbCBTV0YgZmlsZSBpcyBhdHRlbXB0aW5nIHRvIHVzZSB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c2VjdXJpdHlEb21haW48L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5jb250ZXh0PC9jb2RlPiBwYXJhbWV0ZXIuXG5cdCAqIEBldmVudCBhc3luY0Vycm9yICAgIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgaWYgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkxvYWRlckNvbnRleHQucmVxdWVzdGVkQ29udGVudFBhcmVudDwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgaGFzIGJlZW4gc3BlY2lmaWVkIGFuZCBpdCBpcyBub3QgcG9zc2libGUgdG9cblx0ICogICAgICAgICAgICAgICAgICAgICAgYWRkIHRoZSBsb2FkZWQgY29udGVudCBhcyBhIGNoaWxkIHRvIHRoZSBzcGVjaWZpZWRcblx0ICogICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lci4gVGhpcyBjb3VsZCBoYXBwZW4gaWYgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZCBjb250ZW50IGlzIGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+Zmxhc2guZGlzcGxheS5BVk0xTW92aWU8L2NvZGU+IG9yIGlmIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5hZGRDaGlsZCgpPC9jb2RlPiBjYWxsIHRvIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ZWRDb250ZW50UGFyZW50IHRocm93cyBhbiBlcnJvci5cblx0ICogQGV2ZW50IGNvbXBsZXRlICAgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB3aGVuIHRoZSBmaWxlIGhhcyBjb21wbGV0ZWQgbG9hZGluZy4gVGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmNvbXBsZXRlPC9jb2RlPiBldmVudCBpcyBhbHdheXMgZGlzcGF0Y2hlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBhZnRlciB0aGUgPGNvZGU+aW5pdDwvY29kZT4gZXZlbnQuXG5cdCAqIEBldmVudCBodHRwU3RhdHVzICAgIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3Qgd2hlbiBhIG5ldHdvcmsgcmVxdWVzdCBpcyBtYWRlIG92ZXIgSFRUUCBhbmRcblx0ICogICAgICAgICAgICAgICAgICAgICAgRmxhc2ggUGxheWVyIGNhbiBkZXRlY3QgdGhlIEhUVFAgc3RhdHVzIGNvZGUuXG5cdCAqIEBldmVudCBpbml0ICAgICAgICAgIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3Qgd2hlbiB0aGUgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBvZiB0aGUgbG9hZGVkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIFNXRiBmaWxlIGFyZSBhY2Nlc3NpYmxlLiBUaGUgPGNvZGU+aW5pdDwvY29kZT4gZXZlbnRcblx0ICogICAgICAgICAgICAgICAgICAgICAgYWx3YXlzIHByZWNlZGVzIHRoZSA8Y29kZT5jb21wbGV0ZTwvY29kZT4gZXZlbnQuXG5cdCAqIEBldmVudCBpb0Vycm9yICAgICAgIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3Qgd2hlbiBhbiBpbnB1dCBvciBvdXRwdXQgZXJyb3Igb2NjdXJzIHRoYXRcblx0ICogICAgICAgICAgICAgICAgICAgICAgY2F1c2VzIGEgbG9hZCBvcGVyYXRpb24gdG8gZmFpbC5cblx0ICogQGV2ZW50IG9wZW4gICAgICAgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB3aGVuIHRoZSBsb2FkaW5nIG9wZXJhdGlvbiBzdGFydHMuXG5cdCAqIEBldmVudCBwcm9ncmVzcyAgICAgIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgYXMgZGF0YSBpcyByZWNlaXZlZCB3aGlsZSBsb2FkIG9wZXJhdGlvblxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc2VzLlxuXHQgKiBAZXZlbnQgc2VjdXJpdHlFcnJvciBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IGlmIGEgU1dGIGZpbGUgaW4gdGhlIGxvY2FsLXdpdGgtZmlsZXN5c3RlbVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBzYW5kYm94IGF0dGVtcHRzIHRvIGxvYWQgY29udGVudCBpbiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgbG9jYWwtd2l0aC1uZXR3b3JraW5nIHNhbmRib3gsIG9yIHZpY2UgdmVyc2EuXG5cdCAqIEBldmVudCBzZWN1cml0eUVycm9yIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgaWYgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkxvYWRlckNvbnRleHQucmVxdWVzdGVkQ29udGVudFBhcmVudDwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgaGFzIGJlZW4gc3BlY2lmaWVkIGFuZCB0aGUgc2VjdXJpdHkgc2FuZGJveFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+TG9hZGVyQ29udGV4dC5yZXF1ZXN0ZWRDb250ZW50UGFyZW50PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byB0aGUgbG9hZGVkIFNXRi5cblx0ICogQGV2ZW50IHVubG9hZCAgICAgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB3aGVuIGEgbG9hZGVkIG9iamVjdCBpcyByZW1vdmVkLlxuXHQgKi9cblx0cHVibGljIGxvYWQocmVxdWVzdDpVUkxSZXF1ZXN0LCBjb250ZXh0OkFzc2V0TG9hZGVyQ29udGV4dCA9IG51bGwsIG5zOnN0cmluZyA9IG51bGwsIHBhcnNlcjpQYXJzZXJCYXNlID0gbnVsbCk6QXNzZXRMb2FkZXJUb2tlblxuXHR7XG5cdFx0dmFyIHRva2VuOkFzc2V0TG9hZGVyVG9rZW47XG5cblx0XHRpZiAodGhpcy5fdXNlQXNzZXRMaWIpIHtcblx0XHRcdHZhciBsaWI6QXNzZXRMaWJyYXJ5QnVuZGxlO1xuXHRcdFx0bGliID0gQXNzZXRMaWJyYXJ5QnVuZGxlLmdldEluc3RhbmNlKHRoaXMuX2Fzc2V0TGliSWQpO1xuXHRcdFx0dG9rZW4gPSBsaWIubG9hZChyZXF1ZXN0LCBjb250ZXh0LCBucywgcGFyc2VyKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGxvYWRlcjpBc3NldExvYWRlciA9IG5ldyBBc3NldExvYWRlcigpO1xuXHRcdFx0dGhpcy5fbG9hZGluZ1Nlc3Npb25zLnB1c2gobG9hZGVyKTtcblx0XHRcdHRva2VuID0gbG9hZGVyLmxvYWQocmVxdWVzdCwgY29udGV4dCwgbnMsIHBhcnNlcik7XG5cdFx0fVxuXG5cdFx0dG9rZW4uYWRkRXZlbnRMaXN0ZW5lcihMb2FkZXJFdmVudC5SRVNPVVJDRV9DT01QTEVURSwgdGhpcy5fb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGUpO1xuXHRcdHRva2VuLmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSwgdGhpcy5fb25Bc3NldENvbXBsZXRlRGVsZWdhdGUpO1xuXG5cdFx0Ly8gRXJyb3IgYXJlIGhhbmRsZWQgc2VwYXJhdGVseSAoc2VlIGRvY3VtZW50YXRpb24gZm9yIGFkZEVycm9ySGFuZGxlcilcblx0XHR0b2tlbi5faUxvYWRlci5faUFkZEVycm9ySGFuZGxlcih0aGlzLm9uTG9hZEVycm9yKTtcblx0XHR0b2tlbi5faUxvYWRlci5faUFkZFBhcnNlRXJyb3JIYW5kbGVyKHRoaXMub25QYXJzZUVycm9yKTtcblxuXHRcdHJldHVybiB0b2tlbjtcblx0fVxuXG5cdC8qKlxuXHQgKiBMb2FkcyBmcm9tIGJpbmFyeSBkYXRhIHN0b3JlZCBpbiBhIEJ5dGVBcnJheSBvYmplY3QuXG5cdCAqXG5cdCAqIDxwPlRoZSA8Y29kZT5sb2FkQnl0ZXMoKTwvY29kZT4gbWV0aG9kIGlzIGFzeW5jaHJvbm91cy4gWW91IG11c3Qgd2FpdCBmb3Jcblx0ICogdGhlIFwiaW5pdFwiIGV2ZW50IGJlZm9yZSBhY2Nlc3NpbmcgdGhlIHByb3BlcnRpZXMgb2YgYSBsb2FkZWQgb2JqZWN0LjwvcD5cblx0ICpcblx0ICogPHA+V2hlbiB5b3UgdXNlIHRoaXMgbWV0aG9kLCBjb25zaWRlciB0aGUgRmxhc2ggUGxheWVyIHNlY3VyaXR5IG1vZGVsLFxuXHQgKiB3aGljaCBpcyBkZXNjcmliZWQgaW4gdGhlIExvYWRlciBjbGFzcyBkZXNjcmlwdGlvbi4gPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gYnl0ZXMgICBBIEJ5dGVBcnJheSBvYmplY3QuIFRoZSBjb250ZW50cyBvZiB0aGUgQnl0ZUFycmF5IGNhbiBiZVxuXHQgKiAgICAgICAgICAgICAgICBhbnkgb2YgdGhlIGZpbGUgZm9ybWF0cyBzdXBwb3J0ZWQgYnkgdGhlIExvYWRlciBjbGFzczogU1dGLFxuXHQgKiAgICAgICAgICAgICAgICBHSUYsIEpQRUcsIG9yIFBORy5cblx0ICogQHBhcmFtIGNvbnRleHQgQSBMb2FkZXJDb250ZXh0IG9iamVjdC4gT25seSB0aGVcblx0ICogICAgICAgICAgICAgICAgPGNvZGU+YXBwbGljYXRpb25Eb21haW48L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICBMb2FkZXJDb250ZXh0IG9iamVjdCBhcHBsaWVzOyB0aGVcblx0ICogICAgICAgICAgICAgICAgPGNvZGU+Y2hlY2tQb2xpY3lGaWxlPC9jb2RlPiBhbmRcblx0ICogICAgICAgICAgICAgICAgPGNvZGU+c2VjdXJpdHlEb21haW48L2NvZGU+IHByb3BlcnRpZXMgb2YgdGhlIExvYWRlckNvbnRleHRcblx0ICogICAgICAgICAgICAgICAgb2JqZWN0IGRvIG5vdCBhcHBseS5cblx0ICpcblx0ICogICAgICAgICAgICAgICAgPHA+SWYgdGhlIDxjb2RlPmNvbnRleHQ8L2NvZGU+IHBhcmFtZXRlciBpcyBub3Qgc3BlY2lmaWVkXG5cdCAqICAgICAgICAgICAgICAgIG9yIHJlZmVycyB0byBhIG51bGwgb2JqZWN0LCB0aGUgY29udGVudCBpcyBsb2FkZWQgaW50byB0aGVcblx0ICogICAgICAgICAgICAgICAgY3VycmVudCBzZWN1cml0eSBkb21haW4gLSAgYSBwcm9jZXNzIHJlZmVycmVkIHRvIGFzIFwiaW1wb3J0XG5cdCAqICAgICAgICAgICAgICAgIGxvYWRpbmdcIiBpbiBGbGFzaCBQbGF5ZXIgc2VjdXJpdHkgZG9jdW1lbnRhdGlvbi5cblx0ICogICAgICAgICAgICAgICAgU3BlY2lmaWNhbGx5LCBpZiB0aGUgbG9hZGluZyBTV0YgZmlsZSB0cnVzdHMgdGhlIHJlbW90ZSBTV0Zcblx0ICogICAgICAgICAgICAgICAgYnkgaW5jb3Jwb3JhdGluZyB0aGUgcmVtb3RlIFNXRiBpbnRvIGl0cyBjb2RlLCB0aGVuIHRoZVxuXHQgKiAgICAgICAgICAgICAgICBsb2FkaW5nIFNXRiBjYW4gaW1wb3J0IGl0IGRpcmVjdGx5IGludG8gaXRzIG93biBzZWN1cml0eVxuXHQgKiAgICAgICAgICAgICAgICBkb21haW4uPC9wPlxuXHQgKlxuXHQgKiAgICAgICAgICAgICAgICA8cD5Gb3IgbW9yZSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHNlY3VyaXR5LCBzZWUgdGhlIEZsYXNoXG5cdCAqICAgICAgICAgICAgICAgIFBsYXllciBEZXZlbG9wZXIgQ2VudGVyIFRvcGljOiA8YVxuXHQgKiAgICAgICAgICAgICAgICBocmVmPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZGV2bmV0X3NlY3VyaXR5X2VuXCJcblx0ICogICAgICAgICAgICAgICAgc2NvcGU9XCJleHRlcm5hbFwiPlNlY3VyaXR5PC9hPi48L3A+XG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciAgICAgICAgIElmIHRoZSA8Y29kZT5sZW5ndGg8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCeXRlQXJyYXkgb2JqZWN0IGlzIG5vdCBncmVhdGVyIHRoYW4gMC5cblx0ICogQHRocm93cyBJbGxlZ2FsT3BlcmF0aW9uRXJyb3IgSWYgdGhlIDxjb2RlPmNoZWNrUG9saWN5RmlsZTwvY29kZT4gb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c2VjdXJpdHlEb21haW48L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5jb250ZXh0PC9jb2RlPiBwYXJhbWV0ZXIgYXJlIG5vbi1udWxsLlxuXHQgKiBAdGhyb3dzIElsbGVnYWxPcGVyYXRpb25FcnJvciBJZiB0aGUgPGNvZGU+cmVxdWVzdGVkQ29udGVudFBhcmVudDwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgb2YgdGhlIDxjb2RlPmNvbnRleHQ8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlciBpcyBhIDxjb2RlPkxvYWRlcjwvY29kZT4uXG5cdCAqIEB0aHJvd3MgSWxsZWdhbE9wZXJhdGlvbkVycm9yIElmIHRoZSA8Y29kZT5Mb2FkZXJDb250ZXh0LnBhcmFtZXRlcnM8L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlciBpcyBzZXQgdG8gbm9uLW51bGwgYW5kIGhhcyBzb21lXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyB3aGljaCBhcmUgbm90IFN0cmluZ3MuXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciAgICAgICAgIElmIHRoZSBwcm92aWRlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5hcHBsaWNhdGlvbkRvbWFpbjwvY29kZT4gcHJvcGVydHkgb2Zcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIDxjb2RlPmNvbnRleHQ8L2NvZGU+IHByb3BlcnR5IGlzIGZyb20gYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhbGxvd2VkIGRvbWFpbi5cblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yICAgICAgICAgWW91IGNhbm5vdCBjb25uZWN0IHRvIGNvbW1vbmx5IHJlc2VydmVkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcnRzLiBGb3IgYSBjb21wbGV0ZSBsaXN0IG9mIGJsb2NrZWQgcG9ydHMsXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZSBcIlJlc3RyaWN0aW5nIE5ldHdvcmtpbmcgQVBJc1wiIGluIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT5BY3Rpb25TY3JpcHQgMy4wIERldmVsb3BlcidzIEd1aWRlPC9pPi5cblx0ICogQGV2ZW50IGFzeW5jRXJyb3IgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCBpZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+TG9hZGVyQ29udGV4dC5yZXF1ZXN0ZWRDb250ZW50UGFyZW50PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSBoYXMgYmVlbiBzcGVjaWZpZWQgYW5kIGl0IGlzIG5vdCBwb3NzaWJsZSB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICBhZGQgdGhlIGxvYWRlZCBjb250ZW50IGFzIGEgY2hpbGQgdG8gdGhlIHNwZWNpZmllZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLiBUaGlzIGNvdWxkIGhhcHBlbiBpZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgbG9hZGVkIGNvbnRlbnQgaXMgYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5mbGFzaC5kaXNwbGF5LkFWTTFNb3ZpZTwvY29kZT4gb3IgaWYgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+IGNhbGwgdG8gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RlZENvbnRlbnRQYXJlbnQgdGhyb3dzIGFuIGVycm9yLlxuXHQgKiBAZXZlbnQgY29tcGxldGUgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IHdoZW4gdGhlIG9wZXJhdGlvbiBpcyBjb21wbGV0ZS4gVGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmNvbXBsZXRlPC9jb2RlPiBldmVudCBpcyBhbHdheXMgZGlzcGF0Y2hlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBhZnRlciB0aGUgPGNvZGU+aW5pdDwvY29kZT4gZXZlbnQuXG5cdCAqIEBldmVudCBpbml0ICAgICAgICAgIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3Qgd2hlbiB0aGUgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBvZiB0aGUgbG9hZGVkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIGRhdGEgYXJlIGFjY2Vzc2libGUuIFRoZSA8Y29kZT5pbml0PC9jb2RlPiBldmVudFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBhbHdheXMgcHJlY2VkZXMgdGhlIDxjb2RlPmNvbXBsZXRlPC9jb2RlPiBldmVudC5cblx0ICogQGV2ZW50IGlvRXJyb3IgICAgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB3aGVuIHRoZSBydW50aW1lIGNhbm5vdCBwYXJzZSB0aGUgZGF0YSBpbiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgYnl0ZSBhcnJheS5cblx0ICogQGV2ZW50IG9wZW4gICAgICAgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB3aGVuIHRoZSBvcGVyYXRpb24gc3RhcnRzLlxuXHQgKiBAZXZlbnQgcHJvZ3Jlc3MgICAgICBEaXNwYXRjaGVkIGJ5IHRoZSA8Y29kZT5jb250ZW50TG9hZGVySW5mbzwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IGFzIGRhdGEgaXMgdHJhbnNmZXJlZCBpbiBtZW1vcnkuXG5cdCAqIEBldmVudCBzZWN1cml0eUVycm9yIERpc3BhdGNoZWQgYnkgdGhlIDxjb2RlPmNvbnRlbnRMb2FkZXJJbmZvPC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgaWYgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkxvYWRlckNvbnRleHQucmVxdWVzdGVkQ29udGVudFBhcmVudDwvY29kZT5cblx0ICogICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgaGFzIGJlZW4gc3BlY2lmaWVkIGFuZCB0aGUgc2VjdXJpdHkgc2FuZGJveFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvZiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgPGNvZGU+TG9hZGVyQ29udGV4dC5yZXF1ZXN0ZWRDb250ZW50UGFyZW50PC9jb2RlPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byB0aGUgbG9hZGVkIFNXRi5cblx0ICogQGV2ZW50IHVubG9hZCAgICAgICAgRGlzcGF0Y2hlZCBieSB0aGUgPGNvZGU+Y29udGVudExvYWRlckluZm88L2NvZGU+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCB3aGVuIGEgbG9hZGVkIG9iamVjdCBpcyByZW1vdmVkLlxuXHQgKi9cblx0cHVibGljIGxvYWREYXRhKGRhdGE6YW55LCBjb250ZXh0OkFzc2V0TG9hZGVyQ29udGV4dCA9IG51bGwsIG5zOnN0cmluZyA9IG51bGwsIHBhcnNlcjpQYXJzZXJCYXNlID0gbnVsbCk6QXNzZXRMb2FkZXJUb2tlblxuXHR7XG5cdFx0dmFyIHRva2VuOkFzc2V0TG9hZGVyVG9rZW47XG5cblx0XHRpZiAodGhpcy5fdXNlQXNzZXRMaWIpIHtcblx0XHRcdHZhciBsaWI6QXNzZXRMaWJyYXJ5QnVuZGxlO1xuXHRcdFx0bGliID0gQXNzZXRMaWJyYXJ5QnVuZGxlLmdldEluc3RhbmNlKHRoaXMuX2Fzc2V0TGliSWQpO1xuXHRcdFx0dG9rZW4gPSBsaWIubG9hZERhdGEoZGF0YSwgY29udGV4dCwgbnMsIHBhcnNlcik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBsb2FkZXI6QXNzZXRMb2FkZXIgPSBuZXcgQXNzZXRMb2FkZXIoKTtcblx0XHRcdHRoaXMuX2xvYWRpbmdTZXNzaW9ucy5wdXNoKGxvYWRlcik7XG5cdFx0XHR0b2tlbiA9IGxvYWRlci5sb2FkRGF0YShkYXRhLCAnJywgY29udGV4dCwgbnMsIHBhcnNlcik7XG5cdFx0fVxuXG5cdFx0dG9rZW4uYWRkRXZlbnRMaXN0ZW5lcihMb2FkZXJFdmVudC5SRVNPVVJDRV9DT01QTEVURSwgdGhpcy5fb25SZXNvdXJjZUNvbXBsZXRlRGVsZWdhdGUpO1xuXHRcdHRva2VuLmFkZEV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSwgdGhpcy5fb25Bc3NldENvbXBsZXRlRGVsZWdhdGUpO1xuXG5cdFx0Ly8gRXJyb3IgYXJlIGhhbmRsZWQgc2VwYXJhdGVseSAoc2VlIGRvY3VtZW50YXRpb24gZm9yIGFkZEVycm9ySGFuZGxlcilcblx0XHR0b2tlbi5faUxvYWRlci5faUFkZEVycm9ySGFuZGxlcih0aGlzLm9uTG9hZEVycm9yKTtcblx0XHR0b2tlbi5faUxvYWRlci5faUFkZFBhcnNlRXJyb3JIYW5kbGVyKHRoaXMub25QYXJzZUVycm9yKTtcblxuXHRcdHJldHVybiB0b2tlbjtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGEgY2hpbGQgb2YgdGhpcyBMb2FkZXIgb2JqZWN0IHRoYXQgd2FzIGxvYWRlZCBieSB1c2luZyB0aGVcblx0ICogPGNvZGU+bG9hZCgpPC9jb2RlPiBtZXRob2QuIFRoZSA8Y29kZT5wcm9wZXJ0eTwvY29kZT4gb2YgdGhlIGFzc29jaWF0ZWRcblx0ICogTG9hZGVySW5mbyBvYmplY3QgaXMgcmVzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4uIFRoZSBjaGlsZCBpcyBub3Rcblx0ICogbmVjZXNzYXJpbHkgZGVzdHJveWVkIGJlY2F1c2Ugb3RoZXIgb2JqZWN0cyBtaWdodCBoYXZlIHJlZmVyZW5jZXMgdG8gaXQ7XG5cdCAqIGhvd2V2ZXIsIGl0IGlzIG5vIGxvbmdlciBhIGNoaWxkIG9mIHRoZSBMb2FkZXIgb2JqZWN0LlxuXHQgKlxuXHQgKiA8cD5BcyBhIGJlc3QgcHJhY3RpY2UsIGJlZm9yZSB5b3UgdW5sb2FkIGEgY2hpbGQgU1dGIGZpbGUsIHlvdSBzaG91bGRcblx0ICogZXhwbGljaXRseSBjbG9zZSBhbnkgc3RyZWFtcyBpbiB0aGUgY2hpbGQgU1dGIGZpbGUncyBvYmplY3RzLCBzdWNoIGFzXG5cdCAqIExvY2FsQ29ubmVjdGlvbiwgTmV0Q29ubmVjdGlvbiwgTmV0U3RyZWFtLCBhbmQgU291bmQgb2JqZWN0cy4gT3RoZXJ3aXNlLFxuXHQgKiBhdWRpbyBpbiB0aGUgY2hpbGQgU1dGIGZpbGUgbWlnaHQgY29udGludWUgdG8gcGxheSwgZXZlbiB0aG91Z2ggdGhlIGNoaWxkXG5cdCAqIFNXRiBmaWxlIHdhcyB1bmxvYWRlZC4gVG8gY2xvc2Ugc3RyZWFtcyBpbiB0aGUgY2hpbGQgU1dGIGZpbGUsIGFkZCBhblxuXHQgKiBldmVudCBsaXN0ZW5lciB0byB0aGUgY2hpbGQgdGhhdCBsaXN0ZW5zIGZvciB0aGUgPGNvZGU+dW5sb2FkPC9jb2RlPlxuXHQgKiBldmVudC4gV2hlbiB0aGUgcGFyZW50IGNhbGxzIDxjb2RlPkxvYWRlci51bmxvYWQoKTwvY29kZT4sIHRoZVxuXHQgKiA8Y29kZT51bmxvYWQ8L2NvZGU+IGV2ZW50IGlzIGRpc3BhdGNoZWQgdG8gdGhlIGNoaWxkLiBUaGUgZm9sbG93aW5nIGNvZGVcblx0ICogc2hvd3MgaG93IHlvdSBtaWdodCBkbyB0aGlzOjwvcD5cblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPiBwdWJsaWMgY2xvc2VBbGxTdHJlYW1zKGV2dDpFdmVudCkge1xuXHQgKiBteU5ldFN0cmVhbS5jbG9zZSgpOyBteVNvdW5kLmNsb3NlKCk7IG15TmV0Q29ubmVjdGlvbi5jbG9zZSgpO1xuXHQgKiBteUxvY2FsQ29ubmVjdGlvbi5jbG9zZSgpOyB9XG5cdCAqIG15TW92aWVDbGlwLmxvYWRlckluZm8uYWRkRXZlbnRMaXN0ZW5lcihFdmVudC5VTkxPQUQsXG5cdCAqIGNsb3NlQWxsU3RyZWFtcyk7PC9wcmU+XG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgdW5sb2FkKClcblx0e1xuXHRcdC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgYSBzcGVjaWZpYyBwYXJzZXIuXG5cdCAqIFdoZW4gbm8gc3BlY2lmaWMgcGFyc2VyIGlzIHNldCBmb3IgYSBsb2FkaW5nL3BhcnNpbmcgb3BwZXJhdGlvbixcblx0ICogbG9hZGVyM2QgY2FuIGF1dG9zZWxlY3QgdGhlIGNvcnJlY3QgcGFyc2VyIHRvIHVzZS5cblx0ICogQSBwYXJzZXIgbXVzdCBoYXZlIGJlZW4gZW5hYmxlZCwgdG8gYmUgY29uc2lkZXJlZCB3aGVuIGF1dG9zZWxlY3RpbmcgdGhlIHBhcnNlci5cblx0ICpcblx0ICogQHBhcmFtIHBhcnNlckNsYXNzIFRoZSBwYXJzZXIgY2xhc3MgdG8gZW5hYmxlLlxuXHQgKiBAc2VlIGF3YXkucGFyc2Vycy5QYXJzZXJzXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIGVuYWJsZVBhcnNlcihwYXJzZXJDbGFzczpPYmplY3QpXG5cdHtcblx0XHRBc3NldExvYWRlci5lbmFibGVQYXJzZXIocGFyc2VyQ2xhc3MpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgYSBsaXN0IG9mIHBhcnNlcnMuXG5cdCAqIFdoZW4gbm8gc3BlY2lmaWMgcGFyc2VyIGlzIHNldCBmb3IgYSBsb2FkaW5nL3BhcnNpbmcgb3BwZXJhdGlvbixcblx0ICogbG9hZGVyM2QgY2FuIGF1dG9zZWxlY3QgdGhlIGNvcnJlY3QgcGFyc2VyIHRvIHVzZS5cblx0ICogQSBwYXJzZXIgbXVzdCBoYXZlIGJlZW4gZW5hYmxlZCwgdG8gYmUgY29uc2lkZXJlZCB3aGVuIGF1dG9zZWxlY3RpbmcgdGhlIHBhcnNlci5cblx0ICpcblx0ICogQHBhcmFtIHBhcnNlckNsYXNzZXMgQSBWZWN0b3Igb2YgcGFyc2VyIGNsYXNzZXMgdG8gZW5hYmxlLlxuXHQgKiBAc2VlIGF3YXkucGFyc2Vycy5QYXJzZXJzXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIGVuYWJsZVBhcnNlcnMocGFyc2VyQ2xhc3NlczpBcnJheTxPYmplY3Q+KVxuXHR7XG5cdFx0QXNzZXRMb2FkZXIuZW5hYmxlUGFyc2VycyhwYXJzZXJDbGFzc2VzKTtcblx0fVxuXG5cblx0cHJpdmF0ZSByZW1vdmVMaXN0ZW5lcnMoZGlzcGF0Y2hlcjpFdmVudERpc3BhdGNoZXIpXG5cdHtcblx0XHRkaXNwYXRjaGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoTG9hZGVyRXZlbnQuUkVTT1VSQ0VfQ09NUExFVEUsIHRoaXMuX29uUmVzb3VyY2VDb21wbGV0ZURlbGVnYXRlKTtcblx0XHRkaXNwYXRjaGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQXNzZXRFdmVudC5BU1NFVF9DT01QTEVURSwgdGhpcy5fb25Bc3NldENvbXBsZXRlRGVsZWdhdGUpO1xuXHR9XG5cblx0cHJpdmF0ZSBvbkFzc2V0Q29tcGxldGUoZXZlbnQ6QXNzZXRFdmVudClcblx0e1xuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gYW4gZXJyb3Igb2NjdXJzIGR1cmluZyBsb2FkaW5nXG5cdCAqL1xuXHRwcml2YXRlIG9uTG9hZEVycm9yKGV2ZW50OkxvYWRlckV2ZW50KTpib29sZWFuXG5cdHtcblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKElPRXJyb3JFdmVudC5JT19FUlJPUikpIHtcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgd2hlbiBhIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgcGFyc2luZ1xuXHQgKi9cblx0cHJpdmF0ZSBvblBhcnNlRXJyb3IoZXZlbnQ6UGFyc2VyRXZlbnQpOmJvb2xlYW5cblx0e1xuXHRcdGlmICh0aGlzLmhhc0V2ZW50TGlzdGVuZXIoUGFyc2VyRXZlbnQuUEFSU0VfRVJST1IpKSB7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gdGhlIHJlc291cmNlIGFuZCBhbGwgb2YgaXRzIGRlcGVuZGVuY2llcyB3YXMgcmV0cmlldmVkLlxuXHQgKi9cblx0cHJpdmF0ZSBvblJlc291cmNlQ29tcGxldGUoZXZlbnQ6TG9hZGVyRXZlbnQpXG5cdHtcblx0XHR0aGlzLl9jb250ZW50ID0gPERpc3BsYXlPYmplY3Q+IGV2ZW50LmNvbnRlbnQ7XG5cblx0XHRpZiAodGhpcy5fY29udGVudClcblx0XHRcdHRoaXMuYWRkQ2hpbGQodGhpcy5fY29udGVudCk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHR9XG59XG5cbmV4cG9ydCA9IExvYWRlcjsiXX0=