import React from 'react';
import PropTypes from 'prop-types';
import { EditIcon } from '@chakra-ui/icons';
import { Button, IconButton, Text } from '@chakra-ui/react';

import './categoryItem.scss';

const CategoryItem = ( {category, updateCategory} ) => {
  return (
    <div className="category-item">
      <Text fontSize={['xs', 'sm']} className="category-label">
        {category.label}
      </Text>
      <Button 
        className="update-category-item-button-text"
        variant="outline"
        size="xs"
        colorScheme="blue"
        onClick={() => updateCategory()}>
        Modifier
      </Button>
      <IconButton 
        className="update-category-item-button-icon"
        variant="outline"
        title="Modifier"
        icon={<EditIcon />} 
        size="xs" 
        colorScheme="blue"
        onClick={() => updateCategory()}/>
    </div>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  updateCategory: PropTypes.func.isRequired,
};

export default CategoryItem;