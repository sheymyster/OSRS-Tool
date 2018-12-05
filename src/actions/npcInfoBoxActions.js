export const changeMonster = (newMonster) => {
  return {
    type: "MONSTER_CHANGED",
    payload: newMonster
  }
};
