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
  attackstyle: 'aggressive',
  attacktype: 'crush'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "PLAYER_GEAR_CHANGED":
      return {
        ...state,
        ...action.payload
      };
    case "ATTACK_TYPE_CHANGED":
      return {
        ...state,
        ...action.payload
      };
    case "ATTACK_STYLE_CHANGED":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
