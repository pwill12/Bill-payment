import React, { useEffect, useState } from "react";
import { getItem } from "@/utils/asyncStorage";
import { ExternalPathString, Href, Redirect, RelativePathString, Stack } from "expo-router";

export default function RootLayout() {
  
    return <Stack screenOptions={{headerShown: false}} />;
}
