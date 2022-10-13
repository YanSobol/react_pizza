import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
