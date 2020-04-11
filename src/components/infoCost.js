const getCostValue = (days) => {
  const allDayItems = [].concat(...Array.from(days.values()));
  return allDayItems.reduce(function (sum, current) {
    return sum + current.price;
  }, 0);
};

export const createInfoCostTemplate = (days) => {
  const costValue = getCostValue(days);
  return (
    `Total: &euro;&nbsp;<span class="trip-info__cost-value">${costValue}</span></p>`
  );
};
