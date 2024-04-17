import { daysOfTheWeek } from "@constants/calendar";
import { colors } from "@constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { scale, verticalScale } from "@utils/scaling-utils";
import dayjs from "dayjs";
import { Fragment, useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Calendar as RNCalendar, LocaleConfig } from "react-native-calendars";

import { DarkSafeAreaView } from "./DarkSafeAreaView";
import { Button } from "./button";
import { IconButton } from "./button/icon-btn";
import { CardsList } from "./cards-list";
import { Text } from "./text";

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
};

LocaleConfig.defaultLocale = "en";

export function Calendar(props) {
  const { markedDates = {}, markedDatesInfo = {} } = props;
  const [selectedDate, setSelectedDate] = useState("");
  const cards = markedDatesInfo[selectedDate] ?? [];

  return (
    <>
      <Text
        bold
        size="md"
        style={{ marginLeft: scale(10), marginBottom: verticalScale(-17.5) }}
      >
        April 2024
      </Text>
      <RNCalendar
        customHeaderTitle={<View />}
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
        theme={{
          dayTextColor: colors.white,
          monthTextColor: colors.white,
          calendarBackground: colors.transparent,
          backgroundColor: colors.transparent,
          textDayFontFamily: "SF-Pro-Display-Regular",
          todayTextColor: colors.white,
          todayBackgroundColor: colors.todaysDateBg,
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
