import { Text } from "@components/text";
import { Circle, useFont } from "@shopify/react-native-skia";
import { scale, verticalScale } from "@utils/scaling-utils";
import { View } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

import { DChart } from "./donut-chart";

const RADIUS = 85;
const STROKE_WIDTH = 20;
const OUTER_STROKE_WIDTH = 46;
const GAP = 0;
const colors = ["#fa75f8", "#6DA1FF", "#4e9b6c", "#fecb31"];
const n = 4;

export function calculatePercentage(numbers, total) {
  const percentageArray = [];

  numbers.forEach((number) => {
    const percentage = Math.round((number / total) * 100);

    percentageArray.push(percentage);
  });

  return percentageArray;
}

export function generateRandomNumbers(n) {
  const min = 100;
  const max = 500;
  const result = [];

  for (let i = 0; i < n; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    result.push(randomNumber);
  }

  return result;
}

export function DonutChart() {
  const font = useFont(require("@assets/fonts/SF-Pro-Display-Bold.otf"), 26);
  const smallFont = useFont(
    require("@assets/fonts/SF-Pro-Display-Regular.otf"),
    14
  );

  const dummyData = [
    {
      expense: "Rent + Utilities",
      color: "#fa75f8",
      percentage: 0.45,
      value: 2340,
    },
    {
      expense: "Groceries",
      color: "#6DA1FF",
      percentage: 0.33,
      value: 1716,
    },
    {
      expense: "Shopping",
      color: "#4e9b6c",
      percentage: 0.15,
      value: 780,
    },
    {
      expense: "Everything else",
      color: "#fecb31",
      percentage: 0.07,
      value: 364,
    },
  ];

  const totalValue = useSharedValue(5200);
  const decimals = useSharedValue([0.45, 0.33, 0.15, 0.07]);

  if (!font || !smallFont) {
    return <View />;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: verticalScale(RADIUS * verticalScale(1.25)),
      }}
    >
      <DChart
        radius={RADIUS}
        gap={GAP}
        strokeWidth={STROKE_WIDTH}
        outerStrokeWidth={OUTER_STROKE_WIDTH}
        font={font}
        smallFont={smallFont}
        totalValue={totalValue}
        n={n}
        decimals={decimals}
        colors={colors}
      />

      <View>
        {dummyData.map((data, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: verticalScale(3.5),
              }}
            >
              <View
                style={{
                  height: scale(7.5),
                  width: scale(7.5),
                  borderRadius: scale(3.75),
                  backgroundColor: data.color,
                  marginRight: scale(7.5),
                }}
              />
              <View>
                <Text>{data.expense}</Text>
                <Text bold>${data.value}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
