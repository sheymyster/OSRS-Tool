const initialState = {
  potions: {
    strength: false,
    attack: false,
    superstrength: false,
    superattack: false,
    combat: false,
    supercombat: false,
    magic: false,
    ranging: false
  },
  prayers: {
    burstofstrength: false,
    superhumanstrength: false,
    ultimatestrength: false,
    clarityofthought: false,
    improvedreflexes: false,
    incrediblereflexes: false,
    sharpeye: false,
    hawkeye: false,
    eagleeye: false,
    mysticwill: false,
    mysticlore: false,
    mysticmight: false,
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
  switch (action.type) {
    case "POTION_CHANGED":
      return {
        ...state,
          potions: {
            ...state.potions,
            ...action.payload
          }
      };
    case "PRAYER_CHANGED":
      return {
        ...state,
          prayers: {
            ...state.prayers,
            ...action.payload
          }
      };
    case "OTHER_BOOST_CHANGED":
      return {
        ...state,
          other: {
            ...state.other,
            ...action.payload
          }
      };
    default:
      return state;
  }
};
