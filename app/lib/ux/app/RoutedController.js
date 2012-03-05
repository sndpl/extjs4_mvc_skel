Ext.define('Ext.ux.app.RoutedController', {
	extend: 'Ext.app.Controller',
	constructor: function() {
		this.refCache = {};
		this.callParent(arguments);
	},
	render: function(layoutName, component, config) {
		var view = this.application.render(layoutName, this, component, config);
		this.refCache[view.itemId] = view;
		return view;
	},
	
	addLayout: function(name, layout) {
		this.application.addLayout(name, layout);
	},	
	getRef: function(ref, info, config) {
		var cache = this.refCache[ref];
		if (cache) {
			return cache;
		} else if (!cache && arguments.length > 1) {
			return this.callParent(arguments);
		} else {
			throw new Error('TransistorController#getRef could not locate view "' + ref + '"');
		}
	},
	createView: function(viewName, config) {
		var viewGetterFn = 'get' + this.id + viewName + 'View',
			config	 = config || {};
		
		return Ext.create(this[viewGetterFn](), Ext.applyIf(config, {
			controller: this,
			itemId: 'view'
		}));
	}
});
