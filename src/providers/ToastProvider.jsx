import React from 'react';
import { useToast } from '@chakra-ui/core';

export const ToastContext = React.createContext();

const ToastProvider = ({children}) => {
  const toast = useToast();
  
  return (
    <ToastContext.Provider
      value={{
        toast
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;