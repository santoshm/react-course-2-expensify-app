import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm.js';
import { removeExpense, editExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
    return (
        <div>
            <ExpenseForm
                expense={props.expense}
                onSubmit={(expense) => {
                    console.log('called');
                    console.log(expense);
                    props.dispatch(editExpense(props.expense.id, expense));
                    props.history.push('/');
                }}
            />
            <button onClick={(e) => {
                props.dispatch(removeExpense({id: props.expense.id }));
                props.history.push('/');
            }}>Remove</button>
        </div>
    );
};

//retrieve expense using id param via props and set back to prop
const mapStateToProps = (state, props) => {
    console.log(state);
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id )
    };
};
export default connect(mapStateToProps)(EditExpensePage);
