import styled from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('table');

const Container = styled.div`
    height: ${props => props.height}px;
    justify-content: center;
    display: flex;
    align-items: center;
    padding: 5px;
`;

const MessageWrapper = styled.h2`
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.7px;
    margin: 0;
    padding: 0;
    text-align: center;
    color: ${getProperty('messageColor')}
`;

export {
    MessageWrapper,
    Container
};
