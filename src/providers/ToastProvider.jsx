import React from 'react';
import PropTypes from 'prop-types';
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

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToastProvider;