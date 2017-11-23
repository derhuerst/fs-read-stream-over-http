'use strict'

const http = require('http')

const respondWithErr = (res, statusCode, statusMsg, msg) => {
	res.statusCode = statusCode
	res.statusMessage = statusMsg
	res.setHeader('content-type', 'text/plain')
	res.end('GET only')
}

const helloWorld = Buffer.from([
	0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, // 'hello '
	0x77, 0x6f, 0x72, 0x6c, 0x64 // 'world'
])

const server = http.createServer((req, res) => {
	if (req.method !== 'GET') {
		return respondWithErr(res, 405, 'Method not allowed', 'GET only')
	}
	if (req.url === '/bin') {
		res.statusCode = 200
		res.statusMessage = 'OK'
		res.setHeader('content-type', 'application/octet-stream')
		res.end(helloWorld)
	} else if (req.url === '/text') {
		res.statusCode = 200
		res.statusMessage = 'OK'
		res.setHeader('content-type', 'text/plain; charset=utf-8')
		res.end(helloWorld)
	} else {
		respondWithErr(res, 404, 'Not found', '/bin and /text only')
	}
})

module.exports = server
