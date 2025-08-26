import React from "react";
import HeaderName from "@/components/HeaderName";
import { useCurrentUser } from "@/hooks/useCurrentuser";
import ProfileCard from "@/components/ProfileCard";
import { ProfileCards1, ProfileCards2 } from "@/utils/data";
import { router } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";

const Profile = () => {
    const {currentUser} = useCurrentUser()
    const handleProfile = (category: string, name: string) => {
      router.push({
            pathname: "/profile/update",
            params: {
             data: category,
             name: name
            },
          });
    }
  return (
    <HeaderName headertext="My Profile" onPress={()=> navigate('/account')}>
      <ProfileCard currentUser={currentUser} type={ProfileCards1} onProfilePress={handleProfile}/>
      <ProfileCard currentUser={currentUser} type={ProfileCards2} onProfilePress={handleProfile}/>
    </HeaderName>
  );
};

export default Profile;
