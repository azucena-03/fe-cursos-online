import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { mainReducer } from "./contexto/reducers";
import { initialState } from "./contexto/reducers/sesionUsuarioReducer";
import { StateProvider } from "./contexto/store";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
