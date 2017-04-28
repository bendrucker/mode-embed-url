# mode-embed-url [![Build Status](https://travis-ci.org/bendrucker/mode-embed-url.svg?branch=master)](https://travis-ci.org/bendrucker/mode-embed-url)

> Create [Mode Analytics white label embed](https://help.modeanalytics.com/articles/setting-up-white-label-embeds/) URLs


## Install

```
$ npm install --save mode-embed-url
```


## Usage

```js
var mode = require('mode-embed-url')

mode({
  organization: 'ben',
  report: 'packages',
  accessKey: 'letmein',
  maxAge: 3600,
  timestamp: 1,
  params: {
    foo: 'bar'
  }
})
//=> https://modeanalytics.com/...
```

## API

#### `mode(options)` -> `string`

##### options

###### organization

*Required*  
Type: `string`

The organization name.

###### report

*Required*  
Type: `string`

The report name.

###### key

*Required*  
Type: `string`

The access key.

###### secret

*Required*  
Type: `string`

The access secret.

###### maxAge

*Required*  
Type: `number`

The duration for which that the embed URL will be usable.

###### params

*Required*  
Type: `object`

One or more parameters.

###### timestamp

Type: `number`  
Default: `Date.now()`

The current timestamp.


## License

MIT © [Ben Drucker](http://bendrucker.me)
