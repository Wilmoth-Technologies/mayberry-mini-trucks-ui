import { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

// Custom hook to use the LoadingContext
export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Function to show the Loading Component
  const showLoading = () => {
    console.log("showLoading, setting state to true");
    setIsLoading(true);
  }

  // Function to hide the Loading Component
  const hideLoading = () => {
    console.log("hideLoading, setting state to false");
    setIsLoading(false);
  }

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
