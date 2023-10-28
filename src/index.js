import app_en from "./translations/en/index.json";
import app_vi from "./translations/vi/index.json";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { store } from "./app/store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: { app: app_en },
    vi: { app: app_vi },
  },
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
