/**
* @class Ext.ux.app.RoutedApplication
* An application which uses Ext.Router
*/
Ext.define('Ext.ux.app.RoutedApplication', {
	extend: 'Ext.app.Application',
	requires: ['Ext.ux.app.RoutedController'],
	
	constructor: function(config) {
		this._layouts = new Ext.util.MixedCollection();				
		this.callParent(arguments);		
	},
	onBeforeLaunch: function() {
		// Register this app with the Router
		Ext.Router.registerApp(this);
		Ext.Router.on('beforedispatch', this._onBeforeDispatch, this);
		this.callParent(arguments);
	},
	_onBeforeDispatch: function(controller, request) {
		// Save referenes to currently dispatched controller & request
		this.request = request;
		this.controller = controller;
	},
	getLayout: function(name) {
		return this._layouts.get(name);
	},
	addLayout: function(name, component) {
		this._layouts.add(name, component);
	},
	render: function(layoutName, controller, component, config) {
		var layout = this._layouts.get(layoutName),
			request = this.request,
			itemId = request.controller + '/' + request.action,
			config = config || {};
		
		if (layout) {
			var item = layout.getComponent(itemId);	
			var xtypes = layout.getXTypes();		
			if (!item) {
				if (Ext.isFunction(component)) {
					item = Ext.create(component, Ext.apply({
						controller: controller,
						itemId: itemId
					}, config));
				}
				item = layout.add(item);				
			}
			// Ugly but works.
			if (xtypes.match('window')) {
				this.renderToWindow(layout, item)
			} else if (xtypes.match('tabpanel')) {
				this.renderToTabPanel(layout, item);
			} else if (layout.layout.setActiveItem) {
				this.renderToCard(layout, item);
			}
			return item;
		} else {
			throw new Error('Unknown layout target "' + layoutName + '" in #render.  available layout targets are: ' + this._layouts.keys.join(', '));
		}		
	},
	renderToTabPanel: function(layout, item) {
		layout.setActiveTab(item);
	},
	renderToWindow: function(layout, item) {
		layout.show();
		if (layout.layout.setActiveItem) {
			layout.layout.setActiveItem(item);
		}
		layout.center();
	},
	renderToCard: function(layout, item) {
		layout.layout.setActiveItem(item);
	}
});