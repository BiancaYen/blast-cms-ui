import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('multiCrossSelectRow');
const getActionsGroupProperty = getTheme('actionsGroup');

export const height = 40;

const ActionsWrapper = styled.div`
    svg {
        width: 12px;
        height: 12px;
    }
`;

const RowWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    padding: 0 16px 0 20px;
    line-height: ${height}px;
    outline: none;
    transition: color, background-color .2s ease;
    
    color: ${getProperty('color')};
    border-bottom: 2px solid ${getProperty('borderColor')};
    background-color: ${getProperty('background')};
    cursor: ${({ isDisabled, isLocked }) => (isDisabled || isLocked ? 'initial' : 'pointer')};
    
    ${({ isDisabled, isLocked, ...props }) => !isDisabled && !isLocked && css`
        &:hover {
            background-color: ${getProperty('backgroundHover')(props)};
        }
    `}
`;

const BadgeFlag = styled.div`
    display: inline-block;
    width: 23px;
    img {
        display: block;
        height: auto;
        width: 100%;
    }
`;

const RowFlagWrapper = styled.div`
    display: flex;
    align-items: center;
    
    &> * {
        margin-left: 10px;
    }
`;

const RowAccordionWrapper = styled.div`
    &> div {
        align-items: flex-start;
        
        > span {
            outline: none;
            padding-top: 18px;
        }
    }
`;

const AccordionContent = styled.div`
    font-size: 11px;
    line-height: 1.82;
    padding: 5px 0 20px 0;

    color: ${getProperty('accordionContentColor')};
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`;

const AccordionAction = styled.div`
    display: inline-flex;
    align-items: center;
    
    &::before { // Action divider
        content: "";
        height: 10px;
        display: inline-block;
        margin: 0 18px;
        
        border-left: solid 2px ${getActionsGroupProperty('dividerColor')};
    }
`;

const AccordionTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 11px;
    letter-spacing: 0.69px;
    flex-grow: 1;
    margin: 0 10px 0 18px;
    transition: color .3s ease;
    outline: none;
    
    cursor: ${({ isDisabled }) => (isDisabled ? 'initial' : 'pointer')};
    
    &> span {
        align-self: flex-start;
        
        color: ${({ isActive }) => getProperty(isActive ? 'accordionColorActive' : 'color')}; 
    }
`;

export {
    AccordionAction,
    AccordionTitle,
    ActionsWrapper,
    BadgeFlag,
    RowFlagWrapper,
    RowWrapper,
    RowAccordionWrapper,
    AccordionContent
};
