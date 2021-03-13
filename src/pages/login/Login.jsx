import React, { 
  useCallback,
  useContext,
  useState
} from 'react';
import { Redirect } from 'react-router-dom';
import { 
  Button, 
  Heading, 
  Input, 
  InputGroup, 
  InputRightElement 
} from '@chakra-ui/core';
import app from 'firebase';
import { AuthContext } from 'providers/AuthProvider';
import { ToastContext } from 'providers/ToastProvider';

import './login.scss';

const Login = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputMailChange = (e) => {
    setMail(e.target.value);
  };

  const handleInputPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const {toast} = useContext(ToastContext);
  
  const handleLogin = useCallback(
    async (event, mail, password, toast) => {
      event.preventDefault();
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(mail, password);
      } catch (error) {
        toast({
          title: 'Echec de la connexion',
          description: 'L\'adresse e-mail ou le mot de passe est invalide.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }, []
  );

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
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
          autoComplete="email"
          type="email"
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
            type={showPassword ? 'text' : 'password'}
            placeholder="Mot de passe"
            value={password}
            onChange={handleInputPasswordChange}
            onKeyDown={handleKeyDown}/>
          <InputRightElement width="6.5rem">
            <Button size="sm" onClick={handleShowPassword}>
              {showPassword ? 'Masquer' : 'Afficher'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button 
          className="authenticate-button"
          variant="outline"
          size="sm"
          colorScheme="blue"
          isDisabled={!isValidAuthenticationForm}
          onClick={(event) => handleLogin(event, mail, password, toast)}>
          Se connecter 
        </Button>
      </div>
    </div>
  );
};

export default Login;