import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// Components
import ImagePlaceholder from '../image-placeholder/ImagePlaceholder';

// Styles
import ImageCropperWrapper from './styles';

// Prop Types
const propTypes = {
    cropProperties: PropTypes.instanceOf(Object).isRequired,
    id: PropTypes.string.isRequired,
    file: PropTypes.instanceOf(Object).isRequired,
    isBroken: PropTypes.bool.isRequired,
    source: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onCropChange: PropTypes.func.isRequired,
    onImageError: PropTypes.func.isRequired
};

const ImageCropper = ({
    cropProperties,
    id,
    isBroken,
    file,
    source,
    onChange,
    onCropChange,
    onImageError
}) => {
    const [originalImage, setOriginalImage] = useState('');

    // Helpers
    const getCroppedImage = () => {
        const canvas = document.createElement('canvas');
        const scaleX = originalImage.naturalWidth / originalImage.width;
        const scaleY = originalImage.naturalHeight / originalImage.height;
        canvas.width = cropProperties.width;
        canvas.height = cropProperties.height;
        const canvasContext = canvas.getContext('2d');

        canvasContext.drawImage(
            originalImage,
            cropProperties.x * scaleX,
            cropProperties.y * scaleY,
            cropProperties.width * scaleX,
            cropProperties.height * scaleY,
            0,
            0,
            cropProperties.width,
            cropProperties.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                resolve(blob);
            }, 'image/jpeg');
        });
    };

    const getCroppedFile = async () => {
        if (cropProperties.width && cropProperties.height) {
            const croppedImageBlob = await getCroppedImage();
            return new File([croppedImageBlob], file.name);
        }
        return file;
    };

    // Event Handlers
    const handleChange = (value) => {
        onChange({
            id,
            value
        });
    };

    const handleCropComplete = () => {
        getCroppedFile().then((croppedFile) => {
            handleChange(croppedFile);
        }).catch(() => {
            handleChange(file);
        });
    };

    return (
        <ImageCropperWrapper>
            {!isBroken && (
                <ReactCrop
                    src={source}
                    crop={cropProperties}
                    ruleOfThirds
                    onComplete={handleCropComplete}
                    onChange={onCropChange}
                    onImageError={onImageError}
                    onImageLoaded={loadedImage => setOriginalImage(loadedImage)}
                />
            )}
            {isBroken && (
                <ImagePlaceholder />
            )}
        </ImageCropperWrapper>
    );
};

ImageCropper.propTypes = propTypes;

export default ImageCropper;
