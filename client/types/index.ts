export interface User {
  clerk_id: string | null;
  username: string;
  firstname: string | null;
  lastname: string | null ;
  img: string;
  email: string;
  number?: string | null;
  status?: number
}