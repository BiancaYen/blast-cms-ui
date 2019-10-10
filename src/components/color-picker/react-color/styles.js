import styled from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('colorPicker');

const ReactColorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 239px;
    height: 240px;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 1px 1px 6px 0 rgba(215, 214, 214, 0.71);
    background-color: ${getProperty('popupBackground')};
    
    > div:nth-child(1) { // Hue and Saturation wrapper
        display: flex;
        justify-content: space-between;
    }
    
    > div:nth-child(2) { // Input wrapper
        display: flex;
        align-items: center;
        margin-top: 10px;
        font-size: 12px;
        
        color: ${getProperty('popupColor')};
        
        input {
            border-radius: 0;
            width: 63px;
            height: 20px;
            margin-left: 3px;
            outline: none;
            padding: 0 5px;
            font-size: 12px;
            
            border: solid 1px ${getProperty('inputBorderColor')};
            background-color: ${getProperty('inputBackground')};
            color: ${getProperty('inputColor')};
        }
        
        > div span {
            display: none;
        }
    }
`;

const Color = styled.div`
    width: 50px;
    height: 20px;
    margin-right: 17px;
    
    border: solid 1px ${getProperty('inputBorderColor')};
    background-color: ${({ color }) => color};
`;

const SaturationWrapper = styled.div`
    position: relative;
    width: 170px;
    height: 170px;
    cursor: pointer;
`;

const HueWrapper = styled.div`
    position: relative;
    width: 20px;
    height: 170px;
    cursor: pointer;
`;

const Pointer = styled.div` // Hue pointer
    width: 20px;
    position: relative;
    transform: translateY(-3px);
    
    &::before {
        content: "";
        position: absolute;
        left: -5px;
        width: 0; 
        height: 0; 
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        
        border-left: 5px solid ${getProperty('pointerColor')}; 
    }
    
    &::after {
        content: "";
        position: absolute;
        right: -5px;
        width: 0; 
        height: 0;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent; 
        
        border-right:5px solid ${getProperty('pointerColor')};
    }
`;

export {
    Color,
    HueWrapper,
    Pointer,
    ReactColorWrapper,
    SaturationWrapper
};
