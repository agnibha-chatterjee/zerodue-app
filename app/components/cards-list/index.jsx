import { FlashList } from "@shopify/flash-list";
import { scale, verticalScale } from "@utils/scaling-utils";
import { Skeleton } from "moti/skeleton";
import { View, StyleSheet, FlatList } from "react-native";

import { CardListItem } from "./card-list-item";
import { CardListItemHorizontal } from "./card-list-item-horizontal";

export function CardsList(props) {
  const {
    isLoading = false,
    selectable,
    onCardSelect = () => {},
    beforeNavigate = () => {},
    selectedCards = [],
    cards,
    height = "100%",
    horizontal = false,
  } = props;

  const Component = horizontal ? FlatList : FlashList;

  return (
    <View style={[styles.container, { height }]}>
      <Component
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={horizontal}
        data={cards}
        keyExtractor={(item) => (item.creditCardId ? item.creditCardId : item)}
        estimatedItemSize={10}
        renderItem={({ item }) => {
          return isLoading ? (
            <>
              {horizontal ? (
                <View style={{ marginHorizontal: scale(7.5) }}>
                  <Skeleton height="100%" width={scale(180)} />
                </View>
              ) : (
                <View style={{ marginVertical: verticalScale(6) }}>
                  <Skeleton width="100%" height={verticalScale(110)} />
                </View>
              )}
            </>
          ) : horizontal ? (
            <CardListItemHorizontal item={item} />
          ) : (
            <CardListItem
              item={item}
              selectable={selectable}
              onSelect={onCardSelect}
              selectedCards={selectedCards}
              beforeNavigate={beforeNavigate}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
