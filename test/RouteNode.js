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
            r.route('/fuck/shit').end(() => "ouch!")

            let result = r.dispatch('/fuck/shit')
            Router.handle(result.pop()).should.equal("ouch!")
        })

        it('Should add child with paramter correctly', () => {
            let r = new Router()
            r.route('/::').end((fst, snd) => `oh my ${fst}`)

            let result = r.dispatch('/world')
            Router.handle(result.pop()).should.equal("oh my world")
        })
        it('Should add child with paramter and path correctly', () => {
            let r = new Router()
            r.route('/::/abc').end((fst, snd) => `oh my ${fst}`)

            let result = r.dispatch('/world/abc')
            Router.handle(result.pop()).should.equal("oh my world")
        })


        it('Should add child with multiple paramters and paths correctly', () => {
            let r = new Router()
            r.route('/::/shit/::/holy').end((fst, snd) => `oh my ${fst} ${snd}`)

            let result = r.dispatch('/hello/shit/world/holy')
            Router.handle(result.pop()).should.equal("oh my hello world")
        })

        it('Should work as route chain with single handler', () => {
            let r = new Router()
            r.route('/::/shit').route('::/holy').end((fst, snd) => `oh my ${fst} ${snd}`)

            let result = r.dispatch('/hello/shit/world/holy')
            Router.handle(result.pop()).should.equal("oh my hello world")
        })

        it('Should work as route chain with multiple handler', () => {
            let r = new Router()
            r.route('/::/shit', p => p).route('::/holy').end(p => p)

            let result = r.dispatch('/hello/shit/world/holy')
            Router.handle(result.pop()).should.equal("hello")
            Router.handle(result.pop()).should.equal("world")
        })

    })

})

