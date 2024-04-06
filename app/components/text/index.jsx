import { Text as RNText } from "react-native";
import { colors } from "@constants/colors";
import PropTypes from "prop-types";

export function Text(props) {
  const { color = colors.white, style = {}, size = "sm" } = props;

  let fontSize = 16;
  switch (size) {
    case "xxs":
      fontSize = 12;
      break;
    case "xs":
      fontSize = 14;
      break;
    case "sm":
      fontSize = 16;
      break;
    case "md":
      fontSize = 20;
      break;
    case "lg":
      fontSize = 24;
      break;
    case "xl":
      fontSize = 32;
      break;
    case "2xl":
      fontSize = 40;
      break;
    case "3xl":
      fontSize = 48;
      break;
    case "4xl":
      fontSize = 56;
      break;
    case "5xl":
      fontSize = 64;
      break;
    case "6xl":
      fontSize = 72;
      break;
    default:
      fontSize = 16;
      break;
  }

  return (
    <RNText
      style={[
        {
          fontSize: fontSize,
          color,
          fontFamily: "SF-Pro-Display",
        },
        { ...style },
      ]}
    >
      {props.children}
    </RNText>
  );
}

Text.propTypes = {
  size: PropTypes.oneOf([
    "xxs",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
  ]),
  color: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
};
