import React, { Component } from 'react';
import PropTypes from 'prop-types';

// HOC
import withSaveState from './withSaveState';

// Components
import TableRow from '../components/table/row/TableRow';

// Styles
import { CellPlaceholder } from '../components/table/table-component/styles';

// Default props
const defaultProps = {
    data: [],
    initialDataLength: 0,
    limit: 10,
    rowHeight: TableRow.height
};

// Prop types
const propTypes = {
    data: PropTypes.instanceOf(Array),
    initialDataLength: PropTypes.number,
    limit: PropTypes.number,
    rowHeight: PropTypes.number,
    saveState: PropTypes.func.isRequired,
    savedState: PropTypes.shape({
        paginate: PropTypes.instanceOf(Object)
    }).isRequired
};

const withPaginate = (ComposedComponent) => {
    class Paginate extends Component {
        constructor(props) {
            super(props);

            // Restore pagination data from localStorage
            const { currentPage = 1, inputValue = 1, limit } = props.savedState.paginate || {};

            this.state = {
                currentPage,
                inputValue,
                totalPages: 0,
                limit: limit || props.limit
            };
        }

        onPageClick = (page) => {
            const { totalPages } = this.state;

            if (page !== 0 || page > totalPages) {
                this.setState({ currentPage: page });
            }
        };

        onSetPage = (page) => {
            this.setState({ currentPage: page });
        };

        onChangeLimit = (limit) => {
            this.setState({ limit, currentPage: 1 });
        };

        getPaginatedData = () => {
            const { data } = this.props;
            const { currentPage, limit } = this.state;

            if (limit === 0) {
                return data;
            }

            const indexStart = (currentPage - 1) * limit;
            const indexEnd = indexStart + limit;

            return data.slice(indexStart, indexEnd);
        };

        getEmptyRowsLength = (limit, dataLength) => {
            const defaultLimit = 10;

            if (dataLength >= defaultLimit) {
                return 0;
            }

            return limit ? limit - dataLength : defaultLimit - dataLength;
        };

        getEmptyRows = (data) => {
            const { rowHeight } = this.props;
            const { limit } = this.state;
            const dataEmpty = this.getEmptyRowsLength(limit, data.length);

            if (dataEmpty) {
                const randomKeys = Array.from(Array(dataEmpty), () => Math.random().toString(36).substring(2, 15));
                return randomKeys.map(key => (
                    <TableRow key={key} noHover>
                        <CellPlaceholder colSpan={30} minHeight={rowHeight}>
                            {''}
                        </CellPlaceholder>
                    </TableRow>
                ));
            }

            return null;
        };

        getIsPrevPageDisabled = (currentPage, dataLength) => {
            return dataLength === 0 || currentPage === 1;
        };

        getIsNextPageDisabled = (currentPage, dataLength, limit) => {
            return currentPage * limit >= dataLength || limit === 0;
        };

        static getDerivedStateFromProps({ data, limit }, state) {
            return {
                ...state,
                totalPages: Math.ceil(data.length / limit)
            };
        }

        componentDidUpdate(props, { totalPages: prevTotalPages }) {
            const { totalPages } = this.state;

            if (totalPages !== prevTotalPages) {
                this.onSetPage(1);
            }
        }

        componentWillUnmount() {
            const { saveState } = this.props;
            // Save pagination data in localStorage
            saveState('paginate', this.state);
        }

        render() {
            const { initialDataLength, data } = this.props;
            const {
                currentPage,
                inputValue,
                limit,
                totalPages
            } = this.state;

            const paginatedData = this.getPaginatedData();
            const emptyRows = this.getEmptyRows(paginatedData);
            const isCanPreviousPageClick = this.getIsPrevPageDisabled(currentPage, data.length);
            const isCanNextPageClick = this.getIsNextPageDisabled(currentPage, data.length, limit);

            return (
                <ComposedComponent
                    {...this.props}
                    beforePaginationDataLength={data.length}
                    currentPage={currentPage}
                    data={paginatedData}
                    initialDataLength={initialDataLength || data.length}
                    isCanNextPageClick={isCanNextPageClick}
                    isCanPreviousPageClick={isCanPreviousPageClick}
                    emptyRows={emptyRows}
                    limit={limit}
                    paginationInputValue={inputValue}
                    totalPages={totalPages}
                    onChangeLimit={this.onChangeLimit}
                    withPagination
                    onNextPageClick={() => this.onPageClick(currentPage + 1)}
                    onPreviousPageClick={() => this.onPageClick(currentPage - 1)}
                    onSetPage={this.onSetPage}
                />
            );
        }
    }

    Paginate.defaultProps = defaultProps;
    Paginate.propTypes = propTypes;

    return withSaveState(Paginate);
};

export default withPaginate;
