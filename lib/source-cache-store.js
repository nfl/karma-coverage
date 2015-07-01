// Source Cache Store
// ==================
//
// Used by lib/reporter

// Dependencies
// ------------

var util = require('util')
var Store = require('istanbul').Store

// Constructor
var SourceCacheStore = module.exports = function (opts) {
  Store.call(this, opts)
  opts = opts || {}
  this.sourceCache = opts.sourceCache
  this.fallback = Store.create('fslookup')
}

// Class Constants
// ---------------
SourceCacheStore.TYPE = 'sourceCacheLookup'

// Inherits from an Istanbul.Store
util.inherits(SourceCacheStore, Store)

// Implement needed methods
Store.mix(SourceCacheStore, {
  keys: function () {
    throw new Error('Not implemented')
  },
  get: function (key) {
    if (this.sourceCache[key]) {
      return this.sourceCache[key];
    }
    return this.fallback.get(key);
  },
  hasKey: function (key) {
    return this.sourceCache.hasOwnProperty(key)
  },
  set: function (key, contents) {
    throw new Error('Not applicable')
  }
})
