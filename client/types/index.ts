export interface User {
  clerk_id: string | null;
  username: string;
  firstname: string | null;
  lastname: string | null;
  img: string;
  email: string;
  number?: string | null;
  balance: number;
}

export interface Transactions {
    id: number;
    sender: string;
    receiver: string;
    amount: number;
    created_at: string;
    type: "transfer" | "airtime" | "data";
}

export enum categorystyle {
  small = "px-5 py-4",
  medium = "px-8 py-5",
  none = "p-0 ",
  verysmall = "px-0 py-5"
}

export enum transactiontype {
  SEND = "send",
  AIRTIME = "airtime",
}
export interface Transferprops {
  amount: number;
  receiver: string;
  type?: transactiontype;
}

export interface UpdateUser {
  firstName?: string;
  lastName?: string;
  number?: string;
  amount?: number;
}
