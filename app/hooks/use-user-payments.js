import { fetchAllUserPayments } from "@api/payment-apis";
import { useQuery } from "react-query";

import { useRefetchOnFocus } from "./common/use-refetch-on-focus";

export const useUserPayments = (noBankAccounts) => {
  const {
    data: paymentsData,
    isLoading: paymentsDataLoading,
    refetch,
  } = useQuery({
    queryKey: "allUserPayments",
    queryFn: fetchAllUserPayments,

    enabled: !noBankAccounts,
  });

  useRefetchOnFocus(refetch);

  const userHasNotMadePayments = !paymentsData?.length;

  return {
    paymentsData,
    paymentsDataLoading,
    userHasNotMadePayments,
  };
};
