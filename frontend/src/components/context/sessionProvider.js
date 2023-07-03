import {useState} from "react";
import SessionContext from './sessionContext';

const ContextProvider = ({children}) => {
  const setLoggedUser = (data) => {
    setState(prevState => (
      {
        ...prevState,
        userNickname: data
      }
    ))
  }

  const setLoggedIn = () => {
    setState(prevState => (
      {
        ...prevState,
        loggedIn: !!sessionStorage.getItem('userNickname')
      }
    ))
  }
  const setAdmin = (isAdmin) => {
    setState(prevState =>  ({
      ...prevState,
      admin: isAdmin
    }))
  }

  const initialState = {
    userNickname: '',
    loggedIn: false,
    admin: 'N',
    setLoggedUser,
    setLoggedIn,
    setAdmin
  }

  const [state, setState] = useState(initialState);
  return (
    <SessionContext.Provider value={state}>
      {children}
    </SessionContext.Provider>
  )
}

export default ContextProvider;
