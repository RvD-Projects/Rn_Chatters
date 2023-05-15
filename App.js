import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import RootNavigation from "./src/components/navigators/RootNavigation";
import AppScreenNotification from "./src/components/AppScreenNotification";
import SocketIo from "./src/helpers/SocketIo";


function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <SocketIo/>
        <RootNavigation />
        <AppScreenNotification />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
