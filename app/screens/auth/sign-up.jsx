import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@components/button";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Text } from "@components/text";
import { Input } from "@components/text-input";
import { colors } from "@constants/colors";
import { DatePicker } from "@components/date-picker";
import { signupValidationSchema } from "@schemas/signup-validation";

export default function SignupScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupValidationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dateOfBirth: "",
    },
  });

  const onSubmit = (data) => {
    router.push({
      pathname: "screens/auth/otp-verification",
      params: data,
    });
  };

  return (
    <DarkSafeAreaView>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              size="xl"
              style={{
                marginBottom: 20,
              }}
            >
              Create your account
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Input
                    placeholder="First name"
                    style={{ marginVertical: 10 }}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  <Text size="xs" color={colors.inputError}>
                    {errors.firstName?.message}
                  </Text>
                </View>
              )}
              name="firstName"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Input
                    placeholder="Last name"
                    style={{ marginVertical: 10 }}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  <Text size="xs" color={colors.inputError}>
                    {errors.lastName?.message}
                  </Text>
                </View>
              )}
              name="lastName"
            />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    paddingLeft: 5,
                    width: 35,
                    backgroundColor: colors.inputBg,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                  }}
                >
                  <Text>+1</Text>
                </View>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Phone number"
                      style={{
                        marginVertical: 10,
                        flexGrow: 1,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        paddingHorizontal: 0,
                      }}
                      onChangeText={onChange}
                      onBlur={onBlur}
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
                    style={{ marginVertical: 10 }}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    onFocus={() => Keyboard.dismiss()}
                  />
                  <Text size="xs" color={colors.inputError}>
                    {errors.dateOfBirth?.message}
                  </Text>
                </View>
              )}
              name="dateOfBirth"
            />
          </View>
        </TouchableWithoutFeedback>
        <Button
          btnStyle={{ marginTop: "auto" }}
          onPress={handleSubmit(onSubmit)}
        >
          Sign up
        </Button>
      </KeyboardAvoidingView>
    </DarkSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 40,
    paddingBottom: 20,
    flex: 1,
    flexDirection: "column",
  },
});
