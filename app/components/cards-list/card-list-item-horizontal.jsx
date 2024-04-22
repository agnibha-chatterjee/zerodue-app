import Amex from "@assets/images/card-bg/amex.png";
import Apple from "@assets/images/card-bg/apple.png";
import Barclays from "@assets/images/card-bg/barclays.png";
import Chase from "@assets/images/card-bg/chase.png";
import DiscountTire from "@assets/images/card-bg/discountTire.png";
import Paypal from "@assets/images/card-bg/paypal.png";
import WellsFargo from "@assets/images/card-bg/wellsFargo.png";
import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { getCardIssuer } from "@utils/common";
import { scale } from "@utils/scaling-utils";
import dayjs from "dayjs";
import { startCase } from "lodash";
import { View } from "moti";
import { ImageBackground } from "react-native";

const imgs = {
  chase: Chase,
  amex: Amex,
  apple: Apple,
  barclays: Barclays,
  discountTire: DiscountTire,
  paypal: Paypal,
  wellsFargo: WellsFargo,
};

export function CardListItemHorizontal(props) {
  const { item } = props;

  const issuer = getCardIssuer(item.name ?? "");

  const image = imgs[issuer];
  const limit = item.creditLimit
    ? item.creditLimit / 100
    : item.availableCredit / 100;
  const minAmount = item.nextPaymentMinimumAmount / 100;
  const dueDate = dayjs(item.nextPaymentDueDate).format("MMM DD");

  return (
    <ImageBackground
      source={image}
      imageStyle={{
        borderRadius: scale(10),
      }}
      style={{
        flex: 1,
        width: scale(185),
        marginRight: scale(15),
        padding: scale(15),
      }}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Text size="lg" bold>
            {startCase(issuer)}
          </Text>
          <Text>**** {item.mask}</Text>
        </View>
        <View style={{ marginTop: "auto" }}>
          <Text size="xl" bold>
            ${limit}
          </Text>
          <Text>Balance</Text>
          <Text>
            ${minAmount} due by {dueDate}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
