import { addExpense, editExpense, removeExpense } from './expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({id: 'abc123'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        expense: {
            id: 'abc123'
        }
    })
});

test('should setup editExpense object correctly', () => {
    const id = 'abc123';
    const updates = {amount: 100, description: 'new description'}
    const action = editExpense(id, updates);
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
    })
});

test('should set up add expense action object with provided values', () =>{
    const expenseData = {
        description: 'Rent',
        amount: 100000,
        createdAt: 1000,
        note: "This was last month's rent"
    }
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should set up add expense action object with default values', () =>{
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            amount: 0,
            createdAt: 0,
            note: '',
            id: expect.any(String)
        }
    });
});
