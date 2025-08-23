import { UpdateUser } from "@/types";
import { useApiClient, userApi } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useUpdateuser = (data: UpdateUser) => {
  const api = useApiClient();

  const createUpdateMutation = useMutation({
    mutationFn: (datas: UpdateUser) => userApi.updateuser(api, datas),
    onSuccess: (response) => {
      return response;
    },
    onError: (error: any) => console.error("User sync failed:", error),
  });
  // auto-sync user when signed in

  const creatUpdateuser = () => {
    if (!data.firstName || !data.lastName || !data.number) {
      Alert.alert("Missing required field", "Please enter details");
      return;
    }
    createUpdateMutation.mutate(data);
  };

  return {
    creatUpdateuser,
  };
};
