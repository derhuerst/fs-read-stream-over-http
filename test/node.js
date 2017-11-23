'use strict'

const test = require('tape')
const sink = require('stream-sink')

require('.') // run generic tests

const mockServer = require('./mock-server')
const fsCreateReadStream = require('../src')

const helloWorld = Buffer.from([
	0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, // 'hello '
	0x77, 0x6f, 0x72, 0x6c, 0x64 // 'world'
])

mockServer.listen(3000, (err) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
})
test.onFinish(() => mockServer.close())

const textUrl = 'http://localhost:3000/text'
const binaryUrl = 'http://localhost:3000/bin'

test('node: works with `utf8` encoding', (t) => {
	const rs = fsCreateReadStream(textUrl, {encoding: 'utf8'})
	rs.once('error', t.ifError)
	rs.pipe(sink())
	.then((data) => {
		t.equal(data, helloWorld.toString('utf8'))
		t.end()
	})
	.catch(t.ifError)
})

test('node: works with `base64` encoding', (t) => {
	const rs = fsCreateReadStream(textUrl, {encoding: 'base64'})
	rs.once('error', t.ifError)
	rs.pipe(sink())
	.then((b64) => {
		t.equal(b64, helloWorld.toString('base64'))
		t.end()
	})
	.catch(t.ifError)
})

test('node: works with `hex` encoding', (t) => {
	const rs = fsCreateReadStream(textUrl, {encoding: 'hex'})
	rs.once('error', t.ifError)
	rs.pipe(sink())
	.then((b64) => {
		t.equal(b64, helloWorld.toString('hex'))
		t.end()
	})
	.catch(t.ifError)
})

test('node: works without encoding', (t) => {
	const chunks = []

	const rs = fsCreateReadStream(binaryUrl, {encoding: null})
	rs.once('error', t.ifError)
	rs.on('data', d => chunks.push(d))

	rs.once('end', () => {
		const bin = Buffer.concat(chunks)
		t.ok(Buffer.isBuffer(bin), 'received item is not a Buffer')
		t.equal(Buffer.compare(bin, helloWorld), 0, 'received buffer is not equal')
		t.end()
	})
})
