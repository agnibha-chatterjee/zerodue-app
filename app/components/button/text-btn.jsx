import { Pressable } from "react-native";

export function TextButton(props) {
  const { children, backgroundColor, style, ...remainingProps } = props;

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor,
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}
      {...remainingProps}
    >
      {children}
    </Pressable>
  );
}
