import { colors } from "@constants/colors";
import PropTypes from "prop-types";
import { TextInput as RNTextInput } from "react-native";

export function Input(props) {
  const { style, ...remainingProps } = props;
  return (
    <RNTextInput
      placeholderTextColor={colors.inputPlaceholderColor}
      style={[
        {
          fontFamily: "SF-Pro-Display",
          color: colors.white,
          backgroundColor: colors.inputBg,
          paddingHorizontal: 16,
          height: 50,
          borderRadius: 8,
          fontSize: 16,
        },
        style,
      ]}
      {...remainingProps}
    />
  );
}

Input.propTypes = {
  style: PropTypes.object,
};
