import { fetchAllUserRewards } from "@api/rewards-api";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { FullScreenSkeletonLoader } from "@components/FullScreenSkeletonLoader";
import { TextButton } from "@components/button/text-btn";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { useRefetchOnFocus } from "@hooks/common/use-refetch-on-focus";
import { FlashList } from "@shopify/flash-list";
import { nFormatter } from "@utils/common";
import dayjs from "dayjs";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useQuery } from "react-query";

export default function RewardsScreen() {
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
          <View style={{ alignItems: "center", marginVertical: 45 }}>
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
                <Text size="lg">{totalPoints.symbol}</Text>
              </Text>
              <Text size="md">Points</Text>
            </View>
          </View>

          {totalPoints.value !== "0" ? (
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
              <View style={{ marginTop: 20, height: "100%" }}>
                <Text size="2xl">Activity</Text>
                <FlashList
                  estimatedItemSize={rewards?.length ?? 10}
                  data={rewards}
                  keyExtractor={(item) => item.rewardId}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          padding: 20,
                          height: 140,
                          backgroundColor: colors.cardBg,
                          marginVertical: 10,
                          borderRadius: 8,
                        }}
                      >
                        <Text color={colors.yellow} bold>
                          On{" "}
                          {dayjs(item.createdAt).format(
                            "MMM DD, YYYY - h:mm a"
                          )}
                        </Text>
                        <Text bold style={{ marginVertical: 5 }}>
                          Amount paid: ${item.amount / 100}
                        </Text>
                        <Text bold style={{ marginVertical: 5 }}>
                          Points earned: {item.points}
                        </Text>
                        <View
                          style={{
                            marginVertical: 5,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text color={colors.inputPlaceholderColor}>
                            For: {item.rewardFor}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            </>
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text size="lg" color={colors.inputPlaceholderColor}>
                Head over to the payments table and make your first payment to
                earn a reward
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </DarkSafeAreaView>
  );
}
