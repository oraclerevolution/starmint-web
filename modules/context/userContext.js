import { createContext, useEffect, useState } from "react";
import { getLoggedInUser } from "../http/auth";
import { SpinningCircles } from 'react-loading-icons';

export const userContext = createContext({
  user: undefined,
  setUser: () => {}
});

export const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState();
  const [pass, setPass] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await getLoggedInUser();
      if (user) {
        setUser(user);
      }
      setPass(true);
    })();
  }, []);

  if (!pass) {
    return (
      <div className="w-full h-screen min-h-[100vh] absolute z-10 bg-black flex justify-center items-center">
        <SpinningCircles stroke='#215BF0' fill='#215BF0' />
      </div>
    );
  }

  return (
    <userContext.Provider value={{user, setUser}}>
      {children}
    </userContext.Provider>
  );
}
