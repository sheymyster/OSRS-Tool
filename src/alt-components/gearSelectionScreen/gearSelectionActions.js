export const changePlayerGear = (gearObject) => {
  return {
    type: "PLAYER_GEAR_CHANGED",
    payload: gearObject
  }
};

export const changeSpell = (spellObject) => {
  return {
    type: "SPELL_CHANGED",
    payload: spellObject
  }
};
