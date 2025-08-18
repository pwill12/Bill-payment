import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Alert } from "react-native";

export const PAYSTACK_API = "https://api.paystack.co"
export const authorizations = {"Authorization": "Bearer `${process.env.NODE_ENV}`"}
const usePaystack = (
  email: string | undefined,
) => {
  const QueryClient = useQueryClient();

  const createPaystackMutation = useMutation({
    mutationFn: async (data: any) => {
      return axios.post("/customer", {
        authorization: authorizations,
        headers: { "Content-Type": "application/json" },
      }, data);
    },
    onSuccess: (response) => {
      QueryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      console.error(error);
      Alert.alert("Error", "Failed to send. Please try again.");
    },
  });

  const createsend = () => {
    if (!email) {
      Alert.alert("Missing required field", "Please enter amount or username!");
      return;
    }
    const details = {email}
    createPaystackMutation.mutate(details);
  };

  return {
    isCreating: createPaystackMutation.isPending,
    createsend,
  };
};

export default usePaystack