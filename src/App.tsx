import React from "react";
import { getStore } from "./store/AppStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { AppLayout } from "./appLayout";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";

const store = getStore();
const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppLayout />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
