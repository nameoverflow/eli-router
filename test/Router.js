"use strict"

const
    Node = require('../lib/RouteNode'),
    Router = require('../'),
    should = require('should'),
    assert = require('assert')



describe('Router', () => {
    describe('.handle(pair, ctx, pre_param)', () => {
        it('Should add certain params in front of URL params', () => {
            let r = new Router()
            r.route('/::/shit').route('::/holy', (pre, fst, snd) => `${pre} oh my ${fst} ${snd}`)

            let result = r.dispatch('/hello/shit/world/holy')
            Router.handle(result.pop(), undefined, ['ouch!']).should.equal("ouch! oh my hello world")
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