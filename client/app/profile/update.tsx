import { View, Text } from "react-native";
import React, { useState } from "react";
import HeaderName from "@/components/HeaderName";
import { useLocalSearchParams } from "expo-router";
import TextInputs from "@/components/TextInputs";
import { ProfileName } from "@/utils/data";
import TransactionButton from "@/components/TransactionButton";

const UppdateProfile = () => {
  const params = useLocalSearchParams();
  const rawData = Array.isArray(params.data) ? params.data[0] : params.data;
  const rawName = Array.isArray(params.name) ? params.name[0] : params.name;
  const name = (rawName ?? "") as ProfileName;
  const [value, setValue] = useState<string>(rawData ?? "");

  const [firstName, setFirstName] = useState<string>(
    () => (rawData ?? "").split(" ")[0] ?? ""
  );
  const [lastName, setLastName] = useState<string>(() => {
    const parts = (rawData ?? "").split(" ");
    return parts.slice(1).join(" ") || "";
  });

  const handleChange = (text: string) => {
    setValue(text);
  };

  return (
    <HeaderName
      headertext={
        name === ProfileName.EMAIL
          ? "Update Email"
          : name === ProfileName.MOBILE_NUMBER
            ? "Update Number"
            : "Update Profile"
      }
    >
      <View className="gap-5">
        <Text className="font-semibold text-xl">
          Please fill in your {name}
        </Text>
        {name === ProfileName.FULL_NAME ? (
          <View className="gap-3">
            <Text>First Name</Text>
            <TextInputs value={firstName} border onChange={setFirstName}/>
            <Text>Last Name</Text>
            <TextInputs value={lastName} border onChange={setLastName}/>
          </View>
        ) : (
          <TextInputs value={value} onChange={handleChange} />
        )}
        <TransactionButton title="Save" />
      </View>
    </HeaderName>
  );
};

export default UppdateProfile;
