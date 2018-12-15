export const changePlayerGear = (slot, name) => {
  let newGearObject = {};
  newGearObject[slot] = name;
  return {
    type: "PLAYER_GEAR_CHANGED",
    payload: newGearObject
  }
};
