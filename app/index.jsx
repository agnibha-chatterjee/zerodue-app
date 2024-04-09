import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useIsNavigationReady } from "@hooks/common/use-is-navigation-ready";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_KEYS } from "@constants/async-storage-keys";

export default function RootScreen() {
  let [fontsLoaded] = useFonts({
    "SF-Pro-Display": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
  });
  const isNavigationReady = useIsNavigationReady();

  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const checkOnboardingComplete = async () => {
    const onboardingComplete = await AsyncStorage.getItem(
      ASYNC_STORAGE_KEYS.ONBOARDING_COMPLETE
    );
    setOnboardingComplete(onboardingComplete === "TRUE");
  };

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }

    if (!fontsLoaded) {
      return;
    }

    checkOnboardingComplete();

    if (onboardingComplete) {
      router.navigate("Home");
    }
    router.replace("screens/auth/sign-up");
  }, [isNavigationReady, fontsLoaded, onboardingComplete]);

  return null;
}
