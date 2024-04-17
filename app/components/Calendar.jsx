import { colors } from "@constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { scale, verticalScale } from "@utils/scaling-utils";
import dayjs from "dayjs";
import { Fragment, useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Calendar as RNCalendar, LocaleConfig } from "react-native-calendars";

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
  const totalDue =
    cards.reduce((acc, card) => acc + card.nextPaymentMinimumAmount, 0) / 100;

  const noOfCards = cards.length;

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
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeaderContainer}>
            <Text size="2xl" style={styles.mrAuto}>
              {dayjs(selectedDate).format("MMMM DD, YYYY")}
            </Text>
            <IconButton
              onPress={() => setSelectedDate("")}
              IconStart={() => (
                <AntDesign name="close" size={24} color={colors.white} />
              )}
            />
          </View>
          <Text
            size="md"
            color={colors.inputPlaceholderColor}
            style={styles.summaryText}
          >
            A total of{" "}
            <Text bold size="md" color={colors.inputPlaceholderColor}>
              ${totalDue}
            </Text>{" "}
            is due across{" "}
            <Text bold size="md" color={colors.inputPlaceholderColor}>
              {noOfCards}
            </Text>
            {noOfCards > 1 ? " cards" : " card"}.
          </Text>
          <CardsList cards={cards} beforeNavigate={() => setSelectedDate("")} />
          <Button
            title="Close"
            onPress={() => setSelectedDate("")}
            style={styles.ph5}
          />
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
  br10: {
    borderRadius: 10,
  },
  modalContainer: { backgroundColor: colors.blackBg, padding: 20 },
  modalHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  mrAuto: {
    marginRight: "auto",
  },
  summaryText: {
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10),
  },
});
