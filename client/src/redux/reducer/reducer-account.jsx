// import { createStore } from 'redux';

const initialState = {
  name: 'Hunghau',
  birthday: '2020/05/06',
  gender: 'NAM',
  addressId: 12
}
function AccountReducer(state = initialState, action) {
    console.log('reducer', state, action);

    switch (action.type) {
      case 'CHANGE_RADIO':
        // return state;
        return { ...state, ...action.value}
        // return {name: 'CHANGE_RADIO'}
    //   case 'CHANGE_ADDRESS':
    //     return { ...state.account, "addressId": addressId }
      case 'HANDLE_INPUT':
        return { ...state, ...action.value}
      case 'FETCH_ACCOUNT':
        return { ... action.value}
      default:
        return state;
    }
  }

  export default AccountReducer;