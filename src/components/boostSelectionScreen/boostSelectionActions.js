export const changePrayer = (name, value) => {
  let newPrayerObject = {};
  newPrayerObject[name] = value;
  return {
    type: "PRAYER_CHANGED",
    payload: newPrayerObject
  }
};

export const changePotion = (name, value) => {
  let newPotionObject = {};
  console.log(name);
  newPotionObject[name] = value;
  return {
    type: "POTION_CHANGED",
    payload: newPotionObject
  }
};

export const changeOtherBoost = (name, value) => {
  let newOtherBoostObject = {};
  newOtherBoostObject[name] = value;
  return {
    type: "OTHER_BOOST_CHANGED",
    payload: newOtherBoostObject
  }
};
