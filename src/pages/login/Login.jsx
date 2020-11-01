import { Button, Heading, Input, InputGroup, InputRightElement } from '@chakra-ui/core';
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
  const [showPassword, setShowPassword] = useState(false);

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
          onClick={(event) => handleLogin(event, mail, password)}>
          Se connecter 
        </Button>
      </div>
    </div>
  );
};

export default Login;