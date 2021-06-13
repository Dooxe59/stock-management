import React from 'react';

import './iconHelper.scss';

const IconHelper = () => {
  return (
    <>
      <div className="bell-icon-alert">
        <i className="pi pi-bell bell-red"></i>: Date passée / aujourd'hui
      </div>
      <div className="bell-icon-warning">
        <i className="pi pi-bell bell-orange"></i>: Date proche (1 à 3 jours)
      </div>
      <div className="bell-icon">
        <i className="pi pi-bell bell-green"></i>: Reste plus de 3 jours
      </div>
    </>
  );
};

export default IconHelper;