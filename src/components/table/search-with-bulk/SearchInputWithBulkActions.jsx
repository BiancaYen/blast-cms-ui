import React from 'react';
import PropTypes from 'prop-types';

// Components
import Dropdown from '../../../components/dropdown/Dropdown';
import SearchInput from '../../../components/search-input/SearchInput';

// Styles
import SearchWithBulkActionsWrapper from './styles';

// Types
import { TableSearchType } from '../types';

// Utils
import * as ActionPropTypes from '../../../utils/actionPropType';

// Default Props
const defaultProps = {
    isDisabled: false,
    isFocused: false,
    placeholder: '',
    value: '',
    onChange: () => {}
};

// Prop Types
const propTypes = {
    actions: ActionPropTypes.actionPropType([
        ActionPropTypes.title.isRequired,
        ActionPropTypes.action.isRequired,
        ActionPropTypes.bool,
        ActionPropTypes.subtitle
    ]).isRequired,
    actionsTitle: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChange: PropTypes.func
};

const SearchInputWithBulkActions = ({
    actions,
    actionsTitle,
    isDisabled,
    isFocused,
    placeholder,
    value,
    onChange
}) => {
    const actionsWithoutIcons = actions.map(([title, action]) => [title, action, null]);

    return (
        <SearchWithBulkActionsWrapper>
            <Dropdown
                actions={actionsWithoutIcons}
                isDisabled={isDisabled || !actions.length}
                title={actionsTitle}
            />
            <SearchInput
                isDisabled={isDisabled}
                isFocused={isFocused}
                size={SearchInput.sizes.small}
                value={value || ''}
                placeholder={placeholder}
                onChange={onChange}
            />
        </SearchWithBulkActionsWrapper>
    );
};

SearchInputWithBulkActions.defaultProps = defaultProps;
SearchInputWithBulkActions.propTypes = propTypes;
SearchInputWithBulkActions.componentType = TableSearchType;

export default SearchInputWithBulkActions;
