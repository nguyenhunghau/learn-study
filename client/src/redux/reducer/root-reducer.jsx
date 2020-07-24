import { combineReducers } from 'redux'
import AccountReducer from '../reducer/reducer-account';
import CounterReducer from '../reducer/reducer-count';

const RootReducer =  combineReducers({
    account: AccountReducer,
    counter: CounterReducer
});

export default RootReducer;