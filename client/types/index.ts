export interface User {
  clerk_id: string | null;
  username: string;
  firstname: string | null;
  lastname: string | null ;
  img?: string | null;
  email: string | null;
  number?: string | null;
  status?: number
}