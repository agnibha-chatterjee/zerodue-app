import { Calendar } from "@components/Calendar";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Button } from "@components/button";
import { CardsList } from "@components/cards-list";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { sampleArray } from "@constants/misc";
import { useAllLiabilities } from "@hooks/use-all-liabilities";
import { getMarkedDates, getSortedDueDates } from "@utils/liability-utils";
import dayjs from "dayjs";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { ScrollView, View, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { cardsThatHaveDues, isLoading, totalAmountOwed, sampleCards } =
    useAllLiabilities();

  const { markedDates, markedDatesInfo } = getMarkedDates(cardsThatHaveDues);
  const sortedDueDates = getSortedDueDates(cardsThatHaveDues, "desc");

  return (
    <DarkSafeAreaView setEdgeToTop>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.p20}>
          <Text size="2xl" style={styles.mb15}>
            Upcoming Dues
          </Text>
          <View
            style={[
              styles.card,
              {
                backgroundColor: isLoading ? colors.transparent : colors.cardBg,
              },
            ]}
          >
            {isLoading ? (
              <Skeleton width="100%" height={300} />
            ) : (
              <Calendar
                markedDates={markedDates}
                markedDatesInfo={markedDatesInfo}
              />
            )}
          </View>
          <View
            style={[
              styles.card,
              {
                backgroundColor: isLoading ? colors.transparent : colors.cardBg,
              },
            ]}
          >
            {isLoading ? (
              <Skeleton width="100%" height={130} />
            ) : (
              <View>
                <Text bold color={colors.yellow} style={styles.mb5}>
                  Total Due
                </Text>
                <View style={styles.totalOwedContainer}>
                  <Text size="2xl" style={styles.mrAuto} bold>
                    ${totalAmountOwed}
                  </Text>
                  <Button
                    paddingVertical={0}
                    backgroundColor={colors.yellow}
                    style={styles.payAllBtn}
                    disabled={totalAmountOwed === 0}
                    onPress={() => {
                      router.push("screens/(tabs)/payments/initiate-payment");
                    }}
                  >
                    <Text color={colors.black} bold>
                      Pay all
                    </Text>
                  </Button>
                </View>
                <Text color={colors.inputPlaceholderColor}>
                  {totalAmountOwed > 1
                    ? `Across ${cardsThatHaveDues?.length} cards, pay by ${dayjs(sortedDueDates[0]).format("MMMM DD")}`
                    : "You're all set!"}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.mt15}>
            <Text size="2xl" style={styles.mb10}>
              Cards
            </Text>
            <CardsList
              isLoading={isLoading}
              cards={
                cardsThatHaveDues.length
                  ? cardsThatHaveDues
                  : sampleCards?.length
                    ? sampleCards
                    : sampleArray
              }
            />
          </View>
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

  card: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  dueDateCardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  changeNowBtnContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
  },
  changeNowBtn: {
    width: 140,
    alignSelf: "flex-end",
    height: 35,
  },
  totalOwedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  mrAuto: {
    marginRight: "auto",
  },
  payAllBtn: { width: 100, height: 35 },
  mt15: {
    marginTop: 15,
  },
  mb10: {
    marginBottom: 10,
  },
  ph5: {
    paddingHorizontal: 5,
  },
  mr5: {
    marginRight: 5,
  },
  mb5: { marginBottom: 5 },
});
