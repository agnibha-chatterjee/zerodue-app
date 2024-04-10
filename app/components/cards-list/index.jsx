import { IconButton } from "@components/button/icon-btn";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

export function CardsList() {
  return (
    <View>
      <LinearGradient
        colors={["#2B3150", "#424A72"]}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderRadius: 8,
          marginVertical: 5,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text size="xl" bold>
              Alaska
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Text
              size="2xl"
              bold
              style={{ marginBottom: 2.5, textAlign: "right" }}
            >
              $500
            </Text>
            <Text
              style={{ marginVertical: 5, textAlign: "right" }}
              color={colors.inputPlaceholderColor}
            >
              Due by Feb 18
            </Text>
            <IconButton
              style={{ marginTop: 5, alignSelf: "flex-end" }}
              IconEnd={() => (
                <Entypo
                  name="chevron-small-right"
                  size={24}
                  color={colors.white}
                />
              )}
            >
              <Text style={{ textAlign: "right" }}>Pay Now</Text>
            </IconButton>
          </View>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={["#283888", "#1D1F4D"]}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderRadius: 8,
          marginVertical: 5,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text size="xl" bold>
              Chase
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Text
              size="2xl"
              bold
              style={{ marginBottom: 2.5, textAlign: "right" }}
            >
              $500
            </Text>
            <Text
              style={{ marginVertical: 5, textAlign: "right" }}
              color={colors.inputPlaceholderColor}
            >
              Due by Feb 18
            </Text>
            <IconButton
              style={{ marginTop: 5, alignSelf: "flex-end" }}
              IconEnd={() => (
                <Entypo
                  name="chevron-small-right"
                  size={24}
                  color={colors.white}
                />
              )}
            >
              <Text style={{ textAlign: "right" }}>Pay Now</Text>
            </IconButton>
          </View>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={["#283888", "#1D1F4D"]}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderRadius: 8,
          marginVertical: 5,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text size="xl" bold>
              Chase
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Text
              size="2xl"
              bold
              style={{ marginBottom: 2.5, textAlign: "right" }}
            >
              $500
            </Text>
            <Text
              style={{ marginVertical: 5, textAlign: "right" }}
              color={colors.inputPlaceholderColor}
            >
              Due by Feb 18
            </Text>
            <IconButton
              style={{ marginTop: 5, alignSelf: "flex-end" }}
              IconEnd={() => (
                <Entypo
                  name="chevron-small-right"
                  size={24}
                  color={colors.white}
                />
              )}
            >
              <Text style={{ textAlign: "right" }}>Pay Now</Text>
            </IconButton>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
