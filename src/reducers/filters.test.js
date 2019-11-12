import filtersReducer from './filters';
import moment from 'moment';

test('should setup default filters value', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toEqual('amount');
});

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };

    const action = {
        type: 'SORT_BY_DATE'
    }
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toEqual('date');
});

test('should set text filter', () => {
    const text = 'test'
    const state = filtersReducer(undefined, {type: 'SET_TEXT_FILTER', text});
    expect(state.text).toEqual(text);
});

test('should set start date filter', () => {
    const startDate = moment(0);
    const state = filtersReducer(undefined, {type: 'SET_START_DATE', startDate});
    expect(state.startDate).toEqual(startDate);
});

test('should set end date filter', () => {
    const endDate = moment(0);
    const state = filtersReducer(undefined, {type: 'SET_END_DATE', endDate});
    expect(state.endDate).toEqual(endDate);
});
