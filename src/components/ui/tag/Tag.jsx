import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from 'primereact/chip';

import './tag.scss';

const Tag = ( {label} ) => {
  return (
    <Chip label={label} className="p-mr-2 p-mb-2 default-tag" />
  );
};

Tag.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Tag;