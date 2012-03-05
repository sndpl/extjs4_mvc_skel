Ext.define('App.view.songs.Index', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.songs.Index',
	title: 'Songs Grid',
	html: 'Songs rows here',
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
		items: [{
			text: 'Add',
			handler: function() {
                Ext.History.add('songs/add', true);
			}
		}]
	}]
});