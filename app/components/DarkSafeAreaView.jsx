import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@constants/colors";

export function DarkSafeAreaView(props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.blackBg }}>
      {props.children}
    </SafeAreaView>
  );
}
