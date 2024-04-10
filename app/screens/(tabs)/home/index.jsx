import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Button } from "@components/button";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <DarkSafeAreaView>
      <View style={{ padding: 20 }}>
        <Text size="2xl" style={{ marginBottom: 15 }}>
          Upcoming Dues
        </Text>
        <View
          style={{
            backgroundColor: colors.cardBg,
            padding: 10,
            borderRadius: 8,
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
            <Text style={{ fontWeight: "bold" }}>
              One billing date, for all your cards
            </Text>
          </View>
          <Text>
            Losing track of all the billing deadlines? Want to avoid late
            charges? Sync the billing date for your cards with a single click.
          </Text>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              style={{
                width: 150,
                alignSelf: "flex-end",
                height: 35,
              }}
            >
              <Text size="xxs">Change now</Text>
            </Button>
          </View>
        </View>
      </View>
    </DarkSafeAreaView>
  );
}
