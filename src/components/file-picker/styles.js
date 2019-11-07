import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('imagePicker');

const getBorderProperty = ({ validation: { status }, isReadOnly, ...props }) => status && !isReadOnly && css`
    border: solid 2px ${getTheme(status === 'valid' ? 'successColor' : 'errorColor')()(props)};
`;

const Wrapper = styled.div`
    position: relative;
    min-height: 500px;
    
    margin: ${({ spacing }) => spacing || '20px 0 10px 0'};
    width: ${({ width }) => width || 'auto'};
`;

const InnerWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    height: 100%;
    align-items: center;
    margin: 0 0 40px;
    justify-content: center;
    background: ${getProperty('background')};
    
    img {
        width: 100%;
    }
    
    // Error message
    &> span {
        bottom: -15px;
    }
    
    ${getBorderProperty}
`;

const Content = styled.label`
    background: ${getProperty('contentBackground')};
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
    padding: 30px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: border-color .2s ease;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);
    border-radius: 5px;
    border: 1px dashed ${getProperty('border')};
    
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

export {
    Content,
    InnerWrapper,
    SpinnerWrapper,
    Wrapper
};
