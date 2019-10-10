import React from 'react';
import PropTypes from 'prop-types';

// Components
import SelectRow from './rows/SelectRow';

// Default props
const defaultProps = {
    rowComponent: SelectRow,
    numRows: 7
};

// Prop types
const propTypes = {
    children: PropTypes.string.isRequired,
    numRows: PropTypes.number,
    rowComponent: PropTypes.elementType.isRequired
};

const NotFoundContent = ({ children, numRows, rowComponent: RowComponent }) => {
    return (
        <React.Fragment>
            <RowComponent
                id="notFound"
                isDisabled
                onClick={() => {}}
            >
                {children}
            </RowComponent>
            {
                Array.from(Array(numRows), () => Math.random()
                    .toString(36)
                    .substring(2, 15))
                    .map(key => (
                        <RowComponent
                            id={key}
                            key={key}
                            onClick={() => {}}
                        >
                            {' '}
                        </RowComponent>)
                    )
            }
        </React.Fragment>
    );
};

NotFoundContent.defaultProps = defaultProps;
NotFoundContent.propTypes = propTypes;

export default NotFoundContent;
