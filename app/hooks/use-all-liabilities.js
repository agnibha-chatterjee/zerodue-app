import { fetchAllLiabilities } from "@api/liabilities-api";
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
    return data?.liabilities.filter(
      (liability) => !!liability && liability.nextPaymentMinimumAmount > 0
    );
  }, [data]);

  return {
    allLiabilities: data?.liabilities,
    totalAmountOwed,
    sampleCards,
    isLoading,
    cardsThatHaveDues,
  };
};
