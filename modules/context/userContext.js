import { createContext, useEffect, useState } from "react";
import { getLoggedInUser } from "../http/auth";

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
    return 'LOADING...';
  }

  return (
    <userContext.Provider value={{user, setUser}}>
      {children}
    </userContext.Provider>
  );
}
