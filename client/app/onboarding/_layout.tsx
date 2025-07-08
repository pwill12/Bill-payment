import React, { useEffect, useState } from "react";
import { getItem } from "@/utils/asyncStorage";
import Mytab from "../(tabs)/_layout";
import Login from "../(auth)";
import WelcomeScreen from "./index";
import { Redirect } from "expo-router";

const Index = () => {
  const [no_onboard, setno_onboard] = useState<boolean | null>(null);

  useEffect(() => {
    checkstate();
  }, []);

  const checkstate = async () => {
    let onboarded = await getItem("onboarded");
    console.log(onboarded)
    if (onboarded === 'true') {
      setno_onboard(true);
      console.log('yes')
    } else {
      setno_onboard(null);
    }
  };

  if (no_onboard) {
    return <Redirect href='/(tabs)'/>;
  } else if(no_onboard === null) {
    return <WelcomeScreen />;
  }
};

export default Index;
