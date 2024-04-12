import { IconButton } from "@components/button/icon-btn";
import { TextButton } from "@components/button/text-btn";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { gradients } from "@constants/gradients";
import { Entypo } from "@expo/vector-icons";
import { getCardIssuer } from "@utils/common";
import { LinearGradient } from "expo-linear-gradient";
import { startCase } from "lodash";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

export function CardListItem(props) {
  const { item, selectable, onSelect, selectedCards } = props;
  const [selected, setSelected] = useState(selectedCards.includes(item.name));
  const [pressed, setPressed] = useState(false);

  const Component = selectable ? Pressable : View;

  const issuer = getCardIssuer(item.name);

  const gradient = gradients[issuer];

  const amountOwed = item.nextPaymentMinimumAmount / 100;

  const amountOwedToBeDisplayed =
    amountOwed % 1 === 0 ? amountOwed : amountOwed.toFixed(2);

  const splitCardNumber = item.cardNumber.match(/.{1,4}/g);

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
      onSelect((prevState) => [...prevState, item.name]);
    } else {
      onSelect((prevState) => prevState.filter((card) => card !== item.name));
    }
  }, [selected, onSelect, item.name]);

  const handlePress = selectable
    ? () => {
        setSelected((prevState) => !prevState);
      }
    : null;

  const additionalProps = {
    onPressIn: () => setPressed(true),
    onPressOut: () => setPressed(false),
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
              {pressed ? splitCardNumber.join(" ") : `**** **** **** 0000`}
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
            {`$${amountOwedToBeDisplayed}`}
          </Text>
          <Text
            style={{ marginVertical: 5, textAlign: "right" }}
            color={colors.inputPlaceholderColor}
          >
            Due on Apr 15, 2024
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
      </Component>
    </LinearGradient>
  );
}
