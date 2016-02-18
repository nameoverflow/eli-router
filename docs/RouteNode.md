# Global





* * *

## Class: exports



## Class: exports
Create a new node.

**first**: `String` , Current path section of URL
**url_arr_next**: `String` , The rest part of URL
**next_params**:  , If current node has a handler, pass accumulated params to it and clear params' stack.
**path**:  , Try to get the children with the same name of current path
**path_res**:  , If a children with the same name of current path exists, search into it
### exports.route(route_string, handler) 

Add sub-route of current route node

**Parameters**

**route_string**: `String`, Description string of new route, like "/use/::", "::" stand for a param which will be passed to handler function

**handler**: `function`, Function to call when route matched

**Returns**: `RouteNode`, Reference of the end of added route

### exports.dispatch(url_arr, handler_params) 

Dispatch handler to a url

**Parameters**

**url_arr**: `Array`, Array producted by spliting a URL string with '/'

**handler_params**: `Array`, Accumulated URL paramter which will pass to next handler

**Returns**: `Array`, Current handler stack



* * *










