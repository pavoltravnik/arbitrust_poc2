import { sha256, bufferText } from '.././helpers'

// action types
export const INPUT_CHANGE = 'INPUT_CHANGE';
export const INPUT_CHANGE_PARTIES = 'INPUT_CHANGE_PARTIES';
export const ADD_PARTY = 'ADD_PARTY';

export const UPDATE_CRYPTOID = 'UPDATE_CRYPTOID';

// actions
export function handleInputChange(payload) {
  return { type: INPUT_CHANGE, payload };
}

export function handleChange(payload) {
  return { type: INPUT_CHANGE_PARTIES, payload };
}

export function addParty(payload) {
  return { type: ADD_PARTY, payload };
}

export function updateID(payload) {
  return { type: UPDATE_CRYPTOID, payload};
}

export const updateHash = () => async (dispatch, getState) => {
    const { parties, arbitersVersion } = getState().createContractReducer;
    const CryptoID = `${parties.map(party => party.address).sort().join('.')}.${arbitersVersion}`;
    await sha256(bufferText(CryptoID)).then(hashCryptoID => {
      dispatch(updateID({ CryptoID, hashCryptoID }));
    });
}