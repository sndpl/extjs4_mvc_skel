Ext.define('App.view.Viewport', {
    extend:'Ext.container.Viewport',
    requires:[
        'App.view.Header',
        'App.view.Footer',
        'App.view.Navigation'
    ],
    //xtype:'panel',
    layout:'card',
    id:'viewport',
    activeItem:0,
    items:[
        {
            id:'card-0'
        },
        {
            id:'card-1',
            xtype:'panel',
            layout:'border',

            items:[
                {
                    xtype:'view.Header',
                    region:'north',
                    height:50
                },
                {
                    xtype:'view.Navigation',
                    region:'west',
                    width:200
                },
                {
                    //xtype: 'tabpanel',	// <-- this is the render-target "workspace", since it's the center region
                    xtype:'container', // <-- instead of "tabpanel", can also do card-layout
                    layout:'card',
                    region:'center',
                    stateful:true,
                    stateId:'center-card'
                }
            ]
        }


    ]


});