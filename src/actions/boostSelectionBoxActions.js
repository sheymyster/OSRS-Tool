export const changeBoost = (category, name, value) => {
  return {
    type: "BOOST_CHANGED",
    payload: {category: category, name: name, value: value}
  }
};
