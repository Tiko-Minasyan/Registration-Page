import { createStore, combineReducers } from "redux";

export default () => {
	const store = createStore(
		// combineReducers({
		//   expenses: expensesReduser,
		//   filters: filtersReduser,
		// }),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

	return store;
};
