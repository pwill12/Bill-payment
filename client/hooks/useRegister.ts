import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useApiClient, userApi } from "../utils/api";

export const useSyncDb = () => {
  const { isSignedIn } = useAuth();
  const api = useApiClient();
  const { user } = useUser();
  const userData = {
    clerk_id: user?.id || null,
    email: user?.emailAddresses[0].emailAddress || null,
    firstName: user?.firstName || null,
    lastName: user?.lastName || null,
    // username: user?.emailAddresses[0]?.emailAddress.split("@")[0] || null,
    img: user?.imageUrl || null,
    number: user?.phoneNumbers?.[0]?.phoneNumber || null,
  };

  const syncUserMutation = useMutation({
    mutationFn: () => userApi.syncUser(api, userData),
    onSuccess: (response: any) =>
      console.log("User synced successfully:", response.data),
    onError: (error: any) => console.error("User sync failed:", error),
  });

  // auto-sync user when signed in
  useEffect(() => {
    // if user is signed in and user is not synced yet, sync user
    if (isSignedIn && !syncUserMutation.data) {
      syncUserMutation.mutate();
    }
  }, [isSignedIn]);

  return null;
};
