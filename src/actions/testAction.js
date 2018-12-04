function randomColor() {
  var color;
  let randomNumber = Math.floor(Math.random()*5);
  switch(randomNumber) {
    case 0:
      color = "red"
      break;
    case 1:
      color = "blue"
      break;
    case 2:
      color = "purple"
      break;
    case 3:
      color = "orange"
      break;
    case 4:
      color = "white"
      break;
    default:
      color = "no color selected";
  }
  console.log(color);
  return (color);
};

export const changeColor = () => {
  return {
    type: "COLOR_CHANGED",
    payload: randomColor()
  }
};
