import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// Components
import FormSection from '../form-section/FormSection';
import Grid from '../grid/Grid';
import ImagePlaceholder from '../image-placeholder/ImagePlaceholder';
import Input from '../input/Input';
import Select from '../select/Select';

// Styles
import ImageCropperWrapper from './styles';

// Utils
import objectDeepMatches from '../../utils/objectDeepMatches';
import usePrevious from '../../utils/usePrevious';

// Prop Types
const propTypes = {
    file: PropTypes.instanceOf(Object).isRequired,
    onChange: PropTypes.func.isRequired
};

const ImageCropper = ({
    alternativeName,
    file,
    name,
    onChange
}) => {
    // Data
    const aspectRatiosData = [
        { id: 1, name: '1 / 1', value: 1 / 1 },
        { id: 2, name: '4 / 3', value: 4 / 3 },
        { id: 3, name: '16 / 9', value: 16 / 9 }
    ];

    // State
    const [originalImage, setOriginalImage] = useState('');
    const [source, setSource] = useState('');
    const [isBroken, setIsBroken] = useState(false);

    const [crop, setCrop] = useState({
        unit: '%',
        width: 50,
        aspect: 16 / 9
    });

    // Previous Props
    const previousFile = usePrevious(file) || {};

    // Helpers
    const getCroppedImage = () => {
        if (originalImage) {
            const canvas = document.createElement('canvas');
            const scaleX = originalImage.naturalWidth / originalImage.width;
            const scaleY = originalImage.naturalHeight / originalImage.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const canvasContext = canvas.getContext('2d');

            canvasContext.drawImage(
                originalImage,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
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
        }
        return '';
    };

    const getCroppedFile = async () => {
        if (crop.width && crop.height) {
            const croppedImageBlob = await getCroppedImage();
            return new File([croppedImageBlob], file.name);
        }
        return originalImage;
    };

    // Event Handlers
    const handleCropComplete = () => {
        getCroppedFile().then((croppedFile) => {
            onChange(croppedFile);
        }).catch(() => {
            onChange(file);
        });
    };

    const handleCropChange = ({ id, value: inputValue }) => {
        setCrop(
            { ...crop, [id]: inputValue }
        );
    };

    const handleImageError = () => {
        setIsBroken(true);
    };

    // Getters
    const getImage = () => {
        if (file.name) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setSource(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Effects
    useEffect(() => {
        if (!objectDeepMatches(file.name, previousFile.name)) {
            getImage();
        }
    });

    const { id: aspectRatioId } = aspectRatiosData.find(aspectRatio => aspectRatio.value === crop.aspect);

    return (
        <ImageCropperWrapper>
            {!isBroken && (
                <Grid alignItems="start" grid={Grid.grid.twoColumns}>
                    <FormSection title="Crop your image" spacing="0" withoutBorder>
                        {source && (
                            <ReactCrop
                                src={source}
                                crop={crop}
                                ruleOfThirds
                                onComplete={handleCropComplete}
                                onChange={updatedCrop => setCrop(updatedCrop)}
                                onImageError={handleImageError}
                                onImageLoaded={loadedImage => setOriginalImage(loadedImage)}
                            />
                        )}
                    </FormSection>
                    <FormSection title="Meta Data" spacing="0" withoutBorder>
                        <Select
                            id="aspect"
                            data={aspectRatiosData}
                            label="Aspect Ratio"
                            placeholder="Select Aspect Ratio"
                            onChange={handleCropChange}
                            value={aspectRatioId}
                        />
                        <Input
                            id="width"
                            label="Width"
                            labelNote={`(In ${crop.unit})`}
                            placeholder="Type Width"
                            onChange={handleCropChange}
                            value={crop.width}
                        />
                        <Input
                            id="height"
                            isReadOnly={!!crop.width}
                            label="Height"
                            labelNote={`(In ${crop.unit})`}
                            placeholder="Type Height"
                            onChange={handleCropChange}
                            value={crop.height}
                        />
                    </FormSection>
                </Grid>
            )}
            {isBroken && (
                <ImagePlaceholder />
            )}
        </ImageCropperWrapper>
    );
};

ImageCropper.propTypes = propTypes;

export default ImageCropper;
