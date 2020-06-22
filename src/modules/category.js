const categoryList = () => {
  const category = [
    "All",
    "Education",
    "Home",
    "IT",
    "Sport",
    "Vehicles",
    "Other",
  ];
  return category.map((category) => {
    return { key: category, text: category, value: category.toLowerCase() };
  });
};

export default categoryList;
