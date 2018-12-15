export const changePlayerStat = (statName, newValue) => {
  let newStatObject = {};
  newStatObject[statName] = newValue;
  return {
    type: "PLAYER_STAT_CHANGED",
    payload: newStatObject
  }
};
