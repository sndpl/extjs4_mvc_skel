Ext.define('App.view.albums.Index', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.albums.Index',
	title: 'Albums Grid',
	html: 'Albums rows here',
    closable: true,
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
		items: [{
			text: 'Add',
			handler: function() {
                Ext.History.add('albums/add', true);

            }
		}]
	}]
});