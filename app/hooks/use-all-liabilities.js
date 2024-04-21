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

  const totalAmountOwed = data?.totalAmountOwed / 100 ?? 0;

  const totalNoOfCards = data?.liabilities?.length ?? 0;

  const cardsThatHaveDues = useMemo(() => {
    if (!data?.liabilities) {
      return [];
    }
    const cardsWithLiabilities = data?.liabilities.filter(
      (liability) => !!liability && liability.nextPaymentMinimumAmount > 0
    );

    const sortedCards = sortBy(
      cardsWithLiabilities,
      (card) => new Date(card.nextPaymentDueDate)
    );

    return sortedCards;
  }, [data]);

  const totalLimit =
    data?.liabilities.reduce((acc, card) => {
      let creditLimit = card.creditLimit;
      if (!creditLimit) {
        creditLimit = card.availableCredit;
      }
      return acc + creditLimit / 100;
    }, 0) ?? 0;

  useRefetchOnFocus(refetch);

  return {
    allLiabilities: data?.liabilities,
    totalAmountOwed,
    isLoading,
    cardsThatHaveDues,
    totalNoOfCards,
    totalLimit,
  };
};
