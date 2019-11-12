import React from 'react';
import ExpenseForm from './ExpenseForm.js';
import { addExpense } from '../actions/expenses';
import { connect } from 'react-redux';

const AddExpensePage = (props) => (
    <div>
        This is my add expense component
        <h1>Add Expense</h1>
        <ExpenseForm
            onSubmit={(expense) => {
                console.log(expense);
                props.history.push('/'); //Redirects to dashboard using client side routing
                props.dispatch(addExpense(expense)); //Dispatches action to store
            }} />
    </div>
);

export default connect()(AddExpensePage);
