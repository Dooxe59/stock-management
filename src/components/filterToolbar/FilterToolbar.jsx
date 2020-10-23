import { FormLabel, Input } from '@chakra-ui/core';
import React from 'react';

const FilterToolbar = ({searchFilter, handleInputSearchFilterChange}) => {
  return (
    <div className="filter-toolbar">
      <div className="search-filter">
        <FormLabel fontSize={["sm", "md"]} htmlFor="searchFilter">
          Filtrer par nom
        </FormLabel>
        <Input 
          id="searchFilter"
          variant="filled"
          size="sm" 
          autoComplete="off"
          placeholder="Filtrer par nom" 
          value={searchFilter}
          onChange={handleInputSearchFilterChange}/> 
        </div>
    </div>
  );
};

export default FilterToolbar;