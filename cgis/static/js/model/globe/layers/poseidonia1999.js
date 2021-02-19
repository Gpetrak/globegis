/*global define, WorldWind, $ */

define([
    'jquery',
    'worldwind'],
    function () {
    "use strict";
    /**
     * Constructs a Average Surface Temp.
     * @constructor
     * @augments Layer
     */
    var poseidonia1999 = function () {
        WorldWind.Layer.call(this, "Ποσειδωνία 1999");
        
        // Web Map Tiling Service information from
        var serviceAddress = "http://senselab.tucserv.tuc.gr/geoserver/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
        var layerIdentifier = "geonode:poseidonia1999";
        var self = this;

        // Called asynchronously to parse and create the WMTS layer
        var createLayer = function (xmlDom) {
            // Create a WmsCapabilities object from the XML DOM
            var wmsCapabilities = new WorldWind.WmsCapabilities(xmlDom);
            // Retrieve a WmsLayerCapabilities object by the desired layer name
            var wmsLayerCapabilities = wmsCapabilities.getNamedLayer(layerIdentifier);
            // Form a configuration object from the WmsLayerCapabilities object
            var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
            // Create the WMS Layer from the configuration object
            self.wmsLayer = new WorldWind.WmsLayer(wmsConfig);
            // add wms legend image in wmsConfig object
            self.wmsLayer.legendUrl = wmsLayerCapabilities.styles[0].legendUrls[0].url
        };

        // Called if an error occurs during WMS Capabilities document retrieval
        var logError = function (jqXhr, text, exception) {
            console.log("There was a failure retrieving the capabilities document: " + text + " exception: " + exception);
        };

        $.get(serviceAddress).done(createLayer).fail(logError);
    };
    poseidonia1999.prototype = Object.create(WorldWind.Layer.prototype);
 
    /**
     * Refreshes the data associated with this layer. The behavior of this function varies with the layer
     * type. For image layers, it causes the images to be re-retrieved from their origin.
     */
    poseidonia1999.prototype.refresh = function () {
        if (this.wmsLayer) {
           return this.wmsLayer.refresh();
        }
    };

    /**
     * Subclass method called to display this layer. Subclasses should implement this method rather than the
     * [render]{@link Layer#render} method, which determines enable, pick and active altitude status and does not
     * call this doRender method if the layer should not be displayed.
     * @param {DrawContext} dc The current draw context.
     * @protected
     */
    poseidonia1999.prototype.doRender = function (dc) {
        if (this.wmsLayer) {
            return this.wmsLayer.doRender(dc);
        }
    };

    /**
     * Indicates whether this layer is within the current view. Subclasses may override this method and
     * when called determine whether the layer contents are visible in the current view frustum. The default
     * implementation always returns true.
     * @param {DrawContext} dc The current draw context.
     * @returns {boolean} true If this layer is within the current view, otherwise false.
     * @protected
     */
    poseidonia1999.prototype.isLayerInView = function (dc) {
        if (this.wmsLayer) {
            return this.wmsLayer.isLayerInView(dc);
        }
    };

    return poseidonia1999;
});
