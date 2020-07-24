import { createStore } from 'redux';

function AccountReducer(state = {}, action) {
    console.log('reducer', state, action);

    switch (action.type) {
      case 'CHANGE_RADIO':
        return { ...state.account, ...action.value}
    //   case 'CHANGE_ADDRESS':
    //     return { ...state.account, "addressId": addressId }
      
      default:
        return state;
    }
  }

  export default AccountReducer;