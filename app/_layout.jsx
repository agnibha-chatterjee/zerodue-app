import "react-native-reanimated";
import "react-native-gesture-handler";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";

export default function RootLayout() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="screens/auth/sign-up" />
          <Stack.Screen name="screens/auth/otp-verification" />
          <Stack.Screen name="screens/onboarding/method-onboarding" />
          <Stack.Screen name="screens/(tabs)" />
        </Stack>
        <Toast />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
