import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// Components
import FormSection from '../form-section/FormSection';
import Grid from '../grid/Grid';
import Input from '../input/Input';
import Select from '../select/Select';

// Styles
import ImageCropperWrapper from './styles';

const ASPECT_RATIOS_DATA = [
    { id: 1, name: '1 / 1', value: 1 / 1 },
    { id: 2, name: '4 / 3', value: 4 / 3 },
    { id: 3, name: '16 / 9', value: 16 / 9 }
];

const ImageCropper = ({ value }) => {
    const src = 'https://wallpapercave.com/wp/dxXh4Ss.jpg';

    // State
    const [crop, setCrop] = useState({
        unit: '%',
        width: 50,
        aspect: 16 / 9
    });

    const handleInputChange = ({ id, value: inputValue }) => {
        setCrop(
            { ...crop, [id]: inputValue }
        );
    };

    return (
        <ImageCropperWrapper>
            <Grid alignItems="start" grid={Grid.grid.twoColumns}>
                <FormSection title="Crop your image" spacing="0" withoutBorder>
                    {src && (
                        <ReactCrop
                            src={src}
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
                        onChange={handleInputChange}
                        value={ASPECT_RATIOS_DATA.filter(aspectRatio => aspectRatio.value === crop.aspect).map(({ id }) => id)}
                    />
                    <Input
                        id="width"
                        label="Width"
                        labelNote={`(In ${crop.unit})`}
                        placeholder="Type Width"
                        onChange={handleInputChange}
                        value={crop.width}
                    />
                    <Input
                        id="height"
                        isReadOnly={crop.width}
                        label="Height"
                        labelNote={`(In ${crop.unit})`}
                        placeholder="Type Height"
                        onChange={handleInputChange}
                        value={crop.height}
                    />
                </FormSection>
            </Grid>
        </ImageCropperWrapper>
    );
};

export default ImageCropper;
