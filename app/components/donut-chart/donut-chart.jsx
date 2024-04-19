import { colors as appColors } from "@constants/colors";
import { Canvas, Path, Skia, Text } from "@shopify/react-native-skia";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useDerivedValue } from "react-native-reanimated";

import { DonutPath } from "./donut-path";

export function DChart({
  n,
  gap,
  decimals,
  colors,
  totalValue,
  strokeWidth,
  outerStrokeWidth,
  radius,
  font,
  smallFont,
}) {
  const array = Array.from({ length: n });
  const innerRadius = radius - outerStrokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const targetText = useDerivedValue(
    () => `$${Math.round(totalValue.value)}`,
    []
  );

  const fontSize = font.measureText("$00");
  const smallFontSize = smallFont.measureText("Expenses");

  const textX = useDerivedValue(() => {
    const _fontSize = font.measureText(targetText.value);
    return radius - _fontSize.width / 2;
  }, []);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color="transparent"
          style="stroke"
          strokeJoin="round"
          strokeWidth={outerStrokeWidth}
          strokeCap="square"
          start={0}
          end={1}
        />
        {array.map((_, index) => {
          return (
            <DonutPath
              key={index}
              radius={radius}
              strokeWidth={strokeWidth}
              outerStrokeWidth={outerStrokeWidth}
              color={colors[index]}
              decimals={decimals}
              index={index}
              gap={0}
            />
          );
        })}
        <Text
          x={radius - smallFontSize.width / 2}
          y={radius + smallFontSize.height / 2 - fontSize.height / 1.2}
          text="Expenses"
          font={smallFont}
          color={appColors.inputPlaceholderColor}
        />
        <Text
          x={textX}
          y={radius + fontSize.height / 2}
          text={targetText}
          font={font}
          color={appColors.white}
        />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
