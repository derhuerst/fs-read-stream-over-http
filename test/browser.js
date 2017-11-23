'use strict'

const test = require('tape')
const inBrowser = require('is-in-browser').default
const sink = require('stream-sink')

require('.') // run generic tests

const fsCreateReadStream = require('../src')

const textUrl = 'https://httpbin.org/robots.txt'
const binaryUrl = 'https://httpbin.org/bytes/16'

test('browser: running in the browser', (t) => {
	t.plan(1)
	t.equal(inBrowser, true, 'not running in the browser')
})

test('browser: works with text & `utf8` encoding', (t) => {
	const rs = fsCreateReadStream(textUrl, {encoding: 'utf8'})
	rs.once('error', t.ifError)
	rs.pipe(sink())
	.then((data) => {
		t.equal(typeof data, 'string')
		t.ok(data.length > 0, 'empty')
		t.end()
	})
	.catch(t.ifError)
})

test('browser: works with binary data & without encoding', (t) => {
	const chunks = []

	const rs = fsCreateReadStream(binaryUrl, {encoding: null})
	rs.once('error', t.ifError)
	rs.on('data', d => chunks.push(d))

	rs.once('end', () => {
		const bin = Buffer.concat(chunks)
		t.ok(Buffer.isBuffer(bin), 'received item is not a Buffer')
		t.ok(bin.byteLength > 0, 'empty')
		t.end()
	})
})
