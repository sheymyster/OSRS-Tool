export default function (state=null, action) {
  switch(action.type) {
    case "COLOR_CHANGED":
      return action.payload
      break;
  }
  return state;
}
