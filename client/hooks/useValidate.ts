import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useApiClient, userApi } from "../utils/api";
import { useCustomerCode } from "./useCustomerCode";

export const Validatepaystack = () => {
  const { customer_code } = useCustomerCode();
  const api = useApiClient();

  const syncUserMutation = useMutation({
    mutationFn: () => userApi.validateuser(api),
    onSuccess: (response: any) => {
      return response?.data;
    },
    onError: (error: any) => console.error("validation error:", error),
  });
  // auto-sync user when signed in

  useEffect(() => {
    // if user is signed in and user is not synced yet, sync user
    if (customer_code !== undefined) {
      syncUserMutation.mutate();
    }
  }, [customer_code]);

  return {
    validated: syncUserMutation?.data,
  };
};
