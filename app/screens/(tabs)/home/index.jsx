import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Button } from "@components/button";
import { CardsList } from "@components/cards-list";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  return (
    <DarkSafeAreaView forScrollView>
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
              backgroundColor: colors.cardBg,
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 8,
              marginVertical: 5,
            }}
          >
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
              charges? Sync the billing date for your cards with a single click.
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
          <View
            style={{
              backgroundColor: colors.cardBg,
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 8,
              marginVertical: 5,
            }}
          >
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
                $1000
              </Text>
              <Button
                paddingVertical={0}
                backgroundColor={colors.yellow}
                style={{ width: 100, height: 35 }}
              >
                <Text color={colors.black} bold>
                  Pay all
                </Text>
              </Button>
            </View>
            <Text color={colors.inputPlaceholderColor}>
              Across 2 cards, pay by Feb 09
            </Text>
          </View>

          <View style={{ marginTop: 15 }}>
            <Text size="2xl" style={{ marginBottom: 10 }}>
              Cards
            </Text>
            <CardsList />
          </View>
        </View>
      </ScrollView>
    </DarkSafeAreaView>
  );
}
