import { FlashList } from "@shopify/flash-list";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

import { CardListItem } from "./card-list-item";

export function CardsList(props) {
  const {
    isLoading = false,
    selectable,
    onCardSelect = () => {},
    selectedCards = [],
    cards,
    hidePayButton = false,
  } = props;

  return (
    <View style={{ height: "100%" }}>
      <FlashList
        data={cards}
        keyExtractor={(item) => (item.id ? item.id : item)}
        estimatedItemSize={10}
        renderItem={({ item }) => {
          return isLoading ? (
            <View style={{ marginVertical: 7.5 }}>
              <Skeleton width="100%" height={120} />
            </View>
          ) : (
            <CardListItem
              item={item}
              selectable={selectable}
              onSelect={onCardSelect}
              selectedCards={selectedCards}
              hidePayButton={hidePayButton}
            />
          );
        }}
      />
    </View>
  );
}
