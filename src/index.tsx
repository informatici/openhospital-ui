import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { makeServer } from "./mockServer/server";
import * as serviceWorker from "./serviceWorker";
import { store } from "./state/store";

if (process.env.REACT_APP_USE_MOCK_API === "true") {
  console.log("Using mocked api");
  makeServer();
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
