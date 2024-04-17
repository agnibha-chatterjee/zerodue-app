import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { CardsList } from "@components/cards-list";
import { Text } from "@components/text";
import { sampleArray } from "@constants/misc";
import { useAllLiabilities } from "@hooks/use-all-liabilities";
import { ScrollView, View } from "react-native";

export default function CardsScreen() {
  const { allLiabilities, isLoading } = useAllLiabilities();

  return (
    <DarkSafeAreaView setEdgeToTop>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 20 }}>
          <Text size="2xl" style={{ marginBottom: 10 }}>
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
