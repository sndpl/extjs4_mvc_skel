Ext.log = function () {
    console.log.apply(console, arguments);
}

Ext.error = function () {
    console.error.apply(console, arguments);
}

/**
 * wrapper around console.warn for translations this can be turned on to show what
 * text is not yet translated
 */
Ext.translationLog = function () {
//    console.warn.apply(console, arguments);
}