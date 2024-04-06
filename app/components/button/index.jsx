import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@constants/colors";

export function Button(props) {
  const {
    children,
    btnStyle = {},
    btnTextStyle = {},
    backgroundColor = colors.btnBg,
    btnTextColor = colors.white,
    btnTextSize = 14,
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
        btnStyle,
      ]}
      {...remainingProps}
    >
      <Text
        style={[
          styles.btnText,
          { fontSize: btnTextSize, color: btnTextColor },
          btnTextStyle,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
  },
});
