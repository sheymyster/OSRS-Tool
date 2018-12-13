const initialState = {
  potions: {
    strength: false,
    attack: false,
    superstrength: false,
    superattack: false,
    combat: false,
    supercombat: false,
    magic: false,
    ranging: false,
    overload: false,
    superrange: false
  },
  prayers: {
    strength5: false,
    strength10: false,
    ultimatestrength: false,
    sharpeye: false,
    hawkeye: false,
    eagleeye: false,
    magic5: false,
    magic10: false,
    magic15: false,
    chivalry: false,
    piety: false,
    rigour: false,
    augury: false
  },
  other: {
    ontask: false
  }
};

export default function (state = initialState, action) {
  let newBoosts = Object.assign({}, state);
  switch(action.type) {
    case "BOOST_CHANGED":
      newBoosts[action.payload.category][action.payload.name] = action.payload.value
      return newBoosts;
      break;
  }
  return state;
};
