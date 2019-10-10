import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withDocumentTitle = (ComposedComponent) => {
    return class extends Component {
        static propTypes = {
            title: PropTypes.string.isRequired
        };

        constructor(props) {
            super(props);
            const { title } = props;

            // Set title
            document.title = `${process.env.REACT_APP_TITLE} - ${title}`;
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    };
};
export default withDocumentTitle;
