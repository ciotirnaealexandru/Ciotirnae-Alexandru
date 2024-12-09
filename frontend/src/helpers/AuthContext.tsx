import { createContext, Dispatch, SetStateAction } from "react";

interface AuthState {
  status: boolean;
  username: string;
}

interface AuthContextType {
  authState: AuthState;
  setAuthState: Dispatch<SetStateAction<AuthState>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);