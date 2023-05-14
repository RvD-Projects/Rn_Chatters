import { DefaultTheme } from "@react-navigation/native";

export const Colors = {
  black: "rgb(0,0,0)",
  white: "rgb(255,255,255)",
  primary: "rgb(255, 45, 85)",
  secondary: "rgb(214, 19, 56)",
  disabled: "rgb(214, 19, 56)",
  background: "rgb(242, 242, 242)",
  card: "rgb(255, 255, 255)",
  border: "rgb(199, 199, 204)",
  notification: "rgb(255, 69, 58)"
};

export const Theme = {
  ...DefaultTheme,
  colors: Colors,
  centered: {
    alignItems: "center",
  },
};
