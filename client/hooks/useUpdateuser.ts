import { UpdateUser } from "@/types";
import { useApiClient, userApi } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

export const useUpdateuser = (data: UpdateUser) => {
  const api = useApiClient();
  const QueryClient = useQueryClient();

  const createUpdateMutation = useMutation({
    mutationFn: (datas: UpdateUser) => userApi.updateuser(api, datas),
    onSuccess: (response) => {
      QueryClient.invalidateQueries({ queryKey: ["authUser"] });
      Alert.alert("User Update", "user info updated successfully", [
        {
          text: "Ok",
          style: "destructive",
          onPress: () => router.back(),
        },
      ]);

      return response;
    },
    onError: (error: any) => {
      const message =
        typeof error === "string"
          ? error
          : (error?.response?.data?.message ??
            error?.message ??
            "Something went wrong");
      Alert.alert("User Update failed", message);
    },
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
    const updata = {
      firstName: data.firstName,
      lastName: data.lastName,
      number: data.number,
    } as UpdateUser;
    createUpdateMutation.mutate(updata);
  };

  return {
    creatUpdateuser,
    loading: createUpdateMutation.isPending,
  };
};
