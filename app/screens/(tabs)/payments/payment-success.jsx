import { Button } from "@components/button";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Dimensions, StyleSheet } from "react-native";

export default function PaymentSuccess() {
  const windowHeight = Dimensions.get("window").height;

  const handleRedirectToRewards = () => {
    router.push("screens/(tabs)/rewards");
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.successContainer,
          {
            height: windowHeight / 2,
          },
        ]}
      >
        <AntDesign name="checkcircle" size={72} color={colors.paymentSuccess} />
        <Text size="2xl">You're all set!</Text>
        <Text size="md">Enjoy that zerodue life 😉</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleRedirectToRewards}>
          <Text>See your rewards</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackBg,
    flex: 1,
  },
  successContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.paymentSuccessBg,
    borderBottomLeftRadius: "200%",
    borderBottomRightRadius: "200%",
  },
  buttonContainer: {
    marginTop: "auto",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});
