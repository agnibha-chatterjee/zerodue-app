import { colors } from "@constants/colors";
import { scale } from "@utils/scaling-utils";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

export function Button(props) {
  const {
    children,
    style = {},
    backgroundColor = colors.btnBg,
    marginHorizontal = 0,
    marginVertical = 0,
    paddingVertical = 15,
    paddingHorizontal = 10,
    isLoading = false,
    ...remainingProps
  } = props;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          opacity: pressed ? 0.95 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor,
          marginHorizontal,
          marginVertical,
          paddingVertical,
          paddingHorizontal,
        },
        style,
      ]}
      disabled={isLoading}
      {...remainingProps}
    >
      {isLoading ? (
        <ActivityIndicator
          color={colors.white}
          style={{ marginRight: scale(5) }}
        />
      ) : null}
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
  },
});
