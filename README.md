# eli-router

Core of a node.js router, supporting nested route with multiple URL paramters and handlers.

Can be integrated into Nodejs or Browser framework such as koa and react.

## USEAGE

``` js
let Router = require('eli-router')

let R = new Router()

// :: stands for a URL paramter.
R.route('/admin/::', id => `Id: ${id}`)

// URL.pathname = '/admin/1234567'

let matched = R.dispatch(URL.pathname).pop()
Router.handle(matched) // => "Id: 1234567"


R.route('/user/::/').route('/messageto/::', (user, target) => `User ${user} send message to id ${target}`)

Router.handle(R.dispatch('/user/123/messageto/456').pop()) // => "User 123 send message to id 456"


function checkSession() {
    // Function to check session...

}

function showID(id) {
    // Show id to client....
}

R.route('/user', checkSession).route('/::', showID)

R.dispatch('/user/123') // => [[showID, [123]], [checkSession, []]]



```