Ext.define('App.view.albums.Create', {
	extend: 'Ext.form.Panel',
	alias: 'widget.albums.Create',
	title: 'Create Album',
	height: 300,	// <-- when rendered on a window, sets the window dims
	width: 400,
	bodyStyle: 'padding: 10px',
	items: [{
		xtype: 'textfield',
		name: 'name',
		fieldLabel: 'Name'
	}]
});