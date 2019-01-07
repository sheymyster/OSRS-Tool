export const changePlayerGear = (gearObject) => {
  return {
    type: "PLAYER_GEAR_CHANGED",
    payload: gearObject
  }
};

export const changeAttackStyle = (styleObject) => {
  return {
    type: "ATTACK_STYLE_CHANGED",
    payload: styleObject
  }
};

export const changeAttackStance = (attackObject) => {
  return {
    type: "ATTACK_STANCE_CHANGED",
    payload: attackObject
  }
};
