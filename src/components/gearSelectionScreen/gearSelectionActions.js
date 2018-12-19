export const changePlayerGear = (slot, name) => {
  let newGearObject = {};
  newGearObject[slot] = name.value;
  return {
    type: "PLAYER_GEAR_CHANGED",
    payload: newGearObject
  }
};

export const changeAttackStyle = (newStyle) => {
  return {
    type: "ATTACK_STYLE_CHANGED",
    payload: {'attackstyle': newStyle}
  }
};

export const changeAttackStance = (newStance) => {
  return {
    type: "ATTACK_STANCE_CHANGED",
    payload: {'attackstance': newStance}
  }
};
