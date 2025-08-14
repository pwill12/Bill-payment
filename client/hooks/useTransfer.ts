import { Transferprops } from "@/types";
import { useApiClient } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

const useTransfer = (
  amount: number | undefined,
  type: string | undefined,
  receiver: string | undefined,
) => {
  const api = useApiClient();
  const QueryClient = useQueryClient();

  const createTransferMutation = useMutation({
    mutationFn: async (data: Transferprops) => {
      return api.post("/send", data, {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: (response) => {
      QueryClient.invalidateQueries({ queryKey: ["authUser", "transactions"] });
      router.push({
      pathname: "/success",
      params: {
        name: receiver,
        amount: amount,
        type: type,
        id: response.data.id
      },
    });
    },
    onError: (error) => {
      console.error(error);
      Alert.alert("Error", "Failed to send. Please try again.");
    },
  });

  const createsend = () => {
    if (!amount || !receiver || !type) {
      Alert.alert("Missing required field", "Please enter amount or username!");
      return;
    }
    const details = {
      amount,
      receiver,
      type,
    } as Transferprops;

    createTransferMutation.mutate(details);
  };

  return {
    type,
    isCreating: createTransferMutation.isPending,
    createsend,
  };
};

export default useTransfer;
