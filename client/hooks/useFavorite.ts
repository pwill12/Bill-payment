import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFavoriteApi, useApiClient } from "../utils/api";
import { User } from "@/types";
import { Alert } from "react-native";
import { router } from "expo-router";

interface user {
  data: {
    data: Pick<User, "username" | "firstname" | "lastname" | "img">[];
  };
}

export const useAddFavorite = (username: string) => {
  const api = useApiClient();
  const QueryClient = useQueryClient();

  const createFavoriteMutation = useMutation({
    mutationFn: (username: string) => addFavoriteApi.addfavorite(api, username),
    onSuccess: (response) => {
      QueryClient.invalidateQueries({ queryKey: ["favorite"] });
      Alert.alert(`${username} added to favorite`);
      return response;
    },
    onError: (error) => {
      console.error(error);
      Alert.alert("Error", "Failed to send. Please try again.");
    },
  });

  const createFavorite = () => {
    if (!username || username === undefined) {
      Alert.alert("Missing required field", "no username found!");
      return;
    }

    createFavoriteMutation.mutate(username);
  };

  return {
    error: createFavoriteMutation.error,
    isLoading: createFavoriteMutation.isPending,
    createFavorite,
  };
};

export const useGetFavorites = (limit: number = 10) => {
  const api = useApiClient();

  const {
    data: favoriteUser,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favorite", limit],
    queryFn: () => addFavoriteApi.getfavorite(api, limit),
    select: (response: user) => response.data.data,
  });

  return { favoriteUser, favloading: isLoading, error, refetch };
};
