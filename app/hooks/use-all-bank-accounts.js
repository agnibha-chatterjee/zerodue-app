import { fetchSourceBankAccounts } from "@api/user-routes";
import { useQuery } from "react-query";

import { useRefetchOnFocus } from "./common/use-refetch-on-focus";

export const useAllBankAccounts = () => {
  const {
    data: bankData,
    isLoading: bankDataLoading,
    refetch: refetchBankAccounts,
  } = useQuery({
    queryKey: "sourceBankAccounts",
    queryFn: fetchSourceBankAccounts,
  });

  const noBankAccounts = !bankData?.length;
  const firstBankAccount = bankData?.[0];

  useRefetchOnFocus(refetchBankAccounts);

  return {
    bankData,
    bankDataLoading,
    noBankAccounts,
    firstBankAccount,
  };
};
