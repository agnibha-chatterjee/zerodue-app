import { calendarDots } from "@constants/calendar";
import { getRandomItems } from "@utils/common";
import { groupBy, sortBy } from "lodash";

export const getCardsThatAreDue = (cards) => {
  return cards.filter((card) => {
    return card.dueDate < new Date();
  });
};

export const getSortedDueDates = (cardsThatAreDue, dir = "asc") => {
  const dueDates = cardsThatAreDue.map(
    (card) => new Date(card.nextPaymentDueDate)
  );
  const sortedDates = sortBy(dueDates);

  const justDates = sortedDates.map((date) => {
    const isoString = date.toISOString();
    return isoString.split("T")[0];
  });

  return dir === "asc" ? justDates : justDates.reverse();
};

export const getMarkedDates = (cardsThatHaveDues) => {
  const groupedCards = groupBy(cardsThatHaveDues, "nextPaymentDueDate");

  const markedDates = Object.keys(groupedCards).reduce((acc, date) => {
    const cardDetails = groupedCards[date];

    const noOfCards = cardDetails.length;

    const dots = getRandomItems(calendarDots, noOfCards);
    acc[date] = {
      dots,
      marked: true,
    };
    return acc;
  }, {});

  return markedDates;
};
