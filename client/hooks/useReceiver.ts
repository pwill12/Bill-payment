import { QueryClient } from "@tanstack/react-query";
import { receiverApi, useApiClient } from "../utils/api";
import { useState } from "react";
import { Alert } from "react-native";
import { User } from "@/types";

export const useReceiver = () => {
    const api = useApiClient();
    const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });
  
    const [loading, setloading] = useState<boolean>(false);
    const [data, setdata] = useState <User | null>(null);

  const fetchUsersandCache = async(username: string) => {

  try {
    setloading(true);
    const data = await queryClient.fetchQuery({
      queryKey: ["receiver", username],
      queryFn: () => receiverApi.getReceiver(api, username),
    });

    
    if (data) {
      setloading(false);
      setdata(data.data)
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "User does not exist";
     Alert.alert("Invalid user", errorMessage);
    // Alert.alert("Invalid user", "User Does not exist")
    setloading(false);
  }
}

  return {fetchUsersandCache, data,loading,};
};
