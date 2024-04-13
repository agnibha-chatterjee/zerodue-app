import { fetchAllLiabilities } from "@api/liabilities-api";
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
import { ScrollView, View } from "react-native";
import { useQuery } from "react-query";

export default function HomeScreen() {
  const { data, isLoading } = useQuery({
    queryKey: "allLiabilities",
    queryFn: fetchAllLiabilities,
  });

  const numberOfCards = data?.liabilities?.map(
    (liability) => liability["creditCard"]
  ).length;

  const amountOwed = data?.totalAmountOwed / 100 ?? 0;

  const dueDate = dayjs().add(7, "day").format("MMM DD");

  const sampleCards = data?.liabilities?.slice(
    0,
    data?.liabilities?.length - 1
  );

  return (
    <DarkSafeAreaView setEdgeToTop>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ padding: 20 }}>
          <Text size="2xl" style={{ marginBottom: 15 }}>
            Upcoming Dues
          </Text>
          <View
            style={{
              backgroundColor: isLoading ? colors.transparent : colors.cardBg,
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 8,
              marginVertical: 5,
            }}
          >
            {isLoading ? (
              <Skeleton width="100%" height={150} />
            ) : (
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="repeat-variant"
                    size={28}
                    color={colors.white}
                    style={{ marginRight: 5 }}
                  />
                  <Text bold>One billing date, for all your cards</Text>
                </View>
                <Text style={{ paddingHorizontal: 5 }}>
                  Losing track of all the billing deadlines? Want to avoid late
                  charges? Sync the billing date for your cards with a single
                  click.
                </Text>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 5,
                  }}
                >
                  <Button
                    paddingVertical={0}
                    style={{
                      width: 140,
                      alignSelf: "flex-end",
                      height: 35,
                    }}
                  >
                    <Text bold>Change now</Text>
                  </Button>
                </View>
              </View>
            )}
          </View>
          <View
            style={{
              backgroundColor: isLoading ? colors.transparent : colors.cardBg,
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 8,
              marginVertical: 5,
            }}
          >
            {isLoading ? (
              <Skeleton width="100%" height={130} />
            ) : (
              <View>
                <Text
                  bold
                  color={colors.yellow}
                  style={{
                    marginBottom: 5,
                  }}
                >
                  Total Due
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Text size="2xl" style={{ marginRight: "auto" }} bold>
                    ${amountOwed}
                  </Text>
                  <Button
                    paddingVertical={0}
                    backgroundColor={colors.yellow}
                    style={{ width: 100, height: 35 }}
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
                    ? `Across ${numberOfCards} cards, pay by ${dueDate}`
                    : "You're all set!"}
                </Text>
              </View>
            )}
          </View>

          <View style={{ marginTop: 15 }}>
            <Text size="2xl" style={{ marginBottom: 10 }}>
              Cards
            </Text>
            <CardsList
              isLoading={isLoading}
              cards={sampleCards ?? sampleArray}
            />
          </View>
        </View>
      </ScrollView>
    </DarkSafeAreaView>
  );
}
