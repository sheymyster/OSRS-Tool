export default function (state= {name: "Vorkath", version: "Post-quest"}, action) {
  switch(action.type) {
    case "MONSTER_CHANGED":
      return {
        ...state,
        ...action.payload
      };
    case "MONSTER_VERSION_CHANGED":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
