export const calculateMaxMeleeAttack = (attLvl, activePotions, activePrayers, checkObject, style, playerGear, equipmentBonus) => {
  let potionLevels = 0;
  let prayerMultiplier = 1;
  let otherMultiplier = 1;
  let styleBonus = 8;

  if (activePotions.superattack || activePotions.supercombat) {
    potionLevels += 5 + Math.floor(attLvl*0.15)
  } else if (activePotions.attack || activePotions.combat) {
    potionLevels += 3 + Math.floor(attLvl*0.10)
  }

  if (activePrayers.piety) {
    prayerMultiplier += 0.20
  } else if (activePrayers.chivalry) {
    prayerMultiplier += 0.15
  } else if (activePrayers.incrediblereflexes) {
    prayerMultiplier += 0.15
  } else if (activePrayers.improvedreflexes) {
    prayerMultiplier += 0.1
  } else if (activePrayers.clarityofthought) {
    prayerMultiplier += 0.05
  }

  if (checkObject.voidset.hasvoid === true && checkObject.voidset.settype === 'melee') {
    otherMultiplier += 0.1;
  }

  if (style === 'accurate') {
    styleBonus += 3
  } else if (style === 'controlled') {
    styleBonus += 1
  }

  let effectiveLevel = Math.floor((Math.floor((+attLvl + potionLevels)*prayerMultiplier)+styleBonus)*otherMultiplier);
  let maxAttackRoll = Math.floor(effectiveLevel*(64+equipmentBonus));

  if (checkObject.salve.melee === 'e') {
    maxAttackRoll = Math.floor(maxAttackRoll * 1.2);
  } else if (checkObject.salve.melee === 'n') {
    maxAttackRoll = Math.floor(maxAttackRoll * 1.15);
  } else if (playerGear.head === "Slayer helmet (i)" || playerGear.head === "Black mask (i)" || playerGear.head === "Slayer Helmet" || playerGear.head === "Black mask") {
    if (checkObject.ontask) {
      maxAttackRoll = Math.floor(maxAttackRoll * 1.16666667);
    }
  }

  if (checkObject.dhl) {
    maxAttackRoll = Math.floor(maxAttackRoll * 1.2);
  }

  return maxAttackRoll;
};

export const calculateMaxMeleeHit = (strLvl, activePotions, activePrayers, checkObject, style, playerGear, equipmentBonus) => {
  let potionLevels = 0;
  let prayerMultiplier = 1;
  let otherMultiplier = 1;
  let styleBonus = 8;

  if (activePotions.superstrength || activePotions.supercombat) {
    potionLevels += 5 + Math.floor(strLvl*0.15)
  } else if (activePotions.strength || activePotions.combat) {
    potionLevels += 3 + Math.floor(strLvl*0.10)
  }

  if (activePrayers.piety) {
    prayerMultiplier += 0.23
  } else if (activePrayers.chivalry) {
    prayerMultiplier += 0.18
  } else if (activePrayers.ultimatestrength) {
    prayerMultiplier += 0.15
  } else if (activePrayers.superhumanstrength) {
    prayerMultiplier += 0.1
  } else if (activePrayers.burstofstrength) {
    prayerMultiplier += 0.05
  }

  if (checkObject.voidset.hasvoid === true && checkObject.voidset.settype === 'melee') {
    otherMultiplier += 0.1;
  }

  if (style === 'aggressive') {
    styleBonus += 3
  } else if (style === 'controlled') {
    styleBonus += 1
  }

  let effectiveLevel = Math.floor((Math.floor((+strLvl + potionLevels)*prayerMultiplier)+styleBonus)*otherMultiplier);
  let maxMeleeHit = Math.floor(0.5+effectiveLevel*(64+equipmentBonus)/640);

  if (checkObject.salve.melee === 'e') {
    maxMeleeHit = Math.floor(maxMeleeHit * 1.2);
  } else if (checkObject.salve.melee === 'n') {
    maxMeleeHit = Math.floor(maxMeleeHit * 1.15);
  } else if (playerGear.head === "Slayer helmet (i)" || playerGear.head === "Black mask (i)" || playerGear.head === "Slayer Helmet" || playerGear.head === "Black mask") {
    if (checkObject.ontask) {
      maxMeleeHit = Math.floor(maxMeleeHit * 1.16666667);
    }
  }

  if (checkObject.dhl) {
    maxMeleeHit = Math.floor(maxMeleeHit * 1.2);
  }

  return maxMeleeHit;
};

export const calculateStrengthPotionBonus = (activePotions, strLvl) => {
  let addedLevels;
  if (activePotions.superstrength || activePotions.supercombat) {
    addedLevels = 5 + Math.floor(strLvl*0.15)
  } else if (activePotions.strength || activePotions.combat) {
    addedLevels = 3 + Math.floor(strLvl*0.10)
  } else {
    addedLevels = 0
  }
  return addedLevels;
}

export const calculateStrengthPrayerBonus = (activePrayers) => {
  let multiplier;
  if (activePrayers.piety) {
    multiplier = 1.23
  } else if (activePrayers.chivalry) {
    multiplier = 1.18
  } else if (activePrayers.ultimatestrength) {
    multiplier = 1.15
  } else if (activePrayers.superhumanstrength) {
    multiplier = 1.1
  } else if (activePrayers.burstofstrength) {
    multiplier = 1.05
  } else {
    multiplier = 1
  }
  return multiplier;
}

export const calculateAttackPotionBonus = (activePotions, attLvl) => {
  let addedLevels;
  if (activePotions.superattack || activePotions.supercombat) {
    addedLevels = 5 + Math.floor(attLvl*0.15)
  } else if (activePotions.attack || activePotions.combat) {
    addedLevels = 3 + Math.floor(attLvl*0.10)
  } else {
    addedLevels = 0
  }
  return addedLevels;
}

export const calculateAttackPrayerBonus = (activePrayers) => {
  let multiplier;
  if (activePrayers.piety) {
    multiplier = 1.20
  } else if (activePrayers.chivalry) {
    multiplier = 1.15
  } else if (activePrayers.incrediblereflexes) {
    multiplier = 1.15
  } else if (activePrayers.improvedreflexes) {
    multiplier = 1.1
  } else if (activePrayers.clarityofthought) {
    multiplier = 1.05
  } else {
    multiplier = 1
  }
  return multiplier;
}
