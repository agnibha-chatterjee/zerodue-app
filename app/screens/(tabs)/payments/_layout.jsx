import { Stack } from "expo-router";

export default function PaymentTabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="add-bank-account" />
      <Stack.Screen name="initiate-payment" />
    </Stack>
  );
}
