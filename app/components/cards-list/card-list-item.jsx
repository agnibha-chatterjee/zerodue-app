import { IconButton } from "@components/button/icon-btn";
import { TextButton } from "@components/button/text-btn";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { gradients } from "@constants/gradients";
import { Entypo } from "@expo/vector-icons";
import { getCardIssuer } from "@utils/common";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { startCase } from "lodash";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

export function CardListItem(props) {
  const { item, selectable, onSelect, selectedCards, beforeNavigate } = props;
  const [selected, setSelected] = useState(selectedCards.includes(item.name));
  const [pressed, setPressed] = useState(false);

  const Component = selectable ? Pressable : View;

  const issuer = getCardIssuer(item.name ?? "");

  const gradient = gradients[issuer];

  const rootStyles = selectable
    ? ({ pressed }) => [
        {
          opacity: pressed ? 0.85 : 1,
          flexDirection: "row",
          justifyContent: "space-between",
        },
      ]
    : {
        flexDirection: "row",
        justifyContent: "space-between",
      };

  useEffect(() => {
    if (selected) {
      onSelect((prevState) => [...prevState, item.id]);
    } else {
      onSelect((prevState) => prevState.filter((card) => card !== item.id));
    }
  }, [selected, onSelect, item.id]);

  const handlePress = selectable
    ? () => {
        setSelected((prevState) => !prevState);
      }
    : null;

  const additionalProps = {
    onPressIn: () => setPressed(true),
    onPressOut: () => setPressed(false),
  };

  const handleRedirectToInitiatePayment = () => {
    if (beforeNavigate) {
      beforeNavigate();
    }

    router.push("screens/(tabs)/payments/initiate-payment");
  };

  return (
    <LinearGradient
      colors={[gradient.from, gradient.to]}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 8,
        marginVertical: 5,
        borderColor: colors.inputPlaceholderColor,
        borderWidth: selected ? 2 : 0,
        height: 130,
      }}
    >
      <Component style={rootStyles} onPress={handlePress}>
        <View>
          <Text size="xl" bold>
            {startCase(issuer)}
          </Text>
          <TextButton
            style={{
              marginTop: 3,
            }}
            {...additionalProps}
          >
            <Text size="xxs">
              {pressed
                ? item.cardProfile.creditCardNumberMasked
                : `**** **** **** 0000`}
            </Text>
          </TextButton>
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
            {`$${item.balanceDetails.outstandingBalance}`}
          </Text>
          <Text
            style={{ marginVertical: 5, textAlign: "right" }}
            color={colors.inputPlaceholderColor}
          >
            Due on {dayjs(item.statementSummary.dueDate).format("MMM DD, YYYY")}
          </Text>
          {!!item.nextPaymentMinimumAmount && (
            <IconButton
              style={{ marginTop: 5, alignSelf: "flex-end" }}
              onPress={handleRedirectToInitiatePayment}
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
          )}
        </View>
      </Component>
    </LinearGradient>
  );
}
