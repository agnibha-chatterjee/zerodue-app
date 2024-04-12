import { fetchAllUserPayments } from "@api/payment-apis";
import { fetchSourceBankAccounts } from "@api/user-routes";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Redirect } from "@components/Redirect";
import { Button } from "@components/button";
import { Text } from "@components/text";
import { verticalScale } from "@utils/scaling-utils";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { View, Dimensions } from "react-native";
import { useQuery } from "react-query";

export default function PaymentsScreen() {
  const { data: bankData, isLoading: bankDataLoading } = useQuery({
    queryKey: "sourceBankAccounts",
    queryFn: fetchSourceBankAccounts,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });

  const noBankAccounts = !bankData?.length;

  const { data: paymentsData, isLoading: paymentsDataLoading } = useQuery({
    queryKey: "allUserPayments",
    queryFn: fetchAllUserPayments,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    enabled: noBankAccounts > 0,
  });

  const hasUserMadePayments = !paymentsData?.length;

  return (
    <DarkSafeAreaView>
      <View style={{ padding: 20 }}>
        <Text size="2xl" style={{ marginBottom: 10 }}>
          Payments
        </Text>
        {bankDataLoading || paymentsDataLoading ? (
          <Skeleton width="100%" height="95%" />
        ) : (
          <View>
            {noBankAccounts ? (
              <Redirect
                text="Add a bank account to start making payments"
                btnText="Add Bank Account"
                redirectTo="screens/(tabs)/payments/add-bank-account"
              />
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {hasUserMadePayments ? (
                  <Redirect
                    text="Looks like you haven't made any payments yet"
                    btnText="Pay Now"
                    redirectTo="screens/(tabs)/payments/initiate-payment"
                  />
                ) : (
                  <Text>Here are your payments</Text>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </DarkSafeAreaView>
  );
}
