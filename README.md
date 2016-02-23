# eli-router

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://travis-ci.org/nameoverflow/eli-router.svg?branch=master)](https://travis-ci.org/nameoverflow/eli-router)


Core of a js router, supporting nested route with multiple URL paramters and handlers.

Can be integrated into Nodejs or Browser framework such as koa and react.

(For koa)[https://github.com/nameoverflow/eli-router]

Used by (eliter)[https://github.com/nameoverflow/eliter]

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


R.route('/admin/::', id => `Id: ${id}`)

// work with asterisk 

R.route('/something/*', () => 'Something')

let matched = R.dispatch('/something/others/blahblah').pop()
Router.handle(matched) // => "Something"


function checkSession() {
    // Function to check session...

}

function showID(id) {
    // Show id to client....
}

R.route('/user', checkSession).route('/::', showID)

R.dispatch('/user/123') // => [[showID, [123]], [checkSession, []]]



```