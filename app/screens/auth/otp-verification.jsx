import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { TextButton } from "@components/button/text-btn";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import Toast from "react-native-toast-message";

export default function OtpVerificationScreen() {
  const params = useLocalSearchParams();

  const onSubmitOtp = (otp) => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Your phone number has been verified",
    });

    router.push("screens/onboarding/method-onboarding");
  };

  return (
    <DarkSafeAreaView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View
          style={{
            padding: 15,
            paddingTop: 40,
            paddingBottom: 20,
            flex: 1,
            flexDirection: "column",
          }}
        >
          <Text
            size="2xl"
            style={{
              marginBottom: 20,
            }}
          >
            We texted you a code
          </Text>
          <Text
            size="md"
            color={colors.inputPlaceholderColor}
            style={{
              marginBottom: 20,
            }}
          >
            Check your phone for a 5 digit code to verify your number.
          </Text>
          <OtpInput
            numberOfDigits={6}
            focusColor={colors.white}
            focusStickBlinkingDuration={500}
            onTextChange={(text) => console.log(text)}
            onFilled={(text) => {
              onSubmitOtp(text);
            }}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: colors.inputBg,
                borderColor: colors.transparent,
              },
              pinCodeTextStyle: {
                color: colors.white,
              },
              focusedPinCodeContainerStyle: {
                backgroundColor: colors.inputBg,
                borderColor: colors.transparent,
              },
            }}
          />
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TextButton
              style={{ marginRight: 3 }}
              onPress={() => {
                console.log("asdasd");
              }}
            >
              <Text color={colors.inputPlaceholderColor}>Resend?</Text>
            </TextButton>
            <Text>(30s)</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </DarkSafeAreaView>
  );
}
