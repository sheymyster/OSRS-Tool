
export const calculateMaxRangeAttack = (rangeLvl, activePotions, activePrayers, checkObject, style, playerGear, equipmentBonus) => {
  let potionLevels = 0;
  let prayerMultiplier = 1;
  let otherMultiplier = 1;
  let styleBonus = 8;

  if (activePotions.ranging) {
    potionLevels += 4 + Math.floor(rangeLvl*0.1);
  }

  if (activePrayers.rigour) {
    prayerMultiplier += 0.2;
  } else if (activePrayers.eagleeye) {
    prayerMultiplier += 0.15;
  } else if (activePrayers.hawkeye) {
    prayerMultiplier += 0.10;
  } else if (activePrayers.sharpeye) {
    prayerMultiplier += 0.05;
  }

  if (checkObject.voidset.hasvoid && checkObject.voidset.settype === 'range') {
    otherMultiplier += 0.1;
  }

  if (style === 'accurate') {
    styleBonus += 3
  }

  let effectiveLevel = Math.floor((Math.floor((+rangeLvl + potionLevels)*prayerMultiplier)+styleBonus)*otherMultiplier);
  let maxAttackRoll = Math.floor(effectiveLevel*(64+equipmentBonus));

  if (checkObject.salve.range === 'e') {
    maxAttackRoll = Math.floor(maxAttackRoll * 1.2);
  } else if (checkObject.salve.range === 'n') {
    maxAttackRoll = Math.floor(maxAttackRoll * 1.15);
  } else if (playerGear.head === "Slayer helmet (i)" || playerGear.head === "Black mask (i)") {
    if (checkObject.ontask) {
      maxAttackRoll = Math.floor(maxAttackRoll * 1.15);
    }
  }

  if (checkObject.dhc) {
    maxAttackRoll = Math.floor(maxAttackRoll * 1.3);
  }

  return maxAttackRoll;
};

export const calculateMaxRangeHit = (rangeLvl, activePotions, activePrayers, checkObject, style, playerGear, equipmentBonus) => {
  let potionLevels = 0;
  let prayerMultiplier = 1;
  let otherMultiplier = 1;
  let styleBonus = 8;

  if (activePotions.ranging) {
    potionLevels += 4 + Math.floor(rangeLvl*0.1);
  }

  if (activePrayers.rigour) {
    prayerMultiplier += 0.23;
  } else if (activePrayers.eagleeye) {
    prayerMultiplier += 0.15;
  } else if (activePrayers.hawkeye) {
    prayerMultiplier += 0.10;
  } else if (activePrayers.sharpeye) {
    prayerMultiplier += 0.05;
  }

  if (checkObject.voidset.hasvoid && checkObject.voidset.settype === 'range') {
    if (checkObject.voidset.set === 'elite') {
      otherMultiplier += 0.125;
    } else {
      otherMultiplier += 0.1;
    }
  }

  if (style === 'accurate') {
    styleBonus += 3
  }

  let effectiveLevel = Math.floor((Math.floor((+rangeLvl + potionLevels)*prayerMultiplier)+styleBonus)*otherMultiplier);
  let maxRangeHit = Math.floor(0.5+effectiveLevel*(64+equipmentBonus)/640);

  if (checkObject.salve.range === 'e') {
    maxRangeHit = Math.floor(maxRangeHit * 1.2);
  } else if (checkObject.salve.range === 'n') {
    maxRangeHit = Math.floor(maxRangeHit * 1.15);
  } else if (playerGear.head === "Slayer helmet (i)" || playerGear.head === "Black mask (i)") {
    if (checkObject.ontask) {
      maxRangeHit = Math.floor(maxRangeHit * 1.15);
    }
  }

  if (checkObject.dhc) {
    maxRangeHit = Math.floor(maxRangeHit * 1.3);
  }

  return maxRangeHit;
};


export const calculateRangePotionBonus = (activePotions, rangeLvl) => {
  let addedLevels;
  if (activePotions.ranging) {
    addedLevels = 4 + Math.floor(rangeLvl*0.10)
  } else {
    addedLevels = 0
  }
  return addedLevels;
}

export const calculateRangePrayerBonus = (activePrayers) => {
  let multiplier;
  if (activePrayers.rigour) {
    multiplier = 1.20
  } else if (activePrayers.eagleeye) {
    multiplier = 1.15
  } else if (activePrayers.hawkeye) {
    multiplier = 1.10
  } else if (activePrayers.sharpeye) {
    multiplier = 1.05
  } else {
    multiplier = 1
  }
  return multiplier;
};
