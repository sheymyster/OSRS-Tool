const initialState = {
  chosenspell: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SPELL_CHANGED":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
