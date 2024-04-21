import { checkAuthStatus } from "@api/auth-api";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { ASYNC_STORAGE_KEYS } from "@constants/async-storage-keys";
import { useIsNavigationReady } from "@hooks/common/use-is-navigation-ready";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { useEffect } from "react";
import { useQuery } from "react-query";

import { useStore } from "./store";

export default function RootScreen() {
  const [fontsLoaded] = useFonts({
    "SF-Pro-Display-Regular": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Pro-Display-Bold": require("../assets/fonts/SF-Pro-Display-Bold.otf"),
  });
  const isNavigationReady = useIsNavigationReady();

  const setUser = useStore((state) => state.setUser);

  const { isLoading, data, isError, isSuccess } = useQuery({
    queryKey: "authStatus",
    queryFn: checkAuthStatus,
  });

  const updateAccessTokenInAsyncStorage = (accessToken) => {
    return AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AUTH_TOKEN, accessToken);
  };

  useEffect(() => {
    const checkInitialConditions = async () => {
      if (isLoading || !isNavigationReady || !fontsLoaded) return;

      if (isError) {
        router.replace("screens/onboarding/app-onboarding");
        return;
      }

      if (isSuccess) {
        const user = data.user;

        setUser(user);
        await updateAccessTokenInAsyncStorage(data.accessToken);

        if (user.phoneNumberVerified && user.methodFiVerified) {
          router.replace("screens/(tabs)/home");
        } else {
          router.replace("screens/onboarding/method-onboarding");
        }
      }
    };

    checkInitialConditions();
  }, [
    isNavigationReady,
    fontsLoaded,
    isLoading,
    isError,
    isSuccess,
    data,
    setUser,
  ]);

  return <DarkSafeAreaView />;
}
