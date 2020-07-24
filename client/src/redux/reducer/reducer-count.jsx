

const initialState = {
    count: 0
  };

function CounterReducer(state = initialState, action) {
    console.log('reducer', state, action);
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: (state.count || 0) + 1
            };
        case 'DECREMENT':
            return {
                count: state.count - 1
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
}
export default CounterReducer;