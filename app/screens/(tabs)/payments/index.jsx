import { fetchSourceBankAccounts } from "@api/user-routes";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Button } from "@components/button";
import { Text } from "@components/text";
import { verticalScale } from "@utils/scaling-utils";
import { router } from "expo-router";
import { View, Dimensions } from "react-native";
import { useQuery } from "react-query";

export default function PaymentsScreen() {
  const { data } = useQuery({
    queryKey: "sourceBankAccounts",
    queryFn: fetchSourceBankAccounts,
    refetchOnMount: "always",
  });

  const noBankAccounts = !data?.length;

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
        {noBankAccounts ? (
          <View
            style={{
              flexDirection: "column",
              height: windowHeight - verticalScale(165),
            }}
          >
            <View style={{ marginBottom: "auto" }}>
              <Text size="md" style={{ marginVertical: 10 }}>
                Looks like you haven't made any payments yet
              </Text>
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
          <Text>Hi</Text>
        )}
      </View>
    </DarkSafeAreaView>
  );
}
