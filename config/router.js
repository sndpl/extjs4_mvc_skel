// Configure Router
// NB This uses Ext4 beta router, which was removed from the framework.  This caused some controversy on the forums
// Apparantly Ed Spencer didn't like the implementation.  Rumored to return in 4.1...no idea what the API will be like,
// whether it'll accept string urls of form "/controller/action" or {controller: 'name', action: 'index'}.
// I chose to use a method some others on the forum are using, to add the old Ext.util.Router from the beta.  I chose
// to namespace Ext.ux.util.router.  I chose also to attach the instance to Ext.Router.

Ext.require('Ext.ux.router.Router', function () {
    Ext.Router = Ext.create('Ext.ux.router.Router', {});

    // Alias dispatch/redirectTo for convenient use throughout app.
    Ext.dispatch = Ext.Function.bind(Ext.Router.dispatch, Ext.Router);
    Ext.redirectTo = Ext.Function.bind(Ext.Router.redirectTo, Ext.Router);

    Ext.Router.draw(function (map) {
        map.connect(':controller');
        map.connect(':controller/:action');
        map.connect(':controller/:action/:id');
    });
});