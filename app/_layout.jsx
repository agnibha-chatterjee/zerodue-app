import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "react-query";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="screens/auth/sign-up" />
        <Stack.Screen name="screens/auth/otp-verification" />
      </Stack>
    </QueryClientProvider>
  );
}
