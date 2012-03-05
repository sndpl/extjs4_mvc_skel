Ext.require('Ext.ux.app.RoutedApplication', function () {
    App = Ext.create('Ext.ux.app.RoutedApplication', {

    appFolder:'app',
    name:'App',
    controllers:[
        'Base',
        'Login',
        'Dashboard',
        'Base',
        'Albums',
        'Artists',
        'Songs'
    ],
    requires:[
        'App.view.Viewport',
        'App.view.FormWindow'
    ],

    launch:function () {
        var me = this;

        // create Viewport instance
        var viewport = Ext.create('App.view.Viewport', {
            controller:this
        });

        // Get a reference to main TabPanel.  This is where top-level controllers will render themselves.
        // eg: this.render("workspace", this.getArtistsIndexView());
        // Think of it as a "render target".
        var workspace = viewport.down('container[region=center]');
        this.addLayout('workspace', workspace);

        // Create Window instance for rendering popup forms upon.  Controllers could render a form upon this shared
        // window instance via:
        // this.render("window", this.getAlbumsCreateView());
        var popup = Ext.create('App.view.FormWindow', {});
        this.addLayout('window', popup);

        Ext.defer(this.hideLoadingScreen, 250);

        Ext.History.init(me.initDispatch, me);
        Ext.History.on('change', me.historyChange, me);

        // Start with dashboard
        token = Ext.History.getToken();
        if (token == null) {

            Ext.History.add('dashboard', true);
//			    Ext.dispatch('dashboard');
        }
    },
    initDispatch:function () {
        var me = this,
            token = Ext.History.getToken();
        Ext.log('Init dispatch with token: ' + token);
        me.historyChange(token);
    },

    historyChange:function (token) {
        var me = this;
        // and check if token is set
        Ext.log('History changed to: ' + token);
        if (token) {

            Ext.dispatch(token);
//                var route = Ext.Router.recognize(token);
//                //me.dispatch(route);
//                console.log(route);
        }
    },
    hideLoadingScreen:function() {
        Ext.get('loading').remove();
        Ext.fly('loading-mask').animate({
            opacity:0,
            remove:true
        });
    }
})
});
