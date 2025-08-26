import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useApiClient, userApi } from "../utils/api";
import { useCustomerCode } from "./useCustomerCode";

export const useValidatepaystack = () => {
  const { customer_code } = useCustomerCode();
  const api = useApiClient();

  const validateMutation = useMutation({
    mutationFn: async () => await userApi.validateuser(api),
    onSuccess: (response: any) => {
      return response?.data;
    },
    onError: (error: any) => console.error("validation error:", error),
  });

  useEffect(() => {
    if (customer_code !== undefined) {
      validateMutation.mutate();
    }
  }, [customer_code]);

  return {
    validated: validateMutation?.data,
  };
};
