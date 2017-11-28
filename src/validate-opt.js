'use strict'

const notSupportedErr = what => {
	return new Error(what + ' is not supported in the browser implementation of `fs.createReadStream`.')
}

const validateOpt = (opt) => {
	if (opt.flags !== 'r') throw notSupportedErr('A `flags` option other than `r`')
	// todo: verify that opt.encoding is a string
	if (opt.fd) throw notSupportedErr('The `fd` option')
	if (opt.mode) throw notSupportedErr('The `mode` option')
	if (opt.autoClose) throw notSupportedErr('The `autoClose` option')
	// todo: implement these using a `Range` header
	if (opt.start) throw notSupportedErr('The `start` option')
	if (opt.end) throw notSupportedErr('The `end` option')
}

module.exports = validateOpt
