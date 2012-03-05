Ext.define('Ext.ux.router.Router', {
    requires: ['Ext.ux.router.Route', 'Ext.util.Inflector', 'Ext.util.MixedCollection'],
    mixins: {
        observable: 'Ext.util.Observable'
    },

    constructor: function(config) {
        config = config || {};

        Ext.apply(this, config, {
            defaults: {
                action: 'index'
            }
        });
        this.addEvents('beforedispatch', 'dispatch', 'redirect');

        this.routes = Ext.create('Ext.util.MixedCollection');

        this.mixins.observable.constructor.call(this, config);
    },

	/**
	* @author Chris Scott
	* @param {Ext.app.Application} the application instance
	*/
	registerApp: function(app) {
		this.app = app;
	},

	redirectTo: function(url, params) {
		this.dispatch(url, params);
		this.fireEvent('redirect', this.controller, this.route);
	},
	dispatch: function(url, params) {
        if(url == 'undefined') {
            Ext.History.add('error/notFound', true);
            return;
        }
		var response;
        Ext.log('dispatch url: '+url);
		this.route = this.recognize(url);
		Ext.log('dispatch:', Ext.encode(this.route));
		Ext.apply(this.route, {
			params: params || {}
		});
		// get the specific controller
		this.controller = (this.route.controller === 'app') ? this.app : this.app.getController(Ext.String.capitalize(this.route.controller));
		this.fireEvent('beforedispatch', this.controller, this.route);
		if (this.controller) {
			if (Ext.isFunction(this.controller[this.route.action])) {
				response = this.controller[this.route.action](this.route);
			} else {
				console.info('dispatch: unknown action "' + this.route.action + '" on controller "' + this.route.controller + '"');
			}
		} else {
			console.warn('dispatch: failed to locate controller "' + this.route.controller + '"');
		}
		this.fireEvent('dispatch', this.controller, this.request);
		return response;
	},

    /**
     * Connects a url-based route to a controller/action pair plus additional params
     * @param {String} url The url to recognize
     */
    connect: function(url, params) {
        params = Ext.apply({url: url}, params || {}, this.defaults);
        var route = Ext.create('Ext.ux.router.Route', params);

        this.routes.add(route);

        return route;
    },

    /**
     * Creates a named {@link Ext.util.Route Route}. See intro docs for usage
     * @param {String} name The name of the route to connection
     * @return {Ext.util.Route} The newly-created {@link Ext.util.Route Route} object
     */
    name: function(name, url, params) {
        params = Ext.apply({id: name, url: url}, params || {}, this.defaults);

        var route = Ext.create('Ext.ux.router.Route', params);

        this.routes.add(route);

        return route;
    },

    /**
     * Generates a url for a given route name
     * @param {String} name The name of the route to generate for
     * @param {Object} params Parameters for the url
     * @return {String} The generated url
     */
    generate: function(name, params) {
        var route = this.routes.get(name);

        if (route) {
            return route.urlFor(params);
        }
    },

    /**
     * Creates a set of REST-like local resource urls for a given {@link Ext.data.Model Model}
     * @param {String} model The name of the model to create the REST-like urls for
     * @param {Object} params Optional params object which is copied onto each Route
     */
    resources: function(model, params) {
        params = params || {};

        var Inflector = Ext.util.Inflector,
            format    = Ext.String.format,
            singular  = Inflector.singularize(model.toLowerCase()),
            plural    = Inflector.pluralize(singular),
            actions   = params.actions,
            config;

        Ext.applyIf(params, {
            controller: plural
        });

        if (!actions || actions.list) {
            config = Ext.apply({}, params, {
                action: 'list'
            });

            this.name(plural, plural, config);
        }

        if (!actions || actions.show) {
            config = Ext.apply({}, params, {
                action: 'show'
            });

            this.name(singular, format("{0}/:id", plural), config);
        }

        if (!actions || actions.edit) {
            config = Ext.apply({}, params, {
                action: 'edit'
            });

            this.name(format('edit_{0}', singular), format("{0}/:id/edit", plural), config);
        }

        if (!actions || actions.build) {
            config = Ext.apply({}, params, {
                action: 'build'
            });

            this.name(format('build_{0}', singular), format("{0}/new", plural), config);
        }
    },

    /**
     * Recognizes a url string connected to the Router, return the controller/action pair plus any additional
     * config associated with it
     * @param {String} url The url to recognize
     * @return {Object/undefined} If the url was recognized, the controller and action to call, else undefined
     */
    recognize: function(url) {
        var routes = this.routes.items,
            length = routes.length,
            i, result;

        for (i = 0; i < length; i++) {
            result = routes[i].recognize(url);

            if (result != undefined) {
                return result;
            }
        }
        return undefined;
    },

    /**
     * Removes all defined Routes
     */
    clear: function() {
        this.routes.clear();
    },

    /**
     * Convenience method which just calls the supplied function with the Router instance. Example usage:

		Ext.Router.draw(function(map) {
		    map.connect('activate/:token', {controller: 'users', action: 'activate'});
		    map.connect('home',            {controller: 'index', action: 'home'});
		});

     * @param {Function} fn The fn to call
     */
    draw: function(fn) {
        fn.call(this, this);
    }
});
