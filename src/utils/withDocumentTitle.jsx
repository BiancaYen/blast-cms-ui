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
            document.title = `King James CMS - ${title}`;
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    };
};
export default withDocumentTitle;
