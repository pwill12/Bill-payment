import { QueryClient } from "@tanstack/react-query";
import { receiverApi, useApiClient } from "../utils/api";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { Alert } from "react-native";

export const useReceiver = () => {
    const api = useApiClient();
  
    const [loading, setloading] = useState<boolean>(false);
    const [data, setdata] = useState <AxiosResponse>();

  const fetchUsersandCache = async(username: string) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  try {
    setloading(true);
    const data = await queryClient.fetchQuery({
      queryKey: ["receiver", username],
      queryFn: () => receiverApi.getReceiver(api, username),
    });

    console.log(data);
    if (data) {
      setloading(false);
      setdata(data)
    }
  } catch (error) {
    console.log(error);
    Alert.alert("Invalid user", "User Does not exist")
    setloading(false);
  }
}

  return {fetchUsersandCache, data,loading,};
};
