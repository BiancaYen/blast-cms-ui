import React from 'react';
import PropTypes from 'prop-types';

// Styles
import {
    Content,
    MultiCrossSelectWrapper,
    Overlay
} from './styles';

// Components
import Row from './rows/Row';
import ValidationError from '../validation-error/ValidationError';
import SpinnerLoader from '../spinner-loader/SpinnerLoader';
import HiddenContent from '../../components/hidden-content/HiddenContent';
import TextButton from '../../components/buttons/text/TextButton';
import OptionsList from './OptionsList';

// Default props
const defaultProps = {
    canReset: false,
    customRow: null,
    data: [],
    dataDisplayKey: 'name',
    heading: null,
    isDisabled: false,
    isLoading: false,
    label: 'Options',
    rows: 6,
    searchPlaceholder: 'Search option',
    spacing: '',
    validation: {
        status: '',
        errors: ''
    },
    value: [],
    onReset: () => {}
};

// Prop types
const propTypes = {
    canReset: PropTypes.bool,
    customRow: PropTypes.elementType,
    data: PropTypes.instanceOf(Array),
    dataDisplayKey: PropTypes.string,
    heading: PropTypes.node,
    id: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    label: PropTypes.string,
    rows: PropTypes.number,
    searchPlaceholder: PropTypes.string,
    spacing: PropTypes.string,
    validation: PropTypes.shape({
        status: PropTypes.string,
        errors: PropTypes.string
    }),
    value: PropTypes.instanceOf(Array),
    onChange: PropTypes.func.isRequired,
    onReset: PropTypes.func
};

const AVAILABLE = 'Available';
const ASSOCIATED = 'Associated';

const MultiCrossSelect = ({
    canReset,
    customRow,
    data,
    dataDisplayKey,
    heading,
    id,
    isDisabled,
    isLoading,
    label,
    rows,
    searchPlaceholder,
    spacing,
    validation,
    value,
    onChange,
    onReset
}) => {
    const availableOptions = data.filter(({ id: optionId }) => !value.includes(optionId))
        .sort(({ isLocked: isLockedA = false }, { isLocked: isLockedB = false }) => isLockedB - isLockedA); // Pick up locked options
    const associatedOptions = value.map(optionId => data.find(({ id: dataId }) => dataId === optionId))
        .sort(({ isLocked: isLockedA = false }, { isLocked: isLockedB = false }) => isLockedB - isLockedA); // Pick up locked options

    const handleReset = () => {
        if (!isDisabled && !isLoading) {
            onReset();
        }
    };

    const handleOptionToggle = (optionId) => {
        const valueIsInArray = value.includes(optionId);
        const values = valueIsInArray ? value.filter(item => item !== optionId) : [...value, optionId];

        onChange({
            id,
            value: values
        });
    };

    const RowComponent = customRow || Row;

    return (
        <MultiCrossSelectWrapper spacing={spacing}>
            {heading}
            <Content validation={validation}>
                {/* Loader */}
                {isLoading && <Overlay><SpinnerLoader /></Overlay>}

                {/* Disabled overlay */}
                {isDisabled && !isLoading && <Overlay />}

                {/* Reset button */}
                <HiddenContent isHidden={!canReset}>
                    <TextButton onClick={handleReset} isDisabled={!associatedOptions.length || isLoading || isDisabled}>
                        Reset
                    </TextButton>
                </HiddenContent>

                {/* Available options */}
                <HiddenContent isHidden={!data.length && isLoading}>
                    <OptionsList
                        data={availableOptions}
                        id={`${id}Available`}
                        rows={rows}
                        searchPlaceholder={searchPlaceholder}
                        label={`${AVAILABLE} ${label}`}
                        rowHeight={RowComponent.height}
                    >
                        {
                            availableData => availableData.map(({ id: optionId, [dataDisplayKey]: name, ...restData }) => (
                                <RowComponent
                                    id={optionId}
                                    isDisabled={isDisabled}
                                    key={optionId}
                                    onClick={handleOptionToggle}
                                    {...restData}
                                >
                                    {name}
                                </RowComponent>
                            ))
                        }
                    </OptionsList>

                    {/* Associated options */}
                    <OptionsList
                        data={associatedOptions}
                        id={`${id}Associated`}
                        rows={rows}
                        searchPlaceholder={searchPlaceholder}
                        label={`${ASSOCIATED} ${label}`}
                        rowHeight={RowComponent.height}
                    >
                        {
                            associatedData => associatedData.map(({ id: optionId, [dataDisplayKey]: name, ...restData }) => (
                                <RowComponent
                                    id={optionId}
                                    isDisabled={isDisabled}
                                    isSelected
                                    key={optionId}
                                    onClick={handleOptionToggle}
                                    {...restData}
                                >
                                    {name}
                                </RowComponent>
                            ))
                        }
                    </OptionsList>
                </HiddenContent>
            </Content>

            {/* Validation */}
            {validation.status === 'invalid' && <ValidationError>{validation.errors}</ValidationError>}
        </MultiCrossSelectWrapper>
    );
};

MultiCrossSelect.defaultProps = defaultProps;
MultiCrossSelect.propTypes = propTypes;

export default MultiCrossSelect;
