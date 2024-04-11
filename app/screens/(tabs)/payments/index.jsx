import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Text } from "@components/text";
import { View } from "react-native";

export default function PaymentsScreen() {
  return (
    <DarkSafeAreaView>
      <View style={{ padding: 20 }}>
        <Text size="2xl" style={{ marginBottom: 15 }}>
          Summary
        </Text>
        <Text size="2xl" style={{ marginBottom: 10 }}>
          Payments
        </Text>
        <Text size="lg" style={{ marginBottom: 10 }}>
          Coming soon
        </Text>
      </View>
    </DarkSafeAreaView>
  );
}
