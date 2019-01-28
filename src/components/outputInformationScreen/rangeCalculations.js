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
}

export const calculateRangeOtherBonus = (playerGear, checkObject) => {
  let multiplier = 1;
  if (playerGear.neck === "Salve amulet(ei)" && checkObject.isundead) {
    multiplier += 0.2;
  } else if (playerGear.neck === "Salve amulet(i)" && checkObject.isundead) {
    multiplier += 0.15;
  } else if (playerGear.head === "Slayer helmet (i)" || playerGear.head === "Black mask (i)") {
    if (checkObject.ontask) {
      multiplier += 0.15;
    }
  }
  if (checkObject.voidset.hasvoid && checkObject.voidset.settype === 'range') {
    if (checkObject.voidset.set === 'elite') {
      multiplier += 0.125;
    } else {
      multiplier += 0.1;
    }
  }
  if (checkObject.dhc) {
    multiplier += 0.3;
  }
  return multiplier;
}

export const calculateEffectiveRangeLevel = (style, rangeLvl, rangePotionBonus, rangePrayerBonus, rangeOtherBonus) => {
  let effectiveRangeLevel;
  let styleBonus;
  if (style === 'accurate') {
    styleBonus = 3
  } else if (style === 'longrange') {
    styleBonus = 1
  } else {
    styleBonus = 0
  }
  effectiveRangeLevel = Math.floor((+rangeLvl + rangePotionBonus)*rangePrayerBonus*rangeOtherBonus)+styleBonus+8;
  return effectiveRangeLevel;
}

export const calculateMaxRangeHit = (effectiveRangeLevel, rangeStrengthBonus, checkObject, rigour) => {
  if (rigour) {
    rangeStrengthBonus = Math.floor(rangeStrengthBonus*1.23);
  }
  let baseDamage = 1.3 + (effectiveRangeLevel/10) + (rangeStrengthBonus/80) + (effectiveRangeLevel*rangeStrengthBonus)/640;
  let maxHit = Math.floor(baseDamage);
  return maxHit;
}
