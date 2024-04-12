import { createUserSourceBankAccount } from "@api/user-routes";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Button } from "@components/button";
import { Text } from "@components/text";
import { Input } from "@components/text-input";
import { colors } from "@constants/colors";
import { yupResolver } from "@hookform/resolvers/yup";
import { addBankAccountValidationSchema } from "@schemas/add-bank-account-validation";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-toast-message";
import { useMutation } from "react-query";

export default function AddBankAccountScreen() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Checking Account", value: "checking" },
    { label: "Savings Account", value: "savings" },
  ]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addBankAccountValidationSchema),
    defaultValues: {
      friendlyName: "",
      accountNumber: "",
      routingNumber: "",
      accountType: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: "createUserSourceBankAccount",
    mutationFn: (reqBody) => createUserSourceBankAccount(reqBody),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Bank account added",
      });
      if (router.canGoBack()) {
        router.back();
      }
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Failed to add bank account",
      });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <DarkSafeAreaView setEdgeToTop>
      <KeyboardAvoidingView
        style={{
          padding: 15,
          flex: 1,
          flexDirection: "column",
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              size="2xl"
              style={{
                marginBottom: 10,
              }}
            >
              Add a funding source
            </Text>
            <Text
              size="md"
              color={colors.inputPlaceholderColor}
              style={{ marginBottom: 10 }}
            >
              Link your bank account for easy credit card bill payments.
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Input
                    placeholder="Friendly Name"
                    onChangeText={onChange}
                    style={{ marginVertical: 10 }}
                    onBlur={onBlur}
                    value={value}
                  />
                  {value && (
                    <Text
                      size="xxs"
                      color={colors.inputPlaceholderColor}
                      style={{ marginTop: 5, marginLeft: 5 }}
                    >
                      This name will be shown on all transactions
                    </Text>
                  )}
                  <Text size="xs" color={colors.inputError}>
                    {errors.friendlyName?.message}
                  </Text>
                </View>
              )}
              name="friendlyName"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Input
                    keyboardType="number-pad"
                    placeholder="Bank Account Number"
                    onChangeText={onChange}
                    style={{ marginVertical: 10 }}
                    onBlur={onBlur}
                    value={value}
                  />
                  <Text size="xs" color={colors.inputError}>
                    {errors.accountNumber?.message}
                  </Text>
                </View>
              )}
              name="accountNumber"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Input
                    keyboardType="number-pad"
                    placeholder="Routing Number"
                    onChangeText={onChange}
                    style={{ marginVertical: 10 }}
                    onBlur={onBlur}
                    value={value}
                  />
                  <Text size="xs" color={colors.inputError}>
                    {errors.routingNumber?.message}
                  </Text>
                </View>
              )}
              name="routingNumber"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <DropDownPicker
                    placeholder="Select Account Type"
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    onSelectItem={(item) => {
                      onChange(item.value);
                    }}
                    setItems={setItems}
                    onOpen={() => {
                      Keyboard.dismiss();
                    }}
                    theme="DARK"
                    style={{
                      backgroundColor: colors.inputBg,
                      borderWidth: 0,
                    }}
                    textStyle={{
                      fontSize: 16,
                      fontFamily: "SF-Pro-Display-Regular",
                      paddingLeft: 4,
                      color: colors.inputPlaceholderColor,
                    }}
                    containerStyle={{
                      backgroundColor: colors.inputBg,
                      borderRadius: 8,
                      marginVertical: 10,
                    }}
                    labelStyle={{
                      backgroundColor: colors.inputBg,
                    }}
                  />
                  <Text size="xs" color={colors.inputError}>
                    {errors.accountType?.message}
                  </Text>
                </View>
              )}
              name="accountType"
            />
          </View>
        </TouchableWithoutFeedback>
        <Button onPress={handleSubmit(onSubmit)}>
          <Text>Add Account</Text>
        </Button>
      </KeyboardAvoidingView>
    </DarkSafeAreaView>
  );
}
