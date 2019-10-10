import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Styles
import { Actions, Wrapper } from './styles';

// Utils
import uniqueKey from '../../utils/uniqueKey';

// Default Props
const defaultProps = {
    actions: []
};

// Prop Types
const propTypes = {
    actions: PropTypes.instanceOf(Array),
    title: PropTypes.string.isRequired
};

const Header = ({ actions, title }) => (
    <Wrapper>
        <h1>{title}</h1>
        <Actions>
            {
                actions.map(action => (
                    <Fragment key={uniqueKey(action)}>
                        {action}
                    </Fragment>
                ))
            }
        </Actions>
    </Wrapper>
);

Header.defaultProps = defaultProps;
Header.propTypes = propTypes;

export default Header;
