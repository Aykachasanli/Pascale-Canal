import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { MouseProvider } from "./context/MouseContext";
import App from "./App";
import "./assets/scss/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <MouseProvider>
        <App />
      </MouseProvider>
    </Provider>
  </BrowserRouter>
);











