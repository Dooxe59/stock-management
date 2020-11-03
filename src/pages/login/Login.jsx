import { Button, Heading, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/core';
import React from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../components/authProvider/AuthProvider.jsx';
import app from "../../firebase.js";

import "./login.scss";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputMailChange = (e) => {
    setMail(e.target.value);
  };

  const handleInputPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginToast = useToast();
  
  const handleLogin = useCallback(
    async (event, mail, password, loginToast) => {
      event.preventDefault();
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(mail, password);
      } catch (error) {
        loginToast({
          title: "Echec de la connexion",
          description: "L'adresse e-mail ou le mot de passe est invalide.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }, []
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin(event, mail, password);
    }
  };

  const {currentUser} = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/"/>; 
  }

  const isValidAuthenticationForm = mail.length && password.length;

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="login">
      <div className="login-content">
        <Heading className="login-title" as="h1" size="md">
          Connexion
        </Heading>
        <Input 
          className="mail-input"
          variant="filled"
          size="md" 
          placeholder="E-mail" 
          value={mail}
          onChange={handleInputMailChange}
          onKeyDown={handleKeyDown}/>
        <InputGroup size="md">
          <Input
            className="password-input"
            variant="filled"
            pr="4.5rem"
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={handleInputPasswordChange}
            onKeyDown={handleKeyDown}/>
          <InputRightElement width="6.5rem">
            <Button size="sm" onClick={handleShowPassword}>
              {showPassword ? "Masquer" : "Afficher"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button 
          className="authenticate-button"
          variant="outline"
          size="sm"
          colorScheme="blue"
          isDisabled={!isValidAuthenticationForm}
          onClick={(event) => handleLogin(event, mail, password, loginToast)}>
          Se connecter 
        </Button>
      </div>
    </div>
  );
};

export default Login;