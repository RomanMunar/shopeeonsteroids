import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./App/store";

// Uncomment to use mock Datas instead of shopee api
// import { makeServer } from "./server";
// const environment = process.env.NODE_ENV;
// if (environment !== "production") {
//   makeServer({ environment });
// }

const render = () => {
  const App = require("./App").App;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
