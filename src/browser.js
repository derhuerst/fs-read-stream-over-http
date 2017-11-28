'use strict'

const {PassThrough} = require('stream')
const parseUrl = require('url').parse
const httpGet = require('http').get
const httpsGet = require('https').get

const valitedateOpt = require('./validate-opt')

const fsCreateReadStream = (path, urlToPath, opt) => {
	// todo: path may also be a `Buffer` or `require('url').URL`
	if ('string' !== typeof path) throw new Error('path must be a string.')

	if ('function' !== typeof urlToPath) {
		throw new Error('urlToPath must be a function.')
	}

	if ('string' === typeof opt) opt = {encoding: opt}
	else if ('object' !== typeof opt || Array.isArray(opt)) {
		throw new Error('opt must be an object or a string.')
	}
	opt = Object.assign({
		flags: 'r',
		encoding: null
	}, opt)
	valitedateOpt(opt)

	const out = new PassThrough({encoding: opt.encoding})
	if (opt.encoding) out.setEncoding(opt.encoding)

	const url = urlToPath(path)
	const {protocol} = parseUrl(url)
	const get = protocol === 'http:' ? httpGet : httpsGet
	get(url, (res) => {
		if (res.statusCode < 200 || res.statusCode >= 300) {
			out.destroy(new Error(res.statusMessage || 'non-2xx HTTP status code'))
		} else {
			res.pipe(out) // todo: propagate errors
		}
	})

	return out
}

module.exports = fsCreateReadStream
