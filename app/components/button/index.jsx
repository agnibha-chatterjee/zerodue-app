import { Pressable, StyleSheet } from "react-native";
import { colors } from "@constants/colors";

export function Button(props) {
  const {
    children,
    style = {},
    backgroundColor = colors.btnBg,
    marginHorizontal = 0,
    marginVertical = 0,
    paddingVertical = 15,
    paddingHorizontal = 10,
    ...remainingProps
  } = props;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: backgroundColor,
          opacity: pressed ? 0.95 : 1,
          marginHorizontal,
          marginVertical,
          paddingVertical,
          paddingHorizontal,
        },
        style,
      ]}
      {...remainingProps}
    >
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
