import { calendarDots } from "@constants/calendar";
import { getRandomItems } from "@utils/common";
import { groupBy } from "lodash";

export const getCardsThatAreDue = (cards) => {
  return cards.filter((card) => {
    return card.dueDate < new Date();
  });
};

export const getSortedDueDates = (cardsThatHaveDues, dir = "asc") => {
  const dates = cardsThatHaveDues.map((card) => card.nextPaymentDueDate);
  return dir === "asc" ? dates : dates.reverse();
};

export const getMarkedDates = (cardsThatHaveDues) => {
  const groupedCards = groupBy(cardsThatHaveDues, "nextPaymentDueDate");

  const markedDates = Object.keys(groupedCards).reduce((acc, date, index) => {
    const cardDetails = groupedCards[date];

    const noOfCards = cardDetails.length;

    const dots = getRandomItems(calendarDots, noOfCards);
    acc[date] = {
      dots,
      marked: true,
    };
    return acc;
  }, {});

  return { markedDates, markedDatesInfo: groupedCards };
};
