'use strict'

var test = require('tape')
var url = require('url')
var crypto = require('crypto')
var mode = require('./')

test(function (t) {
  var result = mode({
    organization: 'ben',
    report: 'packages',
    key: 'lime',
    secret: 'shhh',
    maxAge: 3600,
    timestamp: 1000,
    params: {
      foo: 'bar'
    }
  })

  var parsed = url.parse(result, true)
  var query = parsed.query

  t.equal(parsed.protocol, 'https:')
  t.equal(parsed.host, 'modeanalytics.com')
  t.equal(parsed.pathname, '/ben/reports/packages/embed')

  t.equal(query.access_key, 'lime')
  t.equal(query.max_age, '3600')
  t.equal(query.timestamp, '1')
  t.equal(query.param_foo, 'bar')

  t.equal(query.signature, hmac('shhh', [
    'GET', // method
    '', // content-type
    '1B2M2Y8AsgTpgAmY7PhCfg==', // md5 of '' as base64
    [
      'https://modeanalytics.com/ben/reports/packages/embed',
      '?access_key=lime',
      '&max_age=3600',
      '&param_foo=bar',
      '&timestamp=1'
    ].join(''), // request url
    '1' // timestamp
  ].join(',')))

  t.end()
})

function hmac (secret, string) {
  return crypto
    .createHmac('sha256', secret)
    .update(string)
    .digest('hex')
}
