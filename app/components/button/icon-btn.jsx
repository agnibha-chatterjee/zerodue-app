import { Pressable, View } from "react-native";

export function IconButton(props) {
  const {
    children,
    backgroundColor,
    style,
    IconStart = null,
    IconEnd = null,
    iconContainerStyle = {},
    ...remainingProps
  } = props;

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor,
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
      {...remainingProps}
    >
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
          },
          iconContainerStyle,
        ]}
      >
        {IconStart && <IconStart />}
        {children}
        {IconEnd && <IconEnd />}
      </View>
    </Pressable>
  );
}
