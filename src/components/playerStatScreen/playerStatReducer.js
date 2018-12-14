const initialState = {
  strength: 1,
  attack: 1,
  range: 1,
  magic: 1,
  defense: 1,
  prayer: 1,
  hitpoints: 10,
  construction: 1,
  crafting: 1,
  fletching: 1,
  agility: 1,
  runecrafting: 1,
  hunter: 1,
  herblore: 1,
  mining: 1,
  smithing: 1,
  woodcutting: 1,
  fishing: 1,
  cooking: 1,
  firemaking: 1,
  slayer: 1,
  farming: 1,
  thieving: 1
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "PLAYER_STAT_CHANGED":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
