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

export const calculateMagicOtherBonus = (playerGear, voidset, undead, barrowsset, ontask) => {
  let multiplier = 1;
  if (playerGear.neck === "Salve amulet(ei)" && undead) {
    multiplier += 0.2;
  } else if (playerGear.neck === "Salve amulet(i)" && undead) {
    multiplier += 0.15;
  } else if (playerGear.head === "Slayer helmet (i)" || playerGear.head === "Black mask (i)") {
    if (ontask) {
      multiplier += 0.15;
    }
  }
  if (voidset.hasvoid && voidset.settype === 'mage') {
      multiplier += 0.45;
  }
  return multiplier;
}

export const calculateEffectiveMagicLevel = (magicLvl, magicPotionBonus, magicPrayerBonus, magicOtherBonus) => {
  let effectiveMagicLevel;
  effectiveMagicLevel = Math.floor((+magicLvl + magicPotionBonus)*magicPrayerBonus*magicOtherBonus)+8;
  return effectiveMagicLevel;
}

export const calculateMaxMagicHit = (spellBase, magicDamage, voidset, ontask, playerGear, undead) => {
  if (playerGear.neck === "Salve amulet(ei)" && undead) {
    magicDamage += 20;
  } else if (playerGear.neck === "Salve amulet(i)" && undead) {
    magicDamage += 15;
  } else if (playerGear.head === "Slayer helmet (i)" || playerGear.head === "Black mask (i)") {
    if (ontask) {
      magicDamage += 15;
    }
  }
  if (voidset.hasvoid && voidset.settype === 'mage' && voidset.set === 'elite') {
    magicDamage += 2.5;
  }
  let maxHit = Math.floor(spellBase*(1+(magicDamage/100)));
  return maxHit;
}
