Ext.define('App.controller.Dashboard', {
    extend:'App.controller.Base',
    views:[
        'dashboard.Index'
    ],
    /**
     * Everybody that is logged in shoul see he dashboard so return true for has rights
     */
    hasRights: function() {
        return true;
    }
});