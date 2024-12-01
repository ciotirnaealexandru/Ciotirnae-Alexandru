import { createContext, Dispatch, SetStateAction } from "react";

interface AuthContextType {
  authState: boolean;
  setAuthState: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);