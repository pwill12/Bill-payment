import { View, Text, Image } from "react-native";
import React from "react";
import HeaderName from "@/components/HeaderName";
import { useCurrentUser } from "@/hooks/useCurrentuser";
import ProfileCard from "@/components/ProfileCard";
import { ProfileCards1, ProfileCards2 } from "@/utils/data";

const Profile = () => {
    const {currentUser} = useCurrentUser()
  return (
    <HeaderName headertext="My Profile">
      <ProfileCard currentUser={currentUser}  showimg type={ProfileCards1}/>
      <ProfileCard currentUser={currentUser} type={ProfileCards2}/>
    </HeaderName>
  );
};

export default Profile;
