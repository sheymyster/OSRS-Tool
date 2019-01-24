const initialState = {
  currentscreen: 'main'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SCREEN_CHANGED":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
