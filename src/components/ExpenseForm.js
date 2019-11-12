//Set this up as a stateful React component with local state and bind each field to the value of this state. Also update this state when the form value changes.
import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
const now  = moment();
console.log(now.format('MMM Do, YYYY'));


export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note:  props.expense ? props.expense.note : '',
            amount:  props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value; //If you don't use this as a separate constant you get an error.
        this.setState(() => ({ description }))
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }))
    };
    onDateChange = (createdAt) => { //The moment gets passed
        this.setState(() => ({ createdAt }))
    }
    onFocusChange = ({ focused }) => { //Destructured
        this.setState(() => ({ calendarFocused: focused }))
    }
    onAmountChange = (e) => {
        const amount = e.target.value;

        if(!amount || amount.match(/^\d{1,}(\.)?\d{0,2}$/)){ //Note the amount format validation to two decimal places.
            this.setState(() => ({
                amount
            }));
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            const error = 'Description and amount are mandatory';
            this.setState(() => (
                {
                    error
                }
            ))
        }
        else{
            this.setState(() => (
                {
                    error: ''
                }
            ));
            this.props.onSubmit(
                {
                    description: this.state.description,
                    amount: parseFloat(this.state.amount, 10) * 100,
                    createdAt: this.state.createdAt.valueOf(),//converts to unix timestamp
                    note: this.state.note
                }
            );
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                        autoFocus
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={(day) => {return false}}
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    />
                    {this.props.expense && <button>Edit Expense</button>}
                    {!this.props.expense && <button>Add Expense</button>}
                </form>
            </div>
        )
    }
}
