Ext.define('App.view.songs.Create', {
	extend: 'Ext.form.Panel',
	alias: 'widget.albums.Create',
	title: 'Create Song',
	bodyStyle: 'padding: 10px',
	items: [{
		xtype: 'textfield',
		name: 'name',
		fieldLabel: 'Name'
	}]
});