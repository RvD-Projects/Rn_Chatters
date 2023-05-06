import * as React from "react";
import { Text } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./src/store/store";
import Home from "./src/components/Home";
import ScreenNotification from "./src/components/ScreenNotification";

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Home/>
      </NavigationContainer>
      <ScreenNotification/>
    </Provider>
  );
}

export default App;
