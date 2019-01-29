export const calculateMaxRangeAttack = (rangeLvl, activePotions, activePrayers, checkObject, style, playerGear, equipmentBonus) => {
  let potionLevels = 0;
  let prayerMultiplier = 1;
  let otherMultiplier = 1;
  let styleBonus = 8;

  if (activePotions.ranging) {
    potionLevels += 4 + Math.floor(rangeLvl*0.1);
  }

  if (activePrayers.rigour) {
    prayerMutliplier += 0.2;
  } else if (activePrayers.eagleeye) {
    prayerMutliplier += 0.15;
  } else if (activePrayers.hawkeye) {
    prayerMutliplier += 0.10;
  } else if (activePrayers.sharpeye) {
    prayerMutliplier += 0.05;
  }

  if (checkObject.voidset.hasvoid && checkObject.voidset.settype === 'range') {
    otherMultiplier += 0.1;
  }

  if (style === 'accurate') {
    styleBonus += 3
  }

  let effectiveLevel = Math.floor((Math.floor((+rangeLvl + potionLevels)*prayerMultiplier)+styleBonus)*otherMultiplier);
  let maxAttackRoll = Math.floor(effectiveLevel*(64+equipmentBonus));

  if (playerGear.neck === "Salve amulet(ei)" && checkObject.isundead) {
    maxAttackRoll *= 1.2;
  } else if (playerGear.neck === "Salve amulet(i)" && checkObject.isundead) {
    maxAttackRoll *= 1.15;
  } else if (playerGear.head === "Slayer helmet (i)" || playerGear.head === "Black mask (i)") {
    if (checkObject.ontask) {
      maxAttackRoll *= 1.15;
    }
  }

  if (checkObject.dhc) {
    maxAttackRoll *= 1.3;
  }

  return maxAttackRoll;
}

export const calculateMaxRangeHit = (rangeLvl, activePotions, activePrayers, checkObject, playerGear, equipmentBonus) => {
  let potionLevels = 0;
  let prayerMultiplier = 1;
  let otherMultiplier = 1;
  let styleBonus = 8;

  if (activePotions.ranging) {
    potionLevels += 4 + Math.floor(rangeLvl*0.1);
  }

  if (activePrayers.rigour) {
    prayerMutliplier += 0.2;
  } else if (activePrayers.eagleeye) {
    prayerMutliplier += 0.15;
  } else if (activePrayers.hawkeye) {
    prayerMutliplier += 0.10;
  } else if (activePrayers.sharpeye) {
    prayerMutliplier += 0.05;
  }

  if (checkObject.voidset.hasvoid && checkObject.voidset.settype === 'range') {
    if (checkObject.voidset.set === 'elite') {
      otherMultiplier += 0.125;
    } else {
      otherMultiplier += 0.1;
    }
  }

  let effectiveLevel = Math.floor((Math.floor((+rangeLvl + potionLevels)*prayerMultiplier)+styleBonus)*otherMultiplier);
  let maxRangeHit = Math.floor(0.5+effectiveLevel*(64+equipmentBonus)/640);

  if (playerGear.neck === "Salve amulet(ei)" && checkObject.isundead) {
    maxRangeHit *= 1.2;
  } else if (playerGear.neck === "Salve amulet(i)" && checkObject.isundead) {
    maxRangeHit *= 1.15;
  } else if (playerGear.head === "Slayer helmet (i)" || playerGear.head === "Black mask (i)") {
    if (checkObject.ontask) {
      maxRangeHit *= 1.15;
    }
  }

  if (checkObject.dhc) {
    maxRangeHit *= 1.3;
  }

  return maxRangeHit
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
