import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { persistStore, persistReducer } from "redux-persist";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./redux/AllReducers";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['authentication','cartItems','totalItemsAmount','wishlist','wishlistTotal'],
};

const persistedReducer = persistReducer(persistConfig, allReducers);
const store = createStore(persistedReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persistor = persistStore(store);

// const store = createStore(allReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
