import React from 'react';
import { EditIcon } from '@chakra-ui/icons';
import { Button } from "@chakra-ui/core";

import "./categoryItem.scss";

const CategoryItem = ( {category, updateCategory} ) => {
  return (
    <div className="category-item">
      <div className="category-label">
        {category.label}
      </div>
      <Button leftIcon={<EditIcon />} size="sm" colorScheme="blue" onClick={() => updateCategory()}>
        Modifier
      </Button>
    </div>
  );
};

export default CategoryItem;