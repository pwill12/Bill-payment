import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { useApiClient, userApi } from "../utils/api";
import { useSyncDb } from "./useRegister";

export const useCustomerCode = (phone? : string) => {
  const { usercreated } = useSyncDb()
  const api = useApiClient();

  const syncUserMutation = useMutation({
    mutationFn: () => userApi.AddcustomerCode(api, {phone}),
    onSuccess: (response: any) =>
      console.log("Customer Code Added:", response.data),
    onError: (error: any) => console.error("error creating customer", error),
  });
  // auto-create customer code
  useEffect(() => {
    if (usercreated !== undefined) {
      syncUserMutation.mutate();
    }
  }, [usercreated]);

  return null;
};
