import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./app";
import "./index.css";
import { AnimatePresence } from "framer-motion";
import myReducers from "./redux/reducers";

const store = createStore(
  myReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AnimatePresence>
        <Provider store={store}>
          <App />
        </Provider>
      </AnimatePresence>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
