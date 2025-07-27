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
    "send","receive","airtime","data"
}
export interface Transferprops {
    amount: number;
    sender: string;
    receiver: string;
    type: transactiontype;
}