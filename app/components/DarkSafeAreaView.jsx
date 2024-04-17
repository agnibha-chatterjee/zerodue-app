import { colors } from "@constants/colors";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function DarkSafeAreaView({ children, ...rest } = {}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: 0,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: colors.blackBg,
      }}
    >
      {children}
    </View>
  );
}
