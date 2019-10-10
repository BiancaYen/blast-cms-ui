import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('rangeToggle');

const getThumbPosition = ({ value }) => {
    return `calc(${value}% - ${Math.round((20 * value) / 100)}px)`;
};

const ReadOnlyValue = styled.span`
    width: 190px;
    line-height: 45px;
    font-size: 11px;
    letter-spacing: 0.7px;
    padding-left: 20px;
    margin-top: 6px;
    
    color: ${getProperty('readOnlyValueColor')};
`;

const Selected = styled.div`
    border-radius: 16px;
    height: 8px;
    left: 0;
    position: absolute;
    z-index: 2;
    pointer-events: none;
    
    background-color: ${getProperty('sliderActive')};
    width: ${({ width }) => `calc(${width}%)`};
`;

const Toggle = styled.div`
    align-items: center;
    box-sizing: content-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 6px 30px 0 0;
    position: relative;

    // using the following as a style guide for the range inputs
    // https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
    input[type=range] {
        cursor: ${({ isDisabled }) => (isDisabled ? 'initial' : 'pointer')};
        width: 100%;
        -webkit-appearance: none;
        background: transparent;
        margin: 0;
        
        &:disabled {
            cursor: default;
        }

        &:focus {
            outline: none;
        }

        &::-webkit-slider-thumb {
            background: ${getProperty('thumbBackground')};
            box-shadow: 0 2px 4px 0 rgba(140, 140, 140, 0.3), 0 -2px 4px 0 rgba(140, 140, 140, 0.2);
            border-radius: 50%;
            height: 20px;
            margin-top: -6px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
            position: absolute;
            z-index: 3;
            -webkit-appearance: none;
            width: 20px;
            
            cursor: ${({ isDisabled }) => (isDisabled ? 'initial' : 'pointer')};
            left: ${getThumbPosition};
            display: ${({ isReadOnly, isDisabled }) => (isReadOnly || isDisabled ? 'none' : 'initial')};
        }

        &::-moz-range-thumb {
            box-shadow: 0 2px 4px 0 rgba(140, 140, 140, 0.3), 0 -2px 4px 0 rgba(140, 140, 140, 0.2);
            border-radius: 50%;
            height: 20px;
            position: absolute;
            z-index: 3;
            width: 20px;
            
            background: ${getProperty('thumbBackground')};
            cursor: ${({ isDisabled }) => (isDisabled ? 'initial' : 'pointer')};
            left: ${getThumbPosition};
            display: ${({ isReadOnly, isDisabled }) => (isReadOnly || isDisabled ? 'none' : 'initial')};
        }

        &::-ms-thumb {
            box-shadow: 0 2px 4px 0 rgba(140, 140, 140, 0.3), 0 -2px 4px 0 rgba(140, 140, 140, 0.2);
            border-radius: 50%;
            height: 20px;
            position: absolute;
            z-index: 3;
            width: 20px;
            
            background: ${getProperty('thumbBackground')};
            cursor: ${({ isDisabled }) => (isDisabled ? 'initial' : 'pointer')};
            left: ${getThumbPosition};
            display: ${({ isReadOnly, isDisabled }) => (isReadOnly || isDisabled ? 'none' : 'initial')};
        }

        &::-ms-track {
            background: transparent;
            border-color: transparent;
            color: transparent;
            border-width: 16px 0;
            width: 100%;
            height: 8px;
        }

        &::-webkit-slider-runnable-track {
            height: 8px;
            width: 100%;
            border-radius: 100px;
            
            background: ${getProperty('slider')};
            ${({ isDisabled }) => (isDisabled ? 'initial' : 'pointer')};
        }
        
        &:focus::-webkit-slider-runnable-track {
            background: ${getProperty('slider')};
            
            ${({ isDisabled }) => (isDisabled ? 'initial' : 'pointer')};
        }

        &::-moz-range-track {
            border-radius: 100px;
            width: 100%;
            height: 8px;
            
            background: ${getProperty('slider')};
            ${({ isDisabled }) => (isDisabled ? 'initial' : 'pointer')};
        }

        &::-ms-fill-lower {
            border-radius: 100px;
            
            background: ${getProperty('slider')};
        }

        &::-ms-fill-upper {
            border-radius: 100px;
            
            background: ${getProperty('slider')};
        }

        &:focus::-ms-fill-upper {
            background: ${getProperty('slider')};
        }
    }
`;

const ToggleWrapper = styled.div`
    align-items: center;
    display: flex;
    width: 100%;
    
    & > [class*="InputWrapper"] {
        width: 190px;
    }
`;

const RangeToggleWrapper = styled.div`
   margin: ${({ spacing }) => spacing || '20px 0 10px 0'};
`;

const XAxis = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    line-height: 12px;
    letter-spacing: 0;
    margin-top: 10px;
    width: 100%;
    
    > div {
        position: relative;
        min-width: 20px;
        text-align: center;
        width: 15px;
        font-size: 12px;
        line-height: 1;
        
        color: ${getProperty('valuesColor')};
    }
`;

export {
    Selected,
    Toggle,
    ToggleWrapper,
    RangeToggleWrapper,
    XAxis,
    ReadOnlyValue
};
