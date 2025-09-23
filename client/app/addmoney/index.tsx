import React from "react";
import HeaderName from "@/components/HeaderName";
import BonusReward from "@/components/ExtrasCard";
import { addMoneyCard, CategoryProps } from "@/utils/data";
import { useCurrentUser } from "@/hooks/useCurrentuser";
import { router } from "expo-router";
import { Alert } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useStripePublic } from "@/hooks/useStripe";

const AddMoney = () => {
  const { currentUser } = useCurrentUser();
  const { publicKey } = useStripePublic();
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
    <StripeProvider publishableKey={publicKey}>
      <HeaderName headertext="Add Money">
        <BonusReward
          type={addMoneyCard}
          addmoney
          username={currentUser?.username}
          onCategoryPress={handlePress}
        />
      </HeaderName>
    </StripeProvider>
  );
};

export default AddMoney;
