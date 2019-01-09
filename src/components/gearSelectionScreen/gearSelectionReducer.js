const initialState = {
  head: '',
  neck: '',
  chest: '',
  leg: '',
  feet: '',
  cape: '',
  ammo: '',
  weapon: 'Unarmed',
  shield: '',
  ring: '',
  hand: '',
  attackstance: 'aggressive',
  attackstyle: 'slash'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "PLAYER_GEAR_CHANGED":
      return {
        ...state,
        ...action.payload
      };
    case "ATTACK_STYLE_CHANGED":
      return {
        ...state,
        ...action.payload
      };
    case "ATTACK_STANCE_CHANGED":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
