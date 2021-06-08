import React from 'react';
import PropTypes from 'prop-types';
import Tag from 'components/ui/tag/Tag';
import Uid from 'utils/uid';

import './categoryList.scss';

const CategoryList = ({categories}) => {
  const renderCategories = () => {
    return categories.map((category) => {
      return (
        <div className="category-item-container" key={Uid.generate()}>
          <Tag label={category.label} />
        </div>);
    });
  };

  return (
    <div className="category-list">
      { renderCategories() }
    </div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategoryList;