import { useEffect } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { useIsNavigationReady } from "@hooks/common/use-is-navigation-ready";
import { useFonts } from "expo-font";

export default function RootScreen() {
  let [fontsLoaded] = useFonts({
    "SF-Pro-Display": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
  });
  const isNavigationReady = useIsNavigationReady();

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }

    if (!fontsLoaded) {
      return;
    }

    router.replace("screens/auth/sign-up");
  }, [isNavigationReady, fontsLoaded]);

  return null;
}
