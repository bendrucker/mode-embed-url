'use strict'

var assert = require('assert')
var url = require('url')
var crypto = require('crypto')
var sort = require('sort-keys')

module.exports = mode

function mode (options) {
  assert(options, 'options are required')
  assert.equal(typeof options.organization, 'string', 'organization is required')
  assert.equal(typeof options.report, 'string', 'report is required')
  assert.equal(typeof options.key, 'string', 'access key is required')
  assert.equal(typeof options.secret, 'string', 'access secret is required')
  assert.equal(typeof options.maxAge, 'number', 'maxAge is required')
  assert.equal(typeof options.params, 'object', 'params are required')

  var timestamp = Math.floor((options.timestamp || Date.now()) / 1000)

  var embed = url.format({
    protocol: 'https:',
    host: 'modeanalytics.com',
    pathname: [options.organization, 'reports', options.report, 'embed'].join('/'),
    query: query(options.params, {
      access_key: options.key,
      max_age: options.maxAge,
      timestamp
    })
  })

  return embed + '&signature=' + signature({
    url: embed,
    secret: options.secret,
    timestamp
  })
}

function query (params, data) {
  return sort(Object.keys(params).reduce(function (acc, key) {
    acc['param_' + key] = encodeURIComponent(params[key])
    return acc
  }, Object.assign({}, data)))
}

var defaults = {
  verb: 'GET',
  contentType: '',
  hash: crypto.createHash('md5').update('').digest('base64')
}

function signature (options) {
  var data = [
    defaults.verb,
    defaults.contentType,
    defaults.hash,
    options.url,
    options.timestamp
  ]

  return crypto
    .createHmac('sha256', options.secret)
    .update(data.join(','))
    .digest('hex')
}
