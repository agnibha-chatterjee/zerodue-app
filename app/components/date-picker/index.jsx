import { Input } from "@components/text-input";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export function DatePicker(props) {
  const {
    value = undefined,
    onChange = undefined,
    onFocus = undefined,
  } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(value ?? dayjs().format("MM-DD-YYYY"));

  useEffect(() => {
    if (onChange) {
      onChange(date);
    }
  }, [date]);

  return (
    <View>
      <Input
        {...props}
        onFocus={() => {
          setDatePickerVisibility(true);
          if (onFocus) {
            onFocus();
          }
        }}
        value={date}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={dayjs().subtract(18, "year").toDate()}
        onConfirm={(date) => {
          const formattedDate = dayjs(date).format("YYYY-MM-DD");
          setDate(formattedDate);
          setDatePickerVisibility(false);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
}

DatePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
};
