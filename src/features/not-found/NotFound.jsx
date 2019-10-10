import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Components
import { Board } from '../../components';
import Button from '../../components/buttons/Button';

// Images
const notFoundImage = require('../../assets/svg/not-found-image.svg');

// Prop types
const propTypes = {
    history: PropTypes.instanceOf(Object).isRequired
};

const NotFound = ({ history }) => (
    <Board
        title="Oops!"
        image={<img src={notFoundImage} alt="Not Found" />}
    >
        We can’t seem to find the page you are looking for.
        <Button
            small
            spacing="30px 0 0"
            title="Back"
            onClick={() => history.goBack()}
        />
    </Board>
);

NotFound.propTypes = propTypes;

export default withRouter(NotFound);
