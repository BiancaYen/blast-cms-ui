import styled from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('inputDisplayButton');

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .1s linear;
    
    cursor: ${({ isDisabled }) => (isDisabled ? 'normal' : 'pointer')};
    
    path {
        fill: ${({ isDisabled }) => (!isDisabled
        ? getProperty('color')
        : getProperty('colorDisabled')
    )};
    }
`;

export default Wrapper;
