import Logo from "@assets/icons/loader.svg";
import BlueCashPrefferCard from "@assets/images/cards/blue-cash-preferred.png";
import CitiCustomCard from "@assets/images/cards/citi-custom.png";
import SapphirePreferredCard from "@assets/images/cards/sapphire-preferred-card.png";
import AmazonLogo from "@assets/images/partners/amazon.png";
import DoorDashLogo from "@assets/images/partners/doordash.png";
import NikeLogo from "@assets/images/partners/nike.png";
import WholeFoodsLogo from "@assets/images/partners/wholefoods.png";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { FullScreenSkeletonLoader } from "@components/FullScreenSkeletonLoader";
import { IconButton } from "@components/button/icon-btn";
import { Text } from "@components/text";
import { cardNameMapper } from "@constants/card-name-mapper";
import { colors } from "@constants/colors";
import { gradients, pointsGradients } from "@constants/gradients";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { useAllUserRewards } from "@hooks/use-all-user-rewards";
import { FlashList } from "@shopify/flash-list";
import { numberWithCommas } from "@utils/common";
import { scale, verticalScale } from "@utils/scaling-utils";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ScrollView, StyleSheet, View } from "react-native";

const pointsArr = [
  {
    name: "Chase",
    points: 21000,
  },
  {
    name: "AMEX",
    points: 1800,
  },
  {
    name: "Bank of America",
    points: 13000,
  },
];

const bestValueCards = [
  {
    name: "Groceries",
    cardName: "American Express Blue Preferred Card",
    cashback: "5% Cashback",
    img: BlueCashPrefferCard,
  },
  {
    name: "Travel",
    cardName: "Chase Sapphire Preferred Card",
    cashback: "5% Cashback",
    img: SapphirePreferredCard,
  },
  {
    name: "Gas",
    cardName: "Citi Bank Custom Credit Card",
    cashback: "6% Cashback",
    img: CitiCustomCard,
  },
];

const fixedRewards = [
  {
    merchant: "DoorDash",
    reward: "10% off",
    partnerLogo: DoorDashLogo,
  },
  {
    merchant: "Whole Foods",
    reward: "30% cashback",
    partnerLogo: WholeFoodsLogo,
  },
  {
    merchant: "Nike",
    reward: "$200 off",
    partnerLogo: NikeLogo,
  },
  {
    merchant: "Amazon",
    reward: "Free Prime Membership",
    partnerLogo: AmazonLogo,
  },
];

export default function RewardsScreen() {
  const { isLoading, totalPoints, rewards } = useAllUserRewards();

  console.log(rewards);

  if (isLoading) {
    return <FullScreenSkeletonLoader text="Rewards" />;
  }

  return (
    <DarkSafeAreaView setEdgeToTop>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.p20}>
          <View style={styles.headerContainer}>
            <Text size="2xl" style={styles.mrAuto}>
              Points
            </Text>
            <LinearGradient
              colors={[gradients.zPoints.from, gradients.zPoints.to]}
              style={styles.gradient}
            >
              <Text bold>{numberWithCommas(totalPoints)} pts</Text>
            </LinearGradient>
            <Logo height={verticalScale(28)} style={styles.logo} />
          </View>
          <View style={styles.existingCardPointsContainer}>
            <FlashList
              data={pointsArr}
              horizontal
              estimatedItemSize={5}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => {
                const cardName = cardNameMapper[item.name];

                return (
                  <LinearGradient
                    colors={pointsGradients[cardName]}
                    style={styles.existingPointsCardGradient}
                  >
                    <Text size="md">{item.name}</Text>
                    <Text bold size="2xl">
                      {numberWithCommas(item.points)}
                    </Text>
                    <Text>available points</Text>
                  </LinearGradient>
                );
              }}
            />
          </View>
          <View style={styles.mt20}>
            <View style={styles.cardRecommendationsContainer}>
              <Text size="2xl" style={styles.mrAuto}>
                Best Value
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
            <View style={styles.bestValueCardContainer}>
              <FlashList
                data={bestValueCards}
                horizontal
                estimatedItemSize={5}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.bestValueCard}>
                      <Image
                        source={item.img}
                        style={styles.bestValueCardImg}
                      />
                      <Text style={styles.mt5} bold size="xl">
                        {item.name}
                      </Text>
                      <Text color={colors.inputPlaceholderColor}>
                        {item.cardName}
                      </Text>

                      <View style={styles.cashbackChip}>
                        <Text>{item.cashback}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          {!rewards.length ? null : (
            <View style={[styles.mt20, styles.h100]}>
              <View style={styles.cardRecommendationsContainer}>
                <Text size="2xl" style={styles.mrAuto}>
                  Rewards
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
              <View style={styles.cardRecommendationsList}>
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
          )}
        </View>
      </ScrollView>
    </DarkSafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: { flexDirection: "row", alignItems: "center" },
  mrAuto: { marginRight: "auto" },
  p20: { padding: 20 },
  h100: { height: "100%" },
  mt20: { marginTop: verticalScale(20) },
  mt5: { marginTop: verticalScale(5) },
  gradient: {
    height: verticalScale(28),
    borderRadius: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: scale(110),
    paddingStart: scale(10),
    opacity: 0.8,
    marginRight: scale(1.5),
  },
  logo: { position: "absolute", right: scale(-30) },
  existingCardPointsContainer: {
    height: verticalScale(110),
    marginTop: verticalScale(20),
  },
  existingPointsCardGradient: {
    padding: scale(20),
    marginHorizontal: scale(5),
    borderRadius: 8,
    height: "100%",
    width: scale(160),
  },
  cardRecommendationsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  mrn5: { marginRight: scale(-5) },
  cardRecommendationsList: { height: verticalScale(130) },
  bestValueCardContainer: { height: verticalScale(200) },
  bestValueCard: {
    backgroundColor: colors.bestValueCardsBg,
    marginHorizontal: scale(10),
    padding: scale(15),
    borderRadius: 8,
    height: "100%",
    width: scale(250),
  },
  bestValueCardImg: {
    width: scale(150),
    height: verticalScale(90),
    resizeMode: "contain",
    borderRadius: 15,
  },
  cashbackChip: {
    width: scale(100),
    borderRadius: "50%",
    backgroundColor: colors.cashbackBg,
    padding: scale(5),
    alignItems: "center",
    marginTop: verticalScale(7.5),
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
