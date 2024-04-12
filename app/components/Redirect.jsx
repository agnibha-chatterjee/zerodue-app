import { verticalScale } from "@utils/scaling-utils";
import { router } from "expo-router";
import PropTypes from "prop-types";
import { View, Dimensions } from "react-native";

import { Button } from "./button";
import { Text } from "./text";

export function Redirect(props) {
  const { redirectTo = "", text = "", btnText = "" } = props;

  const windowHeight = Dimensions.get("window").height;

  const redirectToAddBankAccount = () => {
    router.push(redirectTo);
  };

  return (
    <View
      style={{
        flexDirection: "column",
        height: windowHeight - verticalScale(165),
      }}
    >
      <View style={{ marginBottom: "auto" }}>
        <Text size="md" style={{ marginVertical: 10 }}>
          {text}
        </Text>
      </View>

      <Button style={{ marginVertical: 10 }} onPress={redirectToAddBankAccount}>
        <Text>{btnText}</Text>
      </Button>
    </View>
  );
}

Redirect.propTypes = {
  redirectTo: PropTypes.string,
  text: PropTypes.string,
  btnText: PropTypes.string,
};
