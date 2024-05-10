import Amex from "@assets/images/card-bg/amex.png";
import Apple from "@assets/images/card-bg/apple.png";
import Barclays from "@assets/images/card-bg/barclays.png";
import Chase from "@assets/images/card-bg/chase.png";
import DiscountTire from "@assets/images/card-bg/discountTire.png";
import Paypal from "@assets/images/card-bg/paypal.png";
import WellsFargo from "@assets/images/card-bg/wellsFargo.png";
import { Text } from "@components/text";
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
  visa: Apple,
};

export function CardListItemHorizontal(props) {
  const { item } = props;

  const issuer = getCardIssuer(item.name ?? "");

  const image = imgs[issuer];

  const dueDate = dayjs(item.statementSummary.dueDate).format("MMM DD");

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
          <Text>**** {item.cardProfile.creditCardNumberMasked.slice(12)}</Text>
        </View>
        <View style={{ marginTop: "auto" }}>
          <Text size="xl" bold>
            ${item.cardProfile.creditLimit}
          </Text>
          <Text>Balance</Text>
          <Text>
            ${item.balanceDetails.outstandingBalance} due by {dueDate}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
