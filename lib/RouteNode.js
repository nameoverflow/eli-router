"use strict"

module.exports =
/**
 * Node class of a route tree.
 */
class RouteNode {
    /**
     * Create a new node.
     * @param  {string} val The string value of this node
     */
    constructor(val) {
        this.val = val;
    }

    /**
     * Add sub-route of current route node
     * @param  {String}   route_string   Description string of new route, like "/use/::", "::" stand for a param which will be passed to handler function
     * @param  {Function} [handler]      Function to call when route matched
     * @return {RouteNode}               Reference of the end of added route
     *
     * @public
     */
    route(route_string, handler) {
        if (route_string[0] === '/') { route_string = route_string.substr(1) }
        let cur = this,
            route_string_arr = route_string.split('/')
        this._end = false
        for (let ref of route_string_arr) {

            let node_name = ref === '::' ? '$p' : ref

            cur = cur._addChild(node_name)

        }

        if (handler) {
            if (cur.$handler) {
                throw new Error('Add handler to same route MORE THEN ONCE')                
            } else {
                cur.$handler = handler
            }
        }
        cur._end = true
        return cur
    }



    /**
     * Dispatch handler to a url
     * @param  {Array} url_arr        Array producted by spliting a URL string with '/'
     * @param  {Array} handler_params Accumulated URL paramter which will pass to next handler
     * @return {Array}                Current handler stack
     */
    dispatch(url_arr, handler_params) {

        /** @type {String} Current path section of URL */
        const first = url_arr[0],

        /** @type {String} The rest part of URL */
            url_arr_next = url_arr.slice(1),

        /** 
         * If current node has a handler
         * pass accumulated params to it and clear params' stack.
         */
            next_params = this.$handler ? [] : handler_params


        /** If current node is the end of route, return result */
        if (!first && this._end) {
            if (!this.$handler) {
                throw new TypeError('Route end without handler!')
            }
            return [[this.$handler, handler_params]]
        }

        
        


        // /** 
        //  * Try to get the children
        //  * with the same name of current path 
        //  */
        // let path = this.$children.get(first),

        // /** If a children with the same name of current path exists, search into it */
        //     path_res = path && path.dispatch(url_arr_next, next_params)

        // if (path_res) {
        //     if (this.$handler) { path_res.push([this.$handler, handler_params]) }
        //     return path_res

        // /** If not, try to match as a URL paramter */
        // } else {
        //     let param = this.$children.get('$p'),
        //         param_res = param && param.dispatch(url_arr_next, next_params.concat(first))
        //     if (param_res) {
        //         if (this.$handler) { param_res.push([this.$handler, handler_params]) }
        //         return param_res
        //     }
        // }
        
        const matched =
            this._matchChild(first, url_arr_next, next_params)
            || this._matchChild('$p', url_arr_next, next_params.concat(first))
            || this._matchChild('*', [], next_params)

        if (matched) {
            if (this.$handler) {
                matched.push([this.$handler, handler_params])
            }
            return matched
        }
        

        // const asterisk = this.$children.get('*')
        // if (asterisk) {
        //     return [[asterisk.$handler, handler_params]]
        // }

        return null

    }

    /**
     * Add single child to this node
     * @param  {String}    val Name of new node
     * @return {RouteNode}     New child node
     *
     * @private
     */
    _addChild(val) {
        this.$children = this.$children || new Map()

        if (!this.$children.get(val)) {
            this.$children.set(val, new RouteNode(val))
        }

        return this.$children.get(val)
    }

    _matchChild(val, url_arr, params) {
        /** 
         * Try to get the children
         * with the same name of current path 
         */
        const path = this.$children.get(val)

        /** If a children with the same name of current path exists, search into it */
        return path && path.dispatch(url_arr, params)
    }

}
