import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Utils
import withSaveState from './withSaveState';

// Default props
const defaultProps = {
    data: [],
    initialDataLength: 0
};

// Prop types
const propTypes = {
    data: PropTypes.array,
    initialDataLength: PropTypes.number,
    saveState: PropTypes.func.isRequired,
    savedState: PropTypes.instanceOf(Object).isRequired
};

const withSearch = (ComposedComponent) => {
    class Search extends Component {
        constructor(props) {
            super(props);

            // Restore search data from localStorage
            const { search = '' } = props.savedState;
            this.state = { search };
        }

        onSearch = (value) => {
            this.setState({ search: value });
        };

        getSearchData = () => {
            const { data } = this.props;
            const { search } = this.state;

            if (search.length > 0 && data.length) {
                const fields = Object.keys(data[0]);

                return data.filter((item) => {
                    return fields.filter((field) => {
                        if (item[field]) {
                            return item[field].toString().toLowerCase().includes(search.toLowerCase());
                        }

                        return false;
                    }).length;
                });
            }

            return data;
        };

        componentWillUnmount() {
            // Save search data in localStorage
            this.props.saveState('search', this.state.search);
        }

        render() {
            const { initialDataLength, data } = this.props;

            return (
                <ComposedComponent
                    {...this.props}
                    data={this.getSearchData()}
                    initialDataLength={initialDataLength || data.length}
                    searchInputValue={this.state.search}
                    withSearch
                    onSearch={this.onSearch}
                />
            );
        }
    }

    Search.defaultProps = defaultProps;
    Search.propTypes = propTypes;

    return withSaveState(Search);
};

export default withSearch;
