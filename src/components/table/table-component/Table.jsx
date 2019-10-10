import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import TableMessage from '../message/TableMessage';
import TablePagination from '../pagination/TablePagination';
import Head from '../head/TableHead';
import HiddenContent from '../../hidden-content/HiddenContent';
import SearchInput from '../../search-input/SearchInput';
import TableLoader from './TableLoader';

// Styles
import {
    ControlsWrapper,
    TableWrapper,
    Wrapper
} from './styles';

// Types
import {
    TableBodyType,
    TableHeadType,
    TableSearchType
} from '../types';

// Default props
const defaultProps = {
    beforePaginationDataLength: 10,
    currentPage: 1,
    data: [],
    isCanNextPageClick: false,
    isCanPreviousPageClick: false,
    isDisabled: false,
    emptyRows: [],
    initialDataLength: 0,
    limit: 10,
    isLoading: false,
    messageNoData: 'No Data Available',
    messageNoSearchResults: 'No Search Results Found',
    rowHeight: 40,
    searchInputValue: '',
    sort: {},
    spacing: '',
    totalPages: 0,
    withEmptyRows: true,
    withPagination: false,
    withSearch: false,
    onNextPageClick: () => {},
    onPreviousPageClick: () => {},
    onChangeLimit: () => {},
    onSearch: () => {},
    onSort: () => {},
    onSetPage: () => {}
};

// Prop types
const propTypes = {
    beforePaginationDataLength: PropTypes.number,
    children: PropTypes.instanceOf(Array).isRequired,
    currentPage: PropTypes.number, // withPaginate hoc
    data: PropTypes.instanceOf(Array), // withPaginate, withSearch, withSort hoc
    emptyRows: PropTypes.instanceOf(Array), // withPaginate hoc
    initialDataLength: PropTypes.number, // withPaginate, withSearch, withSort hoc
    isCanNextPageClick: PropTypes.bool,
    isCanPreviousPageClick: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    limit: PropTypes.number,
    messageNoData: PropTypes.string,
    messageNoSearchResults: PropTypes.string,
    rowHeight: PropTypes.number,
    searchInputValue: PropTypes.oneOfType([ // withSearch hoc
        PropTypes.number,
        PropTypes.string
    ]),
    sort: PropTypes.instanceOf(Object), // withSort hoc
    spacing: PropTypes.string,
    totalPages: PropTypes.number, // withPaginate hoc
    withEmptyRows: PropTypes.bool,
    withPagination: PropTypes.bool,
    withSearch: PropTypes.bool,
    onChangeLimit: PropTypes.func, // withPaginate hoc
    onNextPageClick: PropTypes.func, // withPaginate hoc
    onPreviousPageClick: PropTypes.func, // withPaginate hoc
    onSearch: PropTypes.func, // withSearch hoc
    onSetPage: PropTypes.func,
    onSort: PropTypes.func // withSort hoc
};

class Table extends Component {
    onSearch = (value) => {
        const { onSearch, onSetPage } = this.props;

        onSearch(value);
        onSetPage(1);
    };

    getTableMinHeight = (quantity) => {
        const { rowHeight } = this.props;
        const headerHeight = Head.height;

        return quantity ? (quantity * rowHeight) + headerHeight : (10 * rowHeight) + headerHeight;
    };

    cloneChild = (children, type, props) => {
        const resultChildren = children.find(child => child.type.componentType === type);
        if (resultChildren) {
            return React.cloneElement(resultChildren, { ...props });
        }

        return null;
    };

    render() {
        const {
            beforePaginationDataLength,
            children,
            currentPage,
            data,
            isCanNextPageClick,
            isCanPreviousPageClick,
            isDisabled,
            emptyRows,
            initialDataLength,
            limit,
            isLoading,
            messageNoData,
            messageNoSearchResults,
            searchInputValue,
            sort,
            spacing,
            totalPages,
            withEmptyRows,
            withPagination,
            withSearch,
            onSort,
            onNextPageClick,
            onPreviousPageClick,
            onChangeLimit
        } = this.props;

        const isStatic = !withSearch && !withPagination;

        const tableHeadProps = {
            isDisabled: isDisabled || !data.length || !initialDataLength || isLoading,
            onSort,
            sort
        };
        const tableSearchProps = {
            isDisabled: isDisabled || !initialDataLength || isLoading,
            placeholder: 'Search keywords in table',
            value: searchInputValue,
            onChange: this.onSearch
        };
        const tableBodyProps = {
            data,
            withEmptyRows: withEmptyRows && !!data.length,
            emptyRows
        };

        const minHeight = this.getTableMinHeight(data.length + (emptyRows ? emptyRows.length : 0));

        const TableHead = this.cloneChild(children, TableHeadType, tableHeadProps);
        const TableBody = this.cloneChild(children, TableBodyType, tableBodyProps);
        const TableSearch = this.cloneChild(children, TableSearchType, tableSearchProps);

        return (
            <Wrapper spacing={spacing}>
                <ControlsWrapper>
                    {/* Search */}
                    {withSearch && (TableSearch || <SearchInput {...tableSearchProps} />)}

                    {/* Pagination */}
                    <HiddenContent isHidden={!withPagination}>
                        <TablePagination
                            currentPage={currentPage}
                            isDisabled={!data.length || !totalPages || isDisabled || isLoading}
                            dataCount={searchInputValue ? beforePaginationDataLength : initialDataLength}
                            limit={limit}
                            isCanNextPageClick={isCanNextPageClick}
                            isCanPreviousPageClick={isCanPreviousPageClick}
                            totalPages={totalPages}
                            onNextPageClick={onNextPageClick}
                            onPreviousPageClick={onPreviousPageClick}
                            onChangeLimit={onChangeLimit}
                        />
                    </HiddenContent>
                </ControlsWrapper>
                <TableWrapper minHeight={withEmptyRows ? minHeight : ''}>
                    {/* Loader */}
                    <TableLoader isLoading={isLoading} />

                    <table>
                        {/* Head */}
                        {TableHead}

                        {/* Body */}
                        {TableBody}
                    </table>

                    {/* Message */}
                    <HiddenContent isHidden={!!data.length || isLoading || isStatic}>
                        <TableMessage height={minHeight - Head.height}>
                            {searchInputValue ? messageNoSearchResults : messageNoData}
                        </TableMessage>
                    </HiddenContent>
                </TableWrapper>
            </Wrapper>
        );
    }
}

Table.defaultProps = defaultProps;
Table.propTypes = propTypes;

export default Table;
