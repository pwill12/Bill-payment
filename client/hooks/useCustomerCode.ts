import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useApiClient, userApi } from "../utils/api";
import { useSyncDb } from "./useRegister";

export const useCustomerCode = () => {
  const { usercreated } = useSyncDb();
  const user = usercreated?.data?.user
  const api = useApiClient();

  const syncUserMutation = useMutation({
    mutationFn: () => userApi.AddcustomerCode(api),
    onSuccess: (response: any) =>
      console.log("Customer Code Added:", response.data),
    onError: (error: any) => console.error("error creating customer", error),
  });
  // auto-create customer code
  useEffect(() => {
    const ready =
       Boolean(user?.firstname?.trim()) &&
       Boolean(user?.lastname?.trim()) &&
       Boolean(user?.number?.trim());
     if (
       ready &&
       !syncUserMutation.isPending &&
       syncUserMutation.status !== "success"
     ) {
       syncUserMutation.mutate();
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usercreated]);

  return {
    customer_code: syncUserMutation.data?.data?.customer_code,
  };
};
