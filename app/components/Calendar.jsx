import { colors } from "@constants/colors";
import { scale, verticalScale } from "@utils/scaling-utils";
import dayjs from "dayjs";
import { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";
import BasicDay from "react-native-calendars/src/calendar/day/basic";
import Tooltip from "react-native-walkthrough-tooltip";

import { Button } from "./button";
import { Text } from "./text";

const orangeDot = { key: "orangeDot", color: colors.orangeDot };
const lavenderDot = {
  key: "lavenderDot",
  color: colors.lavenderDot,
};

export function Calendar() {
  const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <>
      <RNCalendar
        disableMonthChange
        renderArrow={() => null}
        hideExtraDays
        style={{ borderRadius: 10 }}
        onDayPress={() => setShowInfoModal(true)}
        markingType="multi-dot"
        customHeader={({ month }) => {
          return (
            <View>
              <Text bold size="md" style={styles.ph5}>
                {dayjs(month).format("MMMM YYYY")}
              </Text>
              <View style={[styles.daysOfTheWeekContainer, styles.ph5]}>
                {daysOfTheWeek.map((day) => (
                  <Text key={day} color={colors.calendarDayTextColor}>
                    {day}
                  </Text>
                ))}
              </View>
            </View>
          );
        }}
        theme={{
          dayTextColor: colors.white,
          monthTextColor: colors.white,
          calendarBackground: colors.transparent,
          backgroundColor: colors.transparent,
          textDayFontFamily: "SF-Pro-Display-Regular",
        }}
        markedDates={{
          "2024-04-20": { marked: true, dots: [orangeDot, lavenderDot] },
          "2024-04-21": { marked: true, dots: [lavenderDot] },
          "2024-04-22": { marked: true, dots: [orangeDot] },
        }}
      />
      <Modal
        visible={showInfoModal}
        animationType="slide"
        style={{ height: 500, backgroundColor: colors.white }}
        presentationStyle="pageSheet"
      >
        <View>
          <Text>Agni</Text>
          <Button onPress={() => setShowInfoModal(false)}>
            <Text>Close Modal</Text>
          </Button>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  ph5: {
    paddingHorizontal: scale(7.5),
  },
  daysOfTheWeekContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: verticalScale(10),
  },
});
