import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ExternalPathString, RelativePathString, SitemapType } from "expo-router";
import { navigate, NavigationOptions } from "expo-router/build/global-state/routing";

export enum Routes {
  TRANSFER = 'transfer'
}
export interface CategoryProps {
  id: string;
  name: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: number;
  page?: Routes
}

export const PaybillsCategory: CategoryProps[] = [
  { id: "airtime", name: "Airtime", icon: "cellphone-wireless", size: 21 },
  { id: "data", name: "Data", icon: "wifi", size: 21 },
  { id: "betting", name: "Betting", icon: "soccer", size: 21 },
  { id: "tv", name: "TV", icon: "youtube-tv", size: 21 },
];

export const SendMoneyorDeposit: CategoryProps[] = [
  { id: "bank", name: "To Bank", icon: "bank-outline", size: 25 },
  { id: "contact", name: "Username", icon: "contacts-outline", size: 25 ,page: Routes.TRANSFER},
  {
    id: "credit-card",
    name: "Card Deposit",
    icon: "credit-card-outline",
    size: 25,
  },
];

export const SuccessCategory: CategoryProps[] = [
  { id: "share", name: "Share", icon: "share", size: 21 },
  {
    id: "favourites",
    name: "Add to favourites",
    icon: "account-plus",
    size: 21,
  },
  { id: "details", name: "View details", icon: "details", size: 21 },
];
