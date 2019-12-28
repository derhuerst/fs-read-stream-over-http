# fs-read-stream-over-http

**Deprecated in favor of [`stream-http`](https://github.com/jhiesey/stream-http).**

---

**Isomorphic [`fs.createReadStream`](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options).** Delegates to core [`fs`](https://nodejs.org/api/fs.html) in Node, uses the [Browserify](http://browserify.org/) [`http` shim](https://github.com/jhiesey/stream-http) in the browser.

[![npm version](https://img.shields.io/npm/v/fs-read-stream-over-http.svg)](https://www.npmjs.com/package/fs-read-stream-over-http)
[![build status](https://api.travis-ci.org/derhuerst/fs-read-stream-over-http.svg?branch=master)](https://travis-ci.org/derhuerst/fs-read-stream-over-http)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/fs-read-stream-over-http.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install fs-read-stream-over-http
```


## Usage

You need to provide a function that maps local paths such as `./foo/bar.txt` to a URL:

```js
const path = require('path')

const pathToUrl = local => 'https://example.org' + path.resolve('/', local)
```

It will be used in the browser, to fetch the file over HTTP. In Node, the local path will be used.

```js
const fsCreateReadStream = require('fs-read-stream-over-http')

fsCreateReadStream('/foo/bar.txt', pathToUrl, {encoding: 'utf8'})
.on('data', console.log)
.once('end', () => console.log('end!'))
```

`fsCreateReadStream` will throw when called with options that can't be fulfilled in the browser (e.g. `flags`). Otherwise it will return a [stream](https://nodejs.org/api/stream.html#stream_readable_streams) of decoded data.


## Contributing

If you have a question or have difficulties using `fs-read-stream-over-http`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/fs-read-stream-over-http/issues).
