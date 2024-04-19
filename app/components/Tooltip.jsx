import { colors } from "@constants/colors";
import { useState } from "react";
import RNTooltip from "react-native-walkthrough-tooltip";

import { IconButton } from "./button/icon-btn";

export function Tooltip(props) {
  const { IconStart, IconEnd, children, TooltipContent } = props;
  const [isVisible, setIsVisible] = useState(false);
  return (
    <RNTooltip
      isVisible={isVisible}
      content={TooltipContent}
      placement="top"
      contentStyle={{
        backgroundColor: colors.blackBg,
      }}
      onClose={() => {
        setIsVisible(false);
      }}
    >
      <IconButton
        onPress={() => setIsVisible(true)}
        IconStart={IconStart}
        IconEnd={IconEnd}
      >
        {children}
      </IconButton>
    </RNTooltip>
  );
}
