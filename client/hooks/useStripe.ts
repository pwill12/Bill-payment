import { useMutation, useQuery } from "@tanstack/react-query";
import { stripeApi, useApiClient } from "../utils/api";
import { Alert } from "react-native";

export const useStripePublic = () => {
  const api = useApiClient();

  const {
    data: publicKey,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["stripe"],
    queryFn: () => stripeApi.getPublishableKey(api),
    select: (response) => response.data.publishableKey,
  });

  return { publicKey, isLoading, error, refetch };
};

export const usePaymentSheet = (amount: number) => {
  const api = useApiClient();

  const paymentSheetMutation = useMutation({
    mutationFn: (payload: { amount: number }) =>
      stripeApi.postPaymentSheet(api, payload),
    onError: (error: any) => console.error("Payment Sheet failed:", error),
  });

  const createPaymentSheetAsync = () => {
    if (!(amount > 0)) {
      Alert.alert(
        "Missing required field",
        "Please enter a valid amount greater than 0."
      );
      return Promise.resolve(undefined);
    }
    const amountInCents = Math.round(amount * 100);
    return paymentSheetMutation.mutateAsync({ amount: amountInCents });
  };

  return {
    isCreating: paymentSheetMutation.isPending,
    paymentIntent: paymentSheetMutation.data?.data.paymentIntent,
    ephemeralKey: paymentSheetMutation.data?.data.ephemeralKey,
    customer: paymentSheetMutation.data?.data.customer,
    errors: paymentSheetMutation.error,
    createPaymentSheetAsync,
  };
};
