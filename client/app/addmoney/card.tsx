import { View, Text, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderName from "@/components/HeaderName";
import {
  initPaymentSheet,
  presentPaymentSheet,
  StripeProvider,
} from "@stripe/stripe-react-native";
import { usePaymentSheet, useStripePublic } from "@/hooks/useStripe";
import NumberInputs from "@/components/NumberInputs";
import TransactionButton from "@/components/TransactionButton";
import { useCurrentUser } from "@/hooks/useCurrentuser";

const CardDeposit = () => {
  const { currentUser } = useCurrentUser();
  const [amount, setamount] = useState("");
  const [loading, setLoading] = useState(false);
  const { publicKey, isLoading, error, refetch } = useStripePublic();
  const {
    isCreating,
    paymentIntent,
    ephemeralKey,
    errors,
    createpaymentsheet,
    customer,
  } = usePaymentSheet(parseFloat(amount));
  const handleChange = (text: string) => {
    setamount(text);
  };

  if (__DEV__) {
    // Avoid logging secrets in production; publishable key is safe, but keep logs dev-only
    console.log("[Stripe] publishable key loaded?", Boolean(publicKey));
  }

  useEffect(() => {
    if (error) {
      Alert.alert(
        "Payment unavailable",
        "Unable to load payment configuration. Please try again.",
        [{ text: "Retry", onPress: () => refetch() }, { text: "Dismiss" }]
      );
    }
  }, [error, refetch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator style={{ backfaceVisibility: "hidden" }} />
      </View>
    );
  }

  if (!publicKey) {
    // Nothing to render until we have a key; optionally show an error fallback UI here
    return null;
  }

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Bill-App, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: `${currentUser?.firstname} ${currentUser?.lastname}`,
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  initializePaymentSheet();

  const handlePayment = async () => {
    createpaymentsheet();
    if (ephemeralKey) {
      openPaymentSheet()
    }
  }

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  initializePaymentSheet();

  return (
    <StripeProvider publishableKey={publicKey}>
      <HeaderName headertext="add card">
        <NumberInputs value={amount} onchange={handleChange} />
        <TransactionButton title="Pay" onPress={handlePayment} />
      </HeaderName>
    </StripeProvider>
  );
};

export default CardDeposit;
