'use strict'

const test = require('tape')
const sink = require('stream-sink')

const fsCreateReadStream = require('../src')

const helloWorld = Buffer.from([
	0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, // 'hello '
	0x77, 0x6f, 0x72, 0x6c, 0x64 // 'world'
])
const helloWorldTxt = 'https://raw.githubusercontent.com/derhuerst/fs-read-stream-over-http/master/test/hello-world.txt'
const helloWorldBin = 'https://raw.githubusercontent.com/derhuerst/fs-read-stream-over-http/master/test/hello-world.jpg'

test('throws on invalid usage', (t) => {
	t.plan(6)

	t.throws(() => fsCreateReadStream('/foo', {flags: 'w'}))
	t.throws(() => fsCreateReadStream('/foo', {fd: 1}))
	t.throws(() => fsCreateReadStream('/foo', {mode: 0o700}))
	t.throws(() => fsCreateReadStream('/foo', {autoClose: true}))
	t.throws(() => fsCreateReadStream('/foo', {start: 100}))
	t.throws(() => fsCreateReadStream('/foo', {end: 100}))
})

test('works with `utf8` encoding', (t) => {
	const rs = fsCreateReadStream(helloWorldTxt, {encoding: 'utf8'})
	rs.once('error', t.ifError)
	rs.pipe(sink())
	.then((data) => {
		t.equal(data, helloWorld.toString('utf8'))
		t.end()
	})
	.catch(t.ifError)
})

test('works with `base64` encoding', (t) => {
	const rs = fsCreateReadStream(helloWorldTxt, {encoding: 'base64'})
	rs.once('error', t.ifError)
	rs.pipe(sink())
	.then((b64) => {
		t.equal(b64, helloWorld.toString('base64'))
		t.end()
	})
	.catch(t.ifError)
})

test('works with `hex` encoding', (t) => {
	const rs = fsCreateReadStream(helloWorldTxt, {encoding: 'hex'})
	rs.once('error', t.ifError)
	rs.pipe(sink())
	.then((b64) => {
		t.equal(b64, helloWorld.toString('hex'))
		t.end()
	})
	.catch(t.ifError)
})

test('works without encoding', (t) => {
	const rs = fsCreateReadStream(helloWorldBin, {encoding: null})
	rs.once('error', t.ifError)
	rs.pipe(sink())
	.then((bin) => {
		t.ok(Buffer.isBuffer(bin), 'received item is not a Buffer')
		t.equal(Buffer.compare(bin, helloWorld), 0, 'received buffer is not equal')
		t.end()
	})
	.catch(t.ifError)
})
