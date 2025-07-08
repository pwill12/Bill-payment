import { Tabs } from "expo-router";


export default function Mytab() {
  return (
    <Tabs>
      <Tabs.Screen name="index"/>
      <Tabs.Screen name="account"/>
    </Tabs>
  );
}

