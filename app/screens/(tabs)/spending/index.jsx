import StarsIcon from "@assets/icons/stars.svg";
import FoodIcon from "@assets/images/food.png";
import GroceriesIcon from "@assets/images/groceries.png";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Tooltip } from "@components/Tooltip";
import { IconButton } from "@components/button/icon-btn";
import { DonutChart } from "@components/donut-chart";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { AntDesign, Entypo, EvilIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { scale, verticalScale } from "@utils/scaling-utils";
import { Image, ScrollView, StyleSheet, View } from "react-native";

const mapper = {
  food: FoodIcon,
  groceries: GroceriesIcon,
};

const transactions = [
  {
    merchant: "DoorDash",
    type: "food",
    date: "April 11",
    optimized: false,
    rewardPercentage: 2,
  },
  {
    merchant: "McDonald's",
    type: "food",
    date: "April 13",
    optimized: true,
    rewardPercentage: 4,
  },
  {
    merchant: "Instacart",
    type: "groceries",
    date: "April 15",
    optimized: true,
    rewardPercentage: 5,
  },
  {
    merchant: "Whole Foods",
    type: "groceries",
    date: "April 17",
    optimized: false,
    rewardPercentage: 1,
  },
];

export default function Spending() {
  return (
    <DarkSafeAreaView>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 20 }}>
          <Text size="2xl" style={{ marginBottom: verticalScale(20) }}>
            Spending
          </Text>
          <View
            style={{
              backgroundColor: colors.cardBg,
              padding: scale(10),
              paddingBottom: verticalScale(13),
              borderRadius: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: verticalScale(10),
                paddingLeft: scale(10),
              }}
            >
              <Text size="lg" bold style={{ marginRight: "auto" }}>
                April
              </Text>
              <IconButton
                IconEnd={() => (
                  <Entypo
                    name="chevron-right"
                    size={22}
                    color={colors.inputPlaceholderColor}
                  />
                )}
              >
                <Text color={colors.inputPlaceholderColor}>
                  see detailed breakdown
                </Text>
              </IconButton>
            </View>
            <DonutChart />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: verticalScale(10),
              marginBottom: verticalScale(20),
            }}
          >
            <View
              style={{
                padding: scale(15),
                marginRight: scale(5),
                backgroundColor: colors.cardBg,
                alignItems: "flex-start",
                justifyContent: "center",
                width: "48.5%",
                borderRadius: 8,
              }}
            >
              <Text
                color={colors.inputPlaceholderColor}
                style={{ marginBottom: 3 }}
              >
                Income
              </Text>
              <Text bold size="lg">
                $7000
              </Text>
            </View>
            <View
              style={{
                padding: scale(15),
                marginLeft: scale(5),
                backgroundColor: colors.cardBg,
                alignItems: "flex-start",
                justifyContent: "center",
                width: "47.5%",
                borderRadius: 8,
              }}
            >
              <Text
                color={colors.inputPlaceholderColor}
                style={{ marginBottom: 3 }}
              >
                Expenditure
              </Text>
              <Text bold size="lg">
                $5200
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: verticalScale(20) }}>
            <View
              style={[
                styles.cardRecommendationsContainer,
                { marginBottom: verticalScale(10) },
              ]}
            >
              <Text size="xl" style={styles.mrAuto}>
                Insights
              </Text>
              <IconButton
                IconEnd={() => (
                  <Entypo
                    name="chevron-right"
                    size={26}
                    color={colors.inputPlaceholderColor}
                  />
                )}
              >
                <Text
                  color={colors.inputPlaceholderColor}
                  style={styles.mrn5}
                  size="md"
                >
                  see all{" "}
                </Text>
              </IconButton>
            </View>
            <View
              style={[
                styles.cardRecommendationsContainer,
                {
                  backgroundColor: colors.cardBg,
                  padding: scale(12.5),
                  borderRadius: 8,
                },
              ]}
            >
              <StarsIcon style={{ marginRight: "auto" }} />
              <View style={{ width: scale(235) }}>
                <Text>
                  You could be earning $522 in rewards for your rent payments.{" "}
                  <Text color={colors.link}>Here's how</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.mt20, styles.h100]}>
            <View
              style={[
                styles.cardRecommendationsContainer,
                { marginBottom: verticalScale(10) },
              ]}
            >
              <View
                style={[
                  { flexDirection: "row", alignItems: "center" },
                  styles.mrAuto,
                ]}
              >
                <Text size="xl" style={{ marginRight: scale(5) }}>
                  Transactions
                </Text>
                <Tooltip
                  TooltipContent={
                    <View style={{ padding: 10 }}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={{
                            height: scale(7.5),
                            width: scale(7.5),
                            borderRadius: scale(3.75),
                            backgroundColor: colors.optimizedReward,
                            marginRight: scale(7.5),
                          }}
                        />
                        <Text>
                          Transaction was optimized (i.e. - the right
                          card/reward was used)
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={{
                            height: scale(7.5),
                            width: scale(7.5),
                            borderRadius: scale(3.75),
                            backgroundColor: colors.unoptimizedReward,
                            marginRight: scale(7.5),
                          }}
                        />
                        <Text>
                          There was room for optimization (i.e. - a better
                          card/reward could have been used)
                        </Text>
                      </View>
                    </View>
                  }
                  IconStart={() => (
                    <AntDesign
                      name="infocirlce"
                      size={18}
                      color={colors.inputPlaceholderColor}
                    />
                  )}
                />
              </View>
              <IconButton
                IconEnd={() => (
                  <Entypo
                    name="chevron-right"
                    size={26}
                    color={colors.inputPlaceholderColor}
                  />
                )}
              >
                <Text
                  color={colors.inputPlaceholderColor}
                  style={styles.mrn5}
                  size="md"
                >
                  see all{" "}
                </Text>
              </IconButton>
            </View>
            <View style={styles.h100}>
              <FlashList
                data={transactions}
                estimatedItemSize={5}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.merchant}
                renderItem={({ item }) => {
                  const imgSrc = mapper[item.type];
                  return (
                    <View style={styles.rewardCard}>
                      <View style={styles.rewardSubContainer}>
                        <Image source={imgSrc} style={styles.partnerLogo} />
                        <View>
                          <Text bold>{item.merchant}</Text>
                          <Text color={colors.inputPlaceholderColor}>
                            {item.date}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.cardRecommendationsContainer}>
                        <View
                          style={{
                            alignContent: "center",
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          <Text style={{ textAlign: "center" }}>$21</Text>
                          <Text
                            style={{ textAlign: "center" }}
                            color={
                              item.optimized
                                ? colors.optimizedReward
                                : colors.unoptimizedReward
                            }
                          >
                            {item.rewardPercentage}%
                          </Text>
                        </View>
                        <EvilIcons
                          name="chevron-right"
                          size={36}
                          color={colors.white}
                        />
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </DarkSafeAreaView>
  );
}

const styles = StyleSheet.create({
  mrAuto: { marginRight: "auto" },
  mrn5: { marginRight: scale(-5) },
  p20: { padding: 20 },
  h100: { height: "100%" },
  cardRecommendationsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  partnerLogo: {
    width: scale(45),
    height: scale(45),
    borderRadius: scale(25),
    marginRight: scale(10),
  },
  rewardCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scale(5),
  },
  rewardSubContainer: { flexDirection: "row", alignItems: "center" },
});
