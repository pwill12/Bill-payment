import React from "react";
import HeaderName from "@/components/HeaderName";
import BonusReward from "@/components/ExtrasCard";
import { addMoneyCard, CategoryProps } from "@/utils/data";
import { useCurrentUser } from "@/hooks/useCurrentuser";
import { router } from "expo-router";
import { Alert } from "react-native";

const AddMoney = () => {
  const { currentUser } = useCurrentUser();
  const handlePress = (category: CategoryProps) => {
    const page = category?.page;
    {
      page && router.push(`/${page}`);
    }
    if (!page) {
      Alert.alert("Upcoming", "Feature will be added soon");
    }
  };

  return (
    <HeaderName headertext="Add Money">
      <BonusReward
        type={addMoneyCard}
        addmoney
        username={currentUser?.username}
        onCategoryPress={handlePress}
      />
    </HeaderName>
  );
};

export default AddMoney;
