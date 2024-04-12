import { fetchAllLiabilities } from "@api/liabilities-api";
import { fetchSourceBankAccounts } from "@api/user-routes";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Redirect } from "@components/Redirect";
import { Button } from "@components/button";
import { TextButton } from "@components/button/text-btn";
import { CardsList } from "@components/cards-list";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { scale, verticalScale } from "@utils/scaling-utils";
import { Skeleton } from "moti/skeleton";
import { useMemo, useState } from "react";
import { ScrollView, View, Dimensions } from "react-native";
import { useQuery } from "react-query";

const paymentsText = (
  <Text size="2xl" style={{ marginBottom: 10 }}>
    Payment Summary
  </Text>
);

export default function InitiatePaymentScreen() {
  const { data: bankData, isLoading: bankDataLoading } = useQuery({
    queryKey: "sourceBankAccounts",
    queryFn: fetchSourceBankAccounts,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });

  const { data: liabilities, isLoading } = useQuery({
    queryKey: "allLiabilities",
    queryFn: fetchAllLiabilities,
  });

  const [selectedCards, setSelectedCards] = useState([]);

  const noBankAccounts = !bankData?.length;

  const firstBankAccount = bankData?.[0];

  const cardsThatHaveDues = useMemo(() => {
    if (!liabilities) {
      return [];
    }

    return liabilities["liabilities"].filter(
      (liability) => !!liability && liability.nextPaymentMinimumAmount > 0
    );
  }, [liabilities]);

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
            <Text size="md">
              Friendly Name: {firstBankAccount.friendlyName}
            </Text>
            <Text size="md">
              Account Number: {firstBankAccount.accountNumber}
            </Text>
          </View>
          <View>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text size="2xl" style={{ marginRight: "auto" }}>
                Dues
              </Text>
              <TextButton
                style={{ marginBottom: 7.5 }}
                onPress={() => {
                  setSelectedCards(["alaska", "chase", "bofa"]);
                }}
              >
                <Text>Select All</Text>
              </TextButton>
            </View>
            <View style={{ height: "100%" }}>
              <CardsList
                selectable
                cards={cardsThatHaveDues}
                onCardSelect={setSelectedCards}
                selectedCards={selectedCards}
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
      >
        <Text>Pay</Text>
      </Button>
    </DarkSafeAreaView>
  );
}
