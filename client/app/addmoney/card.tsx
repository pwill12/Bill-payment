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
    createPaymentSheetAsync,
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

  const handlePayment = async () => {
    try {
      setLoading(true);
      // Create a fresh PaymentIntent   ephemeral key on the backend
      const resp = await createPaymentSheetAsync();
      const data = resp?.data ?? resp;
      if (!data?.paymentIntent || !data?.ephemeralKey || !data?.customer) {
        Alert.alert(
          "Payment unavailable",
          "Unable to create payment session. Please try again."
        );
        return;
      }
      // Initialize the Stripe payment sheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: "Bill-App, Inc.",
        customerId: data.customer,
        customerEphemeralKeySecret: data.ephemeralKey,
        paymentIntentClientSecret: data.paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: `${currentUser?.firstname} ${currentUser?.lastname}`,
        },
      });
      if (initError) {
        Alert.alert("Payment setup failed", initError.message);
        return;
      }
      // Present the sheet
      const { error: presentError } = await presentPaymentSheet();
      if (presentError) {
        Alert.alert(`Error code: ${presentError.code}`, presentError.message);
      } else {
        Alert.alert("Success", "Your order is confirmed!");
      }
    } finally {
      setLoading(false);
    }
  };

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
