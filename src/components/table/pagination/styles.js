import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('tablePagination');

const disabledStyles = ({ isDisabled, ...props }) => isDisabled && css`
    z-index: 1;
    
    background-color: ${getProperty('buttonBackgroundDisabled')(props)};
    border: solid 1px ${getProperty('buttonBorderColorDisabled')(props)};
    
    &> svg > path {
        fill: ${getProperty('buttonIconColorDisabled')(props)};
    }
`;

const hover = ({ isDisabled, ...props }) => !isDisabled && css`
    &:hover {
        z-index: 3;
        cursor: pointer;
        
        background-color: ${getProperty('buttonBackgroundHover')(props)};
        border: solid 1px ${getProperty('buttonBorderColorHover')(props)};
        
        &> svg > path {
            fill: ${getProperty('buttonIconColorHover')(props)};
        }
    }
`;

const PaginationWrapper = styled.div`
    width: 190px;
    position: relative;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    flex-direction: row;
    
    ul[class*="ActionMenu"] {
        width: 100px;
        top: 15px;
        right: 0;
        
        &> li:first-of-type {
            font-weight: bold;
        }
    }
`;

const ButtonNext = styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 35px;
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
    transition: all .2s ease;
    
    background-color: ${getProperty('buttonBackground')};
    border: solid 1px ${getProperty('buttonBorderColor')};
    
    &> svg {
        margin: auto;
        
        &> path {
            fill: ${getProperty('buttonIconColor')};
        }
    }
    
    ${hover}
    ${disabledStyles}
`;

const ButtonPrevious = styled(ButtonNext)`
    transform: rotate(180deg);
    margin-right: -1px;
`;

const Current = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
    
    cursor: ${({ isDisabled }) => (isDisabled ? 'normal' : 'pointer')};
        
    &> span:first-of-type {
        font-size: 10px;
        letter-spacing: 0.7px;
        
        color: ${getProperty('currentPageColor')};
    }
    
    &> span:nth-of-type(2) {
        padding-left: 8px;
    }
    
    svg {
        path {
            fill: ${getProperty('buttonIconColor')}
        }
    }
`;

const Total = styled.div`
    font-size: 10px;
    margin: 0 10px 0 8px;
    letter-spacing: 0.7px;
    vertical-align: 1;
    
    color: ${({ isDisabled }) => getProperty(isDisabled
        ? 'totalPagesColorDisabled'
        : 'totalPagesColor'
    )};
`;

export {
    Current,
    Total,
    PaginationWrapper,
    ButtonNext,
    ButtonPrevious
};
