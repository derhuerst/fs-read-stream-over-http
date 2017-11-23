'use strict'

const test = require('tape')

const fsCreateReadStream = require('../src')

test('throws on invalid usage', (t) => {
	t.plan(6)

	t.throws(() => fsCreateReadStream('/foo', {flags: 'w'}))
	t.throws(() => fsCreateReadStream('/foo', {fd: 1}))
	t.throws(() => fsCreateReadStream('/foo', {mode: 0o700}))
	t.throws(() => fsCreateReadStream('/foo', {autoClose: true}))
	t.throws(() => fsCreateReadStream('/foo', {start: 100}))
	t.throws(() => fsCreateReadStream('/foo', {end: 100}))
})
