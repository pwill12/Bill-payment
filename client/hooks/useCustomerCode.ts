import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useApiClient, userApi } from "../utils/api";
import { useSyncDb } from "./useRegister";

export const useCustomerCode = () => {
  const { usercreated } = useSyncDb();
  const api = useApiClient();

  const syncUserMutation = useMutation({
    mutationFn: () => userApi.AddcustomerCode(api),
    onSuccess: (response: any) =>
      console.log("Customer Code Added:", response.data),
    onError: (error: any) => console.error("error creating customer", error),
  });
  // auto-create customer code
  useEffect(() => {
    if (
      usercreated !== undefined &&
      usercreated.firstName &&
      usercreated.lastName !== null &&
      usercreated.number !== null
    ) {
      syncUserMutation.mutate();
    }
  }, [usercreated, syncUserMutation]);

  return {
    customer_code: syncUserMutation.data?.data?.customer_code,
  };
};
