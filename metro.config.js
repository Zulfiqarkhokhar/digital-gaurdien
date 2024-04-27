const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
module.exports = {
  server: {
    port: 8080, // Change the port number as desired
  },
};

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
