export const changePlayerGear = (gearObject) => {
  return {
    type: "PLAYER_GEAR_CHANGED",
    payload: gearObject
  }
};
