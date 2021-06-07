import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Button, FormLabel, Input, Select } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { sortProductOptions } from '../../consts';
import CategorySelectorInput from '../inputs/categorySelectorInput/CategorySelectorInput';
import LocationSelectorInput from '../inputs/locationSelectorInput/LocationSelectorInput';

import './filterToolbar.scss';

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
      return <option value={option.id} key={option.id}>{option.label}</option>;
    });
  };
  const isEnabledResetFilterButton = searchFilter.trim().length || locationFilter || categoryFilter;

  return (
    <div className="filter-toolbar">
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              Accéder / Masquer les filtres
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <div className="search-filter">
              <FormLabel fontSize={['sm', 'md']} htmlFor="searchFilter">
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
              <FormLabel fontSize={['sm', 'md']} htmlFor="productSort">
                Tri
              </FormLabel>
              <Select size="sm" value={productSort} onChange={handleInputProductSortChange}>
                {renderSelectSortProductOptions()}
              </Select>
            </div>
            <div className="reset-filters-button">
              <Button 
                fontSize={['sm', 'md']} 
                size="xs"
                variant="solid"
                colorScheme="teal" 
                isDisabled={!isEnabledResetFilterButton}
                onClick={() => resetFilters()}>
                Effacer les filtres
              </Button>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

FilterToolbar.propTypes = {
  searchFilter: PropTypes.string.isRequired,
  locationFilter: PropTypes.string.isRequired,
  categoryFilter: PropTypes.string.isRequired,
  productSort: PropTypes.number.isRequired,
  handleInputSearchFilterChange: PropTypes.func.isRequired,
  handleInputLocationFilterChange: PropTypes.func.isRequired,
  handleInputCategoryFilterChange: PropTypes.func.isRequired,
  handleInputProductSortChange: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
};

export default FilterToolbar;