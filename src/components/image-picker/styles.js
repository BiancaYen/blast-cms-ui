import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('imagePicker');

const getBorderProperty = ({ validation: { status }, isReadOnly, ...props }) => status && !isReadOnly && css`
    border: solid 2px ${getTheme(status === 'valid' ? 'successColor' : 'errorColor')()(props)};
`;

const ImagePickerWrapper = styled.div`
    position: relative;
    min-height: 203px;
    
    margin: ${({ spacing }) => spacing || '20px 0 10px 0'};
    width: ${({ width }) => width || 'auto'};
`;

const ImagePickerInnerWrapper = styled.div`
    position: relative;
    background: ${getProperty('background')};
    width: 100%;
    display: flex;
    height: 100%;
    align-items: center;
    padding: 10px;
    min-height: 203px;
    justify-content: center;
    
    ${({ isResponsiveImage }) => isResponsiveImage && css`
        img {
            width: 100%;
        }
    `}
    
    // Error message
    &> span {
        bottom: -15px;
    }
    
    ${getBorderProperty}
`;

const Content = styled.label`
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
    padding: 30px 30px 27px 30px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: border-color .2s ease;
    
    border: 1px dashed ${getProperty('border')};
    background: ${getProperty('contentBackground')};
    
    svg {
        width: 25px;
        height: 29px;
        margin-bottom: 23px;
        
        path {
            fill: ${getProperty('iconColor')};
        }
    }
    
    h1 {
        font-size: 11px;
        margin: 0 0 9px 0;
        font-weight: normal;
        letter-spacing: 0.6px;
        text-align: center;
        
        color: ${getProperty('contentTitleColor')};
    }
    
    input {
        display: none;
    }
    
    span {
        width: 100%;
        text-align: center;
        font-size: 11px;
        line-height: 1.55;
        letter-spacing: 0.6px;
        
        color: ${getProperty('contentColor')};
    }
    
    &:hover {
      border: 1px dashed ${getProperty('borderHover')};
    }
`;

const ImagePlaceholder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const RemoveButton = styled.span`
    position: absolute;
    right: 0;
    top: -20px;
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    text-align: right;
    cursor: pointer;
    
    color: ${getProperty('removeButtonColor')};
`;

const SpinnerWrapper = styled.div`
    margin: auto;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    min-height: 185px;
    
    background-color: ${getProperty('loaderBackground')};
`;

const MessageNoData = styled.span`
    font-size: 14px;
    letter-spacing: 0.7px;
    
    color: ${getProperty('messageNoDataColor')};
`;

export {
    Content,
    ImagePickerInnerWrapper,
    ImagePickerWrapper,
    ImagePlaceholder,
    MessageNoData,
    RemoveButton,
    SpinnerWrapper
};
