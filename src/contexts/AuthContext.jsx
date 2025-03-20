import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const USER_TYPES = {
  GUEST: 'GUEST',
  FREE: 'FREE',
  PREMIUM: 'PREMIUM'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(USER_TYPES.GUEST);
  const [isPremium, setIsPremium] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setUserType(userData.isPremium ? USER_TYPES.PREMIUM : USER_TYPES.FREE);
    setIsPremium(userData.isPremium);
  };

  const logout = () => {
    setUser(null);
    setUserType(USER_TYPES.GUEST);
    setIsPremium(false);
  };

  const upgradeToPremium = () => {
    setIsPremium(true);
    setUserType(USER_TYPES.PREMIUM);
  };

  const canPlayMusic = () => userType !== USER_TYPES.GUEST;
  const canSkipTracks = () => userType === USER_TYPES.PREMIUM;
  const canDownloadTracks = () => userType === USER_TYPES.PREMIUM;
  const hasAds = () => userType === USER_TYPES.FREE;

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        isPremium,
        login,
        logout,
        upgradeToPremium,
        canPlayMusic,
        canSkipTracks,
        canDownloadTracks,
        hasAds,
        USER_TYPES,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);