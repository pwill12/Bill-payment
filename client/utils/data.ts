import { MaterialCommunityIcons } from "@expo/vector-icons";

export enum Routes {
  HOME = "/",
  AUTH = "(auth)",
  ONBOARDING = "onboarding",
  TABS = "(tabs)",
  TRANSFER = "transfer",
  TRANSFER_SUMMARY = "transfer/summary",
  TRANSACTION_DETAILS = 'transaction-details',
  PROFILE_PAGE = 'profile',
  ACCOUNT = 'account'

}
export interface CategoryProps {
  id: string;
  name: string;
  icon:  React.ComponentProps<typeof MaterialCommunityIcons>["name"]
  size?: number;
  page?: Routes;
  text?: string;
}

export enum ProfileName {
  USERNAME = 'App Account username',
  ACCOUNT_TIER = 'Account tier',
  FULL_NAME = 'Full Name',
  MOBILE_NUMBER = 'Mobile Number',
  EMAIL = 'Email',
}

export interface ProfileProps {
  id: number;
  name: ProfileName;
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

export const Profile: CategoryProps[] = [
  { id: "transaction", name: "Transaction History", icon: "history", size: 30 },
  {
    id: "account-limit",
    name: "Account Limits",
    icon: "speedometer",
    size: 30,
    text: 'View your transaction limits'
  },
  { id: "bank-card", name: "Bank Card/Account", icon: "credit-card-outline", size: 30 , text: '1 linked card/account'},
  { id: "bizpayment", name: "My BizPayment", icon: "home", size: 30 , text: 'Receive Payment to business'},
];

export const ProfileCards1: ProfileProps[] = [
  {id: 1, name: ProfileName.USERNAME},
  {id: 2, name: ProfileName.ACCOUNT_TIER},
]

export const ProfileCards2: ProfileProps[] = [
  {id: 1, name: ProfileName.FULL_NAME},
  {id: 2, name: ProfileName.MOBILE_NUMBER},
  {id: 3, name: ProfileName.EMAIL},
]

export const UpdateCard: ProfileProps[] = [
  {id: 1, name: ProfileName.FULL_NAME},
  {id: 2, name: ProfileName.MOBILE_NUMBER},
  {id: 3, name: ProfileName.EMAIL},
]

export const TabsCategory: Pick<CategoryProps, 'id' | 'name'>[]= [
  {id: 'recent', name: 'Recent'},
  {id: 'favorite', name: 'Favorites'},
]