import React, { createContext, useState } from 'react';

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [exampleState, setExampleState] = useState(null);

  return (
    <AppContext.Provider value={{ exampleState, setExampleState }}>
      {children}
    </AppContext.Provider>
  );
};