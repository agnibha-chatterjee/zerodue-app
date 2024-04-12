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
  } = props;

  console.log(isLoading);

  return (
    <View style={{ height: "100%" }}>
      <FlashList
        data={cards}
        estimatedItemSize={10}
        renderItem={({ item, index }) => {
          return isLoading ? (
            <View style={{ marginVertical: 7.5 }}>
              <Skeleton width="100%" height={120} />
            </View>
          ) : (
            <CardListItem
              key={index}
              item={item}
              selectable={selectable}
              onSelect={onCardSelect}
              selectedCards={selectedCards}
            />
          );
        }}
      />
    </View>
  );
}
