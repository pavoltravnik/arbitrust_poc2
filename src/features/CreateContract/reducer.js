import { INPUT_CHANGE, INPUT_CHANGE_PARTIES, ADD_PARTY } from './actions';

// define the default state
export const defaultState = {
  toggle: true,
  arbitersVersion: '',
  parties: [{address: '', pubKey: ''},{address: '', pubKey: ''}],
  CryptoID: '',
  hashCryptoID: '',
};

export default function createContractReducer(state = defaultState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        arbitersVersion: action.event.arbitersVersion
      }
    case INPUT_CHANGE_PARTIES:
      return {
        ...state,
        parties: updateObjectInArray(state.parties, action.payload)
      }
    case ADD_PARTY:
      return {
        ...state,
        parties: [...state.parties, action.payload]
      }
    default:
      return state;
  }
}

function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.id) {
      return item
    }

    return {
      ...item,
      [action.name]: action.value
    }
  })
}
