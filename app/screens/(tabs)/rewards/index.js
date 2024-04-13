import { fetchAllUserRewards } from "@api/rewards-api";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { FullScreenSkeletonLoader } from "@components/FullScreenSkeletonLoader";
import { TextButton } from "@components/button/text-btn";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { nFormatter } from "@utils/common";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useQuery } from "react-query";

export default function RewardsScreen() {
  const { data: rewards, isLoading } = useQuery({
    queryKey: "allUserRewards",
    queryFn: fetchAllUserRewards,
  });

  const totalPoints = useMemo(() => {
    if (!rewards?.length) return 0;
    const total = rewards.reduce((acc, reward) => acc + reward.points, 0);
    return nFormatter(total, 2);
  }, [rewards]);

  if (isLoading) {
    return <FullScreenSkeletonLoader text="Rewards" />;
  }

  return (
    <DarkSafeAreaView setEdgeToTop>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 20 }}>
          <Text size="2xl">Rewards</Text>
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <View
              style={{
                borderColor: colors.rewardPointsContainerBorder,
                borderWidth: 7,
                alignItems: "center",
                justifyContent: "center",
                height: 200,
                width: 200,
                borderRadius: 100,
              }}
            >
              <Text>
                <Text size="3xl">{totalPoints.value}</Text>
                <Text size="xl">{totalPoints.symbol}</Text>
              </Text>
              <Text size="md">Points</Text>
            </View>
          </View>

          {!!totalPoints && (
            <>
              <View
                style={{
                  marginTop: 20,
                  height: 120,
                  backgroundColor: colors.cardBg,
                  padding: 20,
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text bold size="md">
                    NIKE
                  </Text>
                  <Text bold size="md">
                    10% off
                  </Text>
                </View>

                <TextButton style={{ marginTop: 25, alignSelf: "flex-end" }}>
                  <Text style={{ textAlign: "right" }}>Redeem</Text>
                </TextButton>
              </View>
              <View
                style={{
                  marginTop: 20,
                  height: 120,
                  backgroundColor: colors.cardBg,
                  padding: 20,
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text bold size="md">
                    LYFT
                  </Text>
                  <Text bold size="md">
                    10% off on 3 rides
                  </Text>
                </View>

                <TextButton style={{ marginTop: 25, alignSelf: "flex-end" }}>
                  <Text style={{ textAlign: "right" }}>Redeem</Text>
                </TextButton>
              </View>
              <View
                style={{
                  marginTop: 20,
                  height: 120,
                  backgroundColor: colors.cardBg,
                  padding: 20,
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text bold size="md">
                    LYFT
                  </Text>
                  <Text bold size="md">
                    10% off on 3 rides
                  </Text>
                </View>

                <TextButton style={{ marginTop: 25, alignSelf: "flex-end" }}>
                  <Text style={{ textAlign: "right" }}>Redeem</Text>
                </TextButton>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </DarkSafeAreaView>
  );
}
