import OnboardingItem1 from "@assets/images/onboarding/onboarding-1.png";
import OnboardingItem2 from "@assets/images/onboarding/onboarding-2.png";
import OnboardingItem3 from "@assets/images/onboarding/onboarding-3.png";
import OnboardingItem4 from "@assets/images/onboarding/onboarding-4.png";
import { DarkSafeAreaView } from "@components/DarkSafeAreaView";
import { Button } from "@components/button";
import { Text } from "@components/text";
import { colors as appColors } from "@constants/colors";
import { scale, verticalScale } from "@utils/scaling-utils";
import { router } from "expo-router";
import * as React from "react";
import { Dimensions, Image, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import Toast from "react-native-toast-message";

const onboardingImages = [
  OnboardingItem1,
  OnboardingItem2,
  OnboardingItem3,
  OnboardingItem4,
];

function Index() {
  const progressValue = useSharedValue(0);

  const window = Dimensions.get("window");
  const WINDOW_WIDTH = window.width;

  const baseOptions = {
    vertical: false,
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH * 0.6,
  };

  return (
    <DarkSafeAreaView>
      <View style={{ alignItems: "center" }}>
        <Carousel
          {...baseOptions}
          style={{
            height: window.height - verticalScale(215),
            width: WINDOW_WIDTH,
          }}
          loop
          autoPlay
          autoPlayInterval={2500}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          data={onboardingImages}
          renderItem={({ index }) => (
            <View key={index}>
              <Image
                source={onboardingImages[index]}
                style={{
                  resizeMode: "contain",
                  height: window.height - verticalScale(200),
                  width: WINDOW_WIDTH,
                }}
              />
            </View>
          )}
        />
        {!!progressValue && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: scale(85),
              alignSelf: "center",
            }}
          >
            {onboardingImages.map((backgroundColor, index) => {
              return (
                <PaginationItem
                  animValue={progressValue}
                  index={index}
                  key={index}
                  length={onboardingImages.length}
                />
              );
            })}
          </View>
        )}
      </View>

      <Button
        style={{
          marginTop: verticalScale(50),
          marginHorizontal: scale(20),
        }}
        onPress={() => {
          router.push("screens/auth/sign-up");
        }}
      >
        <Text>Get started</Text>
      </Button>
      <Button
        backgroundColor={appColors.black}
        style={{
          marginTop: verticalScale(10),
          marginHorizontal: scale(20),
        }}
        onPress={() => {
          router.push("screens/sample/spinwheel-dim");
        }}
      >
        <Text>Continue with Phone Number</Text>
      </Button>
    </DarkSafeAreaView>
  );
}

const PaginationItem = (props) => {
  const { animValue, index, length, isRotate } = props;
  const width = 20;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);

  return (
    <View
      style={{
        backgroundColor: appColors.onboardingCarouselInactiveBg,
        width,
        height: 5,
        overflow: "hidden",
        borderRadius: 10,
        transform: [
          {
            rotateZ: isRotate ? "90deg" : "0deg",
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor: appColors.btnBg,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default Index;
