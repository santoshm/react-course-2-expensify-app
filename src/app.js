import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import { Provider } from 'react-redux';

import './styles/styles.scss';

const store = configureStore();
store.dispatch(addExpense({description: "Water bill", amount: 20000}));
store.dispatch(addExpense({description: "Rent", amount: 10000}));
store.dispatch(setTextFilter("bill"));

// console.log(store.getState());
const state = store.getState();
console.log(getVisibleExpenses(state.expenses, state.filters));
store.dispatch(setTextFilter("water"));

// setTimeout(() => {
//     store.dispatch(setTextFilter("rent"));
// }, 3000)

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(
    jsx,
    document.getElementById('app')
);
