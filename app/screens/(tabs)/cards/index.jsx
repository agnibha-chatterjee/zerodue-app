import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { CardsList } from "@components/cards-list";
import { Text } from "@components/text";
import { View } from "react-native";

export default function CardsScreen() {
  return (
    <DarkSafeAreaView>
      <View style={{ padding: 20 }}>
        <Text size="2xl" style={{ marginBottom: 15 }}>
          Summary
        </Text>
        <Text size="2xl" style={{ marginBottom: 10 }}>
          Cards
        </Text>
        <CardsList />
      </View>
    </DarkSafeAreaView>
  );
}
