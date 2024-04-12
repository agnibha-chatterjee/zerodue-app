export const getCardsThatAreDue = (cards) => {
  return cards.filter((card) => {
    return card.dueDate < new Date();
  });
};
