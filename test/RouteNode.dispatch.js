"use strict"

let Node = require('../lib/RouteNode'),
    Router = require('../'),
    should = require('should'),
    assert = require('assert')


describe('Node', () => {
    describe('#dispatch', () => {

        it('Should return null', () => {
            let r = new Router()
            r.route('/fuck/shit').end(() => "ouch!")

            let result = r.dispatch('/fuck/omg')

            ;(result === null).should.be.true
        })


        it('Should give handler when it be the end of route', () => {
            let r = new Router()
            const m = () => 789
            const h1 = () => 123
            const h2 = () => 435
            r.route('/::/shit', m).route('::/holy').end(h1)
            r.route('/::/shit').end(h2)
            let result = r.dispatch('/hello/shit')
            Router.handle(result.pop()).should.equal(435)
        })
        it('Should give middleware when it not be the end of route', () => {
            let r = new Router()
            const m = () => 789
            const h1 = () => 123
            const h2 = () => 435
            r.route('/::/shit', m).route('::/holy').end(h1)
            r.route('/::/shit').end(h2)
            let result = r.dispatch('/hello/shit/world/holy')
            Router.handle(result.pop()).should.equal(789)
        })


        it('Should work as nest route', () => {
            let r = new Router()
            let R = r.route('/admin', () => "admin ").route('/::')
            R.route('/addUser').end(id => `id: ${id} is adding user`)
            R.route('/removeUser').end(id => `id: ${id} is removing user`)

            let r1 = r.dispatch('/admin/123/addUser')
            let r2 = r.dispatch('/admin/456/removeUser')
            let doSomethingAdmin = res => {
                let str = ''
                while (res.length) {
                    str += Router.handle(res.pop())
                }
                return str
            }
            doSomethingAdmin(r1).should.equal("admin id: 123 is adding user")
            doSomethingAdmin(r2).should.equal("admin id: 456 is removing user")
        })

        it('Should work with asterisk route', () => {
            let r = new Router()
            r.route('/admin/*').end(() => "test")

            let result = r.dispatch('/admin/shit/world/holy')
            Router.handle(result.pop()).should.equal("test")
        })
    })

})

