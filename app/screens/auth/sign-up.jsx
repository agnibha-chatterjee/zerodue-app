import { sendVerificationSms } from "@api/auth-api";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Button } from "@components/button";
import { DatePicker } from "@components/date-picker";
import { Text } from "@components/text";
import { Input } from "@components/text-input";
import { colors } from "@constants/colors";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupValidationSchema } from "@schemas/signup-validation";
import { formatPhoneNumber, unformatPhoneNumber } from "@utils/common";
import { scale, verticalScale } from "@utils/scaling-utils";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { useMutation } from "react-query";

export default function SignupScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(signupValidationSchema),
    defaultValues: {
      phoneNumber: "",
      dob: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: "generateOtp",
    mutationFn: (reqBody) => sendVerificationSms(reqBody),
    onSuccess: (responseData) => {
      const formData = getValues();
      router.push({
        pathname: "screens/auth/otp-verification",
        params: {
          ...responseData,
          ...formData,
          phoneNumber: `+1${unformatPhoneNumber(formData.phoneNumber)}`,
        },
      });
    },
  });

  const onSubmit = (data) => {
    mutate({
      ...data,
      phoneNumber: `+1${unformatPhoneNumber(data.phoneNumber)}`,
    });
  };

  return (
    <DarkSafeAreaView outsideTabNavigator>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={{ flex: 1 }}>
            <Text size="2xl" style={styles.mb20}>
              Create your account
            </Text>
            <View>
              <View style={styles.phoneCodeContainer}>
                <View style={styles.phoneCode}>
                  <Text>+1</Text>
                </View>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Phone number"
                      keyboardType="number-pad"
                      style={styles.phoneNumberInput}
                      onChangeText={onChange}
                      onBlur={() => {
                        if (value) {
                          const unformattedPhoneNumber =
                            unformatPhoneNumber(value);
                          const formattedPhoneNumber = formatPhoneNumber(
                            unformattedPhoneNumber
                          );
                          onChange(formattedPhoneNumber);
                        }
                        onBlur();
                      }}
                      value={value}
                    />
                  )}
                  name="phoneNumber"
                />
              </View>
              <Text size="xs" color={colors.inputError}>
                {errors.phoneNumber?.message}
              </Text>
            </View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <DatePicker
                    placeholder="Date of Birth"
                    style={styles.mv10}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    onFocus={() => Keyboard.dismiss()}
                  />
                  <Text size="xs" color={colors.inputError}>
                    {errors.dob?.message}
                  </Text>
                </View>
              )}
              name="dob"
            />
          </View>
        </TouchableWithoutFeedback>
        <Button
          style={styles.mtAuto}
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
        >
          <Text>Sign up</Text>
        </Button>
      </KeyboardAvoidingView>
    </DarkSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: scale(15),
    paddingTop: verticalScale(35),
    paddingBottom: verticalScale(18),
    flex: 1,
    flexDirection: "column",
  },
  mtAuto: {
    marginTop: "auto",
  },
  mv10: {
    marginVertical: scale(10),
  },
  mb20: {
    marginBottom: verticalScale(18),
  },
  phoneCodeContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  phoneCode: {
    paddingLeft: 5,
    width: 35,
    backgroundColor: colors.inputBg,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  phoneNumberInput: {
    marginVertical: verticalScale(8),
    flexGrow: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 0,
  },
});
