export const changeMonster = (newMonster) => {
  return {
    type: "MONSTER_CHANGED",
    payload: {name: newMonster}
  }
};

export const changeMonsterVersion = (newVersion) => {
  return {
    type: "MONSTER_VERSION_CHANGED",
    payload: {version: newVersion}
  }
};
