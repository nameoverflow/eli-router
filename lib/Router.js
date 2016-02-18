"use strict"

let Node = require('./RouteNode')


module.exports =
class Router extends Node {
    constructor() {
        super()
    }

    /**
     * Dispatch handler to a URL
     * @param  {String} url URL to dispatch
     * @return {Array}      Current handler stack
     */
    dispatch(url) {
        if (url[0] === '/') { url = url.substr(1) }
        return super.dispatch(url.split('/'), [])
    }

    /**
     * Run handler in container that returned by dispatch
     * @param  {Array}  pair        A pair of [Function, Params]
     * @param  {Object} [ctx]       `this` inside handler function will be setted to this param.
     * @param  {Array}  [pre_param] Extra params which will be passed before url params
     * @return {Mixed}              Return the result of handler function
     */
    static handle(pair, ctx, pre_param) {
        const params = pre_param ? pre_param.concat(pair[1]) : pair[1]
        return pair[0].apply(ctx, params)
    }
}

