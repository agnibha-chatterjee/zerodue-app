import { initiatePayment } from "@api/payment-apis";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { FullScreenSkeletonLoader } from "@components/FullScreenSkeletonLoader";
import { Redirect } from "@components/Redirect";
import { Button } from "@components/button";
import { CardsList } from "@components/cards-list";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { useAllBankAccounts } from "@hooks/use-all-bank-accounts";
import { useAllLiabilities } from "@hooks/use-all-liabilities";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { useMutation } from "react-query";

const paymentsText = (
  <Text size="2xl" style={{ marginBottom: 10 }}>
    Payment Summary
  </Text>
);

export default function InitiatePaymentScreen() {
  const { bankDataLoading, noBankAccounts, firstBankAccount } =
    useAllBankAccounts();

  const { cardsThatHaveDues, isLoading: liabilitiesLoading } =
    useAllLiabilities();

  const { mutate, isLoading } = useMutation({
    mutationKey: "initiatePayment",
    mutationFn: (reqBody) => initiatePayment(reqBody),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Payment successful!",
        text2: "The payment will be posted to your account within 48 hours",
      });

      router.push("screens/(tabs)/payments/payment-success");
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Payment failed! Please try again.",
      });
    },
  });

  const [selectedCards, setSelectedCards] = useState([]);

  const handlePay = () => {
    if (!selectedCards.length) {
      Toast.show({
        type: "error",
        text1: "No cards selected",
      });
      return;
    }
    const requestBody = selectedCards.map((card) => {
      const c = cardsThatHaveDues.find((c) => c.id === card);
      return {
        cardId: c.id,
        amount: c.nextPaymentMinimumAmount,
        liabilityAccountId: c.liabilityAccountId,
        source_account_id: firstBankAccount.accountId,
        description: "crd pmt",
      };
    });

    mutate(requestBody);
  };

  if (bankDataLoading || liabilitiesLoading) {
    return <FullScreenSkeletonLoader text="Payment Summary" />;
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

  return (
    <DarkSafeAreaView>
      <ScrollView outsideTabNavigator>
        <View style={{ padding: 20 }}>
          {paymentsText}
          <View
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: 8,
              padding: 20,
            }}
          >
            <Text color={colors.yellow} bold style={{ marginVertical: 3 }}>
              Paying using
            </Text>
            <Text style={{ marginVertical: 3 }}>
              Friendly Name: <Text bold>{firstBankAccount.friendlyName}</Text>
            </Text>
            <Text style={{ marginVertical: 3 }}>
              Account Number: <Text bold>{firstBankAccount.accountNumber}</Text>
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text size="2xl" style={{ marginRight: "auto" }}>
                Dues
              </Text>
            </View>
            <View style={{ height: "100%" }}>
              <CardsList
                selectable
                cards={cardsThatHaveDues}
                onCardSelect={setSelectedCards}
                selectedCards={selectedCards}
                hidePayButton
              />
            </View>
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
        }}
        onPress={handlePay}
        isLoading={isLoading}
      >
        <Text>Pay</Text>
      </Button>
    </DarkSafeAreaView>
  );
}
