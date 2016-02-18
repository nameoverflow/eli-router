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
     * @param  {Array}  pair   A pair of [Function, Params]
     * @param  {Object} [ctx]  `this` inside handler function will be setted to this param.
     * @return {Mixed}         Return the result of handler function
     */
    static handle(pair, ctx) {
        return pair[0].apply(ctx, pair[1])
    }
}

