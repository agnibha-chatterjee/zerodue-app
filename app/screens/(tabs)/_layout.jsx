import { Text } from "@components/text";
import { colors } from "@constants/colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: 10,
          backgroundColor: colors.blackBg,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.inputPlaceholderColor,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={28}
              color={focused ? colors.white : colors.inputPlaceholderColor}
            />
          ),
          tabBarLabel: () => <Text size="xxs">Home</Text>,
        }}
      />
      <Tabs.Screen
        name="cards/index"
        options={{
          title: "Cards",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="grid-outline"
              size={28}
              color={focused ? colors.white : colors.inputPlaceholderColor}
            />
          ),
          tabBarLabel: () => <Text size="xxs">Cards</Text>,
        }}
      />
      <Tabs.Screen
        name="rewards/index"
        options={{
          title: "Rewards",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="gift"
              size={28}
              color={focused ? colors.white : colors.inputPlaceholderColor}
            />
          ),
          tabBarLabel: () => <Text size="xxs">Rewards</Text>,
        }}
      />
    </Tabs>
  );
}
