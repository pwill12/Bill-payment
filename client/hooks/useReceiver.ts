import { useQuery } from "@tanstack/react-query";
import { receiverApi, useApiClient} from "../utils/api";
import { useEffect } from "react";

export const useReceiver = (username?: string, enabled: boolean = false) => {
  const api = useApiClient();

  const {
    data: receiver,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['receiver', username],
    queryFn: () => (receiverApi.getReceiver(api, username)),
    enabled: enabled,
    select: (response) => response?.data
  });


  return { receiver, isLoading, error, refetch };
};