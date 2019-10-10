import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Utils
import getSortedData from '../components/table/table-component/getSortedData';
import withSaveState from './withSaveState';

// Default props
const defaultProps = {
    data: [],
    sortableColumns: []
};

// Prop types
const propTypes = {
    data: PropTypes.instanceOf(Array),
    saveState: PropTypes.func.isRequired,
    savedState: PropTypes.instanceOf(Object).isRequired,
    sortableColumns: PropTypes.instanceOf(Array)
};

const withSort = (ComposedComponent) => {
    class Sort extends Component {
        constructor(props) {
            super(props);

            // Restore sort data from localStorage
            const { sort = this.getSortableFields(), sortableField = null } = props.savedState.sort || {};

            this.state = { sort, sortableField };
        }

        getSortableFields = () => {
            const { sortableColumns } = this.props;
            const sort = {};

            sortableColumns.forEach((column) => {
                sort[column] = '';
            });

            return sort;
        };

        onSort = ({ sortKey, sortDirection }) => {
            const { sortableColumns } = this.props;

            if (sortableColumns.includes(sortKey)) {
                let sortableField = null;

                if (sortDirection) {
                    sortableField = {
                        field: sortKey,
                        direction: sortDirection
                    };
                }

                this.setState({
                    sort: {
                        ...this.getSortableFields(),
                        [sortKey]: sortDirection
                    },
                    sortableField
                });
            }
        };

        getSortedData = () => {
            const { data } = this.props;
            const { sortableField } = this.state;

            if (sortableField) {
                const { direction, field } = sortableField;

                return getSortedData({ data, field, direction });
            }

            return data;
        };

        componentWillUnmount() {
            const { saveState } = this.props;

            // Save sort data in localStorage
            saveState('sort', this.state);
        }

        render() {
            const { data } = this.props;
            const { sort } = this.state;

            return (
                <ComposedComponent
                    {...this.props}
                    data={this.getSortedData()}
                    initialDataLength={data.length}
                    sort={sort}
                    withSort
                    onSort={this.onSort}
                />
            );
        }
    }

    Sort.defaultProps = defaultProps;
    Sort.propTypes = propTypes;

    return withSaveState(Sort);
};

export default withSort;
