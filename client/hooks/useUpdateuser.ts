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
    // Validate only the fields that are present
    if (data.number !== undefined && !data.number.trim()) {
      Alert.alert("Invalid number", "Please enter a valid mobile number");
      return;
    }
    
    if (data.firstName !== undefined && !data.firstName.trim()) {
      Alert.alert("Missing required field", "Please enter first name");
      return;
    }
    
    if (data.lastName !== undefined && !data.lastName.trim()) {
      Alert.alert("Missing required field", "Please enter last name");
      return;
    }
    createUpdateMutation.mutate(data);
  };

  return {
    creatUpdateuser,
  };
};
