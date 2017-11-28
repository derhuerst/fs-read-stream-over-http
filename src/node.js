'use strict'

const fs = require('fs')

const fsReadStreamNode = (path, urlToPath, opt) => fs.createReadStream(path, opt)

module.exports = fsReadStreamNode
