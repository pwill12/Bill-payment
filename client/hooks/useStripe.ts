import { useQuery } from "@tanstack/react-query";
import { stripeApi, useApiClient } from "../utils/api";

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