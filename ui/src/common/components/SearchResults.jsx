import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import { getSearchRank } from '../utils';

class SearchResults extends Component {
  render() {
    const { renderItem, results, page, pageSize } = this.props;
    return (
      <div>
        {results.map((result, index) => (
          <div className="mv2" key={result.get('id')}>
            {renderItem(result, getSearchRank(index, page, pageSize))}
          </div>
        ))}
      </div>
    );
  }
}

SearchResults.propTypes = {
  results: PropTypes.instanceOf(Immutable.List),
  renderItem: PropTypes.func.isRequired,
  page: PropTypes.number,
  pageSize: PropTypes.number.isRequired,
};

SearchResults.defaultProps = {
  results: Immutable.List(),
  page: 1,
};

export default SearchResults;
