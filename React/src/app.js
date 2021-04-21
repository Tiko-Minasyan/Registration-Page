import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore"
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import setupAxios from './axios/setup';

const store = configureStore();

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

setupAxios();
ReactDOM.render(jsx, document.getElementById("app"));
