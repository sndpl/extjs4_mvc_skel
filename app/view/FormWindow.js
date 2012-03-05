/**
 * Generic Popup window for containing forms.
 */
Ext.define('App.view.FormWindow', {
    extend:'Ext.window.Window',
    alias:'widget.view.FormWindow',
    layout:'card',
    closeAction:'hide',
    bodyStyle:'border-width:0',
    buttonAlign:'center',

    initComponent:function () {
        Ext.apply(this, {

            listeners:{
                beforeadd:this._onBeforeAdd,
                scope:this
            },
            buttons:[
                {
                    text:'Save',
                    handler:this.onClickSave,
                    scope:this
                },
                {
                    text:'Cancel',
                    handler:this.onClickCancel,
                    scope:this
                }
            ]
        });
        this.callParent();
    },
    /**
     * Ext4 has a bug where events "cardswitch" / "beforecardswitch" are not fired so we have to attach a function seq
     * to #setActiveItem method.  This hack sets the window title to that defined by the child form.  Also re-centers the
     * window based upon the child's dimensions.  We could be a little more intelligent with the title and set it based upon
     * the action being performed (ie: create vs edit)
     */
    afterRender:function () {
        var me = this;
        this.callParent();
        this.layout.setActiveItem = Ext.Function.createSequence(this.layout.setActiveItem, function (item) {
            me.setTitle(item.title);
            me.center();
        });
    },

    /**
     * Disable the header of added Form, since Window provides its own header
     */
    _onBeforeAdd:function (ct, child) {
        if (!this.rendered) {
            this.show();
        }
        child.preventHeader = true;
    },

    onClickSave:function () {
        // Save method here is probably added by form.Scaffold plugin.
        var panel = this.layout.activeItem;
        var path = panel.$className.split('.');
        var controller = path[path.length - 2];
        Ext.dispatch(controller + "/save", {
            sender:panel
        });

        this.hide();

    },
    onClickCancel:function () {
        this.hide();
    }
});