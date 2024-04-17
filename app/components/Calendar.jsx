import { colors } from "@constants/colors";
import { scale, verticalScale } from "@utils/scaling-utils";
import dayjs from "dayjs";
import { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";

import { DarkSafeAreaView } from "./DarkSafeAreaView";
import { Button } from "./button";
import { Text } from "./text";

const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function Calendar(props) {
  const { markedDates = {} } = props;

  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <>
      <RNCalendar
        disableMonthChange
        renderArrow={() => null}
        hideExtraDays
        style={styles.br10}
        onDayPress={(date) => {
          const { dateString } = date;
          if (!markedDates[dateString]) return;
          setShowInfoModal(true);
        }}
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
        markedDates={markedDates}
      />
      <Modal
        visible={showInfoModal}
        animationType="slide"
        style={{ height: 500, backgroundColor: colors.white }}
        presentationStyle="pageSheet"
      >
        <DarkSafeAreaView>
          <Text>Agni</Text>
          <Button onPress={() => setShowInfoModal(false)}>
            <Text>Close Modal</Text>
          </Button>
        </DarkSafeAreaView>
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
  br10: {
    borderRadius: 10,
  },
});
