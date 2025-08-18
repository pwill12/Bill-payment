import { MaterialCommunityIcons } from "@expo/vector-icons";

export enum Routes {
  HOME = "/",
  AUTH = "(auth)",
  ONBOARDING = "onboarding",
  TABS = "(tabs)",
  TRANSFER = "transfer",
  TRANSFER_SUMMARY = "transfer/summary",
  TRANSACTION_DETAILS = 'transaction-details'
}
export interface CategoryProps {
  id: string;
  name: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: number;
  page?: Routes;
  text?: string;
}

export const PaybillsCategory: CategoryProps[] = [
  { id: "airtime", name: "Airtime", icon: "cellphone-wireless", size: 21 },
  { id: "data", name: "Data", icon: "wifi", size: 21 },
  { id: "betting", name: "Betting", icon: "soccer", size: 21 },
  { id: "tv", name: "TV", icon: "youtube-tv", size: 21 },
];

export const SendMoneyorDeposit: CategoryProps[] = [
  { id: "bank", name: "To Bank", icon: "bank-outline", size: 25 },
  {
    id: "contact",
    name: "Username",
    icon: "contacts-outline",
    size: 25,
    page: Routes.TRANSFER,
  },
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
  { id: "details", name: "View details", icon: "details", size: 21 , page: Routes.TRANSACTION_DETAILS},
];

export const RewardsCard: CategoryProps[] = [
  { id: "bonus", name: "Friday Bonus", icon: "cash", size: 21 },
  {
    id: "refer",
    name: "Refer Friend",
    icon: "account",
    size: 21,
  },
  { id: "spin", name: " Spin & Win", icon: "cash", size: 21 , page: Routes.TRANSACTION_DETAILS},
  { id: "play", name: "play & Win", icon: "cash", size: 21 , page: Routes.TRANSACTION_DETAILS},
];

export const BonusCard: CategoryProps[] = [
  { id: "data", name: "Data Offers at lowes", icon: "wallet", size: 21 , text: 'Recharge Data & Earn Now'},
  {
    id: "electricity",
    name: "Eclectricity Payment",
    icon: "lightbulb",
    size: 21,
    text: 'Fast&Easy Electricity Bill Pay'
  },
  { id: "betting", name: "Betting Payment", icon: "cash", size: 21 , text: 'Fund betting account with $1 or more'},
];
