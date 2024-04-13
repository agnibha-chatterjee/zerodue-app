import { fetchAllLiabilities } from "@api/liabilities-api";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { CardsList } from "@components/cards-list";
import { Text } from "@components/text";
import { sampleArray } from "@constants/misc";
import { ScrollView, View } from "react-native";
import { useQuery } from "react-query";

export default function CardsScreen() {
  const { data, isLoading } = useQuery({
    queryKey: "allLiabilities",
    queryFn: fetchAllLiabilities,
  });

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
          <CardsList cards={data["liabilities" ?? sampleArray]} />
        </View>
      </ScrollView>
    </DarkSafeAreaView>
  );
}
