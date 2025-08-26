import { User } from "@/types";
import { ProfileName, ProfileProps } from "./data";

export const displayUserdata = (
  type: ProfileProps["name"],
  currentUser: User | undefined,
) => {
  switch (type) {
    case ProfileName.USERNAME:
      return currentUser?.username;
    case ProfileName.ACCOUNT_TIER:
      return "Tier 2";
    case ProfileName.MOBILE_NUMBER:
      return currentUser?.number === null
        ? "Add Phone Number"
        : currentUser?.number;
    case ProfileName.EMAIL:
      return currentUser?.email;
    case ProfileName.FULL_NAME:
      return `${currentUser?.firstname || ""} ${currentUser?.lastname || ""}`.trim();
    default:
      return "";
  }
};
