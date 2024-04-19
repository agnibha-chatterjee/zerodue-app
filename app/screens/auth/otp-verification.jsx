import { verifyOtp } from "@api/auth-api";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { TextButton } from "@components/button/text-btn";
import { Text } from "@components/text";
import { ASYNC_STORAGE_KEYS } from "@constants/async-storage-keys";
import { colors } from "@constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStore } from "app/store";
import { router, useLocalSearchParams } from "expo-router";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import Toast from "react-native-toast-message";
import { useMutation } from "react-query";

export default function OtpVerificationScreen() {
  const params = useLocalSearchParams();

  const { setUser } = useStore((state) => ({ setUser: state.setUser }));

  const { mutate } = useMutation({
    mutationKey: "generateOtp",
    mutationFn: (reqBody) => verifyOtp(reqBody),
    onSuccess: async (data) => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Your phone number has been verified",
      });
      await AsyncStorage.setItem(
        ASYNC_STORAGE_KEYS.AUTH_TOKEN,
        data.accessToken
      );
      setUser(data.user);
      router.replace("screens/onboarding/method-onboarding");
    },
    onError: async () => {
      await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.AUTH_TOKEN);
      Toast.show({
        type: "error",
        text1: "Error verifying OTP",
      });
    },
  });

  const onSubmitOtp = (otp) => {
    const reqBody = {
      otp,
      phoneNumber: params.phoneNumber,
    };
    mutate(reqBody);
  };

  return (
    <DarkSafeAreaView outsideTabNavigator>
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
            Check your phone for a 6 digit code to verify your number.
          </Text>
          <OtpInput
            numberOfDigits={6}
            focusColor={colors.white}
            focusStickBlinkingDuration={500}
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
            <TextButton style={{ marginRight: 3 }} onPress={() => {}}>
              <Text color={colors.inputPlaceholderColor}>Resend?</Text>
            </TextButton>
            <Text>(30s)</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </DarkSafeAreaView>
  );
}
