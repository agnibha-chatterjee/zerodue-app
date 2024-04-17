import { daysOfTheWeek } from "@constants/calendar";
import { colors } from "@constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { scale, verticalScale } from "@utils/scaling-utils";
import dayjs from "dayjs";
import { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";

import { DarkSafeAreaView } from "./DarkSafeAreaView";
import { Button } from "./button";
import { IconButton } from "./button/icon-btn";
import { CardsList } from "./cards-list";
import { Text } from "./text";

export function Calendar(props) {
  const { markedDates = {}, markedDatesInfo = {} } = props;
  const [selectedDate, setSelectedDate] = useState("");
  const cards = markedDatesInfo[selectedDate] ?? [];

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
          setSelectedDate(dateString);
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
        visible={!!selectedDate}
        animationType="slide"
        style={{ height: 500, backgroundColor: colors.white }}
        presentationStyle="pageSheet"
      >
        <DarkSafeAreaView>
          <View style={{ padding: 20 }}>
            <View style={styles.modalHeaderContainer}>
              <Text
                size="2xl"
                style={{
                  marginRight: "auto",
                }}
              >
                {dayjs(selectedDate).format("MMMM DD, YYYY")}
              </Text>
              <IconButton
                onPress={() => setSelectedDate("")}
                IconStart={() => (
                  <AntDesign name="close" size={24} color={colors.white} />
                )}
              />
            </View>
            <CardsList cards={cards} />
            <Button
              title="Close"
              onPress={() => setSelectedDate("")}
              style={styles.ph5}
            />
          </View>
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
  modalHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});
