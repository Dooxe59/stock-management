import React, { useContext } from 'react';
import { 
  Button, 
  IconButton, 
  Popover, 
  PopoverArrow, 
  PopoverBody, 
  PopoverCloseButton, 
  PopoverContent, 
  PopoverHeader, 
  PopoverTrigger, 
  Text
} from '@chakra-ui/core';
import { 
  BellIcon, 
  ExternalLinkIcon,
  QuestionIcon, 
  SettingsIcon
} from '@chakra-ui/icons';
import {
  Link
} from 'react-router-dom';
import app from '../../firebase';
import { ToastContext } from '../../providers/ToastProvider';

import './applicationTopBar.scss';

const ApplicationTopBar = () => {
  const {toast} = useContext(ToastContext);
 
  const tryLogOut = () => {
    app.auth().signOut().then(() => {
      toast({
        title: 'Déconnexion effectuée',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }).catch(error => {
      toast({
        title: 'Echec de la déconnexion ',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  };

  return (
    <div className="application-top-bar">
      <Link to="/">
        <Button size="sm" colorScheme="teal" variant="ghost">
          Gestion des stocks
        </Button>
      </Link>
      <div className="empty-area"></div>
      <Link to="/administration">
        <Button 
          className="administration-button-text" 
          variant="outline"
          size="xs" 
          colorScheme="teal">
          Administration
        </Button>
        <IconButton 
          className="administration-button-icon"
          title="Administration"
          variant="outline"
          icon={<SettingsIcon />} 
          size="xs" 
          colorScheme="teal"/>
      </Link>
      <Popover>
        <PopoverTrigger>
          <IconButton 
            className="help-button-icon"
            title="Aide"
            variant="outline"
            icon={<QuestionIcon />} 
            size="xs" 
            colorScheme="teal"/>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Aide</PopoverHeader>
          <PopoverBody>
            <Text 
              fontSize={['xs', 'sm']}
              className="bell-icon-alert">
              { <BellIcon/> }: Date passée / aujourd'hui
            </Text>
            <Text 
              fontSize={['xs', 'sm']}
              className="bell-icon-warning">
              { <BellIcon/> }: Date proche (1 à 3 jours)
            </Text>
            <Text 
              fontSize={['xs', 'sm']}
              className="bell-icon">
              { <BellIcon /> }: Reste plus de 3 jours
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Button 
        className="logout-button-text" 
        variant="outline"
        size="xs" 
        colorScheme="pink"
        onClick={() => tryLogOut()}>
        Déconnexion
      </Button>
      <IconButton 
        className="logout-button-icon"
        title="Déconnexion"
        variant="outline"
        icon={<ExternalLinkIcon />} 
        size="xs" 
        colorScheme="pink"
        onClick={() => tryLogOut()}/>
    </div>
  );
};

export default ApplicationTopBar;