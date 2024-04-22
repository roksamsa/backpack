interface UserData {
  displayName?: string;
  email?: string;
}

interface UserContextType {
  userData: UserData | null;

  loading: boolean;
}

export type { UserData, UserContextType };
