import { createContext, useContext, useEffect, useReducer } from "react";
import { userReducer } from "./AppReducer";
import { getBranches } from "../utils/api";
import { useSearchParams } from "react-router-dom";

const userContext = createContext();

function UseContextProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const timeOut = setTimeout(fetchBranches, 20);
    return () => clearTimeout(timeOut);
  }, []);

  async function fetchBranches() {
    dispatch({ type: "setIsMultiLoading", payload: true });
    const result = await getBranches(searchParams.get("branch"));
    if (result.success) {
      dispatch({ type: "setBranches", payload: result.body });
      dispatch({ type: "setMultiLoadingError", payload: false });
    } else {
      dispatch({
        type: "setMultiLoadingError",
        payload: {
          message: result.message,
          code: result.code,
        },
      });
    }
    dispatch({ type: "setIsMultiLoading", payload: false });
  }

  const [state, dispatch] = useReducer(userReducer, {
    pageTitle: "Home",
    users: [],
    branches: [],
    isSingleLoading: false,
    singleLoadingError: false,
    isMultiLoading: true,
    multiLoadingError: false,

    fetchBranches,
  });

  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
}

function UseUserContext() {
  return useContext(userContext);
}

export { UseUserContext, UseContextProvider };
