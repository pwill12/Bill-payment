import React, { useEffect, useRef } from "react";
import Onboarding from "react-native-onboarding-swiper";
import { LottieAnimation } from "../../assets/index";
import { BLOSSOMCOLORS, OCEANCOLORS, RETROCOLORS } from "@/constants/color";
import { homestyles } from "@/assets/styles/home.styles";
import LottieView from "lottie-react-native";
import NextButton from "../../components/NextButton";
import { setItem } from "@/utils/asyncStorage";
import { StatusBar } from "react-native";
import { navigate } from "expo-router/build/global-state/routing";
import { Redirect } from "expo-router";

const WelcomeScreen = () => {
  const handleDone = async() => {
    await setItem("onboarded", 'true');
    navigate('/(auth)')
  };

  const nextbutton = ({ ...props }) => {
    return <NextButton {...props} />;
  };

  return (
    <>
    <Onboarding
      onDone={handleDone}
      onSkip={handleDone}
      DoneButtonComponent={nextbutton}
      bottomBarHighlight={false}
      containerStyles={homestyles.container}
      pages={[
        {
          image: (
            <LottieView
              source={LottieAnimation.introduction_animation}
              style={homestyles.lottie}
              autoPlay
              loop
            />
          ),
          title: "Billy App",
          backgroundColor: RETROCOLORS.background,
          subtitle: "Pay Bills Instantly without hassle or stress",
          titleStyles: homestyles.text,
          subTitleStyles: homestyles.subtext,
        },
        {
          image: (
            <LottieView
              source={LottieAnimation.animation2}
              style={homestyles.lottie}
              autoPlay
              loop
            />
          ),
          title: "Automated Billing",
          backgroundColor: BLOSSOMCOLORS.background,
          subtitle:
            "Pay Bills Instantly without hassle or stress automatically",
          titleStyles: homestyles.text,
          subTitleStyles: homestyles.subtext,
        },
      ]}
    />
    </>
  );
};

export default WelcomeScreen;
