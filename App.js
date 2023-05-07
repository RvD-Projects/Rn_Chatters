import * as React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./src/store/store";
import Home from "./src/components/Home";
import AppScreenNotification from "./src/components/AppScreenNotification";

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Home/>
      </NavigationContainer>
      <AppScreenNotification/>
    </Provider>
  );
}

export default App;
