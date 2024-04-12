import { fetchSourceBankAccounts } from "@api/user-routes";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Redirect } from "@components/Redirect";
import { CardsList } from "@components/cards-list";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { Skeleton } from "moti/skeleton";
import { ScrollView, View } from "react-native";
import { useQuery } from "react-query";

const paymentsText = (
  <Text size="2xl" style={{ marginBottom: 10 }}>
    Payments
  </Text>
);

export default function InitiatePaymentScreen() {
  const { data: bankData, isLoading: bankDataLoading } = useQuery({
    queryKey: "sourceBankAccounts",
    queryFn: fetchSourceBankAccounts,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });

  const noBankAccounts = !bankData?.length;

  const firstBankAccount = bankData?.[0];

  if (bankDataLoading) {
    return (
      <DarkSafeAreaView>
        <View style={{ padding: 20 }}>
          {paymentsText}
          <Skeleton width="100%" height="95%" />
        </View>
      </DarkSafeAreaView>
    );
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
    <DarkSafeAreaView setEdgeToTop>
      <ScrollView>
        <View style={{ padding: 20 }}>
          {paymentsText}
          <View
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: 8,
              padding: 20,
            }}
          >
            <Text size="md">Bank Account Info</Text>
            <Text size="md">Bank Name: {firstBankAccount.friendlyName}</Text>
            <Text size="md">Acc No: {firstBankAccount.accountNumber}</Text>
          </View>
          <View>
            <Text size="2xl">Dues</Text>
            <View style={{ height: "100%" }}>
              <CardsList />
            </View>
          </View>
        </View>
      </ScrollView>
    </DarkSafeAreaView>
  );
}
