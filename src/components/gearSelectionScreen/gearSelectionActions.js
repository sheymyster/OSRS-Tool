export const changePlayerGear = (gearObject) => {
  return {
    type: "PLAYER_GEAR_CHANGED",
    payload: gearObject
  }
};

export const changeAttackType = (typeObject) => {
  return {
    type: "ATTACK_TYPE_CHANGED",
    payload: typeObject
  }
};

export const changeAttackStyle = (styleObject) => {
  return {
    type: "ATTACK_STYLE_CHANGED",
    payload: styleObject
  }
};
