export const getPointsByFilter = (points, filterType) => {
  //TODO сделать фильтрацию
  return points.slice().filter((point) => point.city === `Moscow`);
};
