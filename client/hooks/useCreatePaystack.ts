import { useApiClient, userApi } from "@/utils/api";
import { useCustomerCode } from "./useCustomerCode";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const useCreatePaystack = (preferred_bank: string) => {
  const { customer_code } = useCustomerCode();
  const api = useApiClient();
  console.log(customer_code)

  const syncUserMutation = useMutation({
    mutationFn: () => userApi.createpaystack(api, preferred_bank),
    onSuccess: (response: any) =>
      console.log("Paystack Acct created:", response.data),
    onError: (error: any) => console.error("error creating customer", error),
  });
  // auto-create customer code
  useEffect(() => {
    if (customer_code !== undefined) {
      syncUserMutation.mutate();
    }
  }, [customer_code]);

  return null;
};
