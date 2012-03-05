Ext.define('App.view.Navigation', {
    extend:'Ext.tree.Panel',
    alias:'widget.view.Navigation',
    floating:false,
    plain:true,
    title:'Menu',
    rootVisible:false,
    autoScroll:true,
    collapsible:true,
    animate:true,
    useArrows:true,
    itemId:'treePanelMain',
    stateEvents:['itemcollapse', 'itemexpand'],
    stateId:'tree-panel-menu-state-id',
    stateful:true,
    id: 'mainMenu',
    getState:function () {
        var nodes = [];
        this.getRootNode().eachChild(function (child) {
            //function to store state of tree recursively
            var storeTreeState = function (node, expandedNodes) {
                if (node.isExpanded() && node.childNodes.length > 0) {
                    expandedNodes.push(node.getPath('id'));
                    node.eachChild(function (child) {
                        storeTreeState(child, expandedNodes);
                    });
                }
            };
            storeTreeState(child, nodes);
        });


        return {
            expandedNodes:nodes
        }
    },
    applyState:function (state) {
        var that = this;
        //read state in from cookie, not from what is passed in
        var cookie = Ext.state.Manager.get('tree-panel-menu-state-id');
        var nodes = cookie.expandedNodes;
        for (var i = 0; i < nodes.length; i++) {
            if (typeof nodes[i] != 'undefined') {
                that.expandPath(nodes[i]);
            }
        }
    },
    dockedItems:[
        {
            xtype:'toolbar',
            items:[
                {
                    text:'Expand all',
                    iconCls:'expand',
                    handler:function () {
                        this.up('#treePanelMain').expandAll();
                    }
                },
                {
                    text:'Collapse all',
                    iconCls:'collapse',
                    handler:function () {
                        this.up('#treePanelMain').collapseAll();
                    }
                }
            ]
        }
    ],
    listeners:{
        // Listener on Tree item click
        itemclick:function (view, record, item, index, evt, options) {
            // Is it a leaf
            if (record.get('leaf')) {
                Ext.History.add(record.raw['action'], true);
            }
        }
    },
    store:Ext.create('Ext.data.TreeStore', {
        // The menu items, add xtypeClass as extra data
       root:{
           expanded:true,
           children:[
               { text:"Dashboard",leaf:true, action:'dashboard'},
               { id:"music", text:"Music", expanded:false,children:[
                   { text:"Artists",leaf:true, action:'artists'},
                   { text:"Albums",leaf:true, action:'albums'},
                   { text:"Songs",leaf:true, action:'songs'}
               ] }

           ]
       }
    })
});