import { fetchAllLiabilities } from "@api/liabilities-api";
import { sortBy } from "lodash";
import { useMemo } from "react";
import { useQuery } from "react-query";

export const useAllLiabilities = () => {
  const { data, isLoading } = useQuery({
    queryKey: "allLiabilities",
    queryFn: fetchAllLiabilities,
  });

  const totalAmountOwed = data?.totalAmountOwed / 100 ?? 0;

  const sampleCards = data?.liabilities?.slice(
    0,
    data?.liabilities?.length - 1
  );

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

  return {
    allLiabilities: data?.liabilities,
    totalAmountOwed,
    sampleCards,
    isLoading,
    cardsThatHaveDues,
  };
};
