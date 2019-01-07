export const changePlayerStat = (statObject) => {
  return {
    type: "PLAYER_STAT_CHANGED",
    payload: statObject
  }
};
