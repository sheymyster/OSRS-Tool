export const changePrayer = (prayerObject) => {
  return {
    type: "PRAYER_CHANGED",
    payload: prayerObject
  }
};

export const changePotion = (potionObject) => {
  return {
    type: "POTION_CHANGED",
    payload: potionObject
  }
};

export const changeOtherBoost = (otherBoostObject) => {
  return {
    type: "OTHER_BOOST_CHANGED",
    payload: otherBoostObject
  }
};
