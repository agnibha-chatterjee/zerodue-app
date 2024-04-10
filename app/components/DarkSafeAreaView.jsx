import { colors } from "@constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export function DarkSafeAreaView(props) {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{
        flex: 1,
        backgroundColor: colors.blackBg,
      }}
    >
      {props.children}
    </SafeAreaView>
  );
}
