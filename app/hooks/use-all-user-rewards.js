import { fetchAllUserRewards } from "@api/rewards-api";
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
    if (!rewards?.length) return 0;
    const total = rewards.reduce((acc, reward) => acc + reward.points, 0);
    return total;
  }, [rewards]);

  const areThereRewards = rewards?.length > 0;

  return {
    isLoading,
    totalPoints,
    rewards,
    areThereRewards,
  };
};
