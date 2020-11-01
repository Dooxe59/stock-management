import React from 'react';
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
} from "@chakra-ui/core";
import { 
  BellIcon, 
  QuestionIcon, 
  SettingsIcon 
} from "@chakra-ui/icons";
import {
  Link
} from "react-router-dom";

import "./applicationTopBar.scss";

const ApplicationTopBar = () => {
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
              fontSize={["xs", "sm"]}
              className="bell-icon-alert">
              { <BellIcon/> }: Date passée ou aujourd'hui
            </Text>
            <Text 
            fontSize={["xs", "sm"]}
            className="bell-icon-warning">
            { <BellIcon/> }: Date proche (1 à 3 jours)
          </Text>
          <Text 
            fontSize={["xs", "sm"]}
            className="bell-icon">
            { <BellIcon /> }: Reste plus de 3 jours
          </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ApplicationTopBar;