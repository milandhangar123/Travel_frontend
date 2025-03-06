import { createContext, useContext, useReducer, useMemo } from "react";
import { dateReducer } from "../reducer";

const initialState = {
  destination: "",
  guests: 0,
  checkInDate: null,
  checkOutDate: null,
  isSearchModalOpen: false,
  isSearchResultOpen: true,
};

const DateContext = createContext(initialState);

const DateProvider = ({ children }) => {
  const [state, dateDispatch] = useReducer(dateReducer, initialState);

  const contextValue = useMemo(() => ({ ...state, dateDispatch }), [state]);

  return <DateContext.Provider value={contextValue}>{children}</DateContext.Provider>;
};

const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDate must be used within a DateProvider");
  }
  return context;
};

export { useDate, DateProvider };
