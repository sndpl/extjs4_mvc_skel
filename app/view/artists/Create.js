Ext.define('App.view.artists.Create', {
	extend: 'Ext.form.Panel',
	alias: 'widget.artists.Create',
	title: 'Create artist',
	bodyStyle: 'padding: 10px',
	height: 200,
	width: 300,
	items: [{
		xtype: 'textfield',
		name: 'name',
		fieldLabel: 'Name'
	}]
});