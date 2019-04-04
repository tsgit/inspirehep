import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import LiteratureItem from '../LiteratureItem';

describe('LiteratureItem', () => {
  it('renders with all props set, including sub props', () => {
    const metadata = fromJS({
      date: 'Jun 7, 1993',
      titles: [{ title: 'test' }],
      authors: [{ full_name: 'Test, Author' }],
      arxiv_eprints: [{ value: '1234567890' }],
      control_number: 12345,
      citation_count: 1,
      publication_info: [{ journal_title: 'Test Jornal' }],
      collaborations: [{ value: 'CMS' }],
      collaborations_with_suffix: [{ value: 'CMS Group' }],
    });
    const wrapper = shallow(
      <LiteratureItem metadata={metadata} searchRank={2} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('does not arxiv pdf download action if there is no eprint value', () => {
    const metadata = fromJS({
      control_number: 12345,
      titles: [{ title: 'test' }],
    });
    const wrapper = shallow(
      <LiteratureItem metadata={metadata} searchRank={1} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders 0 citations if it does not exist', () => {
    const metadata = fromJS({
      control_number: 12345,
      titles: [{ title: 'test' }],
    });
    const wrapper = shallow(
      <LiteratureItem metadata={metadata} searchRank={2} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
