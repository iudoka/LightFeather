import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid } from '@material-ui/core';

// configure and connect enzyme - to render shallow components
import { configure, mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('../../../shared/documentUtility')
import { getFieldInfo, getValueFromDocumentFieldInfo, getIndicatorFromFieldValue, } from '../../../shared/documentUtility'
const { getUnknownImagePath, /* getValueFromDocumentFieldInfo, getValueFromDocumentPaths, */ } = jest.requireActual('../../../shared/documentUtility');

import { DisplayField, DisplayFieldCard, DisplayFieldQuickView } from '../DisplayField'
import ImageLoader from '../../ImageLoader';

import { TEST_SEARCH_PERSON_DOC } from '../../../tests/testSearchPersonDoc'
import { TEST_SEARCH_VEHICLE_DOC } from '../../../tests/testSearchVehicleDoc'

configure({ adapter: new Adapter() });

const testId = "testId"
const testId2 = "testId2"
const testClasses = {
    fieldContainer: 'field-container-class',
    text: 'text-class',
    textValue: 'text-value-class',
    textIndicator: 'text-indicator-class',
    }
    
const commonExpectChecks = (wrapper, field) => {
    expect(wrapper.find('#' + testId + '-label')).to.have.lengthOf(1);
    expect(wrapper.find('#' + testId + '-value')).to.have.lengthOf(1);
    //expect(wrapper.containsMatchingElement(<span>{ field.label }</span>)).to.equal(true);
    //expect(wrapper.containsMatchingElement(<span>{ field.value }</span>)).to.equal(true);
}

describe('<DisplayField />', () => {
    let wrapper;

    /*
    beforeEach(() => {
        const mockHandler = jest.fn();
        wrapper = shallow(<BaseQuery searchHandler={mockHandler} clearHandler={mockHandler} errorHandler={mockHandler} />);
    });

    // Runs each it section
    it('should render a <BaseQuery />', () => {
        expect(wrapper.contains(<h1>DO NOT RENDER ME DIRECTLY!</h1>)).toEqual(true);
    });
    */

    let purposeCard = "card"
    let purposeQuickView = "quickView"

    let testFieldSingleValue = { "name": "testFieldSingleValue", label: "Single Value Label", value: 'Test Single Value', }
    let testFieldArray = { "name": "testFieldArray", label: "Array Label", value: [ 'Test', 'Array' ], }
    let testFieldImageUriSingleVal = { "name": "testImageUriSingleVal", label: "Image URI Single Value Label",
            type: "imageUri", value: [ { value: '/some/image/uri/path', label: 'Single Image URI' } ], }
    let testField

    it('calls componentDidMount', () => {
        testField = testFieldSingleValue
        getFieldInfo.mockReturnValue(testField);
        sinon.spy(DisplayField.prototype, 'componentDidMount');
        const wrapper = mount(<DisplayField id={ testId } doc={ TEST_SEARCH_PERSON_DOC } field={ testField }
            purpose={ purposeCard } classes={ testClasses } />);
        expect(DisplayField.prototype.componentDidMount).to.have.property('callCount', 1);
    });

    it('sets props properly', () => {
        testField = testFieldSingleValue
        const wrapper = mount(<DisplayField id={ testId } doc={ TEST_SEARCH_PERSON_DOC } field={ testField }
            purpose={ purposeCard } classes={ testClasses } />);
        expect(wrapper.props().id).to.equal(testId);
        expect(wrapper.props().doc).to.equal(TEST_SEARCH_PERSON_DOC);
        expect(wrapper.props().field).to.equal(testField);

        wrapper.setProps({ id: testId2, purpose: purposeQuickView,
            doc: TEST_SEARCH_VEHICLE_DOC, field: testFieldArray, });
        expect(wrapper.props().id).to.equal(testId2);
        expect(wrapper.props().doc).to.equal(TEST_SEARCH_VEHICLE_DOC);
        expect(wrapper.props().field).to.equal(testFieldArray);
        expect(wrapper.props().purpose).to.equal(purposeQuickView);
    });

    it('calls renderField and renders appropriate descendants if type=value and path result is a single value for card purpose', () => {
        testField = testFieldSingleValue
        getFieldInfo.mockReturnValue(testField);
        sinon.spy(DisplayField.prototype, 'renderField');
        const wrapper = mount(<DisplayField id={ testId } doc={ TEST_SEARCH_PERSON_DOC } field={ testField }
            purpose={ purposeCard } classes={ testClasses } />);
        expect(DisplayField.prototype.renderField).to.have.property('callCount', 2);
        expect(wrapper.find('p')).to.have.lengthOf(1);
        expect(wrapper.find('span')).to.have.lengthOf(2);
        commonExpectChecks(wrapper, testField)
        //expect(wrapper.containsMatchingElement(<span>{ testField.value }</span>)).to.equal(true);
    });

    it('calls renderField and renders appropriate descendants if type=value and path result is a single value for quickView purpose', () => {
        testField = testFieldSingleValue
        getFieldInfo.mockReturnValue(testField);
        const wrapper = mount(<DisplayField id={ testId } doc={ TEST_SEARCH_PERSON_DOC } field={ testField }
            purpose={ purposeQuickView } classes={ testClasses } />);
        expect(DisplayField.prototype.renderField).to.have.property('callCount', 4);
        expect(wrapper.find(Grid)).to.have.lengthOf(3);
        expect(wrapper.find('span')).to.have.lengthOf(2);
        commonExpectChecks(wrapper, testField)
        expect(wrapper.containsMatchingElement(<span>{ testField.label }</span>)).to.equal(true);
    });

    it('calls renderImage and renders appropriate descendants if field type is imageUri and path result is a single value for card purpose', () => {
        testField = testFieldImageUriSingleVal
        getFieldInfo.mockReturnValueOnce(testField);
        getValueFromDocumentFieldInfo.mockReturnValue(testField.value)
        sinon.spy(DisplayField.prototype, 'renderImage');
        const wrapper = mount(<DisplayField id={ testId } doc={ TEST_SEARCH_PERSON_DOC }
            field={ testField } purpose={ purposeCard } classes={ testClasses } />);
        expect(DisplayField.prototype.renderImage).to.have.property('callCount', 2);
        expect(wrapper.find(ImageLoader)).to.have.lengthOf(1);
        expect(wrapper.find('#' + testId + '-label')).to.have.lengthOf(1);
        //commonExpectChecks(wrapper)
    });

    it('calls renderSingleValue and renders appropriate descendants if type=value and path result is a single value for card purpose', () => {
        testField = testFieldSingleValue
        getFieldInfo.mockReturnValue(testField);
        getValueFromDocumentFieldInfo.mockReturnValue(testField.value)
        getIndicatorFromFieldValue.mockReturnValue(null)
        sinon.spy(DisplayField.prototype, 'renderSingleValue');
        const wrapper = mount(<DisplayField id={ testId } doc={ TEST_SEARCH_PERSON_DOC }
            field={ testField } purpose={ purposeCard } classes={ testClasses } />);
        expect(DisplayField.prototype.renderSingleValue).to.have.property('callCount', 2);
        commonExpectChecks(wrapper, testField)
        expect(wrapper.containsMatchingElement(<span>{ testField.value }</span>)).to.equal(true);
    });

    it('calls renderArray and renders appropriate descendants if type=value and path result is an array for card purpose', () => {
        testField = testFieldArray
        getFieldInfo.mockReturnValue(testField);
        getValueFromDocumentFieldInfo.mockReturnValue(testField.value)
        sinon.spy(DisplayField.prototype, 'renderArray');
        const wrapper = mount(<DisplayField id={ testId } doc={ TEST_SEARCH_PERSON_DOC }
            field={ testField } purpose={ purposeCard } classes={ testClasses } />);
        expect(DisplayField.prototype.renderArray).to.have.property('callCount', 2);
        expect(wrapper.find(Tooltip)).to.have.lengthOf(1);
        //expect(wrapper.containsMatchingElement(<span>{ testField.label }</span>)).to.equal(true);
    });

});