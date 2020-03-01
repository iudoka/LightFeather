import React from 'react';

// configure and connect enzyme - to render shallow components
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SearchEntryContainer } from '../SearchEntryContainer';
import FullTextQuery from '../../components/search/FullTextQuery';
import NameDobQuery from '../../components/search/NameDobQuery';
import DocQuery from '../../components/search/DocQuery';

configure({ adapter: new Adapter() });

describe('<SearchEntryContainer />', () => {
    let wrapper;

    beforeEach(() => {
        const mockHandler = jest.fn();
        wrapper = shallow(<SearchEntryContainer searchHandler={mockHandler} clearHandler={mockHandler} />);
    });

    // Runs each it section
    it('should render a <SearchEntryContainer /> with 3 Search Tabs displayed', () => {
        // set redux connect state
        wrapper.setProps({
            favoriteId: 'testFavorite',
            screenState: null,
            raceOptions: [],
            genderOptions: [],
            countryOptions: []
        })

        expect(wrapper.find(FullTextQuery)).toHaveLength(1);
        expect(wrapper.find(NameDobQuery)).toHaveLength(1);
        expect(wrapper.find(DocQuery)).toHaveLength(1);
    });
});