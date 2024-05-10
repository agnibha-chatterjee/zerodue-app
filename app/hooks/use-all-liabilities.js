import { fetchAllLiabilities } from "@api/liabilities-api";
import { sortBy } from "lodash";
import { useMemo } from "react";
import { useQuery } from "react-query";

import { useRefetchOnFocus } from "./common/use-refetch-on-focus";

export const useAllLiabilities = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: "allLiabilities",
    queryFn: fetchAllLiabilities,
  });

  const totalAmountOwed =
    data?.creditCardSummary.currentOutstandingBalance ?? 0;

  const totalNoOfCards = data?.creditCardSummary.noOfCreditCards ?? 0;

  const cardsThatHaveDues = useMemo(() => {
    if (!data?.creditCards) {
      return [];
    }
    const cardsWithLiabilities = data?.creditCards.filter(
      (card) => !!card && card.balanceDetails.outstandingBalance > 0
    );

    const sortedCards = sortBy(
      cardsWithLiabilities,
      (card) => new Date(card.statementSummary.dueDate)
    );

    return sortedCards;
  }, [data]);

  const totalLimit =
    data?.creditCardSummary.currentOutstandingBalance +
      data?.creditCardSummary.availableCredit ?? 0;

  useRefetchOnFocus(refetch);

  return {
    allLiabilities: data?.creditCards,
    totalAmountOwed,
    isLoading,
    cardsThatHaveDues,
    totalNoOfCards,
    totalLimit,
  };
};
