export const navigateToScreen = (screenObject) => {
  return {
    type: "SCREEN_CHANGED",
    payload: screenObject
  }
};
