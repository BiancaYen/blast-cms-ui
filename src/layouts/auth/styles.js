import styled from 'react-emotion';

import getTheme from '../../utils/getTheme';

const getProperty = getTheme('auth');

const AuthWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: ${getProperty('background')};
`;

const FormWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-basis: 50%;
    height: 100%;
`;

export {
    AuthWrapper,
    FormWrapper
};
