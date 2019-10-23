import React, { Component } from 'react';
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
import File from './File';
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
    onChange: () => {}
};

// Prop types
const propTypes = {
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    label: PropTypes.string,
    labelAdditional: PropTypes.node,
    labelNote: PropTypes.node,
    requirements: PropTypes.shape({
        maxHeight: PropTypes.number,
        maxWidth: PropTypes.number,
        fileSize: PropTypes.number.isRequired,
        fileType: PropTypes.instanceOf(Array)
    }).isRequired,
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
    onChange: PropTypes.func
};

const defaultTypes = ['image/jpeg', 'image/png'];

class FilePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: props.values || '',
            validation: props.validation
        };

        this.containerRef = React.createRef();
    }


    preventDefault = (event) => {
        event.preventDefault();
    };

    getImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const image = new Image();

                image.src = reader.result;

                image.onload = () => {
                    resolve(image);
                };
            };

            reader.onerror = reject;

            reader.readAsDataURL(file);
        });
    };

    getValidationError = (message = '') => ({
        status: message ? 'invalid' : '',
        errors: message
    });

    getFormattedFileTypes = (fileTypes = []) => {
        if (!fileTypes.length) {
            return 'image';
        }

        const formattedTypes = fileTypes.map((type) => {
            const [, result = ''] = type.match(/image\/(.*)/) || [];

            return result.toUpperCase();
        }).filter(type => !!type);

        const lastElement = formattedTypes.pop();

        if (!formattedTypes.length) {
            return lastElement;
        }

        return `${formattedTypes.join(', ')} or ${lastElement}`;
    };

    validateImage = async (file) => {
        const { type, size: fileSize } = file;
        const {
            requirements: {
                maxHeight,
                maxWidth,
                fileSize: size,
                fileType = defaultTypes
            }
        } = this.props;

        if (!fileType.includes(type)) {
            return `The file is not a ${this.getFormattedFileTypes(fileType)}`;
        }

        const maxSize = size * 1024;

        if (fileSize > maxSize) {
            return 'Image file size is too large';
        }

        const { width, height } = await this.getImage(file);

        if (width > maxWidth && height > maxHeight) {
            return 'Image width and height is too large';
        }

        if (width > maxWidth) {
            return 'Image width is too large';
        }

        if (height > maxHeight) {
            return 'Image height is too large';
        }

        return null;
    };

    handleFileChange = async (event) => {
        event.preventDefault();

        const { target, dataTransfer } = event;
        const { id, onChange } = this.props;

        const files = target.files ? target.files : dataTransfer.files;

        if (!files.length) {
            return;
        }

        // Convert FileList object to array
        const formattedFiles = [...files];

        onChange({ id, values: formattedFiles });
    };

    handleRemove = () => {
        const { id, onChange } = this.props;

        this.setState({
            validation: this.getValidationError()
        }, () => {
            onChange({ id, values: '' });
        });
    };

    render() {
        const {
            isLoading,
            isReadOnly,
            label,
            labelNote,
            labelAdditional,
            requirements: {
                fileSize,
                fileType = defaultTypes
            },
            spacing,
            values,
            width
        } = this.props;

        const {
            validation,
            file
        } = this.state;
        const formattedTypes = this.getFormattedFileTypes(fileType);

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
                    innerRef={this.containerRef}
                    validation={validation}
                    onDrop={this.handleFileChange}
                    onDragEnter={this.preventDefault}
                    onDragLeave={this.preventDefault}
                    onDragOver={this.preventDefault}
                >
                    {/* Content */}
                    {
                        !file && !isLoading && !isReadOnly
                        && (
                            <Content>
                                <input
                                    accept={fileType.join()}
                                    multiple
                                    type="file"
                                    onChange={this.handleFileChange}
                                />

                                <ImageUploadIcon />
                                <h1>Click to upload or drag-and-drop your file here</h1>
                                <span>{`Type: ${formattedTypes}`}</span>
                                <span>{`File Size: < ${fileSize}kb`}</span>
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
                                    value={value}
                                />
                            ))}
                        </Grid>
                    )
                }
            </Wrapper>
        );
    }
}

FilePicker.defaultProps = defaultProps;
FilePicker.propTypes = propTypes;

export default FilePicker;
