const nextTranslate = require('next-translate');

module.exports = {
  reactStrictMode: true,
}

module.exports = nextTranslate({
  webpack: (config, { isServer, webpack }) => {
    return config;
  }
})
