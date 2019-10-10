import React from 'react';
import PropTypes from 'prop-types';

// React Color
import { CustomPicker } from 'react-color';
import {
    EditableInput,
    Hue,
    Saturation
} from 'react-color/lib/components/common';

// Styles
import {
    Color,
    HueWrapper,
    Pointer,
    ReactColorWrapper,
    SaturationWrapper
} from './styles';

// Default props
const defaultProps = {
    color: '',
    hex: ''
};

// Prop types
const propTypes = {
    color: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Object)
    ]),
    hex: PropTypes.string
};

const ReactColor = (props) => {
    const { hex, color } = props;

    const inputValue = color ? hex.replace('#', '') : '-';

    return (
        <ReactColorWrapper>
            <div>
                <SaturationWrapper>
                    <Saturation {...props} direction="vertical" />
                </SaturationWrapper>
                <HueWrapper>
                    <Hue {...props} pointer={Pointer} direction="vertical" />
                </HueWrapper>
            </div>
            <div>
                <Color color={hex} />
                <span>#</span>
                <EditableInput {...props} label="hex" value={inputValue} />
            </div>
        </ReactColorWrapper>
    );
};

ReactColor.defaultProps = defaultProps;
ReactColor.propTypes = propTypes;

export default CustomPicker(ReactColor);
