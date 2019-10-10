import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Styles
import {
    ButtonNext,
    ButtonPrevious,
    ButtonWrapper,
    Current,
    Total,
    PaginationWrapper
} from './styles';

// Components
import ArrowToggle from '../../arrow-toggle/ArrowToggle';
import ActionMenu from '../action-menu/ActionMenu';

// Icons
import ChevronRightIcon from '../../icons/ChevronRightIcon';

// Default props
const defaultProps = {
    isCanNextPageClick: false,
    isCanPreviousPageClick: false,
    isDisabled: false
};

// Prop types
const propTypes = {
    currentPage: PropTypes.number.isRequired,
    dataCount: PropTypes.number.isRequired,
    isCanNextPageClick: PropTypes.bool,
    isCanPreviousPageClick: PropTypes.bool,
    isDisabled: PropTypes.bool,
    limit: PropTypes.number.isRequired,
    onChangeLimit: PropTypes.func.isRequired,
    onNextPageClick: PropTypes.func.isRequired,
    onPreviousPageClick: PropTypes.func.isRequired
};

const TablePagination = ({
    currentPage,
    dataCount,
    isCanNextPageClick,
    isDisabled,
    isCanPreviousPageClick,
    limit,
    onNextPageClick,
    onPreviousPageClick,
    onChangeLimit
}) => {
    const [isActive, setActive] = useState(false);
    const wrapperRef = useRef(null);

    const clickOutsideHandler = ({ target }) => {
        if (!wrapperRef.current.contains(target)) {
            setActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', clickOutsideHandler);

        return () => {
            document.removeEventListener('click', clickOutsideHandler);
        };
    }, []);

    const getPaginationOptions = () => {
        const options = [
            ['View all', 0],
            ['1 - 10', 10],
            ['1 - 50', 50],
            ['1 - 100', 100],
            ['1 - 1000', 1000]
        ];

        const index = options.findIndex(([, quality]) => dataCount < quality);

        return options.slice(0, index + 1)
            .map(([title, quality]) => ([
                title,
                () => onChangeLimit(quality),
                null,
                limit === quality
            ]));
    };

    const getPageStartCount = () => (dataCount ? ((currentPage - 1) * limit) + 1 : 0);

    const getPageEndCount = () => {
        const count = ((currentPage - 1) * limit) + limit;

        if (count && count <= dataCount) {
            return count;
        }

        return dataCount;
    };

    return (
        <PaginationWrapper innerRef={wrapperRef}>
            <Current
                isDisabled={isDisabled}
                onClick={() => (!isDisabled ? setActive(!isActive) : undefined)}
            >
                <span>{`${getPageStartCount()} - ${getPageEndCount()}`}</span>
                <span>
                    <ArrowToggle
                        isActive={isActive}
                        isDisabled={isDisabled}
                        size={ArrowToggle.sizes.small}
                    />
                </span>
                <ActionMenu
                    actions={getPaginationOptions()}
                    isActive={isActive}
                    withHoverColor={false}
                />
            </Current>
            <Total isDisabled={isDisabled}>{`of ${dataCount}`}</Total>
            <ButtonWrapper>
                <ButtonPrevious
                    onClick={isCanPreviousPageClick ? undefined : onPreviousPageClick}
                    isDisabled={isCanPreviousPageClick || isDisabled}
                >
                    <ChevronRightIcon />
                </ButtonPrevious>
                <ButtonNext
                    onClick={isCanNextPageClick ? undefined : onNextPageClick}
                    isDisabled={isCanNextPageClick || isDisabled}
                >
                    <ChevronRightIcon />
                </ButtonNext>
            </ButtonWrapper>
        </PaginationWrapper>
    );
};

TablePagination.defaultProps = defaultProps;
TablePagination.propTypes = propTypes;

export default TablePagination;
