import { Calendar } from "@components/Calendar";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { CardsList } from "@components/cards-list";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { sampleArray } from "@constants/misc";
import { useAllLiabilities } from "@hooks/use-all-liabilities";
import { getMarkedDates } from "@utils/liability-utils";
import { verticalScale } from "@utils/scaling-utils";
import { Skeleton } from "moti/skeleton";
import { ScrollView, StyleSheet, View } from "react-native";

export default function CardsScreen() {
  const { allLiabilities, isLoading, cardsThatHaveDues } = useAllLiabilities();
  const { markedDates, markedDatesInfo } = getMarkedDates(cardsThatHaveDues);

  return (
    <DarkSafeAreaView>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 20 }}>
          <Text size="2xl" style={{ marginBottom: 10 }}>
            Upcoming Bills
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
          <Text size="xl" style={{ marginBottom: 10 }}>
            Cards
          </Text>
          <CardsList
            isLoading={isLoading}
            cards={allLiabilities ?? sampleArray}
          />
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
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
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
