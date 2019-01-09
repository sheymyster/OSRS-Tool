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

export const calculateEffectiveStrengthLevel = (stance, strLevel, strPotionBonus, strPrayerBonus) => {
  let effectiveStrengthLevel;
  let otherBonus = 1;
  let stanceBonus;
  if (stance === 'aggressive') {
    stanceBonus = 3
  } else if (stance === 'controlled') {
    stanceBonus = 1
  } else {
    stanceBonus = 0
  }
  effectiveStrengthLevel = Math.floor((+strLevel + strPotionBonus)*strPrayerBonus*otherBonus)+stanceBonus;
  return effectiveStrengthLevel;
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

export const calculateEffectiveAttackLevel = (stance, attLvl, attPotionBonus, attPrayerBonus) => {
  let effectiveAttackLevel;
  let otherBonus = 1;
  let stanceBonus;
  if (stance === 'accurate') {
    stanceBonus = 3
  } else if (stance === 'controlled') {
    stanceBonus = 1
  } else {
    stanceBonus = 0
  }
  effectiveAttackLevel = Math.floor((+attLvl + attPotionBonus)*attPrayerBonus*otherBonus)+stanceBonus;
  return effectiveAttackLevel;
}

export const calculateMaxMeleeHit = (effectiveStrengthLevel, strengthBonus) => {
  let baseDamage = 1.3 + (effectiveStrengthLevel/10) + (strengthBonus/80) + (effectiveStrengthLevel*strengthBonus)/640;
  let maxHit = Math.floor(baseDamage);
  return maxHit;
}

export const calculateMaxAttackRoll = (effectiveAttackLevel, equipmentBonus) => {
  let maxAttackRoll = effectiveAttackLevel*(equipmentBonus+64);
  return maxAttackRoll;
}
