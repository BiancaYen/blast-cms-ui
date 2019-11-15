import React from 'react';
import PropTypes from 'prop-types';

// Styles
import {
    Content,
    InnerWrapper,
    Wrapper
} from './styles';

// Icons
import ImageUploadIcon from '../icons/ImageUploadIcon';

// Components
import File from '../file/File';
// import Image from '../image/Image';
import Label from '../label/Label';
import Grid from '../grid/Grid';

// Utils
import uniqueKey from '../../utils/uniqueKey';

// Default props
const defaultProps = {
    isLoading: false,
    isReadOnly: false,
    label: '',
    labelAdditional: '',
    labelNote: '',
    spacing: '',
    values: '',
    validation: {
        status: '',
        errors: ''
    },
    width: '',
    onChange: () => {},
    onEdit: () => {}
};

// Prop types
const propTypes = {
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    label: PropTypes.string,
    labelAdditional: PropTypes.node,
    labelNote: PropTypes.node,
    spacing: PropTypes.string,
    validation: PropTypes.shape({
        status: PropTypes.string,
        errors: PropTypes.string
    }),
    values: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Object)
    ]),
    width: PropTypes.string,
    onChange: PropTypes.func,
    onEdit: PropTypes.func
};

const FilePicker = ({
    id,
    isLoading,
    isReadOnly,
    label,
    labelNote,
    labelAdditional,
    spacing,
    validation,
    values,
    width,
    onChange,
    onEdit
}) => {
    // Event Handlers
    const handleFileChange = async (event) => {
        event.preventDefault();

        const { target, dataTransfer } = event;

        const files = target.files ? target.files : dataTransfer.files;

        if (!files.length) {
            return;
        }

        // Convert FileList object to array
        const formattedFiles = [...files];

        onChange({ id, values: formattedFiles });
    };

    const preventDefault = (event) => {
        event.preventDefault();
    };

    return (
        <Wrapper width={width} spacing={spacing}>
            {
                label
                && (
                    <Label labelNote={labelNote} labelAdditional={labelAdditional}>
                        {label}
                    </Label>
                )
            }

            <InnerWrapper
                validation={validation}
                onDrop={handleFileChange}
                onDragEnter={preventDefault}
                onDragLeave={preventDefault}
                onDragOver={preventDefault}
            >
                {/* Content */}
                {
                    !isLoading && !isReadOnly
                    && (
                        <Content>
                            <input
                                multiple
                                type="file"
                                onChange={handleFileChange}
                            />

                            <ImageUploadIcon />
                            <h1>Click to upload or drag-and-drop your file here</h1>
                        </Content>
                    )
                }
            </InnerWrapper>
            {
                !!values.length
                && (
                    <Grid grid={Grid.grid.fourColumns}>
                        { values.map(value => (
                            <File
                                key={uniqueKey({})}
                                {...value}
                                onClick={() => onEdit(value)}
                            />
                        ))}
                    </Grid>
                )
            }
        </Wrapper>
    );
};

FilePicker.defaultProps = defaultProps;
FilePicker.propTypes = propTypes;

export default FilePicker;
