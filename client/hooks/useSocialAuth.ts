import { useSSO } from "@clerk/clerk-expo";
import { useCallback, useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { OAuthStrategy } from "@clerk/types";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

export const useWarmupbrowser = () => {
  useEffect(() => {
    if (Platform.OS === 'web') return
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
  
}
export const useSocialAuth = () => {
  useWarmupbrowser()
  const [isLoading, setIsLoading] = useState(false);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = useCallback( async (strategy: OAuthStrategy) => {
    setIsLoading(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy, redirectUrl: AuthSession.makeRedirectUri()});
      if (createdSessionId) {
        await setActive!({ session: createdSessionId});
      }
    } catch (err) {
      console.log("Error in social auth", err);
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert("Error", `Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  }, [startSSOFlow])

  return { isLoading, handleSocialAuth };
};