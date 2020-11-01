import { Button, Input } from '@chakra-ui/core';
import React from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../components/authProvider/AuthProvider.jsx';
import app from "../../firebase.js";

import "./login.scss";

const Login = ({history}) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputMailChange = (e) => {
    setMail(e.target.value);
  };

  const handleInputPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = useCallback(
    async (event, mail, password) => {
      event.preventDefault();
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(mail, password);
        history.push("/");
      } catch (error) {
        // TODO: manage errors
        console.error(error);
      }
    }, [history]
  );

  const {currentUser} = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/"/>; 
  }

  const isValidAuthenticationForm = mail.length && password.length;

  return (
    <div className="login">
      <Input 
        variant="filled"
        size="sm" 
        placeholder="E-mail" 
        value={mail}
        onChange={handleInputMailChange}/>
      <Input 
        variant="filled"
        size="sm" 
        placeholder="Mot de passe" 
        value={password}
        onChange={handleInputPasswordChange}/>
      <Button 
        className="authenticate-button"
        variant="outline"
        size="sm"
        colorScheme="blue"
        isDisabled={!isValidAuthenticationForm}
        onClick={(event) => handleLogin(event, mail, password)}>
        Se connecter 
      </Button>
    </div>
  );
};

export default Login;