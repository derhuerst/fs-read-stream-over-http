'use strict'

const test = require('tape')
const inBrowser = require('is-in-browser').default

test('running in the browser', (t) => {
	t.plan(1)
	t.equal(inBrowser, true, 'not running in the browser')
})

require('.')
