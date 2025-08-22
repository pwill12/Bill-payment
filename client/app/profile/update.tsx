import { View, Text } from "react-native";
import React, { useState } from "react";
import HeaderName from "@/components/HeaderName";
import { useLocalSearchParams } from "expo-router";
import TextInputs from "@/components/TextInputs";
import { ProfileName } from "@/utils/data";

const UppdateProfile = () => {
  const params = useLocalSearchParams();
  const data = Array.isArray(params.data) ? params.data[0] : params.data;
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const firstname = Array.isArray(params.name) ? params.name[0] : params.name;
  const [values, setvalues] = useState<string>(name === ProfileName.FULL_NAME ? )


  const handleChange = (text: string) => {
    setvalues(text)
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
      <View className="">
        <View className="gap-4">
          <Text className="font-semibold text-2xl">Current {name}</Text>
          {name === ProfileName.FULL_NAME ? (
            <View className="gap-3">
              <Text>First Name</Text>
              <TextInputs value={values.split(' ')[0]} onChange={handleChange} border />
              <Text>Last Name</Text>
              <TextInputs value={values.split(' ')[1]} onChange={handleChange} border />
            </View>
          ) : (
            <TextInputs value={values} onChange={handleChange} />
          )}
        </View>
      </View>
    </HeaderName>
  );
};

export default UppdateProfile;
