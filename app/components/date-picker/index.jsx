import { useEffect, useState } from "react";
import { View } from "react-native";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PropTypes from "prop-types";
import { Input } from "@components/text-input";

export function DatePicker(props) {
  const {
    value = undefined,
    onChange = undefined,
    onFocus = undefined,
  } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(value ?? valuedayjs().format("MM-DD-YYYY"));

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
        onConfirm={(date) => {
          const formattedDate = dayjs(date).format("MM-DD-YYYY");
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
