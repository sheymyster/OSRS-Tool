const initialState = {
 locked: false,
 lockedSelections: {},
 savedSelections: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "LOCK_CHANGED":
      return {
        ...state,
        ...action.payload
      };
    case "SELECTIONS_LOCKED":
      return {
        ...state,
        ...action.payload
      };
    case "SELECTIONS_SAVED":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
