import styled, { css } from 'react-emotion';

// Constants
import directions from './constants';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('arrowButton');

const ArrowButtonWrapper = styled.div`
    position: relative;
    z-index: 1;
    height: max-content;
    margin: ${({ spacing }) => spacing || 0};
    
    ${({ direction }) => direction === directions.right && css`
        svg {
            transform: rotate(180deg);
        }
    `}

    svg path {
       fill: ${({ isDisabled }) => getProperty(isDisabled ? 'colorDisabled' : 'color')}; 
    }
    
    ${({ isDisabled, ...props }) => !isDisabled && css`
        cursor: pointer;

        &:hover svg path {
            fill: ${getProperty('colorHover')(props)}
        }
    `}
`;

export default ArrowButtonWrapper;
