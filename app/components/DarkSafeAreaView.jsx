import { colors } from "@constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export function DarkSafeAreaView(props) {
  const { children, forScrollView, ...remainingProps } = props;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.blackBg,
      }}
      edges={forScrollView ? ["top"] : ["top", "bottom", "left", "right"]}
      {...remainingProps}
    >
      {children}
    </SafeAreaView>
  );
}
