Ext.define('App.controller.Base', {
	extend: 'Ext.ux.app.RoutedController',

	index: function(request) {
		this.render("workspace", this["get" + this.id + "IndexView"]());
	},
	add: function(request) {
		this.render("workspace", this["get" + this.id + "CreateView"]());
	},
	save: function(request) {
		var sender = request.params.sender;
		var values = sender.getForm().getValues();
		Ext.Msg.alert("controller.Base#save ", request.controller + '/' + request.action + "\n" + Ext.encode(values));
	}
});