const initialState = {
  head: '',
  neck: '',
  chest: '',
  legs: '',
  feet: '',
  cape: '',
  ammo: '',
  mainhand: '',
  offhand: '',
  ring: '',
  hands: ''
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
