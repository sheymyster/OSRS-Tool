export const calculateMagicPotionBonus = (activePotions) => {
  let addedLevels;
  if (activePotions.magic) {
    addedLevels = 4
  } else {
    addedLevels = 0
  }
  return addedLevels;
}

export const calculateMagicPrayerBonus = (activePrayers) => {
  let multiplier;
  if (activePrayers.augury) {
    multiplier = 1.25
  } else if (activePrayers.mysticmight) {
    multiplier = 1.15
  } else if (activePrayers.mysticlore) {
    multiplier = 1.1
  } else if (activePrayers.mysticwill) {
    multiplier = 1.05
  } else {
    multiplier = 1
  }
  return multiplier;
}

export const calculateEffectiveMagicLevel = () => {

}

export const calculateMaxMagicHit = () => {
  
}