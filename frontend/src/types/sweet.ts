export interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export type SweetCategory = 
  | 'chocolate' 
  | 'gummy' 
  | 'hard-candy' 
  | 'lollipop' 
  | 'caramel' 
  | 'mint' 
  | 'sour' 
  | 'all';
