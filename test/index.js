'use strict'

const test = require('tape')

const fsCreateReadStream = require('..')

const noop = () => {}

test('throws on invalid usage', (t) => {
	t.plan(3 + 6)

	t.throws(() => fsCreateReadStream('/foo', null))
	t.throws(() => fsCreateReadStream('/foo', '/bar'))
	t.throws(() => fsCreateReadStream('/foo', true))

	t.throws(() => fsCreateReadStream('/foo', noop, {flags: 'w'}))
	t.throws(() => fsCreateReadStream('/foo', noop, {fd: 1}))
	t.throws(() => fsCreateReadStream('/foo', noop, {mode: 0o700}))
	t.throws(() => fsCreateReadStream('/foo', noop, {autoClose: true}))
	t.throws(() => fsCreateReadStream('/foo', noop, {start: 100}))
	t.throws(() => fsCreateReadStream('/foo', noop, {end: 100}))
})
