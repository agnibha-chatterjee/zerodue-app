import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Text } from "@components/text";
import { useLocalSearchParams } from "expo-router";

export default function OtpVerificationScreen() {
  const params = useLocalSearchParams();

  return (
    <DarkSafeAreaView>
      <Text>OTP Verification</Text>
    </DarkSafeAreaView>
  );
}
