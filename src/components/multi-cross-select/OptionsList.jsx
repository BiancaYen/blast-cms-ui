import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Styles
import {
    ListWrapper,
    MessageNoData,
    OptionsListWrapper
} from './styles';

// Components
import HiddenContent from '../../components/hidden-content/HiddenContent';
import ListSearchInput from '../../components/list-search-input/ListSearchInput';
import withSearch from '../../utils/withSearch';

// Utils
import usePrevious from '../../utils/usePrevious';

// Default props
const defaultProps = {
    initialDataLength: 0,
    rowHeight: 40,
    rows: 5,
    searchPlaceholder: 'Search option'
};

// Prop types
const propTypes = {
    children: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    })).isRequired,
    initialDataLength: PropTypes.number,
    label: PropTypes.string.isRequired,
    rowHeight: PropTypes.number,
    rows: PropTypes.number,
    searchInputValue: PropTypes.string.isRequired,
    searchPlaceholder: PropTypes.string,
    onSearch: PropTypes.func.isRequired
};

const OptionsList = ({
    children,
    data,
    initialDataLength,
    label,
    rowHeight,
    rows,
    searchInputValue,
    searchPlaceholder,
    onSearch
}) => {
    const prevInitialDataLength = usePrevious(initialDataLength);

    useEffect(() => {
        if (initialDataLength !== prevInitialDataLength) {
            onSearch('');
        }
    });

    return (
        <OptionsListWrapper>
            <h1>{label}</h1>
            <div>
                <ListSearchInput
                    isDisabled={!initialDataLength}
                    placeholder={searchPlaceholder}
                    value={searchInputValue}
                    onChange={onSearch}
                />
                <HiddenContent isHidden={!data.length}>
                    <ListWrapper rowHeight={rowHeight} rows={rows}>
                        {children(data)}
                    </ListWrapper>
                </HiddenContent>
                {searchInputValue && !data.length && <MessageNoData>No Search Results Found</MessageNoData>}
            </div>
        </OptionsListWrapper>
    );
};

OptionsList.defaultProps = defaultProps;
OptionsList.propTypes = propTypes;

export default withSearch(OptionsList);
