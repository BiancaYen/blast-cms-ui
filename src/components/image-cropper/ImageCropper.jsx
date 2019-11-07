import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// Components
import FormSection from '../form-section/FormSection';
import Grid from '../grid/Grid';
import Input from '../input/Input';

// Styles
import ImageCropperWrapper from './styles';

const ImageCropper = ({ value }) => {
    const src = 'https://wallpapercave.com/wp/dxXh4Ss.jpg';

    const [crop, setCrop] = useState({
        unit: '%',
        width: 50,
        aspect: 16 / 9
    });

    const handleChange = ({ id, value: inputValue }) => {
        setCrop(
            { ...crop, [id]: inputValue }
        );
    };

    console.log(crop);

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
                    <Input
                        id="aspect"
                        label="Aspect Ratio"
                        placeholder="Type Aspect Ratio"
                        onChange={handleChange}
                        value={crop.aspect}
                    />
                </FormSection>
            </Grid>
        </ImageCropperWrapper>
    );
};

export default ImageCropper;
