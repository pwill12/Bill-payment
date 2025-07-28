import { transactiontype, Transferprops } from "@/types";
import { useApiClient } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert } from "react-native";


const useTransfer = (amount : number | undefined, type: string | undefined, receiver: string | undefined) => {
  const api = useApiClient();
  // const [amount, setamount] = useState<number>(0);
  // const [receiver, setreceiver] = useState<string>("");
  // const [type, settype] = useState<transactiontype>();

  const QueryClient = useQueryClient();

  const createTransferMutation = useMutation({
    mutationFn: async (data: Transferprops) => {
      return api.post("/send", data, {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["authUser", "receiver"] });
      Alert.alert("Success", "sent successfully!");
    },
    onError: () => {
      Alert.alert("Error", "Failed to send. Please try again.");
    },
  });

  const createsend = () => {
    if (!amount || !receiver || !type) {
      Alert.alert(
        "Missing required field",
        "Please enter amount or username!"
      );
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
    createsend
  };
};

export default useTransfer;
