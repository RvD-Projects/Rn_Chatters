module.exports = function (api) {
  api.cache(false);

  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [];

  if (process.env["ENV"] === "prod") {
    //plugins.push(...);
  }

  return {
    presets,
    plugins
  };
}