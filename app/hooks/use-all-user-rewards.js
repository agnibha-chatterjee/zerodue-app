import { fetchAllUserRewards } from "@api/rewards-api";
import { nFormatter } from "@utils/common";
import { useMemo } from "react";
import { useQuery } from "react-query";

import { useRefetchOnFocus } from "./common/use-refetch-on-focus";

export const useAllUserRewards = () => {
  const {
    data: rewards,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "allUserRewards",
    queryFn: fetchAllUserRewards,
  });

  useRefetchOnFocus(refetch);

  const totalPoints = useMemo(() => {
    if (!rewards?.length) return { value: "0", symbol: "" };
    const total = rewards.reduce((acc, reward) => acc + reward.points, 0);
    return nFormatter(total, 2);
  }, [rewards]);

  return {
    isLoading,
    totalPoints,
    rewards,
  };
};
