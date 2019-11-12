import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';
import { Link } from 'react-router-dom'

const ExpenseListItem = ({id, description, amount, created_at, dispatch}) => (
    <tr>
        <td><Link to={`/edit/${id}`}>{description}</Link></td>
        <td>{description}</td>
        <td>{amount}</td>
        <td>{created_at}</td>
        <td><button onClick={(e) => {
            dispatch(removeExpense({ id }));
        }}>Remove</button></td>
    </tr>
);

export default connect()(ExpenseListItem);
