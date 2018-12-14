export const changePlayerStat = (statName, newValue) => {
  let newStatObject = {};
  newStatObject[statName] = newValue;
  console.log(newValue);
  return {
    type: "PLAYER_STAT_CHANGED",
    payload: newStatObject
  }
};
