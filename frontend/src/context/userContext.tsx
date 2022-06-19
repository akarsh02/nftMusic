import React from "react";

type Props = {
  children: React.ReactNode;
};

type User = {
  address: string;
};

type UserCTXType = {
  userCTX: User | null;
  connectWalletCTX: (user: User) => void;
  disconnectWalletCTX: () => void;
};

const UserContext = React.createContext<UserCTXType | null>(null);

const UserProvider = ({ children }: Props) => {
  const [userCTX, setUserCTX] = React.useState<User | null>(null);
  const connectWalletCTX = (user: User) => {
    const newUser: User = {
      address: user.address,
    };
    setUserCTX(newUser);
  };
  const disconnectWalletCTX = () => {
    setUserCTX(null);
  };
  const memoedValue = React.useMemo(
    () => ({ userCTX, connectWalletCTX, disconnectWalletCTX }),
    [userCTX]
  );
  return (
    <UserContext.Provider value={memoedValue}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser can only be used inside UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
