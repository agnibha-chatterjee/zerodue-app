import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

import { DarkSafeAreaView } from "./DarkSafeAreaView";
import { Text } from "./text";

export function FullScreenSkeletonLoader(props) {
  const { text } = props;
  return (
    <DarkSafeAreaView>
      <View style={{ padding: 20 }}>
        <Text size="2xl" style={{ marginBottom: 20 }}>
          {text}
        </Text>
        <Skeleton width="100%" height="95%" />
      </View>
    </DarkSafeAreaView>
  );
}
