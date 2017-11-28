'use strict'

const fs = require('fs')

const valitedateOpt = require('./validate-opt')

const fsReadStreamNode = (path, urlToPath, opt) => {
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

	return fs.createReadStream(path, opt)
}

module.exports = fsReadStreamNode
