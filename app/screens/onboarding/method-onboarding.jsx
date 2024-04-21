import {
  fetchMethodElementsToken,
  completeMethodOnboarding,
} from "@api/auth-api";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { MethodFiDialog } from "@components/MethodFiDialog";
import { Button } from "@components/button";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { verticalScale } from "@utils/scaling-utils";
import { useStore } from "app/store";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useMutation } from "react-query";

export default function MethodOnboarding() {
  const [token, setToken] = useState(null);

  const successRef = useRef(false);

  const { user } = useStore((state) => ({ user: state.user }));

  console.log(user);

  const { mutate: fetchElementsToken, isLoading } = useMutation({
    mutationKey: "fetchMethodElementsToken",
    mutationFn: fetchMethodElementsToken,
    onSuccess: (data) => {
      setToken(data.elementToken);
    },
  });

  const { mutate: completeOnboarding } = useMutation({
    mutationKey: "fetchMethodElementsToken",
    mutationFn: completeMethodOnboarding,
    onSuccess: () => {
      router.replace("screens/(tabs)/home");
    },
  });

  const handleGracefulExit = () => {
    setToken(null);
    completeOnboarding();
  };

  const handleOnExitOrError = (payload) => {
    if (successRef.current) return;
    console.log("Error in method onboarding", payload);
    setToken(null);
    Toast.show({
      type: "error",
      text1: "Cancelled by user",
    });
  };

  if (!token)
    return (
      <DarkSafeAreaView outsideTabNavigator>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          <Text size="2xl">Almost done, {user?.firstName}!</Text>
          <Text size="2xl">Connect your cards</Text>
          <Text
            size="md"
            color={colors.inputPlaceholderColor}
            style={{ marginTop: verticalScale(20) }}
          >
            We use Method Financial to fetch and connect your credit cards. This
            will not affect your credit score or credit limit.
          </Text>
          <Button
            style={{ marginBottom: 25, marginTop: "auto" }}
            onPress={fetchElementsToken}
            isLoading={isLoading}
          >
            <Text>Add cards</Text>
          </Button>
        </View>
      </DarkSafeAreaView>
    );

  return (
    <MethodFiDialog
      env="dev"
      token={token}
      onExit={() => {
        if (successRef.current) {
          handleGracefulExit();
          return;
        }
        handleOnExitOrError();
      }}
      onError={handleOnExitOrError}
      onSuccess={() => {
        successRef.current = true;
      }}
    />
  );
}
