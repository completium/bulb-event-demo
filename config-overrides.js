// config-overrides.js
module.exports = function override(config, env) {
  let fallback = {
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer/"),
    crypto: require.resolve("crypto-browserify"),
    events: require.resolve("events/"),
    path: require.resolve("path-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser")
  }
  let resolve = {  fallback, ...config.resolve }
  return { ...config, resolve }
}