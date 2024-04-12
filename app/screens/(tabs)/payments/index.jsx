import { fetchAllUserPayments } from "@api/payment-apis";
import { fetchSourceBankAccounts } from "@api/user-routes";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
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
  });

  const noBankAccounts = !bankData?.length;

  const { data: paymentsData, isLoading: paymentsDataLoading } = useQuery({
    queryKey: "allUserPayments",
    queryFn: fetchAllUserPayments,
    refetchOnMount: "always",
    enabled: noBankAccounts > 0,
  });

  const hasUserMadePayments = !paymentsData?.length;

  const windowHeight = Dimensions.get("window").height;

  const redirectToAddBankAccount = () => {
    router.push("screens/user-account/add-bank-account");
  };

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
              <View
                style={{
                  flexDirection: "column",
                  height: windowHeight - verticalScale(165),
                }}
              >
                <View style={{ marginBottom: "auto" }}>
                  <Text size="md" style={{ marginVertical: 10 }}>
                    Add a bank account to start making payments
                  </Text>
                </View>

                <Button
                  style={{ marginVertical: 10 }}
                  onPress={redirectToAddBankAccount}
                >
                  <Text>Add Bank Account</Text>
                </Button>
              </View>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {hasUserMadePayments ? (
                  <Text size="md">
                    Looks like you have not made any payments yet
                  </Text>
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
