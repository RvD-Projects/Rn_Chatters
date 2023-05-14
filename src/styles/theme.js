import { DefaultTheme } from "@react-navigation/native";

export const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(255, 45, 85)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "black",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
  centered: {
    alignItems: "center",
  },
};
