import { IconButton } from "@components/button/icon-btn";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { gradients } from "@constants/gradients";
import { Entypo } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { startCase } from "lodash";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

export function CardsList(props) {
  const { isLoading } = props;

  const cards = [
    {
      name: "alaska",
      amount: 500,
      dueDate: "Feb 18",
    },
    {
      name: "chase",
      amount: 500,
      dueDate: "Feb 18",
    },
    {
      name: "bofa",
      amount: 500,
      dueDate: "Feb 18",
    },
  ];

  return (
    <View style={{ height: "100%" }}>
      <FlashList
        data={cards}
        estimatedItemSize={10}
        renderItem={({ item, index }) => {
          return isLoading ? (
            <View style={{ marginVertical: 7.5 }}>
              <Skeleton width="100%" height={120} />
            </View>
          ) : (
            <LinearGradient
              key={index}
              colors={[gradients[item.name].from, gradients[item.name].to]}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 15,
                borderRadius: 8,
                marginVertical: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text size="xl" bold>
                    {startCase(item.name)}
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
                    {`$${item.amount}`}
                  </Text>
                  <Text
                    style={{ marginVertical: 5, textAlign: "right" }}
                    color={colors.inputPlaceholderColor}
                  >
                    {`Due on ${item.dueDate}`}
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
          );
        }}
      />
    </View>
  );
}
