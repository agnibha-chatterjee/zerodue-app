import { fetchAllLiabilities } from "@api/liabilities-api";
import { Calendar } from "@components/Calendar";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Button } from "@components/button";
import { CardsList } from "@components/cards-list";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { sampleArray } from "@constants/misc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { useMemo } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { useQuery } from "react-query";

export default function HomeScreen() {
  const { data, isLoading } = useQuery({
    queryKey: "allLiabilities",
    queryFn: fetchAllLiabilities,
  });

  const amountOwed = data?.totalAmountOwed / 100 ?? 0;

  const dueDate = dayjs().add(7, "day").format("MMM DD");

  const sampleCards = data?.liabilities?.slice(
    0,
    data?.liabilities?.length - 1
  );

  const cardsThatHaveDues = useMemo(() => {
    if (!data?.liabilities) {
      return [];
    }
    return data?.liabilities.filter(
      (liability) => !!liability && liability.nextPaymentMinimumAmount > 0
    );
  }, [data]);

  return (
    <DarkSafeAreaView setEdgeToTop>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.p20}>
          <View
            style={{
              padding: 10,
              backgroundColor: colors.cardBg,
              borderRadius: 10,
            }}
          >
            <Calendar />
          </View>
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
              <Skeleton width="100%" height={150} />
            ) : (
              <View>
                <View style={styles.dueDateCardContainer}>
                  <MaterialCommunityIcons
                    name="repeat-variant"
                    size={28}
                    color={colors.white}
                    style={styles.mr5}
                  />
                  <Text bold>One billing date, for all your cards</Text>
                </View>
                <Text style={{ paddingHorizontal: 5 }}>
                  Losing track of all the billing deadlines? Want to avoid late
                  charges? Sync the billing date for your cards with a single
                  click.
                </Text>
                <View style={styles.changeNowBtnContainer}>
                  <Button paddingVertical={0} style={styles.changeNowBtn}>
                    <Text bold>Change now</Text>
                  </Button>
                </View>
              </View>
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
                    ${amountOwed}
                  </Text>
                  <Button
                    paddingVertical={0}
                    backgroundColor={colors.yellow}
                    style={styles.payAllBtn}
                    disabled={amountOwed === 0}
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
                  {amountOwed > 1
                    ? `Across ${cardsThatHaveDues?.length} cards, pay by ${dueDate}`
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
