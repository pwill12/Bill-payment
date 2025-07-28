export interface User {
  clerk_id: string | null;
  username: string;
  firstname: string | null;
  lastname: string | null ;
  img: string;
  email: string;
  number?: string | null;
  balance: number
}

export enum transactiontype {
    SEND = "send",
    AIRTIME = "airtime"
}
export interface Transferprops {
    amount?: number;
    receiver?: string;
    type?: string;
}