import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//Add Expense
const addExpense = (
    {
        description  = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }

})

//Remove expense action generator
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    expense: {
        id: id
    }
});

//Edit expense
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

//Expenses reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            // return state.concat(action.expense);
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id != action.expense.id)
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id){
                    return  {...expense, ...action.updates}
                }
                else{
                    return expense;
                }
            })
        default:
            return state;
    }
};

//Filters
//Action generators
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

//Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
};

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = (typeof startDate !== 'number') || expense.createdAt >= startDate;
        const endDateMatch =  (typeof endDate !== 'number') || expense.createdAt <= endDate;
        const textMatch = (typeof text !== 'string') || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    });
}

//Store creation
const store = createStore(
    combineReducers(
        {
            expenses: expensesReducer,
            filters: filtersReducer,
        }
    )
);

// console.log(store.getState());

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
})

const expenseOneAction = store.dispatch(addExpense({description: 'rent', amount: 300, createdAt: 1000}));
const expenseTwoAction = store.dispatch(addExpense({description: 'coffee', amount: 100, createdAt: -1000}));

// // console.log(expenseOne);
// store.dispatch(removeExpense({id: expenseOneAction.expense.id}))

// store.dispatch(editExpense(expenseTwoAction.expense.id, {amount: 500}))

// store.dispatch(setTextFilter('ren'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

store.dispatch(setStartDate(-250));
store.dispatch(setStartDate());
store.dispatch(setEndDate(1250));