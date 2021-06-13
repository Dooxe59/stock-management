import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Menubar } from 'primereact/menubar';
import IconHelper from './iconHelper/IconHelper';
import app from 'firebase';
import { ToastContext } from 'providers/ToastProvider';

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
    }).catch(() => {
      toast({
        title: 'Echec de la déconnexion ',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  };
  
  const history = useHistory();

  const items = [
    {label: 'Accueil', icon: 'pi pi-fw pi-home', command: () => { history.push('/')} },
    {label: 'Administration', icon: 'pi pi-fw pi-cog', command: () => { history.push('/administration')} },
    {label: 'Déconnexion',icon:'pi pi-fw pi-power-off', command: () => {tryLogOut()}}
  ];

  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <Menubar model={items}/>
      <Button 
        icon="pi pi-question" 
        className="p-button-rounded p-button-secondary p-button-text help-button" 
        onClick={() => setShowHelp(true)}/>
      <Sidebar visible={showHelp} position="bottom" onHide={() => setShowHelp(false)}>
        <IconHelper />
      </Sidebar>
    </>
  );
};

export default ApplicationTopBar;