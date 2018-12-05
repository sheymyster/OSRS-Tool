export default function (state="vorkath", action) {
  switch(action.type) {
    case "MONSTER_CHANGED":
      console.log(action.payload);
      return action.payload
      break;
  }
  return state;
}
