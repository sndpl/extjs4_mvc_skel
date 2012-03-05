Ext.define('App.controller.Login', {
    extend:'App.controller.Base',
    init:function () {
        this.control({
            'viewport':{
                render:this.index
            },
            'button[action=login]':{
                click:this.login
            },
            '#loginwindow textfield':{
                specialkey:this.keyenter
            },
            'button[action=logout]':{
                click:this.logout
            }
        });
    },
    views:[
        'Login', 'Viewport'
    ],
    refs:[
        {
            ref:'viewport',
            selector:'viewport'
        },
        {
            ref:'loginwindow',
            selector:'loginwindow'
        }
    ],

    index:function () {
        console.log('Index function');
        var loginWin = Ext.create('App.view.Login');
        loginWin.show();

        this.login();
    },

    login:function () {
        console.log('Login button');
        var win = Ext.getCmp('loginwindow');
        var form = Ext.getCmp('loginform');
        var values = form.getValues();

        var lay = this.getViewport().getLayout();

        //@todo this hould ofcourse be better implemented with at least a check with the webservices if somebody is realy logged in
        //but for now just check the cookies
        if(Ext.util.Cookies.get('username') != '' && Ext.util.Cookies.get('username') != null && Ext.util.Cookies.get('token') != '' && Ext.util.Cookies.get('token') != null)
        {
            lay.setActiveItem(1);
            win.hide();
            Ext.getCmp('loggedin').update('Logged in as:' + ' <b>' + Ext.util.Cookies.get('username') + '</b>');
            return;
        }
        lay.setActiveItem(0);


        if (values.userName == 'admin') {
            var lay = this.getViewport().getLayout();
            lay.setActiveItem(1);
            win.hide();
            Ext.util.Cookies.set('username', values.userName);
            Ext.util.Cookies.set('token', 'some token');
            Ext.getCmp('loggedin').update('Logged in as: ' + ' <b>' + values.userName + '</b>');
        }

    },
    keyenter:function (item, event) {
        if (event.getKey() == event.ENTER) {
            this.login();
        }

    },
    logout:function (button) {
        Ext.log('Logout user')
        var lay = this.getViewport().getLayout();
        lay.setActiveItem(0);
        var win = Ext.getCmp('loginwindow');
        win.show();

        Ext.util.Cookies.clear('username');
        Ext.util.Cookies.clear('token');
    }
});
