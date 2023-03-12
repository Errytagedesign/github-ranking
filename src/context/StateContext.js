import React, { useContext, createContext, useReducer } from "react";

// Initialize createContext
export const StateContext = createContext();

// This function will accepts 3 params, reducer to dispatch the actions from all the subscribed comps, initialState, and children which reps all subscribed comps
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
