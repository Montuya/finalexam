// app/types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional age
}