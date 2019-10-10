import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('spinnerLoader');

const getBorderColor = (props) => {
    return Array(3)
        .fill(getProperty('colorAccent')(props))
        .join(' ');
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    margin: ${({ spacing }) => spacing};
    
    div {
        position: absolute;
        width: 100%;
        height: 100%;
        border-width: ${({ size }) => Math.floor(size / 10) || 5}px;
        border-style: solid;
        border-radius: 50%;
        animation: lds-ring 1s linear infinite;
        border-color: ${getBorderColor} transparent;
        
        &:nth-of-type(1) {
          border-color: ${getProperty('color')};
        } 
        
        &:nth-of-type(2) {
          transform: rotate(30deg);
        }
    }
    
    @keyframes lds-ring {
      100% {
        transform: rotate(360deg);
      }
    }
`;

export default Wrapper;
