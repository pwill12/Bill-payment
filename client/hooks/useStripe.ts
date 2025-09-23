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
    select: (response) => response.data,
  });

  return { publicKey, isLoading, error, refetch };
};

export const usePaymentSheet = (amount: number) => {
  const api = useApiClient();

    const paymentSheetMutation = useMutation({
    mutationFn: () => stripeApi.postPaymentSheet(api, amount),
    onSuccess: (response) => {
      return response?.data;
    },
    onError: (error: any) => console.error("Payment Sheet failed:", error),
  });

  const createpaymentsheet = () => {
      if (!amount) {
        Alert.alert("Missing required field", "Please enter amount or username!");
        return;
      }
      paymentSheetMutation.mutate();
    };
  
    return {
      isCreating: paymentSheetMutation.isPending,
      paymentIntent: paymentSheetMutation.data?.data.paymentIntent,
      ephemeralKey: paymentSheetMutation.data?.data.ephemeralKey,
      customer: paymentSheetMutation.data?.data.customer,
      errors: paymentSheetMutation.error,
      createpaymentsheet,
    };
}