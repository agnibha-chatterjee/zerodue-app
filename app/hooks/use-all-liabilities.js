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

  useRefetchOnFocus(refetch);

  return {
    allLiabilities: data?.liabilities,
    totalAmountOwed,
    isLoading,
    cardsThatHaveDues,
  };
};
