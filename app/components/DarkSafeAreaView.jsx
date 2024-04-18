import { colors } from "@constants/colors";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function DarkSafeAreaView({
  children,
  outsideTabNavigator = false,
  style = {},
} = {}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: outsideTabNavigator ? insets.bottom : 0,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          backgroundColor: colors.blackBg,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
