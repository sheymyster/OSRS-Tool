const initialState = {
  head: '',
  neck: '',
  chest: '',
  leg: '',
  feet: '',
  cape: '',
  ammo: '',
  weapon: '',
  shield: '',
  ring: '',
  hand: '',
  chosenattack: 1
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "PLAYER_GEAR_CHANGED":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
