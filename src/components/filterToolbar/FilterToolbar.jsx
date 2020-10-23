import { FormLabel, Input, Select } from '@chakra-ui/core';
import React from 'react';
import { sortProductOptions } from '../../consts';
import CategorySelectorInput from '../inputs/categorySelectorInput/CategorySelectorInput';
import LocationSelectorInput from '../inputs/locationSelectorInput/LocationSelectorInput';

const FilterToolbar = ({
  searchFilter,
  locationFilter,
  categoryFilter,
  productSort,
  handleInputSearchFilterChange,
  handleInputLocationFilterChange,
  handleInputCategoryFilterChange,
  handleInputProductSortChange }) => {

  const renderSelectSortProductOptions = () => {
    return sortProductOptions.map(option => {
      return <option value={option.id} key={option.id}>{option.label}</option>
    });
  };

  return (
    <div className="filter-toolbar">
      <div className="search-filter">
        <FormLabel fontSize={["sm", "md"]} htmlFor="searchFilter">
          Filtrer par nom
        </FormLabel>
        <Input 
          id="searchFilter"
          size="md" 
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
        <Select value={productSort} onChange={handleInputProductSortChange}>
          <option value=""></option>
          {renderSelectSortProductOptions()}
        </Select>
      </div>
    </div>
  );
};

export default FilterToolbar;