'use strict'

const {PassThrough} = require('stream')
const {get} = require('http')

const notSupportedErr = what => {
	return new Error(what + ' is not supported in the browser implementation of `fs.createReadStream`.')
}

const fsCreateReadStream = (path, opt) => {
	// todo: path may also be a `Buffer` or `require('url').URL`
	if ('string' !== typeof path) throw new Error('path must be a string.')

	if ('string' === typeof opt) opt = {encoding: opt}
	else if ('object' !== typeof opt || Array.isArray(opt)) {
		throw new Error('opt must be an object or a string.')
	}
	opt = Object.assign({
		flags: 'r',
		encoding: null
	}, opt)

	if (opt.flags !== 'r') throw notSupportedErr('A `flags` option other than `r`')
	// todo: verify that opt.encoding is a string
	if (opt.fd) throw notSupportedErr('The `fd` option')
	if (opt.mode) throw notSupportedErr('The `mode` option')
	if (opt.autoClose) throw notSupportedErr('The `autoClose` option')
	// todo: implement these using a `Range` header
	if (opt.start) throw notSupportedErr('The `start` option')
	if (opt.end) throw notSupportedErr('The `end` option')

	const out = new PassThrough()
	if (opt.encoding) out.setEncoding(opt.encoding)

	// todo: map url
	get(path, (res) => {
		res.pipe(out) // todo: propagate errors
	})

	return out
}

module.exports = fsCreateReadStream
