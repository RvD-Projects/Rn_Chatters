const ios = require("@react-native-community/cli-platform-ios");
const android = require("@react-native-community/cli-platform-android");
const windows = require("@react-native-windows/cli");

module.exports = {
  platforms: {
    ios: {
      projectConfig: ios.projectConfig,
      dependencyConfig: ios.dependencyConfig,
    },
    android: {
      projectConfig: android.projectConfig,
      dependencyConfig: android.dependencyConfig,
    },
    windows: {
      projectConfig: windows.projectConfig,
      dependencyConfig: windows.dependencyConfig,
    },
  },
  assets: [
    "./assets",
  ],
  iosAssets: [
    "./assets",
  ],
  androidAssets: [
    "./assets",
  ],
};
