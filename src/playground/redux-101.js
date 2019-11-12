import { createStore } from 'redux';

const store = createStore((state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
            return {
                count: action.count
            }
        default:
            return state;
    }
});

const unsubscribe = store.subscribe(() => {
    console.log(store.getState()); //This gets called every time the state of the store changes
})

const incrementCount = ({incrementBy} = {incrementBy: 1}) => ({
    type: 'INCREMENT',
    incrementBy: incrementBy
})

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy: decrementBy
})

const resetCount = () => ({
    type: 'RESET'
})

const setCount = ({count} = {}) => ({
    type: 'SET',
    count: count
})

store.dispatch(incrementCount({incrementBy: 2}));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy: 10}));

store.dispatch(setCount({
    count: 101
}));
