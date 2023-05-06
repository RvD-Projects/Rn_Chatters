module.exports = function (api) {
  api.cache(false);

  if (process.env["ENV"] === "prod") {
    //plugins.push(...);
  }

  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    ["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env",
      "blocklist": null,
      //"allowlist": null,
      "safe": true,
      "allowUndefined": false,
      "verbose": false
    }]
  ];

  return {
    presets,
    plugins
  };
}