const undeadNPCs = ['Aberrant spectre', 'Deviant spectre', 'Ankou', 'Banshee', 'Crawling hand', 'Ghast', 'Ghost', 'Mummy',
'Revenant imp', 'Revenant goblin', 'revenant pyrefiend', 'Revenant hobgoblin', 'Revenant cyclops',
'Revenant demon', 'Revenant ork', 'Revenant dark beast', 'Revenant knight', 'Revenant dragon', 'Shade',
'Skeleton', 'Skogre', 'Summoned zombie', 'Tortured soul', 'Undead chicken', 'Undead cow', 'Undead one',
'Zogre', 'Zombified spawn', 'Zombie', 'Zombie rat', "Vet'ion", 'Pestilent Bloat', 'Tree spirit', 'Mi-Gor',
'Treus Dayth', 'Nazastarool', 'Slash Bash', 'Ulfric', 'Vorkath', 'Monkey Zombie', 'Zombie pirate'];

const dragonNPCs = ['Green dragon', 'Brutal green dragon', 'Blue dragon', 'Brutal blue dragon',
'Red dragon', 'Brutal red dragon', 'Black dragon', 'Brutal black dragon', 'Bronze dragon', 'Iron dragon',
'Steel dragon', 'Mithril dragon', 'Adamant dragon', 'Rune dragon', 'Vorkath', 'King black dragon', 'Great Olm',
'Spitting Wyvern', 'Skeletal Wyvern', 'Taloned Wyvern', 'Long-tailed Wyvern', 'Anceint Wyvern', 'Lava dragon'];

export const checkVoidSet = (playerGear) => {
  let checkObject = {};
  if (
    playerGear.chest === "Void knight top" &&
    playerGear.leg === "Void knight robe" &&
    playerGear.hand === "Void knight gloves"
  ) {
    if (playerGear.head === "Void melee helm") {
      checkObject.hasvoid = true;
      checkObject.set = 'standard';
      checkObject.settype = 'melee';
    } else if (playerGear.head === "Void mage helm") {
      checkObject.hasvoid = true;
      checkObject.set = 'standard';
      checkObject.settype = 'mage';
    } else if (playerGear.head === "Void ranger helm") {
      checkObject.hasvoid = true;
      checkObject.set = 'standard';
      checkObject.settype = 'range';
    }
  } else if (
    playerGear.chest === "Elite void top" &&
    playerGear.leg === "Elite void robe" &&
    playerGear.hand === "Void knight gloves"
  ) {
    if (playerGear.head === "Void melee helm") {
      checkObject.hasvoid = true;
      checkObject.set = 'elite';
      checkObject.settype = 'melee';
    } else if (playerGear.head === "Void mage helm") {
      checkObject.hasvoid = true;
      checkObject.set = 'elite';
      checkObject.settype = 'mage';
    } else if (playerGear.head === "Void ranger helm") {
      checkObject.hasvoid = true;
      checkObject.set = 'elite';
      checkObject.settype = 'range';
    }
  } else {
    checkObject.hasvoid = false;
    checkObject.set = 'x';
    checkObject.settype = 'x';
  }
  return checkObject;
}

export const checkUndead = (npc) => {
  if (undeadNPCs.indexOf(npc.split("_").join(" ")) > -1 ) {
    return true;
  }
}

export const checkBarrows = (playerGear) => {
  let checkObject = {};
  if (
    playerGear.head === "Dharok's helm" &&
    playerGear.chest === "Dharok's platebody" &&
    playerGear.leg === "Dharok's platelegs" &&
    playerGear.weapon === "Dharok's greataxe"
  ) {
    checkObject.hasbarrows = true;
    checkObject.set = "Dharok's";
  } else if (
    playerGear.head === "Verac's helm" &&
    playerGear.chest === "Verac's brassard" &&
    playerGear.leg === "Verac's plateskirt" &&
    playerGear.weapon === "Verac's flail"
  ) {
    checkObject.hasbarrows = true;
    checkObject.set = "Verac's";
  } else if (
    playerGear.head === "Karil's coif" &&
    playerGear.chest === "Karil's leathertop" &&
    playerGear.leg === "Karil's leatherskirt" &&
    playerGear.weapon === "Karil's crossbow"
  ) {
    checkObject.hasbarrows = true;
    checkObject.set = "Karil's";
  } else if (
    playerGear.head === "Torag's helm" &&
    playerGear.chest === "Torag's plagebody" &&
    playerGear.leg === "Torag's platelegs" &&
    playerGear.weapon === "Torag's hammers"
  ) {
    checkObject.hasbarrows = true;
    checkObject.set = "Torag's";
  } else if (
    playerGear.head === "Guthan's helm" &&
    playerGear.chest === "Guthan's platebody" &&
    playerGear.leg === "Guthan's chainskirt" &&
    playerGear.weapon === "Guthan's warspear"
  ) {
    checkObject.hasbarrows = true;
    checkObject.set = "Guthan's";
  } else if (
    playerGear.head === "Ahrim's hood" &&
    playerGear.chest === "Ahrim's robetop" &&
    playerGear.leg === "Ahrim's robeskirt" &&
    playerGear.weapon === "Ahrim's staff"
  ) {
    checkObject.hasbarrows = true;
    checkObject.set = "Ahrim's";
  } else {
    checkObject.hasbarrows = false;
    checkObject.set = 'x';
  }
  if (playerGear.neck === "Amulet of the damned") {
    checkObject.amuletofdamned = true;
  } else {
    checkObject.amuletofdamned = false;
  }
  return checkObject;
}

export const checkSalve = (playerGear, isundead) => {
  let checkObject = {};
  if (isundead) {
    if (playerGear.neck === "Salve amulet(ei)") {
      checkObject.melee = 'e';
      checkObject.range = 'e';
      checkObject.mage = 'e';
    } else if (playerGear.neck === "Salve amulet (e)") {
      checkObject.melee = 'e';
      checkObject.range = 'x';
      checkObject.mage = 'x';
    } else if (playerGear.neck === "Salve amulet(i)") {
      checkObject.melee = 'n';
      checkObject.range = 'n';
      checkObject.mage = 'n';
    } else if (playerGear.neck === "Salve amulet") {
      checkObject.melee = 'n';
      checkObject.range = 'x';
      checkObject.mage = 'x';
    } else {
      checkObject.melee = 'x';
      checkObject.range = 'x';
      checkObject.mage = 'x';
    }
  }
  return checkObject;
}

export const checkDHC = (playerGear, npc) => {
  if (playerGear.weapon === 'Dragon hunter crossbow' && dragonNPCs.indexOf(npc.split("_").join(" ")) > -1 ) {
    return true;
  }
}

export const checkDHL = (playerGear, npc) => {
  if (playerGear.weapon === 'Dragon hunter lance' && dragonNPCs.indexOf(npc.split("_").join(" ")) > -1 ) {
    return true;
  }
}
