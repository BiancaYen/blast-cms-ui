import React from 'react';

// Components
import { Board } from '../../components';

// Images
const welcomeImage = require('../../assets/svg/welcome-image.svg');

const Welcome = () => (
    <Board
        title="Welcome to the Dashboard!"
        image={<img src={welcomeImage} alt="Welcome" />}
    />
);

export default Welcome;
