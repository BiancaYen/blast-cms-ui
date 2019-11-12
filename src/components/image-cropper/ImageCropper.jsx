import React, { useEffect, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// Components
import FormSection from '../form-section/FormSection';
import Grid from '../grid/Grid';
import Input from '../input/Input';
import Select from '../select/Select';

// Styles
import ImageCropperWrapper from './styles';

// Utils
import objectDeepMatches from '../../utils/objectDeepMatches';
import usePrevious from '../../utils/usePrevious';

const ASPECT_RATIOS_DATA = [
    { id: 1, name: '1 / 1', value: 1 / 1 },
    { id: 2, name: '4 / 3', value: 4 / 3 },
    { id: 3, name: '16 / 9', value: 16 / 9 }
];

const ImageCropper = ({ value }) => {
    // State
    const [source, setSource] = useState('');
    const [isBroken, setIsBroken] = useState(false);
    const [crop, setCrop] = useState({
        unit: '%',
        width: 50,
        aspect: 16 / 9
    });

    // Previous Props
    const previousValue = usePrevious(value) || {};

    // Helpers
    // getCroppedImg = (image, crop, fileName) => {
    //     const canvas = document.createElement('canvas');
    //     const scaleX = image.naturalWidth / image.width;
    //     const scaleY = image.naturalHeight / image.height;
    //     canvas.width = crop.width;
    //     canvas.height = crop.height;
    //     const ctx = canvas.getContext('2d');

    //     ctx.drawImage(
    //         image,
    //         crop.x * scaleX,
    //         crop.y * scaleY,
    //         crop.width * scaleX,
    //         crop.height * scaleY,
    //         0,
    //         0,
    //         crop.width,
    //         crop.height
    //     );

    //     return new Promise((resolve, reject) => {
    //         canvas.toBlob((blob) => {
    //             if (!blob) {
    //                 // reject(new Error('Canvas is empty'));
    //                 console.error('Canvas is empty');
    //                 return;
    //             }
    //             blob.name = fileName;
    //             window.URL.revokeObjectURL(this.fileUrl);
    //             this.fileUrl = window.URL.createObjectURL(blob);
    //             resolve(this.fileUrl);
    //         }, 'image/jpeg');
    //     });
    // };

    // Event Handlers
    // const makeClientCrop = async (crop) => {
    //     if (crop.width && crop.height) {
    //         const croppedImageUrl = await this.getCroppedImg(
    //             this.imageRef,
    //             crop,
    //             'newFile.jpeg'
    //         );
    //         this.setState({ croppedImageUrl });
    //     }
    // };

    // const handleCropComplete = (updatedCrop) => {
    //     makeClientCrop(updatedCrop);
    // };

    const handleChange = ({ id, value: inputValue }) => {
        setCrop(
            { ...crop, [id]: inputValue }
        );
    };

    // const handleImageError = () => {
    //     setIsBroken(true);
    // };

    // Getters
    const getImage = () => {
        if (value.name) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setSource(reader.result);
            };
            reader.readAsDataURL(value);
        }
    };

    // Effects
    useEffect(() => {
        if (!objectDeepMatches(value.name, previousValue.name)) {
            getImage();
        }
    });

    return (
        <ImageCropperWrapper>
            <Grid alignItems="start" grid={Grid.grid.twoColumns}>
                <FormSection title="Crop your image" spacing="0" withoutBorder>
                    {source && (
                        <ReactCrop
                            src={source}
                            crop={crop}
                            ruleOfThirds
                            onChange={updatedCrop => setCrop(updatedCrop)}
                        />
                    )}
                </FormSection>
                <FormSection title="Meta Data" spacing="0" withoutBorder>
                    <Select
                        id="aspect"
                        data={ASPECT_RATIOS_DATA}
                        label="Aspect Ratio"
                        labelNote={`(In ${crop.unit})`}
                        placeholder="Select Aspect Ratio"
                        onChange={handleChange}
                        value={ASPECT_RATIOS_DATA.filter(aspectRatio => aspectRatio.value === crop.aspect).map(({ id }) => id)}
                    />
                    <Input
                        id="width"
                        label="Width"
                        labelNote={`(In ${crop.unit})`}
                        placeholder="Type Width"
                        onChange={handleChange}
                        value={crop.width}
                    />
                    <Input
                        id="height"
                        isReadOnly={!!crop.width}
                        label="Height"
                        labelNote={`(In ${crop.unit})`}
                        placeholder="Type Height"
                        onChange={handleChange}
                        value={crop.height}
                    />
                </FormSection>
            </Grid>
        </ImageCropperWrapper>
    );
};

export default ImageCropper;
