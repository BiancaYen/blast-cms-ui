import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('multiCrossSelect');

const getBorderProperty = ({ disabled, validation }) => {
    if (!disabled && validation.status) {
        if (validation.status === 'valid') {
            return getTheme('successColor');
        }

        return getTheme('errorColor');
    }
    return getProperty('border');
};

const Content = styled.div`
    position: relative;
    display: flex;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);
    padding: 10px;
    min-height: 300px;
    
    border: solid 1px ${getBorderProperty};
    background-color: ${getProperty('background')};
    
    &> span[class*="TextButtonWrapper"] { // Reset button
        position: absolute;
        right: 0;
        top: -18px;
    }
`;

const OptionsListWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-right: 10px;
    flex-direction: column;
    
    &> h1 {
        margin: 3px 0;
        padding: 0;
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.69px;
        text-align: center;
        text-transform: uppercase;
        
        color: ${getProperty('labelColor')};
    }
     
    &> div {
        height: 100%;
        overflow: hidden;
        border-radius: 5px;
        display: flex;
        position: relative;
        margin-top: 10px;
        flex-direction: column;
        
        background-color: ${getProperty('listBackground')};
        
        &::after { // Shadow
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            pointer-events: none;
            z-index: 2;
            box-shadow: inset 0 0 4px 0 rgba(0, 0, 0, 0.25);
        }
    
        &[class*="SearchWrapper"] {
            position: relative;
            z-index: 1;
        }
    }
    
    &:last-of-type {
        margin-right: unset;
    }
`;

const ListWrapper = styled.div`
    overflow-y: auto;
    padding-bottom: 2px;
    
    height: ${({ rowHeight, rows }) => (rows * rowHeight) + (rows * 3)}px;

    &> * {
        &:last-of-type {
            border-bottom: none;
        }
    }
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    z-index: 6;
`;

const MessageNoData = styled.span`
    padding: 10px 20px;
    font-size: 11px;
    letter-spacing: 0.54px;
    
    color: ${getProperty('messageNoDataColor')};
`;

const MultiCrossSelectWrapper = styled.div`
    position: relative;
    
    margin: ${({ spacing }) => spacing || '20px 0 10px 0'};
`;

export {
    Content,
    ListWrapper,
    Overlay,
    MessageNoData,
    MultiCrossSelectWrapper,
    OptionsListWrapper
};
