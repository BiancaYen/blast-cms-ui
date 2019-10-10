import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('label');

const getColor = (color = 'color') => ({ isDisabled }) => {
    return getProperty(isDisabled ? 'colorDisabled' : color);
};

const LabelMain = styled.span`
    font-size: 11px;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    text-align: left;
    padding: 0 0 6px 0;
    
    color: ${getColor()};
`;

const ActionWrapper = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
`;

const InnerWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    
    &> div:first-of-type {
        display: flex;
    }
`;

const LabelWrapper = styled.div`
    position: relative;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.7px;
    
    margin: ${({ spacing }) => spacing || '0'};
    color: ${getColor()};
`;

const LabelNote = styled.span`
    padding-left: 8px;
    
    color: ${getColor('noteColor')};
`;

export {
    LabelMain,
    ActionWrapper,
    InnerWrapper,
    LabelWrapper,
    LabelNote
};
