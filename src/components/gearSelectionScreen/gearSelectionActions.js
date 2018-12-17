export const changePlayerGear = (slot, name) => {
  let newGearObject = {};
  newGearObject[slot] = name;
  console.log(newGearObject);
  return {
    type: "PLAYER_GEAR_CHANGED",
    payload: newGearObject
  }
};
