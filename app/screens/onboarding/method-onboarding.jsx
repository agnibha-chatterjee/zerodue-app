import {
  fetchMethodElementsToken,
  completeMethodOnboarding,
} from "@api/auth-api";
import LoaderIcon from "@assets/icons/loader.svg";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { MethodFiDialog } from "@components/MethodFiDialog";
import { Button } from "@components/button";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { verticalScale } from "@utils/scaling-utils";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useMutation } from "react-query";

export default function MethodOnboarding() {
  const [token, setToken] = useState(null);

  const successRef = useRef(false);

  const { mutate: fetchElementsToken } = useMutation({
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
      router.replace("screens/(tabs)");
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
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "auto",
            }}
          >
            <LoaderIcon />
          </View>
          <Text
            size="md"
            bold
            color={colors.inputPlaceholderColor}
            style={{
              textDecorationLine: "underline",
            }}
          >
            Note
          </Text>
          <Text
            size="md"
            bold
            style={{
              marginVertical: verticalScale(5),
            }}
            color={colors.inputPlaceholderColor}
          >
            {`\u2022`} Zerodue uses Method Financial to fetch and connect your
            credit cards.
          </Text>
          <Text
            size="md"
            bold
            style={{
              marginTop: verticalScale(5),
              marginBottom: verticalScale(10),
            }}
            color={colors.inputPlaceholderColor}
          >
            {`\u2022`} This process will not affect your credit score or credit
            limit.
          </Text>
          <Button style={{ marginBottom: 25 }} onPress={fetchElementsToken}>
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
