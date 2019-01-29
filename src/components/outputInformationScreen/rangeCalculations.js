export const calculateRangeBonuses = (rangeLvl, activePotions, activePrayers, checkObject, rangeStrBonus, style, equipmentRangeAttack) {
  let potionLevels = 0;
  if (activePotions.ranging) {
    potionLevels += 4 + Math.floor(rangeLvl*0.10);
  }
  let prayerAttackBonus = 1;
  let prayerStrengthBonus = 1;
  if (activePrayers.rigour) {
    prayerAttackBonus += 0.2;
    prayerStrengthBonus += 0.23;
  } else if (activePrayers.eagleeye) {
    prayerAttackBonus += 0.15;
    prayerStrengthBonus += 0.15;
  } else if (activePrayers.hawkeye) {
    prayerAttackBonus += 0.10;
    prayerStrengthBonus += 0.10;
  } else if (activePrayers.sharpeye) {
    prayerAttackBonus += 0.05;
    prayerStrengthBonus += 0.05;
  }
  let otherAttackBonus = 1;
  let otherStrengthBonus = 1;
  if (playerGear.neck === "Salve amulet(ei)" && checkObject.isundead) {
    otherAttackBonus += 0.2;
    otherStrengthBonus += 0.2;
  } else if (playerGear.neck === "Salve amulet(i)" && checkObject.isundead) {
    otherAttackBonus += 0.15;
    otherStrengthBonus += 0.15;
  } else if (playerGear.head === "Slayer helmet (i)" || playerGear.head === "Black mask (i)") {
    if (checkObject.ontask) {
      otherAttackBonus += 0.15;
      otherStrengthBonus += 0.15;
    }
  }
  if (checkObject.voidset.hasvoid && checkObject.voidset.settype === 'range') {
    if (checkObject.voidset.set === 'elite') {
      otherAttackBonus += 0.1;
      otherStrengthBonus += 0.125;
    } else {
      otherAttackBonus += 0.1;
      otherStrengthBonus += 0.1;
    }
  }
  if (checkObject.dhc) {
    otherAttackBonus += 0.3;
    otherStrengthBonus += 0.3;
  }
  let styleBonus = 8;
  if (style === 'accurate') {
    styleBonus += 3
  }
  let effectiveRangeLevel = Math.floor(((+rangeLvl + potionLevels)*prayerAttackBonus)+styleBonus)*otherAttackBonus
}

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

export const calculateRangeOtherAttackBonus = (playerGear, checkObject) => {
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

export const calculateRangeOtherStrengthBonus = (playerGear, checkObject) => {
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
  effectiveRangeLevel = (((+rangeLvl + rangePotionBonus)*rangePrayerBonus) + 8)*rangeOtherBonus
  effectiveRangeLevel = Math.floor((+rangeLvl + rangePotionBonus)*rangePrayerBonus*rangeOtherBonus)+styleBonus+8;
  return effectiveRangeLevel;
}

export const calculateEffectiveRangeStrength = (rangeLvl, rangePotionBonus, rangePrayerBonus, rangeOtherBonus) => {
  let effectiveRangeStrength =
}

export const calculateMaxRangeHit = (effectiveRangeLevel, rangeStrengthBonus, checkObject, rigour) => {
  if (rigour) {
    rangeStrengthBonus = Math.floor(rangeStrengthBonus*1.23);
  }
  let baseDamage = 1.3 + (effectiveRangeLevel/10) + (rangeStrengthBonus/80) + (effectiveRangeLevel*rangeStrengthBonus)/640;
  let maxHit = Math.floor(baseDamage);
  return maxHit;
}
