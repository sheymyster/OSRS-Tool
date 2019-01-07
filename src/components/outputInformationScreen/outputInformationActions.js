export const toggleLock = (newValue) => {
  return {
    type: "LOCK_CHANGED",
    payload: newValue
  }
};

export const lockAllSelections = (allSelections) => {
  return {
    type: "SELECTIONS_LOCKED",
    payload: allSelections
  }
};
