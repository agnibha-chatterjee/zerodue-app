import Asterisk from "@assets/icons/asterisk.svg";
import StarsIcon from "@assets/icons/stars.svg";
import AmazonLogo from "@assets/images/partners/amazon.png";
import DoorDashLogo from "@assets/images/partners/doordash.png";
import NikeLogo from "@assets/images/partners/nike.png";
import WholeFoodsLogo from "@assets/images/partners/wholefoods.webp";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { IconButton } from "@components/button/icon-btn";
import { TextButton } from "@components/button/text-btn";
import { CardsList } from "@components/cards-list";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { sampleArray } from "@constants/misc";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { useAllLiabilities } from "@hooks/use-all-liabilities";
import { useAllUserRewards } from "@hooks/use-all-user-rewards";
import { FlashList } from "@shopify/flash-list";
import { scale, verticalScale } from "@utils/scaling-utils";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { ScrollView, View, StyleSheet, Image } from "react-native";

const fixedRewards = [
  {
    merchant: "DoorDash",
    reward: "10% off",
    partnerLogo: DoorDashLogo,
  },
  {
    merchant: "Nike",
    reward: "$200 off",
    partnerLogo: NikeLogo,
  },
  {
    merchant: "Amazon",
    reward: "Prime Membership for 3 months",
    partnerLogo: AmazonLogo,
  },
  {
    merchant: "Whole Foods",
    reward: "30% cashback",
    partnerLogo: WholeFoodsLogo,
  },
];

export default function HomeScreen() {
  const {
    cardsThatHaveDues,
    isLoading,
    totalAmountOwed,
    totalNoOfCards,
    totalLimit,
  } = useAllLiabilities();

  const { rewards, areThereRewards } = useAllUserRewards();

  return (
    <DarkSafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.p20}>
          <View style={styles.cardRecommendationsContainer}>
            <Asterisk
              style={{
                marginBottom: verticalScale(7.5),
                marginRight: scale(5),
              }}
            />
            <Text size="2xl" style={styles.mb15}>
              At a glance
            </Text>
          </View>

          <View
            style={{
              marginBottom: verticalScale(20),
            }}
          >
            <View
              style={[
                styles.cardRecommendationsContainer,
                { marginBottom: verticalScale(10) },
              ]}
            >
              <Text size="xl" style={styles.mrAuto}>
                Cards ({totalNoOfCards})
              </Text>
              <IconButton
                onPress={() => router.navigate("screens/(tabs)/cards")}
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
            <CardsList
              isLoading={isLoading}
              cards={cardsThatHaveDues.length ? cardsThatHaveDues : sampleArray}
              height={verticalScale(175)}
              horizontal
            />
          </View>

          <View style={{ marginBottom: verticalScale(20) }}>
            <View
              style={[
                styles.cardRecommendationsContainer,
                { marginBottom: verticalScale(10) },
              ]}
            >
              <Text size="xl" style={styles.mrAuto}>
                Usage
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
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              horizontal
            >
              <>
                {isLoading ? (
                  <View
                    style={{
                      height: verticalScale(125),
                      width: scale(160),
                      marginRight: scale(15),
                    }}
                  >
                    <Skeleton height="100%" width="100%" />
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: colors.cardBg,
                      height: verticalScale(125),
                      width: scale(160),
                      marginRight: scale(15),
                      borderRadius: scale(10),
                      padding: scale(15),
                    }}
                  >
                    <Text bold size="md" color={colors.teal}>
                      Usage
                    </Text>
                    <Text bold size="xl">
                      ${totalAmountOwed}
                    </Text>
                    <Text>out of ${totalLimit}</Text>
                    <Text>across {totalNoOfCards} cards</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginTop: verticalScale(10),
                      }}
                    >
                      <TextButton>
                        <Text>Details</Text>
                      </TextButton>
                    </View>
                  </View>
                )}
              </>
              <>
                {isLoading ? (
                  <Skeleton height={verticalScale(125)} width={scale(160)} />
                ) : (
                  <View
                    style={{
                      backgroundColor: colors.cardBg,
                      height: verticalScale(125),
                      width: scale(160),
                      marginRight: scale(15),
                      borderRadius: scale(10),
                      padding: scale(15),
                    }}
                  >
                    <Text bold size="md" color={colors.yellow}>
                      Coming up
                    </Text>
                    <Text bold size="xl">
                      $3192
                    </Text>
                    <Text>minimum payments</Text>
                    <Text>starting May 5</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginTop: verticalScale(10),
                      }}
                    >
                      <TextButton>
                        <Text>Details</Text>
                      </TextButton>
                    </View>
                  </View>
                )}
              </>
            </ScrollView>
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
            {isLoading ? (
              <Skeleton height={verticalScale(60)} width="100%" />
            ) : (
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
            )}
          </View>

          {areThereRewards ? (
            <View style={[styles.mt20, styles.h100]}>
              <View style={styles.cardRecommendationsContainer}>
                <Text size="xl" style={styles.mrAuto}>
                  Rewards
                </Text>
                <IconButton
                  onPress={() => router.navigate("screens/(tabs)/rewards")}
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
                  data={rewards}
                  estimatedItemSize={5}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.rewardId}
                  renderItem={({ item, index }) => {
                    const reward = fixedRewards[index];
                    return (
                      <View style={styles.rewardCard}>
                        <View style={styles.rewardSubContainer}>
                          <Image
                            source={reward.partnerLogo}
                            style={styles.partnerLogo}
                          />
                          <View>
                            <Text bold>{reward.reward}</Text>
                            <Text color={colors.inputPlaceholderColor}>
                              {item.rewardFor}
                            </Text>
                          </View>
                        </View>
                        <EvilIcons
                          name="chevron-right"
                          size={36}
                          color={colors.white}
                        />
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </DarkSafeAreaView>
  );
}

const styles = StyleSheet.create({
  p20: {
    padding: 20,
  },
  mb15: {
    marginBottom: 15,
  },
  mrAuto: {
    marginRight: "auto",
  },
  mt10: {
    marginTop: verticalScale(10),
  },
  mrn5: {
    marginRight: scale(-5),
  },
  h100: { height: "100%" },
  cardRecommendationsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  partnerLogo: {
    width: scale(50),
    height: scale(50),
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
