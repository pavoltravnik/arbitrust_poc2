// action types
export const INPUT_CHANGE = 'INPUT_CHANGE';
export const INPUT_CHANGE_PARTIES = 'INPUT_CHANGE_PARTIES';
export const ADD_PARTY = 'ADD_PARTY';


// actions
export function handleInputChange(event) {
  return { type: INPUT_CHANGE, event };
}

export function handleChange(payload) {
  return { type: INPUT_CHANGE_PARTIES, payload };
}

export function addParty(payload) {
  return { type: ADD_PARTY, payload };
}
