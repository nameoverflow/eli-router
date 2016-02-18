# Global





* * *

## Class: exports



## Class: exports


### exports.dispatch(url) 

Dispatch handler to a URL

**Parameters**

**url**: `String`, URL to dispatch

**Returns**: `Array`, Current handler stack

### exports.handle(pair, ctx) 

Run handler in container that returned by dispatch

**Parameters**

**pair**: `Array`, A pair of [Function, Params]

**ctx**: `Object`, `this` inside handler function will be setted to this param.

**Returns**: `Mixed`, Return the result of handler function



* * *










