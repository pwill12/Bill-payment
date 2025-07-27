import { useQuery } from "@tanstack/react-query";
import { useApiClient, userApi } from "../utils/api";
import { User } from "@/types";

interface user {
  data: User
}
export const useCurrentUser = () => {
  const api = useApiClient();

  const {
    data: currentUser,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: () => userApi.getCurrentUser(api),
    select: (response: user) => response.data,
  });

  return { currentUser, isLoading, error, refetch };
};