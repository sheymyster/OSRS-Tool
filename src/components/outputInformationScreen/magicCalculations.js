export const calculateMaxMagicAttack = (magicLvl, activePotions, activePrayers, activeOtherBoosts, checkObject, style, playerGear, equipmentBonus) => {
  let potionLevels = 0;
  let prayerMultiplier = 1;
  let otherMultiplier = 1;
  let styleBonus = 8;

  if (activeOtherBoosts.imbuedheart) {
    potionLevels += 1 + Math.floor(magicLvl*0.1);
  } else if (activePotions.magic) {
    potionLevels += 4;
  }

  if (activePrayers.augury) {
    prayerMultiplier += 0.25
  } else if (activePrayers.mysticmight) {
    prayerMultiplier += 0.15
  } else if (activePrayers.mysticlore) {
    prayerMultiplier += 0.1
  } else if (activePrayers.mysticwill) {
    prayerMultiplier += 0.05
  }

  if (checkObject.voidset.hasvoid === true && checkObject.voidset.settype === 'magic') {
    otherMultiplier += 0.45;
  }

  let effectiveLevel = Math.floor((Math.floor((+magicLvl + potionLevels)*prayerMultiplier)+styleBonus)*otherMultiplier);
  let maxAttackRoll = Math.floor(effectiveLevel*(64+equipmentBonus));

  if (checkObject.salve.mage === 'e') {
    maxAttackRoll = Math.floor(maxAttackRoll * 1.2);
  } else if (checkObject.salve.mage === 'n') {
    maxAttackRoll = Math.floor(maxAttackRoll * 1.15);
  } else if (playerGear.head === "Slayer helmet (i)" || playerGear.head === "Black mask (i)") {
    if (checkObject.ontask) {
      maxAttackRoll = Math.floor(maxAttackRoll * 1.16666667);
    }
  }

  return maxAttackRoll;
};

export const calculateMaxMagicHit = (magicLvl, activePotions, activeOtherBoosts, spellBase, equipmentBonus, checkObject, playerGear) => {
  let potionLevels = 0;
  let otherMultiplier = 1;
  let slayerDamageMultiplier = 1;
  let styleBonus = 8;
  let magicDamageMultiplier = 1+(equipmentBonus/100);

  if (activeOtherBoosts.imbuedheart) {
    potionLevels += 1 + Math.floor(magicLvl*0.1);
  } else if (activePotions.magic) {
    potionLevels += 4;
  }

  if (playerGear.weapon === "Trident of the seas" || playerGear.weapon === "Trident of the swamp" ||
      playerGear.weapon === "Sanguinesti staff") {
    let boostedBase = spellBase + Math.floor(((magicLvl + potionLevels) - 75)/3);
    if (boostedBase >= spellBase) {
      spellBase = boostedBase;
    }
    if (playerGear.weapon === "Trident of the swamp" && spellBase === 34) {
      spellBase -= 1;
    } else if (playerGear.weapon === "Sanguinesti staff" && spellBase === 35) {
      spellBase -= 1;
    }
  }

  let maxMagicHit = spellBase;

  if (checkObject.voidset.hasvoid && checkObject.voidset.settype === 'magic') {
    if (checkObject.voidset.set === 'elite') {
      magicDamageMultiplier += 0.025;
    }
  }

  if (checkObject.salve.mage === 'e') {
    magicDamageMultiplier += 0.2;
  } else if (checkObject.salve.mage === 'n') {
    magicDamageMultiplier += 0.15;
  } else if (playerGear.head === "Slayer helmet (i)" || playerGear.head === "Black mask (i)") {
    if (checkObject.ontask) {
      slayerDamageMultiplier += 0.15;
    }
  }

  maxMagicHit = Math.floor(maxMagicHit * magicDamageMultiplier);
  maxMagicHit = Math.floor(maxMagicHit * slayerDamageMultiplier);

  return maxMagicHit;
};


export const calculateMagicPotionBonus = (activePotions, activeOtherBoosts, magicLvl) => {
  let addedLevels;
  if (activeOtherBoosts.imbuedheart) {
    addedLevels = 1 + (Math.floor(magicLvl/10));
  } else if (activePotions.magic) {
    addedLevels = 4
  } else {
    addedLevels = 0
  }
  return addedLevels;
};

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
};
