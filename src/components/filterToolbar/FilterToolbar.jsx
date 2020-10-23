import { Button, Collapse, FormLabel, Input, Select } from '@chakra-ui/core';
import React from 'react';
import { useState } from 'react';
import { sortProductOptions } from '../../consts';
import CategorySelectorInput from '../inputs/categorySelectorInput/CategorySelectorInput';
import LocationSelectorInput from '../inputs/locationSelectorInput/LocationSelectorInput';

import "./filterToolbar.scss";

const FilterToolbar = ({
  searchFilter,
  locationFilter,
  categoryFilter,
  productSort,
  handleInputSearchFilterChange,
  handleInputLocationFilterChange,
  handleInputCategoryFilterChange,
  handleInputProductSortChange,
  resetFilters }) => {

  const renderSelectSortProductOptions = () => {
    return sortProductOptions.map(option => {
      return <option value={option.id} key={option.id}>{option.label}</option>
    });
  };
  const [showFilters, setShowFilters] = useState(false);

  const handleToggle = () => setShowFilters(!showFilters);

  const showFiltersButtonLabel = showFilters ? 
    "Masquer les filtres" : "Afficher les filtres";

  const showFiltersButtonVariant = showFilters ? "outline" : "solid";

  return (
    <div className="filter-toolbar">
      <Button size="xs" variant={showFiltersButtonVariant} colorScheme="teal" onClick={handleToggle}>
        {showFiltersButtonLabel}
      </Button>
      <Collapse mt={4} isOpen={showFilters} className="filter-inputs">
        <div className="search-filter">
          <FormLabel fontSize={["sm", "md"]} htmlFor="searchFilter">
            Filtrer par nom
          </FormLabel>
          <Input 
            id="searchFilter"
            size="sm" 
            autoComplete="off"
            placeholder="Filtrer par nom" 
            value={searchFilter}
            onChange={handleInputSearchFilterChange}/> 
        </div>
        <div className="location-filter">
          <LocationSelectorInput 
            productLocation={locationFilter}
            handleInputProductLocationChange={handleInputLocationFilterChange}
            addEmptySelect={true}>
          </LocationSelectorInput>
        </div>
        <div className="category-filter">
          <CategorySelectorInput
            productCategory={categoryFilter}
            handleInputProductCategoryChange={handleInputCategoryFilterChange}>
          </CategorySelectorInput>
        </div>
        <div className="product-sort">
          <FormLabel fontSize={["sm", "md"]} htmlFor="productSort">
            Tri
          </FormLabel>
          <Select size="sm" value={productSort} onChange={handleInputProductSortChange}>
            <option value=""></option>
            {renderSelectSortProductOptions()}
          </Select>
        </div>
        <div className="reset-filters-button">
          <Button 
            fontSize={["sm", "md"]} 
            size="xs"
            variant="solid"
            colorScheme="teal" 
            onClick={() => resetFilters()}>
            Effacer les filtres
          </Button>
        </div>
      </Collapse>
    </div>
  );
};

export default FilterToolbar;