"use strict"

let Node = require('../lib/RouteNode'),
    Router = require('../'),
    should = require('should'),
    assert = require('assert')


describe('Node', () => {
    describe('#constructor', () => {
        it('Should create a new node with a certain val prop', () => {
            let n = new Node('ouch')
            n.val.should.equal('ouch')
        })
    })
    describe('#route', () => {
        it('Should add child route correctly', () => {
            let r = new Router()
            r.route('/fuck/shit', () => "ouch!")

            let result = r.dispatch('/fuck/shit')
            Router.handle(result.pop()).should.equal("ouch!")
        })
        it('Should add child with paramter correctly', () => {
            let r = new Router()
            r.route('/::', (fst, snd) => `oh my ${fst}`)

            let result = r.dispatch('/world')
            Router.handle(result.pop()).should.equal("oh my world")
        })
        it('Should add child with paramter and path correctly', () => {
            let r = new Router()
            r.route('/::/abc', (fst, snd) => `oh my ${fst}`)

            let result = r.dispatch('/world/abc')
            Router.handle(result.pop()).should.equal("oh my world")
        })


        it('Should add child with multiple paramters and paths correctly', () => {
            let r = new Router()
            r.route('/::/shit/::/holy', (fst, snd) => `oh my ${fst} ${snd}`)

            let result = r.dispatch('/hello/shit/world/holy')
            Router.handle(result.pop()).should.equal("oh my hello world")
        })

        it('Should work as route chain with single handler', () => {
            let r = new Router()
            r.route('/::/shit').route('::/holy', (fst, snd) => `oh my ${fst} ${snd}`)

            let result = r.dispatch('/hello/shit/world/holy')
            Router.handle(result.pop()).should.equal("oh my hello world")
        })

        it('Should work as route chain with multiple handler', () => {
            let r = new Router()
            r.route('/::/shit', p => p).route('::/holy', p => p)

            let result = r.dispatch('/hello/shit/world/holy')
            Router.handle(result.pop()).should.equal("hello")
            Router.handle(result.pop()).should.equal("world")
        })

        it('Should work as nest route', () => {
            let r = new Router()
            let R = r.route('/admin', () => "admin ").route('/::')
            R.route('/addUser', id => `id: ${id} is adding user`)
            R.route('/removeUser', id => `id: ${id} is removing user`)

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
    })

    describe('Recursion depth test', () => {
        let R = new Router(),
            r = R,
            url = ''
        it('Should work', () => {
            for (let i = 0; i < 5000; i++) {
                r = r.route('/' + i, () => 'ouch!')
                url += '/' + i
            }

            Boolean(R.dispatch(url)).should.equal(true)
        })
    })

})

