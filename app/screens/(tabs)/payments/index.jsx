import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { FullScreenSkeletonLoader } from "@components/FullScreenSkeletonLoader";
import { Redirect } from "@components/Redirect";
import { Button } from "@components/button";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { useAllBankAccounts } from "@hooks/use-all-bank-accounts";
import { useUserPayments } from "@hooks/use-user-payments";
import { FlashList } from "@shopify/flash-list";
import dayjs from "dayjs";
import { router } from "expo-router";
import { View, ScrollView } from "react-native";

const paymentsText = (
  <Text size="2xl" style={{ marginBottom: 10 }}>
    Payments
  </Text>
);

export default function PaymentsScreen() {
  const { bankDataLoading, noBankAccounts } = useAllBankAccounts();

  const { paymentsData, paymentsDataLoading, userHasNotMadePayments } =
    useUserPayments(noBankAccounts);

  if (bankDataLoading || paymentsDataLoading) {
    return <FullScreenSkeletonLoader text="Payments" />;
  }

  if (noBankAccounts) {
    return (
      <DarkSafeAreaView>
        <View style={{ padding: 20 }}>
          {paymentsText}
          <Redirect
            text="Add a bank account to start making payments"
            btnText="Add Bank Account"
            redirectTo="screens/(tabs)/payments/add-bank-account"
          />
        </View>
      </DarkSafeAreaView>
    );
  }

  if (userHasNotMadePayments) {
    return (
      <DarkSafeAreaView>
        <View style={{ padding: 20 }}>
          {paymentsText}
          <Redirect
            text="Looks like you haven't made any payments yet"
            btnText="Pay Now"
            redirectTo="screens/(tabs)/payments/initiate-payment"
          />
        </View>
      </DarkSafeAreaView>
    );
  }

  return (
    <DarkSafeAreaView outsideTabNavigator>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 20 }}>
          {paymentsText}
          <View style={{ height: "100%" }}>
            <FlashList
              data={paymentsData}
              estimatedItemSize={paymentsData?.length ?? 10}
              keyExtractor={(item) => item.paymentId}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      padding: 20,
                      height: 140,
                      backgroundColor: colors.cardBg,
                      marginVertical: 10,
                      borderRadius: 8,
                    }}
                  >
                    <Text color={colors.yellow} bold>
                      On {dayjs(item.createdAt).format("MMM DD, YYYY - h:mm a")}
                    </Text>
                    <Text size="2xl" bold style={{ marginVertical: 5 }}>
                      ${item.amount / 100}
                    </Text>
                    <View
                      style={{
                        marginVertical: 5,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text color={colors.inputPlaceholderColor}>
                        From: {item.sourceAccountName}
                      </Text>
                      <Text color={colors.inputPlaceholderColor}>
                        To: **** {item.cardMask}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      <Button
        style={{
          position: "absolute",
          width: "90%",
          marginLeft: "5%",
          bottom: 0,
          left: 0,
          marginBottom: 10,
        }}
        onPress={() => {
          router.push("screens/(tabs)/payments/initiate-payment");
        }}
      >
        <Text>Pay</Text>
      </Button>
    </DarkSafeAreaView>
  );
}
