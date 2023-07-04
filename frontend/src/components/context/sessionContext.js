import { createContext } from "react";

const Context = createContext({
  userNickname: '',
  loggedIn: false,
  admin: 'N',
  setLoggedUser: () => {},
  setLoggedIn: () => {},
  setAdmin: () => {},
});

export default Context;
