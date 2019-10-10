import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import {
    Content,
    ImagePickerInnerWrapper,
    ImagePickerWrapper,
    ImagePlaceholder,
    MessageNoData,
    RemoveButton,
    SpinnerWrapper
} from './styles';

// Icons
import ImageUploadIcon from '../icons/ImageUploadIcon';
import ImageNotFoundIcon from '../icons/ImageNotFoundIcon';

// Components
import Label from '../../components/label/Label';
import ValidationError from '../../components/validation-error/ValidationError';
import SpinnerLoader from '../../components/spinner-loader/SpinnerLoader';

// Default props
const defaultProps = {
    isLoading: false,
    isReadOnly: false,
    label: '',
    labelAdditional: '',
    labelNote: '',
    placeholderImage: <ImageNotFoundIcon />,
    spacing: '',
    value: '',
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
    placeholderImage: PropTypes.node,
    requirements: PropTypes.shape({
        maxHeight: PropTypes.number.isRequired,
        maxWidth: PropTypes.number.isRequired,
        fileSize: PropTypes.number.isRequired,
        fileType: PropTypes.instanceOf(Array)
    }).isRequired,
    spacing: PropTypes.string,
    validation: PropTypes.shape({
        status: PropTypes.string,
        errors: PropTypes.string
    }),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Object)
    ]),
    width: PropTypes.string,
    onChange: PropTypes.func
};

const defaultTypes = ['image/jpeg', 'image/png'];

class ImagePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: props.value || '',
            validation: props.validation,
            isBroken: false,
            isResponsiveImage: false
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
        const { requirements: {
            maxHeight,
            maxWidth,
            fileSize: size,
            fileType = defaultTypes
        } } = this.props;

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

    handleFileDrop = async (event) => {
        event.preventDefault();

        const { target, dataTransfer } = event;
        const { id, onChange } = this.props;

        const file = target.files ? target.files[0] : dataTransfer.files[0];

        if (!file) {
            return;
        }

        const error = await this.validateImage(file);

        if (error) {
            this.setState({ validation: this.getValidationError(error) });
        } else {
            onChange({ id, value: file });
            this.setState({ validation: this.getValidationError() });
        }
    };

    handleRemove = () => {
        const { id, onChange } = this.props;

        this.setState({
            validation: this.getValidationError()
        }, () => {
            onChange({ id, value: '' });
        });
    };

    handleImageError = () => {
        this.setState({
            validation: this.getValidationError('Cannot find source.'),
            isBroken: true
        });
    };

    handleImageLoad = ({ target }) => {
        const containerWidth = this.containerRef.current ? this.containerRef.current.clientWidth : 0;

        this.setState({
            isResponsiveImage: target.clientWidth > containerWidth
        });
    };

    componentDidUpdate({ value: prevValue, validation }) {
        const { validation: status, value } = this.props;

        if (prevValue === value) {
            return;
        }

        if (typeof value === 'string') {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                file: value,
                isBroken: false,
                ...(validation.status !== status && { validation })
            });

            return;
        }

        if (value) {
            const reader = new FileReader();

            reader.onloadend = () => {
                this.setState({
                    file: reader.result,
                    isBroken: false,
                    ...(validation.status !== status && { validation })
                });
            };
            reader.readAsDataURL(value);
        }
    }

    render() {
        const {
            isLoading,
            isReadOnly,
            label,
            labelNote,
            labelAdditional,
            placeholderImage,
            requirements: {
                maxHeight,
                maxWidth,
                fileSize,
                fileType = defaultTypes
            },
            spacing,
            width
        } = this.props;
        const { validation, file, isBroken, isResponsiveImage } = this.state;
        const formattedTypes = this.getFormattedFileTypes(fileType);

        return (
            <ImagePickerWrapper width={width} spacing={spacing}>
                {
                    label &&
                        <Label labelNote={labelNote} labelAdditional={labelAdditional}>
                            {label}
                        </Label>
                }

                <ImagePickerInnerWrapper
                    isResponsiveImage={isResponsiveImage}
                    innerRef={this.containerRef}
                    validation={validation}
                    onDrop={this.handleFileDrop}
                    onDragEnter={this.preventDefault}
                    onDragLeave={this.preventDefault}
                    onDragOver={this.preventDefault}
                >
                    {/* Remove button */}
                    {file && !isReadOnly && <RemoveButton onClick={this.handleRemove}>Remove</RemoveButton>}

                    {/* Loader */}
                    {isLoading && <SpinnerWrapper><SpinnerLoader size={30} /></SpinnerWrapper>}

                    {/* Content */}
                    {
                        !file && !isLoading && !isReadOnly &&
                        <Content>
                            <input
                                accept={fileType.join()}
                                type="file"
                                onChange={this.handleFileDrop}
                            />

                            <ImageUploadIcon />
                            <h1>Click to upload or drag-and-drop your file here</h1>
                            <span>{`Size: ${maxWidth} x ${maxHeight}`}</span>
                            <span>Type: {formattedTypes}</span>
                            <span>{`File Size: < ${fileSize}kb`}</span>
                        </Content>
                    }

                    {/* Image */}
                    {
                        file && !isBroken && !isLoading &&
                        <img
                            src={file}
                            alt="Selected"
                            onLoad={this.handleImageLoad}
                            onError={this.handleImageError}
                        />
                    }

                    {/* Message no data */}
                    {isReadOnly && !file && <MessageNoData>No data saved</MessageNoData>}

                    {/* Broken placeholder */}
                    { isBroken && !isLoading && <ImagePlaceholder>{placeholderImage}</ImagePlaceholder>}

                    {/* Validation */}
                    {validation.status === 'invalid' && <ValidationError>{validation.errors}</ValidationError>}
                </ImagePickerInnerWrapper>
            </ImagePickerWrapper>
        );
    }
}

ImagePicker.defaultProps = defaultProps;
ImagePicker.propTypes = propTypes;

export default ImagePicker;
