export const changePlayerGear = (slot, name) => {
  let newGearObject = {};
  newGearObject[slot] = name.value;
  return {
    type: "PLAYER_GEAR_CHANGED",
    payload: newGearObject
  }
};
