import styled, { keyframes } from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('linearLoader');

const animate = keyframes`
    0% {
        left: 0;
    }

    50% {
        left: calc(100% - 100px);
    }

    100% {
        left: 0;
    }
`;

const LinearLoader = styled.div`
    width: 100%;
    position: relative;
    
    ::after {
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        display: block;
        width: 100px;
        height: 3px;
    
        animation: ${animate} 2s infinite;
        background: ${getProperty('color')};
    }
`;

export default LinearLoader;
