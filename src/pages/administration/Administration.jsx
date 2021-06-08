import React, { useState } from 'react';
import { TabView,TabPanel } from 'primereact/tabview';

import CategoryManagement from 'components/categoryManagement/CategoryManagement';
import LocationManagement from 'components/locationManagement/LocationManagement';

import './administration.scss';

const Administration = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="administration-page">
      <TabView 
        activeIndex={activeIndex} 
        onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="Emplacements">
            <LocationManagement></LocationManagement>
          </TabPanel>
          <TabPanel header="Catégories">
            <div className="category-management">
              <CategoryManagement></CategoryManagement>
            </div>
          </TabPanel>
      </TabView>
    </div>
  );
};

export default Administration;