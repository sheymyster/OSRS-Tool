export default function (state="Vorkath", action) {
  switch(action.type) {
    case "MONSTER_CHANGED":
      return action.payload
      break;
  }
  return state;
}
